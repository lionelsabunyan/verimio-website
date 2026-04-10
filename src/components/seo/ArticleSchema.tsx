interface ArticleSchemaProps {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author?: string;
  /** @deprecated Use coverImage instead */
  webpExists?: boolean;
  coverImage?: string | null;
}

export default function ArticleSchema({
  slug,
  title,
  excerpt,
  date,
  author,
  webpExists,
  coverImage,
}: ArticleSchemaProps) {
  const hasImage = coverImage ? true : webpExists;
  const imageUrl = coverImage
    ? `https://www.verimio.com.tr${coverImage}`
    : `https://www.verimio.com.tr/images/blog/${slug}.webp`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: excerpt,
    datePublished: date,
    dateModified: date,
    author: {
      "@type": "Organization",
      name: "Verimio",
      url: "https://www.verimio.com.tr",
      logo: {
        "@type": "ImageObject",
        url: "https://www.verimio.com.tr/icon.png",
      },
    },
    publisher: {
      "@type": "Organization",
      name: "Verimio",
      url: "https://www.verimio.com.tr",
      logo: {
        "@type": "ImageObject",
        url: "https://www.verimio.com.tr/icon.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.verimio.com.tr/blog/${slug}`,
    },
    url: `https://www.verimio.com.tr/blog/${slug}`,
    inLanguage: "tr-TR",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["article h1", "article h2", "article p:first-of-type"],
    },
    ...(hasImage
      ? {
          image: {
            "@type": "ImageObject",
            url: imageUrl,
            width: 1200,
            height: 630,
          },
        }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
