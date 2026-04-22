import Link from "next/link";
import type { Metadata } from "next";
import { BRAND } from "@/lib/constants";
import CTA from "@/components/sections/CTA";
import Button from "@/components/ui/Button";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import FAQSchema from "@/components/seo/FAQSchema";

const PAGE_URL = "https://www.verimio.com.tr/ai-agent-rehberi";
const PAGE_TITLE = "AI Agent Rehberi: Türk Şirketleri İçin Otonom Yapay Zeka";
const PAGE_DESCRIPTION =
  "AI agent nedir, chatbot'tan farkı ne, hangi iş süreçlerini otomatikleştirir? Türk KOBİ'leri için kullanım alanları, araçlar, güvenlik ve uygulama rehberleri bir arada.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    type: "website",
    url: PAGE_URL,
    locale: "tr_TR",
    siteName: "Verimio",
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
  alternates: { canonical: PAGE_URL },
};

const RESOURCES = [
  {
    slug: "ai-agent-nedir-sirketler-icin-rehber",
    badge: "Ana rehber",
    title: "AI Agent Nedir? Şirketler İçin Otonom Yapay Zeka Asistanları",
    summary:
      "AI agent'ın tanımı, chatbot'tan farkı, dört olgunluk seviyesi ve Türk şirketlerinde kullanım alanları. Konunun temel yazısı.",
  },
  {
    slug: "ai-agent-vs-chatbot-isletmeniz-icin-hangisi-dogru",
    badge: "Karşılaştırma",
    title: "AI Agent vs Chatbot: İşletmeniz İçin Hangisi Doğru?",
    summary:
      "İki sistemin gerçek farklarını karar kriterleriyle birlikte karşılaştıran, seçim ağacı sunan rehber.",
  },
  {
    slug: "kobi-ai-agent-ornekleri",
    badge: "Uygulama",
    title: "KOBİ'ler İçin AI Agent Örnekleri: 10 Gerçek Kullanım",
    summary:
      "Satış, müşteri destek, finans ve operasyon departmanlarında AI agent'ların yarattığı somut değişim — Türk KOBİ'lerine uyarlanmış örnekler.",
  },
  {
    slug: "kobilerde-agent-ai-gorevleri-otomatik-yapan-zeka-asistanlari",
    badge: "Uygulama",
    title: "KOBİ'lerde Agent AI: Görevleri Otomatik Yapan Zeka Asistanları",
    summary:
      "Agent AI'ın iş akışına nasıl yerleşeceği, nereden başlanacağı ve ekibin uyum sürecinin nasıl yönetileceği.",
  },
  {
    slug: "n8n-ai-agent-olusturma",
    badge: "Kurulum",
    title: "n8n ile AI Agent Oluşturma: Adım Adım Rehber",
    summary:
      "LangChain node, LLM entegrasyonları ve memory yapısı ile n8n üzerinde kod yazmadan AI agent kurmanın pratik yolu.",
  },
  {
    slug: "chatbot-voice-agent-secimi",
    badge: "Karşılaştırma",
    title: "Chatbot mu, Voice Agent mı? İş Modeli Bazlı Seçim Rehberi",
    summary:
      "Yazılı ve sesli AI arasında karar verirken bakılacak kriterler — ağırlıklı kanal, müşteri profili, çağrı hacmi.",
  },
  {
    slug: "n8n-chatgpt-entegrasyonu-rehberi",
    badge: "AI + Otomasyon",
    title: "n8n ChatGPT Entegrasyonu: Pratik Kullanım Senaryoları",
    summary:
      "LLM'leri otomasyon akışlarına eklemek, müşteri mesajı kategorize etmek ve otomatik yanıt taslağı üretmek için adımlar.",
  },
  {
    slug: "sirketinizin-gizli-verileri-guvende-mi-kurumsal-chatgpt-kull",
    badge: "Güvenlik",
    title: "Şirketinizin Verileri Güvende mi? Kurumsal LLM Kullanımı",
    summary:
      "AI agent'lara şirket verisi açılırken uygulanması gereken KVKK ve veri güvenliği temelleri.",
  },
];

