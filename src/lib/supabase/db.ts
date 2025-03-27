import { supabase } from './client';
import type { Tables, TablesInsert, TablesUpdate } from './schema';

// Posts
export async function getPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      categories(*),
      authors(*)
    `)
    .eq('published', true)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
  
  return data || [];
}

export async function getPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      categories(*),
      authors(*)
    `)
    .eq('slug', slug)
    .eq('published', true)
    .single();
  
  if (error) {
    console.error('Error fetching post:', error);
    return null;
  }
  
  return data;
}

export async function getFeaturedPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      categories(*),
      authors(*)
    `)
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(4);
  
  if (error) {
    console.error('Error fetching featured posts:', error);
    return [];
  }
  
  return data || [];
}

export async function getPostsByCategory(categoryId: string) {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      categories(*),
      authors(*)
    `)
    .eq('category_id', categoryId)
    .eq('published', true)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching posts by category:', error);
    return [];
  }
  
  return data || [];
}

export async function searchPosts(query: string) {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      categories(*),
      authors(*)
    `)
    .eq('published', true)
    .or(`title.ilike.%${query}%,content.ilike.%${query}%,excerpt.ilike.%${query}%`)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error searching posts:', error);
    return [];
  }
  
  return data || [];
}

// Categories
export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
  
  return data || [];
}

export async function getCategoryBySlug(slug: string) {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) {
    console.error('Error fetching category:', error);
    return null;
  }
  
  return data;
}

// Comments
export async function getPostComments(postId: string) {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', postId)
    .eq('approved', true)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
  
  return data || [];
}

export async function submitComment(comment: TablesInsert['comments']) {
  const { data, error } = await supabase
    .from('comments')
    .insert([{ ...comment, approved: false }])
    .select();
  
  if (error) {
    console.error('Error submitting comment:', error);
    return null;
  }
  
  return data?.[0] || null;
}

// Newsletter
export async function subscribeToNewsletter(email: string) {
  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .insert([{ email }])
    .select();
  
  if (error) {
    console.error('Error subscribing to newsletter:', error);
    return null;
  }
  
  return data?.[0] || null;
}

// Admin Functions
export async function getAllPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      categories(*),
      authors(*)
    `)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching all posts:', error);
    return [];
  }
  
  return data || [];
}

export async function createPost(post: TablesInsert['posts']) {
  const { data, error } = await supabase
    .from('posts')
    .insert([post])
    .select();
  
  if (error) {
    console.error('Error creating post:', error);
    return null;
  }
  
  return data?.[0] || null;
}

export async function updatePost(id: string, post: TablesUpdate['posts']) {
  const { data, error } = await supabase
    .from('posts')
    .update(post)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating post:', error);
    return null;
  }
  
  return data;
}

export async function deletePost(id: string) {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting post:', error);
    return false;
  }
  
  return true;
}

export async function getUnapprovedComments() {
  const { data, error } = await supabase
    .from('comments')
    .select(`
      *,
      posts(id, title)
    `)
    .eq('approved', false)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching unapproved comments:', error);
    return [];
  }
  
  return data || [];
}

export async function approveComment(id: string) {
  const { error } = await supabase
    .from('comments')
    .update({ approved: true })
    .eq('id', id);
  
  if (error) {
    console.error('Error approving comment:', error);
    return false;
  }
  
  return true;
}

export async function deleteComment(id: string) {
  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting comment:', error);
    return false;
  }
  
  return true;
}

export async function getNewsletterSubscribers() {
  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching newsletter subscribers:', error);
    return [];
  }
  
  return data || [];
}
