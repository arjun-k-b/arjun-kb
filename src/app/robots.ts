import { MetadataRoute } from 'next';
import { getSiteSettings } from '@/services/site.service';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const siteSettings = await getSiteSettings();

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${siteSettings.seo.siteUrl}/sitemap.xml`,
  };
}
