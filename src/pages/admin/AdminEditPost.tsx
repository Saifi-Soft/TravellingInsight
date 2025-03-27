
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { posts, Post } from '@/data/posts';
import { categories } from '@/data/categories';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { Image, Youtube, Twitter, FileVideo, Link as LinkIcon } from 'lucide-react';

const AdminEditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const [activeTab, setActiveTab] = useState('content');
  const [mediaType, setMediaType] = useState<'image' | 'youtube' | 'twitter' | 'video'>('image');
  
  const defaultPost: Post = {
    id: '',
    title: '',
    excerpt: '',
    content: '',
    coverImage: '',
    date: new Date().toISOString().split('T')[0],
    author: {
      name: 'Admin User',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop'
    },
    categoryIds: [],
    slug: '',
    featured: false,
    readTime: 5
  };
  
  const [post, setPost] = useState<Post>(defaultPost);
  
  useEffect(() => {
    if (isEditing) {
      const existingPost = posts.find(p => p.id === id);
      if (existingPost) {
        setPost(existingPost);
      } else {
        toast.error('Post not found');
        navigate('/admin/posts');
      }
    }
  }, [id, isEditing, navigate]);
  
  const form = useForm<Post>({
    defaultValues: post
  });
  
  useEffect(() => {
    if (post) {
      form.reset(post);
    }
  }, [post, form]);
  
  const handleSave = (data: Post) => {
    // In a real app, this would call an API to save the post
    console.log('Saving post data:', data);
    
    // Generate a slug if empty
    if (!data.slug) {
      data.slug = data.title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
    }
    
    toast.success(`${isEditing ? 'Updated' : 'Created'} post: ${data.title}`);
    navigate('/admin/posts');
  };
  
  const handleMediaSelect = (type: 'image' | 'youtube' | 'twitter' | 'video') => {
    setMediaType(type);
  };
  
  const handleInsertMedia = () => {
    // In a real app, this would insert the media into the content at cursor position
    // or upload a file to storage
    toast.success(`${mediaType} would be inserted into the content`);
  };
  
  return (
    <AdminLayout title={isEditing ? 'Edit Post' : 'Create New Post'}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSave)}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            {/* Content Tab */}
            <TabsContent value="content" className="space-y-4 mt-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input 
                    id="title" 
                    placeholder="Post title" 
                    {...form.register("title")}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea 
                    id="excerpt" 
                    placeholder="Brief summary of the post" 
                    {...form.register("excerpt")}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea 
                    id="content" 
                    placeholder="Post content" 
                    className="min-h-[300px]" 
                    {...form.register("content")}
                  />
                </div>
              </div>
            </TabsContent>
            
            {/* Media Tab */}
            <TabsContent value="media" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Cover Image</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="coverImage">Cover Image URL</Label>
                    <Input 
                      id="coverImage" 
                      placeholder="https://example.com/image.jpg" 
                      {...form.register("coverImage")}
                    />
                  </div>
                  
                  {post.coverImage && (
                    <div className="border rounded-md p-2">
                      <img 
                        src={post.coverImage} 
                        alt="Cover preview" 
                        className="max-h-[200px] object-cover rounded-md mx-auto"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Insert Media</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Button 
                      type="button" 
                      variant={mediaType === 'image' ? 'default' : 'outline'} 
                      onClick={() => handleMediaSelect('image')}
                    >
                      <Image className="mr-2 h-4 w-4" />
                      Image
                    </Button>
                    <Button 
                      type="button" 
                      variant={mediaType === 'youtube' ? 'default' : 'outline'} 
                      onClick={() => handleMediaSelect('youtube')}
                    >
                      <Youtube className="mr-2 h-4 w-4" />
                      YouTube
                    </Button>
                    <Button 
                      type="button" 
                      variant={mediaType === 'twitter' ? 'default' : 'outline'} 
                      onClick={() => handleMediaSelect('twitter')}
                    >
                      <Twitter className="mr-2 h-4 w-4" />
                      Twitter/X
                    </Button>
                    <Button 
                      type="button" 
                      variant={mediaType === 'video' ? 'default' : 'outline'} 
                      onClick={() => handleMediaSelect('video')}
                    >
                      <FileVideo className="mr-2 h-4 w-4" />
                      Video
                    </Button>
                  </div>
                  
                  {mediaType === 'image' && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="imageUrl">Image URL</Label>
                        <Input id="imageUrl" placeholder="https://example.com/image.jpg" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="imageFile">Or upload image</Label>
                        <Input id="imageFile" type="file" accept="image/*" />
                      </div>
                    </div>
                  )}
                  
                  {mediaType === 'youtube' && (
                    <div className="space-y-2">
                      <Label htmlFor="youtubeUrl">YouTube URL or Embed Code</Label>
                      <Input id="youtubeUrl" placeholder="https://www.youtube.com/watch?v=..." />
                    </div>
                  )}
                  
                  {mediaType === 'twitter' && (
                    <div className="space-y-2">
                      <Label htmlFor="twitterUrl">Twitter/X Post URL</Label>
                      <Input id="twitterUrl" placeholder="https://twitter.com/user/status/..." />
                    </div>
                  )}
                  
                  {mediaType === 'video' && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="videoUrl">Video URL</Label>
                        <Input id="videoUrl" placeholder="https://example.com/video.mp4" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="videoFile">Or upload video</Label>
                        <Input id="videoFile" type="file" accept="video/*" />
                      </div>
                    </div>
                  )}
                  
                  <Button 
                    type="button" 
                    className="mt-4" 
                    onClick={handleInsertMedia}
                  >
                    Insert Media
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* SEO Tab */}
            <TabsContent value="seo" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>SEO Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="slug">URL Slug</Label>
                    <div className="flex gap-2">
                      <div className="flex items-center text-sm text-muted-foreground bg-muted px-3 rounded-l-md border-y border-l">
                        /post/
                      </div>
                      <Input 
                        id="slug" 
                        placeholder="post-url-slug" 
                        className="rounded-l-none"
                        {...form.register("slug")}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Leave empty to auto-generate from title
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="metaTitle">Meta Title</Label>
                    <Input id="metaTitle" placeholder="SEO-optimized title (optional)" />
                    <p className="text-xs text-muted-foreground">
                      If left empty, the post title will be used
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="metaDescription">Meta Description</Label>
                    <Textarea id="metaDescription" placeholder="SEO description (optional)" />
                    <p className="text-xs text-muted-foreground">
                      If left empty, the post excerpt will be used
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="keywords">Keywords</Label>
                    <Input id="keywords" placeholder="travel, asia, guide, etc." />
                    <p className="text-xs text-muted-foreground">
                      Comma-separated keywords for search engines
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Post Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Publication Date</Label>
                    <Input 
                      id="date" 
                      type="date" 
                      {...form.register("date")}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="categories">Categories</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select categories" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="readTime">Read Time (minutes)</Label>
                    <Input 
                      id="readTime" 
                      type="number" 
                      min="1" 
                      {...form.register("readTime", { valueAsNumber: true })}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="featured" 
                      checked={post.featured}
                      onCheckedChange={(checked) => {
                        setPost((prev) => ({ ...prev, featured: checked }));
                      }}
                    />
                    <Label htmlFor="featured">Featured Post</Label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end gap-2 mt-8">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/admin/posts')}
            >
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? 'Update' : 'Create'} Post
            </Button>
          </div>
        </form>
      </Form>
    </AdminLayout>
  );
};

export default AdminEditPost;
