import Link from "next/link";
import type { Metadata } from "next";
import { BRAND } from "@/lib/constants";
import CTA from "@/components/sections/CTA";
import Button from "@/components/ui/Button";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import FAQSchema from "@/components/seo/FAQSchema";

const PAGE_URL = "https://www.verimio.com.tr/ai-cagri-merkezi-rehberi";
const PAGE_TITLE = "AI Çağrı Merkezi Rehberi: Voice AI ve Türkçe Müşteri Hizmetleri";
const PAGE_DESCRIPTION =
  "Yapay zeka çağrı merkezi nedir, voice agent nasıl kurulur, KVKK uyumlu Türkçe müşteri hizmetleri AI'ı. Chatbot ve hibrit modellerin karşılaştırması ve uygulama rehberleri.";

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
    slug: "yapay-zeka-cagri-merkezi-rehberi",
    badge: "Ana rehber",
    title: "Yapay Zeka Çağrı Merkezi: Kurulum ve İşletme Rehberi",
    summary:
      "AI çağrı merkezinin tanımı, maliyet karşılaştırması, Türkiye'deki yerli çözümler ve kurulum adımları. Konunun temel yazısı.",
  },
  {
    slug: "chatbot-voice-agent-secimi",
    badge: "Karşılaştırma",
    title: "Chatbot mu, Voice Agent mı? İş Modeli Bazlı Seçim",
    summary:
      "Yazılı ve sesli AI arasında karar verirken bakılacak kriterler: ağırlıklı kanal, müşteri profili ve çağrı hacmi.",
  },
  {
    slug: "kvkk-uyumlu-voice-ai-cagri-merkezinde-guvenlik",
    badge: "Güvenlik",
    title: "KVKK Uyumlu Voice AI: Çağrı Merkezinde Güvenlik",
    summary:
      "Ses kaydı, biyometrik veri, müşteri onayı ve veri lokasyonu — Türk şirketleri için voice AI'ın KVKK çerçevesi.",
  },
  {
    slug: "whatsapp-ai-musteri-yanit",
    badge: "Kanal",
    title: "WhatsApp AI: Türk Müşterisine Hızlı Otomatik Yanıt",
    summary:
      "WhatsApp Business API + AI ile müşteri mesajlarına dakikalar içinde doğru, Türkçe yanıt üretme rehberi.",
  },
  {
    slug: "musteri-hizmetlerinde-ai-donemi",
    badge: "Strateji",
    title: "Müşteri Hizmetlerinde AI Dönemi: Nereden Başlamalı?",
    summary:
      "Operatör ekibini AI'a geçirirken yapılması ve yapılmaması gerekenler. İnsan-makine dengesinin doğru kurulumu.",
  },
  {
    slug: "ai-agent-vs-chatbot-isletmeniz-icin-hangisi-dogru",
    badge: "Karşılaştırma",
    title: "AI Agent vs Chatbot: İşletmeniz İçin Hangisi Doğru?",
    summary:
      "Çağrı merkezinin ötesinde iş süreçlerine uzanan agent ile klasik chatbot'un net farkı.",
  },
  {
    slug: "n8n-chatgpt-entegrasyonu-rehberi",
    badge: "AI + Otomasyon",
    title: "n8n ChatGPT Entegrasyonu: Müşteri Mesajı Kategorize Etme",
    summary:
      "Gelen müşteri mesajlarını AI ile kategorize edip ilgili ekibe yönlendirmenin adımları.",
  },
  {
    slug: "is-sureci-otomasyonu-nedir",
    badge: "Temel",
    title: "İş Süreci Otomasyonu Nedir, Nereden Başlanır?",
    summary:
      "Çağrı merkezi öncesinde arka ofis süreçlerinin doğru haritalanması — AI yatırımının geri dönüş temeli.",
  },
];

