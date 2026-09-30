import { Suspense } from "react"

import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import { AnnouncementBar } from "@modules/atelier/components/AnnouncementBar"
import { BrandLogo } from "@modules/layout/components/brand-logo"
import { NavClient } from "./NavClient"

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <div className="sticky top-0 inset-x-0 z-50">
      {/* Announcement bar — always at very top */}
      <AnnouncementBar />

      {/* Main header */}
      <header className="relative bg-cream/95 backdrop-blur-md border-b border-sage/15 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NavClient
            centerSlot={<BrandLogo />}
            mobileMenuSlot={
              <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
            }
            rightActionsSlot={
              <div className="flex items-center gap-1 sm:gap-2 xl:gap-3 flex-shrink-0">
                {/* Account link (desktop) */}
                <LocalizedClientLink
                  className="px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] font-semibold text-charcoal/80 hover:text-deep-sage transition-colors duration-200"
                  href="/account"
                  data-testid="nav-account-link"
                >
                  ACCOUNT
                </LocalizedClientLink>

                {/* Cart Button */}
                <Suspense
                  fallback={
                    <LocalizedClientLink
                      className="bg-fresh-bud hover:bg-fresh-bud-dark text-cream px-3.5 sm:px-4 py-2 rounded-xs font-bold text-[11px] uppercase tracking-[0.14em] shadow-xs transition-colors inline-flex items-center justify-center whitespace-nowrap"
                      href="/cart"
                      data-testid="nav-cart-link"
                    >
                      CART (0)
                    </LocalizedClientLink>
                  }
                >
                  <CartButton />
                </Suspense>
              </div>
            }
          />
        </div>
      </header>
    </div>
  )
}
