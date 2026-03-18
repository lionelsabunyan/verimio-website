import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

export const FROM_ADDRESS = 'Verimio <info@verimio.com.tr>'

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
