
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop" 
          alt="Travel background" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/40" />
      </div>
      
      <div className="container relative z-10 px-4 py-24 sm:px-8 sm:py-32 md:py-40 lg:py-48">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Explore the World Through Stories
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-muted-foreground">
            Discover extraordinary destinations, travel tips, and cultural insights from around the world. 
            Join our community of adventurous souls seeking inspiration for their next journey.
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="group">
              <Link to="/all-posts">
                Browse Articles
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/community">Join Community</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
