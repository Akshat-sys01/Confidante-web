import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";

interface Service {
  icon: string;
  title: string;
  description: string;
  iconBg: string;
  iconColor: string;
  badgeText?: string;
  features?: string[];
}

const services: Service[] = [
  {
    icon: "fas fa-school",
    title: "School Programs",
    description: "Comprehensive health education programs tailored for K-12 schools, integrating mental, emotional, and social health curricula alongside physical wellness.",
    iconBg: "bg-primary/20",
    iconColor: "text-primary",
    badgeText: "Most Popular",
    features: [
      "Customized curriculum design",
      "Teacher resources and training",
      "Student workbooks and materials",
      "Progress assessment tools"
    ]
  },
  {
    icon: "fas fa-brain",
    title: "Mental Health Education",
    description: "Interactive workshops and digital resources designed to build understanding, reduce stigma, and promote help-seeking behaviors for mental health concerns.",
    iconBg: "bg-secondary/20",
    iconColor: "text-secondary",
    features: [
      "Evidence-based modules",
      "Age-appropriate content",
      "Stigma reduction focus",
      "Practical coping strategies"
    ]
  },
  {
    icon: "fas fa-users",
    title: "Community Workshops",
    description: "In-person and virtual community sessions that address key health topics, provide practical skills, and foster supportive local networks for ongoing wellness.",
    iconBg: "bg-accent/20",
    iconColor: "text-accent",
    features: [
      "Interactive group activities",
      "Expert-led discussions",
      "Take-home resources",
      "Community-building exercises"
    ]
  },
  {
    icon: "fas fa-graduation-cap",
    title: "Professional Development",
    description: "Training programs for educators, counselors, and health professionals to enhance their ability to support holistic wellness in their students and clients.",
    iconBg: "bg-primary/20",
    iconColor: "text-primary",
    badgeText: "New",
    features: [
      "Continuing education credits",
      "Skills-based learning",
      "Research-backed methods",
      "Implementation support"
    ]
  }
];

export function ServicesSection() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <section id="services" className="py-24 bg-gradient-to-br from-soft-peach via-white to-soft-teal relative overflow-hidden">
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern"></div>
      </div>
      
      {/* Floating elements */}
      <motion.div 
        className="absolute top-20 left-[10%] w-32 h-32 rounded-full bg-primary/5 blur-3xl" 
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-20 right-[10%] w-40 h-40 rounded-full bg-secondary/5 blur-3xl" 
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
      
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <SectionTitle
            title="Our Services"
            description="Discover how Confidante can support your school, organization, or community with our holistic health programs."
            accentColor="secondary"
          />
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="relative bg-white rounded-2xl shadow-lg overflow-hidden h-full"
              variants={cardVariants}
              whileHover={{ y: -8, boxShadow: "0 20px 40px -5px rgba(0, 0, 0, 0.1)" }}
              transition={{ duration: 0.3 }}
            >
              {service.badgeText && (
                <div className="absolute top-6 right-6 z-10">
                  <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-medium rounded-full shadow-sm">
                    {service.badgeText}
                  </span>
                </div>
              )}
              
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-16 h-16 rounded-xl ${service.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <i className={`${service.icon} ${service.iconColor} text-2xl`}></i>
                  </div>
                  <h3 className="font-heading text-xl font-semibold">{service.title}</h3>
                </div>
                
                <p className="text-neutral-700 mb-6 leading-relaxed">{service.description}</p>
                
                {service.features && (
                  <div className="mb-8">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-baseline gap-2 text-neutral-700">
                          <span className="text-primary"><i className="fas fa-check-circle"></i></span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <Button 
                    variant="soft" 
                    size="sm"
                    onClick={() => {
                      // Create and show a modal with service details
                      const modal = document.createElement('div');
                      modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50';
                      modal.innerHTML = `
                        <div class="relative max-w-lg w-full bg-white rounded-2xl shadow-xl p-6 animate-in fade-in slide-in-from-bottom-5">
                          <div class="absolute top-4 right-4">
                            <button id="close-modal" class="p-2 rounded-full hover:bg-neutral-100">
                              <i class="fas fa-times text-neutral-500"></i>
                            </button>
                          </div>
                          <div class="flex items-center gap-4 mb-6">
                            <div class="${service.iconBg} w-12 h-12 rounded-xl flex items-center justify-center">
                              <i class="${service.icon} ${service.iconColor} text-xl"></i>
                            </div>
                            <h3 class="text-xl font-semibold">${service.title}</h3>
                          </div>
                          <p class="text-neutral-700 mb-6 leading-relaxed">${service.description}</p>
                          ${service.features ? `
                            <div class="mb-6">
                              <h4 class="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-3">Key Features</h4>
                              <ul class="space-y-2">
                                ${service.features.map(feature => `
                                  <li class="flex items-baseline gap-2 text-neutral-700">
                                    <span class="text-primary"><i class="fas fa-check-circle"></i></span>
                                    <span>${feature}</span>
                                  </li>
                                `).join('')}
                              </ul>
                            </div>
                          ` : ''}
                          <div class="mt-6 pt-6 border-t border-neutral-200 flex justify-end">
                            <button id="contact-from-modal" class="px-4 py-2 bg-primary text-white rounded-lg shadow-sm">
                              Contact Us About This Service
                            </button>
                          </div>
                        </div>
                      `;
                      
                      document.body.appendChild(modal);
                      
                      // Add event listeners for the modal
                      document.getElementById('close-modal')?.addEventListener('click', () => {
                        document.body.removeChild(modal);
                      });
                      
                      document.getElementById('contact-from-modal')?.addEventListener('click', () => {
                        document.body.removeChild(modal);
                        const contactSection = document.getElementById('contact');
                        if (contactSection) {
                          contactSection.classList.add('scroll-highlight');
                          
                          window.scrollTo({
                            top: contactSection.offsetTop - 80,
                            behavior: 'smooth'
                          });
                          
                          setTimeout(() => {
                            contactSection.classList.remove('scroll-highlight');
                          }, 1500);
                          
                          // Pre-fill the contact form if available
                          const subjectField = document.querySelector('input[name="subject"]') as HTMLInputElement;
                          if (subjectField) {
                            subjectField.value = `Information about ${service.title}`;
                          }
                        }
                      });
                    }}
                  >
                    Learn More
                    <i className="fas fa-arrow-right text-xs ml-1"></i>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      // Scroll to contact section
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.classList.add('scroll-highlight');
                        
                        window.scrollTo({
                          top: contactSection.offsetTop - 80,
                          behavior: 'smooth'
                        });
                        
                        setTimeout(() => {
                          contactSection.classList.remove('scroll-highlight');
                        }, 1500);
                        
                        // Pre-fill the contact form if available
                        const subjectField = document.querySelector('input[name="subject"]') as HTMLInputElement;
                        if (subjectField) {
                          subjectField.value = `Request information about ${service.title}`;
                        }
                      }
                    }}
                  >
                    Request Info
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-16 text-center">
          <div className="max-w-3xl mx-auto bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-white/80">
            <h3 className="font-heading text-2xl font-semibold mb-4">Need a customized solution?</h3>
            <p className="text-neutral-700 mb-6">We can create tailored programs to meet your organization's specific needs.</p>
            <Button size="lg" className="font-medium px-10">
              Contact Our Team
              <i className="fas fa-chevron-right ml-2"></i>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
