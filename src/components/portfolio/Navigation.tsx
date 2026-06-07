import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon, Download } from 'lucide-react';
import { useTheme } from "next-themes";
import { downloadResume } from '@/lib/utils';

const SCROLL_TO_SECTION_DELAY = 300; // ms

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  // Navigation items

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'timeline', label: 'Experience' },
    // { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
    { id: 'faq-section', label: 'FAQ' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navItems.map(item => document.getElementById(item.id));
      const currentSection = sections.find(section => {
        if (section) {
          const rect = section.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const expandSection = (sectionId: string) => {
  // Fire a global event so CollapsibleSection knows it should expand
  globalThis.dispatchEvent(
    new CustomEvent("collapsible-section", { 
      detail: { id: sectionId, action: "expand" } 
    })
  );
};

const scrollToSection = (sectionId: string) => {
  expandSection(sectionId);

  const element = document.getElementById(sectionId);
  if (element) {
    // Small delay so expansion finishes before scroll
    setTimeout(() => {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, SCROLL_TO_SECTION_DELAY);
  }

  setIsOpen(false); // close mobile menu if open
};

  const toggleDarkMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleNavItemClick = (item: typeof navItems[0]) => {
    setIsOpen(false);
    scrollToSection(item.id);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-background/95 backdrop-blur-md shadow-soft border-b border-border' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            type="button"
            onClick={() => scrollToSection('home')}
            className="font-bold text-xl cursor-pointer hover:text-portfolio-accent transition-colors bg-transparent border-none p-0"
            tabIndex={0}
            aria-label="Go to Home"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                scrollToSection('home');
              }
            }}
          >
            Abhay <span className="text-portfolio-accent">Verma</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                onClick={() => handleNavItemClick(item)}
                className={`transition-colors ${
                  activeSection === item.id 
                    ? 'text-portfolio-accent bg-portfolio-accent/10' 
                    : 'hover:text-portfolio-accent'
                }`}
              >
                {item.label}
              </Button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="hover:text-portfolio-accent"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="border-portfolio-accent text-portfolio-accent hover:bg-portfolio-accent hover:text-white"
              onClick={downloadResume}
            >
              <Download className="mr-2" size={16} />
              Resume
            </Button>
            <Button 
              size="sm"
              onClick={() => scrollToSection('contact')}
              className="bg-portfolio-accent hover:bg-portfolio-accent/90 text-white"
            >
              Hire Me
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="hover:text-portfolio-accent"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="hover:text-portfolio-accent"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border animate-fade-in-down">
            <div className="container mx-auto px-6 py-4">
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    onClick={() => handleNavItemClick(item)}
                    className={`justify-start transition-colors ${
                      activeSection === item.id 
                        ? 'text-portfolio-accent bg-portfolio-accent/10' 
                        : 'hover:text-portfolio-accent'
                    }`}
                  >
                    {item.label}
                  </Button>
                ))}
                <div className="border-t border-border pt-4 mt-4 space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full border-portfolio-accent text-portfolio-accent hover:bg-portfolio-accent hover:text-white"
                    onClick={downloadResume}
                  >
                    <Download className="mr-2" size={16} />
                    Download Resume
                  </Button>
                  <Button 
                    onClick={() => scrollToSection('contact')}
                    className="w-full bg-portfolio-accent hover:bg-portfolio-accent/90 text-white"
                  >
                    Hire Me
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;