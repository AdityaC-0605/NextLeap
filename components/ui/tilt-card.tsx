"use client"

import type React from "react"
import { useTiltEffect } from "@/hooks/useTiltEffect"
import { cn } from "@/lib/utils"

type TiltCardProps = {
    children: React.ReactNode
    className?: string
    maxTilt?: number
    perspective?: number
    scale?: number
    glare?: boolean
}

export function TiltCard({
    children,
    className,
    maxTilt = 10,
    perspective = 1000,
    scale = 1.03,
    glare = true,
}: TiltCardProps) {
    const tiltRef = useTiltEffect<HTMLDivElement>({ maxTilt, perspective, scale, glare })

    return (
        <div ref={tiltRef} className={cn("relative", className)}>
            {children}
            {glare && (
                <div
                    data-tilt-glare
                    className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 z-10"
                    style={{ mixBlendMode: "overlay" }}
                />
            )}
        </div>
    )
}
