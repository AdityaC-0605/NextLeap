"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

/**
 * Hook to reveal elements on scroll with 3D transforms.
 */
export type ScrollRevealOptions = {
    type?: "fade-up" | "fade-left" | "fade-right" | "scale" | "rotate-in" | "flip-up"
    duration?: number
    triggerStart?: string
    delay?: number
    distance?: number
    scrub?: boolean | number
}

export function useScrollReveal<T extends HTMLElement>(options: ScrollRevealOptions = {}) {
    const ref = useRef<T>(null)
    // Store options in a ref to avoid re-running the effect
    const optsRef = useRef(options)
    optsRef.current = options

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const {
            type = "fade-up",
            duration = 1,
            triggerStart = "top 85%",
            delay = 0,
            distance = 60,
            scrub = false,
        } = optsRef.current

        // Build the "from" vars
        const fromVars: gsap.TweenVars = { opacity: 0 }
        const toVars: gsap.TweenVars = {
            opacity: 1,
            duration,
            delay,
            ease: "power3.out",
            clearProps: "all",
        }

        switch (type) {
            case "fade-up":
                fromVars.y = distance
                toVars.y = 0
                break
            case "fade-left":
                fromVars.x = -distance
                toVars.x = 0
                break
            case "fade-right":
                fromVars.x = distance
                toVars.x = 0
                break
            case "scale":
                fromVars.scale = 0.85
                fromVars.y = distance * 0.5
                toVars.scale = 1
                toVars.y = 0
                break
            case "rotate-in":
                fromVars.rotateX = 15
                fromVars.y = distance * 0.6
                toVars.rotateX = 0
                toVars.y = 0
                toVars.transformPerspective = 800
                break
            case "flip-up":
                fromVars.rotateX = -20
                fromVars.y = distance
                toVars.rotateX = 0
                toVars.y = 0
                toVars.transformPerspective = 1200
                toVars.transformOrigin = "center bottom"
                break
        }

        // Use fromTo for predictable behavior with SSR
        const tween = gsap.fromTo(el, fromVars, {
            ...toVars,
            scrollTrigger: {
                trigger: el,
                start: triggerStart,
                end: scrub ? "bottom 20%" : undefined,
                scrub: scrub,
                toggleActions: scrub ? undefined : "play none none none",
            },
        })

        return () => {
            tween.kill()
            ScrollTrigger.getAll().forEach((st) => {
                if (st.trigger === el) st.kill()
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return ref
}

/**
 * Hook that creates a parallax effect based on scroll position.
 */
export function useParallax<T extends HTMLElement>(speed = 0.3, direction: "vertical" | "horizontal" = "vertical") {
    const ref = useRef<T>(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const yValue = direction === "vertical" ? speed * 100 : 0
        const xValue = direction === "horizontal" ? speed * 100 : 0

        const tween = gsap.to(el, {
            y: yValue,
            x: xValue,
            ease: "none",
            scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
            },
        })

        return () => {
            tween.kill()
            ScrollTrigger.getAll().forEach((st) => {
                if (st.trigger === el) st.kill()
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return ref
}

/**
 * Hook for staggered scroll reveals on children elements.
 */
export function useStaggerReveal<T extends HTMLElement>(
    childSelector: string,
    stagger = 0.12,
    duration = 0.8,
    distance = 50,
    triggerStart = "top 82%"
) {
    const ref = useRef<T>(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const children = el.querySelectorAll(childSelector)
        if (!children.length) return

        const tween = gsap.fromTo(
            children,
            {
                opacity: 0,
                y: distance,
                rotateX: 8,
            },
            {
                opacity: 1,
                y: 0,
                rotateX: 0,
                transformPerspective: 800,
                duration,
                stagger,
                ease: "power3.out",
                clearProps: "all",
                scrollTrigger: {
                    trigger: el,
                    start: triggerStart,
                    toggleActions: "play none none none",
                },
            }
        )

        return () => {
            tween.kill()
            ScrollTrigger.getAll().forEach((st) => {
                if (st.trigger === el) st.kill()
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return ref
}
