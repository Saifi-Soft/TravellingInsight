import { Category as ApiCategory } from '@/lib/api/types';

// Local version of Category to match the API version
export interface Category extends ApiCategory {
  // We extend the ApiCategory type to ensure compatibility
  count?: number;
}

// Mock categories with reliable image URLs
export const categories: Category[] = [
  {
    _id: '1',
    name: 'Adventure',
    slug: 'adventure',
    description: 'Explore thrilling and adrenaline-pumping travel experiences.',
    image: 'photo-1518770660439-4636190af475',
    count: 10,
    created_at: new Date().toISOString()
  },
  {
    _id: '2',
    name: 'Cultural',
    slug: 'cultural',
    description: 'Immerse yourself in the rich cultures and traditions of different destinations.',
    image: 'photo-1477959858617-67f85cf4f1df',
    count: 8,
    created_at: new Date().toISOString()
  },
  {
    _id: '3',
    name: 'Food & Cuisine',
    slug: 'food',
    description: 'Savor the flavors of the world with unique culinary experiences.',
    image: 'photo-1414235077428-338989a2e8c0',
    count: 12,
    created_at: new Date().toISOString()
  },
  {
    _id: '4',
    name: 'Nature',
    slug: 'nature',
    description: 'Discover the beauty and tranquility of natural landscapes.',
    image: 'photo-1447752875215-b2761acb3c5d',
    count: 15,
    created_at: new Date().toISOString()
  },
  {
    _id: '5',
    name: 'Relaxation',
    slug: 'relaxation',
    description: 'Unwind and rejuvenate with peaceful and relaxing getaways.',
    image: 'photo-1520250497591-112f2f40a3f4',
    count: 7,
    created_at: new Date().toISOString()
  },
  {
    _id: '6',
    name: 'Urban',
    slug: 'urban',
    description: 'Explore city life and urban adventures around the world.',
    image: 'photo-1480714378408-67cf0d13bc1b',
    count: 9,
    created_at: new Date().toISOString()
  }
];
