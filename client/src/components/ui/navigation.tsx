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
  const [activeLink, setActiveLink] = useState("/");

  // Function to handle scroll and update navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Update active link based on scroll position
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;
      
      if (window.location.pathname === '/') {
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
    if (window.location.pathname !== '/') {
      setActiveLink(window.location.pathname);
    }
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  
  // Smooth scroll function for anchor links
  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const targetId = href.replace('/#', '');
      const element = document.getElementById(targetId);
      
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: 'smooth'
        });
      }
      
      // Update active link
      setActiveLink(href);
      
      // Close mobile menu if open
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    }
  };

  return (
    <header 
      className={cn(
        "fixed w-full z-50 transition-all duration-500",
        isScrolled 
          ? "py-2 bg-white/90 backdrop-blur-sm shadow-lg shadow-neutral-200/30" 
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
            <div className="w-10 h-10 mr-2">
              <img 
                src="/src/assets/logo.png" 
                alt="Confidante Logo" 
                className="w-full h-full object-contain"
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
                    "relative font-medium px-4 py-2 rounded-full transition-all duration-300 inline-block",
                    activeLink === link.href 
                      ? "text-primary" 
                      : "text-neutral-600 hover:text-primary"
                  )}
                >
                  {link.name}
                  {activeLink === link.href && (
                    <motion.span 
                      className="absolute bottom-0 left-0 right-0 h-1 bg-primary/20 rounded-full mx-3"
                      layoutId="activeIndicator"
                      transition={{ type: "spring", duration: 0.6 }}
                    />
                  )}
                </a>
              </motion.div>
            ))}
            
            <motion.a
              href="/#contact"
              onClick={(e) => smoothScroll(e, '/#contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-4 px-5 py-2 rounded-full bg-primary text-white font-medium shadow-md hover:shadow-lg hover:bg-primary/90 transition-all duration-300"
            >
              Get Started
            </motion.a>
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
                  </motion.a>
                ))}
                
                <motion.a
                  href="/#contact"
                  onClick={(e) => smoothScroll(e, '/#contact')}
                  className="block py-3 px-4 mt-2 text-center font-medium bg-primary text-white rounded-xl shadow-sm"
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: navigationLinks.length * 0.05 }}
                >
                  Get Started
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
