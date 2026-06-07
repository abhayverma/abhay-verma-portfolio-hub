import { Card, CardContent, CardDescription, CardHeader, CardTitle, Badge, Button } from "@portfolio/shared-ui";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Calculator, FileText, Globe, BookOpen, Image as ImageIcon, ExternalLink, Wrench } from "lucide-react";

const microAppsData = [
  {
    id: "finance",
    title: "Wealth & Tax Simulator",
    description: "Advanced financial projection engine calculating real-world inflation erosion and LTCG tax drag.",
    icon: <Calculator className="w-10 h-10 text-portfolio-accent" />,
    url: "https://finance.abhayverma.com",
    status: "Building Now",
  },
  {
    id: "resume",
    title: "Page-Budget Resume Engine",
    description: "Markdown-based document parser enforcing strict single-page print bounds for ATS-compliant resumes.",
    icon: <FileText className="w-10 h-10 text-slate-400" />,
    url: "https://resume.abhayverma.com",
    status: "Planned",
  },
  {
    id: "visa",
    title: "Global Tech Visa Inspector",
    description: "Client-side threshold calculator mapping current immigration salary limits for major EU/UK tech hubs.",
    icon: <Globe className="w-10 h-10 text-slate-400" />,
    url: "https://visa.abhayverma.com",
    status: "Planned",
  },
  {
    id: "wisdom",
    title: "Semantic Wisdom Explorer",
    description: "NLP matrix matching engine cross-referencing modern dilemmas with classical philosophical texts.",
    icon: <BookOpen className="w-10 h-10 text-slate-400" />,
    url: "https://wisdom.abhayverma.com",
    status: "Planned",
  },
  {
    id: "favicon",
    title: "Next-Gen Favicon Studio",
    description: "HTML5 canvas workstation for generating modern PWA manifests and live browser-tab UI simulations.",
    icon: <ImageIcon className="w-10 h-10 text-slate-400" />,
    url: "https://favicon.abhayverma.com",
    status: "Planned",
  }
];

const MicroApps = () => {
  return (
    <section id="microapps" className="py-24 relative border-t border-border bg-background transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-12 md:flex md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-portfolio-accent/10 text-portfolio-accent text-sm font-medium mb-4 border border-portfolio-accent/20">
              <Wrench size={16} /> Client-Side Engineering
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 transition-colors">
              Standalone Micro-Tools
            </h2>
            <p className="text-muted-foreground text-lg transition-colors">
              A collection of isolated, zero-latency utility applications running entirely in the browser. Built as an interconnected monorepo and deployed across subdomains.
            </p>
          </div>
        </div>

        <div className="relative px-12">
          <Carousel opts={{ align: "start", loop: false }} className="w-full">
            <CarouselContent className="-ml-4">
              {microAppsData.map((app) => (
                <CarouselItem key={app.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <Card className="h-full bg-card border-border hover:border-portfolio-accent/50 transition-all duration-300 flex flex-col relative overflow-hidden group">
                      
                      <div className="absolute top-4 right-4 z-10">
                        <Badge variant={app.status === "Building Now" ? "default" : "secondary"} 
                               className={app.status === "Building Now" ? "bg-portfolio-accent text-white hover:bg-portfolio-accent/90" : "bg-secondary text-secondary-foreground border-transparent"}>
                          {app.status}
                        </Badge>
                      </div>

                      <CardHeader>
                        <div className="mb-4 p-3 bg-muted rounded-xl inline-block w-fit border border-border group-hover:scale-110 transition-transform duration-300">
                          {app.icon}
                        </div>
                        <CardTitle className="text-xl text-foreground">{app.title}</CardTitle>
                      </CardHeader>
                      
                      <CardContent className="flex-grow flex flex-col justify-between">
                        <CardDescription className="text-muted-foreground text-sm mb-6 leading-relaxed">
                          {app.description}
                        </CardDescription>
                        
                        <Button 
                          asChild 
                          variant="outline" 
                          className="w-full border-border text-foreground hover:bg-portfolio-accent hover:text-white hover:border-portfolio-accent transition-all"
                          disabled={app.status !== "Building Now"}
                        >
                          <a href={app.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                            Launch App <ExternalLink size={16} />
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 bg-background border-border text-muted-foreground hover:text-white hover:bg-portfolio-accent transition-colors" />
            <CarouselNext className="hidden md:flex -right-12 bg-background border-border text-muted-foreground hover:text-white hover:bg-portfolio-accent transition-colors" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default MicroApps;