import type { Metadata } from "next";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Refund Policy — The Realty Bazaar",
  description: "Refund Policy for The Realty Bazaar platform.",
  alternates: { canonical: "https://therealtybazaar.com/refund" },
};

export default function RefundPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <ScrollReveal>
        <h1 className="text-3xl font-display font-bold text-[#0f1c2e] mb-2">Refund Policy</h1>
        <p className="text-sm text-[#64748b] mb-8">Last updated: August 2026</p>
        <div className="prose prose-sm max-w-none text-[#3a4a5c] space-y-6">
          <section>
            <h2 className="text-lg font-bold text-[#0f1c2e] mb-2">Trial Plan</h2>
            <p>The one-time trial fee (₹4,499) is non-refundable once the trial period has commenced and platform access has been provided.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[#0f1c2e] mb-2">Monthly Subscriptions</h2>
            <p>Monthly subscription fees are non-refundable. You may cancel your subscription at any time through the mobile application. Cancellation takes effect at the end of the current billing period.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[#0f1c2e] mb-2">Advertising Budget</h2>
            <p>Advertising spend already deployed in active campaigns is non-refundable. Unused advertising allocation for a cancelled subscription will not be refunded.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[#0f1c2e] mb-2">Exceptions</h2>
            <p>Refunds may be considered in cases of technical errors that prevented platform access for extended periods. Contact support with evidence for review.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[#0f1c2e] mb-2">Contact</h2>
            <p>For refund-related queries, contact <a href="mailto:support@therealtybazaar.com" className="text-[#f97316] hover:underline">support@therealtybazaar.com</a>.</p>
          </section>
        </div>
      </ScrollReveal>
    </article>
  );
}
