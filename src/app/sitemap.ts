import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/constants";

const BASE_URL = "https://www.verimio.com.tr";

const TURKISH_MONTHS: Record<string, number> = {
  "Ocak": 0, "Şubat": 1, "Mart": 2, "Nisan": 3,
  "Mayıs": 4, "Haziran": 5, "Temmuz": 6, "Ağustos": 7,
  "Eylül": 8, "Ekim": 9, "Kasım": 10, "Aralık": 11,
};

function parseTurkishDate(dateStr: string): Date {
  const parts = dateStr.split(" ");
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = TURKISH_MONTHS[parts[1]];
    const year = parseInt(parts[2], 10);
    if (!isNaN(day) && month !== undefined && !isNaN(year)) {
      return new Date(year, month, day);
    }
  }
  return new Date();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date("2026-03-12"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/hizmetler`,
      lastModified: new Date("2026-02-19"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/hakkimizda`,
      lastModified: new Date("2026-02-19"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/analiz`,
      lastModified: new Date("2026-02-19"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date("2026-03-12"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/sss`,
      lastModified: new Date("2026-02-19"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/iletisim`,
      lastModified: new Date("2026-02-19"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/gizlilik`,
      lastModified: new Date("2026-02-01"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/kullanim-sartlari`,
      lastModified: new Date("2026-02-01"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: parseTurkishDate(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}
