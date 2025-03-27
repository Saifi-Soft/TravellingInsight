
import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '@/data/categories';
import { cn } from '@/lib/utils';

const Categories = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Explore by Category</h2>
          <p className="mt-2 text-muted-foreground">
            Discover travel inspiration categorized by your interests
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={`/category/${category.slug}`}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-lg hover-scale",
                "border border-border/50 shadow-subtle transition-all"
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 z-10" />
              
              <img 
                src={category.image} 
                alt={category.name}
                className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              <div className="absolute bottom-0 left-0 right-0 z-20 p-6 text-white">
                <h3 className="text-xl font-medium">{category.name}</h3>
                <p className="mt-2 text-sm text-white/80 line-clamp-2">{category.description}</p>
                <div className="mt-4 text-sm">
                  {category.count} {category.count === 1 ? 'Article' : 'Articles'}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
