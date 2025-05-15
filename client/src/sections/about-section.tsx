import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/section-title";

const FeatureIcon = ({ icon, text, color }: { icon: string; text: string; color: string }) => (
  <div className="flex items-center gap-3">
    <div className={`w-12 h-12 ${color} rounded-full flex items-center justify-center`}>
      <i className={`${icon} text-xl`}></i>
    </div>
    <span className="font-medium">{text}</span>
  </div>
);

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            className="w-full lg:w-1/2 reveal"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=800" 
              alt="Confidante wellness center" 
              className="rounded-2xl shadow-xl w-full h-auto"
            />
          </motion.div>
          
          <div className="w-full lg:w-1/2 reveal" style={{ animationDelay: "0.3s" }}>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-6 text-neutral-800">
              About Confidante
            </h2>
            <p className="text-neutral-800/80 mb-6 leading-relaxed">
              Confidante is a health and well-being startup dedicated to educating and supporting all aspects of health—beyond the physical. While many focus on physical health, we address the often-overlooked areas of mental, emotional, and social well-being.
            </p>
            <p className="text-neutral-800/80 mb-6 leading-relaxed">
              Our mission is to bring essential health education to schools and build an accessible platform where learning about these critical topics is easier than ever. We don't just start conversations, we turn them into real change.
            </p>
            
            <div className="flex flex-wrap gap-6 mt-8">
              <FeatureIcon
                icon="fas fa-brain text-primary"
                text="Mental Health"
                color="bg-primary/20"
              />
              <FeatureIcon
                icon="fas fa-heart text-secondary"
                text="Emotional Wellness"
                color="bg-secondary/20"
              />
              <FeatureIcon
                icon="fas fa-users text-accent"
                text="Social Health"
                color="bg-accent/20"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
