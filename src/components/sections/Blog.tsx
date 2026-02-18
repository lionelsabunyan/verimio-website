import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BLOG_POSTS } from "@/lib/constants";
import BlogCardImage from "@/components/brand/BlogCardImage";
import SectionLabel from "@/components/ui/SectionLabel";

export default function Blog() {
  return (
    <section className="section-padding bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <SectionLabel className="mb-4">Blog</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-bold">Son Yazılar</h2>
          </div>
          <Link
            href="/blog"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 border border-border text-foreground font-medium text-sm rounded-full hover:border-border-accent hover:text-primary dark:hover:text-primary-light transition-all"
          >
            Tüm Yazılar
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, index) => (
            <Link
              key={index}
              href={`/blog/${post.slug}`}
              className="group"
            >
              <article className="p-6 rounded-2xl border border-border hover:border-border-accent transition-all duration-300 h-full flex flex-col bg-surface-elevated">
                {/* Branded image pattern */}
                <BlogCardImage index={index} title={post.title} className="mb-6" />

                <div className="text-sm text-foreground-secondary mb-3">{post.date}</div>
                <h3 className="text-lg font-semibold mb-3 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                  {post.title}
                </h3>
                <p className="text-foreground-secondary text-sm leading-relaxed flex-grow">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-2 mt-4 text-sm font-medium text-primary-light group-hover:text-primary dark:group-hover:text-secondary transition-colors">
                  Devamını Oku
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </article>
            </Link>
          ))}
        </div>

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
