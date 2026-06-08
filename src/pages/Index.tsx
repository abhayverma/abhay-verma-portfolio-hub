import { Navigation, Footer } from "@portfolio/shared-ui";
import Hero from "@/components/portfolio/Hero";
import Timeline from "@/components/portfolio/Timeline";
import Projects from "@/components/portfolio/Projects";
import MicroApps from "@/components/portfolio/MicroApps";
import Education from "@/components/portfolio/Education";
import Contact from "@/components/portfolio/Contact";
import Faq from "@/components/portfolio/Faq";
import FloatingQR from "@/components/ui/FloatingQR";
import { useEffect } from 'react';

const Index = () => {
  useEffect(() => {
    const handleExternalHashScroll = () => {
      const hash = globalThis.location.hash;
      if (!hash) return;

      const targetId = hash.replace('#', '');
      
      // 1. Fire the custom event your layout expects to open sections
      globalThis.dispatchEvent(
        new CustomEvent("collapsible-section", { 
          detail: { id: targetId, action: "expand" } 
        })
      );

      // 2. Short timeout ensures elements are fully painted before scrolling
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 350);
    };

    // Run immediately as the Index component hydration completes
    handleExternalHashScroll();

    // Also catch anytime the hash changes while staying on the same page
    globalThis.addEventListener('hashchange', handleExternalHashScroll);
    return () => globalThis.removeEventListener('hashchange', handleExternalHashScroll);
  }, []);
  return (
    <div className="min-h-screen relative">
      <Navigation />
      <main>
        <section id="home">
          <Hero />
        </section>

        <section id="timeline">
          <Timeline />
        </section>

        <section id="projects">
          <Projects />
        </section>

        <section id="microapps">
          <MicroApps />
        </section>

        <section id="education">
          <Education />
        </section>

        <section id="contact">
          <Contact />
        </section>

        <section id="faq-section" className="py-20 bg-muted/20">
          <div className="max-h-[500px] overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-portfolio-accent/60 scrollbar-track-transparent rounded-xl">
            <Faq />
          </div>
        </section>
      </main>
      <Footer />
      <FloatingQR />
    </div>
  );
};

export default Index;
