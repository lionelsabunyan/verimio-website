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
  badge: "AI Dönüşüm Danışmanlığı",
  headline: "Yapay zeka,",
  headlineHighlight: "ekibinizin en verimli üyesi.",
  subheadline:
    "Verimio, operasyonunuzun hangi noktasında yapay zekadan nasıl verim alacağınızı haritalıyor — sonra birlikte uyguluyoruz. Dört uzmanlık alanımız var: operasyon otomasyonu, müşteri hizmetleri AI'ı, veri & raporlama ve AI strateji & agent kurulumu.",
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
      title: "Şeffaf Süreç",
      description: "Check-up'tan uygulamaya beş adımlı, açık ve netleşmiş yol.",
    },
  ],
} as const;

export const ABOUT_CONTENT = {
  label: "Hakkımızda",
  heading:
    "Yapay zekayla çalışan bir ekip, yapay zeka dönüşümünü anlatır.",
  text: "Verimio, yapay zekayla çalışan bir danışmanlık ekibidir — müşterilerimize önerdiğimiz dönüşümü kendi operasyonumuzda da uyguladık. İçerik üretimimizin büyük bölümü otomatik pipeline'larla hazırlanıyor; blog yazılarımızın çoğu insan yönetiminde ama AI-asistanlı süreçlerden geçiyor. Bu bir yöntem değil, kanıt: operasyonunu gerçekten AI ile dönüştürmüş bir ekibin, başka şirketlere nasıl dönüşebileceğini anlatması en samimi pozisyondur.",
  ctaPrimary: "Hakkımızda",
  ctaSecondary: "Hizmetlerimize Bakın",
} as const;

export const HOW_IT_WORKS = [
  {
    step: "01",
    icon: "clipboard-list",
    title: "Check-Up",
    description:
      "Sektörünüze özel 15-20 dakikalık ücretsiz form. Operasyonunuzu gerçekten anlamak için doğru soruları soruyoruz.",
  },
  {
    step: "02",
    icon: "file-text",
    title: "Size Özel Rapor",
    description:
      "Otomasyon potansiyeli, tahmini tasarruf ve öncelikli aksiyonlar — e-postanıza somut rakamlarla gelir.",
  },
  {
    step: "03",
    icon: "phone",
    title: "30 Dakikalık Görüşme",
    description:
      "Calendly üzerinden ücretsiz görüşme. Raporu birlikte değerlendirir, sorularınızı cevaplar, kapsamı netleştiririz.",
  },
  {
    step: "04",
    icon: "file-check",
    title: "Teklif",
    description:
      "İhtiyacınıza göre şekillenmiş, kapsamı ve zaman çizelgesi belli bir teklif. Sürpriz maliyet yok.",
  },
  {
    step: "05",
    icon: "rocket",
    title: "Uygulama & Takip",
    description:
      "Çözümleri birlikte hayata geçiriyor, KPI'ları takip ediyor, ince ayar ve sürekli iyileştirme yapıyoruz.",
  },
] as const;

export const REPORT_SECTIONS = [
  {
    title: "AI Hazırlık Skoru",
    description: "Şirketinizin mevcut durumunu 10 üzerinden değerlendiriyoruz. Nerede olduğunuzu net görün.",
  },
  {
    title: "En Büyük Fırsat",
    description: "Cevaplarınıza göre en somut kazanım alanını ve tahmini tasarruf potansiyelini belirliyoruz.",
  },
  {
    title: "5 Öncelikli Aksiyon",
    description: "Farklı iş alanlarında uygulanabilir, birbirinden bağımsız 5 somut çözüm önerisi.",
  },
  {
    title: "Uygulama Yol Haritası",
    description: "Nereden başlayacağınızı gösteren adım adım plan. Gerçekçi süre tahminiyle.",
  },
] as const;

