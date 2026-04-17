// Verimio - Brand Constants & Content

export const BRAND = {
  name: "Verimio",
  tagline: "Yapay zeka, ekibinizin en verimli üyesi.",
  email: "analiz@verimio.com.tr",
  website: "www.verimio.com.tr",
  checkupUrl: "/analiz",
  calendlyUrl: "https://calendly.com/verimio/30min",
} as const;

export const NAV_LINKS = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Hizmetler", href: "/hizmetler" },
  { label: "Blog", href: "/blog" },
  { label: "İletişim", href: "/iletisim" },
] as const;

export const HERO_CONTENT = {
  badge: "AI Danışmanlığı",
  headline: "Yapay zeka,",
  headlineHighlight: "ekibinizin en verimli üyesi.",
  subheadline:
    "AI, otomasyon, ajanlar... Terimler her yerde, nereden başlayacağınız belirsiz. Doğru noktayı birlikte buluyoruz, işinize entegre ediyoruz. Kurulumdan sonra da buradayız.",
  ctaPrimary: "Ücretsiz Check-Up Başlatın",
  ctaSecondary: "Nasıl Çalışır?",
  cards: [
    {
      title: "Zaman Tasarrufu",
      description: "Tekrarlayan işlerden kurtulun. Ekibiniz esas işine baksın.",
    },
    {
      title: "Maliyet Kontrolü",
      description: "Nerede kaybediyorsunuz, görün. Duruma göre karar verin.",
    },
    {
      title: "Şeffaf Süreç",
      description: "Check-Up'tan uygulamaya beş adım. Her adımı önceden bilirsiniz.",
    },
  ],
} as const;

export const ABOUT_CONTENT = {
  label: "Hakkımızda",
  heading: "Kendi işimizi yapay zekayla yürütüyoruz.",
  text: "Yazılarımız, tasarımlarımız, iş akışlarımız — çoğu otomatik. Müşteriye anlattığımız yöntemi önce kendi üzerimizde denedik. Bu yüzden önerilerimizin arkasında bir slayt değil, çalışan bir sistem var.",
  ctaPrimary: "Hakkımızda",
  ctaSecondary: "Hizmetlerimize Bakın",
} as const;

export const HOW_IT_WORKS = [
  {
    step: "01",
    icon: "clipboard-list",
    title: "Check-Up",
    description:
      "15-20 dakika. Sektörünüze özel sorular. Şirketinizi bu soruların cevaplarından tanıyoruz.",
  },
  {
    step: "02",
    icon: "file-text",
    title: "Size Özel Rapor",
    description:
      "Nerede ne kadar kazanabilirsiniz, nereden başlarsınız. Rapor e-postanıza gelir.",
  },
  {
    step: "03",
    icon: "phone",
    title: "30 Dakikalık Görüşme",
    description:
      "Size uygun saatte ücretsiz randevu. Raporu birlikte okuruz, soruları cevaplarız.",
  },
  {
    step: "04",
    icon: "file-check",
    title: "Teklif",
    description:
      "Ne yapılacak, ne kadar sürecek, ne kadar tutacak — hepsi önceden belli. Sürpriz yok.",
  },
  {
    step: "05",
    icon: "rocket",
    title: "Uygulama & Takip",
    description:
      "Birlikte kurarız. Sonra düzenli bakarız: işe yarıyor mu, nerede aksıyor.",
  },
] as const;

export const REPORT_SECTIONS = [
  {
    title: "Yapay Zeka Hazırlık Skoru",
    description: "Şirketiniz şu an nerede? 10 üzerinden tek rakam, açıklamasıyla.",
  },
  {
    title: "En Büyük Fırsat",
    description: "Cevaplarınıza göre en çok kazanabileceğiniz alan. Tahmini tasarruf rakamıyla.",
  },
  {
    title: "5 Öncelikli Aksiyon",
    description: "Birbirinden bağımsız beş çözüm önerisi. Her biri tek başına uygulanabilir.",
  },
  {
    title: "Uygulama Yol Haritası",
    description: "Nereden başlayın, sonra ne yapın — adım adım. Gerçekçi süre tahminleriyle.",
  },
] as const;

