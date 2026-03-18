import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

export const FROM_ADDRESS = 'Verimio Analiz <analiz@verimio.com.tr>'
export const REPLY_TO = 'info@verimio.com.tr'

export function reportEmailHtml({
  recipientEmail,
  pdfUrl,
  message,
}: {
  recipientEmail: string
  pdfUrl?: string
  message?: string
}) {
  const defaultMessage =
    'AI dönüşüm analizinizi tamamladık. Raporunuzu aşağıdaki bağlantıdan inceleyebilirsiniz.'

  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verimio Rapor</title>
</head>
<body style="margin:0;padding:0;background-color:#020617;font-family:'DM Sans',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#020617;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Logo -->
          <tr>
            <td style="padding-bottom:32px;">
              <span style="font-size:24px;font-weight:700;letter-spacing:-0.5px;">
                <span style="color:#F1F5F9;">verim</span><span style="color:#F59E0B;">io</span>
              </span>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background-color:#0F172A;border-radius:16px;padding:40px;border:1px solid #1E293B;">

              <p style="color:#94A3B8;font-size:14px;margin:0 0 8px 0;text-transform:uppercase;letter-spacing:1px;">AI Dönüşüm Analizi</p>
              <h1 style="color:#F1F5F9;font-size:28px;font-weight:700;margin:0 0 24px 0;line-height:1.3;">
                Raporunuz Hazır
              </h1>

              <p style="color:#94A3B8;font-size:16px;line-height:1.7;margin:0 0 32px 0;">
                ${message || defaultMessage}
              </p>

              ${
                pdfUrl
                  ? `<table cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr>
                  <td style="background-color:#F59E0B;border-radius:8px;">
                    <a href="${pdfUrl}" target="_blank"
                       style="display:inline-block;padding:14px 28px;color:#020617;font-weight:700;font-size:15px;text-decoration:none;letter-spacing:-0.2px;">
                      Raporu İncele →
                    </a>
                  </td>
                </tr>
              </table>`
                  : ''
              }

              <hr style="border:none;border-top:1px solid #1E293B;margin:0 0 24px 0;">

              <p style="color:#475569;font-size:13px;line-height:1.6;margin:0;">
                Sorularınız için <a href="mailto:info@verimio.com.tr" style="color:#F59E0B;text-decoration:none;">info@verimio.com.tr</a> adresine yazabilirsiniz.<br>
                Bu e-posta <strong style="color:#94A3B8;">${recipientEmail}</strong> adresine gönderilmiştir.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:24px;">
              <p style="color:#334155;font-size:12px;margin:0;line-height:1.6;">
                © 2026 Verimio · <a href="https://verimio.com.tr" style="color:#475569;text-decoration:none;">verimio.com.tr</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export function generalEmailHtml({
  recipientEmail,
  subject,
  message,
}: {
  recipientEmail: string
  subject: string
  message: string
}) {
  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background-color:#020617;font-family:'DM Sans',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#020617;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Logo -->
          <tr>
            <td style="padding-bottom:32px;">
              <span style="font-size:24px;font-weight:700;letter-spacing:-0.5px;">
                <span style="color:#F1F5F9;">verim</span><span style="color:#F59E0B;">io</span>
              </span>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background-color:#0F172A;border-radius:16px;padding:40px;border:1px solid #1E293B;">
              <h1 style="color:#F1F5F9;font-size:24px;font-weight:700;margin:0 0 24px 0;line-height:1.3;">
                ${subject}
              </h1>

              <div style="color:#94A3B8;font-size:16px;line-height:1.8;margin:0 0 32px 0;white-space:pre-line;">
                ${message}
              </div>

              <hr style="border:none;border-top:1px solid #1E293B;margin:0 0 24px 0;">

              <p style="color:#475569;font-size:13px;line-height:1.6;margin:0;">
                Sorularınız için <a href="mailto:info@verimio.com.tr" style="color:#F59E0B;text-decoration:none;">info@verimio.com.tr</a> adresine yazabilirsiniz.<br>
                Bu e-posta <strong style="color:#94A3B8;">${recipientEmail}</strong> adresine gönderilmiştir.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:24px;">
              <p style="color:#334155;font-size:12px;margin:0;">
                © 2026 Verimio · <a href="https://verimio.com.tr" style="color:#475569;text-decoration:none;">verimio.com.tr</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export interface CheckupAnalysis {
  score: number
  score_label: string
  top_opportunity: string
  estimated_saving: string
  summary: string
  recommendations: { title: string; description: string }[]
  roadmap: { month1: string; month2: string; month3: string }
}

export function checkupReportEmailHtml({
  recipientEmail,
  companyName,
  analysis,
  calendlyUrl,
}: {
  recipientEmail: string
  companyName: string
  analysis: CheckupAnalysis
  calendlyUrl?: string
}) {
  const scoreColor = analysis.score >= 7 ? '#4ade80' : analysis.score >= 4 ? '#F59E0B' : '#f87171'

  const recItems = analysis.recommendations
    .map(
      (r, i) => `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #1E293B;">
        <table cellpadding="0" cellspacing="0" width="100%"><tr>
          <td style="width:28px;vertical-align:top;padding-top:2px;">
            <span style="display:inline-block;width:22px;height:22px;background:#F59E0B;border-radius:50%;text-align:center;line-height:22px;color:#020617;font-size:11px;font-weight:700;">${i + 1}</span>
          </td>
          <td style="padding-left:10px;">
            <p style="color:#F1F5F9;font-size:14px;font-weight:600;margin:0 0 4px 0;">${r.title}</p>
            <p style="color:#94A3B8;font-size:13px;margin:0;line-height:1.6;">${r.description}</p>
          </td>
        </tr></table>
      </td>
    </tr>`
    )
    .join('')

  const roadmapItems = [
    { label: 'Ay 1', text: analysis.roadmap.month1, color: '#F59E0B' },
    { label: 'Ay 2', text: analysis.roadmap.month2, color: '#60A5FA' },
    { label: 'Ay 3', text: analysis.roadmap.month3, color: '#4ade80' },
  ]
    .map(
      (m) => `<tr><td style="padding:4px 0;">
      <table cellpadding="0" cellspacing="0" width="100%"><tr>
        <td style="width:44px;vertical-align:top;">
          <span style="display:inline-block;background:${m.color}22;border:1px solid ${m.color}44;color:${m.color};font-size:11px;font-weight:700;padding:3px 8px;border-radius:20px;">${m.label}</span>
        </td>
        <td style="padding-left:12px;">
          <p style="color:#94A3B8;font-size:13px;margin:0;line-height:1.6;padding-top:2px;">${m.text}</p>
        </td>
      </tr></table>
    </td></tr>`
    )
    .join('')

  return `<!DOCTYPE html>
<html lang="tr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>AI Hazırlık Raporunuz — Verimio</title></head>
<body style="margin:0;padding:0;background-color:#020617;font-family:'DM Sans',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#020617;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td style="padding-bottom:32px;">
          <span style="font-size:24px;font-weight:700;letter-spacing:-0.5px;">
            <span style="color:#F1F5F9;">verim</span><span style="color:#F59E0B;">io</span>
          </span>
        </td></tr>

        <tr><td style="background-color:#0F172A;border-radius:16px 16px 0 0;padding:36px 40px 28px;border:1px solid #1E293B;border-bottom:none;">
          <p style="color:#94A3B8;font-size:13px;margin:0 0 8px 0;text-transform:uppercase;letter-spacing:1px;">AI Hazırlık Analizi</p>
          <h1 style="color:#F1F5F9;font-size:26px;font-weight:700;margin:0 0 12px 0;line-height:1.3;">${companyName} için Raporunuz Hazır</h1>
          <p style="color:#94A3B8;font-size:15px;line-height:1.7;margin:0;">${analysis.summary}</p>
        </td></tr>

        <tr><td style="background-color:#0F172A;padding:20px 40px 28px;border-left:1px solid #1E293B;border-right:1px solid #1E293B;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#1E293B;border-radius:12px;padding:20px 24px;">
            <tr><td>
              <table cellpadding="0" cellspacing="0"><tr>
                <td style="padding-right:20px;">
                  <span style="font-size:48px;font-weight:700;color:${scoreColor};line-height:1;">${analysis.score}</span>
                  <span style="font-size:20px;color:#475569;">/10</span>
                </td>
                <td>
                  <p style="color:#F1F5F9;font-size:15px;font-weight:600;margin:0 0 4px 0;">AI Hazırlık Skoru</p>
                  <p style="color:${scoreColor};font-size:13px;font-weight:600;margin:0;">${analysis.score_label}</p>
                </td>
              </tr></table>
              <p style="color:#94A3B8;font-size:13px;margin:14px 0 0 0;line-height:1.6;">
                <strong style="color:#F59E0B;">En büyük fırsat:</strong> ${analysis.top_opportunity}<br>
                <strong style="color:#F59E0B;">Tahmini kazanım:</strong> ${analysis.estimated_saving}
              </p>
            </td></tr>
          </table>
        </td></tr>

        <tr><td style="background-color:#0F172A;padding:0 40px 28px;border-left:1px solid #1E293B;border-right:1px solid #1E293B;">
          <p style="color:#F1F5F9;font-size:15px;font-weight:600;margin:0 0 4px 0;">Önerilen Aksiyonlar</p>
          <table width="100%" cellpadding="0" cellspacing="0">${recItems}</table>
        </td></tr>

        <tr><td style="background-color:#0F172A;padding:0 40px 28px;border-left:1px solid #1E293B;border-right:1px solid #1E293B;">
          <p style="color:#F1F5F9;font-size:15px;font-weight:600;margin:0 0 16px 0;">90 Günlük Yol Haritası</p>
          <table width="100%" cellpadding="0" cellspacing="0">${roadmapItems}</table>
        </td></tr>

        <tr><td style="background-color:#0F172A;border-radius:0 0 16px 16px;padding:0 40px 36px;border:1px solid #1E293B;border-top:none;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#1E293B;border-radius:12px;padding:24px;">
            <tr><td>
              <p style="color:#F1F5F9;font-size:15px;font-weight:600;margin:0 0 8px 0;">Sonraki adımı konuşalım</p>
              <p style="color:#94A3B8;font-size:13px;line-height:1.6;margin:0 0 20px 0;">Bu raporu birlikte inceleyip şirketinize özel uygulama planını oluşturmak için 20 dakikalık ücretsiz bir görüşme ayarlayabilirsiniz.</p>
              ${
                calendlyUrl
                  ? `<table cellpadding="0" cellspacing="0"><tr><td style="background-color:#F59E0B;border-radius:8px;"><a href="${calendlyUrl}" target="_blank" style="display:inline-block;padding:12px 24px;color:#020617;font-weight:700;font-size:14px;text-decoration:none;">Ücretsiz Görüşme Planla →</a></td></tr></table>`
                  : `<p style="color:#F59E0B;font-size:13px;margin:0;">Görüşme için: <a href="mailto:info@verimio.com.tr" style="color:#F59E0B;">info@verimio.com.tr</a></p>`
              }
            </td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #1E293B;margin:28px 0 20px 0;">
          <p style="color:#475569;font-size:12px;line-height:1.6;margin:0;">
            Bu rapor <strong style="color:#94A3B8;">${recipientEmail}</strong> adresine gönderilmiştir.<br>
            Sorularınız için <a href="mailto:info@verimio.com.tr" style="color:#F59E0B;text-decoration:none;">info@verimio.com.tr</a>
          </p>
        </td></tr>

        <tr><td style="padding-top:24px;">
          <p style="color:#334155;font-size:12px;margin:0;">© 2026 Verimio · <a href="https://verimio.com.tr" style="color:#475569;text-decoration:none;">verimio.com.tr</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}
