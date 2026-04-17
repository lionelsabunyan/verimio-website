import { createServiceClient } from '@/lib/supabase/service';
import { buildChatbotSystemPrompt } from '@/lib/chatbot/system-prompt';
import { finalizeChatSession } from '@/lib/chatbot/notion-sync';
import { getResend, FROM_ADDRESS, generalEmailHtml } from '@/lib/email';

const LEAD_NOTIFY_TO = 'info@verimio.com.tr';

interface ChatLead {
  name: string;
  email: string;
  message: string;
}

function parseLeadMarker(text: string): ChatLead | null {
  const match = text.match(/\[\[LEAD\|([^\]]+)\]\]/);
  if (!match) return null;
  const fields: Record<string, string> = {};
  for (const part of match[1].split('|')) {
    const eq = part.indexOf('=');
    if (eq === -1) continue;
    fields[part.slice(0, eq).trim()] = part.slice(eq + 1).trim();
  }
  if (!fields.ad || !fields.email || !fields.mesaj) return null;
  if (!fields.email.includes('@') || !fields.email.includes('.')) return null;
  return { name: fields.ad, email: fields.email, message: fields.mesaj };
}

async function handleChatLead(
  supabase: ReturnType<typeof createServiceClient>,
  sessionId: string | undefined,
  lead: ChatLead
) {
  try {
    if (sessionId) {
      await supabase
        .from('chat_sessions')
        .update({
          metadata: {
            lead: { ...lead, captured_at: new Date().toISOString() },
          },
        })
        .eq('id', sessionId);
    }

    const subject = `Chat üzerinden yeni mesaj — ${lead.name}`;
    const body = `Chat widget üzerinden bir ziyaretçi size mesaj bıraktı.\n\nAd: ${lead.name}\nE-posta: ${lead.email}\n\nMesaj:\n${lead.message}\n\nSession: ${sessionId ?? 'bilinmiyor'}`;

    await getResend().emails.send({
      from: FROM_ADDRESS,
      to: LEAD_NOTIFY_TO,
      replyTo: lead.email,
      subject,
      html: generalEmailHtml({
        recipientEmail: LEAD_NOTIFY_TO,
        subject,
        message: body,
      }),
    });
    console.log('[Chat] Lead captured:', lead.email);
  } catch (err) {
    console.error('[Chat] Lead handle hatası:', err);
  }
}

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

    // OpenRouter SSE stream → plain text stream (marker-aware)
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    let fullText = '';

    // Stream cleanup: model bazen marker'ı markdown code block içinde ve duplicate
    // onay cümlesiyle üretiyor. Bu fonksiyon final metni temizler: code fence'leri,
    // marker'ı ve arka arkaya tekrarlanan onay cümlelerini kaldırır.
    const cleanFinalText = (text: string): string => {
      let out = text;
      out = out.replace(/```[a-zA-Z]*\s*\n?([\s\S]*?)\n?```/g, (_m, inner) => inner);
      out = out.replace(/\[\[LEAD\|[^\]]*\]\]/g, '');
      out = out.replace(/(Teşekkürler\.\s*Mesajınızı ilettim[^\n]*?)(\s*\n+\s*\1)+/g, '$1');
      out = out.replace(/\n{3,}/g, '\n\n');
      return out.trim();
    };

    const stream = new ReadableStream({
      async start(controller) {
        const reader = openrouterRes.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        let buffer = '';
        // Stream'i ikiye ayır: güvenli kısım (hemen yayınla) + frozen kısım
        // (marker veya code fence başlığı görüldü, stream sonu temizliğinde işle).
        let pending = '';
        let frozen = '';
        let frozenMode = false;
        const FREEZE_TRIGGERS = ['[[', '```'];

        const emitSafe = (s: string) => {
          if (s) controller.enqueue(encoder.encode(s));
        };

        const flush = () => {
          if (frozenMode) {
            frozen += pending;
            pending = '';
            return;
          }
          let earliest = -1;
          for (const trig of FREEZE_TRIGGERS) {
            const idx = pending.indexOf(trig);
            if (idx !== -1 && (earliest === -1 || idx < earliest)) earliest = idx;
          }
          if (earliest !== -1) {
            emitSafe(pending.slice(0, earliest));
            frozen = pending.slice(earliest);
            pending = '';
            frozenMode = true;
            return;
          }
          // Son 2 karakteri tut — '[[' veya '``' başlangıcı olabilir diye
          if (pending.length > 2) {
            emitSafe(pending.slice(0, -2));
            pending = pending.slice(-2);
          }
        };

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
                  pending += delta;
                  flush();
                }
              } catch {
                // JSON parse hatası — satır atla
              }
            }
          }

          // Stream bitti — pending'deki son safe içeriği yayınla,
          // frozen bölümü temizle ve tek seferde gönder
          if (!frozenMode) {
            emitSafe(pending);
            pending = '';
          } else {
            frozen += pending;
            pending = '';
          }
          if (frozen) {
            const cleaned = cleanFinalText(frozen);
            emitSafe(cleaned);
          }

          // Marker'ı fullText üzerinden parse et ve lead'i işle
          const lead = parseLeadMarker(fullText);
          if (lead) {
            await handleChatLead(supabase, sessionId, lead);
          }

          // Asistan mesajını kaydet (marker + fence + duplicate temizlenmiş)
          if (sessionId && fullText) {
            const clean = cleanFinalText(fullText);
            await supabase.from('chat_messages').insert({
              session_id: sessionId,
              role: 'assistant',
              content: clean,
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
