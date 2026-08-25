import type { Metadata } from "next";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Privacy Policy | The Realty Bazaar",
  description:
    "Learn how The Realty Bazaar collects, uses, and protects your personal information when you browse property listings, submit enquiries, or use our broker platform.",
  alternates: { canonical: "https://therealtybazaar.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <ScrollReveal>
        <h1 className="text-3xl font-display font-bold text-[#172033] mb-2">Privacy Policy</h1>
        <p className="text-sm text-[#667085] mb-8">Last updated: August 2026</p>
        <div className="prose prose-sm max-w-none text-[#172033] space-y-6">
          <section>
            <h2 className="text-lg font-bold text-[#172033] mb-2">1. Information We Collect</h2>
            <p className="text-[#667085]">We collect information you provide directly to us, such as when you submit an enquiry form, contact us, or use our mobile application. This includes name, phone number, email address, and property preferences.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[#172033] mb-2">2. How We Use Your Information</h2>
            <p className="text-[#667085]">We use the information we collect to provide, maintain and improve our services, to process enquiries and connect property seekers with brokers, and to communicate with you about our platform.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[#172033] mb-2">3. Information Sharing</h2>
            <p className="text-[#667085]">When you submit a property enquiry, your name and phone number are shared with the relevant broker. We do not sell your personal information to third parties.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[#172033] mb-2">4. Data Security</h2>
            <p className="text-[#667085]">We use industry-standard security measures to protect your personal information. All data is stored securely and access is restricted to authorized personnel only.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[#172033] mb-2">5. Contact Us</h2>
            <p className="text-[#667085]">For privacy-related questions, contact us at <a href="mailto:bazaarrealty@gmail.com" className="text-[#397BCF] hover:underline">bazaarrealty@gmail.com</a>.</p>
          </section>
        </div>
      </ScrollReveal>
    </article>
  );
}
