import { Link, useNavigate } from "react-router-dom";
import { Mountain, Mail, Phone, MapPin, Facebook, Instagram, Youtube, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/hooks/useSettings";
import { useTreks } from "@/hooks/useTreks";

const companyLinks = [
  { name: "About Us", href: "/about" },
  { name: "Our Team", href: "/about#team" },
  { name: "Blog", href: "/blog" },
  { name: "Testimonials", href: "/#testimonials" },
  { name: "Contact", href: "/contact" },
];

const supportLinks = [
  { name: "FAQs", href: "/faq" },
  { name: "Gallery", href: "/gallery" },
  { name: "Terms & Conditions", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Booking Info", href: "/contact" },
];

export function Footer() {
  const { settings } = useSettings();
  const { treks } = useTreks();
  const navigate = useNavigate();

  // Get published treks for the footer (limit to 4 + "All Treks")
  const publishedTreks = treks.filter(t => t.is_published).slice(0, 4);

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: settings?.facebook_url || "#" },
    { name: "Instagram", icon: Instagram, href: settings?.instagram_url || "#" },
    { name: "Youtube", icon: Youtube, href: settings?.youtube_url || "#" },
    { name: "Twitter", icon: Twitter, href: settings?.twitter_url || "#" },
  ].filter(s => s.href && s.href !== "#");

  const primaryEmail = settings?.email_addresses?.[0] || "info@nepaltreks.com";
  const primaryPhone = settings?.phone_numbers?.[0] || "+977 123 456 7890";
  const address = settings?.office_address || "Thamel, Kathmandu, Nepal";
  const footerText = settings?.footer_text || "Your trusted partner for authentic Himalayan adventures since 2010. We create life-changing experiences in the world's most spectacular mountains.";
  const copyrightText = settings?.copyright_text || `© ${new Date().getFullYear()} Nepal Treks. All rights reserved.`;

  const handleLinkClick = (href: string) => {
    navigate(href);
    window.scrollTo(0, 0);
  };

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
            <button onClick={() => handleLinkClick("/")} className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-accent">
                <Mountain className="h-6 w-6 text-accent-foreground" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-serif text-xl font-bold">Nepal Treks</span>
                <span className="text-xs tracking-widest uppercase opacity-70">Adventure Awaits</span>
              </div>
            </button>
            <p className="text-primary-foreground/70 mb-6 max-w-sm">
              {footerText}
            </p>
            <div className="space-y-2 text-sm">
              <a href={`mailto:${primaryEmail}`} className="flex items-center gap-2 text-primary-foreground/70 hover:text-accent transition-colors">
                <Mail className="h-4 w-4" />
                {primaryEmail}
              </a>
              <a href={`tel:${primaryPhone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-primary-foreground/70 hover:text-accent transition-colors">
                <Phone className="h-4 w-4" />
                {primaryPhone}
              </a>
              <div className="flex items-start gap-2 text-primary-foreground/70">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>{address}</span>
              </div>
            </div>
          </div>

          {/* Trek Links - Dynamic from database */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Popular Treks</h4>
            <ul className="space-y-2">
              {publishedTreks.map((trek) => (
                <li key={trek.id}>
                  <button 
                    onClick={() => handleLinkClick(`/treks/${trek.slug}`)}
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors text-left"
                  >
                    {trek.name}
                  </button>
                </li>
              ))}
              <li>
                <button 
                  onClick={() => handleLinkClick("/treks")}
                  className="text-sm text-primary-foreground/70 hover:text-accent transition-colors text-left"
                >
                  All Treks
                </button>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <button 
                    onClick={() => handleLinkClick(link.href)}
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <button 
                    onClick={() => handleLinkClick(link.href)}
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors text-left"
                  >
                    {link.name}
                  </button>
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
              {copyrightText}
            </p>
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground transition-all duration-200"
                    aria-label={social.name}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            )}
            <div className="flex items-center gap-4 text-sm text-primary-foreground/60">
              <button onClick={() => handleLinkClick("/privacy")} className="hover:text-accent transition-colors">
                Privacy Policy
              </button>
              <button onClick={() => handleLinkClick("/terms")} className="hover:text-accent transition-colors">
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
