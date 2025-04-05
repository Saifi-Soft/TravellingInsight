import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { categories as mockCategories, Category } from '@/data/categories';
import { Post } from '@/data/posts';
import { toast } from 'sonner';
import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import { Post as ApiPost, Category as ApiCategory, Comment as ApiComment } from '@/lib/api/types';

// Context type definition
export interface DataContextType {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  post: ApiPost | null;
  setPost: React.Dispatch<React.SetStateAction<ApiPost | null>>;
  comments: ApiComment[];
  setComments: React.Dispatch<React.SetStateAction<ApiComment[]>>;
  addPost: (post: Post) => void;
  updatePost: (post: Post) => void;
  deletePost: (id: string) => void;
  updateComment: (id: string, status: 'pending' | 'approved' | 'rejected') => void;
  loading: boolean;
}

// Create context with default values
const DataContext = createContext<DataContextType>({
  posts: [],
  setPosts: () => {},
  categories: [],
  setCategories: () => {},
  post: null,
  setPost: () => {},
  comments: [],
  setComments: () => {},
  addPost: () => {},
  updatePost: () => {},
  deletePost: () => {},
  updateComment: () => {},
  loading: true,
});

// Provider component
export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State for all our data
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [post, setPost] = useState<ApiPost | null>(null);
  const [comments, setComments] = useState<ApiComment[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        
        // Fetch posts
        const postsResponse = await apiClient.get(API_ENDPOINTS.POSTS);
        if (postsResponse.data) {
          // Convert API posts to our frontend format
          const formattedPosts: Post[] = postsResponse.data.map((apiPost: ApiPost) => ({
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
          }));
          setPosts(formattedPosts);
        }
        
        // Fetch categories
        const categoriesResponse = await apiClient.get(API_ENDPOINTS.CATEGORIES);
        if (categoriesResponse.data) {
          // Convert API categories to our frontend format
          const formattedCategories: Category[] = categoriesResponse.data.map((apiCat: ApiCategory) => ({
            id: apiCat._id,
            name: apiCat.name,
            slug: apiCat.slug,
            description: apiCat.description,
            image: apiCat.image,
            count: apiCat.count || 0
          }));
          setCategories(formattedCategories);
        }
      } catch (error) {
        console.error('Error fetching initial data:', error);
        // Keep the mock data if fetching fails
        toast.error('Failed to load data. Using mock data instead.', {
          duration: 5000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Add a new post
  const addPost = (newPost: Post) => {
    setPosts(prevPosts => [...prevPosts, newPost]);
    
    // Send to API (would add API call in a real app)
    toast.success('Post added successfully');
  };

  // Update an existing post
  const updatePost = (updatedPost: Post) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === updatedPost.id ? updatedPost : post
      )
    );
    
    // Send to API (would add API call in a real app)
    toast.success('Post updated successfully');
  };

  // Delete a post
  const deletePost = (id: string) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
    
    // Send to API (would add API call in a real app)
    toast.success('Post deleted successfully');
  };

  // Update a comment
  const updateComment = (id: string, status: 'pending' | 'approved' | 'rejected') => {
    setComments(prevComments => 
      prevComments.map(comment => 
        comment._id === id ? { 
          ...comment, 
          status,
          approved: status === 'approved' // For backward compatibility
        } : comment
      )
    );
    
    // Send to API (would add API call in a real app)
    toast.success(`Comment ${status === 'approved' ? 'approved' : 'rejected'} successfully`);
  };

  // Context value
  const value = {
    posts,
    setPosts,
    categories,
    setCategories,
    post,
    setPost,
    comments,
    setComments,
    addPost,
    updatePost,
    deletePost,
    updateComment,
    loading,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook for using this context
export const useData = () => useContext(DataContext);