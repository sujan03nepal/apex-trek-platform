import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTreks } from "@/hooks/useTreks";
import { 
  Clock, Mountain, Star, ArrowRight, Search, Filter, 
  X, ChevronDown, TrendingUp, MapPin, Loader2
} from "lucide-react";

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
      <div className="relative h-56 overflow-hidden">
        <img
          src={imageUrl}
          alt={trek.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = defaultImage;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sapphire-dark/80 via-transparent to-transparent" />
        
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

        <div className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-1.5">
          <p className="text-xs text-muted-foreground">From</p>
          <p className="text-lg font-bold text-foreground">${trek.price || 0}</p>
        </div>

        <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-card/90 backdrop-blur-sm rounded-lg px-2 py-1">
          <Star className="h-4 w-4 fill-accent text-accent" />
          <span className="font-semibold text-foreground">{trek.rating || 0}</span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <MapPin className="h-4 w-4" />
          <span className="font-medium text-accent">Trek</span>
        </div>
        
        <h3 className="font-serif text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
          {trek.name}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {trek.short_description || "Amazing trek experience"}
        </p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{trek.duration || "TBD"}</span>
          </div>
          <div className="flex items-center gap-1">
            <Mountain className="h-4 w-4" />
            <span>{trek.max_altitude || "TBD"}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

const difficulties = ["Easy", "Moderate", "Challenging", "Strenuous"];

export default function Treks() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const { treks, loading } = useTreks();

  const selectedDifficulty = searchParams.get("difficulty") || "";
  const sortBy = searchParams.get("sort") || "popular";

  const filteredTreks = useMemo(() => {
    let result = [...treks];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        trek =>
          (trek.name?.toLowerCase().includes(query) || false) ||
          (trek.short_description?.toLowerCase().includes(query) || false)
      );
    }

    // Difficulty filter
    if (selectedDifficulty) {
      result = result.filter(
        trek => trek.difficulty?.toLowerCase() === selectedDifficulty.toLowerCase()
      );
    }

    // Sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => ((a.price || 0) - (b.price || 0)));
        break;
      case "price-high":
        result.sort((a, b) => ((b.price || 0) - (a.price || 0)));
        break;
      case "rating":
        result.sort((a, b) => ((b.rating || 0) - (a.rating || 0)));
        break;
      default: // popular
        result.sort((a, b) => ((b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0)));
    }

    return result;
  }, [searchQuery, selectedDifficulty, sortBy, treks]);

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSearchParams({});
  };

  const hasActiveFilters = searchQuery || selectedDifficulty;

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-28 pb-16 bg-gradient-mountain">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Explore Our Treks
            </h1>
            <p className="text-lg text-primary-foreground/80">
              From gentle valley walks to challenging high-altitude expeditions, 
              find the perfect Himalayan adventure for you.
            </p>
          </div>
        </div>
      </section>

      {/* Filters & Content */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          {/* Search & Filter Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search treks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>

            {/* Filter Toggle (Mobile) */}
            <Button
              variant="outline"
              className="lg:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {hasActiveFilters && (
                <Badge className="ml-2 bg-accent text-accent-foreground">Active</Badge>
              )}
            </Button>

            {/* Desktop Filters */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Difficulty Filter */}
              <select
                value={selectedDifficulty}
                onChange={(e) => updateFilter("difficulty", e.target.value)}
                className="px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="">All Difficulties</option>
                {difficulties.map(diff => (
                  <option key={diff} value={diff.toLowerCase()}>
                    {diff}
                  </option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => updateFilter("sort", e.target.value)}
                className="px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>

              {hasActiveFilters && (
                <Button variant="ghost" onClick={clearFilters}>
                  <X className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Filters Panel */}
          {showFilters && (
            <div className="lg:hidden bg-card rounded-lg border border-border p-4 mb-6 space-y-4 animate-slide-in">
              <select
                value={selectedDifficulty}
                onChange={(e) => updateFilter("difficulty", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="">All Difficulties</option>
                {difficulties.map(diff => (
                  <option key={diff} value={diff.toLowerCase()}>
                    {diff}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => updateFilter("sort", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>

              {hasActiveFilters && (
                <Button variant="outline" className="w-full" onClick={clearFilters}>
                  <X className="h-4 w-4 mr-1" />
                  Clear All Filters
                </Button>
              )}
            </div>
          )}

          {/* Results Count */}
          <p className="text-muted-foreground mb-6">
            Showing <span className="font-semibold text-foreground">{filteredTreks.length}</span> treks
          </p>

          {/* Trek Grid */}
          {filteredTreks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTreks.map(trek => (
                <TrekCard key={trek.id} trek={trek} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Mountain className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No treks found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or search query
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
