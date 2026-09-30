"use client"

import React, { useRef, useState, useCallback } from "react"
import Image from "next/image"
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
  subtitle = "",
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
        className="relative bg-[#F2DDD5] border-b border-x border-[#D9B5AA] rounded-b-[28px] px-6 sm:px-8 pt-2 pb-5 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing select-none shadow-[0_10px_32px_-4px_rgba(92,45,58,0.20)] will-change-transform touch-none z-40 transition-shadow duration-300 hover:shadow-[0_14px_38px_-4px_rgba(92,45,58,0.28)]"
        style={{
          transform: "translate(0,0) rotate(0deg) scale(1,1)",
        }}
        title="Pull to stretch or click to bloom!"
      >
        {/* Original Watercolor Camellia Blossom */}
        <div
          ref={flowerRef}
          className={`relative mb-1 transition-transform duration-300 ${
            isBloomed ? "scale-110 -translate-y-0.5" : "scale-100"
          }`}
        >
          <Image
            src="/images/camelia-blossom.png"
            alt="Camelia blossom"
            width={52}
            height={52}
            className="object-contain drop-shadow-sm"
            priority
          />
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
