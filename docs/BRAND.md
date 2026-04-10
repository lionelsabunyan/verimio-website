# Verimio — Kurumsal Kimlik Kılavuzu
**Versiyon:** 2.0 — Mart 2026
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
**Onaylanan format:** `verim` (beyaz) + `io` (amber #F59E0B) — midnight arka plan

```
verimio
└─────┘└┘
 Beyaz  Amber
```

**Font karakteri:** Bold 700, letter-spacing: -0.02em

### 2.2 Kullanım Varyasyonları

| Varyasyon | verim rengi | io rengi | Arka plan | Kullanım |
|---|---|---|---|---|
| Dark Full ✅ Ana | #FFFFFF | #F59E0B | #020617 | Web, sunum, varsayılan |
| Light Full | #0F172A | #D97706 | #F5F5F4 | Açık zemin, baskı |
| Dark Mono | #FFFFFF | #FFFFFF | #020617 | Tek renk baskı |
| Light Mono | #1C1917 | #1C1917 | #F5F5F4 | Tek renk açık |
| Dark Amber Heavy | #F59E0B | #FFFFFF | #0F172A | Özel vurgu |
| Black Full | #FFFFFF | #F59E0B | #000000 | Siyah zemin |

### 2.3 V Monogram

**Kullanım:** Favicon, profil fotoğrafı, app icon, küçük boyutlar
**Yapı:** V çizgisi (beyaz) + amber nokta (tepede)

```svg
<path d="M8 12 L32 52 L56 12" stroke="white" strokeWidth="8"/>
<circle cx="32" cy="10" r="6" fill="#F59E0B"/>
```

| Varyasyon | V rengi | Nokta rengi | Arka plan |
|---|---|---|---|
| Dark ✅ Ana | #FFFFFF | #F59E0B | #020617 |
| Light | #0F172A | #D97706 | #F5F5F4 |
| Amber BG | #0F172A | #020617 | #F59E0B |
| Black | #FFFFFF | #F59E0B | #000000 |

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
- ❌ Düşük kontrastlı arka plan (amber bg üzerine beyaz logo)
- ❌ Büyük harf (VERIMIO değil, verimio)

---

## 3. Renk Sistemi (Midnight + Amber — Mart 2026)

### 3.1 Ana Renkler

| İsim | Token | Hex | Kullanım |
|---|---|---|---|
| Midnight | `--primary` | `#020617` | En koyu arka plan, hero |
| Slate-900 | `--surface` | `#0F172A` | Surface, navbar, kartlar |
| Amber | `--secondary` | `#F59E0B` | CTA buton, logo "io", vurgu |
| Soft Blue | `--support` | `#60A5FA` | Support rengi, aurora, gradient |

### 3.2 Nötr Renkler

| İsim | Token | Hex | Kullanım |
|---|---|---|---|
| White | — | `#FFFFFF` | Logo "verim", başlıklar (dark bg) |
| Slate-100 | `--text` | `#F1F5F9` | Ana metin (dark bg) |
| Cream | `--cream` | `#F5F5F4` | Light mode arka plan |
| Slate-400 | `--muted` | `#94A3B8` | Muted metin, alt yazı |
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
| Light Amber | `#FBBF24` | Hover state, soft vurgu |
| Dark Amber | `#D97706` | Light mode amber text |
| Slate-800 | `#1E293B` | Elevated surface, section bg |
| Soft Blue Light | `#93C5FD` | Border, divider |

### 3.5 Admin Dark Theme Renkleri

```
Sayfa arka planı:  #020617
Kart arka planı:   #0F172A
Border (ince):     #1E293B
Border (koyu):     #334155
Yazı birincil:     #F1F5F9
Yazı ikincil:      #94A3B8
Yazı soluk:        #64748B
Vurgu amber:       #F59E0B
Soft blue:         #60A5FA
```

### 3.6 Gradient Kombinasyonları

```css
/* Ana gradient */
background: linear-gradient(135deg, #020617 0%, #F59E0B 100%);

/* Midnight → Amber */
background: linear-gradient(135deg, #0F172A 0%, #F59E0B 100%);

/* Dark → Midnight */
background: linear-gradient(135deg, #000000 0%, #020617 100%);

/* Radial aksan */
background: radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%);
```

### 3.7 Renk Kullanım Kuralları
- ✅ Amber (#F59E0B) yalnızca vurgu için — her yerde kullanma
- ✅ Dark bg üzerinde beyaz metin, light bg üzerinde #1C1917
- ❌ Amber zemin üzerine beyaz metin (kontrast yetersiz)
- ❌ İki parlak rengi yan yana (amber + blue)
- ❌ Markanın dışında renk ekleme (yeşil, mor vb.)

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

---

## 5. Sosyal Medya Varlıkları

### 5.1 Profil Fotoğrafı (400×400)

Tüm platformlarda V monogram kullanılır.

| Platform | Arka plan | V rengi | Nokta rengi |
|---|---|---|---|
| LinkedIn | #0F172A | #FFFFFF | #F59E0B |
| Twitter/X | #000000 | #FFFFFF | #F59E0B |
| Instagram | #020617 | #FFFFFF | #F59E0B |
| WhatsApp | #F59E0B | #0F172A | #020617 |

### 5.2 Banner Boyutları

| Platform | Boyut | Notlar |
|---|---|---|
| LinkedIn Banner | 1584×396px | Logo sol, CTA sağ |
| Twitter/X Header | 1500×500px | Centered wordmark |
| Instagram Post | 1080×1080px | 3 varyasyon |
| OG / Link Preview | 1200×630px | Otomatik (opengraph-image.tsx) |

### 5.3 Banner Tasarım Kuralları
- Arka plan: #0F172A (LinkedIn), #000000 (Twitter), #020617 (Instagram)
- Radial gradient aksan: amber, sağ üst köşe
- Logo sol üst — wordmark formatında
- CTA: amber (#F59E0B) arka plan, midnight metin, bold
- URL sağ alt — soluk (#64748B)

---

## 6. Dijital Uygulama Kuralları

### 6.1 Web (verimio.com.tr)

```
Navbar:       Midnight bg (#020617), beyaz wordmark
CTA buton:    Amber bg (#F59E0B), midnight text (#020617), bold, rounded-xl
Hover:        Light Amber (#FBBF24)
Link:         Soft Blue (#60A5FA), underline hover
Section bg:   #FFFFFF veya #F5F5F4 (light) — #020617 (dark)
```

### 6.2 Admin Panel

```
Arka plan:    #020617
Sidebar:      #0F172A, active amber
Kart:         #0F172A, border #1E293B
Başlık:       Beyaz bold
Body:         #94A3B8
Vurgu:        #F59E0B (amber)
```

### 6.3 Buton Hiyerarşisi

| Tür | Bg | Text | Kullanım |
|---|---|---|---|
| Primary | #F59E0B | #020617 | Ana CTA |
| Secondary | transparent | #F59E0B | İkincil eylem, border amber |
| Ghost | transparent | #94A3B8 | Düşük öncelik |
| Danger | #EF4444 | #FFFFFF | Silme, iptal |

### 6.4 Tutarlılık Kontrol Listesi

Yeni bir sayfa veya component yaparken şunu kontrol et:

- [ ] Font: DM Sans mı kullanılıyor?
- [ ] Başlık: font-weight 700, letter-spacing -0.02em mi?
- [ ] Renkler: sadece palet içindeki renkler mi?
- [ ] CTA: amber bg + midnight text mi?
- [ ] Logo: lowercase, doğru renk kombinasyonu mu?
- [ ] Dark bg: #020617 veya #0F172A mi?
- [ ] Border: #1E293B veya #334155 mi?

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

*Son güncelleme: Mart 2026 — Midnight + Amber rebrand*
