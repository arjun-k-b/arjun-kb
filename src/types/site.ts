export interface SiteSectionsVisibility {
  hero?: boolean;
  about?: boolean;
  skills?: boolean;
  experience?: boolean;
  projects?: boolean;
  education?: boolean;
  certificates?: boolean;
  blog?: boolean;
  contact?: boolean;
}

export interface SiteSettings {
  name: string;
  role: string;
  titles: string[];
  bio: string;
  aboutBio: string[];
  services?: string[];
  location: string;
  email: string;
  phone: string;
  availability: string;
  yearsOfExperience: number;
  completedProjects: number;
  codeQuality: number;
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
  sections?: SiteSectionsVisibility;
}
