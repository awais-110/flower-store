"use client";

import React from "react";
import Image from "next/image";
import { Star, Camera, ArrowUpRight } from "lucide-react";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

interface EditorialReview {
  id: string;
  quote: string;
  author: string;
  location: string;
  arrangement: string;
  rating: number;
}

const REVIEWS: EditorialReview[] = [
  {
    id: "rev-1",
    quote:
      "The Romanée Blush arrived at our townhouse in Mayfair as if hand-gathered from a 19th-century French chateau. The packaging alone felt like an Hermès or Céline unboxing experience.",
    author: "Camille d'A.",
    location: "London & Paris",
    arrangement: "The Romanée Blush (Signature)",
    rating: 5,
  },
  {
    id: "rev-2",
    quote:
      "Unlike any florist I've ordered from in Manhattan. The wax-sealed handwritten note and the architectural scale of the stems stopped everyone at our dinner party in awe.",
    author: "Harrison V. K.",
    location: "Upper East Side, New York",
    arrangement: "Soleil d'Antibes (Imperial)",
    rating: 5,
  },
  {
    id: "rev-3",
    quote:
      "Ten days later, the garden roses are still open, velvety and fragrant. The cold-chain delivery truly makes all the difference in bloom vitality.",
    author: "Lady Eleanor M.",
    location: "Kensington, London",
    arrangement: "The Alabaster Court (Grand)",
    rating: 5,
  },
];

const UGC_POSTS = [
  {
    id: "ugc-1",
    handle: "@camille.lifestyle",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80",
    productTitle: "The Romanée Blush",
    productHandle: "the-romanee-blush",
  },
  {
    id: "ugc-2",
    handle: "@voguebotanica",
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80",
    productTitle: "The Florentine Cypress",
    productHandle: "the-florentine-cypress",
  },
  {
    id: "ugc-3",
    handle: "@maison.interior",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80",
    productTitle: "Soleil d'Antibes",
    productHandle: "soleil-d-antibes",
  },
  {
    id: "ugc-4",
    handle: "@atelier.julien",
    image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=600&q=80",
    productTitle: "The Alabaster Court",
    productHandle: "the-alabaster-court",
  },
];

export const ReviewsUGC: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Reviews Grid */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[11px] uppercase tracking-[0.3em] text-petal-veil font-semibold">
            Patron Testimonials
          </span>
          <h3 className="text-3xl sm:text-4xl text-charcoal font-normal">
            <span className="font-editorial">Voices of the </span>
            <span
              className="font-geraldine text-4xl sm:text-5xl text-petal-veil font-normal lowercase inline-block px-1 align-middle"
              style={{ fontFamily: "var(--font-geraldine), 'Geraldine', cursive, serif" }}
            >
              salon
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-charcoal-muted font-sans">
            Reflections from clients who value botanical poetry and meticulous craft.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-cream-light p-8 rounded-xs border border-sage/15 flex flex-col justify-between space-y-6 relative"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-sage">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <blockquote className="font-editorial text-lg text-charcoal leading-relaxed">
                  &quot;{rev.quote}&quot;
                </blockquote>
              </div>

              <div className="pt-4 border-t border-sage/10 text-xs">
                <p className="font-semibold text-deep-sage">{rev.author}</p>
                <p className="text-charcoal-muted">{rev.location}</p>
                <p className="text-[11px] text-sage mt-1 font-medium">{rev.arrangement}</p>
              </div>
            </div>
          ))}
        </div>

        {/* UGC Shoppable Gallery */}
        <div className="pt-8 border-t border-sage/15">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-sage font-semibold block mb-1">
                #AtelierFleurInSitu
              </span>
              <h4 className="font-editorial text-2xl sm:text-3xl text-charcoal font-normal">
                Curations In Residence
              </h4>
            </div>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-deep-sage hover:text-sage transition-colors"
            >
              <Camera className="w-4 h-4" />
              <span>Follow @AtelierFleur</span>
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {UGC_POSTS.map((item) => (
              <div
                key={item.id}
                className="group relative aspect-square rounded-xs overflow-hidden bg-cream-dark shadow-sm border border-sage/15"
              >
                <Image
                  src={item.image}
                  alt={item.productTitle}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 text-cream">
                  <span className="text-[10px] font-mono">{item.handle}</span>
                  <div>
                    <p className="font-editorial text-sm font-medium">{item.productTitle}</p>
                    <LocalizedClientLink
                      href={`/products/${item.productHandle}`}
                      className="text-[11px] font-semibold text-blush hover:text-white flex items-center gap-1 mt-1"
                    >
                      <span>Shop Stems</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </LocalizedClientLink>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
