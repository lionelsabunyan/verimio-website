// Verimio - Brand Constants & Content

export const BRAND = {
  name: "Verimio",
  tagline: "Süreçlerinizi netleştirin, maliyetlerinizi düşürün.",
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
  badge: "Kurumsal AI Danışmanlığı",
  headline: "Süreçlerinizi netleştirin,",
  headlineHighlight: "maliyetlerinizi düşürün.",
  subheadline:
    "Firmanızın operasyonel verimliliğini ve AI hazırlığını analiz ediyoruz. Size özel yol haritasıyla hem zamandan hem maliyetten tasarruf edin.",
  ctaPrimary: "Ücretsiz Check-Up Başlatın",
  ctaSecondary: "Nasıl Çalışır?",
  cards: [
    {
      title: "Zaman Tasarrufu",
      description:
        "Tekrarlayan süreçleri kaldırın, ekibiniz stratejik işlere odaklansın.",
    },
    {
      title: "Maliyet Kontrolü",
      description:
        "Kaynak israfını tespit edin, operasyonel maliyetinizi düşürün.",
    },
    {
      title: "Net Yol Haritası",
      description: "90 günlük, önceliklendirilmiş uygulama planınızı alın.",
    },
  ],
} as const;

export const ABOUT_CONTENT = {
  label: "Biz Kimiz?",
  text: "İş süreçlerinizi analiz eder, verimliliği engelleyen darboğazları tespit eder ve size özel çözümlerle hem zamanınızı hem bütçenizi koruruz. AI dönüşümünde tek muhatabınız — danışmanınız — oluyoruz.",
  ctaPrimary: "Hakkımızda",
  ctaSecondary: "Hizmetlerimize Bakın",
} as const;

export const HOW_IT_WORKS = [
  {
    step: "01",
    icon: "clipboard-list",
    title: "Şirketinizi Tanıyalım",
    description:
      "Sektörünüze ve yapınıza özel sorularla başlıyoruz. Hedef: operasyonunuzu gerçekten anlamak.",
  },
  {
    step: "02",
    icon: "search",
    title: "Analiz Edip Raporlayalım",
    description:
      "Uzman ekibimiz cevaplarınızı değerlendirir, fırsatları ve tasarruf potansiyelini somut rakamlarla ortaya koyar.",
  },
  {
    step: "03",
    icon: "rocket",
    title: "Birlikte Harekete Geçelim",
    description:
      "Öncelik matrisine göre planı hayata geçiriyoruz. Her adımda yanınızdayız — danışmanlık, sadece rapor değil.",
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

export const TESTIMONIALS = [
  {
    quote:
      "Operasyon süreçlerimizde ciddi darboğazlar vardı. Verimio'nun analizi bu noktaları net şekilde ortaya koydu ve uyguladığımız çözümlerle kayda değer bir verimlilik artışı sağladık.",
    name: "Ahmet Y.",
    role: "Operasyon Direktörü, Lojistik Sektörü",
  },
  {
    quote:
      "Raporlama altyapımızı otomatize ettik. Ekibimizin harcadığı zaman dramatik biçimde azaldı; o zamanı artık analiz ve stratejiye ayırabiliyoruz.",
    name: "Elif K.",
    role: "Genel Müdür, Profesyonel Hizmetler",
  },
  {
    quote:
      "Verimio sadece analiz yapan bir firma değil, süreci başından sonuna kadar bizimle birlikte yürüyen bir danışman gibi çalıştı. Bu fark gerçekten hissedildi.",
    name: "Murat S.",
    role: "İş Geliştirme Yöneticisi, B2B Hizmetler",
  },
] as const;

export const EXPERTISE_ITEMS = [
  "Süreç Danışmanlığı ve Optimizasyonu",
  "İş Akışı Tasarımı ve Otomasyonu",
  "AI Entegrasyon Stratejisi",
  "Sesli ve Yazılı Müşteri Deneyimi",
  "Operasyonel Verimlilik Analizi",
] as const;

export const FAQ_ITEMS = [
  {
    question: "Check-up süreci nasıl işliyor?",
    answer:
      "Sektörünüze ve şirket yapınıza özel birkaç soruyu yanıtlıyorsunuz. Uzman ekibimiz cevaplarınızı değerlendirip 48 saat içinde size özel bir rapor hazırlıyor.",
  },
  {
    question: "Raporumda neler yer alıyor?",
    answer:
      "Otomasyon potansiyeliniz, tasarruf tahminleri, öncelikli aksiyon alanları ve 90 günlük uygulama yol haritası. Genel öneriler değil, firmanıza özel somut bulgular.",
  },
  {
    question: "Danışmanlık hizmeti zorunlu mu?",
    answer:
      "Hayır. Raporu aldıktan sonra nasıl ilerleyeceğiniz tamamen size bağlı. İsterseniz ücretsiz bir görüşmeyle soruları netleştirebilirsiniz.",
  },
  {
    question: "Hangi sektörlerde çalışıyorsunuz?",
    answer:
      "Üretim, lojistik, profesyonel hizmetler, finans, e-ticaret ve teknoloji başta olmak üzere kurumsal yapıdaki tüm sektörlerde hizmet veriyoruz.",
  },
  {
    question: "Verilerimizin gizliliği nasıl korunuyor?",
    answer:
      "Paylaştığınız bilgiler yalnızca analiz amacıyla kullanılır, şifrelenerek saklanır ve üçüncü taraflarla kesinlikle paylaşılmaz. Talep halinde NDA imzalayabiliriz.",
  },
] as const;

export const BLOG_POSTS = [
  {
    title: "2026'da Şirketler için En İyi AI Araçları",
    excerpt:
      "Kurumsal operasyonlarda verimliliği artıran, ölçeklenebilir AI araçlarını inceliyoruz.",
    date: "15 Şubat 2026",
    slug: "kurumsal-ai-araclari-2026",
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
    title: "Kurumsal CRM Otomasyonu: Nereden Başlanır?",
    excerpt:
      "Müşteri ilişkilerinizi AI ile güçlendirin. CRM otomasyon araçları ve en iyi uygulamalar.",
    date: "25 Ocak 2026",
    slug: "kurumsal-crm-otomasyon",
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
  label: "Bir Sonraki Adım",
  headline: "İlk Adımı Birlikte Atalım",
  description:
    "Firmanızın verimliliğini ve AI hazırlığını analiz ediyoruz. Size özel yol haritanız 48 saat içinde hazır.",
  ctaPrimary: "Ücretsiz Check-Up Başlatın",
  ctaSecondary: "Hizmetlerimizi İnceleyin",
} as const;

// Geriye dönük uyumluluk için (kullanımda olanlar)
export const TRUST_BADGES = [
  { icon: "check", text: "Ücretsiz İlk Görüşme" },
  { icon: "layers", text: "Sektöre Özel Analiz" },
  { icon: "shield", text: "NDA ile Gizlilik" },
  { icon: "phone-off", text: "Satış Baskısı Yok" },
] as const;

export const STATS = [
  { value: "10+", label: "Firma Analiz Edildi" },
  { value: "%60+", label: "Ortalama Otomasyon Potansiyeli" },
  { value: "4 Alan", label: "Hizmet Kategorisi" },
  { value: "48 saat", label: "Rapor Teslim Süresi" },
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
