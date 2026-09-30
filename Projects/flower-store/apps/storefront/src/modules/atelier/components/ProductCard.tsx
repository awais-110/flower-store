"use client"

import React, { useState } from "react"
import { Heart, Plus, Sparkles } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { AtelierProduct } from "../types"
import { AtelierImage } from "./AtelierImage"
import { formatPrice } from "@lib/util/format-price"
import { useAtelier } from "../context/AtelierContext"

interface ProductCardProps {
  product: AtelierProduct
  priority?: boolean
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  priority = false,
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const { isInWishlist, toggleWishlist, openQuickAdd, currencyCode } =
    useAtelier()

  const isFavorited = isInWishlist(product.handle)
  const primaryImage = product.image
  const secondaryImage = product.images[1] || primaryImage

  return (
    <div
      className="group relative flex flex-col bg-white rounded-sm border border-sage/15 hover:border-gold/30 hover:shadow-xl transition-all duration-500 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-cream-dark/30">
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
                : "opacity-100 scale-100 group-hover:scale-105"
            }`}
          />

          {secondaryImage && secondaryImage !== primaryImage && (
            <AtelierImage
              src={secondaryImage}
              alt={`${product.name} alternate view`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`object-cover object-center transition-all duration-700 ease-out ${
                isHovered ? "opacity-100 scale-105" : "opacity-0 scale-95"
              }`}
            />
          )}
        </LocalizedClientLink>

        {/* Exclusive Curation Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 pointer-events-none">
            <span className="inline-flex items-center gap-1 bg-cream/95 backdrop-blur-md text-deep-sage border border-sage/20 text-[9.5px] uppercase tracking-[0.2em] font-bold px-3 py-1 rounded-full shadow-sm">
              <Sparkles className="w-2.5 h-2.5 text-gold" />
              <span>{product.badge}</span>
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault()
            toggleWishlist(product.handle)
          }}
          className={`absolute top-3 right-3 p-2.5 rounded-full transition-all duration-300 shadow-sm ${
            isFavorited
              ? "bg-blush text-charcoal scale-110"
              : "bg-cream/90 backdrop-blur-md text-charcoal hover:bg-cream hover:text-deep-sage hover:scale-110"
          }`}
          aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorited ? "fill-current text-deep-sage" : ""}`} />
        </button>

        {/* Quick Add Action Button (Reveals Smoothly on Hover) */}
        <div
          className={`absolute bottom-3 inset-x-3 transition-all duration-300 transform ${
            isHovered
              ? "translate-y-0 opacity-100"
              : "translate-y-2 opacity-0 pointer-events-none"
          }`}
        >
          <button
            onClick={(e) => {
              e.preventDefault()
              openQuickAdd(product)
            }}
            className="w-full bg-cream/95 hover:bg-deep-sage hover:text-cream text-charcoal border border-cream/50 text-[11px] uppercase tracking-[0.2em] font-bold py-3 px-4 rounded-xs shadow-lg backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Quick Select</span>
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 bg-cream/40">
        <div>
          {/* Subtle Category / Emotion Tag */}
          {product.feeling && (
            <p className="text-[10px] uppercase tracking-[0.25em] text-gold font-semibold mb-1">
              {product.feeling}
            </p>
          )}

          <div className="flex items-baseline justify-between gap-2">
            <LocalizedClientLink
              href={`/products/${product.handle}`}
              className="font-editorial text-lg sm:text-[20px] text-charcoal group-hover:text-deep-sage transition-colors duration-300 font-medium leading-snug truncate"
            >
              {product.name}
            </LocalizedClientLink>
            <span className="text-xs sm:text-sm font-bold text-deep-sage flex-shrink-0 font-sans tracking-tight">
              {formatPrice(product.price, currencyCode)}
            </span>
          </div>

          <p className="text-xs text-charcoal-muted line-clamp-2 font-sans mt-1.5 leading-relaxed font-light">
            {product.description ||
              "Couture seasonal bouquet arranged by master florists with rare morning stems."}
          </p>
        </div>

        {/* Bottom subtle divider & stem metadata */}
        <div className="mt-3 pt-3 border-t border-sage/10 flex items-center justify-between text-[10px] text-charcoal-muted font-sans uppercase tracking-widest">
          <span>Fresh Morning Cut</span>
          <span className="text-sage font-medium">Bespoke Wrap</span>
        </div>
      </div>
    </div>
  )
}

export default ProductCard