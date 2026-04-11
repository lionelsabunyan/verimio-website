/**
 * Verimio Chatbot — Sohbet Özeti Notion Sync
 * Sohbet kapandığında özet üretip Notion'a kaydetme
 */

import { createServiceClient } from '@/lib/supabase/service';

interface ChatSummaryData {
  sessionId: string;
  summary: string;
  leadPotential: 'low' | 'medium' | 'high';
  visitorId: string;
  messageCount: number;
}

/**
 * Sohbet özetini Notion'a sayfa olarak kaydet
 */
export async function syncSummaryToNotion(data: ChatSummaryData): Promise<string | null> {
  const notionToken = process.env.NOTION_TOKEN;
  if (!notionToken) {
    console.error('[Chatbot] NOTION_TOKEN bulunamadı, Notion sync atlanıyor');
    return null;
  }

  // Chatbot sohbetleri için ayrı bir DB veya mevcut görev DB'sine ekle
  // Şimdilik görev DB'sine "Chatbot Özeti" olarak ekliyoruz
  const databaseId = process.env.NOTION_CHATBOT_DB_ID || '31304c58-4ec9-81a1-b847-c1a28cd431e1';

  try {
    const response = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${notionToken}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        parent: { database_id: databaseId },
        properties: {
          'Görev': {
            title: [
              {
                text: {
                  content: `Chatbot Sohbeti — ${new Date().toLocaleDateString('tr-TR')} (${data.leadPotential})`,
                },
              },
            ],
          },
          'Durum': {
            select: { name: data.leadPotential === 'high' ? 'Devam Ediyor' : 'Tamamlandı' },
          },
        },
        children: [
          {
            object: 'block',
            type: 'heading_3',
            heading_3: {
              rich_text: [{ type: 'text', text: { content: 'Sohbet Özeti' } }],
            },
          },
          {
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [{ type: 'text', text: { content: data.summary } }],
            },
          },
          {
            object: 'block',
            type: 'divider',
            divider: {},
          },
          {
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [
                { type: 'text', text: { content: `Lead Potansiyeli: ${data.leadPotential}\nMesaj Sayısı: ${data.messageCount}\nVisitor ID: ${data.visitorId}\nSession ID: ${data.sessionId}` } },
              ],
            },
          },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('[Chatbot] Notion sync hatası:', errText);
      return null;
    }

    const result = await response.json();
    return result.id;
  } catch (error) {
    console.error('[Chatbot] Notion sync exception:', error);
    return null;
  }
}

/**
 * Sohbet geçmişinden özet üret (OpenRouter ile)
 */
export async function generateChatSummary(messages: { role: string; content: string }[]): Promise<{
  summary: string;
  leadPotential: 'low' | 'medium' | 'high';
}> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return { summary: 'Özet üretilemedi (API key eksik)', leadPotential: 'low' };
  }

  const conversationText = messages
    .filter(m => m.role !== 'system')
    .map(m => `${m.role === 'user' ? 'Ziyaretçi' : 'Asistan'}: ${m.content}`)
    .join('\n');

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://www.verimio.com.tr',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        max_tokens: 500,
        messages: [
          {
            role: 'system',
            content: `Aşağıdaki chatbot sohbetini analiz et ve JSON olarak döndür:
{
  "summary": "3-5 cümlelik Türkçe özet — ziyaretçi ne sordu, ne istedi, hangi aksiyonlar alındı",
  "leadPotential": "low|medium|high"
}

Lead potansiyeli kriterleri:
- high: E-posta veya form bilgisi paylaştı, toplantı istedi, ciddi sorun anlattı
- medium: Hizmetleri sordu, ilgi gösterdi ama bilgi paylaşmadı
- low: Genel soru sordu, sadece merak etti

Sadece JSON döndür, başka bir şey yazma.`,
          },
          { role: 'user', content: conversationText },
        ],
      }),
    });

    if (!response.ok) {
      return { summary: 'Özet üretilemedi', leadPotential: 'low' };
    }

    const result = await response.json();
    const text = result.choices?.[0]?.message?.content || '';

    // JSON parse
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        summary: parsed.summary || 'Özet üretilemedi',
        leadPotential: ['low', 'medium', 'high'].includes(parsed.leadPotential) ? parsed.leadPotential : 'low',
      };
    }

    return { summary: text.slice(0, 500), leadPotential: 'low' };
  } catch {
    return { summary: 'Özet üretilemedi (hata)', leadPotential: 'low' };
  }
}

/**
 * Sohbet oturumunu sonlandır: özet üret, Supabase güncelle, Notion'a kaydet
 */
export async function finalizeChatSession(sessionId: string): Promise<void> {
  const supabase = createServiceClient();

  // Mesajları al
  const { data: messages } = await supabase
    .from('chat_messages')
    .select('role, content')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true });

  if (!messages || messages.length < 2) return;

  // Özet üret
  const { summary, leadPotential } = await generateChatSummary(messages);

  // Session bilgisini al
  const { data: session } = await supabase
    .from('chat_sessions')
    .select('visitor_id, message_count')
    .eq('id', sessionId)
    .single();

  if (!session) return;

  // Notion'a kaydet
  const notionPageId = await syncSummaryToNotion({
    sessionId,
    summary,
    leadPotential,
    visitorId: session.visitor_id,
    messageCount: session.message_count,
  });

  // Supabase güncelle
  await supabase
    .from('chat_sessions')
    .update({
      ended_at: new Date().toISOString(),
      summary,
      lead_potential: leadPotential,
      notion_page_id: notionPageId,
    })
    .eq('id', sessionId);
}
