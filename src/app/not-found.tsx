"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center pt-20">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-4">
          404
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Bu sayfa bulunamadı.
        </h1>
        <p className="text-foreground-secondary leading-relaxed mb-8 max-w-lg">
          Aradığınız sayfa taşınmış ya da kaldırılmış olabilir.
        </p>
        <div className="flex items-center gap-4">
          <button
            onClick={() => history.back()}
            className="inline-flex items-center px-6 py-3 border border-border text-foreground font-medium text-sm hover:border-foreground transition-colors"
          >
            ← Geri Git
          </button>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-foreground text-background font-medium text-sm hover:opacity-90 transition-opacity"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </main>
  );
}
