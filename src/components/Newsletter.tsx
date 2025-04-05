import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Plane } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Successfully subscribed!", {
        description: "Thank you for subscribing to our newsletter."
      });
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=2831&auto=format&fit=crop" 
          alt="Travel background" 
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-background/90" />
      </div>
      
      <div className="container relative z-10 px-4 sm:px-8">
        <div className="max-w-2xl mx-auto text-center animate-scale-in">
          <h2 className="text-3xl font-bold tracking-tight">Stay Updated on Travel Trends</h2>
          <p className="mt-3 text-muted-foreground">
            Subscribe to our newsletter for the latest travel tips, destination guides, and exclusive offers.
          </p>
          
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 h-12"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" size="lg" disabled={isSubmitting} className="h-12">
              {isSubmitting ? (
                "Subscribing..."
              ) : (
                <>
                  Subscribe
                  <Plane className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
          
          <p className="mt-3 text-xs text-muted-foreground">
            By subscribing, you agree to our Privacy Policy and to receive our promotional emails.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
