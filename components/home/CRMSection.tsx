"use client";

import { Bell, Phone, Calendar, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const pipeline = [
  { stage: "New Lead", count: 6, color: "bg-blue-500", textColor: "text-blue-700", bg: "bg-blue-50" },
  { stage: "Contacted", count: 8, color: "bg-[#f97316]", textColor: "text-[#ea6c00]", bg: "bg-[#fff7ed]" },
  { stage: "Qualified", count: 5, color: "bg-purple-500", textColor: "text-purple-700", bg: "bg-purple-50" },
  { stage: "Site Visit", count: 3, color: "bg-cyan-500", textColor: "text-cyan-700", bg: "bg-cyan-50" },
  { stage: "Negotiation", count: 2, color: "bg-yellow-500", textColor: "text-yellow-700", bg: "bg-yellow-50" },
  { stage: "Closed", count: 1, color: "bg-green-500", textColor: "text-green-700", bg: "bg-green-50" },
];

const sampleLeads = [
  {
    name: "Priya Sharma",
    property: "3 BHK — Vesu, Surat",
    budget: "₹1.2–1.4 Cr",
    source: "Instagram",
    lastActivity: "Called 2h ago",
    nextFollowup: "Tomorrow 11 AM",
    stage: "Site Visit",
    avatar: "P",
    avatarColor: "from-pink-400 to-rose-500",
  },
  {
    name: "Rohan Mehta",
    property: "4 BHK Villa — Adajan",
    budget: "₹2.5 Cr",
    source: "Facebook Ads",
    lastActivity: "WhatsApp 1d ago",
    nextFollowup: "Today 4 PM",
    stage: "Negotiation",
    avatar: "R",
    avatarColor: "from-blue-400 to-indigo-500",
  },
  {
    name: "Anjali Patel",
    property: "2 BHK — Pal",
    budget: "₹60–70 Lakh",
    source: "The Realty Bazaar",
    lastActivity: "Enquiry 3h ago",
    nextFollowup: "Today 6 PM",
    stage: "New Lead",
    avatar: "A",
    avatarColor: "from-green-400 to-emerald-500",
  },
];

const leadSources = ["Instagram", "Facebook", "Meta Ads", "The Realty Bazaar", "Manual Entry"];

export default function CRMSection() {
  return (
    <section
      className="section-padding bg-[#fafafa]"
      aria-labelledby="crm-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-14">
          <p className="text-[#f97316] text-sm font-semibold uppercase tracking-wider mb-3">
            CRM
          </p>
          <h2
            id="crm-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#0f1c2e] mb-4"
          >
            Every Lead. Every Follow-Up.{" "}
            <br className="hidden sm:block" />
            One Place.
          </h2>
          <p className="text-lg text-[#64748b] max-w-2xl mx-auto">
            All your leads — from social media, paid ads, website enquiries and
            manual entries — land in your mobile CRM automatically.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-6">

          {/* Pipeline sidebar */}
          <ScrollReveal direction="right" className="lg:col-span-1">
            <div className="bg-white border border-[#e2e8f0] rounded-2xl p-4 shadow-sm">
              <div className="text-xs font-bold text-[#0f1c2e] uppercase tracking-wider mb-4">
                Pipeline
              </div>
              <div className="space-y-2">
                {pipeline.map((stage) => (
                  <div key={stage.stage} className={`flex items-center justify-between px-3 py-2.5 rounded-xl ${stage.bg}`}>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${stage.color}`} />
                      <span className={`text-xs font-semibold ${stage.textColor}`}>
                        {stage.stage}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-[#0f1c2e]">{stage.count}</span>
                  </div>
                ))}
              </div>

              {/* Lead sources */}
              <div className="mt-5 pt-4 border-t border-[#e2e8f0]">
                <div className="text-xs font-bold text-[#0f1c2e] uppercase tracking-wider mb-3">
                  Lead Sources
                </div>
                <div className="space-y-1.5">
                  {leadSources.map((src) => (
                    <div key={src} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#f97316]" />
                      <span className="text-[11px] text-[#64748b]">{src}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Lead cards */}
          <div className="lg:col-span-4 space-y-4">
            {sampleLeads.map((lead, i) => (
              <ScrollReveal key={lead.name} delay={i * 0.1}>
                <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    {/* Avatar + name */}
                    <div className="flex items-center gap-3 sm:w-48 shrink-0">
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${lead.avatarColor} flex items-center justify-center text-white font-bold shrink-0`}
                      >
                        {lead.avatar}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-[#0f1c2e]">{lead.name}</div>
                        <span className="text-[10px] bg-[#eef3f8] text-[#3a6496] px-2 py-0.5 rounded-md font-medium">
                          {lead.stage}
                        </span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div>
                        <div className="text-[10px] text-[#94a3b8] uppercase tracking-wide mb-0.5">Property</div>
                        <div className="text-xs font-semibold text-[#0f1c2e]">{lead.property}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[#94a3b8] uppercase tracking-wide mb-0.5">Budget</div>
                        <div className="text-xs font-semibold text-[#0f1c2e]">{lead.budget}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[#94a3b8] uppercase tracking-wide mb-0.5">Source</div>
                        <div className="text-xs font-semibold text-[#f97316]">{lead.source}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[#94a3b8] uppercase tracking-wide mb-0.5">Last Activity</div>
                        <div className="text-xs text-[#64748b]">{lead.lastActivity}</div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 sm:flex-col sm:items-end shrink-0">
                      <div className="flex items-center gap-1.5 text-[10px] text-[#64748b] bg-[#eef3f8] px-2.5 py-1 rounded-lg">
                        <Calendar className="w-3 h-3" />
                        {lead.nextFollowup}
                      </div>
                      <div className="flex gap-1.5">
                        <button className="w-8 h-8 rounded-lg bg-green-50 hover:bg-green-100 flex items-center justify-center transition-colors" aria-label="Call">
                          <Phone className="w-3.5 h-3.5 text-green-600" />
                        </button>
                        <button className="w-8 h-8 rounded-lg bg-[#fff7ed] hover:bg-[#ffedd5] flex items-center justify-center transition-colors" aria-label="Reminder">
                          <Bell className="w-3.5 h-3.5 text-[#f97316]" />
                        </button>
                        <button className="w-8 h-8 rounded-lg bg-[#eef3f8] hover:bg-[#d0dde8] flex items-center justify-center transition-colors" aria-label="View">
                          <ArrowRight className="w-3.5 h-3.5 text-[#0f1c2e]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}

            {/* Note */}
            <ScrollReveal delay={0.3}>
              <div className="bg-[#fff7ed] border border-[#fdba74] rounded-2xl p-4 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#f97316] flex items-center justify-center shrink-0">
                  <Bell className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#0f1c2e] mb-1">
                    Never miss a follow-up
                  </div>
                  <div className="text-sm text-[#64748b]">
                    The app sends you reminders for overdue follow-ups and
                    upcoming site visits — so no lead ever goes cold.
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
