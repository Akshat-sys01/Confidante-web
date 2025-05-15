import { motion } from "framer-motion";

interface FooterLink {
  name: string;
  href: string;
}

const quickLinks: FooterLink[] = [
  { name: "About Us", href: "/#about" },
  { name: "Services", href: "/#services" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/#contact" }
];

const serviceLinks: FooterLink[] = [
  { name: "School Programs", href: "#" },
  { name: "Mental Health Education", href: "#" },
  { name: "Community Workshops", href: "#" },
  { name: "Professional Development", href: "#" }
];

const legalLinks: FooterLink[] = [
  { name: "Privacy Policy", href: "#" },
  { name: "Terms of Service", href: "#" }
];

export function Footer() {
  return (
    <footer className="bg-neutral-800 text-white pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="font-heading text-xl font-semibold mb-6">Confidante</h3>
            <p className="text-neutral-100/70 mb-6">
              Health and well-being, beyond the physical. Transforming how we understand and approach holistic wellness.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-neutral-100/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-6">Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-neutral-100/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-6">Subscribe</h4>
            <p className="text-neutral-100/70 mb-4">
              Stay updated with our latest insights and announcements.
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 rounded-l-lg focus:outline-none flex-1 text-neutral-800"
              />
              <button 
                type="submit" 
                className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-r-lg transition-colors"
                aria-label="Subscribe"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-neutral-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-100/60 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Confidante. All rights reserved.
          </p>
          <div className="flex gap-6">
            {legalLinks.map((link, index) => (
              <a 
                key={index}
                href={link.href} 
                className="text-neutral-100/60 hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
