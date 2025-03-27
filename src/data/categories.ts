
export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
  count: number;
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Adventure',
    description: 'Thrilling activities and daring escapades from around the world',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=2070&auto=format&fit=crop',
    slug: 'adventure',
    count: 12
  },
  {
    id: '2',
    name: 'Asia',
    description: 'Explore the diverse cultures and landscapes of Asia',
    image: 'https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?q=80&w=2070&auto=format&fit=crop',
    slug: 'asia',
    count: 18
  },
  {
    id: '3',
    name: 'Cultural',
    description: 'Immerse yourself in the world\'s rich cultural heritage',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop',
    slug: 'cultural',
    count: 9
  },
  {
    id: '4',
    name: 'Food',
    description: 'Culinary journeys and gastronomic delights from across the globe',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop',
    slug: 'food',
    count: 14
  },
  {
    id: '5',
    name: 'Budget',
    description: 'Tips and guides for traveling on a budget',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011&auto=format&fit=crop',
    slug: 'budget',
    count: 7
  },
  {
    id: '6',
    name: 'Europe',
    description: 'Discover the charm and history of European destinations',
    image: 'https://images.unsplash.com/photo-1503917988258-f87a78e3c995?q=80&w=1974&auto=format&fit=crop',
    slug: 'europe',
    count: 16
  }
];
