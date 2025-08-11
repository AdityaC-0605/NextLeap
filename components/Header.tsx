"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Brain, ChevronRight, Menu } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

const NAV_ITEMS: Array<{ href: string; label: string }> = [
  { href: "/career-forecasting", label: "Career Forecasting" },
  { href: "/skill-gap", label: "Skill Analysis" },
  { href: "/cultural-match", label: "Culture Match" },
]

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="glass-nav-dark sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg animate-glow-teal">
              <Brain className="w-5 h-5 text-slate-900" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-white to-teal-100 bg-clip-text text-transparent">
              NextLeap
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname?.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-all duration-200 relative group ${
                    isActive ? "text-teal-400" : "text-slate-300 hover:text-teal-400"
                  }`}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-cyan-400 transition-all duration-300 group-hover:w-full" />
                </Link>
              )
            })}
            <ThemeToggle />
            <Link href="/career-forecasting">
              <Button
                variant="outline"
                size="sm"
                className="glass-card-dark border-teal-400/30 hover:border-teal-400 hover:bg-teal-400/10 text-teal-400 transition-all duration-200 font-medium"
              >
                Get Started
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </nav>

          {/* Mobile actions */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Button variant="outline" size="icon" className="glass-card-dark" onClick={() => setOpen((v) => !v)}>
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 space-y-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-slate-200 hover:text-teal-400 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/career-forecasting" onClick={() => setOpen(false)}>
              <Button className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-900 font-semibold">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header


