'use client'
export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const supabase = createClient()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError('Email veya şifre hatalı.')
    } else {
      window.location.href = '/admin'
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
          <h1 className="text-white text-xl font-semibold mb-6">Giriş Yap</h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-[#78716C] mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email adresiniz"
                required
                autoComplete="email"
                className="w-full bg-[#0F0A1E] border border-[#2E1065] rounded-lg px-4 py-3 text-white placeholder-[#4C4462] focus:outline-none focus:border-[#8B5CF6] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-[#78716C] mb-2">Şifre</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                className="w-full bg-[#0F0A1E] border border-[#2E1065] rounded-lg px-4 py-3 text-white placeholder-[#4C4462] focus:outline-none focus:border-[#8B5CF6] transition-colors"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm bg-red-400/10 rounded-lg px-4 py-2">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#A3E635] text-[#2E1065] font-semibold py-3 rounded-lg hover:bg-[#b4f045] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
