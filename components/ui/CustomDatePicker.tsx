"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface CustomDatePickerProps {
  value?: string; // YYYY-MM-DD
  defaultValue?: string;
  onChange?: (dateStr: string) => void;
  placeholder?: string;
  minDate?: string; // YYYY-MM-DD
  maxDate?: string; // YYYY-MM-DD
  name?: string;
  id?: string;
  className?: string;
  triggerClassName?: string;
  size?: "default" | "sm";
  required?: boolean;
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function parseLocalDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  const [y, m, d] = dateStr.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

function formatLocalDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatDateDisplay(dateStr: string): string {
  const parsed = parseLocalDate(dateStr);
  if (!parsed) return "";
  return parsed.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function CustomDatePicker({
  value: controlledValue,
  defaultValue = "",
  onChange,
  placeholder = "Select preferred date",
  minDate,
  maxDate,
  name,
  id,
  className,
  triggerClassName,
  size = "default",
  required,
}: CustomDatePickerProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  // Selected date object
  const selectedDate = useMemo(() => parseLocalDate(currentValue), [currentValue]);

  // Today date string & object
  const today = useMemo(() => new Date(), []);
  const todayStr = useMemo(() => formatLocalDate(today), [today]);

  const defaultMinStr = minDate !== undefined ? minDate : todayStr;

  // Currently viewed month/year in the calendar picker
  const [viewYear, setViewYear] = useState(() => selectedDate?.getFullYear() || today.getFullYear());
  const [viewMonth, setViewMonth] = useState(() => selectedDate?.getMonth() ?? today.getMonth());

  // Update view month when selected date changes externally
  useEffect(() => {
    if (selectedDate) {
      setViewYear(selectedDate.getFullYear());
      setViewMonth(selectedDate.getMonth());
    }
  }, [selectedDate]);

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

  const handleSelectDate = (dateStr: string) => {
    if (!isControlled) {
      setInternalValue(dateStr);
    }
    onChange?.(dateStr);
    setIsOpen(false);
  };

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  // Build grid of days for viewMonth & viewYear
  const calendarDays = useMemo(() => {
    const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

    const days: {
      dayNum: number;
      dateStr: string;
      isCurrentMonth: boolean;
      isDisabled: boolean;
      isToday: boolean;
      isSelected: boolean;
    }[] = [];

    // Previous month padding days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const d = daysInPrevMonth - i;
      const prevMonth = viewMonth === 0 ? 11 : viewMonth - 1;
      const prevYear = viewMonth === 0 ? viewYear - 1 : viewYear;
      const dateStr = formatLocalDate(new Date(prevYear, prevMonth, d));
      const isDisabled =
        (defaultMinStr && dateStr < defaultMinStr) || (maxDate && dateStr > maxDate);

      days.push({
        dayNum: d,
        dateStr,
        isCurrentMonth: false,
        isDisabled: Boolean(isDisabled),
        isToday: dateStr === todayStr,
        isSelected: dateStr === currentValue,
      });
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = formatLocalDate(new Date(viewYear, viewMonth, d));
      const isDisabled =
        (defaultMinStr && dateStr < defaultMinStr) || (maxDate && dateStr > maxDate);

      days.push({
        dayNum: d,
        dateStr,
        isCurrentMonth: true,
        isDisabled: Boolean(isDisabled),
        isToday: dateStr === todayStr,
        isSelected: dateStr === currentValue,
      });
    }

    // Next month padding days to complete 35 or 42 grid cells
    const remaining = (7 - (days.length % 7)) % 7;
    for (let d = 1; d <= remaining; d++) {
      const nextMonth = viewMonth === 11 ? 0 : viewMonth + 1;
      const nextYear = viewMonth === 11 ? viewYear + 1 : viewYear;
      const dateStr = formatLocalDate(new Date(nextYear, nextMonth, d));
      const isDisabled =
        (defaultMinStr && dateStr < defaultMinStr) || (maxDate && dateStr > maxDate);

      days.push({
        dayNum: d,
        dateStr,
        isCurrentMonth: false,
        isDisabled: Boolean(isDisabled),
        isToday: dateStr === todayStr,
        isSelected: dateStr === currentValue,
      });
    }

    return days;
  }, [viewYear, viewMonth, defaultMinStr, maxDate, todayStr, currentValue]);

  // Quick preset shortcuts
  const tomorrow = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return formatLocalDate(d);
  }, []);

  const thisSaturday = useMemo(() => {
    const d = new Date();
    const day = d.getDay();
    const diff = (6 - day + 7) % 7 || 7;
    d.setDate(d.getDate() + diff);
    return formatLocalDate(d);
  }, []);

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      {/* Hidden input for form validation & submit */}
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
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "w-full flex items-center justify-between gap-2.5 text-left transition-all duration-200 bg-white border-2 rounded-xl outline-none select-none cursor-pointer",
          isOpen
            ? "border-[#397BCF] shadow-[0_0_0_3px_rgba(57,123,207,0.12)] ring-0"
            : "border-[#E4EAF2] hover:border-[#397BCF]/60 shadow-2xs",
          size === "sm" ? "px-3 py-2 text-xs" : "px-4 py-2.5 text-xs sm:text-sm",
          triggerClassName
        )}
      >
        <div className="flex items-center gap-2 truncate">
          <CalendarIcon
            className={cn(
              "w-4 h-4 shrink-0 transition-colors",
              currentValue ? "text-[#397BCF]" : "text-[#98A2B3]"
            )}
          />
          <span
            className={cn(
              "truncate font-medium",
              currentValue ? "text-[#172033]" : "text-[#98A2B3]"
            )}
          >
            {currentValue ? formatDateDisplay(currentValue) : placeholder}
          </span>
        </div>

        <div className="w-2 h-2 rounded-full bg-[#397BCF] opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>

      {/* Modern Compact Popover Calendar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 3, scale: 0.98 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
            className="absolute left-0 top-full mt-1.5 w-[260px] sm:w-[272px] z-50 bg-white rounded-2xl shadow-xl border border-[#E4EAF2] p-3 space-y-2.5 backdrop-blur-md"
          >
            {/* Quick Date Shortcuts Bar */}
            <div className="flex items-center gap-1 pb-2 border-b border-[#E4EAF2]/80 overflow-x-auto text-[10px] font-bold">
              <button
                type="button"
                onClick={() => handleSelectDate(todayStr)}
                className={cn(
                  "px-2 py-0.5 rounded-md transition-all cursor-pointer select-none shrink-0",
                  currentValue === todayStr
                    ? "bg-[#245FA8] text-white shadow-2xs"
                    : "bg-[#F3F8FE] text-[#245FA8] hover:bg-[#EAF3FF]"
                )}
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => handleSelectDate(tomorrow)}
                className={cn(
                  "px-2 py-0.5 rounded-md transition-all cursor-pointer select-none shrink-0",
                  currentValue === tomorrow
                    ? "bg-[#245FA8] text-white shadow-2xs"
                    : "bg-[#F3F8FE] text-[#245FA8] hover:bg-[#EAF3FF]"
                )}
              >
                Tomorrow
              </button>
              <button
                type="button"
                onClick={() => handleSelectDate(thisSaturday)}
                className={cn(
                  "px-2 py-0.5 rounded-md transition-all cursor-pointer select-none shrink-0",
                  currentValue === thisSaturday
                    ? "bg-[#245FA8] text-white shadow-2xs"
                    : "bg-[#F3F8FE] text-[#245FA8] hover:bg-[#EAF3FF]"
                )}
              >
                Weekend
              </button>
            </div>

            {/* Calendar Month/Year Header */}
            <div className="flex items-center justify-between px-0.5">
              <div className="font-display font-bold text-xs text-[#172033] tracking-tight">
                {MONTH_NAMES[viewMonth]} {viewYear}
              </div>

              <div className="flex items-center gap-0.5">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="p-1 rounded-md text-[#667085] hover:text-[#172033] hover:bg-[#F3F8FE] transition-colors cursor-pointer"
                  aria-label="Previous month"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="p-1 rounded-md text-[#667085] hover:text-[#172033] hover:bg-[#F3F8FE] transition-colors cursor-pointer"
                  aria-label="Next month"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Weekdays Header */}
            <div className="grid grid-cols-7 text-center">
              {WEEKDAY_NAMES.map((wd) => (
                <span
                  key={wd}
                  className="text-[10px] font-bold text-[#98A2B3] uppercase tracking-wider py-0.5"
                >
                  {wd}
                </span>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-0.5 text-center text-[11px]">
              {calendarDays.map((item, idx) => {
                return (
                  <button
                    key={`${item.dateStr}-${idx}`}
                    type="button"
                    disabled={item.isDisabled}
                    onClick={() => handleSelectDate(item.dateStr)}
                    className={cn(
                      "h-7 w-7 sm:h-7.5 sm:w-7.5 mx-auto rounded-lg font-semibold flex items-center justify-center transition-all duration-150 relative select-none",
                      item.isDisabled && "opacity-25 cursor-not-allowed text-[#98A2B3] hover:bg-transparent",
                      !item.isDisabled && !item.isSelected && item.isCurrentMonth && "text-[#172033] hover:bg-[#EAF3FF] hover:text-[#245FA8] cursor-pointer",
                      !item.isDisabled && !item.isSelected && !item.isCurrentMonth && "text-[#98A2B3] hover:bg-[#F8FAFC] cursor-pointer",
                      item.isSelected && "bg-[#245FA8] text-white font-bold shadow-xs scale-105 z-10 cursor-pointer"
                    )}
                  >
                    <span>{item.dayNum}</span>
                    {item.isToday && !item.isSelected && (
                      <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-[#397BCF]" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
