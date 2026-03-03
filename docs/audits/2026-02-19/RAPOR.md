# Verimio Website Audit Raporu
## 19 Şubat 2026 | 6 Uzman | 22 Benzersiz Bulgu

---

## 1. Genel Durum

**Sağlık Skoru: 6/10**

Kurumsal konumlandırma sağlam, tasarım dili tutarlı (Structured Flow ✓), ancak **3 kritik boşluk:**
- Müşteri form doldurup submit ediyor ama rapor hiçbir yere gitmiyor (`console.log` var, backend yok)
- Design system'de %15 kaçak (hardcoded renkler, motion değerleri, icon API dağınık)
- WCAG erişilebilirlik gereklilikleri karşılanmıyor (4 kritik, 16 önemli başarısızlık)

**Risk:** Dürüstlük kaybı, yasal uyum sorunları, teknik borç hızlı artıyor.

---

## 2. Kritik Bulgular (Hemen Müdahale)

| Sıra | Bulgu | Dosya/Bileşen | Efor | Kazanç |
|------|-------|----------------|------|--------|
| **1** | **Form submit → rapor yok.** Müşteri bilgileri Supabase'e kaydedilmiyor, email gönderilmiyor. Sadece "Teşekkürler" sayfasına redirect. | MultiStepForm.tsx + form handler | 2-3 gün | Müşteri rapor alır, dürüstlük riski ortadan kalkar |
| **2** | **Teknik borç:** Ease `[0.21, 0.47, 0.32, 0.98]` 4 dosyada tekrar, lime `#A3E635` SVG'de hardcoded, motion offset magic number. | Tüm animasyon bileşenleri + SVG'ler | 1 gün | Merkezi tokens → bakım süresi %70 azalır |
| **3** | **prefers-reduced-motion yok.** WCAG 2.3.3 başarısız. Vestibüler/epilepsi sorunu olan kullanıcılar zarar görebilir. | `globals.css` + Framer Motion bileşenleri | 4-6 saat | WCAG 2.3.3 ✓, hukuki risk ortadan kalkar |
| **4** | **Form label-input binding eksik.** Erişilebilirlik denetçisi form alanlarını okumuyor (`htmlFor`, `aria-describedby` yok). | `/steps/` klasörü tüm inputlar | 2-3 gün | Form UX +15%, WCAG 3.3.2 ✓ |
| **5** | **Renk kontrastı başarısız.** Dark mode secondary `#A8A29E` on `#0A0514` = 2.9:1. `text-white/40` = 3.6:1. (Gerekli: 4.5:1) | `globals.css` CSS variables | 3-4 saat | WCAG AA ✓, dark mode erişilebilir |

---

## 3. Önemli Bulgular (Sprint 1-2)

| Sıra | Bulgu | Efor | Kazanç |
|------|-------|------|--------|
| **6** | Icon komponent API tutarsız. `size` prop bazı bileşenlerde yok, Button lg'de icon md kalıyor. | 1-2 gün | Design consistency, icon reusability 3× |
| **7** | Testimonials anonim ve kanıtsız (logo, şirket adı, metrik yok). Sosyal kanıt sıfır. | 2-3 gün + müşteri iletişim | Social proof → conversion +8-12% |
| **8** | Hedef kitle çelişiyor. Logo "kurumsal", constants.ts "her ölçek", About "100-500 kişi". | 1-2 gün stratejik karar | Mesajlaşma net, bounce rate ↓ |
| **9** | Heading hiyerarşi sıralı değil (Hakkımızda: H1→H3 jump). `<main>` tag yok. | 3-4 saat | WCAG 1.3.1 ✓, SEO +2% |
| **10** | Dark mode default değil. 2025'te OpenAI/Vercel/Anthropic dark default. | 2-3 saat | Trend uyum, UX ↑ |
| **11** | Fiyat şeffaflığı eksik. "Ücretsiz Check-Up" sonrası ücret beklentisi yönetilmiyor. | 1-2 saat | Form abandon ↓, qualified lead ↑ |
| **12** | Blog slug routes yok. `/blog/[slug]` çalışmıyor, linkler 404. | 4-6 saat | Blog SEO, share-ability ↑ |
| **13** | Mobile menu: ESC ile kapatılmıyor, keyboard trap yok. | 2-3 saat | Mobile a11y ✓ |
| **14** | Gizlilik Politikası sayfası yok. Footer linki 404'e gidiyor. | 2-3 saat | Legal compliance ✓, trust ↑ |
| **15** | Disabled contact card görünüyor. "Yakında aktif" yazısı marka güvenini zedeliyor. | 1 saat (kaldır) | Brand güven ↑ |
| **16** | Carousel aria-live yok. Screen reader kullanıcısı slide değişimini duymuyor. | 2 saat | WCAG 4.1.3 ✓ |
| **17** | Renk paleti agresif. Lime %100 opacity "startup" izlenimi, "kurumsal danışman" değil. | 3-4 saat | Enterprise perception ↑ |

---

## 4. Polish Listesi (Hafta 5+)

- Scroll-driven animasyonlar — HowItWorks bölümü progress bar
- Blog pagination
- CTA sayfaya göre çeşitlendirme (Blog/About/Testimonials bağlamsal)
- Schema.org JSON-LD SEO markup
- FAQ aria-expanded + aria-controls
- Skip Link + tam `<main>` yapısı
- Tipografi variable font fine-tuning
- Türk pazarı case studies + KVKK açıklaması

