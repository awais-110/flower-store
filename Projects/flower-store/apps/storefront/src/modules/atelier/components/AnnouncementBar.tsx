"use client"

import React, { useState, useEffect } from "react"
import { Sparkles, X, ChevronRight } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const ANNOUNCEMENTS = [
  {
    text: "Same-day delivery across Karachi · Lahore · Islamabad — order before 1 pm",
    actionText: "Delivery Areas",
    href: "/#delivery",
    icon: "truck",
  },
  {
    text: "Every arrangement includes a complimentary handwritten calligraphy card — at no extra cost",
    actionText: "Personalize",
    href: "/custom-bouquet",
    icon: "sparkles",
  },
  {
    text: "New arrivals — Heritage Gulab, White Mogra & Seasonal Wildflowers now in season",
    actionText: "Shop Now",
    href: "/store",
    icon: "sparkles",
  },
  {
    text: "Eid, Wedding & Corporate gifting — bespoke floral experiences crafted to order",
    actionText: "Enquire",
    href: "/#concierge",
    icon: "sparkles",
  },
]

export const AnnouncementBar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [fade, setFade] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)

  // Auto-rotate announcements
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length)
        setFade(true)
      }, 350)
    }, 5500)
    return () => clearInterval(interval)
  }, [])

  // Hide smoothly on scroll down, reveal on top
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isVisible) return null

  const current = ANNOUNCEMENTS[currentIndex]

  return (
    <aside
      aria-label="Announcements"
      className={`relative z-50 bg-fresh-bud text-cream transition-all duration-300 ease-in-out overflow-hidden ${
        isScrolled
          ? "max-h-0 opacity-0 -translate-y-full border-transparent"
          : "max-h-8 opacity-100 translate-y-0 border-b border-blush-bloom/20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-7 sm:h-[26px]">
          {/* Left decoration */}
          <div className="hidden md:flex items-center gap-1.5 opacity-80 flex-shrink-0">
            <Sparkles className="w-2.5 h-2.5 text-coral-blossom" />
            <span className="text-[9px] uppercase tracking-[0.25em] font-medium text-coral-blossom">
              Atelier Concierge
            </span>
          </div>

          {/* Centre rotating message */}
          <div
            className={`flex-1 text-center px-2 sm:px-4 transition-opacity duration-300 truncate ${
              fade ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="text-[10px] sm:text-[11px] font-normal tracking-wide text-cream/95">
              {current.text}
            </span>
            {current.actionText && (
              <LocalizedClientLink
                href={current.href}
                className="ml-2.5 text-[10px] sm:text-[11px] font-semibold text-coral-blossom hover:text-white underline underline-offset-2 inline-flex items-center gap-0.5 transition-colors"
              >
                {current.actionText}
                <ChevronRight className="w-2.5 h-2.5" />
              </LocalizedClientLink>
            )}
          </div>

          {/* Right: dismiss */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            {/* Slide dots */}
            <div className="hidden sm:flex items-center gap-1">
              {ANNOUNCEMENTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-0.5 rounded-full transition-all ${
                    i === currentIndex ? "bg-coral-blossom w-2.5" : "bg-cream/25 w-1"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="opacity-60 hover:opacity-100 transition-opacity p-0.5 text-cream/80"
              aria-label="Close announcement"
            >
              <X className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default AnnouncementBar
