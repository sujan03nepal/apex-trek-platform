import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, Calendar } from "lucide-react";

export function CallToAction() {
  return (
    <section className="py-20 lg:py-28 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-sapphire rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ready for Your{" "}
            <span className="text-gradient">Himalayan Adventure?</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
            Let us help you plan the trek of a lifetime. Whether you're a first-time 
            trekker or an experienced mountaineer, we have the perfect adventure waiting for you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button variant="gold" size="xl" asChild>
              <Link to="/treks">
                <Calendar className="h-5 w-5" />
                Browse Treks
              </Link>
            </Button>
            <Button variant="sapphire" size="xl" asChild>
              <Link to="/contact">
                <Phone className="h-5 w-5" />
                Talk to an Expert
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <svg className="h-6 w-6 text-accent" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              <span className="text-sm font-medium">TripAdvisor Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-6 w-6 text-forest" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z" />
              </svg>
              <span className="text-sm font-medium">Safety Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-6 w-6 text-sapphire-light" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-5-9v2h10v-2H7z" />
              </svg>
              <span className="text-sm font-medium">NMA Licensed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
