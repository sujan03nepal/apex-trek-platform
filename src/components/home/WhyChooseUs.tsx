import { Shield, Users, Award, HeartHandshake, Compass, Headphones } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Safety First",
    description: "Your safety is our priority. All guides are certified in first aid and emergency rescue procedures.",
    color: "bg-forest/10 text-forest",
  },
  {
    icon: Users,
    title: "Expert Local Guides",
    description: "Our guides are born and raised in the Himalayas, with decades of combined experience.",
    color: "bg-sapphire-light/10 text-sapphire-light",
  },
  {
    icon: Award,
    title: "Award Winning",
    description: "Recognized as Nepal's best trekking company by TripAdvisor and Lonely Planet.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: HeartHandshake,
    title: "Sustainable Tourism",
    description: "We practice responsible tourism that benefits local communities and protects the environment.",
    color: "bg-sunset/10 text-sunset",
  },
  {
    icon: Compass,
    title: "Customizable Trips",
    description: "Every trek can be tailored to your fitness level, schedule, and special interests.",
    color: "bg-mountain/10 text-mountain",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our team is available around the clock to assist you before, during, and after your trek.",
    color: "bg-primary/10 text-primary",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent font-medium text-sm mb-4">
              Why Choose Us
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Your Trusted Partner for{" "}
              <span className="text-gradient">Himalayan Adventures</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              With over 14 years of experience and 15,000+ successful treks, 
              we've perfected the art of creating unforgettable mountain experiences. 
              Here's what sets us apart from the rest.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-muted/50 rounded-xl p-6 text-center">
                <p className="text-4xl font-serif font-bold text-accent mb-1">15K+</p>
                <p className="text-sm text-muted-foreground">Successful Treks</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-6 text-center">
                <p className="text-4xl font-serif font-bold text-accent mb-1">100%</p>
                <p className="text-sm text-muted-foreground">Safety Record</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-6 text-center">
                <p className="text-4xl font-serif font-bold text-accent mb-1">50+</p>
                <p className="text-sm text-muted-foreground">Expert Guides</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-6 text-center">
                <p className="text-4xl font-serif font-bold text-accent mb-1">4.9</p>
                <p className="text-sm text-muted-foreground">Average Rating</p>
              </div>
            </div>
          </div>

          {/* Right Features Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-card rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 border border-border hover:border-accent/20 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
