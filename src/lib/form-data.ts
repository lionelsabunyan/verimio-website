// Verimio AI Hazırlık Testi — Form Data & Types

export type Sector =
  | "E-ticaret / Perakende"
  | "Ajans (Reklam / Dijital / Kreatif)"
  | "B2B Hizmet (Danışmanlık / Muhasebe / Hukuk)"
  | "Üretim / Lojistik"
  | "Teknoloji / Yazılım"
  | "Diğer";

export interface FormData {
  // Step 1 — Sektör + Ekip
  sector: Sector | "";
  teamSize: string;
  // Step 2 — Sektöre Özel Sorular + Araçlar
  s6: string;
  s7: string;
  s8: string; // Diğer sektöründe boş
  tools: string[];
  // Step 3 — İletişim + Ağrı Noktası
  email: string;
  phone: string;
  biggestPain: string;
}

export const INITIAL_FORM_DATA: FormData = {
  sector: "",
  teamSize: "",
  s6: "",
  s7: "",
  s8: "",
  tools: [],
  email: "",
  phone: "",
  biggestPain: "",
};

export const TEAM_SIZE_OPTIONS = [
  "Sadece ben",
  "2-5 kişi",
  "6-15 kişi",
  "16-50 kişi",
  "50+ kişi",
];

export const TOOLS_OPTIONS = [
  "Excel / Google Sheets",
  "WhatsApp Business",
  "Muhasebe Yazılımı (Logo, Mikro vb.)",
  "CRM (Salesforce, HubSpot vb.)",
  "E-posta Pazarlama",
  "Proje Yönetimi (Trello, Asana vb.)",
  "ERP Sistemi",
  "Hiçbiri",
];

// Conditional questions per sector (3 per sector)
export const SECTOR_QUESTIONS: Record<
  Sector,
  { s6: string[]; s7: string[]; s8: string[] }
