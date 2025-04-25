'use client'

import React, { useState, useEffect } from 'react';
import { Heart, BookOpen, Users, MessageCircle, Mail, Phone, ArrowRight, X, Menu } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Types
interface NavItem {
  label: string;
  href: string;
}

interface BlogPost {
  title: string;
  image: string;
  alt: string;
  category: string;
  summary?: string;
  link: string;
  readTime: string;
}

interface Feature {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  desc: string;
}

interface ContactInfo {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  text: string;
  label: string;
  href?: string;
}

// Data
const BLOG_POSTS: BlogPost[] = [
  {
    title: "Understanding Teen Mental Health",
    image: "/images/07.jpg",
    alt: "Teen mental health awareness image",
    category: "Mental Health",
    summary: "Exploring the challenges teens face and strategies for support.",
    link: "/blog/understanding-teen-mental-health",
    readTime: "10 min read"
  },
  {
    title: "Comprehensive Sex Education: A Modern Approach",
    image: "/images/02.jpg",
    alt: "Comprehensive education classroom",
    category: "Sex Education",
    summary: "Evidence-based approaches to inclusive sex education.",
    link: "/blog/comprehensive-sex-education",
    readTime: "12 min read"
  },
  {
    title: "Building Emotional Intelligence in Schools",
    image: "/images/04.jpg",
    alt: "Students working on emotional intelligence activity",
    category: "Emotional Well-being",
    summary: "How to foster emotional skills in educational settings.",
    link: "/blog/building-emotional-intelligence-in-schools",
    readTime: "15 min read"
  }
];

const FEATURES: Feature[] = [
  {
    icon: Heart,
    title: "Mental Health Support",
    desc: "Resources and guidance for emotional well-being"
  },
  {
    icon: BookOpen,
    title: "Sex Education",
    desc: "Comprehensive and age-appropriate information"
  },
  {
    icon: Users,
    title: "Community",
    desc: "Building connections"
  },
  {
    icon: MessageCircle,
    title: "Support",
    desc: "24/7 assistance"
  }
];

const CONTACT_INFO: ContactInfo[] = [
  {
    icon: Mail,
    text: "helpatconfidante@gmail.com",
    label: "Email",
    href: "mailto:helpatconfidante@gmail.com"
  },
  {
    icon: Phone,
    text: "+91 98391 54888",
    label: "Phone",
    href: "tel:+919839154888"
  },
  {
    icon: Phone,
    text: "+91 75058 43873",
    label: "Phone",
    href: "tel:+917505843873"
  }
];

