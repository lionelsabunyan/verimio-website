'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState<'password' | 'magic'>('password')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const supabase = createClient()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (mode === 'password') {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setError('Email veya şifre hatalı.')
      } else {
        window.location.href = '/admin'
      }
    } else {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      })
      if (error) {
        setError(error.message)
      } else {
        setSent(true)
      }
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0F0A1E] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-[#A3E635] rounded-lg flex items-center justify-center">
              <span className="text-[#2E1065] font-bold text-lg">V</span>
            </div>
            <span className="text-white text-2xl font-bold tracking-widest">VERIMIO</span>
          </div>
          <p className="text-[#78716C] text-sm">Admin Paneli</p>
        </div>

        <div className="bg-[#1A1030] border border-[#2E1065] rounded-2xl p-8">
          {sent ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-[#A3E635]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#A3E635]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-white text-xl font-semibold mb-2">Link gönderildi!</h2>
              <p className="text-[#78716C] text-sm">
                <span className="text-[#A3E635]">{email}</span> adresine giriş linki gönderildi.
              </p>
            </div>
          ) : (
            <>
              <h1 className="text-white text-xl font-semibold mb-2">Giriş Yap</h1>

              {/* Mod seçici */}
              <div className="flex gap-2 mb-6 bg-[#0F0A1E] rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setMode('password')}
                  className={`flex-1 py-2 rounded-md text-sm transition-all ${mode === 'password' ? 'bg-[#2E1065] text-[#A3E635] font-medium' : 'text-[#4C4462] hover:text-white'}`}
                >
                  Şifre ile Giriş
                </button>
                <button
                  type="button"
                  onClick={() => setMode('magic')}
                  className={`flex-1 py-2 rounded-md text-sm transition-all ${mode === 'magic' ? 'bg-[#2E1065] text-[#A3E635] font-medium' : 'text-[#4C4462] hover:text-white'}`}
                >
                  Magic Link
                </button>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm text-[#78716C] mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="lionelsabunyan@gmail.com"
                    required
                    className="w-full bg-[#0F0A1E] border border-[#2E1065] rounded-lg px-4 py-3 text-white placeholder-[#4C4462] focus:outline-none focus:border-[#8B5CF6] transition-colors"
                  />
                </div>

                {mode === 'password' && (
                  <div>
                    <label className="block text-sm text-[#78716C] mb-2">Şifre</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full bg-[#0F0A1E] border border-[#2E1065] rounded-lg px-4 py-3 text-white placeholder-[#4C4462] focus:outline-none focus:border-[#8B5CF6] transition-colors"
                    />
                  </div>
                )}

                {error && (
                  <p className="text-red-400 text-sm bg-red-400/10 rounded-lg px-4 py-2">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#A3E635] text-[#2E1065] font-semibold py-3 rounded-lg hover:bg-[#b4f045] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading
                    ? 'Giriş yapılıyor...'
                    : mode === 'password' ? 'Giriş Yap' : 'Link Gönder'}
                </button>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </div>
  )
}
