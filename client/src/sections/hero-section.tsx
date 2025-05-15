import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function HeroSection() {
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

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 8,
        stiffness: 100,
        delay: 0.6
      }
    },
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 15px -3px rgba(255, 174, 66, 0.3), 0 4px 6px -4px rgba(255, 174, 66, 0.3)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.98 }
  };

  const floatingImageVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-soft-peach via-white to-soft-teal"
        aria-hidden="true"
      />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Soft shapes */}
        <div className="absolute top-1/3 right-[10%] w-[400px] h-[400px] rounded-full bg-primary/5 blur-[60px]" />
        <div className="absolute bottom-1/4 left-[5%] w-[350px] h-[350px] rounded-full bg-accent/5 blur-[80px]" />
        <div className="absolute top-1/4 left-[15%] w-[200px] h-[200px] rounded-full bg-secondary/5 blur-[40px]" />
        
        {/* Animated circles */}
        <motion.div 
          className="hidden md:block absolute top-[20%] right-[15%] w-[50px] h-[50px] rounded-full bg-primary/20 backdrop-blur-sm"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="hidden md:block absolute bottom-[25%] left-[20%] w-[30px] h-[30px] rounded-full bg-secondary/30 backdrop-blur-sm"
          animate={{
            y: [0, 40, 0],
            x: [0, -20, 0],
            rotate: [0, -15, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      </div>
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <motion.div 
            className="lg:col-span-7"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.span 
              variants={itemVariants} 
              className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
            >
              Welcome to Confidante
            </motion.span>
            
            <motion.h1 
              variants={itemVariants}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-800 mb-6 leading-tight"
            >
              Health and well-being, 
              <span className="block text-primary">beyond the physical</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-neutral-700 mb-8 leading-relaxed"
            >
              At Confidante, we believe true wellness encompasses mental, emotional, and social health—not just physical. Discover a holistic approach to wellness that nurtures every aspect of your being.
            </motion.p>
            
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="flex flex-wrap gap-4 items-center"
            >
              <Button
                asChild
                size="lg"
                className="bg-primary text-white font-medium py-6 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-[16px]"
              >
                <a href="/#about">Get Started</a>
              </Button>
              
              <a 
                href="/#services" 
                className="flex items-center text-neutral-700 font-medium hover:text-primary transition-colors duration-300"
              >
                <span className="mr-2">Explore Services</span>
                <i className="fas fa-arrow-right text-xs"></i>
              </a>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="flex items-center mt-12 space-x-5"
            >
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-sm">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200" 
                    alt="Team member" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-sm">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200" 
                    alt="Team member" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-sm">
                  <img 
                    src="https://images.unsplash.com/photo-1558222218-b7b54eede3f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200" 
                    alt="Team member" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="text-sm text-neutral-600">
                Join our community of wellness enthusiasts
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="hidden lg:block lg:col-span-5"
            variants={floatingImageVariants}
            animate="animate"
          >
            <div className="relative">
              <div className="absolute -left-6 -top-6 w-full h-full bg-primary/10 rounded-3xl transform rotate-3"></div>
              <div className="absolute -right-6 -bottom-6 w-full h-full bg-accent/10 rounded-3xl transform -rotate-3"></div>
              <img 
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Holistic health and wellness" 
                className="relative z-10 rounded-3xl shadow-xl object-cover h-[500px] w-full"
              />
              
              <motion.div 
                className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-lg p-4 z-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-soft-peach rounded-full flex items-center justify-center">
                    <i className="fas fa-heart text-primary"></i>
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-800">Holistic Care</h4>
                    <p className="text-sm text-neutral-600">Mind, body & spirit</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -top-5 -right-5 bg-white rounded-2xl shadow-lg p-4 z-20"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-soft-teal rounded-full flex items-center justify-center">
                    <i className="fas fa-brain text-accent"></i>
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-800">Mental Health</h4>
                    <p className="text-sm text-neutral-600">Expert support</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-neutral-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ 
          opacity: { delay: 1.5, duration: 1 },
          y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
        }}
      >
        <span className="text-xs mb-2">Scroll down</span>
        <i className="fas fa-chevron-down text-sm"></i>
      </motion.div>
    </section>
  );
}
