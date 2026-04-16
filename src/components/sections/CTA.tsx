import { CTA_CONTENT, BRAND } from "@/lib/constants";

export default function CTA() {
  return (
    <section className="bg-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-background mb-6 leading-tight">
          {CTA_CONTENT.headline}
        </h2>

        <p className="text-lg text-background/70 max-w-2xl mb-10 leading-relaxed">
          {CTA_CONTENT.description}
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href={BRAND.checkupUrl}
            className="inline-flex items-center px-7 py-3.5 bg-background text-foreground font-medium rounded-none hover:opacity-90 transition-opacity text-sm"
          >
            {CTA_CONTENT.ctaPrimary}
          </a>
          <a
            href={BRAND.calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-7 py-3.5 border border-background/30 text-background font-medium rounded-none hover:border-background transition-colors text-sm"
          >
            {CTA_CONTENT.ctaSecondary}
          </a>
          <a
            href="/hizmetler"
            className="inline-flex items-center text-sm text-background/70 hover:text-background underline underline-offset-4 decoration-background/30 hover:decoration-background transition-colors"
          >
            {CTA_CONTENT.ctaTertiary}
          </a>
        </div>
      </div>
    </section>
  );
}
