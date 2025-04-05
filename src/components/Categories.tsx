
import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '@/contexts/DataContext';
import { getImageUrl } from '@/lib/utils';

const Categories = () => {
  const { categories } = useData();

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container px-4 sm:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Popular Categories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our most popular travel categories and destinations
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {categories.slice(0, 6).map((category) => (
            <Link 
              to={`/category/${category.slug}`} 
              key={category.id} 
              className="group relative overflow-hidden rounded-lg aspect-[4/3]"
            >
              <img 
                src={getImageUrl(category.image)} 
                alt={category.name}
                className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition duration-300"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
                <h3 className="text-white font-bold text-xl md:text-2xl mb-1">{category.name}</h3>
                <p className="text-white/80 text-sm">{category.count} Posts</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;