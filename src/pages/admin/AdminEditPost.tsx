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
import { Post } from '@/data/posts';
import { Category } from '@/data/categories';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { Image, Youtube, Twitter, FileVideo, Link as LinkIcon } from 'lucide-react';
import RichTextEditor from '@/components/admin/RichTextEditor';
import ImageUploader from '@/components/admin/ImageUploader';
import { useData } from '@/contexts/DataContext';

const AdminEditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const { posts, categories, addPost, updatePost } = useData();

  const [activeTab, setActiveTab] = useState('content');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  const defaultPost = {
    id: Math.random().toString(36).substring(2, 15),
    title: '',
    excerpt: '',
    content: '',
    cover_image: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    author_id: 'admin',
    author: {
      id: 'admin',
      name: 'Admin User',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop',
      bio: 'Administrator'
    },
    categories: [],
    slug: '',
    featured: false,
    published: true,
    read_time: 5
  };
  
  const [post, setPost] = useState<typeof defaultPost>(defaultPost);
  
  useEffect(() => {
    if (isEditing) {
      const existingPost = posts.find(p => p.id === id);
      if (existingPost) {
        // Make sure we have all required properties by merging with defaultPost
        const completePost = {
          ...defaultPost,
          ...existingPost,
          // Ensure author is not undefined
          author: existingPost.author || defaultPost.author
        };
        setPost(completePost);
        setSelectedCategories(existingPost.categories?.map(c => c.id) || []);
      } else {
        toast.error('Post not found');
        navigate('/admin/posts');
      }
    }
  }, [id, isEditing, navigate, posts]);
  
  const form = useForm({
    defaultValues: post
  });
  
  useEffect(() => {
    if (post) {
      form.reset(post);
    }
  }, [post, form]);
  
  const handleSave = (data: any) => {
    // Prepare the updated post
    const updatedPost = {
      ...data,
      id: post.id,
      updated_at: new Date().toISOString(),
      slug: data.slug || data.title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-'),
      categories: categories.filter(cat => selectedCategories.includes(cat.id))
    };
    
    // Update or add the post
    if (isEditing) {
      updatePost(updatedPost);
      toast.success(`Updated post: ${data.title}`);
    } else {
      addPost(updatedPost);
      toast.success(`Created post: ${data.title}`);
    }
    
    navigate('/admin/posts');
  };
  
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
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
                  <RichTextEditor
                    id="content"
                    label="Content"
                    value={form.watch("content")}
                    onChange={(value) => form.setValue("content", value)}
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
                  <ImageUploader
                    label="Cover Image"
                    value={form.watch("cover_image")}
                    onChange={(url) => form.setValue("cover_image", url)}
                  />
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
                    <Label htmlFor="created_at">Publication Date</Label>
                    <Input 
                      id="created_at" 
                      type="date" 
                      value={new Date(post.created_at).toISOString().split('T')[0]}
                      onChange={(e) => {
                        const date = new Date(e.target.value);
                        setPost(prev => ({ ...prev, created_at: date.toISOString() }));
                      }}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Categories</Label>
                    <div className="grid grid-cols-2 gap-2 border rounded-md p-4">
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`category-${category.id}`} 
                            checked={selectedCategories.includes(category.id)}
                            onCheckedChange={() => handleCategoryChange(category.id)}
                          />
                          <Label htmlFor={`category-${category.id}`}>{category.name}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="read_time">Read Time (minutes)</Label>
                    <Input 
                      id="read_time" 
                      type="number" 
                      min="1" 
                      {...form.register("read_time", { valueAsNumber: true })}
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