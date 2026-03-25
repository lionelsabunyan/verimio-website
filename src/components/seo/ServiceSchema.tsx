interface ServiceItem {
  name: string;
  description: string;
}

interface ServiceSchemaProps {
  services: ServiceItem[];
}

export default function ServiceSchema({ services }: ServiceSchemaProps) {
  const schema = services.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    provider: {
      "@type": "Organization",
      name: "Verimio",
      url: "https://www.verimio.com.tr",
    },
    name: service.name,
    description: service.description,
    areaServed: "TR",
    inLanguage: "tr-TR",
  }));

  // Safe: all data is hardcoded service definitions, not user input
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
