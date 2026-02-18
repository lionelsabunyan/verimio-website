// Verimio AI Hazırlık Testi — Form Data & Types

export type Sector =
  | "E-ticaret / Perakende"
  | "Ajans (Reklam / Dijital / Kreatif)"
  | "B2B Hizmet (Danışmanlık / Muhasebe / Hukuk)"
  | "Üretim / Lojistik"
  | "Teknoloji / Yazılım"
  | "Diğer";

export interface FormData {
  // Step 1 — Temel Bilgiler
  email: string;
  phone: string;
  // Step 2 — Şirket
  sector: Sector | "";
  teamSize: string;
  tools: string[];
  // Step 3 — Sektöre Özel (4 soru)
  s6: string;
  s7: string;
  s8: string;
  s9: string;
  // Step 4 — Haftalık Saatler
  hoursDataEntry: string;
  hoursReporting: string;
  hoursCustomer: string;
  hoursContent: string;
  hoursFiles: string;
  // Step 5 — Son
  biggestPain: string;
  aiExperience: string;
  wantsCall: string;
}

export const INITIAL_FORM_DATA: FormData = {
  email: "",
  phone: "",
  sector: "",
  teamSize: "",
  tools: [],
  s6: "",
  s7: "",
  s8: "",
  s9: "",
  hoursDataEntry: "",
  hoursReporting: "",
  hoursCustomer: "",
  hoursContent: "",
  hoursFiles: "",
  biggestPain: "",
  aiExperience: "",
  wantsCall: "",
};

// Conditional questions per sector
export const SECTOR_QUESTIONS: Record<
  Sector,
  { s6: string[]; s7: string[]; s8: string[]; s9: string[] }
> = {
  "E-ticaret / Perakende": {
    s6: [
      "Her soruyu manuel yanıtlıyoruz (zaman alıyor)",
      "Hazır şablonlarımız var ama yine de manuel",
      "Kısmen otomatik (chatbot veya makro kullanıyoruz)",
      "Tamamen otomatik sistem var",
    ],
    s7: [
      "Her ürün için manuel yazıyoruz",
      "Şablon kullanıyoruz (copy-paste + düzenleme)",
      "AI araçlarıyla yazıyoruz (ChatGPT vb.)",
      "Tamamen otomatik sürecimiz var",
    ],
    s8: [
      "Excel / Google Sheets",
      "Platform üzerinden (Trendyol, Shopify vb.)",
      "Özel yazılım / ERP",
      "Manuel takip (not defteri, kağıt vb.)",
    ],
    s9: [
      "1-2 saat",
      "3-8 saat",
      "8+ saat",
      "Hiç yapmıyoruz",
    ],
  },
  "Ajans (Reklam / Dijital / Kreatif)": {
    s6: [
      "Manuel, her müşteri için ayrı hazırlık",
      "Şablonumuz var ama veri toplama manuel",
      "Araçlarla kısmen otomatik (Google Data Studio vb.)",
      "Tamamen otomatik dashboard'larımız var",
    ],
    s7: [
      "Tamamen manuel (ekip brainstorm + yazım)",
      "Şablonlar kullanıyoruz ama yine manuel",
      "AI destekli (ChatGPT, Jasper vb.)",
      "Büyük ölçüde otomatikleştirilmiş",
    ],
    s8: [
      "Birden fazla kanal (e-posta, WhatsApp, Slack vb.)",
      "Merkezi bir araç (CRM, proje yönetimi)",
      "Sadece e-posta",
      "Her müşteri farklı kanal tercih ediyor",
    ],
    s9: [
      "E-posta ve sözlü (takip zor)",
      "Proje yönetim aracı (Asana, Trello vb.)",
      "Özel sürecimiz var ve işliyor",
      "Kaotik, her proje farklı",
    ],
  },
  "B2B Hizmet (Danışmanlık / Muhasebe / Hukuk)": {
    s6: [
      "Klasörler ve manuel arama (kaos)",
      "Bulut depolama (Drive, Dropbox) ama düzensiz",
      "Organize belge yönetim sistemimiz var",
      "DMS (Document Management System) kullanıyoruz",
    ],
    s7: [
      "E-posta ve telefon (takip zor)",
      "Excel / Google Sheets",
      "CRM kullanıyoruz",
      "Otomatik hatırlatma sistemimiz var",
    ],
    s8: [
      "Manuel, her seferinde sıfırdan",
      "Şablonlarımız var ama düzenleme gerekiyor",
      "CRM veya araçla kısmen otomatik",
      "Tamamen dijital ve otomatik",
    ],
    s9: [
      "1-2 saat",
      "3-8 saat",
      "8+ saat",
      "Hiç yapmıyoruz",
    ],
  },
  "Üretim / Lojistik": {
    s6: [
      "Excel / Google Sheets",
      "Manuel kayıt (kağıt, defter)",
      "ERP sistemi (SAP, Logo vb.)",
      "Özel yazılım",
    ],
    s7: [
      "Tamamen manuel",
      "Kısmen otomatik (bazı adımlar)",
      "Büyük ölçüde otomatik",
      "Tamamen dijital ve entegre",
    ],
    s8: [
      "Telefon ve e-posta (takip zor)",
      "Merkezi bir platform",
      "ERP üzerinden",
      "Manuel tablo / liste",
    ],
    s9: [
      "Manuel kontrol ve kağıt kayıt",
      "Excel tabanlı",
      "Dijital form / uygulama",
      "Otomatik sensör / sistem",
    ],
  },
  "Teknoloji / Yazılım": {
    s6: [
      "Manuel deployment (FTP, SSH vb.)",
      "Kısmen CI/CD var",
      "Tam CI/CD pipeline (GitHub Actions vb.)",
      "GitOps / tam otomasyon",
    ],
    s7: [
      "E-posta (manuel takip)",
      "Ticket sistemi (Freshdesk, Zendesk vb.)",
      "AI destekli chatbot + insan",
      "Tamamen self-serve dokümantasyon",
    ],
    s8: [
      "Manuel (Excel, elle hesaplama)",
      "Dashboard araçları (Tableau, Looker vb.)",
      "Otomatik raporlama sistemi",
      "Real-time monitoring",
    ],
    s9: [
      "E-posta ve Slack (dağınık)",
      "Proje yönetim aracı ama disiplin yok",
      "Agile / Scrum uyguluyoruz",
      "Tam entegre DevOps süreci",
    ],
  },
  Diğer: {
    s6: [
      "Müşteri iletişimi / destek",
      "Raporlama ve analiz",
      "İçerik üretimi",
      "Belge ve dosya yönetimi",
      "Veri girişi ve takip",
    ],
    s7: [
      "Tamamen manuel",
      "Kısmen araçlarla destekleniyor",
      "Büyük ölçüde otomatik",
      "Tamamen otomatik",
    ],
    s8: [],
    s9: [],
  },
};

