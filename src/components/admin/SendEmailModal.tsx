'use client'

import { useState } from 'react'

type EmailType = 'report' | 'general'

interface Props {
  leadEmail: string
  pdfUrl?: string
  onClose: () => void
}

export default function SendEmailModal({ leadEmail, pdfUrl, onClose }: Props) {
  const [type, setType] = useState<EmailType>(pdfUrl ? 'report' : 'general')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState<'success' | 'error' | null>(null)

  async function handleSend() {
    setSending(true)
    setResult(null)

    try {
      const res = await fetch('/api/admin/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: leadEmail,
          type,
          pdfUrl: type === 'report' ? pdfUrl : undefined,
          subject: subject || undefined,
          message: message || undefined,
        }),
      })
      const data = await res.json()
      setResult(data.success ? 'success' : 'error')
    } catch {
      setResult('error')
    } finally {
      setSending(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 w-full max-w-lg mx-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-semibold text-lg">Email Gönder</h2>
          <button onClick={onClose} className="text-[#475569] hover:text-white transition-colors text-xl">
            ✕
          </button>
        </div>

        {/* Alıcı */}
        <div className="mb-4">
          <label className="block text-[#94A3B8] text-xs uppercase tracking-wider mb-2">Alıcı</label>
          <div className="bg-[#1E293B] rounded-lg px-4 py-3 text-[#F59E0B] text-sm font-mono">
            {leadEmail}
          </div>
        </div>

        {/* Tip seçimi */}
        <div className="mb-4">
          <label className="block text-[#94A3B8] text-xs uppercase tracking-wider mb-2">Email Tipi</label>
          <div className="flex gap-2">
            <button
              onClick={() => setType('report')}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                type === 'report'
                  ? 'bg-[#F59E0B] text-[#020617]'
                  : 'bg-[#1E293B] text-[#94A3B8] hover:text-white'
              }`}
            >
              Rapor Gönder
            </button>
            <button
              onClick={() => setType('general')}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                type === 'general'
                  ? 'bg-[#F59E0B] text-[#020617]'
                  : 'bg-[#1E293B] text-[#94A3B8] hover:text-white'
              }`}
            >
              Genel Mesaj
            </button>
          </div>
        </div>

        {/* Rapor tipi bilgi */}
        {type === 'report' && pdfUrl && (
          <div className="mb-4 bg-[#1E293B] rounded-lg px-4 py-3 flex items-center gap-2">
            <span className="text-green-400 text-sm">✓</span>
            <span className="text-[#94A3B8] text-sm">PDF bağlantısı otomatik eklenecek</span>
          </div>
        )}
        {type === 'report' && !pdfUrl && (
          <div className="mb-4 bg-[#1E293B] rounded-lg px-4 py-3 flex items-center gap-2">
            <span className="text-yellow-400 text-sm">⚠</span>
            <span className="text-[#94A3B8] text-sm">Bu lead için PDF henüz eklenmemiş</span>
          </div>
        )}

        {/* Konu (opsiyonel rapor için, zorunlu genel için) */}
        <div className="mb-4">
          <label className="block text-[#94A3B8] text-xs uppercase tracking-wider mb-2">
            Konu {type === 'general' && <span className="text-red-400">*</span>}
            {type === 'report' && <span className="text-[#475569]">(opsiyonel)</span>}
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder={
              type === 'report'
                ? 'AI Dönüşüm Analiz Raporunuz Hazır — Verimio'
                : 'Email konusu...'
            }
            className="w-full bg-[#1E293B] border border-[#1E293B] focus:border-[#F59E0B] rounded-lg px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-[#334155]"
          />
        </div>

        {/* Mesaj */}
        <div className="mb-6">
          <label className="block text-[#94A3B8] text-xs uppercase tracking-wider mb-2">
            Mesaj {type === 'general' && <span className="text-red-400">*</span>}
            {type === 'report' && <span className="text-[#475569]">(opsiyonel)</span>}
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            placeholder={
              type === 'report'
                ? 'AI dönüşüm analizinizi tamamladık. Raporunuzu aşağıdaki bağlantıdan inceleyebilirsiniz.'
                : 'Mesajınızı yazın...'
            }
            className="w-full bg-[#1E293B] border border-[#1E293B] focus:border-[#F59E0B] rounded-lg px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-[#334155] resize-none"
          />
        </div>

        {/* Sonuç mesajı */}
        {result === 'success' && (
          <div className="mb-4 bg-green-400/10 border border-green-400/20 rounded-lg px-4 py-3 text-green-400 text-sm">
            Email başarıyla gönderildi ✓
          </div>
        )}
        {result === 'error' && (
          <div className="mb-4 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3 text-red-400 text-sm">
            Gönderilemedi. RESEND_API_KEY ve domain ayarlarını kontrol et.
          </div>
        )}

        {/* Butonlar */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-lg bg-[#1E293B] text-[#94A3B8] hover:text-white text-sm font-medium transition-colors"
          >
            İptal
          </button>
          <button
            onClick={handleSend}
            disabled={sending || (type === 'general' && (!subject || !message))}
            className="flex-1 py-3 rounded-lg bg-[#F59E0B] text-[#020617] font-bold text-sm hover:bg-[#FBBF24] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {sending ? 'Gönderiliyor...' : 'Gönder'}
          </button>
        </div>
      </div>
    </div>
  )
}
