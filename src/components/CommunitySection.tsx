
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, MessageSquare, Heart, Share2 } from 'lucide-react';

const CommunitySection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 sm:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight">Join Our Community</h2>
          <p className="mt-3 text-muted-foreground">
            Connect with fellow travelers, share experiences, and get inspired for your next adventure
          </p>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="overflow-hidden hover-scale">
            <CardHeader className="p-0">
              <div className="aspect-video overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1532635241-17e820acc59f?q=80&w=2830&auto=format&fit=crop" 
                  alt="Community discussions" 
                  className="h-full w-full object-cover"
                />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle className="text-xl mb-2">Traveler Forums</CardTitle>
              <CardDescription>
                Ask questions, share tips, and connect with travelers who share your interests.
              </CardDescription>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="mr-2 h-4 w-4" />
                <span>5.2K members</span>
                <MessageSquare className="ml-4 mr-2 h-4 w-4" />
                <span>320 posts today</span>
              </div>
            </CardFooter>
          </Card>
          
          <Card className="overflow-hidden hover-scale">
            <CardHeader className="p-0">
              <div className="aspect-video overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1515847049296-a281d6401047?q=80&w=2070&auto=format&fit=crop" 
                  alt="Travel events" 
                  className="h-full w-full object-cover"
                />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle className="text-xl mb-2">Meetups & Events</CardTitle>
              <CardDescription>
                Attend virtual and in-person events to meet fellow travelers in your area.
              </CardDescription>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="mr-2 h-4 w-4" />
                <span>2.7K members</span>
                <MessageSquare className="ml-4 mr-2 h-4 w-4" />
                <span>48 upcoming events</span>
              </div>
            </CardFooter>
          </Card>
          
          <Card className="overflow-hidden hover-scale">
            <CardHeader className="p-0">
              <div className="aspect-video overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1531260824596-c82a2864949b?q=80&w=2070&auto=format&fit=crop" 
                  alt="Photo sharing" 
                  className="h-full w-full object-cover"
                />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle className="text-xl mb-2">Photo Gallery</CardTitle>
              <CardDescription>
                Share your travel photos and get inspired by stunning imagery from around the world.
              </CardDescription>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <div className="flex items-center text-sm text-muted-foreground">
                <Heart className="mr-2 h-4 w-4" />
                <span>10.5K likes</span>
                <Share2 className="ml-4 mr-2 h-4 w-4" />
                <span>3.2K shares</span>
              </div>
            </CardFooter>
          </Card>
        </div>
        
        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link to="/community">Explore Community</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
