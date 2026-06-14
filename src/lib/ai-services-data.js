// lib/ai-services-data.js

import {
  Workflow,
  Sparkles,
  BrainCircuit,
  Bot,
  GitBranch,
  Mic2,
  Layers,
  Search,
  TrendingUp,
  Cpu,
  Eye,
  Building2,
} from "lucide-react";

export const categoryMeta = {
  "AI Automation": {
    color: "text-violet-600",
    bgColor: "bg-violet-50",
    borderColor: "border-violet-200",
    gradient: "from-violet-600 to-violet-800",
  },
  "Generative AI": {
    color: "text-sky-600",
    bgColor: "bg-sky-50",
    borderColor: "border-sky-200",
    gradient: "from-sky-600 to-sky-800",
  },
  "ML Solutions": {
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    gradient: "from-emerald-600 to-emerald-800",
  },
    "AI Consulting": {
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    gradient: "from-emerald-600 to-emerald-800",
  },
};

export const allAiServices = [
  // ─── AI Automation & Intelligent Agents ───────────────────────────────────
  {
    slug: "chatbot-development",
    label: "AI Chatbots & Virtual Assistants",
    href: "/ai-services/chatbot-development",
    category: "AI Automation",
    icon: "Bot",
    badge: "New",
    image:
      "https://res.cloudinary.com/dtrhtdngp/image/upload/q_auto/f_auto/v1780997166/robot-handshake-human-background-futuristic-digital-age.jpg_ojgexx.jpg",

    description:
      "Transform Customer Engagement with Intelligent Conversational AI",

    details: {
      tagline:
        "Build smarter customer experiences with AI-powered chatbots and virtual assistants.",

      overview:
        "Build smarter customer experiences with AI-powered chatbots and virtual assistants from Alomonx Technology. We create intelligent conversational AI solutions that automate support, qualify leads, schedule appointments, assist employees, and drive growth across digital channels.",

      fullOverview: {
        title: "Automate Conversations & Enhance Customer Engagement",
        overview: `
Our AI chatbot and virtual assistant solutions help businesses provide instant responses, reduce operational costs, improve customer satisfaction, and increase productivity.

Whether you need a website chatbot, WhatsApp assistant, or enterprise AI assistant, we deliver scalable and secure solutions tailored to your business.
  `,
      },

      businessChallenges: [
        "High customer support workload",
        "Slow response times",
        "Missed sales opportunities",
        "Inefficient lead qualification",
        "Manual appointment scheduling",
        "Language barriers in customer communication",
        "Repetitive employee support requests",
        "Limited customer engagement outside business hours",
      ],

      solutions: [
        {
          title: "Website AI Chatbots",
          description:
            "Engage website visitors, answer queries instantly, and capture leads 24/7.",
          image:
            "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
        },
        {
          title: "WhatsApp AI Assistants",
          description:
            "Automate customer interactions directly on WhatsApp with intelligent conversational workflows.",
          image:
            "https://images.unsplash.com/photo-1611746872915-64382b5c76da?q=80&w=1200&auto=format&fit=crop",
        },
        {
          title: "Customer Support Automation",
          description:
            "Reduce support tickets with AI-powered self-service and automated issue resolution.",
          image:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
        },
        {
          title: "Lead Qualification Bots",
          description:
            "Identify, qualify, and nurture potential customers automatically.",
          image:
            "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1200&auto=format&fit=crop",
        },
        {
          title: "Appointment Booking Assistants",
          description:
            "Schedule meetings, consultations, and appointments without manual intervention.",
          image:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
        },
        {
          title: "Multilingual AI Assistants",
          description:
            "Communicate with customers in multiple languages for better global reach.",
          image:
            "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
        },
        {
          title: "AI Sales Representatives",
          description:
            "Assist prospects, recommend products, and support the sales process around the clock.",
          image:
            "https://images.unsplash.com/photo-1556742031-c6961e8560b0?q=80&w=1200&auto=format&fit=crop",
        },
        {
          title: "Internal Employee Assistants",
          description:
            "Provide instant access to company information, HR support, policies, and internal knowledge.",
          image:
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
        },
      ],

      keyFeatures: [
        "Natural Language Processing (NLP)",
        "Human-like Conversations",
        "Multi-Channel Integration",
        "CRM & ERP Connectivity",
        "Knowledge Base Integration",
        "Automated Workflows",
        "Lead Capture & Qualification",
        "Analytics & Performance Tracking",
        "Secure & Scalable Architecture",
      ],

      useCases: [
        {
          title: "Customer Support",
          image:
            "https://images.pexels.com/photos/8867434/pexels-photo-8867434.jpeg",
        },
        {
          title: "Sales Automation",
          image:
            "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
        },
        {
          title: "E-commerce Assistance",
          image:
            "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg",
        },
        {
          title: "Healthcare Appointment Booking",
          image:
            "https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg",
        },
        {
          title: "Education & Student Support",
          image:
            "https://images.pexels.com/photos/8471986/pexels-photo-8471986.jpeg",
        },
        {
          title: "HR & Employee Services",
          image:
            "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
        },
        {
          title: "Real Estate Lead Management",
          image:
            "https://images.pexels.com/photos/8728382/pexels-photo-8728382.jpeg",
        },
        {
          title: "Banking & Financial Assistance",
          image:
            "https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg",
        },
      ],

      technologyStack: [
        "Python",
        "OpenAI",
        "Claude",
        "Gemini",
        "LangChain",
        "Spring AI",
        "RAG (Retrieval-Augmented Generation)",
        "MCP (Model Context Protocol)",
        "AI Agents",
        "Prompt Engineering",
        "Natural Language Processing (NLP)",
        "Machine Learning",
        "Semantic Search",
        "Vector Databases",
        "LLM Fine-Tuning",
        "WhatsApp Business API",
        "Cloud Infrastructure",
      ],

      benefits: [
        "24/7 Customer Availability",
        "Faster Response Times",
        "Reduced Operational Costs",
        "Higher Lead Conversion Rates",
        "Improved Customer Satisfaction",
        "Increased Employee Productivity",
        "Scalable Customer Engagement",
        "Data-Driven Insights",
      ],

      implementationProcess: [
        {
          title: "Discovery & Consultation",
          description: "Understanding your business goals and requirements.",
        },
        {
          title: "Conversation Design",
          description: "Creating chatbot workflows and user journeys.",
        },
        {
          title: "Development & Integration",
          description:
            "Building and connecting AI systems with existing platforms.",
        },
        {
          title: "Testing & Optimization",
          description: "Ensuring accuracy, performance, and reliability.",
        },
        {
          title: "Deployment & Support",
          description:
            "Launching the solution with ongoing monitoring and enhancements.",
        },
      ],

      whyChooseUs: [
        {
          title: "Customized AI Chatbot Development",
          description:
            "We design and develop AI chatbots tailored to your business processes, customer journeys, and operational requirements instead of relying on generic templates.",
          image:
            "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg",
        },
        {
          title: "Industry-Specific Conversational AI Solutions",
          description:
            "Our AI assistants are trained and optimized for specific industries including healthcare, finance, education, e-commerce, real estate, and customer service.",
          image:
            "https://images.pexels.com/photos/8728560/pexels-photo-8728560.jpeg",
        },
        {
          title: "WhatsApp AI Chatbot Development Expertise",
          description:
            "Leverage WhatsApp Business API integrations to automate conversations, lead generation, customer support, and engagement on the world's most popular messaging platform.",
          image:
            "https://images.pexels.com/photos/5926382/pexels-photo-5926382.jpeg",
        },
        {
          title: "Secure & Scalable Implementations",
          description:
            "We build enterprise-grade AI solutions with robust security, compliance, and cloud-native scalability to support growing user demands.",
          image:
            "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg",
        },
        {
          title: "Seamless Third-Party Integrations",
          description:
            "Connect your chatbot with CRMs, ERPs, payment systems, knowledge bases, calendars, and business applications for a unified experience.",
          image:
            "https://images.pexels.com/photos/5474294/pexels-photo-5474294.jpeg",
        },
        {
          title: "Continuous Support & Optimization",
          description:
            "We continuously monitor, refine, and optimize chatbot performance to improve accuracy, engagement, and customer satisfaction over time.",
          image:
            "https://images.pexels.com/photos/7567434/pexels-photo-7567434.jpeg",
        },
        {
          title: "Focus on Business Outcomes and ROI",
          description:
            "Our solutions are designed to increase conversions, reduce operational costs, improve response times, and deliver measurable business value.",
          image:
            "https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg",
        },
      ],

      faqs: [
        {
          question: "What is an AI chatbot?",
          answer:
            "An AI chatbot is a conversational software solution that uses artificial intelligence to interact with users and automate communication.",
        },
        {
          question: "Can the chatbot integrate with my CRM?",
          answer:
            "Yes, our chatbots can integrate with CRM, ERP, helpdesk, and other business systems.",
        },
        {
          question: "Do you provide WhatsApp chatbot development?",
          answer:
            "Yes, we develop intelligent WhatsApp AI assistants for customer support, sales, and engagement.",
        },
        {
          question: "Can chatbots support multiple languages?",
          answer:
            "Absolutely. We can build multilingual AI assistants for global audiences.",
        },
        {
          question: "How long does implementation take?",
          answer:
            "Project timelines vary based on complexity, integrations, and business requirements.",
        },
      ],

      cta: {
        title: "Ready to Automate Customer Conversations?",
        description:
          "Empower your business with intelligent AI Chatbots and Virtual Assistants from Alomonx Technology. Improve customer experiences, automate workflows, and accelerate growth with advanced conversational AI solutions.",
        buttonText: "Contact Us Today for a Free Consultation",
        footer:
          "Trusted by businesses to deliver smarter customer engagement, faster support, and scalable AI-powered automation solutions.",
      },

      banner: {
        title: "Build Smarter Businesses with AI-Powered Innovation",
        description:
          "We help organizations leverage Artificial Intelligence to automate workflows, enhance customer experiences, unlock actionable insights, and create scalable digital solutions that deliver measurable business impact.",
        bannerImage: "/ai_banner.jpeg",
      },
    },
  },

  {
    slug: "generative-apps",
    label: "Generative AI Applications",
    href: "/ai-services/generative-apps",
    category: "Generative AI",
    icon: "Sparkles",
    badge: "Popular",
    image:
      "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    description: "Build Next-Generation AI-Powered Applications",

    details: {
      tagline:
        "Transform innovative AI ideas into intelligent, scalable, and business-ready applications.",

      overview:
        "Alomonx Technology develops custom Generative AI Applications that help businesses automate content creation, enhance customer experiences, streamline workflows, and unlock new opportunities through intelligent AI-driven solutions. We transform innovative AI ideas into scalable, secure, and business-ready applications.",

      fullOverview: {
        title: "Empowering Businesses with Generative AI Innovation",
        overview: `
Our Generative AI solutions leverage advanced Large Language Models (LLMs), machine learning, and AI technologies to create intelligent applications capable of generating text, images, insights, recommendations, and automated responses in real time.

Whether you're building AI assistants, content generation platforms, document intelligence systems, recommendation engines, or enterprise AI applications, we deliver secure, scalable, and high-performance solutions tailored to your business goals.
      `,
      },

      businessChallenges: [
        "Manual content creation",
        "Inefficient business processes",
        "Slow customer support response times",
        "Limited personalization capabilities",
        "Data overload and knowledge management issues",
        "High operational costs",
        "Difficulty extracting insights from large datasets",
        "Lack of AI-powered automation across business operations",
      ],

      solutions: [
        {
          title: "AI-Powered Business Applications",
          description:
            "Custom AI applications designed to automate workflows, optimize operations, and improve business efficiency.",
          image:
            "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
        },
        {
          title: "Content Generation Platforms",
          description:
            "Generate blogs, marketing content, product descriptions, reports, documentation, and creative assets using Generative AI.",
          image:
            "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1200&auto=format&fit=crop",
        },
        {
          title: "AI Knowledge Assistants",
          description:
            "Provide instant access to organizational knowledge through intelligent AI assistants and conversational interfaces.",
          image:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
        },
        {
          title: "AI Search & Recommendation Systems",
          description:
            "Deliver personalized recommendations and semantic search experiences powered by AI.",
          image:
            "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
        },
        {
          title: "Document Intelligence Solutions",
          description:
            "Automatically extract, summarize, analyze, and process business documents at scale.",
          image:
            "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop",
        },
        {
          title: "Industry-Specific AI Applications",
          description:
            "Custom Generative AI solutions for healthcare, finance, retail, education, manufacturing, and enterprise operations.",
          image:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
        },
        {
          title: "AI Workflow Automation",
          description:
            "Automate repetitive business tasks and decision-making processes using intelligent AI systems.",
          image:
            "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=1200&auto=format&fit=crop",
        },
        {
          title: "AI Research & Analytics Platforms",
          description:
            "Generate insights, reports, and business intelligence from structured and unstructured data.",
          image:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
        },
      ],

      keyFeatures: [
        "Large Language Model (LLM) Integration",
        "Natural Language Processing (NLP)",
        "Intelligent Content Generation",
        "AI-Powered Search & Retrieval",
        "Document Analysis & Summarization",
        "Workflow Automation",
        "API & System Integrations",
        "Enterprise Security & Compliance",
        "Personalized Recommendations",
        "Knowledge Base Integration",
        "Real-Time AI Responses",
        "Scalable Cloud Infrastructure",
      ],

      useCases: [
        {
          title: "AI Content Creation Platforms",
          image:
            "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
        },
        {
          title: "Customer Service Automation",
          image:
            "https://images.pexels.com/photos/8867434/pexels-photo-8867434.jpeg",
        },
        {
          title: "Knowledge Management Systems",
          image:
            "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
        },
        {
          title: "Document Processing & Analysis",
          image:
            "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg",
        },
        {
          title: "Personalized User Experiences",
          image:
            "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
        },
        {
          title: "Marketing Automation",
          image:
            "https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg",
        },
        {
          title: "Research & Data Insights",
          image:
            "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg",
        },
        {
          title: "Enterprise Productivity Solutions",
          image:
            "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg",
        },
      ],

      technologyStack: [
        "OpenAI",
        "Claude",
        "Gemini",
        "Llama",
        "Mistral AI",
        "Generative AI Models",
        "Retrieval-Augmented Generation (RAG)",
        "Vector Databases",
        "LangChain",
        "Spring AI",
        "Python",
        "Machine Learning Frameworks",
        "Prompt Engineering",
        "Semantic Search",
        "AI Agents",
        "Cloud Infrastructure",
        "Enterprise APIs & Integrations",
      ],

      benefits: [
        "Increased Productivity",
        "Faster Decision-Making",
        "Reduced Operational Costs",
        "Improved Customer Experience",
        "Enhanced Personalization",
        "Scalable AI Capabilities",
        "Better Knowledge Accessibility",
        "Accelerated Business Innovation",
      ],

      implementationProcess: [
        {
          title: "Discovery & AI Strategy",
          description:
            "Understand business goals, challenges, and identify Generative AI opportunities.",
        },
        {
          title: "Solution Architecture",
          description:
            "Design scalable, secure, and enterprise-ready AI application frameworks.",
        },
        {
          title: "Development & Integration",
          description:
            "Build and integrate Generative AI capabilities into existing business systems.",
        },
        {
          title: "Testing & Optimization",
          description:
            "Validate performance, security, accuracy, and model effectiveness.",
        },
        {
          title: "Deployment & Support",
          description:
            "Launch, monitor, optimize, and continuously improve AI applications.",
        },
      ],

      whyChooseUs: [
        {
          title: "Custom Generative AI Development",
          description:
            "We build tailored Generative AI solutions designed around your business objectives, workflows, and industry requirements.",
          image:
            "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg",
        },
        {
          title: "Enterprise-Grade AI Solutions",
          description:
            "Our AI applications are built with enterprise security, scalability, governance, and compliance standards.",
          image:
            "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg",
        },
        {
          title: "Advanced LLM & RAG Expertise",
          description:
            "Leverage our expertise in OpenAI, Claude, Gemini, Llama, Retrieval-Augmented Generation (RAG), and vector search technologies.",
          image:
            "https://images.pexels.com/photos/8728560/pexels-photo-8728560.jpeg",
        },
        {
          title: "Seamless Business System Integrations",
          description:
            "Integrate AI with CRM, ERP, CMS, databases, enterprise applications, and third-party platforms.",
          image:
            "https://images.pexels.com/photos/5474294/pexels-photo-5474294.jpeg",
        },
        {
          title: "Industry-Specific AI Applications",
          description:
            "We develop domain-focused AI solutions for healthcare, finance, education, retail, manufacturing, and enterprises.",
          image:
            "https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg",
        },
        {
          title: "Secure & Scalable Architecture",
          description:
            "Our AI solutions are designed to support business growth while ensuring security, reliability, and performance.",
          image:
            "https://images.pexels.com/photos/7567434/pexels-photo-7567434.jpeg",
        },
        {
          title: "End-to-End Development & Support",
          description:
            "From AI strategy and development to deployment and optimization, we provide complete lifecycle support.",
          image:
            "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
        },
      ],

      faqs: [
        {
          question: "What are Generative AI Applications?",
          answer:
            "Generative AI Applications use advanced AI models to generate content, insights, recommendations, and intelligent responses based on user inputs and business data.",
        },
        {
          question: "Can Generative AI integrate with existing systems?",
          answer:
            "Yes. We integrate AI applications with websites, mobile apps, CRM, ERP, databases, cloud platforms, and enterprise systems.",
        },
        {
          question: "Are Generative AI applications secure?",
          answer:
            "Absolutely. We implement enterprise-grade security, access controls, encryption, and compliance best practices.",
        },
        {
          question: "Which industries benefit from Generative AI?",
          answer:
            "Healthcare, finance, retail, education, manufacturing, real estate, customer service, and many other industries can benefit from Generative AI solutions.",
        },
        {
          question: "Do you build custom AI solutions?",
          answer:
            "Yes. Every Generative AI application is customized according to your business requirements, workflows, and objectives.",
        },
      ],

      cta: {
        title: "Ready to Transform Your Business with Generative AI?",
        description:
          "Leverage the power of Generative AI to automate processes, enhance customer experiences, unlock business insights, and create innovative digital products. Partner with Alomonx Technology to build intelligent, scalable, and future-ready AI applications.",
        buttonText: "Schedule a Free AI Consultation",
        footer:
          "Trusted by businesses to deliver innovative AI solutions that drive productivity, efficiency, and business growth.",
      },

      banner: {
        title: "Unlock Business Innovation with Generative AI",
        description:
          "Empower your organization with intelligent AI applications that automate workflows, generate content, enhance customer experiences, and create measurable business value.",
        bannerImage: "/ai_banner.jpeg",
      },
    },
  },

  {
    slug: "machine-learning-solutions",
    label: "Machine Learning Solutions",
    href: "/ai-services/machine-learning-solutions",
    category: "ML Solutions",
    icon: "Brain",
    badge: "Popular",
    image:
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    description: "Transform Data into Intelligent Business Outcomes",

    details: {
      tagline:
        "Leverage Machine Learning to automate decisions, uncover insights, and accelerate business growth.",

      overview:
        "Alomonx Technology delivers end-to-end Machine Learning Solutions that help organizations automate decisions, uncover hidden insights, improve operational efficiency, and drive business growth. Our ML-powered systems enable businesses to predict future trends, optimize processes, and create data-driven strategies.",

      fullOverview: {
        title: "Unlock the Power of Data with Machine Learning",
        overview: `
We design, develop, and deploy custom Machine Learning solutions that leverage data, AI, and predictive analytics to solve complex business challenges.

From forecasting and recommendation engines to intelligent automation, anomaly detection, and customer intelligence, our Machine Learning solutions are built to deliver measurable business outcomes and long-term competitive advantages.

Whether you're looking to optimize operations, improve forecasting accuracy, automate decision-making, or gain deeper customer insights, we build scalable and secure ML systems tailored to your business goals.
      `,
      },

      businessChallenges: [
        "Lack of actionable business insights",
        "Inefficient manual decision-making",
        "Inaccurate forecasting and planning",
        "Customer churn and retention issues",
        "Fraud and risk management challenges",
        "Data overload and poor utilization",
        "Limited business intelligence capabilities",
        "Difficulty identifying hidden patterns in large datasets",
      ],

      solutions: [
        {
          title: "Predictive Analytics",
          description:
            "Forecast business trends, customer behavior, demand patterns, revenue growth, and operational performance.",
          image:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
        },
        {
          title: "Recommendation Systems",
          description:
            "Deliver personalized product, content, and service recommendations to improve customer engagement and conversions.",
          image:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
        },
        {
          title: "Customer Intelligence",
          description:
            "Analyze customer behavior, preferences, and purchasing patterns to predict future actions and improve retention.",
          image:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
        },
        {
          title: "Fraud Detection & Risk Analysis",
          description:
            "Identify anomalies, fraudulent activities, and business risks in real time using advanced ML algorithms.",
          image:
            "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1200&auto=format&fit=crop",
        },
        {
          title: "Computer Vision Solutions",
          description:
            "Analyze images and videos for object detection, quality inspection, facial recognition, and intelligent automation.",
          image:
            "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
        },
        {
          title: "NLP & Text Analytics",
          description:
            "Extract insights from documents, emails, customer reviews, surveys, and conversations using AI-powered language processing.",
          image:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
        },
        {
          title: "Anomaly Detection Systems",
          description:
            "Automatically identify unusual patterns, operational failures, and potential security threats.",
          image:
            "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
        },
        {
          title: "Intelligent Process Automation",
          description:
            "Automate repetitive business operations and improve efficiency using machine learning-driven workflows.",
          image:
            "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=1200&auto=format&fit=crop",
        },
      ],

      keyFeatures: [
        "Custom Machine Learning Models",
        "Predictive Analytics & Forecasting",
        "Real-Time Data Processing",
        "Intelligent Automation",
        "Data Visualization & Reporting",
        "API & Enterprise Integrations",
        "Scalable Cloud Deployment",
        "Continuous Model Optimization",
        "Anomaly Detection",
        "Customer Intelligence",
        "Advanced Data Analytics",
        "Enterprise-Grade Security",
      ],

      useCases: [
        {
          title: "Sales Forecasting",
          image:
            "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg",
        },
        {
          title: "Demand Prediction",
          image:
            "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg",
        },
        {
          title: "Customer Churn Analysis",
          image:
            "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
        },
        {
          title: "Fraud Detection",
          image:
            "https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg",
        },
        {
          title: "Product Recommendations",
          image:
            "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg",
        },
        {
          title: "Sentiment Analysis",
          image:
            "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
        },
        {
          title: "Inventory Optimization",
          image:
            "https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg",
        },
        {
          title: "Business Performance Analytics",
          image:
            "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg",
        },
      ],

      technologyStack: [
        "Python",
        "TensorFlow",
        "PyTorch",
        "Scikit-Learn",
        "XGBoost",
        "MLflow",
        "Apache Spark",
        "Pandas",
        "NumPy",
        "Computer Vision Frameworks",
        "Natural Language Processing (NLP)",
        "Cloud AI Platforms",
        "AWS SageMaker",
        "Google Vertex AI",
        "Azure Machine Learning",
        "Data Engineering & Analytics Tools",
        "MLOps & Model Monitoring",
      ],

      benefits: [
        "Smarter Business Decisions",
        "Improved Forecast Accuracy",
        "Enhanced Customer Experiences",
        "Increased Productivity",
        "Reduced Operational Costs",
        "Automated Insights Generation",
        "Better Risk Management",
        "Competitive Advantage",
      ],

      implementationProcess: [
        {
          title: "Discovery & Strategy",
          description:
            "Analyze business goals, challenges, opportunities, and available data sources.",
        },
        {
          title: "Data Engineering",
          description:
            "Prepare, clean, transform, and structure data for machine learning development.",
        },
        {
          title: "Model Development",
          description:
            "Build, train, and optimize machine learning models tailored to business requirements.",
        },
        {
          title: "Validation & Testing",
          description:
            "Evaluate model accuracy, reliability, scalability, and business impact.",
        },
        {
          title: "Deployment & Optimization",
          description:
            "Deploy production-ready ML solutions and continuously monitor and improve performance.",
        },
      ],

      whyChooseUs: [
        {
          title: "Custom Machine Learning Expertise",
          description:
            "We develop tailored machine learning models designed around your business objectives, data, and operational requirements.",
          image:
            "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg",
        },
        {
          title: "Industry-Specific AI Solutions",
          description:
            "Our ML solutions are customized for healthcare, finance, retail, logistics, manufacturing, education, and enterprise operations.",
          image:
            "https://images.pexels.com/photos/8728560/pexels-photo-8728560.jpeg",
        },
        {
          title: "End-to-End Development Services",
          description:
            "From strategy and data engineering to model deployment and optimization, we manage the complete ML lifecycle.",
          image:
            "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
        },
        {
          title: "Secure & Scalable Architecture",
          description:
            "Build enterprise-grade machine learning systems with high availability, security, and scalability.",
          image:
            "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg",
        },
        {
          title: "Cloud & Enterprise Integrations",
          description:
            "Seamlessly integrate ML solutions with CRM, ERP, BI tools, cloud platforms, and existing business systems.",
          image:
            "https://images.pexels.com/photos/5474294/pexels-photo-5474294.jpeg",
        },
        {
          title: "Continuous Monitoring & Support",
          description:
            "Monitor model performance, detect drift, retrain models, and continuously improve outcomes.",
          image:
            "https://images.pexels.com/photos/7567434/pexels-photo-7567434.jpeg",
        },
        {
          title: "ROI-Focused AI Strategy",
          description:
            "We focus on delivering measurable business value through actionable insights, automation, and operational improvements.",
          image:
            "https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg",
        },
      ],

      faqs: [
        {
          question: "What are Machine Learning Solutions?",
          answer:
            "Machine Learning Solutions use AI algorithms to analyze data, identify patterns, make predictions, and automate business decisions.",
        },
        {
          question: "Can Machine Learning integrate with our existing systems?",
          answer:
            "Yes. Our ML solutions integrate seamlessly with CRM, ERP, websites, mobile applications, cloud platforms, and enterprise systems.",
        },
        {
          question: "Which industries benefit from Machine Learning?",
          answer:
            "Healthcare, finance, retail, manufacturing, logistics, education, real estate, telecommunications, and many other industries benefit from Machine Learning.",
        },
        {
          question:
            "How long does it take to implement a Machine Learning solution?",
          answer:
            "Project timelines vary depending on data availability, business complexity, model requirements, and integration scope.",
        },
        {
          question: "Can Machine Learning work with our existing data?",
          answer:
            "Yes. We can leverage structured and unstructured data from your existing systems to develop effective machine learning models.",
        },
      ],

      cta: {
        title: "Ready to Unlock the Power of Machine Learning?",
        description:
          "Leverage advanced Machine Learning Solutions from Alomonx Technology to automate processes, gain predictive insights, improve decision-making, and accelerate business growth.",
        buttonText: "Schedule a Free ML Consultation",
        footer:
          "Trusted by businesses to transform data into intelligent insights, automation, and measurable competitive advantages.",
      },

      banner: {
        title: "Turn Data into Competitive Advantage with Machine Learning",
        description:
          "Empower your business with intelligent machine learning solutions that predict outcomes, automate decisions, optimize operations, and unlock new growth opportunities.",
        bannerImage: "/ai_banner.jpeg",
      },
    },
  },
  {
    slug: "ai-consulting-deployment-support",
    label: "AI Consulting, Deployment & Support",
    href: "/ai-services/ai-consulting-deployment-support",
    category: "AI Consulting",
    icon: "Briefcase",
    badge: "Expert Services",
    image:
      "https://images.unsplash.com/photo-1739036868260-c26b292cd85d?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    description: "Accelerate Your AI Journey with Expert Guidance",

    details: {
      tagline:
        "Strategic AI consulting, seamless deployment, and continuous support for long-term AI success.",

      overview:
        "Alomonx Technology provides comprehensive AI Consulting, Deployment & Support services to help organizations successfully adopt, implement, and scale Artificial Intelligence solutions. From AI strategy and technology selection to deployment and ongoing optimization, we ensure your AI investments deliver measurable business value.",

      fullOverview: {
        title: "Transform AI Vision into Business Results",
        overview: `
Our AI experts work closely with organizations to identify high-impact opportunities, develop AI roadmaps, deploy intelligent solutions, and provide continuous optimization and support.

Whether you're beginning your AI transformation journey or scaling existing AI initiatives, we help reduce implementation risks, accelerate adoption, and maximize the return on your AI investments.

From Generative AI and Machine Learning to AI automation and enterprise integrations, we deliver end-to-end consulting and deployment services tailored to your business objectives.
      `,
      },

      businessChallenges: [
        "Unclear AI adoption strategy",
        "Difficulty selecting the right AI technologies",
        "Complex AI implementation processes",
        "Integration challenges with existing systems",
        "Low AI adoption across teams",
        "Lack of in-house AI expertise",
        "Performance monitoring and optimization issues",
        "Difficulty scaling AI initiatives across the organization",
      ],

      solutions: [
        {
          title: "AI Strategy & Roadmap Consulting",
          description:
            "Define clear AI goals, identify opportunities, prioritize initiatives, and build a practical implementation roadmap.",
          image:
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
        },
        {
          title: "AI Solution Architecture",
          description:
            "Design scalable, secure, and future-ready AI infrastructures tailored to business requirements.",
          image:
            "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop",
        },
        {
          title: "AI Deployment Services",
          description:
            "Deploy AI models, applications, and automation systems into production environments efficiently and reliably.",
          image:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
        },
        {
          title: "AI Integration Services",
          description:
            "Connect AI solutions with CRM, ERP, cloud platforms, databases, and enterprise applications.",
          image:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
        },
        {
          title: "AI Performance Optimization",
          description:
            "Monitor, improve, retrain, and optimize AI systems to maximize accuracy, efficiency, and business impact.",
          image:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
        },
        {
          title: "Ongoing AI Support & Maintenance",
          description:
            "Ensure long-term reliability, security, performance, and continuous improvement of AI solutions.",
          image:
            "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop",
        },
        {
          title: "MLOps & Model Management",
          description:
            "Implement model governance, monitoring, versioning, and lifecycle management for enterprise AI systems.",
          image:
            "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
        },
        {
          title: "Generative AI Advisory Services",
          description:
            "Guide organizations in selecting, implementing, and scaling Generative AI and Large Language Model solutions.",
          image:
            "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
        },
      ],

      keyFeatures: [
        "AI Readiness Assessment",
        "Strategic AI Planning",
        "End-to-End AI Deployment",
        "Enterprise System Integration",
        "Model Monitoring & Optimization",
        "Security & Compliance Best Practices",
        "Cloud & On-Premise Deployment",
        "Dedicated Technical Support",
        "AI Governance Frameworks",
        "Risk Assessment & Mitigation",
        "Scalable AI Infrastructure",
        "Continuous Improvement Strategy",
      ],

      useCases: [
        {
          title: "Enterprise AI Adoption",
          image:
            "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
        },
        {
          title: "Generative AI Implementation",
          image:
            "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
        },
        {
          title: "AI Chatbot Deployment",
          image:
            "https://images.pexels.com/photos/8867434/pexels-photo-8867434.jpeg",
        },
        {
          title: "Machine Learning Model Deployment",
          image:
            "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg",
        },
        {
          title: "Business Process Automation",
          image:
            "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg",
        },
        {
          title: "Predictive Analytics Solutions",
          image:
            "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg",
        },
        {
          title: "AI-Powered Customer Support",
          image:
            "https://images.pexels.com/photos/5926382/pexels-photo-5926382.jpeg",
        },
        {
          title: "Intelligent Decision-Making Systems",
          image:
            "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
        },
      ],

      technologyStack: [
        "Generative AI & LLMs",
        "OpenAI",
        "Claude",
        "Gemini",
        "Machine Learning",
        "Predictive Analytics",
        "Conversational AI",
        "MLOps & Model Management",
        "LangChain",
        "Spring AI",
        "Vector Databases",
        "Cloud AI Platforms",
        "AWS",
        "Microsoft Azure",
        "Google Cloud",
        "Data Engineering & Analytics",
        "Enterprise Software Integration",
      ],

      benefits: [
        "Faster AI Implementation",
        "Reduced Deployment Risks",
        "Improved ROI on AI Investments",
        "Seamless Technology Integration",
        "Enhanced Operational Efficiency",
        "Continuous Performance Improvement",
        "Scalable AI Infrastructure",
        "Long-Term Technical Support",
      ],

      implementationProcess: [
        {
          title: "AI Assessment & Discovery",
          description:
            "Evaluate business processes, technical infrastructure, data maturity, and AI opportunities.",
        },
        {
          title: "Strategy & Planning",
          description:
            "Develop a customized AI roadmap aligned with business objectives and expected outcomes.",
        },
        {
          title: "Solution Design & Deployment",
          description:
            "Design, configure, develop, and deploy AI solutions within your environment.",
        },
        {
          title: "Integration & Testing",
          description:
            "Connect AI systems with business platforms and validate security, performance, and reliability.",
        },
        {
          title: "Support & Optimization",
          description:
            "Continuously monitor, optimize, maintain, and improve AI systems to maximize business value.",
        },
      ],

      whyChooseUs: [
        {
          title: "Experienced AI Consultants & Engineers",
          description:
            "Our team combines deep technical expertise with practical business experience to deliver successful AI transformations.",
          image:
            "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
        },
        {
          title: "End-to-End AI Implementation Services",
          description:
            "From strategy and consulting to deployment, optimization, and support, we manage the complete AI lifecycle.",
          image:
            "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg",
        },
        {
          title: "Business-Focused AI Strategy",
          description:
            "We align AI initiatives with measurable business goals to ensure maximum impact and return on investment.",
          image:
            "https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg",
        },
        {
          title: "Secure & Scalable Deployments",
          description:
            "Build enterprise-grade AI systems with strong security, compliance, governance, and scalability.",
          image:
            "https://images.pexels.com/photos/5474294/pexels-photo-5474294.jpeg",
        },
        {
          title: "Industry-Specific Expertise",
          description:
            "Deliver AI solutions tailored for healthcare, finance, retail, education, manufacturing, and enterprise environments.",
          image:
            "https://images.pexels.com/photos/8728560/pexels-photo-8728560.jpeg",
        },
        {
          title: "Ongoing Monitoring & Support",
          description:
            "We provide proactive monitoring, maintenance, optimization, and technical support to ensure long-term success.",
          image:
            "https://images.pexels.com/photos/7567434/pexels-photo-7567434.jpeg",
        },
        {
          title: "Proven Approach to AI Transformation",
          description:
            "Our structured methodology helps organizations adopt AI efficiently while minimizing risks and maximizing outcomes.",
          image:
            "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg",
        },
      ],

      faqs: [
        {
          question: "What is AI Consulting?",
          answer:
            "AI Consulting helps organizations identify, plan, and implement AI solutions that align with business goals and deliver measurable outcomes.",
        },
        {
          question: "Do you provide AI deployment services?",
          answer:
            "Yes. We deploy AI models, applications, chatbots, machine learning systems, and Generative AI solutions across cloud and enterprise environments.",
        },
        {
          question: "Do you offer ongoing support after deployment?",
          answer:
            "Absolutely. We provide maintenance, monitoring, optimization, troubleshooting, and technical support to ensure long-term AI success.",
        },
        {
          question: "Can you help businesses new to AI?",
          answer:
            "Yes. We guide organizations through every stage of AI adoption, from strategy and planning to deployment and optimization.",
        },
        {
          question: "Can you integrate AI with existing enterprise systems?",
          answer:
            "Yes. We integrate AI solutions with CRM, ERP, databases, cloud platforms, customer portals, and enterprise applications.",
        },
      ],

      cta: {
        title: "Ready to Scale AI with Confidence?",
        description:
          "Partner with Alomonx Technology for expert AI Consulting, Deployment & Support services that help you implement AI successfully, reduce risks, and maximize business value.",
        buttonText: "Schedule Your AI Consultation",
        footer:
          "Trusted by organizations to accelerate AI adoption, optimize deployments, and achieve measurable business outcomes through intelligent technology solutions.",
      },

      banner: {
        title: "Accelerate AI Success with Expert Consulting & Support",
        description:
          "From AI strategy and deployment to optimization and long-term support, we help organizations unlock the full value of Artificial Intelligence.",
        bannerImage: "/ai_banner.jpeg",
      },
    },
  },
];

export const allAiCategories = [
  ...new Set(allAiServices.map((s) => s.category)),
];

export function getAiServiceBySlug(slug) {
  return allAiServices.find((s) => s.slug === slug) ?? null;
}
