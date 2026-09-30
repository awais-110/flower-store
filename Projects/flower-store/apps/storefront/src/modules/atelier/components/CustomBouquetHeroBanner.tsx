"use client"

import React from "react"
import Image from "next/image"
import { Sparkles, ArrowRight, Palette, Scissors, Gift, Truck } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const CustomBouquetHeroBanner: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-deep-sage text-cream relative overflow-hidden">
      {/* Background Subtle Floral Atmosphere */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sage/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Text Content & Features */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 bg-sage/25 px-4 py-1.5 rounded-full text-gold text-[10.5px] uppercase tracking-[0.25em] font-bold border border-gold/30">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Interactive Atelier Experience</span>
            </div>

            <h3 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-white font-light leading-[1.15]">
              Compose Your Own Floral Masterpiece.
            </h3>

            <p className="text-xs sm:text-sm text-cream/85 font-sans leading-relaxed max-w-xl font-light">
              Step into our digital atelier. Hand-select rare English roses, French ranunculus, and sculptural greens. Choose your tactile wrap and dictate a handwritten wax-sealed calligraphy card.
            </p>

            {/* 4-Step Process Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-sage/30 text-xs">
              <div className="space-y-1">
                <Palette className="w-4 h-4 text-gold" />
                <p className="font-semibold text-white">01. Stems</p>
                <p className="text-[10px] text-cream/70 font-light">Rare morning cuts</p>
              </div>
              <div className="space-y-1">
                <Scissors className="w-4 h-4 text-gold" />
                <p className="font-semibold text-white">02. Scale</p>
                <p className="text-[10px] text-cream/70 font-light">18 to 70 stems</p>
              </div>
              <div className="space-y-1">
                <Gift className="w-4 h-4 text-gold" />
                <p className="font-semibold text-white">03. Inked Note</p>
                <p className="text-[10px] text-cream/70 font-light">Wax-sealed card</p>
              </div>
              <div className="space-y-1">
                <Truck className="w-4 h-4 text-gold" />
                <p className="font-semibold text-white">04. Delivery</p>
                <p className="text-[10px] text-cream/70 font-light">White-glove courier</p>
              </div>
            </div>

            <div className="pt-2">
              <LocalizedClientLink
                href="/custom-bouquet"
                className="bg-cream text-deep-sage hover:bg-gold hover:text-charcoal px-8 py-4 text-xs uppercase tracking-widest font-bold rounded-xs transition-all duration-300 inline-flex items-center gap-2 shadow-xl hover:-translate-y-0.5"
              >
                <span>Launch Bouquet Studio</span>
                <ArrowRight className="w-4 h-4" />
              </LocalizedClientLink>
            </div>
          </div>

          {/* Visual Showcase Card */}
          <div className="lg:col-span-6 relative group">
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-2xl border border-sage/40">
              <Image
                src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1200&q=85"
                alt="Florist composing bespoke bouquet"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
              
              {/* Floating Bottom Card */}
              <div className="absolute bottom-5 inset-x-5 bg-cream/95 backdrop-blur-md p-4 rounded-xs text-charcoal flex items-center justify-between border border-white/60 shadow-lg">
                <div>
                  <p className="font-editorial text-lg font-medium text-deep-sage">
                    Live Dynamic Studio
                  </p>
                  <p className="text-xs text-charcoal-muted font-sans font-light">
                    Real-time stem pricing, palette preview &amp; calligraphy note
                  </p>
                </div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-deep-sage bg-gold/30 border border-gold/40 px-3 py-1.5 rounded-full flex-shrink-0">
                  Try Now
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default CustomBouquetHeroBanner
