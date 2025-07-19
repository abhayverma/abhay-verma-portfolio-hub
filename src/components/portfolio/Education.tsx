import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award, BookOpen, Calendar, MapPin } from 'lucide-react';

const Education = () => {
  const education = [
    {
      degree: "Master of Business Administration",
      field: "Major: Artificial Intelligence | Minor: Machine Learning",
      institution: "Dr DY Patil Institute of Management & Research",
      location: "Pune, India",
      year: "2025",
      status: "In Progress",
      description: "Advanced studies in AI applications in business, machine learning algorithms, and data-driven decision making. Focus on emerging technologies and their impact on modern business strategies.",
      achievements: [
        "Specialization in AI/ML Business Applications",
        "Research in Enterprise AI Implementation",
        "Leadership and Strategic Management"
      ]
    },
    {
      degree: "Bachelor of Engineering",
      field: "Major: Computer Science",
      institution: "Ballarpur Institute of Technology",
      location: "Ballarpur, India", 
      year: "2013",
      status: "Completed",
      description: "Comprehensive foundation in computer science principles, software engineering, and programming fundamentals. Strong emphasis on practical application and project-based learning.",
      achievements: [
        "Strong Foundation in Programming",
        "Software Engineering Principles", 
        "Database Management Systems",
        "Web Technologies & Development"
      ]
    }
  ];

  const certifications = [
    {
      title: "AWS Solutions Architect Associate",
      issuer: "Amazon Web Services",
      year: "2023",
      skills: ["Cloud Architecture", "AWS Services", "Scalability", "Security"]
    },
    {
      title: "MongoDB Certified Developer",
      issuer: "MongoDB University",
      year: "2022", 
      skills: ["NoSQL", "Database Design", "Performance Optimization"]
    },
    {
      title: "Google Cloud Professional",
      issuer: "Google Cloud",
      year: "2022",
      skills: ["GCP Services", "DevOps", "Containers", "Kubernetes"]
    },
    {
      title: "React Advanced Certification",
      issuer: "Meta/Facebook",
      year: "2021",
      skills: ["React.js", "State Management", "Performance", "Testing"]
    }
  ];

  const continuousLearning = [
    {
      topic: "Microservices Architecture",
      platform: "Udemy",
      focus: "Scalable system design and implementation"
    },
    {
      topic: "DevOps & CI/CD",
      platform: "Coursera",
      focus: "Automation and deployment strategies"
    },
    {
      topic: "Machine Learning",
      platform: "edX MIT",
      focus: "AI/ML applications in software development"
    },
    {
      topic: "Blockchain Technology",
      platform: "Blockchain Council",
      focus: "Decentralized applications and smart contracts"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Education & Learning</h2>
          <p className="text-xl text-portfolio-muted max-w-3xl mx-auto">
            Committed to continuous learning and staying at the forefront of technology through formal education and professional development.
          </p>
        </div>

        {/* Formal Education */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <GraduationCap className="text-portfolio-accent" />
            Formal Education
          </h3>
          <div className="space-y-8">
            {education.map((edu, index) => (
              <Card 
                key={index} 
                className="border-l-4 border-l-portfolio-accent hover:shadow-medium transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardHeader>
                  <div className="flex flex-wrap justify-between items-start gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{edu.degree}</CardTitle>
                      <p className="text-portfolio-accent font-medium mb-2">{edu.field}</p>
                      <div className="flex flex-wrap items-center gap-4 text-portfolio-muted">
                        <div className="flex items-center gap-1">
                          <BookOpen size={16} />
                          <span>{edu.institution}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin size={16} />
                          <span>{edu.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={16} />
                          <span>{edu.year}</span>
                        </div>
                      </div>
                    </div>
                    <Badge 
                      className={edu.status === 'In Progress' 
                        ? "bg-portfolio-accent text-white" 
                        : "bg-green-100 text-green-800"
                      }
                    >
                      {edu.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-portfolio-muted mb-4 leading-relaxed">
                    {edu.description}
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Key Focus Areas:</h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.achievements.map((achievement, achieveIndex) => (
                        <Badge 
                          key={achieveIndex} 
                          variant="secondary" 
                          className="text-xs"
                        >
                          {achievement}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Professional Certifications */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <Award className="text-portfolio-accent" />
            Professional Certifications
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <Card 
                key={index} 
                className="hover:shadow-medium transition-all duration-300 animate-slide-in-left"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <CardTitle className="text-lg">{cert.title}</CardTitle>
                  <div className="flex justify-between items-center text-sm text-portfolio-muted">
                    <span>{cert.issuer}</span>
                    <Badge variant="outline">{cert.year}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Skills Covered:</h4>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill, skillIndex) => (
                        <Badge 
                          key={skillIndex} 
                          variant="secondary" 
                          className="text-xs hover:bg-portfolio-accent hover:text-white transition-colors"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Continuous Learning */}
        <div>
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <BookOpen className="text-portfolio-accent" />
            Continuous Learning
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {continuousLearning.map((learning, index) => (
              <Card 
                key={index} 
                className="text-center hover:shadow-soft transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-portfolio-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-6 h-6 text-portfolio-accent" />
                  </div>
                  <h4 className="font-semibold mb-2">{learning.topic}</h4>
                  <Badge variant="outline" className="mb-3 text-xs">
                    {learning.platform}
                  </Badge>
                  <p className="text-sm text-portfolio-muted">
                    {learning.focus}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Learning Philosophy */}
        <div className="mt-16 text-center">
          <Card className="max-w-4xl mx-auto bg-gradient-accent text-white">
            <CardContent className="p-8">
              <GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-90" />
              <h3 className="text-2xl font-bold mb-4">Learning Philosophy</h3>
              <p className="text-lg opacity-90 leading-relaxed">
                "Technology evolves rapidly, and continuous learning is essential for staying relevant. 
                I believe in combining formal education with hands-on experience, certifications, and 
                staying connected with the developer community to ensure I'm always growing and 
                delivering cutting-edge solutions."
              </p>
              <div className="mt-6 flex justify-center gap-4">
                <Badge className="bg-white/20 text-white border-white/30">
                  11+ Years Experience
                </Badge>
                <Badge className="bg-white/20 text-white border-white/30">
                  25+ Certifications
                </Badge>
                <Badge className="bg-white/20 text-white border-white/30">
                  Continuous Learner
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Education;