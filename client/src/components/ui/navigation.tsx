import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavLink {
  name: string;
  href: string;
}

const navigationLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "Insights", href: "/blog" },
  { name: "About", href: "/#about" },
  { name: "Team", href: "/#team" },
  { name: "Services", href: "/#services" },
  { name: "Contact", href: "/#contact" }
];

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Function to handle scroll and update navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header 
      className={cn(
        "fixed w-full bg-white bg-opacity-95 z-50 transition-all duration-300",
        isScrolled ? "shadow-md" : "shadow-sm"
      )}
    >
      <div className="container">
        <div className="flex justify-between items-center py-4">
          <a href="#" className="flex items-center">
            <span className="text-2xl font-heading font-semibold text-primary">Confidante</span>
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link, index) => (
              <a 
                key={index}
                href={link.href} 
                className="font-medium text-neutral-800 hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
          
          {/* Mobile Navigation Toggle */}
          <button 
            className="md:hidden text-neutral-800 focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <i className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"} text-xl`}></i>
          </button>
        </div>
        
        {/* Mobile Navigation Menu with animation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-3 space-y-3">
                {navigationLinks.map((link, index) => (
                  <a 
                    key={index}
                    href={link.href} 
                    className="block py-2 px-4 font-medium text-neutral-800 hover:bg-neutral-100 rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
