interface Race {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  featuredImage: string;
}

export interface Props {
  title: string;
  data: Race[];
  variant?: 'upcoming' | 'past';
}
