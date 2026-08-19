import { Search, List, FileText, Phone, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { StaggerReveal, StaggerItem } from "@/components/ui/ScrollReveal";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Search Properties",
    description: "Search by city, locality, property type, BHK or budget.",
    color: "bg-[#EAF3FF] text-[#397BCF]",
  },
  {
    number: "02",
    icon: List,
    title: "Compare Listings",
    description: "Browse and compare properties side by side.",
    color: "bg-[#F3F8FE] text-[#245FA8]",
  },
  {
    number: "03",
    icon: FileText,
    title: "View Property Details",
    description: "See photos, videos, amenities and full property information.",
    color: "bg-[#EAF3FF] text-[#397BCF]",
  },
  {
    number: "04",
    icon: Phone,
    title: "Contact Broker",
    description: "Call, WhatsApp or send an enquiry — no account needed.",
    color: "bg-green-50 text-green-600",
  },
  {
    number: "05",
    icon: Calendar,
    title: "Schedule a Site Visit",
    description: "Request a site visit directly from the property page.",
    color: "bg-cyan-50 text-cyan-600",
  },
];

export default function HowItWorksSeeker() {
  return (
    <section
      className="section-padding bg-white border-t border-[#E4EAF2]"
      aria-labelledby="seeker-how-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-14">
          <p className="text-[#397BCF] text-sm font-semibold uppercase tracking-wider mb-3">
            For Property Seekers
          </p>
          <h2
            id="seeker-how-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#172033] mb-4"
          >
            Looking for a Property?
          </h2>
          <p className="text-lg text-[#667085] max-w-2xl mx-auto">
            Browse properties listed by verified brokers. No account required
            to view listings or contact a broker.
          </p>
        </ScrollReveal>

        <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          {steps.map((step, i) => (
            <StaggerItem key={step.number}>
              <div className="relative text-center group">
                <div className={`w-12 h-12 rounded-xl ${step.color} flex items-center justify-center mx-auto mb-4`}>
                  <step.icon className="w-6 h-6" />
                </div>
                <div className="text-[10px] font-bold text-[#98A2B3] uppercase tracking-wider mb-1">
                  Step {step.number}
                </div>
                <h3 className="text-sm font-bold text-[#172033] mb-2">{step.title}</h3>
                <p className="text-xs text-[#667085] leading-relaxed">{step.description}</p>

                {/* Connector */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute right-0 top-6 translate-x-1/2">
                    <ArrowRight className="w-4 h-4 text-[#D0D5DD]" />
                  </div>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>

        <ScrollReveal className="text-center">
          <Link
            href="/properties"
            id="seeker-browse-cta"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#397BCF] hover:bg-[#245FA8] text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
          >
            Browse Properties
            <ArrowRight className="w-4 h-4" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
