"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Sparkles, Send, Bot } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const aiConversations = [
  {
    prompt: "Create a caption for this property.",
    response:
      '✨ Discover your dream home! 🏠 Spacious 3 BHK in the heart of Vesu, Surat. Premium amenities, modern interiors & excellent connectivity. 1,650 sq ft of pure comfort at ₹1.25 Cr.\n\n#VesuSurat #3BHK #SuratRealEstate #DreamHome #PropertyForSale',
    category: "Content",
  },
  {
    prompt: "Which property should I promote this week?",
    response:
      "Based on current market trends, I recommend promoting your **3 BHK in Vesu**. It's received 12 enquiries in the last 7 days and your CPL has dropped to ₹183 — the lowest across your portfolio. A ₹50/day boost could generate 8–12 more leads.",
    category: "Strategy",
  },
  {
    prompt: "Why did my CPL increase?",
    response:
      "Your CPL increased from ₹183 to ₹241 on the Adajan campaign this week. The primary reason: audience saturation — your ad has been shown to 78% of your target audience. Suggest refreshing the creative or expanding the radius by 5 km.",
    category: "Analytics",
  },
  {
    prompt: "Write a follow-up message for Priya Sharma.",
    response:
      "Hi Priya! Hope you're doing well. I wanted to check if you had a chance to think about the 3 BHK in Vesu we discussed. The developer has a special offer this month. Would you be free for a site visit this weekend? 😊",
    category: "CRM",
  },
];

export default function AISection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [activeIdx, setActiveIdx] = useState(0);
  const active = aiConversations[activeIdx];

  return (
    <section
      className="section-padding bg-white"
      aria-labelledby="ai-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — copy */}
          <ScrollReveal>
            <p className="text-[#f97316] text-sm font-semibold uppercase tracking-wider mb-3">
              AI Assistant
            </p>
            <h2
              id="ai-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#0f1c2e] mb-6"
            >
              AI That Works Like Your Marketing Assistant.
            </h2>
            <p className="text-lg text-[#64748b] leading-relaxed mb-8">
              Ask the AI anything about your properties, campaigns or leads.
              It understands your business and gives you practical, actionable
              answers — not generic suggestions.
            </p>

            {/* Prompt chips */}
            <div className="space-y-2.5">
              {aiConversations.map((conv, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-200 text-sm font-medium ${
                    activeIdx === i
                      ? "border-[#f97316] bg-[#fff7ed] text-[#0f1c2e]"
                      : "border-[#e2e8f0] hover:border-[#0f1c2e] text-[#64748b] hover:text-[#0f1c2e]"
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#94a3b8] block mb-0.5">
                    {conv.category}
                  </span>
                  &ldquo;{conv.prompt}&rdquo;
                </button>
              ))}
            </div>

            <p className="text-sm text-[#94a3b8] mt-6">
              AI is deeply integrated into the mobile app — not a standalone
              chatbot. Every response is grounded in your real data.
            </p>
          </ScrollReveal>

          {/* Right — AI chat interface */}
          <ScrollReveal direction="left" delay={0.2}>
            <div ref={ref} className="bg-[#0f1c2e] rounded-2xl overflow-hidden shadow-2xl">
              {/* Chat header */}
              <div className="px-5 py-4 border-b border-white/10 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#f97316] to-[#ea6c00] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm">Realty AI</div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-white/50 text-xs">Active</span>
                  </div>
                </div>
              </div>

              {/* Chat body */}
              <div className="p-5 min-h-[320px] space-y-4">
                {/* User message */}
                <motion.div
                  key={`user-${activeIdx}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-end"
                >
                  <div className="max-w-[80%] bg-[#f97316] text-white text-sm px-4 py-3 rounded-2xl rounded-tr-sm">
                    {active.prompt}
                  </div>
                </motion.div>

                {/* AI response */}
                <motion.div
                  key={`ai-${activeIdx}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#f97316] to-[#ea6c00] flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 bg-white/10 text-white/90 text-sm px-4 py-3 rounded-2xl rounded-tl-sm leading-relaxed">
                    {active.response}
                  </div>
                </motion.div>
              </div>

              {/* Input area */}
              <div className="px-5 py-4 border-t border-white/10">
                <div className="flex items-center gap-3 bg-white/10 border border-white/10 rounded-xl px-4 py-2.5">
                  <input
                    type="text"
                    placeholder="Ask Realty AI anything..."
                    className="flex-1 bg-transparent text-white/70 text-sm outline-none placeholder:text-white/30"
                    readOnly
                    aria-label="AI prompt input (demo)"
                  />
                  <button className="w-8 h-8 rounded-lg bg-[#f97316] flex items-center justify-center shrink-0" aria-label="Send">
                    <Send className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
