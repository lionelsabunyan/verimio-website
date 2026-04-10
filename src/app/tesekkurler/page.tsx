"use client";

import { motion } from "framer-motion";
import Link from "next/link";
const ArrowLeft = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12,19 5,12 12,5"/></svg>
);
const Mail = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,6 12,13 2,6"/></svg>
);
const Clock = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>
);
const Calendar = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
);
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function TesekkurlerContent() {
  const searchParams = useSearchParams();
  const tip = searchParams.get("tip"); // "rapor" | "gorusme"
  const isGorusme = tip === "gorusme";

  return (
    <div className="min-h-screen bg-background pt-20 flex items-center justify-center px-4 relative overflow-hidden">
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
                stroke="#0A0A0A"
                strokeWidth="5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
              <motion.path
                d="M28 52 L43 67 L72 36"
                fill="none"
                stroke="#0A0A0A"
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
              <div className="flex items-center gap-3 p-4 rounded-xl bg-background border border-border text-left">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-4 h-4 text-foreground dark:text-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">20 dakikalık ücretsiz görüşme</p>
                  <p className="text-xs text-foreground-secondary">Zoom üzerinden, size uygun saatte</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-background border border-border text-left">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-foreground dark:text-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Davet e-postanıza gelecek</p>
                  <p className="text-xs text-foreground-secondary">Spam klasörünüzü de kontrol edin</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-background border border-border text-left">
                <div className="w-9 h-9 rounded-xl bg-foreground/15 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-foreground dark:text-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Raporunuz hazırlanıyor</p>
                  <p className="text-xs text-foreground-secondary">Check-up raporunuz en kısa sürede e-postanıza iletilecek</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-background border border-border text-left">
                <div className="w-9 h-9 rounded-xl bg-foreground/15 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-foreground dark:text-foreground" />
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
