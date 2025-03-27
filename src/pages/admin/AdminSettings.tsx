import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { checkDatabaseConnection } from '@/lib/supabase/initDB';
import { Badge } from '@/components/ui/badge';

const AdminSettings = () => {
  const [dbConnected, setDbConnected] = useState<boolean | null>(null);
  
  useEffect(() => {
    const checkConnection = async () => {
      const connected = await checkDatabaseConnection();
      setDbConnected(connected);
    };
    
    checkConnection();
  }, []);
  
  const handleSave = (section: string) => {
    // In a real app, this would save settings to the database
    toast.success(`${section} settings saved`);
  };
  
  return (
    <AdminLayout title="Settings">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
        </TabsList>
        
        {/* General Settings */}
        <TabsContent value="general" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Site Information</CardTitle>
              <CardDescription>
                Basic information about your travel blog
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input id="siteName" defaultValue="Travel Horizons" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea 
                  id="siteDescription" 
                  defaultValue="Discover the world through our travel guides, tips, and stories." 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="logo">Logo URL</Label>
                <Input id="logo" placeholder="https://example.com/logo.png" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="favicon">Favicon URL</Label>
                <Input id="favicon" placeholder="https://example.com/favicon.ico" />
              </div>
              
              <Button onClick={() => handleSave('General')}>Save Changes</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Admin Account</CardTitle>
              <CardDescription>
                Update your admin credentials
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="adminUsername">Username</Label>
                <Input id="adminUsername" defaultValue="admin" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="adminPassword">New Password</Label>
                <Input id="adminPassword" type="password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              
              <Button onClick={() => handleSave('Account')}>Update Credentials</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* SEO Settings */}
        <TabsContent value="seo" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Search Engine Optimization</CardTitle>
              <CardDescription>
                Settings that help improve your site's visibility in search engines
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="metaTitle">Default Meta Title</Label>
                <Input id="metaTitle" defaultValue="Travel Horizons | Discover Your Next Adventure" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="metaDescription">Default Meta Description</Label>
                <Textarea 
                  id="metaDescription" 
                  defaultValue="Explore travel guides, tips, and stories to help plan your next adventure around the world." 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="keywords">Default Keywords</Label>
                <Input 
                  id="keywords" 
                  defaultValue="travel, adventure, guides, tourism, vacation, destinations" 
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="googleSiteVerification" />
                <Label htmlFor="googleSiteVerification">Google Site Verification</Label>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="googleAnalytics">Google Analytics ID</Label>
                <Input id="googleAnalytics" placeholder="UA-XXXXX-Y or G-XXXXXXXX" />
              </div>
              
              <Button onClick={() => handleSave('SEO')}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Social Media Settings */}
        <TabsContent value="social" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Profiles</CardTitle>
              <CardDescription>
                Connect your social media accounts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook</Label>
                <Input id="facebook" placeholder="https://facebook.com/youraccount" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter/X</Label>
                <Input id="twitter" placeholder="https://twitter.com/youraccount" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input id="instagram" placeholder="https://instagram.com/youraccount" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pinterest">Pinterest</Label>
                <Input id="pinterest" placeholder="https://pinterest.com/youraccount" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="youtube">YouTube</Label>
                <Input id="youtube" placeholder="https://youtube.com/channel/..." />
              </div>
              
              <Button onClick={() => handleSave('Social Media')}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Database Settings */}
        <TabsContent value="database" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Database Connection</CardTitle>
              <CardDescription>
                Status of your Supabase database connection
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <span>Connection Status:</span>
                {dbConnected === null ? (
                  <Badge variant="outline">Checking...</Badge>
                ) : dbConnected ? (
                  <Badge variant="success" className="bg-green-500">Connected</Badge>
                ) : (
                  <Badge variant="destructive">Disconnected</Badge>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="supabaseUrl">Supabase URL</Label>
                <Input 
                  id="supabaseUrl" 
                  value={import.meta.env.VITE_SUPABASE_URL || 'Not configured'} 
                  readOnly
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key</Label>
                <Input 
                  id="apiKey" 
                  type="password" 
                  value={import.meta.env.VITE_SUPABASE_ANON_KEY ? '••••••••••••••••' : 'Not configured'} 
                  readOnly 
                />
              </div>
              
              <Button onClick={() => window.location.reload()}>
                Test Connection
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Newsletter Settings */}
        <TabsContent value="newsletter" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Newsletter Configuration</CardTitle>
              <CardDescription>
                Settings for your email newsletter
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newsletterProvider">Newsletter Provider</Label>
                <Input id="newsletterProvider" defaultValue="Mailchimp" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key</Label>
                <Input id="apiKey" type="password" placeholder="Your newsletter provider API key" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="listId">List ID</Label>
                <Input id="listId" placeholder="Newsletter list identifier" />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="doubleOptIn" defaultChecked />
                <Label htmlFor="doubleOptIn">Require Double Opt-in</Label>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmationEmail">Confirmation Email Subject</Label>
                <Input 
                  id="confirmationEmail" 
                  defaultValue="Confirm your subscription to Travel Horizons" 
                />
              </div>
              
              <Button onClick={() => handleSave('Newsletter')}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminSettings;
