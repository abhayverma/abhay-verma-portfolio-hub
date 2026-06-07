import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@portfolio/shared-ui";
import { Button } from "@portfolio/shared-ui";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@portfolio/shared-ui";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import { FaLinkedin } from "react-icons/fa6";
import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_gwat0nd";
const TEMPLATE_ID = "template_9cc74w8";
const PUBLIC_KEY = "jTBi5oQMY7KVsBj1N";

const contactInfo = [
  { icon: Mail, label: "Email", value: "aabhay.v@gmail.com", action: "mailto:aabhay.v@gmail.com" },
  { icon: MapPin, label: "Location", value: "India | Open to Remote & Relocation", action: null },
  { icon: FaLinkedin, label: "LinkedIn", value: "Abhay Verma", action: "https://linkedin.com/in/socialabhay" },
];

const services = [
  "Full Stack Development",
  "Cloud Architecture (AWS)",
  "Microservices Design",
  "API Development & Integration",
  "Performance Optimization",
  "Team Leadership & Mentoring",
  "Technical Consulting",
  "Code Review & Auditing",
];

const inputFields = [
  { id: "name", label: "Full Name *", type: "text", required: true, placeholder: "John Doe" },
  { id: "email", label: "Email Address *", type: "email", required: true, placeholder: "john@company.com" },
  { id: "company", label: "Company/Organization", type: "text", required: false, placeholder: "Company Name" },
];

const selectFields = [
  {
    id: "project",
    label: "Project Type",
    options: [
      { value: "", label: "Select Project Type" },
      { value: "web-development", label: "Web Development" },
      { value: "mobile-app", label: "Mobile Application" },
      { value: "api-development", label: "API Development" },
      { value: "cloud-migration", label: "Cloud Migration" },
      { value: "performance-optimization", label: "Performance Optimization" },
      { value: "consulting", label: "Technical Consulting" },
      { value: "other", label: "Other" },
    ],
  },
  {
    id: "budget",
    label: "Budget Range",
    options: [
      { value: "", label: "Select Budget Range" },
      { value: "under-5k", label: "Under $5,000" },
      { value: "5k-15k", label: "$5,000 - $15,000" },
      { value: "15k-50k", label: "$15,000 - $50,000" },
      { value: "50k-plus", label: "$50,000+" },
      { value: "discuss", label: "Let's Discuss" },
    ],
  },
  {
    id: "timeline",
    label: "Timeline",
    options: [
      { value: "", label: "Select Timeline" },
      { value: "asap", label: "Urgent (within 2-4 weeks)" },
      { value: "1-month", label: "Standard (1-2 Months)" },
      { value: "3-months", label: "Hustler (3-5 Months)" },
      { value: "6-months", label: "Enterprise (6+ Months)" },
      { value: "flexible", label: "Flexible" },
    ],
  },
];

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    project: "",
    budget: "",
    timeline: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY);
      toast({ title: "Message Sent Successfully!", description: "Thank you for reaching out. I'll get back to you within 24 hours." });
      setFormData({ name: "", email: "", company: "", project: "", budget: "", timeline: "", message: "" });
    } catch (error) {
      console.error(error);
      toast({ title: "Failed to send message", description: "Please try again or contact me directly via email.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-portfolio-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Let's Work Together</h2>
          <p className="text-xl text-portfolio-muted max-w-3xl mx-auto">
            Ready to bring your ideas to life? I'm available for freelance projects, consulting, and full-time opportunities.
          </p>
        </div>

        <div className="grid md:grid-cols-[2fr_1fr] gap-8 items-stretch">
          {/* Left: Contact Form */}
          <Card className="flex flex-col h-full shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <MessageCircle className="text-portfolio-accent" />
                Start a Conversation
              </CardTitle>
              <p className="text-portfolio-muted">
                Tell me about your project and let’s explore how I can help.
              </p>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Row 1: Name & Email */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name *</label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address *</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      required
                    />
                  </div>
                </div>

                {/* Row 2: Company & Project Type */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium mb-1">Company/Organization</label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Company Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="project" className="block text-sm font-medium mb-1">Project Type</label>
                    <select
                      id="project"
                      name="project"
                      value={formData.project}
                      onChange={handleChange}
                      className="w-full p-2 border border-input rounded-md bg-background"
                    >
                      <option value="">Select Project Type</option>
                      <option value="web-development">Web Development</option>
                      <option value="mobile-app">Mobile Application</option>
                      <option value="api-development">API Development</option>
                      <option value="cloud-migration">Cloud Migration</option>
                      <option value="performance-optimization">Performance Optimization</option>
                      <option value="consulting">Technical Consulting</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Row 3: Budget & Timeline */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium mb-1">Budget Range</label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full p-2 border border-input rounded-md bg-background"
                    >
                      <option value="">Select Budget Range</option>
                      <option value="under-5k">Under $5,000</option>
                      <option value="5k-15k">$5,000 - $15,000</option>
                      <option value="15k-50k">$15,000 - $50,000</option>
                      <option value="50k-plus">$50,000+</option>
                      <option value="discuss">Let's Discuss</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="timeline" className="block text-sm font-medium mb-1">Timeline</label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full p-2 border border-input rounded-md bg-background"
                    >
                      <option value="">Select Timeline</option>
                      <option value="asap">Urgent (within 2-4 weeks)</option>
                      <option value="1-month">Standard (1-2 Months)</option>
                      <option value="3-months">Hustler (3-5 Months)</option>
                      <option value="6-months">Enterprise (6+ Months)</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                </div>

                {/* Row 4: Project Details */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">Project Details *</label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, goals, technical requirements, and any challenges..."
                    rows={4}
                    required
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-portfolio-accent hover:bg-portfolio-accent/90 text-white flex items-center justify-center"
                >
                  {isSubmitting ? "Sending Message..." : <><Send className="mr-2" size={20} />Send Message</>}
                </Button>
              </form>
            </CardContent>
          </Card>


          {/* Right: Contact Info + Services */}
          <Card className="flex flex-col h-full shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl mb-4">Get in Touch & Support</CardTitle>
              <p className="text-portfolio-muted mb-6">
                Whether you have a project idea, a question, or just want to connect, I’d love to hear from you.
              </p>
            </CardHeader>
            <CardContent className="flex flex-col space-y-8">
              
              {/* Contact Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                {contactInfo.map(({ icon: Icon, label, value, action }) => (
                  <div key={label} className="flex items-center gap-2">
                    <Icon className="w-5 h-5 text-portfolio-accent" />
                    {action ? (
                      <a
                        href={action}
                        target={action.startsWith("http") ? "_blank" : undefined}
                        rel={action.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-muted-foreground hover:text-portfolio-accent transition"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="text-muted-foreground">{value}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Services */}
              <div className="flex flex-wrap gap-3 justify-center">
                {services.map((service) => (
                  <Badge
                    key={service}
                    variant="outline"
                    className="text-sm px-3 py-2 rounded-full cursor-default hover:bg-portfolio-accent hover:text-white transition-colors"
                  >
                    {service}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
