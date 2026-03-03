"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Send, Building2, MapPin, Users, Star, ArrowRight, Sparkles, Target, Heart, TrendingUp, Zap, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AmbientParticles } from "@/components/ui/ambient-particles"
import { useToast } from "@/hooks/use-toast"
import { API_BASE } from "@/lib/api-base"
import { generateParticles } from "@/lib/particles"

interface CompanyRecommendation {
  company_name: string
  similarity_score: number
  culture_description: string
  location: string
  industry: string
  image_path: string
}

const PARTICLES = generateParticles(20, 3)

const CULTURE_TAGS = [
  "Work-life balance",
  "Remote-friendly",
  "Innovation-driven",
  "Collaborative teams",
  "Diversity & inclusion",
  "Learning opportunities",
  "Flat hierarchy",
  "Mentorship programs",
  "Flexible hours",
  "Open communication",
  "Fast-paced environment",
  "Employee wellness",
  "Creative freedom",
  "Social impact",
  "Startup culture",
]

// Normalize low cosine similarity scores to a more meaningful range
const normalizeScore = (score: number): number => {
  // Cosine similarity from TF-IDF often gives low values (0.01-0.15)
  // Scale to 40-98% range for better UX
  const minExpected = 0
  const maxExpected = 0.3
  const normalized = Math.min(Math.max((score - minExpected) / (maxExpected - minExpected), 0), 1)
  return 0.40 + normalized * 0.58
}

