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
  heading: "Dışarıdan değil, yanınızda.",
  text: "Rapor yazıp çekilmeyiz. Ofisinize gelir, ekibinizle tanışır, işi yerinde anlarız. Birlikte analiz eder, birlikte kurar, birlikte oturturuz. Sonra da her hafta aynı masadayız — proje sonu diye bir şey yok.",
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
      "Sektörünüze özel bir form dolduruyorsunuz — 15-20 dakika. Biz cevapları inceliyoruz, size özel raporu e-postanıza gönderiyoruz.",
  },
  {
    question: "Raporda neler var?",
    answer:
      "Haftada kaç saat kazanırsınız, ayda ne kadar tasarruf edersiniz, önce nereden başlarsınız — 90 günlük adım adım plan. Hepsi size özel, hazır şablon yok.",
  },
  {
    question: "Danışmanlık mı, koçluk mu?",
    answer:
      "İkisi birlikte. Check-Up yaparız, strateji çizeriz, birlikte uygularız, ekibinizi eğitiriz. Tek paket.",
  },
  {
    question: "Check-Up sonrası ne oluyor?",
    answer:
      "Rapor size ulaşır. İsterseniz 30 dakikalık ücretsiz görüşme alırsınız — raporu birlikte okuruz, sorularınızı cevaplarız. Sonra size özel bir teklif hazırlıyoruz. Beğenirseniz birlikte kurarız. Beğenmezseniz rapor sizde kalır — baskı yok.",
  },
  {
    question: "Ekibiniz kaç kişi?",
    answer:
      "Küçük bir ekibiz, yapay zeka en verimli üyemiz. Size anlattığımız yöntemi önce kendimize uyguladık — bu yüzden önerilerin arkasında bir slayt değil, çalışan bir sistem var. Küçük olduğumuz için her müşteriye yeterince zaman ayırabiliyoruz — ofisinize gelir, birlikte kurar, kalırız.",
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
    title: "KOBİ AI Agent Örnekleri: Türk Şirketlerinde 7 Gerçek Kullanım Alanı [2026]",
    excerpt: "AI agent bir KOBİ'de ne iş yapar? Muhasebeden satışa, İK'dan stok yönetimine — 7 somut örnek ve hangisinin size uyduğunu nasıl anlarsınız.",
    date: "20 Nisan 2026",
    slug: "kobi-ai-agent-ornekleri",
    category: "ai-tools" as const,
  },
  {
    title: "WhatsApp'ta AI ile Müşteri Yanıtı: Türk KOBİ'leri İçin Pratik Rehber [2026]",
    excerpt: "WhatsApp'a gelen mesajlara AI mı cevap verir? Kurulum, KVKK, maliyet ve 5 somut kullanım senaryosu — Türk KOBİ için pratik rehber.",
    date: "20 Nisan 2026",
    slug: "whatsapp-ai-musteri-yanit",
    category: "customer" as const,
  },
  {
    title: "n8n ile AI Agent Oluşturma: Türk KOBİ'leri İçin Adım Adım Rehber [2026]",
    excerpt: "n8n ile AI agent kurmak nasıl yapılır? Kurulum, AI node'u, tool kullanımı, hafıza — Türk KOBİ'si için somut adımlar ve ilk agent örneği.",
    date: "20 Nisan 2026",
    slug: "n8n-ai-agent-olusturma",
    category: "tutorial" as const,
  },
  {
    title: "KOBİ'lerde YZ Tabanlı İş Akışları 2026 Rehberi",
    excerpt: "KOBİ'niz 2026'da yapay zeka iş akışını nereden kuracak? Hangi süreç önce gider, ekip nasıl uyum sağlar — adım adım pratik rehber.",
    date: "20 Nisan 2026",
    slug: "kobilerde-yz-tabanli-is-akislari-2026-rehberi",
    category: "tutorial" as const,
  },
  {
    title: "AI Agent vs Chatbot: İşletmeniz İçin Hangisi Doğru?",
    excerpt: "AI agent mı, chatbot mu? Biri soruya cevap verir, diğeri işi bitirir. Hangisine ne zaman yatırım yaparsınız — net karar rehberi.",
    date: "17 Nisan 2026",
    slug: "ai-agent-vs-chatbot-isletmeniz-icin-hangisi-dogru",
    category: "ai-tools" as const,
  },
  {
    title: "KVKK Uyumlu Voice AI: Çağrı Merkezinde Güvenlik",
    excerpt: "Çağrı merkeziniz KVKK'ya uyumlu mu? Voice AI kurarken veri güvenliğini nasıl sağlarsınız, maliyet ne kadar düşer — pratik rehber.",
    date: "13 Nisan 2026",
    slug: "kvkk-uyumlu-voice-ai-cagri-merkezinde-guvenlik",
    category: "security" as const,
  },
  {
    title: "Emlak Sektöründe Yapay Zeka: Gayrimenkul Danışmanları İçin AI Rehberi",
    excerpt: "Emlak danışmanısınız ve günde 40 ilan yönetiyorsunuz. Yapay zeka hangi işi sizden alır, müşteri temasını nasıl hızlandırır?",
    date: "13 Nisan 2026",
    slug: "emlak-sektorunde-yapay-zeka-gayrimenkul-danismanlari-icin-ai",
    category: "tutorial" as const,
  },
  {
    title: "Türkiye AI Etkinliği: KOBİ'ler İçin Yenilikçi Uygulamalar",
    excerpt: "Türkiye'nin AI etkinliklerinde KOBİ'ler ne konuşuyor, hangi sorunlar ortak? Yerel uygulama örnekleriyle sahadan notlar.",
    date: "14 Nisan 2026",
    slug: "turkiye-ai-etkinligi-kobiler-icin-yenilikci-uygulamalar",
    category: "strategy" as const,
  },
  {
    title: "İş Süreci Otomasyonu Nedir? Türk KOBİ'leri İçin Sıfırdan Başlangıç Rehberi [2026]",
    excerpt: "İş süreci otomasyonu nedir, nereden başlarsınız? BPM, RPA ve AI farkı, hangi süreç önce otomatikleşir — Türk KOBİ'leri için rehber.",
    date: "11 Nisan 2026",
    slug: "is-sureci-otomasyonu-nedir",
    category: "automation" as const,
  },
  {
    title: "Muhasebe Otomasyonu: Türk KOBİ'leri İçin Aylık 80 Saat Kazandıran 7 Süreç [2026]",
    excerpt: "Muhasebeciniz haftada 8 saat Excel kopyalıyor mu? Muhasebe otomasyonu hangi 7 süreci alır, aylık 80 saat nasıl kazanılır?",
    date: "11 Nisan 2026",
    slug: "muhasebe-otomasyonu-kobi-rehberi",
    category: "automation" as const,
  },
  {
    title: "n8n vs Zapier: Türk Şirketleri İçin Hangisi Daha Doğru? [2026 Karşılaştırması]",
    excerpt: "n8n mi Zapier mı? Fiyat, KVKK, esneklik — iki platformun dürüst karşılaştırması. Hangi iş için hangisi doğru seçim, neden?",
    date: "11 Nisan 2026",
    slug: "n8n-vs-zapier-karsilastirma",
    category: "ai-tools" as const,
  },
  {
    title: "n8n ChatGPT Entegrasyonu: Adım Adım Kurulum ve İş Senaryoları [2026]",
    excerpt: "n8n ile ChatGPT nasıl konuşturulur? API key'den ilk akışa, maliyet kontrolüne — Türk KOBİ'si için adım adım entegrasyon rehberi.",
    date: "11 Nisan 2026",
    slug: "n8n-chatgpt-entegrasyonu-rehberi",
    category: "tutorial" as const,
  },
  {
    title: "n8n Rehberi: Türk Şirketleri İçin İş Otomasyonu A'dan Z'ye [2026]",
    excerpt: "n8n nedir, nasıl kurarsınız, hangi işi otomatikleştirir? Kurulum, maliyet, entegrasyon — Türk KOBİ'si için A'dan Z'ye n8n rehberi.",
    date: "10 Nisan 2026",
    slug: "n8n-rehberi-turk-sirketleri-is-otomasyonu",
    category: "tutorial" as const,
  },
  {
    title: "Yapay Zeka Çağrı Merkezi: Türkiye'de Müşteri Hizmetlerinin Geleceği [2026]",
    excerpt: "AI çağrı merkezi nedir, maliyeti ne kadar, KVKK uyumu nasıl sağlanır? Sohbet botu ve sesli asistan ile kurulum rehberi.",
    date: "10 Nisan 2026",
    slug: "yapay-zeka-cagri-merkezi-rehberi",
    category: "customer" as const,
  },
  {
    title: "AI Agent Nedir? Şirketiniz İçin Otonom Yapay Zeka Asistanları Rehberi [2026]",
    excerpt: "AI agent nedir, sohbet botundan ne farkı var? Şirketiniz hangi işi bir agent'a devreder, nasıl başlarsınız — pratik rehber.",
    date: "10 Nisan 2026",
    slug: "ai-agent-nedir-sirketler-icin-rehber",
    category: "ai-tools" as const,
  },
  {
    title: "2026 Yapay Zeka Trendleri: KOBİ'ler İçin 5 Anahtar Strateji",
    excerpt: "2026'da KOBİ'niz yapay zekaya nereden başlamalı? Bütçe, ekip, risk — 5 somut strateji ve kaçınmanız gereken tuzaklar.",
    date: "8 Nisan 2026",
    slug: "2026-yapay-zeka-trendleri-kobiler-icin-5-anahtar-strateji",
    category: "strategy" as const,
  },
  {
    title: "KOBİ'ler İçin TÜBİTAK ve KOSGEB AI Destekleri 2026",
    excerpt: "TÜBİTAK ve KOSGEB 2026 AI destekleri KOBİ'nize ne kadar bütçe açar? Başvuru adımları, kabul oranı ve saha örnekleri.",
    date: "30 Mart 2026",
    slug: "kobiler-icin-tubitak-ve-kosgeb-ai-destekleri-2026",
    category: "strategy" as const,
  },
  {
    title: "2026 AI Trendleri: TRAI Raporu KOBİ'lere Rehber",
    excerpt: "TRAI 2026 raporu ne diyor? AI artık deneme değil, gerçek iş sonucu üretiyor. KOBİ'niz hangi adımı atlamamalı?",
    date: "30 Mart 2026",
    slug: "2026-ai-trendleri-trai-raporu-kobilere-rehber",
    category: "tutorial" as const,
  },
  {
    title: "2026'da Türk Şirketleri İçin En İyi 7 AI Aracı (Ücretsiz ve Ücretli)",
    excerpt: "2026'da Türk şirketi hangi 7 AI aracını kullanıyor? Ücretsiz ve ücretli seçenekler, gerçek kullanım senaryoları — pratik liste.",
    date: "30 Mart 2026",
    slug: "2026da-turk-sirketleri-icin-en-iyi-7-ai-araci-ucretsiz-ve-uc",
    category: "ai-tools" as const,
  },
  {
    title: "2026 AI Trendleri: KOBİ'ler İçin Yatırım ve Yönetişim Stratejileri",
    excerpt: "2026'da KOBİ'niz AI'ya ne kadar bütçe ayırmalı? Hangi araca ne verilir, TÜBİTAK/KOSGEB destekleri nasıl değerlendirilir?",
    date: "30 Mart 2026",
    slug: "2026-ai-trendleri-kobiler-icin-yatirim-ve-yonetisim-strateji",
    category: "strategy" as const,
  },
  {
    title: "AI Koçluğu Nedir? Şirketler İçin Kapsamlı Rehber [2026]",
    excerpt: "AI koçluğu nedir, danışmanlıktan ne farkı var? Ekibinize 90 gün boyunca eşlik eden destek — maliyet, süreç ve somut çıktılar.",
    date: "26 Mart 2026",
    slug: "ai-koclugu-nedir",
    category: "strategy" as const,
  },
  {
    title: "AI Danışmanlık ve AI Koçluğu: Neden İkisi Birden Gerekiyor?",
    excerpt: "AI danışmanlığı yol haritası çizer, AI koçluğu ekibinizle oturur uygular. Şirketinizin ikisine birden neden ihtiyacı var?",
    date: "26 Mart 2026",
    slug: "ai-danismanlik-vs-ai-koclugu",
    category: "strategy" as const,
  },
  {
    title: "Kurumsal AI Eğitimi: 2026'da Nereden Başlamalı?",
    excerpt: "Kurumsal AI eğitimi nereden başlar? Departman bazlı plan, araç seçimi ve eğitimi işe dönüştürmenin 5 kuralı — pratik rehber.",
    date: "26 Mart 2026",
    slug: "kurumsal-ai-egitimi-rehberi",
    category: "tutorial" as const,
  },
  {
    title: "AI Koçunuz Olarak Neden Bir İnsana İhtiyacınız Var?",
    excerpt: "AI araçları her yerde. Ama ekibinizin alışkanlığını değiştirmek için yine bir insan gerekiyor. AI koçunuz neden insan olmalı?",
    date: "26 Mart 2026",
    slug: "ai-kocunuz-neden-insan-olmali",
    category: "strategy" as const,
  },
  {
    title: "İş Dünyası İçin Prompt Mühendisliği: ChatGPT'den Gerçek Değer Çıkarmak",
    excerpt: "ChatGPT'ye ne sorarsanız, onu alırsınız. Şirketinize gerçek değer üreten prompt yazmanın 5 tekniği ve örnekleri.",
    date: "25 Mart 2026",
    slug: "is-dunyasi-icin-prompt-muhendisligi-chatgptden-gercek-deger-",
    category: "strategy" as const,
  },
  {
    title: "KOBİ'lerde Agent AI: Görevleri Otomatik Yapan Zeka Asistanları",
    excerpt: "AI agent nedir, KOBİ'niz hangi rutin işi ona devreder? Düşük maliyetli entegrasyon örnekleri ve ilk 30 günde ne değişir?",
    date: "24 Mart 2026",
    slug: "kobilerde-agent-ai-gorevleri-otomatik-yapan-zeka-asistanlari",
    category: "ai-tools" as const,
  },
  {
    title: "Özelleştirilmiş AI Modelleri: KOBİ'lere Özel Çözümler",
    excerpt: "Hazır AI modeli KOBİ'nizin işini tam anlamıyor. Kendi verinizle eğitilen özel AI modeli ne zaman gerekir, maliyeti ne kadar?",
    date: "24 Mart 2026",
    slug: "ozellestirilmis-ai-modelleri-kobilere-ozel-cozumler",
    category: "strategy" as const,
  },
  {
    title: "Üretim Sektöründe AI: Kalite Kontrolden Bakım Planlamasına",
    excerpt: "Fabrikanızda hangi makine ne zaman bozulacak? Üretimde AI ile öngörülü bakım, görsel kalite kontrol ve enerji yönetimi.",
    date: "23 Mart 2026",
    slug: "uretim-sektorunde-ai-kalite-kontrolden-bakim-planlamasina",
    category: "strategy" as const,
  },
  {
    title: "Perakendede Yapay Zeka: Stok Yönetiminden Müşteri Deneyimine 5 Uygulama",
    excerpt: "Perakende iade oranınız %18'i mi geçti? Stok, fiyatlama, talep analizi — yapay zekanın e-ticarete soktuğu 5 somut uygulama.",
    date: "20 Mart 2026",
    slug: "perakendede-yapay-zeka-stok-yonetiminden-musteri-deneyimine-",
    category: "customer" as const,
  },
  {
    title: "2026 Yapay Zeka Trendleri: Türk KOBİ'leri Nasıl Hazırlanmalı?",
    excerpt: "2026'da Türk KOBİ'si AI'ya nasıl hazırlanır? Bütçe, ekip, araç seçimi — trend okuma değil, sahada uygulama rehberi.",
    date: "18 Mart 2026",
    slug: "2026-yapay-zeka-trendleri-turk-kobileri-nasil-hazirlanmali",
    category: "tutorial" as const,
  },
  {
    title: "İnsan Kaynaklarında AI Devrimi: İşe Alımdan Çalışan Bağlılığına",
    excerpt: "İK ekibiniz haftada 300 CV mi tarıyor? AI ile işe alım, mülakat ve onboarding nasıl hızlanır — İK için pratik rehber.",
    date: "18 Mart 2026",
    slug: "insan-kaynaklarinda-ai-devrimi-ise-alimdan-calisan-bagliligi",
    category: "strategy" as const,
  },
  {
    title: "Kurumsal ChatGPT Güvenliği: Şirket Verilerinizi Korumanın 5 Yolu",
    excerpt: "Çalışanınız ChatGPT'ye müşteri verisi yapıştırıyor mu? Kurumsal AI güvenliği, KVKK riski ve kapalı devre çözümler.",
    date: "13 Mart 2026",
    slug: "sirketinizin-gizli-verileri-guvende-mi-kurumsal-chatgpt-kull",
    category: "ai-tools" as const,
  },
  {
    title: "Rakipleriniz AI Kullanırken Siz Eski Usul Devam mı Edeceksiniz?",
    excerpt: "Rakibiniz AI ile çalışırken siz hâlâ manuel. Bu fark 6 ayda ne kadar büyüyor, geri dönmek için ilk hangi adım atılır?",
    date: "13 Mart 2026",
    slug: "rakipleriniz-ai-kullanirken-siz-eski-usul-devam-mi-edeceksin",
    category: "ai-tools" as const,
  },
  {
    title: "Excel'den Yapay Zekaya: Raporlama Otomasyonu ile Hata Payını Sıfırlayın",
    excerpt: "Excel'de tek yanlış hücre tüm raporu çürütür. Yapay zeka ile raporlama otomasyonu hata payını nasıl sıfıra çeker?",
    date: "12 Mart 2026",
    slug: "excelden-yapay-zekaya-raporlama-otomasyonu-ile-hata-payini-s",
    category: "automation" as const,
  },
  {
    title: "İşletmelerde AI Uyumu Nasıl Sağlanır? Yönetim Vizyonu ile AI Dönüşümü",
    excerpt: "AI projelerinin %60'ı yönetim desteği zayıf diye ölüyor. Şirket içi AI uyumunu sağlamanın 4 adımı ve Türkiye örnekleri.",
    date: "12 Mart 2026",
    slug: "ai-donusumu-bir-it-projesi-degil-bir-yonetim-vizyonudur",
    category: "strategy" as const,
  },
  {
    title: "Verimio Bülten: Bu Ay İşletmenizde Uygulayabileceğiniz 3 Pratik Otomasyon",
    excerpt: "Verimio bülten: bu ay şirketinizde kuracağınız 3 düşük maliyetli otomasyon, sektör notları ve ayın öne çıkan AI hamleleri.",
    date: "12 Mart 2026",
    slug: "verimio-bulten-bu-ay-isletmenizde-uygulayabileceginiz-3-prat",
    category: "strategy" as const,
  },
  {
    title: "Ekibiniz Yapay Zekadan Korkmalı mı, Yoksa Kucaklamalı mı? Lider Rehberi",
    excerpt: "Çalışanlarınızın %60'ı yapay zekadan tedirgin. Korkuyu işbirliğine çevirmenin 3 yöntemi — liderler için pratik yol haritası.",
    date: "12 Mart 2026",
    slug: "ekibiniz-yapay-zekadan-korkmali-mi-yoksa-onu-kucaklamali-mi",
    category: "strategy" as const,
  },
  {
    title: "Şirketlerde Yapay Zeka Devrimi: Rekabetin Gerisinde Kalmamak İçin 5 Adım",
    excerpt: "Türk şirketleri yapay zekaya yatırım yapıyor, çoğu yanlış yerden başlıyor. Geride kalmamak için 5 somut adım.",
    date: "11 Mart 2026",
    slug: "kobide-yapay-zeka-devrimi",
    category: "strategy" as const,
  },
  {
    title: "Veri Yığınlarından Akıllı Kararlara: Raporlama Otomasyonu Nedir?",
    excerpt: "Pazartesi raporu hâlâ 5 Excel dosyasından mı derleniyor? Raporlama otomasyonu ile veriler tek panoda, karar iki saat önce.",
    date: "11 Mart 2026",
    slug: "raporlama-otomasyonu-nedir",
    category: "automation" as const,
  },
  {
    title: "Müşteri Hizmetlerinde AI: 7/24 Akıllı Asistanlar ile %70 Maliyet Düşüşü",
    excerpt: "Müşteri hizmetlerine AI sohbet botu ve sesli asistan kurmak ekip yükünü %70 nasıl düşürür? Maliyet ve saha örnekleri.",
    date: "11 Mart 2026",
    slug: "musteri-hizmetlerinde-ai-donemi",
    category: "customer" as const,
  },
  {
    title: "Verilerinizi Hazırlamadan AI Kullanmayın: 6 Adımlık Veri Kalitesi Rehberi",
    excerpt: "AI projelerinin başarısız olma sebebi 1 numara: kirli veri. Veri kalitenizi 6 adımda ölçün ve hazır hale getirin.",
    date: "6 Mart 2026",
    slug: "ai-icin-veri-kalitesi",
    category: "data" as const,
  },
  {
    title: "Chatbot mu, Voice Agent mi? Müşteri İletişiminde Doğru Seçim",
    excerpt: "Chatbot mu, sesli asistan mı? Biri yazışır, diğeri telefonu açar. Müşteri hizmetiniz için hangisi doğru seçim — karar rehberi.",
    date: "5 Mart 2026",
    slug: "chatbot-voice-agent-secimi",
    category: "customer" as const,
  },
  {
    title: "AI Projesinin ROI'sini Nasıl Hesaplarsınız? Adım Adım Rehber",
    excerpt: "AI yatırımınızın ROI'si ne kadar? Haftada kaç saat, aylık kaç lira kazanç — Türk şirketi için somut hesaplama rehberi.",
    date: "4 Mart 2026",
    slug: "ai-roi-hesaplama",
    category: "roi" as const,
  },
  {
    title: "Make vs n8n Karşılaştırma: Türk Şirketleri İçin Hangisi? [2026 Rehber]",
    excerpt: "Make mi n8n mi? Fiyat, özellik, Türkiye uyumu — iki platformu 5 kriterle karşılaştırıyoruz. Şirketiniz için doğru seçim hangisi?",
    date: "3 Mart 2026",
    slug: "make-vs-n8n-karsilastirma",
    category: "ai-tools" as const,
  },
  {
    title: "AI Danışmanlık Neden Farklıdır? Yazılım Satıcısı vs Strateji Ortağı [2026]",
    excerpt:
      "Yazılım satıcısı ürününü satar, AI danışmanı sorununuzu çözer. Aradaki 5 kritik fark, maliyet ve doğru seçim rehberi.",
    date: "2 Mart 2026",
    slug: "ai-danismanlik-neden-farklidir",
    category: "strategy" as const,
  },
  {
    title: "n8n Nedir? Türkiye'de İlk Otomasyonunuzu Kurun — Teknik Bilgi Gerekmez",
    excerpt:
      "n8n nedir, nasıl kurulur? Teknik bilgisi olmayan yönetici için ilk otomasyonu adım adım çalıştıran pratik n8n rehberi.",
    date: "1 Mart 2026",
    slug: "n8n-ile-basit-otomasyon",
    category: "tutorial" as const,
  },
  {
    title: "Türk Şirketlerinde Otomasyon Yanlışları: En Sık Yapılan 5 Hata",
    excerpt:
      "Otomasyon projesi yatırım yapıp sonuç alamıyor mu? Türk şirketlerinin en sık düştüğü 5 tuzak ve çıkış yolu.",
    date: "25 Şubat 2026",
    slug: "otomasyon-yanlislari",
    category: "automation" as const,
  },
  {
    title: "Şirket Check-Up'ı Nedir? AI Hazırlık Analizini Neden Yaptırmalısınız?",
    excerpt:
      "Şirket Check-Up'ı tıbbi check-up gibi düşünün. Şirketinizin AI hazırlığı hangi noktada, hangi süreç önce gider — ücretsiz analiz.",
    date: "20 Şubat 2026",
    slug: "sirket-check-up-nedir",
    category: "strategy" as const,
  },
] as const;

export const CTA_CONTENT = {
  label: "Sonraki Adım",
  headline: "Başlayalım.",
  description:
    "Önce check-up yapın, isterseniz doğrudan görüşmeye gelin. Hangisi size uygunsa.",
  ctaPrimary: "Ücretsiz Check-Up Başlatın",
  ctaSecondary: "30 Dakikalık Görüşme Planla",
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
