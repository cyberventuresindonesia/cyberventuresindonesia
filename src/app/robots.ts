import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/private/"],
    },
    sitemap: "https://cyberventuresindonesia.com/sitemap.xml",
    host: "https://cyberventuresindonesia.com",
  };
}
