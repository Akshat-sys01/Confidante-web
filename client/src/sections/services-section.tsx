import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/section-title";

interface Service {
  icon: string;
  title: string;
  description: string;
  iconBg: string;
  iconColor: string;
}

const services: Service[] = [
  {
    icon: "fas fa-school",
    title: "School Programs",
    description: "Comprehensive health education programs tailored for K-12 schools, integrating mental, emotional, and social health curricula alongside physical wellness.",
    iconBg: "bg-primary/20",
    iconColor: "text-primary"
  },
  {
    icon: "fas fa-brain",
    title: "Mental Health Education",
    description: "Interactive workshops and engaging digital resources designed to build understanding, reduce stigma, and promote help-seeking behaviors for mental health concerns.",
    iconBg: "bg-secondary/20",
    iconColor: "text-secondary"
  },
  {
    icon: "fas fa-users",
    title: "Community Workshops",
    description: "In-person and virtual community sessions that address key health topics, provide practical skills, and foster supportive local networks for ongoing wellness.",
    iconBg: "bg-accent/20",
    iconColor: "text-accent"
  },
  {
    icon: "fas fa-graduation-cap",
    title: "Professional Development",
    description: "Training programs for educators, counselors, and health professionals to enhance their ability to support holistic wellness in their students and clients.",
    iconBg: "bg-primary/20",
    iconColor: "text-primary"
  }
];

export function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-gradient-to-br from-secondary/10 to-primary/10">
      <div className="container">
        <div className="text-center mb-16 reveal">
          <SectionTitle
            title="Our Services"
            description="Discover how Confidante can support your school, organization, or community with our holistic health programs."
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-sm p-8 flex flex-col md:flex-row gap-6 items-start reveal card-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <div className={`w-16 h-16 rounded-full ${service.iconBg} flex items-center justify-center flex-shrink-0`}>
                <i className={`${service.icon} ${service.iconColor} text-2xl`}></i>
              </div>
              <div>
                <h3 className="font-heading text-xl font-medium mb-3">{service.title}</h3>
                <p className="text-neutral-800/70 mb-4">{service.description}</p>
                <a href="#" className="text-primary font-medium hover:text-primary/80 transition-colors flex items-center gap-2">
                  Learn More <i className="fas fa-arrow-right text-sm"></i>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
