import { motion } from "framer-motion";
import { Link } from "wouter";
import { SectionTitle } from "@/components/ui/section-title";
import { blogPosts } from "@/data/blog-data";

// Use the top 3 blog posts from our data
const featuredInsights = blogPosts.slice(0, 3).map(post => ({
  slug: post.slug,
  category: post.category,
  title: post.title,
  description: post.excerpt,
  image: post.featuredImage,
  date: post.publishDate,
  categoryColor: getCategoryColor(post.category)
}));

// Helper function to get color based on category
function getCategoryColor(category: string): string {
  switch(category) {
    case "Mental Health":
      return "text-primary";
    case "Social Health":
      return "text-secondary";
    case "Nutrition":
      return "text-accent";
    case "Physical Health":
      return "text-green-500";
    default:
      return "text-primary";
  }
}

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
          {featuredInsights.map((insight, index) => (
            <motion.div
              key={index}
              className="bg-neutral-100 rounded-xl shadow-sm overflow-hidden card-hover reveal"
              style={{ animationDelay: `${index * 0.2}s` }}
              whileHover={{ y: -5 }}
            >
              <div className="cursor-pointer" onClick={() => window.location.href = `/blog/${insight.slug}`}>
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
                    <span className="text-primary font-medium hover:text-primary/80 transition-colors">
                      Read More
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12 reveal">
          <button 
            onClick={() => window.location.href = "/blog"}
            className="inline-block border-2 border-primary text-primary hover:bg-primary hover:text-white font-medium py-2 px-6 rounded-full transition-all"
          >
            View All Insights
          </button>
        </div>
      </div>
    </section>
  );
}
