import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { GoogleAnalytics } from "@next/third-parties/google";
import OrganizationSchema from "@/components/seo/OrganizationSchema";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.verimio.com.tr"),
  title: {
    default: "Verimio | Kurumsal AI Danışmanlığı",
    template: "%s | Verimio",
  },
  description:
    "Şirketinizin operasyonel verimliliğini ve AI hazırlığını analiz ediyoruz. Size özel yol haritasıyla hem zamandan hem maliyetten tasarruf edin.",
  keywords: [
    "AI danışmanlık",
    "yapay zeka danışmanlığı",
    "iş süreci otomasyonu",
    "kurumsal AI",
    "dijital dönüşüm",
    "verimlilik artırma",
    "süreç analizi",
    "Türkiye AI",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: "Verimio | Kurumsal AI Danışmanlığı",
    description:
      "Şirketinizin AI hazırlığını analiz ediyoruz. Formu doldurun, size özel yol haritanız e-postanıza gelsin.",
    type: "website",
    locale: "tr_TR",
    url: "https://www.verimio.com.tr",
    siteName: "Verimio",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Verimio | Kurumsal AI Danışmanlığı",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Verimio | Kurumsal AI Danışmanlığı",
    description:
      "Şirketinizin operasyonel verimliliğini ve AI hazırlığını analiz ediyoruz.",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: "https://www.verimio.com.tr",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* FOUC prevention — apply theme before React hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('verimio-theme') || 'system';
                  var resolved = theme;
                  if (theme === 'system') {
                    resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  document.documentElement.classList.add(resolved);
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${dmSans.variable} ${dmMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          <NavbarWrapper>{children}</NavbarWrapper>
        </ThemeProvider>
        <OrganizationSchema />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
      </body>
    </html>
  );
}
