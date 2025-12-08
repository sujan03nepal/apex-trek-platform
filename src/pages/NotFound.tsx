import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Mountain, ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <section className="min-h-[80vh] flex items-center justify-center bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-8">
              <Mountain className="h-12 w-12 text-accent" />
            </div>
            
            <h1 className="font-serif text-6xl md:text-7xl font-bold text-foreground mb-4">
              404
            </h1>
            
            <p className="text-xl text-muted-foreground mb-2">
              Oops! This trail doesn't exist.
            </p>
            <p className="text-muted-foreground mb-8">
              The page you're looking for might have been moved or doesn't exist. 
              Let's get you back on the right path.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="gold" size="lg" asChild>
                <Link to="/">
                  <Home className="h-5 w-5" />
                  Back to Home
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/treks">
                  <Mountain className="h-5 w-5" />
                  Explore Treks
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
