"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { useScrollReveal, type ScrollRevealOptions } from "@/hooks/useGsapScrollAnimations"

type ScrollSectionProps = {
    children: React.ReactNode
    className?: string
    animation?: ScrollRevealOptions
    id?: string
}

/**
 * A section wrapper that animates its content on scroll using GSAP.
 */
export function ScrollSection({ children, className, animation, id }: ScrollSectionProps) {
    const ref = useScrollReveal<HTMLDivElement>(animation)

    return (
        <div ref={ref} id={id} className={cn("will-change-transform", className)}>
            {children}
        </div>
    )
}
