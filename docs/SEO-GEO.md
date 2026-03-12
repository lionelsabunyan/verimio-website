# Verimio — SEO & GEO Rehberi

Bu dosya site SEO altyapısını ve Generative Engine Optimization (GEO) kurallarını içerir.
*Son güncelleme: 12 Mart 2026*

---

## 1. SEO Altyapısı — Mevcut Dosyalar

| Dosya | İşlev | Notlar |
|-------|-------|--------|
| `src/app/robots.ts` | Crawl kuralları | /admin, /api, /brand-preview, /tesekkurler engelli |
| `src/app/sitemap.ts` | Dinamik XML sitemap | 9 statik sayfa + BLOG_POSTS'tan dinamik URL'ler |
| `src/app/feed.xml/route.ts` | RSS 2.0 feed | Blog yazıları otomatik |
| `src/app/opengraph-image.tsx` | Root OG image | 1200x630 |
| `src/app/blog/[slug]/opengraph-image.tsx` | Per-post OG image | Dinamik başlık + kategori |
| `src/components/seo/OrganizationSchema.tsx` | JSON-LD Organization | ProfessionalService type |
| `src/components/seo/BreadcrumbSchema.tsx` | JSON-LD Breadcrumb | Dinamik path |
| `src/components/seo/ArticleSchema.tsx` | JSON-LD BlogPosting | Speakable markup dahil |
| `src/components/seo/FAQSchema.tsx` | JSON-LD FAQPage | Soru-cevap structured data |
| `src/app/layout.tsx` | Root metadata | Canonical, hreflang tr-TR, twitter card, OG |
| `next.config.ts` | Redirect + headers | non-www→www 301, güvenlik header'ları, cache |
| Google Analytics | Sayfa izleme | googleapis entegrasyonu |

---

## 2. SEO Kuralları — Yeni Sayfa Oluşturma

### Zorunlu (her sayfa)

1. **`metadata` export** — title, description, canonical URL
2. **Schema bileşeni** — sayfa tipine uygun JSON-LD (Article, FAQ, Organization, vb.)
3. **Tek `h1`** — sayfada sadece bir adet
4. **Hiyerarşi** — h1 → h2 → h3 sıralı kullanım, atlama yapma
5. **`inLanguage: "tr-TR"`** — her schema'da belirt
6. **Canonical URL** — `https://www.verimio.com.tr/sayfa-adi`

### Blog yazısı ekleme

1. `src/content/blog/{slug}.mdx` oluştur (frontmatter: title, date, excerpt, category, author)
2. `public/images/blog/{slug}.webp` kapak görseli (1200x630, fal.ai Recraft V3)
3. `src/lib/constants.ts` → `BLOG_POSTS` dizisine en üste ekle
4. `sitemap.ts` otomatik çeker — manual ekleme gerekmez
5. `feed.xml` otomatik güncellenir
6. Per-post OG image otomatik üretilir (`blog/[slug]/opengraph-image.tsx`)
7. Deploy sonrası GSC'den index talep et

### Teknik kontroller

- `next.config.ts`'deki redirect kurallarına dikkat et (non-www → www)
- Güvenlik header'ları otomatik ekleniyor (X-Frame-Options, CSP, vb.)
- Cache header'ları statik asset'ler için yapılandırılmış

---

## 3. GEO Rehberi — Generative Engine Optimization

### GEO Nedir?

GEO, web içeriğini geleneksel arama motorlarının ötesinde **AI arama motorları** (ChatGPT, Perplexity, Gemini, Copilot) için optimize etme pratiğidir. Bu motorlar kullanıcı sorularına doğrudan cevap üretir ve kaynak olarak web sayfalarını kullanır.

**Amaç:** Verimio'nun içeriklerinin AI tarafından üretilen cevaplarda kaynak olarak gösterilmesi.

### 6 GEO Prensibi

#### 1. Structured Data (JSON-LD)

AI motorları structured data'yı ham metinden çok daha iyi anlar.

**Yapılması gereken:**
- Her sayfada uygun JSON-LD schema kullan
- Organization, Article, FAQ, HowTo, BreadcrumbList tiplerini doğru seç
- `@context: "https://schema.org"` her schema'da olmalı

**Mevcut durum:** 4 schema bileşeni aktif (Organization, Breadcrumb, Article, FAQ)

#### 2. Speakable Markup

