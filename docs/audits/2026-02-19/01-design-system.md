# VERIMIO PROJECT — DESIGN SYSTEM AUDIT RAPORU
**Tarih:** 2026-02-19  
**Uzman:** Design System  
**Durum:** Tamamlandı

## ÖZET
Proje genel olarak tutarlı bir design system temelinde oluşturulmuş, ancak birkaç **kritik tutarsızlık** ve **iyileştirme fırsağı** var. Token yönetimi iyi (globals.css), ancak bileşen düzeyinde hardcoded değerler ve komponent API inconsistencies bulunuyor.

---

## DETAYLI BULGULAR

### 1. Hero.tsx
#### Bulgu 1 — Hardcoded Gradient vs CSS Variable
- **Önem:** Önemli
- **Kategori:** Renk / Token Consistency
- **Açıklama:** `gradient-text` class globals.css'de tanımlı olsa da, Hero komponentinde inline stil + gradient class karışık kullanılıyor. Consistency problemi.
- **Kanıt:** Hero.tsx:56 `className="gradient-text"` → globals.css:152 hardcoded `linear-gradient(135deg, #8B5CF6 0%, #A3E635 100%)`. İkisi aynı, ama sistem dinamik değil.
- **Öneri:** Gradient renkleri CSS variable'a çevir → `--gradient-primary-secondary` var oluştur, bu şekilde dark/light mode uyarlanabilir hale gelir.
- **Efor:** Küçük

#### Bulgu 2 — Icon Component Size Inconsistency
- **Önem:** Önemli
- **Kategori:** Komponent API
- **Açıklama:** Hero.tsx:20-21, custom icon komponentleri (`TimeIcon`, `ROIIcon`, `RoadmapIcon`) explicit size prop almıyor. İcon boyutları hardcoded.
- **Kanıt:** `<Icon className="w-4 h-4" size={16} />` — hem className hem de size prop kullanılıyor. Redundant ve confusing.
- **Öneri:** Custom icon komponentleri için standart size prop sistem kur (sm/md/lg) → tüm ikonlar aynı API'yi takip etsin.
- **Efor:** Orta

#### Bulgu 3 — Spacing Inconsistency (Card Gap)
- **Önem:** Polish
- **Kategori:** Spacing
- **Açıklama:** Hero outcome cards `gap-3` kullanıyor, ama diğer grid komponentler `gap-6`, `gap-8`, `gap-12` karışık. Spacing sistemi belirsiz.
- **Kanıt:** Hero.tsx:79 `gap-3` vs About.tsx:32 `gap-12` vs HowItWorks.tsx:46 `gap-6`
- **Öneri:** Design tokens'ta spacing scale tanımla: `--space-xs: 0.75rem, --space-sm: 1rem, --space-md: 1.5rem, --space-lg: 2rem, --space-xl: 3rem` → buradan çek.
- **Efor:** Orta

### 2. Button.tsx
#### Bulgu 4 — Size Scale Padding Inconsistency
- **Önem:** Kritik
- **Kategori:** Spacing / Komponent API
- **Açıklama:** Button sizes (sm/md/lg) padding'leri arbitrary. lg button'ında text `text-sm`, ama padding `py-4`. Proportion off.
- **Kanıt:** sm: `px-4 py-2 text-xs` | md: `px-6 py-3 text-sm` | lg: `px-8 py-4 text-sm` — text size lg'de küçülüyor!
- **Öneri:** sm: text-xs py-6px | md: text-sm py-12px | lg: text-base py-16px — 2:1 ratio tut.
- **Efor:** Küçük

#### Bulgu 5 — Icon Size vs Button Size Decoupling
- **Önem:** Önemli
- **Kategori:** Komponent API
- **Açıklama:** `iconSizes` object: sm=w-3.5, md=w-4, lg=w-4. lg === md — scaling mantığı yok.
- **Kanıt:** Button.tsx:38-42
- **Öneri:** `lg: "w-5 h-5"` yap.
- **Efor:** Küçük

#### Bulgu 6 — Hardcoded Motion Values
- **Önem:** Önemli
- **Kategori:** Motion / Animation Consistency
- **Açıklama:** Button motion props hardcoded (`stiffness: 400, damping: 25`). System-wide motion tokens yok.
- **Kanıt:** Button.tsx:58-60
- **Öneri:** `src/lib/motion-tokens.ts` oluştur, tüm motion config'leri buradan çek.
- **Efor:** Orta

### 3. SectionLabel.tsx
#### Bulgu 7 — Color Variant Logic Awkward
- **Önem:** Polish
- **Kategori:** Komponent API
- **Açıklama:** `variant="light"` için `text-white/60` — semantik hata. "light" variant dark background'da kullanılıyor.
- **Kanıt:** SectionLabel.tsx:15-19
- **Öneri:** `variant="onDark"` yada `variant="inverse"` olarak yeniden adlandır.
- **Efor:** Küçük

