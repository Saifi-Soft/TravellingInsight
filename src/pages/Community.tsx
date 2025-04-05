
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { 
  Heart, 
  MessageSquare, 
  Share2, 
  Image, 
  Smile, 
  Send,
  MoreHorizontal,
  Flag,
  Trash2
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAdmin } from '@/contexts/AdminContext';

const discussions = [
  {
    id: 1,
    title: "What's your favorite hidden gem in Europe?",
    author: {
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop"
    },
    date: "2 days ago",
    content: "I'm planning a trip to Europe next summer and want to explore some lesser-known destinations. What are your favorite hidden gems that most tourists miss?",
    likes: 32,
    comments: 18,
    tags: ["Europe", "Hidden Gems", "Travel Planning"]
  },
  {
    id: 2,
    title: "Best food markets in Southeast Asia?",
    author: {
      name: "David Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
    },
    date: "5 days ago",
    content: "I'm a foodie heading to Southeast Asia and want to experience the best local cuisine. Which food markets would you recommend in Thailand, Vietnam, and Malaysia?",
    likes: 45,
    comments: 23,
    tags: ["Food", "Southeast Asia", "Markets"]
  },
  {
    id: 3,
    title: "Solo female travel safety tips?",
    author: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop"
    },
    date: "1 week ago",
    content: "I'm planning my first solo trip as a female traveler. What safety tips and advice would you share from your experiences? Any particular destinations you'd recommend for first-timers?",
    likes: 87,
    comments: 42,
    tags: ["Solo Travel", "Safety", "Female Travelers"]
  }
];

const events = [
  {
    id: 1,
    title: "Virtual Photography Workshop: Capturing Travel Moments",
    date: "June 15, 2023",
    time: "7:00 PM - 9:00 PM EST",
    location: "Online (Zoom)",
    attendees: 156,
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=2069&auto=format&fit=crop",
    description: "Learn how to capture stunning travel photos with professional photographer James Wilson. This interactive workshop will cover composition, lighting, and editing techniques specifically for travel photography."
  },
  {
    id: 2,
    title: "New York City Travelers Meetup",
    date: "July 8, 2023",
    time: "6:30 PM - 9:30 PM",
    location: "The Explorers Club, Manhattan",
    attendees: 48,
    image: "https://images.unsplash.com/photo-1496588152823-86ff7695e68f?q=80&w=2070&auto=format&fit=crop",
    description: "Connect with fellow travel enthusiasts in NYC for an evening of travel stories, networking, and inspiration. Light refreshments will be provided. Special guest: Adventure writer Maria Lopez."
  },
  {
    id: 3,
    title: "Sustainable Travel Webinar",
    date: "July 22, 2023",
    time: "12:00 PM - 1:30 PM EST",
    location: "Online (Zoom)",
    attendees: 213,
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop",
    description: "Join environmental scientist Dr. Amara Khan to learn practical tips for reducing your carbon footprint while traveling. This webinar will cover eco-friendly accommodations, transportation choices, and responsible tourism practices."
  }
];

const photos = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=2070&auto=format&fit=crop",
    location: "Venice, Italy",
    author: {
      name: "Michael Roberts",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop"
    },
    likes: 245,
    comments: 32
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1464809142576-df633025cbd9?q=80&w=2070&auto=format&fit=crop",
    location: "Santorini, Greece",
    author: {
      name: "Jennifer Adams",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop"
    },
    likes: 356,
    comments: 41
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1544550285-f813f1621f68?q=80&w=2070&auto=format&fit=crop",
    location: "Kyoto, Japan",
    author: {
      name: "Takashi Yamamoto",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop"
    },
    likes: 287,
    comments: 38
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?q=80&w=2070&auto=format&fit=crop",
    location: "Machu Picchu, Peru",
    author: {
      name: "Carlos Mendoza",
      avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop"
    },
    likes: 412,
    comments: 57
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop",
    location: "Norwegian Fjords, Norway",
    author: {
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop"
    },
    likes: 198,
    comments: 27
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=2083&auto=format&fit=crop",
    location: "Venice, Italy",
    author: {
      name: "Marco Rossi",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
    },
    likes: 274,
    comments: 36
  }
];

