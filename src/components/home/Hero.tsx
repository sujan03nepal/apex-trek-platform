import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Play, ChevronDown, Mountain, Star, Users, Award } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920&q=80')`
        }}
      >
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-overlay" />
        <div className="absolute inset-0 bg-sapphire-dark/40" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 right-10 hidden lg:block animate-float">
        <div className="bg-card/10 backdrop-blur-md rounded-2xl p-4 border border-primary-foreground/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
              <Star className="h-6 w-6 text-accent-foreground" />
            </div>
            <div>
              <p className="text-primary-foreground font-semibold">4.9/5 Rating</p>
              <p className="text-primary-foreground/70 text-sm">2,500+ Reviews</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-1/3 left-10 hidden lg:block animate-float delay-300">
        <div className="bg-card/10 backdrop-blur-md rounded-2xl p-4 border border-primary-foreground/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-forest flex items-center justify-center">
              <Users className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-primary-foreground font-semibold">15,000+</p>
              <p className="text-primary-foreground/70 text-sm">Happy Trekkers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-4xl">
          <div className="flex items-center gap-2 mb-6 animate-fade-up">
            <Award className="h-5 w-5 text-accent" />
            <span className="text-accent font-medium text-sm tracking-wide uppercase">
              Award-Winning Adventure Company
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-up delay-100">
            Discover the
            <span className="block text-gradient">Himalayas</span>
            Your Way
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mb-8 animate-fade-up delay-200">
            From the majestic peaks of Everest to the serene valleys of Annapurna, 
            embark on unforgettable trekking adventures with Nepal's most trusted guides.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-up delay-300">
            <Button variant="hero" size="xl" asChild>
              <Link to="/treks">
                <Mountain className="h-5 w-5" />
                Explore Treks
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <Link to="/about">
                <Play className="h-5 w-5" />
                Watch Our Story
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-lg animate-fade-up delay-400">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground">50+</p>
              <p className="text-sm text-primary-foreground/70">Trek Packages</p>
            </div>
            <div className="text-center border-x border-primary-foreground/20">
              <p className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground">14+</p>
              <p className="text-sm text-primary-foreground/70">Years Experience</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground">100%</p>
              <p className="text-sm text-primary-foreground/70">Safe Returns</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#featured" className="flex flex-col items-center text-primary-foreground/60 hover:text-accent transition-colors">
          <span className="text-sm mb-2">Scroll to explore</span>
          <ChevronDown className="h-6 w-6" />
        </a>
      </div>
    </section>
  );
}
