import Link from "next/link";
import { ArrowUpRight, Mail, MessageCircle, Clock, MapPin } from "lucide-react";
import { BRAND } from "@/lib/constants";
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
    color: "bg-violet-500/10 text-violet-600",
  },
  {
    icon: MessageCircle,
    title: "Ücretsiz Danışmanlık",
    description: "20 dakikalık ücretsiz görüşme",
    value: "Görüşme Planlayın",
    href: BRAND.calendlyUrl,
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    icon: Clock,
    title: "Çalışma Saatleri",
    description: "Hafta içi müsaitiz",
    value: "09:00 - 18:00",
    href: null,
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    icon: MapPin,
    title: "Konum",
    description: "Uzaktan çalışıyoruz",
    value: "İstanbul, Türkiye",
    href: null,
    color: "bg-blue-500/10 text-blue-600",
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
                <div className="w-2.5 h-2.5 rounded-full bg-secondary" />
                <div className="w-2.5 h-2.5 rounded-full bg-secondary/30" />
                <span className="text-sm font-medium text-muted ml-1">İletişim</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
                Bize{" "}
                <span className="gradient-text">Ulaşın</span>
              </h1>

              <p className="text-lg text-muted leading-relaxed mb-10 max-w-lg">
                AI dönüşümünüz hakkında sorularınız mı var? Size yardımcı olmaktan
                mutluluk duyarız. En hızlı yanıt için e-posta tercih edin.
              </p>

              {/* Contact Methods */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactMethods.map((method, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-2xl border border-foreground/5 hover:border-primary-light/20 transition-all duration-300 bg-white group"
                  >
                    <div
                      className={`w-10 h-10 rounded-xl ${method.color} flex items-center justify-center mb-4`}
                    >
                      <method.icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold mb-1">{method.title}</h3>
                    <p className="text-sm text-muted mb-2">{method.description}</p>
                    {method.href ? (
                      <a
                        href={method.href}
                        className="text-sm font-medium text-primary-light hover:text-primary transition-colors"
                      >
                        {method.value}
                      </a>
                    ) : (
                      <span className="text-sm font-medium text-foreground">
                        {method.value}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Quick Start */}
            <div className="lg:pt-12">
              <div className="bg-primary rounded-3xl p-8 md:p-10 text-white">
                <h2 className="text-2xl font-bold mb-4">En Hızlı Başlangıç</h2>
                <p className="text-cream/70 leading-relaxed mb-8">
                  İletişime geçmeden önce, 3 dakikalık ücretsiz AI analizimizi
                  deneyin. Firmanıza özel rapor otomatik olarak e-postanıza gelsin.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary text-sm font-bold">
                      1
                    </div>
                    <span className="text-cream/80 text-sm">3 dakikalık formu doldurun</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary text-sm font-bold">
                      2
                    </div>
                    <span className="text-cream/80 text-sm">AI analiz raporunuzu alın</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary text-sm font-bold">
                      3
                    </div>
                    <span className="text-cream/80 text-sm">İsterseniz ücretsiz görüşme planlayın</span>
                  </div>
                </div>

                <Link
                  href={BRAND.tallyFormUrl}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-secondary text-primary font-semibold rounded-full hover:bg-secondary/90 transition-all duration-200 text-sm w-full justify-center"
                >
                  Ücretsiz Analiz Başlat
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <p className="text-center text-xs text-cream/40 mt-4">
                  Kredi kartı gerekmez • Satış araması yok
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick FAQ */}
      <section className="section-padding bg-foreground/[0.02]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Sık Sorulan <span className="gradient-text">Sorular</span>
          </h2>

          <div className="space-y-6">
            {faqQuick.map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl border border-foreground/5 bg-white"
              >
                <h3 className="font-semibold mb-2">{item.q}</h3>
                <p className="text-sm text-muted leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
