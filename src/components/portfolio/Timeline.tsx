import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Briefcase } from 'lucide-react';

const Timeline = () => {
  const experiences = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      company: "L7 Informatics",
      period: "2024 – Current",
      location: "Bangalore, Karnataka, India",
      category: "ERP Systems",
      description: "Developed and maintained full-stack features for enterprise life sciences software using Flask, Vue3, and PostgreSQL in a Scrum environment. Optimized API payloads by 30-50% and implemented critical bug fixes, enhancing overall system performance and reliability. Contributed to core platform modules including CLI integration, data pipelines, scheduling, and licensing.",
      technologies: ["Python", "Vue 3", "PostgreSQL", "TypeScript", "Celery", "Redis", "Jira", "Bitbucket", "Flask", "Docker", "AG-Grid", "Vitest", "Pytest", "Figma", "AI"],
      isActive: true,
    },
    {
      id: 2,
      title: "Solutions Architect (Contract)",
      company: "Zero Dimension Tech Solutions",
      period: "2023 – 2024",
      location: "Bangalore, KA, India",
      description: "Architect scalable AWS solutions, integrating secure payment gateways like Stripe ensuring seamless transactions. Led development of high-performance Laravel and React apps, boosting user experience and conversion rates by 25%. Streamlined deployment processes with CI/CD pipelines, reducing deployment time by 30% and minimizing downtime.",
      technologies: ["Node.js", "ReactJS", "MySQL", "TypeScript", "Laravel", "Git", "Docker", "Express", "Winston", "Yup", "Parser", "JWT", "SNS", "Moment", "EJS", "Redux", "JSX", "ESLint", "Tsconfig", "CLI", "ClickUp", "CloudWatch Events", "AWS"],
      isActive: true
    },
    {
      id: 3,
      title: "Senior Software Engineer",
      company: "ZONO",
      period: "2020 – 2023",
      location: "Remote",
      description: "Developed microservices & implemented batch queuing architecture, reducing response time from 3000ms to 200ms. Built scheduler engines and API contracts for digital payments & invoice tracking, increasing system reliability by 40%.",
      technologies: ["Node.js", "MySQL", "TypeScript", "Serverless (Lambda)", "Queuing (SQS)", "Loopback4", "TypeORM", "Git", "Docker", "NestJS", "PubNub", "Express", "Winston", "Yup", "Parser", "JWT", "SNS", "Moment", "EJS", "React", "React Native", "Redux", "JSX", "CLI", "CloudWatch Events", "JS", "AWS"],
      isActive: false
    },
    {
      id: 4,
      title: "Senior Software Developer Engineer",
      company: "VALUEFY",
      period: "2019 – 2020",
      location: "Mumbai, India",
      description: "Optimized existing APIs, reducing average response time from 500ms to 100ms. Led client meetings and created requirement documentation for stakeholders, ensuring project alignment.",
      technologies: ["Node.js", "MySQL", "Loopback3", "Git", "Jenkins", "Redis", "Oracle", "MS SQL", "PostgreSQL", "Angular6", "AD", "ElasticSearch", "Docker", "CLI"],
      isActive: false
    },
    {
      id: 5,
      title: "Full Stack Developer",
      company: "3IOLOGY",
      period: "2018 – 2019",
      location: "Mumbai, India",
      description: "Developed a mobile-first application for a data provider using MEAN stack, improving data access speed by 50%. Created custom ERP systems in Laravel with third-party integrations, enhancing operational efficiency by 35%.",
      technologies: ["Node.js", "Express", "MongoDB", "Git", "Angular6", "CSS", "HTML", "JS", "PHP", "MySQL", "Laravel", "Bitbucket", "GraphQL", "Bootstrap", "AWS"],
      isActive: false
    },
    {
      id: 6,
      title: "Full Stack Developer & Project Manager",
      company: "SKARMA",
      period: "2016 – 2018",
      location: "Mumbai, India",
      description: "Developed chatbot for a football team using Facebook APIs, Dialogflow, Laravel, increasing user engagement by 60%. Designed e-commerce portals with API integrations using WordPress, enhancing online sales by 45%.",
      technologies: ["PHP", "MySQL", "Laravel", "WordPress", "API.ai (Dialogflow)", "Watson", "Facebook SDK", "Google SDK", "Git", "Photoshop", "AWS"],
      isActive: false
    },
    {
      id: 7,
      title: "Co-founder and CTO",
      company: "TECHFARM GLOBAL",
      period: "2013 – 2016",
      location: "Chandrapur, India",
      description: "Co-founded and built a company, handling talent acquisition, training, and product development. Designed web scraper, for a US-based price comparison site, increasing data accuracy by 70%.",
      technologies: ["Git", "Trello", "CLI", "CSS", "HTML", "JS", "PHP", "MySQL", "Laravel", "Bitbucket", "AWS", "Casper.js", "PhantomJS", "Bootstrap", "Ionic", "Android"],
      isActive: false
    }
  ];

  return (
    <section id="timeline" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">Career Timeline</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            11+ years of experience building scalable solutions across diverse domains including FinTech, Life Sciences, HR, and Supply Chain.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-portfolio-accent to-portfolio-accent/30"></div>

          <div className="space-y-8 md:space-y-12">
            {experiences.map((exp, index) => (
              <div 
                key={exp.id} 
                className={`relative animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Timeline Dot */}
                <div className={`absolute left-2 md:left-6 w-4 h-4 rounded-full border-4 z-10 ${
                  exp.isActive 
                    ? 'bg-portfolio-accent border-portfolio-accent animate-glow' 
                    : 'bg-background border-portfolio-accent/60'
                }`}></div>

                {/* Content Card */}
                <div className="ml-10 md:ml-20">
                  <Card className="hover:shadow-medium transition-all duration-300 border-l-4 border-l-portfolio-accent bg-card/50 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                      <div className="space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <CardTitle className="text-lg md:text-xl text-foreground">{exp.title}</CardTitle>
                          {exp.isActive && (
                            <Badge className="bg-portfolio-accent text-white w-fit animate-pulse">
                              Current Position
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Briefcase size={14} className="text-portfolio-accent" />
                            <span className="font-semibold text-foreground">{exp.company}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar size={14} className="text-portfolio-accent" />
                            <span>{exp.period}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin size={14} className="text-portfolio-accent" />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-muted-foreground mb-6 leading-relaxed text-sm md:text-base">
                        {exp.description}
                      </p>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm text-foreground">Technologies Used:</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.technologies.map((tech, techIndex) => (
                            <Badge 
                              key={techIndex} 
                              variant="secondary" 
                              className="text-xs hover:bg-portfolio-accent hover:text-white transition-colors cursor-default"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;