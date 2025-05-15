import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

// Define contact schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Handle contact form submissions
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      // Validate request body
      const validatedData = contactSchema.parse(req.body);
      
      // In a real implementation, this would send an email
      // Since we don't want to implement an actual email service here,
      // we'll just log the data and return a success response
      console.log("Contact form submission:", validatedData);
      
      // You could use a service like EmailJS, Formspree, or Nodemailer in production
      // For example with Nodemailer:
      // await sendEmail({
      //   to: "your-email@example.com",
      //   subject: `Contact Form: ${validatedData.subject || 'New Message'}`,
      //   text: `From: ${validatedData.name} (${validatedData.email})\n\n${validatedData.message}`
      // });
      
      return res.status(200).json({ 
        success: true, 
        message: "Thank you for your message. We'll get back to you soon." 
      });
    } catch (error) {
      console.error("Contact form error:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      }
      
      return res.status(500).json({ 
        success: false, 
        message: "Failed to process your message. Please try again later." 
      });
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
