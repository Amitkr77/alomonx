"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export default function ContactModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal — full-width bottom sheet on mobile, wide card on sm+ */}
          <motion.div
            className="relative w-full sm:max-w-6xl bg-transparent sm:rounded-2xl rounded-t-2xl overflow-hidden shadow-2xl z-10"
            initial={{ scale: 0.97, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.97, opacity: 0, y: 30 }}
            transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
          >
            {/* Drag handle — mobile only */}
            <div className="flex justify-center pt-3 pb-1 sm:hidden bg-[#050810] rounded-t-2xl">
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 sm:top-4 right-3 sm:right-4 p-1.5 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full z-20 transition-colors"
              aria-label="Close Contact Form"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Scrollable form area */}
            <div
              className="overflow-y-auto w-full"
              style={{ maxHeight: "90vh" }}
            >
              <ContactForm />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
