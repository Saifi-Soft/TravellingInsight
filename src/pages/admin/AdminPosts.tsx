
import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { posts, getPostCategories } from '@/data/posts';
import { PlusCircle, Edit, Trash } from 'lucide-react';
import { toast } from 'sonner';

const AdminPosts = () => {
  const sortedPosts = [...posts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handleDeleteClick = (id: string) => {
    // In a real app, this would call an API to delete the post
    toast.info(`Delete functionality would remove post with ID: ${id}`);
  };

  return (
    <AdminLayout title="Manage Posts">
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-muted-foreground">Manage your blog posts</p>
        </div>
        <Link to="/admin/posts/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </Link>
      </div>
      
      <div className="bg-white rounded-md shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Categories</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell>{new Date(post.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {getPostCategories(post).map((category) => (
                      <Badge key={category.id} variant="outline">
                        {category.name}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  {post.featured ? 
                    <Badge variant="default">Featured</Badge> : 
                    <Badge variant="outline">No</Badge>
                  }
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link to={`/admin/posts/edit/${post.id}`}>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-500"
                      onClick={() => handleDeleteClick(post.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
};

export default AdminPosts;
