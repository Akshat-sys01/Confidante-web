import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { blogPosts, BlogPost } from "@/data/blog-data";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/sections/footer";
import { Chatbot } from "@/components/ui/chatbot";
import { Button } from "@/components/ui/button";

// Function to find related posts
const findRelatedPosts = (currentPost: BlogPost, allPosts: BlogPost[], count: number = 3): BlogPost[] => {
  return allPosts
    .filter(post => post.id !== currentPost.id)
    .filter(post => 
      post.category === currentPost.category || 
      post.tags.some(tag => currentPost.tags.includes(tag))
    )
    .sort((a, b) => {
      // Count matching tags
      const aMatchCount = a.tags.filter(tag => currentPost.tags.includes(tag)).length;
      const bMatchCount = b.tags.filter(tag => currentPost.tags.includes(tag)).length;
      
      // Sort by match count (descending)
      return bMatchCount - aMatchCount;
    })
    .slice(0, count);
};

// Markdown parser component
const MarkdownContent = ({ content }: { content: string }) => {
  // Simple markdown parser for headings, paragraphs, bold, and lists
  const formattedContent = content
    // Convert markdown headings
    .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold my-6">$1</h1>')
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold my-5">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold my-4">$1</h3>')
    // Convert markdown lists
    .replace(/^- (.+)$/gm, '<li class="ml-6 list-disc my-1">$1</li>')
    .replace(/^([0-9]+)\. (.+)$/gm, '<li class="ml-6 list-decimal my-1">$2</li>')
    // Convert strong/bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Convert paragraphs (must come last)
    .split('\n\n')
    .map(para => {
      if (para.startsWith('<h1') || para.startsWith('<h2') || para.startsWith('<h3')) {
        return para;
      }
      
      if (para.includes('<li')) {
        return `<ul class="my-4">${para}</ul>`;
      }
      
      return `<p class="my-4 text-neutral-700 leading-relaxed">${para}</p>`;
    })
    .join('');

  return <div dangerouslySetInnerHTML={{ __html: formattedContent }} />;
};

export default function BlogDetail() {
  const params = useParams<{ slug: string }>();
  const { slug } = params;
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // Would normally fetch the post from an API endpoint
    // For now, find the post by slug from our static data
    const currentPost = blogPosts.find(p => p.slug === slug);
    
    if (currentPost) {
      setPost(currentPost);
      setRelatedPosts(findRelatedPosts(currentPost, blogPosts));
    }
    
    setLoading(false);
  }, [slug]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="container flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-neutral-600">Loading article...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="container flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
            <p className="text-neutral-600 mb-8">The article you're looking for doesn't exist or has been moved.</p>
            <Button asChild>
              <Link href="/blog">
                <a>Back to Articles</a>
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-grow pt-24">
        {/* Hero Header */}
        <div className="relative bg-gradient-to-br from-primary/10 to-secondary/10 py-16">
          <div className="container">
            <motion.div 
              className="max-w-3xl mx-auto text-center"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} className="mb-4">
                <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm">
                  {post.category}
                </span>
              </motion.div>
              
              <motion.h1 
                variants={itemVariants}
                className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              >
                {post.title}
              </motion.h1>
              
              <motion.div variants={itemVariants} className="flex items-center justify-center mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src={post.author.avatar} 
                    alt={post.author.name}
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="text-left">
                  <div className="font-medium">{post.author.name}</div>
                  <div className="text-sm text-neutral-600 flex items-center">
                    <span>{post.publishDate}</span>
                    <span className="mx-2">•</span>
                    <span className="flex items-center">
                      <i className="far fa-clock mr-1"></i>
                      {post.readingTimeMinutes} min read
                    </span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="flex flex-wrap justify-center gap-2 mb-8"
              >
                {post.tags.map(tag => (
                  <span 
                    key={tag}
                    className="px-3 py-1 bg-white rounded-full text-xs text-neutral-600"
                  >
                    #{tag}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="container -mt-8">
          <motion.div 
            className="max-w-4xl mx-auto relative rounded-xl overflow-hidden shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <img 
              src={post.featuredImage} 
              alt={post.title}
              className="w-full h-auto" 
            />
          </motion.div>
        </div>

        {/* Content */}
        <div className="container py-16">
          <div className="max-w-3xl mx-auto">
            <motion.article
              className="prose prose-lg max-w-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <MarkdownContent content={post.content} />

              {/* Author Bio */}
              <div className="mt-12 p-6 bg-neutral-50 rounded-xl">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-medium mb-2">About {post.author.name}</h3>
                    <p className="text-neutral-700 text-sm">{post.author.bio}</p>
                  </div>
                </div>
              </div>

              {/* Share */}
              <div className="mt-8 flex items-center justify-between">
                <div className="text-sm font-medium text-neutral-500">Share this article:</div>
                <div className="flex gap-3">
                  <a href="#" className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700 hover:bg-primary hover:text-white transition-colors">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700 hover:bg-primary hover:text-white transition-colors">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700 hover:bg-primary hover:text-white transition-colors">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700 hover:bg-primary hover:text-white transition-colors">
                    <i className="fas fa-envelope"></i>
                  </a>
                </div>
              </div>
            </motion.article>
          </div>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="bg-neutral-50 py-16">
            <div className="container">
              <h2 className="font-heading text-2xl font-bold mb-8 text-center">You Might Also Like</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map(relatedPost => (
                  <motion.div
                    key={relatedPost.id}
                    className="bg-white rounded-xl shadow-sm overflow-hidden card-hover"
                    whileHover={{ y: -5 }}
                  >
                    <Link href={`/blog/${relatedPost.slug}`}>
                      <a className="block">
                        <div className="h-40 overflow-hidden">
                          <img 
                            src={relatedPost.featuredImage}
                            alt={relatedPost.title}
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div className="p-5">
                          <span className="text-xs font-medium text-primary">{relatedPost.category}</span>
                          <h3 className="font-heading text-lg font-medium mb-2 line-clamp-2">
                            {relatedPost.title}
                          </h3>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-neutral-500">{relatedPost.publishDate}</span>
                            <span className="text-primary">Read More</span>
                          </div>
                        </div>
                      </a>
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              <div className="text-center mt-10">
                <Button asChild>
                  <Link href="/blog">
                    <a>View All Articles</a>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
}