"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Mail, Clock, Calendar } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function TesekkurlerContent() {
  const searchParams = useSearchParams();
  const tip = searchParams.get("tip"); // "rapor" | "gorusme"
  const isGorusme = tip === "gorusme";

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/4 via-background to-secondary/3 pt-20 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Animated check */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex items-center justify-center"
        >
          <div className="relative w-24 h-24">
            <svg viewBox="0 0 100 100" className="w-24 h-24">
              <motion.circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="#A3E635"
                strokeWidth="5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
              <motion.path
                d="M28 52 L43 67 L72 36"
                fill="none"
                stroke="#A3E635"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
              />
            </svg>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="space-y-3"
        >
          <h1 className="text-3xl font-bold text-foreground">
            {isGorusme ? "Görüşme Talebiniz Alındı!" : "Teşekkürler!"}
          </h1>
          <p className="text-foreground-secondary leading-relaxed">
            {isGorusme
              ? "Ücretsiz görüşme talebiniz alındı. Zoom davet linki e-posta adresinize gönderilecek."
              : "Cevaplarınız alındı. Şirketinize özel AI analiz raporunuz hazırlanıyor."}
          </p>
        </motion.div>

        {/* Info cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="space-y-3"
        >
          {isGorusme ? (
            <>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-surface border border-border text-left">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-4 h-4 text-primary dark:text-primary-light" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">20 dakikalık ücretsiz görüşme</p>
                  <p className="text-xs text-foreground-secondary">Zoom üzerinden, size uygun saatte</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-surface border border-border text-left">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-primary dark:text-primary-light" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Davet e-postanıza gelecek</p>
                  <p className="text-xs text-foreground-secondary">Spam klasörünüzü de kontrol edin</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-surface border border-border text-left">
                <div className="w-9 h-9 rounded-xl bg-secondary/15 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-primary dark:text-primary-light" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">48 saat içinde</p>
                  <p className="text-xs text-foreground-secondary">Check-up raporunuz e-postanıza gelecek</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-surface border border-border text-left">
                <div className="w-9 h-9 rounded-xl bg-secondary/15 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-primary dark:text-primary-light" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Spam klasörünüzü kontrol edin</p>
                  <p className="text-xs text-foreground-secondary">Bazen filtrelere takılabiliyor</p>
                </div>
              </div>
            </>
          )}
        </motion.div>

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-foreground-secondary hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Ana sayfaya dön
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default function TesekkurlerPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <TesekkurlerContent />
    </Suspense>
  );
}
