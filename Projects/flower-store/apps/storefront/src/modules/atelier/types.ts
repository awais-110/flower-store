export type AtelierCurrencyCode = string

export interface FloralAddOn {
  id: string
  productId: string
  variantId: string
  title: string
  price: number
  image: string
  description: string
}

export type DeliveryWindow =
  | "Morning (9:00 - 13:00)"
  | "Afternoon (13:00 - 18:00)"
  | "Evening (18:00 - 21:00)"

export interface FloralCustomMetadata {
  delivery_date?: string
  delivery_window?: DeliveryWindow
  gift_message?: string
  gift_recipient?: string
  gift_sender?: string
  wrap_option?: string
  vase_option?: string
  add_on_items?: { title: string; price: number }[]
  is_custom_bouquet?: boolean
  stems_breakdown?: { name: string; count: number }[]
}

export interface AtelierProduct {
  id: string
  handle: string
  name: string
  description: string
  price: number
  compareAtPrice: number
  image: string
  images: string[]
  currency: AtelierCurrencyCode
  origin: string
  stemCount: number | null
  vaseLife: string | null
  scentProfile: string | null
  careInstructions: string | null
  feeling: string | null
  badge: string
  rating: number
  reviewCount: number
  collections: string[]
  categories: string[]
  tags: string[]
  type: string
  variantId: string
  inStock: boolean
}

export interface StemOption {
  handle: string
  name: string
  description: string
  image: string
  pricePerStem: number
  variantId: string
}