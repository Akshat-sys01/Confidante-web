import { useState, useRef, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Message {
  text: string;
  isUser: boolean;
  options?: string[];
}

// Simple chatbot responses
const responses = [
  "Thank you for your message! How can I help you with your health and wellness journey today?",
  "That's a great question about our services. We offer school programs, mental health education, community workshops, and professional development.",
  "I'd be happy to connect you with a team member who can provide more information. Could you please share your email?",
  "Our team typically responds within 1 business day. Is there anything else I can help with in the meantime?",
  "Confidante focuses on holistic health education, addressing mental, emotional, and social well-being beyond just physical health."
];

// Quick suggestion topics
const initialOptions = [
  "Learn about our programs",
  "Talk to a specialist",
  "How does Confidante work?",
  "Schedule a consultation"
];

// Response mapping for quick suggestion topics
const responseMap: Record<string, string> = {
  "Learn about our programs": "We offer several programs including School Programs, Mental Health Education, Community Workshops, and Professional Development. Which one would you like to learn more about?",
  "Talk to a specialist": "I'd be happy to connect you with one of our specialists. Could you please tell me what area you're interested in (mental health, emotional wellness, or social health)?",
  "How does Confidante work?": "Confidante provides holistic health education that goes beyond physical health. We bring mental, emotional, and social health education to schools and communities through tailored programs and expert-led workshops.",
  "Schedule a consultation": "Great! To schedule a consultation, we'll need a few details. You can either fill out our contact form, or I can guide you through the process here. Would you like to proceed?"
};

// Second level options mapping
const secondLevelOptions: Record<string, string[]> = {
  "Learn about our programs": [
    "School Programs",
    "Mental Health Education",
    "Community Workshops",
    "Professional Development"
  ],
  "Talk to a specialist": [
    "Mental Health",
    "Emotional Wellness",
    "Social Health"
  ]
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [currentOptions, setCurrentOptions] = useState<string[]>(initialOptions);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Show greeting message after a brief delay when the page loads
  useEffect(() => {
    if (!hasGreeted) {
      const timer = setTimeout(() => {
        // Add bot welcome message with options
        const welcomeMessage: Message = { 
          text: "Hello! I'm Confidante's wellness assistant. How can I help you today?", 
          isUser: false,
          options: initialOptions
        };
        setMessages([welcomeMessage]);
        // Briefly flash the chat icon to draw attention
        const pulseTimer = setTimeout(() => {
          const chatButton = document.getElementById('chat-button');
          if (chatButton) {
            chatButton.classList.add('pulse-animation');
            setTimeout(() => chatButton.classList.remove('pulse-animation'), 1000);
          }
        }, 1500);
        
        setHasGreeted(true);
        
        return () => clearTimeout(pulseTimer);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [hasGreeted]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputText.trim() === "") return;

    // Add user message
    const userMessage: Message = { text: inputText, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");

    // Generate bot response
    setTimeout(() => {
      // Check if input matches any keywords
      const lowercaseInput = inputText.toLowerCase();
      
      let responseText = "";
      let options: string[] | undefined = undefined;
      
      if (lowercaseInput.includes("program") || lowercaseInput.includes("service")) {
        responseText = "We offer several programs including School Programs, Mental Health Education, Community Workshops, and Professional Development. Which one would you like to learn more about?";
        options = secondLevelOptions["Learn about our programs"];
      } else if (lowercaseInput.includes("specialist") || lowercaseInput.includes("expert") || lowercaseInput.includes("talk to")) {
        responseText = "I'd be happy to connect you with one of our specialists. Could you please tell me what area you're interested in?";
        options = secondLevelOptions["Talk to a specialist"];
      } else if (lowercaseInput.includes("contact") || lowercaseInput.includes("email") || lowercaseInput.includes("call")) {
        responseText = "You can reach us through our contact form, or by email at hello@confidante.com. Would you like me to guide you to our contact section?";
      } else {
        // Default to random response if no keywords match
        const randomIndex = Math.floor(Math.random() * responses.length);
        responseText = responses[randomIndex];
      }
      
      const botMessage: Message = { 
        text: responseText, 
        isUser: false,
        options: options
      };
      
      setMessages((prev) => [...prev, botMessage]);
      
      // Reset current options
      setCurrentOptions(initialOptions);
    }, 1000);
  };

  // Handle quick option selection
  const handleOptionClick = (option: string) => {
    // Add user message (selected option)
    const userMessage: Message = { text: option, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    
    // Generate bot response based on option
    setTimeout(() => {
      const responseText = responseMap[option] || "I'm not sure I understand. Could you please rephrase your question?";
      
      // Check if this option has second-level options
      const options = secondLevelOptions[option];
      
      const botMessage: Message = { 
        text: responseText, 
        isUser: false,
        options: options
      };
      
      setMessages((prev) => [...prev, botMessage]);
    }, 800);
  };

  // Auto-scroll to the bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className="flex flex-col items-end">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ type: "spring", damping: 15, stiffness: 300 }}
              className="mb-4 w-[320px] bg-white rounded-2xl shadow-xl overflow-hidden border border-primary/10"
            >
              <div className="bg-accent/20 backdrop-blur-sm p-4 flex justify-between items-center border-b border-accent/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shadow-inner">
                    <i className="fas fa-comment-dots text-accent"></i>
                  </div>
                  <div>
                    <h3 className="text-neutral-800 font-medium">Confidante Assist</h3>
                    <div className="flex items-center text-xs text-neutral-600">
                      <span className="block w-2 h-2 rounded-full bg-green-500 mr-1.5"></span>
                      Online now
                    </div>
                  </div>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleChat}
                  className="text-neutral-600 hover:text-neutral-800 transition-colors p-1.5 rounded-full hover:bg-neutral-100"
                  aria-label="Close chat"
                >
                  <i className="fas fa-times"></i>
                </motion.button>
              </div>
              
              <div className="p-4 h-[320px] overflow-y-auto bg-soft-teal/10 bg-pattern-light">
                {messages.map((msg, index) => (
                  <motion.div 
                    key={index} 
                    className={cn(
                      "flex items-start gap-2 mb-4",
                      msg.isUser && "justify-end"
                    )}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    {!msg.isUser && (
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <i className="fas fa-robot text-accent text-sm"></i>
                      </div>
                    )}
                    <div 
                      className={cn(
                        "rounded-2xl p-3 max-w-[80%] shadow-sm",
                        msg.isUser 
                          ? "bg-primary text-white rounded-tr-none" 
                          : "bg-white rounded-tl-none"
                      )}
                    >
                      <p className="text-sm">{msg.text}</p>
                      
                      {/* Quick reply options */}
                      {msg.options && msg.options.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {msg.options.map((option, i) => (
                            <motion.button
                              key={i}
                              onClick={() => handleOptionClick(option)}
                              className="block w-full text-left text-xs py-2 px-3 rounded-lg bg-neutral-100 hover:bg-neutral-200 transition-colors text-neutral-800"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 + (i * 0.1) }}
                            >
                              {option}
                            </motion.button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              <form onSubmit={handleSubmit} className="p-4 border-t border-neutral-200 bg-white">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2.5 rounded-full border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all text-sm"
                  />
                  <motion.button 
                    type="submit"
                    className="bg-accent hover:bg-accent/90 text-white p-2.5 rounded-full transition-colors shadow-sm flex items-center justify-center"
                    aria-label="Send message"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <i className="fas fa-paper-plane"></i>
                  </motion.button>
                </div>
                
                <div className="mt-3 flex flex-wrap gap-2">
                  {currentOptions.slice(0, 2).map((option, index) => (
                    <motion.button
                      key={index}
                      type="button"
                      onClick={() => handleOptionClick(option)}
                      className="text-xs bg-neutral-100 text-neutral-600 py-1.5 px-3 rounded-full hover:bg-neutral-200 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.button
          id="chat-button"
          whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(94, 234, 224, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleChat}
          className="w-14 h-14 rounded-full bg-accent shadow-lg flex items-center justify-center text-white hover:bg-accent/90 transition-all"
          aria-label="Chat with us"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 400, damping: 15 }}
        >
          <i className={`fas ${isOpen ? "fa-times" : "fa-comment-dots"} text-xl`}></i>
        </motion.button>
      </div>
      
      {/* Add styles for the pulse animation */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .pulse-animation {
          animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 10px 15px -3px rgba(94, 234, 224, 0.2);
          }
          50% {
            transform: scale(1.08);
            box-shadow: 0 20px 25px -5px rgba(94, 234, 224, 0.4);
          }
        }
        
        .bg-pattern-light {
          background-image: radial-gradient(circle at 10px 10px, rgba(94, 234, 224, 0.05) 2px, transparent 0);
          background-size: 24px 24px;
        }
        `
      }} />
    </div>
  );
}
