import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Linkedin, Mail, Phone, MapPin, Download, ExternalLink } from 'lucide-react';

const Hero = () => {
  const [currentTitle, setCurrentTitle] = useState(0);
  const titles = [
    "Full Stack Developer",
    "Solutions Architect", 
    "Tech Leader",
    "Innovation Driver"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: "Years Experience", value: "11+" },
    { label: "Projects Completed", value: "50+" },
    { label: "Technologies", value: "25+" },
    { label: "Domains", value: "5+" }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-portfolio-accent rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-portfolio-primary rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left animate-fade-in-up">
            <div className="mb-6">
              <Badge variant="outline" className="mb-4 bg-white/10 border-white/20 text-white backdrop-blur-sm">
                Available for New Opportunities
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-4">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-portfolio-accent to-green-400">Abhay</span>
              </h1>
              <div className="h-16 flex items-center justify-center lg:justify-start">
                <h2 className="text-2xl lg:text-3xl text-gray-200 font-light">
                  {titles[currentTitle]}
                </h2>
              </div>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                Experienced full-stack developer with 11+ years of expertise in Node.js, React, AWS, and scalable microservices architecture. 
                Specializing in FinTech, Life Sciences, and enterprise solutions.
              </p>
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap gap-4 mb-8 justify-center lg:justify-start">
              <div className="flex items-center gap-2 text-gray-300">
                <MapPin size={16} />
                <span>Dehradun, UK, India</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Phone size={16} />
                <span>+91 899.950.9155</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Mail size={16} />
                <span>aabhay.v@gmail.com</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
              <Button size="lg" className="bg-portfolio-accent hover:bg-portfolio-accent/90 text-white px-8">
                <Mail className="mr-2" size={20} />
                Get In Touch
              </Button>
              <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm">
                <Download className="mr-2" size={20} />
                Download Resume
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center lg:justify-start">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-portfolio-accent">
                <Github size={24} />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-portfolio-accent">
                <Linkedin size={24} />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-portfolio-accent">
                <ExternalLink size={24} />
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="animate-fade-in-right">
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 animate-glow">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-gray-300 text-sm">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;