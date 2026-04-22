import Link from "next/link";
import type { Metadata } from "next";
import { BRAND } from "@/lib/constants";
import CTA from "@/components/sections/CTA";
import Button from "@/components/ui/Button";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import FAQSchema from "@/components/seo/FAQSchema";

const PAGE_URL = "https://www.verimio.com.tr/n8n-turkiye";
const PAGE_TITLE = "n8n Türkiye: 2026 İş Otomasyonu Rehberi";
const PAGE_DESCRIPTION =
  "n8n nedir, nasıl kurulur, Türkiye'de hangi şirketler kullanıyor, Zapier ve Make'ten farkı ne? Türk KOBİ'leri için n8n danışmanlığı, self-hosted kurulum ve KVKK uyumu dahil tüm kaynaklar.";

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
    slug: "n8n-rehberi-turk-sirketleri-is-otomasyonu",
    badge: "Ana rehber",
    title: "n8n Rehberi: Türk Şirketleri İçin İş Otomasyonu A'dan Z'ye",
    summary:
      "n8n'in ne olduğu, neden Türk KOBİ'lerine uygun olduğu, 10 gerçek kullanım alanı ve maliyet hesabı. Bu konunun temel yazısı.",
  },
  {
    slug: "n8n-ile-basit-otomasyon",
    badge: "Kurulum",
    title: "n8n ile Basit Otomasyon: İlk Workflow'unuz 30 Dakikada",
    summary:
      "Docker, cloud ve desktop kurulum seçeneklerinin karşılaştırması ve ilk webhook → CRM akışının adım adım anlatımı.",
  },
  {
    slug: "n8n-vs-zapier-karsilastirma",
    badge: "Karşılaştırma",
    title: "n8n vs Zapier: Türk Şirketleri İçin Hangisi Daha İyi?",
    summary:
      "Fiyat, esneklik, veri kontrolü, entegrasyon ve öğrenme eğrisi — iki platformun gerçek iş senaryolarında yan yana karşılaştırılması.",
  },
  {
    slug: "make-vs-n8n-karsilastirma",
    badge: "Karşılaştırma",
    title: "Make vs n8n: KOBİ'ler Hangi Otomasyon Aracını Seçmeli?",
    summary:
      "İki no-code/low-code platformunun KOBİ süreçlerinde karar kriterleri — bütçe, ekip kapasitesi ve veri kontrolü üçgeni.",
  },
  {
    slug: "n8n-ai-agent-olusturma",
    badge: "AI + n8n",
    title: "n8n ile AI Agent Oluşturma: Adım Adım Rehber",
    summary:
      "LangChain node, LLM entegrasyonları ve memory yapısı ile n8n üzerinde kendi AI agent'ınızı kurmanın pratik rehberi.",
  },
  {
    slug: "n8n-chatgpt-entegrasyonu-rehberi",
    badge: "AI + n8n",
    title: "n8n ChatGPT Entegrasyonu: Pratik Kullanım Senaryoları",
    summary:
      "OpenAI API'sini n8n workflow'una eklemek, müşteri e-postası kategorize etmek ve otomatik özet üretmek için kılavuz.",
  },
  {
    slug: "is-sureci-otomasyonu-nedir",
    badge: "Temel",
    title: "İş Süreci Otomasyonu Nedir, Nereden Başlanır?",
    summary:
      "Otomasyon kararı vermeden önce cevaplanması gereken sorular, ROI hesabı ve n8n'in bu resimdeki yeri.",
  },
  {
    slug: "otomasyon-yanlislari",
    badge: "Tuzaklar",
    title: "Otomasyon Yanlışları: KOBİ'lerin En Sık Yaptığı 5 Hata",
    summary:
      "Hata yönetimi, dokümantasyon, güvenlik ve bağımlılık — gerçek projelerden derlenen kritik tuzaklar.",
  },
];

