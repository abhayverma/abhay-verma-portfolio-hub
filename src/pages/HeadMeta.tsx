import React from "react";
import { Helmet } from "react-helmet-async";

interface HeadMetaProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}

const HeadMeta: React.FC<HeadMetaProps> = ({
  title = "Abhay Verma | Full Stack Developer & Solutions Architect",
  description = "Expert in Node.js, Python, Vue3, AWS, DevOps, React18, Angular5, and databases. Contact for consulting or development.",
  url = "https://abhayverma.com",
  image = "https://abhayverma.com/resources/dp_abhay_verma_full_stack_developer_2025.png",
}) => {
  return (
    <Helmet>
      {/* Basic Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content="Abhay Verma" />
      <meta name="keywords" content="Abhay Verma, Senior Full Stack Developer, Solutions Architect, Node.js, Python, Vue3, AWS, DevOps, React18, Angular5, PostgreSQL, MySQL, SQLite, ORMs, DB / API / Microservices - Design & Architecture, Pub-Sub, SQS, Redis, Celery" />
      <link rel="icon" href="/favicon.ico" />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Abhay Verma",
          url: url,
          image: image,
          sameAs: [
            "https://www.linkedin.com/in/abhayverma/",
            "https://github.com/abhayverma"
          ],
          jobTitle: "Full Stack & Hybrid Mobile App Developer",
          description: description
        })}
      </script>
    </Helmet>
  );
};

export default HeadMeta;
