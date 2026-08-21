"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

export default function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const fallbackImages = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
  ];
  const list = images && images.length > 0 ? images : fallbackImages;

  const prev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrent((c) => (c - 1 + list.length) % list.length);
  };

  const next = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrent((c) => (c + 1) % list.length);
  };

  return (
    <div className="space-y-3">
      {/* Main Image Banner */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden bg-[#172033] group shadow-sm border border-[#E4EAF2]">
        <img
          src={list[current]}
          alt={`${title} - Photo ${current + 1}`}
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 cursor-pointer"
          onClick={() => setLightboxOpen(true)}
        />

        {/* Navigation Arrows */}
        {list.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center opacity-80 sm:opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5 text-[#172033]" />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center opacity-80 sm:opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5 text-[#172033]" />
            </button>
          </>
        )}

        {/* Bottom Bar: Photo Count & Lightbox Trigger */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <div className="bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>
              {current + 1} of {list.length} Photos
            </span>
          </div>

          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white backdrop-blur-md text-[#172033] text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Fullscreen</span>
          </button>
        </div>
      </div>

      {/* Thumbnails Row */}
      {list.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-1">
          {list.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrent(idx)}
              className={`shrink-0 w-24 h-16 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                idx === current
                  ? "border-[#397BCF] ring-2 ring-[#397BCF]/20 scale-102"
                  : "border-[#E4EAF2] hover:border-[#397BCF]/60 opacity-70 hover:opacity-100"
              }`}
              aria-label={`View photo ${idx + 1}`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-8 backdrop-blur-md">
            {/* Top Lightbox Bar */}
            <div className="flex items-center justify-between text-white z-10">
              <div className="text-sm font-bold truncate max-w-md">
                {title} — Photo {current + 1} of {list.length}
              </div>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close fullscreen"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Lightbox Center Image */}
            <div className="relative flex-1 flex items-center justify-center py-4">
              <img
                src={list[current]}
                alt={`${title} - Fullscreen photo ${current + 1}`}
                className="max-h-[80vh] max-w-full object-contain rounded-2xl shadow-2xl"
              />

              {list.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prev}
                    className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="w-7 h-7" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer"
                    aria-label="Next"
                  >
                    <ChevronRight className="w-7 h-7" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Thumbnail Strip */}
            <div className="flex justify-center gap-2 overflow-x-auto no-scrollbar py-2">
              {list.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrent(idx)}
                  className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    idx === current ? "border-[#397BCF] scale-110" : "border-white/20 opacity-50"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
