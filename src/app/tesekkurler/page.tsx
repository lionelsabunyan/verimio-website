"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { BRAND } from "@/lib/constants";

interface Recommendation {
  title: string;
  description: string;
}

interface Analysis {
  score: number;
  score_label: string;
  top_opportunity: string;
  estimated_saving: string;
  timeline_label: string;
  summary: string;
  recommendations: Recommendation[];
  roadmap: { phase1: string; phase2?: string | null; phase3?: string | null };
}

interface StoredReport {
  companyName: string;
  email: string;
  sector: string;
  analysis: Analysis;
  timestamp: number;
}

function TesekkurlerContent() {
  const searchParams = useSearchParams();
  const tip = searchParams.get("tip");
  const isGorusme = tip === "gorusme";
  const isRapor = tip === "rapor";
  const [report, setReport] = useState<StoredReport | null>(null);

  useEffect(() => {
    if (!isRapor || typeof window === "undefined") return;
    try {
      const raw = window.sessionStorage.getItem("verimio_last_report");
      if (!raw) return;
      const parsed = JSON.parse(raw) as StoredReport;
      // 30 dakikadan eski olmasın — yeni submitler için yenilenmeli
      if (Date.now() - parsed.timestamp < 30 * 60 * 1000) {
        setReport(parsed);
      }
    } catch {
      // ignore parse errors
    }
  }, [isRapor]);

  // Görüşme akışı veya rapor verisi yoksa eski sade ekran
  if (isGorusme || !report) {
    const items = isGorusme
      ? [
          {
            label: "20 dakikalık ücretsiz görüşme",
            desc: "Zoom üzerinden, size uygun bir saatte.",
          },
          {
            label: "Davet e-postanıza gelecek",
            desc: "Spam klasörünü de kontrol etmeyi unutmayın.",
          },
        ]
      : [
          {
            label: "Raporunuz hazırlanıyor",
            desc: "Check-Up raporunuz en kısa sürede e-postanıza iletilecek.",
          },
          {
            label: "Spam klasörünü kontrol edin",
            desc: "Bazen filtrelere takılabiliyor.",
          },
        ];

    return (
      <main className="pt-24">
        <section className="pb-24 md:pb-32">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <motion.svg
              viewBox="0 0 100 100"
              className="w-16 h-16 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              aria-hidden
            >
              <motion.circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="#0A0A0A"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
              <motion.path
                d="M28 52 L43 67 L72 36"
                fill="none"
                stroke="#0A0A0A"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
              />
            </motion.svg>

            <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-4">
              {isGorusme ? "Görüşme talebiniz alındı" : "Teşekkürler"}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 max-w-3xl">
              {isGorusme
                ? "En kısa sürede size uygun bir saat önereceğiz."
                : "Cevaplarınız bizde, rapor yolda."}
            </h1>
            <p className="text-lg text-foreground-secondary leading-relaxed max-w-2xl">
              {isGorusme
                ? "Ücretsiz görüşme talebinizi aldık. Zoom davet linki e-posta adresinize iletilecek."
                : "Şirketinize özel AI analiz raporunuz hazırlanıyor ve birazdan e-postanıza düşecek."}
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24 border-t border-border">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-8">
              Sıradakiler
            </p>
            <div className="space-y-0">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="border-t border-border py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8"
                >
                  <div className="md:col-span-1">
                    <span className="text-sm text-foreground-muted tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="md:col-span-4">
                    <h2 className="text-xl font-bold">{item.label}</h2>
                  </div>
                  <div className="md:col-span-7">
                    <p className="text-foreground-secondary leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
              <div className="border-t border-border" />
            </div>

            <div className="mt-12">
              <Link
                href="/"
                className="text-sm text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
              >
                ← Ana sayfaya dön
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  // Rapor varsa: anında ekranda göster
  const { analysis, companyName, email } = report;
  const scoreColor =
    analysis.score >= 7
      ? "text-foreground"
      : analysis.score >= 4
      ? "text-foreground-secondary"
      : "text-foreground";
  const phases = [analysis.roadmap.phase1, analysis.roadmap.phase2, analysis.roadmap.phase3].filter(
    Boolean
  ) as string[];

  return (
    <main className="pt-24">
      <section className="pb-12 md:pb-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <motion.svg
            viewBox="0 0 100 100"
            className="w-12 h-12 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            aria-hidden
          >
            <motion.circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="#0A0A0A"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            <motion.path
              d="M28 52 L43 67 L72 36"
              fill="none"
              stroke="#0A0A0A"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
            />
          </motion.svg>

          <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-4">
            Raporunuz hazır
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6 max-w-3xl">
            {companyName} — AI Hazırlık Raporu
          </h1>
          <p className="text-lg text-foreground-secondary leading-relaxed max-w-3xl">
            {analysis.summary}
          </p>
        </div>
      </section>

      {/* Skor + Top Opportunity */}
      <section className="py-12 border-t border-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-4">
              AI Hazırlık Skoru
            </p>
            <div className="flex items-baseline gap-2 mb-3">
              <span className={`text-7xl font-bold leading-none ${scoreColor}`}>
                {analysis.score}
              </span>
              <span className="text-2xl text-foreground-muted">/10</span>
            </div>
            <p className="text-sm text-foreground-secondary">{analysis.score_label}</p>
            {/* Skor \u00e7ubu\u011fu */}
            <div className="mt-4 grid grid-cols-10 gap-1 max-w-xs">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-2 ${
                    i < analysis.score ? "bg-foreground" : "bg-border"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="md:col-span-8 space-y-6">
            <div>
              <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-2">
                En büyük fırsat
              </p>
              <p className="text-base text-foreground leading-relaxed">
                {analysis.top_opportunity}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-2">
                  Tahmini kazanım
                </p>
                <p className="text-sm text-foreground-secondary leading-relaxed">
                  {analysis.estimated_saving}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-2">
                  Uygulama süresi
                </p>
                <p className="text-sm text-foreground-secondary leading-relaxed">
                  {analysis.timeline_label}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* \u00d6neriler */}
      <section className="py-12 border-t border-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-8">
            Önerilen aksiyonlar
          </p>
          <div className="space-y-0">
            {analysis.recommendations.map((rec, index) => (
              <div
                key={index}
                className="border-t border-border py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8"
              >
                <div className="md:col-span-1">
                  <span className="text-sm text-foreground-muted tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="md:col-span-11">
                  <h3 className="text-xl font-bold mb-2">{rec.title}</h3>
                  <p className="text-foreground-secondary leading-relaxed">
                    {rec.description}
                  </p>
                </div>
              </div>
            ))}
            <div className="border-t border-border" />
          </div>
        </div>
      </section>

      {/* Yol haritas\u0131 */}
      {phases.length > 0 && (
        <section className="py-12 border-t border-border">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-8">
              Uygulama yol haritası
            </p>
            <div className="space-y-0">
              {phases.map((phase, index) => (
                <div
                  key={index}
                  className="border-t border-border py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8"
                >
                  <div className="md:col-span-2">
                    <span className="text-sm text-foreground-muted">
                      Adım {index + 1}
                    </span>
                  </div>
                  <div className="md:col-span-10">
                    <p className="text-foreground-secondary leading-relaxed">{phase}</p>
                  </div>
                </div>
              ))}
              <div className="border-t border-border" />
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 md:py-24 bg-foreground">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-background mb-4 max-w-2xl">
            Bu raporu birlikte konuşalım.
          </h2>
          <p className="text-background/70 leading-relaxed mb-4 max-w-xl">
            Ücretsiz 20 dakikalık görüşmede raporunuzu birlikte okuruz, sektörünüze özel bir
            uygulama planı çıkarırız. Baskı yok, hızlı dönmek için yeterli.
          </p>
          <p className="text-background/50 text-sm leading-relaxed mb-8 max-w-xl">
            Rapor ayrıca <strong className="text-background">{email}</strong> adresine de
            gönderildi — istediğiniz zaman tekrar açabilirsiniz.
          </p>
          <Link
            href={BRAND.calendlyUrl}
            target="_blank"
            className="inline-flex items-center px-7 py-3.5 bg-background text-foreground font-medium text-sm hover:opacity-90 transition-opacity"
          >
            Ücretsiz Görüşme Planla →
          </Link>
        </div>
      </section>

      <section className="py-12 border-t border-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <Link
            href="/"
            className="text-sm text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
          >
            ← Ana sayfaya dön
          </Link>
        </div>
      </section>
    </main>
  );
}

export default function TesekkurlerPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-24" />}>
      <TesekkurlerContent />
    </Suspense>
  );
}
