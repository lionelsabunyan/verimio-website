export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Verimio",
    url: "https://www.verimio.com.tr",
    logo: "https://www.verimio.com.tr/icon.png",
    description:
      "Kurumsal AI danışmanlığı, süreç analizi ve iş akışı otomasyonu. Şirketinizin operasyonel verimliliğini artırıyoruz.",
    email: "analiz@verimio.com.tr",
    areaServed: "TR",
    inLanguage: "tr-TR",
    sameAs: [],
    serviceType: [
      "Süreç Analizi",
      "AI Danışmanlığı",
      "İş Akışı Otomasyonu",
      "Veri Raporlama",
      "Müşteri Deneyimi Otomasyonu",
    ],
    offers: {
      "@type": "Offer",
      name: "Şirket Check-Up",
      price: "0",
      priceCurrency: "TRY",
      description: "Ücretsiz operasyonel verimlilik analizi ve yol haritası",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
