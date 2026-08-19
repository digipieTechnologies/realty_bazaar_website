"use client";

import { useActionState, useEffect } from "react";
import { submitContactForm, type ContactFormState } from "@/app/actions";
import { Send, Phone, Mail, MapPin } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const initialState: ContactFormState = { success: false, message: "" };

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState
  );

  return (
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
      {/* Contact info */}
      <ScrollReveal>
        <h2 className="text-2xl font-display font-bold text-[#172033] mb-3">
          Get in Touch
        </h2>
        <p className="text-[#667085] mb-8">
          Whether you&apos;re a broker interested in the platform, a property seeker
          with a question, or you have a business enquiry — we&apos;d love to hear
          from you.
        </p>

        <div className="space-y-4 mb-8">
          {[
            {
              icon: Mail,
              label: "Email",
              value: "bazaarrealty@gmail.com",
              href: "mailto:bazaarrealty@gmail.com",
            },
            {
              icon: Phone,
              label: "Phone",
              value: "+91 90000 00000",
              href: "tel:+919000000000",
            },
            {
              icon: MapPin,
              label: "Location",
              value: "Surat, Gujarat, India",
              href: null,
            },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#EAF3FF] flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 text-[#397BCF]" />
              </div>
              <div>
                <div className="text-xs font-semibold text-[#98A2B3] uppercase tracking-wider mb-0.5">
                  {item.label}
                </div>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-sm font-medium text-[#172033] hover:text-[#397BCF] transition-colors"
                  >
                    {item.value}
                  </a>
                ) : (
                  <span className="text-sm font-medium text-[#172033]">{item.value}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Enquiry types */}
        <div className="bg-[#F8FAFC] border border-[#E4EAF2] rounded-2xl p-5">
          <div className="text-xs font-bold text-[#172033] uppercase tracking-wider mb-3">
            Enquiry Types
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              "General",
              "Platform Demo",
              "Enterprise",
              "Partnership",
              "Marketing",
              "Support",
            ].map((type) => (
              <span
                key={type}
                className="px-3 py-1.5 bg-white border border-[#E4EAF2] rounded-xl text-xs font-medium text-[#667085]"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Form */}
      <ScrollReveal delay={0.1}>
        {state.success ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#172033] mb-2">Message Sent!</h3>
            <p className="text-[#667085] max-w-sm">{state.message}</p>
          </div>
        ) : (
          <form action={formAction} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-semibold text-[#172033] mb-1.5">
                  Full Name <span className="text-[#397BCF]">*</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Rajesh Patel"
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#E4EAF2] focus:border-[#397BCF] outline-none text-sm text-[#172033] placeholder:text-[#98A2B3] transition-colors bg-white"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-semibold text-[#172033] mb-1.5">
                  Email <span className="text-[#397BCF]">*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  placeholder="rajesh@example.com"
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#E4EAF2] focus:border-[#397BCF] outline-none text-sm text-[#172033] placeholder:text-[#98A2B3] transition-colors bg-white"
                />
              </div>
            </div>
            <div>
              <label htmlFor="contact-phone" className="block text-sm font-semibold text-[#172033] mb-1.5">
                Phone
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3 rounded-xl border-2 border-[#E4EAF2] focus:border-[#397BCF] outline-none text-sm text-[#172033] placeholder:text-[#98A2B3] transition-colors bg-white"
              />
            </div>
            <div>
              <label htmlFor="contact-subject" className="block text-sm font-semibold text-[#172033] mb-1.5">
                Subject
              </label>
              <select
                id="contact-subject"
                name="subject"
                className="w-full px-4 py-3 rounded-xl border-2 border-[#E4EAF2] focus:border-[#397BCF] outline-none text-sm text-[#172033] transition-colors bg-white"
              >
                <option value="">Select a subject</option>
                <option value="general">General Enquiry</option>
                <option value="demo">Platform Demo</option>
                <option value="enterprise">Enterprise Enquiry</option>
                <option value="partnership">Partnership</option>
                <option value="marketing">Marketing</option>
                <option value="support">Support</option>
              </select>
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-sm font-semibold text-[#172033] mb-1.5">
                Message <span className="text-[#397BCF]">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={4}
                placeholder="Tell us how we can help..."
                className="w-full px-4 py-3 rounded-xl border-2 border-[#E4EAF2] focus:border-[#397BCF] outline-none text-sm text-[#172033] placeholder:text-[#98A2B3] transition-colors resize-none bg-white"
              />
            </div>

            {state.message && !state.success && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                {state.message}
              </div>
            )}

            <button
              type="submit"
              id="contact-submit"
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#397BCF] hover:bg-[#245FA8] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 active:scale-[0.98] shadow-md"
            >
              {isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </button>
          </form>
        )}
      </ScrollReveal>
    </div>
  );
}
