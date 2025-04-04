import type { Post, WPPost } from './interfaces';

const domine = import.meta.env.WP_DOMAIN;
const apiUrl = `${domine}/wp-json/wp/v2`;

// Credenciales en Base64
const token = btoa(`${import.meta.env.WP_USER}:${import.meta.env.WP_APP_PASSWORD}`);

export const getPageInfo = async (slug: string) => {
  const response = await fetch(`${apiUrl}/pages?slug=${slug}`);

  if (!response.ok) throw new Error('Failed to fetch page info');

  const [data] = await response.json();
  const {
    title: { rendered: title },
    content: { rendered: content }
  } = data;

  return { title, content };
};

export const getLatestPosts = async ({ perPage = 10 }: { perPage: number }) => {
  const response = await fetch(`${apiUrl}/posts?per_page=${perPage}&_embed&status=publish,future`, {
    headers: {
      Authorization: `Basic ${token}`
    }
  });

  if (!response.ok) throw new Error('Failed to fetch posts');

  const result = await response.json();
  if (!result.length) throw new Error('No posts found');

  const posts: Post[] = result.map((post: WPPost) => {
    const {
      title: { rendered: title },
      excerpt: { rendered: excerpt },
      content: { rendered: content },
      date,
      slug
    } = post;

    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

    return { title, excerpt, content, date, slug, featuredImage };
  });

  return posts;
};
