import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Verimio | İş Süreçlerinizi AI ile Dönüştürün",
  description:
    "3 dakikada firmanızın AI potansiyelini keşfedin. Kişiselleştirilmiş analiz raporunuzu anında alın. Türk KOBİ'leri için AI dönüşüm danışmanlığı.",
  keywords: [
    "AI danışmanlık",
    "yapay zeka",
    "otomasyon",
    "KOBİ",
    "dijital dönüşüm",
    "verimlilik",
    "Türkiye",
  ],
  openGraph: {
    title: "Verimio | İş Süreçlerinizi AI ile Dönüştürün",
    description:
      "3 dakikada firmanızın AI potansiyelini keşfedin. Ücretsiz analiz raporu alın.",
    type: "website",
    locale: "tr_TR",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
