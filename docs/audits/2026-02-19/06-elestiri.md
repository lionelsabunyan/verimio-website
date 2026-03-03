# ELEŞTİRİ AUDIT RAPORU — Verimio Website
**Tarih:** 2026-02-19  
**Uzman:** Eleştiri (Kritik Değerlendirme)  
**Durum:** Tamamlandı  
**Toplam Bulgu:** 15

---

## DETAYLI BULGULAR

### Bulgu 1 — Testimoniallar Kurgusal — Dürüstlük Sorunu
- **Önem:** Kritik
- **Kategori:** Dürüstlük | Yasal Risk
- **Açıklama:** "Ahmet Y.", "Elif K.", "Murat S." — doğrulanamaz, şirket adı yok, tarih yok. Kurumsal alıcı (director-level) bu referanslara güvenmez.
- **Kanıt:** constants.ts:86-105 — isimler kısaltılmış, şirket yok
- **Öneri:** Gerçek müşteri sözleri al (video daha iyi). Geçici: "3+ kurumdan geri bildirim" yaz, spesifik kurgusal kişi kullanma.
- **Efor:** Orta

### Bulgu 2 — Rapor Generation Promise Boş — Backend Yok
- **Önem:** Kritik
- **Kategori:** Dürüstlük | Conversion
- **Açıklama:** "Somut rakamlarla ortaya koyan raporunuz..." vaadi yapılıyor ama form submit → console.log → 3 sn bekleme → /tesekkurler. Backend entegrasyonu yok. Bu fake promise.
- **Kanıt:** MultiStepForm.tsx:130-134 — `// FAZ 6'da Supabase + n8n entegrasyonu yapılacak`
- **Öneri:** Ya backend yap, ya da "Sorularınız gönderildi, 24-48 saatte danışmanımız sizi arar" diye dürüst söyle.
- **Efor:** Büyük

### Bulgu 3 — "90 Günlük Yol Haritası" Klişe, Açıklanmıyor
- **Önem:** Önemli
- **Kategori:** Klişe | Belirsizlik
- **Açıklama:** 5+ yerde geçiyor ama kim hazırlıyor, nasıl, ne içeriyor? Cevap yok.
- **Kanıt:** HERO_CONTENT.cards[2], BENEFITS[5], FAQ #2,#4
- **Öneri:** Somutlaştır: "Ay 1: Analiz, Ay 2: Uygulama, Ay 3: Optimizasyon" veya örnek PDF ekle.
- **Efor:** Orta

### Bulgu 4 — Form Step 4 Logic Confusing
- **Önem:** Önemli
- **Kategori:** Zayıf Karar | UX
- **Açıklama:** 4 adımlı form, step 3→4 geçişinde aniden ikili CTA. Kullanıcı "submit mu ediyorum?" bilmiyor. Sektor-based soru logic da tutarsız ("Diğer" seçerse daha az soru).
- **Kanıt:** MultiStepForm.tsx:280-307, satır 110
- **Öneri:** Form adımlarını 3'e indir, step 4'ü "Doğrulama" olarak etiketle, sektor logic'i kaldır.
- **Efor:** Orta

### Bulgu 5 — Hiçbir Fiyat Bilgisi Yok
- **Önem:** Kritik
- **Kategori:** Conversion | Şeffaflık
- **Açıklama:** "Teklif sunuyoruz" = müşteri için kayış. Rakip danışmanlıklar price range veriyor.
- **Kanıt:** FAQ_ITEMS[4] — boş cevap, Hizmetler sayfasında fiyat yok
- **Öneri:** "Uygulama danışmanlığı tipik ₺5K–₺50K aralığında" veya paket seçeneği sun.
- **Efor:** Küçük

### Bulgu 6 — "Satış Baskısı Yok" Hipokrisi
- **Önem:** Önemli
- **Kategori:** Manipülasyon Riski | Tutarsızlık
- **Açıklama:** "Danışman değil, satış kanalı değiliz" deniyor ama her sayfada CTA, form'da "Danışmanlık Planla" lime butonu (görsel baskı), "Rapor Al" secondary beyaz buton.
- **Kanıt:** MultiStepForm.tsx:296 (secondary border) vs 316 (primary bg) — farklı visual weight
- **Öneri:** Button weight eşitle. "Danışman arayacak mı?" → OPT-IN checkbox ekle.
- **Efor:** Küçük

### Bulgu 7 — Blog Yazıları Draft, Slug Çalışmıyor
- **Önem:** Önemli
- **Kategori:** Klişe | Content Quality
- **Açıklama:** 6 blog başlığı SEO amaçlı görünüyor, içerik yok, slug linkleri implement değil.
- **Kanıt:** constants.ts:188-237 — BLOG_POSTS, /blog/[slug]/ çalışmıyor
- **Öneri:** 3-4 gerçek blog post yaz, geri kalanları sil. Depth > sayı.
- **Efor:** Büyük