const FAQ_ITEMS = [
  {
    question: "Yapay zeka çağrı merkezi nedir, nasıl çalışır?",
    answer:
      "Yapay zeka çağrı merkezi, gelen müşteri çağrılarını ve mesajlarını yapay zekayla karşılayan, basit soruları otomatik çözen, karmaşık vakaları insan operatörlere aktaran bir sistemdir. Müşteri arar veya yazar, AI anlık olarak anlar, yanıtlar ve gerektiğinde insana aktarır. Kuyruk yok, bekleme yok; 7/24 tutarlı hizmet sunar. Aynı sistem telefon, WhatsApp, web chat ve e-posta gibi birden fazla kanalı tek merkezden yönetir.",
  },
  {
    question: "Voice agent Türkçe'yi ne kadar iyi anlıyor?",
    answer:
      "2026 itibariyle Türkçe voice AI doğruluğu İngilizce'ye çok yakın. Modern modeller — OpenAI Whisper, Google Speech-to-Text, Azure Speech, SESTEK'in yerli ses modelleri — İstanbul ve Anadolu ağızlarını, jargonu ve gürültülü ortamı yüksek doğrulukla işliyor. Üretimde nokta atışı performans için sektöre özel eğitim (domain fine-tuning) ve sık duyulan müşteri ifadelerinin sözlüğe eklenmesi önerilir.",
  },
  {
    question: "AI çağrı merkezi kurulumu aylık ne kadara mal olur?",
    answer:
      "Orta ölçekli bir Türk şirketi için aylık maliyet tipik olarak 15.000-60.000 TL aralığındadır ve şu kalemlerden oluşur: platform lisansı (SESTEK, AloTech, Retell gibi), LLM kullanım bedeli, telefon altyapısı ve sunucu. Karşılığında geleneksel operatör ekibine kıyasla %40-70 maliyet düşüşü yaygındır. Kesin rakam çağrı hacmine, ortalama konuşma süresine ve seçilen modele göre değişir.",
  },
  {
    question: "Çağrı merkezi için chatbot mu, voice agent mı seçmeliyim?",
    answer:
      "Karar üç eksene bağlıdır: ağırlıklı kanal (yazılı mı sesli mi), müşteri profili ve çağrı hacmi. Yazılı kanalı baskın olan e-ticaret ve SaaS şirketleri için chatbot hızlı ve uygun maliyetlidir. Sesli iletişimin baskın olduğu sağlık, finans ve lojistikte voice agent şart. Çoğu Türk şirketi için doğru cevap hibrit modeldir: chatbot ve voice agent basit sorguları üstlenir, karmaşık veya duygusal vakalar insan operatöre aktarılır.",
  },
  {
    question: "KVKK açısından voice AI kurulumunda nelere dikkat edilmeli?",
    answer:
      "Dört kritik konu vardır: (1) müşteri onayı — çağrı başlangıcında AI olduğunun ve kaydın yapıldığının açıkça belirtilmesi; (2) veri lokasyonu — ses verisinin Türkiye'deki sunucularda işlenmesi; (3) biyometrik ses verisi özel kategori kişisel veri olduğu için açık rıza alınması; (4) saklama süresi ve silme politikası — VERBİS bildiriminde belirtilen süreye uyum. Verimio kurulumlarında bu dört konu başlangıçtan itibaren tanımlanır.",
  },
  {
    question: "AI çağrı merkezi insan operatörlerin yerini tamamen alır mı?",
    answer:
      "Hayır. AI basit, tekrarlayan ve kural tabanlı çağrıları üstlenir — çalışma saatleri sorgusu, sipariş durumu, iade süreci, basit randevu gibi. Karmaşık şikayet yönetimi, empati gerektiren durumlar ve politika esnetmesi istenen konular insan operatörlere aktarılır. Tipik dağılım çoğu KOBİ'de %60-70 AI, %30-40 insan olur; ekip küçülmez, daha değerli işlere odaklanır.",
  },
  {
    question: "Verimio çağrı merkezi AI kurulumunu nasıl yapıyor?",
    answer:
      "Verimio, Şirket Check-Up ile mevcut çağrı merkezi süreçlerinizi analiz eder. Sonrasında üç adımlı bir kurulum sunar: (1) pilot — bir veya iki sorguyu AI'a açıp sonuç ölçme; (2) genişleme — başarılı olan akışların diğer sorgulara yayılması; (3) sürdürme — KPI takibi, model iyileştirme, ekip eğitimi. Tek seferlik kurulum paketleri veya aylık retainer bazlı büyüme destek modelleri mevcuttur.",
  },
];

