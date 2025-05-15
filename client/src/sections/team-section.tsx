import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/section-title";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  roleColor: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    github?: string;
    website?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    name: "Shreya Mittal",
    role: "Founder",
    bio: "Passionate about holistic wellness education and committed to transforming health education for schools and communities.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=700",
    roleColor: "text-primary",
    socialLinks: {
      linkedin: "https://www.linkedin.com/company/your-confidante/posts/?feedView=all",
      instagram: "https://www.instagram.com/your.confidante/"
    }
  },
  {
    name: "Michael Chen",
    role: "Lead Developer",
    bio: "Technology innovator with a background in health informatics and a mission to leverage tech for mental health education.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=700",
    roleColor: "text-secondary",
    socialLinks: {
      linkedin: "#",
      github: "#"
    }
  },
  {
    name: "Dr. Jasmine Williams",
    role: "Head of Curriculum",
    bio: "Clinical psychologist with expertise in developing evidence-based educational programs for adolescents and young adults.",
    image: "https://images.unsplash.com/photo-1558222218-b7b54eede3f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=700",
    roleColor: "text-accent",
    socialLinks: {
      linkedin: "#",
      website: "#"
    }
  }
];

export function TeamSection() {
  return (
    <section id="team" className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16 reveal">
          <SectionTitle
            title="Our Team"
            description="Meet the passionate experts behind Confidante who are dedicated to transforming health education."
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-xl shadow-sm bg-neutral-100 reveal card-hover"
              style={{ animationDelay: `${index * 0.2}s` }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="font-heading text-xl font-medium mb-1">{member.name}</h3>
                <p className={`${member.roleColor} mb-4`}>{member.role}</p>
                <p className="text-neutral-800/70 text-sm">{member.bio}</p>
                
                <div className="flex gap-3 mt-4">
                  {member.socialLinks.linkedin && (
                    <a href={member.socialLinks.linkedin} className="text-neutral-800/60 hover:text-primary transition-colors">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  )}
                  {member.socialLinks.instagram && (
                    <a href={member.socialLinks.instagram} className="text-neutral-800/60 hover:text-primary transition-colors">
                      <i className="fab fa-instagram"></i>
                    </a>
                  )}
                  {member.socialLinks.twitter && (
                    <a href={member.socialLinks.twitter} className="text-neutral-800/60 hover:text-primary transition-colors">
                      <i className="fab fa-twitter"></i>
                    </a>
                  )}
                  {member.socialLinks.github && (
                    <a href={member.socialLinks.github} className="text-neutral-800/60 hover:text-primary transition-colors">
                      <i className="fab fa-github"></i>
                    </a>
                  )}
                  {member.socialLinks.website && (
                    <a href={member.socialLinks.website} className="text-neutral-800/60 hover:text-primary transition-colors">
                      <i className="fas fa-globe"></i>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
