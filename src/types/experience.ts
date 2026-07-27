export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  location: string;
  type: string;
  description: string;
  highlights: string[];
  technologies: string[];
  logo?: string;
  isCurrent?: boolean;
}
