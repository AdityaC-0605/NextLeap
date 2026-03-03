"use client"

import type { AmbientParticle } from "@/lib/particles"

type AmbientParticlesProps = {
  particles: AmbientParticle[]
  particleClassName?: string
}

export function AmbientParticles({
  particles,
  particleClassName = "absolute w-2 h-2 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full opacity-20 animate-float",
}: AmbientParticlesProps) {
  return (
    <div className="floating-particles">
      {particles.map((particle, i) => (
        <div
          key={i}
          className={particleClassName}
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
        />
      ))}
    </div>
  )
}
