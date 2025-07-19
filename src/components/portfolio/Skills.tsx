import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Code, Database, Cloud, Layers, Globe, Smartphone } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      icon: Code,
      title: "Programming Languages",
      skills: [
        { name: "JavaScript/TypeScript", level: 95 },
        { name: "PHP", level: 95 },
        { name: "Python", level: 75 },
        { name: "C Programming", level: 97 },
        { name: "HTML5/CSS3", level: 90 }
      ]
    },
    {
      icon: Globe,
      title: "Frontend Technologies",
      skills: [
        { name: "React.js", level: 85 },
        { name: "Angular", level: 75 },
        { name: "Vue.js", level: 70 },
        { name: "Bootstrap", level: 99 },
        { name: "Tailwind CSS", level: 90 }
      ]
    },
    {
      icon: Database,
      title: "Backend & Databases",
      skills: [
        { name: "Node.js", level: 95 },
        { name: "Laravel", level: 85 },
        { name: "MySQL", level: 90 },
        { name: "MongoDB", level: 80 },
        { name: "PostgreSQL", level: 75 }
      ]
    },
    {
      icon: Cloud,
      title: "Cloud & DevOps",
      skills: [
        { name: "AWS Services", level: 85 },
        { name: "Docker", level: 80 },
        { name: "CI/CD Pipelines", level: 75 },
        { name: "Git/Version Control", level: 95 },
        { name: "Redis", level: 70 }
      ]
    },
    {
      icon: Layers,
      title: "Frameworks & Tools",
      skills: [
        { name: "Express.js", level: 90 },
        { name: "NestJS", level: 80 },
        { name: "Loopback", level: 85 },
        { name: "WordPress", level: 80 },
        { name: "Shopify", level: 70 }
      ]
    },
    {
      icon: Smartphone,
      title: "Mobile & APIs",
      skills: [
        { name: "React Native", level: 70 },
        { name: "Ionic/Cordova", level: 65 },
        { name: "RESTful APIs", level: 95 },
        { name: "GraphQL", level: 75 },
        { name: "API Integration", level: 90 }
      ]
    }
  ];

  const domains = [
    "FinTech & Digital Payments",
    "Life Sciences & Healthcare",
    "HR & Talent Management", 
    "Supply Chain Management",
    "E-commerce & Retail",
    "Enterprise Solutions"
  ];

  const certifications = [
    "AWS Solutions Architect",
    "Microservices Architecture",
    "Agile & Scrum Methodologies",
    "Project Management"
  ];

  return (
    <section className="py-20 bg-portfolio-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Skills & Expertise</h2>
          <p className="text-xl text-portfolio-muted max-w-3xl mx-auto">
            Comprehensive technical expertise across the full stack, with deep knowledge in modern frameworks and cloud technologies.
          </p>
        </div>

        {/* Technical Skills */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <Card 
              key={index} 
              className="hover:shadow-medium transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-portfolio-accent/10 rounded-lg">
                    <category.icon className="w-6 h-6 text-portfolio-accent" />
                  </div>
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm text-portfolio-muted">{skill.level}%</span>
                    </div>
                    <Progress 
                      value={skill.level} 
                      className="h-2"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Domain Expertise */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <Card className="animate-slide-in-left">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-portfolio-accent/10 rounded-lg">
                  <Layers className="w-6 h-6 text-portfolio-accent" />
                </div>
                Domain Expertise
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                {domains.map((domain, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="justify-start p-3 text-sm hover:bg-portfolio-accent hover:text-white transition-colors"
                  >
                    {domain}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-in-right">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-portfolio-accent/10 rounded-lg">
                  <Badge className="w-6 h-6 text-portfolio-accent" />
                </div>
                Certifications & Specializations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-portfolio-secondary/50 rounded-lg">
                    <div className="w-2 h-2 bg-portfolio-accent rounded-full"></div>
                    <span className="font-medium">{cert}</span>
                  </div>
                ))}
                <div className="mt-6 p-4 bg-gradient-accent rounded-lg text-white">
                  <h4 className="font-semibold mb-2">Architecture Expertise</h4>
                  <p className="text-sm opacity-90">
                    Specialized in designing scalable microservices, implementing CI/CD pipelines, 
                    and building high-performance applications with 99.9% uptime.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Skills;