export const EXPERTISE_ITEMS = [
  {
    slug: "operasyon-otomasyonu",
    title: "Operasyon Otomasyonu",
    tagline: "Tekrarlayan işler kendi kendine çalışsın.",
    description:
      "Muhasebe ekibi haftada 8 saat Excel kopyalıyor. Satış ekibi her teklifi elle giriyor. Bu tür işleri otomatik sistemlere taşıyoruz. Bir kez kurun, sonrasında kendi çalışır.",
    features: [
      "Hangi süreç otomasyona uygun, tek tek bakıyoruz",
      "Doğru aracı seçiyoruz (n8n, Make, Zapier)",
      "Sistemleriniz arasında veri akıyor (CRM, muhasebe, ERP)",
      "Otomatik bildirimler, onaylar, hatırlatmalar",
    ],
    pillarSlug: "n8n-rehberi-turk-sirketleri-is-otomasyonu",
    pillarLabel: "n8n rehberini oku",
  },
  {
    slug: "musteri-hizmetleri-ai",
    title: "Müşteri Hizmetleri Asistanı",
    tagline: "Müşteri yazar, arar, konuşur — asistan cevaplar.",
    description:
      "Müşteri 'siparişim nerede' diye elli kez arıyor. Ekibiniz boğuluyor. Şirketinize özel eğitilmiş bir dijital asistan kuruyoruz. Web, WhatsApp, telefon, e-posta — dört kanal, tek ses.",
    features: [
      "Sesli asistan — Türkçe ve KVKK uyumlu",
      "Şirketinize özel eğitilmiş sohbet asistanı",
      "Web, WhatsApp, telefon, e-posta — dört kanal",
      "Gerektiğinde canlı ekibe devir",
    ],
    pillarSlug: "yapay-zeka-cagri-merkezi-rehberi",
    pillarLabel: "Yapay zeka çağrı merkezi rehberini oku",
  },
  {
    slug: "veri-raporlama",
    title: "Veri ve Raporlama Otomasyonu",
    tagline: "Dağınık veriden otomatik panoya.",
    description:
      "Veriniz üç ayrı sistemde duruyor. Pazartesi raporu için birisi dört saat harcıyor. Verinizi topluyor, birleştiriyor, otomatik raporlara ve canlı kontrol panolarına çeviriyoruz. Karar alan kişi Excel'e bağlı kalmaz.",
    features: [
      "Farklı sistemlerden otomatik veri toplama",
      "Gerçek zamanlı kontrol panoları",
      "Düzenli otomatik raporlar (günlük, haftalık, aylık)",
      "Veri temizliği ve görselleştirme",
    ],
    pillarSlug: "raporlama-otomasyonu-nedir",
    pillarLabel: "Raporlama otomasyonu rehberini oku",
  },
  {
    slug: "ai-strateji-agent",
    title: "Yapay Zeka Stratejisi ve Kurulum",
    tagline: "Doğru araçla, doğru süreçte, doğru zamanda.",
    description:
      "Yapay zeka pazarında her ay yeni bir araç çıkıyor. Size uyanı seçmek zor. Sektörünüze bakıyor, uygun olanları gösteriyor, şirketinize özel iş asistanları kuruyoruz. Ekibinize kullanmayı da öğretiyoruz.",
    features: [
      "Nereden başlanacak, yatırım getirisi ne — haritasını çıkarıyoruz",
      "Bağımsız araç rehberliği (satıcı değiliz)",
      "Otomatik iş asistanları kurulumu",
      "Departman bazlı eğitim",
    ],
    pillarSlug: "ai-agent-nedir-sirketler-icin-rehber",
    pillarLabel: "Yapay zeka asistanı rehberini oku",
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: "Check-Up süreci nasıl işliyor?",
    answer:
      "Sektörünüze özel bir form dolduruyorsunuz. 15-20 dakika sürüyor. Cevaplarınızı inceliyor, size özel bir rapor hazırlıyor, e-postanıza gönderiyoruz.",
  },
  {
    question: "Raporda neler var?",
    answer:
      "Haftada kaç saat kazanırsınız, ayda ne kadar tasarruf edersiniz, önce nereden başlarsınız, 90 günlük adım adım plan. Hepsi şirketinize özel — jenerik rapor değil.",
  },
  {
    question: "Danışmanlık mı, koçluk mu?",
    answer:
      "İkisi birlikte. Check-Up yaparız, strateji çizeriz, birlikte uygularız, ekibinizi eğitiriz. Tek paket.",
  },
  {
    question: "Check-Up sonrası ne oluyor?",
    answer:
      "Rapor size ulaşır. İsterseniz 30 dakikalık ücretsiz görüşme alırsınız — raporu birlikte okuruz, sorularınızı cevaplarız. Sonra size özel bir teklif hazırlıyoruz. Beğenirseniz uygulamaya geçiyoruz.",
  },
  {
    question: "Ekibiniz kaç kişi?",
    answer:
      "Küçük ve esnek bir ekibiz. İşimizin büyük bölümünü yapay zekayla yürütüyoruz — size anlattığımız yöntemi önce kendimizde denedik. Az kişiyle hızlı çalışıyoruz.",
  },
  {
    question: "Süreç ne kadar sürer?",
    answer:
      "Check-Up raporu birkaç iş günü içinde e-postanıza gelir. Uygulama ise projenin boyutuna göre değişir — birkaç haftadan birkaç aya kadar. Kapsam belli olunca net bir zaman çizelgesi veriyoruz.",
  },
  {
    question: "Fiyatlandırma nasıl?",
    answer:
      "Check-Up tamamen ücretsiz. Uygulama için fiyat, işin kapsamına göre değişir. Görüşme sonrası size özel teklif hazırlıyoruz — sürpriz maliyet yok, her şey önceden belli.",
  },
  {
    question: "Ne zaman sonuç görürüz?",
    answer:
      "İlk etkileri genellikle 4-8 hafta içinde görmeye başlıyorsunuz. Tam rakamlar raporunuzda — her sektör ve her şirket farklı hızlanıyor.",
  },
  {
    question: "Belirli araçlara bağlı mısınız?",
    answer:
      "Hayır, bağımsız danışmanız. Yazılım veya platform satmıyoruz. Size en uygun ne ise onu öneriyoruz.",
  },
  {
    question: "Hangi sektörlerde çalışıyorsunuz?",
    answer:
      "Üretim, lojistik, hizmet, finans, e-ticaret, teknoloji. Ortak nokta: verimliliği artırmak isteyen, büyümeye bakan şirketler.",
  },
  {
    question: "Uygulama sonrasında destek veriyor musunuz?",
    answer:
      "Evet. Rapor teslim edip çekilmiyoruz. Uygulama boyunca takip ediyoruz, ince ayar yapıyoruz, gerekirse yeniden planlıyoruz. Birlikte bitiriyoruz.",
  },
  {
    question: "Verilerimin gizliliği nasıl?",
    answer:
      "Paylaştığınız bilgiler sadece analiz için kullanılır, şifrelenir, üçüncü taraflarla paylaşılmaz. İsterseniz analiz öncesi NDA imzalıyoruz.",
  },
] as const;

