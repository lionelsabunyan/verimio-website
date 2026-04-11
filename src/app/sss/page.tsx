import Link from "next/link";
import { BRAND, FAQ_ITEMS } from "@/lib/constants";
import FAQSchema from "@/components/seo/FAQSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sık Sorulan Sorular",
  description:
    "Verimio şirket check-up'ı, danışmanlık süreci, fiyatlandırma ve gizlilik hakkında merak ettiğiniz her şeyi yanıtlıyoruz.",
  openGraph: {
    title: "Sık Sorulan Sorular",
    description: "Verimio şirket check-up'ı, danışmanlık süreci, fiyatlandırma ve gizlilik hakkında merak ettiğiniz her şeyi yanıtlıyoruz.",
    type: "website",
    url: "https://www.verimio.com.tr/sss",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sık Sorulan Sorular",
    description: "Danışmanlık süreci, fiyatlandırma ve gizlilik hakkında sık sorulan sorular.",
  },
  alternates: { canonical: "https://www.verimio.com.tr/sss" },
};

const additionalFaqs = [
  {
    question: "Formu doldurmak ne kadar sürer?",
    answer:
      "Ortalama 15-20 dakika. Sektörünüze ve şirket yapınıza göre özelleştirilmiş sorular soruyoruz.",
  },
  {
    question: "Raporumu aldıktan sonra ne olur?",
    answer:
      "Raporu inceleyip kendi ekibinizle uygulayabilirsiniz. İsterseniz ücretsiz bir görüşme talep edebilirsiniz. Herhangi bir taahhüt yok.",
  },
  {
    question: "Uygulama danışmanlığına geçmek için ne yapmalıyım?",
    answer:
      "Check-up raporunuzu aldıktan sonra bizimle iletişime geçmeniz yeterli. Sürpriz maliyet veya paket dayatması yok.",
  },
];

const allFaqs = [...FAQ_ITEMS, ...additionalFaqs];

export default function SSSPage() {
  return (
    <main className="pt-24">
      <FAQSchema items={allFaqs} />
      <BreadcrumbSchema
        items={[
          { name: "Ana Sayfa", url: "https://www.verimio.com.tr" },
          { name: "SSS", url: "https://www.verimio.com.tr/sss" },
        ]}
      />

      {/* Hero */}
      <section className="pb-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-4">
            SSS
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6 max-w-2xl">
            Sık Sorulan Sorular
          </h1>
          <p className="text-lg text-foreground-secondary leading-relaxed max-w-2xl">
            Check-up süreci, danışmanlık kapsamı, fiyatlandırma ve gizlilik hakkında
            en çok merak edilen soruları yanıtladık.{" "}
            <Link href="/iletisim" className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors">
              Bulamadığınız varsa bize yazın.
            </Link>
          </p>
        </div>
      </section>

      {/* FAQ list */}
      <section className="py-16 border-t border-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="space-y-0">
            {allFaqs.map((item, index) => (
              <details
                key={index}
                className="group border-b border-border"
              >
                <summary className="flex items-center justify-between gap-4 py-6 cursor-pointer list-none select-none">
                  <h3 className="font-bold text-foreground leading-snug pr-4">
                    {item.question}
                  </h3>
                  <span className="text-foreground-muted shrink-0 transition-transform duration-200 group-open:rotate-45 text-xl leading-none">
                    +
                  </span>
                </summary>
                <div className="pb-6">
                  <p className="text-foreground-secondary leading-relaxed max-w-2xl">
                    {item.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold mb-2">Cevabını bulamadınız mı?</h2>
            <p className="text-foreground-secondary text-sm">
              Merak ettiklerinizi doğrudan bizimle paylaşın.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href={`mailto:${BRAND.email}`}
              className="inline-flex items-center px-5 py-2.5 border border-border text-foreground font-medium text-sm hover:border-foreground transition-colors"
            >
              E-posta Gönderin
            </a>
            <Link
              href={BRAND.checkupUrl}
              className="inline-flex items-center px-5 py-2.5 bg-foreground text-background font-medium text-sm hover:opacity-90 transition-opacity"
            >
              Check-Up Başlatın
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
