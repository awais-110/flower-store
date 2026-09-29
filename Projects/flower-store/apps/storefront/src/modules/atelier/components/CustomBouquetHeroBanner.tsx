"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, ArrowRight, Palette, Scissors, Gift, Truck } from "lucide-react";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

export const CustomBouquetHeroBanner: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-deep-sage text-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 bg-sage/30 px-3.5 py-1.5 rounded-full text-blush text-[11px] uppercase tracking-[0.25em] font-semibold border border-sage/40">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Atelier Experience</span>
            </div>

            <h3 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-white font-light leading-tight">
              Compose Your Own Floral Masterpiece.
            </h3>

            <p className="text-xs sm:text-sm text-cream/80 font-sans leading-relaxed max-w-xl">
              Step into our digital atelier. Hand-select rare English roses, French ranunculus, and sculptural greens. Choose your tactile wrap and dictate a handwritten wax-sealed calligraphy card.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2 border-y border-sage/30 text-xs">
              <div className="space-y-1">
                <Palette className="w-4 h-4 text-blush" />
                <p className="font-semibold text-white">01. Stems</p>
                <p className="text-[10px] text-cream/60">Rare harvests</p>
              </div>
              <div className="space-y-1">
                <Scissors className="w-4 h-4 text-blush" />
                <p className="font-semibold text-white">02. Scale</p>
                <p className="text-[10px] text-cream/60">18 to 70 stems</p>
              </div>
              <div className="space-y-1">
                <Gift className="w-4 h-4 text-blush" />
                <p className="font-semibold text-white">03. Inked Note</p>
                <p className="text-[10px] text-cream/60">Calligraphy card</p>
              </div>
              <div className="space-y-1">
                <Truck className="w-4 h-4 text-blush" />
                <p className="font-semibold text-white">04. Delivery</p>
                <p className="text-[10px] text-cream/60">Scheduled window</p>
              </div>
            </div>

            <div className="pt-2">
              <LocalizedClientLink
                href="/custom-bouquet"
                className="bg-cream text-deep-sage hover:bg-blush hover:text-charcoal px-8 py-4 text-xs uppercase tracking-widest font-semibold rounded-xs transition-colors inline-flex items-center gap-2 shadow-lg"
              >
                <span>Launch Bouquet Studio</span>
                <ArrowRight className="w-4 h-4" />
              </LocalizedClientLink>
            </div>
          </div>

          {/* Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-xs overflow-hidden shadow-2xl border border-sage/30">
              <Image
                src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1200&q=85"
                alt="Florist composing bespoke bouquet"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 bg-cream/95 backdrop-blur-md p-4 rounded-xs text-charcoal flex items-center justify-between">
                <div>
                  <p className="font-editorial text-lg font-medium text-deep-sage">
                    Live Dynamic Studio
                  </p>
                  <p className="text-xs text-charcoal-muted">
                    Instant pricing, live stem palette preview & wax seal selector
                  </p>
                </div>
                <span className="text-xs uppercase tracking-widest font-bold text-deep-sage bg-blush px-3 py-1 rounded-full">
                  Try Now
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
