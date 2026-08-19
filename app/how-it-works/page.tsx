import type { Metadata } from "next";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { StaggerReveal, StaggerItem } from "@/components/ui/ScrollReveal";
import FinalCTA from "@/components/home/FinalCTA";
import BrokerWorkflow from "@/components/home/BrokerWorkflow";
import HowItWorksSeeker from "@/components/home/HowItWorksSeeker";
import { Download, ArrowRight } from "lucide-react";
import Link from "next/link";

const APP_URL =
  process.env.NEXT_PUBLIC_PLAY_STORE_URL ||
  "https://play.google.com/store/apps/details?id=com.therealtybazaar";

export const metadata: Metadata = {
  title: "How It Works — Real Estate Marketing & CRM Platform",
  description:
    "See how The Realty Bazaar works for brokers and property seekers. From property upload to deal close — the complete flow explained.",
  alternates: { canonical: "https://therealtybazaar.com/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <>
      <section className="pt-10 sm:pt-14 pb-8 sm:pb-10 bg-[#F8FAFC] text-center border-b border-[#E4EAF2]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h1 className="text-3xl sm:text-5xl font-display font-bold text-[#172033] mb-3">
              How It Works
            </h1>
            <p className="text-base sm:text-lg text-[#667085] mb-6">
              Two experiences. One connected platform.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="#for-brokers"
                className="px-5 py-2.5 bg-[#397BCF] text-white font-semibold rounded-xl text-sm hover:bg-[#245FA8] transition-colors"
              >
                For Brokers
              </Link>
              <Link
                href="#for-seekers"
                className="px-5 py-2.5 border-2 border-[#397BCF] text-[#397BCF] font-semibold rounded-xl text-sm hover:bg-[#EAF3FF] transition-colors"
              >
                For Property Seekers
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Ecosystem overview */}
      <section className="py-10 sm:py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#172033] mb-4">
              The Complete Ecosystem
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            <ScrollReveal>
              <div className="bg-gradient-to-br from-[#172033] to-[#1e2d47] rounded-2xl p-6 text-white">
                <div className="text-xs font-bold uppercase tracking-wider text-[#6FA5E5] mb-3">
                  Broker Side
                </div>
                <div className="space-y-2">
                  {[
                    "Broker uploads property in mobile app",
                    "Property marketed on Instagram & Facebook",
                    "Paid campaigns generate leads",
                    "Leads captured in mobile CRM",
                    "Follow-ups & site visits managed",
                    "Deal closed",
                  ].map((step, i) => (
                    <div key={step} className="flex items-start gap-3">
                      <span className="text-[#397BCF] font-bold text-sm w-5 shrink-0 mt-0.5">{i + 1}.</span>
                      <span className="text-sm text-white/80">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="bg-[#F8FAFC] border border-[#E4EAF2] rounded-2xl p-6">
                <div className="text-xs font-bold uppercase tracking-wider text-[#397BCF] mb-3">
                  Property Seeker Side
                </div>
                <div className="space-y-2">
                  {[
                    "Seeker searches properties on website",
                    "Views property details & photos",
                    "Contacts broker directly",
                    "Enquiry enters broker's CRM",
                    "Broker follows up & schedules visit",
                    "Property purchased",
                  ].map((step, i) => (
                    <div key={step} className="flex items-start gap-3">
                      <span className="text-[#397BCF] font-bold text-sm w-5 shrink-0 mt-0.5">{i + 1}.</span>
                      <span className="text-sm text-[#172033]">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Reuse workflow sections */}
      <div id="for-brokers">
        <BrokerWorkflow />
      </div>
      <div id="for-seekers">
        <HowItWorksSeeker />
      </div>
      <FinalCTA />
    </>
  );
}
