"use client"

import React, { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { formatPrice } from "@lib/util/format-price"
import { AtelierProduct } from "../types"

// ── Types ──────────────────────────────────────────────────────────
export interface HeroFeaturedProduct {
  id: string
  handle: string
  title: string
  thumbnail: string
  price: number
  currency?: string
}

export interface HeroSlide {
  id: string
  // Full-width dark moody botanical background photo (dense low-key foliage)
  image: string
  imageAlt: string
  // 3-line uppercase serif headline with inline stationery flourish
  headlineLine1: string
  headlineLine2Before: string
  headlineLine2After: string
  headlineLine3: string
  // Short one-line subcopy, max ~32 characters, centered
  subcopy: string
  // Single pill-shaped outlined CTA
  ctaLabel: string
  ctaHref: string
  // Dynamic product for the floating card (bottom-left)
  featuredProduct?: HeroFeaturedProduct | null
}

export interface HeroProps {
  slides?: HeroSlide[]
  featuredProducts?: AtelierProduct[]
}

// ── Social Icons (Inline SVGs) ───────────────────────────────────────
const InstagramIcon: React.FC<{ className?: string }> = ({
  className = "w-4 h-4",
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const FacebookIcon: React.FC<{ className?: string }> = ({
  className = "w-4 h-4",
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

// ── Hand-Drawn-Style Stationery Calligraphy Flourish (Thin Gold / Muted Tan SVG) ──
const StationeryFlourish: React.FC = () => (
  <span
    className="inline-flex items-center justify-center align-middle mx-2 sm:mx-3 md:mx-3.5 text-[#C5A880] select-none opacity-90 transition-transform duration-300"
    aria-hidden="true"
  >
    <svg
      viewBox="0 0 52 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 sm:w-11 md:w-14 h-auto"
    >
      <path
        d="M2 9C9 2.5 16 15.5 26 9C36 2.5 43 15.5 50 9"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <circle cx="2" cy="9" r="1.6" fill="currentColor" />
      <circle cx="50" cy="9" r="1.6" fill="currentColor" />
    </svg>
  </span>
)

// ── Default Dark Moody Botanical Slides ────────────────────────────
// TODO: Replace Unsplash dark botanical URLs with bespoke brand photoshoot assets when ready.
const DEFAULT_SLIDES: HeroSlide[] = [
  {
    id: "slide-01",
    // Dense dark green foliage / low-key lighting botanical photo
    image:
      "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=2400&q=85",
    imageAlt: "Moody dark botanical leaves with dramatic low-key lighting",
    headlineLine1: "ROSES OF LAHORE",
    headlineLine2Before: "SPOKEN WITH",
    headlineLine2After: "GRACE",
    headlineLine3: "TO THE WORLD",
    subcopy: "Living sculptures in bloom.", // 27 chars (<= 32 chars)
    ctaLabel: "Contact Us",
    ctaHref: "/#concierge",
    featuredProduct: {
      id: "prod-01",
      handle: "the-romanee-blush",
      title: "The Romanée Blush",
      thumbnail:
        "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80",
      price: 18500,
      currency: "PKR",
    },
  },
  {
    id: "slide-02",
    // Deep emerald velvet botanicals and lush chiaroscuro shadows
    image:
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=2400&q=85",
    imageAlt: "Dense dark emerald foliage in chiaroscuro studio lighting",
    headlineLine1: "BESPOKE BOTANICALS",
    headlineLine2Before: "COMPOSED WITH",
    headlineLine2After: "PASSION",
    headlineLine3: "FOR SACRED MOMENTS",
    subcopy: "Morning cuts delivered fresh.", // 29 chars (<= 32 chars)
    ctaLabel: "Contact Atelier",
    ctaHref: "/custom-bouquet",
    featuredProduct: {
      id: "prod-02",
      handle: "the-florentine-cypress",
      title: "The Florentine Cypress",
      thumbnail:
        "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80",
      price: 24000,
      currency: "PKR",
    },
  },
  {
    id: "slide-03",
    // Low-key moody tropical foliage with mist and deep forest tones
    image:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=2400&q=85",
    imageAlt: "Atmospheric low-key foliage botanicals with deep forest shadows",
    headlineLine1: "SCULPTURAL BLOOMS",
    headlineLine2Before: "SHAPED IN",
    headlineLine2After: "SILENCE",
    headlineLine3: "FOR PRIVATE SALONS",
    subcopy: "Rare botanicals for interior.", // 29 chars (<= 32 chars)
    ctaLabel: "Contact Concierge",
    ctaHref: "/#concierge",
    featuredProduct: {
      id: "prod-03",
      handle: "soleil-d-antibes",
      title: "Soleil d'Antibes",
      thumbnail:
        "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80",
      price: 16500,
      currency: "PKR",
    },
  },
]

// ── Hero Component ─────────────────────────────────────────────────
export const Hero: React.FC<HeroProps> = ({
  slides: initialSlides,
  featuredProducts,
}) => {
  // Construct working slides with dynamic real product injection
  const [slides, setSlides] = useState<HeroSlide[]>(() => {
    if (initialSlides && initialSlides.length > 0) return initialSlides

    if (featuredProducts && featuredProducts.length > 0) {
      return DEFAULT_SLIDES.map((slide, idx) => {
        const prod = featuredProducts[idx % featuredProducts.length]
        if (!prod) return slide
        return {
          ...slide,
          featuredProduct: {
            id: prod.id,
            handle: prod.handle,
            title: prod.name,
            thumbnail: prod.image,
            price: prod.price,
            currency: prod.currency || "PKR",
          },
        }
      })
    }

    return DEFAULT_SLIDES
  })

  // Dynamic real product sync if Medusa backend is reachable on mount
  useEffect(() => {
    if (initialSlides && initialSlides.length > 0) return

    // Fetch live featured product collection from Medusa if available
    const backendUrl =
      process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
    const publishableKey =
      process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""

    if (!publishableKey) return

    fetch(
      `${backendUrl}/store/products?fields=id,title,handle,thumbnail,*variants.calculated_price&limit=6`,
      {
        headers: {
          "x-publishable-api-key": publishableKey,
        },
      }
    )
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data?.products || data.products.length === 0) return

        setSlides((prev) =>
          prev.map((slide, idx) => {
            const rawProd = data.products[idx % data.products.length]
            if (!rawProd) return slide

            const variantPrice =
              rawProd.variants?.[0]?.calculated_price?.calculated_amount ??
              slide.featuredProduct?.price ??
              16000

            return {
              ...slide,
              featuredProduct: {
                id: rawProd.id,
                handle: rawProd.handle || slide.featuredProduct?.handle || "",
                title: rawProd.title || slide.featuredProduct?.title || "",
                thumbnail:
                  rawProd.thumbnail ||
                  slide.featuredProduct?.thumbnail ||
                  slide.image,
                price: Number(variantPrice),
                currency: "PKR",
              },
            }
          })
        )
      })
      .catch(() => {
        // Silently preserve pre-populated fallback products if network is unavailable
      })
  }, [initialSlides])

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Touch Swipe Handlers for Mobile
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  // Detect user motion preferences
  useEffect(() => {
    if (typeof window === "undefined") return
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mq.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  // Slide Navigation
  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning || slides.length <= 1) return
      setIsTransitioning(true)
      setCurrentSlide(index)
      const duration = prefersReducedMotion ? 100 : 350
      setTimeout(() => setIsTransitioning(false), duration)
    },
    [isTransitioning, slides.length, prefersReducedMotion]
  )

  const handleNext = useCallback(() => {
    goTo((currentSlide + 1) % slides.length)
  }, [currentSlide, goTo, slides.length])

  const handlePrev = useCallback(() => {
    goTo((currentSlide - 1 + slides.length) % slides.length)
  }, [currentSlide, goTo, slides.length])

  // Auto-advance every 6.5s (pausing on hover/interaction & disabled if reduced motion)
  useEffect(() => {
    if (prefersReducedMotion || isPaused || slides.length <= 1) return
    const timer = setInterval(handleNext, 6500)
    return () => clearInterval(timer)
  }, [handleNext, prefersReducedMotion, isPaused, slides.length])

  // Mobile Touch Gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true)
    touchStartX.current = e.touches[0].clientX
    touchEndX.current = null
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    setIsPaused(false)
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const deltaX = touchStartX.current - touchEndX.current
      if (deltaX > 45) {
        handleNext()
      } else if (deltaX < -45) {
        handlePrev()
      }
    }
    touchStartX.current = null
    touchEndX.current = null
  }

  const activeSlide = slides[currentSlide] || slides[0]

  return (
    <section
      className="group relative w-full h-[calc(100vh-110px)] min-h-[620px] max-h-[860px] overflow-hidden bg-[#061009] select-none"
      aria-label="Hero Showcase"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* ── 1. BACKGROUND IMAGES & CINEMATIC DARK OVERLAY ── */}
      {slides.map((slide, index) => {
        const isActive = index === currentSlide
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 ${
              prefersReducedMotion
                ? isActive
                  ? "opacity-100 z-10"
                  : "opacity-0 z-0 pointer-events-none"
                : `transition-all duration-350 ease-out ${
                    isActive
                      ? "opacity-100 translate-x-0 z-10"
                      : index < currentSlide
                      ? "opacity-0 -translate-x-3 z-0 pointer-events-none"
                      : "opacity-0 translate-x-3 z-0 pointer-events-none"
                  }`
            }`}
          >
            {/* Real Full-Width Photo */}
            <Image
              src={slide.image}
              alt={slide.imageAlt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover object-center scale-100"
            />

            {/* Dark Overlay Gradient Layer 1: Linear Top-to-Bottom (50-60% opacity) */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#061009]/80 via-[#0a180f]/50 to-[#040b06]/85 z-10" />

            {/* Dark Overlay Gradient Layer 2: Radial Contrast Scrim for Text Readability */}
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(10, 24, 15, 0.45) 0%, rgba(4, 11, 6, 0.85) 100%)",
              }}
            />
          </div>
        )
      })}

      {/* ── 2. CENTERED HEADLINE & CTA AREA ── */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center pt-8 pb-14 pointer-events-none">
        <div className="max-w-3xl mx-auto px-2 pointer-events-auto space-y-4 sm:space-y-5">
          {/* Centered 3-Line Uppercase Serif Headline */}
          <h1 className="font-cormorant font-light text-cream uppercase tracking-[0.18em] sm:tracking-[0.22em] md:tracking-[0.25em] text-3xl sm:text-5xl md:text-6xl lg:text-[70px] leading-[1.12] sm:leading-[1.15] drop-shadow-2xl">
            {/* Line 1 */}
            <span className="block">{activeSlide.headlineLine1}</span>

            {/* Line 2 with Inline Stationery Decorative Flourish */}
            <span className="block mt-1 sm:mt-1.5 whitespace-nowrap">
              <span>{activeSlide.headlineLine2Before}</span>
              <StationeryFlourish />
              <span>{activeSlide.headlineLine2After}</span>
            </span>

            {/* Line 3 */}
            <span className="block mt-1 sm:mt-1.5">{activeSlide.headlineLine3}</span>
          </h1>

          {/* Short One-Line Subcopy (Max ~32 chars wide, muted, centered) */}
          <p className="font-saira text-[11px] sm:text-xs md:text-[13px] uppercase tracking-[0.18em] text-cream/75 max-w-[32ch] mx-auto text-center font-light leading-relaxed drop-shadow-md">
            {activeSlide.subcopy}
          </p>

          {/* Single Pill-Shaped Outlined CTA Button */}
          <div className="pt-2 sm:pt-3">
            <LocalizedClientLink
              href={activeSlide.ctaHref}
              className="font-saira inline-flex items-center justify-center border border-cream/70 hover:border-cream text-cream hover:text-white bg-transparent hover:bg-cream/10 px-8 sm:px-10 py-3 sm:py-3.5 rounded-full text-[11px] sm:text-xs uppercase tracking-[0.22em] font-medium transition-all duration-300 shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              {activeSlide.ctaLabel}
            </LocalizedClientLink>
          </div>
        </div>
      </div>

      {/* ── 3. FLOATING PRODUCT CARD (Bottom-Left) ── */}
      {activeSlide.featuredProduct && (
        <div className="absolute bottom-7 left-5 sm:left-10 lg:left-14 z-30 pointer-events-auto">
          <div className="group/card bg-cream/95 backdrop-blur-md rounded-large p-3 sm:p-3.5 shadow-2xl border border-white/50 flex items-center gap-3 sm:gap-3.5 max-w-[245px] sm:max-w-[275px] transition-all duration-300 hover:bg-cream hover:shadow-petal-veil/10">
            {/* Square Product Photo */}
            <div className="relative w-15 h-15 sm:w-18 sm:h-18 rounded-rounded overflow-hidden bg-cream-dark flex-shrink-0">
              <Image
                src={activeSlide.featuredProduct.thumbnail}
                alt={activeSlide.featuredProduct.title}
                fill
                sizes="80px"
                className="object-cover object-center transition-transform duration-500 group-hover/card:scale-105"
              />
            </div>

            {/* Info: Title, Price, Shop Now Link */}
            <div className="flex flex-col justify-center min-w-0">
              <p className="font-saira text-[11.5px] sm:text-xs font-medium text-charcoal truncate leading-tight">
                {activeSlide.featuredProduct.title}
              </p>
              <p className="font-saira text-[13px] sm:text-[14px] font-semibold text-charcoal mt-1">
                {formatPrice(
                  activeSlide.featuredProduct.price,
                  activeSlide.featuredProduct.currency || "PKR"
                )}
              </p>
              <LocalizedClientLink
                href={`/products/${activeSlide.featuredProduct.handle}`}
                className="font-saira inline-flex items-center gap-1 text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-petal-veil hover:text-charcoal transition-colors mt-1.5"
              >
                <span>Shop Now</span>
                <span className="text-xs transition-transform duration-200 group-hover/card:translate-x-1">
                  →
                </span>
              </LocalizedClientLink>
            </div>
          </div>
        </div>
      )}

      {/* ── 4. SLIDER CONTROLS: Left & Right Semi-Transparent Buttons ── */}
      {slides.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-3.5 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-9.5 h-9.5 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-cream backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-lg opacity-100 lg:opacity-0 lg:group-hover:opacity-100 hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-cream" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-3.5 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-9.5 h-9.5 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-cream backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-lg opacity-100 lg:opacity-0 lg:group-hover:opacity-100 hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 text-cream" />
          </button>
        </>
      )}

      {/* ── 4b. SLIDER CONTROLS: Bottom-Center Dot / Pill Indicators ── */}
      {slides.length > 1 && (
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 pointer-events-auto">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`transition-all duration-300 cursor-pointer ${
                i === currentSlide
                  ? "w-7 sm:w-8 h-1.5 bg-cream rounded-full shadow-sm"
                  : "w-1.5 h-1.5 bg-cream/40 hover:bg-cream/70 rounded-full"
              }`}
              aria-label={`Jump to slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* ── 5. SMALL SOCIAL ICONS (Bottom-Right) ── */}
      <div className="absolute bottom-7 right-5 sm:right-10 lg:right-14 z-30 flex items-center gap-2.5 pointer-events-auto">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 sm:w-9.5 sm:h-9.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-cream backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer shadow-md"
          aria-label="Visit Camelia on Facebook"
        >
          <FacebookIcon className="w-4 h-4 text-cream" />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 sm:w-9.5 sm:h-9.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-cream backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer shadow-md"
          aria-label="Visit Camelia on Instagram"
        >
          <InstagramIcon className="w-4 h-4 text-cream" />
        </a>
      </div>
    </section>
  )
}

export default Hero
