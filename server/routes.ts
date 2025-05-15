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
      
      // Log the data (for server-side record)
      console.log("Contact form submission:", validatedData);
      
      // Note: Our actual email sending happens on the client-side using EmailJS
      // This endpoint acts as a fallback and validation layer
      
      // We can still store the contact message in the database if needed
      // This would be implemented in a production environment
      
      return res.status(200).json({ 
        success: true, 
        message: "Thank you for your message. We'll get back to you soon.",
        // Include recipient email in the response for client-side reference
        recipientEmail: "rakshat6501@gmail.com"
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
