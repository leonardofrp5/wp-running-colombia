export interface WPPost {
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  slug: string;
  _embedded?: {
    'wp:featuredmedia'?: { source_url: string }[];
  };
}

export interface Post {
  title: string;
  excerpt: string;
  content: string;
  date: string;
  slug: string;
  featuredImage: string;
}
