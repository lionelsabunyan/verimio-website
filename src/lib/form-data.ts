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
  s8: string[]; // Enerji kaybı alanları — çoklu seçim (max 3), KOBİ'nin genelde 2-3 derdi aynı anda var
  s9: string; // Sektör-spesifik kritik metrik (iade %, no-show %, renewal %, ERP adı vs)
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
  s8: [],
  s9: "",
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

// Sektörel sorular: s6=operasyonel yapı/süreç, s7=hacim/ölçek, s8=enerji kaybı, s9=sektör-spesifik kritik metrik
export const SECTOR_QUESTIONS: Record<
  Sector,
  { s6: string[]; s7: string[]; s8: string[]; s9: string[] }
> = {
  "E-ticaret": {
    s6: [
      "Sadece kendi web sitemiz",
      "1 marketplace + kendi sitemiz",
      "2-3 marketplace entegre çalışıyoruz",
      "4+ kanal, OMS/entegrasyon yazılımı kullanıyoruz",
    ],
    s7: [
      "1-100 sipariş",
      "100-500 sipariş",
      "500-2.000 sipariş",
      "2.000+ sipariş",
    ],
    s8: [
      "Ürün listeleme ve varyant yönetimi",
      "İade yönetimi ve iade oranı",
      "Müşteri destek ve marketplace mesajları",
      "Reklam/kampanya yönetimi ve creative üretimi",
    ],
    s9: [
      "%5 altı (sağlıklı)",
      "%5-15 (normal)",
      "%15-30 (kronik sorun)",
      "%30+ (acil müdahale)",
      "Takip etmiyoruz",
    ],
  },
  "Perakende / Mağaza": {
    s6: [
      "Tek mağaza (bağımsız operasyon)",
      "2-5 şube (sahibi hâlâ günlük operasyona dokunuyor)",
      "6-20 şube (profesyonel operasyon ekibi var)",
      "20+ şube veya franchise yapısı",
    ],
    s7: [
      "Şube başına 50 altı işlem",
      "50-200 işlem",
      "200-500 işlem",
      "500+ işlem",
    ],
    s8: [
      "Şubeler arası stok dengesizliği ve transfer",
      "Personel devir hızı, vardiya ve eğitim",
      "Müşteri sadakati ve kampanya etkinliği",
      "Fire, kayıp ve envanter tutarsızlığı",
    ],
    s9: [
      "Logo / Netsis",
      "Mikro / Eta",
      "SAP / Oracle",
      "Kendi yazılım",
      "POS var ama ERP yok",
    ],
  },
  "Ajans (Reklam / Dijital / Kreatif)": {
    s6: [
      "Takip etmiyoruz, hissen yönetiyoruz",
      "Takip ediyoruz, %60 altında (kronik düşük)",
      "Takip ediyoruz, %60-75 arası (normal)",
      "Takip ediyoruz, %75 üstü (sağlıklı)",
    ],
    s7: [
      "1-5 müşteri",
      "5-15 müşteri",
      "15-40 müşteri",
      "40+ müşteri",
    ],
    s8: [
      "İçerik üretim hacmi (copy, görsel, video yetmiyor)",
      "Revizyon döngüleri ve scope creep",
      "İç koordinasyon ve proje yönetimi",
      "Raporlama ve müşteri iletişimi",
    ],
    s9: [
      "Full-service (her hizmet)",
      "Performance ağırlıklı (reklam)",
      "Kreatif butik (tasarım/video)",
      "Sosyal medya / influencer",
      "PR / iletişim",
    ],
  },
  "B2B Hizmet (Danışmanlık / Muhasebe / Hukuk)": {
    s6: [
      "WhatsApp ve e-posta (dağınık, dönem sonu kaos)",
      "Klasör + cloud (Drive/Dropbox) ama aramak zaman alıyor",
      "Muhasebe yazılımının arşiv modülü (Luca/Zirve/Mikro)",
      "Müvekkil portalı var, belge kendileri yüklüyor",
    ],
    s7: [
      "1-10 müşteri/dosya",
      "10-30 müşteri/dosya",
      "30-80 müşteri/dosya",
      "80+ müşteri/dosya",
    ],
    s8: [
      "Belge toplama ve tasnif (müvekkilden gelen fatura/makbuz)",
      "Beyanname hazırlama ve dönemsel yoğunluk",
      "Müvekkil soru-cevap ve mevzuat açıklaması",
      "GİB / e-Fatura / e-Defter entegrasyon arızaları",
    ],
    s9: [
      "Luca",
      "Zirve",
      "Mikro / Logo",
      "Eta / Diğer",
      "Kullanmıyorum / Excel",
    ],
  },
  "Üretim / Lojistik": {
    s6: [
      "Kağıt formlar + Excel (vardiya sonu manuel toplama)",
      "ERP var ama saha verisi geç giriliyor",
      "ERP + barkod/terminal (saha canlı veri giriyor)",
      "MES / IoT kurulu, makineler canlı veri gönderiyor",
    ],
    s7: [
      "1-100 birim/sipariş",
      "100-500 birim/sipariş",
      "500-2.000 birim/sipariş",
      "2.000+ birim/sipariş",
    ],
    s8: [
      "Üretim planlama ve termin uyumu",
      "Makine duruşları ve bakım",
      "Fire / kalite geri dönüşleri",
      "Tedarikçi teslim gecikmeleri",
      "Vardiya raporlama ve iç veri akışı",
    ],
    s9: [
      "SAP",
      "Logo / Netsis",
      "Mikro / Eta",
      "Sadece Excel",
      "ERP yok",
    ],
  },
  "Teknoloji / Yazılım": {
    s6: [
      "Slack + e-posta (ticket tanımı yok)",
      "Ticket sistemi (Zendesk/Freshdesk) — manuel triage",
      "Ticket + AI triage / auto-response (kısmen otomatik)",
      "AI agent + self-serve + agent handoff (olgun kurulum)",
    ],
    s7: [
      "1-100 destek talebi/ay",
      "100-1.000",
      "1.000-10.000",
      "10.000+",
    ],
    s8: [
      "Ticket triage ve tekrarlayan soru cevaplama",
      "Müşteri-reported bug tekrar üretimi ve dev'e aktarma",
      "Onboarding ve eğitim (time-to-value)",
      "Churn / kullanım analizi ve müdahale",
      "Release/deployment ve incident response",
    ],
    s9: [
      "Pre-revenue / < 500K USD",
      "500K - 2M USD, çoğunluk SMB",
      "2M - 10M USD, mid-market ağırlıklı",
      "10M+ USD, enterprise ağırlıklı",
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
      "Randevu, no-show ve hasta hatırlatma",
      "SGK ve özel sigorta provizyon süreçleri",
      "Reçete, rapor ve tetkik sonuç bildirimi",
      "Hasta dosyası ve KVKK uyumlu arşivleme",
    ],
    s9: [
      "%5 altı (sorun yok)",
      "%5-15 (orta)",
      "%15-25 (ciddi)",
      "%25+ (kayıp büyük)",
      "Takip etmiyoruz",
    ],
  },
  "Finans / Sigorta": {
    s6: [
      "Manuel: e-posta, Excel, telefon hâkim",
      "Kısmi dijital: form var, onay + hasar manuel",
      "Acente yazılımı var ama şirketlerle entegrasyon kopuk",
      "Uçtan uca entegre (başvuru + poliçe + hasar)",
    ],
    s7: [
      "1-50 dosya/başvuru",
      "50-200 dosya/başvuru",
      "200-1.000 dosya/başvuru",
      "1.000+ dosya/başvuru",
    ],
    s8: [
      "Yenileme takibi ve müşteri kaybı önleme",
      "Hasar (claims) dosya takibi ve iletişim",
      "Komisyon mutabakatı ve sigorta şirketi ekstreleri",
      "Compliance raporlaması (BDDK/SEDDK/MASAK/KVKK)",
    ],
    s9: [
      "%85 üstü (sağlıklı)",
      "%70-85 (normal)",
      "%50-70 (düşük)",
      "%50 altı (kritik)",
      "Takip etmiyoruz",
    ],
  },
  Gayrimenkul: {
    s6: [
      "Her portal için tek tek manuel giriş",
      "Toplu ilan aracı var, güncelleme hâlâ elle",
      "CRM + ilan entegrasyonu kısmen otomatik",
      "Otomatik dağıtım + fiyat/durum senkronu",
    ],
    s7: [
      "Aylık 20 altı lead",
      "20-100 lead",
      "100-300 lead",
      "300+ lead",
    ],
    s8: [
      "Lead'e hızlı dönüş ve nitelik filtreleme",
      "Portföyün birden fazla portalda güncel tutulması",
      "Sözleşme, ekspertiz ve tapu süreçleri",
      "Danışman performans takibi ve komisyon paylaşımı",
    ],
    s9: [
      "5 dk içinde",
      "1 saat içinde",
      "Aynı gün",
      "24 saat+",
      "Takip etmiyoruz",
    ],
  },
  Diğer: {
    s6: [
      "Tek kişi / 2-5 kişi (mikro)",
      "6-20 kişi (küçük)",
      "21-100 kişi (orta)",
      "100+ kişi (büyük)",
    ],
    s7: [
      "B2B (kurumsal müşteri)",
      "B2C (bireysel müşteri)",
      "Karma (B2B + B2C)",
      "Abonelik / üyelik bazlı",
      "Proje bazlı (tek seferlik)",
    ],
    s8: [
      "Müşteri adayı bulma ve dönüşüm",
      "Sipariş / rezervasyon / iş emri yönetimi",
      "Tedarik zinciri ve stok",
      "Raporlama ve finansal takip",
      "Ekip koordinasyonu ve görev dağılımı",
    ],
    s9: [
      "Aylık 10 altı müşteri/iş emri",
      "10-50",
      "50-200",
      "200-1.000",
      "1.000+",
    ],
  },
};

