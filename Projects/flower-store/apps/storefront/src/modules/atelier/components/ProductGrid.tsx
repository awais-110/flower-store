"use client";

import React, { useState } from "react";
import { AtelierProduct } from "../types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: AtelierProduct[];
  title?: string;
  subtitle?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  title = "The Atelier Floral Collection",
  subtitle = "Each arrangement is cut and gathered at first morning light by generational growers.",
}) => {
  const [selectedFeeling, setSelectedFeeling] = useState<string>("ALL");

  const feelings = ["ALL", "FOR LOVE", "FOR CELEBRATION", "FOR GRATITUDE", "JUST BECAUSE"];

  const filtered =
    selectedFeeling === "ALL"
      ? products
      : products.filter((p) => p.feeling === selectedFeeling);

  return (
    <section id="collection-grid" className="py-24 sm:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-sage/15 gap-6">
          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-[0.25em] text-sage font-semibold block">
              Permanent & Seasonal Curation
            </span>
            <h3 className="font-editorial text-3xl sm:text-5xl text-charcoal font-normal">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-muted max-w-lg font-sans">
              {subtitle}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-cream-dark/60 p-1.5 rounded-xs border border-sage/15">
            {feelings.map((feeling) => {
              const isSelected = selectedFeeling === feeling;
              return (
                <button
                  key={feeling}
                  onClick={() => setSelectedFeeling(feeling)}
                  className={`px-3 py-1.5 text-[11px] uppercase tracking-wider font-semibold rounded-xs transition-all ${
                    isSelected
                      ? "bg-deep-sage text-cream shadow-xs"
                      : "text-charcoal-muted hover:text-charcoal"
                  }`}
                >
                  {feeling}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-column mobile, 3-column desktop responsive grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-8 lg:gap-10">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