export const EXPERTISE_ITEMS = [
  {
    slug: "operasyon-otomasyonu",
    title: "Operasyon Otomasyonu",
    tagline: "n8n & Make ile süreçleri birbirine bağlayın.",
    description:
      "Süreç analizi ve iş akışı otomasyonunu tek başlık altında topluyoruz: operasyonunuzu uçtan uca haritalıyor, tekrarlayan görevleri n8n veya Make üzerinde otomatize ediyor, sistemleriniz arasında veri akışını kuruyoruz.",
    features: [
      "Uçtan uca iş akışı analizi ve darboğaz haritası",
      "n8n / Make / Zapier platform seçimi ve kurulumu",
      "Sistemler arası veri entegrasyonu (CRM, muhasebe, ERP)",
      "Otomatik bildirim, onay akışı ve takip mekanizmaları",
    ],
    pillarSlug: "n8n-rehberi-turk-sirketleri-is-otomasyonu",
    pillarLabel: "n8n rehberini oku",
  },
  {
    slug: "musteri-hizmetleri-ai",
    title: "Müşteri Hizmetleri AI'ı",
    tagline: "Voice agent ve chatbot — 7/24, KVKK uyumlu.",
    description:
      "Firmanıza özel eğitilmiş voice agent ve chatbot çözümleri. Çoklu kanal (web, WhatsApp, telefon, e-posta) üzerinden 7/24 çalışır, canlı ekibin yükünü azaltır, memnuniyet skorunu yukarı çeker.",
    features: [
      "Voice agent tasarımı (Türkçe, KVKK uyumlu)",
      "Firmanıza özel eğitilmiş chatbot",
      "Çoklu kanal desteği: web, WhatsApp, telefon, e-posta",
      "Canlı destek entegrasyonu ve eskalasyon akışları",
    ],
    pillarSlug: "yapay-zeka-cagri-merkezi-rehberi",
    pillarLabel: "AI çağrı merkezi rehberini oku",
  },
  {
    slug: "veri-raporlama",
    title: "Veri & Raporlama Otomasyonu",
    tagline: "Dağınık veriden otomatik dashboard'a.",
    description:
      "Farklı sistemlere dağılmış verinizi toplayıp birleştiriyor, gerçek zamanlı dashboard'lara ve otomatik periyodik raporlara dönüştürüyoruz. Excel hâlâ her yerde — ama karar verici Excel'den kurtulmuş olur.",
    features: [
      "Otomatik veri toplama ve birleştirme pipeline'ları",
      "Gerçek zamanlı dashboard tasarımı",
      "KPI takibi ve periyodik otomatik rapor",
      "Veri temizleme, yapılandırma, görselleştirme",
    ],
    pillarSlug: "raporlama-otomasyonu-nedir",
    pillarLabel: "Raporlama otomasyonu rehberini oku",
  },
  {
    slug: "ai-strateji-agent",
    title: "AI Strateji & Agent Kurulumu",
    tagline: "Doğru araçla, doğru süreçte, doğru zamanda.",
    description:
      "AI stratejisi ve agent mimarisi tek başlık altında: firmanıza en uygun araç ve platformları bağımsız olarak seçiyor, otonom görev yapan agent'lar tasarlıyor, ekip eğitimi ve değişim yönetimini birlikte yürütüyoruz.",
    features: [
      "AI kullanım alanlarının önceliklendirilmesi ve ROI haritası",
      "Bağımsız araç/platform tavsiyesi (satıcı değiliz)",
      "AI agent tasarımı ve kurulumu (otonom görev asistanları)",
      "Departman bazlı eğitim ve değişim yönetimi",
    ],
    pillarSlug: "ai-agent-nedir-sirketler-icin-rehber",
    pillarLabel: "AI agent rehberini oku",
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: "Check-up süreci nasıl işliyor?",
    answer:
      "Sektörünüze ve şirket yapınıza özel bir form dolduruyorsunuz. Cevaplarınızı inceleyip en kısa sürede size özel bir analiz raporu hazırlayıp e-postanıza iletiyor. Süreç sizden yalnızca 15-20 dakika alıyor.",
  },
  {
    question: "Raporumda neler yer alıyor?",
    answer:
      "Otomasyon potansiyeliniz (saat/hafta), tahmini maliyet tasarrufu (₺/ay), öncelikli aksiyon alanları, her alan için somut çözüm önerileri ve 90 günlük uygulama yol haritası. Genel değerlendirme değil — firmanıza ve operasyonunuza özel bulgular.",
  },
  {
    question: "Danışmanlık ve koçluk ayrı mı satın alınıyor?",
    answer:
      "Hayır. Verimio'da danışmanlık ve koçluk aynı sürecin parçasıdır. Check-up ile başlar, strateji çizeriz, sonra birlikte uygularız. Ekibinizi eğitir, sonuçları ölçeriz. Ayrı ayrı satın almanıza gerek yok.",
  },
  {
    question: "Check-up sonrası ne oluyor?",
    answer:
      "Rapor e-postanıza ulaştıktan sonra beş adımlı bir süreç izliyoruz: (1) raporu inceliyorsunuz, (2) Calendly üzerinden ücretsiz 30 dakikalık görüşme alıyorsunuz, (3) görüşmede kapsamı birlikte netleştiriyoruz, (4) size özel bir teklif hazırlıyoruz — sürpriz maliyet yok, (5) uygulamaya geçiyoruz ve KPI'ları birlikte takip ediyoruz.",
  },
  {
    question: "Ekibiniz kaç kişi? AI-native derken ne kastediyorsunuz?",
    answer:
      "Operasyonumuzun büyük bölümü AI-asistanlı pipeline'larla yürüyor. İçerik üretimi, görsel üretim ve iş akışlarımızın çoğu insan yönetiminde ama AI yardımıyla işliyor. Müşterilerimize önerdiğimiz dönüşümü kendi üzerimizde uyguladık — bu bir yöntem değil, kanıt. Esnek ve verimli bir yapı, satış baskısız ve araç-bağımsız bir danışmanlık.",
  },
  {
    question: "Süreç ne kadar sürer?",
    answer:
      "Bu, firmanızın ihtiyacına göre değişir. Check-up raporu formunuzu doldurmanızın hemen ardından hazırlanıp e-postanıza iletilir. Uygulama koçluğu ise projenin kapsamına göre birkaç haftadan birkaç aya kadar uzanabilir. Her süreç netleştirildikten sonra size özel bir zaman çizelgesi hazırlanır.",
  },
  {
    question: "Fiyatlandırma nasıl?",
    answer:
      "Şirket Check-Up'ı ücretsizdir. Uygulama danışmanlığı için fiyatlandırma, projenin kapsamına ve sürekliliğine göre belirlenir. Check-up raporunun ardından ihtiyacınıza göre bir teklif sunuyoruz — sürpriz maliyet yok.",
  },
  {
    question: "Ne zaman sonuç görürüz?",
    answer:
      "İlk somut etkiler, genellikle uygulama başladıktan 4-8 hafta içinde ölçülebilir hale gelir. ROI hesabı ve beklentiler, check-up raporunda firmanıza özel olarak ortaya konur.",
  },
  {
    question: "Belirli araçlara ya da platformlara bağlı mısınız?",
    answer:
      "Hayır. Firmaya özgü en uygun çözümü öneriyoruz. Belirli bir yazılım veya platform satmıyoruz; bağımsız bir danışman olarak yalnızca firmanızın çıkarına en iyi hizmet eden araçları tavsiye ediyoruz.",
  },
  {
    question: "Hangi sektörlerde çalışıyorsunuz?",
    answer:
      "Üretim, lojistik, profesyonel hizmetler, finans, e-ticaret ve teknoloji başta olmak üzere kurumsal yapıdaki her sektörde hizmet veriyoruz. Ortak nokta: operasyonel verimliliği artırmak isteyen, büyüme odaklı firmalar.",
  },
  {
    question: "Uygulama sonrasında destek sağlıyor musunuz?",
    answer:
      "Evet. Danışmanlık ilişkimiz rapor teslimiyle bitmiyor. Uygulama sürecinde takip, ince ayar ve gerektiğinde yeniden planlama desteği sunuyoruz. Süreci birlikte tamamlamak temel çalışma biçimimiz.",
  },
  {
    question: "Verilerimizin gizliliği nasıl korunuyor?",
    answer:
      "Paylaştığınız bilgiler yalnızca analiz amacıyla kullanılır, şifrelenerek saklanır ve kesinlikle üçüncü taraflarla paylaşılmaz. Talep etmeniz halinde analiz öncesinde NDA imzalayabiliriz.",
  },
] as const;

export const BLOG_POSTS = [
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
  label: "Bir Sonraki Adım",
  headline: "İlk Adımı Birlikte Atalım",
  description:
    "Ücretsiz check-up ile başlayın, isterseniz doğrudan 30 dakikalık görüşmeye geçin. İki yol da açık.",
  ctaPrimary: "Ücretsiz Check-Up Başlatın",
  ctaSecondary: "30 Dakikalık Görüşme Planla",
  ctaTertiary: "Hizmetlerimizi İnceleyin",
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
  { value: "Hızlı", label: "Rapor Teslimi" },
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
