"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Upload, Sparkles, Hash, Eye, Share2, Check, Download } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Link from "next/link";

const APP_URL =
  process.env.NEXT_PUBLIC_PLAY_STORE_URL ||
  "https://play.google.com/store/apps/details?id=com.therealtybazaar";

const steps = [
  { icon: Upload, label: "Upload Video", description: "Add your property video from camera roll" },
  { icon: Sparkles, label: "AI Caption", description: "AI writes the perfect caption instantly" },
  { icon: Hash, label: "AI Hashtags", description: "Relevant hashtags selected automatically" },
  { icon: Eye, label: "Preview", description: "Review your post before publishing" },
  { icon: Share2, label: "Publish", description: "One tap to Instagram + Facebook" },
];

export default function SocialMediaSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      className="section-padding bg-[#F8FAFC]"
      aria-labelledby="social-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-14">
          <p className="text-[#397BCF] text-sm font-semibold uppercase tracking-wider mb-3">
            Social Media
          </p>
          <h2
            id="social-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#172033] mb-4"
          >
            Create Once.{" "}
            <span className="gradient-text-primary">Publish Everywhere.</span>
          </h2>
          <p className="text-lg text-[#667085] max-w-2xl mx-auto">
            Connect your Instagram and Facebook accounts once in the app.
            Then manage all your property content from one place.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left — workflow */}
          <div ref={ref} className="space-y-3">
            {steps.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-4"
              >
                {/* Step circle */}
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-[#172033] flex items-center justify-center shadow-sm">
                    <step.icon className="w-5 h-5 text-[#6FA5E5]" />
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-0.5 h-5 bg-[#E4EAF2] mt-1" />
                  )}
                </div>

                {/* Step content */}
                <div className="flex-1 bg-white border border-[#E4EAF2] rounded-xl px-4 py-3 shadow-sm">
                  <div className="font-bold text-sm text-[#172033]">{step.label}</div>
                  <div className="text-xs text-[#667085] mt-0.5">{step.description}</div>
                </div>
              </motion.div>
            ))}

            {/* Success state */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="flex items-center gap-3 px-4 py-3 bg-green-50 border border-green-200 rounded-xl"
            >
              <div className="w-8 h-8 rounded-xl bg-green-500 flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-sm font-bold text-green-800">Published!</div>
                <div className="text-xs text-green-600">Live on Instagram &amp; Facebook</div>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg">
                  <svg viewBox="0 0 24 24" className="w-3 h-3 fill-white" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"/>
                  </svg>
                  <span className="text-white text-[10px] font-bold">IG</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 bg-[#1877f2] rounded-lg">
                  <svg viewBox="0 0 24 24" className="w-3 h-3 fill-white" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="text-white text-[10px] font-bold">FB</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right — post preview */}
          <ScrollReveal direction="left" delay={0.2}>
            <div className="bg-white border border-[#E4EAF2] rounded-2xl overflow-hidden shadow-md">
              {/* Instagram-style post */}
              <div className="flex items-center gap-2.5 px-4 py-3 border-b border-[#E4EAF2]">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">R</span>
                </div>
                <div>
                  <div className="text-sm font-bold text-[#172033]">rajesh.properties</div>
                  <div className="text-[10px] text-[#667085]">Vesu, Surat · Sponsored</div>
                </div>
                <div className="ml-auto">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#172033]" aria-hidden="true">
                    <circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/>
                  </svg>
                </div>
              </div>

              {/* Property image */}
              <div className="aspect-square bg-gradient-to-br from-[#172033] to-[#3a5280] relative">
                <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-white font-bold text-lg">3 BHK Apartment</div>
                  <div className="text-white/80 text-sm">Vesu, Surat · ₹1.25 Cr</div>
                </div>
              </div>

              {/* Caption */}
              <div className="px-4 pt-3 pb-4">
                <p className="text-xs text-[#172033] leading-relaxed">
                  <strong>✨ Your dream home awaits!</strong> Spacious 3 BHK in Vesu, Surat.
                  Premium amenities, modern interiors &amp; excellent connectivity.
                  <span className="text-[#397BCF]"> #VesuSurat #3BHK #SuratRealEstate #DreamHome #PropertyForSale</span>
                </p>
                <div className="mt-2 text-[10px] text-[#98A2B3]">Generated by Realty AI · Published via The Realty Bazaar</div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal className="mt-12 text-center">
          <Link
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            id="social-get-app"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#397BCF] hover:bg-[#245FA8] text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
          >
            <Download className="w-4 h-4" />
            Start Publishing from the App
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
