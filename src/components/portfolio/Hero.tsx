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
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-portfolio-secondary/20">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20 dark:opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-portfolio-accent rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-portfolio-primary rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-portfolio-accent/30 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Content - Takes up 7 columns */}
            <div className="lg:col-span-7 text-center lg:text-left animate-fade-in-up">
              <div className="space-y-6">
                <Badge variant="outline" className="mb-4 bg-portfolio-accent/10 border-portfolio-accent/20 text-portfolio-accent dark:text-portfolio-accent backdrop-blur-sm">
                  Available for New Opportunities
                </Badge>
                
                {/* Split title for better typography */}
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                    Hi, I'm{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-portfolio-accent via-portfolio-accent to-green-400">
                      Abhay
                    </span>
                  </h1>
                  
                  <div className="h-16 flex items-center justify-center lg:justify-start">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl text-muted-foreground font-light">
                      {titles[currentTitle]}
                    </h2>
                  </div>
                </div>
                
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Experienced full-stack developer with 11+ years of expertise in Node.js, React, AWS, and scalable microservices architecture. 
                  Specializing in FinTech, Life Sciences, and enterprise solutions.
                </p>

                {/* Contact Info */}
                <div className="flex flex-wrap gap-6 justify-center lg:justify-start text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin size={16} className="text-portfolio-accent" />
                    <span>Dehradun, UK, India</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone size={16} className="text-portfolio-accent" />
                    <span>+91 899.950.9155</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail size={16} className="text-portfolio-accent" />
                    <span>aabhay.v@gmail.com</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
                  <Button size="lg" className="bg-portfolio-accent hover:bg-portfolio-accent/90 text-white px-8 shadow-lg">
                    <Mail className="mr-2" size={20} />
                    Get In Touch
                  </Button>
                  <Button variant="outline" size="lg" className="border-portfolio-accent text-portfolio-accent hover:bg-portfolio-accent hover:text-white">
                    <Download className="mr-2" size={20} />
                    Download Resume
                  </Button>
                </div>

                {/* Social Links */}
                <div className="flex gap-3 justify-center lg:justify-start pt-4">
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-portfolio-accent hover:bg-portfolio-accent/10 transition-all duration-300">
                    <Github size={24} />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-portfolio-accent hover:bg-portfolio-accent/10 transition-all duration-300">
                    <Linkedin size={24} />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-portfolio-accent hover:bg-portfolio-accent/10 transition-all duration-300">
                    <ExternalLink size={24} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Stats Cards - Takes up 5 columns */}
            <div className="lg:col-span-5 animate-fade-in-right">
              <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-md mx-auto lg:max-w-none">
                {stats.map((stat, index) => (
                  <Card key={index} className="bg-card/50 border-border/50 backdrop-blur-sm hover:bg-card/80 hover:shadow-glow transition-all duration-300 group">
                    <CardContent className="p-4 md:p-6 text-center">
                      <div className="text-2xl md:text-3xl font-bold text-foreground mb-2 group-hover:text-portfolio-accent transition-colors">
                        {stat.value}
                      </div>
                      <div className="text-muted-foreground text-xs md:text-sm font-medium">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-portfolio-accent rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;