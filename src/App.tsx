
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AllPosts from "./pages/AllPosts";
import Post from "./pages/Post";
import Category from "./pages/Category";
import Search from "./pages/Search";
import Community from "./pages/Community";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPosts from "./pages/admin/AdminPosts";
import AdminEditPost from "./pages/admin/AdminEditPost";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminCommunity from "./pages/admin/AdminCommunity";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/all-posts" element={<AllPosts />} />
          <Route path="/post/:slug" element={<Post />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/search" element={<Search />} />
          <Route path="/community" element={<Community />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
          <Route path="/admin/posts" element={<AdminProtectedRoute><AdminPosts /></AdminProtectedRoute>} />
          <Route path="/admin/posts/new" element={<AdminProtectedRoute><AdminEditPost /></AdminProtectedRoute>} />
          <Route path="/admin/posts/edit/:id" element={<AdminProtectedRoute><AdminEditPost /></AdminProtectedRoute>} />
          <Route path="/admin/settings" element={<AdminProtectedRoute><AdminSettings /></AdminProtectedRoute>} />
          <Route path="/admin/community" element={<AdminProtectedRoute><AdminCommunity /></AdminProtectedRoute>} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
