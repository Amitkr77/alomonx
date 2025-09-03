"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  MessageSquare,
  Share2,
  Twitter,
  Linkedin,
  Instagram,
  Send,
  AlertCircle,
  CheckCircle,
  Tag,
  ChevronUp,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Label } from "@/components/ui/label";

const blogPosts = [
  {
    id: 1,
    title: "The Future of Web Development in 2025",
    slug: "the-future-of-web-development-in-2025",
    excerpt: "Explore emerging trends and technologies shaping the web development landscape.",
    content: `
      <h2>Introduction</h2>
      <p>Web development in 2025 is set to be a transformative year with advancements in AI-driven development, Web3 integration, and enhanced performance optimization. Developers are leveraging tools like Next.js, AI code assistants, and serverless architectures to build faster, more secure, and scalable applications.</p>
      <h3>Key Trends</h3>
      <ul>
        <li><strong>Progressive Web Apps (PWAs):</strong> PWAs are blurring the line between web and native apps, offering offline capabilities and push notifications.</li>
        <li><strong>Real-Time Data Processing:</strong> Technologies like WebSockets and GraphQL enable seamless real-time experiences.</li>
        <li><strong>5G Impact:</strong> Faster networks are enabling richer, more interactive web experiences.</li>
      </ul>
      <p>The rise of low-code platforms is also empowering businesses to create custom solutions with minimal coding expertise. In this article, we dive into these trends and their implications for developers and businesses alike.</p>
    `,
    date: "August 20, 2025",
    category: "Technology",
    image:
      "https://images.unsplash.com/photo-1669023414162-8b0573b9c6b2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHdlYiUyMGRldmVsb3BtZW50fGVufDB8MHwwfHx8MA%3D%3D",
    author: {
      name: "Jane Doe",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
    },
    readingTime: 5,
    comments: 12,
    relatedPosts: [2, 4],
  },
  {
    id: 2,
    title: "Boosting Your Brand with Digital Marketing",
    slug: "boosting-your-brand-with-digital-marketing",
    excerpt: "Learn strategies to enhance your online presence and engage your audience.",
    content: `
      <h2>Introduction</h2>
      <p>Digital marketing in 2025 is all about personalization and data-driven strategies. From AI-powered ad targeting to immersive storytelling through video content, brands are finding new ways to connect with their audiences.</p>
      <h3>Top Strategies</h3>
      <ul>
        <li><strong>Social Media Marketing:</strong> Platforms like TikTok and Instagram are key for engaging younger audiences.</li>
        <li><strong>SEO Optimization:</strong> Advanced keyword strategies and AI-driven content optimization are boosting rankings.</li>
        <li><strong>Email Campaigns:</strong> Personalized email flows increase conversion rates.</li>
      </ul>
      <p>This article explores these trends, providing actionable insights to boost your brand’s visibility and engagement while leveraging analytics and automation to maximize ROI.</p>
    `,
    date: "August 15, 2025",
    category: "Marketing",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1170&auto=format&fit=crop",
    author: {
      name: "John Smith",
      avatar:
        "https://images.unsplash.com/photo-1500648762-418d3f2095c6?q=80&w=100&auto=format&fit=crop",
    },
    readingTime: 7,
    comments: 8,
    relatedPosts: [1, 3],
  },
  {
    id: 3,
    title: "Designing User-Centric Web Applications",
    slug: "designing-user-centric-web-applications",
    excerpt: "Discover best practices for creating intuitive and engaging web experiences.",
    content: `
      <h2>Introduction</h2>
      <p>User-centric design is at the heart of successful web applications. This article covers best practices for creating intuitive interfaces, including user research, wireframing, and iterative testing.</p>
      <h3>Best Practices</h3>
      <ul>
        <li><strong>User Research:</strong> Understand user needs through surveys and interviews.</li>
        <li><strong>Wireframing:</strong> Tools like Figma help create intuitive layouts.</li>
        <li><strong>Accessibility:</strong> Ensure compliance with WCAG standards for inclusive design.</li>
      </ul>
      <p>With real-world examples, learn how to create web applications that delight users and drive engagement through seamless UX and visually appealing UI.</p>
    `,
    date: "August 10, 2025",
    category: "Design",
    image:
      "https://images.unsplash.com/photo-1605606722649-39761c5a3397?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGRlc2lnbmluZyUyMHRvb2x8ZW58MHwwfDB8fHww",
    author: {
      name: "Emily Brown",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop",
    },
    readingTime: 6,
    comments: 15,
    relatedPosts: [2, 4],
  },
  {
    id: 4,
    title: "Scaling Your Business with Cloud Solutions",
    slug: "scaling-your-business-with-cloud-solutions",
    excerpt: "Understand how cloud technology can drive efficiency and growth.",
    content: `
      <h2>Introduction</h2>
      <p>Cloud solutions are revolutionizing how businesses scale and operate. This article dives into the benefits of cloud computing, including cost efficiency, scalability, and enhanced collaboration.</p>
      <h3>Key Platforms</h3>
      <ul>
        <li><strong>AWS:</strong> Offers robust solutions for serverless computing and storage.</li>
        <li><strong>Azure:</strong> Provides enterprise-grade cloud services.</li>
        <li><strong>Google Cloud:</strong> Excels in AI and data analytics.</li>
      </ul>
      <p>Learn how to implement cloud solutions to streamline operations and support business growth in a competitive landscape.</p>
    `,
    date: "August 5, 2025",
    category: "Technology",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1170&auto=format&fit=crop",
    author: {
      name: "Michael Lee",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
    },
    readingTime: 8,
    comments: 10,
    relatedPosts: [1, 3],
  },
  {
    id: 5,
    title: "AI in Everyday Design Tools",
    slug: "ai-in-everyday-design-tools",
    excerpt: "How AI is revolutionizing the design process for creators.",
    content: `
      <h2>Introduction</h2>
      <p>Artificial intelligence is transforming design workflows, enabling creators to work smarter and faster. This article explores how AI-powered tools are streamlining design tasks.</p>
      <h3>AI-Powered Tools</h3>
      <ul>
        <li><strong>Canva:</strong> AI-driven templates and suggestions.</li>
        <li><strong>Adobe Sensei:</strong> Automates repetitive design tasks.</li>
        <li><strong>Figma Plugins:</strong> Enhance design workflows with AI.</li>
      </ul>
      <p>We discuss the benefits of AI in design, including automation and personalization, while addressing ethical considerations and the future of AI-driven design.</p>
    `,
    date: "July 30, 2025",
    category: "Design",
    image:
      "https://images.unsplash.com/photo-1724638197367-1bab34842f90?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGRlc2lnbmluZyUyMHRvb2x8ZW58MHwwfDB8fHww",
    author: {
      name: "Sarah Davis",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
    },
    readingTime: 4,
    comments: 5,
    relatedPosts: [3, 1],
  },
];

