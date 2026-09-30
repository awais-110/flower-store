import React from "react"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

interface BrandLogoProps {
  className?: string
  title?: string
  subtitle?: string
}

export function BrandLogo({
  className = "",
  title = "Camelia",
  subtitle = "FLORAL STUDIO",
}: BrandLogoProps) {
  return (
    <LocalizedClientLink
      href="/"
      className={`group inline-flex flex-col items-center justify-center text-center transition-transform duration-300 hover:scale-[1.02] py-0.5 ${className}`}
      data-testid="nav-store-link"
    >
      {/* Authentic Watercolor Botanical Flower Blossom Artwork */}
      <div className="relative flex items-center justify-center -mb-1.5 pointer-events-none">
        <Image
          src="/images/camelia-blossom.png"
          alt="Camelia Floral Blossom"
          width={120}
          height={84}
          priority
          className="h-9 sm:h-11 w-auto object-contain transition-transform duration-500 ease-out group-hover:scale-105 select-none drop-shadow-xs"
        />
      </div>

      {/* Main Calligraphy Script Typography in user's provided Geraldine font */}
      <span
        style={{ fontFamily: "var(--font-geraldine), 'Geraldine', cursive, Georgia, serif" }}
        className="font-geraldine font-display text-[32px] sm:text-[38px] md:text-[42px] font-normal leading-[0.75] text-[#22201D] group-hover:text-deep-sage transition-colors duration-300 capitalize tracking-normal select-none"
      >
        {title}
      </span>

      {/* Subtitle in Crisp Spaced Typography */}
      <span className="text-[8px] sm:text-[9px] tracking-[0.38em] uppercase text-[#6A4E77] group-hover:text-deep-sage font-bold mt-1 transition-colors duration-300 select-none">
        {subtitle}
      </span>
    </LocalizedClientLink>
  )
}

export default BrandLogo
