import type React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import matter from "gray-matter";
import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { BRAND, BLOG_POSTS } from "@/lib/constants";
import { type BlogCategory } from "@/components/brand/BlogCardImage";
import ArticleSchema from "@/components/seo/ArticleSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import FAQSchema from "@/components/seo/FAQSchema";
import HowToSchema from "@/components/seo/HowToSchema";
import InlineImage from "@/components/blog/InlineImage";
import InlineVideo from "@/components/blog/InlineVideo";
import TableOfContents from "@/components/blog/TableOfContents";
import VideoObjectSchema from "@/components/seo/VideoObjectSchema";
import { extractTocItems } from "@/components/blog/toc-utils";
import { extractFaqFromContent } from "@/lib/blog-schema-extract";

const CONTENT_DIR = path.join(process.cwd(), "src/content/blog");

interface HowToStepFrontmatter {
  name: string;
  text: string;
}

interface PostFrontmatter {
  title: string;
  excerpt: string;
  date: string;
  category: BlogCategory;
  readingTime?: string;
  author?: string;
  howto?: {
    name?: string;
    description?: string;
    totalTime?: string;
    steps: HowToStepFrontmatter[];
  };
}

const categoryLabels: Record<string, string> = {
  "ai-tools": "AI Araçları",
  automation: "Otomasyon",
  data: "Veri & Raporlama",
  strategy: "Strateji",
  security: "Veri Güvenliği",
  customer: "Müşteri Deneyimi",
  roi: "ROI & Verimlilik",
  tutorial: "Rehber",
};

function getPostSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

function findCoverImage(slug: string): string | null {
  for (const ext of [".webp", ".jpg", ".jpeg", ".png"]) {
    if (fs.existsSync(path.join(process.cwd(), "public/images/blog", `${slug}${ext}`))) {
      return `/images/blog/${slug}${ext}`;
    }
  }
  return null;
}

function findBlogVideo(
  slug: string
): { videoUrl: string; posterUrl: string | null } | null {
  const videoPath = path.join(process.cwd(), "public/videos/blog", `${slug}.mp4`);
  if (!fs.existsSync(videoPath)) return null;
  const posterPath = path.join(
    process.cwd(),
    "public/videos/blog/posters",
    `${slug}.webp`
  );
  return {
    videoUrl: `/videos/blog/${slug}.mp4`,
    posterUrl: fs.existsSync(posterPath)
      ? `/videos/blog/posters/${slug}.webp`
      : null,
  };
}

function getPost(
  slug: string
): { frontmatter: PostFrontmatter; content: string } | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { frontmatter: data as PostFrontmatter, content };
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

const TURKISH_MONTHS: Record<string, number> = {
  Ocak: 0, Şubat: 1, Mart: 2, Nisan: 3,
  Mayıs: 4, Haziran: 5, Temmuz: 6, Ağustos: 7,
  Eylül: 8, Ekim: 9, Kasım: 10, Aralık: 11,
};

