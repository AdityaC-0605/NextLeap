"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AmbientParticles } from "@/components/ui/ambient-particles"
import {
  Brain,
  TrendingUp,
  DollarSign,
  GraduationCap,
  Briefcase,
  Zap,
  Target,
  ArrowRight,
  Loader2,
  Star,
  Award,
  Users,
  AlertCircle,
} from "lucide-react"
import { getCareerRecommendations, getFresherRecommendations } from "@/lib/career-model"
import { useToast } from "@/hooks/use-toast"
import { generateParticles } from "@/lib/particles"

interface Recommendation {
  next_role: string
  predicted_salary: number
  salary_increase: number
  skills_to_learn: string
  company?: {
    image_path?: string
  }
}

const PARTICLES = generateParticles(15, 1)

export default function CareerForecasting() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("experienced")

  // Experienced form state
  const [currentRole, setCurrentRole] = useState("")
  const [yearsExperience, setYearsExperience] = useState("")
  const [education, setEducation] = useState("Bachelors")
  const [currentSalary, setCurrentSalary] = useState("")

  // Fresher form state
  const [skills, setSkills] = useState("")

  const showOutput = recommendations.length > 0
  const resultsRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to results when they load
  useEffect(() => {
    if (showOutput && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [showOutput])

  const handleExperiencedSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const response = await getCareerRecommendations({
        current_role: currentRole,
        years_experience: Number.parseFloat(yearsExperience),
        education: education,
        current_salary: Number.parseFloat(currentSalary),
      })
      setRecommendations(response)
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to get recommendations"
      setError(errorMessage)
      toast({ title: "Request failed", description: errorMessage, variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const handleFresherSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const skillsList = skills.split(",").map((skill) => skill.trim())
      const response = await getFresherRecommendations(skillsList)
      setRecommendations(response)
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to get recommendations"
      setError(errorMessage)
      toast({ title: "Request failed", description: errorMessage, variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setRecommendations([])
    setError("")
    setCurrentRole("")
    setYearsExperience("")
    setEducation("Bachelors")
    setCurrentSalary("")
    setSkills("")
  }

  if (showOutput) {
    return (
      <div className="theme-surface min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <AmbientParticles particles={PARTICLES} />
        </div>

        <div ref={resultsRef} className="max-w-6xl mx-auto px-6 py-10 md:px-8 md:py-12 space-y-10 relative z-10">
          {/* Header */}
          <div className="text-center space-y-4 mb-10 animate-fade-in-up">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight leading-tight bg-gradient-to-r from-white via-teal-200 to-cyan-300 bg-clip-text text-transparent">
              Your Career Forecast
            </h2>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              AI-powered recommendations tailored to your profile
            </p>
          </div>

          {/* Back Button */}
          <div className="flex justify-center mb-6">
            <Button
              onClick={resetForm}
              variant="outline"
              className="hover:scale-105 transition-transform animate-slide-in-up border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-slate-900 bg-transparent"
            >
              <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
              Back to Form
            </Button>
          </div>

          {/* Recommendations Grid */}
          <div className="grid gap-6">
            {recommendations.map((rec, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover-lift animate-slide-in-up premium-panel"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-white">{rec.next_role}</CardTitle>
                        <CardDescription className="text-slate-400">Recommended career path</CardDescription>
                      </div>
                    </div>
                    <Badge className="bg-teal-500/20 text-teal-300 border-teal-500">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Growth Opportunity
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Salary Information */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="bg-gradient-to-r from-slate-700 to-slate-600 border-teal-500/50">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-teal-500/30 rounded-full flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-teal-300" />
                          </div>
                          <div>
                            <p className="text-sm text-slate-300">Predicted Salary</p>
                            <p className="text-xl font-bold text-white">
                              {typeof rec.predicted_salary === "number" && !isNaN(rec.predicted_salary)
                                ? `₹${rec.predicted_salary.toFixed(2)} LPA`
                                : "Data unavailable"}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {typeof rec.salary_increase === "number" && !isNaN(rec.salary_increase) && rec.salary_increase > 0 && (
                      <Card className="bg-gradient-to-r from-slate-700 to-slate-600 border-cyan-500/50">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-cyan-500/30 rounded-full flex items-center justify-center">
                              <TrendingUp className="w-5 h-5 text-cyan-300" />
                            </div>
                            <div>
                              <p className="text-sm text-slate-300">Salary Increase</p>
                              <p className="text-xl font-bold text-white">+₹{rec.salary_increase.toFixed(2)} LPA</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>

                  {/* Skills to Learn */}
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <Zap className="w-5 h-5 text-teal-400" />
                      <h4 className="text-lg font-semibold text-white">Skills to Learn</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {rec.skills_to_learn.split(",").map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          className="bg-teal-500/20 text-teal-300 hover:bg-teal-500/30 transition-colors animate-bounce-gentle border border-teal-500/50"
                          style={{ animationDelay: `${skillIndex * 0.1}s` }}
                        >
                          <Star className="w-3 h-3 mr-1" />
                          {skill.trim()}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-700">
                    <Link href="/skill-gap" className="flex-1">
                      <Button className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white hover:scale-105 transition-transform">
                        <Award className="w-4 h-4 mr-2" />
                        Start Learning Path
                      </Button>
                    </Link>
                    <Link href="/cultural-match" className="flex-1">
                      <Button
                        variant="outline"
                        className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent hover:scale-105 transition-transform"
                      >
                        <Users className="w-4 h-4 mr-2" />
                        Find Companies
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Summary Card */}
          <Card className="border-0 shadow-lg premium-panel animate-fade-in-up">
            <CardContent className="p-8 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight">Ready to Take the Next Step?</h3>
                <p className="text-slate-300 max-w-xl mx-auto leading-relaxed">
                  These recommendations are based on current market trends and your profile. Start building the skills
                  you need to advance your career.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Link href="/skill-gap">
                    <Button className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-8 py-3 hover:scale-105 transition-transform">
                      <Target className="w-4 h-4 mr-2" />
                      Analyze Your Skills
                    </Button>
                  </Link>
                  <Link href="/cultural-match">
                    <Button
                      variant="outline"
                      className="px-8 py-3 border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent hover:scale-105 transition-transform"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Find Cultural Matches
                    </Button>
                  </Link>
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

      <div className="max-w-4xl mx-auto px-6 py-10 md:px-8 md:py-12 space-y-10 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 mb-10 animate-fade-in-up">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight leading-tight bg-gradient-to-r from-white via-teal-200 to-cyan-300 bg-clip-text text-transparent">
            Career Forecasting
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Get AI-powered career recommendations based on your experience and skills
          </p>
        </div>

        {/* Main Form Card */}
        <Card className="border-0 shadow-xl premium-panel animate-fade-in-up">
          <CardContent className="p-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 bg-slate-700 rounded-lg p-1">
                <TabsTrigger
                  value="experienced"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white text-slate-300"
                >
                  <Briefcase className="w-4 h-4 mr-2" />
                  Experienced Professional
                </TabsTrigger>
                <TabsTrigger
                  value="fresher"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white text-slate-300"
                >
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Fresh Graduate
                </TabsTrigger>
              </TabsList>

              {/* Experienced Form */}
              <TabsContent value="experienced" className="space-y-6">
                <div className="text-center space-y-2 mb-6">
                  <h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight">Professional Career Forecast</h3>
                  <p className="text-slate-400">
                    Tell us about your current role and experience to get personalized recommendations
                  </p>
                </div>

                <form onSubmit={handleExperiencedSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="field-label">
                        <Briefcase className="w-4 h-4 inline mr-2" />
                        Current Role
                      </label>
                      <input
                        type="text"
                        value={currentRole}
                        onChange={(e) => setCurrentRole(e.target.value)}
                        className="field-input"
                        required
                        placeholder="e.g., Software Developer"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="field-label">
                        <TrendingUp className="w-4 h-4 inline mr-2" />
                        Years of Experience
                      </label>
                      <input
                        type="number"
                        value={yearsExperience}
                        onChange={(e) => setYearsExperience(e.target.value)}
                        className="field-input"
                        required
                        min={0}
                        placeholder="e.g., 3"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="field-label">
                        <GraduationCap className="w-4 h-4 inline mr-2" />
                        Education Level
                      </label>
                      <select
                        value={education}
                        onChange={(e) => setEducation(e.target.value)}
                        className="field-select"
                      >
                        <option value="Bachelors">Bachelor&apos;s Degree</option>
                        <option value="Masters">Master&apos;s Degree</option>
                        <option value="PhD">PhD</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="field-label">
                        <DollarSign className="w-4 h-4 inline mr-2" />
                        Current Salary (LPA)
                      </label>
                      <input
                        type="number"
                        value={currentSalary}
                        onChange={(e) => setCurrentSalary(e.target.value)}
                        className="field-input"
                        required
                        min={0}
                        placeholder="e.g., 12"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white py-3 text-lg hover:scale-105 transition-transform"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin h-5 w-5 mr-2" />
                        Analyzing Your Career Path...
                      </>
                    ) : (
                      <>
                        <Brain className="w-5 h-5 mr-2" />
                        Get Career Forecast
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>

              {/* Fresher Form */}
              <TabsContent value="fresher" className="space-y-6">
                <div className="text-center space-y-2 mb-6">
                  <h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight">Fresh Graduate Career Forecast</h3>
                  <p className="text-slate-400">Share your skills and we&apos;ll recommend the best career paths for you</p>
                </div>

                <form onSubmit={handleFresherSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="field-label">
                      <Zap className="w-4 h-4 inline mr-2" />
                      Your Skills (comma-separated)
                    </label>
                    <textarea
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      className="field-textarea"
                      rows={6}
                      placeholder="e.g., Python, JavaScript, React, SQL, Machine Learning, Data Analysis"
                      required
                    />
                    <p className="text-sm text-slate-500">
                      List all your technical and soft skills separated by commas
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white py-3 text-lg hover:scale-105 transition-transform"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin h-5 w-5 mr-2" />
                        Finding Your Perfect Roles...
                      </>
                    ) : (
                      <>
                        <Target className="w-5 h-5 mr-2" />
                        Discover Career Paths
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Error Display */}
            {error && (
              <div className="mt-6 p-4 bg-red-900/50 border border-red-600 rounded-lg animate-slide-in-up">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-400" />
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
              icon: Brain,
              title: "AI-Powered Analysis",
              desc: "Advanced algorithms analyze market trends and your profile",
              color: "teal",
            },
            {
              icon: TrendingUp,
              title: "Salary Predictions",
              desc: "Accurate salary forecasts based on industry data",
              color: "cyan",
            },
            {
              icon: Target,
              title: "Skill Recommendations",
              desc: "Personalized learning paths to advance your career",
              color: "teal",
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover-lift animate-slide-in-up premium-panel"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-teal-400" />
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