export const SECTOR_QUESTION_LABELS: Record<
  Sector,
  { s6: string; s7: string; s8: string; s9: string }
> = {
  "E-ticaret": {
    s6: "Kaç satış kanalında aktif olarak satış yapıyorsunuz?",
    s7: "Aylık ortalama sipariş hacminiz nedir?",
    s8: "Operasyonunuzda en çok kan kaybettiğiniz alan hangisi?",
    s9: "Son 3 ayda aylık ortalama iade oranınız yaklaşık yüzde kaç?",
  },
  "Perakende / Mağaza": {
    s6: "Şube sayınız ve operasyon yapınız?",
    s7: "Şube başına günlük ortalama işlem sayısı?",
    s8: "Operasyonda en çok para / zaman kaybettiğiniz alan?",
    s9: "Kullandığınız ana ERP/POS sistemi?",
  },
  "Ajans (Reklam / Dijital / Kreatif)": {
    s6: "Ekibinizin aylık utilization (doluluk) oranını biliyor musunuz?",
    s7: "Kaç aktif müşteriyle çalışıyorsunuz?",
    s8: "Ajans marjınızı en çok eriten alan hangisi?",
    s9: "Hizmet karışımınızın ağırlığı hangisinde?",
  },
  "B2B Hizmet (Danışmanlık / Muhasebe / Hukuk)": {
    s6: "Müvekkilinizle belge akışı nasıl işliyor?",
    s7: "Aylık aktif müşteri/dosya sayınız nedir?",
    s8: "Ofisinizde en çok zamanı yiyen iş hangisi?",
    s9: "Şu an hangi muhasebe yazılımını kullanıyorsunuz?",
  },
  "Üretim / Lojistik": {
    s6: "Üretim ve stok verinizi nasıl topluyorsunuz?",
    s7: "Aylık üretim veya sevkiyat hacminiz nedir?",
    s8: "Üretiminizde en çok zaman/para kaybettiren alan?",
    s9: "Mevcut ERP sisteminiz?",
  },
  "Teknoloji / Yazılım": {
    s6: "Müşteri başarısı ve destek operasyonunuz nasıl?",
    s7: "Aylık aktif kullanıcı veya destek talebi sayınız?",
    s8: "Ekip olarak en çok nereye saat yakıyorsunuz?",
    s9: "ARR ve müşteri segmentiniz?",
  },
  "Sağlık / Klinik": {
    s6: "Hasta randevu ve takip süreciniz nasıl işliyor?",
    s7: "Günlük ortalama hasta/danışan sayınız nedir?",
    s8: "Sağlık işinde en çok zamanı hangi alan yiyor?",
    s9: "Aylık ortalama no-show (gelmeyen hasta) oranınız?",
  },
  "Finans / Sigorta": {
    s6: "Başvurudan poliçeye ve hasara kadar süreç nasıl işliyor?",
    s7: "Aylık işlem gören dosya/başvuru sayınız?",
    s8: "Finans operasyonunda en çok zamanı hangi alan yiyor?",
    s9: "Yıllık yenileme (renewal) oranınız?",
  },
  Gayrimenkul: {
    s6: "Portföy ve ilan süreciniz nasıl işliyor?",
    s7: "Aylık ortalama gelen müşteri adayı (lead) sayınız?",
    s8: "Günlük işinizde en çok zamanı hangi alan alıyor?",
    s9: "Ortalama lead dönüş süreniz?",
  },
  Diğer: {
    s6: "İşletmenizin ölçeğini en iyi anlatan hangisi?",
    s7: "Gelir modelinizin ağırlığı hangi yönde?",
    s8: "Operasyonunuzda en çok zamanı hangi alan yiyor?",
    s9: "Aylık müşteri veya iş emri hacminiz yaklaşık?",
  },
};

