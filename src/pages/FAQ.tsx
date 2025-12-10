import { Layout } from "@/components/layout/Layout";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown, HelpCircle, ArrowRight, Loader2 } from "lucide-react";
import { useFaqs } from "@/hooks/useFaqs";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

function FAQAccordion({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors text-left"
      >
        <span className="font-medium text-foreground">{item.question}</span>
        <ChevronDown 
          className={`h-5 w-5 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-muted/30 border-t border-border">
          <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const { faqs, loading } = useFaqs();
  
  // Group FAQs by category
  const groupedFaqs = faqs
    .filter(f => f.is_active)
    .reduce((acc, faq) => {
      if (!acc[faq.category]) acc[faq.category] = [];
      acc[faq.category].push(faq);
      return acc;
    }, {} as Record<string, typeof faqs>);

  const categories = Object.keys(groupedFaqs);
  const [activeCategory, setActiveCategory] = useState(categories[0] || "");

  // Update active category when FAQs load
  if (!activeCategory && categories.length > 0) {
    setActiveCategory(categories[0]);
  }

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-accent" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-12 bg-gradient-mountain">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl">
            Find answers to common questions about our treks, booking process, and what to expect.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {categories.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              <HelpCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No FAQs available at the moment.</p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Category Navigation */}
              <div className="lg:col-span-1">
                <div className="sticky top-28 space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        activeCategory === category
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* FAQ Content */}
              <div className="lg:col-span-3">
                {Object.entries(groupedFaqs).map(([category, items]) => (
                  activeCategory === category && (
                    <div key={category} className="space-y-4 animate-fade-in">
                      <h2 className="font-serif text-3xl font-bold text-foreground mb-8">
                        {category}
                      </h2>
                      <div className="space-y-4">
                        {items.map((item) => (
                          <FAQAccordion key={item.id} item={item} />
                        ))}
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
              <HelpCircle className="h-8 w-8 text-accent" />
            </div>
          </div>
          <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
            Still Have Questions?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Our team is here to help! Reach out to us directly for any questions not answered here.
          </p>
          <Button asChild variant="gold" size="lg">
            <Link to="/contact">
              Contact Us
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
