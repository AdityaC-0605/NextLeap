"use client"

import type React from "react"
import { useParallax } from "@/hooks/useGsapScrollAnimations"
import { cn } from "@/lib/utils"

type ParallaxLayerProps = {
    children?: React.ReactNode
    className?: string
    speed?: number
    direction?: "vertical" | "horizontal"
}

/**
 * A wrapper element that moves at a different speed than the page scroll,
 * creating a parallax depth effect.
 */
export function ParallaxLayer({
    children,
    className,
    speed = 0.2,
    direction = "vertical",
}: ParallaxLayerProps) {
    const ref = useParallax<HTMLDivElement>(speed, direction)

    return (
        <div ref={ref} className={cn("will-change-transform", className)}>
            {children}
        </div>
    )
}
