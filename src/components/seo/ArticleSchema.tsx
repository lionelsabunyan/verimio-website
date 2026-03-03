interface ArticleSchemaProps {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author?: string;
  webpExists?: boolean;
}

export default function ArticleSchema({
  slug,
  title,
  excerpt,
  date,
  author,
  webpExists,
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: excerpt,
    datePublished: date,
    dateModified: date,
    author: {
      "@type": "Person",
      name: author ?? "Verimio",
      url: "https://www.verimio.com.tr",
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
    ...(webpExists
      ? {
          image: {
            "@type": "ImageObject",
            url: `https://www.verimio.com.tr/images/blog/${slug}.webp`,
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
