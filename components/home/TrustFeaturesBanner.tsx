"use client";

import { Award, PhoneCall, Calendar, Camera, ChevronRight } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Award,
    iconBg: "bg-[#245FA8]",
    title: "Verified Broker Listings",
    desc: "Direct access to verified brokers and genuine ground property listings.",
    actionText: "100% Verified",
    actionHref: "/how-it-works",
    textColor: "text-[#245FA8]",
  },
  {
    icon: PhoneCall,
    iconBg: "bg-[#22C55E]",
    title: "Direct WhatsApp & Call",
    desc: "Connect instantly with brokers via WhatsApp or call for faster responses.",
    actionText: "Instant Connection",
    actionHref: "/properties",
    textColor: "text-[#22C55E]",
  },
  {
    icon: Calendar,
    iconBg: "bg-[#7C3AED]",
    title: "Site Visit Coordination",
    desc: "Schedule property visits at your convenience with broker assistance.",
    actionText: "Book Visit",
    actionHref: "/properties",
    textColor: "text-[#7C3AED]",
  },
  {
    icon: Camera,
    iconBg: "bg-[#F97316]",
    title: "High-Res Photography",
    desc: "Explore properties with high-quality photos and detailed information.",
    actionText: "Better Decisions",
    actionHref: "/properties",
    textColor: "text-[#F97316]",
  },
];

export default function TrustFeaturesBanner() {
  return (
    <section className="py-8 bg-white border-b border-[#E4EAF2]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                href={item.actionHref}
                className="group p-5 rounded-2xl bg-[#F8FAFC] hover:bg-white border border-[#E4EAF2] hover:border-[#397BCF]/40 shadow-2xs hover:shadow-md transition-all duration-200 flex items-start gap-4 text-left"
              >
                <div
                  className={`w-11 h-11 rounded-2xl ${item.iconBg} flex items-center justify-center text-white shrink-0 shadow-2xs group-hover:scale-105 transition-transform duration-200`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-[#172033] group-hover:text-[#245FA8] transition-colors">
                    {item.title}
                  </div>
                  <p className="text-xs text-[#667085] mt-1 leading-relaxed line-clamp-2">
                    {item.desc}
                  </p>
                  <div
                    className={`mt-2 inline-flex items-center text-xs font-bold ${item.textColor} group-hover:translate-x-0.5 transition-transform`}
                  >
                    <span>{item.actionText}</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
