import Link from "next/link";
import { ArrowUpRight, Mail, MessageCircle, Clock, MapPin } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { getContactIconStyle } from "@/lib/brand-colors";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim | Verimio - Bize Ulaşın",
  description:
    "Verimio ile iletişime geçin. AI dönüşüm danışmanlığı hakkında sorularınızı yanıtlayalım.",
};

const contactMethods = [
  {
    icon: Mail,
    title: "E-posta",
    description: "Sorularınız için bize yazın",
    value: BRAND.email,
    href: `mailto:${BRAND.email}`,
  },
  {
    icon: MessageCircle,
    title: "Ücretsiz Danışmanlık",
    description: "20 dakikalık ücretsiz görüşme",
    value: "Görüşme Planlayın",
    href: BRAND.calendlyUrl,
  },
  {
    icon: Clock,
    title: "Çalışma Saatleri",
    description: "Hafta içi müsaitiz",
    value: "09:00 - 18:00",
    href: null,
  },
  {
    icon: MapPin,
    title: "Konum",
    description: "Uzaktan çalışıyoruz",
    value: "İstanbul, Türkiye",
    href: null,
  },
];

const faqQuick = [
  {
    q: "Ücretsiz analiz gerçekten ücretsiz mi?",
    a: "Evet, AI analiz raporumuz tamamen ücretsizdir. Herhangi bir kredi kartı bilgisi istenmez.",
  },
  {
    q: "Danışmanlık görüşmesi zorunlu mu?",
    a: "Hayır, tamamen isteğe bağlıdır. Raporunuzu aldıktan sonra isterseniz ücretsiz 20 dakikalık görüşme planlayabilirsiniz.",
  },
  {
    q: "Hangi sektörlere hizmet veriyorsunuz?",
    a: "E-ticaret, ajanslar, B2B hizmetler, üretim/lojistik, teknoloji ve daha birçok sektörde AI çözümleri sunuyoruz.",
  },
];

export default function IletisimPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left - Info */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                <span className="w-1.5 h-1.5 rounded-full bg-secondary/60" />
                <span className="text-sm font-medium text-foreground-secondary tracking-wide uppercase ml-1">İletişim</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
                Bize{" "}
                <span className="gradient-text">Ulaşın</span>
              </h1>

              <p className="text-lg text-foreground-secondary leading-relaxed mb-10 max-w-lg">
                AI dönüşümünüz hakkında sorularınız mı var? Size yardımcı olmaktan
                mutluluk duyarız. En hızlı yanıt için e-posta tercih edin.
              </p>

              {/* Contact Methods */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactMethods.map((method, index) => {
                  const style = getContactIconStyle(index);
                  return (
                    <div
                      key={index}
                      className="p-6 rounded-2xl border border-border hover:border-border-accent transition-all duration-300 bg-surface group"
                    >
                      <div
                        className={`w-10 h-10 rounded-xl ${style.bg} ${style.text} flex items-center justify-center mb-4`}
                      >
                        <method.icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-semibold mb-1">{method.title}</h3>
                      <p className="text-sm text-foreground-secondary mb-2">{method.description}</p>
                      {method.href ? (
                        <a
                          href={method.href}
                          className="text-sm font-medium text-primary-light hover:text-primary dark:hover:text-secondary transition-colors"
                        >
                          {method.value}
                        </a>
                      ) : (
                        <span className="text-sm font-medium text-foreground">
                          {method.value}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right - Quick Start */}
            <div className="lg:pt-12">
              <div className="bg-primary rounded-3xl p-8 md:p-10 text-white">
                <h2 className="text-2xl font-bold mb-4">En Hızlı Başlangıç</h2>
                <p className="text-white/70 leading-relaxed mb-8">
                  İletişime geçmeden önce, 3 dakikalık ücretsiz AI analizimizi
                  deneyin. Firmanıza özel rapor otomatik olarak e-postanıza gelsin.
                </p>

                <div className="space-y-4 mb-8">
                  {["3 dakikalık formu doldurun", "AI analiz raporunuzu alın", "İsterseniz ücretsiz görüşme planlayın"].map((text, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary text-sm font-bold">
                        {i + 1}
                      </div>
                      <span className="text-white/80 text-sm">{text}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href={BRAND.tallyFormUrl}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-secondary text-primary font-semibold rounded-full hover:bg-secondary-hover transition-all duration-200 text-sm w-full justify-center"
                >
                  Ücretsiz Analiz Başlat
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <p className="text-center text-xs text-white/40 mt-4">
                  Kredi kartı gerekmez • Satış araması yok
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick FAQ */}
      <section className="section-padding bg-background-secondary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Sık Sorulan <span className="gradient-text">Sorular</span>
          </h2>

          <div className="space-y-6">
            {faqQuick.map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl border border-border bg-surface"
              >
                <h3 className="font-semibold mb-2">{item.q}</h3>
                <p className="text-sm text-foreground-secondary leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
