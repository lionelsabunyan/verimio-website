import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BLOG_POSTS } from "@/lib/constants";
import BlogCoverImage from "@/components/brand/BlogCoverImage";
import SectionLabel from "@/components/ui/SectionLabel";
import BlogGrid from "@/components/sections/BlogGrid";

export default function Blog() {
  const cards = BLOG_POSTS.slice(0, 6).map((post, index) => (
    <Link key={index} href={`/blog/${post.slug}`} className="group block h-full">
      <article className="relative rounded-2xl overflow-hidden h-full bg-surface-elevated border border-border hover:border-border-accent transition-all duration-300 glow-card">
        {/* Image — let BlogCoverImage handle its own aspect ratio */}
        <div className="relative overflow-hidden">
          <div className="transition-transform duration-700 group-hover:scale-105">
            <BlogCoverImage slug={post.slug} title={post.title} category={post.category} index={index} aspectRatio="video" />
          </div>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          {/* Date badge */}
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-sm text-[11px] font-medium text-white/90">
              {post.date}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-base font-semibold mb-2 leading-snug group-hover:text-primary-light transition-colors line-clamp-2">
            {post.title}
          </h3>
          <div className="flex items-center gap-1.5 text-xs font-medium text-primary-light">
            Oku
            <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </article>
    </Link>
  ));

  return (
    <section className="section-padding bg-background-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <SectionLabel className="mb-3">Blog</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-bold">Güncel İçerikler</h2>
          </div>
          <Link
            href="/blog"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 border border-border text-foreground font-medium text-sm rounded-full hover:border-border-accent hover:text-primary-light transition-all"
          >
            Tüm Yazılar
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <BlogGrid>{cards}</BlogGrid>

        {/* Mobile CTA */}
        <div className="md:hidden mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-foreground font-medium text-sm rounded-full"
          >
            Tüm Yazıları Gör
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
