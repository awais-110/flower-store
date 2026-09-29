import { Metadata } from "next"

import { getRegion } from "@lib/data/regions"
import {
  getAtelierSingleStems,
  getAtelierAddOns,
  mapAtelierProductToStemOption,
  mapAtelierProductToFloralAddOn,
} from "@lib/data/atelier"
import { BouquetBuilder } from "@modules/atelier/components/BouquetBuilder"

export const metadata: Metadata = {
  title: "Bespoke Bouquet Builder — Atelier Fleur",
  description:
    "Hand-select rare stems, arrange scale, choose your wrap, and commission a bespoke bouquet delivered by white-glove courier.",
}

export default async function CustomBouquetPage(props: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await props.params
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const currencyCode = region.currency_code ?? "eur"

  const [stems, addOns] = await Promise.all([
    getAtelierSingleStems({ countryCode }),
    getAtelierAddOns({ countryCode }),
  ])

  return (
    <BouquetBuilder
      stems={stems.map(mapAtelierProductToStemOption)}
      addOns={addOns.map(mapAtelierProductToFloralAddOn)}
      currencyCode={currencyCode}
    />
  )
}