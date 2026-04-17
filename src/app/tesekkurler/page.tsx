"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function TesekkurlerContent() {
  const searchParams = useSearchParams();
  const tip = searchParams.get("tip");
  const isGorusme = tip === "gorusme";

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
          {/* Check mark — subtle, left-aligned */}
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

export default function TesekkurlerPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-24" />}>
      <TesekkurlerContent />
    </Suspense>
  );
}
