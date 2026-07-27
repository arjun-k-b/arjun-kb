export type ProjectCategory = 'All' | 'Full Stack' | 'SAP' | 'Frontend' | 'Cloud';

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  category: ProjectCategory;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  order: number;
}
