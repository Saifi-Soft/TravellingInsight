
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, ArrowLeft, Share2, Bookmark, ChevronLeft, ChevronRight } from 'lucide-react';
import PostCard from '@/components/PostCard';
import { useData } from '@/contexts/DataContext';
import { getImageUrl } from '@/lib/utils';

const Post = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { posts } = useData();
  
  const post = posts.find(p => p.slug === slug);
  
  const relatedPosts = post?.categories?.length
    ? posts
        .filter(p => 
          p.id !== post.id && 
          p.categories?.some(cat => 
            post.categories?.some(postCat => postCat.id === cat.id)
          )
        )
        .slice(0, 3)
    : posts.filter(p => p.id !== post?.id).slice(0, 3);
  
  useEffect(() => {
    if (!post) {
      navigate('/404');
    }
  }, [post, navigate]);
  
  if (!post) return null;
  
  const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <Layout>
      <div className="container px-4 py-8 md:py-12 max-w-4xl">
        <div className="mb-8">
          <Link to="/all-posts" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all articles
          </Link>
          
          <div className="space-y-2 mt-2">
            {post.categories?.map(category => (
              <Badge key={category.id} variant="secondary" className="mr-2">
                <Link to={`/category/${category.slug}`}>{category.name}</Link>
              </Badge>
            ))}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mt-4">{post.title}</h1>
          
          <div className="flex items-center space-x-4 mt-6">
            <Avatar>
              <AvatarImage src={getImageUrl(post.author?.avatar)} alt={post.author?.name} />
              <AvatarFallback>{post.author?.name?.charAt(0) || 'A'}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{post.author?.name}</div>
              <div className="text-sm text-muted-foreground">{post.author?.bio}</div>
            </div>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground mt-4">
            <div className="flex items-center mr-4">
              <Calendar className="mr-1 h-4 w-4" />
              {formattedDate}
            </div>
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              {post.read_time} min read
            </div>
          </div>
        </div>
        
        <div className="aspect-video overflow-hidden rounded-lg mb-8">
          <img 
            src={getImageUrl(post.cover_image)}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div 
          className="prose max-w-none rich-text-content" 
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        <div className="flex justify-between items-center my-8">
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Bookmark className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
        
        <Separator className="my-10" />
        
        <div className="my-12">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map(relatedPost => (
              <PostCard key={relatedPost.id} post={relatedPost} />
            ))}
          </div>
        </div>
        
        <div className="flex justify-between mt-12">
          <Button variant="ghost" className="flex items-center">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous Article
          </Button>
          <Button variant="ghost" className="flex items-center">
            Next Article
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Post;