"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";

const DynamicMap = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
});

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const SOCIALS = [
  { icon: Instagram, href: "https://instagram.com" },
  { icon: Twitter, href: "https://twitter.com" },
  { icon: Linkedin, href: "https://linkedin.com" },
];

const ContactInfoMap = () => (
  <section className=" py-24 text-white relative">
    <div className="container mx-auto px-6 lg:px-12 max-w-[1400px]">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
        }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center"
      >
        {/* Info */}
        <motion.div variants={fadeUp} className="lg:col-span-5 space-y-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Global Reach, <br />
              <span className="text-violet-400">Local Presence.</span>
            </h2>
            <p className="text-slate-400 text-lg">
              Visit our office or reach out to us via phone or email. We're
              always excited to welcome new partners.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1">Headquarters</h4>
                <p className="text-slate-400 leading-relaxed">
                  Alomonx, Kurji, Digha
                  <br />
                  Patna, Bihar, India
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1">Direct Line</h4>
                <a
                  href="tel:+919234625064"
                  className="text-slate-400 hover:text-violet-400 transition-colors"
                >
                  +91 92346 25064
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1">Email Us</h4>
                <a
                  href="mailto:info@alomonx.com"
                  className="text-slate-400 hover:text-violet-400 transition-colors"
                >
                  info@alomonx.com
                </a>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10">
            <p className="text-sm text-slate-500 uppercase tracking-widest mb-4 font-semibold">
              Follow Us
            </p>
            <div className="flex gap-4">
              {SOCIALS.map(({ icon: Icon, href }, idx) => (
                <a
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-violet-500 hover:text-white hover:border-violet-500 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Map */}
        <motion.div variants={fadeUp} className="lg:col-span-7 w-full">
          <div className="p-2 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
            <div className="bg-slate-800 h-[450px] rounded-xl overflow-hidden relative">
              <DynamicMap />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default ContactInfoMap;
