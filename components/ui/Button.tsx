"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  external?: boolean;
  id?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  fullWidth?: boolean;
}

const variantClasses = {
  primary:
    "bg-[#397BCF] hover:bg-[#245FA8] text-white shadow-sm hover:shadow-md active:scale-[0.98]",
  secondary:
    "bg-[#172033] hover:bg-[#1e2d47] text-white shadow-sm hover:shadow-md active:scale-[0.98]",
  outline:
    "border-2 border-[#397BCF] text-[#397BCF] hover:bg-[#397BCF] hover:text-white active:scale-[0.98]",
  ghost:
    "text-[#397BCF] hover:bg-[#EAF3FF] active:scale-[0.98]",
};

const sizeClasses = {
  sm: "px-4 py-2 text-sm font-medium rounded-lg",
  md: "px-6 py-3 text-sm font-semibold rounded-xl",
  lg: "px-8 py-4 text-base font-semibold rounded-xl",
};

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  external,
  id,
  type = "button",
  disabled,
  fullWidth,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer select-none",
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && "w-full",
    disabled && "opacity-50 cursor-not-allowed pointer-events-none",
    className
  );

  if (href) {
    return (
      <Link
        href={href}
        id={id}
        className={classes}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      id={id}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
