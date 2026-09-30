"use client"

import React, { useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { MegaMenu } from "@modules/atelier/components/MegaMenu"
import { Search, ChevronDown } from "lucide-react"
import { useAtelier } from "@modules/atelier/context/AtelierContext"

const LEFT_NAV_ITEMS = [
  { label: "Shop", tab: "shop" as const, href: "/store" },
  { label: "Collections", tab: "collections" as const, href: "/store" },
  { label: "Bespoke", tab: null, href: "/custom-bouquet" },
]

const RIGHT_NAV_ITEMS = [
  { label: "Occasions", tab: null, href: "/#occasions" },
  { label: "Journal", tab: null, href: "/#journal" },
]

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
      {/* Mobile view (< lg): Hamburger on Left, Logo in Center, Bag on Right */}
      <div className="flex lg:hidden items-center justify-between min-h-[76px] py-2 gap-2">
        <div className="flex items-center justify-start w-12 flex-shrink-0">
          {mobileMenuSlot}
        </div>
        <div className="flex-1 flex items-center justify-center">
          {centerSlot}
        </div>
        <div className="flex items-center justify-end gap-2 flex-shrink-0">
          <button
            onClick={openSearch}
            className="p-1.5 text-charcoal-muted hover:text-deep-sage transition-colors"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>
          {rightActionsSlot}
        </div>
      </div>

      {/* Desktop view (>= lg): Balanced 12-column grid with Logo DEAD CENTER */}
      <div className="hidden lg:grid grid-cols-12 items-center min-h-[88px] sm:min-h-[96px] py-2 w-full gap-4">
        {/* Left Navigation (5 cols): Shop, Collections, Bespoke */}
        <nav className="col-span-5 flex items-center justify-start gap-1">
          {LEFT_NAV_ITEMS.map((item) => {
            const hasMega = item.tab !== null
            return hasMega ? (
              <button
                key={item.label}
                onMouseEnter={() => openMega(item.tab!)}
                onClick={() => openMega(item.tab!)}
                className={`flex items-center gap-1 px-3.5 py-2 text-[12px] uppercase tracking-[0.12em] font-semibold transition-all duration-200 rounded-sm group ${
                  activeTab === item.tab
                    ? "text-deep-sage bg-sage/10"
                    : "text-charcoal-muted hover:text-deep-sage hover:bg-cream-dark/40"
                }`}
              >
                <span>{item.label}</span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${
                    activeTab === item.tab ? "rotate-180 text-gold" : "opacity-60"
                  }`}
                />
              </button>
            ) : (
              <LocalizedClientLink
                key={item.label}
                href={item.href}
                className="px-3.5 py-2 text-[12px] uppercase tracking-[0.12em] font-semibold text-charcoal-muted hover:text-deep-sage hover:bg-cream-dark/40 transition-all duration-200 rounded-sm"
              >
                {item.label}
              </LocalizedClientLink>
            )
          })}
        </nav>

        {/* Center (2 cols): Brand Logo dead center */}
        <div className="col-span-2 flex items-center justify-center">
          {centerSlot}
        </div>

        {/* Right Navigation & Actions (5 cols): Occasions, Journal, Search, Account, Bag */}
        <div className="col-span-5 flex items-center justify-end gap-2 xl:gap-3">
          <nav className="flex items-center gap-1">
            {RIGHT_NAV_ITEMS.map((item) => (
              <LocalizedClientLink
                key={item.label}
                href={item.href}
                className="px-3.5 py-2 text-[12px] uppercase tracking-[0.12em] font-semibold text-charcoal-muted hover:text-deep-sage hover:bg-cream-dark/40 transition-all duration-200 rounded-sm"
              >
                {item.label}
              </LocalizedClientLink>
            ))}
          </nav>

          {/* Search Button */}
          <button
            onClick={openSearch}
            className="p-2 text-charcoal-muted hover:text-deep-sage hover:bg-cream-dark/40 transition-all rounded-sm flex items-center gap-1.5"
            aria-label="Search catalog"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Account & Bag actions */}
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
