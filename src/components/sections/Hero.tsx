import { HERO_CONTENT, BRAND } from "@/lib/constants";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="flex items-end min-h-[85vh] bg-background">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 pt-32 pb-16">
        <p className="text-sm font-medium text-foreground-muted tracking-[0.15em] uppercase mb-8">
          {HERO_CONTENT.badge}
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight text-foreground mb-6">
          {HERO_CONTENT.headline}
          <br />
          {HERO_CONTENT.headlineHighlight}
        </h1>

        <p className="text-lg sm:text-xl text-foreground-secondary max-w-2xl leading-relaxed mb-10">
          {HERO_CONTENT.subheadline}
        </p>

        <div className="flex items-center gap-4 flex-wrap">
          <Button href={BRAND.checkupUrl} size="lg">
            {HERO_CONTENT.ctaPrimary}
          </Button>
          <Button
            href="#nasil-calisir"
            variant="outline"
            size="lg"
            icon={false}
          >
            {HERO_CONTENT.ctaSecondary}
          </Button>
        </div>
      </div>
    </section>
  );
}
