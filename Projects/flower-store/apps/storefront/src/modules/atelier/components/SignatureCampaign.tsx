"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

export const SignatureCampaign: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Showcase (Left 7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-12 gap-4 items-center">
            <div className="col-span-8 relative aspect-[4/5] rounded-xs overflow-hidden shadow-xl border border-sage/15">
              <Image
                src="https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=1200&q=85"
                alt="Atelier floral arrangement in progress"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-cream/90 backdrop-blur-xs px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-semibold text-deep-sage">
                Hand-tied in Provence
              </div>
            </div>

            <div className="col-span-4 space-y-4">
              <div className="relative aspect-[3/4] rounded-xs overflow-hidden shadow-md border border-sage/15">
                <Image
                  src="https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=800&q=80"
                  alt="Minimalist alabaster blooms"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 bg-cream-dark/60 rounded-xs border border-sage/15 text-center">
                <p className="font-editorial text-2xl text-deep-sage font-medium">100%</p>
                <p className="text-[10px] uppercase tracking-wider text-charcoal-muted mt-0.5">
                  Traceable Stems
                </p>
              </div>
            </div>
          </div>

          {/* Editorial Narrative (Right 5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 text-sage">
              <Sparkles className="w-4 h-4 text-blush" />
              <span className="text-[11px] uppercase tracking-[0.25em] font-semibold">
                Haute Botanique Manifesto
              </span>
            </div>

            <h3 className="font-editorial text-3xl sm:text-5xl text-charcoal font-light leading-[1.15]">
              Arranged as living architecture, never as commodity.
            </h3>

            <p className="text-xs sm:text-sm text-charcoal-muted font-sans leading-relaxed">
              We reject the industrial cold-storage florist model. Instead, we operate as a couture floral atelier: our master florists hand-select morning blooms from generational growers in San Remo, the Loire Valley, and Hampshire hills.
            </p>

            <blockquote className="border-l-2 border-sage/40 pl-4 py-1 italic font-editorial text-lg text-deep-sage">
              &quot;Flowers possess their own silent cadence. Our task is merely to orchestrate their innate majesty with reverence.&quot;
            </blockquote>

            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <LocalizedClientLink
                href="/custom-bouquet"
                className="bg-deep-sage hover:bg-deep-sage-dark text-cream text-xs uppercase tracking-widest font-semibold px-7 py-3.5 rounded-xs transition-colors flex items-center gap-2 shadow-sm"
              >
                <span>Compose Your Bouquet</span>
                <ArrowRight className="w-4 h-4" />
              </LocalizedClientLink>

              <LocalizedClientLink
                href="/#journal"
                className="text-xs uppercase tracking-widest font-semibold text-charcoal hover:text-sage transition-colors underline underline-offset-4"
              >
                Read Farm Chronicles
              </LocalizedClientLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
