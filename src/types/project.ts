export type ProjectCategory = 'All' | 'Full Stack' | 'SAP' | 'SAP ABAP' | 'Backend' | 'Embedded Systems' | string;

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  category: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  url?: string;
  featured: boolean;
  order: number;
}
