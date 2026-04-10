import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BASE_URL = "https://www.verimio.com.tr";
const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

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

/** Read all MDX files and extract slug + date from frontmatter */
function getBlogEntries(): { slug: string; lastModified: Date }[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8");
      const { data } = matter(raw);

      // Use frontmatter date, fall back to file mtime
      const frontmatterDate = data.date ? parseTurkishDate(data.date) : null;
      const fileStat = fs.statSync(path.join(BLOG_DIR, filename));
      const lastModified = frontmatterDate ?? fileStat.mtime;

      return { slug, lastModified };
    })
    .sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime());
}

export default function sitemap(): MetadataRoute.Sitemap {
  const blogEntries = getBlogEntries();
  const latestBlogDate = blogEntries[0]?.lastModified ?? new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: latestBlogDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/hizmetler`,
      lastModified: new Date("2026-04-10"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/ai-koclugu`,
      lastModified: new Date("2026-04-10"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/hakkimizda`,
      lastModified: new Date("2026-04-10"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/analiz`,
      lastModified: new Date("2026-04-10"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: latestBlogDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/sss`,
      lastModified: new Date("2026-04-10"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/iletisim`,
      lastModified: new Date("2026-04-10"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/gizlilik`,
      lastModified: new Date("2026-02-01"),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/kullanim-sartlari`,
      lastModified: new Date("2026-02-01"),
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];

  // Category pages — only categories that have posts
  const categoriesWithPosts = [
    ...new Set(blogEntries.map((e) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, `${e.slug}.mdx`), "utf-8");
      const { data } = matter(raw);
      return data.category as string;
    }).filter(Boolean)),
  ];

  const categoryPages: MetadataRoute.Sitemap = categoriesWithPosts.map((cat) => ({
    url: `${BASE_URL}/blog/kategori/${cat}`,
    lastModified: latestBlogDate,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const blogPages: MetadataRoute.Sitemap = blogEntries.map((entry) => ({
    url: `${BASE_URL}/blog/${entry.slug}`,
    lastModified: entry.lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...categoryPages, ...blogPages];
}
