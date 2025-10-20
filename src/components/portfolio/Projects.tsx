import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Filter, Star, TrendingUp, Users, DollarSign } from 'lucide-react';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const projects = [
    {
      id: 1,
      title: "Core Platform Development",
      company: "L7 Informatics",
      category: "ERP Systems",
      description: "Developed and maintained full-stack features for enterprise life sciences software using Flask, Vue3, and PostgreSQL in a Scrum environment. Optimized API payloads by 30-50% and implemented critical bug fixes, enhancing overall system performance and reliability. Contributed to core platform modules including CLI integration, data pipelines, scheduling, and licensing.",
      technologies: ["Python", "Vue 3", "PostgreSQL", "TypeScript", "Celery", "Redis", "Jira", "Bitbucket", "Flask", "Docker", "AG-Grid", "Vitest", "Pytest", "Figma", "AI", "ESP", "MES", "LIMS", "ELN", "SDMS", "CDMS", "CTMS", "eTMF", "eConsent", "eSource", "Cypress", "Istanbul", "heatmaps"],
      metrics: {
        performance: "60% faster rendering",
        reliability: "Core modules optimized",
        productivity: "40% improved data access"
      },
      highlights: [
        "Built and optimized core modules across LIMS, MES, ELN, and signature flows",
        "Implemented resource sorting, filtering, and asset management for containers, equipment, and kits",
        "Improved instruction rendering speed by 60% through inline style refactoring",
        "Developed Cypress + Istanbul coverage heatmaps for early issue detection",
        "Contributed to CLI integration, data pipelines, scheduling, and licensing modules"
      ],
      featured: true,
      domain: "Life Sciences"
    },
    {
      id: 2,
      title: "Solutions Architect (Contract)",
      company: "Zero Dimension Tech Solutions",
      category: "Cloud Architecture",
      description: "Architected scalable AWS solutions with secure payment gateway integrations using Stripe. Implemented high-performance microservices that improved transaction processing by 300% and reduced system downtime by 95%.",
      technologies: ["AWS", "Node.js", "React", "Stripe", "Docker", "CI/CD", "Lambda"],
      metrics: {
        performance: "300% faster processing",
        uptime: "99.9% system reliability", 
        conversion: "25% increase in conversions"
      },
      featured: true,
      domain: "Consulting Services"
    },
    {
      id: 3,
      title: "Microservices & Queue Architecture",
      company: "ZONO TradeTech",
      category: "Backend Systems",
      description: "Developed microservices with batch queuing architecture, reducing API response time from 3000ms to 200ms. Built robust scheduler engines for digital payments and invoice tracking systems.",
      technologies: ["Node.js", "Microservices", "SQS", "TypeScript", "NestJS", "PostgreSQL"],
      metrics: {
        performance: "93% response time improvement",
        reliability: "40% increase in system reliability",
        scalability: "10x concurrent user capacity"
      },
      featured: true,
      domain: "Supply Chain"
    },
    {
      id: 4,
      title: "API Performance Optimization",
      company: "VALUEFY PVT LTD",
      category: "Performance",
      description: "Optimized legacy APIs reducing average response time from 500ms to 100ms. Led cross-functional teams and created comprehensive technical documentation for stakeholders.",
      technologies: ["Node.js", "Loopback", "MySQL", "Redis", "ElasticSearch", "Angular"],
      metrics: {
        performance: "80% response time reduction",
        efficiency: "35% operational improvement",
        satisfaction: "90% client satisfaction"
      },
      featured: false,
      domain: "FinTech"
    },
    {
      id: 5,
      title: "MEAN Stack Data Platform",
      company: "3IOLOGY SOLUTIONS LLP",
      category: "Full Stack",
      description: "Built mobile-first data provider application using MEAN stack, improving data access speed by 50%. Developed custom ERP systems with seamless third-party integrations.",
      technologies: ["MongoDB", "Express", "Angular", "Node.js", "GraphQL", "AWS"],
      metrics: {
        speed: "50% faster data access",
        efficiency: "35% operational improvement",
        mobile: "100% mobile responsiveness"
      },
      featured: false,
      domain: "Data Analytics"
    },
    {
      id: 6,
      title: "AI Chatbot & E-commerce Platform",
      company: "SKARMA PVT LTD",
      category: "AI/ML",
      description: "Developed intelligent chatbot using Facebook APIs and Dialogflow for sports engagement. Created e-commerce portals with API integrations, boosting online sales by 45%.",
      technologies: ["Dialogflow", "Facebook API", "Laravel", "WordPress", "PHP", "MySQL"],
      metrics: {
        engagement: "60% user engagement increase",
        sales: "45% online sales boost",
        automation: "80% query automation"
      },
      featured: false,
      domain: "E-commerce"
    },
    {
      id: 7,
      title: "Web Scraping & Price Comparison",
      company: "TECHFARM GLOBAL",
      category: "Data Engineering",
      description: "Built intelligent web scraper for US-based price comparison platform, increasing data accuracy by 70%. Developed custom CMS/CRM solutions for client management.",
      technologies: ["Python", "Casper.js", "PhantomJS", "Laravel", "Bootstrap", "AWS"],
      metrics: {
        accuracy: "70% data accuracy improvement",
        coverage: "10M+ products tracked",
        automation: "95% process automation"
      },
      featured: false,
      domain: "Data Engineering"
    }
  ];

  const filters = ['All', 'Cloud Architecture', 'Backend Systems', 'Full Stack', 'AI/ML', 'Performance', 'Data Engineering', 'ERP Systems', 'Consulting Services', 'Life Sciences', 'Supply Chain', 'FinTech', 'Data Analytics', 'E-commerce'];

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
                      <Github size={16} />
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
                      <Github size={14} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Project Statistics */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="text-center p-6">
            <TrendingUp className="mx-auto text-portfolio-accent mb-2" size={32} />
            <div className="text-2xl font-bold">50+</div>
            <div className="text-sm text-portfolio-muted">Projects Delivered</div>
          </Card>
          <Card className="text-center p-6">
            <Users className="mx-auto text-portfolio-accent mb-2" size={32} />
            <div className="text-2xl font-bold">25+</div>
            <div className="text-sm text-portfolio-muted">Team Members Led</div>
          </Card>
          <Card className="text-center p-6">
            <DollarSign className="mx-auto text-portfolio-accent mb-2" size={32} />
            <div className="text-2xl font-bold">$2M+</div>
            <div className="text-sm text-portfolio-muted">Value Generated</div>
          </Card>
          <Card className="text-center p-6">
            <Star className="mx-auto text-portfolio-accent mb-2" size={32} />
            <div className="text-2xl font-bold">98%</div>
            <div className="text-sm text-portfolio-muted">Client Satisfaction</div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Projects;