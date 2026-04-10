# Verimio — Kurumsal Kimlik Kılavuzu
**Versiyon:** 3.0 — Nisan 2026
**Durum:** Onaylandı ✅

---

## 1. Marka Özü

**Misyon:** Türk KOBİ'lerinin AI potansiyelini keşfetmesini ve iş süreçlerini dönüştürmesini sağlamak.

**Pozisyonlama:** Danışman gibi konuşan, satıcı gibi davranmayan AI rehberi.

**Ses Tonu:**
- "siz" hitabı — ciddi ama bürokratik olmayan B2B Türkçesi
- Kısa cümleler (max 20 kelime)
- Teknik ama anlaşılır
- Güven veren, abartısız

**✓ Bunu söyle:**
- "3 dakikada şirketinizin AI hazırlık seviyesini öğrenin."
- "Çoğu KOBİ AI'ı doğru sıradan başlatmıyor."

**✗ Bunu söyleme:**
- "Yapay zeka ile geleceği şekillendiriyoruz!"
- "Sektörün lideri çözümler sunuyoruz."

---

## 2. Logo

### 2.1 Wordmark

**Yapı:** `verimio` — tek renk, geometric sans-serif, lowercase
**Font:** PP Neue Montreal Bold 700, letter-spacing: -0.02em

```
verimio
└──────┘
 Tek renk
```

### 2.2 Kullanım Varyasyonları

| Varyasyon | Renk | Arka plan | Kullanım |
|---|---|---|---|
| Dark ✅ Ana | #0A0A0A | #FFFFFF | Web, sunum, varsayılan |
| Light | #FFFFFF | #0A0A0A | Koyu arka plan |
| Light Mono | #0A0A0A | #F5F5F5 | Açık gri zemin |

### 2.3 V Monogram

**Kullanım:** Favicon, profil fotoğrafı, app icon, küçük boyutlar
**Yapı:** V çizgisi + nokta (tepede), tek renk

```svg
<path d="M8 12 L32 52 L56 12" stroke="#FFFFFF" strokeWidth="8"/>
<circle cx="32" cy="10" r="6" fill="#FFFFFF"/>
```

| Varyasyon | V + Nokta rengi | Arka plan |
|---|---|---|
| Dark ✅ Ana | #FFFFFF | #0A0A0A |
| Light | #0A0A0A | #FFFFFF |

### 2.4 Yasak Kullanımlar
- Logo üzerine metin veya grafik ekleme
- Oranları değiştirme
- Onaylanmamış renk kombinasyonu
- Büyük harf (VERIMIO değil, verimio)
- İki renkli wordmark (eski verim + io ayrımı KALDIRILDI)

---

## 3. Renk Sistemi — Saf Monokrom Editorial (Nisan 2026)

### 3.1 Ana Palet (Sadece Bu 5 Değer)

| İsim | Hex | CSS Var | Kullanım |
|---|---|---|---|
| Zemin | `#FFFFFF` | `--background` | Saf beyaz arka plan |
| Birincil metin | `#0A0A0A` | `--foreground` | Neredeyse siyah, biraz yumuşatılmış |
| İkincil metin | `#5C5C5C` | `--foreground-secondary` | Orta gri, body metin |
| Üçüncül / disabled | `#A3A3A3` | — | Açık gri, muted |
| Hairline border | `#E5E5E5` | `--border` | Çizgi, ayraç, divider |

### 3.2 Semantik Renkler (Sadece fonksiyonel kullanım)

| İsim | Hex | Kullanım |
|---|---|---|
| Success | `#16A34A` | Başarı mesajı, onay |
| Error | `#DC2626` | Hata, iptal |

