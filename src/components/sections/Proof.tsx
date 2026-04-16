import Link from "next/link";
import { EXPERTISE_ITEMS } from "@/lib/constants";

export default function Proof() {
  return (
    <section className="py-24 md:py-32 border-t border-b border-border">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-4">
          Derinlemesine rehberler
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 max-w-2xl">
          Konuştuğumuzu yazıyoruz.
        </h2>
        <p className="text-foreground-secondary leading-relaxed mb-16 max-w-2xl">
          Her uzmanlık alanımız için uçtan uca, Türk şirketlerine özel yazılmış kapsamlı rehberlerimiz var. Danışmanlık ilişkisi başlamadan önce konuyu bizimle derinleşecek kadar tanıyın.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-0 border-t border-border">
          {EXPERTISE_ITEMS.map((item, index) => (
            <Link
              key={item.slug}
              href={`/blog/${item.pillarSlug}`}
              className={`group py-8 flex flex-col gap-3 border-b border-border ${
                index % 2 === 0 ? "sm:border-r sm:pr-12" : ""
              }`}
            >
              <span className="text-xs text-foreground-muted tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:underline underline-offset-4">
                {item.pillarLabel.replace(" rehberini oku", " rehberi")}
              </h3>
              <p className="text-sm text-foreground-secondary leading-relaxed">
                {item.tagline}
              </p>
              <span className="text-xs text-foreground-muted mt-1">
                Oku →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
