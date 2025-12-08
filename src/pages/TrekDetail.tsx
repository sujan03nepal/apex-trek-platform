import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getTrekBySlug } from "@/data/treks";
import { 
  Clock, Mountain, Star, Calendar, MapPin, Users, 
  Check, X, ChevronRight, Phone, Mail, ArrowLeft,
  Sunrise, ThermometerSun
} from "lucide-react";
import { useState } from "react";

export default function TrekDetail() {
  const { slug } = useParams();
  const trek = getTrekBySlug(slug || "");
  const [activeTab, setActiveTab] = useState<"overview" | "itinerary" | "includes">("overview");
  const [selectedImage, setSelectedImage] = useState(0);

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

  const difficultyColors = {
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
          style={{ backgroundImage: `url('${trek.images[selectedImage]}')` }}
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
            <Badge className={difficultyColors[trek.difficulty]}>
              {trek.difficulty}
            </Badge>
            <Badge className="bg-accent/20 text-accent">
              <MapPin className="h-3 w-3 mr-1" />
              {trek.region} Region
            </Badge>
            <div className="flex items-center gap-1 bg-card/20 backdrop-blur-sm rounded-full px-3 py-1">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="font-semibold text-primary-foreground">{trek.rating}</span>
              <span className="text-primary-foreground/70">({trek.reviews} reviews)</span>
            </div>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4">
            {trek.name}
          </h1>
          
          <p className="text-lg text-primary-foreground/80 max-w-2xl">
            {trek.shortDescription}
          </p>
        </div>
      </section>

      {/* Image Gallery Thumbnails */}
      <div className="bg-sapphire-dark py-4">
        <div className="container mx-auto px-4">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {trek.images.map((image, index) => (
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
                  <p className="font-semibold text-foreground">{trek.duration}</p>
                </div>
                <div className="bg-card rounded-xl p-4 border border-border">
                  <Mountain className="h-6 w-6 text-accent mb-2" />
                  <p className="text-sm text-muted-foreground">Max Altitude</p>
                  <p className="font-semibold text-foreground">{trek.maxAltitude}</p>
                </div>
                <div className="bg-card rounded-xl p-4 border border-border">
                  <Sunrise className="h-6 w-6 text-accent mb-2" />
                  <p className="text-sm text-muted-foreground">Best Season</p>
                  <p className="font-semibold text-foreground">{trek.bestSeasons[0]}</p>
                </div>
                <div className="bg-card rounded-xl p-4 border border-border">
                  <ThermometerSun className="h-6 w-6 text-accent mb-2" />
                  <p className="text-sm text-muted-foreground">Difficulty</p>
                  <p className="font-semibold text-foreground">{trek.difficulty}</p>
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
                    <p className="text-muted-foreground leading-relaxed">{trek.description}</p>
                  </div>

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
                </div>
              )}

              {activeTab === "itinerary" && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="font-serif text-2xl font-bold text-foreground">Day-by-Day Itinerary</h2>
                  <div className="space-y-4">
                    {trek.itinerary.map((day, index) => (
                      <div 
                        key={index} 
                        className="bg-card rounded-xl p-6 border border-border hover:border-accent/30 transition-colors"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                            <span className="font-bold text-accent">D{day.day}</span>
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
                    <ul className="space-y-3">
                      {trek.includes.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-forest flex-shrink-0 mt-0.5" />
                          <span className="text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center">
                        <X className="h-5 w-5 text-destructive" />
                      </div>
                      Cost Excludes
                    </h3>
                    <ul className="space-y-3">
                      {trek.excludes.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <X className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                          <span className="text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
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
                    ${trek.price}
                    <span className="text-lg font-normal text-muted-foreground">/person</span>
                  </p>
                </div>

                <Button variant="gold" size="xl" className="w-full mb-4">
                  Book This Trek
                </Button>

                <Button variant="outline" size="lg" className="w-full mb-6">
                  <Mail className="h-4 w-4 mr-2" />
                  Inquire Now
                </Button>

                <div className="border-t border-border pt-6 space-y-4">
                  <h4 className="font-semibold text-foreground">Need Help?</h4>
                  <a href="tel:+9771234567890" className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
                    <Phone className="h-4 w-4" />
                    +977 123 456 7890
                  </a>
                  <a href="mailto:info@nepaltreks.com" className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
                    <Mail className="h-4 w-4" />
                    info@nepaltreks.com
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
