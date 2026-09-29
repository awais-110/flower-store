import { HttpTypes } from "@medusajs/types"
import { sdk } from "@lib/config"
import { getRegion, retrieveRegion } from "./regions"
import { getAuthHeaders, getCacheOptions } from "./cookies"
import { AtelierProduct, StemOption, FloralAddOn } from "@modules/atelier/types"

const FIELDS =
  "*variants.calculated_price,+variants.inventory_quantity,*variants.images,*variants.options,+metadata,+tags,+categories,*collections"

function metaValue(
  product: HttpTypes.StoreProduct,
  key: string
): string | null {
  const metadata = product.metadata as Record<string, unknown> | null | undefined
  if (!metadata) return null
  const value = metadata[key]
  if (typeof value === "string" && value.trim()) return value.trim()
  return null
}

function metaNumber(
  product: HttpTypes.StoreProduct,
  key: string
): number | null {
  const value = metaValue(product, key)
  if (!value) return null
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

function productPrice(product: HttpTypes.StoreProduct): number {
  return product.variants?.[0]?.calculated_price?.calculated_amount ?? 0
}

function productVariantId(product: HttpTypes.StoreProduct): string {
  return product.variants?.[0]?.id ?? ""
}

function productImage(product: HttpTypes.StoreProduct): string {
  return (
    product.images?.[0]?.url ??
    product.thumbnail ??
    product.variants?.[0]?.images?.[0]?.url ??
    ""
  )
}

export function mapProductToAtelierProduct(
  product: HttpTypes.StoreProduct,
  currencyCode: string
): AtelierProduct {
  const raw = product as HttpTypes.StoreProduct & {
    collections?: { title?: string; handle?: string }[]
  }
  const collectionTitles =
    raw.collections?.map((c) => c.title ?? c.handle ?? "") ??
    (product.collection
      ? [product.collection.title ?? product.collection.handle ?? ""]
      : [])

  return {
    id: product.id,
    handle: product.handle ?? "",
    name: product.title ?? "",
    description: product.description ?? "",
    price: productPrice(product),
    compareAtPrice: 0,
    image: productImage(product),
    images: (product.images ?? []).map((i) => i.url),
    currency: currencyCode,
    origin:
      metaValue(product, "origin") ??
      (product.categories?.[0]?.name || "Sanremo, Italy · French Riviera"),
    stemCount: metaNumber(product, "stem_count") ?? 32,
    vaseLife: metaValue(product, "vase_life") ?? "7–10 Days",
    scentProfile:
      metaValue(product, "scent_profile") ??
      "Damask Rose & Fresh Morning Botanicals",
    careInstructions:
      metaValue(product, "care_instructions") ??
      "Trim stems diagonally 2cm. Place in cold water with flower sachet away from direct sunlight.",
    feeling: metaValue(product, "feeling") ?? "FOR LOVE",
    badge: metaValue(product, "badge") ?? "Atelier Signature",
    rating: metaNumber(product, "rating") ?? 4.9,
    reviewCount: metaNumber(product, "review_count") || 28,
    collections: collectionTitles,
    categories: (product.categories ?? []).map((c) => c.name ?? ""),
    tags: (product.tags ?? []).map((t) => t.value ?? ""),
    type: product.type?.value ?? "",
    variantId: productVariantId(product),
    inStock: (product.variants?.[0]?.inventory_quantity ?? 0) > 0,
  }
}

export function mapProductToStemOption(
  product: HttpTypes.StoreProduct
): StemOption {
  return {
    handle: product.handle ?? "",
    name: product.title ?? "",
    description:
      metaValue(product, "scent_profile") ?? product.description ?? "",
    image: productImage(product),
    pricePerStem: productPrice(product),
    variantId: productVariantId(product),
  }
}

export function mapAtelierProductToStemOption(
  product: AtelierProduct
): StemOption {
  return {
    handle: product.handle,
    name: product.name,
    description: product.scentProfile ?? product.description,
    image: product.image,
    pricePerStem: product.price,
    variantId: product.variantId,
  }
}

export function mapAtelierProductToFloralAddOn(
  product: AtelierProduct
): FloralAddOn {
  return {
    id: product.handle,
    productId: product.id,
    variantId: product.variantId,
    title: product.name,
    price: product.price,
    image: product.image,
    description: product.description,
  }
}

export async function getAtelierProducts({
  countryCode,
  regionId,
  limit = 100,
  offset = 0,
  type,
}: {
  countryCode?: string
  regionId?: string
  limit?: number
  offset?: number
  type?: string
} = {}): Promise<AtelierProduct[]> {
  if (!countryCode && !regionId) return []

  const region = countryCode
    ? await getRegion(countryCode)
    : await retrieveRegion(regionId ?? "")

  if (!region) return []

  const currencyCode = region.currency_code ?? "eur"

  const query: Record<string, unknown> = {
    limit,
    offset,
    region_id: region.id,
    fields: FIELDS,
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  const next = {
    ...(await getCacheOptions("atelier-products")),
  }

  const { products } = await sdk.client.fetch<{
    products: HttpTypes.StoreProduct[]
    count: number
  }>(`/store/products`, {
    method: "GET",
    query,
    headers,
    next,
    cache: "force-cache",
  })

  let mapped = (products ?? []).map((product) =>
    mapProductToAtelierProduct(product, currencyCode)
  )

  if (type) {
    mapped = mapped.filter(
      (p) => p.type?.toLowerCase().trim() === type.toLowerCase().trim()
    )
  }

  return mapped
}

export async function getAtelierBestSellers(
  options?: Parameters<typeof getAtelierProducts>[0]
): Promise<AtelierProduct[]> {
  const products = await getAtelierProducts({ limit: 100, ...options })
  return products
    .filter((p) => p.tags.includes("best-seller") || p.badge === "Best Seller")
    .slice(0, 8)
}

export async function getAtelierSingleStems(
  options?: Parameters<typeof getAtelierProducts>[0]
): Promise<AtelierProduct[]> {
  return getAtelierProducts({ ...options, type: "Single Stem" })
}

export async function getAtelierAddOns(
  options?: Parameters<typeof getAtelierProducts>[0]
): Promise<AtelierProduct[]> {
  return getAtelierProducts({ ...options, type: "Add-On" })
}