import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/components/layout/NavbarWrapper";

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
        className={`${dmSans.variable} ${dmMono.variable} antialiased bg-background text-foreground`}
      >
        <NavbarWrapper>{children}</NavbarWrapper>
      </body>
    </html>
  );
}
