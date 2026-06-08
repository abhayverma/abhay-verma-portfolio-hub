import { useState, useEffect } from 'react';
import { Button } from "./ui/button";
import { Menu, X, Sun, Moon, Download } from 'lucide-react';
import { useTheme } from "next-themes";

const SCROLL_TO_SECTION_DELAY = 300;

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'timeline', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'microapps', label: 'Micro-Tools' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
  { id: 'faq-section', label: 'FAQ' }
];

export interface NavigationProps {
  currentApp?: string; // E.g., "Finance" or "Resume"
  mainDomain?: string; // Pass "https://abhayverma.com" when using on subdomains
}

export const Navigation = ({ currentApp, mainDomain }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (mainDomain) return; // Disable scroll tracking on subdomains
      
      const sections = navItems.map(item => document.getElementById(item.id));
      const currentSection = sections.find(section => {
        if (section) {
          const rect = section.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) setActiveSection(currentSection.id);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mainDomain]);

  const handleNavItemClick = (item: { id: string; label: string }) => {
    setIsOpen(false);
    
    // If we are on a subdomain, route back to the main site
    if (mainDomain) {
      globalThis.location.href = `${mainDomain}/#${item.id}`;
      return;
    }

    // Otherwise, scroll locally
    globalThis.dispatchEvent(new CustomEvent("collapsible-section", { detail: { id: item.id, action: "expand" } }));
    const element = document.getElementById(item.id);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }, SCROLL_TO_SECTION_DELAY);
    }
  };

  const toggleDarkMode = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-background/95 backdrop-blur-md shadow-soft border-b border-border' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <button
            type="button"
            onClick={() => handleNavItemClick({ id: 'home', label: 'Home' })}
            className="font-bold text-xl cursor-pointer hover:text-portfolio-accent transition-colors bg-transparent border-none p-0 flex items-center"
          >
            Abhay <span className="text-portfolio-accent ml-1">Verma</span>
            {currentApp && (
              <span className="ml-3 rounded-md bg-portfolio-accent/10 px-2 py-0.5 text-xs font-medium text-portfolio-accent border border-portfolio-accent/20">
                {currentApp}
              </span>
            )}
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                onClick={() => handleNavItemClick(item)}
                className={`transition-colors ${activeSection === item.id && !mainDomain ? 'text-portfolio-accent bg-portfolio-accent/10' : 'hover:text-portfolio-accent'}`}
              >
                {item.label}
              </Button>
            ))}
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="hover:text-portfolio-accent">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            <Button variant="outline" size="sm" asChild className="border-portfolio-accent text-portfolio-accent hover:bg-portfolio-accent hover:text-white">
              <a href="/resources/Abhay Verma Resume 2026.pdf" download="Abhay Verma Resume 2026.pdf">
                <Download className="mr-2" size={16} /> Resume
              </a>
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="hover:text-portfolio-accent">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-background border-b border-border shadow-lg py-4 px-6 flex flex-col space-y-4">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className="justify-start w-full text-left"
              onClick={() => handleNavItemClick(item)}
            >
              {item.label}
            </Button>
          ))}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            <Button variant="outline" size="sm" asChild className="border-portfolio-accent text-portfolio-accent hover:bg-portfolio-accent hover:text-white w-2/3">
              <a href="/resources/Abhay Verma Resume 2026.pdf" download="Abhay Verma Resume 2026.pdf">
                <Download className="mr-2" size={16} /> Resume
              </a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};