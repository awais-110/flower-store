"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, X, ChevronRight } from "lucide-react";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

const ANNOUNCEMENTS = [
  {
    text: "Karachi · Lahore · Islamabad mein same-day delivery — order before 1pm",
    actionText: "Delivery Areas",
    href: "/#delivery",
    icon: "truck",
  },
  {
    text: "Har arrangement ke saath complimentary handwritten card — bilkul muft",
    actionText: "Personalize",
    href: "/custom-bouquet",
    icon: "sparkles",
  },
  {
    text: "Naya collection aa gaya — Desi Gulab, Mogra, aur Seasonal Wildflowers",
    actionText: "Shop Now",
    href: "/store",
    icon: "sparkles",
  },
  {
    text: "Eid, Shaadi, aur Corporate gifting — bespoke floral experiences",
    actionText: "Enquire",
    href: "/#concierge",
    icon: "sparkles",
  },
];

export const AnnouncementBar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
        setFade(true);
      }, 350);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  const current = ANNOUNCEMENTS[currentIndex];

  return (
    <aside
      aria-label="Announcements"
      className="relative z-50 bg-deep-sage text-cream border-b border-sage/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-9">
          {/* Left decoration */}
          <div className="hidden sm:flex items-center gap-2 opacity-60 flex-shrink-0">
            <Sparkles className="w-3 h-3 text-gold" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Atelier Concierge</span>
          </div>

          {/* Centre rotating message */}
          <div
            className={`flex-1 text-center px-4 transition-opacity duration-300 ${
              fade ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="text-[11px] sm:text-xs font-medium tracking-wide">
              {current.text}
            </span>
            {current.actionText && (
              <LocalizedClientLink
                href={current.href}
                className="ml-3 text-[11px] sm:text-xs font-bold text-gold hover:text-gold-light underline underline-offset-2 inline-flex items-center gap-0.5 transition-colors"
              >
                {current.actionText}
                <ChevronRight className="w-3 h-3" />
              </LocalizedClientLink>
            )}
          </div>

          {/* Right: dismiss */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Slide dots */}
            <div className="hidden sm:flex items-center gap-1">
              {ANNOUNCEMENTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-1 h-1 rounded-full transition-all ${
                    i === currentIndex ? "bg-gold w-3" : "bg-cream/30"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="opacity-50 hover:opacity-100 transition-opacity p-1"
              aria-label="Close announcement"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
