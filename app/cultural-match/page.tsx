"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Send, Building2, MapPin, Users, Star, ArrowRight, Sparkles, Target, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface CompanyRecommendation {
  company_name: string
  similarity_score: number
  culture_description: string
  location: string
  industry: string
  image_path: string
}

export default function CulturalMatch() {
  const [preferences, setPreferences] = useState("")
  const [loading, setLoading] = useState(false)
  const [recommendations, setRecommendations] = useState<CompanyRecommendation[]>([])
  const [error, setError] = useState("")
  const [visibleCards, setVisibleCards] = useState(0)
  const [particles, setParticles] = useState<Array<{ left: string; top: string; delay: string; duration: string }>>([])

  const showOutput = recommendations.length > 0

  useEffect(() => {
    // Generate particles only on client side to avoid hydration mismatch
    const newParticles = [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${10 + Math.random() * 20}s`,
    }))
    setParticles(newParticles)
  }, [])

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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/cultural-match`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ preferences, top_n: 5 }),
      })
      if (!response.ok) throw new Error("Failed to get company recommendations")
      const data = await response.json()
      setRecommendations(data.recommendations)
    } catch (err: any) {
      setError(err.message || "Failed to get recommendations")
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="floating-particles">
            {particles.map((particle, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full opacity-20 animate-float"
                style={{
                  left: particle.left,
                  top: particle.top,
                  animationDelay: particle.delay,
                  animationDuration: particle.duration,
                }}
              />
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-6 space-y-6 relative z-10">
          {/* Header */}
          <div className="text-center space-y-4 mb-8 animate-fade-in-up">
            <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-teal-200 to-cyan-300 bg-clip-text text-transparent">
              Your Cultural Matches
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
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
                  className={`border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 bg-slate-800/90 backdrop-blur-sm border border-slate-700 ${
                    index < visibleCards ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center">
                          {hasImage ? (
                            <img
                              src={company.image_path || "/placeholder.svg"}
                              alt={company.company_name}
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
                        {(company.similarity_score * 100).toFixed(1)}%
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Location */}
                    <div className="flex items-center space-x-2 text-sm text-slate-400">
                      <MapPin className="w-4 h-4 text-cyan-400" />
                      <span>{company.location}</span>
                    </div>

                    {/* Culture Description */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Heart className="w-4 h-4 text-teal-400" />
                        <span className="text-sm font-medium text-slate-300">Culture Highlights</span>
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {company.culture_description || "A dynamic workplace focused on innovation and collaboration."}
                      </p>
                    </div>

                    {/* Match Score Visualization */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Culture Match</span>
                        <span className="font-semibold text-teal-300">
                          {(company.similarity_score * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-teal-500 to-cyan-500 h-2 rounded-full animate-progress-bar"
                          style={{ width: `${company.similarity_score * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2 pt-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white"
                      >
                        <Users className="w-4 h-4 mr-1" />
                        Learn More
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                      >
                        <Target className="w-4 h-4 mr-1" />
                        Apply
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Summary Card */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-slate-800/90 to-slate-700/90 animate-fade-in-up mt-8 border border-slate-600">
            <CardContent className="p-8 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white">Found Your Perfect Matches!</h3>
                <p className="text-slate-300 max-w-2xl mx-auto">
                  These companies align with your cultural preferences and values. Ready to take the next step in your
                  career journey?
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Button className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-8 py-3">
                    <Building2 className="w-4 h-4 mr-2" />
                    Explore Companies
                  </Button>
                  <Button
                    variant="outline"
                    className="px-8 py-3 border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
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

        <style jsx>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes progressBar {
            from {
              width: 0%;
            }
            to {
              width: var(--progress-width);
            }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          .animate-fade-in-up {
            animation: fadeInUp 1s ease-out;
          }
          .animate-slide-in-up {
            animation: slideInUp 0.8s ease-out;
          }
          .animate-progress-bar {
            animation: progressBar 2s ease-out 0.5s forwards;
            width: 0%;
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-particles">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full opacity-20 animate-float"
              style={{
                left: particle.left,
                top: particle.top,
                animationDelay: particle.delay,
                animationDuration: particle.duration,
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6 relative z-10 flex flex-col justify-center min-h-screen">
        {/* Header */}
        <div className="text-center space-y-6 mb-12 animate-fade-in-up">
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-white via-teal-200 to-cyan-300 bg-clip-text text-transparent">
              Cultural Match
            </h1>
            <p className="text-2xl lg:text-3xl font-semibold text-white">
              What kind of company culture are you looking for?
            </p>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Describe your ideal work environment and we'll find companies that match your values and preferences.
            </p>
          </div>
        </div>

        {/* Search Form */}
        <Card className="border-0 shadow-xl bg-slate-800/90 backdrop-blur-sm animate-fade-in-up border border-slate-700">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <label className="block text-lg font-medium text-slate-300">
                  <Heart className="w-5 h-5 inline mr-2 text-teal-400" />
                  Describe Your Ideal Work Culture
                </label>
                <div className="relative">
                  <textarea
                    value={preferences}
                    onChange={(e) => setPreferences(e.target.value)}
                    placeholder="e.g., I value work-life balance, collaborative teams, innovation, remote flexibility, diversity and inclusion, learning opportunities..."
                    className="w-full p-4 pr-16 border border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-slate-700/80 backdrop-blur-sm resize-none text-white placeholder-slate-400"
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
        <div className="grid md:grid-cols-3 gap-6 mt-8">
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
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-slide-in-up bg-slate-800/80 backdrop-blur-sm border border-slate-700"
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

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out;
        }
        .animate-slide-in-up {
          animation: slideInUp 0.8s ease-out;
        }
      `}</style>
    </div>
  )
}
