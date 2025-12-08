import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getFeaturedTreks, Trek } from "@/data/treks";
import { Clock, Mountain, Star, ArrowRight, TrendingUp } from "lucide-react";

function TrekCard({ trek }: { trek: Trek }) {
  const difficultyColors = {
    Easy: "bg-forest/20 text-forest border-forest/30",
    Moderate: "bg-accent/20 text-accent border-accent/30",
    Challenging: "bg-sunset/20 text-sunset border-sunset/30",
    Strenuous: "bg-destructive/20 text-destructive border-destructive/30",
  };

  return (
    <Link 
      to={`/treks/${trek.slug}`}
      className="group block bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-strong transition-all duration-500 border border-border hover:border-accent/30"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={trek.images[0]}
          alt={trek.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sapphire-dark/80 via-transparent to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge className={difficultyColors[trek.difficulty]}>
            {trek.difficulty}
          </Badge>
          {trek.featured && (
            <Badge className="bg-accent text-accent-foreground border-0">
              <TrendingUp className="h-3 w-3 mr-1" />
              Popular
            </Badge>
          )}
        </div>

        {/* Price */}
        <div className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-1.5">
          <p className="text-xs text-muted-foreground">From</p>
          <p className="text-lg font-bold text-foreground">${trek.price}</p>
        </div>

        {/* Rating */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-card/90 backdrop-blur-sm rounded-lg px-2 py-1">
          <Star className="h-4 w-4 fill-accent text-accent" />
          <span className="font-semibold text-foreground">{trek.rating}</span>
          <span className="text-xs text-muted-foreground">({trek.reviews})</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span className="font-medium text-accent">{trek.region} Region</span>
        </div>
        
        <h3 className="font-serif text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
          {trek.name}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {trek.shortDescription}
        </p>

        {/* Trek Info */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{trek.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Mountain className="h-4 w-4" />
            <span>{trek.maxAltitude}</span>
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Best: {trek.bestSeasons[0]}
          </span>
          <span className="flex items-center gap-1 text-accent font-medium group-hover:gap-2 transition-all">
            View Details
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function FeaturedTreks() {
  const featuredTreks = getFeaturedTreks();

  return (
    <section id="featured" className="py-20 lg:py-28 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent font-medium text-sm mb-4">
            Featured Adventures
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Most Popular Treks
          </h2>
          <p className="text-muted-foreground text-lg">
            Discover our handpicked selection of the most spectacular Himalayan adventures, 
            loved by thousands of trekkers from around the world.
          </p>
        </div>

        {/* Trek Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredTreks.slice(0, 6).map((trek) => (
            <TrekCard key={trek.id} trek={trek} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button variant="gold" size="lg" asChild>
            <Link to="/treks">
              View All Treks
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
