"use client";

import { Sparkles, TrendingUp, Target, BarChart3 } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { StaggerReveal, StaggerItem } from "@/components/ui/ScrollReveal";

// Inline social icons (lucide-react doesn't export Instagram/Facebook)
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

const features = [
  { icon: Sparkles, label: "AI Captions & Hashtags" },
  { icon: InstagramIcon, label: "Instagram Publishing" },
  { icon: FacebookIcon, label: "Facebook Publishing" },
  { icon: Target, label: "Paid Campaign Management" },
  { icon: BarChart3, label: "Campaign Analytics" },
  { icon: TrendingUp, label: "Lead Generation" },
];

export default function MarketingSection() {
  return (
    <section
      className="section-padding bg-gradient-to-br from-[#0f1c2e] via-[#162540] to-[#1e3a5f] relative overflow-hidden"
      aria-labelledby="marketing-heading"
    >
      {/* Background texture */}
      <div className="absolute inset-0 dot-grid opacity-[0.06] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — Copy */}
          <div>
            <ScrollReveal>
              <p className="text-[#f97316] text-sm font-semibold uppercase tracking-wider mb-3">
                Marketing
              </p>
              <h2
                id="marketing-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-6"
              >
                Market Your Properties Without Becoming a Marketing Expert.
              </h2>
              <p className="text-lg text-white/70 leading-relaxed mb-8">
                The Realty Bazaar handles the marketing complexity — AI content,
                social publishing and paid campaigns — so you can focus on
                selling properties.
              </p>
            </ScrollReveal>

            <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {features.map((feature) => (
                <StaggerItem key={feature.label}>
                  <div className="flex items-center gap-3 px-4 py-3 bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl transition-all duration-200">
                    <feature.icon className="w-4 h-4 text-[#f97316] shrink-0" />
                    <span className="text-sm text-white/90 font-medium">
                      {feature.label}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>

          {/* Right — Marketing dashboard mockup */}
          <ScrollReveal direction="left" delay={0.2}>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                <div>
                  <div className="text-white font-bold text-sm">Marketing Dashboard</div>
                  <div className="text-white/50 text-xs mt-0.5">August 2026</div>
                </div>
                <span className="text-xs bg-green-500/20 text-green-400 px-2.5 py-1 rounded-lg border border-green-500/20 font-medium">
                  Live
                </span>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label: "Total Leads", value: "127", change: "+18%" },
                  { label: "Avg. CPL", value: "₹183", change: "-12%" },
                  { label: "Properties", value: "14", change: "+3" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
                    <div className="text-white font-bold text-base">{stat.value}</div>
                    <div className="text-white/50 text-[10px] mt-0.5">{stat.label}</div>
                    <div className="text-green-400 text-[10px] font-medium mt-1">{stat.change}</div>
                  </div>
                ))}
              </div>

              {/* Active campaigns */}
              <div className="space-y-2">
                <div className="text-white/50 text-[11px] font-semibold uppercase tracking-wider mb-2">
                  Active Campaigns
                </div>
                {[
                  {
                    property: "3 BHK — Vesu",
                    type: "Instagram Reel",
                    leads: 24,
                    cpl: "₹183",
                    status: "Running",
                    statusColor: "text-green-400 bg-green-400/10",
                  },
                  {
                    property: "4 BHK Villa — Adajan",
                    type: "Facebook Post",
                    leads: 11,
                    cpl: "₹241",
                    status: "Running",
                    statusColor: "text-green-400 bg-green-400/10",
                  },
                  {
                    property: "2 BHK — Pal",
                    type: "Meta Ads",
                    leads: 8,
                    cpl: "₹312",
                    status: "Paused",
                    statusColor: "text-yellow-400 bg-yellow-400/10",
                  },
                ].map((campaign) => (
                  <div
                    key={campaign.property}
                    className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#f97316] to-[#ea6c00] flex items-center justify-center shrink-0">
                      <span className="text-white text-xs font-bold">
                        {campaign.property.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-xs font-semibold truncate">
                        {campaign.property}
                      </div>
                      <div className="text-white/50 text-[10px]">{campaign.type}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-white text-xs font-bold">{campaign.leads} leads</div>
                      <div className="text-white/50 text-[10px]">{campaign.cpl}/lead</div>
                    </div>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-lg font-medium shrink-0 ${campaign.statusColor}`}
                    >
                      {campaign.status}
                    </span>
                  </div>
                ))}
              </div>

              {/* AI content suggestion */}
              <div className="mt-4 p-3 bg-[#f97316]/10 border border-[#f97316]/20 rounded-xl">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-[#f97316] mt-0.5 shrink-0" />
                  <div>
                    <div className="text-white text-xs font-semibold mb-1">AI Suggestion</div>
                    <div className="text-white/70 text-[11px] leading-relaxed">
                      &ldquo;Boost your 3 BHK Vesu campaign — CPL is down 12% this
                      week. Suggest increasing budget by ₹50/day.&rdquo;
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
