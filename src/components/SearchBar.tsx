
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { searchPosts } from '@/data/posts';

interface SearchBarProps {
  onClose?: () => void;
}

const SearchBar = ({ onClose }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ title: string; slug: string }[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const getSearchResults = async () => {
      if (query.length > 2) {
        try {
          const posts = await searchPosts(query);
          setResults(posts.map(post => ({ title: post.title, slug: post.slug })));
        } catch (error) {
          console.error('Search error:', error);
          setResults([]);
        }
      } else {
        setResults([]);
      }
    };
    
    getSearchResults();
  }, [query]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      if (onClose) onClose();
    }
  };
  
  const handleResultClick = (slug: string) => {
    navigate(`/post/${slug}`);
    if (onClose) onClose();
  };
  
  return (
    <div className="relative w-full">
      <form onSubmit={handleSearch} className="flex w-full">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for articles..."
            className="w-full pl-10 focus-visible:ring-offset-0"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>
        
        <Button type="submit" className="ml-2">Search</Button>
        
        {onClose && (
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="ml-2"
            aria-label="Close search"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </form>
      
      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2 max-h-64 overflow-auto rounded-md border border-border bg-background shadow-md animate-fade-in">
          <ul className="py-2">
            {results.map((result, index) => (
              <li key={index}>
                <button
                  className="w-full px-4 py-2 text-left hover:bg-muted transition-colors"
                  onClick={() => handleResultClick(result.slug)}
                >
                  {result.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
