export interface SiteSettings {
  name: string;
  role: string;
  titles: string[];
  bio: string;
  aboutBio: string[];
  location: string;
  email: string;
  phone: string;
  availability: string;
  yearsOfExperience: number;
  completedProjects: number;
  satisfiedClients: number;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  heroImage: string;
  aboutImage: string;
  resumePdf: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
    author: string;
    siteUrl: string;
    ogImage: string;
  };
}