function toISODate(dateStr: string): string {
  const parts = dateStr.split(" ");
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = TURKISH_MONTHS[parts[1]];
    const year = parseInt(parts[2], 10);
    if (!isNaN(day) && month !== undefined && !isNaN(year)) {
      const mm = String(month + 1).padStart(2, "0");
      const dd = String(day).padStart(2, "0");
      return `${year}-${mm}-${dd}`;
    }
  }
  return new Date().toISOString().slice(0, 10);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Yazı Bulunamadı" };

  const { frontmatter } = post;
  const coverImage = findCoverImage(slug);
  const isoDate = toISODate(frontmatter.date);

  return {
    title: frontmatter.title,
    description: frontmatter.excerpt,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.excerpt,
      type: "article",
      publishedTime: isoDate,
      modifiedTime: isoDate,
      authors: ["Verimio"],
      section: categoryLabels[frontmatter.category] ?? frontmatter.category,
      locale: "tr_TR",
      url: `https://www.verimio.com.tr/blog/${slug}`,
      ...(coverImage
        ? { images: [{ url: coverImage, width: 1200, height: 630 }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.title,
      description: frontmatter.excerpt,
      ...(coverImage ? { images: [coverImage] } : {}),
    },
    alternates: { canonical: `https://www.verimio.com.tr/blog/${slug}` },
  };
}

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/[^\w\sğüşıöçĞÜŞİÖÇ-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

const mdxComponents = {
  h2: (props: { children?: React.ReactNode; [key: string]: unknown }) => {
    const text = typeof props.children === "string" ? props.children : String(props.children ?? "");
    const id = slugify(text);
    return <h2 id={id} className="text-2xl font-bold mt-12 mb-4 text-foreground leading-snug scroll-mt-24" {...props} />;
  },
  h3: (props: { children?: React.ReactNode; [key: string]: unknown }) => {
    const text = typeof props.children === "string" ? props.children : String(props.children ?? "");
    const id = slugify(text);
    return <h3 id={id} className="text-xl font-bold mt-8 mb-3 text-foreground scroll-mt-24" {...props} />;
  },
  p: (props: { children?: React.ReactNode; [key: string]: unknown }) => (
    <p className="text-foreground-secondary leading-[1.8] mb-5" {...props} />
  ),
  ul: (props: { children?: React.ReactNode; [key: string]: unknown }) => (
    <ul className="list-disc list-outside pl-6 mb-5 space-y-2 text-foreground-secondary leading-[1.8]" {...props} />
  ),
  ol: (props: { children?: React.ReactNode; [key: string]: unknown }) => (
    <ol className="list-decimal list-outside pl-6 mb-5 space-y-2 text-foreground-secondary leading-[1.8]" {...props} />
  ),
  li: (props: { children?: React.ReactNode; [key: string]: unknown }) => (
    <li className="leading-[1.8]" {...props} />
  ),
  strong: (props: { children?: React.ReactNode; [key: string]: unknown }) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  em: (props: { children?: React.ReactNode; [key: string]: unknown }) => (
    <em className="italic" {...props} />
  ),
  blockquote: (props: { children?: React.ReactNode; [key: string]: unknown }) => (
    <blockquote className="border-l-2 border-foreground pl-6 my-8 text-foreground italic" {...props} />
  ),
  code: (props: { children?: React.ReactNode; [key: string]: unknown }) => (
    <code className="bg-foreground/5 border border-border px-1.5 py-0.5 text-sm text-foreground" {...props} />
  ),
  pre: (props: { children?: React.ReactNode; [key: string]: unknown }) => (
    <pre className="bg-foreground/[0.03] border border-border p-5 my-6 overflow-x-auto text-sm" {...props} />
  ),
  hr: () => <hr className="border-border my-12" />,
  img: (props: { src?: string; alt?: string }) => (
    <InlineImage src={props.src} alt={props.alt} />
  ),
  InlineVideo: InlineVideo,
  a: (props: { children?: React.ReactNode; href?: string; [key: string]: unknown }) => (
    <a className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors" {...props} />
  ),
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { frontmatter, content } = post;
  const catLabel = categoryLabels[frontmatter.category] ?? frontmatter.category;
  const isoDate = toISODate(frontmatter.date);

  const related = BLOG_POSTS.filter(
    (p) => p.category === frontmatter.category && p.slug !== slug
  ).slice(0, 3);

  const coverImage = findCoverImage(slug);
  const blogVideo = findBlogVideo(slug);
  const faqItems = extractFaqFromContent(content);
  const canonicalUrl = `https://www.verimio.com.tr/blog/${slug}`;

  return (
    <main className="pt-24">
      <ArticleSchema
        slug={slug}
        title={frontmatter.title}
        excerpt={frontmatter.excerpt}
        date={isoDate}
        author={frontmatter.author}
        coverImage={coverImage}
      />
      <BreadcrumbSchema
        items={[
          { name: "Ana Sayfa", url: "https://www.verimio.com.tr" },
          { name: "Blog", url: "https://www.verimio.com.tr/blog" },
          { name: frontmatter.title, url: canonicalUrl },
        ]}
      />
      {faqItems.length > 0 && <FAQSchema items={faqItems} />}
      {blogVideo && (
        <VideoObjectSchema
          name={frontmatter.title}
          description={frontmatter.excerpt}
          thumbnailUrl={`https://www.verimio.com.tr${blogVideo.posterUrl ?? coverImage ?? ""}`}
          contentUrl={`https://www.verimio.com.tr${blogVideo.videoUrl}`}
          uploadDate={isoDate}
          duration="PT20S"
        />
      )}
      {frontmatter.howto && frontmatter.howto.steps?.length > 0 && (
        <HowToSchema
          name={frontmatter.howto.name ?? frontmatter.title}
          description={frontmatter.howto.description ?? frontmatter.excerpt}
          steps={frontmatter.howto.steps}
          totalTime={frontmatter.howto.totalTime}
          url={canonicalUrl}
        />
      )}

      {/* Article header */}
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <Link
          href="/blog"
          className="text-sm text-foreground-muted hover:text-foreground transition-colors"
        >
          ← Blog
        </Link>

        <div className="mt-8 mb-4 flex items-center gap-3 text-sm text-foreground-muted">
          <span>{catLabel}</span>
          <span>·</span>
          <time dateTime={isoDate}>{frontmatter.date}</time>
          {frontmatter.readingTime && (
            <>
              <span>·</span>
              <span>{frontmatter.readingTime} okuma</span>
            </>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
          {frontmatter.title}
        </h1>

        <p className="text-lg text-foreground-secondary leading-relaxed mb-12">
          {frontmatter.excerpt}
        </p>

        <hr className="border-border mb-12" />
      </div>

      {/* Article body — single column, narrow */}
      <article className="max-w-3xl mx-auto px-6 lg:px-8">
        <TableOfContents items={extractTocItems(content)} />
        <MDXRemote
          source={content}
          components={mdxComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <div className="max-w-3xl mx-auto px-6 lg:px-8 mt-16 pt-12 border-t border-border">
          <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-6">
            Benzer yazılar
          </p>
          <div className="space-y-0">
            {related.map((rel, i) => (
              <Link
                key={i}
                href={`/blog/${rel.slug}`}
                className="group flex items-baseline justify-between py-4 border-b border-border"
              >
                <span className="text-foreground font-medium group-hover:text-foreground-secondary transition-colors pr-4">
                  {rel.title}
                </span>
                <span className="text-sm text-foreground-muted shrink-0">
                  {rel.date}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-24">
        <div className="bg-foreground p-8 md:p-12">
          <h2 className="text-2xl font-bold text-background mb-3">
            Firmanız için doğru adımı atın
          </h2>
          <p className="text-background/70 leading-relaxed mb-6 max-w-lg">
            Otomasyon potansiyelinizi ve 90 günlük yol haritanızı
            ücretsiz check-up ile keşfedin.
          </p>
          <Link
            href={BRAND.checkupUrl}
            className="inline-flex items-center px-6 py-3 bg-background text-foreground font-medium text-sm hover:opacity-90 transition-opacity"
          >
            Ücretsiz Check-Up Başlatın
          </Link>
        </div>
      </div>
    </main>
  );
}
