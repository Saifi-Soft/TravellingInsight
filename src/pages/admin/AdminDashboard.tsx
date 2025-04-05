import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Overview } from '@/components/admin/Overview';
import { RecentSales } from '@/components/admin/RecentSales';
import { BarChart, Calendar, Globe, MessageSquare, TrendingUp, Users } from 'lucide-react';
import { useData } from '@/contexts/DataContext';

const AdminDashboard = () => {
  const { posts, comments, categories } = useData();
  
  // Count post views (this would come from analytics in a real app)
  const totalViews = posts.length * 120; // Fake calculation
  
  // Get this month's posts
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const postsThisMonth = posts.filter(post => {
    const postDate = new Date(post.created_at);
    return postDate.getMonth() === currentMonth && postDate.getFullYear() === currentYear;
  });
  
  const stats = [
    {
      title: "Total Posts",
      value: posts.length,
      change: "+12.3%",
      icon: <Globe className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Total Views",
      value: totalViews.toLocaleString(),
      change: "+19.5%",
      icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Categories",
      value: categories.length,
      change: "+7.2%",
      icon: <BarChart className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Comments",
      value: comments.length,
      change: "+4.6%",
      icon: <MessageSquare className="h-4 w-4 text-muted-foreground" />,
    },
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Tabs defaultValue="overview" className="space-y-4 mt-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Posts</CardTitle>
                <CardDescription>
                  You published {postsThisMonth.length} posts this month.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentSales />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>
                View detailed analytics and traffic data for your blog.
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Analytics data will appear here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>
                Generate custom reports for your blog performance.
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Reports data will appear here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Manage your notification preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Notification settings will appear here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminDashboard;
