import { describe, it, expect } from "vitest"
import { generateParticles } from "@/lib/particles"

describe("generateParticles", () => {
  it("produces the requested count", () => {
    expect(generateParticles(20, 3)).toHaveLength(20)
  })

  it("is deterministic for the same seed/salt (SSR/hydration-safe)", () => {
    expect(generateParticles(10, 2)).toEqual(generateParticles(10, 2))
  })

  it("varies output by salt", () => {
    expect(generateParticles(5, 1)).not.toEqual(generateParticles(5, 2))
  })

  it("omits size/opacity unless withSize is set", () => {
    const [without] = generateParticles(1, 1)
    expect(without.size).toBeUndefined()
    expect(without.opacity).toBeUndefined()

    const [withSize] = generateParticles(1, 1, true)
    expect(withSize.size).toBeDefined()
    expect(withSize.opacity).toBeDefined()
  })

  it("formats values with CSS units", () => {
    const [p] = generateParticles(1, 1)
    expect(p.left).toMatch(/%$/)
    expect(p.top).toMatch(/%$/)
    expect(p.delay).toMatch(/s$/)
    expect(p.duration).toMatch(/s$/)
  })
})
