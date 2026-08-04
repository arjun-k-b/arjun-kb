export type BlogCategory =
  | 'All'
  | 'Full Stack'
  | 'SAP & Enterprise'
  | 'AI & Automation'
  | 'Web Development'
  | 'Tutorials';

export interface BlogAuthor {
  name: string;
  avatar: string;
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  thumbnail: string;
  date: string;
  category: BlogCategory;
  readTime: string;
  likes: number;
  author: BlogAuthor;
  tags: string[];
  featured?: boolean;
}
