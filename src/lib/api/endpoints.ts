export const API_ENDPOINTS = {
    // Posts
    POSTS: '/posts',
    POST_BY_ID: (id: string) => `/posts/${id}`,
    POST_BY_SLUG: (slug: string) => `/posts/slug/${slug}`,
    FEATURED_POSTS: '/posts/featured',
    RECENT_POSTS: '/posts/recent',
    POSTS_BY_CATEGORY: (categorySlug: string) => `/posts/category/${categorySlug}`,
    RELATED_POSTS: (postId: string) => `/posts/${postId}/related`,
    SEARCH_POSTS: '/posts/search',
  
    // Categories
    CATEGORIES: '/categories',
    CATEGORY_BY_ID: (id: string) => `/categories/${id}`,
    CATEGORY_BY_SLUG: (slug: string) => `/categories/slug/${slug}`,
  
    // Authors
    AUTHORS: '/authors',
    AUTHOR_BY_ID: (id: string) => `/authors/${id}`,
  
    // Comments
    COMMENTS: '/comments',
    COMMENTS_BY_POST: (postId: string) => `/comments/post/${postId}`,
    COMMENT_BY_ID: (id: string) => `/comments/${id}`,
    APPROVE_COMMENT: (id: string) => `/comments/${id}/approve`,
    REJECT_COMMENT: (id: string) => `/comments/${id}/reject`,
  
    // Subscribers
    SUBSCRIBERS: '/subscribers',
    
    // Uploads
    UPLOADS: '/uploads',
    UPLOAD_IMAGE: '/uploads/image',
  };
  