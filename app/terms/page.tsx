import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Building2,
  Mail,
  Scale,
  AlertCircle,
  CheckCircle2,
  Calendar,
} from "lucide-react";

import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Review the terms of service, platform disclaimers, listing policies, broker obligations, and user agreements for The Realty Bazaar (therealtybazaar.com).",
  alternates: { canonical: "https://therealtybazaar.com/terms" },
};

export default function TermsPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Badge & Title */}
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EAF3FF] text-[#245FA8] border border-[#6FA5E5]/30 text-xs font-bold uppercase tracking-wider mb-3.5">
            <Scale className="w-3.5 h-3.5 text-[#397BCF]" />
            Legal Agreement
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-[#172033] tracking-tight mb-3">
            Terms & Conditions
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs text-[#667085]">
            <Calendar className="w-3.5 h-3.5" />
            <span>Effective Date: August 24, 2026</span>
            <span>•</span>
            <span>Version 2.0</span>
          </div>
        </ScrollReveal>

        {/* Quick Highlights Summary Card */}
        <ScrollReveal className="mb-8">
          <div className="bg-[#EAF3FF]/70 border border-[#397BCF]/20 rounded-2xl p-5 sm:p-6 text-xs text-[#172033] space-y-3">
            <div className="flex items-center gap-2 font-bold text-sm text-[#245FA8]">
              <ShieldCheck className="w-4 h-4 text-[#397BCF]" />
              <span>Summary of Key Principles</span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[#475467]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#397BCF] shrink-0 mt-0.5" />
                <span>Discovery intermediary connecting buyers/tenants with local verified brokers.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#397BCF] shrink-0 mt-0.5" />
                <span>The Realty Bazaar does not own, inspect, sell, or lease real estate directly.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#397BCF] shrink-0 mt-0.5" />
                <span>Brokers are solely responsible for listing accuracy, titles, and RERA compliance.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#397BCF] shrink-0 mt-0.5" />
                <span>Enquiry submissions grant permission for contact regarding the requested property.</span>
              </li>
            </ul>
          </div>
        </ScrollReveal>

        {/* Main Document Body */}
        <div className="bg-white border border-[#E4EAF2] rounded-3xl p-6 sm:p-10 shadow-xs space-y-10 text-sm leading-relaxed text-[#475467]">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-display font-bold text-[#172033] flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#EAF3FF] text-[#397BCF] text-xs font-bold">1</span>
              Acceptance of Terms
            </h2>
            <p>
              Welcome to <strong className="text-[#172033]">The Realty Bazaar</strong> (&quot;Platform&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), operated via the website <Link href="/" className="text-[#397BCF] font-semibold hover:underline">therealtybazaar.com</Link> and associated mobile applications. By accessing or using our website, submitting an enquiry, browsing property listings, or subscribing to our broker tools, you (&quot;User&quot;, &quot;Visitor&quot;, or &quot;Broker&quot;) agree to be legally bound by these Terms and Conditions (&quot;Terms&quot;) and our <Link href="/privacy" className="text-[#397BCF] font-semibold hover:underline">Privacy Policy</Link>.
            </p>
            <p>
              If you do not agree to these Terms, you must immediately cease accessing or using our platform.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-display font-bold text-[#172033] flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#EAF3FF] text-[#397BCF] text-xs font-bold">2</span>
              Nature of Services & Platform Intermediary Role
            </h2>
            <p>
              The Realty Bazaar functions strictly as an online technology intermediary and discovery platform under Section 79 of the Information Technology Act, 2000 (India). Our services encompass:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong className="text-[#172033]">For Property Seekers (Buyers & Tenants):</strong> An interactive marketplace to search, discover, compare, and enquire about residential and commercial real estate properties listed by third-party brokers.
              </li>
              <li>
                <strong className="text-[#172033]">For Licensed Real Estate Brokers:</strong> PropTech workflow automation, property marketing tools, digital cataloging, and customer relationship management (CRM) software accessible via mobile and web portals.
              </li>
            </ul>
            <div className="p-4 bg-[#F8FAFC] border border-[#E4EAF2] rounded-xl flex items-start gap-3 text-xs">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Important Notice:</strong> The Realty Bazaar is not a registered real estate broker, builder, contractor, or financial institution. We do not participate in negotiations, drafting of sale deeds, title verifications, or collection of consideration amounts.
              </span>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-display font-bold text-[#172033] flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#EAF3FF] text-[#397BCF] text-xs font-bold">3</span>
              Property Listings, Pricing & RERA Compliance
            </h2>
            <p>
              All property listings, specifications, floor layouts, super built-up/carpet areas, pricing, photos, video walkthroughs, and amenities published on the platform are provided directly by independent real estate brokers and channel partners.
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong className="text-[#172033]">Listing Accuracy:</strong> While we encourage all brokers to keep information current and accurate, The Realty Bazaar makes no representations, guarantees, or warranties regarding the completeness, legality, ownership status, or accuracy of any listing.
              </li>
              <li>
                <strong className="text-[#172033]">RERA Due Diligence:</strong> Users are strictly advised to independently verify the Real Estate Regulatory Authority (RERA) registration status, approved building plans, title clearance, encumbrances, and occupancy certificates of any project before paying any token or booking amounts.
              </li>
              <li>
                <strong className="text-[#172033]">Price Disclaimers:</strong> Quoted prices may exclude government taxes, stamp duty, registration charges, GST, maintenance deposits, or parking premiums unless explicitly stated.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-display font-bold text-[#172033] flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#EAF3FF] text-[#397BCF] text-xs font-bold">4</span>
              User Inquiries & Consent to Communication
            </h2>
            <p>
              By providing your contact details (including name, telephone number, WhatsApp contact, or email address) on any property enquiry, site visit booking, or contact form:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                You explicitly authorize The Realty Bazaar and the listing broker representing that specific property to contact you via telephone call, SMS, WhatsApp message, or email.
              </li>
              <li>
                This authorization explicitly overrides any registration on the National Do Not Call (DNC) or National Customer Preference Register (NCPR) registry, as per Telecom Regulatory Authority of India (TRAI) regulations for requested service interactions.
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-display font-bold text-[#172033] flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#EAF3FF] text-[#397BCF] text-xs font-bold">5</span>
              Broker Subscription & SaaS Terms
            </h2>
            <p>
              Brokers using our CRM, digital cataloging, and automated social marketing tools are governed by the following subscription conditions:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong className="text-[#172033]">Onboarding:</strong> Access to broker management tools and payment of subscription fees is handled via the official broker application/portal (<span className="font-mono text-xs text-[#397BCF]">partners.therealtybazaar.com</span>).
              </li>
              <li>
                <strong className="text-[#172033]">Listing Authorization:</strong> Brokers represent that they possess lawful authorization from the property owner/developer to market, advertise, and solicit inquiries for listed properties.
              </li>
              <li>
                <strong className="text-[#172033]">Subscription Fees & Refunds:</strong> Monthly and annual platform subscription plans are billed in advance. For detailed cancellation and refund conditions, please refer to our <Link href="/refund" className="text-[#397BCF] font-semibold hover:underline">Refund Policy</Link>.
              </li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-display font-bold text-[#172033] flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#EAF3FF] text-[#397BCF] text-xs font-bold">6</span>
              Intellectual Property Rights
            </h2>
            <p>
              The platform&apos;s source code, design layouts, branding, logos, domain name, search algorithms, user interfaces, and graphic illustrations are the exclusive intellectual property of The Realty Bazaar. Users are prohibited from copying, modifying, scraping, reverse engineering, or redistributing any platform assets without prior written consent.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-display font-bold text-[#172033] flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#EAF3FF] text-[#397BCF] text-xs font-bold">7</span>
              Prohibited Uses
            </h2>
            <p>Users agree not to engage in any of the following prohibited behaviors:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Publishing deceptive, fraudulent, defamatory, or non-existent property listings.</li>
              <li>Using automated scrapers, bots, or crawlers to extract property data or broker contact directories.</li>
              <li>Impersonating another broker, buyer, company, or entity.</li>
              <li>Submitting spam inquiries, abusive communications, or unauthorized marketing messages.</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-display font-bold text-[#172033] flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#EAF3FF] text-[#397BCF] text-xs font-bold">8</span>
              Limitation of Liability & Indemnity
            </h2>
            <p>
              To the fullest extent permitted by Indian law, The Realty Bazaar, its directors, employees, and affiliates shall not be liable for any direct, indirect, incidental, punitive, or consequential damages arising from:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Disputes, financial losses, or contract breaches between property buyers/tenants and listing brokers.</li>
              <li>Any inaccuracy, typographical error, or omission in listing specifications or price displays.</li>
              <li>Unscheduled server maintenance, internet downtime, or temporary service interruptions.</li>
            </ul>
          </section>

          {/* Section 9 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-display font-bold text-[#172033] flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#EAF3FF] text-[#397BCF] text-xs font-bold">9</span>
              Governing Law & Jurisdiction
            </h2>
            <p>
              These Terms shall be construed, interpreted, and governed in accordance with the substantive laws of the Republic of India. Any legal action, dispute, or proceeding arising out of or related to these Terms shall be subject to the exclusive jurisdiction of the competent courts in <strong className="text-[#172033]">Surat, Gujarat, India</strong>.
            </p>
          </section>

          {/* Section 10 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-display font-bold text-[#172033] flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#EAF3FF] text-[#397BCF] text-xs font-bold">10</span>
              Grievance Officer & Contact Information
            </h2>
            <p>
              In accordance with the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, if you have any questions, concerns, or legal notices, please reach out to our designated Grievance Officer:
            </p>
            <div className="p-4 bg-[#F8FAFC] border border-[#E4EAF2] rounded-2xl space-y-2 text-xs">
              <div className="font-bold text-[#172033]">The Realty Bazaar — Legal & Grievance Department</div>
              <div className="flex items-center gap-2 text-[#667085]">
                <Mail className="w-3.5 h-3.5 text-[#397BCF]" />
                <span>Email: <a href="mailto:bazaarrealty@gmail.com" className="text-[#397BCF] font-semibold hover:underline">bazaarrealty@gmail.com</a></span>
              </div>
              <div className="flex items-center gap-2 text-[#667085]">
                <Building2 className="w-3.5 h-3.5 text-[#397BCF]" />
                <span>Headquarters: Surat, Gujarat, India</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
