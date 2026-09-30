"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

interface HeroCampaign {
  id: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  image: string;
  ctaText: string;
  ctaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
  stemNote: string;
  badge?: string;
}

const CAMPAIGNS: HeroCampaign[] = [
  {
    id: "camp-01",
    eyebrow: "Maison Fleur · Signature Collection",
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
    badge: "New Season",
  },
  {
    id: "camp-02",
    eyebrow: "Gifting · Weddings & Eid",
    headline: "Express Love\nThrough Flowers",
    subheadline:
      "Hand-penned calligraphy cards and a wax seal accompany every arrangement — delivered to any city across Pakistan.",
    image:
      "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=2000&q=85",
    ctaText: "Send as a Gift",
    ctaHref: "/store",
    secondaryCtaText: "Speak with Concierge",
    secondaryCtaHref: "/#concierge",
    stemNote: "Mogra · Sweet Pea · Italian Ranunculus",
  },
  {
    id: "camp-03",
    eyebrow: "Celebrations · Milestones",
    headline: "Celebrate Every\nMoment in Bloom",
    subheadline:
      "Golden mimosa, apricot garden blooms and white jasmine — a timeless curation for every milestone that deserves remembrance.",
    image:
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=2000&q=85",
    ctaText: "Shop Celebrations",
    ctaHref: "/store",
    secondaryCtaText: "WhatsApp Us",
    secondaryCtaHref: "/#concierge",
    stemNote: "Islamabad · Jasmine & Golden Mimosa",
  },
  {
    id: "camp-04",
    eyebrow: "Living Sculptures · Orchids",
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
  },
]

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 800);
    },
    [isTransitioning]
  );

  const handleNext = useCallback(
    () => goTo((currentSlide + 1) % CAMPAIGNS.length),
    [currentSlide, goTo]
  );

  const handlePrev = useCallback(
    () => goTo((currentSlide - 1 + CAMPAIGNS.length) % CAMPAIGNS.length),
    [currentSlide, goTo]
  );

  useEffect(() => {
    const timer = setInterval(handleNext, 7000);
    return () => clearInterval(timer);
  }, [handleNext]);

  const campaign = CAMPAIGNS[currentSlide];

  return (
    <section className="relative h-[90vh] min-h-[640px] max-h-[960px] w-full overflow-hidden bg-charcoal">
      {/* Slide backgrounds */}
      {CAMPAIGNS.map((camp, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={camp.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Multi-layer scrim for readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/40 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-charcoal/10 z-10" />
            <Image
              src={camp.image}
              alt={camp.headline}
              fill
              priority={index === 0}
              className={`object-cover object-center transition-transform duration-[8000ms] ease-out ${
                isActive ? "scale-100" : "scale-105"
              }`}
            />
          </div>
        );
      })}

      {/* Content */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-14 sm:pb-20">
        <div className="max-w-2xl space-y-5">
          {/* Badge */}
          {campaign.badge && (
            <span className="inline-flex items-center gap-1.5 bg-gold/90 backdrop-blur-sm text-charcoal text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
              ✦ {campaign.badge}
            </span>
          )}

          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gold inline-block flex-shrink-0" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-gold/90">
              {campaign.eyebrow}
            </span>
          </div>

          {/* Headline — supports line breaks via \n */}
          <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-light text-white leading-[1.1] whitespace-pre-line drop-shadow-lg">
            {campaign.headline}
          </h1>

          {/* Subheadline */}
          <p className="text-sm sm:text-base text-cream/85 max-w-xl font-sans leading-relaxed font-light">
            {campaign.subheadline}
          </p>

          {/* CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <LocalizedClientLink
              href={campaign.ctaHref}
              className="group inline-flex items-center gap-2.5 bg-cream text-deep-sage hover:bg-gold hover:text-charcoal px-7 py-3.5 text-[11px] uppercase tracking-widest font-bold rounded-sm transition-all duration-300 shadow-lg"
            >
              <span>{campaign.ctaText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </LocalizedClientLink>

            <LocalizedClientLink
              href={campaign.secondaryCtaHref}
              className="inline-flex items-center gap-2 border border-cream/40 hover:border-cream bg-cream/10 hover:bg-cream/20 backdrop-blur-sm text-cream px-6 py-3.5 text-[11px] uppercase tracking-widest font-semibold rounded-sm transition-all duration-300"
            >
              {campaign.secondaryCtaText}
            </LocalizedClientLink>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-5 border-t border-cream/15 flex items-center justify-between gap-4">
          {/* Stem note */}
          <p className="hidden sm:block text-[11px] text-cream/60 tracking-wider font-light">
            ✦ <span className="text-cream/80 font-medium ml-1">{campaign.stemNote}</span>
          </p>

          {/* Slide counter + controls */}
          <div className="flex items-center gap-5 ml-auto sm:ml-0">
            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {CAMPAIGNS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === currentSlide
                      ? "w-5 h-1.5 bg-gold"
                      : "w-1.5 h-1.5 bg-cream/30 hover:bg-cream/60"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <span className="font-editorial text-base tracking-widest font-light text-gold">
              0{currentSlide + 1}
              <span className="text-cream/40 text-xs ml-1">/ 0{CAMPAIGNS.length}</span>
            </span>

            {/* Arrow controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-9 h-9 flex items-center justify-center border border-cream/25 hover:border-cream/60 bg-cream/5 hover:bg-cream/15 text-cream rounded-sm transition-all duration-200"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-9 h-9 flex items-center justify-center border border-cream/25 hover:border-cream/60 bg-cream/5 hover:bg-cream/15 text-cream rounded-sm transition-all duration-200"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
