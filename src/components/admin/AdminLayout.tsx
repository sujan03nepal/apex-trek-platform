import { ReactNode, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Mountain,
  Home,
  MapPin,
  BookOpen,
  Image,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminNavigation = [
  { icon: Home, label: "Dashboard", href: "/admin/dashboard" },
  { icon: MapPin, label: "Treks", href: "/admin/treks" },
  { icon: BookOpen, label: "Blog", href: "/admin/blog" },
  { icon: Image, label: "Media Library", href: "/admin/media" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full bg-card border-r border-border transition-all duration-300 z-40",
          isSidebarOpen ? "w-64" : "w-0"
        )}
      >
        <div className="p-6 border-b border-border">
          <Link to="/admin/dashboard" className="flex items-center gap-3 group">
            <div className="p-2 rounded-lg bg-primary">
              <Mountain className="h-5 w-5 text-primary-foreground" />
            </div>
            {isSidebarOpen && (
              <div className="flex flex-col">
                <span className="font-serif font-bold text-foreground">
                  Nepal Treks
                </span>
                <span className="text-xs text-muted-foreground">Admin</span>
              </div>
            )}
          </Link>
        </div>

        <nav className="p-4 space-y-2">
          {adminNavigation.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                location.pathname === item.href
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-muted text-foreground"
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {isSidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {isSidebarOpen && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main
        className={cn(
          "transition-all duration-300",
          isSidebarOpen ? "ml-64" : "ml-0"
        )}
      >
        {/* Top Bar */}
        <div className="bg-card border-b border-border p-4 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              {isSidebarOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>

            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                View Website
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
