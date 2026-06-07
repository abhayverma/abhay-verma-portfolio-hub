import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ExternalLink, 
  Filter, 
  Star, 
  Code2,
} from 'lucide-react';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const projects = [
    {
      id: 1,
      title: "Life Sciences Micro-Apps & AI Integration",
      company: "L7 Informatics",
      category: "Full Stack",
      description: "Contributed to the full-stack architecture of life-science micro-apps, implementing precise caching strategies to preserve reactive state. Spearheaded internal AI adoption by analyzing LLM behaviors to introduce advanced prompting methodologies for engineering workflows.",
      technologies: ["Python", "Vue3", "PostgreSQL", "TypeScript", "Celery", "Redis", "Flask", "Docker", "AG-Grid", "AI"],
      metrics: {
        performance: "30-50% API boost",
        efficiency: "Unlocked team velocity",
        innovation: "Strategic AI adoption"
      },
      highlights: [
        "Led global collaboration sprint execution and requirement gathering with US & Europe counterparts",
        "Implemented precise caching strategies and preserved reactive state in Vue3/AG-Grid",
        "Analyzed LLM behaviors to optimize engineering workflows and stakeholder communication"
      ],
      featured: true,
      domain: "Life Sciences"
    },
    {
      id: 2,
      title: "Serverless Cloud Data Pipelines",
      company: "Zero Dimension Tech Solutions",
      category: "Cloud Architecture",
      description: "Streamlined cloud-based structural data pipelines and CMS integrations for mid-sized brands, maintaining strict uptime utilizing AWS and GCP serverless architectures.",
      technologies: ["NodeJS", "Python", "ReactJS", "AWS Lambda", "SQS", "Docker", "CloudWatch Events", "GCP"],
      metrics: {
        uptime: "99% system reliability",
        scale: "Serverless pipelines",
        delivery: "CMS Integrations"
      },
      featured: true,
      domain: "Consulting Services"
    },
    {
      id: 3,
      title: "Supply Chain ERP Integrations",
      company: "ZONO TradeTech",
      category: "Backend Systems",
      description: "Architected AWS Lambda-driven data ingestion models for seamless third-party ERP/SAP enterprise data syncs. Implemented custom batch-queuing to track batches and eliminate manual re-ingestion loops.",
      technologies: ["NodeJS", "TypeScript", "AWS Lambda", "SQS", "NestJS", "MySQL", "Docker", "React Native"],
      metrics: {
        latency: "3000ms to 200ms reduction",
        reliability: "40% reliability scaled",
        integrity: "Zero data debt loops"
      },
      featured: true,
      domain: "Supply Chain"
    },
    {
      id: 4,
      title: "Enterprise Wealth Management Platform",
      company: "VALUEFY",
      category: "FinTech",
      description: "Delivered a highly performant wealth management system for international portfolios across Arab nations. Engineered custom loan-based investment tracking outside the core product scope.",
      technologies: ["NodeJS", "MySQL", "Loopback3", "Redis", "ElasticSearch", "Angular6", "Docker"],
      metrics: {
        speed: "500ms to 100ms response",
        scale: "International portfolios",
        delivery: "On-site HDFC integration"
      },
      featured: false,
      domain: "FinTech"
    },
    {
      id: 5,
      title: "International Trade Data Platform",
      company: "3IOLOGY",
      category: "ERP Systems",
      description: "Spearheaded a large-scale international trade data platform as the sole technical lead. Built custom scalable CMS and ERP systems from scratch managing the entire software lifecycle.",
      technologies: ["NodeJS", "MongoDB", "Angular6", "Laravel", "PHP", "AWS"],
      metrics: {
        efficiency: "35% operational boost",
        scale: "End-to-End lifecycle",
        leadership: "Sole technical lead"
      },
      featured: false,
      domain: "Data Analytics"
    },
    {
      id: 6,
      title: "Cross-Platform AI Chatbots",
      company: "Skarma",
      category: "AI/ML",
      description: "Directed technical operations and end-to-end development lifecycles for cross-platform AI chatbot architectures and custom CMS solutions.",
      technologies: ["AI Chatbots", "CMS Development", "Cross-platform Architecture"],
      metrics: {
        delivery: "End-to-end lifecycles",
        tech: "AI architecture",
        management: "Project operations"
      },
      featured: false,
      domain: "AI Solutions"
    },
    {
      id: 7,
      title: "Founding Engineering Operations",
      company: "Techfarm Global",
      category: "Engineering Leadership",
      description: "Co-founded and directed end-to-end software development operations, building and mentoring a team of emerging engineering talent to align technical execution with business goals.",
      technologies: ["System Architecture", "Team Building", "Tech Leadership", "Mentoring"],
      metrics: {
        growth: "Team mentorship",
        strategy: "Business alignment",
        execution: "End-to-end operations"
      },
      featured: false,
      domain: "Leadership"
    }
  ];

  const filters = ['All', 'Cloud Architecture', 'Backend Systems', 'Full Stack', 'AI/ML', 'Engineering Leadership', 'ERP Systems', 'Consulting Services', 'Life Sciences', 'Supply Chain', 'FinTech', 'Data Analytics', 'AI Solutions'];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Featured Projects</h2>
          <p className="text-xl text-portfolio-muted max-w-3xl mx-auto">
            Showcasing impactful solutions across diverse domains, from scalable cloud architectures to AI-powered applications.
          </p>
        </div>

        {/* Featured Projects Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <Star className="text-portfolio-accent" />
            Highlighted Achievements
          </h3>
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <Card 
                key={project.id} 
                className="border-l-4 border-l-portfolio-accent hover:shadow-strong transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                      <p className="text-portfolio-muted">{project.company}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className="bg-portfolio-accent text-white">{project.domain}</Badge>
                      <Badge variant="outline">{project.category}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-portfolio-muted mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    {Object.entries(project.metrics).map(([key, value], index) => (
                      <div key={index} className="text-center p-3 bg-portfolio-secondary/30 rounded-lg">
                        <div className="font-bold text-portfolio-accent text-sm">{value}</div>
                        <div className="text-xs text-portfolio-muted capitalize">{key}</div>
                      </div>
                    ))}
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-sm mb-3">Tech Stack:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge 
                          key={techIndex} 
                          variant="secondary" 
                          className="text-xs hover:bg-portfolio-accent hover:text-white transition-colors"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="flex-1">
                      <ExternalLink className="mr-2" size={16} />
                      View Details
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Code2 size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Filter className="text-portfolio-accent" />
            <h3 className="text-xl font-semibold">All Projects</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(filter)}
                className={activeFilter === filter ? "bg-portfolio-accent text-white" : ""}
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>

        {/* All Projects Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <Card 
              key={project.id} 
              className="hover:shadow-medium transition-all duration-300 group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg group-hover:text-portfolio-accent transition-colors">
                    {project.title}
                  </CardTitle>
                  {project.featured && (
                    <Star className="text-portfolio-accent" size={20} />
                  )}
                </div>
                <div className="flex gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">{project.category}</Badge>
                  <Badge className="text-xs bg-portfolio-accent/10 text-portfolio-accent">
                    {project.domain}
                  </Badge>
                </div>
                <p className="text-sm text-portfolio-muted">{project.company}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-portfolio-muted mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 4).map((tech, techIndex) => (
                      <Badge 
                        key={techIndex} 
                        variant="secondary" 
                        className="text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 4 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.technologies.length - 4}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <Button variant="ghost" size="sm" className="text-portfolio-accent p-0">
                    View Project →
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ExternalLink size={14} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Code2 size={14} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;