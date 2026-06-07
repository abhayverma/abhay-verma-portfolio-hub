import Navigation from "@/components/portfolio/Navigation";
import Hero from "@/components/portfolio/Hero";
import Timeline from "@/components/portfolio/Timeline";
import Projects from "@/components/portfolio/Projects";
import Education from "@/components/portfolio/Education";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";
import Faq from "@/components/portfolio/Faq";
import FloatingQR from "@/components/ui/FloatingQR";

const Index = () => {
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