export const SECTOR_QUESTION_LABELS: Record<
  Sector,
  { s6: string; s7: string; s8: string; s9: string }
> = {
  "E-ticaret / Perakende": {
    s6: "Müşteri sorularını nasıl yanıtlıyorsunuz?",
    s7: "Ürün açıklamalarını nasıl yazıyorsunuz?",
    s8: "Sipariş/stok verilerinizi nasıl yönetiyorsunuz?",
    s9: "Haftada kaç saat raporlama/analiz yapıyorsunuz?",
  },
  "Ajans (Reklam / Dijital / Kreatif)": {
    s6: "Müşteri raporlarını nasıl hazırlıyorsunuz?",
    s7: "İçerik üretimini nasıl yapıyorsunuz?",
    s8: "Müşteri iletişimini nasıl yönetiyorsunuz?",
    s9: "Brief / proje yönetimi süreciniz nasıl?",
  },
  "B2B Hizmet (Danışmanlık / Muhasebe / Hukuk)": {
    s6: "Müşteri dokümanlarını nasıl yönetiyorsunuz?",
    s7: "Müşteri takibini nasıl yapıyorsunuz?",
    s8: "Teklif / sözleşme süreciniz nasıl?",
    s9: "Haftada kaç saat raporlama/analiz yapıyorsunuz?",
  },
  "Üretim / Lojistik": {
    s6: "Üretim/stok takibini nasıl yapıyorsunuz?",
    s7: "Sipariş/sevkiyat süreciniz nasıl?",
    s8: "Tedarikçi iletişimini nasıl yönetiyorsunuz?",
    s9: "Kalite kontrol süreciniz nasıl?",
  },
  "Teknoloji / Yazılım": {
    s6: "Deployment süreciniz nasıl?",
    s7: "Müşteri destek süreciniz nasıl?",
    s8: "Raporlama / analiz süreciniz nasıl?",
    s9: "Proje yönetimi süreciniz nasıl?",
  },
  Diğer: {
    s6: "En çok zaman aldığını düşündüğünüz iş süreci hangisi?",
    s7: "Bu süreçleri nasıl yönetiyorsunuz?",
    s8: "",
    s9: "",
  },
};

export const HOURS_OPTIONS = ["0-2 saat", "3-5 saat", "6-10 saat", "10+ saat"];

export const HOURS_CATEGORIES = [
  { key: "hoursDataEntry" as const, label: "Veri girişi ve güncelleme" },
  { key: "hoursReporting" as const, label: "Raporlama ve analiz" },
  { key: "hoursCustomer" as const, label: "Müşteri iletişimi" },
  { key: "hoursContent" as const, label: "İçerik üretimi" },
  { key: "hoursFiles" as const, label: "Dosya / belge yönetimi" },
];
