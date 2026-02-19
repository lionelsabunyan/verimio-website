import Link from "next/link";
import { ArrowUpRight, Mail, Clock, MapPin, Shield, XCircle, Timer, CalendarClock } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { getContactIconStyle } from "@/lib/brand-colors";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim | Verimio - Bize Ulaşın",
  description:
    "Verimio ile iletişime geçin. Check-up'a hazırsanız formu doldurun; sorularınız varsa bize yazın.",
};

const contactMethods = [
  {
    icon: Mail,
    title: "E-posta",
    description: "Sorularınız için doğrudan yazın",
    value: BRAND.email,
    href: `mailto:${BRAND.email}`,
    active: true,
  },
  {
    icon: CalendarClock,
    title: "Görüşme Planla",
    description: "Ücretsiz 20 dakikalık danışmanlık",
    value: "Yakında aktif olacak",
    href: null,
    active: false,
  },
  {
    icon: Clock,
    title: "Çalışma Saatleri",
    description: "Hafta içi müsaitiz",
    value: "09:00 – 18:00",
    href: null,
    active: true,
  },
  {
    icon: MapPin,
    title: "Konum",
    description: "Uzaktan çalışıyoruz",
    value: "İstanbul, Türkiye",
    href: null,
    active: true,
  },
];

const trustSignals = [
  {
    icon: Shield,
    text: "Verileriniz şifrelenerek saklanır, üçüncü taraflarla paylaşılmaz. Talep halinde NDA imzalıyoruz.",
  },
  {
    icon: XCircle,
    text: "Satış baskısı yok. Raporu aldıktan sonra nasıl ilerleyeceğinize siz karar veriyorsunuz.",
  },
  {
    icon: Timer,
    text: "Formu doldurmanızın hemen ardından raporunuz hazırlanır ve e-postanıza iletilir.",
  },
];

const faqQuick = [
  {
    q: "Şirket check-up'ı gerçekten ücretsiz mi?",
    a: "Evet, tamamen ücretsizdir. Ödeme bilgisi, kredi kartı veya herhangi bir taahhüt istenmez. Check-up formu ve analiz raporu, firmanızı tanımamız için bir başlangıç noktası.",
  },
  {
    q: "Danışmanlık görüşmesi zorunlu mu?",
    a: "Hayır. Raporu aldıktan sonra istediğiniz gibi ilerleyebilirsiniz — kendi ekibinizle uygulayabilir ya da sonraki adımlarda destek almak isterseniz bizimle devam edebilirsiniz.",
  },
  {
    q: "Hangi büyüklükteki firmalarla çalışıyorsunuz?",
    a: "Kurumsal yapıya geçiş sürecindeki her ölçekte firma ile çalışıyoruz. Ortak paydamız: operasyonel verimliliği artırmak isteyen, büyüme odaklı olmak. Sektör ayrımı yapmıyoruz.",
  },
];

export default function IletisimPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Sol — Bilgi */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                <span className="w-1.5 h-1.5 rounded-full bg-secondary/60" />
                <span className="text-xs font-semibold text-foreground-secondary tracking-widest uppercase ml-1">İletişim</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Sorulardan{" "}
                <span className="gradient-text">doğru yere ulaşın.</span>
              </h1>

              <p className="text-lg text-foreground-secondary leading-relaxed mb-10 max-w-lg">
                Check-up'a hazırsanız formu doldurmanız yeterli — size özel
                raporunuz hemen hazırlanıp e-postanıza iletilir. Hâlâ sorusu olanlar için biz buradayız.
              </p>

              {/* İletişim Kartları */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactMethods.map((method, index) => {
                  const style = getContactIconStyle(index);
                  return (
                    <div
                      key={index}
                      className={`p-6 rounded-2xl border transition-all duration-300 bg-surface ${
                        method.active
                          ? "border-border hover:border-border-accent group"
                          : "border-border opacity-60"
                      }`}
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
                        <span className={`text-sm font-medium ${method.active ? "text-foreground" : "text-foreground-secondary italic"}`}>
                          {method.value}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sağ — Hızlı Başlangıç */}
            <div className="lg:pt-12">
              <div className="bg-primary rounded-3xl p-8 md:p-10 text-white">
                <h2 className="text-2xl font-bold mb-4">En Hızlı Başlangıç</h2>
                <p className="text-white/70 leading-relaxed mb-8">
                  İletişime geçmeden önce ücretsiz şirket check-up&apos;ımızı
                  deneyin. Firmanıza özel rapor hemen hazırlanıp e-postanıza iletilir.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    "Check-up formunu doldurun",
                    "Size özel analiz raporunuzu alın",
                    "İsterseniz ücretsiz görüşme planlayın",
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary text-sm font-bold shrink-0">
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
                  Ücretsiz Check-Up Başlatın
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <p className="text-center text-xs text-white/40 mt-4">
                  Gizliliğiniz güvende — ödeme bilgisi istenmez
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Güven Sinyalleri */}
      <section className="py-10 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trustSignals.map((signal, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-primary-light/10 flex items-center justify-center shrink-0 mt-0.5">
                  <signal.icon className="w-4 h-4 text-primary-light" />
                </div>
                <p className="text-sm text-foreground-secondary leading-relaxed">{signal.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hızlı SSS */}
      <section className="section-padding bg-background-secondary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
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

          <p className="text-center text-sm text-foreground-secondary mt-8">
            Daha fazla soru için{" "}
            <Link href="/hakkimizda#sss" className="text-primary-light hover:text-primary dark:hover:text-secondary underline underline-offset-2 transition-colors">
              tüm SSS bölümüne
            </Link>{" "}
            göz atın.
          </p>
        </div>
      </section>
    </div>
  );
}
