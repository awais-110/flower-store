"use client";

import React from "react";
import { MessageCircle, Calendar, Sparkles, PhoneCall } from "lucide-react";

export const ConciergeSection: React.FC = () => {
  return (
    <section id="concierge" className="py-24 sm:py-32 bg-deep-sage text-cream relative overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-coral-blossom/30 px-4 py-1.5 rounded-full text-coral-blossom text-[11px] uppercase tracking-[0.25em] font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-petal-veil" />
          <span>Haute Botanique Concierge</span>
        </div>

        <h3 className="text-3xl sm:text-5xl lg:text-6xl text-cream font-light tracking-wide max-w-3xl mx-auto leading-tight">
          <span className="font-editorial">Need Something </span>
          <span
            className="font-geraldine text-4xl sm:text-6xl lg:text-7xl text-coral-blossom font-normal lowercase inline-block px-1 align-middle"
            style={{ fontFamily: "var(--font-geraldine), 'Geraldine', cursive, serif" }}
          >
            extraordinary?
          </span>
        </h3>

        <p className="text-xs sm:text-base text-cream/80 font-sans max-w-2xl mx-auto leading-relaxed">
          For private chateau celebrations, architectural residential staging, milestone anniversaries, or custom floral sculptures exceeding 100 stems, speak directly with our Senior Floral Concierge.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://wa.me/447000000000?text=Hello%20Atelier%20Fleur%20Concierge,%20I%20would%20like%20to%20commission%20a%20bespoke%20floral%20arrangement."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-cream text-deep-sage hover:bg-blush hover:text-charcoal px-8 py-4 text-xs uppercase tracking-widest font-semibold rounded-xs transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            <MessageCircle className="w-4 h-4 text-sage" />
            <span>WhatsApp Floral Concierge</span>
          </a>

          <a
            href="tel:+442070000000"
            className="w-full sm:w-auto bg-deep-sage-dark/80 hover:bg-deep-sage-dark text-cream border border-sage/40 px-8 py-4 text-xs uppercase tracking-widest font-semibold rounded-xs transition-colors flex items-center justify-center gap-2"
          >
            <PhoneCall className="w-4 h-4 text-blush" />
            <span>Call London & Paris Atelier</span>
          </a>
        </div>

        <div className="pt-8 flex flex-wrap justify-center items-center gap-8 text-xs text-cream/60 border-t border-sage/20">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-blush" />
            <span>Response within 15 minutes (8am–8pm GMT)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sage-light" />
            <span>Same-Day Private Courier Fleet</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sage-light" />
            <span>Bespoke Monogram Calligraphy Available</span>
          </div>
        </div>
      </div>
    </section>
  );
};