### Bulgu 8 — Success Metrics Vague
- **Önem:** Önemli
- **Kategori:** Dürüstlük | Claim Validation
- **Açıklama:** "%60 otomasyon" — ne demek? Zaman? İşçi? Maliyet? "Ocak 2026" tarih fake görünüyor.
- **Kanıt:** constants.ts SUCCESS_STORIES:263-282
- **Öneri:** "Response time %40 düştü (12s → 7.2s)" gibi somut metrik. Tarihi çıkar veya açıkla.
- **Efor:** Küçük

### Bulgu 9 — "Kurumsal AI Danışmanlığı" Konumlandırması Zayıf
- **Önem:** Önemli
- **Kategori:** Ayrışma | Konumlandırma
- **Açıklama:** 5 hizmet alanı = generic automation consulting. Rakip farkı net değil. "AI" etiketi differentiator değil artık.
- **Kanıt:** hizmetler/page.tsx:18-79, EXPERTISE_ITEMS
- **Öneri:** Vertical-specific pozisyonla: "Türk KOBİ'lerine özel" veya "Lojistik otomasyon" derinliği.
- **Efor:** Büyük (strateji)

### Bulgu 10 — Gizlilik Politikası 404
- **Önem:** Önemli
- **Kategori:** Legal | Trust Signal
- **Açıklama:** FAQ'da "NDA imzalayabiliriz" yazıyor ama /gizlilik 404, /kullanim-sartlari da yok.
- **Kanıt:** Footer linkler → 404
- **Öneri:** Gizlilik politikası sayfası oluştur (template yeterli). NDA için email adresi yaz.
- **Efor:** Orta

### Bulgu 11 — Video İçerik Yok
- **Önem:** Önemli
- **Kategori:** Klişe | Conversion
- **Açıklama:** 2026'de B2B danışmanlık sitesinde founder video, explainer video veya case study video yok. Kurumsal müşteriler video ile daha iyi dönüşüm yapıyor.
- **Kanıt:** Hero ve Hakkımızda sayfaları static fal.ai görseli
- **Öneri:** 15sn hero animasyonu + 1dk founder intro. Admin panelde video generation var, kullan.
- **Efor:** Büyük

### Bulgu 12 — Design System %85 Coherent, %15 Kaçak
- **Önem:** Polish
- **Kategori:** Zayıf Karar | Design System
- **Açıklama:** Blog sayfasında gradient text yok (About'ta var). Footer email hover transition yok. Social linkler "#".
- **Öneri:** Her sayfa brand checklist karşılaştır. Gradient text daha sık kullan.
- **Efor:** Küçük

### Bulgu 13 — Conversion Path Çok Linear
- **Önem:** Polish
- **Kategori:** Zayıf Karar | Conversion
- **Açıklama:** Form → submit, araya "Hangi hizmet?" seçimi yok. Post-form sonrası "rapor bekliyorum" ekranı yok.
- **Öneri:** Step 2.5: hizmet align seçimi. Post-form: "Raporunuz 24-48 saate gelecek, o sırada [Blog] oku."
- **Efor:** Orta

### Bulgu 14 — Social Proof = Sıfır (Video, Logo, Press Yok)
- **Önem:** Kritik
- **Kategori:** Dürüstlük | Trust Building
- **Açıklama:** Press: 0, Case study PDF: 0, Client logos: 0, Founder credentials: 0, Video: 0.
- **Öneri:** Founder'ı öne çıkar (LinkedIn, blog). 2-3 anonim case study (metrik + sektör). Logolar (izinle).
- **Efor:** Büyük

### Bulgu 15 — "Her Sektör" Claim vs Form Logic Tutarsız
- **Önem:** Önemli
- **Kategori:** Dürüstlük | Form
- **Açıklama:** FAQ: "Her sektörde çalışıyoruz" ama formda "Diğer" seçilince daha az soru soruluyor.
- **Kanıt:** MultiStepForm.tsx:110, FAQ_ITEMS[7]
- **Öneri:** "Diğer" sektör = full form. Veya sektör kısıtlamasını açıkça söyle.
- **Efor:** Küçük

---

## ÇAPRAZ NOTLAR

### Teknik
- Form submit API entegrasyonu kritik eksik — önce bunu çöz, sonra marketing.
- Blog slug route'ları implement edilmeli (/blog/[slug]/ 404).

### UX
- Post-form success ekranı ("Raporunuz hazırlanıyor") tasarlanmalı.
- Fiyat şeffaflığı → conversion artırır, "ücretsiz" vurgusu zayıflıyor.

---

## ÖNCELİK SIRASI

| # | Bulgu | Efor | Aciliyet |
|---|-------|------|---------|
| 1 | Form submit backend | Büyük | 🔴 Kritik |
| 2 | Fiyat bilgisi ekle | Küçük | 🔴 Kritik |
| 3 | Testimonials gerçekleştir | Orta | 🔴 Kritik |
| 4 | Gizlilik politikası sayfası | Orta | 🟡 Önemli |
| 5 | Blog slug implement | Büyük | 🟡 Önemli |
| 6 | Button visual weight eşitle | Küçük | 🟡 Önemli |
| 7 | Success metrics somutlaştır | Küçük | 🟡 Önemli |
| 8 | Video içerik | Büyük | 🟢 İleride |
| 9 | Vertical positioning | Büyük | 🟢 Strateji |
