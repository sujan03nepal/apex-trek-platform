import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mail, Lock, Mountain } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user && !authLoading) {
      navigate("/admin/dashboard");
    }
  }, [user, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        if (signInError.message.includes("Invalid login credentials")) {
          setError("Invalid email or password. Please try again.");
        } else {
          setError(signInError.message);
        }
        setIsLoading(false);
        return;
      }

      if (data.user) {
        navigate("/admin/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-mountain flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-mountain flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="p-3 rounded-xl bg-accent">
            <Mountain className="h-8 w-8 text-accent-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-bold text-primary-foreground">
              Nepal Treks
            </span>
            <span className="text-xs tracking-widest uppercase text-primary-foreground/70">
              Admin Panel
            </span>
          </div>
        </Link>

        {/* Login Card */}
        <div className="bg-card rounded-2xl border border-border shadow-strong p-8">
          <h1 className="font-serif text-2xl font-bold text-foreground mb-2">
            Admin Login
          </h1>
          <p className="text-muted-foreground mb-8">
            Sign in to manage your website content
          </p>

          {error && (
            <div className="bg-destructive/20 border border-destructive/30 rounded-lg p-4 mb-6 text-destructive text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="admin@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              variant="gold" 
              size="lg" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <Link 
            to="/" 
            className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
          >
            ← Back to Website
          </Link>
        </div>
      </div>
    </div>
  );
}
