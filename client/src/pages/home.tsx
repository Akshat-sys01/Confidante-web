import { useEffect } from "react";
import { motion } from "framer-motion";
import { HeroSection } from "@/sections/hero-section";
import { InsightsSection } from "@/sections/insights-section";
import { AboutSection } from "@/sections/about-section";
import { TeamSection } from "@/sections/team-section";
import { ServicesSection } from "@/sections/services-section";
import { ContactSection } from "@/sections/contact-section";
import { Footer } from "@/sections/footer";
import { Navigation } from "@/components/ui/navigation";
import { Chatbot } from "@/components/ui/chatbot";

export default function Home() {
  // Set up reveal on scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navigation />
      <HeroSection />
      <InsightsSection />
      <AboutSection />
      <TeamSection />
      <ServicesSection />
      <ContactSection />
      <Footer />
      <Chatbot />
    </motion.div>
  );
}
