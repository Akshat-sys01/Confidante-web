'use client'

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Types
interface NavItem {
  label: string;
  href: string;
}

// Data
const NAV_ITEMS: NavItem[] = [
  { label: "Mission", href: "/#mission" },
  { label: "Blog", href: "/#blog" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" }
];

export const Navigation = () => {
  const [activeSection, setActiveSection] = useState("mission");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isBlogPage, setIsBlogPage] = useState(false);

  useEffect(() => {
    // Check if we're on a blog page
    setIsBlogPage(window.location.pathname.startsWith('/blog'));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isBlogPage) {
      const handleSectionVisibility = () => {
        const sections = NAV_ITEMS.map(item => item.href.split('#')[1]).filter(Boolean);
        
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
              setActiveSection(section);
              break;
            }
          }
        }
      };
      
      window.addEventListener('scroll', handleSectionVisibility);
      return () => window.removeEventListener('scroll', handleSectionVisibility);
    }
  }, [isBlogPage]);

  const handleNavigation = (href: string) => {
    if (isBlogPage) {
      // On blog pages, navigate to home page and then to the section
      const section = href.split('#')[1];
      window.location.href = href;
    } else {
      // On home page, scroll to section
      const section = href.split('#')[1];
      if (section) {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(section);
        }
      }
    }
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${
        scrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4'
      }`}
      style={{
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 1)' : 'transparent',
        transition: 'background-color 500ms ease-in-out, padding 500ms ease-in-out'
      }}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <Image 
              src="/images/Confidante-Logo-Bird.png" 
              alt="Confidante Bird Logo" 
              width={40}
              height={40}
              className={`transition-all duration-500 ease-in-out ${
                scrolled ? 'brightness-0' : 'brightness-0 invert'
              }`} 
            />
            <span className={`ml-2 text-xl font-bold transition-colors duration-500 ease-in-out ${
              scrolled ? 'text-gray-900' : 'text-white'
            } group-hover:text-primary`}>Confidante</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {NAV_ITEMS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className={`text-sm font-medium transition-colors duration-500 ease-in-out relative group ${
                    scrolled ? 'text-gray-700 hover:text-primary' : 'text-white/90 hover:text-white'
                  } ${activeSection === href.split('#')[1] ? (scrolled ? 'text-primary' : 'text-white') : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(href);
                  }}
                >
                  {label}
                  <span 
                    className={`absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-all duration-500 ease-in-out ${
                      scrolled ? 'bg-primary' : 'bg-white'
                    }`} 
                    style={{ borderBottom: '2px solid currentColor' }}
                  ></span>
                </a>
              ))}
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-md p-1 transition-colors duration-500 ease-in-out ${
              scrolled ? 'text-gray-700' : 'text-white'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white py-4 mt-2 rounded-lg shadow-lg">
            <div className="flex flex-col space-y-2">
              {NAV_ITEMS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className={`px-4 py-2 text-sm font-medium transition-colors duration-500 ease-in-out ${
                    activeSection === href.split('#')[1] 
                      ? 'text-primary bg-primary/5' 
                      : 'text-gray-700 hover:text-primary hover:bg-primary/5'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(href);
                    setIsMenuOpen(false);
                  }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export const Footer = () => (
  <footer className="bg-gray-50 text-gray-600 py-12">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-6 md:mb-0">
          <Image 
            src="/images/Confidante-Logo-Bird.png" 
            alt="Confidante Bird Logo" 
            width={40}
            height={40}
            className="brightness-0" 
          />
          <span className="ml-3 text-xl font-bold text-gray-800">Confidante</span>
        </div>
        <div className="text-sm">
          © {new Date().getFullYear()} Confidante. All rights reserved.
        </div>
      </div>
    </div>
  </footer>
); 