import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const AdminSettings = () => {
  const handleSave = () => {
    toast.success('Settings saved successfully');
  };
  
  return (
    <AdminLayout title="Settings">
      <div className="mb-6">
        <p className="text-muted-foreground">Manage your blog settings and preferences</p>
      </div>
      
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="api">API & Integrations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Blog Information</CardTitle>
              <CardDescription>
                Update your blog details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-name">Blog Name</Label>
                <Input id="site-name" defaultValue="Travelling Insight" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-description">Blog Description</Label>
                <Input id="site-description" defaultValue="Discover the world through our insightful travel guides and tips" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input id="contact-email" type="email" defaultValue="contact@travellinginsight.com" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Save Changes</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Comments</CardTitle>
              <CardDescription>
                Configure how comments are handled on your blog
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="comments-enabled">Enable Comments</Label>
                  <p className="text-muted-foreground text-sm">
                    Allow visitors to leave comments on your posts
                  </p>
                </div>
                <Switch id="comments-enabled" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="moderation">Comment Moderation</Label>
                  <p className="text-muted-foreground text-sm">
                    Review and approve comments before they are published
                  </p>
                </div>
                <Switch id="moderation" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-muted-foreground text-sm">
                    Receive email notifications for new comments
                  </p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
              <CardDescription>
                Customize the appearance of your blog
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Theme Mode</Label>
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1">Light</Button>
                  <Button variant="outline" className="flex-1">Dark</Button>
                  <Button variant="outline" className="flex-1">System</Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Accent Color</Label>
                <div className="flex gap-2">
                  <Button variant="outline" className="h-8 w-8 rounded-full bg-primary" />
                  <Button variant="outline" className="h-8 w-8 rounded-full bg-blue-500" />
                  <Button variant="outline" className="h-8 w-8 rounded-full bg-green-500" />
                  <Button variant="outline" className="h-8 w-8 rounded-full bg-purple-500" />
                  <Button variant="outline" className="h-8 w-8 rounded-full bg-yellow-500" />
                  <Button variant="outline" className="h-8 w-8 rounded-full bg-red-500" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Save Theme Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="seo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>
                Optimize your blog for search engines
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meta-title">Default Meta Title</Label>
                <Input id="meta-title" defaultValue="Travelling Insight - Travel Guides and Tips" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="meta-description">Default Meta Description</Label>
                <Input id="meta-description" defaultValue="Discover amazing travel destinations, tips, and guides from around the world." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="keywords">Default Keywords</Label>
                <Input id="keywords" defaultValue="travel, destinations, guides, tips, adventure, tourism" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sitemap">Generate Sitemap</Label>
                  <p className="text-muted-foreground text-sm">
                    Automatically generate and update sitemap.xml
                  </p>
                </div>
                <Switch id="sitemap" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Save SEO Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Access</CardTitle>
              <CardDescription>
                Manage API keys and integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <div className="flex gap-2">
                  <Input id="api-key" defaultValue="sk_test_4eC39HqLyjWDarjtT1zdp7dc" type="password" />
                  <Button variant="outline">Regenerate</Button>
                </div>
                <p className="text-muted-foreground text-sm">
                  Your API key provides full access to your blog content. Keep it secure!
                </p>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Connected Services</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between border rounded-lg p-3">
                    <div>
                      <h4 className="font-medium">Google Analytics</h4>
                      <p className="text-sm text-muted-foreground">Track website traffic</p>
                    </div>
                    <Button variant="outline">Connect</Button>
                  </div>
                  <div className="flex items-center justify-between border rounded-lg p-3">
                    <div>
                      <h4 className="font-medium">Mailchimp</h4>
                      <p className="text-sm text-muted-foreground">Email newsletter integration</p>
                    </div>
                    <Button variant="outline">Connect</Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Save API Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminSettings;
