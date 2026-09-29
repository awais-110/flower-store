"use client";

import React, { useState, useMemo } from "react";
import { Search, Sparkles, X, RotateCcw } from "lucide-react";
import { AtelierProduct } from "../types";
import { ProductCard } from "./ProductCard";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

interface StoreCatalogProps {
  products: AtelierProduct[];
  currencyCode: string;
}

const CATEGORIES = [
  { id: "ALL", label: "All Curations" },
  { id: "Bouquet", label: "Signature Bouquets" },
  { id: "Arrangement", label: "Grand Arrangements" },
  { id: "Single Stem", label: "Single Stems" },
  { id: "Plant", label: "Atelier Plants" },
  { id: "Add-On", label: "Vases & Gifts" },
];

const FEELINGS = [
  "ALL",
  "FOR LOVE",
  "FOR CELEBRATION",
  "FOR GRATITUDE",
  "JUST BECAUSE",
];

const SORT_OPTIONS = [
  { id: "featured", label: "Curated Recommendations" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "name-asc", label: "Botanical Name: A–Z" },
];

export const StoreCatalog: React.FC<StoreCatalogProps> = ({
  products,
  currencyCode,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedFeeling, setSelectedFeeling] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.origin.toLowerCase().includes(q) ||
          (p.scentProfile && p.scentProfile.toLowerCase().includes(q)) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (selectedCategory !== "ALL") {
      list = list.filter((p) => {
        if (selectedCategory === "Add-On") {
          return p.type === "Add-On" || p.categories.includes("Vases & Add-ons");
        }
        return (
          p.type?.toLowerCase() === selectedCategory.toLowerCase() ||
          p.categories.some((c) =>
            c.toLowerCase().includes(selectedCategory.toLowerCase())
          )
        );
      });
    }

    // Feeling filter
    if (selectedFeeling !== "ALL") {
      list = list.filter((p) => p.feeling === selectedFeeling);
    }

    // Sorting
    if (sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name-asc") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [products, searchQuery, selectedCategory, selectedFeeling, sortBy]);

  const hasActiveFilters =
    selectedCategory !== "ALL" ||
    selectedFeeling !== "ALL" ||
    searchQuery.trim().length > 0;

  const resetFilters = () => {
    setSelectedCategory("ALL");
    setSelectedFeeling("ALL");
    setSearchQuery("");
    setSortBy("featured");
  };

  return (
    <div className="bg-cream min-h-screen">
      {/* Editorial Header */}
      <section className="relative pt-14 pb-10 sm:pt-20 sm:pb-14 border-b border-sage/15 bg-gradient-to-b from-cream-light to-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-[11px] uppercase tracking-[0.35em] text-gold font-semibold block">
            Atelier Floral · Full Portfolio
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl text-charcoal font-normal tracking-tight">
            The Botanical Collection
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted max-w-xl mx-auto font-sans leading-relaxed">
            Morning-cut couture arrangements, hand-tied stems, and bespoke gifts
            composed with rare blossoms sourced from our partner estates across the
            Mediterranean and Northern Europe.
          </p>
        </div>
      </section>

      {/* Filter and Control Bar */}
      <div className="sticky top-[68px] z-30 bg-cream/95 backdrop-blur-md border-b border-sage/15 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 space-y-3">
          {/* Top Row: Search & Sort */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-sage" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stems, scents, feelings..."
                className="w-full bg-cream-light border border-sage/20 rounded-xs pl-8 pr-8 py-2 text-xs text-charcoal placeholder-charcoal-light/70 focus:outline-none focus:border-deep-sage transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-charcoal-muted hover:text-charcoal"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Right: Results Count & Sort Dropdown */}
            <div className="flex items-center justify-between sm:justify-end gap-3 text-xs">
              <span className="text-[11px] uppercase tracking-wider text-charcoal-muted font-medium">
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "Arrangement" : "Arrangements"}
              </span>

              <div className="flex items-center gap-1.5">
                <span className="text-[11px] uppercase tracking-wider text-charcoal-muted hidden md:inline">
                  Sort:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-cream-light border border-sage/20 rounded-xs px-2.5 py-1.5 text-xs text-charcoal font-medium focus:outline-none focus:border-deep-sage cursor-pointer"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Bottom Row: Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex-shrink-0 px-3 py-1.5 text-[11px] uppercase tracking-wider font-semibold rounded-xs transition-all ${
                    isSelected
                      ? "bg-deep-sage text-cream shadow-xs"
                      : "bg-cream-light border border-sage/15 text-charcoal-muted hover:text-deep-sage hover:border-sage/30"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="flex-shrink-0 flex items-center gap-1 px-2.5 py-1.5 text-[10px] uppercase tracking-wider font-semibold text-rose-700 bg-rose-50 border border-rose-200/50 rounded-xs hover:bg-rose-100 transition-colors"
              >
                <RotateCcw className="w-2.5 h-2.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Catalog Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {filteredProducts.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={idx < 4}
              />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center space-y-4 max-w-md mx-auto">
            <div className="w-12 h-12 mx-auto rounded-full bg-cream-dark flex items-center justify-center text-sage">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-editorial text-2xl text-charcoal">
              No arrangements match your selection
            </h3>
            <p className="text-xs text-charcoal-muted">
              We couldn’t find any floral designs matching your specific search or
              filter combination.
            </p>
            <button
              onClick={resetFilters}
              className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 bg-deep-sage text-cream text-xs uppercase tracking-widest font-semibold rounded-xs hover:bg-charcoal transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>View All Floral Works</span>
            </button>
          </div>
        )}

        {/* Bespoke Banner CTA at bottom */}
        <div className="mt-20 p-8 sm:p-12 bg-cream-dark/60 border border-sage/20 rounded-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-semibold">
              Bespoke Commission
            </span>
            <h3 className="font-editorial text-2xl sm:text-3xl text-charcoal">
              Desire a custom scale or private floral arrangement?
            </h3>
            <p className="text-xs text-charcoal-muted max-w-xl">
              Use our interactive Stem Builder to tailor stem volume, color palette,
              wrapping, and calligraphy wax cards.
            </p>
          </div>
          <LocalizedClientLink
            href="/custom-bouquet"
            className="flex-shrink-0 px-6 py-3.5 bg-deep-sage text-cream text-xs uppercase tracking-widest font-semibold rounded-xs hover:bg-charcoal transition-colors"
          >
            Launch Bouquet Builder
          </LocalizedClientLink>
        </div>
      </main>
    </div>
  );
};
