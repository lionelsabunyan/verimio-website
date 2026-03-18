import { NextRequest, NextResponse } from 'next/server'
import { resend, FROM_ADDRESS, REPLY_TO, reportEmailHtml, generalEmailHtml } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { to, type, subject, message, pdfUrl } = body

    if (!to || !type) {
      return NextResponse.json({ error: 'to ve type zorunlu' }, { status: 400 })
    }

    let html: string
    let emailSubject: string

    if (type === 'report') {
      html = reportEmailHtml({ recipientEmail: to, pdfUrl, message })
      emailSubject = subject || 'AI Dönüşüm Analiz Raporunuz Hazır — Verimio'
    } else {
      if (!subject || !message) {
        return NextResponse.json({ error: 'subject ve message zorunlu' }, { status: 400 })
      }
      html = generalEmailHtml({ recipientEmail: to, subject, message })
      emailSubject = subject
    }

    const { data, error } = await resend.emails.send({
      from: FROM_ADDRESS,
      reply_to: REPLY_TO,
      to: [to],
      subject: emailSubject,
      html,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: data?.id })
  } catch (err) {
    console.error('send-email error:', err)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
