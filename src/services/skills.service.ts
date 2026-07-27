import skillsData from '@/data/skills.json';
import { SkillCategory } from '@/types/skill';

export async function getSkills(): Promise<SkillCategory[]> {
  return skillsData as SkillCategory[];
}
