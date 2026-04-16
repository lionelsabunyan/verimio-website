interface ProductSchemaProps {
  name: string;
  description: string;
  url: string;
  price?: string;
  priceCurrency?: string;
  image?: string;
}

export default function ProductSchema({
  name,
  description,
  url,
  price = "0",
  priceCurrency = "TRY",
  image = "https://www.verimio.com.tr/icon.png",
}: ProductSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    image,
    inLanguage: "tr-TR",
    areaServed: {
      "@type": "Country",
      name: "Türkiye",
    },
    provider: {
      "@type": "ProfessionalService",
      name: "Verimio",
      url: "https://www.verimio.com.tr",
    },
    serviceType: "AI Hazırlık Analizi",
    offers: {
      "@type": "Offer",
      price,
      priceCurrency,
      availability: "https://schema.org/InStock",
      url,
      priceValidUntil: "2026-12-31",
    },
  };

  // Safe: all content is static schema definition, not user input
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
