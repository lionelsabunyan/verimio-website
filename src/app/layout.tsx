import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

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
  title: "Verimio | Kurumsal AI Danışmanlığı",
  description:
    "Şirketinizin operasyonel verimliliğini ve AI hazırlığını analiz ediyoruz. Size özel yol haritasıyla hem zamandan hem maliyetten tasarruf edin.",
  keywords: [
    "AI danışmanlık",
    "yapay zeka",
    "otomasyon",
    "kurumsal",
    "dijital dönüşüm",
    "verimlilik",
    "Türkiye",
  ],
  openGraph: {
    title: "Verimio | Kurumsal AI Danışmanlığı",
    description:
      "Şirketinizin AI hazırlığını analiz ediyoruz. 48 saat içinde size özel yol haritası.",
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
      </body>
    </html>
  );
}
