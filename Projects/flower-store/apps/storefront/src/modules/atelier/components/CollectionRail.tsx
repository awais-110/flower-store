"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { AtelierProduct } from "../types";
import { ProductCard } from "./ProductCard";

interface CollectionRailProps {
  title: string;
  subtitle: string;
  products: AtelierProduct[];
  viewAllHref?: string;
}

export const CollectionRail: React.FC<CollectionRailProps> = ({
  title,
  subtitle,
  products,
  viewAllHref = "/store",
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const offset = direction === "left" ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 sm:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-sage/15 gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-sage font-semibold block mb-1">
              Morning Cut · Seasonal
            </span>
            <h3 className="font-editorial text-3xl sm:text-4xl text-charcoal font-normal">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-muted mt-1 font-sans max-w-lg">
              {subtitle}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <LocalizedClientLink
              href={viewAllHref}
              className="text-xs uppercase tracking-widest font-semibold text-deep-sage hover:text-sage transition-colors flex items-center gap-1.5"
            >
              <span>View All Curations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </LocalizedClientLink>

            <div className="hidden sm:flex items-center gap-1.5">
              <button
                onClick={() => scroll("left")}
                className="p-2 rounded-full border border-sage/30 hover:border-deep-sage hover:bg-cream-dark transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4 text-charcoal" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="p-2 rounded-full border border-sage/30 hover:border-deep-sage hover:bg-cream-dark transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4 text-charcoal" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Rail */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="w-[280px] sm:w-[320px] lg:w-[350px] flex-shrink-0"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
