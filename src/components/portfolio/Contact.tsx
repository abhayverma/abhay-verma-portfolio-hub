import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Linkedin, Github, Calendar, Send, MessageCircle, Coffee } from 'lucide-react';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    project: '',
    budget: '',
    timeline: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Message Sent Successfully!",
      description: "Thank you for reaching out. I'll get back to you within 24 hours.",
    });
    
    setFormData({
      name: '',
      email: '',
      company: '',
      project: '',
      budget: '',
      timeline: '',
      message: ''
    });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "aabhay.v@gmail.com",
      action: "mailto:aabhay.v@gmail.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 899.950.9155",
      action: "tel:+918999509155"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Dehradun, UK, India",
      action: null
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "socialabhay",
      action: "https://linkedin.com/in/socialabhay"
    }
  ];

  const services = [
    "Full Stack Development",
    "Cloud Architecture (AWS)",
    "Microservices Design",
    "API Development & Integration",
    "Performance Optimization",
    "Team Leadership & Mentoring",
    "Technical Consulting",
    "Code Review & Auditing"
  ];

  return (
    <section className="py-20 bg-portfolio-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Let's Work Together</h2>
          <p className="text-xl text-portfolio-muted max-w-3xl mx-auto">
            Ready to bring your ideas to life? I'm available for freelance projects, consulting, 
            and full-time opportunities. Let's discuss how we can create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="animate-slide-in-left">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <MessageCircle className="text-portfolio-accent" />
                  Start a Conversation
                </CardTitle>
                <p className="text-portfolio-muted">
                  Tell me about your project and let's explore how I can help you achieve your goals.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name *</label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address *</label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Company/Organization</label>
                      <Input
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Company Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Project Type</label>
                      <select
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

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Budget Range</label>
                      <select
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
                      <label className="block text-sm font-medium mb-2">Timeline</label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className="w-full p-2 border border-input rounded-md bg-background"
                      >
                        <option value="">Select Timeline</option>
                        <option value="asap">ASAP</option>
                        <option value="1-month">1-3 Months</option>
                        <option value="3-months">3-6 Months</option>
                        <option value="6-months">6+ Months</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Project Details *</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project, goals, technical requirements, and any specific challenges you're facing..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={isSubmitting}
                    className="w-full bg-portfolio-accent hover:bg-portfolio-accent/90 text-white"
                  >
                    {isSubmitting ? (
                      "Sending Message..."
                    ) : (
                      <>
                        <Send className="mr-2" size={20} />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info & Services */}
          <div className="space-y-8 animate-slide-in-right">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Phone className="text-portfolio-accent" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-portfolio-secondary/30 transition-colors">
                    <div className="p-2 bg-portfolio-accent/10 rounded-lg">
                      <info.icon className="w-5 h-5 text-portfolio-accent" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{info.label}</div>
                      {info.action ? (
                        <a 
                          href={info.action} 
                          className="text-portfolio-muted hover:text-portfolio-accent transition-colors text-sm"
                          target={info.action.startsWith('http') ? '_blank' : undefined}
                          rel={info.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <div className="text-portfolio-muted text-sm">{info.value}</div>
                      )}
                    </div>
                  </div>
                ))}
                
                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-4 h-4 text-portfolio-accent" />
                    <span className="font-medium text-sm">Schedule a Call</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Coffee className="mr-2" size={16} />
                    Book 30-min Discovery Call
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Services */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Coffee className="text-portfolio-accent" />
                  Services I Offer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {services.map((service, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="w-full justify-start p-3 text-sm hover:bg-portfolio-accent hover:text-white transition-colors"
                    >
                      {service}
                    </Badge>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-gradient-accent rounded-lg text-white">
                  <h4 className="font-semibold mb-2">Quick Response Guarantee</h4>
                  <p className="text-sm opacity-90">
                    I typically respond to all inquiries within 24 hours. 
                    For urgent projects, feel free to call directly.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;