// — Step 3 Sabitleri —

export const PRIORITY_AREA_OPTIONS = [
  "Operasyon Otomasyonu (n8n / Make)",
  "Müşteri Hizmetleri AI'ı (voice / chatbot)",
  "Veri & Raporlama Otomasyonu",
  "AI Strateji & Agent Kurulumu",
] as const;

// Sektör bazlı öncelik alanları — "priority_area" Step 3'te sektör seçimine göre dinamikleşir.
// Her sektörde 4 sektör-spesifik seçenek + 1 ortak "Başka bir alan".
export const SECTOR_PRIORITY_AREAS: Record<Sector, string[]> = {
  "E-ticaret": [
    "Marketplace ve ürün listeleme otomasyonu",
    "Müşteri destek AI'ı (chatbot / WhatsApp)",
    "Reklam ve kampanya optimizasyonu",
    "Veri ve satış raporlama otomasyonu",
    "Başka bir alan (aşağıda açıklayayım)",
  ],
  "Perakende / Mağaza": [
    "Stok optimizasyonu ve talep tahmini",
    "Müşteri sadakat ve CRM otomasyonu",
    "Personel performans ve vardiya yönetimi",
    "Veri ve satış raporlama otomasyonu",
    "Başka bir alan (aşağıda açıklayayım)",
  ],
  "Ajans (Reklam / Dijital / Kreatif)": [
    "İçerik üretim hızlandırma (copy + görsel + video)",
    "İç operasyon ve proje yönetimi",
    "Otomatik raporlama ve müşteri dashboard'ları",
    "AI kampanya analizi ve öneri sistemi",
    "Başka bir alan (aşağıda açıklayayım)",
  ],
  "B2B Hizmet (Danışmanlık / Muhasebe / Hukuk)": [
    "Belge/müvekkil takip otomasyonu",
    "Müşteri iletişimi ve hatırlatma AI'ı",
    "Mevzuat ve beyanname süreç hızlandırma",
    "Veri ve raporlama otomasyonu",
    "Başka bir alan (aşağıda açıklayayım)",
  ],
  "Üretim / Lojistik": [
    "Üretim planlama ve OEE optimizasyonu",
    "Tedarik zinciri otomasyonu",
    "Kalite kontrol ve fire yönetimi",
    "Veri ve raporlama otomasyonu",
    "Başka bir alan (aşağıda açıklayayım)",
  ],
  "Teknoloji / Yazılım": [
    "AI destek / ticket triage",
    "Product analytics & churn önleme",
    "Developer productivity AI",
    "İç raporlama ve veri otomasyonu",
    "Başka bir alan (aşağıda açıklayayım)",
  ],
  "Sağlık / Klinik": [
    "Randevu ve no-show önleme otomasyonu",
    "SGK / sigorta provizyon otomasyonu",
    "KVKK uyumlu doküman ve hasta yönetimi",
    "Veri ve raporlama otomasyonu",
    "Başka bir alan (aşağıda açıklayayım)",
  ],
  "Finans / Sigorta": [
    "Renewal / claims süreç otomasyonu",
    "Compliance ve regülasyon raporlaması",
    "Dijital belge toplama ve KVKK",
    "Komisyon mutabakatı ve veri akışı",
    "Başka bir alan (aşağıda açıklayayım)",
  ],
  Gayrimenkul: [
    "Lead yönetimi ve CRM otomasyonu",
    "İlan dağıtım ve güncelleme otomasyonu",
    "Müşteri-portföy akıllı eşleştirme",
    "Danışman performans ve raporlama",
    "Başka bir alan (aşağıda açıklayayım)",
  ],
  Diğer: [
    "Operasyon otomasyonu (n8n / Make)",
    "Müşteri hizmetleri AI'ı (chatbot / voice)",
    "Veri ve raporlama otomasyonu",
    "AI strateji ve agent kurulumu",
    "Başka bir alan (aşağıda açıklayayım)",
  ],
};

