import siteSettingsData from '@/data/site-settings.json';
import { SiteSettings } from '@/types/site';

export async function getSiteSettings(): Promise<SiteSettings> {
  return siteSettingsData as SiteSettings;
}
