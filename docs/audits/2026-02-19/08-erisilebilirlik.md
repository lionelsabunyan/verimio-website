# ERİŞİLEBİLİRLİK AUDIT RAPORU — Verimio Website
**Tarih:** 2026-02-19  
**Uzman:** Erişilebilirlik (WCAG 2.1 AA)  
**Durum:** Tamamlandı  
**Toplam Bulgu:** 27 (4 Kritik | 16 Önemli | 7 Polish)

---

## DETAYLI BULGULAR

### globals.css — Temel Stil

#### Bulgu 1 — Dark Mode Secondary Text Kontrast Yetersiz
- **Önem:** Kritik
- **Kategori:** Kontrast
- **WCAG:** 1.4.3 Contrast (Minimum)
- **Açıklama:** Dark modede `--foreground-secondary: #A8A29E` on `--background: #0A0514` → yaklaşık 2.9:1 — AA standardında başarısız (gerekli: 4.5:1).
- **Kanıt:** globals.css:38-39
- **Öneri:** Dark mode secondary text → `#B8B8B0` veya daha açık ton. WebAIM Contrast Checker ile test et.
- **Efor:** Küçük

#### Bulgu 2 — prefers-reduced-motion Uygulanmıyor
- **Önem:** Kritik
- **Kategori:** Hareket
- **WCAG:** 2.3.3 Animation from Interactions
- **Açıklama:** Tüm CSS transition ve Framer Motion animasyonları `prefers-reduced-motion` medya sorgusu tarafından kontrol edilmiyor. Vestibüler rahatsızlığı olan kullanıcılar zarar görebilir.
- **Kanıt:** globals.css:121 — transition tanımı; tüm motion.* bileşenleri
- **Öneri:**
  ```css
  @media (prefers-reduced-motion: reduce) {
    * { animation: none !important; transition: none !important; }
  }
  ```
  Framer Motion için: `const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")` kullan.
- **Efor:** Orta

#### Bulgu 3 — Focus Ring Light Mode Kontrastı Doğrulanmamış
- **Önem:** Önemli
- **Kategori:** Focus
- **WCAG:** 2.4.7 Focus Visible
- **Açıklama:** `*:focus-visible` outline `#8B5CF6` on light background `#FAFAF9` — 3:1 kontrast karşılıyor mu test edilmemiş.
- **Kanıt:** globals.css:199-203
- **Öneri:** Her iki modda focus ring 3:1 doğrula. Gerekirse light modda `outline-color: #5B3B99`.
- **Efor:** Küçük

---

### Ana Sayfa — Yapısal Sorunlar

#### Bulgu 4 — `<main>` Elementi Yok
- **Önem:** Kritik
- **Kategori:** Semantik
- **WCAG:** 1.3.1 Info and Relationships; 2.4.1 Bypass Blocks
- **Açıklama:** page.tsx fragment `<>` ile başlıyor, `<main>` yok. Ekran okuyucular "ana içeriğe atla" bulmakta zorlanır.
- **Kanıt:** src/app/page.tsx:9-20
- **Öneri:** Tüm section'ları `<main>` içine al.
- **Efor:** Küçük

#### Bulgu 5 — Skip Link (İçeriğe Atla) Yok
- **Önem:** Önemli
- **Kategori:** Klavye
- **WCAG:** 2.4.1 Bypass Blocks
- **Açıklama:** Keyboard kullanıcıları Navbar'ı her seferinde geçemez.
- **Kanıt:** Navbar.tsx ve layout.tsx — skip link yok
- **Öneri:**
  ```jsx
  <a href="#main-content" className="sr-only focus:not-sr-only">İçeriğe Atla</a>
  <main id="main-content">...</main>
  ```
- **Efor:** Küçük

---

### Hakkımızda Sayfası

#### Bulgu 6 — Başlık Hiyerarşisi Atlıyor (H1 → H3)
- **Önem:** Kritik
- **Kategori:** Başlık
- **WCAG:** 1.3.1 Info and Relationships
- **Açıklama:** Satır 49 H1 sonra satır 96 H3 geliyor — H2 atlanmış. Ekran okuyucular sayfayı taramakta zorlanır.
- **Kanıt:** hakkimizda/page.tsx:49 (H1), 85 (H2), 96 (H3), 131 (H2)
- **Öneri:** H1 → H2 (Neden Verimio?) → H3 (problem/çözüm kartları) → H2 (3 ilke) hiyerarşisini kur.
- **Efor:** Küçük

