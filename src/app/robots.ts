import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/", "/brand-preview", "/tesekkurler"],
      },
    ],
    sitemap: "https://www.verimio.com.tr/sitemap.xml",
    host: "https://www.verimio.com.tr",
  };
}
