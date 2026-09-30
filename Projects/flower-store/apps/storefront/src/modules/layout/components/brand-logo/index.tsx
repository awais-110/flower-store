import React from "react"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

interface BrandLogoProps {
  className?: string
  title?: string
}

export function BrandLogo({
  className = "",
  title = "Camelia",
}: BrandLogoProps) {
  return (
    <LocalizedClientLink
      href="/"
      className={`group inline-flex flex-col items-center justify-center text-center transition-transform duration-300 hover:scale-[1.02] py-0.5 ${className}`}
      data-testid="nav-store-link"
    >
      {/* Authentic Watercolor Botanical Flower Blossom Artwork */}
      <div className="relative flex items-center justify-center -mb-1 pointer-events-none">
        <Image
          src="/images/camelia-blossom.png"
          alt="Camelia Floral Blossom"
          width={130}
          height={90}
          priority
          className="h-9 sm:h-11 w-auto object-contain transition-transform duration-500 ease-out group-hover:scale-105 select-none drop-shadow-xs"
        />
      </div>

      {/* Main Calligraphy Script Typography in user's provided Geraldine font */}
      <span
        style={{ fontFamily: "var(--font-geraldine), 'Geraldine', cursive, Georgia, serif" }}
        className="font-geraldine font-display text-[34px] sm:text-[42px] md:text-[46px] font-normal leading-[0.8] text-[#22201D] group-hover:text-deep-sage transition-colors duration-300 capitalize tracking-normal select-none"
      >
        {title}
      </span>
    </LocalizedClientLink>
  )
}

export default BrandLogo
