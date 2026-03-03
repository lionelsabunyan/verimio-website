# VERIMIO MARKA AUDIT RAPORU
**Tarih:** 2026-02-19  
**Uzman:** Marka (Brand)  
**Durum:** Tamamlandı  
**Genel Skor:** 7/10

## ÖZET
- **İyi:** Kurumsal ton, görseller, CTA tutarlılığı, Türkçe yazımı
- **Sorunlu:** Hedef kitle karmaşası, değer önerisi soyutluğu, sosyal kanıt eksikliği, monoton CTA
- **Kritik:** 3 | Önemli: 7 | Polish: 5

---

## DETAYLI BULGULAR

### Bulgu 1 — Hedef Kitle Tanımında Belirsizlik
- **Önem:** Kritik
- **Kategori:** Hedef Kitle | Mesajlaşma
- **Açıklama:** Site "kurumsal" konumlandırılmış ama mesajlaşma ikili çalışıyor. "100-500 kişi" ile "her ölçekteki firma" çakışıyor.
- **Kanıt:** constants.ts:23 "kurumsal yapıdaki her ölçekte firma" — çok geniş
- **Öneri:** Seç: "100-500 kişi kurumsal" VEYA "büyüme odaklı her ölçek" — tutarlı uygula.
- **Efor:** Orta

### Bulgu 2 — Değer Önerisi Soyut
- **Önem:** Kritik
- **Kategori:** Mesajlaşma | Değer Önerisi
- **Açıklama:** "Süreçlerinizi netleştirin, maliyetlerinizi düşürün" her SaaS'ın söylediği şey. Hangi role, hangi somut sorun çözülüyor?
- **Kanıt:** constants.ts:16-19, hakkimizda/page.tsx:62 "darboğazları tespit eder" — her danışman bunu söylüyor
- **Öneri:** Role-based problem tanımı: Lojistik Direktörü → "haftada 15 saat belge takibi", Finance → "Excel raporlama hataları" vb.
- **Efor:** Büyük

### Bulgu 3 — "Kurumsal" vs "Her Ölçekteki Firma" Çakışması
- **Önem:** Kritik
- **Kategori:** Hedef Kitle | Tutarlılık
- **Açıklama:** Logo "Kurumsal AI Danışmanlığı" yazıyor ama constants.ts:176 "büyüme odaklı firmalar" (startup da dahil).
- **Kanıt:** Logo.tsx vs constants.ts:176 vs hakkimizda/page.tsx:136
- **Öneri:** Bir hedef seç ve Navbar subheader, FAQ, About'ta tutarlı uygula.
- **Efor:** Orta

### Bulgu 4 — "Ücretsiz Check-Up" Belirsiz — Sonraki Ücret Beklentisi Yönetilmiyor
- **Önem:** Önemli
- **Kategori:** Mesajlaşma | İnanırlılık
- **Açıklama:** "Ücretsiz" her yerde vurgulanıyor ama neden ücretsiz, sonrası ne kadara açıklanmıyor. Ziyaretçi "gizli ücret var mı?" diye şüpheleniyor.
- **Kanıt:** analiz/page.tsx:20 "Ücretsiz" badge — ama mantığı yok; FAQ'te yazıyor ama öne çıkmıyor
- **Öneri:** Hero/Analiz'de "Rapor ücretsiz, uygulama fiyatı proje bazlı (1.000-50.000 ₺ arası)" şeffaflığı ekle.
- **Efor:** Orta

### Bulgu 5 — Testimonials Sosyal Kanıt Zayıf
- **Önem:** Önemli
- **Kategori:** Sosyal Kanıt | İnanırlılık
- **Açıklama:** Sadece "Ahmet Y., Operasyon Direktörü, Lojistik Sektörü" — şirket adı yok, LinkedIn yok, doğrulanamaz.
- **Kanıt:** constants.ts:114-118 — 3 referans, hepsi anonim
- **Öneri:** Şirket adı + LinkedIn profil bağlantısı + somut metrik ("raporlama süresi %80 azaldı, Mart 2026") ekle.
- **Efor:** Küçük

### Bulgu 6 — CTA Monoton — "Check-Up Başlatın" 40+ Tekrar
- **Önem:** Önemli
- **Kategori:** CTA | Mesajlaşma
- **Açıklama:** CTA tutarlı (iyi) ama bağlamsal değil. Blog, Hakkımızda, Testimonials hepsi aynı CTA kullanıyor.
- **Kanıt:** constants.ts:44 tek CTA string — tüm sayfalarda aynı
- **Öneri:** Blog: "Öğrendikleri Test Edin" | Hakkımızda: "Bizle Tanışın" | Testimonials: "Senin Hikayenin Başlasın"
- **Efor:** Orta

