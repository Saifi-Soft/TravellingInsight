
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useData } from '@/contexts/DataContext';
import { getImageUrl } from '@/lib/utils';

const FeaturedPosts = () => {
  const { posts } = useData();
  
  // Get up to 4 featured posts
  const featuredPosts = [...posts]
    .filter(post => post.featured)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 4);
  
  if (featuredPosts.length === 0) {
    return null; // Don't show the section if there are no featured posts
  }
  
  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="container px-4 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight">Featured Posts</h2>
            <p className="mt-2 text-muted-foreground">
              Explore our handpicked selection of remarkable travel experiences
            </p>
          </div>
          <Link to="/all-posts" className="mt-4 md:mt-0">
            <Button variant="outline">
              View All Posts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredPosts[0] && (
            <div className="relative col-span-2 overflow-hidden rounded-xl bg-cover bg-center h-[400px]" 
                 style={{ backgroundImage: `url(${getImageUrl(featuredPosts[0].cover_image)})` }}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/0"></div>
              <div className="absolute bottom-0 left-0 w-full p-6">
                <div className="mb-3 flex flex-wrap gap-2">
                  {featuredPosts[0].categories?.slice(0, 2).map(category => (
                    <Badge key={category.id} variant="secondary" className="hover:bg-primary hover:text-primary-foreground">
                      <Link to={`/category/${category.slug}`}>
                        {category.name}
                      </Link>
                    </Badge>
                  ))}
                </div>
                <h3 className="mb-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
                  <Link to={`/post/${featuredPosts[0].slug}`} className="hover:underline">
                    {featuredPosts[0].title}
                  </Link>
                </h3>
                <p className="mb-4 text-white/80 line-clamp-2">
                  {featuredPosts[0].excerpt}
                </p>
                <div className="flex items-center gap-2">
                  <img
                    src={getImageUrl(featuredPosts[0].author?.avatar)}
                    alt={featuredPosts[0].author?.name || "Author"}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span className="text-sm text-white/80">{featuredPosts[0].author?.name}</span>
                  <span className="text-sm text-white/60">
                    {new Date(featuredPosts[0].created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>
              <Link to={`/post/${featuredPosts[0].slug}`} className="absolute inset-0" aria-label={featuredPosts[0].title}></Link>
            </div>
          )}
          
          {featuredPosts.slice(1).map(post => (
            <div key={post.id} className="group relative overflow-hidden rounded-xl bg-cover bg-center h-[250px]"
                 style={{ backgroundImage: `url(${getImageUrl(post.cover_image)})` }}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/0"></div>
              <div className="absolute bottom-0 left-0 w-full p-6">
                <div className="mb-3 flex gap-2">
                  {post.categories?.[0] && (
                    <Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground">
                      <Link to={`/category/${post.categories[0].slug}`}>
                        {post.categories[0].name}
                      </Link>
                    </Badge>
                  )}
                </div>
                <h3 className="mb-2 text-xl font-bold tracking-tight text-white">
                  <Link to={`/post/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h3>
                <div className="flex items-center gap-2">
                  <img
                    src={getImageUrl(post.author?.avatar)}
                    alt={post.author?.name || "Author"}
                    className="h-6 w-6 rounded-full object-cover"
                  />
                  <span className="text-xs text-white/80">{post.author?.name}</span>
                </div>
              </div>
              <Link to={`/post/${post.slug}`} className="absolute inset-0" aria-label={post.title}></Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
