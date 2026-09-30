"use client"

import React, { useRef, useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"

const PETAL_COLORS = ["#E8A08B", "#D9765A", "#F3C77E", "#E2907A", "#C96D55"]

interface BrandLogoProps {
  className?: string
  title?: string
  subtitle?: string
}

export function BrandLogo({
  className = "",
  title = "Camelia",
  subtitle = "FLORAL STUDIO",
}: BrandLogoProps) {
  const router = useRouter()
  const pillRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const flowerRef = useRef<HTMLDivElement>(null)

  const isDragging = useRef(false)
  const startX = useRef(0)
  const startY = useRef(0)
  const hasMoved = useRef(false)
  const [isBloomed, setIsBloomed] = useState(false)

  // Bloom burst petal explosion animation
  const triggerBurst = useCallback(() => {
    setIsBloomed(true)
    setTimeout(() => setIsBloomed(false), 360)

    const stage = containerRef.current
    if (!stage) return

    const count = 12
    for (let i = 0; i < count; i++) {
      const petal = document.createElement("div")
      petal.className = "burst-petal"
      const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.4 - 0.2)
      const dist = 65 + Math.random() * 55
      const tx = Math.cos(angle) * dist
      const ty = Math.sin(angle) * dist - 15
      const rot = Math.random() * 360 + "deg"

      petal.style.setProperty("--tx", `${tx}px`)
      petal.style.setProperty("--ty", `${ty}px`)
      petal.style.setProperty("--rot", rot)

      const color = PETAL_COLORS[i % PETAL_COLORS.length]
      petal.innerHTML = `<svg viewBox="0 0 16 16" width="16" height="16"><ellipse cx="8" cy="8" rx="4.5" ry="7" fill="${color}"/></svg>`
      petal.style.animation = `burstFly ${0.75 + Math.random() * 0.35}s cubic-bezier(.22,.9,.4,1) forwards`

      stage.appendChild(petal)
      petal.addEventListener("animationend", () => {
        petal.remove()
      })
    }
  }, [])

  // Set transform physics during drag
  const setTransform = useCallback((dx: number, dy: number) => {
    const pill = pillRef.current
    if (!pill) return

    const clampedY = Math.max(0, Math.min(dy, 80))
    const clampedX = Math.max(-35, Math.min(dx, 35))
    const stretch = 1 + clampedY / 260
    const squeeze = 1 - clampedY / 700
    const rotate = clampedX / 6

    pill.style.transform = `translate(${clampedX}px, ${clampedY}px) rotate(${rotate}deg) scale(${squeeze}, ${stretch})`
  }, [])

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only primary button
    if (e.button !== 0) return
    isDragging.current = true
    hasMoved.current = false
    startX.current = e.clientX
    startY.current = e.clientY

    const pill = pillRef.current
    if (pill) {
      pill.style.transition = "transform .08s linear"
      try {
        pill.setPointerCapture(e.pointerId)
      } catch {}
    }
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return
    const dx = e.clientX - startX.current
    const dy = e.clientY - startY.current

    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      hasMoved.current = true
    }
    setTransform(dx, dy)
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return
    isDragging.current = false

    const pill = pillRef.current
    if (pill) {
      // Elastic spring snap-back transition
      pill.style.transition = "transform .65s cubic-bezier(.34,1.56,.64,1)"
      pill.style.transform = "translate(0,0) rotate(0deg) scale(1,1)"
      try {
        pill.releasePointerCapture(e.pointerId)
      } catch {}
    }

    if (hasMoved.current) {
      triggerBurst()
    } else {
      // If clicked without drag, burst petals & navigate home
      triggerBurst()
      // Optional subtle delay before navigating if user isn't on home
      if (window.location.pathname !== "/" && window.location.pathname !== "") {
        setTimeout(() => router.push("/"), 400)
      }
    }
  }

  return (
    <div
      ref={containerRef}
      className={`relative flex items-start justify-center ${className}`}
    >
      {/* Elastic Hanging Logo Pill */}
      <div
        ref={pillRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative bg-[#FBF7EF] border-b border-x border-[#E2D8CC] rounded-b-[32px] px-6 sm:px-8 pt-3 pb-4 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing select-none shadow-[0_12px_28px_rgba(0,0,0,0.18)] will-change-transform touch-none z-40 transition-shadow duration-300 hover:shadow-[0_16px_34px_rgba(0,0,0,0.22)]"
        style={{
          transform: "translate(0,0) rotate(0deg) scale(1,1)",
        }}
        title="Pull to stretch or click to bloom!"
      >
        {/* Flower SVG Icon with Petal Bloom Animation */}
        <div
          ref={flowerRef}
          className={`w-9 h-9 mb-1 relative transition-transform duration-300 ${
            isBloomed ? "scale-115 -translate-y-0.5" : "scale-100"
          }`}
        >
          <svg viewBox="0 0 34 34" className="w-full h-full overflow-visible">
            {/* 5 Petals */}
            <g>
              <ellipse
                cx="17"
                cy="8"
                rx="5.5"
                ry="8"
                fill="#E8A08B"
                transform="rotate(0 17 17)"
                className="transition-transform duration-300 origin-[17px_17px]"
                style={{
                  transform: isBloomed ? "scale(1.15) translateY(-1px)" : "scale(1)",
                }}
              />
              <ellipse
                cx="17"
                cy="8"
                rx="5.5"
                ry="8"
                fill="#D9765A"
                transform="rotate(72 17 17)"
                className="transition-transform duration-300 origin-[17px_17px]"
                style={{
                  transform: isBloomed ? "scale(1.15) translateY(-1px)" : "scale(1)",
                }}
              />
              <ellipse
                cx="17"
                cy="8"
                rx="5.5"
                ry="8"
                fill="#E8A08B"
                transform="rotate(144 17 17)"
                className="transition-transform duration-300 origin-[17px_17px]"
                style={{
                  transform: isBloomed ? "scale(1.15) translateY(-1px)" : "scale(1)",
                }}
              />
              <ellipse
                cx="17"
                cy="8"
                rx="5.5"
                ry="8"
                fill="#D9765A"
                transform="rotate(216 17 17)"
                className="transition-transform duration-300 origin-[17px_17px]"
                style={{
                  transform: isBloomed ? "scale(1.15) translateY(-1px)" : "scale(1)",
                }}
              />
              <ellipse
                cx="17"
                cy="8"
                rx="5.5"
                ry="8"
                fill="#E8A08B"
                transform="rotate(288 17 17)"
                className="transition-transform duration-300 origin-[17px_17px]"
                style={{
                  transform: isBloomed ? "scale(1.15) translateY(-1px)" : "scale(1)",
                }}
              />
            </g>

            {/* Stem and Green Leaf */}
            <path
              d="M17 22 Q10 26 8 32"
              stroke="#7C8F5E"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <ellipse
              cx="9"
              cy="29"
              rx="3.4"
              ry="1.8"
              fill="#7C8F5E"
              transform="rotate(-30 9 29)"
            />

            {/* Golden Flower Center */}
            <circle cx="17" cy="17" r="4.2" fill="#F3C77E" />
          </svg>
        </div>

        {/* Wordmark in User's Geraldine Calligraphy Font (preserved exactly) */}
        <div
          style={{
            fontFamily: "var(--font-geraldine), 'Geraldine', cursive, Georgia, serif",
          }}
          className="font-geraldine font-display text-[32px] sm:text-[38px] font-normal leading-none text-[#3D2F2A] tracking-normal select-none pointer-events-none -mt-1"
        >
          {title}
        </div>

        {/* Subtitle in tracked purple uppercase */}
        {subtitle && (
          <div className="text-[8px] sm:text-[9px] tracking-[0.2em] text-[#6B5B7B] font-semibold mt-1 uppercase select-none pointer-events-none">
            {subtitle}
          </div>
        )}
      </div>
    </div>
  )
}

export default BrandLogo