Google'ın sesli asistanlar ve AI özetler için kullandığı işaretleme.

**Yapılması gereken:**
- Blog yazılarının ilk paragrafı ve başlığı `speakable` olarak işaretle
- `ArticleSchema.tsx` içinde `speakable.cssSelector` tanımlı

**Mevcut durum:** ArticleSchema'da speakable aktif

#### 3. Entity Clarity (Varlık Netliği)

AI motorlarının Verimio'yu doğru tanıması için tutarlı entity bilgisi.

**Yapılması gereken:**
- `OrganizationSchema` ile şirket bilgilerini (ad, tür, konum, hizmetler) tanımla
- Her sayfada tutarlı brand entity kullan
- `sameAs` ile sosyal medya profilleri bağla

**Mevcut durum:** OrganizationSchema ProfessionalService olarak tanımlı

#### 4. Citation-Ready İçerik

AI'ın alıntılayabileceği, net ve özlü ifadeler.

**Yapılması gereken:**
- Her yazının ilk paragrafında soruyu doğrudan yanıtla (featured snippet formatı)
- Kısa, tanım niteliğinde cümleler kullan
- İstatistik ve rakamları net ver (kaynak ile)
- "X nedir?" formatına doğrudan cevap ver

**Blog yazarken dikkat:** İlk 2-3 cümle, konunun özet tanımı olmalı.

#### 5. FAQ Schema

AI motorları soru-cevap formatını doğrudan yanıt üretmek için kullanır.

**Yapılması gereken:**
- İlgili sayfalarda `FAQSchema` bileşenini kullan
- Gerçek kullanıcı sorularını hedefle
- Cevapları 2-3 cümleyle sınırla (snippet boyutu)

**Mevcut durum:** FAQSchema bileşeni aktif, ana sayfada kullanılıyor

#### 6. Topical Authority (Konu Otoritesi)

Belirli bir alanda derinlemesine içerik üretmek, AI'ın o kaynağı otorite olarak görmesini sağlar.

**Yapılması gereken:**
- İlişkili konularda kümelenmiş (cluster) içerik üret
- İç linklerle yazıları birbirine bağla
- Aynı temada en az 3-5 yazı bulundur
- Pillar page + destekleyici yazılar yapısı kullan

**Mevcut durum:** 15 yazı, 7 kategoride. Strategy (6), automation (3), customer (2) güçlü kümeler.

---

## 4. GEO Teknik Checklist

Yeni içerik veya sayfa oluştururken bu listeyi kontrol et:

- [ ] Uygun JSON-LD schema eklendi mi?
- [ ] Speakable markup (blog yazıları için) aktif mi?
- [ ] İlk paragraf doğrudan soruya cevap veriyor mu?
- [ ] Numaralı listeler ve madde işaretleri kullanıldı mı?
- [ ] Somut rakam ve istatistikler (kaynaklı) var mı?
- [ ] İlgili diğer yazılara iç link verildi mi?
- [ ] Canonical URL doğru mu?
- [ ] OG image (1200x630) mevcut mu?

---

## 5. Performans Ölçümü

### Google Search Console

- `verimio.com.tr` property'si ile sorgu performansı takibi
- `get_search_analytics` ile query/page bazlı analiz
- `inspect_url_enhanced` ile indexing durumu kontrolü
- Blog yazısı yayınlandıktan sonra hemen index talep et

### AI Arama Motorları (Manuel Test)

- **ChatGPT:** "Türk KOBİ'leri için AI danışmanlık" gibi sorguları test et
- **Perplexity:** Aynı sorguları Perplexity'de dene, kaynak kontrolü yap
- **Gemini:** Google AI Overview'da görünürlük kontrolü

### Araçlar

- **Google Rich Results Test:** Schema doğrulama (`search.google.com/test/rich-results`)
- **Schema.org Validator:** JSON-LD yapısı kontrolü
- **Sitemap kontrolü:** GSC → Sitemaps → indexlenen sayfa sayısı
- **PageSpeed Insights:** Core Web Vitals kontrolü

---

## Referanslar

- `CLAUDE.md` → Proje genel bakış
- `docs/BRAND.md` → Marka kimliği
- `src/components/seo/` → Schema bileşenleri kaynak kodu
- `src/app/robots.ts` → Crawl kuralları
- `src/app/sitemap.ts` → Sitemap yapısı
