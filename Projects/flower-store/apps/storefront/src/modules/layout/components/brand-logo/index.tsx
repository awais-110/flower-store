"use client"

import React, { useRef, useState, useCallback, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

const PETAL_COLORS = [
  "#E8A08B", "#D9765A", "#F3C77E", "#C96D55",
  "#E2907A", "#F5B8A0", "#D4876A", "#F0C080",
]
const LEAF_COLORS = ["#7C8F5E", "#5E7A47", "#8FA86A"]

const SCROLL_THRESHOLD = 72

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
  const pillRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const isDragging = useRef(false)
  const startX = useRef(0)
  const startY = useRef(0)
  const hasMoved = useRef(false)
  const dragDist = useRef(0)

  const [isBloomed, setIsBloomed] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)
  // true when user has scrolled past the hero
  const [isCompact, setIsCompact] = useState(false)

  // Entrance animation on mount
  useEffect(() => {
    const t = setTimeout(() => setHasMounted(true), 60)
    return () => clearTimeout(t)
  }, [])

  // Scroll listener — compact mode when past threshold
  useEffect(() => {
    const onScroll = () => {
      setIsCompact(window.scrollY > SCROLL_THRESHOLD)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Bloom burst petal explosion
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
      const isLeaf = i % 5 === 0
      const delay = Math.random() * 0.12

      petal.style.setProperty("--tx", `${tx}px`)
      petal.style.setProperty("--ty", `${ty}px`)
      petal.style.setProperty("--rot", rot)

      if (isLeaf) {
        const color = LEAF_COLORS[i % LEAF_COLORS.length]
        petal.innerHTML = `<svg viewBox="0 0 16 20" width="${size}" height="${size * 1.3}">
          <ellipse cx="8" cy="10" rx="5.5" ry="8.5" fill="${color}" transform="rotate(-20 8 10)"/>
        </svg>`
      } else {
        const color = PETAL_COLORS[i % PETAL_COLORS.length]
        petal.innerHTML = `<svg viewBox="0 0 16 16" width="${size}" height="${size}">
          <ellipse cx="8" cy="8" rx="4.5" ry="7" fill="${color}"/>
        </svg>`
      }

      petal.style.animation = `burstFly ${0.7 + Math.random() * 0.45}s ${delay}s cubic-bezier(.15,.85,.35,1) forwards`
      stage.appendChild(petal)
      petal.addEventListener("animationend", () => petal.remove())
    }
  }, [])

  // Drag physics — only active in hanging mode
  const setTransform = useCallback((dx: number, dy: number) => {
    const pill = pillRef.current
    if (!pill) return
    const clampedY = Math.max(0, Math.min(dy, 100))
    const clampedX = Math.max(-45, Math.min(dx, 45))
    const stretch = 1 + clampedY / 220
    const squeeze = 1 - clampedY / 600
    const rotate = clampedX / 5.5
    const shadowOpacity = 0.22 + (clampedY / 100) * 0.22
    pill.style.transform = `translate(${clampedX}px, ${clampedY}px) rotate(${rotate}deg) scale(${squeeze}, ${stretch})`
    pill.style.boxShadow = `0 ${12 + clampedY * 0.3}px ${36 + clampedY * 0.5}px -4px rgba(120,60,40,${shadowOpacity})`
    dragDist.current = Math.sqrt(dx * dx + dy * dy)
  }, [])

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || isCompact) return
    isDragging.current = true
    hasMoved.current = false
    dragDist.current = 0
    startX.current = e.clientX
    startY.current = e.clientY
    const pill = pillRef.current
    if (pill) {
      pill.style.transition = "transform .05s linear"
      try { pill.setPointerCapture(e.pointerId) } catch {}
    }
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return
    const dx = e.clientX - startX.current
    const dy = e.clientY - startY.current
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) hasMoved.current = true
    setTransform(dx, dy)
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return
    isDragging.current = false
    const pill = pillRef.current
    if (pill) {
      pill.style.transition = "transform .7s cubic-bezier(.34,1.56,.64,1), box-shadow .4s ease"
      pill.style.transform = "translate(0,0) rotate(0deg) scale(1,1)"
      pill.style.boxShadow = ""
      try { pill.releasePointerCapture(e.pointerId) } catch {}
    }
    triggerBurst()
    if (!hasMoved.current || dragDist.current < 12) {
      if (window.location.pathname !== "/" && window.location.pathname !== "") {
        setTimeout(() => router.push("/"), 350)
      }
    }
  }

  // ─── Derived style values ────────────────────────────────────────────────
  const pillBase = isCompact
    ? {
        // Compact: fully invisible — blends into the nav
        borderRadius: "0",
        padding: "0 12px",
        flexDirection: "row" as const,
        gap: "8px",
        border: "none",
        background: "transparent",
        boxShadow: "none",
        cursor: "pointer",
      }
    : {
        // Hanging pill — no border, clean shadow only
        borderRadius: "0 0 28px 28px",
        padding: "8px 28px 20px",
        flexDirection: "column" as const,
        gap: "0px",
        border: "none",
        background: "linear-gradient(168deg, #FDF6EE 0%, #F3E0CE 60%, #EDD5C0 100%)",
        boxShadow: isHovered
          ? "0 16px 44px -4px rgba(80,40,20,0.26)"
          : "0 10px 36px -4px rgba(80,40,20,0.18)",
        cursor: "grab",
      }

  // Wrapper transform: compact → slide up to be centered in nav
  const wrapperTransform = isCompact
    ? "translateY(calc(-100% + 52px))"
    : hasMounted
    ? "translateY(0)"
    : "translateY(-120%) scale(0.85)"

  return (
    <div
      ref={containerRef}
      className={`relative flex items-start justify-center ${className}`}
    >
      {/* Position wrapper — handles scroll retract */}
      <div
        style={{
          transform: wrapperTransform,
          transition: "transform .55s cubic-bezier(.34,1.3,.64,1)",
          willChange: "transform",
        }}
      >
        {/* Logo pill — handles drag */}
        <div
          ref={pillRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => {
            if (isCompact) {
              triggerBurst()
              if (window.location.pathname !== "/" && window.location.pathname !== "") {
                setTimeout(() => router.push("/"), 300)
              }
            }
          }}
          className="relative flex items-center justify-center select-none will-change-transform touch-none z-40"
          style={{
            ...pillBase,
            transition: [
              "box-shadow .35s ease",
              "background .45s ease",
              "opacity .35s ease",
              "transform .7s cubic-bezier(.34,1.56,.64,1)",
            ].join(", "),
          }}
          title={isCompact ? "Click to go home" : "Pull me down or click to bloom!"}
        >


          {/* Camellia blossom */}
          <div
            style={{
              transition: "transform .5s cubic-bezier(.34,1.3,.64,1), filter .4s ease, width .45s ease, height .45s ease",
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
              flexShrink: 0,
              marginBottom: isCompact ? 0 : "2px",
            }}
          >
            <Image
              src="/images/camelia-blossom.png"
              alt="Camelia blossom"
              width={isCompact ? 44 : 72}
              height={isCompact ? 44 : 72}
              className="object-contain block"
              style={{
                transition: "width .45s cubic-bezier(.34,1.3,.64,1), height .45s cubic-bezier(.34,1.3,.64,1)",
              }}
              priority
            />
          </div>

          {/* Wordmark */}
          <div
            style={{
              fontFamily: "var(--font-geraldine), 'Geraldine', cursive, Georgia, serif",
              color: isHovered && !isCompact ? "#5C2D18" : "#3D2418",
              fontSize: isCompact ? "34px" : "44px",
              transition: "color .3s ease, font-size .45s cubic-bezier(.34,1.3,.64,1), letter-spacing .3s ease",
              letterSpacing: isHovered && !isCompact ? "0.01em" : "0em",
              lineHeight: 1,
              userSelect: "none",
              pointerEvents: "none",
              marginTop: isCompact ? 0 : "-4px",
              whiteSpace: "nowrap",
            }}
          >
            {title}
          </div>

          {/* Subtitle — only in hanging mode */}
          {subtitle && !isCompact && (
            <div
              style={{
                fontSize: "8px",
                letterSpacing: "0.22em",
                color: "#9B7B60",
                fontWeight: 600,
                marginTop: "4px",
                textTransform: "uppercase",
                userSelect: "none",
                pointerEvents: "none",
                transition: "opacity .3s ease",
                opacity: isCompact ? 0 : 1,
              }}
            >
              {subtitle}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BrandLogo