### Bulgu 7 — "AI Hazırlığı" Tanımlanmamış
- **Önem:** Önemli
- **Kategori:** Mesajlaşma | Açıklık
- **Açıklama:** "operasyonel verimliliğini ve AI hazırlığını analiz" — "AI hazırlığı" ne demek? Hiçbir yerde tanımlanmıyor.
- **Kanıt:** analiz/page.tsx:28, hero/page.tsx:42
- **Öneri:** "AI hazırlığı" → "yapay zeka için veri, entegrasyon ve ekip hazırlığı" olarak tanımla veya terimi değiştir.
- **Efor:** Küçük

### Bulgu 8 — Blog Kategorileri Hedef Kitleye Anlamsız
- **Önem:** Önemli
- **Kategori:** Mesajlaşma | Hedef Kitle
- **Açıklama:** Blog'da "ai-tools", "customer", "data", "roi" gibi teknik kategoriler var ama ziyaretçi açısından anlamlı değil.
- **Kanıt:** constants.ts:220-241 — kategori var ama filtreleme/açıklama yok
- **Öneri:** Persona-based filtreleme veya kategori badge'i görünür yap.
- **Efor:** Orta

### Bulgu 9 — Blog Yazı Tarihleri Eskimiş Görünüyor
- **Önem:** Önemli
- **Kategori:** İnanırlılık | Güncellik
- **Açıklama:** Tüm blog yazıları Şubat 2026 başına tarihlenmiş. Site 19 Şubat itibarıyla canlıya çıkıyor ama yazılar "geçmiş" gibi görünüyor.
- **Kanıt:** constants.ts:222-241 tüm tarihler 1-15 Şubat 2026
- **Öneri:** Tarihleri gerçek yayın tarihine çek veya "Coming Soon" yap.
- **Efor:** Küçük

### Bulgu 10 — "Darboğaz" Klişe Kullanımı
- **Önem:** Polish
- **Kategori:** Ton | Klişe
- **Açıklama:** "Darboğaz" 7+ sayfada tekrar ediyor. B2B danışmanlık jargonunda çok yaygın.
- **Kanıt:** constants.ts:20,24 | hakkimizda:36,91,117 | hizmetler:20
- **Öneri:** Çeşitlendir: "verimsiz noktalar", "tıkanıklıklar", "işlevsiz adımlar"
- **Efor:** Küçük

### Bulgu 11 — Teknoloji Referansı Tamamen Yok
- **Önem:** Polish
- **Kategori:** Farklılaşma | Şeffaflık
- **Açıklama:** n8n, Make, Vapi gibi araç adları kaldırılmış (doğru karar) ama hiçbir araç referansı yok. "Ne araçlarla çalışıyorlar?" sorusu yanıtsız.
- **Öneri:** "Endüstrinin en iyi araçlarıyla (n8n, Make, Zapier vb.)" gibi genel referans yeterli.
- **Efor:** Küçük

### Bulgu 12 — Türkçe Dil Küçük Tutarsızlıklar
- **Önem:** Polish
- **Kategori:** Dil Kalitesi
- **Açıklama:** Sahiplik ekleri ve ünlü uyumunda küçük tutarsızlıklar.
- **Kanıt:** iletisim/page.tsx:102 "check-up'ımızı" (bileşik + ünlü uyumu belirsiz), "Devamını Oku" vs "Devamı" gibi varyasyonlar
- **Öneri:** Tek geçişte dil revizyonu.
- **Efor:** Küçük

---

## ÇAPRAZ NOTLAR

### UX
- Mobile CTA sticky olmalı (Navbar'da kayboluyor)
- Loading.tsx SVG animasyonu çok hızlı (2-3s yapılabilir)
- Form submit sonrası "başarı ekranı" var mı? Kontrol et.

### Design System
- Tüm sayfalarda Primary button aynı — bağlamsal renk/varyant fark önerilir
- Testimonials küçük metin + %60 opacity → light theme'de contrast sorunu

### SEO
- JSON-LD schema (FAQPage, Organization) eklenmemiş — B2B'de önemli

---

## ÖNERİLEN UYGULAMA SIRASI

| Sprint | Aksiyon | Efor |
|--------|---------|------|
| 1 | Hedef kitle netleştirme (constants.ts) | Orta |
| 1 | Testimonials sosyal kanıt (LinkedIn + metrik) | Küçük |
| 1 | "AI hazırlığı" tanımlama | Küçük |
| 1 | Blog tarihleri güncelleme | Küçük |
| 2 | CTA çeşitlendirme (sayfaya göre) | Orta |
| 2 | Türkçe dil revizyonu | Küçük |
| 2 | Blog kategorileri persona-based | Orta |
| 3 | Role-based değer önerisi rewrite | Büyük |
| 3 | Fiyat şeffaflığı (ücretsiz → fiyat bandı) | Orta |