// Sektör bazlı biggest_pain textarea placeholder'ı — ziyaretçiye örnek veriyor.
export const SECTOR_PAIN_PLACEHOLDERS: Record<Sector, string> = {
  "E-ticaret":
    "Örn: İade oranımız %18, marketplace mesajlarına yetişemiyoruz, SKU sayımız 3.000 ama 500'ü hiç satmıyor, reklam maliyeti çok yüksek...",
  "Perakende / Mağaza":
    "Örn: 8 şube arası stok transfer sıkıntılı, personel devir hızı %40, fire oranımız yüksek, kampanya etkisini ölçemiyoruz...",
  "Ajans (Reklam / Dijital / Kreatif)":
    "Örn: Ekip utilization %55, aylık raporlar 100 saat alıyor, 3 müşteri son 6 ayda churn oldu, scope creep hakim...",
  "B2B Hizmet (Danışmanlık / Muhasebe / Hukuk)":
    "Örn: Beyanname dönemlerinde ekip 80 saat haftaya çıkıyor, müvekkil belgeleri WhatsApp'tan dağınık geliyor, GİB entegrasyon sık bozuluyor...",
  "Üretim / Lojistik":
    "Örn: OEE %58, fire oranı %7, ERP ile Excel konuşmuyor, tedarikçi teslim gecikmeleri üretim planını altüst ediyor...",
  "Teknoloji / Yazılım":
    "Örn: Aylık 2000 ticket, churn %12, onboarding 3 hafta, 4 kişilik CS yetmiyor, enterprise müşteri SOC2 istiyor...",
  "Sağlık / Klinik":
    "Örn: Günde 8 hasta no-show, SGK provizyon takibi 4 saat/gün, KVKK audit yaklaşıyor, doktor notları elle yazılıyor...",
  "Finans / Sigorta":
    "Örn: Renewal %68, komisyon mutabakatı ayda 3 gün alıyor, 15 sigorta şirketi ekstresi Excel'de, hasar dosya takibi kötü...",
  Gayrimenkul:
    "Örn: Sahibinden lead'lerinin %70'i sahte, dönüş süremiz 2 saat, 3 portala tek tek ilan giriyoruz, danışmanlar müşteri alıp gidiyor...",
  Diğer:
    "Örn: Manuel takip yüzünden müşteri kaçırıyorum, Excel artık ayak bağı, WhatsApp'tan gelen kayıtlar organize değil, ödeme takibi zor...",
};

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
