import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import emailjs from 'emailjs-com';

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

// EmailJS constants
const EMAILJS_SERVICE_ID = 'service_id'; // Replace with your service ID when provided
const EMAILJS_TEMPLATE_ID = 'template_id'; // Replace with your template ID when provided
const EMAILJS_USER_ID = 'user_id'; // Replace with your user ID when provided

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailjsInitialized, setEmailjsInitialized] = useState(false);
  const { toast } = useToast();
  
  // Initialize EmailJS
  useEffect(() => {
    if (!emailjsInitialized) {
      try {
        emailjs.init(EMAILJS_USER_ID);
        setEmailjsInitialized(true);
      } catch (error) {
        console.error("EmailJS initialization error:", error);
      }
    }
  }, [emailjsInitialized]);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // Create a template parameters object
      const templateParams = {
        from_name: data.name,
        reply_to: data.email,
        to_email: 'rakshat6501@gmail.com',
        subject: data.subject || 'New Contact Form Submission',
        message: data.message
      };
      
      // Try to send using EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );
      
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. We'll get back to you soon.",
        variant: "default",
      });
      reset();
    } catch (error) {
      console.error("Form submission error:", error);
      
      // Fallback to regular API if EmailJS fails
      try {
        await apiRequest("POST", "/api/contact", data);
        toast({
          title: "Message sent!",
          description: "Thank you for reaching out. We'll get back to you soon.",
          variant: "default",
        });
        reset();
      } catch (apiError) {
        toast({
          title: "Something went wrong",
          description: "Your message could not be sent. Please try again later.",
          variant: "destructive",
        });
        console.error("API request error:", apiError);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="bg-neutral-100 rounded-xl p-8"
    >
      <div className="mb-6">
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          {...register("name")}
          className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>
      
      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register("email")}
          className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>
      
      <div className="mb-6">
        <label htmlFor="subject" className="block text-sm font-medium mb-2">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          {...register("subject")}
          className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message
        </label>
        <textarea
          id="message"
          {...register("message")}
          rows={5}
          className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
        ></textarea>
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>
      
      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition-all shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
          </span>
        ) : (
          "Send Message"
        )}
      </motion.button>
    </form>
  );
}
