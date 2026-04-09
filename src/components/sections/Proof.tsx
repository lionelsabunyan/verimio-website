import { TESTIMONIALS } from "@/lib/constants";

export default function Proof() {
  return (
    <section className="py-24 md:py-32 border-b border-border">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <blockquote className="max-w-3xl">
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug text-foreground">
            &ldquo;{TESTIMONIALS[0].quote}&rdquo;
          </p>
          <footer className="mt-8 flex items-baseline gap-3">
            <span className="text-sm font-medium text-foreground">{TESTIMONIALS[0].name}</span>
            <span className="text-sm text-foreground-muted">{TESTIMONIALS[0].role}</span>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
