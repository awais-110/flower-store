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
      {/* Mobile view (< lg) */}
      <div className="flex lg:hidden items-center justify-between min-h-[72px] py-2 gap-2">
        <div className="flex items-center justify-start w-12 flex-shrink-0">
          {mobileMenuSlot}
        </div>
        <div className="flex-1 flex items-center justify-center">
          {centerSlot}
        </div>
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

      {/* Desktop view (>= lg): Perfectly balanced equal layout matching user reference */}
      <div className="hidden lg:flex items-center justify-between w-full min-h-[84px] py-2">
        
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

        {/* Center: Flanking Horizontal Rules & Camelia Logo */}
        <div className="flex-shrink-0 flex items-center justify-center px-4 xl:px-8">
          <span className="h-[1px] w-10 sm:w-16 md:w-20 xl:w-28 bg-charcoal/25 flex-shrink-0" />
          <div className="mx-4 sm:mx-6 flex items-center justify-center">
            {centerSlot}
          </div>
          <span className="h-[1px] w-10 sm:w-16 md:w-20 xl:w-28 bg-charcoal/25 flex-shrink-0" />
        </div>

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
