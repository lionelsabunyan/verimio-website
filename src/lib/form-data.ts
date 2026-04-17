// Verimio Şirket Check-Up Formu — Data & Types

export type Sector =
  | "E-ticaret"
  | "Perakende / Mağaza"
  | "Ajans (Reklam / Dijital / Kreatif)"
  | "B2B Hizmet (Danışmanlık / Muhasebe / Hukuk)"
  | "Üretim / Lojistik"
  | "Teknoloji / Yazılım"
  | "Sağlık / Klinik"
  | "Finans / Sigorta"
  | "Gayrimenkul"
  | "Diğer";

export interface FormData {
  // Step 1 — Şirket Profili
  sector: Sector | "";
  companyName: string;
  companyWebsite: string;
  teamSize: string;
  // Step 2 — Operasyonel Durum
  s6: string;
  s7: string;
  s8: string; // Diğer sektöründe boş
  tools: string[];
  // Step 3 — Hedef & Öncelik
  biggestPain: string;
  priorityArea: string;
  expectation: string;
  timeline: string;
  // Step 4 — İletişim
  email: string;
  phone: string;
}

export const INITIAL_FORM_DATA: FormData = {
  sector: "",
  companyName: "",
  companyWebsite: "",
  teamSize: "",
  s6: "",
  s7: "",
  s8: "",
  tools: [],
  biggestPain: "",
  priorityArea: "",
  expectation: "",
  timeline: "",
  email: "",
  phone: "",
};

// — Step 1 Sabitleri —

export const SECTORS: {
  value: Sector;
  emoji: string;
  label: string;
  sub: string;
}[] = [
  { value: "E-ticaret", emoji: "🛒", label: "E-ticaret", sub: "Online satış, marketplace" },
  { value: "Perakende / Mağaza", emoji: "🏪", label: "Perakende / Mağaza", sub: "Fiziksel mağaza, zincir" },
  { value: "Ajans (Reklam / Dijital / Kreatif)", emoji: "🎨", label: "Ajans", sub: "Reklam, dijital, kreatif" },
  { value: "B2B Hizmet (Danışmanlık / Muhasebe / Hukuk)", emoji: "💼", label: "B2B Hizmet", sub: "Danışmanlık, muhasebe, hukuk" },
  { value: "Üretim / Lojistik", emoji: "🏭", label: "Üretim / Lojistik", sub: "İmalat, depo, sevkiyat" },
  { value: "Teknoloji / Yazılım", emoji: "💻", label: "Teknoloji", sub: "Yazılım, SaaS, IT" },
  { value: "Sağlık / Klinik", emoji: "🏥", label: "Sağlık", sub: "Klinik, hastane, medikal" },
  { value: "Finans / Sigorta", emoji: "🏦", label: "Finans / Sigorta", sub: "Banka, sigorta, fintech" },
  { value: "Gayrimenkul", emoji: "🏠", label: "Gayrimenkul", sub: "Emlak, inşaat, yönetim" },
  { value: "Diğer", emoji: "🏢", label: "Diğer", sub: "Başka sektör" },
];

export const TEAM_SIZE_OPTIONS = [
  "Sadece ben",
  "2-5 kişi",
  "6-15 kişi",
  "16-50 kişi",
  "50+ kişi",
];

// — Step 2 Sabitleri —

export const TOOLS_OPTIONS = [
  "Excel / Google Sheets",
  "WhatsApp Business",
  "Muhasebe Yazılımı (Logo, Mikro vb.)",
  "CRM (Salesforce, HubSpot vb.)",
  "E-posta Pazarlama",
  "Proje Yönetimi (Trello, Asana vb.)",
  "ERP Sistemi",
  "POS / Kasa Sistemi",
  "Randevu / Hasta Takip Sistemi",
  "Hiçbiri",
];

// Sektörel sorular: s6=operasyonel süreç, s7=hacim/ölçek proxy, s8=vakit kaybı
export const SECTOR_QUESTIONS: Record<
  Sector,
  { s6: string[]; s7: string[]; s8: string[] }