export default function CulturalMatch() {
  const { toast } = useToast()
  const [preferences, setPreferences] = useState("")
  const [loading, setLoading] = useState(false)
  const [recommendations, setRecommendations] = useState<CompanyRecommendation[]>([])
  const [error, setError] = useState("")
  const [visibleCards, setVisibleCards] = useState(0)
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<number>>(new Set())

  const showOutput = recommendations.length > 0

  const toggleDescription = (index: number) => {
    setExpandedDescriptions(prev => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  const toggleTag = (tag: string) => {
    setPreferences(prev => {
      const current = prev.trim()
      const tagLower = tag.toLowerCase()
      if (current.toLowerCase().includes(tagLower)) {
        return current.replace(new RegExp(tag, 'gi'), '').replace(/,\s*,/g, ',').replace(/^,\s*|,\s*$/g, '').trim()
      }
      return current ? `${current}, ${tag}` : tag
    })
  }

  useEffect(() => {
    if (recommendations.length > 0) {
      setVisibleCards(0)
      const interval = setInterval(() => {
        setVisibleCards((prev) => {
          if (prev >= recommendations.length) {
            clearInterval(interval)
            return prev
          }
          return prev + 1
        })
      }, 200)
      return () => clearInterval(interval)
    }
  }, [recommendations])

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!preferences.trim()) return

    setLoading(true)
    setError("")
    try {
      const response = await fetch(`${API_BASE}/api/cultural-match`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ preferences, top_n: 5 }),
      })
      if (!response.ok) throw new Error("Failed to get company recommendations")
      const data = await response.json()
      const recs = Array.isArray(data) ? data : data?.recommendations
      if (!Array.isArray(recs)) {
        throw new Error("Invalid response from server")
      }
      setRecommendations(recs)
    } catch (err: any) {
      const msg = err.message || "Failed to get recommendations"
      setError(msg)
      toast({ title: "Cultural match failed", description: msg, variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const resetSearch = () => {
    setRecommendations([])
    setPreferences("")
    setError("")
    setVisibleCards(0)
  }

  if (showOutput) {
    return (
      <div className="theme-surface min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <AmbientParticles particles={PARTICLES} />
        </div>

        <div className="max-w-6xl mx-auto px-6 py-10 md:px-8 md:py-12 space-y-10 relative z-10">
          {/* Header */}
          <div className="text-center space-y-4 mb-10 animate-fade-in-up">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight leading-tight bg-gradient-to-r from-white via-teal-200 to-cyan-300 bg-clip-text text-transparent">
              Your Cultural Matches
            </h2>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Companies that align with your values and work style preferences
            </p>
          </div>

          {/* Back Button */}
          <div className="flex justify-center mb-6">
            <Button
              onClick={resetSearch}
              variant="outline"
              className="hover:scale-105 transition-transform animate-slide-in-up border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-slate-900 bg-transparent"
            >
              <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
              New Search
            </Button>
          </div>

          {/* Results Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((company, index) => {
              const hasImage = company.image_path && company.image_path.trim() !== ""
              return (
                <Card
                  key={index}
                  className={`border-0 shadow-lg hover-lift premium-panel ${index < visibleCards ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center">
                          {hasImage ? (
                            <Image
                              src={company.image_path || ""}
                              alt={company.company_name}
                              width={32}
                              height={32}
                              unoptimized
                              className="w-8 h-8 object-contain rounded"
                            />
                          ) : (
                            <Building2 className="w-6 h-6 text-teal-400" />
                          )}
                        </div>
                        <div>
                          <CardTitle className="text-lg text-white">{company.company_name}</CardTitle>
                          <CardDescription className="text-sm text-slate-400">{company.industry}</CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-teal-500/20 text-teal-300 border-teal-500">
                        <Star className="w-3 h-3 mr-1" />
                        {(normalizeScore(company.similarity_score) * 100).toFixed(0)}%
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Location */}
                    <div className="flex items-center space-x-2 text-sm text-slate-400">
                      <MapPin className="w-4 h-4 text-cyan-400" />
                      <span>{company.location}</span>
                    </div>

                    {/* Culture Description — Truncated */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Heart className="w-4 h-4 text-teal-400" />
                        <span className="text-sm font-medium text-slate-300">Culture Highlights</span>
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {(() => {
                          const desc = company.culture_description || "A dynamic workplace focused on innovation and collaboration."
                          const isLong = desc.length > 150
                          const isExpanded = expandedDescriptions.has(index)
                          if (!isLong || isExpanded) return desc
                          return desc.slice(0, 150) + "..."
                        })()}
                      </p>
                      {(company.culture_description || "").length > 150 && (
                        <button
                          onClick={() => toggleDescription(index)}
                          className="text-xs text-teal-400 hover:text-teal-300 flex items-center gap-1 transition-colors"
                        >
                          {expandedDescriptions.has(index) ? (
                            <><ChevronUp className="w-3 h-3" /> Show less</>
                          ) : (
                            <><ChevronDown className="w-3 h-3" /> Read more</>
                          )}
                        </button>
                      )}
                    </div>

                    {/* Match Score Visualization — Normalized */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Culture Match</span>
                        <span className="font-semibold text-teal-300">
                          {(normalizeScore(company.similarity_score) * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-teal-500 to-cyan-500 h-2 rounded-full animate-progress-bar"
                          style={{ width: `${normalizeScore(company.similarity_score) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Action Buttons — Functional */}
                    <div className="flex space-x-2 pt-2">
                      <a
                        href={`https://www.google.com/search?q=${encodeURIComponent(company.company_name + ' company culture')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button
                          size="sm"
                          className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white hover:scale-105 transition-transform"
                        >
                          <Users className="w-4 h-4 mr-1" />
                          Learn More
                        </Button>
                      </a>
                      <a
                        href={`https://www.google.com/search?q=${encodeURIComponent(company.company_name + ' careers jobs')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent hover:scale-105 transition-transform"
                        >
                          <Target className="w-4 h-4 mr-1" />
                          Apply
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Summary Card */}
          <Card className="border-0 shadow-lg premium-panel animate-fade-in-up mt-8">
            <CardContent className="p-8 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-white">Found Your Perfect Matches!</h3>
                <p className="text-slate-300 max-w-xl mx-auto leading-relaxed">
                  These companies align with your cultural preferences and values. Continue exploring your career journey!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Link href="/career-forecasting">
                    <Button className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-8 py-3 hover:scale-105 transition-transform">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Get Career Forecast
                    </Button>
                  </Link>
                  <Link href="/skill-gap">
                    <Button
                      variant="outline"
                      className="px-8 py-3 border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent hover:scale-105 transition-transform"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Analyze Your Skills
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="px-8 py-3 border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-slate-900 bg-transparent hover:scale-105 transition-transform"
                    onClick={resetSearch}
                  >
                    <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                    Search Again
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="theme-surface min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <AmbientParticles particles={PARTICLES} />
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 md:px-8 md:py-12 space-y-10 relative z-10 flex flex-col justify-center min-h-screen">
        {/* Header */}
        <div className="text-center space-y-5 mb-10 animate-fade-in-up">
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight leading-tight bg-gradient-to-r from-white via-teal-200 to-cyan-300 bg-clip-text text-transparent">
              Cultural Match
            </h1>
            <p className="text-xl lg:text-2xl font-semibold text-white">
              What kind of company culture are you looking for?
            </p>
            <p className="text-base md:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
              Describe your ideal work environment and we&apos;ll find companies that match your values and preferences.
            </p>
          </div>
        </div>

        {/* Search Form */}
        <Card className="border-0 shadow-xl premium-panel animate-fade-in-up">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <label className="field-label text-base md:text-lg">
                  <Heart className="w-5 h-5 inline mr-2 text-teal-400" />
                  Describe Your Ideal Work Culture
                </label>
                <div className="relative">
                  <textarea
                    value={preferences}
                    onChange={(e) => setPreferences(e.target.value)}
                    placeholder="e.g., I value work-life balance, collaborative teams, innovation, remote flexibility, diversity and inclusion, learning opportunities..."
                    className="field-textarea pr-16 resize-none"
                    rows={4}
                    required
                  />
                  <Button
                    type="submit"
                    disabled={loading || !preferences.trim()}
                    className="absolute bottom-3 right-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white p-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </Button>
                </div>
                <p className="text-sm text-slate-500">
                  Be specific about what matters most to you in a workplace - values, environment, benefits, team
                  dynamics, etc.
                </p>

                {/* Quick Culture Tags */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-400">Quick add:</p>
                  <div className="flex flex-wrap gap-2">
                    {CULTURE_TAGS.map((tag) => {
                      const isActive = preferences.toLowerCase().includes(tag.toLowerCase())
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleTag(tag)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${isActive
                            ? "bg-teal-500/30 text-teal-300 border-teal-500 shadow-sm"
                            : "bg-slate-700/50 text-slate-400 border-slate-600 hover:border-teal-500/50 hover:text-slate-300"
                            }`}
                        >
                          {isActive ? "✓ " : ""}{tag}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </form>

            {/* Error Display */}
            {error && (
              <div className="mt-6 p-4 bg-red-900/50 border border-red-600 rounded-lg animate-slide-in-up">
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">!</span>
                  </div>
                  <span className="text-red-300 font-medium">Error</span>
                </div>
                <p className="text-red-300 mt-1">{error}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Features Preview */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {[
            {
              icon: Building2,
              title: "Company Matching",
              desc: "Find companies that align with your values and work style",
              iconColor: "text-teal-400",
            },
            {
              icon: Users,
              title: "Culture Analysis",
              desc: "Deep insights into company culture and team dynamics",
              iconColor: "text-cyan-400",
            },
            {
              icon: Target,
              title: "Perfect Fit",
              desc: "Get matched with workplaces where you'll truly thrive",
              iconColor: "text-teal-400",
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover-lift animate-slide-in-up premium-panel"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