### 4. motion.tsx
#### Bulgu 9 — Hardcoded Easing Values
- **Önem:** Önemli
- **Kategori:** Motion Token Consistency
- **Açıklama:** `ease: [0.21, 0.47, 0.32, 0.98]` her dosyada tekrar yazılıyor.
- **Kanıt:** motion.tsx:33, Button.tsx:59, FAQ.tsx:73, MultiStepForm.tsx:44
- **Öneri:** `motion-tokens.ts`'e taşı.
- **Efor:** Orta

#### Bulgu 10 — Direction Offset Magic Values
- **Önem:** Polish
- **Kategori:** Motion / Spacing
- **Açıklama:** FadeIn motion'da `y: 30`, `x: 30` hardcoded.
- **Kanıt:** motion.tsx:18-22
- **Öneri:** `--motion-offset-sm: 15px, --motion-offset-md: 30px` token.
- **Efor:** Küçük

### 5. Logo.tsx
#### Bulgu 16 — Monogram SVG Hardcoded Colors
- **Önem:** Önemli
- **Kategori:** Renk
- **Açıklama:** Monogram SVG'de `#A3E635` hardcoded.
- **Kanıt:** Logo.tsx:60 `fill="#A3E635"`
- **Öneri:** `fill="var(--secondary)"` yap.
- **Efor:** Küçük

### 6. Navbar.tsx
#### Bulgu 17 — Inconsistent Transition Duration
- **Önem:** Polish
- **Kategori:** Motion
- **Açıklama:** `transition-all duration-300` hardcoded.
- **Kanıt:** Navbar.tsx:31, 34

### 7. Sections (Genel)
#### Bulgu 22 — Inconsistent Section Padding
- **Önem:** Önemli
- **Kategori:** Spacing / Responsive
- **Açıklama:** Hero `pt-20` hardcoded, diğer sections `.section-padding` kullanıyor.
- **Kanıt:** Hero.tsx:17 vs About.tsx:16, HowItWorks.tsx:19
- **Öneri:** Tüm sections `.section-padding` kullan, Hero için `.hero-padding` semantic class.
- **Efor:** Orta

#### Bulgu 23 — Inconsistent MaxWidth Container
- **Önem:** Önemli
- **Kategori:** Responsive
- **Açıklama:** `max-w-7xl` hardcoded everywhere. Token yok.
- **Öneri:** `--container-max-width: 80rem` CSS variable.
- **Efor:** Orta

#### Bulgu 24 — Heading Hierarchy Inconsistency
- **Önem:** Önemli
- **Kategori:** Tipografi
- **Açıklama:** h2 boyutları sections arasında farklı (About: text-4xl, HowItWorks: text-3xl).
- **Öneri:** Heading size constants oluştur ve standardize et.
- **Efor:** Orta

#### Bulgu 25 — Icon Prop Handling Scattered
- **Önem:** Kritik
- **Kategori:** Komponent API
- **Açıklama:** Custom icon komponentler farklı size props ile çağrılıyor, unified IconWrapper yok.
- **Öneri:** `src/components/ui/Icon.tsx` wrapper oluştur.
- **Efor:** Büyük

### 8. CTA.tsx
#### Bulgu 29 — FadeUp Component Duplication
- **Önem:** Önemli
- **Kategori:** Kod Tekrarı / DRY
- **Açıklama:** CTA.tsx'de local `FadeUp` wrapper, motion.tsx'de `FadeIn` var. Duplicate.
- **Efor:** Küçük

### 9. MultiStepForm.tsx
#### Bulgu 36 — Button Styling Inline
- **Önem:** Önemli
- **Kategori:** Komponent API
- **Açıklama:** Form buttons inline styled, Button component kullanılmamış.
- **Kanıt:** MultiStepForm.tsx:236-263
- **Efor:** Orta

---

## ÇAPRAZ NOTLAR

### UX
- Form submit buttons'a ArrowUpRight icon uygun mu? Bağlam dışı görünebilir.
- MultiStepForm'da form error display eksik görünüyor — kontrol et.

### Marka
- Lime (#A3E635) overuse riski — balance kontrol et.

### Erişilebilirlik
- Button primary (lime on dark purple) — WCAG AA kontrol edilmeli.
- MultiStepForm input label'ları kontrol edilmeli.

---

## ÖZET ETKİ MATRİSİ

| Önem | Bulgu Sayısı | Öncelik |
|------|-------------|---------|
| Kritik | 3 | Hemen düzelt |
| Önemli | 18 | Sprint 1 |
| Polish | 10+ | Sprint 2+ |

## ÖNERİLEN REFACTOR SIRASI
1. `motion-tokens.ts` → tüm hardcoded motion değerleri merkeze çek
2. `Icon.tsx` wrapper → icon sizing standardize
3. `Button.tsx` → size ratio + icon scaling düzelt
4. Section padding + maxWidth → CSS variable'a taşı
5. Dark mode audit & token expansion
