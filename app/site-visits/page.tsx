import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import SiteVisitsClient from "@/components/property/SiteVisitsClient";

export const metadata: Metadata = {
  title: "Scheduled Site Visits | The Realty Bazaar",
  description: "View and manage your scheduled property site visits, live broker confirmations, and appointment status on The Realty Bazaar.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function SiteVisitsPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Breadcrumbs Navigation Bar */}
      <nav className="bg-white border-b border-[#E4EAF2] py-3.5" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center gap-1.5 text-xs text-[#667085] flex-wrap">
            <li>
              <Link href="/" className="hover:text-[#397BCF] transition-colors">
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5 text-[#98A2B3]" />
            </li>
            <li className="text-[#172033] font-bold">
              Scheduled Site Visits
            </li>
          </ol>
        </div>
      </nav>

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-16">
        <SiteVisitsClient />
      </main>
    </div>
  );
}
