"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Check, Sparkles, RefreshCw } from "lucide-react";
import { formatPrice } from "@lib/util/format-price";
import { useAtelier } from "../context/AtelierContext";

interface FrequencyOption {
  id: "2-weeks" | "month" | "6-weeks";
  title: string;
  cadence: string;
  discountPct: number;
}

const FREQUENCIES: FrequencyOption[] = [
  { id: "2-weeks", title: "Fortnightly", cadence: "Delivered Every 2 Weeks", discountPct: 15 },
  { id: "month", title: "Monthly", cadence: "Delivered Every Month", discountPct: 10 },
  { id: "6-weeks", title: "Seasonal", cadence: "Delivered Every 6 Weeks", discountPct: 5 },
];

const TIERS = [
  {
    id: "classic",
    title: "The Salon",
    stems: "24-28 Seasonal Stems",
    basePrice: 13000,
    idealFor: "Ideal for entryway console tables and intimate reading alcoves.",
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "signature",
    title: "The Atelier",
    stems: "36-40 Master Stems",
    basePrice: 17500,
    popular: true,
    idealFor: "Our hallmark architectural volume, statement piece for living spaces.",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "grand",
    title: "The Sovereign",
    stems: "50-56 Rare Harvest Stems",
    basePrice: 24500,
    idealFor: "Monumental luxury for grand dining settings and private salons.",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80",
  },
];

export const SubscriptionSection: React.FC = () => {
  const [selectedFreq, setSelectedFreq] = useState<FrequencyOption["id"]>("2-weeks");
  const [selectedTier, setSelectedTier] = useState<string>("signature");

  const { showToast, currencyCode } = useAtelier();

  const currentFreq = FREQUENCIES.find((f) => f.id === selectedFreq)!;
  const currentTier = TIERS.find((t) => t.id === selectedTier)!;

  const handleSubscribe = () => {
    showToast(
      "Subscription Commissioned",
      `${currentTier.title} (${currentFreq.title}) added to your floral bag.`
    );
  };

  return (
    <section id="subscriptions" className="py-24 sm:py-32 bg-cream-dark/50 border-y border-sage/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-petal-veil/20 px-3.5 py-1 rounded-full text-charcoal text-[11px] uppercase tracking-widest font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-petal-veil" />
            <span>Botanical Continuity</span>
          </div>
          <h3 className="text-4xl sm:text-5xl text-charcoal font-normal">
            <span className="font-editorial">Bespoke Floral </span>
            <span
              className="font-geraldine text-5xl sm:text-6xl text-petal-veil font-normal lowercase inline-block px-1 align-middle"
              style={{ fontFamily: "var(--font-geraldine), 'Geraldine', cursive, serif" }}
            >
              subscriptions
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-charcoal-muted font-sans max-w-lg mx-auto">
            Invite timeless living beauty into your sanctuary on a seamless recurring schedule. Pause, redirect, or swap arrangements at any whim.
          </p>
        </div>

        {/* Frequency Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 bg-cream rounded-xs border border-sage/20 shadow-xs">
            {FREQUENCIES.map((freq) => {
              const isSelected = selectedFreq === freq.id;
              return (
                <button
                  key={freq.id}
                  onClick={() => setSelectedFreq(freq.id)}
                  className={`px-4 sm:px-6 py-2.5 rounded-xs text-xs uppercase tracking-wider font-semibold transition-all ${
                    isSelected
                      ? "bg-deep-sage text-cream shadow-xs"
                      : "text-charcoal-muted hover:text-charcoal"
                  }`}
                >
                  <span>{freq.title}</span>
                  <span className="ml-1.5 text-[10px] text-blush">(-{freq.discountPct}%)</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3 Tier Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {TIERS.map((tier) => {
            const isSelected = selectedTier === tier.id;
            const price = Math.round(tier.basePrice * (1 - currentFreq.discountPct / 100));

            return (
              <div
                key={tier.id}
                onClick={() => setSelectedTier(tier.id)}
                className={`relative bg-cream rounded-xs border p-8 flex flex-col justify-between cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? "border-deep-sage ring-2 ring-deep-sage shadow-xl -translate-y-1"
                    : "border-sage/20 hover:border-sage shadow-sm"
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-deep-sage text-cream text-[10px] uppercase tracking-widest font-semibold px-3 py-1 rounded-full shadow-xs">
                    Atelier Favorite
                  </span>
                )}

                <div className="space-y-6">
                  {/* Image & Tier Title */}
                  <div className="relative aspect-[4/3] rounded-xs overflow-hidden bg-cream-dark">
                    <Image
                      src={tier.image}
                      alt={tier.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <h4 className="font-editorial text-2xl sm:text-3xl text-charcoal font-medium">
                      {tier.title}
                    </h4>
                    <p className="text-xs uppercase tracking-wider text-sage font-semibold mt-1">
                      {tier.stems}
                    </p>
                    <p className="text-xs text-charcoal-muted mt-2 font-sans">
                      {tier.idealFor}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="pt-2 border-t border-sage/15">
                    <div className="flex items-baseline gap-2">
                      <span className="font-editorial text-3xl text-deep-sage font-semibold">
                        {formatPrice(price, currencyCode)}
                      </span>
                      <span className="text-xs text-charcoal-muted line-through">
                        {formatPrice(tier.basePrice, currencyCode)}
                      </span>
                      <span className="text-xs text-charcoal-muted">/ delivery</span>
                    </div>
                    <p className="text-[11px] text-sage mt-0.5">{currentFreq.cadence}</p>
                  </div>

                  {/* Perks */}
                  <ul className="space-y-2 text-xs text-charcoal-muted pt-2">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-sage flex-shrink-0" />
                      <span>Complimentary hand-blown glass vase on 1st delivery</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-sage flex-shrink-0" />
                      <span>Complimentary courier delivery included</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-sage flex-shrink-0" />
                      <span>Skip, pause, or cancel anytime with one click</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-8">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTier(tier.id);
                      handleSubscribe();
                    }}
                    className={`w-full py-3.5 px-4 rounded-xs text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2 ${
                      isSelected
                        ? "bg-deep-sage text-cream hover:bg-deep-sage-dark"
                        : "bg-cream-dark text-charcoal hover:bg-deep-sage hover:text-cream"
                    }`}
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Select {tier.title}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
