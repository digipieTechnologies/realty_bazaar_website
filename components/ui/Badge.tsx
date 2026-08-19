import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "orange" | "navy" | "green" | "blue" | "subtle";
  className?: string;
}

const variantClasses = {
  primary: "bg-[#EAF3FF] text-[#245FA8] border border-[#6FA5E5]/40",
  orange: "bg-[#EAF3FF] text-[#245FA8] border border-[#6FA5E5]/40", // aliased to brand blue
  navy: "bg-[#F3F8FE] text-[#172033] border border-[#E4EAF2]",
  green: "bg-green-50 text-green-700 border border-green-200",
  blue: "bg-[#EAF3FF] text-[#245FA8] border border-[#6FA5E5]/40",
  subtle: "bg-[#F8FAFC] text-[#397BCF] border border-[#E4EAF2]",
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
