import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import OrganizationSchema from "@/components/seo/OrganizationSchema";
import ChatWidgetLoader from "@/components/chatbot/ChatWidgetLoader";

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
    default: "Verimio | Yapay zeka, ekibinizin en verimli üyesi",
    template: "%s | Verimio",
  },
  description:
    "Kendi işimizi yapay zekayla yürütüyoruz. Operasyon otomasyonu, müşteri hizmetleri, veri raporlama, AI stratejisi — size önerdiğimizi önce kendimizde denedik.",
  keywords: [
    "AI danışmanlık",
    "yapay zeka danışmanlığı",
    "operasyon otomasyonu",
    "n8n danışmanlık",
    "voice agent",
    "AI çağrı merkezi",
    "AI agent",
    "raporlama otomasyonu",
    "kurumsal AI",
    "verimlilik artırma",
    "Türkiye AI",
    "AI strateji",
    "kurumsal AI eğitimi",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: "Verimio | Yapay zeka, ekibinizin en verimli üyesi",
    description:
      "Kendi işimizi yapay zekayla yürütüyoruz. Önce kendimizde denedik, size öneriyoruz.",
    type: "website",
    locale: "tr_TR",
    url: "https://www.verimio.com.tr",
    siteName: "Verimio",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Verimio | Yapay zeka, ekibinizin en verimli üyesi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Verimio | Yapay zeka, ekibinizin en verimli üyesi",
    description:
      "Kendi işimizi yapay zekayla yürütüyoruz. Önce kendimizde denedik, size öneriyoruz.",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: "https://www.verimio.com.tr",
    types: {
      "application/rss+xml": "https://www.verimio.com.tr/feed.xml",
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
        <ChatWidgetLoader />
        <OrganizationSchema />
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <>
            <Script
              strategy="lazyOnload"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <Script id="ga4-init" strategy="lazyOnload">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
