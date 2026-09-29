"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { AtelierImage } from "./AtelierImage";
import { useAtelier } from "../context/AtelierContext";
import { formatPrice } from "@lib/util/format-price";
import { AtelierProduct, AtelierCurrencyCode } from "../types";

interface SearchModalProps {
  products: AtelierProduct[];
  currencyCode: AtelierCurrencyCode;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  products,
  currencyCode,
}) => {
  const { isSearchOpen, closeSearch } = useAtelier();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchOpen) {
        closeSearch();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  if (!isSearchOpen) return null;

  const normalized = query.trim().toLowerCase();
  const results =
    normalized === ""
      ? products.slice(0, 4)
      : products.filter(
          (p) =>
            p.name.toLowerCase().includes(normalized) ||
            p.description.toLowerCase().includes(normalized) ||
            (p.feeling ?? "").toLowerCase().includes(normalized) ||
            p.collections.some((c) => c.toLowerCase().includes(normalized)) ||
            p.tags.some((t) => t.toLowerCase().includes(normalized))
        );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      <div
        className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm transition-opacity"
        onClick={closeSearch}
      />

      <div className="relative w-full max-w-2xl bg-cream rounded-sm shadow-2xl overflow-hidden border border-sage/20 z-10 animate-fadeIn">
        <div className="p-4 sm:p-6 border-b border-sage/15 flex items-center gap-3">
          <Search className="w-5 h-5 text-sage" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search roses, feelings, ranunculus, orchids..."
            className="flex-1 bg-transparent text-charcoal text-base sm:text-lg focus:outline-none placeholder:text-charcoal-light/60 font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-xs uppercase tracking-wider text-sage hover:text-deep-sage"
            >
              Clear
            </button>
          )}
          <button
            onClick={closeSearch}
            className="p-1 text-charcoal hover:text-sage transition-colors ml-2"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] uppercase tracking-widest text-sage font-semibold">
              {normalized === "" ? "Curated Suggestions" : `Results (${results.length})`}
            </span>
            <span className="text-xs text-charcoal-light">Press ESC to exit</span>
          </div>

          {results.length === 0 ? (
            <div className="text-center py-12 text-charcoal-muted">
              <p className="font-editorial text-xl">No botanical arrangements found</p>
              <p className="text-xs mt-1">
                Try searching for &quot;roses&quot;, &quot;bouquets&quot;, or &quot;orchids&quot;
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {results.map((product) => (
                <LocalizedClientLink
                  key={product.id}
                  href={`/products/${product.handle}`}
                  onClick={closeSearch}
                  className="flex items-center gap-4 p-2 rounded hover:bg-cream-dark/50 transition-colors group"
                >
                  <div className="relative w-14 h-14 rounded overflow-hidden flex-shrink-0 bg-cream-light">
                    <AtelierImage
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-editorial text-base text-charcoal font-medium group-hover:text-sage transition-colors truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-charcoal-muted truncate">
                      {product.feeling ?? product.origin ?? "Atelier Signature"}
                    </p>
                  </div>
                  <div className="text-right flex items-center gap-2">
                    <span className="text-xs font-semibold text-deep-sage">
                      {formatPrice(product.price, currencyCode)}
                    </span>
                    <ArrowRight className="w-4 h-4 text-sage opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </LocalizedClientLink>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};