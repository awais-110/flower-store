import { Metadata } from "next"

import { getRegion } from "@lib/data/regions"
import { getAtelierProducts, getAtelierBestSellers } from "@lib/data/atelier"
import { Hero as AtelierHero } from "@modules/atelier/components/Hero"
import { ShopByFeeling } from "@modules/atelier/components/ShopByFeeling"
import { SignatureCampaign } from "@modules/atelier/components/SignatureCampaign"
import { CollectionRail } from "@modules/atelier/components/CollectionRail"
import { ProductGrid } from "@modules/atelier/components/ProductGrid"
import { CustomBouquetHeroBanner } from "@modules/atelier/components/CustomBouquetHeroBanner"
import { AtelierStory } from "@modules/atelier/components/AtelierStory"
import { SubscriptionSection } from "@modules/atelier/components/SubscriptionSection"
import { ReviewsUGC } from "@modules/atelier/components/ReviewsUGC"
import { JournalGrid } from "@modules/atelier/components/JournalGrid"
import { ConciergeSection } from "@modules/atelier/components/ConciergeSection"

export const metadata: Metadata = {
  title: "Maison Fleur — Luxury Floral Atelier",
  description:
    "Bespoke, editorial floral arrangements crafted with rare blooms and white-glove delivery across Pakistan.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const [products, bestSellers] = await Promise.all([
    getAtelierProducts({ countryCode, limit: 100 }),
    getAtelierBestSellers({ countryCode }),
  ])

  const railProducts =
    bestSellers.length > 0 ? bestSellers : products.slice(0, 8)

  return (
    <>
      <AtelierHero />

      <ShopByFeeling />

      <SignatureCampaign />

      <CollectionRail
        title="Signature Curations"
        subtitle="Morning-cut, seasonal arrangements composed by our senior florists and available to commission today."
        products={railProducts}
      />

      <section id="shop">
        <ProductGrid products={products} />
      </section>

      <section id="bespoke">
        <CustomBouquetHeroBanner />
      </section>

      <AtelierStory />

      <section id="subscriptions">
        <SubscriptionSection />
      </section>

      <ReviewsUGC />

      <section id="journal">
        <JournalGrid />
      </section>

      <section id="concierge">
        <ConciergeSection />
      </section>
    </>
  )
}