import { Resend } from 'resend'
import { render } from 'react-email'
import { createElement } from 'react'

let _resend: Resend | null = null
export function getResend() {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY)
  return _resend
}

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
<body style="margin:0;padding:0;background-color:#FFFFFF;font-family:'PP Neue Montreal',system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Logo -->
          <tr>
            <td style="padding-bottom:32px;">
              <span style="font-size:24px;font-weight:700;letter-spacing:-0.5px;color:#0A0A0A;">
                verimio
              </span>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background-color:#FFFFFF;border-radius:16px;padding:40px;border:1px solid #E5E5E5;">

              <p style="color:#A3A3A3;font-size:14px;margin:0 0 8px 0;text-transform:uppercase;letter-spacing:1px;">AI Dönüşüm Analizi</p>
              <h1 style="color:#0A0A0A;font-size:28px;font-weight:700;margin:0 0 24px 0;line-height:1.3;">
                Raporunuz Hazır
              </h1>

              <p style="color:#5C5C5C;font-size:16px;line-height:1.7;margin:0 0 32px 0;">
                ${message || defaultMessage}
              </p>

              ${
                pdfUrl
                  ? `<table cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr>
                  <td style="background-color:#0A0A0A;border-radius:8px;">
                    <a href="${pdfUrl}" target="_blank"
                       style="display:inline-block;padding:14px 28px;color:#FFFFFF;font-weight:700;font-size:15px;text-decoration:none;letter-spacing:-0.2px;">
                      Raporu İncele →
                    </a>
                  </td>
                </tr>
              </table>`
                  : ''
              }

              <hr style="border:none;border-top:1px solid #E5E5E5;margin:0 0 24px 0;">

              <p style="color:#A3A3A3;font-size:13px;line-height:1.6;margin:0;">
                Sorularınız için <a href="mailto:info@verimio.com.tr" style="color:#0A0A0A;text-decoration:underline;">info@verimio.com.tr</a> adresine yazabilirsiniz.<br>
                Bu e-posta <strong style="color:#5C5C5C;">${recipientEmail}</strong> adresine gönderilmiştir.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:24px;">
              <p style="color:#A3A3A3;font-size:12px;margin:0;line-height:1.6;">
                © 2026 Verimio · <a href="https://verimio.com.tr" style="color:#A3A3A3;text-decoration:none;">verimio.com.tr</a>
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
<body style="margin:0;padding:0;background-color:#FFFFFF;font-family:'PP Neue Montreal',system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Logo -->
          <tr>
            <td style="padding-bottom:32px;">
              <span style="font-size:24px;font-weight:700;letter-spacing:-0.5px;color:#0A0A0A;">
                verimio
              </span>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background-color:#FFFFFF;border-radius:16px;padding:40px;border:1px solid #E5E5E5;">
              <h1 style="color:#0A0A0A;font-size:24px;font-weight:700;margin:0 0 24px 0;line-height:1.3;">
                ${subject}
              </h1>

              <div style="color:#5C5C5C;font-size:16px;line-height:1.8;margin:0 0 32px 0;white-space:pre-line;">
                ${message}
              </div>

              <hr style="border:none;border-top:1px solid #E5E5E5;margin:0 0 24px 0;">

              <p style="color:#A3A3A3;font-size:13px;line-height:1.6;margin:0;">
                Sorularınız için <a href="mailto:info@verimio.com.tr" style="color:#0A0A0A;text-decoration:underline;">info@verimio.com.tr</a> adresine yazabilirsiniz.<br>
                Bu e-posta <strong style="color:#5C5C5C;">${recipientEmail}</strong> adresine gönderilmiştir.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:24px;">
              <p style="color:#A3A3A3;font-size:12px;margin:0;">
                © 2026 Verimio · <a href="https://verimio.com.tr" style="color:#A3A3A3;text-decoration:none;">verimio.com.tr</a>
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
  timeline_label?: string
  summary: string
  recommendations: { title: string; description: string }[]
  roadmap: { phase1: string; phase2?: string | null; phase3?: string | null }
  consultant_guide?: {
    sector_context: string
    research_topics: string[]
    suggested_tools: string[]
    call_prep: string
    quick_wins: string[]
  }
}

// React Email tabanl\u0131 modern template — src/emails/CheckupReportEmail.tsx component'i kullan\u0131r.
// HTML render i\u015flemi async; \u00e7a\u011f\u0131ranlar await etmelidir.
export async function checkupReportEmailHtml(props: {
  recipientEmail: string
  companyName: string
  analysis: CheckupAnalysis
  calendlyUrl?: string
}): Promise<string> {
  const { default: CheckupReportEmail } = await import('@/emails/CheckupReportEmail')
  return render(createElement(CheckupReportEmail, props), { pretty: false })
}
