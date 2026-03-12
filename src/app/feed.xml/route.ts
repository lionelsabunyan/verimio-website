import { BLOG_POSTS, BRAND } from "@/lib/constants";

const SITE_URL = "https://www.verimio.com.tr";

const TURKISH_MONTHS: Record<string, number> = {
  Ocak: 0, Şubat: 1, Mart: 2, Nisan: 3,
  Mayıs: 4, Haziran: 5, Temmuz: 6, Ağustos: 7,
  Eylül: 8, Ekim: 9, Kasım: 10, Aralık: 11,
};

function parseTurkishDate(dateStr: string): string {
  const parts = dateStr.split(" ");
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = TURKISH_MONTHS[parts[1]];
    const year = parseInt(parts[2], 10);
    if (!isNaN(day) && month !== undefined && !isNaN(year)) {
      return new Date(year, month, day).toUTCString();
    }
  }
  return new Date().toUTCString();
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const items = BLOG_POSTS.map(
    (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${parseTurkishDate(post.date)}</pubDate>
      <category>${escapeXml(post.category)}</category>
    </item>`
  ).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Verimio Blog — AI &amp; Otomasyon İçerikleri</title>
    <link>${SITE_URL}/blog</link>
    <description>Şirketler için AI araçları, otomasyon stratejileri ve operasyonel verimlilik içerikleri.</description>
    <language>tr</language>
    <managingEditor>${BRAND.email} (Verimio)</managingEditor>
    <lastBuildDate>${parseTurkishDate(BLOG_POSTS[0].date)}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
