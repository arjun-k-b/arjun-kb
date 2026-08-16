export type SkillCategoryName =
  | 'Frontend'
  | 'Backend'
  | 'SAP'
  | 'Database'
  | 'Cloud'
  | 'Cloud & DevOps'
  | 'Tools'
  | string;

export interface Skill {
  name: string;
  icon: string;
  level: number;
  experience: string;
  featured?: boolean;
}

export interface SkillCategory {
  id: string;
  category: string;
  description: string;
  skills: Skill[];
}