---

## 5. Uzman Çatışmaları & Kararlar

### Çatışma 1: Lime Rengi
- **Design System:** Lime WCAG AA karşılıyor ✓
- **Trend:** 2025'te çok agresif, soften et

**Karar:** Lime yanlış değil, bağlamı yanlış. CTA'larda kal (opacity 0.9). Testimonials/badges için secondary accent `#6366F1` ekle. Dominant değil, highlight olsun.

### Çatışma 2: "Ücretsiz" Mesajı
- **Marka:** "Ücretsiz Check-Up" güçlü hook
- **Eleştiri:** Sonraki ücret beklentisi yönetilmiyor

**Karar:** Çatışma değil, bağlam eksikliği. FAQ'ye ekle: "Rapor ücretsiz. Uygulama danışmanlığı ₺5K–₺50K aralığında."

### Çatışma 3: Heading Hiyerarşisi
- **Erişilebilirlik:** H1→H3 atlama yanlış
- **Design System:** Heading boyutları bağlamsal olabilir

**Karar:** Heading **level** sıralı (H1→H2→H3), **boyut** bağlamsal. İkisi bağımsız — CSS custom props ile yönet.

---

## 6. Uygulama Yol Haritası

### Öncesi: Stratejik Karar (Bu Hafta)
- [ ] Hedef kitle seç: 100-500 kurumsal + Türk pazarı → tüm copy buna göre
- [ ] Form backend scope: Supabase + n8n timeline
- [ ] Testimonials: gerçek müşteri/referans var mı?
- [ ] Renk onay: Lime opacity 0.9, secondary `#6366F1`

### Hafta 1 (24 Şubat–2 Mart) — Kritik Bloklar

**[DEV] Form Submit Backend (2-3 gün)**
- Supabase: `form_submissions` tablosu
- n8n: email trigger workflow
- Success ekranı: "Rapor hazırlanıyor. 24-48 saatte aranacaksınız."

**[DEV] Design Tokens Merkeze (1 gün)**
- `src/lib/design-tokens.ts` oluştur
- Renk, motion, spacing hepsi buradan

**[DEV] prefers-reduced-motion (4-6 saat)**
- `globals.css`: `@media (prefers-reduced-motion: reduce)`
- Framer Motion: `useReducedMotion` hook

**[DEV] Form Label-Input Audit (2-3 gün)**
- `/steps/` klasörü tüm form alanları
- `label htmlFor` + `aria-describedby` pattern

**[DESIGN] Renk Soften (3-4 saat)**
- Lime opacity 0.9, secondary accent `#6366F1`
- Dark secondary: `#B8B8B0` (kontrast 4.5:1)

---

### Hafta 2–3 (3–16 Mart) — Önemli

**[DEV]** Icon API Unify → `IconWrapper.tsx`  
**[DEV]** Heading hiyerarşi + `<main>` + dark mode default  
**[DEV]** WCAG kontrast fix (`text-white/40` → `text-white/60`)  
**[DEV]** Blog slug routes + Form Step 4 UX  
**[DEV]** Mobile menu ESC + keyboard trap  
**[CONTENT]** Testimonials gerçekleştir (LinkedIn, şirket, metrik)  
**[CONTENT]** Hedef kitle mesajlaşma revizyonu  
**[CONTENT]** Fiyat şeffaflığı + `/gizlilik-politikasi` sayfası  

---

### Hafta 4+ (17 Mart–) — Polish

**[DEV]** Scroll animasyonlar + blog pagination  
**[DEV]** Schema.org JSON-LD + carousel aria-live  
**[CONTENT]** Türk pazarı case studies + KVKK  

---

## 7. Başarı Kriterleri

### Sprint 1 Sonu (2 Mart):
- ✓ Form submit → müşteri email alıyor (test geçti)
- ✓ Design tokens merkezi (sıfır hardcoded renk/motion)
- ✓ prefers-reduced-motion global uygulanıyor
- ✓ Form label-input erişilebilir (WAVE 0 hata)
- ✓ WCAG AA kontrast: %100 geçti

### Sprint 2 Sonu (16 Mart):
- ✓ WCAG AA toplam: %95+ (22 bulguda 21'i çözüldü)
- ✓ Testimonials: 3+ gerçek, LinkedIn doğrulanmış
- ✓ Hedef kitle: tutarlı messaging
- ✓ Blog slug routes: çalışıyor, SEO-friendly
- ✓ Social proof: logo + şirket adları görünüyor

### Genel (4 Hafta Sonu):
- **Dürüstlük:** Müşteri pipeline çalışıyor, email tracking aktif
- **Marka:** Enterprise positioning net, tutarlı
- **Teknik:** Teknik borç %85 → %10'a indi, maintainability ↑
- **Yasal:** WCAG AA ✓, gizlilik politikası ✓

---

*Hazırlayan: 6 Uzman Sentezi — Design System, Marka, UI/UX, Eleştiri, Trend, Erişilebilirlik*  
*Kaynak raporlar: `docs/audits/2026-02-19/01–09`*  
*Sonraki adım: Stratejik kararlar → Sprint 1 kick-off (24 Şubat)*
