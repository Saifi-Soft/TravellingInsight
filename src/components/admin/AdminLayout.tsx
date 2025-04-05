import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAdmin } from '@/contexts/AdminContext';
import { LayoutDashboard, FileText, Settings, LogOut, Users, MessageSquare, Tag } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const { logout } = useAdmin();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md min-h-screen p-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-primary">Travelling Insight Admin</h2>
          </div>
          <nav className="space-y-2">
            <Link to="/admin">
              <Button 
                variant={location.pathname === '/admin' ? 'default' : 'ghost'} 
                className="w-full justify-start"
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link to="/admin/posts">
              <Button 
                variant={location.pathname.includes('/admin/posts') ? 'default' : 'ghost'} 
                className="w-full justify-start"
              >
                <FileText className="mr-2 h-4 w-4" />
                Posts
                </Button>
            </Link>
            <Link to="/admin/categories">
              <Button 
                variant={location.pathname.includes('/admin/categories') ? 'default' : 'ghost'} 
                className="w-full justify-start"
              >
                <Tag className="mr-2 h-4 w-4" />
                Categories
              </Button>
            </Link>
            <Link to="/admin/comments">
              <Button 
                variant={location.pathname === '/admin/comments' ? 'default' : 'ghost'} 
                className="w-full justify-start"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Comments
              </Button>
            </Link>
            <Link to="/admin/community">
              <Button 
                variant={location.pathname === '/admin/community' ? 'default' : 'ghost'} 
                className="w-full justify-start"
              >
                <Users className="mr-2 h-4 w-4" />
                Community
              </Button>
            </Link>
            <Link to="/admin/settings">
              <Button 
                variant={location.pathname === '/admin/settings' ? 'default' : 'ghost'} 
                className="w-full justify-start"
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </Link>
          </nav>
          <div className="absolute bottom-8 w-52">
            <Button 
              variant="outline" 
              className="w-full justify-start text-red-500 hover:text-red-700"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">{title}</h1>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;