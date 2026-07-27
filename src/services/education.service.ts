import educationData from '@/data/education.json';
import { Education } from '@/types/education';

export async function getEducation(): Promise<Education[]> {
  return educationData as Education[];
}
