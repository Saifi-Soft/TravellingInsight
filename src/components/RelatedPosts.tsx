
import React from 'react';
import { Post } from '@/data/posts';
import PostCard from './PostCard';

interface RelatedPostsProps {
  posts: Post[];
}

const RelatedPosts = ({ posts }: RelatedPostsProps) => {
  if (!posts || !posts.length) return null;
  
  return (
    <section className="bg-muted/30 py-12">
      <div className="container px-4 sm:px-8">
        <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedPosts;
