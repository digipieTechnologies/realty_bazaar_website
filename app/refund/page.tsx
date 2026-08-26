import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "Understand The Realty Bazaar's refund and cancellation policy for trial plans, monthly broker subscriptions, and advertising budget allocations.",
  alternates: { canonical: "https://therealtybazaar.com/refund" },
};

export default function RefundPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <ScrollReveal>
        <h1 className="text-3xl font-display font-bold text-[#172033] mb-2">Refund Policy</h1>
        <p className="text-sm text-[#667085] mb-8">Last updated: August 2026</p>
        <div className="prose prose-sm max-w-none text-[#172033] space-y-6">
          <section>
            <h2 className="text-lg font-bold text-[#172033] mb-2">Trial Plan</h2>
            <p className="text-[#667085]">The one-time trial fee (₹4,499) is non-refundable once the trial period has commenced and platform access has been provided. See our <Link href="/pricing" className="text-[#397BCF] hover:underline font-medium">pricing plans</Link> for details.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[#172033] mb-2">Monthly Subscriptions</h2>
            <p className="text-[#667085]">Monthly subscription fees are non-refundable. You may cancel your subscription at any time through the <Link href="/for-brokers" className="text-[#397BCF] hover:underline font-medium">broker mobile application</Link>. Cancellation takes effect at the end of the current billing period.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[#172033] mb-2">Advertising Budget</h2>
            <p className="text-[#667085]">Advertising spend already deployed in active campaigns is non-refundable. Unused advertising allocation for a cancelled subscription will not be refunded.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[#172033] mb-2">Exceptions</h2>
            <p className="text-[#667085]">Refunds may be considered in cases of technical errors that prevented platform access for extended periods. Contact support with evidence for review.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[#172033] mb-2">Contact</h2>
            <p className="text-[#667085]">For refund-related queries, contact <a href="mailto:bazaarrealty@gmail.com" className="text-[#397BCF] hover:underline">bazaarrealty@gmail.com</a> or visit our <Link href="/contact" className="text-[#397BCF] hover:underline font-medium">contact page</Link>.</p>
          </section>
        </div>
      </ScrollReveal>
    </article>
  );
}
