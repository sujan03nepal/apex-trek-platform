import { Layout } from "@/components/layout/Layout";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";

const faqs = [
  {
    category: "General Questions",
    items: [
      {
        question: "What is the best time to trek in Nepal?",
        answer: "The best trekking seasons in Nepal are spring (March-May) and autumn (September-November). During these periods, you'll have clear skies, stable weather, and excellent mountain visibility. However, different regions have different optimal times, so it depends on which trek you're interested in."
      },
      {
        question: "Do I need any special permits?",
        answer: "Most popular treks in Nepal require permits such as TIMS (Trekkers' Information Management System) and sometimes special conservation permits like ACAP or MCAP. These are typically arranged by your trek operator. We handle all permits as part of our trek packages."
      },
      {
        question: "What is the typical group size?",
        answer: "Our groups usually consist of 4-10 trekkers per guide, which ensures personalized attention while maintaining an enjoyable group experience. We can also arrange private treks for smaller groups."
      },
      {
        question: "Can I trek solo?",
        answer: "Yes! Solo trekkers are welcome and can join our group treks. Alternatively, we offer private treks for individuals. Our guides will ensure your safety and comfort throughout the trek."
      }
    ]
  },
  {
    category: "Physical & Health",
    items: [
      {
        question: "What is the fitness requirement?",
        answer: "Fitness requirements depend on the trek. Easy treks require basic fitness and the ability to walk for 4-5 hours daily. Challenging treks require regular cardiovascular exercise and the ability to walk 6-8 hours in mountain terrain. It's recommended to train for 2-3 months before your trek."
      },
      {
        question: "What about altitude sickness?",
        answer: "Altitude sickness is a natural response to reduced oxygen at higher elevations. Most trekkers experience some symptoms. Prevention strategies include gradual ascent, proper acclimatization, staying hydrated, and eating high-carb meals. Our guides are trained to recognize and manage altitude sickness."
      },
      {
        question: "Do I need to be vaccinated?",
        answer: "Check with your doctor for current vaccination recommendations for Nepal. Commonly recommended vaccines include Hepatitis A, Typhoid, and Japanese Encephalitis. We don't require specific vaccinations but strongly recommend consulting a travel health clinic before your trip."
      },
      {
        question: "What if I have a medical condition?",
        answer: "Please inform us of any medical conditions during the booking process. We'll work with you to determine if the trek is suitable and what precautions are needed. In most cases, we can accommodate various conditions with proper planning."
      }
    ]
  },
  {
    category: "Booking & Payment",
    items: [
      {
        question: "How do I book a trek?",
        answer: "You can book through our website by selecting your trek, filling in your details, and making a 50% deposit. The remaining balance is due 30 days before the trek starts. We also offer email and phone booking options."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept bank transfers, credit cards, PayPal, and other online payment methods. We also accept payments in USD, EUR, and NPR. Please contact us for specific payment options."
      },
      {
        question: "What is your cancellation policy?",
        answer: "Cancellation within 60 days of trek commencement: 25% refund. Cancellation within 30 days: No refund. We reserve the right to cancel treks due to weather or safety concerns with full refund."
      },
      {
        question: "Is travel insurance included?",
        answer: "Travel insurance is not included in our trek packages but is highly recommended. You should arrange comprehensive insurance covering emergency evacuation, medical expenses, and trip cancellation before booking."
      }
    ]
  },
  {
    category: "Trek Details",
    items: [
      {
        question: "What is included in the trek package?",
        answer: "Our packages typically include accommodation (lodge/teahouse), all meals during the trek, a professional guide, porter service, permits, and first aid kits. Specific inclusions vary by trek—check the trek details page."
      },
      {
        question: "What should I pack?",
        answer: "Essential items include proper trekking boots, warm layers, a sleeping bag, rain jacket, trekking poles, sunscreen, and a headlamp. Avoid over-packing—limit yourself to 15kg. Your porter can carry the rest. See our packing list guide on the blog."
      },
      {
        question: "Do you provide porters?",
        answer: "Yes, porter service is included in most of our treks. Each porter carries up to 20kg, so limit your luggage to 15kg. Porters receive fair wages and are treated well."
      },
      {
        question: "How are meals arranged?",
        answer: "All meals are included in our trek packages. We eat at teahouse restaurants or lodges. The menu features both local Nepali cuisine and international options. We accommodate dietary requirements with advance notice."
      }
    ]
  },
  {
    category: "Safety & Support",
    items: [
      {
        question: "How experienced are your guides?",
        answer: "Our guides are certified, trained, and experienced mountain professionals. Many have summited major peaks and guided hundreds of trekkers. They're trained in first aid and emergency procedures."
      },
      {
        question: "What if I have an emergency?",
        answer: "All our treks have communication systems in place. In case of emergency, we have protocols for evacuation, medical assistance, and contacting your emergency contacts. We also require evacuation insurance."
      },
      {
        question: "What happens if the weather is bad?",
        answer: "We monitor weather conditions closely. Minor bad weather won't stop the trek, but severe weather may require route changes or postponement. Your guide has authority to make route decisions for safety."
      },
      {
        question: "Do you offer refunds if the trek is cancelled?",
        answer: "If we cancel due to severe weather or safety concerns, you'll receive a full refund or alternative trek date. If you cancel due to weather, our standard cancellation policy applies."
      }
    ]
  }
];

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  category: string;
  items: FAQItem[];
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
  const [activeCategory, setActiveCategory] = useState("General Questions");

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
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Category Navigation */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-2">
                {faqs.map((faq: FAQCategory) => (
                  <button
                    key={faq.category}
                    onClick={() => setActiveCategory(faq.category)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      activeCategory === faq.category
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {faq.category}
                  </button>
                ))}
              </div>
            </div>

            {/* FAQ Content */}
            <div className="lg:col-span-3">
              {faqs.map((faq: FAQCategory) => (
                activeCategory === faq.category && (
                  <div key={faq.category} className="space-y-4 animate-fade-in">
                    <h2 className="font-serif text-3xl font-bold text-foreground mb-8">
                      {faq.category}
                    </h2>
                    <div className="space-y-4">
                      {faq.items.map((item, index) => (
                        <FAQAccordion key={index} item={item} />
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
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
