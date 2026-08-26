import type { Metadata } from "next";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with The Realty Bazaar. For platform demos, enterprise enquiries, partnerships or support.",
  alternates: { canonical: "https://therealtybazaar.com/contact" },
};

const contactLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact The Realty Bazaar",
  description:
    "Get in touch with The Realty Bazaar for platform demos, enterprise enquiries, partnerships or support.",
  url: "https://therealtybazaar.com/contact",
};

const breadcrumbsLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://therealtybazaar.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Contact Us",
      item: "https://therealtybazaar.com/contact",
    },
  ],
};

export default function ContactPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
      />
      <section className="pt-10 pb-6 bg-white border-b border-[#E4EAF2] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-[#172033] mb-2">
              Contact Us
            </h1>
            <p className="text-base text-[#667085]">
              We&apos;d love to hear from you. Reach out for demos, partnerships or
              any questions.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-8 sm:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
