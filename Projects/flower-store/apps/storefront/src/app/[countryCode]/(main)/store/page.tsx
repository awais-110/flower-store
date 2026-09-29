import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getRegion } from "@lib/data/regions"
import { getAtelierProducts } from "@lib/data/atelier"
import { StoreCatalog } from "@modules/atelier/components/StoreCatalog"

export const metadata: Metadata = {
  title: "The Botanical Collection | Atelier Fleur",
  description:
    "Explore our complete couture floral portfolio — morning-cut bouquets, rare garden stems, and bespoke gifts.",
}

export default async function StorePage(props: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await props.params
  const region = await getRegion(countryCode)

  if (!region) {
    notFound()
  }

  const products = await getAtelierProducts({
    countryCode,
    limit: 100,
  })

  return <StoreCatalog products={products} currencyCode={region.currency_code} />
}

