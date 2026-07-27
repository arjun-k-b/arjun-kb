import experienceData from '@/data/experience.json';
import { Experience } from '@/types/experience';

export async function getExperience(): Promise<Experience[]> {
  return experienceData as Experience[];
}
