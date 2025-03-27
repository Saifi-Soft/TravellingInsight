
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { getPostBySlug, getPostCategories, getRecentPosts } from '@/data/posts';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, ChevronLeft, Share2, Bookmark, Heart } from 'lucide-react';
import PostCard from '@/components/PostCard';
import { Button } from '@/components/ui/button';
import Newsletter from '@/components/Newsletter';
import { toast } from '@/components/ui/use-toast';

const Post = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const post = slug ? getPostBySlug(slug) : undefined;
  const categories = post ? getPostCategories(post) : [];
  const recentPosts = getRecentPosts(3);
  
  useEffect(() => {
    if (!post) {
      navigate('/not-found');
    }
    
    window.scrollTo(0, 0);
  }, [post, navigate]);
  
  if (!post) {
    return null;
  }
  
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      })
      .catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied to clipboard",
        description: "You can now share this article with others.",
      });
    }
  };
  
  const handleBookmark = () => {
    toast({
      title: "Article bookmarked",
      description: "You can find this article in your bookmarks.",
    });
  };
  
  const handleLike = () => {
    toast({
      title: "Article liked",
      description: "Thank you for appreciating this article!",
    });
  };
  
  return (
    <Layout>
      <article className="container px-4 py-8 sm:px-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            size="sm" 
            asChild 
            className="mb-6 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Link to="/all-posts" className="flex items-center">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to All Articles
            </Link>
          </Button>
          
          <div className="mb-6 flex flex-wrap gap-2">
            {categories.map(category => (
              <Badge key={category.id} variant="secondary">
                <Link to={`/category/${category.slug}`}>{category.name}</Link>
              </Badge>
            ))}
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap justify-between items-center mb-8">
            <div className="flex items-center gap-3 mb-4 sm:mb-0">
              <Avatar>
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{post.author.name}</div>
                <div className="text-sm text-muted-foreground">Travel Writer</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} min read</span>
              </div>
            </div>
          </div>
          
          <div className="mb-8 overflow-hidden rounded-lg">
            <img 
              src={post.coverImage} 
              alt={post.title} 
              className="w-full h-auto object-cover"
            />
          </div>
          
          <div className="sticky top-20 float-left mr-4 hidden lg:flex flex-col gap-3 mt-2">
            <Button variant="outline" size="icon" onClick={handleShare} aria-label="Share article">
              <Share2 className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleBookmark} aria-label="Bookmark article">
              <Bookmark className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleLike} aria-label="Like article">
              <Heart className="h-5 w-5" />
            </Button>
          </div>
          
          <div 
            className="prose prose-gray dark:prose-invert max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          <div className="flex justify-center gap-4 lg:hidden mt-8">
            <Button variant="outline" size="sm" onClick={handleShare} className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm" onClick={handleBookmark} className="flex items-center gap-2">
              <Bookmark className="h-4 w-4" />
              Bookmark
            </Button>
            <Button variant="outline" size="sm" onClick={handleLike} className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Like
            </Button>
          </div>
        </div>
      </article>
      
      <Separator />
      
      <section className="container px-4 py-16 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight mb-8">More Articles You Might Enjoy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentPosts
              .filter(p => p.id !== post.id)
              .slice(0, 3)
              .map(post => (
                <PostCard key={post.id} post={post} />
              ))}
          </div>
        </div>
      </section>
      
      <Newsletter />
    </Layout>
  );
};

export default Post;
