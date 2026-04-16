import Link from "next/link";
import { BRAND, EXPERTISE_ITEMS, HOW_IT_WORKS } from "@/lib/constants";
import CTA from "@/components/sections/CTA";
import Button from "@/components/ui/Button";
import type { Metadata } from "next";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";

export const metadata: Metadata = {
  title: "Hizmetler - Dört uzmanlık alanı",
  description:
    "Operasyon Otomasyonu (n8n/Make), Müşteri Hizmetleri AI'ı (voice + chatbot), Veri & Raporlama Otomasyonu, AI Strateji & Agent Kurulumu. Tek çatı altında dört somut uzmanlık.",
  openGraph: {
    title: "Hizmetler - Dört uzmanlık alanı",
    description: "Operasyon otomasyonu, müşteri hizmetleri AI'ı, veri & raporlama ve AI strateji & agent kurulumu.",
    type: "website",
    url: "https://www.verimio.com.tr/hizmetler",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hizmetler - Dört uzmanlık alanı",
    description: "Operasyon otomasyonu, müşteri hizmetleri AI'ı, veri & raporlama ve AI strateji & agent kurulumu.",
  },
  alternates: { canonical: "https://www.verimio.com.tr/hizmetler" },
};

export default function HizmetlerPage() {
  return (
    <main className="pt-24">
      <BreadcrumbSchema
        items={[
          { name: "Ana Sayfa", url: "https://www.verimio.com.tr" },
          { name: "Hizmetler", url: "https://www.verimio.com.tr/hizmetler" },
        ]}
      />
      <ServiceSchema
        services={EXPERTISE_ITEMS.map((s) => ({
          name: s.title,
          description: s.description,
        }))}
      />

      {/* Hero */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-4">
            Hizmetler
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 max-w-3xl">
            Dört uzmanlık alanı, tek çatı altında.
          </h1>
          <p className="text-lg text-foreground-secondary leading-relaxed mb-8 max-w-2xl">
            Her uzmanlık alanımız, önce doğru analiz — sonra somut ROI hesabı — ardından uygulama sıralamasıyla çalışır. Danışmanlık ve koçluk aynı sürecin parçası.
          </p>
          <Button href={BRAND.checkupUrl} size="md">
            Hangi çözüm bana uygun?
          </Button>
        </div>
      </section>

      {/* Services — 4 uzmanlık alanı */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="space-y-16">
            {EXPERTISE_ITEMS.map((service, index) => (
              <div
                key={service.slug}
                id={service.slug}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 scroll-mt-28"
              >
                <div className="md:col-span-1">
                  <span className="text-sm text-foreground-muted tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="md:col-span-5">
                  <h2 className="text-2xl font-bold mb-2">{service.title}</h2>
                  <p className="text-sm text-foreground-muted mb-3">{service.tagline}</p>
                  <p className="text-foreground-secondary leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <Link
                    href={`/blog/${service.pillarSlug}`}
                    className="text-sm text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
                  >
                    {service.pillarLabel} →
                  </Link>
                </div>
                <div className="md:col-span-6">
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-foreground-secondary">
                        <span className="w-1 h-1 rounded-full bg-foreground-muted mt-2 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Süreç — 5 adım */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-4">
            Süreç
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-16 max-w-2xl">
            Tanıdan uygulamaya beş adım
          </h2>

          <div className="space-y-12">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
                <div className="md:col-span-1">
                  <span aria-hidden="true" className="text-4xl font-bold text-[#8F8F8F]">{item.step}</span>
                </div>
                <div className="md:col-span-8">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-foreground-secondary leading-relaxed">{item.description}</p>
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