const FAQ_ITEMS = [
  {
    question: "n8n ücretsiz mi, aylık ne kadar ödenir?",
    answer:
      "n8n'in self-hosted (kendi sunucunuza kurulan) sürümü tamamen ücretsiz ve açık kaynaktır. Aylık maliyet yalnızca sunucu bedelidir — Hetzner veya DigitalOcean'da 5-10 € aralığında çalışan bir VPS çoğu KOBİ için yeterlidir. Bulut sürümü (n8n Cloud) aylık 20 €'dan başlar; kurulum istemeyen, hızlı başlamak isteyen ekipler için tercih edilir.",
  },
  {
    question: "n8n Türkiye'de nasıl bir hızla yayılıyor?",
    answer:
      "Google arama verilerine göre 2024-2026 arasında 'n8n Türkiye', 'n8n danışmanlığı' ve 'n8n hizmeti' sorguları belirgin biçimde arttı. Pazarlama ajansları, e-ticaret firmaları, imalat KOBİ'leri ve KVKK hassasiyeti olan finans şirketleri tarafından benimseniyor. Özellikle İstanbul, İzmir ve Ankara'daki 50-500 çalışanlı şirketlerde self-hosted n8n kullanımı son 12 ayda hızlandı.",
  },
  {
    question: "n8n Zapier ve Make'ten nasıl farklı?",
    answer:
      "n8n açık kaynak ve self-hosted olabilirken, Zapier ve Make yalnızca buluttadır. Bu veri kontrolünü ve KVKK uyumunu kolaylaştırır. n8n'de JavaScript veya Python node'larıyla karmaşık mantık kurulabilir; Zapier bu esnekliği sunmaz. Karşılık olarak Zapier kurulumu daha hızlıdır, öğrenme eğrisi daha düşüktür — küçük takımlar ve basit entegrasyonlar için tercih edilir.",
  },
  {
    question: "n8n self-hosted kurulum KVKK uyumlu mu?",
    answer:
      "Self-hosted n8n, verilerinizin tamamen sizin sunucunuzda kalması anlamına gelir — bu KVKK açısından önemli bir avantajdır. Türkiye'de bulunan bir sunucuda çalıştırıldığında veri yurt dışına çıkmaz. KVKK uyumu için ek olarak SSL sertifikası, düzenli yedekleme ve erişim log'larının tutulması gerekir. Kullanılan üçüncü parti servislerin (OpenAI, Gmail, Slack) veri işleme sözleşmeleri ayrıca incelenmelidir.",
  },
  {
    question: "n8n ile hangi iş süreçlerini otomatikleştirmek en mantıklı?",
    answer:
      "Tekrarlayan, kural tabanlı ve birden fazla sistemi birleştiren süreçler en yüksek geri dönüşü verir. Tipik örnekler: form → CRM → Slack bildirim, sipariş → kargo takip → müşteri e-posta, fatura → muhasebe senkronizasyonu, lead skorlama ve AI kategorizasyonu. Küçük bir akışla başlanıp çalıştığı görüldükten sonra genişletilmesi, tüm süreçleri aynı anda otomatikleştirmeye çalışmaktan çok daha başarılı sonuç verir.",
  },
  {
    question: "Türkiye'de n8n danışmanlığı kim veriyor, Verimio'dan nasıl destek alırım?",
    answer:
      "Türkiye'de n8n kurulumu, workflow tasarımı ve ekip eğitimi konusunda hizmet veren birkaç bağımsız danışman ve ajans bulunuyor. Verimio, Türk KOBİ'lerine Şirket Check-Up ile başlar, otomatikleştirilecek öncelikli süreçleri birlikte belirler, self-hosted kurulumu yapar ve ekibi kullanmaya hazır hale getirir. Süreç ücretsiz analiz ile başlar; sabit fiyatlı workshop ve implementation paketleri devamında sunulur.",
  },
];

