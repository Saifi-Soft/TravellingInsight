
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import SearchBar from './SearchBar';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [showSearch, setShowSearch] = React.useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center px-4 sm:px-8">
          <Link to="/" className="flex items-center">
            <h1 className="text-xl font-semibold tracking-tight">
              <span className="text-primary">Travelling</span>Insight
            </h1>
          </Link>
          
          <nav className="ml-auto hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary", 
                isActive('/') ? "text-primary" : "text-foreground/80"
              )}
            >
              Home
            </Link>
            <Link 
              to="/all-posts" 
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary", 
                isActive('/all-posts') ? "text-primary" : "text-foreground/80"
              )}
            >
              All Articles
            </Link>
            <Link 
              to="/category/asia" 
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary", 
                isActive('/category/asia') ? "text-primary" : "text-foreground/80"
              )}
            >
              Asia
            </Link>
            <Link 
              to="/category/europe" 
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary", 
                isActive('/category/europe') ? "text-primary" : "text-foreground/80"
              )}
            >
              Europe
            </Link>
            <Link 
              to="/category/adventure" 
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary", 
                isActive('/category/adventure') ? "text-primary" : "text-foreground/80"
              )}
            >
              Adventure
            </Link>
          </nav>
          
          <div className="ml-auto md:ml-4 flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowSearch(!showSearch)}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-6 mt-8">
                  <Link 
                    to="/" 
                    className="text-lg font-medium transition-colors hover:text-primary"
                  >
                    Home
                  </Link>
                  <Link 
                    to="/all-posts" 
                    className="text-lg font-medium transition-colors hover:text-primary"
                  >
                    All Articles
                  </Link>
                  <Link 
                    to="/category/asia" 
                    className="text-lg font-medium transition-colors hover:text-primary"
                  >
                    Asia
                  </Link>
                  <Link 
                    to="/category/europe" 
                    className="text-lg font-medium transition-colors hover:text-primary"
                  >
                    Europe
                  </Link>
                  <Link 
                    to="/category/adventure" 
                    className="text-lg font-medium transition-colors hover:text-primary"
                  >
                    Adventure
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        {showSearch && (
          <div className="container py-4 px-4 sm:px-8 border-t border-border/40 animate-fade-in">
            <SearchBar onClose={() => setShowSearch(false)} />
          </div>
        )}
      </header>
      
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="border-t border-border/40 bg-muted/50 py-12">
        <div className="container px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-xl font-semibold mb-4">TravellingInsight</h3>
              <p className="text-muted-foreground mb-4">
                Discover extraordinary destinations, travel tips, and cultural insights from around the world.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Explore</h4>
              <ul className="space-y-2">
                <li><Link to="/all-posts" className="text-sm text-muted-foreground hover:text-primary transition-colors">All Articles</Link></li>
                <li><Link to="/category/adventure" className="text-sm text-muted-foreground hover:text-primary transition-colors">Adventure</Link></li>
                <li><Link to="/category/cultural" className="text-sm text-muted-foreground hover:text-primary transition-colors">Cultural</Link></li>
                <li><Link to="/category/food" className="text-sm text-muted-foreground hover:text-primary transition-colors">Food & Cuisine</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Connect</h4>
              <ul className="space-y-2">
                <li><Link to="/community" className="text-sm text-muted-foreground hover:text-primary transition-colors">Community</Link></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Instagram</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Twitter</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Facebook</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-6 border-t border-border/40 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              © 2025 TravellingInsight. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
