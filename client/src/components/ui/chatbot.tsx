import { useState, useRef, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Message {
  text: string;
  isUser: boolean;
}

// Simple chatbot responses
const responses = [
  "Thank you for your message! How can I help you with your health and wellness journey today?",
  "That's a great question about our services. We offer school programs, mental health education, community workshops, and professional development.",
  "I'd be happy to connect you with a team member who can provide more information. Could you please share your email?",
  "Our team typically responds within 1 business day. Is there anything else I can help with in the meantime?",
  "Confidante focuses on holistic health education, addressing mental, emotional, and social well-being beyond just physical health."
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! I'm Confidante's virtual assistant. How can I help you today?", isUser: false }
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputText.trim() === "") return;

    // Add user message
    const userMessage: Message = { text: inputText, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");

    // Generate bot response (random from predefined list)
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * responses.length);
      const botMessage: Message = { text: responses[randomIndex], isUser: false };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
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
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-4 w-80 bg-white rounded-xl shadow-xl overflow-hidden"
            >
              <div className="bg-primary p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <i className="fas fa-comment-dots text-white"></i>
                  </div>
                  <h3 className="text-white font-medium">Confidante Chat</h3>
                </div>
                <button 
                  onClick={toggleChat}
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label="Close chat"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              <div className="p-4 h-80 overflow-y-auto bg-neutral-50">
                {messages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={cn(
                      "flex items-start gap-2 mb-4",
                      msg.isUser && "justify-end"
                    )}
                  >
                    {!msg.isUser && (
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <i className="fas fa-robot text-primary text-sm"></i>
                      </div>
                    )}
                    <div 
                      className={cn(
                        "rounded-lg p-3 max-w-[80%]",
                        msg.isUser ? "bg-primary/10" : "bg-neutral-100"
                      )}
                    >
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              <form onSubmit={handleSubmit} className="p-4 border-t">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  />
                  <button 
                    type="submit"
                    className="bg-primary hover:bg-primary/90 text-white p-2 rounded-lg transition-colors"
                    aria-label="Send message"
                  >
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleChat}
          className="w-14 h-14 rounded-full bg-primary shadow-lg flex items-center justify-center text-white hover:bg-primary/90 transition-all"
          aria-label="Chat with us"
        >
          <i className={`fas ${isOpen ? "fa-times" : "fa-comment-dots"} text-xl`}></i>
        </motion.button>
      </div>
    </div>
  );
}
