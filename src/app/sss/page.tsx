import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { BRAND, FAQ_ITEMS } from "@/lib/constants";
import FAQSchema from "@/components/seo/FAQSchema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sık Sorulan Sorular | Verimio",
  description:
    "Verimio şirket check-up'ı, danışmanlık süreci, fiyatlandırma ve gizlilik hakkında merak ettiğiniz her şeyi yanıtlıyoruz.",
};

const additionalFaqs = [
  {
    question: "Formu doldurmak ne kadar sürer?",
    answer:
      "Ortalama 15-20 dakika. Sektörünüze ve şirket yapınıza göre özelleştirilmiş sorular soruyoruz — genel sorular değil, operasyonunuzu gerçekten anlamak için tasarlanmış bir form.",
  },
  {
    question: "Raporumu aldıktan sonra ne olur?",
    answer:
      "Raporu inceleyip kendi ekibinizle uygulayabilirsiniz. İsterseniz raporun ardından ücretsiz bir görüşme talep edebilir, yol haritasını birlikte netleştirebilirsiniz. Herhangi bir taahhüt söz konusu değil.",
  },
  {
    question: "Uygulama danışmanlığına geçmek için ne yapmalıyım?",
    answer:
      "Check-up raporunuzu aldıktan sonra bizimle iletişime geçmeniz yeterli. İhtiyacınıza göre bir danışmanlık teklifi hazırlıyoruz. Sürpriz maliyet veya paket dayatması yok.",
  },
];

const allFaqs = [...FAQ_ITEMS, ...additionalFaqs];

const categories = [
  {
    label: "Süreç & Check-Up",
    questions: [0, 1, 2, 3],
  },
  {
    label: "Fiyatlandırma & Süre",
    questions: [4, 5, 11, 12],
  },
  {
    label: "Teknik & Araçlar",
    questions: [6],
  },
  {
    label: "Sektör & Kapsam",
    questions: [7],
  },
  {
    label: "Destek & Gizlilik",
    questions: [8, 9, 10],
  },
];

export default function SSSPage() {
  return (
    <main className="pt-20">
      <FAQSchema items={allFaqs} />
      {/* Hero */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            <span className="w-1.5 h-1.5 rounded-full bg-secondary/60" />
            <span className="text-xs font-semibold text-foreground-secondary tracking-widest uppercase ml-1">SSS</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
            Sık Sorulan{" "}
            <span className="gradient-text">Sorular</span>
          </h1>

          <p className="text-lg text-foreground-secondary leading-relaxed max-w-2xl">
            Check-up süreci, danışmanlık kapsamı, fiyatlandırma ve gizlilik hakkında
            en çok merak edilen soruları yanıtladık. Bulamadığınız varsa{" "}
            <Link href="/iletisim" className="text-primary-light hover:text-primary dark:hover:text-secondary underline underline-offset-2 transition-colors">
              bize yazın.
            </Link>
          </p>
        </div>
      </section>

      {/* FAQ — Tüm sorular kategorisiz, düz liste */}
      <section className="section-padding bg-background-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {allFaqs.map((item, index) => (
              <details
                key={index}
                className="group rounded-2xl border border-border bg-surface overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 px-8 py-6 cursor-pointer list-none select-none hover:bg-foreground/[0.02] transition-colors">
                  <h3 className="font-semibold text-foreground leading-snug pr-4">
                    {item.question}
                  </h3>
                  <ChevronDown className="w-5 h-5 text-foreground-secondary shrink-0 transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <div className="px-8 pb-6">
                  <p className="text-foreground-secondary leading-relaxed text-sm sm:text-base">
                    {item.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Hâlâ sorunuz mu var? */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-8 rounded-2xl border border-border bg-surface">
            <div>
              <h2 className="text-xl font-bold mb-2">Cevabını bulamadınız mı?</h2>
              <p className="text-foreground-secondary text-sm leading-relaxed">
                Her soruyu bu sayfaya sığdıramıyoruz. Merak ettiklerinizi doğrudan bizimle paylaşın.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                href={`mailto:${BRAND.email}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-foreground font-medium rounded-full hover:border-border-hover transition-all duration-200 text-sm"
              >
                E-posta Gönderin
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href={BRAND.tallyFormUrl}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-secondary text-primary font-semibold rounded-full hover:bg-secondary-hover transition-all duration-200 text-sm"
              >
                Check-Up Başlatın
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
