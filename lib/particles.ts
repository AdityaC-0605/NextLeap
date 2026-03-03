export type AmbientParticle = {
  left: string
  top: string
  delay: string
  duration: string
  size?: string
  opacity?: string
}

function seeded01(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

export function generateParticles(count: number, salt = 1, withSize = false): AmbientParticle[] {
  return Array.from({ length: count }, (_, i) => {
    const seed = i + 1 + salt * 101
    const base: AmbientParticle = {
      left: `${(seeded01(seed * 2) * 100).toFixed(6)}%`,
      top: `${(seeded01(seed * 3) * 100).toFixed(6)}%`,
      delay: `${(seeded01(seed * 5) * 10).toFixed(6)}s`,
      duration: `${(10 + seeded01(seed * 7) * 20).toFixed(6)}s`,
    }
    if (withSize) {
      base.size = `${(2 + seeded01(seed * 11) * 4).toFixed(6)}px`
      base.opacity = `${(0.2 + seeded01(seed * 13) * 0.4).toFixed(6)}`
    }
    return base
  })
}
