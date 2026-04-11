import { createServiceClient } from '@/lib/supabase/service';
import { buildChatbotSystemPrompt } from '@/lib/chatbot/system-prompt';
import { finalizeChatSession } from '@/lib/chatbot/notion-sync';

// UIMessage tipini inline tanımlıyoruz — AI SDK'nın karmaşıklığından kaçınmak için
interface ClientMessage {
  id?: string;
  role: 'user' | 'assistant' | 'system';
  parts?: Array<{ type: string; text?: string }>;
  content?: string;
}

const rateLimits = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 30;
const RATE_WINDOW = 60 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimits.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimits.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

// UIMessage → OpenAI format'a manuel dönüştür
function toOpenAIMessages(messages: ClientMessage[]): Array<{ role: string; content: string }> {
  return messages
    .map((m) => {
      let content = '';
      if (m.content) {
        content = m.content;
      } else if (m.parts && Array.isArray(m.parts)) {
        content = m.parts
          .filter((p) => p.type === 'text' && p.text)
          .map((p) => p.text)
          .join('\n');
      }
      return { role: m.role, content };
    })
    .filter((m) => m.content.length > 0);
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (!checkRateLimit(ip)) {
      return Response.json(
        { error: 'Çok fazla mesaj gönderdiniz. Lütfen biraz bekleyin.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { messages, sessionId } = body as {
      messages: ClientMessage[];
      sessionId?: string;
    };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: 'Geçersiz mesaj formatı.' }, { status: 400 });
    }

    console.log('[Chat] msgCount:', messages.length);

    const supabase = createServiceClient();

    // Son kullanıcı mesajını kaydet
    const lastMsg = messages[messages.length - 1];
    const lastMsgText = lastMsg.parts
      ? lastMsg.parts.filter((p) => p.type === 'text').map((p) => p.text).join('\n')
      : lastMsg.content || '';

    if (sessionId && lastMsg.role === 'user' && lastMsgText) {
      await supabase.from('chat_messages').insert({
        session_id: sessionId,
        role: 'user',
        content: lastMsgText,
      });
      await supabase
        .from('chat_sessions')
        .update({ message_count: messages.filter((m) => m.role === 'user').length })
        .eq('id', sessionId);
    }

    // OpenRouter çağrısı — streaming
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return Response.json({ error: 'API key eksik.' }, { status: 500 });
    }

    const openaiMessages = [
      { role: 'system', content: buildChatbotSystemPrompt(null) },
      ...toOpenAIMessages(messages),
    ];

    console.log('[Chat] OpenAI messages:', openaiMessages.length, 'last user:', lastMsgText.slice(0, 100));

    const openrouterRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://www.verimio.com.tr',
        'X-Title': 'Verimio Chatbot',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages: openaiMessages,
        max_tokens: 800,
        stream: true,
      }),
    });

    if (!openrouterRes.ok) {
      const errorText = await openrouterRes.text();
      console.error('[Chat] OpenRouter error:', openrouterRes.status, errorText);
      return Response.json(
        { error: `Model hatası: ${openrouterRes.status}` },
        { status: 500 }
      );
    }

    // OpenRouter SSE stream → plain text stream
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    let fullText = '';

    const stream = new ReadableStream({
      async start(controller) {
        const reader = openrouterRes.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        let buffer = '';
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed || !trimmed.startsWith('data:')) continue;
              const data = trimmed.slice(5).trim();
              if (data === '[DONE]') continue;

              try {
                const parsed = JSON.parse(data);
                const delta = parsed.choices?.[0]?.delta?.content;
                if (delta) {
                  fullText += delta;
                  controller.enqueue(encoder.encode(delta));
                }
              } catch {
                // JSON parse hatası — satır atla
              }
            }
          }

          // Asistan mesajını kaydet
          if (sessionId && fullText) {
            await supabase.from('chat_messages').insert({
              session_id: sessionId,
              role: 'assistant',
              content: fullText,
            });
          }
        } catch (err) {
          console.error('[Chat] Stream hatası:', err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Accel-Buffering': 'no',
      },
    });
  } catch (error) {
    console.error('[Chat] Genel hata:', error);
    return Response.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}

// Session sonlandırma
export async function PATCH(req: Request) {
  const { sessionId } = await req.json();
  if (!sessionId) {
    return Response.json({ error: 'sessionId gerekli' }, { status: 400 });
  }

  finalizeChatSession(sessionId).catch((err) =>
    console.error('[Chat] Finalize hatası:', err)
  );

  return Response.json({ ok: true });
}
