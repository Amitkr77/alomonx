// src\app\blog\[slug]\page.jsx
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
  Tag,
  ChevronUp,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Label } from "@/components/ui/label";

const blogPosts = [
  {
    id: 1,
    title:
      "Digital Success in 2025: Transforming Small Businesses with Marketing and Web Design Trends",
    slug: "digital-success-in-2025-transforming-small-businesses",
    excerpt:
      "Discover how digital marketing strategies and cutting-edge web design trends can empower small businesses to thrive in 2025.",
    content: `
      <h2>Introduction</h2>
      <p>In 2025, digital marketing and web design are transforming small businesses by enabling them to compete with industry giants, reach global audiences, and deliver exceptional user experiences. From AI-powered personalization to mobile-first designs, this article explores how small businesses can leverage digital marketing strategies and the latest web design trends to grow faster, reach wider, and compete smarter.</p>
      
      <h3>Social Media Marketing: Building Communities in 2025</h3>
      <p>Social media marketing remains a cornerstone for small businesses. Platforms like Instagram, TikTok, Facebook, and LinkedIn allow brands to share their stories, connect with audiences, and build loyal communities. By creating engaging content and leveraging platform-specific features like Instagram Reels or LinkedIn articles, small businesses can boost visibility and foster customer loyalty.</p>
      
      <h3>Local SEO: A Game Changer for Visibility</h3>
      <p>Search Engine Optimization (SEO) in 2025 is more powerful than ever. By using smart keywords, AI-driven analytics, and local SEO strategies, small businesses can rank higher on Google search results, attracting local customers. Optimizing for "near me" searches and maintaining consistent business listings on platforms like Google My Business are key to driving foot traffic and online conversions.</p>
      
      <h3>The Power of Mobile-Friendly Websites</h3>
      <p>A mobile-friendly website is non-negotiable in 2025. With most users accessing websites via smartphones, sites must load quickly, look great on all screen sizes, and provide seamless navigation. A smooth user experience increases visitor retention, encourages exploration, and boosts conversion rates.</p>
      
      <h3>Top 10 Website Design Trends for 2025</h3>
      <p>Web design in 2025 is all about speed, simplicity, and personalization. Here are the top trends shaping the future of small business websites:</p>
      <ul class="list-none pl-0 space-y-4">
        <li class="flex items-start gap-3 text-gray-700">
          <span class="text-teal-600 font-bold">✔</span>
          <span><strong>AI-Powered Personalization:</strong> AI and machine learning deliver tailored content and dynamic layouts based on user preferences.</span>
        </li>
        <li class="flex items-start gap-3 text-gray-700">
          <span class="text-teal-600 font-bold">✔</span>
          <span><strong>Minimalist and Clean Layouts:</strong> Simple interfaces with ample white space and clear typography enhance readability and navigation.</span>
        </li>
        <li class="flex items-start gap-3 text-gray-700">
          <span class="text-teal-600 font-bold">✔</span>
          <span><strong>Dark Mode Designs:</strong> Modern and battery-saving, dark mode offers a sleek, professional aesthetic.</span>
        </li>
        <li class="flex items-start gap-3 text-gray-700">
          <span class="text-teal-600 font-bold">✔</span>
          <span><strong>3D and Immersive Visuals:</strong> Advanced graphics and micro-animations create engaging, futuristic experiences.</span>
        </li>
        <li class="flex items-start gap-3 text-gray-700">
          <span class="text-teal-600 font-bold">✔</span>
          <span><strong>Voice User Interfaces (VUI):</strong> Voice commands improve accessibility and speed up navigation.</span>
        </li>
        <li class="flex items-start gap-3 text-gray-700">
          <span class="text-teal-600 font-bold">✔</span>
          <span><strong>Faster Loading Speeds:</strong> Lightweight code and image compression ensure sites load in under three seconds.</span>
        </li>
        <li class="flex items-start gap-3 text-gray-700">
          <span class="text-teal-600 font-bold">✔</span>
          <span><strong>Bold Typography and Gradients:</strong> Creative fonts and colorful gradients give websites a strong visual identity.</span>
        </li>
        <li class="flex items-start gap-3 text-gray-700">
          <span class="text-teal-600 font-bold">✔</span>
          <span><strong>Sustainability-Focused Design:</strong> Eco-friendly designs with lightweight files reduce energy consumption.</span>
        </li>
        <li class="flex items-start gap-3 text-gray-700">
          <span class="text-teal-600 font-bold">✔</span>
          <span><strong>Interactive Elements:</strong> Hover effects and scroll-triggered transitions keep visitors engaged.</span>
        </li>
        <li class="flex items-start gap-3 text-gray-700">
          <span class="text-teal-600 font-bold">✔</span>
          <span><strong>Mobile-First and Responsive Design:</strong> Seamless adaptation to all devices ensures optimal performance.</span>
        </li>
      </ul>
      
      <h3>Final Thoughts</h3>
      <p>The future of digital success for small businesses in 2025 lies in combining powerful digital marketing strategies with innovative web design. By embracing personalization, automation, and mobile-first approaches, small businesses can stand out, build trust, and drive growth. At Alomonx Technology, we specialize in creating websites and marketing strategies that empower businesses to thrive in the digital era.</p>`,
    date: "October 20, 2025",
    category: "Digital Strategy",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1170&auto=format&fit=crop",
    author: {
      name: "Alomonx Technology",
      avatar: "./logo.png",
    },
    readingTime: 6,
    comments: 0,
    relatedPosts: [],
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
      name: "Lisa Wong",
      text: "Really insightful article! The tips on local SEO are super helpful for my small business.",
      date: "October 21, 2025",
      replies: [
        {
          id: 1.1,
          name: "Alex Carter",
          text: "Glad you found it useful! Local SEO is a game-changer for small businesses.",
          date: "October 22, 2025",
        },
      ],
    },
    {
      id: 2,
      name: "Mark Johnson",
      text: "The web design trends section was spot-on. Excited to try implementing dark mode!",
      date: "October 22, 2025",
      replies: [],
    },
  ]);
  const [showCTA, setShowCTA] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
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
        date: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
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
          <h1 className="text-4xl font-semibold tracking-tight">
            Post Not Found
          </h1>
          <p className="mt-3 text-gray-600">
            The blog post you’re looking for doesn’t exist.
          </p>
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
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-teal-600 to-coral-600 z-50"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Hero Section with Parallax */}
      <div
        className="relative h-[60vh] flex items-center justify-center bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${post.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/80 to-coral-500/80 backdrop-blur-sm"></div>
        <motion.div
          className="relative text-center z-10 max-w-4xl px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Tag className="h-5 w-5 text-white" />
            <span className="text-sm font-medium text-white">
              {post.category}
            </span>
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
          <p className="mt-3 text-lg text-white/90 font-serif">
            {post.excerpt}
          </p>
        </motion.div>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <nav className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-teal-600 flex items-center">
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
                <p className="text-sm font-medium font-sans">
                  {post.author.name}
                </p>
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
            <div
              className="prose prose-lg font-serif text-gray-700"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Comments Section */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold font-sans text-teal-600 mb-4">
              Comments ({commentsList.length})
            </h2>
            <div className="space-y-6 mb-6">
              {commentsList.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-white rounded-lg p-4 border border-gray-200"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="" alt={comment.name} />
                      <AvatarFallback>{comment.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium font-sans">
                        {comment.name}
                      </p>
                      <p className="text-xs text-gray-500">{comment.date}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 font-serif">{comment.text}</p>
                  {comment.replies.length > 0 && (
                    <div className="ml-8 mt-4 space-y-4">
                      {comment.replies.map((reply) => (
                        <div
                          key={reply.id}
                          className="border-l-2 border-teal-200 pl-4"
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="" alt={reply.name} />
                              <AvatarFallback>{reply.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium font-sans">
                                {reply.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {reply.date}
                              </p>
                            </div>
                          </div>
                          <p className="text-gray-600 font-serif text-sm">
                            {reply.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <form
              onSubmit={handleCommentSubmit}
              className="space-y-4 bg-white rounded-2xl p-6 border border-gray-200"
            >
              <h3 className="text-lg font-medium font-sans text-coral-600">
                Leave a Comment
              </h3>
              <div>
                <Label
                  htmlFor="commentName"
                  className="text-sm text-gray-600 font-sans"
                >
                  Name
                </Label>
                <Input
                  id="commentName"
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  placeholder="Your name"
                  className={`mt-1 font-sans ${
                    commentError ? "border-red-500" : ""
                  }`}
                />
              </div>
              <div>
                <Label
                  htmlFor="comment"
                  className="text-sm text-gray-600 font-sans"
                >
                  Comment
                </Label>
                <Textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Your comment"
                  className={`mt-1 font-sans ${
                    commentError ? "border-red-500" : ""
                  }`}
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
            <h3 className="text-lg font-semibold font-sans text-teal-600 mb-4">
              Share This Post
            </h3>
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
          {/* Related Posts Section Removed */}
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
                {scrollProgress < 50
                  ? "Enjoyed this post? Subscribe for more!"
                  : "Share this post with your network!"}
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
