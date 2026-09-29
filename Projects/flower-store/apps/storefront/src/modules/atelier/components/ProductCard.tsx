"use client";

import React, { useState } from "react";
import { Heart, Plus } from "lucide-react";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { AtelierProduct } from "../types";
import { AtelierImage } from "./AtelierImage";
import { formatPrice } from "@lib/util/format-price";
import { useAtelier } from "../context/AtelierContext";

interface ProductCardProps {
  product: AtelierProduct;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  priority = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isInWishlist, toggleWishlist, openQuickAdd, currencyCode } =
    useAtelier();

  const isFavorited = isInWishlist(product.handle);
  const primaryImage = product.image;
  const secondaryImage = product.images[1] || primaryImage;

  return (
    <div
      className="group relative flex flex-col card-premium"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-cream-dark/40 rounded-xs">
        <LocalizedClientLink
          href={`/products/${product.handle}`}
          className="block w-full h-full"
        >
          <AtelierImage
            src={primaryImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
            className={`object-cover object-center transition-all duration-700 ease-out ${
              isHovered && secondaryImage !== primaryImage
                ? "opacity-0 scale-105"
                : "opacity-100 scale-100"
            }`}
          />

          {secondaryImage && secondaryImage !== primaryImage && (
            <AtelierImage
              src={secondaryImage}
              alt={`${product.name} alternate view`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`object-cover object-center transition-all duration-700 ease-out ${
                isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            />
          )}
        </LocalizedClientLink>

        {product.badge && (
          <div className="absolute top-3 left-3 pointer-events-none">
            <span className="bg-cream/90 backdrop-blur-xs text-deep-sage text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full shadow-xs">
              {product.badge}
            </span>
          </div>
        )}

        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.handle);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 ${
            isFavorited
              ? "bg-blush text-charcoal shadow-sm"
              : "bg-cream/80 text-charcoal hover:bg-cream hover:text-deep-sage"
          }`}
          aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorited ? "fill-current" : ""}`} />
        </button>

        <div
          className={`absolute bottom-3 inset-x-3 transition-all duration-300 transform ${
            isHovered
              ? "translate-y-0 opacity-100"
              : "translate-y-2 opacity-0 pointer-events-none"
          }`}
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              openQuickAdd(product);
            }}
            className="w-full bg-cream/95 hover:bg-deep-sage hover:text-cream text-charcoal text-xs uppercase tracking-widest font-semibold py-2.5 px-3 rounded-xs shadow-md backdrop-blur-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Quick Select</span>
          </button>
        </div>
      </div>

      <div className="mt-3.5 space-y-1">
        <div className="flex items-baseline justify-between gap-2">
          <LocalizedClientLink
            href={`/products/${product.handle}`}
            className="font-editorial text-lg sm:text-xl text-charcoal hover:text-sage transition-colors font-medium leading-tight truncate"
          >
            {product.name}
          </LocalizedClientLink>
          <span className="text-xs sm:text-sm font-semibold text-deep-sage flex-shrink-0">
            {formatPrice(product.price, currencyCode)}
          </span>
        </div>

        <p className="text-xs text-charcoal-muted line-clamp-1 font-sans">
          {product.description ||
            "Couture seasonal bouquet arranged by master florists"}
        </p>

        {product.feeling && (
          <p className="text-[10px] uppercase tracking-widest text-sage font-medium pt-0.5">
            {product.feeling}
          </p>
        )}
      </div>
    </div>
  );
};