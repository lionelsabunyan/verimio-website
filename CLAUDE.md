# Verimio Admin Dashboard — CLAUDE.md

Bu dosya Claude Code'un her session'da projeyi sıfırdan öğrenmesi gerekmeden devam etmesi için yazılmıştır.

---

## Proje Özeti

Verimio — Türk KOBİ'lerine AI danışmanlığı yapan şirket (Sedat tarafından işletiliyor).
Ana site: `verimio.com.tr` → Next.js, Vercel'de deploy.
Bu repo: `verimio-website` — hem ana site hem admin dashboard.

**Admin panel:** `/admin/*` — şifre korumalı, sadece Sedat kullanıyor.
**Canlı URL:** `https://verimio-website-201mydlhm-lionels-projects-b9ad704e.vercel.app`
**Admin giriş:** `lionelsabunyan@gmail.com` / `@Redline81!.`

---

## Tech Stack

| Katman | Teknoloji |
|--------|-----------|
| Framework | Next.js 16.1.6, App Router, React 19 |
| Styling | Tailwind CSS v4 (`@theme inline` globals.css'de, tailwind.config.js YOK) |
| DB & Auth | Supabase (`njxgikhrhxvfveywvsuh`) — eu-central-1 |
| AI Görsel/Video | fal.ai (direct fetch, SDK kullanılmıyor) |
| AI İçerik | Anthropic Claude API |
| Animasyon | Framer Motion |
| Grafikler | Recharts |
| Deploy | Vercel (GitHub push → auto deploy) |
| Email | Resend |
| Otomasyon | n8n (`https://d54ei7xd.rpcld.com`) |

---

## Supabase Bilgileri

- **Project ID:** `njxgikhrhxvfveywvsuh`
- **URL:** `https://njxgikhrhxvfveywvsuh.supabase.co`
- **Region:** eu-central-1
- **Anon Key:** `.env.local` dosyasında `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Tablolar

```
leads           → Tally.so formdan gelen lead'ler (ana tablo, 257+ satır)
social_posts    → Sosyal medya post taslakları (draft/scheduled/published)
media_assets    → fal.ai ile üretilen görsel/videolar (Supabase Storage URL)
content_drafts  → Claude ile üretilen blog/script taslakları
meetings        → Calendly toplantıları (lead_id FK)
```

---

## Dosya Yapısı

```
src/
├── app/
│   ├── layout.tsx                    → Root layout (NavbarWrapper ile admin'de navbar/footer gizlenir)
│   ├── admin/
│   │   ├── layout.tsx                → Admin shell: sidebar + children
│   │   ├── login/page.tsx            → Email + şifre girişi (magic link YOK)
│   │   ├── page.tsx                  → Dashboard (KPI + grafik + son leadler)
│   │   ├── crm/page.tsx              → Lead listesi
│   │   ├── crm/[id]/page.tsx         → Lead detay
│   │   ├── meetings/page.tsx         → Calendly toplantıları
│   │   ├── social/page.tsx           → Sosyal medya takvimi
│   │   ├── social/visuals/page.tsx   → fal.ai görsel üretim
│   │   ├── content/page.tsx          → Claude içerik üretimi
│   │   ├── seo/page.tsx              → SEO & Analytics (placeholder, entegrasyon yok)
│   │   ├── video/page.tsx            → Hailuo video üretimi
│   │   ├── reports/page.tsx          → PDF rapor takibi
│   │   └── settings/page.tsx         → API key görünümü
│   └── api/admin/
│       ├── leads/route.ts            → GET (filtreli) + PATCH (status güncelle)
│       ├── generate-image/route.ts   → POST → fal.ai + Supabase media_assets
│       ├── generate-video/route.ts   → POST (queue başlat) + GET (durum sorgula)
│       ├── generate-content/route.ts → POST → Claude API + content_drafts
│       └── social/route.ts           → GET/POST/PATCH/DELETE
├── components/
│   ├── layout/
│   │   ├── NavbarWrapper.tsx         → 'use client', /admin'de Navbar+Footer'ı gizler
│   │   ├── Navbar.tsx                → Ana site navbar
│   │   └── Footer.tsx                → Ana site footer
│   └── admin/
│       ├── Sidebar.tsx               → Admin sol menü (10 öğe, active state)
│       ├── Header.tsx                → Sayfa başlık + logout + hızlı görsel linki
│       ├── DashboardClient.tsx       → KPI kartları + Recharts AreaChart
│       ├── CRMClient.tsx             → Lead tablosu + arama + filtre + status dropdown
│       ├── SocialCalendarClient.tsx  → Post listesi + platform filtre + yeni post modal
│       ├── ImageGeneratorClient.tsx  → fal.ai prompt UI + önceki görseller
│       ├── ContentGeneratorClient.tsx→ Claude tip/konu/keyword formu + taslaklar
│       ├── VideoGeneratorClient.tsx  → Hailuo prompt + async status takibi
│       ├── SEOClient.tsx             → Placeholder (Google Search Console entegre değil)
│       ├── MeetingsClient.tsx        → Yaklaşan/geçmiş toplantı listesi
│       └── SettingsClient.tsx        → Entegrasyon durumları + brand renkler
└── lib/
    ├── supabase/client.ts            → Browser Supabase client (@supabase/ssr)
    ├── supabase/server.ts            → Server Supabase client (@supabase/ssr)
    └── fal.ts                        → FAL_MODELS + IMAGE_SIZES constants
middleware.ts                         → /admin/* → auth check → /admin/login
```

---

## fal.ai Entegrasyon Notu

**SDK kullanılmıyor** — TypeScript uyumsuzluğu nedeniyle direct fetch yapılıyor:
```typescript
// API route'larda şu pattern kullanılıyor:
const res = await fetch(`https://fal.run/${model}`, {
  method: 'POST',
  headers: {
    'Authorization': `Key ${process.env.FAL_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ prompt, ... })
})
```

Video için async queue:
```typescript
// Başlatma: POST https://queue.fal.run/{model}
// Durum: GET https://queue.fal.run/{model}/requests/{request_id}
```

### Modeller
```typescript
RECRAFT_V4: 'fal-ai/recraft/v3/text-to-image'
RECRAFT_V4_SVG: 'fal-ai/recraft/v4/pro/text-to-vector'
FLUX_SCHNELL: 'fal-ai/flux/schnell'
FLUX_DEV: 'fal-ai/flux/dev'
HAILUO: 'fal-ai/minimax/video-01'
VIDU: 'fal-ai/vidu/vidu-q1'
```

---

## Kurumsal Kimlik (Özet)

**Tam kılavuz:** `docs/BRAND.md`

**Logo:** `verim` (beyaz #FFFFFF) + `io` (lime #A3E635) — lowercase, font-weight 700, letter-spacing -0.02em  
**V Monogram:** beyaz V + lime nokta, #2E1065 arka plan  
**Font:** DM Sans (300–700) + DM Mono — Geist kullanma  
**Ana renkler:** Deep Indigo `#2E1065` · Vivid Lime `#A3E635` · Dark Indigo `#1E0A46` · Soft Purple `#8B5CF6`  
**CTA buton:** her zaman lime bg (`#A3E635`) + indigo text (`#2E1065`) + bold  
**Tutarlılık:** yeni component yaparken `docs/BRAND.md` §6.4 kontrol listesine bak  
**Brand preview:** `https://verimio-website.vercel.app/brand-preview?token=verimio2025`

---

## Renk Paleti (Admin Dark Theme)

```
Arka plan:      #0A0616
Kart bg:        #0F0A1E
Border:         #1A1030
Border koyu:    #2E1065
Yazı birincil:  #FFFFFF
Yazı ikincil:   #78716C
Yazı soluk:     #4C4462
Vurgu (lime):   #A3E635
Mor (brand):    #8B5CF6
```

---

## Auth Notu (Önemli!)

Supabase'de kullanıcı SQL ile oluşturuldu. Bu yöntemde hem `auth.users` hem `auth.identities` tablosuna kayıt gerekiyor, aksi halde login çalışmıyor. Şu an kullanıcı doğru kurulu ve login çalışıyor.

---

## .env.local (Canlı değerleri Vercel'de de var)

```
NEXT_PUBLIC_SUPABASE_URL=https://njxgikhrhxvfveywvsuh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
FAL_KEY=c7fe41df-d18e-4e72-9b24-91bc4c4b7ca0:5e679617621a349ed8bb0562065fc9aa
ANTHROPIC_API_KEY=sk-ant-...
RESEND_API_KEY=re_...
N8N_API_URL=https://d54ei7xd.rpcld.com
N8N_API_KEY=...
```

---

## Yapılacaklar (Sıradaki Adımlar)

Sedat ile konuşulan "3. adım" henüz açıklanmadı.

### Bekleyen Entegrasyonlar
- [ ] Google Search Console API bağlantısı (`/admin/seo` şu an placeholder)
- [ ] Calendly webhook → `meetings` tablosuna auto-sync
- [ ] LinkedIn API otomatik paylaşım
- [ ] Twitter/X API otomatik paylaşım
- [ ] `verimio.com.tr` custom domain → Vercel'e bağlanacak

### Bilinen Eksikler
- SEO sayfası gerçek veri göstermiyor
- Mobile responsive tam değil (admin panel masaüstü odaklı)
- Video üretimi Supabase Storage'a kaydedilmiyor (sadece URL tutuluyor)

---

## Geliştirme

```bash
cd verimio-website
npm run dev        # localhost:3000
npm run build      # production build test
git push           # → Vercel otomatik deploy
```

---

*Son güncelleme: 18 Şubat 2026*
