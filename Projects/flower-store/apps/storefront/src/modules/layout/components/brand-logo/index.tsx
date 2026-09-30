"use client"

import React, { useRef, useState, useCallback, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

const PETAL_COLORS = [
  "#E8A08B", "#D9765A", "#F3C77E", "#C96D55",
  "#E2907A", "#F5B8A0", "#D4876A", "#F0C080",
]
const LEAF_COLORS = ["#7C8F5E", "#5E7A47", "#8FA86A"]

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
  const pillRef = useRef<HTMLDivElement>(null) // drag target

  const isDragging = useRef(false)
  const startX = useRef(0)
  const startY = useRef(0)
  const hasMoved = useRef(false)
  const dragDist = useRef(0)

  const [isBloomed, setIsBloomed] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // ── Scroll detection with hysteresis to prevent jitter ─────────────────
  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sy = window.scrollY
          // Trigger compact mode when scrolling down past 55px
          // Revert to hanging pill only when scrolled back up above 25px
          if (sy > 55) {
            setIsScrolled(true)
          } else if (sy < 25) {
            setIsScrolled(false)
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // ── Bloom burst ───────────────────────────────────────────────────────
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

  // ── Drag physics (hanging mode only) ──────────────────────────────────
  const setDragTransform = useCallback((dx: number, dy: number) => {
    const pill = pillRef.current
    if (!pill) return
    const cy = Math.max(0, Math.min(dy, 100))
    const cx = Math.max(-45, Math.min(dx, 45))
    const stretch = 1 + cy / 220
    const squeeze = 1 - cy / 600
    const rotate = cx / 5.5
    const shadowO = 0.18 + (cy / 100) * 0.22
    pill.style.transform = `translate(${cx}px, ${cy}px) rotate(${rotate}deg) scale(${squeeze}, ${stretch})`
    pill.style.boxShadow = `0 ${12 + cy * 0.3}px ${36 + cy * 0.5}px -4px rgba(80,40,20,${shadowO})`
    dragDist.current = Math.sqrt(dx * dx + dy * dy)
  }, [])

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || isScrolled) return
    isDragging.current = true
    hasMoved.current = false
    dragDist.current = 0
    startX.current = e.clientX
    startY.current = e.clientY
    const pill = pillRef.current
    if (pill) {
      pill.style.transition = "transform .05s linear"
      try {
        pill.setPointerCapture(e.pointerId)
      } catch {}
    }
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return
    const dx = e.clientX - startX.current
    const dy = e.clientY - startY.current
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) hasMoved.current = true
    setDragTransform(dx, dy)
  }

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return
    isDragging.current = false
    const pill = pillRef.current
    if (pill) {
      pill.style.transition =
        "transform .7s cubic-bezier(.34,1.56,.64,1), box-shadow .4s ease"
      pill.style.transform = "translate(0,0) rotate(0deg) scale(1,1)"
      pill.style.boxShadow = ""
      try {
        pill.releasePointerCapture(e.pointerId)
      } catch {}
    }
    triggerBurst()
    if (!hasMoved.current || dragDist.current < 12) {
      if (window.location.pathname !== "/" && window.location.pathname !== "") {
        setTimeout(() => router.push("/"), 350)
      }
    }
  }

  // ── Shared flower blossom styling ────────────────────────────────────
  const flowerStyle: React.CSSProperties = {
    transition: "transform .5s cubic-bezier(.34,1.3,.64,1), filter .4s ease",
    transform: isBloomed
      ? "scale(1.18) translateY(-3px) rotate(8deg)"
      : isHovered
      ? "scale(1.08) translateY(-2px) rotate(-5deg)"
      : "scale(1) translateY(0) rotate(0deg)",
    filter: isBloomed
      ? "drop-shadow(0 4px 10px rgba(216,130,80,0.55))"
      : isHovered
      ? "drop-shadow(0 3px 8px rgba(180,100,60,0.35))"
      : "drop-shadow(0 2px 4px rgba(0,0,0,0.12))",
  }

  return (
    <div
      ref={containerRef}
      className={`relative pointer-events-none select-none ${className}`}
      style={{ width: "240px", height: "68px" }}
    >
      {/* ── 1. HANGING PILL (Visible at top, retracts up into nav on scroll) ── */}
      <div
        className="absolute top-0 left-1/2"
        style={{
          transform: isScrolled
            ? "translateX(-50%) translateY(-105%) scale(0.92)"
            : "translateX(-50%) translateY(0) scale(1)",
          opacity: isScrolled ? 0 : 1,
          pointerEvents: isScrolled ? "none" : "auto",
          transition: isScrolled
            ? "transform 0.52s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.32s ease"
            : "transform 0.65s cubic-bezier(0.34, 1.35, 0.64, 1) 0.05s, opacity 0.45s ease 0.05s",
          willChange: "transform, opacity",
        }}
      >
        <div
          ref={pillRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex flex-col items-center justify-center select-none touch-none z-40"
          style={{
            borderRadius: "0 0 28px 28px",
            padding: "8px 28px 20px",
            border: "none",
            background:
              "linear-gradient(168deg, #FDF6EE 0%, #F3E0CE 60%, #EDD5C0 100%)",
            boxShadow: isHovered
              ? "0 16px 44px -4px rgba(80,40,20,0.26)"
              : "0 10px 36px -4px rgba(80,40,20,0.18)",
            cursor: "grab",
            willChange: "transform",
          }}
          title="Pull me down or click to bloom!"
        >
          <div style={flowerStyle}>
            <Image
              src="/images/camelia-blossom.png"
              alt="Camelia blossom"
              width={72}
              height={72}
              className="object-contain block"
              priority
            />
          </div>
          <div
            style={{
              fontFamily:
                "var(--font-geraldine), 'Geraldine', cursive, Georgia, serif",
              color: isHovered ? "#5C2D18" : "#3D2418",
              fontSize: "44px",
              lineHeight: 1,
              marginTop: "-4px",
              userSelect: "none",
              pointerEvents: "none",
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
                color: "#9B7B60",
                fontWeight: 600,
                marginTop: "4px",
                textTransform: "uppercase",
                userSelect: "none",
              }}
            >
              {subtitle}
            </div>
          )}
        </div>
      </div>

      {/* ── 2. COMPACT INLINE LOGO (Clean, transparent, seamlessly in nav) ── */}
      <div
        className="absolute top-[12px] left-1/2"
        style={{
          transform: isScrolled
            ? "translateX(-50%) translateY(0) scale(1)"
            : "translateX(-50%) translateY(14px) scale(0.92)",
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
          <div style={flowerStyle}>
            <Image
              src="/images/camelia-blossom.png"
              alt="Camelia blossom"
              width={44}
              height={44}
              className="object-contain block"
              priority
            />
          </div>
          <div
            style={{
              fontFamily:
                "var(--font-geraldine), 'Geraldine', cursive, Georgia, serif",
              color: "#3D2418",
              fontSize: "34px",
              lineHeight: 1,
              userSelect: "none",
              pointerEvents: "none",
              whiteSpace: "nowrap",
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
