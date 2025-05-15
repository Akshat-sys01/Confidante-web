import { motion } from "framer-motion";

interface SectionTitleProps {
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export function SectionTitle({
  title,
  description,
  centered = true,
  className = "",
}: SectionTitleProps) {
  return (
    <div className={`${centered ? 'text-center' : ''} ${className}`}>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="font-heading text-3xl md:text-4xl font-semibold mb-4 text-neutral-800"
      >
        {title}
      </motion.h2>
      
      {description && (
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`${centered ? 'max-w-2xl mx-auto' : ''} text-neutral-800/80`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