#### Bulgu 7 — Image Alt Text Genel
- **Önem:** Önemli
- **Kategori:** ARIA
- **WCAG:** 1.1.1 Non-text Content
- **Açıklama:** alt="Kurumsal AI danışmanlığı — stratejik netlik" çok genel.
- **Kanıt:** hakkimizda/page.tsx:65
- **Öneri:** Görselin gerçek içeriğini yansıt: "Verimio danışmanı ile şirket analiz toplantısı"
- **Efor:** Çok Küçük

---

### Hizmetler Sayfası

#### Bulgu 8 — Servis Grid Semantik Değil
- **Önem:** Önemli
- **Kategori:** Semantik
- **WCAG:** 1.3.1 Info and Relationships
- **Açıklama:** Servis kartları `<div>` içinde, `<article>` veya `<ul>/<li>` değil.
- **Kanıt:** hizmetler/page.tsx:88-101
- **Öneri:** Grid → `<ul role="list">`, kartlar → `<li><article>`.
- **Efor:** Orta

#### Bulgu 9 — Step Numaraları Semantik Değil
- **Önem:** Önemli
- **Kategori:** Semantik
- **WCAG:** 1.3.1 Info and Relationships
- **Açıklama:** "01", "02" numaraları başlıktan ayrı dekoratif duruyor.
- **Kanıt:** hizmetler/page.tsx:216-223
- **Öneri:** `<h3>{item.step}. {item.title}</h3>` veya `aria-label="Adım {n}:"` ekle.
- **Efor:** Küçük

---

### Blog Sayfası

#### Bulgu 10 — "Devamını Oku" Anlamsız Bağlantı Metni
- **Önem:** Önemli
- **Kategori:** Bağlantı
- **WCAG:** 2.4.4 Link Purpose
- **Açıklama:** Her blog kartında "Devamını Oku" tekrarlıyor — ekran okuyucu bağlamı kaybeder.
- **Kanıt:** blog/page.tsx:67-73
- **Öneri:** `aria-label={`Devamını Oku: ${post.title}`}` ekle.
- **Efor:** Çok Küçük

---

### SSS Sayfası

#### Bulgu 11 — details/summary İçinde Başlık Semantiği Yok
- **Önem:** Önemli
- **Kategori:** Semantik | ARIA
- **WCAG:** 1.3.1 Info and Relationships
- **Açıklama:** `<summary>` içinde `<h3>` yok — soru metni başlık olarak tanınmıyor.
- **Kanıt:** sss/page.tsx:87-102
- **Öneri:** `<summary><h3 className="font-semibold">{item.question}</h3></summary>`
- **Efor:** Çok Küçük

---

### İletişim Sayfası