### 3.3 Renk Kuralları
- Hiçbir vurgu rengi yok
- CTA butonları: siyah zemin (#0A0A0A) + beyaz metin (#FFFFFF)
- Linkler: altçizgili siyah (#0A0A0A)
- Hover state'leri: opacity veya altçizgi animasyonu
- Gradient, glow, neon → YASAK

### 3.4 ESKİ Paletler (KULLANILMIYOR)
- ~~Midnight #020617 + Amber #F59E0B + Soft Blue #60A5FA~~ → Mart 2026, kaldırıldı
- ~~Indigo #2E1065 + Purple #8B5CF6 + Lime #A3E635~~ → Şubat 2026, kaldırıldı

---

## 4. Tipografi — PP Neue Montreal (Tek Font Ailesi)

**Kaynak:** Pangram Pangram (self-hosted woff2)
**Hiçbir yardımcı font, hiçbir Google Fonts, hiçbir monospace yok.**

### 4.1 Ağırlık Paleti (Sadece Bunlar)

| Ağırlık | İsim | Kullanım |
|---|---|---|
| 300 | Book | Uzun metinler |
| 400 | Regular | Gövde metni |
| 500 | Medium | Nadiren, vurgu için |
| 700 | Bold | Sadece display başlıklarda |

### 4.2 Boyut Hiyerarşisi

| Seviye | Boyut | Ağırlık | Letter Spacing | Line Height | Kullanım |
|---|---|---|---|---|---|
| H1/Display | clamp 56–120px | Bold | -0.02em | 1.0 | Hero başlık |
| H2 | 32–48px | Medium/Bold | -0.02em | 1.1 | Bölüm başlığı |
| H3 | 20–24px | Medium | -0.01em | 1.2 | Alt bölüm |
| Body | 17–18px | Regular | 0 | 1.5 | Standart metin |
| Small | 13–14px | Regular | +0.01em | 1.5 | Etiket, caption |

### 4.3 Font Dosyaları

```
public/fonts/
├── ppneuemontreal-book.woff2     (400)
├── ppneuemontreal-medium.woff2   (500)
├── ppneuemontreal-bold.woff2     (700)
└── ppneuemontreal-italic.woff2   (400, italic)
```

### 4.4 ESKİ Fontlar (KULLANILMIYOR)
- ~~DM Sans + DM Mono~~ → Mart 2026, kaldırıldı

---

## 5. Layout Felsefesi

- Asimetrik, sol hizalı, cömert boşluklu
- **Hiçbir şey ortalanmış değil** — başlıklar, CTA'lar, tüm content sol hizalı
- Grid: 12 kolon ama tipik bölüm 6–8 kolon kullanır, sağda nefes bırakır
- Bölümler arası dikey boşluk: 120–200px
- Element içi padding nadiren 24px altına düşer

---

## 6. Sosyal Medya Varlıkları

### 6.1 Profil Fotoğrafı (400×400)

Tüm platformlarda V monogram: beyaz V + beyaz nokta, siyah arka plan (#0A0A0A)

### 6.2 Banner / OG Image

- Arka plan: #FFFFFF (saf beyaz)
- Metin: #0A0A0A (siyah)
- CTA: siyah bg + beyaz metin
- Logo: siyah wordmark, sol hizalı
- URL: #A3A3A3 (muted gri)

### 6.3 Blog Kapak Görselleri — Beyaz Minimal Line-Art
- **Model:** Nano Banana Pro (`nano-banana-pro-preview`) — Google AI Studio
- **Stil:** Saf beyaz arka plan + siyah ince çizgi illüstrasyon
- **Boyut:** 1200x630 landscape, webp, hedef <50KB
- Detay: `Verimio/CLAUDE.md` → Görsel Üretim bölümü

---

## 7. Dijital Uygulama Kuralları

### 7.1 Web (verimio.com.tr)

```
Navbar:       Beyaz bg, siyah wordmark
CTA buton:    Siyah bg (#0A0A0A), beyaz text (#FFFFFF), bold, rounded
Hover:        Opacity geçişi
Link:         Siyah (#0A0A0A), altçizgili
Section bg:   #FFFFFF
Border:       #E5E5E5
```

### 7.2 Email Şablonları

```
Arka plan:    #FFFFFF
Kart:         #FFFFFF, border #E5E5E5
Başlık:       #0A0A0A bold
Body:         #5C5C5C
CTA buton:    #0A0A0A bg + #FFFFFF metin
Link:         #0A0A0A altçizgili
Footer:       #A3A3A3
```

### 7.3 Buton Hiyerarşisi

| Tür | Bg | Text | Kullanım |
|---|---|---|---|
| Primary | #0A0A0A | #FFFFFF | Ana CTA |
| Secondary | transparent | #0A0A0A | İkincil eylem, border siyah |
| Ghost | transparent | #5C5C5C | Düşük öncelik |
| Danger | #DC2626 | #FFFFFF | Silme, iptal |

### 7.4 Tutarlılık Kontrol Listesi

- [ ] Font: PP Neue Montreal mi?
- [ ] Renkler: sadece 5 palet değerinden mi?
- [ ] CTA: siyah bg + beyaz metin mi?
- [ ] Logo: lowercase, tek renk siyah mı?
- [ ] Gradient/glow/vurgu rengi yok mu?
- [ ] Sol hizalı mı? (ortalanmış değil)

---

## 8. Dosya Konumları

```
src/app/
├── icon.tsx              → Favicon (32px)
├── apple-icon.tsx        → Apple touch icon (180px)
├── opengraph-image.tsx   → OG görsel (1200×630)
├── globals.css           → CSS değişkenleri, monokrom palet
├── layout.tsx            → PP Neue Montreal yükleme
└── brand-preview/        → Canlı marka önizleme sayfası

public/fonts/             → PP Neue Montreal woff2 dosyaları
docs/BRAND.md             → Bu dosya
```

---

*Son güncelleme: Nisan 2026 — Saf Monokrom Editorial rebrand (v3.0)*
*Önceki: Midnight + Amber (Mart 2026, v2.0) → kaldırıldı*
