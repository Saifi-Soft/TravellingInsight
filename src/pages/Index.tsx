import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import FeaturedPosts from '@/components/FeaturedPosts';
import Categories from '@/components/Categories';
import Newsletter from '@/components/Newsletter';
import CommunitySection from '@/components/CommunitySection';
import PostCard from '@/components/PostCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useData } from '@/contexts/DataContext';

const Index = () => {
  const { posts } = useData();
  
  // Get the 3 most recent posts
  const recentPosts = [...posts]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 3);
  
  return (
    <Layout>
      <Hero />
      <FeaturedPosts />
      <Categories />
      
      <section className="py-16 md:py-24">
        <div className="container px-4 sm:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight">Latest Articles</h2>
              <p className="mt-2 text-muted-foreground">
                Fresh insights and travel inspiration from our writers
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {recentPosts.length > 0 ? (
              recentPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              // No posts yet, show skeleton UI
              Array(3).fill(0).map((_, index) => (
                <div key={index} className="rounded-lg border border-border/50 bg-card shadow-subtle">
                  <Skeleton className="aspect-video w-full rounded-t-lg" />
                  <div className="p-4 md:p-6">
                    <Skeleton className="h-4 w-20 mb-3" />
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-6 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6 mb-4" />
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
      
      <Newsletter />
      <CommunitySection />
    </Layout>
  );
};

export default Index;
