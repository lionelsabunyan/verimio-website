import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BLOG_POSTS } from "@/lib/constants";

export default function Blog() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold">Son Yazılar</h2>
          </div>
          <Link
            href="/blog"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 border border-foreground/20 text-foreground font-medium text-sm rounded-full hover:border-primary-light hover:text-primary transition-all"
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
              <article className="p-6 rounded-2xl border border-foreground/5 hover:border-primary-light/20 transition-all duration-300 h-full flex flex-col">
                {/* Placeholder image area */}
                <div className="w-full h-48 rounded-xl bg-gradient-to-br from-primary/5 to-primary-light/10 mb-6 flex items-center justify-center">
                  <span className="text-4xl opacity-30">📝</span>
                </div>

                <div className="text-sm text-muted mb-3">{post.date}</div>
                <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed flex-grow">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-2 mt-4 text-sm font-medium text-primary-light group-hover:text-primary transition-colors">
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
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-foreground/20 text-foreground font-medium text-sm rounded-full"
          >
            Tüm Yazıları Gör
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
