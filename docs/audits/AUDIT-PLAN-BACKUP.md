# Verimio Paralel Uzman Audit Planı — Yedek
# Tarih: 2026-02-19
# Bu dosya, chat kesilirse başka chat'ten devam etmek için kullanılabilir.

## Bağlam (Context)

Verimio'nun `.claude/skills/verimio-creative.md` dosyasında 8 uzman modu tanımlı:
design-system, marka, ui, pazarlama, figma, eleştiri, trend, erişilebilirlik.

**Amaç:** 8 uzmanın paralel olarak siteyi audit etmesi, bulgularını çapraz referanslaması ve tek bir önceliklendirilmiş rapor üretmesi.

---

## Uygulama: 3 Fazlı Orkestrasyon

### Faz 1 — Paralel Uzman Audit (8 Task agent, eşzamanlı)

8 adet `Task` subagent'ı tek bir mesajda paralel başlatılır. Her biri:
- Kendi uzmanlık perspektifinden tüm public sayfaları okur
- Standart formatta bulgularını raporlar
- "Çapraz Notlar" bölümünde diğer uzmanlara mesaj bırakır

**Audit kapsamı (public sayfalar):**
- `/` (Ana Sayfa) — Hero, About, HowItWorks, Expertise, Blog, Testimonials, CTA
- `/hakkimizda` — Hero, problem/çözüm, 3 farklılaştırıcı, FAQ
- `/hizmetler` — 5 hizmet kartı, 4 adımlı süreç
- `/analiz` — MultiStepForm (4 adım), Benefits
- `/blog` — Blog grid, BlogCardImage
- `/iletisim` — İletişim sayfası
- `/sss` — FAQ sayfası
- `not-found.tsx`, `loading.tsx` — Yardımcı sayfalar

**Her uzmanın okuyacağı dosyalar:**

| Uzman | Dosyalar |
|-------|----------|
| 1. Design System | `globals.css`, `Button.tsx`, `SectionLabel.tsx`, `motion.tsx`, `Decoratives.tsx`, `Logo.tsx`, tüm section bileşenleri |
| 2. Marka | `constants.ts`, `Logo.tsx`, tüm `page.tsx` dosyaları |
| 3. UI/UX | Tüm `page.tsx`, `Navbar.tsx`, `Footer.tsx`, `Hero.tsx`, `MultiStepForm.tsx`, tüm section bileşenleri |
| 4. Pazarlama | `constants.ts` (tüm copy), tüm `page.tsx` (hardcoded copy kontrolü) |
| 5. Figma/Spec | Tüm `ui/`, `brand/`, `sections/` bileşenleri, `globals.css` |
| 6. Eleştiri | Tüm `page.tsx`, form bileşenleri, navigation, 404, loading |
| 7. Trend | Tüm `page.tsx`, brand bileşenleri, illustrations, `globals.css` |
| 8. Erişilebilirlik | Tüm `page.tsx`, tüm bileşenler, `globals.css`, form bileşenleri |

**Standart çıktı formatı (her uzman):**

```markdown
## [Uzman Adı] Audit Raporu

### Sayfa: [sayfa adı]
#### Bulgu N
- **Önem:** Kritik | Önemli | Polish
- **Kategori:** [uzmanlık alanına özel]
- **Açıklama:** [ne sorunlu]
- **Kanıt:** [dosya yolu:satır numarası, spesifik kod]
- **Öneri:** [nasıl düzeltilir]
- **Efor:** Küçük | Orta | Büyük

### Çapraz Notlar (diğer uzmanlara)
[kendi alanı dışında gözlemlediği sorunlar]
```

### Faz 2 — Sentez Direktörü (1 Task agent, sıralı)

Faz 1'deki 8 raporun tamamını alır ve:

1. **Tekrar eden bulguları birleştirir** — Aynı sorunu birden fazla uzman tespit ettiyse tek bulgu haline getirir
2. **Çatışmaları çözer** — Trend uzmanı "ekle" derken erişilebilirlik uzmanı "sorunlu" diyorsa, çözüm önerir
3. **Çapraz bağlantılar kurar** — "Design System'in spacing tutarsızlığı + UI'ın hiyerarşi sorunu + Figma'nın eksik spec'i = aynı kök neden"
4. **Etki matrisi oluşturur** — Kullanıcı etkisi × Marka etkisi × Teknik efor × Bağımlılıklar

### Faz 3 — Birleşik Rapor (1 Task agent veya inline)

Tek bir Türkçe markdown rapor üretir:

```
docs/audits/2026-02-19-RAPOR.md
```

**Rapor yapısı:**
1. Yönetici Özeti (kritik/önemli/polish sayıları, en acil 3 aksiyon)
2. Sayfa Bazlı Bulgular (her sayfa için Kritik → Önemli → Polish)
3. Tema Bazlı Bulgular (Erişilebilirlik, Marka, UX, Teknik Borç)
4. Uzman Çatışmaları & Çözümler
5. Uygulama Yol Haritası (Hafta 1-2: Kritik, Hafta 3-4: Önemli, Hafta 5+: Polish)

---

## Kritik Dosya Yolları

```
src/app/globals.css
src/lib/constants.ts
src/app/page.tsx
src/app/hakkimizda/page.tsx
src/app/hizmetler/page.tsx
src/app/analiz/page.tsx
src/app/blog/page.tsx
src/app/iletisim/page.tsx
src/app/sss/page.tsx
src/app/not-found.tsx
src/app/loading.tsx
src/components/layout/Navbar.tsx
src/components/layout/Footer.tsx
src/components/sections/Hero.tsx
src/components/sections/About.tsx
src/components/sections/HowItWorks.tsx
src/components/sections/Expertise.tsx
src/components/sections/Blog.tsx
src/components/sections/Testimonials.tsx
src/components/sections/CTA.tsx
src/components/sections/FAQ.tsx
src/components/sections/Benefits.tsx
src/components/ui/Button.tsx
src/components/ui/SectionLabel.tsx
src/components/ui/motion.tsx
src/components/ui/ThemeToggle.tsx
src/components/brand/Logo.tsx
src/components/brand/Decoratives.tsx
src/components/brand/BlogCardImage.tsx
src/components/brand/TestimonialAvatar.tsx
src/components/brand/icons/index.ts
src/components/form/MultiStepForm.tsx
src/components/form/StepIndicator.tsx
```

## Çıktı Dosyaları

```
docs/audits/2026-02-19/
  01-design-system.md
  02-marka.md
  03-ui.md
  04-pazarlama.md
  05-figma.md
  06-elestiri.md
  07-trend.md
  08-erisilebilirlik.md
  09-sentez.md
  RAPOR.md
```

## Devam Etme Talimatı (yeni chat için)

Bu chat kesilirse, yeni chat'te şunu söyle:
"docs/audits/AUDIT-PLAN-BACKUP.md dosyasını oku ve planı uygula. Faz [X]'ten devam et."
