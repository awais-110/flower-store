import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Page Not Found — Atelier Fleur",
  description: "The page you sought has wilted away.",
}

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center bg-cream">
      <span className="text-[11px] uppercase tracking-[0.3em] text-sage font-semibold">
        Atelier Fleur
      </span>
      <h1 className="font-editorial text-6xl sm:text-8xl text-deep-sage font-normal mt-4">
        404
      </h1>
      <p className="font-editorial text-2xl sm:text-3xl text-charcoal mt-2">
        This bouquet has already been claimed.
      </p>
      <p className="text-xs sm:text-sm text-charcoal-muted mt-3 max-w-md font-sans">
        The page you were looking for has wilted away. Head back to the atelier
        to discover fresh arrangements, bespoke commissions, and seasonal rarities.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 bg-deep-sage hover:bg-deep-sage-dark text-cream text-xs uppercase tracking-widest font-semibold px-8 py-3.5 rounded-xs transition-colors"
      >
        <span>Return to the Atelier</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  )
}