'use client'

import { motion } from 'framer-motion'

const SETUP_STEPS = [
  {
    step: '1',
    title: 'Google Search Console Hesabı Aç',
    desc: 'search.google.com/search-console adresine git',
    action: 'https://search.google.com/search-console',
    actionLabel: 'Aç ↗',
    done: false,
  },
  {
    step: '2',
    title: 'verimio.com.tr Sitesini Ekle',
    desc: 'URL prefix yöntemi ile ekle, DNS doğrulaması seç',
    action: null,
    actionLabel: null,
    done: false,
  },
  {
    step: '3',
    title: 'Sitemap Gönder',
    desc: '/sitemap.xml adresini Search Console\'a ekle',
    action: null,
    actionLabel: null,
    done: false,
  },
  {
    step: '4',
    title: 'Google Analytics 4 Kur',
    desc: 'analytics.google.com → GA4 property oluştur → measurement ID al',
    action: 'https://analytics.google.com',
    actionLabel: 'Aç ↗',
    done: false,
  },
  {
    step: '5',
    title: 'GA4 ID\'yi .env.local\'a Ekle',
    desc: 'NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX olarak ekle, ben entegre edeceğim',
    action: null,
    actionLabel: null,
    done: false,
  },
]

const KEYWORD_TARGETS = [
  { keyword: 'AI danışmanlık Türkiye', difficulty: 'Orta', volume: '~500/ay', priority: 'Yüksek' },
  { keyword: 'KOBİ otomasyon', difficulty: 'Düşük', volume: '~200/ay', priority: 'Yüksek' },
  { keyword: 'iş süreç otomasyonu', difficulty: 'Orta', volume: '~1K/ay', priority: 'Orta' },
  { keyword: 'ChatGPT iş kullanımı', difficulty: 'Yüksek', volume: '~5K/ay', priority: 'Orta' },
  { keyword: 'yapay zeka danışmanlık', difficulty: 'Orta', volume: '~800/ay', priority: 'Yüksek' },
  { keyword: 'dijital dönüşüm KOBİ', difficulty: 'Düşük', volume: '~300/ay', priority: 'Yüksek' },
]

export default function SEOClient() {
  return (
    <main className="flex-1 p-6 space-y-6">
      {/* Durum Uyarısı */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-5 flex items-start gap-4"
      >
        <span className="text-2xl">⚠️</span>
        <div>
          <h3 className="text-yellow-400 font-medium mb-1">Google Search Console henüz bağlı değil</h3>
          <p className="text-yellow-400/70 text-sm">
            Aşağıdaki adımları tamamla, API bağlantısı yapıp gerçek veriler gösterelim.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-6">
        {/* Kurulum Adımları */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#0F0A1E] border border-[#1A1030] rounded-xl p-6"
        >
          <h2 className="text-white font-medium mb-5">Kurulum Adımları</h2>
          <div className="space-y-4">
            {SETUP_STEPS.map((step, i) => (
              <div key={step.step} className="flex items-start gap-4">
                <div className="w-7 h-7 rounded-full bg-[#2E1065] border border-[#4C4462] flex items-center justify-center flex-shrink-0 text-xs text-[#78716C] font-medium">
                  {step.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-white text-sm font-medium">{step.title}</h3>
                  <p className="text-[#4C4462] text-xs mt-0.5">{step.desc}</p>
                  {step.action && (
                    <a
                      href={step.action}
                      target="_blank"
                      rel="noopener"
                      className="inline-block mt-1.5 text-xs text-[#A3E635] hover:underline"
                    >
                      {step.actionLabel}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Hedef Keywordler */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#0F0A1E] border border-[#1A1030] rounded-xl p-6"
        >
          <h2 className="text-white font-medium mb-5">Hedef Keyword'ler</h2>
          <div className="space-y-2">
            {KEYWORD_TARGETS.map((kw) => (
              <div key={kw.keyword} className="flex items-center gap-3 py-2 border-b border-[#1A1030] last:border-0">
                <div className="flex-1">
                  <span className="text-white text-sm">{kw.keyword}</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  kw.difficulty === 'Düşük' ? 'bg-green-500/20 text-green-400' :
                  kw.difficulty === 'Orta' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {kw.difficulty}
                </span>
                <span className="text-[#4C4462] text-xs w-20 text-right">{kw.volume}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  kw.priority === 'Yüksek' ? 'bg-[#A3E635]/20 text-[#A3E635]' : 'bg-[#1A1030] text-[#4C4462]'
                }`}>
                  {kw.priority}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Placeholder Metrikler */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-[#0F0A1E] border border-[#1A1030] rounded-xl p-6"
      >
        <h2 className="text-white font-medium mb-4">Metrikler (GSC bağlandıktan sonra)</h2>
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Toplam Tıklama', value: '—', icon: '🖱️' },
            { label: 'İmpression', value: '—', icon: '👁️' },
            { label: 'Ort. Pozisyon', value: '—', icon: '📍' },
            { label: 'CTR', value: '—', icon: '%' },
          ].map((m) => (
            <div key={m.label} className="bg-[#1A1030] rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">{m.icon}</div>
              <div className="text-2xl font-bold text-[#4C4462] mb-1">{m.value}</div>
              <div className="text-[#4C4462] text-xs">{m.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </main>
  )
}
