import type React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Calendar, Clock, Tag } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import matter from "gray-matter";
import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { BRAND, BLOG_POSTS } from "@/lib/constants";
import BlogCardImage, { type BlogCategory } from "@/components/brand/BlogCardImage";

const CONTENT_DIR = path.join(process.cwd(), "src/content/blog");

interface PostFrontmatter {
  title: string;
  excerpt: string;
  date: string;
  category: BlogCategory;
  readingTime?: string;
  author?: string;
}

const categoryLabels: Record<string, string> = {
  "ai-tools": "AI Araçları",
  "automation": "Otomasyon",
  "data": "Veri & Raporlama",
  "strategy": "Strateji",
  "security": "Veri Güvenliği",
  "customer": "Müşteri Deneyimi",
  "roi": "ROI & Verimlilik",
  "tutorial": "Rehber",
};

function getPostSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

function getPost(slug: string): { frontmatter: PostFrontmatter; content: string } | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { frontmatter: data as PostFrontmatter, content };
}

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) {
    return { title: "Yazı Bulunamadı | Verimio Blog" };
  }
  const { frontmatter } = post;
  return {
    title: `${frontmatter.title} | Verimio Blog`,
    description: frontmatter.excerpt,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.excerpt,
      type: "article",
      publishedTime: frontmatter.date,
    },
  };
}

// MDX custom components — matches site design system
const mdxComponents = {
  h2: (props: { children?: React.ReactNode; [key: string]: unknown }) => (
    <h2
      className="text-2xl font-bold mt-10 mb-4 text-foreground leading-snug"
      {...props}
    />
  ),
  h3: (props: { children?: React.ReactNode; [key: string]: unknown }) => (
    <h3
      className="text-xl font-semibold mt-8 mb-3 text-foreground"
      {...props}
    />
  ),
  p: (props: { children?: React.ReactNode; [key: string]: unknown }) => (
    <p
      className="text-foreground-secondary leading-relaxed mb-5 text-base"
      {...props}
    />
  ),
  ul: (props: { children?: React.ReactNode; [key: string]: unknown }) => (
    <ul className="list-disc list-outside pl-6 mb-5 space-y-2 text-foreground-secondary" {...props} />
  ),
  ol: (props: { children?: React.ReactNode; [key: string]: unknown }) => (
    <ol className="list-decimal list-outside pl-6 mb-5 space-y-2 text-foreground-secondary" {...props} />
  ),
  li: (props: { children?: React.ReactNode; [key: string]: unknown }) => (
    <li className="leading-relaxed" {...props} />
  ),
  strong: (props: { children?: React.ReactNode; [key: string]: unknown }) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  em: (props: { children?: React.ReactNode; [key: string]: unknown }) => (
    <em className="italic text-foreground-secondary" {...props} />
  ),
  blockquote: (props: { children?: React.ReactNode; [key: string]: unknown }) => (
    <blockquote
      className="border-l-4 border-primary pl-5 my-6 text-foreground-secondary italic"
      {...props}
    />
  ),
  code: (props: { children?: React.ReactNode; [key: string]: unknown }) => (
    <code
      className="bg-surface border border-border rounded px-1.5 py-0.5 text-sm font-mono text-primary-light"
      {...props}
    />
  ),
  pre: (props: { children?: React.ReactNode; [key: string]: unknown }) => (
    <pre
      className="bg-surface border border-border rounded-xl p-5 my-6 overflow-x-auto text-sm font-mono"
      {...props}
    />
  ),
  hr: () => (
    <hr className="border-border my-10" />
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

  // Related posts: same category, different slug (from constants)
  const related = BLOG_POSTS.filter(
    (p) => p.category === frontmatter.category && p.slug !== slug
  ).slice(0, 2);

  return (
    <main className="pt-20">
      {/* Header */}
      <section className="section-padding pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-foreground-secondary hover:text-primary-light transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Blog
          </Link>

          {/* Category badge */}
          <div className="flex items-center gap-3 mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary-light">
              <Tag className="w-3 h-3" />
              {catLabel}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6 max-w-3xl">
            {frontmatter.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-foreground-secondary mb-10 pb-10 border-b border-border">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {frontmatter.date}
            </span>
            {frontmatter.readingTime && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {frontmatter.readingTime} okuma
              </span>
            )}
            {frontmatter.author && (
              <span className="text-foreground-secondary">
                {frontmatter.author}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Article */}
            <article className="lg:col-span-8">
              <MDXRemote source={content} components={mdxComponents} />
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-28 space-y-6">
                {/* CTA Card */}
                <div className="bg-surface border border-border rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    <span className="text-xs font-semibold text-foreground-secondary tracking-widest uppercase">
                      Ücretsiz
                    </span>
                  </div>
                  <h3 className="text-base font-bold mb-2">
                    Şirketinizin Otomasyon Hazırlığını Öğrenin
                  </h3>
                  <p className="text-sm text-foreground-secondary leading-relaxed mb-5">
                    90 günlük yol haritanız ve otomasyon potansiyeliniz için
                    Check-Up sürecini başlatın.
                  </p>
                  <Link
                    href={BRAND.tallyFormUrl}
                    className="inline-flex items-center gap-2 w-full justify-center px-5 py-3 bg-secondary text-primary font-semibold rounded-full hover:bg-secondary-hover transition-all duration-200 text-sm"
                  >
                    Ücretsiz Check-Up
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Related posts */}
                {related.length > 0 && (
                  <div className="bg-surface border border-border rounded-2xl p-6">
                    <p className="text-xs font-semibold text-foreground-secondary tracking-widest uppercase mb-4">
                      İlgili Yazılar
                    </p>
                    <div className="space-y-4">
                      {related.map((rel, i) => (
                        <Link
                          key={i}
                          href={`/blog/${rel.slug}`}
                          className="group flex gap-3 items-start"
                        >
                          <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                            <BlogCardImage
                              index={i}
                              title={rel.title}
                              category={rel.category}
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium leading-snug group-hover:text-primary-light transition-colors">
                              {rel.title}
                            </p>
                            <p className="text-xs text-foreground-secondary mt-0.5">
                              {rel.date}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-padding bg-background-secondary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Firmanız için{" "}
            <span className="gradient-text">doğru adımı atın</span>
          </h2>
          <p className="text-foreground-secondary leading-relaxed mb-8">
            Otomasyon potansiyelinizi, tasarruf fırsatlarınızı ve 90 günlük
            yol haritanızı ücretsiz check-up ile keşfedin.
          </p>
          <Link
            href={BRAND.tallyFormUrl}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-secondary text-primary font-semibold rounded-full hover:bg-secondary-hover transition-all duration-200 hover:shadow-lg hover:shadow-secondary/25 text-sm"
          >
            Ücretsiz Check-Up Başlatın
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
