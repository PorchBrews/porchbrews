import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://porchbrews.com';
  const pages = ['/', '/advertise', '/plus', '/loco/bars', '/loco/coffee', '/chs/bars', '/chs/coffee'];
  const now = new Date().toISOString();
  return pages.map(p => ({ url: `${base}${p}`, lastModified: now as any, changeFrequency: 'weekly', priority: p==='/'? 1 : 0.8 }));
}
