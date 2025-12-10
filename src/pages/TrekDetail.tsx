import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTreks } from "@/hooks/useTreks";
import { useSettings } from "@/hooks/useSettings";
import { 
  Clock, Mountain, Star, Calendar, MapPin, Users, 
  Check, X, ChevronRight, Phone, Mail, ArrowLeft,
  Sunrise, ThermometerSun, Loader2
} from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

type TrekItinerary = Tables<'trek_itineraries'>;

export default function TrekDetail() {
  const { slug } = useParams();
  const { treks, loading } = useTreks();
  const { settings } = useSettings();
  const [activeTab, setActiveTab] = useState<"overview" | "itinerary" | "includes">("overview");
  const [selectedImage, setSelectedImage] = useState(0);
  const [itinerary, setItinerary] = useState<TrekItinerary[]>([]);
  
  const trek = treks.find(t => t.slug === slug);

  useEffect(() => {
    if (trek?.id) {
      supabase
        .from('trek_itineraries')
        .select('*')
        .eq('trek_id', trek.id)
        .order('day_number')
        .then(({ data }) => {
          if (data) setItinerary(data);
        });
    }
  }, [trek?.id]);

  const primaryPhone = settings?.phone_numbers?.[0] || "+977 123 456 7890";
  const primaryEmail = settings?.email_addresses?.[0] || "info@nepaltreks.com";

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-accent" />
        </div>
      </Layout>
    );
  }

  if (!trek) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Mountain className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Trek not found</h1>
            <p className="text-muted-foreground mb-4">The trek you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/treks">View All Treks</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const images = trek.gallery_images?.length ? trek.gallery_images : [trek.featured_image_url || 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800'];

  const difficultyColors: Record<string, string> = {
    Easy: "bg-forest/20 text-forest",
    Moderate: "bg-accent/20 text-accent",
    Challenging: "bg-sunset/20 text-sunset",
    Strenuous: "bg-destructive/20 text-destructive",
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${images[selectedImage]}')` }}
        >
          <div className="absolute inset-0 bg-gradient-overlay" />
          <div className="absolute inset-0 bg-sapphire-dark/30" />
        </div>

        <div className="relative h-full container mx-auto px-4 flex flex-col justify-end pb-12">
          <Link 
            to="/treks" 
            className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Treks
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            {trek.difficulty && (
              <Badge className={difficultyColors[trek.difficulty] || "bg-accent/20 text-accent"}>
                {trek.difficulty}
              </Badge>
            )}
            <div className="flex items-center gap-1 bg-card/20 backdrop-blur-sm rounded-full px-3 py-1">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="font-semibold text-primary-foreground">{trek.rating || 0}</span>
              <span className="text-primary-foreground/70">({trek.review_count || 0} reviews)</span>
            </div>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4">
            {trek.name}
          </h1>
          
          <p className="text-lg text-primary-foreground/80 max-w-2xl">
            {trek.short_description}
          </p>
        </div>
      </section>

      {/* Image Gallery Thumbnails */}
      {images.length > 1 && (
        <div className="bg-sapphire-dark py-4">
          <div className="container mx-auto px-4">
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? "border-accent" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Content Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Quick Facts */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                <div className="bg-card rounded-xl p-4 border border-border">
                  <Clock className="h-6 w-6 text-accent mb-2" />
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-semibold text-foreground">{trek.duration || 'N/A'}</p>
                </div>
                <div className="bg-card rounded-xl p-4 border border-border">
                  <Mountain className="h-6 w-6 text-accent mb-2" />
                  <p className="text-sm text-muted-foreground">Max Altitude</p>
                  <p className="font-semibold text-foreground">{trek.max_altitude || 'N/A'}</p>
                </div>
                <div className="bg-card rounded-xl p-4 border border-border">
                  <Sunrise className="h-6 w-6 text-accent mb-2" />
                  <p className="text-sm text-muted-foreground">Best Season</p>
                  <p className="font-semibold text-foreground">{trek.best_seasons?.[0] || 'Year-round'}</p>
                </div>
                <div className="bg-card rounded-xl p-4 border border-border">
                  <ThermometerSun className="h-6 w-6 text-accent mb-2" />
                  <p className="text-sm text-muted-foreground">Difficulty</p>
                  <p className="font-semibold text-foreground">{trek.difficulty || 'N/A'}</p>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-border mb-8">
                {(["overview", "itinerary", "includes"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 font-medium capitalize transition-colors ${
                      activeTab === tab
                        ? "text-accent border-b-2 border-accent"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab === "includes" ? "Cost Details" : tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {activeTab === "overview" && (
                <div className="space-y-8 animate-fade-in">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-4">About This Trek</h2>
                    <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{trek.description}</div>
                  </div>

                  {trek.highlights && trek.highlights.length > 0 && (
                    <div>
                      <h3 className="font-serif text-xl font-bold text-foreground mb-4">Trip Highlights</h3>
                      <ul className="space-y-3">
                        {trek.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="h-4 w-4 text-accent" />
                            </div>
                            <span className="text-foreground">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "itinerary" && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="font-serif text-2xl font-bold text-foreground">Day-by-Day Itinerary</h2>
                  {itinerary.length === 0 ? (
                    <p className="text-muted-foreground">Itinerary details coming soon...</p>
                  ) : (
                    <div className="space-y-4">
                      {itinerary.map((day) => (
                        <div 
                          key={day.id} 
                          className="bg-card rounded-xl p-6 border border-border hover:border-accent/30 transition-colors"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                              <span className="font-bold text-accent">D{day.day_number}</span>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg text-foreground mb-1">
                                {day.title}
                              </h4>
                              <p className="text-muted-foreground mb-3">{day.description}</p>
                              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                {day.altitude && (
                                  <span className="flex items-center gap-1">
                                    <Mountain className="h-4 w-4" />
                                    {day.altitude}
                                  </span>
                                )}
                                {day.distance && (
                                  <span className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    {day.distance}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "includes" && (
                <div className="grid md:grid-cols-2 gap-8 animate-fade-in">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-forest/20 flex items-center justify-center">
                        <Check className="h-5 w-5 text-forest" />
                      </div>
                      Cost Includes
                    </h3>
                    {trek.includes && trek.includes.length > 0 ? (
                      <ul className="space-y-3">
                        {trek.includes.map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-forest flex-shrink-0 mt-0.5" />
                            <span className="text-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground">Details coming soon...</p>
                    )}
                  </div>

                  <div>
                    <h3 className="font-serif text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center">
                        <X className="h-5 w-5 text-destructive" />
                      </div>
                      Cost Excludes
                    </h3>
                    {trek.excludes && trek.excludes.length > 0 ? (
                      <ul className="space-y-3">
                        {trek.excludes.map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <X className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                            <span className="text-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground">Details coming soon...</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-card rounded-2xl border border-border shadow-medium p-6">
                <div className="text-center mb-6">
                  <p className="text-sm text-muted-foreground mb-1">Starting from</p>
                  <p className="font-serif text-4xl font-bold text-foreground">
                    ${trek.price || 0}
                    <span className="text-lg font-normal text-muted-foreground">/person</span>
                  </p>
                </div>

                <Button variant="gold" size="xl" className="w-full mb-4" asChild>
                  <Link to={`/booking/${trek.slug}`}>Book This Trek</Link>
                </Button>

                <Button variant="outline" size="lg" className="w-full mb-6" asChild>
                  <Link to="/contact">
                    <Mail className="h-4 w-4 mr-2" />
                    Inquire Now
                  </Link>
                </Button>

                <div className="border-t border-border pt-6 space-y-4">
                  <h4 className="font-semibold text-foreground">Need Help?</h4>
                  <a href={`tel:${primaryPhone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
                    <Phone className="h-4 w-4" />
                    {primaryPhone}
                  </a>
                  <a href={`mailto:${primaryEmail}`} className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
                    <Mail className="h-4 w-4" />
                    {primaryEmail}
                  </a>
                </div>

                <div className="border-t border-border pt-6 mt-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>Group discounts available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
