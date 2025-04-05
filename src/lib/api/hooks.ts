import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from './client';
import { API_ENDPOINTS } from './endpoints';
import { Post, Category, Author, Comment, Subscriber } from './types';
import { toast } from 'sonner';

// Posts hooks
export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.POSTS);
      return response.data;
    }
  });
};

export const usePost = (id: string) => {
  return useQuery({
    queryKey: ['post', id],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.POST_BY_ID(id));
      return response.data;
    },
    enabled: !!id,
  });
};

export const usePostBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['post', 'slug', slug],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.POST_BY_SLUG(slug));
      return response.data;
    },
    enabled: !!slug,
  });
};

export const useFeaturedPosts = () => {
  return useQuery({
    queryKey: ['posts', 'featured'],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.FEATURED_POSTS);
      return response.data;
    }
  });
};

export const useRecentPosts = (limit = 5) => {
  return useQuery({
    queryKey: ['posts', 'recent', limit],
    queryFn: async () => {
      const response = await apiClient.get(`${API_ENDPOINTS.RECENT_POSTS}?limit=${limit}`);
      return response.data;
    }
  });
};

export const usePostsByCategory = (categorySlug: string) => {
  return useQuery({
    queryKey: ['posts', 'category', categorySlug],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.POSTS_BY_CATEGORY(categorySlug));
      return response.data;
    },
    enabled: !!categorySlug,
  });
};

export const useRelatedPosts = (postId: string) => {
  return useQuery({
    queryKey: ['posts', 'related', postId],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.RELATED_POSTS(postId));
      return response.data;
    },
    enabled: !!postId,
  });
};

export const useSearchPosts = (query: string) => {
  return useQuery({
    queryKey: ['posts', 'search', query],
    queryFn: async () => {
      const response = await apiClient.get(`${API_ENDPOINTS.SEARCH_POSTS}?q=${encodeURIComponent(query)}`);
      return response.data;
    },
    enabled: !!query && query.length > 2,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (post: Partial<Post>) => {
      const response = await apiClient.post(API_ENDPOINTS.POSTS, post);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post created successfully');
    },
    onError: (error: any) => {
      toast.error(`Failed to create post: ${error.message}`);
    }
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (post: Post) => {
      const response = await apiClient.put(API_ENDPOINTS.POST_BY_ID(post._id), post);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post', variables._id] });
      toast.success('Post updated successfully');
    },
    onError: (error: any) => {
      toast.error(`Failed to update post: ${error.message}`);
    }
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.delete(API_ENDPOINTS.POST_BY_ID(id));
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post deleted successfully');
    },
    onError: (error: any) => {
      toast.error(`Failed to delete post: ${error.message}`);
    }
  });
};

// Categories hooks
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.CATEGORIES);
      return response.data;
    }
  });
};

export const useCategory = (id: string) => {
  return useQuery({
    queryKey: ['category', id],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.CATEGORY_BY_ID(id));
      return response.data;
    },
    enabled: !!id,
  });
};

export const useCategoryBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['category', 'slug', slug],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.CATEGORY_BY_SLUG(slug));
      return response.data;
    },
    enabled: !!slug,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (category: Partial<Category>) => {
      const response = await apiClient.post(API_ENDPOINTS.CATEGORIES, category);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category created successfully');
    },
    onError: (error: any) => {
      toast.error(`Failed to create category: ${error.message}`);
    }
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (category: Category) => {
      const response = await apiClient.put(API_ENDPOINTS.CATEGORY_BY_ID(category._id), category);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['category', variables._id] });
      toast.success('Category updated successfully');
    },
    onError: (error: any) => {
      toast.error(`Failed to update category: ${error.message}`);
    }
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.delete(API_ENDPOINTS.CATEGORY_BY_ID(id));
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category deleted successfully');
    },
    onError: (error: any) => {
      toast.error(`Failed to delete category: ${error.message}`);
    }
  });
};

// Comments hooks
export const useCommentsByPost = (postId: string) => {
  return useQuery({
    queryKey: ['comments', 'post', postId],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.COMMENTS_BY_POST(postId));
      return response.data;
    },
    enabled: !!postId,
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (comment: Partial<Comment>) => {
      const response = await apiClient.post(API_ENDPOINTS.COMMENTS, comment);
      return response.data;
    },
    onSuccess: (_, variables) => {
      if (variables.post_id) {
        queryClient.invalidateQueries({ queryKey: ['comments', 'post', variables.post_id] });
      }
      toast.success('Comment submitted for review');
    },
    onError: (error: any) => {
      toast.error(`Failed to submit comment: ${error.message}`);
    }
  });
};

export const useApproveComment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.patch(API_ENDPOINTS.APPROVE_COMMENT(id));
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      toast.success('Comment approved');
    },
    onError: (error: any) => {
      toast.error(`Failed to approve comment: ${error.message}`);
    }
  });
};

export const useRejectComment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.patch(API_ENDPOINTS.REJECT_COMMENT(id));
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      toast.success('Comment rejected');
    },
    onError: (error: any) => {
      toast.error(`Failed to reject comment: ${error.message}`);
    }
  });
};

// File upload hook
export const useUploadFile = () => {
  return useMutation({
    mutationFn: async ({ file, path }: { file: File, path?: string }) => {
      const formData = new FormData();
      formData.append('file', file);
      if (path) {
        formData.append('path', path);
      }
      
      const response = await apiClient.post(API_ENDPOINTS.UPLOAD_IMAGE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data;
    },
    onError: (error: any) => {
      toast.error(`Failed to upload file: ${error.message}`);
    }
  });
};
