import type { MetadataRoute } from 'next';
import { SITE } from '@/constants/site';
import { href, locales } from '@/lib/i18n';

const PATHS = ['/', '/menu', '/about', '/gallery', '/faq', '/contact', '/privacy', '/terms'];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return locales.flatMap((locale) =>
    PATHS.map((path) => ({
      url: `${SITE.url}${href(locale, path)}`,
      lastModified: now,
      changeFrequency: path === '/menu' ? ('weekly' as const) : ('monthly' as const),
      priority: path === '/' ? 1 : path === '/menu' ? 0.9 : 0.6,
      alternates: {
        languages: {
          ar: `${SITE.url}${href('ar', path)}`,
          en: `${SITE.url}${href('en', path)}`,
        },
      },
    })),
  );
}
