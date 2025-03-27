
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import PostCard from '@/components/PostCard';
import { searchPosts } from '@/data/posts';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    if (query) {
      const filteredPosts = searchPosts(query);
      setResults(filteredPosts);
    } else {
      setResults([]);
    }
  }, [query]);
  
  return (
    <Layout>
      <div className="container px-4 py-12 sm:px-8 sm:py-16">
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
        
        <div className="max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl font-bold tracking-tight mb-4">
            Search Results for "{query}"
          </h1>
          <p className="text-muted-foreground">
            Found {results.length} {results.length === 1 ? 'article' : 'articles'} matching your search
          </p>
        </div>
        
        {results.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium mb-2">No articles found</h3>
            <p className="text-muted-foreground mb-8">
              Try a different search term or browse our categories
            </p>
            <Button asChild>
              <Link to="/all-posts">Browse All Articles</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Search;
