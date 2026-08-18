import type { Metadata } from "next";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us — The Realty Bazaar",
  description:
    "Get in touch with The Realty Bazaar. For platform demos, enterprise enquiries, partnerships or support.",
  alternates: { canonical: "https://therealtybazaar.com/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="py-16 bg-[#fafafa] border-b border-[#e2e8f0]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal>
            <h1 className="text-3xl sm:text-5xl font-display font-bold text-[#0f1c2e] mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-[#64748b]">
              We&apos;d love to hear from you. Reach out for demos, partnerships or
              any questions.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
