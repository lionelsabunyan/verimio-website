export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Verimio",
    alternateName: "Verimio Kurumsal AI Danışmanlığı",
    url: "https://www.verimio.com.tr",
    logo: "https://www.verimio.com.tr/icon.png",
    image: "https://www.verimio.com.tr/icon.png",
    description:
      "Yapay zekayla çalışan bir kurumsal danışmanlık ekibi. Operasyon otomasyonu, müşteri hizmetleri AI'ı, veri & raporlama, AI strateji & agent kurulumu — dört uzmanlık alanı.",
    slogan: "Yapay zeka, ekibinizin en verimli üyesi.",
    email: "analiz@verimio.com.tr",
    foundingDate: "2025",
    address: {
      "@type": "PostalAddress",
      addressCountry: "TR",
      addressRegion: "İstanbul",
    },
    areaServed: [
      { "@type": "Country", name: "Türkiye" },
      { "@type": "City", name: "İstanbul" },
      { "@type": "City", name: "İzmir" },
    ],
    inLanguage: "tr-TR",
    sameAs: [
      "https://www.linkedin.com/company/verimio",
    ],
    serviceType: [
      "AI Dönüşüm Danışmanlığı",
      "Operasyon Otomasyonu",
      "Müşteri Hizmetleri AI'ı",
      "Veri & Raporlama Otomasyonu",
      "AI Strateji & Agent Kurulumu",
      "Voice AI",
      "AI Agent Geliştirme",
      "Kurumsal AI Eğitimi",
    ],
    knowsAbout: [
      "Artificial Intelligence",
      "Yapay Zeka Dönüşümü",
      "AI Coaching",
      "Kurumsal AI Eğitimi",
      "İş Süreci Otomasyonu",
      "n8n",
      "Make.com",
      "ChatGPT Enterprise",
      "Claude",
      "AI Agent",
      "Voice AI Çağrı Merkezi",
      "KVKK Uyumu",
      "Supabase",
      "Retrieval-Augmented Generation",
      "Prompt Mühendisliği",
      "ROI Analizi",
    ],
    knowsLanguage: ["tr", "en"],
    offers: {
      "@type": "Offer",
      name: "Şirket Check-Up",
      price: "0",
      priceCurrency: "TRY",
      description:
        "Ücretsiz operasyonel verimlilik analizi ve 90 günlük AI yol haritası",
      url: "https://www.verimio.com.tr/analiz",
      availability: "https://schema.org/InStock",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "analiz@verimio.com.tr",
      contactType: "customer service",
      areaServed: "TR",
      availableLanguage: ["tr", "en"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
