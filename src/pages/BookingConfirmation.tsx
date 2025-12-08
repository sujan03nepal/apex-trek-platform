import { Layout } from "@/components/layout/Layout";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, Download, Share2, Mail, ArrowRight, 
  Calendar, Users, MapPin, DollarSign 
} from "lucide-react";

export default function BookingConfirmation() {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("id") || "TREK-2024-001";
  const trekName = searchParams.get("trek") || "Everest Base Camp Trek";

  return (
    <Layout>
      <section className="min-h-[80vh] bg-gradient-to-b from-accent/10 to-background py-16">
        <div className="container mx-auto px-4">
          {/* Success Card */}
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-accent/20 rounded-full blur-lg animate-pulse" />
                  <div className="relative w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center">
                    <CheckCircle2 className="h-10 w-10 text-accent animate-bounce" />
                  </div>
                </div>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
                Booking Confirmed!
              </h1>
              <p className="text-lg text-muted-foreground mb-2">
                Your adventure is confirmed. Thank you for choosing Nepal Treks!
              </p>
              <Badge className="bg-accent/20 text-accent border-0">
                Confirmation ID: {bookingId}
              </Badge>
            </div>

            {/* Booking Details Card */}
            <div className="bg-card rounded-2xl border border-border shadow-medium p-8 mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                Booking Details
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">Trek Name</p>
                  <p className="font-semibold text-foreground text-lg">{trekName}</p>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">Booking ID</p>
                  <p className="font-semibold text-foreground text-lg">{bookingId}</p>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">Trek Date</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-accent" />
                    <p className="font-semibold text-foreground">April 15, 2024</p>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">Duration</p>
                  <p className="font-semibold text-foreground">14 Days</p>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">Travelers</p>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-accent" />
                    <p className="font-semibold text-foreground">2 People</p>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">Total Price</p>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-accent" />
                    <p className="font-semibold text-foreground text-xl">$2,900</p>
                  </div>
                </div>
              </div>

              {/* Payment Status */}
              <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Payment Status</p>
                    <p className="font-semibold text-foreground">50% Deposit Received ($1,450)</p>
                  </div>
                  <Badge className="bg-accent text-accent-foreground">
                    PARTIALLY PAID
                  </Badge>
                </div>
              </div>

              {/* Next Steps */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">What's Next?</h3>
                <ol className="space-y-2 text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="font-bold text-accent">1.</span>
                    <span>A confirmation email has been sent to your email address</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-accent">2.</span>
                    <span>Final payment of $1,450 is due 30 days before your trek date</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-accent">3.</span>
                    <span>You'll receive a pre-trek briefing email 2 weeks before departure</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-accent">4.</span>
                    <span>We'll arrange your airport pickup and trek orientation</span>
                  </li>
                </ol>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Confirmation
              </Button>
              <Button variant="outline" className="w-full">
                <Share2 className="h-4 w-4 mr-2" />
                Share Booking
              </Button>
            </div>

            {/* Contact Card */}
            <div className="bg-muted/50 rounded-xl p-6 border border-border mb-8">
              <h3 className="font-semibold text-foreground mb-4">Need Help?</h3>
              <p className="text-muted-foreground mb-4">
                Our team is here to answer any questions about your upcoming trek.
              </p>
              <div className="space-y-2 text-muted-foreground">
                <a href="mailto:booking@nepaltreks.com" className="flex items-center gap-2 hover:text-accent transition-colors">
                  <Mail className="h-4 w-4" />
                  booking@nepaltreks.com
                </a>
                <p className="flex items-center gap-2">
                  <span className="h-4 w-4">☎️</span>
                  +977 123 456 7890
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-4">
              <Button asChild variant="gold" size="lg" className="w-full">
                <Link to="/treks">
                  Explore More Treks
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full">
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-8 text-center">
            Booking FAQs
          </h2>
          <div className="space-y-4">
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="font-semibold text-foreground mb-2">What happens after I book?</h3>
              <p className="text-muted-foreground text-sm">
                A confirmation email will be sent immediately. You'll receive a pre-trek briefing email with packing lists, itinerary details, and guide information.
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="font-semibold text-foreground mb-2">When is final payment due?</h3>
              <p className="text-muted-foreground text-sm">
                Final payment of the remaining balance is due 30 days before your trek departure date. You'll receive payment instructions via email.
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="font-semibold text-foreground mb-2">Can I make changes to my booking?</h3>
              <p className="text-muted-foreground text-sm">
                Yes! Contact us within 60 days of your trek date to make changes. Some changes may incur additional fees depending on availability and timing.
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="font-semibold text-foreground mb-2">Do you offer travel insurance recommendations?</h3>
              <p className="text-muted-foreground text-sm">
                Yes, we recommend comprehensive travel insurance covering high altitude, emergency evacuation, and medical expenses up to $100,000.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
