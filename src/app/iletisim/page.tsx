import Link from "next/link";
import { BRAND } from "@/lib/constants";
import type { Metadata } from "next";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import FAQSchema from "@/components/seo/FAQSchema";

export const metadata: Metadata = {
  title: "İletişim - Bize Ulaşın",
  description:
    "Verimio ile iletişime geçin. Check-up'a hazırsanız formu doldurun; sorularınız varsa bize yazın.",
  openGraph: {
    title: "İletişim - Bize Ulaşın",
    description: "Verimio ile iletişime geçin. Check-up'a hazırsanız formu doldurun; sorularınız varsa bize yazın.",
    type: "website",
    url: "https://www.verimio.com.tr/iletisim",
  },
  twitter: {
    card: "summary_large_image",
    title: "İletişim - Bize Ulaşın",
    description: "Verimio ile iletişime geçin. Sorularınız için bize yazın.",
  },
  alternates: { canonical: "https://www.verimio.com.tr/iletisim" },
};

const faqQuick = [
  {
    q: "Şirket check-up'ı gerçekten ücretsiz mi?",
    a: "Evet, tamamen ücretsizdir. Ödeme bilgisi, kredi kartı veya herhangi bir taahhüt istenmez.",
  },
  {
    q: "Danışmanlık görüşmesi zorunlu mu?",
    a: "Hayır. Raporu aldıktan sonra istediğiniz gibi ilerleyebilirsiniz — kendi ekibinizle uygulayabilir ya da bizimle devam edebilirsiniz.",
  },
  {
    q: "Hangi büyüklükteki firmalarla çalışıyorsunuz?",
    a: "Operasyonel verimliliği artırmak isteyen her ölçekte firma ile çalışıyoruz. Sektör ayrımı yapmıyoruz.",
  },
];

export default function IletisimPage() {
  return (
    <main className="pt-24">
      <BreadcrumbSchema
        items={[
          { name: "Ana Sayfa", url: "https://www.verimio.com.tr" },
          { name: "İletişim", url: "https://www.verimio.com.tr/iletisim" },
        ]}
      />
      <FAQSchema
        items={faqQuick.map((f) => ({ question: f.q, answer: f.a }))}
      />
      {/* Hero */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-4">
            İletişim
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 max-w-3xl">
            Sorulardan doğru yere ulaşın.
          </h1>
          <p className="text-lg text-foreground-secondary leading-relaxed mb-12 max-w-2xl">
            Check-up'a hazırsanız formu doldurmanız yeterli — size özel
            raporunuz hemen hazırlanıp e-postanıza iletilir.
          </p>

          {/* Contact info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-border pt-12">
            <div>
              <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-2">
                E-posta
              </p>
              <a
                href={`mailto:${BRAND.email}`}
                className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
              >
                {BRAND.email}
              </a>
            </div>
            <div>
              <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-2">
                Çalışma saatleri
              </p>
              <p className="text-foreground">09:00 – 18:00</p>
            </div>
            <div>
              <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-2">
                Konum
              </p>
              <p className="text-foreground">İstanbul, Türkiye</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-24 md:py-32 bg-foreground">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-background mb-4 max-w-2xl">
            En hızlı başlangıç: ücretsiz check-up
          </h2>
          <p className="text-background/70 leading-relaxed mb-8 max-w-xl">
            Formu doldurun, size özel analiz raporunuz hemen hazırlanıp e-postanıza iletilsin.
            Sonra isterseniz görüşme planlayın.
          </p>
          <Link
            href={BRAND.checkupUrl}
            className="inline-flex items-center px-7 py-3.5 bg-background text-foreground font-medium text-sm hover:opacity-90 transition-opacity"
          >
            Ücretsiz Check-Up Başlatın
          </Link>
        </div>
      </section>

      {/* Quick FAQ */}
      <section className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-4">
            Sık sorulan sorular
          </p>
          <div className="space-y-0 mt-8">
            {faqQuick.map((item, index) => (
              <div key={index} className="border-t border-border py-8">
                <h3 className="text-lg font-bold mb-2">{item.q}</h3>
                <p className="text-foreground-secondary leading-relaxed max-w-2xl">{item.a}</p>
              </div>
            ))}
            <div className="border-t border-border" />
          </div>
          <p className="text-sm text-foreground-muted mt-8">
            Daha fazla soru için{" "}
            <Link href="/sss" className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors">
              tüm SSS bölümüne
            </Link>{" "}
            göz atın.
          </p>
        </div>
      </section>
    </main>
  );
}
