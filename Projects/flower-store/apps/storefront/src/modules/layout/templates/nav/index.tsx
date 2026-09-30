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
              <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
                {/* Account link (desktop) */}
                <LocalizedClientLink
                  className="hidden lg:inline-flex text-[11px] uppercase tracking-widest text-charcoal-muted hover:text-deep-sage transition-colors font-semibold"
                  href="/account"
                  data-testid="nav-account-link"
                >
                  Account
                </LocalizedClientLink>

                {/* Cart Button */}
                <Suspense
                  fallback={
                    <LocalizedClientLink
                      className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-charcoal hover:text-deep-sage font-semibold transition-colors"
                      href="/cart"
                      data-testid="nav-cart-link"
                    >
                      <span>Bag</span>
                      <span className="bg-deep-sage text-cream text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                        0
                      </span>
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
