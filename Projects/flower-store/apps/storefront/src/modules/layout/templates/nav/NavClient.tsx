"use client";

import { useState } from "react";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { MegaMenu } from "@modules/atelier/components/MegaMenu";
import { Search, ChevronDown } from "lucide-react";
import { useAtelier } from "@modules/atelier/context/AtelierContext";

const NAV_ITEMS = [
  { label: "Shop", tab: "shop" as const, href: "/store" },
  { label: "Collections", tab: "collections" as const, href: "/store" },
  { label: "Bespoke", tab: null, href: "/custom-bouquet" },
  { label: "Occasions", tab: null, href: "/#occasions" },
  { label: "Journal", tab: null, href: "/#journal" },
];

export function NavClient() {
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"shop" | "collections" | null>(null);
  const { openSearch } = useAtelier();

  const openMega = (tab: "shop" | "collections") => {
    setActiveTab(tab);
    setIsMegaOpen(true);
  };

  const closeMega = () => {
    setIsMegaOpen(false);
    setActiveTab(null);
  };

  return (
    <div className="relative">
      {/* Desktop navigation links */}
      <nav className="flex items-center gap-1">
        {NAV_ITEMS.map((item) => {
          const hasMega = item.tab !== null;
          return hasMega ? (
            <button
              key={item.label}
              onMouseEnter={() => openMega(item.tab!)}
              
              onClick={() => openMega(item.tab!)}
              className={`flex items-center gap-0.5 px-3.5 py-2 text-[12px] uppercase tracking-[0.1em] font-semibold transition-all duration-200 rounded-sm group ${
                activeTab === item.tab
                  ? "text-deep-sage"
                  : "text-charcoal-muted hover:text-deep-sage"
              }`}
            >
              {item.label}
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-200 ${
                  activeTab === item.tab ? "rotate-180 text-gold" : ""
                }`}
              />
            </button>
          ) : (
            <LocalizedClientLink
              key={item.label}
              href={item.href}
              className="px-3.5 py-2 text-[12px] uppercase tracking-[0.1em] font-semibold text-charcoal-muted hover:text-deep-sage transition-colors duration-200 rounded-sm"
            >
              {item.label}
            </LocalizedClientLink>
          );
        })}

        {/* Search icon */}
        <button
          onClick={openSearch}
          className="ml-2 p-2 text-charcoal-muted hover:text-deep-sage transition-colors rounded-sm"
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
        </button>
      </nav>

      {/* MegaMenu dropdown */}
      <div
        onMouseEnter={() => activeTab && setIsMegaOpen(true)}
        
      >
        <MegaMenu isOpen={isMegaOpen} onClose={closeMega} activeTab={activeTab} />
      </div>
    </div>
  );
}
