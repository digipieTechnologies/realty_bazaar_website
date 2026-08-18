"use client";

import Link from "next/link";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

const PLAY_STORE_URL =
  process.env.NEXT_PUBLIC_PLAY_STORE_URL ||
  "https://play.google.com/store/apps/details?id=com.therealtybazaar";
const APP_STORE_URL =
  process.env.NEXT_PUBLIC_APP_STORE_URL ||
  "https://apps.apple.com/app/the-realty-bazaar/id123456789";

interface AppStoreButtonsProps {
  className?: string;
  layout?: "horizontal" | "vertical";
  size?: "sm" | "md";
}

export default function AppStoreButtons({
  className,
  layout = "horizontal",
  size = "md",
}: AppStoreButtonsProps) {
  return (
    <div
      className={cn(
        "flex gap-3",
        layout === "vertical" ? "flex-col" : "flex-wrap",
        className
      )}
    >
      <Link
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        id="btn-play-store"
        className={cn(
          "inline-flex items-center gap-3 bg-[#0f1c2e] text-white rounded-xl border border-white/10 hover:bg-[#1a2e48] transition-all duration-200 active:scale-[0.98]",
          size === "sm" ? "px-4 py-2.5" : "px-5 py-3"
        )}
      >
        <svg
          viewBox="0 0 24 24"
          className={cn("fill-white", size === "sm" ? "w-5 h-5" : "w-6 h-6")}
          aria-hidden="true"
        >
          <path d="M3.18 23.76A1.96 1.96 0 0 1 2 22V2C2 1.36 2.37.82 2.93.53L14.36 12 3.18 23.76ZM15.54 13.19l2.8 2.8-10.96 6.23 8.16-9.03ZM21.14 10.17c.57.31.86.79.86 1.83s-.29 1.52-.86 1.83l-2.57 1.46-3.16-3.16 3.16-3.16 2.57 1.2ZM7.38 1.81l10.96 6.23-2.8 2.8L6.38 1.81l1-.0Z" />
        </svg>
        <div>
          <div
            className={cn(
              "text-white/60 leading-none",
              size === "sm" ? "text-[9px]" : "text-[10px]"
            )}
          >
            Get it on
          </div>
          <div
            className={cn(
              "font-semibold leading-tight",
              size === "sm" ? "text-xs" : "text-sm"
            )}
          >
            Google Play
          </div>
        </div>
      </Link>

      <Link
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        id="btn-app-store"
        className={cn(
          "inline-flex items-center gap-3 bg-[#0f1c2e] text-white rounded-xl border border-white/10 hover:bg-[#1a2e48] transition-all duration-200 active:scale-[0.98]",
          size === "sm" ? "px-4 py-2.5" : "px-5 py-3"
        )}
      >
        <svg
          viewBox="0 0 24 24"
          className={cn("fill-white", size === "sm" ? "w-5 h-5" : "w-6 h-6")}
          aria-hidden="true"
        >
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11Z" />
        </svg>
        <div>
          <div
            className={cn(
              "text-white/60 leading-none",
              size === "sm" ? "text-[9px]" : "text-[10px]"
            )}
          >
            Download on the
          </div>
          <div
            className={cn(
              "font-semibold leading-tight",
              size === "sm" ? "text-xs" : "text-sm"
            )}
          >
            App Store
          </div>
        </div>
      </Link>
    </div>
  );
}

// Simple "Get the App" button
export function GetAppButton({
  className,
  size = "md",
  variant = "primary",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "outline" | "white";
}) {
  const sizeMap = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };
  const variantMap = {
    primary: "bg-[#f97316] hover:bg-[#ea6c00] text-white",
    outline: "border-2 border-[#f97316] text-[#f97316] hover:bg-[#fff7ed]",
    white: "bg-white hover:bg-[#eef3f8] text-[#0f1c2e]",
  };
  return (
    <Link
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      id="btn-get-app-hero"
      className={cn(
        "inline-flex items-center gap-2 font-semibold rounded-xl transition-all duration-200 active:scale-[0.98] shadow-sm hover:shadow-md",
        sizeMap[size],
        variantMap[variant],
        className
      )}
    >
      <Download className="w-4 h-4" />
      Get the App
    </Link>
  );
}
