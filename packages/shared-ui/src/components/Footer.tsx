import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowUp, Mail, Phone, MapPin, Coffee, Calendar } from 'lucide-react';
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import qrImage from "../assets/qr-coffee.png";

export interface FooterProps {
  mainDomain?: string;
}

export const Footer = ({ mainDomain }: FooterProps) => {
  const [qrVisible, setQrVisible] = useState(false);
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { label: 'Experience', id: 'timeline' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Education', id: 'education' },
    { label: 'Contact', id: 'contact' }
  ];

  const services = [
    'Full Stack Development',
    'Cloud Architecture',
    'API Development',
    'Performance Optimization',
    'Technical Consulting'
  ];

  const handleLinkClick = (id: string) => {
    if (mainDomain) {
      window.location.href = `${mainDomain}/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="text-foreground relative bg-background border-t border-border transition-colors duration-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-4">
                Abhay <span className="text-portfolio-accent">Verma</span>
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6 transition-colors">
                Engineering-first technical leader specializing in scalable, cloud-native architectures across ERP, CMS, Supply Chain, FinTech, and Life Sciences(ESP). 
                Driven by a commitment to bridging deep technical strategy with business growth, optimizing team velocity, and navigating cross-border collaborations. 
                Let's build something impactful together.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge className="bg-portfolio-accent text-white hover:bg-portfolio-accent/90">Available for Projects</Badge>
                <Badge variant="outline" className="text-foreground border-border">Remote Friendly</Badge>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground transition-colors">
                <Mail size={16} />
                <a href="mailto:aabhay.v@gmail.com" className="hover:text-portfolio-accent transition-colors">
                  aabhay.v@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground transition-colors">
                <MapPin size={16} />
                <span>India | Open to Remote & Relocation</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              <Button variant="ghost" size="icon" className="text-foreground hover:bg-accent hover:text-portfolio-accent border border-border transition-colors" asChild>
                <a href="https://github.com/abhayverma" target="_blank" rel="noopener noreferrer">
                  <FaGithub size={20} />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="text-foreground hover:bg-accent hover:text-portfolio-accent border border-border transition-colors" asChild>
                <a href="https://linkedin.com/in/socialabhay" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin size={20} />
                </a>
              </Button>

              {/* Coffee Button triggers QR */}
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:bg-accent hover:text-portfolio-accent border border-border transition-colors"
                onClick={() => setQrVisible(!qrVisible)}
              >
                <Coffee size={20} />
              </Button>
            </div>

            {/* Floating QR Popup */}
            {qrVisible && (
              <div className="absolute bottom-20 left-6 bg-card/95 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-border text-center animate-fade-in-up z-50 w-56">
                <h4 className="text-sm font-semibold mb-2 text-foreground">☕ Buy me a coffee</h4>
                <img
                  src={qrImage}
                  alt="UPI QR - Buy me a coffee"
                  className="w-44 h-44 rounded-lg border border-border mx-auto bg-white p-1"
                />
                <p className="text-xs text-muted-foreground mt-2">Scan using any UPI app</p>
                <a
                  href="upi://pay?pa=9673305368@upi&pn=Abhay%20Verma&cu=INR&tn=Support%20Abhay"
                  className="mt-2 inline-block px-4 py-2 bg-portfolio-accent text-white rounded hover:bg-portfolio-accent/90"
                >
                  Pay via UPI
                </a>
              </div>
            )}
          </div>

          {/* Quick Links + Coffee QR */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-foreground">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleLinkClick(link.id)}
                    className="text-muted-foreground hover:text-portfolio-accent transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Coffee QR Code aligned to left */}
            <div className="flex flex-col items-start mt-8 space-y-2">
              <img
                src={qrImage}
                alt="Buy me a coffee"
                className="w-36 h-36 rounded-lg border border-border shadow-md bg-white p-1"
              />
              <p className="text-sm text-muted-foreground text-left transition-colors">
                ☕ Scan to buy me a coffee — every sip fuels creativity and code!
              </p>
              <p className="text-xs text-muted-foreground italic text-left transition-colors">
                "Great ideas start with a simple conversation… maybe over coffee."
              </p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-foreground">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service} className="text-muted-foreground text-sm transition-colors">
                  {service}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Card className="mt-8 bg-portfolio-accent/10 border-portfolio-accent/20">
              <CardContent className="p-4 text-center">
                <Calendar className="w-8 h-8 mx-auto mb-3 text-portfolio-accent" />
                <h5 className="font-semibold mb-2 text-foreground">Ready to Start?</h5>
                <p className="text-sm text-muted-foreground mb-4">
                  Let's discuss your project and bring your ideas to life.
                </p>
                <Button 
                  size="sm" 
                  onClick={() => handleLinkClick('contact')}
                  className="w-full bg-portfolio-accent hover:bg-portfolio-accent/90 text-white"
                >
                  Get In Touch
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border transition-colors">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-muted-foreground text-sm transition-colors">
                © {currentYear} Abhay Verma. Engineered with React, TypeScript & Tailwind CSS.
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-muted-foreground text-sm flex items-center transition-colors">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Available for new opportunities
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={scrollToTop}
                className="text-foreground hover:bg-accent hover:text-portfolio-accent border border-border transition-colors"
              >
                <ArrowUp size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};