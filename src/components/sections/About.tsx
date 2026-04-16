import Link from "next/link";
import { ABOUT_CONTENT } from "@/lib/constants";

export default function About() {
  return (
    <section className="pt-16 pb-24 md:pt-20 md:pb-32">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-4">
            {ABOUT_CONTENT.label}
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug mb-8">
            {ABOUT_CONTENT.heading}
          </h2>
          <p className="text-foreground-secondary leading-relaxed mb-8">
            {ABOUT_CONTENT.text}
          </p>
          <Link
            href="/hakkimizda"
            className="text-sm text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
          >
            Daha fazla bilgi
          </Link>
        </div>
      </div>
    </section>
  );
}