const FAQ_ITEMS = [
  {
    question: "AI agent nedir, chatbot'tan temel farkı ne?",
    answer:
      "AI agent (yapay zeka ajanı), tek bir talimatla birden fazla adımı otonom olarak gerçekleştirebilen yapay zeka sistemidir. Chatbot bir soruya cevap verir; AI agent bir görevi baştan sona yürütür — veri toplar, karar verir, sistemler arasında işlem yapar. Örneğin chatbot 'toplantı nasıl ayarlanır?' sorusuna cevap verirken, AI agent takviminizi kontrol eder, katılımcıların uygun saatlerini bulur, davetiyeyi gönderir ve size rapor verir.",
  },
  {
    question: "AI agent Türkçe çalışır mı, KVKK uyumlu kurulabilir mi?",
    answer:
      "Evet. GPT-4, Claude ve Gemini gibi modern LLM'ler Türkçe'yi yüksek doğrulukla işler. KVKK uyumu için iki yol vardır: (1) self-hosted n8n + açık kaynak LLM (Llama, Mistral) ile verinin tamamen Türkiye'de kalması; (2) bulut LLM kullanılırken veri işleme sözleşmesinin (DPA) incelenmesi ve hassas verinin agent'a açılmaması. Sağlık, finans ve hukuk gibi sektörlerde self-hosted yaklaşım önerilir.",
  },
  {
    question: "KOBİ hangi seviyeden AI agent'a başlamalı?",
    answer:
      "AI agent'lar dört olgunluk seviyesinde sınıflandırılır: basit görev ajanı, çok adımlı ajan, otonom karar verici ve çok ajanlı sistem. Türk KOBİ'lerinin çoğu Seviye 1-2'den başlamalıdır — belirli bir işi tekrarlı yapan, ölçülebilir etkisi olan tekil agent. Seviye 3-4 teknik kapasite ve olgunluk ister. İlk 90 günde bir seviye-2 agent kurup sonuç almak, beş agent'ı aynı anda kurmaktan çok daha hızlı değer yaratır.",
  },
  {
    question: "AI agent kurmak için hangi araçlar kullanılır?",
    answer:
      "Kod yazmadan kurulan seviyeler için n8n (AI agent node), Make, Zapier ve LangFlow popülerdir. Daha karmaşık senaryolar için LangChain, LangGraph, CrewAI ve AutoGen kütüphaneleri tercih edilir. LLM olarak OpenAI GPT-4, Anthropic Claude, Google Gemini ya da self-hosted Llama/Mistral seçilebilir. Seçim; kullanım senaryosu, veri hassasiyeti ve ekibin teknik kapasitesine göre değişir.",
  },
  {
    question: "AI agent aylık maliyeti ne kadar?",
    answer:
      "Basit bir agent'ın aylık maliyeti üç kalemden oluşur: altyapı (n8n self-hosted için sunucu 5-10 €), LLM kullanım ücreti (iş yüküne göre 20-200 €) ve üçüncü parti entegrasyonlar (CRM, WhatsApp API gibi). Orta ölçekli bir KOBİ için tipik bir agent toplam 50-300 € aylık maliyetle çalışır. Karşılığında kurtardığı insan zamanı genellikle bu rakamın beş ila on katı değer yaratır.",
  },
  {
    question: "AI agent yanlış karar verirse ne olur, nasıl kontrol edilir?",
    answer:
      "Otonom sistemler için üç kontrol katmanı kurulur: (1) kritik aksiyon öncesi insan onayı — örneğin sözleşme gönderimi veya ödeme işlemi; (2) erişim ve karar kaydı — her adımın geriye dönük izlenmesi; (3) hata yönetimi ve yedek akış — beklenmeyen girdide agent'ın durdurulması ve insan devralımı. Verimio kurulumlarında bu üç katman varsayılan olarak eklenir.",
  },
  {
    question: "Verimio AI agent konusunda nasıl destek veriyor?",
    answer:
      "Verimio, Türk KOBİ'leri için AI agent yol haritasını Şirket Check-Up ile başlatır. Mevcut süreçler analiz edilir, otomatikleştirilecek ilk agent seçilir, kurulum ve ekip eğitimi birlikte yapılır. Tek seferlik agent kurulum paketleri veya aylık retainer bazlı büyüme destek modelleri mevcuttur. Net fiyat için süreçlerin önce Check-Up ile değerlendirilmesi gerekir — çünkü agent yatırımının geri dönüşü sürecin doğru seçilmesine bağlıdır.",
  },
];

const HIGHLIGHTS = [
  {
    title: "Chatbot cevap verir, agent iş yapar",
    body: "Chatbot soruya yanıt dönerken agent bir görevi baştan sona yürütür — veri toplar, karar verir, sistemler arası işlem yapar.",
  },
  {
    title: "Dört olgunluk seviyesi var",
    body: "Basit görev ajanından çok ajanlı sistemlere. KOBİ'lerin çoğu seviye 1-2'den başlamalı; seviye 3-4 ileri teknik kapasite ister.",
  },
  {
    title: "Kod yazmadan kurulabilir",
    body: "n8n AI agent node, LangFlow ve hazır platformlarla ilk agent iki hafta içinde işe alınır. Gerekirse LangChain ve CrewAI ile derinleşilir.",
  },
  {
    title: "Kontrol katmanları şart",
    body: "İnsan onayı, audit log ve fallback mekanizması olmadan agent kurulumu üretimde risk yaratır. Verimio kurulumlarında bu üçü varsayılandır.",
  },
];

