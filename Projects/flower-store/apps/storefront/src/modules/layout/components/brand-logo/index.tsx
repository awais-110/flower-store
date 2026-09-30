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
  const pillRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const flowerRef = useRef<HTMLDivElement>(null)

  const isDragging = useRef(false)
  const startX = useRef(0)
  const startY = useRef(0)
  const hasMoved = useRef(false)
  const dragDist = useRef(0)

  const [isBloomed, setIsBloomed] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)

  // Entrance animation on mount
  useEffect(() => {
    const t = setTimeout(() => setHasMounted(true), 60)
    return () => clearTimeout(t)
  }, [])

  // Bloom burst petal explosion animation
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

  // Drag physics transform
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
    if (e.button !== 0) return
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

    if (hasMoved.current && dragDist.current > 12) {
      triggerBurst()
    } else {
      triggerBurst()
      if (window.location.pathname !== "/" && window.location.pathname !== "") {
        setTimeout(() => router.push("/"), 350)
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
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={[
          "relative rounded-b-[30px] px-7 sm:px-9 pt-2 pb-5",
          "flex flex-col items-center justify-center",
          "cursor-grab active:cursor-grabbing select-none",
          "border-b border-x",
          "will-change-transform touch-none z-40",
          // entrance animation
          hasMounted ? "logo-pill-entered" : "logo-pill-entering",
          // hover glow
          isHovered ? "logo-pill-glow" : "",
        ].join(" ")}
        style={{
          transform: hasMounted ? "translate(0,0) rotate(0deg) scale(1,1)" : "translateY(-110%) scale(0.85)",
          background: "linear-gradient(168deg, #FDF6EE 0%, #F5E4D5 50%, #EDD5C0 100%)",
          borderColor: "#C9A07A",
          boxShadow: isHovered
            ? "0 0 0 3px rgba(216,152,110,0.35), 0 14px 40px -4px rgba(120,60,30,0.28)"
            : "0 10px 36px -4px rgba(120,60,30,0.22)",
          transition: hasMounted
            ? "transform .7s cubic-bezier(.34,1.56,.64,1), box-shadow .35s ease, background .4s ease"
            : "none",
        }}
        title="Pull me down or click to bloom!"
      >
        {/* Subtle shimmer line at top edge */}
        <div
          className="absolute top-0 left-4 right-4 h-px rounded-full"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,240,220,0.9), transparent)" }}
          aria-hidden="true"
        />

        {/* Watercolor Camellia Blossom — rotates gently on hover */}
        <div
          ref={flowerRef}
          className="relative mb-0.5"
          style={{
            transition: "transform .5s cubic-bezier(.34,1.3,.64,1), filter .4s ease",
            transform: isBloomed
              ? "scale(1.18) translateY(-3px) rotate(8deg)"
              : isHovered
              ? "scale(1.08) translateY(-2px) rotate(-6deg)"
              : "scale(1) translateY(0) rotate(0deg)",
            filter: isBloomed
              ? "drop-shadow(0 4px 10px rgba(216,130,80,0.55))"
              : isHovered
              ? "drop-shadow(0 3px 8px rgba(180,100,60,0.35))"
              : "drop-shadow(0 2px 4px rgba(0,0,0,0.12))",
          }}
        >
          <Image
            src="/images/camelia-blossom.png"
            alt="Camelia blossom"
            width={58}
            height={58}
            className="object-contain"
            priority
          />
        </div>

        {/* Wordmark */}
        <div
          style={{
            fontFamily: "var(--font-geraldine), 'Geraldine', cursive, Georgia, serif",
            color: isHovered ? "#5C2D18" : "#3D2418",
            transition: "color .3s ease, letter-spacing .3s ease",
            letterSpacing: isHovered ? "0.01em" : "0em",
          }}
          className="font-geraldine font-display text-[34px] sm:text-[40px] font-normal leading-none tracking-normal select-none pointer-events-none -mt-1"
        >
          {title}
        </div>

        {/* Optional subtitle */}
        {subtitle && (
          <div className="text-[8px] sm:text-[9px] tracking-[0.22em] text-[#9B7B60] font-semibold mt-1 uppercase select-none pointer-events-none">
            {subtitle}
          </div>
        )}
      </div>
    </div>
  )
}

export default BrandLogo
