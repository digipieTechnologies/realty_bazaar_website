import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "orange" | "navy" | "green" | "blue" | "subtle";
  className?: string;
}

const variantClasses = {
  orange: "bg-[#fff7ed] text-[#ea6c00] border border-[#fdba74]",
  navy: "bg-[#eef3f8] text-[#0f1c2e] border border-[#d0dde8]",
  green: "bg-green-50 text-green-700 border border-green-200",
  blue: "bg-blue-50 text-blue-700 border border-blue-200",
  subtle: "bg-[#f4f6f9] text-[#3a6496] border border-[#e2e8f0]",
};

export default function Badge({
  children,
  variant = "subtle",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
