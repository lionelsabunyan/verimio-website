# Verimio — CLAUDE.md

Türk KOBİ'lerine AI danışmanlığı yapan şirket. Bu repo hem ana siteyi hem admin dashboard'u içerir.
*Son güncelleme: 12 Mart 2026*

---

## Proje Özeti

- **Site:** `verimio.com.tr` (Türkçe, tr-TR)
- **Repo:** `verimio-website` — Next.js App Router
- **Deploy:** Vercel, GitHub push → otomatik deploy
- **Admin panel:** `/admin/*` — şifre korumalı, tek kullanıcı
- **Credential'lar:** `.env.local` dosyasında — ASLA CLAUDE.md'ye veya commit'e ekleme

---

## Tech Stack

| Katman | Teknoloji |
|--------|-----------|
| Framework | Next.js 16.1.6, App Router, React 19 |
| Styling | Tailwind CSS v4 (`@theme inline`, tailwind.config.js YOK) |
| DB & Auth | Supabase (eu-central-1) |
| Blog | MDX (next-mdx-remote + gray-matter) |
| AI Görsel | fal.ai (direct fetch, SDK kullanılmıyor) |
| AI İçerik | Anthropic Claude API |
| SEO | JSON-LD schemas, sitemap.ts, robots.ts, OG images |
| Analytics | Google Analytics (googleapis) |
| Animasyon | Framer Motion |
| Grafikler | Recharts |
| Email | Resend |

---

## Geliştirme

```bash
cd verimio-website
npm run dev        # localhost:3000
npm run build      # production build test
git push origin main  # → Vercel otomatik deploy
```

---

## Dosya Yapısı

```
src/
├── app/
│   ├── layout.tsx                     → Root layout + metadata + OrganizationSchema
│   ├── page.tsx                       → Ana sayfa
│   ├── robots.ts                      → Crawl kuralları
│   ├── sitemap.ts                     → Dinamik sitemap (statik + blog)
│   ├── opengraph-image.tsx            → Root OG image (1200x630)
│   ├── blog/
│   │   ├── page.tsx                   → Blog listing
│   │   └── [slug]/
│   │       ├── page.tsx               → MDX render + schema
│   │       └── opengraph-image.tsx    → Dinamik per-post OG
│   ├── analiz/page.tsx                → Check-up formu
│   ├── feed.xml/route.ts              → RSS 2.0
│   ├── admin/
│   │   ├── layout.tsx                 → Admin shell (sidebar + header)
│   │   ├── login/page.tsx             → Auth
│   │   ├── page.tsx                   → Dashboard (KPI + grafikler)
│   │   ├── crm/                       → Lead yönetimi
│   │   ├── social/                    → Sosyal medya takvimi + agency
│   │   ├── content/                   → İçerik üretimi + pipeline + suggestions
│   │   ├── command/                   → Command Center (jobs, agents, pipelines, approvals)
│   │   ├── meetings/                  → Calendly toplantıları
│   │   ├── seo/                       → SEO dashboard
│   │   ├── brand/                     → Marka yönetimi
│   │   ├── video/                     → Video üretimi
│   │   ├── reports/                   → PDF rapor takibi
│   │   ├── settings/                  → Entegrasyon ayarları
│   │   └── bfg/                       → BFG alt-proje paneli
│   └── api/admin/
│       ├── leads/route.ts             → GET + PATCH
│       ├── generate-image/route.ts    → fal.ai
│       ├── generate-video/route.ts    → Hailuo async queue
│       ├── generate-content/route.ts  → Claude API
│       ├── social/route.ts            → CRUD
│       ├── agency/                    → Sosyal medya agency API'leri
│       ├── command/                   → Command Center API'leri
│       ├── content-suggestions/       → AI içerik önerileri
│       ├── publish-draft/             → Draft yayınlama
│       └── publish-suggestion/        → Öneri yayınlama
├── components/
│   ├── layout/     → Navbar, Footer, NavbarWrapper
│   ├── sections/   → Ana sayfa bölümleri (Hero, Services, FAQ, vb.)
│   ├── seo/        → OrganizationSchema, BreadcrumbSchema, ArticleSchema, FAQSchema
│   ├── brand/      → BlogCoverImage, sosyal medya templates
│   ├── form/       → Tally form bileşenleri
│   ├── ui/         → Genel UI bileşenleri
│   ├── providers/  → Context providers
│   └── admin/      → Tüm admin panel bileşenleri + command/ alt klasörü
├── lib/
│   ├── constants.ts    → TÜM içerik/copy merkezi (blog listesi dahil)
│   ├── supabase/       → client.ts + server.ts (@supabase/ssr)
│   └── fal.ts          → FAL_MODELS + IMAGE_SIZES
├── content/blog/       → MDX dosyaları (15 yazı)
└── middleware.ts        → /admin/* auth kontrolü
```

