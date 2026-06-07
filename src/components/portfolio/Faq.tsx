import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { ChevronDown, ChevronUp, Clock, FileText, Layers, Smile } from "lucide-react";

// 1. Export types for reusability across your app
export type FaqItem = {
  id: number;
  question: string;
  answer: string;
  category: string; 
};

// 2. Updated Data with your metrics, pricing, and philosophy
const portfolioFaqs: FaqItem[] = [
  { id: 1, question: "Who are you?", answer: "I am a Senior Full-Stack Architect and Technical Leader who bridges complex engineering with business strategy. Beyond the code, I learn through hands-on experience, fueled by curiosity—whether that means exploring off-beat regions as a solo traveler or learning new acoustic instruments.", category: "General" },
  { id: 2, question: "What services do you offer?", answer: "I provide enterprise system architecture, API performance tuning, cloud-native serverless pipelines, and technical leadership. I specialize in optimizing platforms across FinTech, Supply Chain, and Life Sciences while driving global collaboration team velocity.", category: "General" },
  { id: 3, question: "Which technologies do you specialize in?", answer: "Backend: Node.js, Python. Frontend: Vue3, React. Cloud & Data: AWS/GCP Serverless, Docker, PostgreSQL. I also actively integrate modern AI/LLM workflows and have deep exposure to decentralized Web3/EVM ecosystems.", category: "Technical" },
  { id: 4, question: "What is your pricing model?", answer: "Globally competitive and flexible: $40–$55/hr for immediate consulting, $5.5k–$7.5k/month for dedicated retainers, or scoped fixed-price contracts. You get Silicon Valley-level enterprise expertise and fast-learning adaptability without the massive overhead.", category: "Pricing" },
  { id: 5, question: "Are you open to remote work or relocation?", answer: "Absolutely. I am asynchronous-ready, accustomed to global collaboration delivery with international teams, and fully open to both remote collaborations and global relocation.", category: "General" },
  { id: 6, question: "Can you scale and optimize existing legacy systems?", answer: "Yes. Performance engineering is a core strength. I have a track record of restructuring microservices and batch queuing engines to reduce system latency (e.g., from 3000ms to 200ms) and scaling system reliability by 40%.", category: "Technical" },
  { id: 7, question: "Do you sign NDAs and provide post-launch support?", answer: "Yes, strict confidentiality via NDA is standard. I also provide comprehensive technical documentation, 30-day post-launch stabilization, and optional long-term maintenance retainers.", category: "Support" },
  { id: 8, question: "How can I contact you to discuss a project?", answer: "You can reach me directly at aabhay.v@gmail.com or connect with me on LinkedIn. We can start with a quick technical audit or architecture discussion. Responses are typically within 24 hours.", category: "Support" },
];

// 3. Helper to map icons safely
const getCategoryIcon = (category: string) => {
  const iconProps = { className: "inline w-4 h-4 mr-2 text-portfolio-accent" };
  switch (category) {
    case "General": return <Smile {...iconProps} />;
    case "Pricing": return <Clock {...iconProps} />;
    case "Support": return <FileText {...iconProps} />;
    case "Technical": return <Layers {...iconProps} />;
    default: return <Smile {...iconProps} />; // Safe fallback for new categories
  }
};

// 4. Component Definition allowing data to be passed as a prop
const Faq = ({ data = portfolioFaqs }: { data?: FaqItem[] }) => {
  const [openId, setOpenId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Dynamically generate categories from the provided data
  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(data.map((item) => item.category)))];
  }, [data]);

  const filteredFaqs = activeCategory === "All" 
    ? data 
    : data.filter(f => f.category === activeCategory);

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          Frequently Asked Questions
        </h2>
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
        {filteredFaqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className="bg-card/70 backdrop-blur-sm rounded-xl transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden border border-border"
            >
              <button
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="w-full flex justify-between items-center px-6 py-4 md:py-5 text-left focus:outline-none"
              >
                <div className="flex items-center">
                  {getCategoryIcon(faq.category)}
                  <span className="font-medium text-lg md:text-xl text-foreground">
                    {faq.question}
                  </span>
                </div>
                <span className="text-portfolio-accent shrink-0 ml-4">
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
        Can't find your question? <a href="mailto:aabhay.v@gmail.com" className="underline hover:text-foreground transition-colors cursor-pointer">Contact me directly</a> for more details.
      </p>
    </div>
  );
};

export default Faq;