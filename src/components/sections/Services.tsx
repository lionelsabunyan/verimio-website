import Link from "next/link";
import { EXPERTISE_ITEMS } from "@/lib/constants";

export default function Services() {
  return (
    <section className="py-24 md:py-32 border-t border-border">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-4">
          Hizmetler
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-16 max-w-2xl">
          Operasyon, müşteri, veri, strateji.
        </h2>

        <div className="space-y-0">
          {EXPERTISE_ITEMS.map((item, index) => (
            <article
              key={item.slug}
              className="group border-t border-border py-8 flex flex-col md:flex-row md:items-start gap-4 md:gap-0"
            >
              <Link
                href={`/hizmetler#${item.slug}`}
                className="flex items-baseline gap-4 md:w-1/2"
              >
                <span className="text-sm text-foreground-muted tabular-nums shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground-muted group-hover:text-foreground transition-colors duration-300">
                  {item.title}
                </h3>
              </Link>

              <div className="md:w-1/2 md:pl-8 flex flex-col gap-3">
                <Link
                  href={`/hizmetler#${item.slug}`}
                  className="text-foreground-secondary leading-relaxed group-hover:text-foreground transition-colors duration-300"
                >
                  {item.description}
                </Link>
                <Link
                  href={`/blog/${item.pillarSlug}`}
                  className="text-xs text-foreground-muted underline underline-offset-4 decoration-border hover:text-foreground hover:decoration-foreground transition-colors w-fit"
                >
                  {item.pillarLabel} →
                </Link>
              </div>
            </article>
          ))}
          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  );
}
