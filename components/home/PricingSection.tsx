import { Check, Star, ExternalLink, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { BROKER_PORTAL_URL } from "@/lib/constants";

const plans = [
  {
    id: "trial",
    name: "Trial Plan",
    price: "₹4,499",
    period: "one-time",
    description: "Try the complete platform for 30 days with no recurring commitment.",
    features: [
      "Full CRM & lead management",
      "AI marketing content generation",
      "Social media post publishing",
      "Up to 10 active property listings",
      "30-day full access trial",
      "Mobile app access (iOS & Android)",
    ],
    highlighted: false,
    badge: null,
    ctaLabel: "Start Trial",
    ctaVariant: "outline" as const,
  },
  {
    id: "basic",
    name: "Starter Broker",
    price: "₹999",
    period: "/month",
    description: "Essential tools for independent brokers managing local listings.",
    features: [
      "Unlimited property uploads",
      "Integrated CRM & lead tracker",
      "AI property descriptions & captions",
      "Instagram & Facebook publishing",
      "Verified website property listings",
      "Instant WhatsApp inquiry capture",
    ],
    highlighted: false,
    badge: null,
    ctaLabel: "Subscribe Starter",
    ctaVariant: "outline" as const,
  },
  {
    id: "standard",
    name: "Growth Pro",
    price: "₹14,999",
    period: "/month",
    description: "Full marketing + automated Meta Ads campaigns for serious brokers.",
    features: [
      "Everything in Starter",
      "Managed Meta & Google property ads",
      "Up to ₹350/day advertising allocation",
      "Campaign analytics & lead scoring",
      "Automated follow-ups & reminders",
      "Dedicated account manager",
    ],
    highlighted: true,
    badge: "Most Popular",
    ctaLabel: "Subscribe Growth",
    ctaVariant: "primary" as const,
  },
  {
    id: "premium",
    name: "High-Volume Elite",
    price: "₹19,999",
    period: "/month",
    description: "Aggressive advertising & high-speed deal pipeline for top producers.",
    features: [
      "Everything in Growth Pro",
      "Up to ₹500/day advertising allocation",
      "Video content campaigns & reels",
      "Advanced AI property match recommendations",
      "Priority WhatsApp & phone support",
      "Custom branding on listing flyers",
    ],
    highlighted: false,
    badge: null,
    ctaLabel: "Subscribe Elite",
    ctaVariant: "outline" as const,
  },
  {
    id: "enterprise",
    name: "Agency & Teams",
    price: "Custom",
    period: "",
    description: "For real-estate agencies and multi-broker channel teams.",
    features: [
      "Custom advertising budget allocation",
      "Multiple sub-broker & agent logins",
      "Custom campaign strategy & creative",
      "Dedicated agency account director",
      "API & custom CRM integrations",
      "Team performance dashboard",
    ],
    highlighted: false,
    badge: null,
    ctaLabel: "Contact Sales",
    ctaVariant: "outline" as const,
  },
];

export default function PricingSection() {
  return (
    <section className="py-16 lg:py-24 bg-[#F8FAFC]" aria-labelledby="pricing-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#EAF3FF] text-[#245FA8] border border-[#6FA5E5]/30 rounded-full text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#397BCF]" />
            <span>Broker Platform & Marketing Plans</span>
          </div>
          <h2
            id="pricing-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#172033] mb-4 tracking-tight"
          >
            Simple, Transparent Pricing for Brokers
          </h2>
          <p className="text-base sm:text-lg text-[#667085] leading-relaxed">
            Market properties across social media, automate verified listings, and manage your buyer leads from one unified platform.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-6 h-full flex flex-col transition-all duration-300 ${
                plan.highlighted
                  ? "bg-white border-2 border-[#397BCF] shadow-[0_12px_40px_-8px_rgba(57,123,207,0.22)] scale-[1.03] z-10"
                  : "bg-white border border-[#E4EAF2] hover:border-[#397BCF]/60 shadow-xs hover:shadow-md"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="flex items-center gap-1 bg-[#397BCF] text-white text-[11px] font-bold px-3.5 py-1 rounded-full shadow-md whitespace-nowrap">
                    <Star className="w-3 h-3 fill-white" />
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6">
                <div
                  className={`text-xs font-bold uppercase tracking-wider mb-2 ${
                    plan.highlighted ? "text-[#397BCF]" : "text-[#667085]"
                  }`}
                >
                  {plan.name}
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl font-display font-bold text-[#172033]">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-xs font-medium text-[#667085]">{plan.period}</span>
                  )}
                </div>
                <p className="text-xs text-[#667085] leading-relaxed min-h-[36px]">
                  {plan.description}
                </p>
              </div>

              {/* Features List */}
              <ul className="space-y-2.5 flex-1 mb-6 pt-4 border-t border-[#E4EAF2]">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check
                      className={`w-4 h-4 mt-0.5 shrink-0 ${
                        plan.highlighted ? "text-[#397BCF]" : "text-green-600"
                      }`}
                    />
                    <span className="text-xs font-medium text-[#475467] leading-tight">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Action redirecting to Broker Portal for payment / onboarding */}
              {plan.id === "enterprise" ? (
                <Link
                  href="/contact"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all duration-200 border-2 border-[#172033] text-[#172033] hover:bg-[#172033] hover:text-white"
                  id={`pricing-${plan.id}-cta`}
                >
                  {plan.ctaLabel}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ) : (
                <a
                  href={`${BROKER_PORTAL_URL}?plan=${plan.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={`pricing-${plan.id}-cta`}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all duration-200 ${
                    plan.highlighted
                      ? "bg-[#397BCF] hover:bg-[#245FA8] text-white shadow-sm hover:shadow-md active:scale-95"
                      : "border-2 border-[#397BCF] text-[#397BCF] hover:bg-[#EAF3FF] active:scale-95"
                  }`}
                >
                  <span>{plan.ctaLabel}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Payment & Subscription Notes */}
        <div className="mt-12 bg-white border border-[#E4EAF2] rounded-2xl p-6 text-center max-w-3xl mx-auto space-y-2 shadow-2xs">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#172033]">
            <ShieldCheck className="w-4 h-4 text-[#397BCF]" />
            <span>Secure Checkout & Billing via Broker Portal ({BROKER_PORTAL_URL.replace(/^https?:\/\//, "")})</span>
          </div>
          <p className="text-xs text-[#667085] leading-relaxed">
            Payments, invoices, GST receipts, and advertising allocations are managed directly in your verified broker dashboard. Advertising spend is dynamically optimized across Meta (Instagram / Facebook) and Google Search.
          </p>
        </div>
      </div>
    </section>
  );
}
