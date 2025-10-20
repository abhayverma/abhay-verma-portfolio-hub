import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronUp, Clock, FileText, Layers, Smile } from "lucide-react";

type FaqItem = {
  id: number;
  question: string;
  answer: string;
  category: "General" | "Pricing" | "Support" | "Technical";
};

const faqs: FaqItem[] = [
  { id: 1, question: "Who are you?", answer: "I am Abhay Verma, a full-stack developer specializing in web applications, cloud architecture, and scalable microservices.", category: "General" },
  { id: 2, question: "What services do you offer?", answer: "End-to-end web development, cloud architecture consulting, API development, microservices design, and technical mentorship.", category: "General" },
  { id: 3, question: "Which technologies do you work with?", answer: "Front-end: React, Next.js, Vue. Back-end: Node.js, NestJS, Python. Databases: PostgreSQL, MongoDB, MySQL. Cloud: AWS, Docker.", category: "Technical" },
  { id: 4, question: "How can I contact you?", answer: "You can reach me via email at social.abhay@gmail.com or LinkedIn. Responses usually within 24 hours.", category: "Support" },
  { id: 5, question: "What is your pricing model?", answer: "Flexible pricing: fixed-price contracts, hourly rates, or retainers for long-term collaborations.", category: "Pricing" },
  { id: 6, question: "Do you sign NDAs?", answer: "Yes. Confidentiality is ensured via NDA agreements when required.", category: "Support" },
  { id: 7, question: "Do you provide post-launch support?", answer: "Complimentary 30-day support included; extended maintenance packages available.", category: "Support" },
  { id: 8, question: "Can you scale existing systems?", answer: "Yes, I evaluate architecture and implement scalable solutions including microservices, caching, and cloud migration.", category: "Technical" },
];

const categories = ["All", "General", "Pricing", "Support", "Technical"];

const categoryIcons: Record<string, JSX.Element> = {
  General: <Smile className="inline w-4 h-4 mr-1 text-portfolio-accent" />,
  Pricing: <Clock className="inline w-4 h-4 mr-1 text-portfolio-accent" />,
  Support: <FileText className="inline w-4 h-4 mr-1 text-portfolio-accent" />,
  Technical: <Layers className="inline w-4 h-4 mr-1 text-portfolio-accent" />,
};

const Faq = () => {
  const [openId, setOpenId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredFaqs = activeCategory === "All" ? faqs : faqs.filter(f => f.category === activeCategory);

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Frequently Asked Questions</h2>
        <p className="text-muted-foreground text-base md:text-lg">
          Find answers to common questions about services, pricing, workflow, and support.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat 
              ? "bg-portfolio-accent text-white shadow-md" 
              : "bg-portfolio-secondary/20 text-foreground hover:bg-portfolio-accent/80 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ List */}
      <div className="space-y-3">
        {filteredFaqs.map(faq => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className={`bg-card/70 backdrop-blur-sm rounded-xl transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden border border-border`}
            >
              <button
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="w-full flex justify-between items-center px-6 py-4 md:py-5 text-left focus:outline-none"
              >
                <div className="flex items-center">
                  {categoryIcons[faq.category]}
                  <span className="font-medium text-lg md:text-xl text-foreground">{faq.question}</span>
                </div>
                <span className="text-portfolio-accent">
                  {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="px-6 pb-5 text-muted-foreground text-sm md:text-base leading-relaxed"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <p className="mt-8 text-center text-sm text-portfolio-accent italic">
        Can't find your question? <span className="underline cursor-pointer">Contact me directly</span> for more details.
      </p>
    </div>
  );
};

export default Faq;
