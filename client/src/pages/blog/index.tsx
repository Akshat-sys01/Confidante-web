import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { blogPosts, BlogPost } from "@/data/blog-data";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/sections/footer";
import { SectionTitle } from "@/components/ui/section-title";
import { Chatbot } from "@/components/ui/chatbot";

export default function BlogListing() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Would normally fetch posts from an API endpoint
    // For now, using our static data
    setPosts(blogPosts);
  }, []);

  // Get all unique categories
  const categories = Array.from(new Set(blogPosts.map(post => post.category)));

  // Filter posts based on category and search query
  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
    const matchesSearch = searchQuery 
      ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  // Setup for revealing animation
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
  }, [filteredPosts]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-grow pt-24">
        <section className="py-16 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="container">
            <div className="text-center mb-12 reveal">
              <SectionTitle
                title="Latest Insights & Resources"
                description="Explore our collection of articles on mental, emotional, and social well-being to support your holistic health journey."
                centered={true}
              />
            </div>

            {/* Search and Filter Options */}
            <div className="mb-10 flex flex-col md:flex-row gap-4 items-center justify-between reveal">
              <div className="relative w-full md:w-72">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
                  <i className="fas fa-search"></i>
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium mr-2">Filter by:</span>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-3 py-1 text-sm rounded-full ${
                    selectedCategory === null
                      ? "bg-primary text-white"
                      : "bg-neutral-100 hover:bg-neutral-200"
                  } transition-colors`}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 text-sm rounded-full ${
                      selectedCategory === category
                        ? "bg-primary text-white"
                        : "bg-neutral-100 hover:bg-neutral-200"
                    } transition-colors`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    className="bg-white rounded-xl shadow-sm overflow-hidden card-hover reveal"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    whileHover={{ y: -5 }}
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <a className="block">
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={post.featuredImage}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                          <div className="absolute top-4 left-4">
                            <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-white/90`}>
                              {post.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center mb-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                              <img
                                src={post.author.avatar}
                                alt={post.author.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="text-xs text-neutral-500">
                              <span>{post.author.name}</span>
                              <span className="mx-2">•</span>
                              <span>{post.publishDate}</span>
                            </div>
                          </div>
                          <h3 className="font-heading text-xl font-medium mb-3 line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-neutral-600 mb-4 line-clamp-3">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-xs text-neutral-500">
                              <i className="far fa-clock mr-1"></i>
                              <span>{post.readingTimeMinutes} min read</span>
                            </div>
                            <span className="text-primary font-medium hover:text-primary/80 transition-colors inline-flex items-center gap-1">
                              Read More <i className="fas fa-arrow-right text-xs"></i>
                            </span>
                          </div>
                        </div>
                      </a>
                    </Link>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <i className="fas fa-search text-4xl text-neutral-300 mb-4"></i>
                  <h3 className="text-xl font-medium mb-2">No articles found</h3>
                  <p className="text-neutral-500">
                    Try adjusting your search or filter to find what you're looking for.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
}