import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Mountain, Phone, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Treks",
    href: "/treks",
    submenu: [
      { name: "All Treks", href: "/treks" },
      { name: "Everest Region", href: "/treks?region=everest" },
      { name: "Annapurna Region", href: "/treks?region=annapurna" },
      { name: "Langtang Region", href: "/treks?region=langtang" },
      { name: "Manaslu Region", href: "/treks?region=manaslu" },
    ]
  },
  { name: "About", href: "/about" },
  {
    name: "Resources",
    href: "/blog",
    submenu: [
      { name: "Blog & Guides", href: "/blog" },
      { name: "Gallery", href: "/gallery" },
      { name: "FAQ", href: "/faq" },
    ]
  },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveSubmenu(null);
  }, [location]);

  const isHome = location.pathname === "/";
  const navBg = isScrolled || !isHome 
    ? "bg-card/95 backdrop-blur-md shadow-soft border-b border-border" 
    : "bg-transparent";
  const textColor = isScrolled || !isHome ? "text-foreground" : "text-primary-foreground";
  const logoColor = isScrolled || !isHome ? "text-primary" : "text-primary-foreground";

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      navBg
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className={cn(
              "p-2 rounded-lg transition-colors",
              isScrolled || !isHome ? "bg-primary" : "bg-accent"
            )}>
              <Mountain className={cn(
                "h-6 w-6 transition-transform group-hover:scale-110",
                isScrolled || !isHome ? "text-primary-foreground" : "text-accent-foreground"
              )} />
            </div>
            <div className="flex flex-col">
              <span className={cn("font-serif text-xl font-bold tracking-tight", logoColor)}>
                Nepal Treks
              </span>
              <span className={cn("text-xs font-medium tracking-widest uppercase opacity-80", textColor)}>
                Adventure Awaits
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <div 
                key={item.name}
                className="relative"
                onMouseEnter={() => item.submenu && setActiveSubmenu(item.name)}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    textColor,
                    location.pathname === item.href 
                      ? "bg-accent/20" 
                      : "hover:bg-accent/10"
                  )}
                >
                  {item.name}
                  {item.submenu && <ChevronDown className="h-4 w-4" />}
                </Link>
                
                {item.submenu && activeSubmenu === item.name && (
                  <div className="absolute top-full left-0 pt-2 animate-fade-in">
                    <div className="bg-card rounded-lg shadow-medium border border-border py-2 min-w-[200px]">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.name}
                          to={subitem.href}
                          className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                        >
                          {subitem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:+9771234567890" className={cn(
              "flex items-center gap-2 text-sm font-medium",
              textColor
            )}>
              <Phone className="h-4 w-4" />
              <span>+977 123 456 7890</span>
            </a>
            <Button variant={isScrolled || !isHome ? "gold" : "hero"} size="sm" asChild>
              <Link to="/contact">Book Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={cn("lg:hidden p-2", textColor)}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-card border-t border-border animate-slide-in">
            <div className="py-4 space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.href}
                    className={cn(
                      "block px-4 py-3 text-base font-medium transition-colors",
                      location.pathname === item.href 
                        ? "text-accent bg-accent/10" 
                        : "text-foreground hover:bg-muted"
                    )}
                  >
                    {item.name}
                  </Link>
                  {item.submenu && (
                    <div className="pl-8 space-y-1">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.name}
                          to={subitem.href}
                          className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {subitem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="px-4 pt-4 space-y-3">
                <a href="tel:+9771234567890" className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Phone className="h-4 w-4" />
                  <span>+977 123 456 7890</span>
                </a>
                <Button variant="gold" className="w-full" asChild>
                  <Link to="/contact">Book Now</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
