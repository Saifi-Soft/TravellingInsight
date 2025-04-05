import React, { useState } from 'react';
import Layout from '@/components/Layout';
import PostCard from '@/components/PostCard';
import { categories } from '@/data/categories';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { Search, SlidersHorizontal } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useData } from '@/contexts/DataContext';

const AllPosts = () => {
  const { posts } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('latest');
  
  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };
  
  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSortBy('latest');
  };
  
  const filteredPosts = posts
    .filter(post => 
      (searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedCategories.length === 0 || 
        post.categories?.some(category => selectedCategories.includes(category.id)))
    )
    .sort((a, b) => {
      if (sortBy === 'latest') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else if (sortBy === 'oldest') {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      } else if (sortBy === 'a-z') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'z-a') {
        return b.title.localeCompare(a.title);
      }
      return 0;
    });
  
  return (
    <Layout>
      <div className="container px-4 py-12 sm:px-8 sm:py-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">All Articles</h1>
          <p className="text-lg text-muted-foreground">
            Explore our collection of travel articles, guides, and stories
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="a-z">A to Z</SelectItem>
                <SelectItem value="z-a">Z to A</SelectItem>
              </SelectContent>
            </Select>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="hidden sm:inline">Filters</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Articles</SheetTitle>
                  <SheetDescription>
                    Narrow down articles by categories of interest
                  </SheetDescription>
                </SheetHeader>
                
                <div className="py-6 space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Categories</h3>
                    {categories.map(category => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`category-${category.id}`} 
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={() => handleCategoryToggle(category.id)}
                        />
                        <Label htmlFor={`category-${category.id}`} className="flex-1 cursor-pointer">
                          {category.name} ({category.count})
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <SheetFooter>
                  <Button variant="outline" onClick={handleReset}>Reset Filters</Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium mb-2">No articles found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
            <Button variant="outline" onClick={handleReset} className="mt-4">
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AllPosts;