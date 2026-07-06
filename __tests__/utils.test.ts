import { describe, it, expect } from "vitest"
import { cn } from "@/lib/utils"

describe("cn", () => {
  it("joins class names", () => {
    expect(cn("a", "b")).toBe("a b")
  })

  it("lets a later Tailwind class win over a conflicting earlier one", () => {
    expect(cn("p-2", "p-4")).toBe("p-4")
  })

  it("drops falsey values", () => {
    expect(cn("a", false, null, undefined, "", "b")).toBe("a b")
  })

  it("supports conditional object syntax", () => {
    expect(cn("base", { active: true, hidden: false })).toBe("base active")
  })
})
