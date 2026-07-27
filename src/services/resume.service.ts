import resumeData from '@/data/resume.json';
import { ResumeData } from '@/types/resume';

export async function getResumeData(): Promise<ResumeData> {
  return resumeData as ResumeData;
}
