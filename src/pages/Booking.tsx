import { useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useTreks } from "@/hooks/useTreks";
import { useCreateBooking } from "@/hooks/useCreateBooking";
import { Mountain, ArrowLeft, Users, Calendar, Phone, Mail, MapPin, Loader2, Check } from "lucide-react";

export default function Booking() {
  const { trekSlug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { treks } = useTreks();
  const { createBooking, loading: bookingLoading } = useCreateBooking();

  const trek = useMemo(() => treks.find(t => t.slug === trekSlug), [treks, trekSlug]);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    country: "",
    departure_date: "",
    travelers_count: 1,
    dietary_requirements: "",
    special_requests: "",
  });

  const totalPrice = trek && formData.travelers_count 
    ? (Number(trek.price) || 0) * formData.travelers_count 
    : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!trek) {
      toast({ title: "Error", description: "Trek not found", variant: "destructive" });
      return;
    }

    if (!formData.departure_date) {
      toast({ title: "Error", description: "Please select a departure date", variant: "destructive" });
      return;
    }

    try {
      const { data, error } = await createBooking({
        trek_id: trek.id,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone,
        country: formData.country || null,
        departure_date: formData.departure_date,
        travelers_count: formData.travelers_count,
        dietary_requirements: formData.dietary_requirements || null,
        special_requests: formData.special_requests || null,
        total_price: totalPrice,
        payment_status: 'pending',
        booking_status: 'pending',
      });

      if (error) {
        toast({ title: "Error", description: error, variant: "destructive" });
        return;
      }

      toast({
        title: "Success!",
        description: "Your booking has been submitted. We'll contact you shortly!",
      });

      setSubmitted(true);

      setTimeout(() => {
        navigate("/booking-confirmation", { state: { booking: data } });
      }, 2000);
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  if (!trek) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Mountain className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Trek not found</h1>
            <p className="text-muted-foreground mb-4">The trek you're trying to book doesn't exist.</p>
            <Button asChild>
              <Link to="/treks">View All Treks</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  if (submitted) {
    return (
      <Layout>
        <section className="min-h-screen pt-28 pb-12 bg-background">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-forest/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-8 w-8 text-forest" />
              </div>
              <h1 className="font-serif text-3xl font-bold text-foreground mb-3">
                Booking Submitted!
              </h1>
              <p className="text-muted-foreground mb-6">
                Your booking request has been received. We'll contact you within 24 hours to confirm your trek.
              </p>
              <Button asChild variant="gold" size="lg">
                <Link to="/treks">View Other Treks</Link>
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="pt-28 pb-16 bg-gradient-mountain">
        <div className="container mx-auto px-4">
          <button 
            onClick={() => navigate(`/treks/${trek.slug}`)}
            className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Trek Details
          </button>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-3">
            Book {trek.name}
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl">
            Complete your booking for this amazing trek experience
          </p>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Info */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <h2 className="font-serif text-xl font-bold text-foreground mb-4">Your Information</h2>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.first_name}
                        onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.last_name}
                        onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="+1 234 567 8900"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="United States"
                    />
                  </div>
                </div>

                {/* Trip Details */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <h2 className="font-serif text-xl font-bold text-foreground mb-4">Trip Details</h2>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Departure Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.departure_date}
                        onChange={(e) => setFormData({ ...formData, departure_date: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Number of Travelers *
                      </label>
                      <input
                        type="number"
                        required
                        min="1"
                        max="100"
                        value={formData.travelers_count}
                        onChange={(e) => setFormData({ ...formData, travelers_count: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                  </div>
                </div>

                {/* Special Requests */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <h2 className="font-serif text-xl font-bold text-foreground mb-4">Additional Information</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Dietary Requirements
                    </label>
                    <textarea
                      value={formData.dietary_requirements}
                      onChange={(e) => setFormData({ ...formData, dietary_requirements: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                      placeholder="Let us know about any dietary restrictions or preferences..."
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Special Requests
                    </label>
                    <textarea
                      value={formData.special_requests}
                      onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                      placeholder="Any special requests or questions? Let us know here..."
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  variant="gold" 
                  size="xl" 
                  className="w-full"
                  disabled={bookingLoading}
                >
                  {bookingLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Complete Booking"
                  )}
                </Button>
              </form>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-card rounded-2xl border border-border p-6">
                <h3 className="font-serif text-lg font-bold text-foreground mb-4">Booking Summary</h3>
                
                <div className="space-y-4 pb-6 border-b border-border">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Trek</p>
                    <p className="font-semibold text-foreground">{trek.name}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Duration</p>
                    <p className="font-semibold text-foreground">{trek.duration || 'N/A'}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Difficulty</p>
                    <Badge variant="outline">{trek.difficulty}</Badge>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <p className="text-muted-foreground">Price per person</p>
                    <p className="font-semibold text-foreground">${trek.price || 0}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-muted-foreground">Number of travelers</p>
                    <p className="font-semibold text-foreground">{formData.travelers_count}</p>
                  </div>

                  {formData.departure_date && (
                    <div className="flex items-center justify-between">
                      <p className="text-muted-foreground">Departure date</p>
                      <p className="font-semibold text-foreground">
                        {new Date(formData.departure_date).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-accent/10 rounded-lg p-4 mb-6">
                  <p className="text-sm text-muted-foreground mb-1">Total Price</p>
                  <p className="font-serif text-3xl font-bold text-accent">
                    ${totalPrice.toLocaleString()}
                  </p>
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  Payment can be arranged after booking confirmation
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
