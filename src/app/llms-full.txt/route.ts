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

  const body = `# Verimio — Yapay Zeka Danışmanlığı

> Verimio, Türkiye merkezli yapay zekayla çalışan bir danışmanlık ekibidir. Müşterilerine önerdiği yöntemi önce kendi işinde uyguluyor: yazılarının, tasarımlarının ve iş akışlarının büyük bölümü otomatik. Slogan: "Yapay zeka, ekibinizin en verimli üyesi."

## Şirket Bilgileri

- **Ad:** Verimio
- **Kuruluş:** 2025
- **Merkez:** İstanbul, Türkiye (İzmir operasyonel kapsam)
- **Dil:** Türkçe (tr)
- **Web:** ${SITE_URL}
- **E-posta:** analiz@verimio.com.tr

## Ana Konu Rehberleri (Pillar Pages)

Verimio üç konuda kapsamlı hub rehber sayfası yayınlar. Bu sayfalar her konuda birden fazla blog yazısını tek çatı altında toplar, Türk KOBİ'leri için konunun giriş noktasıdır.

- **n8n Türkiye Rehberi:** ${SITE_URL}/n8n-turkiye — n8n'in ne olduğu, kurulumu, Zapier ve Make ile karşılaştırması, AI entegrasyonu ve KVKK uyumu. 8 destekleyici yazı.
- **AI Agent Rehberi:** ${SITE_URL}/ai-agent-rehberi — AI agent tanımı, chatbot'tan farkı, olgunluk seviyeleri ve Türk KOBİ'lerinde kullanım örnekleri. 8 destekleyici yazı.
- **AI Çağrı Merkezi Rehberi:** ${SITE_URL}/ai-cagri-merkezi-rehberi — Voice agent, chatbot ve hibrit modeller; Türkiye'deki yerli çözümler; KVKK çerçevesi. 8 destekleyici yazı.

## Dört Uzmanlık Alanı

- **Operasyon Otomasyonu**: Tekrarlayan işleri otomatik sistemlere taşıma. n8n, Make ve benzeri araçlarla sistemler arası veri akışı, otomatik bildirimler, onay süreçleri.
- **Müşteri Hizmetleri Asistanı**: Türkçe ve KVKK uyumlu sesli asistan, firmaya özel eğitilmiş sohbet asistanı. Web, WhatsApp, telefon, e-posta — dört kanal, tek ses.
- **Veri ve Raporlama Otomasyonu**: Dağınık veriyi otomatik birleştirme, canlı kontrol panoları, düzenli otomatik raporlar. Karar verici Excel'den kurtulur.
- **Yapay Zeka Stratejisi ve Kurulum**: Nereden başlamalı, yatırım getirisi ne — haritasını çıkarıyoruz. Bağımsız araç önerisi, otomatik iş asistanları kurulumu, departman bazlı eğitim.

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