> = {
  "E-ticaret": {
    s6: [
      "WhatsApp/e-posta'da her müşteriye ayrı ayrı cevap yazıyoruz",
      "Şablonlarımız var ama yine de elle yollanıyor",
      "Kısmen otomatik (chatbot veya hazır yanıtlar)",
      "Tamamen otomatik sistem kurulu",
    ],
    s7: [
      "1-100 sipariş",
      "100-500 sipariş",
      "500-2.000 sipariş",
      "2.000+ sipariş",
    ],
    s8: [
      "Müşteri iletişimi ve destek",
      "Ürün listeleme ve içerik üretimi",
      "Sipariş / iade / kargo takibi",
      "Raporlama ve analiz",
    ],
  },
  "Perakende / Mağaza": {
    s6: [
      "Manuel (kağıt, defter, Excel)",
      "POS sistemi var ama stok takibi ayrı",
      "Entegre POS + stok sistemi",
      "Otomatik sipariş ve stok yenileme sistemi",
    ],
    s7: [
      "1-30 işlem",
      "30-100 işlem",
      "100-500 işlem",
      "500+ işlem",
    ],
    s8: [
      "Stok sayımı ve sipariş yönetimi",
      "Müşteri sadakat ve iletişim",
      "Personel vardiya ve performans takibi",
      "Raporlama ve analiz",
    ],
  },
  "Ajans (Reklam / Dijital / Kreatif)": {
    s6: [
      "Her müşteri için ayrı hazırlıyoruz, birkaç saat sürüyor",
      "Şablonumuz var ama veriyi elle topluyoruz",
      "Araçlarla kısmen otomatik (Looker Studio vb.)",
      "Otomatik dashboard'lar, müşteri kendi erişiyor",
    ],
    s7: [
      "1-5 müşteri",
      "5-15 müşteri",
      "15-40 müşteri",
      "40+ müşteri",
    ],
    s8: [
      "Müşteri takibi ve brief alma süreci",
      "İçerik üretimi ve onay süreçleri",
      "Raporlama ve performans analizi",
      "Fatura, teklif ve muhasebe",
    ],
  },
  "B2B Hizmet (Danışmanlık / Muhasebe / Hukuk)": {
    s6: [
      "Klasörler ve e-posta (bulmak zaman alıyor)",
      "Bulut depolama (Drive, Dropbox) ama düzensiz",
      "Organize belge yönetim sistemi",
      "DMS (Document Management System) kullanıyoruz",
    ],
    s7: [
      "1-10 müşteri/dosya",
      "10-30 müşteri/dosya",
      "30-80 müşteri/dosya",
      "80+ müşteri/dosya",
    ],
    s8: [
      "Müşteri takibi ve hatırlatmalar",
      "Teklif ve sözleşme hazırlama",
      "Belge ve dosya yönetimi",
      "Raporlama ve analiz",
    ],
  },
  "Üretim / Lojistik": {
    s6: [
      "Manuel kayıt (kağıt, defter, Excel)",
      "Basit yazılım ama entegrasyon yok",
      "ERP sistemi var (SAP, Logo vb.)",
      "Otomatik sensör / IoT entegrasyonu",
    ],
    s7: [
      "1-100 birim/sipariş",
      "100-500 birim/sipariş",
      "500-2.000 birim/sipariş",
      "2.000+ birim/sipariş",
    ],
    s8: [
      "Stok ve üretim planlaması",
      "Tedarikçi iletişimi ve sipariş",
      "Sevkiyat ve lojistik takibi",
      "Kalite kontrol ve raporlama",
    ],
  },
  "Teknoloji / Yazılım": {
    s6: [
      "E-posta ve Slack (dağınık, takip zor)",
      "Ticket sistemi (Freshdesk, Zendesk vb.)",
      "AI destekli chatbot + insan desteği",
      "Self-serve dokümantasyon + otomatik yanıtlar",
    ],
    s7: [
      "1-100",
      "100-1.000",
      "1.000-10.000",
      "10.000+",
    ],
    s8: [
      "Müşteri desteği ve ticketing",
      "Deployment ve test süreçleri",
      "İç raporlama ve proje takibi",
      "Fatura ve muhasebe süreçleri",
    ],
  },
  "Sağlık / Klinik": {
    s6: [
      "Manuel (telefon, kağıt ajanda)",
      "Online randevu var ama hatırlatmalar manuel",
      "Kısmen otomatik (SMS/WhatsApp hatırlatma)",
      "Tam entegre hasta yönetim sistemi",
    ],
    s7: [
      "1-10 hasta/danışan",
      "10-30 hasta/danışan",
      "30-80 hasta/danışan",
      "80+ hasta/danışan",
    ],
    s8: [
      "Randevu yönetimi ve hasta iletişimi",
      "Reçete, rapor ve evrak işleri",
      "Fatura ve sigorta süreçleri",
      "Stok ve medikal malzeme takibi",
    ],
  },
  "Finans / Sigorta": {
    s6: [
      "Manuel formlar ve e-posta",
      "Dijital form var ama onay süreci manuel",
      "Kısmen otomatik iş akışı",
      "Tam dijital, uçtan uca otomatik",
    ],
    s7: [
      "1-50 dosya/başvuru",
      "50-200 dosya/başvuru",
      "200-1.000 dosya/başvuru",
      "1.000+ dosya/başvuru",
    ],
    s8: [
      "Müşteri onboarding ve belge toplama",
      "Risk değerlendirme ve analiz",
      "Uyum (compliance) ve raporlama",
      "Müşteri iletişimi ve takip",
    ],
  },
  Gayrimenkul: {
    s6: [
      "Manuel (tek tek sitelere giriyoruz)",
      "Toplu ilan aracı var ama güncelleme manuel",
      "CRM ile portföy takibi",
      "Otomatik ilan dağıtım ve güncelleme sistemi",
    ],
    s7: [
      "1-20 ilan",
      "20-80 ilan",
      "80-200 ilan",
      "200+ ilan",
    ],
    s8: [
      "İlan yayınlama ve güncelleme",
      "Müşteri adayı takibi ve eşleştirme",
      "Sözleşme ve evrak süreçleri",
      "Raporlama ve piyasa analizi",
    ],
  },
  Diğer: {
    s6: [
      "Müşteri iletişimi / destek",
      "Raporlama ve analiz",
      "İçerik üretimi ve pazarlama",
      "Belge ve dosya yönetimi",
      "Veri girişi ve takip",
    ],
    s7: [
      "Tamamen manuel (hiç araç yok)",
      "Bazı araçlar var ama yine de çok zaman alıyor",
      "Kısmen otomatik, iyileştirmeye açık",
      "Büyük ölçüde otomatik",
    ],
    s8: [],
  },
};

