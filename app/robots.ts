import type { MetadataRoute } from 'next';
import { SITE } from '@/constants/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/ar/order', '/en/order'] },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
