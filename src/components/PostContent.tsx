
import React from 'react';
import { Post } from '@/data/posts';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '@/lib/utils';

interface PostContentProps {
  post: Post;
}

const PostContent = ({ post }: PostContentProps) => {
  const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <article className="container max-w-4xl px-4 py-10 sm:px-8">
      <div className="mb-8">
        <div className="mb-4 flex flex-wrap gap-2">
          {post.categories?.map(category => (
            <Badge 
              key={category.id} 
              variant="secondary"
              className="relative z-20 hover:bg-primary hover:text-primary-foreground"
            >
              <Link 
                to={`/category/${category.slug}`}
                className="relative z-30"
              >
                {category.name}
              </Link>
            </Badge>
          ))}
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{post.title}</h1>
        
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <img
              src={getImageUrl(post.author?.avatar)}
              alt={post.author?.name}
              className="h-8 w-8 rounded-full object-cover"
            />
            <span>{post.author?.name}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{post.read_time} min read</span>
          </div>
        </div>
      </div>
      
      <div className="mb-10 aspect-video w-full overflow-hidden rounded-lg">
        <img
          src={getImageUrl(post.cover_image)}
          alt={post.title}
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="prose prose-lg prose-blue mx-auto max-w-none dark:prose-invert">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </article>
  );
};

export default PostContent;