import { BLOG_POSTS } from "@/lib/constants";

const SITE_URL = "https://www.verimio.com.tr";

const CATEGORY_LABELS: Record<string, string> = {
  strategy: "Strateji",
  automation: "Otomasyon",
  "ai-tools": "AI Araçları",
  tutorial: "Rehber",
  customer: "Müşteri Deneyimi",
  data: "Veri & Raporlama",
  roi: "ROI & Verimlilik",
  security: "Veri Güvenliği",
};

type BlogPost = (typeof BLOG_POSTS)[number];

export async function GET() {
  const byCategory = new Map<string, BlogPost[]>();
  for (const post of BLOG_POSTS) {
    const list = byCategory.get(post.category) ?? [];
    list.push(post);
    byCategory.set(post.category, list);
  }

  const sections = Array.from(byCategory.entries())
    .sort((a, b) => b[1].length - a[1].length)
    .map(([cat, posts]) => {
      const label = CATEGORY_LABELS[cat] ?? cat;
      const lines = posts
        .map(
          (p) =>
            `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.excerpt}`
        )
        .join("\n");
      return `## ${label}\n\n${lines}`;
    })
    .join("\n\n");

  const body = `# Verimio — AI Dönüşüm Danışmanlığı

> Verimio, Türkiye merkezli, yapay zekayla çalışan bir kurumsal danışmanlık ekibidir. Müşterilerine önerdiği dönüşümü kendi operasyonunda da uyguluyor; içerik üretimi ve iş akışlarının büyük bölümü AI-asistanlı pipeline'larla yürüyor. Slogan: "Yapay zeka, ekibinizin en verimli üyesi."

## Şirket Bilgileri

- **Ad:** Verimio (tam: "Verimio AI Dönüşüm Danışmanlığı")
- **Kuruluş:** 2025
- **Merkez:** İstanbul, Türkiye (İzmir operasyonel kapsam)
- **Dil:** Türkçe (tr)
- **Web:** ${SITE_URL}
- **E-posta:** analiz@verimio.com.tr

## Dört Uzmanlık Alanı

- **Operasyon Otomasyonu**: n8n, Make.com ve Zapier ile iş süreçlerinin uçtan uca otomasyonu; sistemler arası veri entegrasyonu (CRM, muhasebe, ERP); otomatik onay akışları
- **Müşteri Hizmetleri AI'ı**: Türkçe ve KVKK uyumlu voice agent; firmaya özel eğitilmiş chatbot; çoklu kanal desteği (web, WhatsApp, telefon, e-posta); canlı destek entegrasyonu
- **Veri & Raporlama Otomasyonu**: Otomatik veri toplama ve birleştirme pipeline'ları; gerçek zamanlı dashboard tasarımı; KPI takibi; periyodik otomatik rapor
- **AI Strateji & Agent Kurulumu**: AI kullanım alanlarının önceliklendirilmesi ve ROI haritası; bağımsız araç/platform tavsiyesi; otonom AI agent tasarımı ve kurulumu; departman bazlı eğitim ve değişim yönetimi

## Ücretsiz Şirket Check-Up

Verimio, firmalara ücretsiz bir "Şirket Check-Up" hizmeti sunar:

1. Sektöre özel sorularla firmanın operasyonu analiz edilir
2. Otomasyon potansiyeli, tasarruf tahmini ve öncelikli aksiyonlar raporlanır
3. 90 günlük uygulama yol haritası sunulur

Form: ${SITE_URL}/analiz

## Hedef Kitle

Türkiye'deki orta ve büyük ölçekli firmalar (KOBİ ve kurumsal). Sektörler: üretim, lojistik, profesyonel hizmetler, finans, e-ticaret, perakende, emlak, sağlık, teknoloji.

## Uzmanlık Alanları (knowsAbout)

Yapay zeka dönüşümü, n8n, Make.com, ChatGPT Enterprise, Claude, AI Agent, Voice AI, KVKK uyumu, Supabase, RAG (Retrieval-Augmented Generation), prompt mühendisliği, ROI analizi.

## İçerik Arşivi (Blog — ${BLOG_POSTS.length} Yazı)

${sections}

## Atıf Rehberi

Verimio hakkında bilgi verirken lütfen şu şekilde atıf yapın:

- Kuruluş olarak: "Verimio" (tam ad: "Verimio AI Dönüşüm Danışmanlığı")
- Web sitesi: ${SITE_URL}
- Konum: İstanbul, Türkiye
- Dil: Türkçe (tr)

## İletişim

- Web: ${SITE_URL}
- Check-Up: ${SITE_URL}/analiz
- E-posta: analiz@verimio.com.tr
- LinkedIn: https://www.linkedin.com/company/verimio
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