export default function AiAgentRehberiPage() {
  return (
    <main className="pt-24">
      <BreadcrumbSchema
        items={[
          { name: "Ana Sayfa", url: "https://www.verimio.com.tr" },
          { name: "AI Agent Rehberi", url: PAGE_URL },
        ]}
      />
      <FAQSchema
        items={FAQ_ITEMS.map((f) => ({ question: f.question, answer: f.answer }))}
      />

      {/* Hero */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-4">
            2026 Rehberi · AI Agent
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 max-w-4xl">
            Chatbot cevap verir, AI agent iş yapar.
          </h1>
          <p className="text-lg text-foreground-secondary leading-relaxed mb-8 max-w-2xl">
            AI agent nedir, hangi araçlarla kurulur, Türk KOBİ'lerinde hangi
            süreçleri otomatikleştirir — tanımlar, karşılaştırmalar ve gerçek
            uygulama örnekleri bir arada.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="#kaynaklar" size="md">
              Rehberleri Okuyun
            </Button>
            <Link
              href={BRAND.checkupUrl}
              className="inline-flex items-center px-6 py-3 border border-border text-foreground font-medium text-sm hover:border-foreground transition-colors"
            >
              Agent için Check-Up
            </Link>
          </div>
        </div>
      </section>

      {/* Hızlı Özet */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
            <div className="md:col-span-4">
              <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-4">
                Hızlı Özet
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
                Tek paragrafta AI agent
              </h2>
            </div>
            <div className="md:col-span-8 space-y-5 text-lg text-foreground-secondary leading-[1.7]">
              <p>
                AI agent, tek bir talimatla birden fazla adımı otonom olarak
                gerçekleştirebilen yapay zeka sistemidir. Chatbot'tan farkı
                şudur: chatbot sadece cevap verir, agent veriyi toplar, karar
                verir ve sistemler arasında gerçek işlem yapar. Örneğin satış
                sürecinde: yeni lead geldiğinde şirket bilgisini LinkedIn'den
                çeker, CRM'e yazar, 1-10 arası skor verir ve satış ekibine
                bildirim gönderir. Tek bir komut, yedi adım.
              </p>
              <p>
                Türk KOBİ'leri için 2026'da AI agent'lar basit görev
                ajanlarından çok ajanlı sistemlere kadar dört olgunluk
                seviyesinde konumlanır. Kod yazmadan kurulabilir, n8n ve benzeri
                araçlarla iki hafta içinde üretime alınabilir. KVKK uyumu,
                kontrol katmanları (insan onayı, erişim kaydı, yedek akış) ve
                doğru sürecin seçilmesi başarının üç anahtarıdır.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Neden */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-4">
            Ne bilmeli
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-16 max-w-2xl">
            AI agent öncesi dört temel
          </h2>

          <div className="space-y-12">
            {HIGHLIGHTS.map((item, i) => (
              <div
                key={item.title}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8"
              >
                <div className="md:col-span-1">
                  <span className="text-sm text-foreground-muted tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="md:col-span-11">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-foreground-secondary leading-relaxed max-w-2xl">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* İçerik Kütüphanesi */}
      <section
        id="kaynaklar"
        className="py-24 md:py-32 border-t border-border scroll-mt-24"
      >
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-4">
            İçerik Kütüphanesi
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 max-w-2xl">
            AI agent konusunda sekiz kaynak
          </h2>
          <p className="text-foreground-secondary leading-relaxed mb-16 max-w-2xl">
            Tanımdan karar kriterlerine, kurulumdan güvenliğe — agent
            kurulumunun her aşamasında bir rehber.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {RESOURCES.map((res) => (
              <Link
                key={res.slug}
                href={`/blog/${res.slug}`}
                className="group block border-t border-border pt-6 hover:border-foreground transition-colors"
              >
                <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-3">
                  {res.badge}
                </p>
                <h3 className="text-lg font-bold mb-2 leading-snug group-hover:underline underline-offset-4 decoration-border">
                  {res.title}
                </h3>
                <p className="text-sm text-foreground-secondary leading-relaxed">
                  {res.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sık Sorulan Sorular */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-4">
            Sık Sorulan Sorular
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-16 max-w-2xl">
            AI agent hakkında en çok sorulanlar
          </h2>

          <div className="space-y-10">
            {FAQ_ITEMS.map((item) => (
              <div
                key={item.question}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 border-t border-border pt-8"
              >
                <div className="md:col-span-4">
                  <h3 className="text-lg font-bold leading-snug">
                    {item.question}
                  </h3>
                </div>
                <div className="md:col-span-8">
                  <p className="text-foreground-secondary leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}