// Navigation items
const NAV_ITEMS: NavItem[] = [
  { label: 'Mission', href: '#mission' },
  { label: 'Blog', href: '#blog' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' }
];

// Component for Navigation
const Navigation = () => {
  const [activeSection, setActiveSection] = useState("mission");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      console.log('Scroll position:', window.scrollY, 'Scrolled state:', isScrolled);
      setScrolled(isScrolled);
    };
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    handleScroll();
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleSectionVisibility = () => {
      const sections = NAV_ITEMS.map(item => item.href.substring(1));
      
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
  }, []);

  console.log('Current scrolled state:', scrolled);

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
                scrolled ? 'brightness-100' : 'brightness-0 invert'
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
                  } ${activeSection === href.substring(1) ? (scrolled ? 'text-primary' : 'text-white') : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
                    setActiveSection(href.substring(1));
                  }}
                >
                  {label}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-all duration-500 ease-in-out ${
                    scrolled ? 'bg-primary' : 'bg-white'
                  }`}></span>
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
                    activeSection === href.substring(1) 
                      ? 'text-primary bg-primary/5' 
                      : 'text-gray-700 hover:text-primary hover:bg-primary/5'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
                    setActiveSection(href.substring(1));
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

const HeroSection = () => (
  <section
    id="mission"
    className="relative min-h-screen bg-gradient-to-br from-primary via-primary to-primary-dark text-white pt-32 pb-20 overflow-hidden"
    aria-label="Mission statement"
  >
    {/* Background Effects */}
    <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-5"></div>
    <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/10"></div>
    
    {/* Decorative Shapes */}
    <div className="absolute top-1/4 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2"></div>
    <div className="absolute bottom-0 right-0 w-[40rem] h-[40rem] bg-primary-light/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
    
    <div className="container mx-auto px-6 relative">
      <div className="flex flex-col lg:flex-row items-center gap-16 py-12">
        <div className="max-w-3xl lg:w-3/5 animate-fade-in">
          <div className="inline-block mb-6 px-6 py-3 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
            <p className="text-sm md:text-base font-medium">
              Empowering the Next Generation
            </p>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            Empowering Youth Through{' '}
            <span className="relative inline-block">
              Health Education
              <span className="absolute bottom-0 left-0 w-full h-2 bg-white/20 -skew-x-12 transform"></span>
            </span>
          </h1>
          <p className="text-lg md:text-xl leading-relaxed opacity-90 max-w-2xl mb-12">
            Bridging the gap between awareness and action in mental health, sex education, and emotional well-being. Making health education accessible and impactful for schools nationwide.
          </p>
          <div className="flex flex-wrap gap-6">
            <a
              href="#blog"
              className="btn btn-outline-white group px-8 py-4 text-lg hover:bg-white/10 transition-all duration-300"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#blog')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore Resources
              <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="btn btn-outline-white group px-8 py-4 text-lg hover:bg-white/10 transition-all duration-300"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get in Touch
              <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        <div className="lg:w-2/5 relative flex justify-center lg:justify-end animate-slide-up">
          <div className="relative w-full max-w-lg">
            <div className="relative w-full aspect-[4/5] overflow-hidden transform hover:scale-105 transition-all duration-500 group">
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/30 to-transparent opacity-60 mix-blend-overlay group-hover:opacity-40 transition-opacity duration-500"></div>
              
              {/* Image */}
              <Image
                src="/images/01.jpg"
                alt="Person with arms outstretched feeling free"
                width={600}
                height={800}
                className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-700"
                priority
              />
              
              {/* Modern Shape Mask */}
              <div className="absolute inset-0 clip-path-modern"></div>
              
              {/* Decorative Frame */}
              <div className="absolute inset-0 border-4 border-white/30 rounded-[2rem] transform rotate-[-1deg] group-hover:rotate-0 transition-all duration-500"></div>
              <div className="absolute inset-0 border-4 border-white/20 rounded-[2rem] transform rotate-[1deg] group-hover:rotate-0 transition-all duration-500"></div>
              <div className="absolute inset-0 border-4 border-white/10 rounded-[2rem] transform rotate-[-0.5deg] group-hover:rotate-0 transition-all duration-500"></div>
              
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-white/30 rounded-tl-[2rem] transform -translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"></div>
              <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-white/30 rounded-tr-[2rem] transform translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-white/30 rounded-bl-[2rem] transform -translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-white/30 rounded-br-[2rem] transform translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"></div>
              
              {/* Decorative Clips */}
              <div className="absolute top-6 left-6 w-10 h-10 border-2 border-primary/60 rounded-lg transform rotate-45 group-hover:rotate-0 transition-all duration-300"></div>
              <div className="absolute top-6 right-6 w-10 h-10 border-2 border-primary/60 rounded-lg transform -rotate-45 group-hover:rotate-0 transition-all duration-300"></div>
              <div className="absolute bottom-6 left-6 w-10 h-10 border-2 border-primary/60 rounded-lg transform -rotate-45 group-hover:rotate-0 transition-all duration-300"></div>
              <div className="absolute bottom-6 right-6 w-10 h-10 border-2 border-primary/60 rounded-lg transform rotate-45 group-hover:rotate-0 transition-all duration-300"></div>
              
              {/* Hover Effects */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

<style jsx>{`
  .clip-path-modern {
    clip-path: polygon(
      0% 0%,
      100% 0%,
      100% 85%,
      90% 100%,
      0% 100%
    );
    mask-image: url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' viewBox='0 0 100 100' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0 L100 0 L100 85 L90 100 L0 100 Z' fill='white'/%3E%3C/svg%3E");
    -webkit-mask-image: url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' viewBox='0 0 100 100' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0 L100 0 L100 85 L90 100 L0 100 Z' fill='white'/%3E%3C/svg%3E");
  }
