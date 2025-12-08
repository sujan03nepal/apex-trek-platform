import { Link } from "react-router-dom";
import { Mountain, Mail, Phone, MapPin, Facebook, Instagram, Youtube, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const footerLinks = {
  treks: [
    { name: "Everest Base Camp", href: "/treks/everest-base-camp" },
    { name: "Annapurna Circuit", href: "/treks/annapurna-circuit" },
    { name: "Langtang Valley", href: "/treks/langtang-valley" },
    { name: "Manaslu Circuit", href: "/treks/manaslu-circuit" },
    { name: "All Treks", href: "/treks" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "/about#team" },
    { name: "Blog", href: "/blog" },
    { name: "Testimonials", href: "/#testimonials" },
    { name: "Contact", href: "/contact" },
  ],
  support: [
    { name: "FAQs", href: "/faq" },
    { name: "Gallery", href: "/gallery" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Booking Info", href: "/contact" },
  ],
};

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "Youtube", icon: Youtube, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-gradient-mountain text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="font-serif text-2xl md:text-3xl font-bold mb-3">
              Get Inspired for Your Next Adventure
            </h3>
            <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
              Subscribe to our newsletter for exclusive trek deals, travel tips, and Himalayan stories.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <Button variant="gold" size="lg">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-accent">
                <Mountain className="h-6 w-6 text-accent-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold">Nepal Treks</span>
                <span className="text-xs tracking-widest uppercase opacity-70">Adventure Awaits</span>
              </div>
            </Link>
            <p className="text-primary-foreground/70 mb-6 max-w-sm">
              Your trusted partner for authentic Himalayan adventures since 2010. 
              We create life-changing experiences in the world's most spectacular mountains.
            </p>
            <div className="space-y-2 text-sm">
              <a href="mailto:info@nepaltreks.com" className="flex items-center gap-2 text-primary-foreground/70 hover:text-accent transition-colors">
                <Mail className="h-4 w-4" />
                info@nepaltreks.com
              </a>
              <a href="tel:+9771234567890" className="flex items-center gap-2 text-primary-foreground/70 hover:text-accent transition-colors">
                <Phone className="h-4 w-4" />
                +977 123 456 7890
              </a>
              <div className="flex items-start gap-2 text-primary-foreground/70">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>Thamel, Kathmandu, Nepal</span>
              </div>
            </div>
          </div>

          {/* Trek Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Popular Treks</h4>
            <ul className="space-y-2">
              {footerLinks.treks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-primary-foreground/60">
              © {new Date().getFullYear()} Nepal Treks. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="p-2 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground transition-all duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/60">
              <Link to="/privacy" className="hover:text-accent transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-accent transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
