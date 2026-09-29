import { Suspense } from "react"

import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import { NavClient } from "./NavClient"

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <div className="sticky top-0 inset-x-0 z-50">
      {/* Main header */}
      <header className="relative bg-cream/95 backdrop-blur-md border-b border-sage/15 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[68px] gap-4">

            {/* Left: Mobile hamburger */}
            <div className="flex items-center lg:hidden">
              <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
            </div>

            {/* Centre: Brand wordmark */}
            <div className="flex-1 flex items-center justify-center lg:justify-start">
              <LocalizedClientLink
                href="/"
                className="group flex flex-col items-center lg:items-start"
                data-testid="nav-store-link"
              >
                <span className="font-editorial text-[22px] sm:text-[26px] tracking-[0.15em] text-deep-sage uppercase leading-none group-hover:text-sage transition-colors duration-300">
                  Atelier Fleur
                </span>
                <span className="text-[9px] tracking-[0.4em] uppercase text-gold font-medium mt-0.5 hidden sm:block">
                  Luxury Floral · Pakistan
                </span>
              </LocalizedClientLink>
            </div>

            {/* Desktop centre-left nav */}
            <div className="hidden lg:flex items-center">
              <NavClient />
            </div>

            {/* Right: icons */}
            <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
              {/* Account link (desktop only) */}
              <LocalizedClientLink
                className="hidden lg:inline-flex text-[11px] uppercase tracking-widest text-charcoal-muted hover:text-deep-sage transition-colors font-medium"
                href="/account"
                data-testid="nav-account-link"
              >
                Account
              </LocalizedClientLink>

              {/* Cart */}
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

          </div>
        </div>
      </header>
    </div>
  )
}
