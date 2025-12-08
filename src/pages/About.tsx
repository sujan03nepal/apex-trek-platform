import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Mountain, Users, Award, Heart, Shield, Globe, 
  ArrowRight, CheckCircle2 
} from "lucide-react";

const stats = [
  { value: "15,000+", label: "Happy Trekkers" },
  { value: "14+", label: "Years Experience" },
  { value: "50+", label: "Trek Packages" },
  { value: "100%", label: "Safety Record" },
];

const values = [
  {
    icon: Shield,
    title: "Safety First",
    description: "Every decision we make prioritizes the safety and well-being of our trekkers and team.",
  },
  {
    icon: Heart,
    title: "Passion for Adventure",
    description: "We're not just guides – we're adventurers who love sharing the magic of the Himalayas.",
  },
  {
    icon: Globe,
    title: "Sustainable Tourism",
    description: "We're committed to protecting the environment and supporting local communities.",
  },
  {
    icon: Users,
    title: "Local Expertise",
    description: "Our team is born and raised in these mountains, bringing authentic knowledge and experience.",
  },
];

const team = [
  {
    name: "Pemba Sherpa",
    role: "Founder & Lead Guide",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    bio: "Born in the Khumbu region, Pemba has summited Everest 12 times and has been guiding treks for over 20 years.",
  },
  {
    name: "Maya Tamang",
    role: "Operations Director",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    bio: "With a background in tourism management, Maya ensures every trek runs smoothly from booking to completion.",
  },
  {
    name: "Dorje Lama",
    role: "Senior Trek Leader",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    bio: "A certified mountaineer and wilderness first responder with expertise in high-altitude trekking.",
  },
];

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-28 pb-20 bg-gradient-mountain overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent font-medium text-sm mb-4">
              Our Story
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Sharing the Magic of the Himalayas Since 2010
            </h1>
            <p className="text-lg text-primary-foreground/80 mb-8">
              What started as a small family operation has grown into one of Nepal's 
              most trusted adventure companies. Our passion remains the same: creating 
              life-changing experiences in the world's most spectacular mountains.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl md:text-5xl font-serif font-bold text-accent mb-2">
                  {stat.value}
                </p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                From the Heart of the Mountains
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Nepal Treks was founded in 2010 by Pemba Sherpa, who grew up in a 
                  small village in the shadow of Mount Everest. Growing up, he watched 
                  as trekkers from around the world came to experience the beauty of 
                  his homeland, and he dreamed of one day sharing his knowledge and 
                  love for these mountains with others.
                </p>
                <p>
                  After years of working as a porter and then as a guide for other 
                  companies, Pemba started Nepal Treks with a simple mission: to provide 
                  authentic, safe, and sustainable trekking experiences that benefit 
                  both travelers and local communities.
                </p>
                <p>
                  Today, we've grown into a team of over 50 experienced guides and 
                  support staff, but our core values remain the same. We're still a 
                  family-run business, and every trekker who joins us becomes part 
                  of our extended family.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800"
                alt="Himalayan landscape"
                className="rounded-2xl shadow-strong"
              />
              <div className="absolute -bottom-8 -left-8 bg-card rounded-xl p-6 shadow-medium border border-border">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center">
                    <Award className="h-7 w-7 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Award Winning</p>
                    <p className="text-sm text-muted-foreground">TripAdvisor 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do, from planning your trek to 
              supporting our team and the communities we visit.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-card rounded-xl p-6 border border-border hover:border-accent/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Meet Our Team
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our experienced team of guides and staff are the heart of Nepal Treks. 
              Each brings unique skills and a shared passion for the mountains.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-card rounded-2xl overflow-hidden border border-border shadow-soft group"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-accent font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-mountain">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Join Our Adventure Family?
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Let us help you experience the Himalayas the way they were meant to be 
            experienced – with expert guides, authentic experiences, and unforgettable memories.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="gold" size="xl" asChild>
              <Link to="/treks">
                Explore Treks
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
