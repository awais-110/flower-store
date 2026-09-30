"use client"

import React, { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

interface HeroCampaign {
  id: string
  eyebrow: string
  headline: string
  subheadline: string
  image: string
  ctaText: string
  ctaHref: string
  secondaryCtaText: string
  secondaryCtaHref: string
  stemNote: string
}

const CAMPAIGNS: HeroCampaign[] = [
  {
    id: "camp-01",
    eyebrow: "Camelia · Haute Botanical Atelier",
    headline: "Roses of Lahore,\nSpoken to the World",
    subheadline:
      "Pakistan's rarest morning-cut garden roses, French ranunculus, and Himalayan botanicals — composed into breathtaking living sculptures.",
    image:
      "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=2000&q=85",
    ctaText: "Explore Collections",
    ctaHref: "/store",
    secondaryCtaText: "Bespoke Bouquet Studio",
    secondaryCtaHref: "/custom-bouquet",
    stemNote: "Lahore · Heritage Garden Roses",
  },
  {
    id: "camp-02",
    eyebrow: "Camelia · Bespoke Gifting & Eid",
    headline: "Express Love\nThrough Flowers",
    subheadline:
      "Hand-penned calligraphy cards and an authentic wax seal accompany every curation — delivered white-glove to any city across Pakistan.",
    image:
      "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=2000&q=85",
    ctaText: "Send as a Gift",
    ctaHref: "/store",
    secondaryCtaText: "Floral Concierge",
    secondaryCtaHref: "/#concierge",
    stemNote: "Mogra · Sweet Pea · Italian Ranunculus",
  },
  {
    id: "camp-03",
    eyebrow: "Camelia · Milestones & Banquets",
    headline: "Celebrate Every\nMoment in Bloom",
    subheadline:
      "Golden mimosa, apricot garden blooms, and white jasmine — a timeless curation crafted for every milestone that deserves remembrance.",
    image:
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=2000&q=85",
    ctaText: "Shop Celebrations",
    ctaHref: "/store",
    secondaryCtaText: "WhatsApp Concierge",
    secondaryCtaHref: "/#concierge",
    stemNote: "Islamabad · Jasmine & Golden Mimosa",
  },
  {
    id: "camp-04",
    eyebrow: "Camelia · Sculptural Botanicals",
    headline: "Beauty in\nGentle Silence",
    subheadline:
      "Rare double-spike Phalaenopsis orchids nestled in handcrafted ceramic vessels — vivid for months, elevating every interior.",
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=2000&q=85",
    ctaText: "Orchid Collection",
    ctaHref: "/store",
    secondaryCtaText: "Read the Journal",
    secondaryCtaHref: "/#journal",
    stemNote: "Karachi · Double-Spike Phalaenopsis",
  },
]

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return
      setIsTransitioning(true)
      setCurrentSlide(index)
      setTimeout(() => setIsTransitioning(false), 700)
    },
    [isTransitioning]
  )

  const handleNext = useCallback(
    () => goTo((currentSlide + 1) % CAMPAIGNS.length),
    [currentSlide, goTo]
  )

  const handlePrev = useCallback(
    () => goTo((currentSlide - 1 + CAMPAIGNS.length) % CAMPAIGNS.length),
    [currentSlide, goTo]
  )

  useEffect(() => {
    const timer = setInterval(handleNext, 7500)
    return () => clearInterval(timer)
  }, [handleNext])

  const campaign = CAMPAIGNS[currentSlide]

  return (
    <section className="relative h-[calc(100vh-110px)] min-h-[580px] max-h-[820px] lg:min-h-[640px] lg:max-h-[860px] w-full overflow-hidden bg-charcoal">
      {/* Background Slides with Multi-Layer Cinema Scrim */}
      {CAMPAIGNS.map((camp, index) => {
        const isActive = index === currentSlide
        return (
          <div
            key={camp.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Top gradient for nav clearance & contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-charcoal/85 via-charcoal/45 to-charcoal/90 z-10" />

            <Image
              src={camp.image}
              alt={camp.headline}
              fill
              priority={index === 0}
              className={`object-cover object-center transition-transform duration-[9000ms] ease-out ${
                isActive ? "scale-100" : "scale-105"
              }`}
            />
          </div>
        )
      })}

      {/* Hero Content Container — Classic British Heritage Luxury Editorial */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between pt-16 sm:pt-20 lg:pt-24 pb-6 sm:pb-8">
        
        {/* Center Focal: Main Headlines & CTAs */}
        <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6 my-auto px-2">
          {/* Polished Eyebrow with refined gradient dividers */}
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <span className="h-px w-8 sm:w-14 bg-gradient-to-r from-transparent to-coral-blossom/70 inline-block flex-shrink-0" />
            <span className="font-saira text-[10.5px] sm:text-[12px] uppercase tracking-[0.32em] font-medium text-coral-blossom drop-shadow-sm">
              {campaign.eyebrow}
            </span>
            <span className="h-px w-8 sm:w-14 bg-gradient-to-l from-transparent to-coral-blossom/70 inline-block flex-shrink-0" />
          </div>

          {/* High-Fashion Italian Vogue Luxury Editorial Headline (Cormorant Garamond) */}
          <h1 className="font-cormorant text-5xl sm:text-6xl md:text-7xl lg:text-[82px] font-light text-cream leading-[1.08] sm:leading-[1.1] tracking-[-0.015em] whitespace-pre-line drop-shadow-2xl max-w-4xl mx-auto">
            {campaign.headline}
          </h1>

          {/* Subheadline in Saira */}
          <p className="font-saira text-xs sm:text-sm md:text-[15px] text-cream/90 max-w-xl sm:max-w-2xl mx-auto leading-relaxed font-light drop-shadow-md">
            {campaign.subheadline}
          </p>

          {/* Action CTAs */}
          <div className="pt-2 sm:pt-3 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <LocalizedClientLink
              href={campaign.ctaHref}
              className="font-saira group inline-flex items-center gap-2.5 bg-cream text-charcoal hover:bg-petal-veil hover:text-white px-8 sm:px-10 py-3.5 sm:py-4 text-[11.5px] sm:text-[12px] uppercase tracking-[0.18em] font-bold rounded-xs transition-all duration-300 shadow-2xl hover:shadow-petal-veil/25 hover:-translate-y-0.5"
            >
              <span>{campaign.ctaText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </LocalizedClientLink>

            <LocalizedClientLink
              href={campaign.secondaryCtaHref}
              className="font-saira inline-flex items-center gap-2 border border-cream/35 hover:border-cream bg-charcoal/30 hover:bg-charcoal/50 backdrop-blur-md text-cream px-7 sm:px-9 py-3.5 sm:py-4 text-[11.5px] sm:text-[12px] uppercase tracking-[0.18em] font-semibold rounded-xs transition-all duration-300 hover:-translate-y-0.5"
            >
              <span>{campaign.secondaryCtaText}</span>
            </LocalizedClientLink>
          </div>
        </div>

        {/* Bottom Bar: Seamless Floating Luxury Curation & Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 py-1">
          {/* Curation Note in floating luxury badge */}
          <div className="font-saira flex items-center gap-2 text-[11px] sm:text-[11.5px] tracking-wider font-light bg-charcoal/30 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
            <span className="text-petal-veil text-xs">✦</span>
            <span className="text-coral-blossom/80 uppercase text-[9.5px] tracking-[0.16em] font-semibold">Curation</span>
            <span className="text-white/30">|</span>
            <span className="text-cream font-medium">{campaign.stemNote}</span>
          </div>

          {/* Slide Navigation Controls */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Pill Indicators */}
            <div className="flex items-center gap-1.5">
              {CAMPAIGNS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === currentSlide
                      ? "w-7 h-1.5 bg-petal-veil shadow-sm shadow-petal-veil/50"
                      : "w-2 h-1.5 bg-cream/30 hover:bg-cream/60"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Slide Index Display */}
            <span className="font-saira text-sm sm:text-base tracking-widest font-medium text-coral-blossom">
              0{currentSlide + 1}
              <span className="text-cream/40 text-xs ml-1">/ 0{CAMPAIGNS.length}</span>
            </span>

            {/* Circular Glassmorphic Arrow Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                className="w-8 h-8 sm:w-8.5 sm:h-8.5 flex items-center justify-center border border-white/20 hover:border-white/50 bg-white/10 hover:bg-white/25 backdrop-blur-md text-cream rounded-full transition-all duration-200 hover:scale-105 active:scale-95 shadow-md"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-8 h-8 sm:w-8.5 sm:h-8.5 flex items-center justify-center border border-white/20 hover:border-white/50 bg-white/10 hover:bg-white/25 backdrop-blur-md text-cream rounded-full transition-all duration-200 hover:scale-105 active:scale-95 shadow-md"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Hero
