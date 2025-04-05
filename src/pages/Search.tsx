
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/Layout';
import { searchPosts } from '@/data/posts';
import PostCard from '@/components/PostCard';
import { Skeleton } from '@/components/ui/skeleton';
import SearchBar from '@/components/SearchBar';

const Search = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  
  const { data: posts, isLoading } = useQuery({
    queryKey: ['searchResults', searchQuery],
    queryFn: () => searchPosts(searchQuery),
    enabled: searchQuery.length > 0
  });
  
  return (
    <Layout>
      <div className="container px-4 py-10 sm:px-8 sm:py-16">
        <div className="max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-6">Search Results</h1>
          <SearchBar />
          
          {searchQuery && (
            <p className="mt-4 text-muted-foreground">
              {posts?.length || 0} results for "{searchQuery}"
            </p>
          )}
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {Array(3).fill(0).map((_, index) => (
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
            ))}
          </div>
        ) : posts?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg font-medium">No results found for "{searchQuery}"</p>
            <p className="text-muted-foreground mt-2">Try using different keywords or checking for typos.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {posts?.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Search;
