import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/evento';

// A página da festa é pública.
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: '*', allow: '/' }], sitemap: `${SITE_URL}/sitemap.xml` };
}