const HIGHLIGHTS = [
  {
    title: "Açık kaynak ve self-hosted",
    body: "Veriniz kendi sunucunuzda kalır. KVKK hassasiyeti olan finans, sağlık ve kurumsal yapılar için en sağlam seçenek.",
  },
  {
    title: "400+ hazır entegrasyon",
    body: "Google Workspace, Slack, Supabase, WhatsApp Business, Parasut, HubSpot dahil. Listede olmayan araçlara HTTP node ile bağlanılır.",
  },
  {
    title: "Yapay zeka doğrudan iş akışında",
    body: "ChatGPT, Claude, Gemini gibi modeller n8n akışlarına doğrudan bağlanır. Kategorize et, özetle, taslak üret — hepsi tek bir süreçte.",
  },
  {
    title: "Kod opsiyonel, gerekirse esnek",
    body: "Görsel sürükle-bırak ile başlarsınız. İşiniz büyüdükçe JavaScript veya Python node ekleyerek özel mantık yazarsınız.",
  },
];

export default function N8nTurkiyePage() {
  return (
    <main className="pt-24">
      <BreadcrumbSchema
        items={[
          { name: "Ana Sayfa", url: "https://www.verimio.com.tr" },
          { name: "n8n Türkiye Rehberi", url: PAGE_URL },
        ]}
      />
      <FAQSchema
        items={FAQ_ITEMS.map((f) => ({ question: f.question, answer: f.answer }))}
      />

      {/* Hero */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-4">
            2026 Rehberi · n8n Türkiye
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 max-w-4xl">
            n8n ile Türk KOBİ'leri için iş otomasyonu.
          </h1>
          <p className="text-lg text-foreground-secondary leading-relaxed mb-8 max-w-2xl">
            n8n nedir, nasıl kurulur, Zapier ve Make'ten farkı ne, Türkiye'de
            hangi şirketler kullanıyor — pratik rehberler, karşılaştırmalar ve
            uygulama örnekleri tek yerde.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="#kaynaklar" size="md">
              Rehberleri Okuyun
            </Button>
            <Link
              href={BRAND.checkupUrl}
              className="inline-flex items-center px-6 py-3 border border-border text-foreground font-medium text-sm hover:border-foreground transition-colors"
            >
              n8n için Şirket Check-Up
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
                Tek paragrafta n8n
              </h2>
            </div>
            <div className="md:col-span-8 space-y-5 text-lg text-foreground-secondary leading-[1.7]">
              <p>
                n8n (okunuşu &ldquo;n-eight-n&rdquo;), Berlin merkezli bir
                şirketin geliştirdiği açık kaynaklı iş akışı otomasyon
                platformudur. Kendi sunucunuza kurulabilir, aylık lisans bedeli
                ödemezsiniz, 400+ entegrasyonla mevcut araçlarınıza bağlanır.
                Türk KOBİ'leri için cazip olan üç ana sebep: veri kontrolünün
                şirkette kalması, maliyetin sunucu bedeliyle sınırlı olması ve
                AI entegrasyonlarının işin merkezine konmasıdır.
              </p>
              <p>
                Zapier ve Make'e kıyasla öğrenme eğrisi bir miktar daha diktir
                ancak esneklik çok daha yüksektir. 2-3 haftalık bir uyum
                sonrasında ekipler görsel sürükle-bırak arayüzüyle kendi
                akışlarını kurar. Kod gerektiğinde JavaScript veya Python node
                eklenir; gerekmediğinde bir satır yazılmadan çalışır. 2026
                itibariyle Türkiye'de pazarlama ajansları, e-ticaret firmaları,
                imalat KOBİ'leri ve KVKK hassasiyeti olan finans şirketleri
                tarafından yoğun biçimde benimseniyor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Neden n8n */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-4">
            Neden n8n
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-16 max-w-2xl">
            Türk şirketleri için dört belirleyici özellik
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
            n8n konusunda sekiz kaynak
          </h2>
          <p className="text-foreground-secondary leading-relaxed mb-16 max-w-2xl">
            Temel rehberden karşılaştırmalara, AI entegrasyonundan sık yapılan
            hatalara — n8n'i tanıma, kurma ve büyütme aşamalarının her biri
            için hazır içerik.
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
            n8n hakkında en çok sorulanlar
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