# Verimio — Kurumsal Kimlik Kılavuzu
**Versiyon:** 1.0 — Şubat 2026  
**Durum:** Onaylandı ✅

---

## 1. Marka Özü

**Misyon:** Türk KOBİ'lerinin AI potansiyelini keşfetmesini ve iş süreçlerini dönüştürmesini sağlamak.

**Pozisyonlama:** Danışman gibi konuşan, satıcı gibi davranmayan AI rehberi.

**Ses Tonu:**
- "sen" hitabı — modern B2B Türkçesi
- Kısa cümleler (max 20 kelime)
- Teknik ama anlaşılır
- Güven veren, abartısız

**✓ Bunu söyle:**
- "3 dakikada şirketinin AI hazırlık seviyesini öğren."
- "Çoğu KOBİ AI'ı doğru sıradan başlatmıyor."

**✗ Bunu söyleme:**
- "Yapay zeka ile geleceği şekillendiriyoruz!"
- "Sektörün lideri çözümler sunuyoruz."

---

## 2. Logo

### 2.1 Wordmark

**Yapı:** `verim` + `io` — geometric sans-serif, round terminals, lowercase  
**Onaylanan format:** `verim` (beyaz) + `io` (lime #A3E635) — deep indigo arka plan

```
verimio
└─────┘└┘
 Beyaz  Lime
```

**Font karakteri:** Bold 700, letter-spacing: -0.02em

### 2.2 Kullanım Varyasyonları

| Varyasyon | verim rengi | io rengi | Arka plan | Kullanım |
|---|---|---|---|---|
| Dark Full ✅ Ana | #FFFFFF | #A3E635 | #2E1065 | Web, sunum, varsayılan |
| Light Full | #2E1065 | #4D7C0F | #F5F5F4 | Açık zemin, baskı |
| Dark Mono | #FFFFFF | #FFFFFF | #2E1065 | Tek renk baskı |
| Light Mono | #1C1917 | #1C1917 | #F5F5F4 | Tek renk açık |
| Dark Lime Heavy | #A3E635 | #FFFFFF | #1E0A46 | Özel vurgu |
| Black Full | #FFFFFF | #A3E635 | #000000 | Siyah zemin |

### 2.3 V Monogram

**Kullanım:** Favicon, profil fotoğrafı, app icon, küçük boyutlar  
**Yapı:** V çizgisi (beyaz) + lime nokta (tepede)

```svg
<path d="M8 12 L32 52 L56 12" stroke="white" strokeWidth="8"/>
<circle cx="32" cy="10" r="6" fill="#A3E635"/>
```

| Varyasyon | V rengi | Nokta rengi | Arka plan |
|---|---|---|---|
| Dark ✅ Ana | #FFFFFF | #A3E635 | #2E1065 |
| Light | #2E1065 | #4D7C0F | #F5F5F4 |
| Lime BG | #2E1065 | #1E0A46 | #A3E635 |
| Black | #FFFFFF | #A3E635 | #000000 |

### 2.4 Boyut Kuralları

| Boyut | Format | Kullanım |
|---|---|---|
| 16–24px | V monogram | Favicon |
| 32px | V monogram | Tab ikonu, küçük UI |
| 48–72px | Wordmark | Navbar, header |
| 96px+ | Wordmark | Hero, sunum |

### 2.5 Yasak Kullanımlar
- ❌ Logo üzerine metin veya grafik ekleme
- ❌ Oranları değiştirme
- ❌ Onaylanmamış renk kombinasyonu
- ❌ Düşük kontrastlı arka plan (lime bg üzerine beyaz logo)
- ❌ Büyük harf (VERIMIO değil, verimio)

---

## 3. Renk Sistemi

### 3.1 Ana Renkler

| İsim | Token | Hex | Kullanım |
|---|---|---|---|
| Deep Indigo | `--primary` | `#2E1065` | Ana arka plan, navbar, dark bg |
| Vivid Lime | `--secondary` | `#A3E635` | CTA buton, logo "io", vurgu |
| Dark Indigo | `--dark` | `#1E0A46` | Kart arka planı, ikincil bg |
| Soft Purple | `--primary-light` | `#8B5CF6` | Gradient, hover, link, border |

### 3.2 Nötr Renkler

| İsim | Token | Hex | Kullanım |
|---|---|---|---|
| White | — | `#FFFFFF` | Logo "verim", başlıklar (dark bg) |
| Cream | `--cream` | `#F5F5F4` | Light mode arka plan |
| Stone | `--muted` | `#78716C` | Gövde metni, alt yazı |
| Charcoal | `--foreground` | `#1C1917` | Light mode metin |

### 3.3 Semantik Renkler

| İsim | Hex | Kullanım |
|---|---|---|
| Success | `#22C55E` | Başarı mesajı, onay |
| Warning | `#F59E0B` | Uyarı, dikkat |
| Error | `#EF4444` | Hata, iptal |
| Info | `#3B82F6` | Bilgi mesajı, link |

### 3.4 Genişletilmiş Palet

| İsim | Hex | Kullanım |
|---|---|---|
| Lime 300 | `#BEF264` | Hover state, soft vurgu |
| Lime 700 | `#4D7C0F` | Light mode lime text |
| Indigo 800 | `#1E1B4B` | Section arka plan |
| Indigo 400 | `#818CF8` | Border, divider |

### 3.5 Admin Dark Theme Renkleri

```
Sayfa arka planı:  #0A0514
Kart arka planı:   #0F0A1E
Border (ince):     #1A1030
Border (koyu):     #2E1065
Yazı birincil:     #FFFFFF
Yazı ikincil:      #78716C
Yazı soluk:        #4C4462
Vurgu lime:        #A3E635
Mor vurgu:         #8B5CF6
```

### 3.6 Gradient Kombinasyonları

```css
/* Ana gradient */
background: linear-gradient(135deg, #2E1065 0%, #A3E635 100%);

/* Purple → Lime */
background: linear-gradient(135deg, #8B5CF6 0%, #A3E635 100%);

/* Dark → Indigo */
background: linear-gradient(135deg, #000000 0%, #2E1065 100%);

/* Radial aksan */
background: radial-gradient(circle, rgba(163,230,53,0.15) 0%, transparent 70%);
```

### 3.7 Renk Kullanım Kuralları
- ✅ Lime (#A3E635) yalnızca vurgu için — her yerde kullanma
- ✅ Dark bg üzerinde beyaz metin, light bg üzerinde #1C1917
- ❌ Lime zemin üzerine beyaz metin (kontrast yetersiz)
- ❌ İki parlak rengi yan yana (lime + purple)
- ❌ Markanın dışında renk ekleme (turuncu, kırmızı vb.)

---

## 4. Tipografi

### 4.1 Font Ailesi

**Birincil:** DM Sans (Google Fonts)  
**Teknik:** DM Mono (Google Fonts)

```typescript
// layout.tsx
import { DM_Sans, DM_Mono } from 'next/font/google'
const dmSans = DM_Sans({ weight: ['300','400','500','600','700'] })
const dmMono = DM_Mono({ weight: ['300','400','500'] })
```

### 4.2 Ağırlıklar ve Kullanım

| Ağırlık | İsim | Kullanım |
|---|---|---|
| 300 | Light | İnce alt başlık, zarif body |
| 400 | Regular | Gövde metni, paragraf |
| 500 | Medium | Etiket, badge, navigasyon |
| 600 | SemiBold | Alt başlık, kart başlığı |
| 700 | Bold | H1, H2, CTA, logo |

### 4.3 Boyut Hiyerarşisi

| Seviye | Boyut | Ağırlık | Letter Spacing | Kullanım |
|---|---|---|---|---|
| H1 | 48–64px | 700 | -0.03em | Hero başlık |
| H2 | 36–48px | 700 | -0.025em | Bölüm başlığı |
| H3 | 24–32px | 600 | -0.02em | Alt bölüm |
| Body LG | 18px | 400 | 0 | Öne çıkan paragraf |
| Body | 16px | 400 | 0 | Standart metin |
| Small | 14px | 400–500 | 0 | Etiket, caption |
| XSmall | 12px | 500–600 | +0.05em | Badge, tag |
| Mono | 14px | 400 | 0 | Kod, hex değer |

### 4.4 CSS Değişkenleri

```css
--font-size-xs:    0.75rem   /* 12px */
--font-size-sm:    0.875rem  /* 14px */
--font-size-base:  1rem      /* 16px */
--font-size-lg:    1.125rem  /* 18px */
--font-size-xl:    1.25rem   /* 20px */
--font-size-2xl:   1.5rem    /* 24px */
--font-size-3xl:   1.875rem  /* 30px */
--font-size-4xl:   2.25rem   /* 36px */
--font-size-5xl:   3rem      /* 48px */
--font-size-6xl:   3.75rem   /* 60px */

--line-height-tight:   1.2
--line-height-snug:    1.375
--line-height-normal:  1.5
--line-height-relaxed: 1.625
```

---

## 5. Sosyal Medya Varlıkları

### 5.1 Profil Fotoğrafı (400×400)

Tüm platformlarda V monogram kullanılır.

| Platform | Arka plan | V rengi | Nokta rengi |
|---|---|---|---|
| LinkedIn | #2E1065 | #FFFFFF | #A3E635 |
| Twitter/X | #000000 | #FFFFFF | #A3E635 |
| Instagram | #1E0A46 | #FFFFFF | #A3E635 |
| WhatsApp | #A3E635 | #2E1065 | #1E0A46 |

### 5.2 Banner Boyutları

| Platform | Boyut | Notlar |
|---|---|---|
| LinkedIn Banner | 1584×396px | Logo sol, CTA sağ |
| Twitter/X Header | 1500×500px | Centered wordmark |
| Instagram Post | 1080×1080px | 3 varyasyon |
| OG / Link Preview | 1200×630px | Otomatik (opengraph-image.tsx) |

### 5.3 Banner Tasarım Kuralları
- Arka plan: #2E1065 (LinkedIn), #000000 (Twitter), #1E0A46 (Instagram)
- Radial gradient aksan: lime, sağ üst köşe
- Logo sol üst — wordmark formatında
- CTA: lime (#A3E635) arka plan, indigo metin, bold
- URL sağ alt — soluk (#4C4462)

---

## 6. Dijital Uygulama Kuralları

### 6.1 Web (verimio.com.tr)

```
Navbar:       Dark indigo bg (#2E1065), beyaz wordmark
CTA buton:    Lime bg (#A3E635), indigo text (#2E1065), bold, rounded-xl
Hover:        Lime açık (#BEF264)
Link:         Purple (#8B5CF6), underline hover
Section bg:   #FFFFFF veya #F5F5F4 (light) — #2E1065 (dark)
```

### 6.2 Admin Panel

```
Arka plan:    #0A0514
Sidebar:      #0F0A1E, active lime
Kart:         #0F0A1E, border #1A1030
Başlık:       Beyaz bold
Body:         #78716C
Vurgu:        #A3E635 (lime)
```

### 6.3 Buton Hiyerarşisi

| Tür | Bg | Text | Kullanım |
|---|---|---|---|
| Primary | #A3E635 | #2E1065 | Ana CTA |
| Secondary | transparent | #A3E635 | İkincil eylem, border lime |
| Ghost | transparent | #78716C | Düşük öncelik |
| Danger | #EF4444 | #FFFFFF | Silme, iptal |

### 6.4 Tutarlılık Kontrol Listesi

Yeni bir sayfa veya component yaparken şunu kontrol et:

- [ ] Font: DM Sans mı kullanılıyor?
- [ ] Başlık: font-weight 700, letter-spacing -0.02em mi?
- [ ] Renkler: sadece palet içindeki renkler mi?
- [ ] CTA: lime bg + indigo text mi?
- [ ] Logo: lowercase, doğru renk kombinasyonu mu?
- [ ] Dark bg: #2E1065 veya #0A0514 mi?
- [ ] Border: #1A1030 veya #2E1065 mi?

---

## 7. Brand Preview

Tüm marka varlıklarını canlı görmek için:

```
https://verimio-website.vercel.app/brand-preview?token=verimio2025
```

Sekmeler: Logo · Sosyal Medya

---

## 8. Dosya Konumları

```
src/app/
├── icon.tsx              → Favicon (32px)
├── apple-icon.tsx        → Apple touch icon (180px)
├── opengraph-image.tsx   → OG görsel (1200×630)
├── globals.css           → CSS değişkenleri, font tanımları
├── layout.tsx            → DM Sans + DM Mono yükleme
└── brand-preview/        → Canlı marka önizleme sayfası

docs/
└── BRAND.md              → Bu dosya
```

---

*Son güncelleme: Şubat 2026 — Sedat Sabunyan*
