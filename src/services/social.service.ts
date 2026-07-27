import socialLinksData from '@/data/social-links.json';
import { SocialLink } from '@/types/social';

export async function getSocialLinks(): Promise<SocialLink[]> {
  return socialLinksData as SocialLink[];
}
