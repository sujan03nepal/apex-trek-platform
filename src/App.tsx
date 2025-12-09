import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Treks from "./pages/Treks";
import TrekDetail from "./pages/TrekDetail";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import TrekManager from "./pages/admin/TrekManager";
import BlogManager from "./pages/admin/BlogManager";
import MediaLibrary from "./pages/admin/MediaLibrary";
import AdminSettings from "./pages/admin/Settings";
import AdminBookings from "./pages/admin/Bookings";
import ContactSubmissions from "./pages/admin/ContactSubmissions";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/treks" element={<Treks />} />
          <Route path="/treks/:slug" element={<TrekDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/treks" element={<TrekManager />} />
          <Route path="/admin/blog" element={<BlogManager />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          <Route path="/admin/contact" element={<ContactSubmissions />} />
          <Route path="/admin/media" element={<MediaLibrary />} />
          <Route path="/admin/settings" element={<AdminSettings />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
