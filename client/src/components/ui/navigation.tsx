import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavLink {
  name: string;
  href: string;
}

const navigationLinks: NavLink[] = [
  { name: "Home", href: "/#hero" },
  { name: "Insights", href: "/#insights" },
  { name: "About", href: "/#about" },
  { name: "Team", href: "/#team" },
  { name: "Services", href: "/#services" },
  { name: "Contact", href: "/#contact" }
];

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("/#hero");

  // Function to handle scroll and update navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Update active link based on scroll position
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 80;
      
      if (window.location.pathname === '/' || window.location.pathname === '') {
        sections.forEach(section => {
          const sectionTop = (section as HTMLElement).offsetTop;
          const sectionHeight = (section as HTMLElement).offsetHeight;
          const sectionId = section.getAttribute('id');
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveLink(`/#${sectionId}`);
          }
        });
      } else {
        setActiveLink(window.location.pathname);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Set active link based on current pathname on initial load
  useEffect(() => {
    if (window.location.pathname !== '/' && window.location.pathname !== '') {
      setActiveLink(window.location.pathname);
    } else {
      setActiveLink("/#hero");
    }
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  
  // Smooth scroll function for anchor links
  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>, href: string) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const targetId = href.replace('/#', '');
      const element = document.getElementById(targetId);
      
      if (element) {
        // Highlight the target section temporarily
        const previousClass = element.className;
        element.classList.add('scroll-highlight');
        
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Remove highlight after animation completes
        setTimeout(() => {
          element.classList.remove('scroll-highlight');
        }, 1500);
      }
      
      // Update active link
      setActiveLink(href);
      
      // Close mobile menu if open
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    } else if (href === "/blog" || href.includes("/blog/")) {
      // For non-anchor links like blog, let them work normally
      setActiveLink(href);
    }
  };
  
  // Function to scroll to insights section
  const scrollToInsights = (e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>) => {
    smoothScroll(e, '/#insights');
  };

  return (
    <header 
      className={cn(
        "fixed w-full z-50 transition-all duration-500",
        isScrolled 
          ? "py-2 bg-white/95 backdrop-blur-md shadow-lg shadow-neutral-200/30" 
          : "py-4 bg-transparent"
      )}
    >
      <div className="container">
        <div className="flex justify-between items-center">
          <motion.a 
            href="/"
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-12 w-12 mr-2 flex items-center justify-center">
              <motion.img 
                src="/src/assets/new-logo.png"
                alt="Confidante Logo" 
                className="h-full w-full object-contain"
                initial={{ rotate: -5 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05, rotate: 5 }}
              />
            </div>
            <span className="text-2xl font-heading font-semibold text-primary">Confidante</span>
          </motion.a>
          
          {/* Desktop Navigation */}
          <motion.nav 
            className="hidden md:flex items-center gap-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {navigationLinks.map((link, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -2 }}
                className="relative px-1"
              >
                <a 
                  href={link.href}
                  onClick={(e) => smoothScroll(e, link.href)}
                  className={cn(
                    "relative font-medium px-4 py-2 transition-all duration-300 inline-flex items-center",
                    activeLink === link.href 
                      ? "text-primary" 
                      : "text-neutral-600 hover:text-primary"
                  )}
                >
                  {link.name}
                  
                  {/* Animated underline indicator */}
                  <div className="absolute left-0 right-0 bottom-0 h-0.5 flex justify-center">
                    {activeLink === link.href && (
                      <motion.span 
                        className="h-full bg-primary rounded-full"
                        layoutId="navIndicator"
                        style={{ width: '50%' }}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </div>
                </a>
              </motion.div>
            ))}
            
            <Button
              onClick={scrollToInsights}
              variant="default"
              size="sm"
              className="ml-4 shadow-md"
            >
              Get Started
            </Button>
          </motion.nav>
          
          {/* Mobile Navigation Toggle */}
          <motion.button 
            className="md:hidden p-2 rounded-full bg-primary/10 text-primary focus:outline-none"
            whileTap={{ scale: 0.9 }}
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <i className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"} text-xl`}></i>
          </motion.button>
        </div>
        
        {/* Mobile Navigation Menu with animation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0, y: -10 }}
              animate={{ height: "auto", opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden mt-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-neutral-100"
            >
              <div className="py-3 px-2 space-y-1">
                {navigationLinks.map((link, index) => (
                  <motion.a 
                    key={index}
                    href={link.href}
                    onClick={(e) => smoothScroll(e, link.href)}
                    className={cn(
                      "block py-3 px-4 font-medium rounded-xl transition-all",
                      activeLink === link.href
                        ? "bg-primary/10 text-primary"
                        : "text-neutral-700 hover:bg-neutral-100"
                    )}
                    whileHover={{ x: 4 }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    {link.name}
                    {activeLink === link.href && (
                      <motion.span 
                        className="inline-block w-1.5 h-1.5 rounded-full bg-primary ml-2"
                        layoutId="mobileIndicator"
                      />
                    )}
                  </motion.a>
                ))}
                
                <Button
                  onClick={scrollToInsights}
                  variant="default"
                  size="lg" 
                  className="w-full mt-2 justify-center"
                >
                  Get Started
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Add styles for the section highlight effect */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .scroll-highlight {
          position: relative;
        }
        
        .scroll-highlight::after {
          content: '';
          position: absolute;
          inset: 0;
          border: 2px solid var(--accent);
          opacity: 0;
          z-index: -1;
          border-radius: 1rem;
          animation: pulse-border 1.5s ease-out;
        }
        
        @keyframes pulse-border {
          0% {
            transform: scale(0.95);
            opacity: 0.7;
          }
          70% {
            transform: scale(1.02);
            opacity: 0.2;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
        `
      }} />
    </header>
  );
}
