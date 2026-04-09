import Link from "next/link";

export default function About() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-4">
            Hakkımızda
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug mb-8">
            İş süreçlerinizi analiz eder, verimliliği engelleyen darboğazları tespit eder ve size özel çözümlerle hem zamanınızı hem bütçenizi koruruz.
          </h2>
          <p className="text-foreground-secondary leading-relaxed mb-8">
            AI dönüşümünde tek muhatabınız oluyoruz. Stratejiyi çizeriz, birlikte uygularız. Danışmanlık ve koçluk aynı sürecin parçası — ayrı ayrı satın almanıza gerek yok.
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
