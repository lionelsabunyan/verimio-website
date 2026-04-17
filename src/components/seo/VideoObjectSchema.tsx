interface VideoObjectSchemaProps {
  name: string;
  description: string;
  thumbnailUrl: string;
  contentUrl: string;
  uploadDate: string;
  duration: string;
}

export default function VideoObjectSchema({
  name,
  description,
  thumbnailUrl,
  contentUrl,
  uploadDate,
  duration,
}: VideoObjectSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl,
    contentUrl,
    uploadDate,
    duration,
    publisher: {
      "@type": "Organization",
      name: "Verimio",
      logo: {
        "@type": "ImageObject",
        url: "https://www.verimio.com.tr/logo.png",
      },
    },
    inLanguage: "tr-TR",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