const HIGHLIGHTS = [
  {
    title: "Anlık yanıt, kuyruk yok",
    body: "7/24 kesintisiz servis; gece 3'te arayan müşteriye aynı kalitede hizmet. Bekleme süresi saniyelere düşer.",
  },
  {
    title: "Çok kanallı tek AI",
    body: "Telefon, WhatsApp, web chat ve e-posta aynı modele bağlıdır. Müşteri hangi kanaldan gelirse gelsin tutarlı yanıt alır.",
  },
  {
    title: "Duygu ve bağlam analizi",
    body: "Ses tonu ve metinden kızgınlık veya aciliyet algılanır. Kızgın müşteri doğrudan deneyimli operatöre aktarılır.",
  },
  {
    title: "KVKK çerçevesinde kurulum",
    body: "Müşteri onayı, veri lokasyonu, biyometrik ses verisi ve saklama politikaları başlangıçtan itibaren konfigüre edilir.",
  },
];

export default function AiCagriMerkeziPage() {
  return (
    <main className="pt-24">
      <BreadcrumbSchema
        items={[
          { name: "Ana Sayfa", url: "https://www.verimio.com.tr" },
          { name: "AI Çağrı Merkezi Rehberi", url: PAGE_URL },
        ]}
      />
      <FAQSchema
        items={FAQ_ITEMS.map((f) => ({ question: f.question, answer: f.answer }))}
      />

      {/* Hero */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-4">
            2026 Rehberi · AI Çağrı Merkezi
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 max-w-4xl">
            Çağrı merkezinizi yapay zekayla yeniden kurun.
          </h1>
          <p className="text-lg text-foreground-secondary leading-relaxed mb-8 max-w-2xl">
            Voice agent, chatbot, hibrit model — hangisi sizin için doğru?
            KVKK uyumu, maliyet hesabı, Türkçe dil kalitesi ve kurulum adımları
            üzerine kapsamlı rehberler.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="#kaynaklar" size="md">
              Rehberleri Okuyun
            </Button>
            <Link
              href={BRAND.checkupUrl}
              className="inline-flex items-center px-6 py-3 border border-border text-foreground font-medium text-sm hover:border-foreground transition-colors"
            >
              Voice AI için Check-Up
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
                Tek paragrafta AI çağrı merkezi
              </h2>
            </div>
            <div className="md:col-span-8 space-y-5 text-lg text-foreground-secondary leading-[1.7]">
              <p>
                Yapay zeka çağrı merkezi, gelen müşteri çağrılarını ve
                mesajlarını AI ile karşılayan, basit soruları otomatik çözen,
                karmaşık vakaları insanlara yönlendiren sistemdir. Türk
                şirketleri için aylık maliyeti insan ekibine kıyasla %40-70
                düşük olabilir. 2026'da Türkçe dil kalitesi İngilizce'ye çok
                yakın; SESTEK, AloTech, Supsis AI gibi yerli çözümler ve Retell,
                Vapi gibi global platformlar arasında zengin seçenek var.
              </p>
              <p>
                Chatbot yazılı kanallarda, voice agent sesli iletişimin baskın
                olduğu sektörlerde tercih edilir. Çoğu Türk şirketi için
                doğrusu hibrit modeldir — AI basit ve tekrarlayan çağrıları
                üstlenir, insan operatörler empati gerektiren durumlara
                odaklanır. KVKK uyumu için müşteri onayı, veri lokasyonu,
                biyometrik ses verisi ve saklama süresi kurulumun başında
                tanımlanmalıdır.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Neden */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-4">
            Ne kazandırır
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-16 max-w-2xl">
            AI çağrı merkezinin dört belirleyici farkı
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
            Çağrı merkezi AI'ı için sekiz kaynak
          </h2>
          <p className="text-foreground-secondary leading-relaxed mb-16 max-w-2xl">
            Ana rehber, karşılaştırmalar, KVKK çerçevesi ve kanal bazlı
            uygulama örnekleri — kurulum yolunuzun her adımı için.
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
            AI çağrı merkezi hakkında en çok sorulanlar
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