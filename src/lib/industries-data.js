
export const categoryMeta = {
  "Core Sectors": {
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    gradient: "from-blue-600 to-blue-800",
  },
  "Consumer & Lifestyle": {
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
    gradient: "from-pink-600 to-pink-800",
  },
  "Emerging Tech": {
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    gradient: "from-emerald-600 to-emerald-800",
  },
};

export const allIndustries = [
  // ─── Core Sectors ────────────────────────────────────────────────────────
  {
    slug: "healthcare",
    label: "Healthcare",
    href: "/industries/healthcare",
    category: "Core Sectors",
    icon: "Activity",
    image:
      "https://res.cloudinary.com/dtrhtdngp/image/upload/v1780909083/ChatGPT_Image_Jun_8_2026_02_26_48_PM_rrsvrn.png",
    description: "Healthcare Software Development for Modern Care Delivery.",

    details: {
      heroTag: "Healthcare Technology Solutions",
      heroTitle: "Transforming Healthcare Through Technology",

      overview:
        "Alomonx Technology helps hospitals, clinics, healthcare startups, telemedicine providers, and healthcare organizations accelerate digital transformation with secure, scalable healthcare solutions that improve efficiency, patient engagement, and clinical outcomes.",
      fullOverview: {
        title: "Healthcare, Expertly Delivered",
        overview: `
The healthcare industry is rapidly evolving with increasing patient expectations, growing data volumes, regulatory requirements, and the demand for digital-first healthcare services.

Our healthcare technology solutions enable providers to streamline operations, enhance patient care, and make data-driven decisions.

    `,
      },

      industryChallenges: [
        "Managing patient records efficiently",
        "Reducing administrative workload",
        "Appointment scheduling inefficiencies",
        "Limited patient engagement",
        "Data security and compliance concerns",
        "Fragmented healthcare systems",
        "Lack of real-time analytics",
        "Growing demand for telemedicine services",
      ],

      solutions: [
        {
          title: "Hospital Management Systems",
          description:
            "Comprehensive platforms for patient registration, billing, inventory, staff management, and hospital operations.",
          image:
            "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop",
        },
        {
          title: "Electronic Medical Records (EMR/EHR)",
          description:
            "Secure digital records that improve patient data accessibility, accuracy, and continuity of care.",
          image:
            "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=1200&auto=format&fit=crop",
        },
        {
          title: "Appointment Scheduling Platforms",
          description:
            "Online booking systems with automated reminders and calendar management.",
          image:
            "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1200&auto=format&fit=crop",
        },
        {
          title: "Telemedicine Solutions",
          description:
            "Virtual consultation platforms with video calling, prescriptions, and remote patient monitoring.",
          image:
            "https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=1200&auto=format&fit=crop",
        },
        {
          title: "Healthcare Mobile Apps",
          description:
            "Patient and provider applications for appointments, reports, notifications, and health tracking.",
          image:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
        },
        {
          title: "Patient Portals",
          description:
            "Self-service platforms for accessing medical records, prescriptions, appointments, and payments.",
          image:
            "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop",
        },
        {
          title: "AI-Powered Healthcare Solutions",
          description:
            "AI-driven diagnostics support, predictive analytics, patient risk assessment, and intelligent automation.",
          image:
            "https://images.unsplash.com/photo-1535378917042-10a22c95931a?q=80&w=1200&auto=format&fit=crop",
        },
        {
          title: "Healthcare Analytics Dashboards",
          description:
            "Real-time dashboards for operational insights, patient trends, and performance monitoring.",
          image:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
        },
      ],

      technologies: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "React.js",
        "Next.js",
        "Angular",
        "TypeScript",
        "Node.js",
        "Express.js",
        "Python",
        "Django",
        "Spring Boot",
        "Flutter",
        "React Native",
        "AWS",
        "Docker",
        "Kubernetes",
        "OpenAI",
        "TensorFlow",
        "PostgreSQL",
        "MongoDB",
        "Firebase",
        "GraphQL",
        "REST API",
        "Stripe",
        "PostgreSQL",
        "MongoDB",
        "Razorpay",
      ],

      benefits: [
        "Improved patient experience",
        "Faster healthcare operations",
        "Reduced administrative costs",
        "Enhanced data security",
        "Better clinical decision-making",
        "Increased operational efficiency",
        "Scalable digital healthcare platforms",
        "Real-time business insights",
      ],

      useCases: [
        {
          title: "Multi-Specialty Hospitals",
          image:
            "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Clinics & Medical Practices",
          image:
            "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Diagnostic & Pathology Centers",
          image:
            "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Telemedicine Platforms",
          image:
            "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Healthcare Startups",
          image:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Wellness & Fitness Platforms",
          image:
            "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Home Healthcare Services",
          image:
            "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Medical Research Organizations",
          image:
            "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80",
        },
      ],

      whyChooseUs: [
        {
          title: "Healthcare-Focused Software Expertise",
          description:
            "Extensive experience building healthcare platforms, patient management systems, telemedicine solutions, and digital health applications tailored to industry requirements.",
          image:
            "https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&w=1200&q=80", // Doctor using digital healthcare system
        },
        {
          title: "Secure & Scalable Solutions",
          description:
            "Healthcare applications designed with enterprise-grade security, compliance standards, and scalable architecture to support growing organizations.",
          image:
            "https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&w=1200&q=80", // Cybersecurity / data protection
        },
        {
          title: "Custom Healthcare Application Development",
          description:
            "Tailor-made healthcare software solutions built to match unique workflows, operational needs, and patient engagement requirements.",
          image:
            "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=1200&q=80", // Medical software dashboard
        },
        {
          title: "AI-Powered Innovation",
          description:
            "Leveraging artificial intelligence for predictive analytics, intelligent automation, clinical insights, and enhanced patient experiences.",
          image:
            "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?auto=format&fit=crop&w=1200&q=80", // AI in healthcare
        },
        {
          title: "Cloud-Based Architecture",
          description:
            "Modern cloud infrastructure that enables secure data access, high availability, seamless collaboration, and cost-effective scalability.",
          image:
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80", // Cloud infrastructure
        },
        {
          title: "End-to-End Development & Support",
          description:
            "From strategy and design to deployment, maintenance, and continuous improvements, we manage the complete development lifecycle.",
          image:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80", // Project team collaboration
        },
        {
          title: "Seamless Third-Party Integrations",
          description:
            "Integration with EHR/EMR systems, payment gateways, healthcare APIs, telemedicine platforms, and other essential healthcare technologies.",
          image:
            "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80", // Connected healthcare systems
        },
      ],

      faqs: [
        {
          question: "Do you develop custom healthcare software?",
          answer:
            "Yes, we build tailored healthcare solutions based on your operational requirements.",
        },
        {
          question: "Can you develop telemedicine platforms?",
          answer:
            "Yes, we create secure telemedicine applications with video consultation and patient management features.",
        },
        {
          question: "Do you provide mobile healthcare applications?",
          answer:
            "Yes, we develop Android, iOS, and cross-platform healthcare apps.",
        },
        {
          question: "Can AI be integrated into healthcare systems?",
          answer:
            "Yes, we implement AI solutions for analytics, automation, and intelligent healthcare workflows.",
        },
      ],

      cta: {
        title: "Ready to Digitally Transform Your Healthcare Organization?",
        description:
          "Partner with Alomonx Technology to build secure, scalable, and future-ready healthcare solutions that enhance patient care and operational efficiency.",
        buttonText: "Contact Us Today for a Free Consultation",
        footer:
          "Connect with our team through the footer contact form to discuss your healthcare technology requirements.",
      },

      seoKeywords: [
        "Healthcare Software Development",
        "Hospital Management System",
        "Healthcare Technology Solutions",
        "Medical Software Development",
      ],

      banner: {
        title: "Healthcare Technology Built for Reliability, Security & Growth",
        description:
          "We help healthcare organizations modernize operations with custom software, interoperable systems, patient-centric platforms, and intelligent healthcare solutions that improve outcomes and efficiency.",
        bannerImage: "/banner.jpeg",
      },
    },
  },
  {
    slug: "education",
    label: "Education",
    href: "/industries/education",
    category: "Core Sectors",
    icon: "GraduationCap",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    description:
      "Education Technology Solutions for Modern Learning Institutions.",

    details: {
      heroTag: "Education Technology Solutions",
      heroTitle: "Empowering Digital Learning Through Innovative Technology",

      overview:
        "Alomonx Technology helps schools, colleges, universities, coaching institutes, EdTech startups, and online learning platforms accelerate digital transformation through scalable and engaging education technology solutions.",

      fullOverview: {
        title: "Smart Education Technology Solutions for Modern Institutions",
        overview: `
The education sector is rapidly embracing digital learning, remote education, AI-driven personalization, and data-driven decision-making. Institutions need modern technology solutions to deliver better learning experiences and operational efficiency.

Our education technology solutions help institutions improve student engagement, streamline administration, and enhance learning outcomes through innovative digital platforms.
      `,
      },

      industryChallenges: [
        "Manual administrative processes",
        "Limited student engagement",
        "Inefficient communication systems",
        "Managing online and hybrid learning",
        "Tracking student performance",
        "Data management and security concerns",
        "Scaling digital education platforms",
        "Lack of personalized learning experiences",
      ],

      solutions: [
        {
          title: "Learning Management Systems (LMS)",
          description:
            "Centralized platforms for course delivery, assignments, assessments, and student management.",
          image:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Student Information Systems (SIS)",
          description:
            "Manage admissions, attendance, records, fees, and academic performance efficiently.",
          image:
            "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "E-Learning Platforms",
          description:
            "Interactive online learning portals with video courses, quizzes, certifications, and progress tracking.",
          image:
            "https://images.unsplash.com/photo-1588702547919-26089e690ecc?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Mobile Learning Apps",
          description:
            "Educational mobile applications for students, teachers, and parents to learn anytime, anywhere.",
          image:
            "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Virtual Classroom Solutions",
          description:
            "Live classes, webinars, screen sharing, collaborative learning, and interactive teaching tools.",
          image:
            "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "AI-Powered Learning Solutions",
          description:
            "Personalized learning recommendations, AI tutors, automated assessments, and predictive analytics.",
          image:
            "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Education Analytics Dashboards",
          description:
            "Real-time insights into student performance, engagement, attendance, and institutional growth.",
          image:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
        },
      ],

      technologies: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "React.js",
        "Next.js",
        "Angular",
        "TypeScript",
        "Node.js",
        "Express.js",
        "Python",
        "Django",
        "Spring Boot",
        "Flutter",
        "React Native",
        "AWS",
        "Docker",
        "Kubernetes",
        "OpenAI",
        "TensorFlow",
        "MongoDB",
        "PostgreSQL",
        "Firebase",
        "GraphQL",
        "REST API",
        "Stripe",
        "Razorpay",
        "Power BI",
      ],

      benefits: [
        "Enhanced student engagement",
        "Improved learning outcomes",
        "Streamlined administration",
        "Better communication and collaboration",
        "Personalized learning experiences",
        "Scalable digital education platforms",
        "Data-driven decision-making",
        "Improved operational efficiency",
      ],

      useCases: [
        {
          title: "Schools & K-12 Institutions",
          image:
            "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Colleges & Universities",
          image:
            "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Coaching & Training Centers",
          image:
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "EdTech Startups",
          image:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Online Learning Platforms",
          image:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Corporate Training Organizations",
          image:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Skill Development Institutes",
          image:
            "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
        },
      ],

      whyChooseUs: [
        {
          title: "Education-Focused Technology Expertise",
          description:
            "Extensive experience building LMS platforms, student portals, virtual classrooms, and digital education ecosystems.",
          image:
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Custom EdTech Software Development",
          description:
            "Tailored educational software solutions designed to meet unique institutional and learning requirements.",
          image:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "AI-Powered Learning Solutions",
          description:
            "Leverage artificial intelligence for personalized learning, intelligent assessments, and predictive analytics.",
          image:
            "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Scalable Cloud-Based Platforms",
          description:
            "Cloud-native education systems built for performance, security, and future growth.",
          image:
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Mobile-First Learning Experiences",
          description:
            "Deliver seamless learning experiences across smartphones, tablets, and desktop devices.",
          image:
            "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "End-to-End Development & Support",
          description:
            "From strategy and design to deployment and maintenance, we manage the complete product lifecycle.",
          image:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
        },
      ],

      faqs: [
        {
          question: "Do you develop custom LMS platforms?",
          answer:
            "Yes, we build customized Learning Management Systems tailored to institutional needs.",
        },
        {
          question: "Can you create online learning applications?",
          answer: "Yes, we develop web and mobile-based e-learning platforms.",
        },
        {
          question: "Do you provide AI-powered education solutions?",
          answer:
            "Yes, we integrate AI for personalized learning, assessments, and student analytics.",
        },
        {
          question: "Can existing systems be modernized?",
          answer:
            "Absolutely. We help educational institutions upgrade and digitize legacy systems.",
        },
      ],

      cta: {
        title: "Transform Education with Technology",
        description:
          "Partner with Alomonx Technology to build innovative, scalable, and future-ready education solutions that enhance learning experiences and operational efficiency.",
        buttonText: "Contact Us Today for a Free Consultation",
        footer:
          "Connect with our team through the footer contact form to discuss your education technology requirements.",
      },

      seoKeywords: [
        "Education Software Development",
        "EdTech Solutions",
        "Learning Management System",
        "Education Technology Solutions",
        "E-Learning Platform Development",
      ],

      banner: {
        title: "Building Future-Ready Digital Learning Ecosystems",
        description:
          "We help educational institutions modernize learning experiences with scalable platforms, AI-powered solutions, mobile applications, and cloud-based education technologies.",
        bannerImage:
          "https://res.cloudinary.com/dtrhtdngp/image/upload/q_auto/f_auto/v1781344580/ChatGPT_Image_Jun_13_2026_03_26_00_PM_xegjzo.png",
      },
    },
  },
  {
    slug: "finance",
    label: "Finance",
    href: "/industries/finance",
    category: "Core Sectors",
    icon: "Landmark",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
    description:
      "Secure Financial Technology Solutions for Modern Financial Institutions.",
    details: {
      heroTag: "Financial Technology Solutions",
      heroTitle: "Driving Digital Transformation in Financial Services",
      overview:
        "Alomonx Technology helps banks, NBFCs, fintech startups, insurance companies, investment firms, and financial institutions modernize operations through innovative digital solutions.",
      fullOverview: {
        title: "Secure, Scalable & Intelligent Financial Technology Solutions",
        overview: ` The financial sector is rapidly evolving with digital banking, mobile payments, online lending, and AI-driven financial services becoming the new standard. Organizations need reliable technology solutions to stay competitive, ensure compliance, and deliver seamless customer experiences. Our financial technology solutions help institutions improve operational efficiency, strengthen security, enhance customer engagement, and accelerate business growth through modern digital platforms. `,
      },
      industryChallenges: [
        "Manual and time-consuming financial processes",
        "Increasing cybersecurity risks",
        "Complex regulatory compliance requirements",
        "Poor customer digital experiences",
        "Data management and reporting challenges",
        "Limited operational visibility",
        "Growing demand for digital financial services",
        "Fraud detection and risk management challenges",
      ],
      solutions: [
        {
          title: "Digital Banking Platforms",
          description:
            "Modern web and mobile banking solutions that enable customers to manage accounts, transfers, payments, and financial services from anywhere.",
          image:
            "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "FinTech Application Development",
          description:
            "Custom fintech platforms for payments, lending, investments, wealth management, and financial planning.",
          image:
            "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Loan & Credit Management Systems",
          description:
            "Automated solutions for loan applications, approvals, credit assessments, underwriting, and repayment tracking.",
          image:
            "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Insurance Management Solutions",
          description:
            "Digital platforms for policy management, claims processing, customer onboarding, and compliance reporting.",
          image:
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Financial Mobile Applications",
          description:
            "Secure mobile apps that provide convenient access to banking, payments, investments, and personal finance tools.",
          image:
            "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "AI-Powered Financial Solutions",
          description:
            "Intelligent systems for fraud detection, risk assessment, customer insights, forecasting, and process automation.",
          image:
            "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Financial Analytics Dashboards",
          description:
            "Real-time dashboards that help organizations monitor performance, track KPIs, manage risks, and make data-driven decisions.",
          image:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
        },
      ],
      technologies: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "React.js",
        "Next.js",
        "Angular",
        "TypeScript",
        "Node.js",
        "Express.js",
        "Python",
        "Django",
        "Spring Boot",
        "Flutter",
        "React Native",
        "AWS",
        "Azure",
        "Docker",
        "Kubernetes",
        "OpenAI",
        "TensorFlow",
        "PostgreSQL",
        "MongoDB",
        "Redis",
        "GraphQL",
        "REST API",
        "Stripe",
        "Razorpay",
        "Power BI",
      ],
      benefits: [
        "Enhanced customer experience",
        "Improved security and compliance",
        "Faster financial operations",
        "Reduced operational costs",
        "Better risk management",
        "Increased business efficiency",
        "Real-time reporting and insights",
        "Scalable digital platforms",
      ],
      useCases: [
        {
          title: "Banks & Financial Institutions",
          image:
            "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "NBFCs",
          image:
            "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "FinTech Startups",
          image:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Insurance Companies",
          image:
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Investment & Wealth Management Firms",
          image:
            "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Lending Platforms",
          image:
            "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Payment Service Providers",
          image:
            "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80",
        },
      ],
      whyChooseUs: [
        {
          title: "Financial Industry Expertise",
          description:
            "Deep understanding of banking, fintech, lending, insurance, and investment management workflows and compliance requirements.",
          image:
            "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Secure & Compliant Solutions",
          description:
            "Applications built with enterprise-grade security standards, encryption, and regulatory compliance in mind.",
          image:
            "https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Custom FinTech Development",
          description:
            "Tailored financial platforms designed to align with your unique business processes and customer needs.",
          image:
            "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "AI-Powered Innovation",
          description:
            "Leverage artificial intelligence for fraud detection, risk analysis, automation, customer intelligence, and predictive insights.",
          image:
            "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Cloud-Native Architecture",
          description:
            "Scalable cloud infrastructure that supports high availability, security, performance, and future growth.",
          image:
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "End-to-End Development & Support",
          description:
            "From strategy and design to deployment and ongoing support, we manage the complete development lifecycle.",
          image:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Seamless Third-Party Integrations",
          description:
            "Integration with payment gateways, banking APIs, KYC systems, CRM platforms, and financial data providers.",
          image:
            "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
        },
      ],
      faqs: [
        {
          question: "Do you develop custom fintech applications?",
          answer:
            "Yes, we build tailored fintech solutions for payments, lending, investments, and digital banking.",
        },
        {
          question: "Can you integrate AI into financial systems?",
          answer:
            "Absolutely. We develop AI-powered solutions for fraud detection, risk analysis, automation, and customer intelligence.",
        },
        {
          question: "Do you provide mobile banking and finance apps?",
          answer:
            "Yes, we create secure and user-friendly financial mobile applications for Android and iOS platforms.",
        },
        {
          question: "Can existing financial software be modernized?",
          answer:
            "Yes, we help organizations upgrade legacy systems and migrate to modern cloud-based platforms.",
        },
      ],
      cta: {
        title: "Transform Financial Services with Technology",
        description:
          "Partner with Alomonx Technology to build secure, innovative, and scalable financial solutions that drive efficiency, enhance customer experiences, and support long-term business success.",
        buttonText: "Contact Us Today for a Free Consultation",
        footer:
          "Connect with our team through the footer contact form to discuss your finance technology requirements.",
      },
      seoKeywords: [
        "Financial Software Development",
        "FinTech Solutions",
        "Digital Banking Platform",
        "Financial Technology Solutions",
        "Banking Software Development",
      ],
      banner: {
        title: "Financial Technology Built for Security, Compliance & Growth",
        description:
          "We help financial organizations modernize operations with secure digital platforms, AI-powered solutions, cloud infrastructure, and intelligent financial technologies that drive innovation and business growth.",
        bannerImage:
          "https://res.cloudinary.com/dtrhtdngp/image/upload/q_auto/f_auto/v1781344728/ChatGPT_Image_Jun_13_2026_03_28_23_PM_apfdjz.png",
      },
    },
  },

  {
    slug: "politics",
    label: "Political & Election Campaign",
    href: "/industries/politics",
    category: "Core Sectors",
    icon: "Vote",
    image:
      "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80",
    description:
      "Digital Technology Solutions for Political Campaigns, Public Engagement & Election Management.",
    details: {
      heroTag: "Political Campaign Technology Solutions",
      heroTitle: "Empowering Modern Political Campaigns Through Technology",
      overview:
        "Alomonx Technology helps political candidates, political parties, campaign teams, public representatives, and government organizations leverage technology to connect with voters, manage campaigns efficiently, and build stronger public engagement.",
      fullOverview: {
        title:
          "Digital Solutions for Political Leaders, Parties & Election Campaigns",
        overview: ` Modern political campaigns require a strong digital presence, data-driven decision-making, voter outreach, and real-time communication. We provide technology solutions that help political organizations engage supporters, manage campaign operations, improve voter outreach, and maximize campaign impact through innovative digital platforms. `,
      },
      industryChallenges: [
        "Limited voter engagement",
        "Inefficient campaign management",
        "Lack of digital presence",
        "Poor volunteer coordination",
        "Difficulty managing voter data",
        "Limited campaign performance tracking",
        "Slow communication with constituents",
        "Managing large-scale outreach activities",
      ],
      solutions: [
        {
          title: "Political Campaign Websites",
          description:
            "Professional websites for candidates, political parties, election campaigns, and public outreach initiatives.",
          image:
            "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Voter Management Systems",
          description:
            "Centralized platforms for voter data management, constituency tracking, outreach activities, and supporter engagement.",
          image:
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Digital Campaign Management",
          description:
            "Tools for campaign planning, volunteer coordination, event scheduling, and campaign execution.",
          image:
            "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Mobile Apps for Political Campaigns",
          description:
            "Mobile applications for voter engagement, membership management, campaign updates, and supporter communication.",
          image:
            "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Social Media & Digital Outreach",
          description:
            "Technology-driven solutions for voter awareness, branding, engagement campaigns, and digital communication.",
          image:
            "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "AI-Powered Campaign Solutions",
          description:
            "AI-driven voter sentiment analysis, audience segmentation, content generation, campaign forecasting, and engagement insights.",
          image:
            "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Analytics & Reporting Dashboards",
          description:
            "Real-time dashboards for monitoring campaign performance, voter engagement, outreach effectiveness, and strategic decision-making.",
          image:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
        },
      ],
      // technologies: [
      //   "HTML5",
      //   "CSS3",
      //   "JavaScript",
      //   "React.js",
      //   "Next.js",
      //   "Angular",
      //   "TypeScript",
      //   "Node.js",
      //   "Express.js",
      //   "Python",
      //   "Django",
      //   "Spring Boot",
      //   "Flutter",
      //   "React Native",
      //   "AWS",
      //   "Azure",
      //   "Docker",
      //   "Kubernetes",
      //   "OpenAI",
      //   "TensorFlow",
      //   "MongoDB",
      //   "PostgreSQL",
      //   "Firebase",
      //   "GraphQL",
      //   "REST API",
      //   "Power BI",
      //   "Google Analytics",
      // ],
      benefits: [
        "Increased voter engagement",
        "Stronger digital presence",
        "Better campaign coordination",
        "Data-driven decision making",
        "Improved public communication",
        "Efficient volunteer management",
        "Real-time campaign insights",
        "Scalable campaign operations",
      ],
      useCases: [
        {
          title: "Election Campaigns",
          image:
            "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Political Parties",
          image:
            "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "MLA & MP Campaigns",
          image:
            "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Local Body Elections",
          image:
            "https://images.unsplash.com/photo-1494172961521-33799ddd43a5?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Public Representatives",
          image:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Government Outreach Programs",
          image:
            "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
        },
      ],
      whyChooseUs: [
        {
          title: "Political Technology Expertise",
          description:
            "Extensive experience building digital platforms, voter engagement systems, campaign management tools, and outreach solutions.",
          image:
            "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Data-Driven Campaign Strategies",
          description:
            "Leverage analytics, voter insights, and campaign performance metrics to optimize engagement and decision-making.",
          image:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "AI-Powered Campaign Innovation",
          description:
            "Advanced AI capabilities for audience targeting, voter sentiment analysis, content recommendations, and campaign intelligence.",
          image:
            "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Scalable Digital Infrastructure",
          description:
            "Cloud-based platforms designed to handle large-scale campaign operations, supporter engagement, and data management.",
          image:
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Multi-Channel Voter Engagement",
          description:
            "Connect with supporters through websites, mobile apps, email campaigns, SMS, and social media platforms.",
          image:
            "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "End-to-End Campaign Support",
          description:
            "From strategy and development to deployment, analytics, and optimization, we support the complete campaign lifecycle.",
          image:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
        },
      ],
      faqs: [
        {
          question: "Do you provide election campaign technology solutions?",
          answer:
            "Yes, we develop digital platforms, campaign websites, mobile apps, and voter management systems.",
        },
        {
          question: "Can you manage political digital campaigns?",
          answer:
            "Yes, we provide end-to-end digital campaign strategy, social media management, and voter engagement solutions.",
        },
        {
          question: "Do you offer campaign analytics?",
          answer:
            "Yes, we provide dashboards and analytics tools to track campaign performance and voter outreach.",
        },
        {
          question: "Can you build custom voter engagement platforms?",
          answer:
            "Yes, we develop tailored voter engagement and supporter management solutions based on campaign requirements.",
        },
      ],
      cta: {
        title: "Build a Smarter Political Campaign",
        description:
          "Partner with Alomonx Technology to leverage technology, data, and digital innovation for successful political campaigns and effective public engagement.",
        buttonText: "Contact Us Today for a Free Consultation",
        footer:
          "Connect with our team through the footer contact form to discuss your political campaign technology requirements.",
      },
      seoKeywords: [
        "Political Campaign Technology",
        "Election Campaign Management Software",
        "Political Digital Marketing",
        "Voter Management System",
        "Political Technology Solutions",
      ],
      banner: {
        title:
          "Technology-Driven Political Campaigns Built for Engagement & Impact",
        description:
          "We help political organizations strengthen voter engagement, streamline campaign operations, leverage data analytics, and build impactful digital outreach strategies through innovative technology solutions.",
        bannerImage:
          "https://res.cloudinary.com/dtrhtdngp/image/upload/q_auto/f_auto/v1781344982/ChatGPT_Image_Jun_13_2026_03_32_46_PM_davr13.png",
      },
    },
  },

  {
    slug: "ecommerce",
    label: "E-Commerce",
    href: "/industries/ecommerce",
    category: "Consumer & Lifestyle",
    icon: "ShoppingCart",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
    description: "Scalable E-Commerce Solutions for Modern Online Businesses.",
    details: {
      heroTag: "E-Commerce Technology Solutions",
      heroTitle: "Accelerating Online Retail Growth Through Technology",
      overview:
        "Alomonx Technology helps e-commerce brands, online retailers, D2C businesses, marketplaces, wholesalers, and startups build scalable digital commerce platforms that drive sales, improve customer experiences, and streamline business operations.",
      fullOverview: {
        title: "Powerful E-Commerce Solutions for Modern Businesses",
        overview: ` The e-commerce industry is evolving rapidly as customers expect seamless shopping experiences across web and mobile platforms. Businesses need modern, secure, and high-performing digital solutions to stay competitive, improve customer satisfaction, and scale efficiently in the digital marketplace. Our e-commerce technology solutions help businesses increase conversions, streamline operations, optimize customer journeys, and maximize online revenue. `,
      },
      industryChallenges: [
        "Low online conversions",
        "Poor user experience",
        "Cart abandonment issues",
        "Inventory management complexities",
        "Limited customer engagement",
        "Payment and security concerns",
        "Difficulty scaling operations",
        "Managing multi-channel sales efficiently",
      ],
      solutions: [
        {
          title: "Custom E-Commerce Development",
          description:
            "Tailored online stores designed for performance, scalability, user experience, and business growth.",
          image:
            "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Multi-Vendor Marketplace Platforms",
          description:
            "Marketplace solutions that connect multiple sellers and buyers on a single scalable platform.",
          image:
            "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Mobile Commerce Applications",
          description:
            "Feature-rich Android and iOS shopping applications that deliver seamless mobile shopping experiences.",
          image:
            "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Inventory & Order Management Systems",
          description:
            "Automated tools to manage products, stock levels, inventory tracking, orders, and fulfillment processes.",
          image:
            "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Payment Gateway Integration",
          description:
            "Secure payment solutions supporting multiple payment methods, wallets, subscriptions, and transactions.",
          image:
            "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "AI-Powered E-Commerce Solutions",
          description:
            "Personalized product recommendations, customer behavior analysis, intelligent search, and automation.",
          image:
            "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Analytics & Business Intelligence Dashboards",
          description:
            "Real-time insights into sales performance, customer behavior, inventory trends, and business growth.",
          image:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
        },
      ],
      technologies: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "React.js",
        "Next.js",
        "Angular",
        "TypeScript",
        "Node.js",
        "Express.js",
        "Python",
        "Django",
        "Spring Boot",
        "Flutter",
        "React Native",
        "Shopify",
        "WooCommerce",
        "Magento",
        "AWS",
        "Azure",
        "Docker",
        "Kubernetes",
        "OpenAI",
        "TensorFlow",
        "PostgreSQL",
        "MongoDB",
        "Redis",
        "GraphQL",
        "REST API",
        "Stripe",
        "Razorpay",
        "Power BI",
      ],
      benefits: [
        "Increased online sales",
        "Better customer experience",
        "Higher conversion rates",
        "Improved inventory control",
        "Enhanced customer retention",
        "Secure and scalable platforms",
        "Data-driven business decisions",
        "Faster business growth",
      ],
      useCases: [
        {
          title: "D2C Brands",
          image:
            "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Fashion & Apparel Stores",
          image:
            "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Electronics Retailers",
          image:
            "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Grocery & Food Delivery Platforms",
          image:
            "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Beauty & Cosmetic Brands",
          image:
            "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "B2B E-Commerce Businesses",
          image:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Multi-Vendor Marketplaces",
          image:
            "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
        },
      ],
      whyChooseUs: [
        {
          title: "E-Commerce Development Expertise",
          description:
            "Extensive experience building online stores, marketplaces, shopping apps, and digital commerce platforms for various industries.",
          image:
            "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Conversion-Focused Solutions",
          description:
            "Platforms optimized for user experience, customer engagement, conversion rates, and revenue growth.",
          image:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "AI-Powered Commerce Innovation",
          description:
            "Leverage artificial intelligence for personalization, recommendations, automation, and customer insights.",
          image:
            "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Scalable Cloud Infrastructure",
          description:
            "Cloud-native platforms designed for performance, reliability, security, and future business growth.",
          image:
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Secure Payment & Data Protection",
          description:
            "Robust security measures, encrypted transactions, fraud prevention, and compliance-focused architecture.",
          image:
            "https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "End-to-End Development & Support",
          description:
            "From strategy and design to deployment, maintenance, and continuous optimization, we support the entire commerce lifecycle.",
          image:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Omnichannel Commerce Solutions",
          description:
            "Integrate online stores, mobile apps, marketplaces, inventory systems, and payment gateways into a unified ecosystem.",
          image:
            "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
        },
      ],
      faqs: [
        {
          question: "Do you build custom e-commerce websites?",
          answer:
            "Yes, we develop fully customized e-commerce platforms tailored to your business goals.",
        },
        {
          question: "Can you develop marketplace platforms?",
          answer:
            "Yes, we build multi-vendor marketplaces with seller, customer, and admin management features.",
        },
        {
          question: "Do you provide mobile shopping apps?",
          answer:
            "Yes, we create Android and iOS e-commerce applications for seamless shopping experiences.",
        },
        {
          question: "Can AI be integrated into e-commerce platforms?",
          answer:
            "Absolutely. We implement AI for recommendations, personalization, customer insights, and automation.",
        },
      ],
      cta: {
        title: "Grow Your Online Business with Alomonx",
        description:
          "Partner with Alomonx Technology to build secure, scalable, and customer-focused e-commerce solutions that drive growth and maximize revenue.",
        buttonText: "Contact Us Today for a Free Consultation",
        footer:
          "Connect with our team through the footer contact form to discuss your e-commerce technology requirements.",
      },
      seoKeywords: [
        "E-Commerce Development",
        "Custom E-Commerce Solutions",
        "Online Store Development",
        "E-Commerce Software Development",
        "Marketplace Development",
        "E-Commerce Technology Solutions",
      ],
      banner: {
        title:
          "E-Commerce Technology Built for Growth, Performance & Customer Experience",
        description:
          "We help online retailers, D2C brands, and marketplaces scale faster with custom e-commerce platforms, mobile commerce apps, AI-powered solutions, and intelligent business automation.",
        bannerImage:
          "https://res.cloudinary.com/dtrhtdngp/image/upload/q_auto/f_auto/v1781345377/ChatGPT_Image_Jun_13_2026_03_39_14_PM_srbfqz.png",
      },
    },
  },
  {
    slug: "restaurants",
    label: "Restaurant",
    href: "/industries/restaurants",
    category: "Consumer & Lifestyle",
    icon: "UtensilsCrossed",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    description:
      "Smart Restaurant Technology Solutions for Modern Food Businesses.",
    details: {
      heroTag: "Restaurant Technology Solutions",
      heroTitle: "Transforming Restaurants with Smart Digital Solutions",
      overview:
        "Alomonx Technology helps restaurants, cafes, cloud kitchens, food delivery startups, bakeries, and hospitality businesses streamline operations, improve customer experiences, and increase revenue through innovative digital solutions.",
      fullOverview: {
        title:
          "Technology Solutions for Restaurants, Cafes, Cloud Kitchens & Food Businesses",
        overview: ` The restaurant industry is becoming increasingly digital, with customers expecting online ordering, fast service, digital payments, and personalized experiences. Modern technology helps restaurants operate more efficiently while delivering exceptional customer satisfaction and driving long-term business growth. Our restaurant technology solutions help food businesses automate operations, improve service quality, increase customer loyalty, and maximize profitability. `,
      },
      industryChallenges: [
        "Manual order management",
        "Long wait times and service delays",
        "Inefficient table reservations",
        "Inventory and stock management issues",
        "Limited customer engagement",
        "Difficulty managing online orders",
        "Lack of business insights and reporting",
        "Managing multi-location operations",
      ],
      solutions: [
        {
          title: "Restaurant Management Systems",
          description:
            "Comprehensive solutions for managing orders, billing, inventory, staff, kitchen workflows, and daily operations.",
          image:
            "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Online Food Ordering Platforms",
          description:
            "Custom websites and mobile applications for online ordering, delivery, takeaway, and customer engagement.",
          image:
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Table Reservation Systems",
          description:
            "Smart reservation platforms that simplify bookings, reduce wait times, and optimize seating management.",
          image:
            "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "POS (Point of Sale) Solutions",
          description:
            "Modern POS systems for billing, payments, order tracking, sales management, and customer transactions.",
          image:
            "https://images.unsplash.com/photo-1556742031-c6961e8560b0?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Food Delivery Applications",
          description:
            "Dedicated delivery applications with real-time tracking, delivery management, notifications, and payment integration.",
          image:
            "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Customer Loyalty Programs",
          description:
            "Digital rewards systems, memberships, promotional offers, referrals, and customer retention solutions.",
          image:
            "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "AI-Powered Restaurant Solutions",
          description:
            "Demand forecasting, customer behavior analysis, menu recommendations, dynamic pricing, and operational automation.",
          image:
            "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Restaurant Analytics Dashboards",
          description:
            "Real-time insights into sales, customer preferences, inventory utilization, staff performance, and business growth.",
          image:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
        },
      ],
      technologies: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "React.js",
        "Next.js",
        "Angular",
        "TypeScript",
        "Node.js",
        "Express.js",
        "Python",
        "Django",
        "Spring Boot",
        "Flutter",
        "React Native",
        "AWS",
        "Azure",
        "Docker",
        "Kubernetes",
        "OpenAI",
        "TensorFlow",
        "PostgreSQL",
        "MongoDB",
        "Redis",
        "Firebase",
        "GraphQL",
        "REST API",
        "Stripe",
        "Razorpay",
        "Power BI",
      ],
      benefits: [
        "Faster order processing",
        "Improved customer experience",
        "Increased online sales",
        "Better inventory management",
        "Higher customer retention",
        "Reduced operational costs",
        "Data-driven decision making",
        "Scalable restaurant operations",
      ],
      useCases: [
        {
          title: "Restaurants",
          image:
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Cafes & Coffee Shops",
          image:
            "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Cloud Kitchens",
          image:
            "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Bakeries",
          image:
            "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Fast Food Chains",
          image:
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Fine Dining Restaurants",
          image:
            "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Food Delivery Startups",
          image:
            "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=1200&q=80",
        },
      ],
      whyChooseUs: [
        {
          title: "Restaurant Industry Expertise",
          description:
            "Extensive experience developing restaurant management systems, food delivery platforms, POS solutions, and customer engagement applications.",
          image:
            "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "End-to-End Restaurant Digitization",
          description:
            "Comprehensive solutions that connect ordering, billing, inventory, delivery, and customer management into one ecosystem.",
          image:
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "AI-Powered Business Intelligence",
          description:
            "Leverage AI for customer insights, demand forecasting, menu optimization, and operational efficiency.",
          image:
            "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Scalable Cloud Infrastructure",
          description:
            "Cloud-native solutions designed to support restaurant growth, multiple locations, and high transaction volumes.",
          image:
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Customer-Centric Experiences",
          description:
            "Build stronger customer relationships through seamless ordering, loyalty programs, personalized offers, and digital engagement.",
          image:
            "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "End-to-End Development & Support",
          description:
            "From planning and development to deployment and ongoing optimization, we manage the complete technology lifecycle.",
          image:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Seamless Third-Party Integrations",
          description:
            "Integrate payment gateways, delivery services, inventory systems, CRM platforms, and marketing tools effortlessly.",
          image:
            "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
        },
      ],
      faqs: [
        {
          question: "Do you develop restaurant management software?",
          answer:
            "Yes, we build customized restaurant management systems tailored to your operational needs.",
        },
        {
          question: "Can you create food delivery applications?",
          answer:
            "Yes, we develop food ordering and delivery platforms for restaurants and cloud kitchens.",
        },
        {
          question: "Do you provide POS and billing solutions?",
          answer:
            "Yes, we offer integrated POS, billing, inventory, and order management systems.",
        },
        {
          question: "Can AI improve restaurant operations?",
          answer:
            "Absolutely. AI can help with customer insights, demand forecasting, personalized offers, and operational efficiency.",
        },
      ],
      cta: {
        title: "Grow Your Restaurant Business with Technology",
        description:
          "Partner with Alomonx Technology to create smart, scalable, and customer-focused restaurant solutions that increase efficiency, boost revenue, and enhance dining experiences.",
        buttonText: "Contact Us Today for a Free Consultation",
        footer:
          "Connect with our team through the footer contact form to discuss your restaurant technology requirements.",
      },
      seoKeywords: [
        "Restaurant Software Development",
        "Restaurant Management System",
        "Food Delivery App Development",
        "Restaurant Technology Solutions",
        "POS Software for Restaurants",
      ],
      banner: {
        title:
          "Restaurant Technology Built for Efficiency, Growth & Exceptional Customer Experiences",
        description:
          "We help restaurants, cafes, cloud kitchens, and food delivery businesses streamline operations, enhance customer engagement, and drive revenue growth through innovative digital solutions.",
        bannerImage:
          "https://res.cloudinary.com/dtrhtdngp/image/upload/q_auto/f_auto/v1781345505/ChatGPT_Image_Jun_13_2026_03_41_29_PM_xflshy.png",
      },
    },
  },
  {
    slug: "events",
    label: "Events",
    href: "/industries/events",
    category: "Consumer & Lifestyle",
    icon: "CalendarDays",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    description:
      "Smart Event Technology Solutions for Modern Event Management & Experiences.",
    details: {
      heroTag: "Event Technology Solutions",
      heroTitle: "Creating Exceptional Event Experiences Through Technology",
      overview:
        "Alomonx Technology helps event management companies, corporate event organizers, wedding planners, exhibition organizers, conferences, trade shows, and entertainment businesses streamline event operations and deliver memorable experiences through innovative technology solutions.",
      fullOverview: {
        title:
          "Digital Solutions for Event Organizers, Agencies & Entertainment Companies",
        overview: ` The events industry is increasingly driven by digital experiences, online registrations, virtual participation, and real-time engagement. Modern technology enables event organizers to manage events efficiently, improve attendee experiences, increase engagement, and maximize event success through intelligent digital solutions. Our event technology platforms help businesses automate operations, simplify coordination, and deliver seamless event experiences across physical, virtual, and hybrid environments. `,
      },
      industryChallenges: [
        "Manual event planning processes",
        "Complex attendee registration management",
        "Ticketing and payment challenges",
        "Poor attendee engagement",
        "Lack of real-time event insights",
        "Communication and coordination issues",
        "Difficulty managing hybrid and virtual events",
        "Managing large-scale event logistics",
      ],
      solutions: [
        {
          title: "Event Management Platforms",
          description:
            "Comprehensive systems for planning, organizing, scheduling, and managing events from start to finish.",
          image:
            "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Event Registration & Ticketing Systems",
          description:
            "Online registration, ticket booking, payment processing, attendee verification, and event access management solutions.",
          image:
            "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Event Mobile Applications",
          description:
            "Custom event apps featuring schedules, networking opportunities, notifications, agendas, and live event updates.",
          image:
            "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Virtual & Hybrid Event Solutions",
          description:
            "Platforms for webinars, virtual conferences, online exhibitions, live streaming, and hybrid event experiences.",
          image:
            "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "CRM & Attendee Management Systems",
          description:
            "Manage attendee data, communications, engagement tracking, lead generation, and post-event follow-ups.",
          image:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "AI-Powered Event Solutions",
          description:
            "Smart attendee recommendations, automated support, sentiment analysis, networking suggestions, and event insights.",
          image:
            "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Event Analytics Dashboards",
          description:
            "Real-time tracking of registrations, attendance, engagement, ticket sales, sponsorship performance, and event success metrics.",
          image:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
        },
      ],
      technologies: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "React.js",
        "Next.js",
        "Angular",
        "TypeScript",
        "Node.js",
        "Express.js",
        "Python",
        "Django",
        "Spring Boot",
        "Flutter",
        "React Native",
        "AWS",
        "Azure",
        "Docker",
        "Kubernetes",
        "OpenAI",
        "TensorFlow",
        "PostgreSQL",
        "MongoDB",
        "Firebase",
        "GraphQL",
        "REST API",
        "Stripe",
        "Razorpay",
        "Power BI",
      ],
      benefits: [
        "Simplified event management",
        "Improved attendee experience",
        "Increased ticket sales and registrations",
        "Better event engagement",
        "Real-time performance monitoring",
        "Streamlined communication",
        "Scalable event operations",
        "Data-driven event planning",
      ],
      useCases: [
        {
          title: "Corporate Events",
          image:
            "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Conferences & Seminars",
          image:
            "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Trade Shows & Exhibitions",
          image:
            "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Weddings & Social Events",
          image:
            "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Concerts & Entertainment Events",
          image:
            "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Virtual & Hybrid Events",
          image:
            "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Event Management Agencies",
          image:
            "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=1200&q=80",
        },
      ],
      whyChooseUs: [
        {
          title: "Event Industry Expertise",
          description:
            "Extensive experience building event management systems, registration platforms, ticketing solutions, and attendee engagement tools.",
          image:
            "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "End-to-End Event Technology Solutions",
          description:
            "Comprehensive platforms covering event planning, registration, attendee engagement, analytics, and post-event management.",
          image:
            "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "AI-Powered Event Innovation",
          description:
            "Leverage artificial intelligence for attendee personalization, networking recommendations, event automation, and actionable insights.",
          image:
            "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Scalable Cloud Infrastructure",
          description:
            "Cloud-native event platforms built for high traffic, real-time interactions, and seamless event experiences.",
          image:
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Enhanced Attendee Engagement",
          description:
            "Interactive features, mobile experiences, networking tools, and personalized communication that increase attendee participation.",
          image:
            "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "End-to-End Development & Support",
          description:
            "From planning and development to deployment, event execution, and continuous optimization, we support the entire event lifecycle.",
          image:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Seamless Third-Party Integrations",
          description:
            "Integrate payment gateways, CRM systems, marketing platforms, video conferencing tools, and analytics solutions effortlessly.",
          image:
            "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
        },
      ],
      faqs: [
        {
          question: "Do you develop event management software?",
          answer:
            "Yes, we build custom event management platforms for organizers, agencies, and enterprises.",
        },
        {
          question: "Can you create event ticketing and registration systems?",
          answer:
            "Absolutely. We develop secure online registration and ticketing platforms with payment integration.",
        },
        {
          question: "Do you support virtual and hybrid events?",
          answer:
            "Yes, we provide technology solutions for virtual conferences, webinars, and hybrid event experiences.",
        },
        {
          question: "Can AI improve event management?",
          answer:
            "Yes, AI can enhance attendee engagement, automate support, provide insights, and optimize event planning.",
        },
      ],
      cta: {
        title: "Power Your Next Event with Technology",
        description:
          "Partner with Alomonx Technology to build innovative event management solutions that streamline operations, improve attendee engagement, and ensure event success.",
        buttonText: "Contact Us Today for a Free Consultation",
        footer:
          "Connect with our team through the footer contact form to discuss your event technology requirements.",
      },
      seoKeywords: [
        "Event Management Software Development",
        "Event Technology Solutions",
        "Event Registration System",
        "Event App Development",
        "Virtual Event Platform Development",
      ],
      banner: {
        title:
          "Event Technology Built for Engagement, Efficiency & Memorable Experiences",
        description:
          "We help event organizers, agencies, and entertainment companies simplify event management, enhance attendee engagement, and deliver successful physical, virtual, and hybrid events through innovative technology solutions.",
        bannerImage:
          "https://res.cloudinary.com/dtrhtdngp/image/upload/q_auto/f_auto/v1781345654/ChatGPT_Image_Jun_13_2026_03_43_55_PM_makf1j.png",
      },
    },
  },
  {
    slug: "social-media",
    label: "Social Media & Digital Marketing",
    href: "/industries/social-media",
    category: "Consumer & Lifestyle",
    icon: "Megaphone",
    image:
      "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=1200&q=80",
    description:
      "Technology Solutions for Social Media Growth, Digital Marketing Automation & Audience Engagement.",
    details: {
      heroTag: "Social Media & Digital Marketing Solutions",
      heroTitle: "Helping Brands Grow Through Digital Innovation",
      overview:
        "Alomonx Technology helps marketing agencies, influencers, content creators, startups, brands, and enterprises build powerful digital ecosystems that enhance audience engagement, streamline marketing operations, and drive measurable business growth.",
      fullOverview: {
        title:
          "Technology Solutions for Social Media Agencies, Creators & Digital-First Businesses",
        overview: ` In today's digital world, social media is one of the most powerful channels for brand awareness, customer engagement, lead generation, and sales. Businesses need modern tools and platforms to manage campaigns, analyze performance, automate marketing efforts, and connect with their audiences effectively. Our digital marketing technology solutions help organizations improve engagement, optimize marketing performance, increase conversions, and build stronger online communities. `,
      },
      industryChallenges: [
        "Low audience engagement",
        "Difficulty managing multiple platforms",
        "Inefficient campaign tracking",
        "Limited marketing automation",
        "Inconsistent content management",
        "Lack of actionable insights",
        "Poor lead generation and conversion tracking",
        "Managing large-scale digital campaigns",
      ],
      solutions: [
        {
          title: "Social Media Management Platforms",
          description:
            "Centralized tools for content scheduling, publishing, audience engagement, social listening, and performance tracking.",
          image:
            "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Influencer & Creator Platforms",
          description:
            "Solutions for influencer discovery, campaign management, creator collaboration, payments, and performance reporting.",
          image:
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Marketing Automation Systems",
          description:
            "Automate lead nurturing, email marketing, customer engagement workflows, and social media interactions.",
          image:
            "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Content Management Solutions",
          description:
            "Manage digital assets, content workflows, approvals, collaboration, and publishing processes efficiently.",
          image:
            "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Social Commerce Platforms",
          description:
            "Integrate social media channels with e-commerce capabilities to drive sales directly from social platforms.",
          image:
            "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "AI-Powered Marketing Solutions",
          description:
            "AI-generated content, audience insights, sentiment analysis, chatbot automation, campaign optimization, and predictive marketing.",
          image:
            "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Analytics & Performance Dashboards",
          description:
            "Real-time reporting on reach, engagement, conversions, ROI, customer journeys, and audience behavior.",
          image:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
        },
      ],
      technologies: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "React.js",
        "Next.js",
        "Angular",
        "TypeScript",
        "Node.js",
        "Express.js",
        "Python",
        "Django",
        "Spring Boot",
        "Flutter",
        "React Native",
        "AWS",
        "Azure",
        "Docker",
        "Kubernetes",
        "OpenAI",
        "TensorFlow",
        "MongoDB",
        "PostgreSQL",
        "Firebase",
        "GraphQL",
        "REST API",
        "Meta APIs",
        "Google Analytics",
        "Power BI",
        "HubSpot",
      ],
      benefits: [
        "Increased brand visibility",
        "Higher audience engagement",
        "Better campaign performance",
        "Improved lead generation",
        "Enhanced customer relationships",
        "Automated marketing workflows",
        "Data-driven decision making",
        "Scalable digital growth",
      ],
      useCases: [
        {
          title: "Digital Marketing Agencies",
          image:
            "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Social Media Management Companies",
          image:
            "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Influencers & Content Creators",
          image:
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Personal Branding Professionals",
          image:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "E-Commerce Brands",
          image:
            "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Startups & Enterprises",
          image:
            "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Media & Entertainment Companies",
          image:
            "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
        },
      ],
      whyChooseUs: [
        {
          title: "Digital Marketing Technology Expertise",
          description:
            "Extensive experience building marketing automation systems, social media platforms, creator ecosystems, and analytics solutions.",
          image:
            "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "AI-Powered Marketing Innovation",
          description:
            "Leverage artificial intelligence for content generation, audience targeting, campaign optimization, and predictive analytics.",
          image:
            "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Multi-Channel Marketing Solutions",
          description:
            "Unified platforms that help manage campaigns, content, engagement, and performance across multiple digital channels.",
          image:
            "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Scalable Cloud Infrastructure",
          description:
            "Cloud-native platforms built to support growing audiences, high traffic, and complex marketing operations.",
          image:
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Advanced Analytics & Insights",
          description:
            "Gain deeper visibility into audience behavior, campaign performance, customer journeys, and ROI metrics.",
          image:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "End-to-End Development & Support",
          description:
            "From strategy and development to deployment, optimization, and ongoing support, we manage the complete technology lifecycle.",
          image:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Seamless Marketing Integrations",
          description:
            "Integrate social media platforms, CRM systems, email marketing tools, advertising networks, and analytics solutions effortlessly.",
          image:
            "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
        },
      ],
      faqs: [
        {
          question: "Do you develop social media management platforms?",
          answer:
            "Yes, we build custom platforms for content scheduling, engagement management, and performance tracking.",
        },
        {
          question: "Can you integrate AI into marketing solutions?",
          answer:
            "Absolutely. We implement AI-powered content generation, audience analysis, chatbot automation, and campaign optimization.",
        },
        {
          question: "Do you build influencer marketing platforms?",
          answer:
            "Yes, we develop platforms that connect brands with creators and simplify campaign management.",
        },
        {
          question: "Can you create analytics dashboards for marketing teams?",
          answer:
            "Yes, we provide real-time dashboards to monitor campaign performance, engagement, leads, and ROI.",
        },
      ],
      cta: {
        title: "Transform Your Digital Presence",
        description:
          "Partner with Alomonx Technology to build innovative social media and marketing technology solutions that increase engagement, strengthen your brand, and accelerate business growth.",
        buttonText: "Contact Us Today for a Free Consultation",
        footer:
          "Connect with our team through the footer contact form to discuss your social media and digital marketing technology requirements.",
      },
      seoKeywords: [
        "Social Media Software Development",
        "Digital Marketing Technology Solutions",
        "Social Media Management Platform",
        "Marketing Automation Software",
        "Influencer Marketing Platform Development",
      ],
      banner: {
        title:
          "Digital Marketing Technology Built for Growth, Engagement & Brand Success",
        description:
          "We help agencies, creators, brands, and enterprises automate marketing operations, increase audience engagement, optimize campaigns, and accelerate growth through innovative digital technology solutions.",
        bannerImage:
          "https://res.cloudinary.com/dtrhtdngp/image/upload/q_auto/f_auto/v1781345757/ChatGPT_Image_Jun_13_2026_03_45_38_PM_tqbm7k.png",
      },
    },
  },
  {
    slug: "ev",
    label: "Electric Vehicle (EV)",
    href: "/industries/ev",
    category: "Emerging Tech",
    icon: "Car",
    image:
      "https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Smart EV Technology Solutions for Sustainable Mobility & Connected Transportation.",
    details: {
      heroTag: "Electric Vehicle Technology Solutions",
      heroTitle: "Accelerating the Future of Sustainable Mobility",
      overview:
        "Alomonx Technology helps EV manufacturers, charging station operators, fleet management companies, mobility startups, battery technology providers, and automotive businesses drive innovation through scalable digital solutions.",
      fullOverview: {
        title:
          "Smart Technology Solutions for EV Startups, Manufacturers & Charging Networks",
        overview: ` The Electric Vehicle industry is transforming transportation through connected vehicles, smart charging infrastructure, battery management systems, and data-driven mobility solutions. Businesses require intelligent technology platforms to optimize operations, enhance efficiency, improve customer experiences, and stay competitive in the rapidly evolving electric mobility ecosystem. Our EV technology solutions help organizations build sustainable, scalable, and future-ready mobility platforms powered by data, AI, IoT, and cloud technologies. `,
      },
      industryChallenges: [
        "Charging infrastructure management",
        "Fleet monitoring and optimization",
        "Battery performance tracking",
        "Vehicle connectivity challenges",
        "Customer engagement and retention",
        "Data management and analytics",
        "Scaling EV operations efficiently",
        "Energy consumption optimization",
      ],
      solutions: [
        {
          title: "EV Charging Management Platforms",
          description:
            "Smart systems for charging station monitoring, user management, payments, billing, and energy consumption tracking.",
          image:
            "https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          title: "Fleet Management Solutions",
          description:
            "Real-time vehicle tracking, route optimization, maintenance scheduling, driver management, and fleet performance monitoring.",
          image:
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "EV Mobile Applications",
          description:
            "Customer applications for charging station discovery, reservations, payments, vehicle insights, and trip planning.",
          image:
            "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Battery Management Systems",
          description:
            "Digital solutions for battery health monitoring, performance analysis, diagnostics, and lifecycle management.",
          image:
            "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Connected Vehicle Platforms",
          description:
            "IoT-enabled systems for vehicle diagnostics, telematics, remote monitoring, and connected mobility experiences.",
          image:
            "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "AI-Powered EV Solutions",
          description:
            "Predictive maintenance, energy optimization, demand forecasting, intelligent analytics, and operational automation.",
          image:
            "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "EV Analytics Dashboards",
          description:
            "Real-time insights into vehicle performance, charging utilization, energy consumption, fleet efficiency, and operational KPIs.",
          image:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
        },
      ],
      technologies: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "React.js",
        "Next.js",
        "Angular",
        "TypeScript",
        "Node.js",
        "Express.js",
        "Python",
        "Django",
        "Spring Boot",
        "Flutter",
        "React Native",
        "AWS",
        "Azure",
        "Docker",
        "Kubernetes",
        "OpenAI",
        "TensorFlow",
        "IoT Platforms",
        "MQTT",
        "PostgreSQL",
        "MongoDB",
        "Firebase",
        "GraphQL",
        "REST API",
        "Power BI",
        "Google Maps API",
      ],
      benefits: [
        "Improved operational efficiency",
        "Better fleet utilization",
        "Enhanced customer experience",
        "Reduced maintenance costs",
        "Optimized energy consumption",
        "Real-time monitoring and reporting",
        "Scalable EV ecosystem management",
        "Data-driven decision making",
      ],
      useCases: [
        {
          title: "EV Manufacturers",
          image:
            "https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          title: "Charging Station Operators",
          image:
            "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "EV Fleet Companies",
          image:
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Mobility Startups",
          image:
            "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Battery Technology Companies",
          image:
            "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Electric Bike & Scooter Platforms",
          image:
            "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Smart Transportation Providers",
          image:
            "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1200&q=80",
        },
      ],
      whyChooseUs: [
        {
          title: "EV Industry Technology Expertise",
          description:
            "Extensive experience building EV software platforms, charging management systems, mobility applications, and connected vehicle solutions.",
          image:
            "https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          title: "AI & IoT-Powered Innovation",
          description:
            "Leverage artificial intelligence and IoT technologies to optimize fleet operations, monitor assets, and improve business performance.",
          image:
            "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Connected Mobility Solutions",
          description:
            "Build seamless ecosystems that connect vehicles, charging stations, users, and operators through intelligent platforms.",
          image:
            "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Scalable Cloud Infrastructure",
          description:
            "Cloud-native architecture designed to support growing EV networks, charging ecosystems, and connected transportation services.",
          image:
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Advanced Analytics & Reporting",
          description:
            "Gain real-time visibility into fleet performance, charging usage, battery health, and operational efficiency.",
          image:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "End-to-End Development & Support",
          description:
            "From product strategy and development to deployment, monitoring, and ongoing enhancements, we support the complete EV technology lifecycle.",
          image:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Seamless Third-Party Integrations",
          description:
            "Integrate charging hardware, telematics systems, payment gateways, mapping services, and enterprise platforms effortlessly.",
          image:
            "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
        },
      ],
      faqs: [
        {
          question: "Do you develop EV charging management software?",
          answer:
            "Yes, we build custom charging station management platforms with monitoring, payment, and analytics capabilities.",
        },
        {
          question: "Can you create EV mobile applications?",
          answer:
            "Absolutely. We develop mobile apps for charging, vehicle tracking, payments, and customer engagement.",
        },
        {
          question: "Do you provide fleet management solutions?",
          answer:
            "Yes, we build intelligent fleet management systems for tracking, optimization, and maintenance management.",
        },
        {
          question: "Can AI improve EV operations?",
          answer:
            "Yes, AI helps with predictive maintenance, battery optimization, energy forecasting, and operational analytics.",
        },
      ],
      cta: {
        title: "Power the Future of Electric Mobility",
        description:
          "Partner with Alomonx Technology to develop smart, scalable, and innovative EV technology solutions that drive efficiency, sustainability, and business growth.",
        buttonText: "Contact Us Today for a Free Consultation",
        footer:
          "Connect with our team through the footer contact form to discuss your EV technology requirements.",
      },
      seoKeywords: [
        "EV Software Development",
        "Electric Vehicle Technology Solutions",
        "EV Charging Management System",
        "Fleet Management Software",
        "EV Mobile App Development",
        "Connected Vehicle Solutions",
      ],
      banner: {
        title:
          "Electric Vehicle Technology Built for Innovation, Sustainability & Growth",
        description:
          "We help EV manufacturers, charging operators, mobility startups, and fleet companies build intelligent digital ecosystems that optimize operations, improve customer experiences, and accelerate the future of sustainable transportation.",
        bannerImage:
          "https://res.cloudinary.com/dtrhtdngp/image/upload/q_auto/f_auto/v1781345889/ChatGPT_Image_Jun_13_2026_03_46_55_PM_sjzvdb.png",
      },
    },
  },
  {
    slug: "agritech",
    label: "Agritech",
    href: "/industries/agritech",
    category: "Emerging Tech",
    icon: "Sprout",
    image:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80",
    description:
      "Smart Agriculture Technology Solutions for Modern Farming & Agribusiness Growth.",
    details: {
      heroTag: "Agritech Technology Solutions",
      heroTitle: "Empowering Agriculture Through Smart Technology",
      overview:
        "Alomonx Technology helps agritech startups, agricultural enterprises, food producers, cooperatives, agri marketplaces, and farming organizations leverage technology to improve productivity, optimize operations, and enable data-driven farming.",
      fullOverview: {
        title: "Digital Solutions for Farmers, Agribusinesses & Agri Startups",
        overview: ` Agriculture is rapidly evolving with the adoption of digital technologies, IoT, AI, automation, and data analytics. Modern agritech solutions help farmers increase yields, reduce operational costs, improve resource utilization, and make smarter farming decisions through real-time insights and intelligent automation. Our agritech platforms connect farmers, suppliers, distributors, and agricultural stakeholders to create a more efficient, sustainable, and profitable agricultural ecosystem. `,
      },
      industryChallenges: [
        "Limited access to real-time farm data",
        "Inefficient crop and resource management",
        "Supply chain inefficiencies",
        "Lack of market connectivity",
        "Weather and risk uncertainties",
        "Manual operational processes",
        "Limited visibility into farm performance",
        "Sustainable resource management challenges",
      ],
      solutions: [
        {
          title: "Farm Management Systems",
          description:
            "Digital platforms for crop planning, field monitoring, resource management, farm operations, and productivity tracking.",
          image:
            "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Agri Marketplace Platforms",
          description:
            "Online marketplaces connecting farmers, suppliers, distributors, wholesalers, and buyers in a unified ecosystem.",
          image:
            "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Agriculture Mobile Applications",
          description:
            "Mobile apps for farm monitoring, advisory services, weather forecasts, crop management, and market information.",
          image:
            "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Supply Chain & Logistics Solutions",
          description:
            "Systems for procurement, inventory management, distribution tracking, logistics optimization, and product traceability.",
          image:
            "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "IoT-Based Smart Farming Solutions",
          description:
            "Connected devices for soil monitoring, irrigation management, equipment tracking, environmental monitoring, and precision agriculture.",
          image:
            "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "AI-Powered Agriculture Solutions",
          description:
            "Crop health analysis, yield prediction, disease detection, weather forecasting, and intelligent farming recommendations.",
          image:
            "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Agritech Analytics Dashboards",
          description:
            "Real-time insights into farm productivity, crop performance, operational efficiency, resource utilization, and business growth.",
          image:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
        },
      ],
      technologies: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "React.js",
        "Next.js",
        "Angular",
        "TypeScript",
        "Node.js",
        "Express.js",
        "Python",
        "Django",
        "Spring Boot",
        "Flutter",
        "React Native",
        "AWS",
        "Azure",
        "Docker",
        "Kubernetes",
        "OpenAI",
        "TensorFlow",
        "IoT Platforms",
        "MQTT",
        "GIS & Mapping Technologies",
        "PostgreSQL",
        "MongoDB",
        "Firebase",
        "GraphQL",
        "REST API",
        "Power BI",
        "Google Maps API",
      ],
      benefits: [
        "Increased agricultural productivity",
        "Better crop management",
        "Reduced operational costs",
        "Improved decision-making",
        "Enhanced supply chain visibility",
        "Higher profitability",
        "Sustainable farming practices",
        "Real-time farm monitoring",
      ],
      useCases: [
        {
          title: "Agritech Startups",
          image:
            "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Farming Cooperatives",
          image:
            "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Food Processing Companies",
          image:
            "https://images.unsplash.com/photo-1573246123716-6b1782bfc499?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Agricultural Enterprises",
          image:
            "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Agri Input Providers",
          image:
            "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Farm-to-Market Platforms",
          image:
            "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Smart Farming Organizations",
          image:
            "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80",
        },
      ],
      whyChooseUs: [
        {
          title: "Agritech Industry Expertise",
          description:
            "Extensive experience building farm management systems, agri marketplaces, smart farming platforms, and agricultural analytics solutions.",
          image:
            "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "AI & IoT-Powered Agriculture Innovation",
          description:
            "Leverage artificial intelligence and IoT technologies for crop monitoring, predictive insights, precision farming, and resource optimization.",
          image:
            "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Connected Agricultural Ecosystems",
          description:
            "Build platforms that connect farmers, suppliers, distributors, buyers, and agricultural service providers seamlessly.",
          image:
            "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Scalable Cloud Infrastructure",
          description:
            "Cloud-native solutions designed to support growing agricultural operations, data-intensive workloads, and large-scale farming ecosystems.",
          image:
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Advanced Analytics & Insights",
          description:
            "Gain real-time visibility into crop performance, farm productivity, operational efficiency, and market trends.",
          image:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "End-to-End Development & Support",
          description:
            "From strategy and development to deployment, monitoring, and continuous improvements, we support the complete agritech lifecycle.",
          image:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Seamless Third-Party Integrations",
          description:
            "Integrate sensors, weather APIs, GIS systems, logistics platforms, payment gateways, and enterprise tools effortlessly.",
          image:
            "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
        },
      ],
      faqs: [
        {
          question: "Do you develop custom agritech software?",
          answer:
            "Yes, we build tailored solutions for farm management, marketplaces, logistics, and agricultural operations.",
        },
        {
          question: "Can you create agriculture mobile apps?",
          answer:
            "Absolutely. We develop apps for farmers, agribusinesses, suppliers, and agricultural service providers.",
        },
        {
          question: "Do you provide AI-based farming solutions?",
          answer:
            "Yes, we implement AI for crop monitoring, disease detection, yield prediction, and farm analytics.",
        },
        {
          question: "Can IoT be integrated into agricultural systems?",
          answer:
            "Yes, we develop IoT-enabled solutions for smart farming, irrigation management, and environmental monitoring.",
        },
      ],
      cta: {
        title: "Transform Agriculture with Technology",
        description:
          "Partner with Alomonx Technology to build innovative agritech solutions that improve productivity, optimize resources, and create a smarter future for agriculture.",
        buttonText: "Contact Us Today for a Free Consultation",
        footer:
          "Connect with our team through the footer contact form to discuss your agritech technology requirements.",
      },
      seoKeywords: [
        "Agritech Software Development",
        "Smart Farming Solutions",
        "Agriculture Technology Solutions",
        "Farm Management Software",
        "Agritech Mobile App Development",
        "AI in Agriculture",
      ],
      banner: {
        title:
          "Agritech Solutions Built for Productivity, Sustainability & Growth",
        description:
          "We help farmers, agribusinesses, cooperatives, and agricultural enterprises leverage AI, IoT, analytics, and cloud technologies to optimize operations, improve yields, and drive sustainable agricultural growth.",
        bannerImage:
          "https://res.cloudinary.com/dtrhtdngp/image/upload/q_auto/f_auto/v1781346106/ChatGPT_Image_Jun_13_2026_03_51_29_PM_tfxx9t.png",
      },
    },
  },
];

export const allIndustryCategories = [
  ...new Set(allIndustries.map((i) => i.category)),
];

export function getIndustryBySlug(slug) {
  return allIndustries.find((i) => i.slug === slug) ?? null;
}
