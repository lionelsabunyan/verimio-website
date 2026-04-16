import Link from "next/link";
import { BRAND } from "@/lib/constants";

const footerLinks = {
  pages: [
    { label: "Ana Sayfa", href: "/" },
    { label: "Hakkımızda", href: "/hakkimizda" },
    { label: "Hizmetler", href: "/hizmetler" },
    { label: "AI Koçluğu", href: "/ai-koclugu" },
    { label: "Blog", href: "/blog" },
  ],
  support: [
    { label: "SSS", href: "/sss" },
    { label: "Gizlilik Politikası", href: "/gizlilik" },
    { label: "Kullanım Şartları", href: "/kullanim-sartlari" },
    { label: "İletişim", href: "/iletisim" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="text-lg font-bold tracking-tight text-foreground">
              verimio
            </Link>
            <p className="mt-4 text-sm text-foreground-secondary leading-relaxed">
              Yapay zeka, ekibinizin en verimli üyesi.
            </p>
            <a
              href={`mailto:${BRAND.email}`}
              className="inline-block mt-4 text-sm text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
            >
              {BRAND.email}
            </a>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-xs font-medium text-foreground-muted uppercase tracking-wider mb-4">
              Sayfalar
            </h3>
            <ul className="space-y-3">
              {footerLinks.pages.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground-secondary hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xs font-medium text-foreground-muted uppercase tracking-wider mb-4">
              Destek
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground-secondary hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xs font-medium text-foreground-muted uppercase tracking-wider mb-4">
              Sosyal Medya
            </h3>
            <a
              href="https://www.linkedin.com/company/verimio"
              className="text-sm text-foreground-secondary hover:text-foreground transition-colors underline underline-offset-4 decoration-border hover:decoration-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-sm text-foreground-muted">
            &copy; {new Date().getFullYear()} Verimio. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}
