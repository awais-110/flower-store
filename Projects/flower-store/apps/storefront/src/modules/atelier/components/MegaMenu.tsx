"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: "shop" | "collections" | null;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose, activeTab }) => {
  if (!isOpen || !activeTab) return null;

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 w-full bg-cream border-b border-sage/15 shadow-xl transition-all duration-300 py-10 px-8 z-40 text-charcoal animate-fadeIn"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
        {/* Column 1: Featured stems / collections */}
        <div className="col-span-3 space-y-4">
          <p className="text-[11px] uppercase tracking-widest text-sage font-semibold">
            {activeTab === "shop" ? "Stem Varieties" : "Curation Series"}
          </p>
          <ul className="space-y-2.5 text-sm">
            <li>
              <LocalizedClientLink
                href="/store"
                onClick={onClose}
                className="hover:text-sage transition-colors block py-0.5"
              >
                Heritage Garden Roses
              </LocalizedClientLink>
            </li>
            <li>
              <LocalizedClientLink
                href="/store"
                onClick={onClose}
                className="hover:text-sage transition-colors block py-0.5"
              >
                French Ranunculus & Anemones
              </LocalizedClientLink>
            </li>
            <li>
              <LocalizedClientLink
                href="/store"
                onClick={onClose}
                className="hover:text-sage transition-colors block py-0.5"
              >
                Living Sculptural Orchids
              </LocalizedClientLink>
            </li>
            <li>
              <LocalizedClientLink
                href="/store"
                onClick={onClose}
                className="hover:text-sage transition-colors block py-0.5"
              >
                All Signature Arrangements
              </LocalizedClientLink>
            </li>
          </ul>
        </div>

        {/* Column 2: Occasions & Feelings */}
        <div className="col-span-3 space-y-4">
          <p className="text-[11px] uppercase tracking-widest text-sage font-semibold">
            Shop By Feeling
          </p>
          <ul className="space-y-2.5 text-sm">
            <li>
              <LocalizedClientLink
                href="/store"
                onClick={onClose}
                className="hover:text-sage transition-colors block py-0.5"
              >
                For Love & Devotion
              </LocalizedClientLink>
            </li>
            <li>
              <LocalizedClientLink
                href="/store"
                onClick={onClose}
                className="hover:text-sage transition-colors block py-0.5"
              >
                For Grand Celebrations
              </LocalizedClientLink>
            </li>
            <li>
              <LocalizedClientLink
                href="/store"
                onClick={onClose}
                className="hover:text-sage transition-colors block py-0.5"
              >
                For Pure Gratitude
              </LocalizedClientLink>
            </li>
            <li>
              <LocalizedClientLink
                href="/store"
                onClick={onClose}
                className="hover:text-sage transition-colors block py-0.5"
              >
                Just Because (Quiet Moments)
              </LocalizedClientLink>
            </li>
          </ul>
        </div>

        {/* Column 3: Atelier Services */}
        <div className="col-span-3 space-y-4">
          <p className="text-[11px] uppercase tracking-widest text-sage font-semibold">
            Bespoke Services
          </p>
          <ul className="space-y-2.5 text-sm">
            <li>
              <LocalizedClientLink
                href="/custom-bouquet"
                onClick={onClose}
                className="font-medium text-deep-sage hover:text-sage transition-colors flex items-center gap-1.5 py-0.5"
              >
                <span>Bespoke Bouquet Builder</span>
                <span className="text-[10px] bg-blush px-1.5 py-0.2 text-charcoal font-semibold rounded-full uppercase">
                  Interactive
                </span>
              </LocalizedClientLink>
            </li>
            <li>
              <LocalizedClientLink
                href="/#subscriptions"
                onClick={onClose}
                className="hover:text-sage transition-colors block py-0.5"
              >
                Fortnightly Subscriptions
              </LocalizedClientLink>
            </li>
            <li>
              <LocalizedClientLink
                href="/#concierge"
                onClick={onClose}
                className="hover:text-sage transition-colors block py-0.5"
              >
                Floral Concierge & WhatsApp
              </LocalizedClientLink>
            </li>
            <li>
              <LocalizedClientLink
                href="/#delivery"
                onClick={onClose}
                className="hover:text-sage transition-colors block py-0.5"
              >
                White-Glove Delivery Map
              </LocalizedClientLink>
            </li>
          </ul>
        </div>

        {/* Column 4: Editorial Highlight */}
        <div className="col-span-3 bg-cream-light p-4 rounded-xs border border-sage/10 relative overflow-hidden group">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xs mb-3">
            <Image
              src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80"
              alt="Featured editorial arrangement"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute top-2 left-2 bg-cream/90 backdrop-blur-xs text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full text-deep-sage">
              Autumn Curation
            </span>
          </div>
          <p className="font-editorial text-lg text-charcoal font-medium leading-tight">
            The Romanée Blush
          </p>
          <p className="text-xs text-charcoal-muted mt-1 line-clamp-2">
            Rare English garden roses and wild Italian butterfly ranunculus.
          </p>
          <LocalizedClientLink
            href="/products/the-romanee-blush"
            onClick={onClose}
            className="mt-3 text-xs font-semibold text-deep-sage flex items-center gap-1 hover:text-sage transition-colors"
          >
            <span>Explore Arrangement</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  );
};
