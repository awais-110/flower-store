"use client"

import React, { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
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
  badge?: string
}

const CAMPAIGNS: HeroCampaign[] = [
  {
    id: "camp-01",
    eyebrow: "Camelia · Signature Collection",
    headline: "Roses of Lahore,\nSpoken to the World",
    subheadline:
      "Pakistan's rarest garden roses, French ranunculus and Himalayan wildflowers — composed into a single, breathtaking arrangement.",
    image:
      "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=2000&q=85",
    ctaText: "Explore Collection",
    ctaHref: "/store",
    secondaryCtaText: "Bespoke Bouquet",
    secondaryCtaHref: "/custom-bouquet",
    stemNote: "Lahore · Heritage Garden Roses",
    badge: "New Season Curations",
  },
  {
    id: "camp-02",
    eyebrow: "Camelia · Weddings & Eid",
    headline: "Express Love\nThrough Flowers",
    subheadline:
      "Hand-penned calligraphy cards and a wax seal accompany every arrangement — delivered to any city across Pakistan.",
    image:
      "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=2000&q=85",
    ctaText: "Send as a Gift",
    ctaHref: "/store",
    secondaryCtaText: "Floral Concierge",
    secondaryCtaHref: "/#concierge",
    stemNote: "Mogra · Sweet Pea · Italian Ranunculus",
    badge: "Bespoke Gifting",
  },
  {
    id: "camp-03",
    eyebrow: "Camelia · Milestones & Banquets",
    headline: "Celebrate Every\nMoment in Bloom",
    subheadline:
      "Golden mimosa, apricot garden blooms and white jasmine — a timeless curation for every milestone that deserves remembrance.",
    image:
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=2000&q=85",
    ctaText: "Shop Celebrations",
    ctaHref: "/store",
    secondaryCtaText: "WhatsApp Concierge",
    secondaryCtaHref: "/#concierge",
    stemNote: "Islamabad · Jasmine & Golden Mimosa",
    badge: "Limited Edition",
  },
  {
    id: "camp-04",
    eyebrow: "Camelia · Sculptural Botanicals",
    headline: "Beauty in\nGentle Silence",
    subheadline:
      "Rare Phalaenopsis orchids, nestled in French ceramic vessels — vivid for months, elevating every corner of your home.",
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=2000&q=85",
    ctaText: "Orchid Collection",
    ctaHref: "/store",
    secondaryCtaText: "Read the Journal",
    secondaryCtaHref: "/#journal",
    stemNote: "Karachi · Double-Spike Phalaenopsis",
    badge: "Living Sculptures",
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
    <section className="relative h-[calc(100vh-130px)] min-h-[520px] max-h-[760px] lg:min-h-[580px] lg:max-h-[800px] w-full overflow-hidden bg-charcoal">
      {/* Background Slides with Cinema Scrim */}
      {CAMPAIGNS.map((camp, index) => {
        const isActive = index === currentSlide
        return (
          <div
            key={camp.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Multi-layer atmospheric scrims */}
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/55 to-charcoal/20 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-charcoal/25 z-10" />

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

      {/* Hero Content Container — Perfectly balanced vertical flex */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between py-6 sm:py-8 lg:py-10">
        
        {/* Top Meta: Badge */}
        <div className="flex items-center justify-between">
          {campaign.badge ? (
            <span className="inline-flex items-center gap-1.5 bg-gold/90 backdrop-blur-md text-charcoal text-[9.5px] sm:text-[10px] font-bold uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full shadow-md transition-all duration-300">
              <Sparkles className="w-3 h-3 text-charcoal" />
              <span>{campaign.badge}</span>
            </span>
          ) : (
            <div />
          )}
        </div>

        {/* Center Focal: Main Headlines & CTAs */}
        <div className="max-w-2xl space-y-4 sm:space-y-5 my-auto">
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gold inline-block flex-shrink-0" />
            <span className="text-[10.5px] sm:text-[11.5px] uppercase tracking-[0.3em] font-semibold text-gold/95">
              {campaign.eyebrow}
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-light text-white leading-[1.1] whitespace-pre-line drop-shadow-md">
            {campaign.headline}
          </h1>

          {/* Subheadline */}
          <p className="text-xs sm:text-sm md:text-base text-cream/90 max-w-xl font-sans leading-relaxed font-light">
            {campaign.subheadline}
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
            <LocalizedClientLink
              href={campaign.ctaHref}
              className="group inline-flex items-center gap-2.5 bg-cream text-deep-sage hover:bg-gold hover:text-charcoal px-6 sm:px-8 py-3 sm:py-3.5 text-[11px] sm:text-[12px] uppercase tracking-widest font-bold rounded-xs transition-all duration-300 shadow-xl hover:-translate-y-0.5"
            >
              <span>{campaign.ctaText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </LocalizedClientLink>

            <LocalizedClientLink
              href={campaign.secondaryCtaHref}
              className="inline-flex items-center gap-2 border border-cream/40 hover:border-cream bg-cream/10 hover:bg-cream/20 backdrop-blur-md text-cream px-5 sm:px-7 py-3 sm:py-3.5 text-[11px] sm:text-[12px] uppercase tracking-widest font-semibold rounded-xs transition-all duration-300"
            >
              {campaign.secondaryCtaText}
            </LocalizedClientLink>
          </div>
        </div>

        {/* Bottom Bar: Stem Note & Controls */}
        <div className="pt-4 border-t border-cream/15 flex items-center justify-between gap-4">
          {/* Stem Note */}
          <p className="hidden sm:flex items-center gap-2 text-[11px] text-cream/70 tracking-wider font-light">
            <span className="text-gold">✦</span>
            <span>Curation:</span>
            <span className="text-cream font-medium">{campaign.stemNote}</span>
          </p>

          {/* Slide Navigation Controls */}
          <div className="flex items-center gap-4 sm:gap-6 ml-auto sm:ml-0">
            {/* Pill Indicators */}
            <div className="flex items-center gap-1.5">
              {CAMPAIGNS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === currentSlide
                      ? "w-6 h-1.5 bg-gold"
                      : "w-2 h-1.5 bg-cream/35 hover:bg-cream/60"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Slide Index Display */}
            <span className="font-editorial text-sm sm:text-base tracking-widest font-light text-gold">
              0{currentSlide + 1}
              <span className="text-cream/40 text-xs ml-1">/ 0{CAMPAIGNS.length}</span>
            </span>

            {/* Arrow Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center border border-cream/30 hover:border-cream bg-cream/10 hover:bg-cream/25 text-cream rounded-xs transition-all duration-200"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center border border-cream/30 hover:border-cream bg-cream/10 hover:bg-cream/25 text-cream rounded-xs transition-all duration-200"
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
