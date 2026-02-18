// Verimio - Brand Constants & Content

export const BRAND = {
  name: "Verimio",
  tagline: "İş Süreçlerinizi AI ile Dönüştürün",
  email: "analiz@verimio.com.tr",
  website: "verimio.com.tr",
  tallyFormUrl: "/analiz",
  calendlyUrl: "#", // Cal.com URL — kurulum sonra güncellenecek
} as const;

export const NAV_LINKS = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Hizmetler", href: "/hizmetler" },
  { label: "Blog", href: "/blog" },
  { label: "İletişim", href: "/iletisim" },
] as const;

export const HERO_CONTENT = {
  headline: "İş Süreçlerinizi",
  headlineHighlight: "AI ile Dönüştürün",
  subheadline:
    "3 dakikada firmanızın yapay zeka potansiyelini keşfedin. Kişiselleştirilmiş analiz raporunuzu anında alın.",
  ctaPrimary: "Ücretsiz Analiz Başlat",
  ctaSecondary: "Nasıl Çalışır?",
  cards: [
    {
      title: "Süreç Otomasyonu",
      description: "Tekrarlayan işlerinizi AI ile otomatikleştirin",
    },
    {
      title: "Maliyet Analizi",
      description: "Otomasyon potansiyelinizi ve tasarrufunuzu öğrenin",
    },
    {
      title: "AI Yol Haritası",
      description: "90 günlük kişiselleştirilmiş dönüşüm planı alın",
    },
  ],
} as const;

export const TRUST_BADGES = [
  { icon: "check", text: "Ücretsiz İlk Görüşme" },
  { icon: "layers", text: "Sektöre Özel Analiz" },
  { icon: "shield", text: "NDA ile Gizlilik" },
  { icon: "phone-off", text: "Satış Baskısı Yok" },
] as const;

export const ABOUT_CONTENT = {
  label: "Biz Kimiz?",
  text: "Türk KOBİ'lerinin dijital dönüşümüne odaklanan bir AI danışmanlık firmasıyız. İster dijital dünyada deneyimli olun, ister ilk adımlarınızı atıyor olun — firmanıza özel AI çözümleri sunuyoruz.",
  ctaPrimary: "Verimio Hakkında",
  ctaSecondary: "Nasıl Çalışıyoruz?",
} as const;

export const STATS = [
  { value: "10+", label: "Firma Analiz Edildi" },
  { value: "%60+", label: "Ortalama Otomasyon Potansiyeli" },
  { value: "4 Alan", label: "Hizmet Kategorisi" },
  { value: "48 saat", label: "Rapor Teslim Süresi" },
] as const;

export const HOW_IT_WORKS = [
  {
    step: "01",
    icon: "clipboard-list",
    title: "Durumunuzu Anlatın",
    description:
      "3 dakikada sektörünüze özel 6 soruyu yanıtlayın. Sonunda rapor veya ücretsiz görüşme — siz seçin.",
  },
  {
    step: "02",
    icon: "search",
    title: "Analiz Edelim",
    description:
      "Cevaplarınızı uzman gözüyle değerlendirip firmanıza özel otomasyon fırsatlarını ve ROI potansiyelini belirliyoruz.",
  },
  {
    step: "03",
    icon: "rocket",
    title: "Harekete Geçelim",
    description:
      "Somut bir plan ve öncelik matrisiyle uygulamaya geçiyoruz. İster kendiniz yapın, ister biz yapalım.",
  },
] as const;

export const BENEFITS = [
  "Toplam otomasyon potansiyeli (saat/hafta)",
  "Tahmini maliyet tasarrufu (₺/ay)",
  "Öncelikli aksiyon alanları",
  "Her alan için somut çözüm önerileri",
  "Araç ve platform tavsiyeleri (fiyatlarıyla)",
  "90 günlük uygulama yol haritası",
] as const;

export const SUCCESS_STORIES = [
  {
    title: "E-ticaret Otomasyonu",
    subtitle: "Müşteri Desteği Dönüşümü",
    result: "Müşteri desteğinde %60 otomasyon",
    date: "Ocak 2026",
  },
  {
    title: "Ajans Verimliliği",
    subtitle: "Raporlama Otomasyonu",
    result: "Raporlama süresinde %80 tasarruf",
    date: "Şubat 2026",
  },
  {
    title: "B2B Süreç İyileştirme",
    subtitle: "Belge Yönetim Sistemi",
    result: "Haftalık 15 saat tasarruf",
    date: "Şubat 2026",
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "Verimio sayesinde müşteri destek süremiz 4 saatten 10 dakikaya düştü. AI chatbot önerisi hayat kurtardı!",
    name: "Ahmet Y.",
    role: "E-ticaret Firma Sahibi",
  },
  {
    quote:
      "Raporlama dashboard önerisi ile haftada 6 saat tasarruf ettik. Üstelik rapor tamamen ücretsizdi!",
    name: "Elif K.",
    role: "Dijital Ajans Müdürü",
  },
  {
    quote:
      "Belge yönetim sistemini kurduk, artık dosya aramak için vakit kaybetmiyoruz. ROI hesabı çok gerçekçiydi.",
    name: "Murat S.",
    role: "Muhasebe Firması Ortağı",
  },
] as const;

