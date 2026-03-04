"use client"

import { useEffect, useRef, useCallback } from "react"

/**
 * Hook for interactive 3D tilt effect on cards/elements.
 * Creates a realistic 3D rotation effect that follows mouse movement.
 */
export type TiltOptions = {
    /** Maximum tilt angle in degrees */
    maxTilt?: number
    /** Transition speed when returning to center */
    speed?: number
    /** Whether to add a glare/shine effect */
    glare?: boolean
    /** Perspective value for 3D depth */
    perspective?: number
    /** Scale on hover */
    scale?: number
}

export function useTiltEffect<T extends HTMLElement>(options: TiltOptions = {}) {
    const ref = useRef<T>(null)

    const {
        maxTilt = 12,
        speed = 400,
        glare = true,
        perspective = 1000,
        scale = 1.02,
    } = options

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            const el = ref.current
            if (!el) return

            const rect = el.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            const centerX = rect.width / 2
            const centerY = rect.height / 2

            const rotateX = ((y - centerY) / centerY) * -maxTilt
            const rotateY = ((x - centerX) / centerX) * maxTilt

            el.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`
            el.style.transition = "transform 0.1s ease-out"

            // Update glare position if element has a glare child
            if (glare) {
                const glareEl = el.querySelector("[data-tilt-glare]") as HTMLElement | null
                if (glareEl) {
                    const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI)
                    const intensity = Math.sqrt(
                        Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
                    ) / Math.max(centerX, centerY)
                    glareEl.style.background = `linear-gradient(${angle + 180}deg, rgba(255,255,255,${Math.min(intensity * 0.25, 0.2)}) 0%, transparent 80%)`
                    glareEl.style.opacity = "1"
                }
            }
        },
        [maxTilt, perspective, scale, glare]
    )

    const handleMouseLeave = useCallback(() => {
        const el = ref.current
        if (!el) return

        el.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
        el.style.transition = `transform ${speed}ms cubic-bezier(0.23, 1, 0.32, 1)`

        if (glare) {
            const glareEl = el.querySelector("[data-tilt-glare]") as HTMLElement | null
            if (glareEl) {
                glareEl.style.opacity = "0"
            }
        }
    }, [perspective, speed, glare])

    useEffect(() => {
        const el = ref.current
        if (!el) return

        // Set initial styles
        el.style.transformStyle = "preserve-3d"
        el.style.willChange = "transform"

        el.addEventListener("mousemove", handleMouseMove)
        el.addEventListener("mouseleave", handleMouseLeave)

        return () => {
            el.removeEventListener("mousemove", handleMouseMove)
            el.removeEventListener("mouseleave", handleMouseLeave)
        }
    }, [handleMouseMove, handleMouseLeave])

    return ref
}

/**
 * Hook for smooth magnetic cursor attraction effect.
 */
export function useMagneticEffect<T extends HTMLElement>(strength: number = 0.3) {
    const ref = useRef<T>(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const handleMouseMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect()
            const x = e.clientX - rect.left - rect.width / 2
            const y = e.clientY - rect.top - rect.height / 2

            el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
            el.style.transition = "transform 0.2s ease-out"
        }

        const handleMouseLeave = () => {
            el.style.transform = "translate(0px, 0px)"
            el.style.transition = "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)"
        }

        el.addEventListener("mousemove", handleMouseMove)
        el.addEventListener("mouseleave", handleMouseLeave)

        return () => {
            el.removeEventListener("mousemove", handleMouseMove)
            el.removeEventListener("mouseleave", handleMouseLeave)
        }
    }, [strength])

    return ref
}