---

## SEO Altyapısı (Özet)

**Detaylı rehber:** `docs/SEO-GEO.md`

Mevcut SEO altyapısı:

| Dosya | İşlev |
|-------|-------|
| `robots.ts` | /admin, /api, /brand-preview engelleme |
| `sitemap.ts` | 9 statik sayfa + dinamik blog URL'leri |
| `feed.xml/route.ts` | RSS 2.0 feed |
| `opengraph-image.tsx` | Root + per-post OG (1200x630) |
| `components/seo/*` | 4 JSON-LD schema (Organization, Breadcrumb, Article, FAQ) |
| `layout.tsx` | Canonical, hreflang tr-TR, twitter card |
| `next.config.ts` | non-www→www 301, güvenlik header'ları, cache |

### Yeni Sayfa Checklist

1. `metadata` export'u ekle (title, description, canonical)
2. Uygun schema bileşeni kullan (Article, FAQ, vb.)
3. Tek `h1`, doğru `h2/h3` hiyerarşisi
4. `inLanguage: "tr-TR"` her schema'da
5. Blog ise: MDX + webp kapak (1200x630) + `constants.ts` BLOG_POSTS'a ekle
6. `sitemap.ts` otomatik çeker — manual ekleme gerekmez

---

## Blog Sistemi

**15 yazı yayında** — MDX tabanlı (`src/content/blog/*.mdx`)

Render: `next-mdx-remote` + `gray-matter` frontmatter parsing
Kapak görseli: `BlogCoverImage` bileşeni (webp varsa Image, yoksa SVG fallback)
Görseller: `public/images/blog/{slug}.webp` (fal.ai Recraft V3)

### Blog Slug Listesi

| # | Slug | Kategori | Tarih |
|---|------|----------|-------|
| 1 | `excelden-yapay-zekaya-raporlama-otomasyonu-ile-hata-payini-s` | automation | 12 Mar |
| 2 | `ai-donusumu-bir-it-projesi-degil-bir-yonetim-vizyonudur` | strategy | 12 Mar |
| 3 | `verimio-bulten-bu-ay-isletmenizde-uygulayabileceginiz-3-prat` | strategy | 12 Mar |
| 4 | `ekibiniz-yapay-zekadan-korkmali-mi-yoksa-onu-kucaklamali-mi` | strategy | 12 Mar |
| 5 | `kobide-yapay-zeka-devrimi` | strategy | 11 Mar |
| 6 | `raporlama-otomasyonu-nedir` | automation | 11 Mar |
| 7 | `musteri-hizmetlerinde-ai-donemi` | customer | 11 Mar |
| 8 | `ai-icin-veri-kalitesi` | data | 6 Mar |
| 9 | `chatbot-voice-agent-secimi` | customer | 5 Mar |
| 10 | `ai-roi-hesaplama` | roi | 4 Mar |
| 11 | `make-vs-n8n-karsilastirma` | ai-tools | 3 Mar |
| 12 | `ai-danismanlik-neden-farklidir` | strategy | 2 Mar |
| 13 | `n8n-ile-basit-otomasyon` | tutorial | 1 Mar |
| 14 | `otomasyon-yanlislari` | automation | 25 Şub |
| 15 | `sirket-check-up-nedir` | strategy | 20 Şub |

Kategoriler: `strategy`, `automation`, `customer`, `data`, `roi`, `ai-tools`, `tutorial`

---

## Command Center & Skill Army

### Mimari

```
Web Panel (/admin/command)
  → POST /api/admin/command/jobs → Supabase command_jobs (status: queued)
  → Lokal Daemon (Mac, Node.js) polls her 5s
  → spawn: claude binary [skill+input] --cwd [proje]
  → stdout → command_job_logs (Supabase Realtime)
  → Panel LogViewer terminal görünümü (canlı streaming)
```