export const EXPERTISE_ITEMS = [
  "AI Süreç Danışmanlığı",
  "İş Akışı Otomasyonu (n8n / Make)",
  "Sesli AI Agent (Vapi)",
  "Özel AI Entegrasyonu",
  "Dijital Varlık Optimizasyonu",
] as const;

export const FAQ_ITEMS = [
  {
    question: "Bu gerçekten ücretsiz mi?",
    answer:
      "Evet, AI analiz raporu tamamen ücretsiz. İsterseniz sonrasında danışmanlık hizmeti alabilirsiniz, ancak herhangi bir zorunluluk yoktur.",
  },
  {
    question: "Raporumu ne zaman alırım?",
    answer:
      "Form gönderiminden sonra 1-2 dakika içinde e-postanıza detaylı PDF rapor gelir. Spam klasörünü kontrol etmeyi unutmayın.",
  },
  {
    question: "Satış araması yapacak mısınız?",
    answer:
      "Hayır. Sadece siz isterseniz ücretsiz 20 dakikalık danışmanlık görüşmesi planlarsınız. Biz asla arayıp satış yapmayız.",
  },
  {
    question: "Bilgilerim güvende mi?",
    answer:
      "Evet, verileriniz şifrelenir ve sadece analiz için kullanılır. Üçüncü taraflarla paylaşılmaz.",
  },
  {
    question: "Hangi sektörlere hizmet veriyorsunuz?",
    answer:
      "E-ticaret, ajanslar, B2B hizmetler (danışmanlık, muhasebe, hukuk), üretim/lojistik, teknoloji/yazılım ve daha fazlası. Formda sektörünüze özel sorular karşınıza gelir.",
  },
] as const;

export const BLOG_POSTS = [
  {
    title: "2026'da KOBİ'ler için En İyi AI Araçları",
    excerpt:
      "Küçük ve orta ölçekli işletmeler için en uygun ve uygun fiyatlı AI araçlarını inceliyoruz.",
    date: "15 Şubat 2026",
    slug: "kobi-ai-araclari-2026",
  },
  {
    title: "Müşteri Desteğinde AI: Başlangıç Rehberi",
    excerpt:
      "Chatbot kurulumundan canlı destek entegrasyonuna kadar müşteri desteğinde AI kullanımı.",
    date: "10 Şubat 2026",
    slug: "musteri-destegi-ai-rehber",
  },
  {
    title: "Excel'den Dashboard'a: Raporlama Otomasyonu",
    excerpt:
      "Manuel raporlamadan otomatik dashboard'lara geçiş rehberi. Haftada 6+ saat kazanın.",
    date: "5 Şubat 2026",
    slug: "excel-dashboard-otomasyon",
  },
  {
    title: "AI Otomasyon ROI Hesaplama Rehberi",
    excerpt:
      "Yapay zeka yatırımınızın geri dönüşünü nasıl hesaplarsınız? Adım adım ROI analizi rehberi.",
    date: "1 Şubat 2026",
    slug: "ai-otomasyon-roi-hesaplama",
  },
  {
    title: "Küçük İşletmeler İçin CRM Otomasyonu",
    excerpt:
      "Müşteri ilişkilerinizi AI ile güçlendirin. CRM otomasyon araçları ve en iyi uygulamalar.",
    date: "25 Ocak 2026",
    slug: "kucuk-isletmeler-crm-otomasyon",
  },
  {
    title: "Veri Güvenliği ve AI: Bilmeniz Gerekenler",
    excerpt:
      "AI araçlarını kullanırken verilerinizi nasıl korursunuz? KVKK uyumlu AI kullanım rehberi.",
    date: "20 Ocak 2026",
    slug: "veri-guvenligi-ai-rehber",
  },
] as const;

export const CTA_CONTENT = {
  label: "AI Dönüşümüne Hazır mısınız?",
  headline: "İlk Adımı Birlikte Atalım",
  description:
    "Firmanızın AI potansiyelini keşfedin. Kişiselleştirilmiş analiz raporunuz 3 dakika içinde e-postanızda olsun.",
  ctaPrimary: "Ücretsiz Analiz Başlat",
  ctaSecondary: "Daha Fazla Bilgi",
} as const;