export const SECTOR_QUESTION_LABELS: Record<
  Sector,
  { s6: string; s7: string; s8: string }
> = {
  "E-ticaret": {
    s6: "Müşteri sorularını ve destek taleplerini nasıl yönetiyorsunuz?",
    s7: "Aylık ortalama sipariş hacminiz nedir?",
    s8: "En çok vakit kaybettiğiniz alan hangisi?",
  },
  "Perakende / Mağaza": {
    s6: "Stok ve satış takibinizi nasıl yapıyorsunuz?",
    s7: "Günlük ortalama müşteri / işlem sayınız nedir?",
    s8: "En çok vakit kaybettiğiniz alan hangisi?",
  },
  "Ajans (Reklam / Dijital / Kreatif)": {
    s6: "Müşteri raporlarını nasıl hazırlıyorsunuz?",
    s7: "Kaç aktif müşteriyle çalışıyorsunuz?",
    s8: "En çok vakit kaybettiğiniz alan hangisi?",
  },
  "B2B Hizmet (Danışmanlık / Muhasebe / Hukuk)": {
    s6: "Müşteri belgelerini ve dosyaları nasıl yönetiyorsunuz?",
    s7: "Aylık aktif müşteri/dosya sayınız nedir?",
    s8: "En çok vakit kaybettiğiniz alan hangisi?",
  },
  "Üretim / Lojistik": {
    s6: "Stok ve üretim takibini nasıl yapıyorsunuz?",
    s7: "Aylık üretim veya sevkiyat hacminiz nedir?",
    s8: "En çok vakit kaybettiğiniz alan hangisi?",
  },
  "Teknoloji / Yazılım": {
    s6: "Müşteri/kullanıcı desteğinizi nasıl yönetiyorsunuz?",
    s7: "Aylık aktif kullanıcı veya destek talebi sayınız?",
    s8: "En çok vakit kaybettiğiniz alan hangisi?",
  },
  "Sağlık / Klinik": {
    s6: "Hasta randevu ve takip süreciniz nasıl işliyor?",
    s7: "Günlük ortalama hasta/danışan sayınız nedir?",
    s8: "En çok vakit kaybettiğiniz alan hangisi?",
  },
  "Finans / Sigorta": {
    s6: "Müşteri başvuru ve dosya süreciniz nasıl?",
    s7: "Aylık işlem gören dosya/başvuru sayınız?",
    s8: "En çok vakit kaybettiğiniz alan hangisi?",
  },
  Gayrimenkul: {
    s6: "İlan ve portföy yönetiminiz nasıl?",
    s7: "Aylık aktif ilan / portföy sayınız?",
    s8: "En çok vakit kaybettiğiniz alan hangisi?",
  },
  Diğer: {
    s6: "En çok zaman aldığını düşündüğünüz iş süreci hangisi?",
    s7: "Bu süreci şu an nasıl yönetiyorsunuz?",
    s8: "",
  },
};

// — Step 3 Sabitleri —

export const PRIORITY_AREA_OPTIONS = [
  "Operasyon Otomasyonu (n8n / Make)",
  "Müşteri Hizmetleri AI'ı (voice / chatbot)",
  "Veri & Raporlama Otomasyonu",
  "AI Strateji & Agent Kurulumu",
] as const;

export const EXPECTATION_OPTIONS = [
  "Rapor yeterli — kendi ekibimizle ilerleriz",
  "Uygulama desteği de istiyorum",
  "Henüz karar vermedim — önce raporu görmek isterim",
] as const;

export const TIMELINE_OPTIONS = [
  "Acil — hemen başlamak istiyorum",
  "1-3 ay içinde planlıyorum",
  "Araştırma aşamasındayım",
] as const;
