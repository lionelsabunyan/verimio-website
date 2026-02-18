'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface HeaderProps {
  title: string
  subtitle?: string
}

export default function Header({ title, subtitle }: HeaderProps) {
  const router = useRouter()
  const supabase = createClient()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  return (
    <header className="h-16 border-b border-[#1A1030] bg-[#0F0A1E]/80 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-10">
      <div>
        <h1 className="text-white font-semibold">{title}</h1>
        {subtitle && <p className="text-[#4C4462] text-xs">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        {/* Hızlı aksiyonlar */}
        <a
          href="/admin/social/visuals"
          className="flex items-center gap-1.5 text-xs bg-[#A3E635]/10 text-[#A3E635] hover:bg-[#A3E635]/20 px-3 py-1.5 rounded-lg transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Görsel Üret
        </a>

        {/* Çıkış */}
        <button
          onClick={handleLogout}
          className="text-[#4C4462] hover:text-white transition-colors p-2 rounded-lg hover:bg-[#1A1030]"
          title="Çıkış Yap"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </header>
  )
}
