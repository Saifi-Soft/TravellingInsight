
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Post } from '@/data/posts';
import { getImageUrl } from '@/lib/utils';

interface PostCardProps {
  post: Post;
  showImage?: boolean;
}

const PostCard = ({ post, showImage = true }: PostCardProps) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow">
      {showImage && (
        <Link to={`/post/${post.slug}`} className="block">
          <div className="aspect-video w-full overflow-hidden">
            <img 
              src={getImageUrl(post.cover_image)} 
              alt={post.title}
              className="w-full h-full object-cover transition-transform hover:scale-105"
            />
          </div>
        </Link>
      )}
      <CardHeader className="p-4 pb-2">
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {post.categories.slice(0, 2).map((category) => (
              <Link to={`/category/${category.slug}`} key={category.id}>
                <Badge variant="secondary" className="hover:bg-secondary/80">
                  {category.name}
                </Badge>
              </Link>
            ))}
          </div>
        )}
        <Link to={`/post/${post.slug}`} className="block">
          <h3 className="text-xl font-semibold leading-tight hover:text-primary transition-colors">
            {post.title}
          </h3>
        </Link>
      </CardHeader>
      <CardContent className="p-4 pt-2 flex-grow">
        <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 text-sm text-muted-foreground">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            <span>{new Date(post.created_at).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1" />
            <span>{post.read_time} min read</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
