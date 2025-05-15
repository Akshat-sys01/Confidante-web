import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/section-title";
import { ContactForm } from "@/components/ui/contact-form";

interface ContactInfo {
  icon: string;
  title: string;
  content: React.ReactNode;
}

const contactInfo: ContactInfo[] = [
  {
    icon: "fas fa-envelope",
    title: "Email",
    content: <p className="text-neutral-800/70">helpatconfidante@gmail.com</p>
  },
  {
    icon: "fas fa-phone-alt",
    title: "Phone",
    content: (
      <div className="text-neutral-800/70">
        <p>+91 98391 54888</p>
        <p className="mt-1">+91 75058 43873</p>
      </div>
    )
  }
];

const socialLinks = [
  { icon: "fab fa-instagram", href: "https://www.instagram.com/your.confidante/" },
  { icon: "fab fa-linkedin-in", href: "https://www.linkedin.com/company/your-confidante/posts/?feedView=all" }
];

export function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16 reveal">
          <SectionTitle
            title="Contact Us"
            description="Have questions about our programs or want to bring Confidante to your school or organization? Reach out to us."
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="reveal">
            <div className="bg-neutral-100 rounded-xl p-8 h-full">
              <h3 className="font-heading text-2xl font-medium mb-6">Get in Touch</h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <i className={`${info.icon} text-primary`}></i>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">{info.title}</h4>
                      {info.content}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <h4 className="font-medium mb-3">Follow Us</h4>
                <div className="flex gap-4">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.href}
                      whileHover={{ scale: 1.1, backgroundColor: "hsl(var(--primary))", color: "#fff" }}
                      className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                    >
                      <i className={link.icon}></i>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="reveal" style={{ animationDelay: "0.3s" }}>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