> = {
  "E-ticaret / Perakende": {
    s6: [
      "Her soruyu manuel yanıtlıyoruz (WhatsApp, e-posta)",
      "Hazır şablonlarımız var ama yine de manuel",
      "Kısmen otomatik (chatbot veya makro kullanıyoruz)",
      "Tamamen otomatik sistem kurulu",
    ],
    s7: [
      "Tamamen manuel (kağıt, Excel, platform paneli)",
      "Platform üzerinden takip (Trendyol, Shopify vb.)",
      "ERP / stok yazılımı kullanıyoruz",
      "Otomatik sistem var, çok az müdahale",
    ],
    s8: [
      "Müşteri iletişimi ve destek",
      "Ürün listeleme ve içerik üretimi",
      "Sipariş / iade takibi",
      "Raporlama ve analiz",
    ],
  },
  "Ajans (Reklam / Dijital / Kreatif)": {
    s6: [
      "Manuel, her müşteri için ayrı hazırlık (saatler süruyor)",
      "Şablonumuz var ama veri toplama manuel",
      "Araçlarla kısmen otomatik (Google Data Studio vb.)",
      "Tamamen otomatik dashboard'larımız var",
    ],
    s7: [
      "Tamamen manuel (ekip yazıyor, düzeltiyor)",
      "AI destekli ama editöre ihtiyaç var",
      "Şablon + AI ile hızlı üretiyoruz",
      "Büyük ölçüde otomatikleştirildi",
    ],
    s8: [
      "Müşteri takibi ve brief alma süreci",
      "İçerik üretimi ve onay süreçleri",
      "Raporlama ve performans analizi",
      "Fatura ve muhasebe takibi",
    ],
  },
  "B2B Hizmet (Danışmanlık / Muhasebe / Hukuk)": {
    s6: [
      "Klasörler ve e-posta (dosya bulmak zaman alıyor)",
      "Bulut depolama (Drive, Dropbox) ama düzensiz",
      "Organize bir belge yönetim sistemimiz var",
      "DMS (Document Management System) kullanıyoruz",
    ],
    s7: [
      "Manuel, her seferinde sıfırdan hazırlıyoruz",
      "Şablonlarımız var ama ciddi düzenleme gerekiyor",
      "CRM veya araçla kısmen otomatik",
      "Tamamen dijital ve standart süreç",
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
      "Excel / Google Sheets ile takip",
      "Manuel kayıt (kağıt, defter)",
      "ERP sistemi var (SAP, Logo vb.)",
      "Otomatik sensör / sistem entegrasyonu",
    ],
    s7: [
      "Telefon ve e-posta (takip çok zor)",
      "Merkezi bir platform veya ERP üzerinden",
      "WhatsApp grupları ile iletişim",
      "Entegre sistem, otomatik bildirimler",
    ],
    s8: [
      "Stok ve üretim takibi",
      "Tedarikçi iletişimi ve sipariş",
      "Sevkiyat ve lojistik planlama",
      "Kalite kontrol ve raporlama",
    ],
  },
  "Teknoloji / Yazılım": {
    s6: [
      "E-posta ve Slack (dağınık, takip zor)",
      "Ticket sistemi var (Freshdesk, Zendesk vb.)",
      "AI destekli chatbot + insan desteği",
      "Self-serve dokümantasyon ve otomatik yanıtlar",
    ],
    s7: [
      "Manuel (her görev el ile tetikleniyor)",
      "Kısmen CI/CD var, bazı şeyler hâlâ manuel",
      "Tam CI/CD pipeline kurulu",
      "GitOps / tam otomasyon ve monitoring",
    ],
    s8: [
      "Müşteri desteği ve ticketing",
      "Deployment ve test süreçleri",
      "İç raporlama ve proje takibi",
      "Fatura ve muhasebe süreçleri",
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
      "Bazı araçlar kullanıyoruz ama yine de çok zaman alıyor",
      "Kısmen otomatik, iyileştirmeye açık",
      "Büyük ölçüde otomatik",
    ],
    s8: [], // Diğer sektöründe 3. soru yok
  },
};

export const SECTOR_QUESTION_LABELS: Record<
  Sector,
  { s6: string; s7: string; s8: string }
> = {
  "E-ticaret / Perakende": {
    s6: "Müşteri sorularını nasıl yönetiyorsunuz?",
    s7: "Sipariş ve stok takibiniz nasıl?",
    s8: "En çok vakit kaybettiğiniz alan hangisi?",
  },
  "Ajans (Reklam / Dijital / Kreatif)": {
    s6: "Müşteri raporlarını nasıl hazırlıyorsunuz?",
    s7: "İçerik üretim süreciniz nasıl işliyor?",
    s8: "En çok vakit kaybettiğiniz alan hangisi?",
  },
  "B2B Hizmet (Danışmanlık / Muhasebe / Hukuk)": {
    s6: "Müşteri belgelerini ve dosyaları nasıl yönetiyorsunuz?",
    s7: "Teklif ve sözleşme süreciniz nasıl?",
    s8: "En çok vakit kaybettiğiniz alan hangisi?",
  },
  "Üretim / Lojistik": {
    s6: "Stok ve üretim takibini nasıl yapıyorsunuz?",
    s7: "Tedarikçi iletişimini nasıl yönetiyorsunuz?",
    s8: "En çok vakit kaybettiğiniz alan hangisi?",
  },
  "Teknoloji / Yazılım": {
    s6: "Müşteri desteğinizi nasıl yönetiyorsunuz?",
    s7: "Tekrarlayan süreçleriniz (deploy, test vb.) nasıl?",
    s8: "En çok vakit kaybettiğiniz alan hangisi?",
  },
  Diğer: {
    s6: "En çok zaman aldığını düşündüğünüz iş süreci hangisi?",
    s7: "Bu süreci şu an nasıl yönetiyorsunuz?",
    s8: "",
  },
};
