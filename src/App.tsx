import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataProvider } from "@/contexts/DataContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AllPosts from "./pages/AllPosts";
import Post from "./pages/Post";
import Category from "./pages/Category";
import Search from "./pages/Search";
import About from "./pages/About";
import Destinations from "./pages/Destinations";
import Community from "./pages/Community";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPosts from "./pages/admin/AdminPosts";
import AdminEditPost from "./pages/admin/AdminEditPost";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminCommunity from "./pages/admin/AdminCommunity";
import AdminComments from "./pages/admin/AdminComments";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";
import { useEffect, useState } from "react";
import { initializeStorage } from "./lib/storage/fileStorage";
import { toast } from "sonner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

const App = () => {
  const [storageStatus, setStorageStatus] = useState<{
    initialized: boolean;
    message?: string;
  }>({ initialized: false });
  
  // Initialize file storage on app load
  useEffect(() => {
    const initStorage = async () => {
      try {
        // Try to initialize storage
        console.log("App: Initializing storage...");
        const result = await initializeStorage();
        console.log("App: Storage initialization result:", result);
        if (result.success) {
          console.log("Storage initialized successfully");
          setStorageStatus({
            initialized: true,
            message: undefined,
          });
        } else {
          setStorageStatus({
            initialized: false,
          });
          const description = result.success ? "" : result.message;
          toast.error("Storage initialization failed", {
            description,
          });
        }
      } catch (err) {
        
        
        console.error("Error initializing storage:", err);
        setStorageStatus({ initialized: false });

        toast.error("Storage connection error", {
          description:
            "Storage connection error : " +
            err.message +
            " Using placeholder images instead. Check the server configuration to enable uploads.",
        });
      }
    };

    initStorage();
  }, []); // add an empty array to make it run only once
  
  return (
    <QueryClientProvider client={queryClient}>
      <DataProvider>
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
              <Route path="/about" element={<About />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/community" element={<Community />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
              <Route path="/admin/posts" element={<AdminProtectedRoute><AdminPosts /></AdminProtectedRoute>} />
              <Route path="/admin/posts/new" element={<AdminProtectedRoute><AdminEditPost /></AdminProtectedRoute>} />
              <Route path="/admin/posts/edit/:id" element={<AdminProtectedRoute><AdminEditPost /></AdminProtectedRoute>} />
              <Route path="/admin/settings" element={<AdminProtectedRoute><AdminSettings /></AdminProtectedRoute>} />
              <Route path="/admin/community" element={<AdminProtectedRoute><AdminCommunity /></AdminProtectedRoute>} />
              <Route path="/admin/comments" element={<AdminProtectedRoute><AdminComments /></AdminProtectedRoute>} />
              <Route path="/admin/categories" element={<AdminProtectedRoute><AdminCategories /></AdminProtectedRoute>} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </DataProvider>
    </QueryClientProvider>
  );
};

export default App;
