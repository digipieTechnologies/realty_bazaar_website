"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: (Option | string)[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  name?: string;
  id?: string;
  className?: string;
  triggerClassName?: string;
  size?: "default" | "sm";
  required?: boolean;
}

export default function CustomSelect({
  options,
  value: controlledValue,
  defaultValue = "",
  onChange,
  placeholder = "Select an option",
  name,
  id,
  className,
  triggerClassName,
  size = "default",
  required,
}: CustomSelectProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const normalizedOptions: Option[] = options.map((opt) =>
    typeof opt === "string" ? { value: opt, label: opt } : opt
  );

  const selectedOption = normalizedOptions.find((opt) => opt.value === currentValue);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (val: string) => {
    if (!isControlled) {
      setInternalValue(val);
    }
    onChange?.(val);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      {/* Hidden input for form submission & server actions */}
      {name && (
        <input
          type="hidden"
          name={name}
          value={currentValue}
          required={required}
        />
      )}

      {/* Trigger Button */}
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "w-full flex items-center justify-between gap-3 text-left transition-all duration-200 bg-white border-2 rounded-xl outline-none select-none",
          isOpen
            ? "border-[#397BCF] shadow-[0_0_0_3px_rgba(57,123,207,0.12)] ring-0"
            : "border-[#E4EAF2] hover:border-[#397BCF]/60 shadow-sm",
          size === "sm" ? "px-3 py-2 text-xs" : "px-4 py-3 text-sm",
          triggerClassName
        )}
      >
        <span
          className={cn(
            "truncate font-normal",
            selectedOption ? "text-[#172033]" : "text-[#98A2B3]"
          )}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        <div className="flex items-center pr-0.5 shrink-0">
          <ChevronDown
            className={cn(
              "w-4 h-4 transition-transform duration-200",
              isOpen ? "rotate-180 text-[#397BCF]" : "text-[#98A2B3]"
            )}
            aria-hidden="true"
          />
        </div>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            role="listbox"
            className="absolute z-50 left-0 right-0 top-full mt-1.5 bg-white border border-[#E4EAF2] rounded-xl shadow-[0_12px_32px_-4px_rgba(23,32,51,0.15)] p-1.5 max-h-64 overflow-y-auto"
          >
            {normalizedOptions.map((option) => {
              const isSelected = option.value === currentValue;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(option.value)}
                  className={cn(
                    "w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-left transition-colors text-sm",
                    isSelected
                      ? "bg-[#EAF3FF] text-[#397BCF] font-semibold"
                      : "text-[#172033] hover:bg-[#F3F8FE] hover:text-[#397BCF]"
                  )}
                >
                  <span className="truncate">{option.label}</span>
                  {isSelected && (
                    <Check className="w-4 h-4 text-[#397BCF] shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
