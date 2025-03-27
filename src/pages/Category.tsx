
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import PostCard from '@/components/PostCard';
import { getPostsByCategory } from '@/data/posts';
import { categories } from '@/data/categories';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Newsletter from '@/components/Newsletter';

const Category = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const category = categories.find(cat => cat.slug === slug);
  const posts = slug ? getPostsByCategory(category?.id || '') : [];
  
  if (!category) {
    return (
      <Layout>
        <div className="container px-4 py-12 sm:px-8 sm:py-16">
          <div className="text-center py-16">
            <h2 className="text-3xl font-bold mb-4">Category Not Found</h2>
            <p className="text-muted-foreground mb-8">
              The category you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/all-posts">Browse All Articles</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 z-0">
          <img 
            src={category.image} 
            alt={category.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50" />
        </div>
        
        <div className="container relative z-10 px-4 sm:px-8">
          <div className="max-w-3xl mx-auto text-center text-white">
            <Button 
              variant="outline" 
              size="sm" 
              asChild 
              className="mb-6 text-white bg-white/10 border-white/20 hover:bg-white/20"
            >
              <Link to="/all-posts" className="flex items-center">
                <ChevronLeft className="mr-1 h-4 w-4" />
                Back to All Articles
              </Link>
            </Button>
            
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              {category.name}
            </h1>
            <p className="text-xl text-white/80">
              {category.description}
            </p>
          </div>
        </div>
      </div>
      
      <div className="container px-4 py-12 sm:px-8 sm:py-16">
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium mb-2">No articles in this category yet</h3>
            <p className="text-muted-foreground mb-8">
              Check back later for new content or explore other categories
            </p>
            <Button asChild>
              <Link to="/all-posts">Browse All Articles</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
      
      <Newsletter />
    </Layout>
  );
};

export default Category;
