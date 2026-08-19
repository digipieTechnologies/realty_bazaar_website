import type { Metadata } from "next";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Terms of Service — The Realty Bazaar",
  description: "Terms of Service for The Realty Bazaar platform.",
  alternates: { canonical: "https://therealtybazaar.com/terms" },
};

export default function TermsPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <ScrollReveal>
        <h1 className="text-3xl font-display font-bold text-[#172033] mb-2">Terms of Service</h1>
        <p className="text-sm text-[#667085] mb-8">Last updated: August 2026</p>
        <div className="prose prose-sm max-w-none text-[#172033] space-y-6">
          <section>
            <h2 className="text-lg font-bold text-[#172033] mb-2">1. Acceptance of Terms</h2>
            <p className="text-[#667085]">By using The Realty Bazaar platform (website and mobile application), you agree to these Terms of Service. If you do not agree, please do not use our services.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[#172033] mb-2">2. Use of Platform</h2>
            <p className="text-[#667085]">The Realty Bazaar is a PropTech platform providing property marketing, lead management and CRM tools to real estate brokers, and property discovery services to property seekers. The mobile application is for broker use only.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[#172033] mb-2">3. Property Listings</h2>
            <p className="text-[#667085]">Property listings on this website are provided by registered brokers. The Realty Bazaar does not own or manage any listed properties. Information accuracy is the responsibility of the listing broker.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[#172033] mb-2">4. Subscriptions & Payments</h2>
            <p className="text-[#667085]">Broker subscriptions are managed through the mobile application. Pricing is subject to change with reasonable notice. Refer to our Refund Policy for cancellation terms.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[#172033] mb-2">5. Contact</h2>
            <p className="text-[#667085]">For terms-related questions, contact <a href="mailto:legal@therealtybazaar.com" className="text-[#397BCF] hover:underline">legal@therealtybazaar.com</a>.</p>
          </section>
        </div>
      </ScrollReveal>
    </article>
  );
}
