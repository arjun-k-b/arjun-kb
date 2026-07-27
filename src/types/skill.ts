export type SkillCategoryName = 'Frontend' | 'Backend' | 'SAP' | 'Database' | 'Cloud' | 'Tools';

export interface Skill {
  name: string;
  icon: string;
  level: number;
  experience: string;
  featured?: boolean;
}

export interface SkillCategory {
  id: string;
  category: SkillCategoryName;
  description: string;
  skills: Skill[];
}
