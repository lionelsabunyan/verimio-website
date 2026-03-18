import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { callLLM } from '@/lib/llm'
import { resend, FROM_ADDRESS, REPLY_TO, checkupReportEmailHtml, type CheckupAnalysis } from '@/lib/email'

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || ''
const NOTION_TOKEN = process.env.NOTION_TOKEN || ''
const NOTION_LEADS_DB_ID = process.env.NOTION_LEADS_DB_ID || ''

const ANALYSIS_SYSTEM = `Sen Verimio'nun kıdemli danışmanısın. Türk KOBİ sahiplerine ve yöneticilerine AI dönüşüm analizi yapıyorsun.

Müşteri teknik değil — teknoloji veya yazılım geçmişi yok. Bu yüzden:
- "Otomasyon altyapısı", "entegrasyon", "süreç optimizasyonu", "AI pipeline", "dijital dönüşüm altyapısı" gibi jargon KULLANMA.
- Günlük iş dili kullan: "zaman kaybı", "elle yapılan iş", "hata payı", "gecikme", "maliyet", "müşteri şikayeti", "raporlama derdi", "ekip yorgunluğu", "para kaybı" gibi.
- Sanki bir iş arkadaşına ya da müşteriye kahve içerken anlatır gibi yaz — sade, net, doğrudan.
- Abartılı ve klişe ifadelerden kaçın. Gerçekçi ve dürüst ol.

SADECE geçerli JSON döndür, başka hiçbir şey yazma.`

function buildAnalysisPrompt(data: Record<string, unknown>): string {
  return `Aşağıdaki şirket verilerine göre AI hazırlık analizi yap:

Şirket: ${data.company_name || 'Belirtilmemiş'}
Sektör: ${data.sector}
Ekip büyüklüğü: ${data.team_size}
Mevcut araçlar: ${Array.isArray(data.tools) ? data.tools.join(', ') : data.tools || 'Belirtilmemiş'}
Ağrı noktaları: ${JSON.stringify(data.pain_points)}
En büyük sorun: ${data.biggest_pain}
Öncelik alanı: ${data.priority_area}
Beklenti: ${data.expectation}
Zaman çizelgesi: ${data.timeline}

KURALLAR:
1. Dil: Sade Türkçe, jargon yok. Müşteri KOBİ sahibi, teknik değil.
2. Öneriler birbirinden farklı iş alanlarında olmalı: müşteri iletişimi, raporlama/takip, iç süreçler, stok/sipariş, satış/pazarlama, insan kaynakları, maliyet kontrolü gibi. Aynı konuyu tekrarlama.
3. Yol haritası gerçekçi olsun. Her şey 2-4 haftada bitecekse sadece phase1 yeterli. Zorla 3 faz üretme.
4. timeline_label: Gerçekçi toplam süre tahmini ("2-4 hafta" / "1-2 ay" / "2-3 ay" / "3+ ay").

Şu JSON formatını döndür:
{
  "score": <1-10 arası sayı>,
  "score_label": "<Yeni başlıyorsunuz / Adım adım ilerliyorsunuz / Hazır durumdasınız / İleri bir noktadasınız>",
  "top_opportunity": "<tek cümle, sade dille en somut kazanım fırsatı>",
  "estimated_saving": "<tahmini zaman veya para tasarrufu, Türk KOBİ'leri için gerçekçi rakamlar>",
  "timeline_label": "<gerçekçi toplam süre: '2-4 hafta' / '1-2 ay' / '2-3 ay' / '3+ ay'>",
  "summary": "<2-3 cümle özet, şirkete özel, sade dil>",
  "recommendations": [
    {"title": "<başlık>", "description": "<2-3 cümle, nasıl uygulanır, sade dil>"},
    {"title": "<başlık>", "description": "<2-3 cümle>"},
    {"title": "<başlık>", "description": "<2-3 cümle>"},
    {"title": "<başlık>", "description": "<2-3 cümle>"},
    {"title": "<başlık>", "description": "<2-3 cümle>"}
  ],
  "roadmap": {
    "phase1": "<ilk adım — her zaman dolu, hemen başlanabilir>",
    "phase2": "<ikinci adım — sadece gerekiyorsa, yoksa null>",
    "phase3": "<üçüncü adım — sadece gerekiyorsa, yoksa null>"
  },
  "consultant_guide": {
    "sector_context": "<bu sektörde yaygın AI kullanım alanları ve dikkat edilmesi gerekenler, 2-3 cümle>",
    "research_topics": ["<araştırılacak konu 1>", "<araştırılacak konu 2>", "<araştırılacak konu 3>"],
    "suggested_tools": ["<araç/servis adı + neden uygun>", "<araç/servis adı + neden uygun>", "<araç/servis adı + neden uygun>"],
    "call_prep": "<görüşmede sorulacak sorular ve öngörülen endişeler, 2-3 cümle>",
    "quick_wins": ["<1-2 haftada hayata geçirilebilecek somut aksiyon>", "<somut aksiyon 2>"]
  }
}`
}

