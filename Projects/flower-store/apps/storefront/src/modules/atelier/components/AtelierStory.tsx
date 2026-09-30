"use client";

import React from "react";
import { Leaf, ShieldCheck, Truck, Droplets } from "lucide-react";

export const AtelierStory: React.FC = () => {
  const pillars = [
    {
      icon: Leaf,
      title: "Generational Provenance",
      description:
        "Every stem is sourced directly from sustainable European family micro-growers who practice low-yield, pesticide-free regenerative floriculture.",
    },
    {
      icon: Droplets,
      title: "Hydration Pod Technology",
      description:
        "Stems travel upright in custom botanical gel packs ensuring blooms arrive in full, vibrant hydration as though cut thirty minutes prior.",
    },
    {
      icon: Truck,
      title: "Private Temperature Fleet",
      description:
        "Dispatched across major metropolitan zones via our custom temperature-stabilized courier vans, eliminating commercial parcel tossing.",
    },
    {
      icon: ShieldCheck,
      title: "7-Day Atelier Longevity",
      description:
        "We guarantee minimum seven days of luminous blooming life, accompanied by our proprietary plant-based enzymatic bloom nutrition.",
    },
  ];

  return (
    <section id="delivery" className="py-20 sm:py-28 bg-cream border-t border-sage/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[11px] uppercase tracking-[0.3em] text-petal-veil font-semibold">
            The Atelier Standard
          </span>
          <h3 className="text-3xl sm:text-4xl text-charcoal font-normal">
            <span className="font-editorial">Why Discerning Clients Choose </span>
            <span
              className="font-geraldine text-4xl sm:text-5xl text-petal-veil font-normal inline-block px-1 align-middle"
              style={{ fontFamily: "var(--font-geraldine), 'Geraldine', cursive, serif" }}
            >
              Camelia
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-charcoal-muted font-sans">
            Meticulously engineered white-glove flower care from dawn harvest to recipient mantelpiece.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-cream-light p-8 rounded-xs border border-sage/15 space-y-4 hover:border-sage transition-all duration-300 relative group"
              >
                <div className="w-12 h-12 rounded-full bg-deep-sage/5 flex items-center justify-center text-deep-sage group-hover:bg-deep-sage group-hover:text-cream transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-sage tracking-widest block">
                  0{idx + 1}
                </span>
                <h4 className="font-editorial text-xl text-charcoal font-medium">
                  {pillar.title}
                </h4>
                <p className="text-xs text-charcoal-muted font-sans leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
