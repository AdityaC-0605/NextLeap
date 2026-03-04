"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

/**
 * Floating orbs that move with scroll, creating depth layers.
 */
export function FloatingOrbs() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const el = containerRef.current
        if (!el) return

        const orbs = el.querySelectorAll("[data-orb]")
        const tweens: gsap.core.Tween[] = []

        orbs.forEach((orb, i) => {
            const speed = 0.15 + i * 0.1
            const tween = gsap.to(orb, {
                y: speed * 200,
                x: (i % 2 === 0 ? 1 : -1) * 30,
                rotation: i * 15,
                ease: "none",
                scrollTrigger: {
                    trigger: document.body,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.2,
                },
            })
            tweens.push(tween)
        })

        return () => {
            tweens.forEach((t) => t.kill())
        }
    }, [])

    return (
        <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Deep background orb  */}
            <div
                data-orb
                className="absolute w-[600px] h-[600px] rounded-full opacity-[0.07] blur-[120px]"
                style={{
                    background: "radial-gradient(circle, rgba(20,184,166,0.8), transparent 70%)",
                    top: "-10%",
                    left: "-5%",
                }}
            />
            {/* Mid-layer orb */}
            <div
                data-orb
                className="absolute w-[500px] h-[500px] rounded-full opacity-[0.06] blur-[100px]"
                style={{
                    background: "radial-gradient(circle, rgba(34,211,238,0.7), transparent 70%)",
                    top: "30%",
                    right: "-8%",
                }}
            />
            {/* Foreground orb  */}
            <div
                data-orb
                className="absolute w-[400px] h-[400px] rounded-full opacity-[0.05] blur-[80px]"
                style={{
                    background: "radial-gradient(circle, rgba(16,185,129,0.7), transparent 70%)",
                    bottom: "10%",
                    left: "20%",
                }}
            />
            {/* Accent orb */}
            <div
                data-orb
                className="absolute w-[350px] h-[350px] rounded-full opacity-[0.04] blur-[90px]"
                style={{
                    background: "radial-gradient(circle, rgba(99,102,241,0.6), transparent 70%)",
                    top: "60%",
                    right: "25%",
                }}
            />
        </div>
    )
}

/**
 * A scroll progress indicator bar fixed at the top.
 */
export function ScrollProgressIndicator() {
    const barRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const bar = barRef.current
        if (!bar) return

        const tween = gsap.to(bar, {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.3,
            },
        })

        return () => {
            tween.kill()
        }
    }, [])

    return (
        <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent">
            <div
                ref={barRef}
                className="h-full bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 origin-left shadow-[0_0_15px_rgba(20,184,166,0.5)]"
                style={{ transform: "scaleX(0)" }}
            />
        </div>
    )
}
