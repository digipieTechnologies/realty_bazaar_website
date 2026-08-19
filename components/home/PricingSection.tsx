import { Check, Star, Download } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { StaggerReveal, StaggerItem } from "@/components/ui/ScrollReveal";

const APP_URL =
  process.env.NEXT_PUBLIC_PLAY_STORE_URL ||
  "https://play.google.com/store/apps/details?id=com.therealtybazaar";

const plans = [
  {
    id: "trial",
    name: "Trial",
    price: "₹4,499",
    period: "one-time",
    description: "Try the full platform with no monthly commitment.",
    features: [
      "Full platform access",
      "CRM & lead management",
      "AI content generation",
      "Social publishing",
      "Up to 10 properties",
      "30-day trial period",
    ],
    highlighted: false,
    badge: null,
    ctaLabel: "Get the App",
    ctaVariant: "outline" as const,
  },
  {
    id: "basic",
    name: "Basic",
    price: "₹999",
    period: "/month",
    description: "Essential tools for independent brokers.",
    features: [
      "Unlimited property uploads",
      "CRM & lead management",
      "AI captions & hashtags",
      "Instagram & Facebook publishing",
      "Website property listing",
      "Lead capture from all sources",
    ],
    highlighted: false,
    badge: null,
    ctaLabel: "Get the App",
    ctaVariant: "outline" as const,
  },
  {
    id: "standard",
    name: "Standard",
    price: "₹14,999",
    period: "/month",
    description: "Full marketing + CRM for serious brokers.",
    features: [
      "Everything in Basic",
      "Managed marketing campaigns",
      "Up to ₹350/day advertising allocation",
      "Campaign performance analytics",
      "Advanced CRM features",
      "Priority support",
    ],
    highlighted: true,
    badge: "Most Popular",
    ctaLabel: "Get the App",
    ctaVariant: "primary" as const,
  },
  {
    id: "premium",
    name: "Premium",
    price: "₹19,999",
    period: "/month",
    description: "Advanced campaigns for high-volume brokers.",
    features: [
      "Everything in Standard",
      "Up to ₹500/day advertising allocation",
      "Advanced campaign optimization",
      "Advanced AI recommendations",
      "Dedicated marketing support",
      "Video content campaigns",
    ],
    highlighted: false,
    badge: null,
    ctaLabel: "Get the App",
    ctaVariant: "outline" as const,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For agencies and teams with multiple brokers.",
    features: [
      "Custom advertising budget",
      "Multiple broker accounts",
      "Custom campaign strategy",
      "Dedicated account manager",
      "Advanced marketing support",
      "Custom integrations",
    ],
    highlighted: false,
    badge: null,
    ctaLabel: "Contact Us",
    ctaVariant: "outline" as const,
  },
];

export default function PricingSection() {
  return (
    <section
      className="section-padding bg-white"
      aria-labelledby="pricing-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-14">
          <p className="text-[#397BCF] text-sm font-semibold uppercase tracking-wider mb-3">
            Pricing
          </p>
          <h2
            id="pricing-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#172033] mb-4"
          >
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-[#667085] max-w-2xl mx-auto">
            All plans include access to the mobile app. Choose the level of
            marketing support that fits your business.
          </p>
        </ScrollReveal>

        <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {plans.map((plan) => (
            <StaggerItem key={plan.id}>
              <div
                className={`relative rounded-2xl p-5 h-full flex flex-col transition-all duration-300 ${
                  plan.highlighted
                    ? "bg-[#F3F8FE] border-2 border-[#397BCF] shadow-[0_0_0_4px_rgba(57,123,207,0.08)] scale-[1.02]"
                    : "bg-white border-2 border-[#E4EAF2] hover:border-[#397BCF] hover:shadow-md"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="flex items-center gap-1 bg-[#397BCF] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md">
                      <Star className="w-2.5 h-2.5" />
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="mb-5">
                  <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${plan.highlighted ? "text-[#397BCF]" : "text-[#667085]"}`}>
                    {plan.name}
                  </div>
                  <div className="flex items-end gap-1 mb-2">
                    <span className={`text-2xl font-display font-bold ${plan.highlighted ? "text-[#172033]" : "text-[#172033]"}`}>
                      {plan.price}
                    </span>
                    <span className={`text-sm mb-0.5 ${plan.highlighted ? "text-[#667085]" : "text-[#667085]"}`}>
                      {plan.period}
                    </span>
                  </div>
                  <p className={`text-xs leading-relaxed ${plan.highlighted ? "text-[#667085]" : "text-[#667085]"}`}>
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-2 flex-1 mb-5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check
                        className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${
                          plan.highlighted ? "text-[#397BCF]" : "text-green-600"
                        }`}
                      />
                      <span className="text-xs text-[#667085]">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {plan.id === "enterprise" ? (
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 border-2 border-[#172033] text-[#172033] hover:bg-[#172033] hover:text-white"
                    id={`pricing-${plan.id}-cta`}
                  >
                    {plan.ctaLabel}
                  </Link>
                ) : (
                  <Link
                    href={APP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`pricing-${plan.id}-cta`}
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                      plan.highlighted
                        ? "bg-[#397BCF] hover:bg-[#245FA8] text-white"
                        : "border-2 border-[#397BCF] text-[#397BCF] hover:bg-[#397BCF] hover:text-white"
                    }`}
                  >
                    <Download className="w-3.5 h-3.5" />
                    {plan.ctaLabel}
                  </Link>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>

        <ScrollReveal className="mt-8 text-center">
          <p className="text-sm text-[#98A2B3]">
            Advertising budgets are dynamically optimized based on campaign
            performance. &ldquo;Up to&rdquo; amounts represent the daily allocation limit —
            actual spend varies by campaign activity.
          </p>
          <p className="text-sm text-[#98A2B3] mt-2">
            Subscriptions are managed through the mobile app. No website checkout.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
