export interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  author_id: string;
  featured: boolean;
  published: boolean;
  read_time: number;
  created_at: string;
  updated_at: string;
  author?: Author;
  categories?: Category[];
}

export interface Author {
  _id: string;
  name: string;
  avatar: string;
  bio: string;
  created_at: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  count?: number;
  created_at: string;
}

export interface Comment {
  _id: string;
  post_id: string;
  name: string;  // Changed from user_name to name to match component usage
  email: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  approved?: boolean; // Added for backward compatibility
}

export interface Subscriber {
  _id: string;
  email: string;
  created_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  message?: string;
}

export interface ErrorResponse {
  success: false;
  message: string;
  status: number;
}
