import { Download, ArrowRight } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

const APP_URL =
  process.env.NEXT_PUBLIC_PLAY_STORE_URL ||
  "https://play.google.com/store/apps/details?id=com.therealtybazaar";

export default function FinalCTA() {
  return (
    <section
      className="relative py-24 overflow-hidden bg-[#397BCF]"
      aria-labelledby="final-cta-heading"
    >
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-[0.08] pointer-events-none" />

      {/* Subtle deep blue glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#245FA8] opacity-[0.4] rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <p className="text-[#EAF3FF] text-sm font-semibold uppercase tracking-wider mb-4">
            Get Started Today
          </p>
          <h2
            id="final-cta-heading"
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-bold !text-white leading-[1.1] mb-6"
          >
            Your Next Deal Could Start{" "}
            <br className="hidden sm:block" />
            With Your Next Listing.
          </h2>
          <p className="text-lg text-[#EAF3FF]/80 max-w-2xl mx-auto mb-10">
            Bring your properties, marketing and leads together with The Realty Bazaar —
            one powerful mobile platform for modern real estate professionals.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              id="final-cta-get-app"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-[#EAF3FF] text-[#245FA8] text-base font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl active:scale-[0.98]"
            >
              <Download className="w-5 h-5" />
              Get the App
            </Link>
            <Link
              href="/properties"
              id="final-cta-browse"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/40 hover:border-white text-white text-base font-semibold rounded-xl transition-all duration-200 hover:bg-white/10 active:scale-[0.98]"
            >
              Browse Properties
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Flow */}
          <div className="mt-14 flex flex-wrap justify-center gap-2 text-sm">
            {["Property", "→", "Marketing", "→", "Leads", "→", "CRM", "→", "Deal"].map(
              (item, i) => (
                <span
                  key={i}
                  className={
                    item === "→"
                      ? "text-white/30 font-bold"
                      : "text-white/80 bg-white/10 border border-white/20 px-3 py-1.5 rounded-lg text-xs font-medium"
                  }
                >
                  {item}
                </span>
              )
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
