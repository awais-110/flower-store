"use client"

import React, { useRef, useState, useCallback, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

const PETAL_COLORS = [
  "#DA888A", // Petal Veil
  "#E9D2D8", // Coral Blossom
  "#7897B3", // Golden Stem
  "#C26E70", // Deep Petal Veil
  "#5D6F7D", // Fresh Bud
  "#E7A5A7", // Light Petal Veil
]
const LEAF_COLORS = ["#5D6F7D", "#A5ACA5", "#7897B3"]

// Geometry constants for the unified bubble-gum pill
const HW_TOP = 74 // half-width at the nav anchor (total width = 148px)
const H_REST = 106 // resting height from top of nav (flush)
const R_CORNER = 28 // radius of bottom corners

/**
 * Builds a continuous, closed SVG path for the bubble-gum pill.
 * Origin (0,0) is at top-center (anchored flush to the navbar).
 *
 * When dx=0 and dy=0:
 *   Produces a mathematically crisp rounded pill attached to the nav:
 *   - Top: horizontal edge from +HW_TOP to -HW_TOP (with subtle meniscus flare)
 *   - Sides: vertical straight lines
 *   - Bottom: smooth rounded corners with radius R_CORNER
 *
 * When dy > 0:
 *   The top remains firmly stuck to the nav (never separates!),
 *   while the waist pinches inward (taffy/gum necking) and the bottom bulb
 *   stretches down to (dx, H_REST + dy).
 */
function buildBubbleGumPath(dx: number, dy: number): string {
  const cy = Math.max(0, dy)
  const cx = dx
  const yBottom = H_REST + cy

  // Stretch intensity: 0 (resting) to 1 (max pull)
  const t = Math.min(1, cy / 95)

  // Under tension, the bottom bulb narrows only slightly (volume conservation)
  const hwBulb = HW_TOP * (1 - t * 0.08)

  // The waist pinches inward dramatically like real bubble gum
  const hwWaist = HW_TOP * (1 - t * 0.62)

  // Waist vertical center and horizontal offset
  const yWaist = 18 + (yBottom - 18) * 0.44
  const cxWaist = cx * 0.38

  // Small organic surface-tension meniscus flaring into the navbar
  const flare = 4 * (1 - t * 0.4)

  // Left side control points
  const lcp1x = -HW_TOP
  const lcp1y = yWaist * 0.38
  const lcp2x = cxWaist - hwWaist + cx * 0.08
  const lcp2y = yWaist * 0.78

  const lcp3x = cxWaist - hwWaist + cx * 0.12
  const lcp3y = yWaist + (yBottom - R_CORNER - yWaist) * 0.32
  const lcp4x = cx - hwBulb
  const lcp4y = yWaist + (yBottom - R_CORNER - yWaist) * 0.78

  // Right side control points
  const rcp3x = cx + hwBulb
  const rcp3y = yWaist + (yBottom - R_CORNER - yWaist) * 0.78
  const rcp4x = cxWaist + hwWaist + cx * 0.12
  const rcp4y = yWaist + (yBottom - R_CORNER - yWaist) * 0.32

  const rcp1x = cxWaist + hwWaist + cx * 0.08
  const rcp1y = yWaist * 0.78
  const rcp2x = HW_TOP
  const rcp2y = yWaist * 0.38

  return [
    // Top-left flare at navbar boundary
    `M ${-HW_TOP - flare} 0`,
    `Q ${-HW_TOP} 0, ${-HW_TOP} ${flare}`,
    // Left upper curve down to waist
    `C ${lcp1x} ${lcp1y}, ${lcp2x} ${lcp2y}, ${cxWaist - hwWaist} ${yWaist}`,
    // Left lower curve from waist to bottom bulb
    `C ${lcp3x} ${lcp3y}, ${lcp4x} ${lcp4y}, ${cx - hwBulb} ${yBottom - R_CORNER}`,
    // Bottom bulb rounded cap
    `C ${cx - hwBulb} ${yBottom}, ${cx - hwBulb + R_CORNER} ${yBottom}, ${cx} ${yBottom}`,
    `C ${cx + hwBulb - R_CORNER} ${yBottom}, ${cx + hwBulb} ${yBottom}, ${cx + hwBulb} ${yBottom - R_CORNER}`,
    // Right lower curve from bulb up to waist
    `C ${rcp3x} ${rcp3y}, ${rcp4x} ${rcp4y}, ${cxWaist + hwWaist} ${yWaist}`,
    // Right upper curve from waist to top anchor
    `C ${rcp1x} ${rcp1y}, ${rcp2x} ${rcp2y}, ${HW_TOP} ${flare}`,
    // Top-right flare at navbar boundary
    `Q ${HW_TOP} 0, ${HW_TOP + flare} 0`,
    // Top edge closing flush against nav bottom line
    `L ${-HW_TOP - flare} 0`,
    `Z`,
  ].join(" ")
}

interface BrandLogoProps {
  className?: string
  title?: string
  subtitle?: string
}

export function BrandLogo({
  className = "",
  title = "Camelia",
  subtitle = "",
}: BrandLogoProps) {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const pillHitRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const bodyPathRef = useRef<SVGPathElement>(null)
  const sheenPathRef = useRef<SVGPathElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  const isDragging = useRef(false)
  const startX = useRef(0)
  const startY = useRef(0)
  const currentDx = useRef(0)
  const currentDy = useRef(0)
  const hasMoved = useRef(false)
  const rafId = useRef<number | null>(null)

  const [isBloomed, setIsBloomed] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // ── Scroll hysteresis: compact inline nav vs hanging pill ──────────────
  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sy = window.scrollY
          if (sy > 45) setIsScrolled(true)
          else if (sy < 15) setIsScrolled(false)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // ── Petal burst ────────────────────────────────────────────────────────
  const triggerBurst = useCallback(() => {
    setIsBloomed(true)
    setTimeout(() => setIsBloomed(false), 400)
    const stage = containerRef.current
    if (!stage) return
    const count = 18
    for (let i = 0; i < count; i++) {
      const petal = document.createElement("div")
      petal.className = "burst-petal"
      const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.5 - 0.25)
      const dist = 60 + Math.random() * 70
      const tx = Math.cos(angle) * dist
      const ty = Math.sin(angle) * dist - 20
      const rot = Math.random() * 720 - 360 + "deg"
      const size = 10 + Math.random() * 10
      const delay = Math.random() * 0.12
      const isLeaf = i % 5 === 0
      petal.style.setProperty("--tx", `${tx}px`)
      petal.style.setProperty("--ty", `${ty}px`)
      petal.style.setProperty("--rot", rot)
      petal.innerHTML = isLeaf
        ? `<svg viewBox="0 0 16 20" width="${size}" height="${size * 1.3}"><ellipse cx="8" cy="10" rx="5.5" ry="8.5" fill="${LEAF_COLORS[i % LEAF_COLORS.length]}" transform="rotate(-20 8 10)"/></svg>`
        : `<svg viewBox="0 0 16 16" width="${size}" height="${size}"><ellipse cx="8" cy="8" rx="4.5" ry="7" fill="${PETAL_COLORS[i % PETAL_COLORS.length]}"/></svg>`
      petal.style.animation = `burstFly ${0.7 + Math.random() * 0.45}s ${delay}s cubic-bezier(.15,.85,.35,1) forwards`
      stage.appendChild(petal)
      petal.addEventListener("animationend", () => petal.remove())
    }
  }, [])

  // ── Update geometry of the bubble-gum pill ──────────────────────────────
  const applyGumState = useCallback((dx: number, dy: number) => {
    currentDx.current = dx
    currentDy.current = dy

    const d = buildBubbleGumPath(dx, dy)
    if (bodyPathRef.current) bodyPathRef.current.setAttribute("d", d)
    if (sheenPathRef.current) sheenPathRef.current.setAttribute("d", d)

    const rot = dx / 8
    // Content moves with the bottom bulb
    if (contentRef.current) {
      contentRef.current.style.transform = `translateX(-50%) translate(${dx}px, ${dy}px) rotate(${rot}deg)`
    }
    // Touch hit area follows
    if (pillHitRef.current) {
      pillHitRef.current.style.transform = `translateX(-50%) translate(${dx}px, ${dy}px) rotate(${rot}deg)`
    }
  }, [])

  // ── Spring release simulation (realistic jiggle/snap back) ──────────────
  const runSpring = useCallback(() => {
    if (rafId.current) cancelAnimationFrame(rafId.current)

    let x = currentDx.current
    let y = currentDy.current
    let vx = 0
    let vy = 0
    const stiffness = 0.22 // snappy elastic pull
    const damping = 0.72 // energy decay

    const step = () => {
      const ax = -stiffness * x
      const ay = -stiffness * y
      vx = (vx + ax) * damping
      vy = (vy + ay) * damping
      x += vx
      y += vy

      applyGumState(x, y)

      if (
        Math.abs(x) < 0.25 &&
        Math.abs(y) < 0.25 &&
        Math.abs(vx) < 0.25 &&
        Math.abs(vy) < 0.25
      ) {
        applyGumState(0, 0)
        rafId.current = null
      } else {
        rafId.current = requestAnimationFrame(step)
      }
    }
    rafId.current = requestAnimationFrame(step)
  }, [applyGumState])

  // ── Pointer event handlers ─────────────────────────────────────────────
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || isScrolled) return
    if (rafId.current) cancelAnimationFrame(rafId.current)

    isDragging.current = true
    hasMoved.current = false
    startX.current = e.clientX
    startY.current = e.clientY

    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {}
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return
    const rawDx = e.clientX - startX.current
    const rawDy = e.clientY - startY.current

    if (Math.abs(rawDx) > 3 || Math.abs(rawDy) > 3) {
      hasMoved.current = true
    }

    // Elastic resistance curve (cannot stretch forever)
    const dy = rawDy > 0 ? rawDy / (1 + rawDy * 0.007) : rawDy * 0.2
    const clampedDy = Math.max(0, Math.min(130, dy))
    const clampedDx = Math.max(
      -45,
      Math.min(45, rawDx / (1 + Math.abs(rawDx) * 0.009))
    )

    applyGumState(clampedDx, clampedDy)
  }

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return
    isDragging.current = false

    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {}

    runSpring()
    triggerBurst()

    // Pure click (not a drag) -> navigate to home if elsewhere
    if (!hasMoved.current) {
      if (window.location.pathname !== "/" && window.location.pathname !== "") {
        setTimeout(() => router.push("/"), 300)
      }
    }
  }

  // ── Flower styles ───────────────────────────────────────────────────────
  const hangingFlowerStyle: React.CSSProperties = {
    transition: "transform .5s cubic-bezier(.34,1.3,.64,1), filter .4s ease",
    transform: isBloomed
      ? "scale(1.16) translateY(-3px) rotate(8deg)"
      : isHovered
      ? "scale(1.08) translateY(-2px) rotate(-4deg)"
      : "scale(1) translateY(0) rotate(0deg)",
    filter: isBloomed
      ? "drop-shadow(0 4px 16px rgba(233,210,216,0.95)) drop-shadow(0 2px 6px rgba(0,0,0,0.35))"
      : isHovered
      ? "drop-shadow(0 3px 14px rgba(255,255,255,0.75)) drop-shadow(0 2px 5px rgba(0,0,0,0.22))"
      : "drop-shadow(0 2px 8px rgba(255,255,255,0.5)) drop-shadow(0 2px 4px rgba(0,0,0,0.18))",
  }

  const compactFlowerStyle: React.CSSProperties = {
    transition: "transform .5s cubic-bezier(.34,1.3,.64,1), filter .4s ease",
    transform: isBloomed
      ? "scale(1.18) translateY(-3px) rotate(8deg)"
      : isHovered
      ? "scale(1.08) translateY(-2px) rotate(-5deg)"
      : "scale(1) translateY(0) rotate(0deg)",
    filter: isBloomed
      ? "drop-shadow(0 4px 12px rgba(218,136,138,0.55))"
      : isHovered
      ? "drop-shadow(0 3px 8px rgba(93,111,125,0.3))"
      : "drop-shadow(0 2px 4px rgba(0,0,0,0.12))",
  }

  const initialPath = buildBubbleGumPath(0, 0)

  return (
    <div
      ref={containerRef}
      className={`relative pointer-events-none select-none h-full ${className}`}
      style={{ width: "290px" }}
    >
      {/* ── 1. HANGING BUBBLE-GUM PILL (Attached flush to navbar, stretches on pull) ── */}
      <div
        className="absolute top-0 left-1/2"
        style={{
          transform: isScrolled
            ? "translateX(-50%) translateY(-108%) scale(0.92)"
            : "translateX(-50%) translateY(0) scale(1)",
          opacity: isScrolled ? 0 : 1,
          pointerEvents: isScrolled ? "none" : "auto",
          transition: isScrolled
            ? "transform 0.5s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.3s ease"
            : "transform 0.65s cubic-bezier(0.34, 1.35, 0.64, 1) 0.05s, opacity 0.45s ease 0.05s",
          willChange: "transform, opacity",
          zIndex: 42,
        }}
      >
        {/*
          Unified SVG background:
          The ENTIRE pill from the navbar boundary down to the bottom is rendered
          by this single SVG. When dragged, the path morphs continuously while remaining
          100% attached to the navbar at y=0. Zero seams, zero separation!
        */}
        <svg
          ref={svgRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "240px",
            height: "280px",
            overflow: "visible",
            pointerEvents: "none",
            filter: isHovered
              ? "drop-shadow(0 18px 44px rgba(0, 0, 0, 0.45))"
              : "drop-shadow(0 10px 32px rgba(0, 0, 0, 0.34))",
            transition: "filter 0.3s ease",
          }}
          viewBox="-120 0 240 280"
        >
          <defs>
            {/* Fresh Bud translucent glassmorphism gradient */}
            <linearGradient id="bubbleGumGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#687B8A" stopOpacity="0.94" />
              <stop offset="42%" stopColor="#5D6F7D" stopOpacity="0.96" />
              <stop offset="100%" stopColor="#455461" stopOpacity="0.98" />
            </linearGradient>

            {/* Coral Blossom delicate hairline edge */}
            <linearGradient id="bubbleGumEdge" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.55)" />
              <stop offset="50%" stopColor="rgba(233, 210, 216, 0.35)" />
              <stop offset="100%" stopColor="rgba(233, 210, 216, 0.6)" />
            </linearGradient>

            {/* Glossy center reflection down the bubble gum body */}
            <linearGradient id="bubbleGumSheen" x1="-80" y1="0" x2="80" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.0)" />
              <stop offset="35%" stopColor="rgba(255, 255, 255, 0.12)" />
              <stop offset="50%" stopColor="rgba(255, 255, 255, 0.22)" />
              <stop offset="65%" stopColor="rgba(255, 255, 255, 0.12)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.0)" />
            </linearGradient>
          </defs>

          {/* Main bubble-gum body */}
          <path
            ref={bodyPathRef}
            d={initialPath}
            fill="url(#bubbleGumGrad)"
            stroke="url(#bubbleGumEdge)"
            strokeWidth="1.2"
          />

          {/* Glossy highlight sheen */}
          <path
            ref={sheenPathRef}
            d={initialPath}
            fill="url(#bubbleGumSheen)"
            style={{ pointerEvents: "none" }}
          />
        </svg>

        {/* Content: Flower + "Camelia" wordmark (moves with bottom bulb) */}
        <div
          ref={contentRef}
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%) translate(0px, 0px)",
            width: "152px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "10px",
            userSelect: "none",
            pointerEvents: "none",
            willChange: "transform",
          }}
        >
          <div style={hangingFlowerStyle}>
            <Image
              src="/images/camelia-blossom.png"
              alt="Camelia blossom"
              width={84}
              height={58}
              className="w-[78px] h-auto object-contain block drop-shadow-md"
              priority
            />
          </div>
          <div
            style={{
              fontFamily:
                "var(--font-geraldine), 'Geraldine', cursive, Georgia, serif",
              color: isHovered ? "#E9D2D8" : "#FAF7F4",
              fontSize: "44px",
              lineHeight: 1,
              marginTop: "-4px",
              textShadow:
                "0 1px 3px rgba(0,0,0,0.38), 0 0 12px rgba(255,255,255,0.15)",
              whiteSpace: "nowrap",
              transition: "color .3s ease",
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                fontSize: "8px",
                letterSpacing: "0.22em",
                color: "#E9D2D8",
                fontWeight: 600,
                marginTop: "4px",
                textTransform: "uppercase",
              }}
            >
              {subtitle}
            </div>
          )}
        </div>

        {/* Interactive drag & click touch target */}
        <div
          ref={pillHitRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%) translate(0px, 0px)",
            width: "154px",
            height: "112px",
            cursor: "grab",
            zIndex: 45,
            touchAction: "none",
          }}
          title="Pull me down or click to bloom!"
        />
      </div>

      {/* ── 2. COMPACT INLINE LOGO (Clean, transparent, seamlessly in nav when scrolled) ── */}
      <div
        className="absolute top-1/2 left-1/2"
        style={{
          transform: isScrolled
            ? "translateX(-50%) translateY(-50%) scale(1)"
            : "translateX(-50%) translateY(-25%) scale(0.92)",
          opacity: isScrolled ? 1 : 0,
          pointerEvents: isScrolled ? "auto" : "none",
          transition: isScrolled
            ? "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.08s, opacity 0.38s ease 0.08s"
            : "transform 0.35s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.22s ease",
          willChange: "transform, opacity",
          cursor: "pointer",
        }}
        onClick={() => {
          triggerBurst()
          if (
            window.location.pathname !== "/" &&
            window.location.pathname !== ""
          ) {
            setTimeout(() => router.push("/"), 300)
          }
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        title="Click to go home"
      >
        <div className="flex flex-row items-center gap-2.5 select-none whitespace-nowrap">
          <div style={compactFlowerStyle} className="flex-shrink-0">
            <Image
              src="/images/camelia-blossom.png"
              alt="Camelia blossom"
              width={84}
              height={58}
              className="w-[78px] h-auto object-contain block drop-shadow-sm"
              priority
            />
          </div>
          <div
            style={{
              fontFamily:
                "var(--font-geraldine), 'Geraldine', cursive, Georgia, serif",
              color: isHovered ? "#5D6F7D" : "#2D3740",
              fontSize: "38px",
              lineHeight: 1,
              userSelect: "none",
              pointerEvents: "none",
              whiteSpace: "nowrap",
              transition: "color .3s ease",
            }}
          >
            {title}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BrandLogo
