import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { GoogleAnalytics } from "@next/third-parties/google";
import OrganizationSchema from "@/components/seo/OrganizationSchema";

const ppNeueMontreal = localFont({
  src: [
    {
      path: "../../public/fonts/ppneuemontreal-book.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/ppneuemontreal-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/ppneuemontreal-bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/ppneuemontreal-italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-pp-neue-montreal",
  display: "swap",
  adjustFontFallback: "Arial",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.verimio.com.tr"),
  title: {
    default: "Verimio | Yapay Zeka Danışmanlığı & AI Koçluk",
    template: "%s | Verimio",
  },
  description:
    "Şirketinizin AI hazırlığını analiz eder, yol haritası çizer, birlikte uygularız. Danışmanlık ve koçluk tek elden — strateji, eğitim, sürekli destek.",
  keywords: [
    "AI danışmanlık",
    "yapay zeka danışmanlığı",
    "iş süreci otomasyonu",
    "kurumsal AI",
    "dijital dönüşüm",
    "verimlilik artırma",
    "süreç analizi",
    "Türkiye AI",
    "AI koçluğu",
    "yapay zeka koçu",
    "kurumsal AI eğitimi",
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
    types: {
      "application/rss+xml": "https://www.verimio.com.tr/feed.xml",
    },
    languages: {
      "tr-TR": "https://www.verimio.com.tr",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body
        className={`${ppNeueMontreal.variable} antialiased bg-background text-foreground`}
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
