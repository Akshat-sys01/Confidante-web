import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/section-title";

interface InsightCard {
  category: string;
  title: string;
  description: string;
  image: string;
  date: string;
  categoryColor: string;
}

const insights: InsightCard[] = [
  {
    category: "Mental Health",
    title: "The Power of Daily Journaling for Mental Health",
    description: "Discover how just 5 minutes of journaling each day can transform your mental wellbeing and emotional resilience.",
    image: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
    date: "May 12, 2023",
    categoryColor: "text-primary"
  },
  {
    category: "Social Health",
    title: "Building Meaningful Connections in a Digital Age",
    description: "Learn practical strategies to develop deeper relationships and combat loneliness in our increasingly digital world.",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
    date: "April 28, 2023",
    categoryColor: "text-secondary"
  },
  {
    category: "Nutrition",
    title: "The Connection Between Diet and Emotional Health",
    description: "Explore how the foods you eat can significantly impact your mood, energy levels, and emotional regulation.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
    date: "April 15, 2023",
    categoryColor: "text-accent"
  }
];

export function InsightsSection() {
  return (
    <section id="insights" className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16 reveal">
          <SectionTitle
            title="Latest Insights"
            description="Discover our educational content and insights on holistic health and well-being."
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              className="bg-neutral-100 rounded-xl shadow-sm overflow-hidden card-hover reveal"
              style={{ animationDelay: `${index * 0.2}s` }}
              whileHover={{ y: -5 }}
            >
              <img 
                src={insight.image} 
                alt={insight.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <span className={`text-xs font-semibold ${insight.categoryColor} uppercase tracking-wider`}>
                  {insight.category}
                </span>
                <h3 className="font-heading text-xl font-medium mt-2 mb-3">
                  {insight.title}
                </h3>
                <p className="text-neutral-800/70 mb-4">
                  {insight.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-800/60">{insight.date}</span>
                  <a href="#" className="text-primary font-medium hover:text-primary/80 transition-colors">
                    Read More
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12 reveal">
          <a 
            href="#" 
            className="inline-block border-2 border-primary text-primary hover:bg-primary hover:text-white font-medium py-2 px-6 rounded-full transition-all"
          >
            View All Insights
          </a>
        </div>
      </div>
    </section>
  );
}
