"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

interface FeelingTile {
  title: string;
  subtitle: string;
  tagline: string;
  count: string;
  image: string;
  href: string;
  accent: string;
}

const FEELINGS: FeelingTile[] = [
  {
    title: "Romance",
    subtitle: "For Love",
    tagline: "Romantic Lahori garden roses, trailing sweet pea tendrils and cascading silver greens.",
    count: "12 Arrangements",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1000&q=85",
    href: "/store",
    accent: "#E8C5C1",
  },
  {
    title: "Celebrations",
    subtitle: "Weddings & Milestones",
    tagline: "Eid, Weddings, Birthdays — golden mimosa and champagne ranunculus in full glory.",
    count: "9 Arrangements",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1000&q=85",
    href: "/store",
    accent: "#C9A84C",
  },
  {
    title: "Gratitude",
    subtitle: "Thankfulness",
    tagline: "Architectural cypress foliage, dewy white mogra and sculptural statement branches.",
    count: "8 Arrangements",
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1000&q=85",
    href: "/store",
    accent: "#73836B",
  },
  {
    title: "Just Because",
    subtitle: "Quiet Moments",
    tagline: "Gentle morning stems, wildflower textures and linen wraps — no reason needed.",
    count: "14 Arrangements",
    image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=1000&q=85",
    href: "/store",
    accent: "#8E9E86",
  },
]


export const ShopByFeeling: React.FC = () => {
  return (
    <section id="occasions" className="py-20 sm:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] uppercase tracking-[0.35em] text-sage font-semibold">
            Emotions &amp; Intentions
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl text-charcoal font-light mt-3 mb-4">
            How Are You Feeling?
          </h2>
          <p className="text-sm text-charcoal-muted font-sans leading-relaxed">
            Every arrangement is composed for a specific emotion — let flowers speak when words fall short.
          </p>
          {/* Decorative rule */}
          <div className="flex items-center gap-3 mt-6 justify-center">
            <span className="h-px w-12 bg-gold/40 block" />
            <span className="text-gold text-base">✦</span>
            <span className="h-px w-12 bg-gold/40 block" />
          </div>
        </div>

        {/* 4 Editorial Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEELINGS.map((item) => (
            <LocalizedClientLink
              key={item.title}
              href={item.href}
              className="group relative h-[440px] sm:h-[500px] overflow-hidden rounded-sm flex flex-col justify-end cursor-pointer"
            >
              {/* Background Image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
              />

              {/* Gradient scrim — stronger at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent" />

              {/* Hover overlay tint */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                style={{ backgroundColor: item.accent }}
              />

              {/* Content */}
              <div className="relative z-10 p-6 space-y-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                <p className="text-[10px] uppercase tracking-[0.25em] text-gold font-semibold">
                  {item.count}
                </p>
                <h3 className="font-editorial text-3xl text-white font-medium leading-tight">
                  {item.title}
                </h3>
                <p className="text-[11px] text-white/60 font-sans font-light uppercase tracking-widest">
                  {item.subtitle}
                </p>

                {/* Tagline — visible on hover */}
                <p className="text-xs text-cream/75 font-sans leading-relaxed max-w-[220px] opacity-0 group-hover:opacity-100 transition-opacity duration-400 pt-1">
                  {item.tagline}
                </p>

                <div className="pt-3 flex items-center gap-1.5">
                  <span className="text-[11px] uppercase tracking-widest font-bold text-gold group-hover:text-white transition-colors">
                    Explore
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gold group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </div>
            </LocalizedClientLink>
          ))}
        </div>
      </div>
    </section>
  );
};
