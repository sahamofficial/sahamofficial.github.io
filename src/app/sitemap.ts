import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-09-08");

  return [
    { url: "https://sahamofficial.github.io", lastModified, changeFrequency: "monthly", priority: 1 },
    { url: "https://sahamofficial.github.io/privacy-policy", lastModified, changeFrequency: "yearly", priority: 0.5 },
    { url: "https://sahamofficial.github.io/terms", lastModified, changeFrequency: "yearly", priority: 0.5 },
  ];
}
