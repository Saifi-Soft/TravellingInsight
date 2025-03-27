
import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import FeaturedPosts from '@/components/FeaturedPosts';
import Categories from '@/components/Categories';
import Newsletter from '@/components/Newsletter';
import CommunitySection from '@/components/CommunitySection';
import { getRecentPosts } from '@/data/posts';
import PostCard from '@/components/PostCard';

const Index = () => {
  const recentPosts = getRecentPosts(3);
  
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
            {recentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
      
      <Newsletter />
      <CommunitySection />
    </Layout>
  );
};

export default Index;
