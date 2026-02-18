'use client'

import { motion } from 'framer-motion'

const INTEGRATIONS = [
  {
    name: 'fal.ai',
    icon: '🎨',
    desc: 'Görsel ve video üretimi',
    status: 'connected',
    env: 'FAL_KEY',
    docs: 'https://fal.ai/dashboard',
  },
  {
    name: 'Supabase',
    icon: '🗄️',
    desc: 'Veritabanı ve dosya depolama',
    status: 'connected',
    env: 'NEXT_PUBLIC_SUPABASE_URL',
    docs: 'https://supabase.com/dashboard',
  },
  {
    name: 'Anthropic (Claude)',
    icon: '🤖',
    desc: 'İçerik ve analiz üretimi',
    status: 'connected',
    env: 'ANTHROPIC_API_KEY',
    docs: 'https://console.anthropic.com',
  },
  {
    name: 'Resend',
    icon: '📧',
    desc: 'Email gönderimi',
    status: 'connected',
    env: 'RESEND_API_KEY',
    docs: 'https://resend.com/dashboard',
  },
  {
    name: 'n8n',
    icon: '⚙️',
    desc: 'Workflow otomasyonu',
    status: 'connected',
    env: 'N8N_API_URL',
    docs: 'https://d54ei7xd.rpcld.com',
  },
  {
    name: 'Google Search Console',
    icon: '📊',
    desc: 'SEO ve trafik takibi',
    status: 'pending',
    env: 'GOOGLE_SEARCH_CONSOLE_KEY',
    docs: 'https://search.google.com/search-console',
  },
  {
    name: 'Google Analytics 4',
    icon: '📈',
    desc: 'Site analytics',
    status: 'pending',
    env: 'NEXT_PUBLIC_GA_ID',
    docs: 'https://analytics.google.com',
  },
  {
    name: 'Calendly',
    icon: '📅',
    desc: 'Toplantı takvimi webhook',
    status: 'pending',
    env: 'CALENDLY_API_KEY',
    docs: 'https://calendly.com/integrations',
  },
  {
    name: 'LinkedIn API',
    icon: '💼',
    desc: 'Otomatik post paylaşımı',
    status: 'pending',
    env: 'LINKEDIN_ACCESS_TOKEN',
    docs: 'https://www.linkedin.com/developers',
  },
]

const BRAND = [
  { label: 'Deep Indigo', value: '#2E1065', type: 'color' },
  { label: 'Vivid Lime', value: '#A3E635', type: 'color' },
  { label: 'Gradient Purple', value: '#8B5CF6', type: 'color' },
  { label: 'Site URL', value: 'verimio.com.tr', type: 'text' },
  { label: 'Admin Email', value: 'sedat@verimio.com.tr', type: 'text' },
]

export default function SettingsClient() {
  return (
    <main className="flex-1 p-6 space-y-6">
      {/* Entegrasyonlar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0F0A1E] border border-[#1A1030] rounded-xl overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-[#1A1030]">
          <h2 className="text-white font-medium">Entegrasyonlar</h2>
        </div>
        <div className="divide-y divide-[#1A1030]">
          {INTEGRATIONS.map((int, i) => (
            <motion.div
              key={int.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-center gap-4 px-6 py-4"
            >
              <span className="text-2xl w-8 text-center">{int.icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm font-medium">{int.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    int.status === 'connected'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {int.status === 'connected' ? '● Bağlı' : '○ Bekliyor'}
                  </span>
                </div>
                <p className="text-[#4C4462] text-xs mt-0.5">{int.desc} · <code className="text-[#78716C]">{int.env}</code></p>
              </div>
              <a
                href={int.docs}
                target="_blank"
                rel="noopener"
                className="text-[#78716C] hover:text-[#A3E635] text-xs transition-colors"
              >
                Dashboard ↗
              </a>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Brand Renkleri */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-[#0F0A1E] border border-[#1A1030] rounded-xl p-6"
      >
        <h2 className="text-white font-medium mb-4">Brand Kimlik</h2>
        <div className="grid grid-cols-3 gap-4">
          {BRAND.filter(b => b.type === 'color').map((b) => (
            <div key={b.label} className="flex items-center gap-3 p-3 bg-[#1A1030] rounded-xl">
              <div className="w-8 h-8 rounded-lg border border-white/10 flex-shrink-0" style={{ backgroundColor: b.value }} />
              <div>
                <div className="text-white text-sm">{b.label}</div>
                <div className="text-[#4C4462] text-xs font-mono">{b.value}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          {BRAND.filter(b => b.type === 'text').map((b) => (
            <div key={b.label} className="p-3 bg-[#1A1030] rounded-xl">
              <div className="text-[#4C4462] text-xs mb-1">{b.label}</div>
              <div className="text-white text-sm">{b.value}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* .env.local notu */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-[#1A1030] border border-[#2E1065] rounded-xl p-5"
      >
        <h3 className="text-[#A3E635] text-sm font-medium mb-2">📁 .env.local Dosyası</h3>
        <p className="text-[#78716C] text-sm leading-relaxed">
          API anahtarlarını <code className="bg-[#0F0A1E] px-1.5 py-0.5 rounded text-[#A3E635] text-xs">verimio-website/.env.local</code> dosyasında sakla.
          Yeni bir entegrasyon eklerken bu dosyaya ekle ve Next.js'i yeniden başlat.
        </p>
      </motion.div>
    </main>
  )
}
