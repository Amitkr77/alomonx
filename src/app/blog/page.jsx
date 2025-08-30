"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Tag,
  Instagram,
  Twitter,
  Linkedin,
  AlertCircle,
  CheckCircle,
  Clock,
  MessageSquare,
  Share2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const blogPosts = [
  {
    id: 1,
    title: "The Future of Web Development in 2025",
    excerpt:
      "Explore emerging trends and technologies shaping the web development landscape.",
    content: "Full content here...", // For reading time calculation
    date: "August 20, 2025",
    category: "Technology",
    image:
      "https://images.unsplash.com/photo-1516321310763-383e99499987?q=80&w=1170&auto=format&fit=crop",
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
    excerpt:
      "Learn strategies to enhance your online presence and engage your audience.",
    content: "Full content here...",
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
    excerpt:
      "Discover best practices for creating intuitive and engaging web experiences.",
    content: "Full content here...",
    date: "August 10, 2025",
    category: "Design",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5241f4a3d63?q=80&w=1170&auto=format&fit=crop",
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
    excerpt: "Understand how cloud technology can drive efficiency and growth.",
    content: "Full content here...",
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
  // Add more posts for pagination
  {
    id: 5,
    title: "AI in Everyday Design Tools",
    excerpt: "How AI is revolutionizing the design process for creators.",
    content: "Full content here...",
    date: "July 30, 2025",
    category: "Design",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7f7175bbaf?q=80&w=1170&auto=format&fit=crop",
    author: {
      name: "Sarah Davis",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
    },
    readingTime: 4,
    comments: 5,
    relatedPosts: [3, 1],
  },
  // ... add even more if needed
];

const categories = ["All", "Technology", "Marketing", "Design"];

const calculateReadingTime = (content) => {
  const words = content.split(" ").length;
  return Math.ceil(words / 200); // Average reading speed
};

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterError, setNewsletterError] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [featuredPost, setFeaturedPost] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Set featured post as the latest one
    setFeaturedPost(blogPosts[0]);
    // Calculate reading time if not provided
    blogPosts.forEach((post) => {
      if (!post.readingTime)
        post.readingTime = calculateReadingTime(post.content);
    });
  }, []);

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (
      !newsletterEmail.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail)
    ) {
      setNewsletterError("Valid email is required");
      return;
    }
    setNewsletterError("");
    console.log("Newsletter subscription:", newsletterEmail);
    setNewsletterSubmitted(true);
    setNewsletterEmail("");
    setTimeout(() => setNewsletterSubmitted(false), 5000);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div
      className={`min-h-screen font-sans ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center bg-fixed h-[60vh]"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 backdrop-blur-sm" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="container mx-auto px-6 h-full flex items-center justify-center relative z-10"
        >
          <div className="text-center max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-light text-white mb-4 leading-tight">
              Insights & Innovations
            </h1>
            <p className="text-lg text-gray-200">
              Explore expert articles on technology, design, and marketing
              trends.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Blog Content */}
      <section className="container mx-auto px-6 py-20 max-w-7xl">
        {/* Dark Mode Toggle
        <div className="flex justify-end mb-6">
          <Button
            onClick={toggleDarkMode}
            className="bg-indigo-600 text-white hover:bg-indigo-700 text-sm"
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </Button>
        </div> */}

        {/* Featured Post */}
        {featuredPost && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-2xl font-light mb-4">Featured Post</h2>
            <Card
              className={`border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow ${
                darkMode ? "bg-gray-800 border-gray-700" : "bg-white"
              }`}
            >
              <CardContent className="p-0">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="h-4 w-4 text-indigo-600" />
                    <span className="text-sm text-indigo-600">
                      {featuredPost.category}
                    </span>
                  </div>
                  <CardTitle className="text-2xl font-medium mb-2">
                    {featuredPost.title}
                  </CardTitle>
                  <CardDescription
                    className={`text-sm mb-4 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {featuredPost.excerpt}
                  </CardDescription>
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar>
                      <AvatarImage
                        src={featuredPost.author.avatar}
                        alt={featuredPost.author.name}
                      />
                      <AvatarFallback>
                        {featuredPost.author.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">
                        {featuredPost.author.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {featuredPost.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {featuredPost.readingTime} min read
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      {featuredPost.comments} comments
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                    aria-label={`Read more about ${featuredPost.title}`}
                  >
                    Read More
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Filters */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Input
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-lg border-gray-200 pl-10 focus:ring-indigo-300"
                aria-label="Search blog posts"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  className={`text-sm ${
                    selectedCategory === category
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "border-gray-200"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                  aria-label={`Filter by ${category}`}
                >
                  {category} (
                  {category === "All"
                    ? blogPosts.length
                    : blogPosts.filter((p) => p.category === category).length}
                  )
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {currentPosts.map((post) => (
            <motion.div
              key={post.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Card
                className={`border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow ${
                  darkMode ? "bg-gray-800 border-gray-700" : "bg-white"
                }`}
              >
                <CardContent className="p-0">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Tag className="h-4 w-4 text-indigo-600" />
                      <span className="text-sm text-indigo-600">
                        {post.category}
                      </span>
                    </div>
                    <CardTitle className="text-lg font-medium mb-2">
                      {post.title}
                    </CardTitle>
                    <CardDescription
                      className={`text-sm mb-3 ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {post.excerpt}
                    </CardDescription>
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={post.author.avatar}
                          alt={post.author.name}
                        />
                        <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">
                          {post.author.name}
                        </p>
                        <p className="text-xs text-gray-500">{post.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readingTime} min
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        {post.comments}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full border-gray-200 text-indigo-600 hover:bg-indigo-50"
                      aria-label={`Read more about ${post.title}`}
                    >
                      Read More
                    </Button>
                    <div className="flex justify-center gap-4 mt-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        aria-label="Share on Twitter"
                      >
                        <Twitter className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        aria-label="Share on LinkedIn"
                      >
                        <Linkedin className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" aria-label="Share">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2 mb-12">
          {Array.from(
            { length: Math.ceil(filteredPosts.length / postsPerPage) },
            (_, i) => (
              <Button
                key={i}
                variant={currentPage === i + 1 ? "default" : "outline"}
                className="text-sm"
                onClick={() => paginate(i + 1)}
                aria-label={`Go to page ${i + 1}`}
              >
                {i + 1}
              </Button>
            )
          )}
        </div>

        {/* Related Posts (example for first post) */}
        {currentPosts.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12"
          >
            <h2 className="text-2xl font-light mb-4">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogPosts[0].relatedPosts.map((id) => {
                const relatedPost = blogPosts.find((p) => p.id === id);
                if (!relatedPost) return null;
                return (
                  <Card
                    key={id}
                    className="border border-gray-200 rounded-lg shadow-sm"
                  >
                    <CardContent className="p-0">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-32 object-cover rounded-t-lg"
                      />
                      <div className="p-4">
                        <CardTitle className="text-sm font-medium mb-1">
                          {relatedPost.title}
                        </CardTitle>
                        <CardDescription className="text-xs text-gray-600">
                          {relatedPost.excerpt.substring(0, 50)}...
                        </CardDescription>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </motion.div>
        )}
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-50 py-20 dark:bg-gray-800">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="container mx-auto px-6 max-w-lg text-center"
        >
          <h2 className="text-3xl font-light mb-4 dark:text-gray-100">
            Stay Informed
          </h2>
          <p className="text-sm text-gray-600 mb-6 dark:text-gray-400">
            Subscribe to our newsletter for the latest articles and insights.
          </p>
          <AnimatePresence>
            {!newsletterSubmitted ? (
              <motion.form
                key="newsletter"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleNewsletterSubmit}
                className="space-y-4"
              >
                <div>
                  <Label htmlFor="newsletter" className="sr-only">
                    Email for Newsletter
                  </Label>
                  <Input
                    id="newsletter"
                    name="newsletter"
                    type="email"
                    placeholder="Enter your email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                    className={`rounded-lg border-gray-200 focus:ring-indigo-300 ${
                      newsletterError ? "border-red-500" : ""
                    }`}
                    aria-invalid={!!newsletterError}
                    aria-describedby={
                      newsletterError ? "newsletter-error" : undefined
                    }
                  />
                  {newsletterError && (
                    <p
                      id="newsletter-error"
                      className="text-xs text-red-500 mt-1 flex items-center justify-center"
                    >
                      <AlertCircle className="h-4 w-4 mr-1" /> {newsletterError}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-indigo-600 text-white hover:bg-indigo-700 text-sm rounded-lg"
                  aria-label="Subscribe to newsletter"
                >
                  Subscribe
                </Button>
              </motion.form>
            ) : (
              <motion.div
                key="newsletter-confirmation"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <CheckCircle className="h-12 w-12 text-indigo-600 mx-auto" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Thank you for subscribing! You'll receive our updates soon.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Social Media & RSS */}
      <section className="container mx-auto px-6 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-indigo-600"
            >
              <Instagram className="h-6 w-6" />
              <span className="sr-only">Instagram</span>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-indigo-600"
            >
              <Twitter className="h-6 w-6" />
              <span className="sr-only">Twitter</span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-indigo-600"
            >
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
          <a
            href="/rss.xml"
            className="text-sm text-indigo-600 hover:underline"
          >
            Subscribe via RSS
          </a>
        </motion.div>
      </section>
    </div>
  );
};

export default Blog;
