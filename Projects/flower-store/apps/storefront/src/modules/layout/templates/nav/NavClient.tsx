"use client"

import React, { useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { MegaMenu } from "@modules/atelier/components/MegaMenu"
import { Search, ChevronDown } from "lucide-react"
import { useAtelier } from "@modules/atelier/context/AtelierContext"

interface NavClientProps {
  centerSlot: React.ReactNode
  rightActionsSlot: React.ReactNode
  mobileMenuSlot: React.ReactNode
}

export function NavClient({
  centerSlot,
  rightActionsSlot,
  mobileMenuSlot,
}: NavClientProps) {
  const [isMegaOpen, setIsMegaOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"shop" | "collections" | null>(null)
  const { openSearch } = useAtelier()

  const openMega = (tab: "shop" | "collections") => {
    setActiveTab(tab)
    setIsMegaOpen(true)
  }

  const closeMega = () => {
    setIsMegaOpen(false)
    setActiveTab(null)
  }

  return (
    <div className="relative w-full">
      {/* Hanging Center Curved Medallion (Drops down from nav onto the hero banner) */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 z-30 pointer-events-auto">
        <div className="bg-[#FAF7F2] border-b border-x border-sage/25 shadow-lg rounded-b-[2.2rem] sm:rounded-b-[2.6rem] px-5 sm:px-8 pt-1.5 pb-3.5 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-xl hover:border-gold/40">
          {centerSlot}
        </div>
      </div>

      {/* Mobile view (< lg) */}
      <div className="flex lg:hidden items-center justify-between h-[62px] sm:h-[66px] py-1 gap-2">
        <div className="flex items-center justify-start w-12 flex-shrink-0">
          {mobileMenuSlot}
        </div>
        {/* Center space placeholder so hamburger and cart don't overlap the hanging medallion */}
        <div className="flex-1 w-32" aria-hidden="true" />
        <div className="flex items-center justify-end gap-2 flex-shrink-0">
          <button
            onClick={openSearch}
            className="p-1.5 text-charcoal hover:text-deep-sage transition-colors"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>
          {rightActionsSlot}
        </div>
      </div>

      {/* Desktop view (>= lg): Balanced equal nav bar with center hanging medallion */}
      <div className="hidden lg:flex items-center justify-between w-full h-[64px] sm:h-[68px]">
        
        {/* Left Side: Shop, Collections, Bespoke */}
        <nav className="flex-1 flex items-center justify-start gap-1 sm:gap-2 xl:gap-3">
          {/* Shop */}
          <button
            onMouseEnter={() => openMega("shop")}
            onClick={() => openMega("shop")}
            className={`flex items-center gap-1 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.14em] font-semibold transition-all duration-200 rounded-xs group ${
              activeTab === "shop"
                ? "bg-[#EFE8DE] text-deep-sage"
                : "bg-[#F3ECE2]/80 hover:bg-[#EFE8DE] text-charcoal"
            }`}
          >
            <span>SHOP</span>
            <ChevronDown
              className={`w-3 h-3 transition-transform duration-200 ${
                activeTab === "shop" ? "rotate-180 text-gold" : "text-charcoal/60"
              }`}
            />
          </button>

          {/* Collections */}
          <button
            onMouseEnter={() => openMega("collections")}
            onClick={() => openMega("collections")}
            className={`flex items-center gap-1 px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] font-semibold transition-all duration-200 rounded-xs group ${
              activeTab === "collections"
                ? "text-deep-sage"
                : "text-charcoal/80 hover:text-deep-sage"
            }`}
          >
            <span>COLLECTIONS</span>
            <ChevronDown
              className={`w-3 h-3 transition-transform duration-200 ${
                activeTab === "collections" ? "rotate-180 text-gold" : "text-charcoal/60"
              }`}
            />
          </button>

          {/* Bespoke */}
          <LocalizedClientLink
            href="/custom-bouquet"
            className="px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] font-semibold text-charcoal/80 hover:text-deep-sage transition-colors duration-200 rounded-xs"
          >
            BESPOKE
          </LocalizedClientLink>
        </nav>

        {/* Center Space Reservation (Ensures left & right links never collide with the hanging medallion) */}
        <div className="w-52 sm:w-60 lg:w-68 flex-shrink-0 flex items-center justify-center" aria-hidden="true" />

        {/* Right Side: Occasions, Journal, Search, Account, Cart */}
        <div className="flex-1 flex items-center justify-end gap-1 sm:gap-2 xl:gap-3">
          <LocalizedClientLink
            href="/#occasions"
            className="px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] font-semibold text-charcoal/80 hover:text-deep-sage transition-colors duration-200"
          >
            OCCASIONS
          </LocalizedClientLink>

          <LocalizedClientLink
            href="/#journal"
            className="px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] font-semibold text-charcoal/80 hover:text-deep-sage transition-colors duration-200"
          >
            JOURNAL
          </LocalizedClientLink>

          {/* Search Button */}
          <button
            onClick={openSearch}
            className="p-1.5 text-charcoal/80 hover:text-deep-sage transition-colors rounded-xs"
            aria-label="Search catalog"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Account link & Cart button slot */}
          {rightActionsSlot}
        </div>
      </div>

      {/* MegaMenu dropdown (full-width) */}
      <div onMouseEnter={() => activeTab && setIsMegaOpen(true)}>
        <MegaMenu isOpen={isMegaOpen} onClose={closeMega} activeTab={activeTab} />
      </div>
    </div>
  )
}

export default NavClient
