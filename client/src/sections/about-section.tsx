import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";

const FeatureIcon = ({ icon, text, color, bgColor }: { icon: string; text: string; color: string; bgColor: string }) => (
  <motion.div 
    className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-white hover:shadow-md"
    whileHover={{ y: -5 }}
  >
    <div className={`w-14 h-14 ${bgColor} rounded-xl shadow-sm flex items-center justify-center flex-shrink-0`}>
      <i className={`${icon} ${color} text-xl`}></i>
    </div>
    <div>
      <span className="font-medium block mb-1">{text}</span>
      <span className="text-sm text-neutral-600">Holistic support</span>
    </div>
  </motion.div>
);

export function AboutSection() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
    <section id="about" className="py-24 bg-gradient-to-br from-soft-peach via-white to-soft-teal relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-full h-[500px] -skew-y-6 bg-primary/5 -z-10"></div>
      
      {/* Floating shapes */}
      <motion.div 
        className="absolute top-[10%] right-[10%] w-16 h-16 rounded-full bg-primary/10 hidden lg:block"
        animate={{
          y: [0, -20, 0],
          x: [0, -10, 0],
          rotate: [0, 45, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-[10%] left-[10%] w-20 h-20 rounded-xl bg-secondary/10 hidden lg:block"
        animate={{
          y: [0, 30, 0],
          rotate: [0, -30, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
      
      <div className="container">
        <div className="text-center mb-16">
          <SectionTitle
            title="About Confidante"
            description="Learn how we're reimagining health and wellness education for today's world."
            centered={true}
            accentColor="primary"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12">
          <div className="lg:col-span-6 lg:col-start-1 order-2 lg:order-1">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={containerVariants}
              className="space-y-6"
            >
              <motion.p variants={itemVariants} className="text-lg text-neutral-700 leading-relaxed">
                Confidante is a health and well-being startup dedicated to educating and supporting all aspects of health—beyond the physical. While many focus on physical health, we address the often-overlooked areas of mental, emotional, and social well-being.
              </motion.p>
              
              <motion.p variants={itemVariants} className="text-lg text-neutral-700 leading-relaxed">
                Our mission is to bring essential health education to schools and build an accessible platform where learning about these critical topics is easier than ever. We don't just start conversations, we turn them into real change.
              </motion.p>
              
              <motion.div variants={itemVariants} className="py-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <FeatureIcon
                  icon="fas fa-brain"
                  text="Mental Health"
                  color="text-primary"
                  bgColor="bg-primary/10"
                />
                <FeatureIcon
                  icon="fas fa-heart"
                  text="Emotional Wellness"
                  color="text-secondary"
                  bgColor="bg-secondary/10"
                />
                <FeatureIcon
                  icon="fas fa-users"
                  text="Social Health"
                  color="text-accent"
                  bgColor="bg-accent/10"
                />
              </motion.div>
              
              <motion.div variants={itemVariants} className="pt-4">
                <Button variant="soft" size="lg" className="font-medium">
                  Learn more about our approach
                  <i className="fas fa-arrow-right ml-2"></i>
                </Button>
              </motion.div>
            </motion.div>
          </div>
          
          <div className="lg:col-span-6 lg:col-start-7 order-1 lg:order-2">
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              {/* Decorative patterns */}
              <div className="absolute -top-8 -right-8 w-full h-full border-2 border-primary/20 rounded-3xl transform rotate-6"></div>
              <div className="absolute -bottom-8 -left-8 w-full h-full border-2 border-accent/20 rounded-3xl transform -rotate-6"></div>
              
              {/* Main image */}
              <div className="relative bg-white p-3 rounded-3xl shadow-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=800" 
                  alt="Confidante wellness center" 
                  className="rounded-2xl w-full h-auto"
                />
                
                {/* Stats overlay */}
                <motion.div 
                  className="absolute -right-16 top-6 bg-white rounded-l-2xl shadow-lg p-4 pr-20"
                  initial={{ x: 100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center">
                      <i className="fas fa-school text-primary"></i>
                    </div>
                    <div>
                      <p className="font-bold text-lg text-neutral-800">50+</p>
                      <p className="text-sm text-neutral-600">School Programs</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="absolute -left-16 bottom-6 bg-white rounded-r-2xl shadow-lg p-4 pl-20"
                  initial={{ x: -100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-secondary/10 w-12 h-12 rounded-xl flex items-center justify-center">
                      <i className="fas fa-users text-secondary"></i>
                    </div>
                    <div>
                      <p className="font-bold text-lg text-neutral-800">5,000+</p>
                      <p className="text-sm text-neutral-600">People Impacted</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
