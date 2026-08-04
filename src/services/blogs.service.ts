import blogsData from '@/data/blogs.json';
import { BlogPost } from '@/types/blog';

export async function getBlogs(): Promise<BlogPost[]> {
  return blogsData as BlogPost[];
}
