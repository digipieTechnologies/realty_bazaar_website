import { Smartphone, Check, Download } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { StaggerReveal, StaggerItem } from "@/components/ui/ScrollReveal";

const APP_URL =
  process.env.NEXT_PUBLIC_PLAY_STORE_URL ||
  "https://play.google.com/store/apps/details?id=com.therealtybazaar";

const brokerTypes = [
  "Individual brokers",
  "Small broker teams",
  "Property consultants",
  "Real estate agencies",
];

const features = [
  "Upload properties from your phone",
  "Manage property photos & videos",
  "Publish to Instagram & Facebook",
  "Run paid advertising campaigns",
  "Capture website enquiries automatically",
  "Manage all leads in one CRM",
  "Track follow-ups & site visits",
  "Monitor campaign performance",
];

export default function ForBrokersSection() {
  return (
    <section
      className="section-padding bg-[#eef3f8]"
      aria-labelledby="for-brokers-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left */}
          <ScrollReveal>
            <p className="text-[#f97316] text-sm font-semibold uppercase tracking-wider mb-3">
              For Brokers
            </p>
            <h2
              id="for-brokers-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#0f1c2e] mb-6"
            >
              Built for the Way Real Estate Brokers Actually Work.
            </h2>
            <p className="text-lg text-[#3a4a5c] leading-relaxed mb-6">
              The Realty Bazaar doesn&apos;t force you to abandon WhatsApp or phone
              calls. The mobile app becomes your system of record — while you
              continue communicating through the channels you already use.
            </p>

            {/* Who it's for */}
            <div className="flex flex-wrap gap-2 mb-8">
              {brokerTypes.map((type) => (
                <span
                  key={type}
                  className="px-3 py-1.5 bg-white border border-[#e2e8f0] rounded-xl text-sm font-medium text-[#0f1c2e]"
                >
                  {type}
                </span>
              ))}
            </div>

            <div className="flex items-start gap-3 p-4 bg-white border border-[#e2e8f0] rounded-2xl mb-8">
              <Smartphone className="w-5 h-5 text-[#f97316] mt-0.5 shrink-0" />
              <div className="text-sm text-[#64748b]">
                <strong className="text-[#0f1c2e]">No website dashboard.</strong>{" "}
                Everything brokers need — property management, marketing,
                CRM and analytics — is in the mobile app. The website is
                purely the public-facing discovery and lead-generation layer.
              </div>
            </div>

            <Link
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              id="for-brokers-get-app"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#f97316] hover:bg-[#ea6c00] text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
            >
              <Download className="w-4 h-4" />
              Get the App
            </Link>
          </ScrollReveal>

          {/* Right — feature list */}
          <ScrollReveal direction="left" delay={0.2}>
            <StaggerReveal className="space-y-3">
              {features.map((feature) => (
                <StaggerItem key={feature}>
                  <div className="flex items-center gap-3 p-4 bg-white border border-[#e2e8f0] rounded-xl hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200">
                    <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-sm font-medium text-[#0f1c2e]">
                      {feature}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
