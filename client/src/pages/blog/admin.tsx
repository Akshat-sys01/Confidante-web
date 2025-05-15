import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { blogPosts, BlogPost } from "@/data/blog-data";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/sections/footer";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Mock function to simulate saving a post (would connect to API in real implementation)
const savePost = async (post: BlogPost): Promise<boolean> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return true;
};

// Mock function to simulate deleting a post (would connect to API in real implementation)
const deletePost = async (postId: string): Promise<boolean> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return true;
};

export default function BlogAdmin() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    // Would normally fetch posts from API endpoint
    // For now using our static data
    setPosts(blogPosts);
  }, []);

  // Form state
  const [formState, setFormState] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    featuredImage: "",
    tags: "",
    authorName: "",
    authorAvatar: "",
    authorBio: "",
    readingTimeMinutes: 5
  });

  // Initialize form with post data or reset form
  const initializeForm = (post: BlogPost | null) => {
    if (post) {
      setFormState({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        featuredImage: post.featuredImage,
        tags: post.tags.join(", "),
        authorName: post.author.name,
        authorAvatar: post.author.avatar,
        authorBio: post.author.bio,
        readingTimeMinutes: post.readingTimeMinutes
      });
      setSelectedPost(post);
    } else {
      setFormState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        category: "",
        featuredImage: "",
        tags: "",
        authorName: "",
        authorAvatar: "",
        authorBio: "",
        readingTimeMinutes: 5
      });
      setSelectedPost(null);
    }
  };

  const handleEditClick = (post: BlogPost) => {
    initializeForm(post);
    setIsEditing(true);
  };

  const handleNewPostClick = () => {
    initializeForm(null);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedPost(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Convert form state to post object
      const postData: BlogPost = {
        id: selectedPost?.id || Date.now().toString(),
        slug: formState.slug,
        title: formState.title,
        excerpt: formState.excerpt,
        content: formState.content,
        featuredImage: formState.featuredImage,
        publishDate: selectedPost?.publishDate || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        author: {
          name: formState.authorName,
          avatar: formState.authorAvatar,
          bio: formState.authorBio
        },
        category: formState.category,
        tags: formState.tags.split(",").map(tag => tag.trim()),
        readingTimeMinutes: Number(formState.readingTimeMinutes)
      };

      // Save post (mock implementation)
      const success = await savePost(postData);

      if (success) {
        // Update local state to reflect changes
        if (selectedPost) {
          // Update existing post
          setPosts(prev => prev.map(p => p.id === postData.id ? postData : p));
          toast({
            title: "Post Updated",
            description: "The post has been successfully updated.",
          });
        } else {
          // Add new post
          setPosts(prev => [...prev, postData]);
          toast({
            title: "Post Created",
            description: "The new post has been successfully created.",
          });
        }

        setIsEditing(false);
        setSelectedPost(null);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error saving the post. Please try again.",
        variant: "destructive"
      });
      console.error("Error saving post:", error);
    }

    setIsSubmitting(false);
  };

  const handleDeleteClick = (postId: string) => {
    setPostToDelete(postId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!postToDelete) return;
    
    try {
      const success = await deletePost(postToDelete);
      
      if (success) {
        setPosts(prev => prev.filter(p => p.id !== postToDelete));
        toast({
          title: "Post Deleted",
          description: "The post has been successfully deleted.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error deleting the post. Please try again.",
        variant: "destructive"
      });
      console.error("Error deleting post:", error);
    }
    
    setIsDeleteModalOpen(false);
    setPostToDelete(null);
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setPostToDelete(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-grow pt-24 pb-16">
        <div className="container">
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <SectionTitle 
                title="Blog Management" 
                description="Create, edit, and manage your blog posts."
                centered={false}
              />
              <Button onClick={handleNewPostClick} className="flex items-center gap-2">
                <i className="fas fa-plus-circle"></i>
                New Post
              </Button>
            </div>
          </div>

          {isEditing ? (
            // Post Editor Form
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-6">
                {selectedPost ? "Edit Post" : "Create New Post"}
              </h2>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4 lg:col-span-2">
                    <h3 className="font-medium text-neutral-500">Post Details</h3>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Title</label>
                      <input
                        type="text"
                        name="title"
                        value={formState.title}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Slug</label>
                      <input
                        type="text"
                        name="slug"
                        value={formState.slug}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        required
                      />
                      <p className="text-xs text-neutral-500 mt-1">URL-friendly version of the title (e.g., "my-blog-post")</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Excerpt</label>
                      <textarea
                        name="excerpt"
                        value={formState.excerpt}
                        onChange={handleInputChange}
                        rows={2}
                        className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        required
                      ></textarea>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Content (Markdown)
                        <span className="ml-2 text-xs text-neutral-500">
                          (Supports basic markdown: # for headings, ** for bold, - for lists)
                        </span>
                      </label>
                      <textarea
                        name="content"
                        value={formState.content}
                        onChange={handleInputChange}
                        rows={15}
                        className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono text-sm"
                        required
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium text-neutral-500">Metadata</h3>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Category</label>
                      <input
                        type="text"
                        name="category"
                        value={formState.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Tags</label>
                      <input
                        type="text"
                        name="tags"
                        value={formState.tags}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="health, wellness, mindfulness"
                        required
                      />
                      <p className="text-xs text-neutral-500 mt-1">Separate tags with commas</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Featured Image URL</label>
                      <input
                        type="text"
                        name="featuredImage"
                        value={formState.featuredImage}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Reading Time (minutes)</label>
                      <input
                        type="number"
                        name="readingTimeMinutes"
                        value={formState.readingTimeMinutes}
                        onChange={handleInputChange}
                        min="1"
                        max="60"
                        className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium text-neutral-500">Author Information</h3>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Author Name</label>
                      <input
                        type="text"
                        name="authorName"
                        value={formState.authorName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Author Avatar URL</label>
                      <input
                        type="text"
                        name="authorAvatar"
                        value={formState.authorAvatar}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Author Bio</label>
                      <textarea
                        name="authorBio"
                        value={formState.authorBio}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">
                          <i className="fas fa-spinner"></i>
                        </span>
                        Saving...
                      </>
                    ) : (
                      selectedPost ? "Update Post" : "Create Post"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            // Posts Table
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {posts.length === 0 ? (
                <div className="p-8 text-center">
                  <i className="far fa-file-alt text-neutral-300 text-5xl mb-4"></i>
                  <h3 className="text-xl font-medium mb-2">No Posts Yet</h3>
                  <p className="text-neutral-500 mb-6">Create your first blog post to get started.</p>
                  <Button onClick={handleNewPostClick}>Create New Post</Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-neutral-50 border-b">
                      <tr>
                        <th className="text-left py-3 px-4 font-medium">Title</th>
                        <th className="text-left py-3 px-4 font-medium">Category</th>
                        <th className="text-left py-3 px-4 font-medium hidden md:table-cell">Author</th>
                        <th className="text-left py-3 px-4 font-medium hidden md:table-cell">Date</th>
                        <th className="text-right py-3 px-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {posts.map(post => (
                        <tr key={post.id} className="hover:bg-neutral-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
                                <img 
                                  src={post.featuredImage} 
                                  alt={post.title} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <div className="font-medium line-clamp-1">{post.title}</div>
                                <div className="text-xs text-neutral-500 line-clamp-1">/blog/{post.slug}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                              {post.category}
                            </span>
                          </td>
                          <td className="py-3 px-4 hidden md:table-cell">{post.author.name}</td>
                          <td className="py-3 px-4 hidden md:table-cell text-neutral-500">{post.publishDate}</td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex justify-end gap-2">
                              <Link href={`/blog/${post.slug}`}>
                                <a 
                                  className="p-2 text-neutral-600 hover:text-primary transition-colors" 
                                  title="View"
                                >
                                  <i className="far fa-eye"></i>
                                </a>
                              </Link>
                              <button 
                                onClick={() => handleEditClick(post)}
                                className="p-2 text-neutral-600 hover:text-primary transition-colors"
                                title="Edit"
                              >
                                <i className="far fa-edit"></i>
                              </button>
                              <button 
                                onClick={() => handleDeleteClick(post.id)}
                                className="p-2 text-neutral-600 hover:text-red-500 transition-colors"
                                title="Delete"
                              >
                                <i className="far fa-trash-alt"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md mx-4">
            <h3 className="text-xl font-bold mb-4">Delete Post</h3>
            <p className="mb-6">Are you sure you want to delete this post? This action cannot be undone.</p>
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={cancelDelete}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}