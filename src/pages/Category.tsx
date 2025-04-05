import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import PostCard from '@/components/PostCard';
import { useData } from '@/contexts/DataContext';

const Category = () => {
  const { slug } = useParams<{ slug: string }>();
  const { posts, categories } = useData();
  
  // Find category by slug
  const category = categories.find(c => c.slug === slug);
  
  // Find posts in this category
  const categoryPosts = posts.filter(post => 
    post.categories?.some(c => c.slug === slug)
  );
  
  return (
    <Layout>
      <div className="py-12 md:py-20 bg-muted">
        <div className="container px-4 sm:px-8">
          <h1 className="text-4xl font-bold mb-2">
            {category?.name || "Category"}
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            {category?.description || "Browse posts in this category"}
          </p>
        </div>
      </div>
      
      <div className="py-16 container px-4 sm:px-8">
        {categoryPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold mb-2">No posts found</h3>
            <p className="text-muted-foreground">
              There are currently no posts in this category.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Category;