import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import Index from "./pages/Index";
import Treks from "./pages/Treks";
import TrekDetail from "./pages/TrekDetail";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import FAQ from "./pages/FAQ";
import Gallery from "./pages/Gallery";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import BookingConfirmation from "./pages/BookingConfirmation";
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
import AboutManager from "./pages/admin/AboutManager";
import TeamManager from "./pages/admin/TeamManager";
import FAQManager from "./pages/admin/FAQManager";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/treks" element={<Treks />} />
          <Route path="/treks/:slug" element={<TrekDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/booking-confirmation" element={<BookingConfirmation />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/treks" element={<TrekManager />} />
          <Route path="/admin/blog" element={<BlogManager />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          <Route path="/admin/contacts" element={<ContactSubmissions />} />
          <Route path="/admin/media" element={<MediaLibrary />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/about" element={<AboutManager />} />
          <Route path="/admin/team" element={<TeamManager />} />
          <Route path="/admin/faqs" element={<FAQManager />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
