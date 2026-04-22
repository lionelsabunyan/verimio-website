interface VideoObjectSchemaProps {
  name: string;
  description: string;
  thumbnailUrl: string;
  contentUrl: string;
  uploadDate: string;
  duration: string;
}

// Google VideoObject: uploadDate must be ISO 8601 with timezone.
// Plain YYYY-MM-DD is rejected as invalid datetime.
function toIsoDateTime(input: string): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
    return `${input}T09:00:00+03:00`;
  }
  return input;
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
    uploadDate: toIsoDateTime(uploadDate),
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
