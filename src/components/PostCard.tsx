
import React from 'react';
import { Link } from 'react-router-dom';
import { Post, getPostCategories } from '@/data/posts';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PostCardProps {
  post: Post;
  featured?: boolean;
  className?: string;
}

const PostCard = ({ post, featured = false, className }: PostCardProps) => {
  const categories = getPostCategories(post);
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <article 
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg border border-border/50 bg-card transition-all hover-scale shadow-subtle",
        className
      )}
    >
      <Link 
        to={`/post/${post.slug}`}
        className="absolute inset-0 z-10"
        aria-label={post.title}
      />
      
      <div className="image-wrapper aspect-video overflow-hidden">
        <img
          src={post.coverImage}
          alt={post.title}
          className="h-full w-full object-cover transition-transform"
          loading="lazy"
        />
      </div>
      
      <div className="flex flex-1 flex-col p-4 md:p-6">
        <div className="mb-3 flex flex-wrap gap-2">
          {categories.map(category => (
            <Badge 
              key={category.id} 
              variant="secondary" 
              className="relative z-20 hover:bg-primary hover:text-primary-foreground"
            >
              <Link 
                to={`/category/${category.slug}`}
                onClick={(e) => e.stopPropagation()}
                className="relative z-30"
              >
                {category.name}
              </Link>
            </Badge>
          ))}
        </div>
        
        <h3 className={cn(
          "line-clamp-2 font-medium tracking-tight",
          featured ? "text-2xl" : "text-xl"
        )}>
          {post.title}
        </h3>
        
        <p className="mt-2 line-clamp-2 text-muted-foreground flex-grow">
          {post.excerpt}
        </p>
        
        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="h-6 w-6 rounded-full object-cover"
            />
            <span>{post.author.name}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