const BlogDetail = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);
  const [comment, setComment] = useState("");
  const [commentName, setCommentName] = useState("");
  const [commentError, setCommentError] = useState("");
  const [commentsList, setCommentsList] = useState([
    {
      id: 1,
      name: "Alex Carter",
      text: "Great insights! Excited for the future of this technology.",
      date: "August 21, 2025",
      replies: [
        { id: 1.1, name: "Jane Doe", text: "Totally agree! The AI trends are fascinating.", date: "August 22, 2025" },
      ],
    },
    {
      id: 2,
      name: "Lisa Wong",
      text: "Really helpful article, thanks for sharing!",
      date: "August 22, 2025",
      replies: [],
    },
  ]);
  const [showCTA, setShowCTA] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
      setShowCTA(scrollTop > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentName.trim() || !comment.trim()) {
      setCommentError("Name and comment are required");
      return;
    }
    setCommentsList([
      ...commentsList,
      {
        id: commentsList.length + 1,
        name: commentName,
        text: comment,
        date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
        replies: [],
      },
    ]);
    setComment("");
    setCommentName("");
    setCommentError("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!post) {
    return (
      <section className="py-12 md:py-20 bg-gray-100 text-gray-900">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-semibold tracking-tight">Post Not Found</h1>
          <p className="mt-3 text-gray-600">The blog post you’re looking for doesn’t exist.</p>
          <Link href="/blog">
            <Button className="mt-6 bg-teal-600 text-white hover:bg-teal-700 transition-colors duration-300">
              Back to Blog
            </Button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-gray-100 text-gray-900 font-sans">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-teal-600 to-coral-600 z-50" style={{ width: `${scrollProgress}%` }} />

      {/* Hero Section with Parallax */}
      <div className="relative h-[60vh] flex items-center justify-center bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${post.image})` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/80 to-coral-500/80 backdrop-blur-sm"></div>
        <motion.div 
          className="relative text-center z-10 max-w-4xl px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Tag className="h-5 w-5 text-white" />
            <span className="text-sm font-medium text-white">{post.category}</span>
          </div>
          <motion.h1 
            className="text-4xl md:text-6xl font-bold font-sans text-white tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {post.title.split(" ").map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="inline-block mr-2"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          <p className="mt-3 text-lg text-white/90 font-serif">{post.excerpt}</p>
        </motion.div>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <nav className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-teal-600">
            <Home className="h-4 w-4 inline-block mr-1" />
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-teal-600">
            Blog
          </Link>
          <span>/</span>
          <span className="text-teal-600">{post.title}</span>
        </nav>
      </div>

      {/* Main Content with Sidebar */}
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Content */}
        <motion.div 
          className="md:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="h-12 w-12">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback>{post.author.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium font-sans">{post.author.name}</p>
                <p className="text-xs text-gray-500">{post.date}</p>
              </div>
              <div className="ml-auto flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readingTime} min read
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  {post.comments} comments
                </div>
              </div>
            </div>
            <div className="prose prose-lg font-serif text-gray-700" dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {/* Comments Section */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold font-sans text-teal-600 mb-4">Comments ({commentsList.length})</h2>
            <div className="space-y-6 mb-6">
              {commentsList.map((comment) => (
                <div key={comment.id} className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="" alt={comment.name} />
                      <AvatarFallback>{comment.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium font-sans">{comment.name}</p>
                      <p className="text-xs text-gray-500">{comment.date}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 font-serif">{comment.text}</p>
                  {comment.replies.length > 0 && (
                    <div className="ml-8 mt-4 space-y-4">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="border-l-2 border-teal-200 pl-4">
                          <div className="flex items-center gap-3 mb-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="" alt={reply.name} />
                              <AvatarFallback>{reply.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium font-sans">{reply.name}</p>
                              <p className="text-xs text-gray-500">{reply.date}</p>
                            </div>
                          </div>
                          <p className="text-gray-600 font-serif text-sm">{reply.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <form onSubmit={handleCommentSubmit} className="space-y-4 bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="text-lg font-medium font-sans text-coral-600">Leave a Comment</h3>
              <div>
                <Label htmlFor="commentName" className="text-sm text-gray-600 font-sans">
                  Name
                </Label>
                <Input
                  id="commentName"
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  placeholder="Your name"
                  className={`mt-1 font-sans ${commentError ? "border-red-500" : ""}`}
                />
              </div>
              <div>
                <Label htmlFor="comment" className="text-sm text-gray-600 font-sans">
                  Comment
                </Label>
                <Textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Your comment"
                  className={`mt-1 font-sans ${commentError ? "border-red-500" : ""}`}
                  rows={4}
                />
              </div>
              {commentError && (
                <p className="text-xs text-red-500 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" /> {commentError}
                </p>
              )}
              <Button
                type="submit"
                className="bg-teal-600 text-white hover:bg-coral-600 transition-colors duration-300 font-sans"
              >
                <Send className="h-4 w-4 mr-2" />
                Post Comment
              </Button>
            </form>
          </motion.div>
        </motion.div>

        {/* Sidebar */}
        <motion.div 
          className="md:col-span-1 space-y-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Share Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold font-sans text-teal-600 mb-4">Share This Post</h3>
            <div className="flex flex-col gap-3">
              <Button
                variant="outline"
                className="border-teal-600 text-teal-600 hover:bg-teal-50 font-sans"
                aria-label="Share on Twitter"
              >
                <Twitter className="h-5 w-5 mr-2" />
                Twitter
              </Button>
              <Button
                variant="outline"
                className="border-teal-600 text-teal-600 hover:bg-teal-50 font-sans"
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="h-5 w-5 mr-2" />
                LinkedIn
              </Button>
              <Button
                variant="outline"
                className="border-teal-600 text-teal-600 hover:bg-teal-50 font-sans"
                aria-label="Share on Instagram"
              >
                <Instagram className="h-5 w-5 mr-2" />
                Instagram
              </Button>
            </div>
          </div>

          {/* Related Posts */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold font-sans text-coral-600 mb-4">Related Posts</h3>
            <div className="space-y-4">
              {post.relatedPosts.map((id) => {
                const relatedPost = blogPosts.find((p) => p.id === id);
                if (!relatedPost) return null;
                return (
                  <Link key={id} href={`/blog/${relatedPost.slug}`}>
                    <Card className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-0">
                        <img
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          className="w-full h-32 object-cover rounded-t-lg"
                        />
                        <div className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Tag className="h-4 w-4 text-teal-600" />
                            <span className="text-sm text-teal-600 font-sans">{relatedPost.category}</span>
                          </div>
                          <CardTitle className="text-base font-medium font-sans mb-2">
                            {relatedPost.title}
                          </CardTitle>
                          <CardDescription className="text-sm text-gray-600 font-serif">
                            {relatedPost.excerpt.substring(0, 80)}...
                          </CardDescription>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Sticky CTA Bar */}
      <AnimatePresence>
        {showCTA && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 bg-white shadow-lg py-4 z-50"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
              <p className="text-gray-600 font-medium font-sans">
                {scrollProgress < 50 ? "Enjoyed this post? Subscribe for more!" : "Share this post with your network!"}
              </p>
              <Link href={scrollProgress < 50 ? "/#newsletter" : "#"}>
                <Button className="bg-teal-600 text-white hover:bg-coral-600 transition-colors duration-300 font-sans rounded-full px-6">
                  {scrollProgress < 50 ? "Subscribe Now" : "Share Now"}
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to Top Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: showCTA ? 1 : 0, scale: showCTA ? 1 : 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          onClick={scrollToTop}
          className="bg-teal-600 text-white hover:bg-coral-600 rounded-full p-3"
          aria-label="Back to top"
        >
          <ChevronUp className="h-6 w-6" />
        </Button>
      </motion.div>
    </section>
  );
};

export default BlogDetail;