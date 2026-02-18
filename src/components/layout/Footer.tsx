import Link from "next/link";
import { Linkedin, Twitter, Instagram } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { Wordmark } from "@/components/brand/Logo";

const footerLinks = {
  links: [
    { label: "Ana Sayfa", href: "/" },
    { label: "Hakkımızda", href: "/hakkimizda" },
    { label: "Hizmetler", href: "/hizmetler" },
    { label: "Blog", href: "/blog" },
  ],
  support: [
    { label: "SSS", href: "/hakkimizda#faq" },
    { label: "Gizlilik Politikası", href: "/gizlilik" },
    { label: "Kullanım Şartları", href: "/kullanim-sartlari" },
    { label: "İletişim", href: "/iletisim" },
  ],
  social: [
    { label: "LinkedIn", href: "#", icon: Linkedin },
    { label: "Twitter", href: "#", icon: Twitter },
    { label: "Instagram", href: "#", icon: Instagram },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-primary text-white overflow-hidden">
      {/* Subtle lime radial glow — top right */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top right, rgba(163,230,53,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block">
              <Wordmark size="md" className="text-white" />
            </Link>
            <p className="mt-4 text-sm text-white/60 leading-relaxed">
              Şirketler için kurumsal AI danışmanlığı.
            </p>
            <a
              href={`mailto:${BRAND.email}`}
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 border border-white/15 rounded-full text-sm text-white/70 hover:border-secondary hover:text-secondary transition-colors"
            >
              {BRAND.email}
            </a>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Sayfalar
            </h3>
            <ul className="space-y-3">
              {footerLinks.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Destek
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Sosyal Medya
            </h3>
            <div className="flex items-center gap-3">
              {footerLinks.social.map((item) => {
                const IconComp = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-secondary transition-colors"
                    aria-label={item.label}
                  >
                    <IconComp className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} Verimio. Tüm hakları saklıdır.
          </p>
          <p className="text-sm text-white/40">
            AI ile güçlendirilmiş iş süreçleri danışmanlığı
          </p>
        </div>
      </div>
    </footer>
  );
}
