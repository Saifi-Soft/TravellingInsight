import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import { Post as ApiPost, Category as ApiCategory, Author as ApiAuthor } from '@/lib/api/types';

// Post interface for data layer (will map to API Post interface)
export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string;
  created_at: string;
  updated_at: string;
  author_id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    bio: string;
  };
  categories: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  featured: boolean;
  published: boolean;
  slug: string;
  read_time: number;
}

// Convert API post to data layer post
const convertApiPostToPost = (apiPost: ApiPost): Post => {
  return {
    id: apiPost._id,
    title: apiPost.title,
    excerpt: apiPost.excerpt,
    content: apiPost.content,
    cover_image: apiPost.cover_image,
    created_at: apiPost.created_at,
    updated_at: apiPost.updated_at,
    author_id: apiPost.author_id,
    author: apiPost.author ? {
      id: apiPost.author._id,
      name: apiPost.author.name,
      avatar: apiPost.author.avatar,
      bio: apiPost.author.bio
    } : {
      id: '',
      name: 'Unknown',
      avatar: '/placeholder.svg',
      bio: ''
    },
    categories: apiPost.categories ? apiPost.categories.map(cat => ({
      id: cat._id,
      name: cat.name,
      slug: cat.slug
    })) : [],
    featured: apiPost.featured,
    published: apiPost.published,
    slug: apiPost.slug,
    read_time: apiPost.read_time
  };
};

export const getPosts = async (): Promise<Post[]> => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.POSTS);
    const apiPosts = response.data as ApiPost[];
    return apiPosts.map(convertApiPostToPost);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.POST_BY_SLUG(slug));
    const post = response.data as ApiPost;
    return convertApiPostToPost(post);
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return null;
  }
};

export const searchPosts = async (query: string): Promise<Post[]> => {
  try {
    const response = await apiClient.get(`${API_ENDPOINTS.SEARCH_POSTS}?q=${encodeURIComponent(query)}`);
    const apiPosts = response.data as ApiPost[];
    return apiPosts.map(convertApiPostToPost);
  } catch (error) {
    console.error('Error searching posts:', error);
    return [];
  }
};

export const getRelatedPosts = async (postId: string): Promise<Post[]> => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.RELATED_POSTS(postId));
    const apiPosts = response.data as ApiPost[];
    return apiPosts.map(convertApiPostToPost);
  } catch (error) {
    console.error(`Error fetching related posts for post ${postId}:`, error);
    return [];
  }
};