#### Bulgu 12 — `text-white/40` Kontrast Yetersiz
- **Önem:** Önemli
- **Kategori:** Kontrast
- **WCAG:** 1.4.3 Contrast (Minimum)
- **Açıklama:** `bg-primary` (#2E1065) üzerine `text-white/40` ≈ 3.6:1 — AA başarısız.
- **Kanıt:** iletisim/page.tsx:173-175
- **Öneri:** `text-white/40` → `text-white/60` minimum.
- **Efor:** Çok Küçük

---

### Navbar

#### Bulgu 13 — Mobile Menü ESC + Keyboard Trap Yok
- **Önem:** Kritik
- **Kategori:** Klavye
- **WCAG:** 2.1.1 Keyboard; 2.4.3 Focus Order
- **Açıklama:** Menü açıkken ESC kapatmıyor, Tab menü dışına çıkabiliyor.
- **Kanıt:** Navbar.tsx:78-156
- **Öneri:**
  ```jsx
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape" && isOpen) setIsOpen(false); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen]);
  ```
  `role="menu"` ve `aria-expanded` ekle.
- **Efor:** Orta

#### Bulgu 14 — Nav aria-label Eksik
- **Önem:** Polish
- **Kategori:** ARIA
- **WCAG:** 1.3.1 Info and Relationships
- **Açıklama:** `<nav>` elementi Türkçe etiket almamış.
- **Kanıt:** Navbar.tsx:55-64
- **Öneri:** `<nav aria-label="Ana navigasyon">`
- **Efor:** Çok Küçük

---

### Form Erişilebilirliği

#### Bulgu 15 — Form Label-Input İlişkisi Doğrulanamadı
- **Önem:** Kritik
- **Kategori:** Form
- **WCAG:** 1.3.1; 3.3.2 Labels or Instructions
- **Açıklama:** Step bileşenleri (`/steps/` klasörü) audit kapsamı dışında — label-input ilişkisi, error binding doğrulanamadı.
- **Öneri:** Tüm inputlar: `<label htmlFor="x">`, `<input id="x" aria-describedby="x-error" />`, `<span id="x-error">{error}</span>` yapısını kullan.
- **Efor:** Büyük

#### Bulgu 16 — StepIndicator Sadece Renk ile Durum Gösteriyor
- **Önem:** Önemli
- **Kategori:** Kontrast | ARIA
- **WCAG:** 1.4.1 Use of Color; 4.1.2 Name, Role, Value
- **Açıklama:** Aktif/done/pending durumu yalnızca renk değişimi ile belirtiliyor — renk körlüğü riski.
- **Kanıt:** StepIndicator.tsx:39-47
- **Öneri:**
  ```jsx
  {done && <span className="sr-only">Tamamlandı</span>}
  {active && <span className="sr-only">Geçerli adım</span>}
  ```
- **Efor:** Küçük

---

### Button Bileşeni

#### Bulgu 17 — sm Size Touch Hedefi Küçük
- **Önem:** Önemli
- **Kategori:** Touch
- **WCAG:** 2.5.5 Target Size
- **Açıklama:** `sm: "px-4 py-2"` → ~32px yükseklik. Mobilde 44px minimum önerilir.
- **Kanıt:** Button.tsx:32-36
- **Öneri:** `sm: "px-4 py-2.5"` (40px+), veya `md` minimum yap.
- **Efor:** Çok Küçük

#### Bulgu 18 — Icon aria-hidden Eksik
- **Önem:** Önemli
- **Kategori:** ARIA
- **WCAG:** 4.1.2 Name, Role, Value
- **Açıklama:** Button içindeki ArrowUpRight decorative ikon `aria-hidden="true"` almamış.
- **Kanıt:** Button.tsx:67-71
- **Öneri:** `<ArrowUpRight aria-hidden="true" />`
- **Efor:** Çok Küçük

---

### Logo Bileşeni

#### Bulgu 19 — Logo Link aria-label Eksik
- **Önem:** Önemli
- **Kategori:** ARIA | Bağlantı
- **WCAG:** 2.4.4 Link Purpose
- **Açıklama:** Logo Link'e aria-label eklenmemiş — ekran okuyucu "link, görüntü" der.
- **Kanıt:** Logo.tsx:89-102
- **Öneri:** `<Link aria-label="Verimio ana sayfasına dön">`
- **Efor:** Çok Küçük

---

### Footer

#### Bulgu 20 — Social Icons Semantik List Değil
- **Önem:** Önemli
- **Kategori:** Semantik
- **WCAG:** 1.3.1 Info and Relationships
- **Açıklama:** Social icon grid `<div>` ile yapılmış, `<ul>/<li>` değil.
- **Kanıt:** Footer.tsx:100-114
- **Öneri:** `<ul role="list">` + `<li>` + `<a aria-label={item.label}>` yapısına geç.
- **Efor:** Küçük

#### Bulgu 21 — Footer `text-white/40` Kontrast Yetersiz
- **Önem:** Önemli
- **Kategori:** Kontrast
- **WCAG:** 1.4.3 Contrast (Minimum)
- **Açıklama:** `bg-primary` üzerine `text-white/40` ≈ 3.6:1 — AA başarısız.
- **Kanıt:** Footer.tsx:120-123
- **Öneri:** `text-white/40` → `text-white/60`
- **Efor:** Çok Küçük

---

### Testimonials

#### Bulgu 22 — Carousel Region + aria-live Eksik
- **Önem:** Önemli
- **Kategori:** ARIA | Klavye
- **WCAG:** 4.1.2 Name, Role, Value
- **Açıklama:** Carousel `role="region"` ve `aria-live="polite"` almamış.
- **Kanıt:** Testimonials.tsx:31-134
- **Öneri:**
  ```jsx
  <div role="region" aria-live="polite" aria-label="Müşteri Yorumları">
  ```
  Dot butonları: `aria-current={i === current}`, `aria-label={`Yorum ${i+1}: ${TESTIMONIALS[i].name}`}`
- **Efor:** Orta

#### Bulgu 23 — Star Rating Semantik Wrapper Yok
- **Önem:** Polish
- **Kategori:** ARIA
- **WCAG:** 1.1.1; 4.1.2
- **Açıklama:** 5 SVG yıldız ayrı ayrı duruyor, `role="img"` wrapper yok.
- **Kanıt:** Testimonials.tsx:10-19
- **Öneri:** `<div role="img" aria-label="5 üzerinden 5 yıldız">{stars}</div>`
- **Efor:** Çok Küçük

---

### FAQ Bölümü

#### Bulgu 24 — Accordion aria-expanded + aria-controls Eksik
- **Önem:** Önemli
- **Kategori:** ARIA
- **WCAG:** 4.1.2 Name, Role, Value
- **Açıklama:** FAQ butonları accordion pattern için gerekli ARIA attribute'larını almamış.
- **Kanıt:** FAQ.tsx:35-53
- **Öneri:**
  ```jsx
  <motion.button
    aria-expanded={openIndex === index}
    aria-controls={`faq-answer-${index}`}
  />
  <div id={`faq-answer-${index}`} role="region">{item.answer}</div>
  ```
- **Efor:** Küçük

---

### Hero Bölümü

#### Bulgu 25 — Hero Image Alt Text Genel
- **Önem:** Önemli
- **Kategori:** ARIA
- **WCAG:** 1.1.1 Non-text Content
- **Açıklama:** alt="AI destekli iş süreci otomasyonu" — çok genel, görselin içeriğini yansıtmıyor.
- **Kanıt:** Hero.tsx:85-92
- **Öneri:** Görselin gerçek içeriğiyle güncelle.
- **Efor:** Çok Küçük

---

## ÇAPRAZ NOTLAR

### Teknik
- prefers-reduced-motion global fix → tüm animasyon bileşenlerini etkiliyor, koordineli yapmak gerekiyor.
- Form steps klasörü (`/steps/`) audit edilmedi — ayrı erişilebilirlik kontrolü gerekli.

### Design System
- `text-white/40` pattern birden fazla bileşende tekrar ediyor → global olarak `text-white/60` minimum standart belirle.

### UX
- Carousel swipe gesture eksik (klavye kullanıcısı ok tuşlarıyla kaydırabilmeli).

---

## ÖNCELİK SIRASI

| Öncelik | Bulgu | Efor |
|---------|-------|------|
| 🔴 Kritik | 2: prefers-reduced-motion | Orta |
| 🔴 Kritik | 4: `<main>` elementi | Küçük |
| 🔴 Kritik | 13: Mobile menü ESC + trap | Orta |
| 🔴 Kritik | 15: Form label-input | Büyük |
| 🟡 Önemli | 1: Dark mode kontrast | Küçük |
| 🟡 Önemli | 5: Skip link | Küçük |
| 🟡 Önemli | 6: Hakkımızda H1→H3 jump | Küçük |
| 🟡 Önemli | 22: Carousel aria-live | Orta |
| 🟡 Önemli | 24: FAQ aria-expanded | Küçük |
| 🟢 Polish | 10: Blog "Devamını Oku" aria-label | Çok Küçük |
| 🟢 Polish | 17: Button sm touch target | Çok Küçük |
| 🟢 Polish | 18: Icon aria-hidden | Çok Küçük |
| 🟢 Polish | 21: Footer text-white/40 | Çok Küçük |