// Notion sayfası oluşturma yardımcısı
function textBlock(content: string) {
  return {
    object: 'block',
    type: 'paragraph',
    paragraph: {
      rich_text: [{ type: 'text', text: { content } }],
    },
  }
}

function headingBlock(content: string, level: 2 | 3 = 2) {
  const type = level === 2 ? 'heading_2' : 'heading_3'
  return {
    object: 'block',
    type,
    [type]: {
      rich_text: [{ type: 'text', text: { content } }],
    },
  }
}

function bulletBlock(content: string) {
  return {
    object: 'block',
    type: 'bulleted_list_item',
    bulleted_list_item: {
      rich_text: [{ type: 'text', text: { content } }],
    },
  }
}

function dividerBlock() {
  return { object: 'block', type: 'divider', divider: {} }
}

async function createNotionPage(
  data: Record<string, unknown>,
  analysis: CheckupAnalysis,
) {
  if (!NOTION_TOKEN || !NOTION_LEADS_DB_ID) return

  const companyName = (data.company_name as string) || (data.email as string) || 'Bilinmeyen'
  const sector = (data.sector as string) || 'Diğer'
  const teamSize = (data.team_size as string) || ''
  const email = (data.email as string) || ''
  const tools = Array.isArray(data.tools) ? (data.tools as string[]).join(', ') : String(data.tools || '')
  const painPoints = data.pain_points as Record<string, string> | null
  const biggestPain = (data.biggest_pain as string) || ''

  // Sektör seçeneklerini Notion DB'deki seçeneklerle eşleştir
  const sectorMap: Record<string, string> = {
    'E-ticaret / Perakende': 'E-ticaret / Perakende',
    'E-ticaret': 'E-ticaret / Perakende',
    'Perakende': 'E-ticaret / Perakende',
    'Teknoloji / Yazılım': 'Teknoloji / Yazılım',
    'Teknoloji': 'Teknoloji / Yazılım',
    'Üretim & Sanayi': 'Üretim & Sanayi',
    'Üretim / Lojistik': 'Üretim & Sanayi',
    'Lojistik & Tedarik Zinciri': 'Lojistik & Tedarik Zinciri',
    'Lojistik': 'Lojistik & Tedarik Zinciri',
    'Sağlık / Klinik': 'Sağlık / Klinik',
    'Finans / Sigorta': 'Finans / Sigorta',
    'Gayrimenkul': 'Gayrimenkul',
    'Ajans': 'Ajans',
    'B2B Hizmet': 'B2B Hizmet',
  }
  const notionSector = sectorMap[sector] || 'Diğer'

  // Ekip seçeneklerini eşleştir
  const teamMap: Record<string, string> = {
    'Sadece ben': 'Sadece ben',
    '2-5 kişi': '2-10',
    '2-10 kişi': '2-10',
    '6-15 kişi': '11-50',
    '11-50 kişi': '11-50',
    '16-50 kişi': '11-50',
    '51-200 kişi': '51-200',
    '51-200': '51-200',
    '50+ kişi': '51-200',
    '200+': '200+',
  }
  const notionTeam = teamMap[teamSize] || '2-10'

  const guide = analysis.consultant_guide

  // Sayfa blokları
  const children = [
    headingBlock('📋 Müşteri Bilgileri'),
    textBlock(`Şirket: ${companyName}`),
    textBlock(`Sektör: ${sector}`),
    textBlock(`Ekip: ${teamSize}`),
    textBlock(`E-posta: ${email}`),
    textBlock(`Kullandıkları araçlar: ${tools || '—'}`),
    textBlock(`En büyük sorun: ${biggestPain || '—'}`),
    ...(painPoints
      ? Object.values(painPoints)
          .filter(Boolean)
          .map((v) => bulletBlock(String(v)))
      : []),
    dividerBlock(),

    headingBlock('🎯 AI Hazırlık Analizi'),
    textBlock(`Skor: ${analysis.score}/10 — ${analysis.score_label}`),
    textBlock(`Özet: ${analysis.summary}`),
    textBlock(`En büyük fırsat: ${analysis.top_opportunity}`),
    textBlock(`Tahmini kazanım: ${analysis.estimated_saving}`),
    ...(analysis.timeline_label ? [textBlock(`Süre tahmini: ${analysis.timeline_label}`)] : []),
    dividerBlock(),

    headingBlock('💡 Önerilen Aksiyonlar'),
    ...analysis.recommendations.map((r) => bulletBlock(`${r.title}: ${r.description}`)),
    dividerBlock(),

    headingBlock('🧭 Yol Haritası'),
    bulletBlock(`Adım 1: ${analysis.roadmap.phase1}`),
    ...(analysis.roadmap.phase2 ? [bulletBlock(`Adım 2: ${analysis.roadmap.phase2}`)] : []),
    ...(analysis.roadmap.phase3 ? [bulletBlock(`Adım 3: ${analysis.roadmap.phase3}`)] : []),
    dividerBlock(),

    headingBlock('🔧 Danışman Aksiyon Rehberi'),
    ...(guide ? [
      headingBlock('Sektör Bağlamı', 3),
      textBlock(guide.sector_context || ''),
      headingBlock('Araştırılacak Konular', 3),
      ...(guide.research_topics || []).map((t) => bulletBlock(t)),
      headingBlock('Önerilen Araçlar', 3),
      ...(guide.suggested_tools || []).map((t) => bulletBlock(t)),
      headingBlock('Görüşme Hazırlığı', 3),
      textBlock(guide.call_prep || ''),
      headingBlock('Hızlı Kazanımlar (1-2 Hafta)', 3),
      ...(guide.quick_wins || []).map((t) => bulletBlock(t)),
    ] : [textBlock('Danışman rehberi üretilemedi.')]),
  ]

  await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${NOTION_TOKEN}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      parent: { database_id: NOTION_LEADS_DB_ID },
      properties: {
        'Şirket': { title: [{ text: { content: `${companyName} — ${sector}` } }] },
        'Durum': { select: { name: 'Yeni' } },
        'Sektör': { select: { name: notionSector } },
        'Ekip': { select: { name: notionTeam } },
        'Skor': { number: analysis.score },
        'Email': { email },
        'Tarih': { date: { start: new Date().toISOString().split('T')[0] } },
      },
      children,
    }),
  }).catch((err) => console.error('[Notion] Sayfa oluşturma hatası:', err))
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, company_name, sector, team_size, tools, pain_points,
            biggest_pain, priority_area, expectation, timeline, phone, company_website } = body

    if (!email || !sector) {
      return NextResponse.json({ error: 'email ve sector zorunlu' }, { status: 400 })
    }

    // 1. Supabase'e kaydet
    const supabase = await createClient()
    const { data: lead, error: dbError } = await supabase
      .from('leads')
      .insert({
        email, phone: phone || null, company_name: company_name || null,
        company_website: company_website || null, sector, team_size,
        tools, pain_points, biggest_pain, priority_area, expectation, timeline,
        status: 'new',
      })
      .select('id')
      .single()

    if (dbError) {
      console.error('Supabase insert error:', dbError)
    }

    // 2. LLM ile analiz üret
    let analysis: CheckupAnalysis
    try {
      const raw = await callLLM({
        task: 'lead_analysis',
        system: ANALYSIS_SYSTEM,
        messages: [{ role: 'user', content: buildAnalysisPrompt(body) }],
      })
      const jsonMatch = raw.match(/\{[\s\S]*\}/)
      analysis = jsonMatch ? JSON.parse(jsonMatch[0]) : null
    } catch (llmErr) {
      console.error('LLM error:', llmErr)
      analysis = {
        score: 5,
        score_label: 'Adım adım ilerliyorsunuz',
        top_opportunity: 'Elle yapılan rutin işleri azaltarak haftada birkaç saat kazanabilirsiniz',
        estimated_saving: 'Aylık 10-20 saat iş yükü azalması',
        timeline_label: '1-2 ay',
        summary: `${company_name || 'Şirketiniz'} için analizi tamamladık. Ekibinizin zaman harcadığı tekrarlayan işleri azaltmak için güzel fırsatlar var.`,
        recommendations: [
          { title: 'Rutin Raporları Otomatik Hazırlayın', description: 'Haftalık ve aylık raporları her seferinde elle yapmak yerine bir kez kurulum yapın, otomatik gelsin. Excel ile uğraşmak yerine ekibiniz başka işlere odaklanabilir.' },
          { title: 'Müşteri Sorularını Daha Hızlı Yanıtlayın', description: 'Sık sorulan sorular için hazır şablonlar veya basit bir otomatik yanıt sistemi kurun. Müşteri memnuniyeti artar, ekip zamanı azalır.' },
          { title: 'Verileri Tek Bir Yerde Toplayın', description: 'Farklı tablolar, klasörler ve e-postalardaki verileri tek bir yerde tutun. Bir şey aramak için dakikalar harcamak yerine saniyeler içinde bulun.' },
          { title: 'Onay Süreçlerini Hızlandırın', description: 'E-posta zinciriyle yapılan onaylar sıklıkla kaybolur ya da gecikmeler yaratır. Basit bir dijital onay akışı bu problemi ortadan kaldırır.' },
          { title: 'Ekibe Pratik Eğitim Verin', description: 'Yeni araçların benimsenmesi için kısa ve pratik rehberler hazırlayın. Ekip alışkınca değişime direnç azalır ve verimliliği daha hızlı görürsünüz.' },
        ],
        roadmap: {
          phase1: 'Hangi işlere en çok zaman harcandığını listeleyin, önceliklendirin',
          phase2: 'İlk iyileştirmeyi hayata geçirin, sonuçları ölçün',
          phase3: null,
        },
        consultant_guide: {
          sector_context: 'Genel sektör bağlamı mevcut değil.',
          research_topics: ['Sektöre uygun otomasyon araçları', 'Rakip şirket örnekleri', 'Türkiye\'de benzer projeler'],
          suggested_tools: ['n8n (iş akışı otomasyonu)', 'Make.com (basit entegrasyonlar)', 'Notion (bilgi yönetimi)'],
          call_prep: 'Şirketin mevcut yazılım altyapısını ve IT bütçesini sor. Karar verici kim olduğunu belirle.',
          quick_wins: ['En tekrarlayan raporu otomatize et', 'Müşteri e-posta şablonları oluştur'],
        },
      }
    }

    // 3. Notion'da müşteri sayfası oluştur (paralel, hata kritik değil)
    createNotionPage(body, analysis).catch(() => {})

    // 4. Müşteriye rapor emaili gönder
    const { error: emailError } = await resend.emails.send({
      from: FROM_ADDRESS,
      replyTo: REPLY_TO,
      to: [email],
      subject: `AI Hazırlık Raporunuz Hazır — ${company_name || 'Şirketiniz'}`,
      html: checkupReportEmailHtml({
        recipientEmail: email,
        companyName: company_name || 'Şirketiniz',
        analysis,
        calendlyUrl: CALENDLY_URL || undefined,
      }),
    })

    if (emailError) {
      console.error('Resend error:', emailError)
    }

    // 5. Bana bildirim gönder
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: ['info@verimio.com.tr'],
      subject: `Yeni Lead: ${company_name || email} — ${sector}`,
      html: `<div style="font-family:monospace;background:#0F172A;color:#F1F5F9;padding:20px;border-radius:8px;">
        <h2 style="color:#F59E0B;">Yeni Check-Up Başvurusu</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Şirket:</strong> ${company_name || '—'}</p>
        <p><strong>Sektör:</strong> ${sector}</p>
        <p><strong>Ekip:</strong> ${team_size}</p>
        <p><strong>Skor:</strong> ${analysis.score}/10 — ${analysis.score_label}</p>
        <p><strong>En büyük fırsat:</strong> ${analysis.top_opportunity}</p>
        <hr style="border-color:#1E293B;">
        <p style="color:#94A3B8;font-size:12px;">Lead ID: ${lead?.id || 'kayıt hatası'}</p>
      </div>`,
    }).catch(() => {})

    return NextResponse.json({ success: true, leadId: lead?.id })
  } catch (err) {
    console.error('checkup/submit error:', err)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
