
import React from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedPosts } from '@/data/posts';
import PostCard from './PostCard';
import { ArrowRight } from 'lucide-react';

const FeaturedPosts = () => {
  const featuredPosts = getFeaturedPosts();
  
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight">Featured Articles</h2>
            <p className="mt-2 text-muted-foreground">
              Our editors' picks for must-read travel insights and experiences
            </p>
          </div>
          
          <Link 
            to="/all-posts" 
            className="group mt-4 md:mt-0 inline-flex items-center text-sm font-medium text-primary underline-link"
          >
            View all articles
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredPosts.map((post, index) => (
            <PostCard 
              key={post.id} 
              post={post} 
              featured={index === 0} 
              className={index === 0 ? "lg:col-span-2" : ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
