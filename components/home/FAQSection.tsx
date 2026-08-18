"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

const brokerFaqs = [
  {
    question: "What is The Realty Bazaar?",
    answer:
      "The Realty Bazaar is a PropTech platform for Indian real-estate brokers. It combines property marketing, social media publishing, paid advertising, lead capture and CRM management into one mobile app. The public website is a property discovery platform where buyers can find and contact brokers.",
  },
  {
    question: "Is The Realty Bazaar a CRM?",
    answer:
      "Yes — but it's much more than a CRM. It includes property marketing, AI content generation, social media publishing, paid campaign management and a public property marketplace. The CRM is built specifically for real estate brokers.",
  },
  {
    question: "How do I upload properties?",
    answer:
      "Properties are uploaded through the mobile app — not through this website. Download the app, create your account and start adding properties from your phone.",
  },
  {
    question: "Do I upload properties on the website?",
    answer:
      "No. The website is a public-facing property discovery platform. Brokers manage everything — properties, campaigns, leads — through the mobile app.",
  },
  {
    question: "How do my properties appear on the website?",
    answer:
      "When you publish a property in the mobile app, it automatically appears on The Realty Bazaar website. Customer enquiries from the website flow directly into your mobile CRM.",
  },
  {
    question: "Can I publish to Instagram and Facebook?",
    answer:
      "Yes. Connect your Instagram and Facebook accounts through the mobile app. Then publish property content — including AI-generated captions and hashtags — directly from the app.",
  },
  {
    question: "How does paid marketing work?",
    answer:
      "On Standard and Premium plans, The Realty Bazaar manages paid campaigns on your behalf using a dynamically optimized advertising allocation. The actual daily spend varies based on campaign performance — the plan shows the maximum daily allocation.",
  },
  {
    question: "How are leads captured?",
    answer:
      "Leads from Instagram, Facebook, Meta Ads, website enquiries and manual entries all land in your mobile CRM automatically. You get a notification for every new lead.",
  },
  {
    question: "Can I continue using WhatsApp?",
    answer:
      "Absolutely. The Realty Bazaar doesn't replace WhatsApp or phone calls — it becomes your system of record. Log your WhatsApp conversations and calls as activities inside the CRM while continuing to communicate through the channels you're already using.",
  },
  {
    question: "Can I manage leads from my phone?",
    answer:
      "Yes — that's the entire point. The mobile app is built first for mobile. Manage every lead, follow-up, site visit and deal from your phone.",
  },
];

const seekerFaqs = [
  {
    question: "Do I need an account to browse properties?",
    answer:
      "No. You can browse all published properties without creating an account or logging in.",
  },
  {
    question: "Do I need an account to contact a broker?",
    answer:
      "No. You can send an enquiry with just your name and phone number. No registration required.",
  },
  {
    question: "How do I contact the broker?",
    answer:
      "On each property page, you can call the broker, send a WhatsApp message or submit an enquiry form. The broker will receive your enquiry in their mobile CRM.",
  },
  {
    question: "Can I schedule a site visit?",
    answer:
      "Yes. Use the 'Schedule a Site Visit' option on the property page to request a visit. The broker will confirm the timing.",
  },
  {
    question: "Are properties listed by brokers?",
    answer:
      "Yes. All properties on The Realty Bazaar are listed by verified real-estate brokers using the mobile app. Each listing shows the broker's name and contact details.",
  },
  {
    question: "How can I report an incorrect listing?",
    answer:
      "Use the Contact page to report any incorrect or misleading listing. Our team will review and take appropriate action.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#e2e8f0] last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left flex items-center justify-between gap-4 py-5 hover:text-[#f97316] transition-colors"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-[#0f1c2e]">{question}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown className="w-4 h-4 text-[#64748b]" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-[#64748b] leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  return (
    <section
      className="section-padding bg-[#fafafa]"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-14">
          <p className="text-[#f97316] text-sm font-semibold uppercase tracking-wider mb-3">
            FAQ
          </p>
          <h2
            id="faq-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#0f1c2e] mb-4"
          >
            Frequently Asked Questions
          </h2>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Broker FAQs */}
          <ScrollReveal>
            <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-[#0f1c2e] mb-1 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#fff7ed] flex items-center justify-center text-xs">🏢</span>
                For Brokers
              </h3>
              <p className="text-xs text-[#94a3b8] mb-4">Questions about using the platform</p>
              <div>
                {brokerFaqs.map((faq) => (
                  <FAQItem key={faq.question} {...faq} />
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Seeker FAQs */}
          <ScrollReveal delay={0.1}>
            <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-[#0f1c2e] mb-1 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#eef3f8] flex items-center justify-center text-xs">🔍</span>
                For Property Seekers
              </h3>
              <p className="text-xs text-[#94a3b8] mb-4">Questions about finding properties</p>
              <div>
                {seekerFaqs.map((faq) => (
                  <FAQItem key={faq.question} {...faq} />
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
