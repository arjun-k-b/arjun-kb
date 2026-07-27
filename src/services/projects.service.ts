import projectsData from '@/data/projects.json';
import { Project, ProjectCategory } from '@/types/project';

export async function getProjects(category?: ProjectCategory): Promise<Project[]> {
  const projects = projectsData as Project[];
  if (!category || category === 'All') {
    return projects.sort((a, b) => a.order - b.order);
  }
  return projects
    .filter((p) => p.category === category)
    .sort((a, b) => a.order - b.order);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = projectsData as Project[];
  return projects.filter((p) => p.featured).sort((a, b) => a.order - b.order);
}
