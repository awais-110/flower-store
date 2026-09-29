import { Metadata } from "next"

import { getRegion } from "@lib/data/regions"
import { getAtelierProducts } from "@lib/data/atelier"
import { listCartOptions, retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import { getBaseURL } from "@lib/util/env"
import { StoreCartShippingOption } from "@medusajs/types"
import CartMismatchBanner from "@modules/layout/components/cart-mismatch-banner"
import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import FreeShippingPriceNudge from "@modules/shipping/components/free-shipping-price-nudge"
import { AtelierProvider } from "@modules/atelier/context/AtelierContext"
import { ToastContainer } from "@modules/atelier/components/ToastContainer"
import { SearchModal } from "@modules/atelier/components/SearchModal"
import { QuickAddDrawer } from "@modules/atelier/components/QuickAddDrawer"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function PageLayout(props: {
  children: React.ReactNode
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await props.params
  const customer = await retrieveCustomer()
  const cart = await retrieveCart()
  let shippingOptions: StoreCartShippingOption[] = []

  if (cart) {
    const { shipping_options } = await listCartOptions()
    shippingOptions = shipping_options
  }

  const region = await getRegion(countryCode)
  const currencyCode = region?.currency_code ?? "eur"
  const atelierProducts = await getAtelierProducts({
    countryCode,
    limit: 100,
  })

  return (
    <AtelierProvider currencyCode={currencyCode}>
      <Nav />
      {customer && cart && <CartMismatchBanner customer={customer} cart={cart} />}
      {cart && (
        <FreeShippingPriceNudge
          variant="popup"
          cart={cart}
          shippingOptions={shippingOptions}
        />
      )}
      {props.children}
      <Footer />
      <ToastContainer />
      <SearchModal products={atelierProducts} currencyCode={currencyCode} />
      <QuickAddDrawer />
    </AtelierProvider>
  )
}