const Community = () => {
  const [newComment, setNewComment] = useState('');
  const { isAuthenticated } = useAdmin();
  
  const handlePostComment = () => {
    if (newComment.trim()) {
      toast({
        title: "Comment posted",
        description: "Your comment has been added to the discussion.",
      });
      setNewComment('');
    }
  };
  
  const handleAttendEvent = (eventId: number) => {
    toast({
      title: "RSVP Confirmed",
      description: "You're now registered for this event. Details have been sent to your email.",
    });
  };
  
  const handleLike = () => {
    toast({
      title: "Liked!",
      description: "You liked this post.",
    });
  };

  const handleReportComment = (discussionId: number) => {
    toast({
      title: "Comment Reported",
      description: "Thank you for your report. Our moderators will review it.",
    });
  };

  const handleDeleteComment = (discussionId: number) => {
    toast({
      title: "Comment Deleted",
      description: "The comment has been deleted successfully.",
    });
  };
  
  return (
    <Layout>
      <div className="relative overflow-hidden py-16 md:py-24 bg-muted/30">
        <div className="container px-4 sm:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Travel Community
            </h1>
            <p className="text-lg text-muted-foreground">
              Connect with fellow travelers, share experiences, and get inspired for your next adventure
            </p>
          </div>
          
          <Tabs defaultValue="discussions" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="photos">Photo Gallery</TabsTrigger>
            </TabsList>
            
            <TabsContent value="discussions" className="animate-fade-in">
              <div className="mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Start a Discussion</CardTitle>
                    <CardDescription>
                      Ask questions, share tips, or discuss your travel experiences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea 
                      placeholder="What's on your mind about travel?"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="min-h-32"
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Image className="h-4 w-4 mr-2" />
                        Add Photo
                      </Button>
                      <Button variant="outline" size="sm">
                        <Smile className="h-4 w-4 mr-2" />
                        Add Emoji
                      </Button>
                    </div>
                    <Button onClick={handlePostComment}>
                      <Send className="h-4 w-4 mr-2" />
                      Post
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              <div className="space-y-6">
                {discussions.map((discussion) => (
                  <Card key={discussion.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex gap-3">
                          <Avatar>
                            <AvatarImage src={discussion.author.avatar} alt={discussion.author.name} />
                            <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{discussion.title}</CardTitle>
                            <CardDescription>
                              Posted by {discussion.author.name} • {discussion.date}
                            </CardDescription>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleReportComment(discussion.id)}>
                              <Flag className="mr-2 h-4 w-4" />
                              <span>Report</span>
                            </DropdownMenuItem>
                            {isAuthenticated && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  onClick={() => handleDeleteComment(discussion.id)}
                                  className="text-red-500 focus:text-red-500"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  <span>Delete</span>
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p>{discussion.content}</p>
                      <div className="flex gap-2 mt-4">
                        {discussion.tags.map((tag) => (
                          <Button key={tag} variant="secondary" size="sm" className="rounded-full text-xs">
                            {tag}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="flex gap-4">
                        <Button variant="ghost" size="sm" onClick={handleLike} className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          <span>{discussion.likes}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{discussion.comments}</span>
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="events" className="animate-fade-in">
              <div className="space-y-6">
                {events.map((event) => (
                  <Card key={event.id}>
                    <div className="grid grid-cols-1 md:grid-cols-3">
                      <div className="aspect-video md:aspect-square relative overflow-hidden">
                        <img 
                          src={event.image} 
                          alt={event.title} 
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <CardHeader>
                          <div className="flex justify-between">
                            <CardTitle>{event.title}</CardTitle>
                            {isAuthenticated && (
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Flag className="mr-2 h-4 w-4" />
                                    <span>Edit</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-500 focus:text-red-500">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    <span>Delete</span>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            )}
                          </div>
                          <CardDescription>
                            {event.date} • {event.time} • {event.location}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p>{event.description}</p>
                          <div className="mt-4 text-sm text-muted-foreground">
                            {event.attendees} people attending
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button onClick={() => handleAttendEvent(event.id)}>
                            RSVP
                          </Button>
                        </CardFooter>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="photos" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {photos.map((photo) => (
                  <Card key={photo.id} className="overflow-hidden hover-scale">
                    <div className="aspect-square relative overflow-hidden">
                      <img 
                        src={photo.image} 
                        alt={photo.location} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {isAuthenticated && (
                        <div className="absolute top-2 right-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-black/30 text-white hover:bg-black/50">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem className="text-red-500 focus:text-red-500">
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      )}
                    </div>
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-center mb-3">
                        <div className="font-medium">{photo.location}</div>
                        <div className="flex gap-3">
                          <Button variant="ghost" size="sm" onClick={handleLike} className="p-0 h-auto">
                            <Heart className="h-4 w-4 mr-1" />
                            <span>{photo.likes}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="p-0 h-auto">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            <span>{photo.comments}</span>
                          </Button>
                        </div>
                      </div>
                      <Separator className="my-3" />
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={photo.author.avatar} alt={photo.author.name} />
                          <AvatarFallback>{photo.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">{photo.author.name}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Community;
