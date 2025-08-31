"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChevronLeft, CheckCircle, AlertCircle } from "lucide-react";

const timeSlots = [
  "9:00 AM",
  "10:30 AM",
  "12:00 PM",
  "2:00 PM",
  "3:30 PM",
  "5:00 PM",
];

const timeZones = ["UTC", "EST", "CST", "MST", "PST", "IST", "CET"];

const ConsultationCard = () => {
  const [step, setStep] = useState(1); // 1 = calendar, 2 = time, 3 = form, 4 = confirmation
  const [date, setDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedTimeZone, setSelectedTimeZone] = useState("UTC");
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    company: "",
    websiteType: "",
    platform: "",
    timeline: "",
    budget: "",
    additionalNotes: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!formValues.name.trim()) newErrors.name = "Name is required";
    if (
      !formValues.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)
    )
      newErrors.email = "Valid email is required";
    if (!formValues.company.trim())
      newErrors.company = "Company name is required";
    if (!formValues.websiteType)
      newErrors.websiteType = "Website type is required";
    if (!formValues.platform) newErrors.platform = "Platform is required";
    if (!formValues.timeline) newErrors.timeline = "Timeline is required";
    if (!formValues.budget.trim()) newErrors.budget = "Budget is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch("/api/sheet/appointment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            date: date?.toLocaleDateString(),
            time: selectedTime,
            timeZone: selectedTimeZone,
            ...formValues,
          }),
        });

        if (response.ok) {
          setStep(4);
          setErrors(null);
        } else {
          const { message } = await response.json();
          setErrors(message || "Failed to save data");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        setErrors("An error occurred while saving your data");
      }
    }
  };

  // Prevent proceeding to form step without date and time
  const canProceedToForm = date && selectedTime;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <Card className="border border-gray-100 shadow-md rounded-xl max-w-xl mx-auto h-[530px] overflow-y-auto">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-gray-900 text-center">
          Schedule a Discovery Call
        </CardTitle>
        <div className="flex justify-center gap-2 mt-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1 w-8 rounded-full ${
                step >= s ? "bg-indigo-600" : "bg-gray-200"
              }`}
              aria-hidden="true"
            />
          ))}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center  space-y-5 px-6 py-4">
        <AnimatePresence mode="wait">
          {/* Step 1: Calendar Selection */}
          {step === 1 && (
            <motion.div
              key="calendar"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full flex flex-col items-center justify-center"
            >
              <Calendar
                mode="single"
                selected={date}
                onSelect={(selectedDate) => {
                  setDate(selectedDate);
                  if (selectedDate) setStep(2);
                }}
                className="rounded-lg border-gray-200 shadow-sm"
                disabled={{ before: new Date() }}
                aria-label="Select a date for your consultation"
              />
              <p className="text-sm text-gray-500 text-center mt-3">
                Choose a date to see available times
              </p>
            </motion.div>
          )}

          {/* Step 2: Time Slot Selection */}
          {step === 2 && (
            <motion.div
              key="time"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full space-y-4"
            >
              <div className="text-center text-sm text-gray-700">
                <p>
                  Selected: <strong>{date?.toLocaleDateString()}</strong>
                </p>
              </div>

              {/* Time Zone Selector */}
              <div>
                <Label
                  htmlFor="timezone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Time Zone
                </Label>
                <select
                  id="timezone"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-indigo-300 focus:border-indigo-300"
                  value={selectedTimeZone}
                  onChange={(e) => setSelectedTimeZone(e.target.value)}
                  aria-label="Select your time zone"
                >
                  {timeZones.map((zone) => (
                    <option key={zone} value={zone}>
                      {zone}
                    </option>
                  ))}
                </select>
              </div>

              {/* Time Slots */}
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((slot) => (
                  <motion.div
                    key={slot}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button
                      variant={selectedTime === slot ? "default" : "outline"}
                      className={`w-full text-sm py-2 ${
                        selectedTime === slot
                          ? "bg-indigo-600 text-white hover:bg-indigo-700"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedTime(slot)}
                      aria-label={`Select time slot ${slot}`}
                    >
                      {slot}
                    </Button>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  disabled={!canProceedToForm}
                  onClick={() => setStep(3)}
                  className="w-full bg-indigo-600 text-white hover:bg-indigo-700 text-sm disabled:opacity-50"
                  aria-label="Proceed to booking details"
                >
                  Next
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setStep(1);
                    setSelectedTime(null);
                  }}
                  className="w-full text-sm flex items-center justify-center"
                  aria-label="Back to calendar"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" /> Back
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Form */}
          {step === 3 && (
            <motion.form
              key="form"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onSubmit={handleSubmit}
              className="w-full space-y-4"
            >
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <strong>Date:</strong> {date?.toLocaleDateString()}
                </p>
                <p>
                  <strong>Time:</strong> {selectedTime} ({selectedTimeZone})
                </p>
              </div>

              <div>
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Full Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  value={formValues.name}
                  onChange={handleInputChange}
                  required
                  className={`mt-1 rounded-lg border-gray-200 ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
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
                  className={`mt-1 rounded-lg border-gray-200 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p
                    id="email-error"
                    className="text-xs text-red-500 mt-1 flex items-center"
                  >
                    <AlertCircle className="h-4 w-4 mr-1" /> {errors.email}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="company"
                  className="text-sm font-medium text-gray-700"
                >
                  Company Name *
                </Label>
                <Input
                  id="company"
                  name="company"
                  placeholder="Your Company"
                  value={formValues.company}
                  onChange={handleInputChange}
                  required
                  className={`mt-1 rounded-lg border-gray-200 ${
                    errors.company ? "border-red-500" : ""
                  }`}
                  aria-invalid={!!errors.company}
                  aria-describedby={
                    errors.company ? "company-error" : undefined
                  }
                />
                {errors.company && (
                  <p
                    id="company-error"
                    className="text-xs text-red-500 mt-1 flex items-center"
                  >
                    <AlertCircle className="h-4 w-4 mr-1" /> {errors.company}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="websiteType"
                  className="text-sm font-medium text-gray-700"
                >
                  Website Type *
                </Label>
                <select
                  id="websiteType"
                  name="websiteType"
                  className={`w-full border rounded-lg px-3 py-2 mt-1 text-sm ${
                    errors.websiteType ? "border-red-500" : "border-gray-200"
                  }`}
                  value={formValues.websiteType}
                  onChange={handleInputChange}
                  required
                  aria-invalid={!!errors.websiteType}
                  aria-describedby={
                    errors.websiteType ? "websiteType-error" : undefined
                  }
                >
                  <option value="">Select...</option>
                  <option>Corporate/Business</option>
                  <option>E-Commerce</option>
                  <option>Web Application</option>
                  <option>Portfolio/Blog</option>
                </select>
                {errors.websiteType && (
                  <p
                    id="websiteType-error"
                    className="text-xs text-red-500 mt-1 flex items-center"
                  >
                    <AlertCircle className="h-4 w-4 mr-1" />{" "}
                    {errors.websiteType}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="platform"
                  className="text-sm font-medium text-gray-700"
                >
                  Preferred Platform *
                </Label>
                <select
                  id="platform"
                  name="platform"
                  className={`w-full border rounded-lg px-3 py-2 mt-1 text-sm ${
                    errors.platform ? "border-red-500" : "border-gray-200"
                  }`}
                  value={formValues.platform}
                  onChange={handleInputChange}
                  required
                  aria-invalid={!!errors.platform}
                  aria-describedby={
                    errors.platform ? "platform-error" : undefined
                  }
                >
                  <option value="">Select...</option>
                  <option>WordPress</option>
                  <option>React/Next.js</option>
                  <option>Shopify</option>
                  <option>Webflow</option>
                  <option>Not Sure</option>
                </select>
                {errors.platform && (
                  <p
                    id="platform-error"
                    className="text-xs text-red-500 mt-1 flex items-center"
                  >
                    <AlertCircle className="h-4 w-4 mr-1" /> {errors.platform}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="timeline"
                  className="text-sm font-medium text-gray-700"
                >
                  Timeline *
                </Label>
                <select
                  id="timeline"
                  name="timeline"
                  className={`w-full border rounded-lg px-3 py-2 mt-1 text-sm ${
                    errors.timeline ? "border-red-500" : "border-gray-200"
                  }`}
                  value={formValues.timeline}
                  onChange={handleInputChange}
                  required
                  aria-invalid={!!errors.timeline}
                  aria-describedby={
                    errors.timeline ? "timeline-error" : undefined
                  }
                >
                  <option value="">Select...</option>
                  <option>1–3 Months</option>
                  <option>3–6 Months</option>
                  <option>6+ Months</option>
                </select>
                {errors.timeline && (
                  <p
                    id="timeline-error"
                    className="text-xs text-red-500 mt-1 flex items-center"
                  >
                    <AlertCircle className="h-4 w-4 mr-1" /> {errors.timeline}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="budget"
                  className="text-sm font-medium text-gray-700"
                >
                  Budget *
                </Label>
                <Input
                  id="budget"
                  name="budget"
                  placeholder="e.g., $5,000 - $10,000"
                  value={formValues.budget}
                  onChange={handleInputChange}
                  required
                  className={`mt-1 rounded-lg border-gray-200 ${
                    errors.budget ? "border-red-500" : ""
                  }`}
                  aria-invalid={!!errors.budget}
                  aria-describedby={errors.budget ? "budget-error" : undefined}
                />
                {errors.budget && (
                  <p
                    id="budget-error"
                    className="text-xs text-red-500 mt-1 flex items-center"
                  >
                    <AlertCircle className="h-4 w-4 mr-1" /> {errors.budget}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="additionalNotes"
                  className="text-sm font-medium text-gray-700"
                >
                  Additional Notes
                </Label>
                <textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  placeholder="Any specific requirements?"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1 text-sm"
                  rows={3}
                  value={formValues.additionalNotes}
                  onChange={handleInputChange}
                  aria-label="Additional notes for your consultation"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep(2)}
                  className="w-full text-sm flex items-center justify-center"
                  aria-label="Back to time selection"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" /> Back
                </Button>
                <Button
                  type="submit"
                  className="w-full bg-indigo-600 text-white hover:bg-indigo-700 text-sm"
                  aria-label="Confirm consultation booking"
                >
                  Confirm Booking
                </Button>
              </div>

              <p className="text-xs text-gray-500 text-center mt-3">
                By submitting, you agree to our{" "}
                <a href="#" className="underline hover:text-indigo-600">
                  Terms of Use
                </a>{" "}
                and{" "}
                <a href="#" className="underline hover:text-indigo-600">
                  Privacy Policy
                </a>
                .
              </p>
            </motion.form>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <motion.div
              key="confirmation"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full text-center space-y-5"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, ease: "backOut" }}
              >
                <CheckCircle className="h-12 w-12 text-indigo-600 mx-auto" />
              </motion.div>
              <h3 className="text-lg font-medium text-gray-900">
                Booking Confirmed
              </h3>
              <p className="text-sm text-gray-600">
                Your discovery call is scheduled for{" "}
                <strong>{date?.toLocaleDateString()}</strong> at{" "}
                <strong>
                  {selectedTime} ({selectedTimeZone})
                </strong>
                . A confirmation email will be sent soon.
              </p>
              <Button
                onClick={() => {
                  setStep(1);
                  setDate(null);
                  setSelectedTime(null);
                  setFormValues({
                    name: "",
                    email: "",
                    company: "",
                    websiteType: "",
                    platform: "",
                    timeline: "",
                    budget: "",
                    additionalNotes: "",
                    phone: "",
                  });
                  setErrors({});
                }}
                className="bg-indigo-600 text-white hover:bg-indigo-700 text-sm"
                aria-label="Book another consultation"
              >
                Book Another Call
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default ConsultationCard;
