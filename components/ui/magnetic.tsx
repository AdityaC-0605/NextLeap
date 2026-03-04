"use client"

import type React from "react"
import { useMagneticEffect } from "@/hooks/useTiltEffect"
import { cn } from "@/lib/utils"

type MagneticProps = {
    children: React.ReactNode
    className?: string
    strength?: number
    as?: "div" | "span"
}

/**
 * Wraps any element with a subtle magnetic cursor attraction effect.
 */
export function Magnetic({ children, className, strength = 0.25, as: Tag = "div" }: MagneticProps) {
    const ref = useMagneticEffect<HTMLDivElement>(strength)

    return (
        <Tag ref={ref as React.RefObject<HTMLDivElement>} className={cn("inline-block", className)}>
            {children}
        </Tag>
    )
}