**Daemon:** `/Users/sedo/Desktop/Personel Space/Verimio/command-daemon/`
- `index.js` ~360 satır — poll + execute + log
- Çalıştır: `nohup node index.js > daemon.log 2>&1 &`

**Panel sayfaları:** dashboard, jobs, jobs/[id], agents, pipelines, approvals

**API routes:** `api/admin/command/` altında — jobs, agents, approvals, pipelines, runs

### 8 Skill (`~/.claude/skills/verimio/`)

| Skill | Komut | İşlev |
|-------|-------|-------|
| SEO Researcher | `/seo-researcher [konu]` | Anahtar kelime analizi |
| Blog Outliner | `/blog-outliner [konu]` | Outline oluşturma |
| Blog Writer | `/blog-writer [outline]` | MDX yazma |
| Visual Director | `/visual-director [makale]` | Kapak görseli üretimi |
| Social Copywriter | `/social-copywriter [makale]` | Sosyal medya copy |
| Blog Publisher | `/blog-publisher [makale]` | MDX + görsel + constants + push + Notion + GSC |
| Content Planner | `/content-planner [ay/tema]` | Aylık 4 yazı planı |
| Monthly Launcher | `/monthly-launcher [AY YILI]` | Notion → tam pipeline |

### İçerik Pipeline

```
content-planner → 4 yazı planı → Notion
  ↓ onay
monthly-launcher → seo-researcher → blog-outliner → blog-writer → blog-publisher
  blog-publisher: MDX + fal.ai webp + constants.ts + git push + Notion ✓ + GSC index
```

---

## Kurumsal Kimlik

**Tam kılavuz:** `docs/BRAND.md`

| Öğe | Değer |
|-----|-------|
| Logo | `verim` (beyaz) + `io` (lime #A3E635) — lowercase, bold |
| Font | DM Sans (300–700) + DM Mono |
| Ana renkler | Deep Indigo `#2E1065` · Lime `#A3E635` · Dark `#1E0A46` · Purple `#8B5CF6` |
| Admin dark | bg `#0A0616` · kart `#0F0A1E` · border `#1A1030` |
| CTA butonu | Lime bg + indigo text + bold |

---

## Supabase

- **Project ID:** `njxgikhrhxvfveywvsuh`
- **Region:** eu-central-1
- **Key'ler:** `.env.local` dosyasında

### Tablolar

```
leads            → Tally.so formdan gelen lead'ler
social_posts     → Sosyal medya post taslakları
media_assets     → fal.ai görselleri (Supabase Storage URL)
content_drafts   → Claude ile üretilen taslaklar
meetings         → Calendly toplantıları
command_jobs     → Command Center iş kuyruğu
command_job_logs → Streaming çıktı
pipelines        → Pipeline tanımları
approvals        → Onay kontrol noktaları
agent_profiles   → Skill/agent kayıtları (21 kayıt)
```

---

## Ortam Değişkenleri

Tüm key'ler `.env.local` dosyasında ve Vercel Environment Variables'da tanımlı.
Gerekli değişkenler: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `FAL_KEY`, `ANTHROPIC_API_KEY`, `RESEND_API_KEY`.

> **UYARI:** API key'leri, şifreleri veya token'ları ASLA bu dosyaya veya Git commit'e ekleme.

---

## Bekleyen İşler

- [ ] Google Search Console API → `/admin/seo` gerçek veri
- [ ] Calendly webhook → `meetings` otomatik sync
- [ ] LinkedIn / Twitter API otomatik paylaşım
- [ ] `verimio.com.tr` custom domain → Vercel
- [ ] Mobile responsive iyileştirme (admin panel masaüstü odaklı)

---

## CLAUDE.md Sürdürülebilirlik Kuralları

- **Güncelle:** Yeni modül, tech stack değişikliği, mimari değişiklik
- **Güncelleme:** Yeni blog yazısı, küçük fix'ler, API key rotasyonu
- **İlke:** "Değişmeyeni yaz, değişeni referansla"
- **Detay dosyaları:** `docs/BRAND.md` (marka), `docs/SEO-GEO.md` (SEO/GEO)
- **Review:** Ayda 1 kez `/revise-claude-md` ile kontrol et