`}</style>

// Component for Blog Card
interface BlogCardProps {
  title: string;
  image: string;
  alt: string;
  category: string;
  summary?: string;
  link: string;
  readTime: string;
}

const BlogCard = ({ title, image, alt, category, summary, link, readTime }: BlogCardProps) => (
  <Link 
    href={link} 
    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
  >
    <div className="relative h-48 w-full">
      <Image
        src={image}
        alt={alt}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
      />
      {(title === "Understanding Teen Mental Health" || title === "Comprehensive Sex Education: A Modern Approach" ||
        title === "Building Emotional Intelligence in Schools") && (
        <span className="absolute top-4 left-4 bg-white/90 text-primary px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
          {category}
        </span>
      )}
    </div>
    <div className="p-6">
      <div className="flex items-center justify-between gap-4 text-gray-600 mb-4">
        {title !== "Understanding Teen Mental Health" && title !== "Comprehensive Sex Education: A Modern Approach" &&
         title !== "Building Emotional Intelligence in Schools" && (
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
            {category}
          </span>
        )}
        <span className="text-sm ml-auto">{readTime}</span>
      </div>
      <h2 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-primary transition-colors">
        {title}
      </h2>
      <p className="text-gray-600 line-clamp-3">
        {summary}
      </p>
    </div>
  </Link>
);

// Component for Feature Item
interface FeatureItemProps {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  desc: string;
}

const FeatureItem = ({ Icon, title, desc }: FeatureItemProps) => (
  <div className="p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 mx-auto">
      <Icon className="w-7 h-7 text-primary" />
    </div>
    <h3 className="text-xl font-semibold mb-3 text-center">{title}</h3>
    <p className="text-gray-600 leading-relaxed text-center">{desc}</p>
  </div>
);

// Component for Contact Item
interface ContactItemProps {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  text: string;
  href?: string;
}

const ContactItem = ({ Icon, label, text, href }: ContactItemProps) => (
  <a 
    href={href} 
    className="flex items-center gap-4 p-4 hover:bg-primary/5 rounded-xl transition-colors group"
    aria-label={`Contact via ${label}: ${text}`}
  >
    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
      <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
    </div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-800 group-hover:text-primary transition-colors">{text}</p>
    </div>
  </a>
);

// Component for Contact Form
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'name':
        return value.trim().length < 2 ? 'Name must be at least 3 characters long' : '';
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? 'Please enter a valid email address' : '';
      case 'message':
        return value.trim().length < 10 ? 'Message must be at least 10 characters long' : '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    
    // Clear error when user starts typing
    if (errors[id as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    const error = validateField(id, value);
    setErrors(prev => ({ ...prev, [id]: error }));
  };

  const validateForm = () => {
    const newErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      message: validateField('message', formData.message)
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('loading');

    try {
      const formData = {
        name: (e.currentTarget.elements.namedItem('name') as HTMLInputElement).value,
        email: (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value,
        message: (e.currentTarget.elements.namedItem('message') as HTMLTextAreaElement).value,
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // Clear form and show success message
        e.currentTarget.reset();
        setFormData({ name: '', email: '', message: '' });
        setSubmitStatus('success');
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className={`input w-full bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.name}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className={`input w-full bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="your@email.com"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.email}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className={`input w-full bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary ${
            errors.message ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="How can we help?"
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        className={`btn w-full border-2 ${
          submitStatus === 'success' 
            ? 'bg-green-500 text-white border-green-600' 
            : 'bg-primary text-black border-black'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
          </span>
        ) : (
          'Send Message'
        )}
      </button>

      {submitStatus === 'error' && (
        <div className="mt-6 p-6 bg-green-50 border-2 border-green-500 rounded-lg">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-green-700 mb-2">Thank You for Reaching Out!</h3>
            <p className="text-green-600">We appreciate you contacting Confidante. We'll get back to you as soon as possible.</p>
          </div>
        </div>
      )}

      {submitStatus === 'success' && (
        <div className="mt-6 p-4 bg-red-50 border-2 border-red-500 rounded-lg text-red-700">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Failed to send message. Please try again later.</span>
          </div>
        </div>
      )}
    </form>
  );
};

// Blog Section Component
const BlogSection = () => (
  <section id="blog" className="py-24 bg-secondary" aria-labelledby="blog-heading">
    <div className="container mx-auto px-6">
      <div className="text-center mb-20">
        <h2 id="blog-heading" className="text-3xl md:text-5xl font-bold mb-6 text-primary">
          Latest Insights
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg md:text-xl">
          Explore our collection of resources designed to inform and inspire better health education practices.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BLOG_POSTS.map((post, index) => (
          <Link 
            key={index}
            href={post.link}
            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-48 w-full">
              <Image
                src={post.image}
                alt={post.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {(post.title === "Understanding Teen Mental Health" || 
                post.title === "Comprehensive Sex Education: A Modern Approach" ||
                post.title === "Building Emotional Intelligence in Schools") && (
                <span className="absolute top-4 left-4 bg-white/90 text-primary px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
                  {post.category}
                </span>
              )}
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between gap-4 text-gray-600 mb-4">
                {post.title !== "Understanding Teen Mental Health" && 
                 post.title !== "Comprehensive Sex Education: A Modern Approach" &&
                 post.title !== "Building Emotional Intelligence in Schools" && (
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                )}
                <span className="text-sm ml-auto">{post.readTime}</span>
              </div>
              <h2 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-600 line-clamp-3">
                {post.summary}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <div className="text-center mt-20">
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark transition-colors duration-300 group"
          aria-label="View all blog posts"
        >
          View All Posts
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  </section>
);

// About Section Component
const AboutSection = () => (
  <section id="about" className="py-20 bg-white" aria-labelledby="about-heading">
    <div className="container mx-auto px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 id="about-heading" className="text-3xl md:text-4xl font-bold mb-6 text-primary">About Confidante</h2>
        <p className="text-gray-600 mb-6 text-lg leading-relaxed">
          Confidante is a health and well-being startup dedicated to educating and supporting all aspects of health—beyond the physical.
          While many focus on physical health, we address the often-overlooked areas of mental, emotional, and social well-being.
          Our mission is to bring essential health education to schools and build an accessible platform where learning about these critical topics is easier than ever. We don't just start conversations, we turn them into real change.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {FEATURES.map((feature, index) => (
            <FeatureItem key={index} Icon={feature.icon} title={feature.title} desc={feature.desc} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

// Contact Section Component
const ContactSection = () => (
  <section id="contact" className="py-20 bg-secondary" aria-labelledby="contact-heading">
    <div className="container mx-auto px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 id="contact-heading" className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            Get in Touch
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Have questions or want to learn more? We're here to help. Reach out to our team using the contact information below.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-8 text-primary">Contact Information</h3>
            <div className="space-y-6">
              {CONTACT_INFO.map((item, index) => (
                <a 
                  key={index}
                  href={item.href} 
                  className="flex items-center gap-4 p-4 hover:bg-primary/5 rounded-xl transition-colors group"
                  aria-label={`Contact via ${item.label}: ${item.text}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{item.label}</p>
                    <p className="font-medium text-gray-800 group-hover:text-primary transition-colors">{item.text}</p>
                  </div>
                </a>
              ))}
            </div>
            
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h4 className="font-medium mb-6 text-gray-700">Connect With Us</h4>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/your.confidante?igsh=YmF0c2QzcjR4Z2Rx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"
                  aria-label="Follow us on Instagram"
                >
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/your-confidante/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"
                  aria-label="Follow us on LinkedIn"
                >
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Footer Component
const Footer = () => (
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

// Scroll To Top Button Component
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      className={`fixed right-6 bottom-6 p-3 rounded-full bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-primary hover:text-white ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M5 10l7-7m0 0l7 7m-7-7v18" 
        />
      </svg>
    </button>
  );
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <BlogSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
} 