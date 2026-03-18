import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { callLLM } from '@/lib/llm'
import { resend, FROM_ADDRESS, REPLY_TO, checkupReportEmailHtml, type CheckupAnalysis } from '@/lib/email'

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || ''

const ANALYSIS_SYSTEM = `Sen Verimio'nun kıdemli AI danışmanısın. Türk şirketlerine AI dönüşüm analizi yapıyorsun.
Form verilerini analiz ederek somut, kişiselleştirilmiş ve uygulanabilir öneriler üret.
Yanıtın tamamen Türkçe olacak. Abartılı, klişe ifadelerden kaçın — gerçekçi ve dürüst ol.
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

Şu JSON formatını döndür:
{
  "score": <1-10 arası sayı>,
  "score_label": "<Başlangıç seviyesi / Gelişmekte / Hazır / İleri seviye>",
  "top_opportunity": "<tek cümle, en somut otomasyon fırsatı>",
  "estimated_saving": "<tahmini zaman veya maliyet tasarrufu, Türk şirketleri için gerçekçi rakamlar>",
  "summary": "<2-3 cümle özet, şirkete özel>",
  "recommendations": [
    {"title": "<başlık>", "description": "<2-3 cümle açıklama, nasıl uygulanır>"},
    {"title": "<başlık>", "description": "<2-3 cümle>"},
    {"title": "<başlık>", "description": "<2-3 cümle>"}
  ],
  "roadmap": {
    "month1": "<1. ayda yapılacaklar, somut adımlar>",
    "month2": "<2. ayda yapılacaklar>",
    "month3": "<3. ayda yapılacaklar ve beklenen sonuç>"
  }
}`
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
      // DB hatası olsa bile devam et — email gönder
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
        score_label: 'Gelişmekte',
        top_opportunity: 'Manuel süreçlerin otomasyonu ile zaman tasarrufu',
        estimated_saving: 'Aylık 10-20 saat iş gücü tasarrufu',
        summary: `${company_name || 'Şirketiniz'} için AI dönüşüm analizini tamamladık. Ekibiniz mevcut süreçleri iyileştirmek için hazır bir konumda.`,
        recommendations: [
          { title: 'Rutin Raporlamayı Otomatize Edin', description: 'Haftalık ve aylık raporları AI ile otomatik üretin. Excel tabanlı manuel süreçler yerine gerçek zamanlı dashboard kurun.' },
          { title: 'Müşteri İletişimini Hızlandırın', description: 'Sık sorulan sorular için AI destekli yanıt şablonları oluşturun. Ekibinizin zamanını değer yaratan işlere yönlendirin.' },
          { title: 'Veri Toplamayı Merkezileştirin', description: 'Farklı kaynaklardan gelen verileri tek bir platforma taşıyın. Karar vermek için gereken süreyi kısaltın.' },
        ],
        roadmap: {
          month1: 'Mevcut iş akışlarını haritalayın, en çok zaman harcanan süreçleri tespit edin',
          month2: 'Pilot otomasyon projesi başlatın, ilk aracı entegre edin ve sonuçları ölçün',
          month3: 'Başarılı pilotu ölçeklendirin, ekip eğitimini tamamlayın, ROI raporlayın',
        },
      }
    }

    // 3. Müşteriye rapor emaili gönder
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

    // 4. Bana bildirim gönder
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
    }).catch(() => {}) // bildirim hatası kritik değil

    return NextResponse.json({ success: true, leadId: lead?.id })
  } catch (err) {
    console.error('checkup/submit error:', err)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
