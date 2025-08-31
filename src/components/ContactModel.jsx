"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, CheckCircle } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export function ContactModel() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };
  const validateForm = (formType) => {
    const newErrors = {};
    if (formType === "contact") {
      if (!formValues.name.trim()) newErrors.name = "Name is required";
      if (
        !formValues.email.trim() ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)
      )
        newErrors.email = "Valid email is required";
      if (!formValues.message.trim()) newErrors.message = "Message is required";
    } else if (formType === "newsletter") {
      if (
        !formValues.newsletter.trim() ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.newsletter)
      )
        newErrors.newsletter = "Valid email is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (validateForm("contact")) {
      console.log("Contact form submitted:", formValues);
      setSubmitted(true);
      setFormValues({ ...formValues, name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    }
    try {
      const response = await fetch("/api/sheet/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formValues,
        }),
      });

      if (response.ok) {
        // setStep(4);
        setErrors(null);
      } else {
        const { message } = await response.json();
        setErrors(message || "Failed to save data");
      }
      setLoading(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors("An error occurred while saving your data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="hidden lg:block">
          <motion.button
            type="button" // ✅ prevent it from acting like a form submit
            className="px-8 py-3 font-semibold rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 text-white hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 shadow-lg"
            whileHover={{
              scale: 1.1,
              boxShadow: "0 0 25px rgba(0,255,255,0.5)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Get Quote
          </motion.button>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Get a Quote</DialogTitle>
          <DialogDescription>
            Enter your details and we'll get back to you.
          </DialogDescription>
        </DialogHeader>

        {/* Contact Form & Info */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border  ">
            <CardContent className="p-6">
              <AnimatePresence>
                {!submitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleContactSubmit}
                    className="space-y-5"
                  >
                    {/* <h2 className="text-lg font-medium text-gray-900 mb-4">
                      Send Us a Message
                    </h2> */}
                    <div>
                      <Label
                        htmlFor="name"
                        className="text-sm font-medium text-gray-700"
                      >
                        Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your Name"
                        value={formValues.name}
                        onChange={handleInputChange}
                        required
                        className={`mt-1 rounded-lg border-gray-200 focus:ring-indigo-300 ${
                          errors.name ? "border-red-500" : ""
                        }`}
                        aria-invalid={!!errors.name}
                        aria-describedby={
                          errors.name ? "name-error" : undefined
                        }
                      />
                      {errors.name && (
                        <p
                          id="name-error"
                          className="text-xs text-red-500 mt-1 flex items-center"
                        >
                          <AlertCircle className="h-4 w-4 mr-1" /> {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-700"
                      >
                        Email *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Your Email"
                        value={formValues.email}
                        onChange={handleInputChange}
                        required
                        className={`mt-1 rounded-lg border-gray-200 focus:ring-indigo-300 ${
                          errors.email ? "border-red-500" : ""
                        }`}
                        aria-invalid={!!errors.email}
                        aria-describedby={
                          errors.email ? "email-error" : undefined
                        }
                      />
                      {errors.email && (
                        <p
                          id="email-error"
                          className="text-xs text-red-500 mt-1 flex items-center"
                        >
                          <AlertCircle className="h-4 w-4 mr-1" />{" "}
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label
                        htmlFor="message"
                        className="text-sm font-medium text-gray-700"
                      >
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Your Message"
                        value={formValues.message}
                        onChange={handleInputChange}
                        required
                        className={`mt-1 rounded-lg border-gray-200 focus:ring-indigo-300 ${
                          errors.message ? "border-red-500" : ""
                        }`}
                        rows={4}
                        aria-invalid={!!errors.message}
                        aria-describedby={
                          errors.message ? "message-error" : undefined
                        }
                      />
                      {errors.message && (
                        <p
                          id="message-error"
                          className="text-xs text-red-500 mt-1 flex items-center"
                        >
                          <AlertCircle className="h-4 w-4 mr-1" />{" "}
                          {errors.message}
                        </p>
                      )}
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-indigo-600 text-white hover:bg-indigo-700 text-sm rounded-lg"
                      aria-label="Submit contact form"
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Send Message"}{" "}
                    </Button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="confirmation"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-center space-y-4"
                  >
                    <CheckCircle className="h-12 w-12 text-indigo-600 mx-auto" />
                    <h3 className="text-lg font-medium text-gray-900">
                      Message Sent!
                    </h3>
                    <p className="text-sm text-gray-600">
                      Thank you for reaching out. We'll respond within 24-48
                      hours.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
