import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-09-08");

  return [
    { url: "https://sahamali.dev", lastModified, changeFrequency: "monthly", priority: 1 },
    { url: "https://sahamali.dev/about", lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://sahamali.dev/portfolio", lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://sahamali.dev/contact", lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: "https://sahamali.dev/blog", lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: "https://sahamali.dev/blog/laravel-api-react", lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: "https://sahamali.dev/blog/tailwind-to-react", lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: "https://sahamali.dev/blog/shipping-client-site", lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: "https://sahamali.dev/privacy-policy", lastModified, changeFrequency: "yearly", priority: 0.5 },
    { url: "https://sahamali.dev/terms", lastModified, changeFrequency: "yearly", priority: 0.5 },
  ];
}
