import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTreks } from "@/hooks/useTreks";
import { Clock, Mountain, Star, ArrowRight, TrendingUp, Loader2 } from "lucide-react";

function TrekCard({ trek }: { trek: any }) {
  const difficultyColors: Record<string, string> = {
    Easy: "bg-forest/20 text-forest border-forest/30",
    Moderate: "bg-accent/20 text-accent border-accent/30",
    Challenging: "bg-sunset/20 text-sunset border-sunset/30",
    Strenuous: "bg-destructive/20 text-destructive border-destructive/30",
  };

  const defaultImage = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop";
  const imageUrl = trek.featured_image_url || defaultImage;

  return (
    <Link 
      to={`/treks/${trek.slug}`}
      className="group block bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-strong transition-all duration-500 border border-border hover:border-accent/30"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={imageUrl}
          alt={trek.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = defaultImage;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sapphire-dark/80 via-transparent to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge className={difficultyColors[trek.difficulty] || difficultyColors.Moderate}>
            {trek.difficulty}
          </Badge>
          {trek.is_featured && (
            <Badge className="bg-accent text-accent-foreground border-0">
              <TrendingUp className="h-3 w-3 mr-1" />
              Popular
            </Badge>
          )}
        </div>

        {/* Price */}
        <div className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-1.5">
          <p className="text-xs text-muted-foreground">From</p>
          <p className="text-lg font-bold text-foreground">${trek.price || 0}</p>
        </div>

        {/* Rating */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-card/90 backdrop-blur-sm rounded-lg px-2 py-1">
          <Star className="h-4 w-4 fill-accent text-accent" />
          <span className="font-semibold text-foreground">{trek.rating || 0}</span>
          <span className="text-xs text-muted-foreground">({trek.review_count || 0})</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span className="font-medium text-accent">Trek</span>
        </div>
        
        <h3 className="font-serif text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
          {trek.name}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {trek.short_description || "Amazing trek experience"}
        </p>

        {/* Trek Info */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{trek.duration || "TBD"}</span>
          </div>
          <div className="flex items-center gap-1">
            <Mountain className="h-4 w-4" />
            <span>{trek.max_altitude || "TBD"}</span>
          </div>
        </div>

        {/* Button */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-sm font-medium text-accent">View Details</span>
          <ArrowRight className="h-4 w-4 text-accent transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

export function FeaturedTreks() {
  const { treks, loading } = useTreks();
  
  // Get featured treks, limit to 6
  const featuredTreks = treks
    .filter(trek => trek.is_published && trek.is_featured)
    .slice(0, 6);

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-96">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="outline">
            Featured Adventures
          </Badge>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Discover Our Featured Treks
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the most popular and highly-rated treks in the Himalayas, 
            carefully selected for their natural beauty and cultural significance.
          </p>
        </div>

        {/* Treks Grid */}
        {featuredTreks.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredTreks.map(trek => (
                <TrekCard key={trek.id} trek={trek} />
              ))}
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <Button asChild size="lg" variant="gold">
                <Link to="/treks">
                  Explore All Treks
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No featured treks available yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
