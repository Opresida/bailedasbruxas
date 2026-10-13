import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/evento';

// A página da festa é pública; a portaria e a entrada de nomes ficam fora da busca.
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: '*', allow: '/', disallow: ['/lista', '/api/'] }], sitemap: `${SITE_URL}/sitemap.xml` };
}
