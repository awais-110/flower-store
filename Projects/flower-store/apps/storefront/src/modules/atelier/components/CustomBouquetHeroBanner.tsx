"use client"

import React from "react"
import Image from "next/image"
import { Sparkles, ArrowRight, Palette, Scissors, Gift, Truck } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const CustomBouquetHeroBanner: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-[#41515E] via-[#4A5B69] to-[#3B4A56] text-cream relative overflow-hidden">
      {/* Background Subtle Floral Atmosphere */}
      <div className="absolute top-0 right-0 w-[480px] h-[480px] bg-petal-veil/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-golden-stem/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Text Content & Features */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-coral-blossom text-[10.5px] uppercase tracking-[0.25em] font-semibold border border-coral-blossom/30">
              <Sparkles className="w-3.5 h-3.5 text-petal-veil" />
              <span>Interactive Atelier Experience</span>
            </div>

            <h3 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-cream font-light leading-[1.12] tracking-[-0.01em]">
              Compose Your Own Floral Masterpiece.
            </h3>

            <p className="text-xs sm:text-sm text-cream/85 font-sans leading-relaxed max-w-xl font-light">
              Step into our digital atelier. Hand-select rare English roses, French ranunculus, and sculptural greens. Choose your tactile wrap and dictate a handwritten wax-sealed calligraphy card.
            </p>

            {/* 4-Step Process Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-cream/15 text-xs">
              <div className="space-y-1">
                <Palette className="w-4 h-4 text-petal-veil" />
                <p className="font-medium text-cream">01. Stems</p>
                <p className="text-[10.5px] text-cream/70 font-light">Rare morning cuts</p>
              </div>
              <div className="space-y-1">
                <Scissors className="w-4 h-4 text-petal-veil" />
                <p className="font-medium text-cream">02. Scale</p>
                <p className="text-[10.5px] text-cream/70 font-light">18 to 70 stems</p>
              </div>
              <div className="space-y-1">
                <Gift className="w-4 h-4 text-petal-veil" />
                <p className="font-medium text-cream">03. Inked Note</p>
                <p className="text-[10.5px] text-cream/70 font-light">Wax-sealed card</p>
              </div>
              <div className="space-y-1">
                <Truck className="w-4 h-4 text-petal-veil" />
                <p className="font-medium text-cream">04. Delivery</p>
                <p className="text-[10.5px] text-cream/70 font-light">White-glove courier</p>
              </div>
            </div>

            <div className="pt-2">
              <LocalizedClientLink
                href="/custom-bouquet"
                className="bg-cream text-charcoal hover:bg-petal-veil hover:text-white px-8 py-4 text-[11px] sm:text-xs uppercase tracking-[0.2em] font-bold rounded-xs transition-all duration-300 inline-flex items-center gap-2.5 shadow-2xl hover:shadow-petal-veil/25 hover:-translate-y-0.5"
              >
                <span>Launch Bouquet Studio</span>
                <ArrowRight className="w-4 h-4" />
              </LocalizedClientLink>
            </div>
          </div>

          {/* Visual Showcase Card */}
          <div className="lg:col-span-6 relative group">
            <div className="relative aspect-[4/3] rounded-xs overflow-hidden shadow-2xl border border-white/15">
              <Image
                src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1200&q=85"
                alt="Florist composing bespoke bouquet"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
              
              {/* Floating Bottom Card */}
              <div className="absolute bottom-5 inset-x-5 bg-cream/95 backdrop-blur-md p-4 rounded-xs text-charcoal flex items-center justify-between border border-white/60 shadow-xl">
                <div>
                  <p className="font-editorial text-lg font-medium text-charcoal">
                    Live Dynamic Studio
                  </p>
                  <p className="text-xs text-charcoal/75 font-sans font-light">
                    Real-time stem pricing, palette preview &amp; calligraphy note
                  </p>
                </div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-charcoal bg-coral-blossom/60 border border-petal-veil/30 px-3.5 py-1.5 rounded-full flex-shrink-0">
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
