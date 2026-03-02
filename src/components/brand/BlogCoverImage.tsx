/**
 * BlogCoverImage — Merkezi kapak görsel bileşeni
 *
 * Öncelik sırası:
 * 1. public/images/blog/{slug}.webp varsa → Next.js Image
 * 2. Yoksa → SVG pattern (BlogCardImage) — geriye dönük uyumlu
 *
 * Kullanım:
 *   <BlogCoverImage slug={post.slug} title={post.title} category={post.category} index={i} />
 */

import Image from "next/image";
import fs from "fs";
import path from "path";
import BlogCardImage, { type BlogCategory } from "@/components/brand/BlogCardImage";

interface BlogCoverImageProps {
  slug: string;
  title: string;
  category: BlogCategory;
  index?: number;
  className?: string;
  /** aspect-video (16/9) veya blog-standard (1200/630) */
  aspectRatio?: "video" | "cover";
}

const IMAGES_DIR = path.join(process.cwd(), "public/images/blog");

export default function BlogCoverImage({
  slug,
  title,
  category,
  index = 0,
  className = "",
  aspectRatio = "cover",
}: BlogCoverImageProps) {
  const webpPath = path.join(IMAGES_DIR, `${slug}.webp`);
  const hasWebp = fs.existsSync(webpPath);
  const aspectClass = aspectRatio === "video" ? "aspect-video" : "aspect-[1200/630]";

  if (hasWebp) {
    return (
      <div className={`relative w-full ${aspectClass} rounded-xl overflow-hidden ${className}`}>
        <Image
          src={`/images/blog/${slug}.webp`}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
    );
  }

  return (
    <BlogCardImage
      index={index}
      title={title}
      category={category}
      className={className}
    />
  );
}