export const BLOG_POSTS = [
  {
    title: "AI Agent vs Chatbot: İşletmeniz İçin Hangisi Doğru?",
    excerpt: "İşletmeniz için AI Agent mı yoksa Chatbot mu daha uygun? Bu yazıda iki teknolojinin farklarını, uygulama alanlarını ve hangi durumda hangisine yatırım yapmanız gerektiğini inceliyoruz.",
    date: "17 Nisan 2026",
    slug: "ai-agent-vs-chatbot-isletmeniz-icin-hangisi-dogru",
    category: "ai-tools" as const,
  },
  {
    title: "KVKK Uyumlu Voice AI: Çağrı Merkezinde Güvenlik",
    excerpt: "KVKK uyumlu Voice AI ile çağrı merkezi süreçlerinizi geliştirin. Veri güvenliğini sağlarken operasyonel verimliliği artırın ve maliyetleri düşürün.",
    date: "13 Nisan 2026",
    slug: "kvkk-uyumlu-voice-ai-cagri-merkezinde-guvenlik",
    category: "security" as const,
  },
  {
    title: "Emlak Sektöründe Yapay Zeka: Gayrimenkul Danışmanları İçin AI Rehberi",
    excerpt: "Bu rehber, emlak sektöründe faaliyet gösteren gayrimenkul danışmanları için yapay zekanın temel kullanım alanlarını ve stratejik faydalarını inceliyor.",
    date: "13 Nisan 2026",
    slug: "emlak-sektorunde-yapay-zeka-gayrimenkul-danismanlari-icin-ai",
    category: "tutorial" as const,
  },
  {
    title: "Türkiye AI Etkinliği: KOBİ'ler İçin Yenilikçi Uygulamalar",
    excerpt: "Türkiye AI etkinliğinde KOBİ'lerin yapay zeka entegrasyonu, yerel fırsatlar ve pratik stratejiler masaya yatırıldı. Geleceğin KOBİ'leri için yol haritası.",
    date: "14 Nisan 2026",
    slug: "turkiye-ai-etkinligi-kobiler-icin-yenilikci-uygulamalar",
    category: "strategy" as const,
  },
  {
    title: "İş Süreci Otomasyonu Nedir? Türk KOBİ'leri İçin Sıfırdan Başlangıç Rehberi [2026]",
    excerpt: "İş süreci otomasyonu nedir, nasıl başlanır, hangi süreçler otomatikleşir? Türk KOBİ'leri için BPM, RPA ve AI destekli otomasyon arasındaki farkları ve uygulama yol haritasını anlatan pratik rehber.",
    date: "11 Nisan 2026",
    slug: "is-sureci-otomasyonu-nedir",
    category: "automation" as const,
  },
  {
    title: "Muhasebe Otomasyonu: Türk KOBİ'leri İçin Aylık 80 Saat Kazandıran 7 Süreç [2026]",
    excerpt: "Fatura işleme, cari takibi, KDV beyannamesi hazırlığı, banka mutabakatı — muhasebe otomasyonu ile hangi işler otomatikleşir? Türk KOBİ'leri için pratik rehber.",
    date: "11 Nisan 2026",
    slug: "muhasebe-otomasyonu-kobi-rehberi",
    category: "automation" as const,
  },
  {
    title: "n8n vs Zapier: Türk Şirketleri İçin Hangisi Daha Doğru? [2026 Karşılaştırması]",
    excerpt: "n8n mi Zapier mı? Fiyat, esneklik, KVKK uyumu, entegrasyon sayısı ve KOBİ senaryolarıyla iki platformun dürüst karşılaştırması. Hangi durumda hangisi doğru seçim?",
    date: "11 Nisan 2026",
    slug: "n8n-vs-zapier-karsilastirma",
    category: "ai-tools" as const,
  },
  {
    title: "n8n ChatGPT Entegrasyonu: Adım Adım Kurulum ve İş Senaryoları [2026]",
    excerpt: "n8n ile ChatGPT nasıl entegre edilir? API key'den ilk akışa, maliyet yönetiminden gerçek iş senaryolarına kadar Türk KOBİ'leri için pratik n8n + ChatGPT rehberi.",
    date: "11 Nisan 2026",
    slug: "n8n-chatgpt-entegrasyonu-rehberi",
    category: "tutorial" as const,
  },
  {
    title: "n8n Rehberi: Türk Şirketleri İçin İş Otomasyonu A'dan Z'ye [2026]",
    excerpt: "n8n nedir, nasıl kurulur, hangi iş süreçlerini otomatikleştirir? Türk KOBİ'leri için kapsamlı n8n rehberi — kurulum, maliyet, entegrasyon ve gerçek kullanım senaryoları.",
    date: "10 Nisan 2026",
    slug: "n8n-rehberi-turk-sirketleri-is-otomasyonu",
    category: "tutorial" as const,
  },
  {
    title: "Yapay Zeka Çağrı Merkezi: Türkiye'de Müşteri Hizmetlerinin Geleceği [2026]",
    excerpt: "AI çağrı merkezi nedir, nasıl kurulur, maliyeti ne kadar? Türk şirketleri için yapay zeka destekli müşteri hizmetleri rehberi — chatbot, voice agent ve KVKK uyumu.",
    date: "10 Nisan 2026",
    slug: "yapay-zeka-cagri-merkezi-rehberi",
    category: "customer" as const,
  },
  {
    title: "AI Agent Nedir? Şirketiniz İçin Otonom Yapay Zeka Asistanları Rehberi [2026]",
    excerpt: "AI agent nedir, chatbot'tan farkı ne, şirketler nasıl kullanır? Türk KOBİ'leri için kapsamlı AI agent rehberi — kullanım alanları, güvenlik, araçlar ve uygulama yol haritası.",
    date: "10 Nisan 2026",
    slug: "ai-agent-nedir-sirketler-icin-rehber",
    category: "ai-tools" as const,
  },
  {
    title: "2026 Yapay Zeka Trendleri: KOBİ'ler İçin 5 Anahtar Strateji",
    excerpt: "2026 yapay zeka trendlerini KOBİ perspektifinden inceliyor, yönetişim, ölçeklenebilirlik odaklı stratejiler sunuyor, risk yönetimi ve kurumsal yetkinlik kazanma yollarını anlatıyoruz.",
    date: "8 Nisan 2026",
    slug: "2026-yapay-zeka-trendleri-kobiler-icin-5-anahtar-strateji",
    category: "strategy" as const,
  },
  {
    title: "KOBİ'ler İçin TÜBİTAK ve KOSGEB AI Destekleri 2026",
    excerpt: "2026 itibarıyla TÜBİTAK ve KOSGEB yapay zeka (AI) desteklerini artırarak KOBİ'lerin rekabet gücünü yükseltiyor. Bu rehber, başvuru süreçlerini ve başarı hikayelerini sunar.",
    date: "30 Mart 2026",
    slug: "kobiler-icin-tubitak-ve-kosgeb-ai-destekleri-2026",
    category: "strategy" as const,
  },
  {
    title: "2026 AI Trendleri: TRAI Raporu KOBİ'lere Rehber",
    excerpt: "TRAI 2026 raporu, AI'nin deneme aşamasından ölçülebilir yatırım getirisine geçtiğini gösteriyor. KOBİ'ler için yönetişim ve yatırım stratejileri kritik.",
    date: "30 Mart 2026",
    slug: "2026-ai-trendleri-trai-raporu-kobilere-rehber",
    category: "tutorial" as const,
  },
  {
    title: "2026'da Türk Şirketleri İçin En İyi 7 AI Aracı (Ücretsiz ve Ücretli)",
    excerpt: "Türk KOBİ'leri için 2026'da iş süreçlerini optimize edecek, verimliliği artıracak en iyi yapay zeka araçlarını ve kullanım senaryolarını keşfedin.",
    date: "30 Mart 2026",
    slug: "2026da-turk-sirketleri-icin-en-iyi-7-ai-araci-ucretsiz-ve-uc",
    category: "ai-tools" as const,
  },
  {
    title: "2026 AI Trendleri: KOBİ'ler İçin Yatırım ve Yönetişim Stratejileri",
    excerpt: "2026 Yapay Zeka trendlerini keşfedin: KOBİ'ler için ölçülebilir ROI, yatırım önceliklendirme ve devlet destekleriyle büyüme stratejilerini Verimio ile belirleyin.",
    date: "30 Mart 2026",
    slug: "2026-ai-trendleri-kobiler-icin-yatirim-ve-yonetisim-strateji",
    category: "strategy" as const,
  },
  {
    title: "AI Koçluğu Nedir? Şirketler İçin Kapsamlı Rehber [2026]",
    excerpt: "AI koçluğu, şirketinizin yapay zeka dönüşümüne sürekli eşlik eden kişiselleştirilmiş bir hizmet. Danışmanlıktan farkı, maliyet avantajı ve 90 günlük süreç rehberi.",
    date: "26 Mart 2026",
    slug: "ai-koclugu-nedir",
    category: "strategy" as const,
  },
  {
    title: "AI Danışmanlık ve AI Koçluğu: Neden İkisi Birden Gerekiyor?",
    excerpt: "Geleneksel danışmanlık ve koçluk arasındaki fark, Verimio'nun ikisini nasıl birleştirdiği ve şirketiniz için neden her ikisine de ihtiyacınız olduğu.",
    date: "26 Mart 2026",
    slug: "ai-danismanlik-vs-ai-koclugu",
    category: "strategy" as const,
  },
  {
    title: "Kurumsal AI Eğitimi: 2026'da Nereden Başlamalı?",
    excerpt: "Şirketiniz için doğru AI eğitim programını nasıl seçersiniz? Departman bazlı eğitim planı, araç önerileri ve başarılı kurumsal AI eğitiminin 5 kuralı.",
    date: "26 Mart 2026",
    slug: "kurumsal-ai-egitimi-rehberi",
    category: "tutorial" as const,
  },
  {
    title: "AI Koçunuz Olarak Neden Bir İnsana İhtiyacınız Var?",
    excerpt: "Yapay zeka araçları her yerde ama şirket dönüşümünde bir insanın rolü hâlâ kritik. AI koçunuzun neden bir insan olması gerektiği.",
    date: "26 Mart 2026",
    slug: "ai-kocunuz-neden-insan-olmali",
    category: "strategy" as const,
  },
  {
    title: "İş Dünyası İçin Prompt Mühendisliği: ChatGPT'den Gerçek Değer Çıkarmak",
    excerpt: "ChatGPT gibi yapay zeka araçlarından işiniz için maksimum değeri çıkarmak istiyorsanız doğru prompt mühendisliği tekniklerini öğrenmelisiniz.",
    date: "25 Mart 2026",
    slug: "is-dunyasi-icin-prompt-muhendisligi-chatgptden-gercek-deger-",
    category: "strategy" as const,
  },
  {
    title: "KOBİ'lerde Agent AI: Görevleri Otomatik Yapan Zeka Asistanları",
    excerpt: "KOBİ'ler için Agent AI ile iş süreçlerinizi otomatikleştirin. Rutin görevlerden kurtulun, verimliliği %30 artırın. Düşük maliyetli entegrasyon örnekleriyle pratik çözümler.",
    date: "24 Mart 2026",
    slug: "kobilerde-agent-ai-gorevleri-otomatik-yapan-zeka-asistanlari",
    category: "ai-tools" as const,
  },
  {
    title: "Özelleştirilmiş AI Modelleri: KOBİ'lere Özel Çözümler",
    excerpt: "KOBİ'ler için özelleştirilmiş AI modelleri, verilerinizi güvenle kullanarak rekabet avantajı sağlamanın ve pazar payınızı artırmanın anahtarıdır.",
    date: "24 Mart 2026",
    slug: "ozellestirilmis-ai-modelleri-kobilere-ozel-cozumler",
    category: "strategy" as const,
  },
  {
    title: "Üretim Sektöründe AI: Kalite Kontrolden Bakım Planlamasına",
    excerpt: "Üretim sektöründe yapay zeka uygulamalarıyla verimliliği ve kaliteyi artırın. Prediktif bakım, görsel kalite kontrol ve enerji optimizasyonu ile maliyetlerinizi düşürün.",
    date: "23 Mart 2026",
    slug: "uretim-sektorunde-ai-kalite-kontrolden-bakim-planlamasina",
    category: "strategy" as const,
  },
  {
    title: "Perakendede Yapay Zeka: Stok Yönetiminden Müşteri Deneyimine 5 Uygulama",
    excerpt: "Perakende ve e-ticaret işletmeleri için yapay zeka uygulamaları: stok yönetimi, kişiselleştirme, dinamik fiyatlama, chatbot ve talep analizi. İşletmenizin verimliliğini ve müşteri memnuniyetini artırın.",
    date: "20 Mart 2026",
    slug: "perakendede-yapay-zeka-stok-yonetiminden-musteri-deneyimine-",
    category: "customer" as const,
  },
  {
    title: "2026 Yapay Zeka Trendleri: Türk KOBİ'leri Nasıl Hazırlanmalı?",
    excerpt: "Yapay zeka trendlerini takip ederek iş süreçlerinizi geliştirmek ve rekabet avantajı elde etmek isteyen Türk KOBİ'leri için pratik stratejiler.",
    date: "18 Mart 2026",
    slug: "2026-yapay-zeka-trendleri-turk-kobileri-nasil-hazirlanmali",
    category: "tutorial" as const,
  },
  {
    title: "İnsan Kaynaklarında AI Devrimi: İşe Alımdan Çalışan Bağlılığına",
    excerpt: "Yapay zeka İK süreçlerini nasıl dönüştürüyor? CV taramadan mülakat analizine, çalışan memnuniyeti tahmininden onboarding otomasyonuna AI'ın gücünü keşfedin.",
    date: "18 Mart 2026",
    slug: "insan-kaynaklarinda-ai-devrimi-ise-alimdan-calisan-bagliligi",
    category: "strategy" as const,
  },
  {
    title: "Kurumsal ChatGPT Güvenliği: Şirket Verilerinizi Korumanın 5 Yolu",
    excerpt: "Çalışanlar ChatGPT'ye şirket verisi giriyor mu? Kurumsal yapay zeka kullanımının güvenlik riskleri, KVKK uyumu ve kapalı devre AI çözümleri rehberi.",
    date: "13 Mart 2026",
    slug: "sirketinizin-gizli-verileri-guvende-mi-kurumsal-chatgpt-kull",
    category: "ai-tools" as const,
  },
  {
    title: "Rakipleriniz AI Kullanırken Siz Eski Usul Devam mı Edeceksiniz?",
    excerpt: "Yapay zekanın işletmelere sunduğu rekabet avantajlarını keşfedin. Pazar payınızı artırmak ve verimliliğinizi yükseltmek için AI adaptasyonunun neden kritik olduğunu öğrenin.",
    date: "13 Mart 2026",
    slug: "rakipleriniz-ai-kullanirken-siz-eski-usul-devam-mi-edeceksin",
    category: "ai-tools" as const,
  },
  {
    title: "Excel'den Yapay Zekaya: Raporlama Otomasyonu ile Hata Payını Sıfırlayın",
    excerpt: "Manuel veri girişinin işletmelere maliyeti ve yapay zeka destekli raporlama otomasyonu ile süreçlerin nasıl hızlandığı bu yazıda inceleniyor.",
    date: "12 Mart 2026",
    slug: "excelden-yapay-zekaya-raporlama-otomasyonu-ile-hata-payini-s",
    category: "automation" as const,
  },
  {
    title: "İşletmelerde AI Uyumu Nasıl Sağlanır? Yönetim Vizyonu ile AI Dönüşümü",
    excerpt: "AI projelerinin %60'ı yönetim desteği eksikliğinden başarısız. İşletmenizde AI uyumunu sağlamanın 4 adımı, kurumsal dönüşüm stratejisi ve Türkiye örnekleri.",
    date: "12 Mart 2026",
    slug: "ai-donusumu-bir-it-projesi-degil-bir-yonetim-vizyonudur",
    category: "strategy" as const,
  },
  {
    title: "Verimio Bülten: Bu Ay İşletmenizde Uygulayabileceğiniz 3 Pratik Otomasyon",
    excerpt: "Bültenden haberdar olun: İşletmeniz için uygulanabilir, düşük maliyetli 3 pratik otomasyon fikri, sektör haberleri ve ayın öne çıkan yapay zeka gelişmeleri.",
    date: "12 Mart 2026",
    slug: "verimio-bulten-bu-ay-isletmenizde-uygulayabileceginiz-3-prat",
    category: "strategy" as const,
  },
  {
    title: "Ekibiniz Yapay Zekadan Korkmalı mı, Yoksa Kucaklamalı mı? Lider Rehberi",
    excerpt: "Çalışanların %60'ı AI'dan endişeli — ama veri aksini söylüyor. Ekibinizi AI dönüşümüne hazırlamanın 3 kanıtlanmış yöntemi ve liderler için yol haritası.",
    date: "12 Mart 2026",
    slug: "ekibiniz-yapay-zekadan-korkmali-mi-yoksa-onu-kucaklamali-mi",
    category: "strategy" as const,
  },
  {
    title: "Şirketlerde Yapay Zeka Devrimi: Rekabetin Gerisinde Kalmamak İçin 5 Adım",
    excerpt: "Türk şirketlerinin dijital dönüşüm sürecinde yapay zekayı nasıl stratejik bir avantaja dönüştürebileceklerini anlatan kapsamlı bir rehber.",
    date: "11 Mart 2026",
    slug: "kobide-yapay-zeka-devrimi",
    category: "strategy" as const,
  },
  {
    title: "Veri Yığınlarından Akıllı Kararlara: Raporlama Otomasyonu Nedir?",
    excerpt: "Excel dosyaları arasında kaybolan yöneticiler için verilerin otomatik olarak çekilip anlamlı dashboard'lara dönüştürülmesinin karar alma hızına etkisi.",
    date: "11 Mart 2026",
    slug: "raporlama-otomasyonu-nedir",
    category: "automation" as const,
  },
  {
    title: "Müşteri Hizmetlerinde AI: 7/24 Akıllı Asistanlar ile %70 Maliyet Düşüşü",
    excerpt: "AI chatbot ve sesli asistan ile destek ekibi yükünü %70 azaltın. Entegrasyon adımları, maliyet analizi ve Türk şirketlerinden başarı örnekleri.",
    date: "11 Mart 2026",
    slug: "musteri-hizmetlerinde-ai-donemi",
    category: "customer" as const,
  },
  {
    title: "Verilerinizi Hazırlamadan AI Kullanmayın: 6 Adımlık Veri Kalitesi Rehberi",
    excerpt: "AI projelerinin başarısız olmasının 1 numaralı nedeni: kirli veri. Veri kalitenizi 6 adımda değerlendirin ve AI'ya hazır hale getirin — ücretsiz kontrol listesi.",
    date: "6 Mart 2026",
    slug: "ai-icin-veri-kalitesi",
    category: "data" as const,
  },
  {
    title: "Chatbot mu, Voice Agent mi? Müşteri İletişiminde Doğru Seçim",
    excerpt: "Müşteri hizmetleri otomasyonunda chatbot ve voice agent arasında nasıl karar verirsiniz? İki teknolojinin güçlü yanları, sınırları ve Türk şirketleri için rehber.",
    date: "5 Mart 2026",
    slug: "chatbot-voice-agent-secimi",
    category: "customer" as const,
  },
  {
    title: "AI Projesinin ROI'sini Nasıl Hesaplarsınız? Adım Adım Rehber",
    excerpt: "Yapay zeka yatırımınızın geri dönüşünü somut rakamlarla nasıl ölçersiniz? Türk şirketleri için pratik ROI hesaplama rehberi.",
    date: "4 Mart 2026",
    slug: "ai-roi-hesaplama",
    category: "roi" as const,
  },
  {
    title: "Make vs n8n Karşılaştırma: Türk Şirketleri İçin Hangisi? [2026 Rehber]",
    excerpt: "Make ve n8n fiyatlandırma, özellik ve Türkiye uyumluluğu karşılaştırması. n8n danışmanlığı ile doğru platformu seçmenin 5 kriteri ve maliyet analizi.",
    date: "3 Mart 2026",
    slug: "make-vs-n8n-karsilastirma",
    category: "ai-tools" as const,
  },
  {
    title: "AI Danışmanlık Neden Farklıdır? Yazılım Satıcısı vs Strateji Ortağı [2026]",
    excerpt:
      "AI danışmanlığı ile yazılım satışı arasındaki 5 kritik fark — şirketiniz için doğru yaklaşımı seçmenin somut adımları ve maliyet karşılaştırması.",
    date: "2 Mart 2026",
    slug: "ai-danismanlik-neden-farklidir",
    category: "strategy" as const,
  },
  {
    title: "n8n Nedir? Türkiye'de İlk Otomasyonunuzu Kurun — Teknik Bilgi Gerekmez",
    excerpt:
      "n8n nedir, n8n Türkiye'de nasıl kullanılır? Teknik bilgisi olmayan yöneticiler için adım adım otomasyon kurulum rehberi ve n8n danışmanlığı rehberi.",
    date: "1 Mart 2026",
    slug: "n8n-ile-basit-otomasyon",
    category: "tutorial" as const,
  },
  {
    title: "Türk Şirketlerinde Otomasyon Yanlışları: En Sık Yapılan 5 Hata",
    excerpt:
      "Otomasyon projeleri neden başarısız olur? Türk şirketlerinin en sık düştüğü tuzakları ve doğru yaklaşımı ele alıyoruz.",
    date: "25 Şubat 2026",
    slug: "otomasyon-yanlislari",
    category: "automation" as const,
  },
  {
    title: "Şirket Check-Up'ı Nedir? AI Hazırlık Analizini Neden Yaptırmalısınız?",
    excerpt:
      "Verimio'nun sunduğu ücretsiz Şirket Check-Up'ı süreci nasıl işler, ne analiz eder ve size hangi çıktıları sunar?",
    date: "20 Şubat 2026",
    slug: "sirket-check-up-nedir",
    category: "strategy" as const,
  },
] as const;

export const CTA_CONTENT = {
  label: "Sonraki Adım",
  headline: "Başlayalım.",
  description:
    "Önce check-up yapın, isterseniz doğrudan görüşmeye gelin. Hangisi size hızlı geliyorsa.",
  ctaPrimary: "Ücretsiz Check-Up Başlatın",
  ctaSecondary: "30 Dakikalık Görüşme Planla",
  ctaTertiary: "Hizmetlerimizi İnceleyin",
} as const;

// Geriye dönük uyumluluk için (kullanımda olanlar)
export const TRUST_BADGES = [
  { icon: "check", text: "Ücretsiz görüşme" },
  { icon: "layers", text: "Sektöre özel analiz" },
  { icon: "shield", text: "NDA ile gizlilik" },
  { icon: "phone-off", text: "Satış baskısı yok" },
] as const;

export const STATS = [
  { value: "10+", label: "Analiz edilen şirket" },
  { value: "%60+", label: "Ortalama otomasyon potansiyeli" },
  { value: "4", label: "Uzmanlık alanı" },
  { value: "Birkaç gün", label: "Rapor teslim süresi" },
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
