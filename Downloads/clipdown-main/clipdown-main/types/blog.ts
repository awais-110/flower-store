export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};
