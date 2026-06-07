import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, ArrowUp, Mail, Phone, MapPin, Coffee, Calendar } from 'lucide-react';
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import qrImage from "@/assets/qr-coffee.png";

const Footer = () => {
  const [qrVisible, setQrVisible] = useState(false);

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="text-white relative">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-4">
                Abhay <span className="text-portfolio-accent">Verma</span>
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Engineering-first technical leader specializing in scalable, cloud-native architectures across ERP, CMS, Supply Chain, FinTech, and Life Sciences(ESP). 
                Driven by a commitment to bridging deep technical strategy with business growth, optimizing team velocity, and navigating cross-border collaborations. 
                Let's build something impactful together.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge className="bg-portfolio-accent text-white">Available for Projects</Badge>
                <Badge variant="outline" className="text-white border-white/30">Remote Friendly</Badge>
                <Badge variant="outline" className="text-white border-white/30">12+ Years Experience</Badge>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <Mail size={16} />
                <a href="mailto:aabhay.v@gmail.com" className="hover:text-portfolio-accent transition-colors">
                  aabhay.v@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone size={16} />
                <a href="tel:+919673305368" className="hover:text-portfolio-accent transition-colors">
                  +91 967.330.5368
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin size={16} />
                <span>India | Open to Remote & Relocation</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-portfolio-accent border border-white/20" asChild>
                <a href="https://github.com/abhayverma" target="_blank" rel="noopener noreferrer">
                  <FaGithub size={20} />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-portfolio-accent border border-white/20" asChild>
                <a href="https://linkedin.com/in/socialabhay" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin size={20} />
                </a>
              </Button>

              {/* Coffee Button triggers QR */}
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 hover:text-portfolio-accent border border-white/20"
                onClick={() => setQrVisible(!qrVisible)}
              >
                <Coffee size={20} />
              </Button>
            </div>

            {/* Floating QR Popup */}
            {qrVisible && (
              <div className="absolute bottom-20 left-6 bg-card/90 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-border text-center animate-fade-in-up z-50 w-56">
                <h4 className="text-sm font-semibold mb-2 text-foreground">☕ Buy me a coffee</h4>
                <img
                  src={qrImage}
                  alt="UPI QR - Buy me a coffee"
                  className="w-44 h-44 rounded-lg border border-border mx-auto"
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
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-300 hover:text-portfolio-accent transition-colors text-left"
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
                className="w-36 h-36 rounded-lg border border-border shadow-md"
              />
              <p className="text-sm text-muted-foreground text-left">
                ☕ Scan to buy me a coffee — every sip fuels creativity and code!
              </p>
              <p className="text-xs text-muted-foreground italic text-left">
                "Great ideas start with a simple conversation… maybe over coffee."
              </p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service} className="text-gray-300 text-sm">
                  {service}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Card className="mt-8 bg-portfolio-accent/10 border-portfolio-accent/20">
              <CardContent className="p-4 text-center">
                <Calendar className="w-8 h-8 mx-auto mb-3 text-portfolio-accent" />
                <h5 className="font-semibold mb-2">Ready to Start?</h5>
                <p className="text-sm text-gray-300 mb-4">
                  Let's discuss your project and bring your ideas to life.
                </p>
                <Button 
                  size="sm" 
                  onClick={() => scrollToSection('contact')}
                  className="w-full bg-portfolio-accent hover:bg-portfolio-accent/90"
                >
                  Get In Touch
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-300 text-sm">
                © 2024 Abhay Verma. Built with{' '}
                <Heart className="inline w-4 h-4 text-red-500 mx-1" />
                using React, TypeScript & Tailwind CSS.
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-gray-300 text-sm">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>{' '}
                Available for new opportunities
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={scrollToTop}
                className="text-white hover:bg-white/10 hover:text-portfolio-accent border border-white/20"
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

export default Footer;
