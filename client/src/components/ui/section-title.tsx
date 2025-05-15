import { motion } from "framer-motion";

interface SectionTitleProps {
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
  accentColor?: "primary" | "secondary" | "accent";
  showLine?: boolean;
}

export function SectionTitle({
  title,
  description,
  centered = true,
  className = "",
  accentColor = "primary",
  showLine = true,
}: SectionTitleProps) {
  // Get the color class based on the accent color
  const getAccentColorClass = () => {
    switch (accentColor) {
      case "secondary":
        return "bg-secondary";
      case "accent":
        return "bg-accent";
      default:
        return "bg-primary";
    }
  };
  
  // Split the title into words to animate each one
  const titleWords = title.split(" ");
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };
  
  const wordVariants = {
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
  
  const descriptionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        delay: 0.2
      }
    }
  };
  
  const lineVariants = {
    hidden: { width: 0 },
    visible: {
      width: "80px",
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        delay: 0.3
      }
    }
  };

  return (
    <div className={`${centered ? 'text-center' : ''} ${className}`}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="mb-6"
      >
        {showLine && centered && (
          <motion.div 
            className={`h-1 rounded-full ${getAccentColorClass()} mx-auto mb-6`}
            variants={lineVariants}
          />
        )}
        
        {showLine && !centered && (
          <motion.div 
            className={`h-1 rounded-full ${getAccentColorClass()} mb-6`}
            variants={lineVariants}
          />
        )}
        
        <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-4 text-neutral-800 relative">
          {titleWords.map((word, index) => (
            <motion.span
              key={index}
              variants={wordVariants}
              className="inline-block mr-2"
            >
              {word}
            </motion.span>
          ))}
        </h2>
      </motion.div>
      
      {description && (
        <motion.p 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={descriptionVariants}
          className={`${centered ? 'max-w-2xl mx-auto' : ''} text-neutral-700/80 leading-relaxed`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
