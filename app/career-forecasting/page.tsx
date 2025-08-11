"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

interface Recommendation {
  next_role: string
  predicted_salary: number
  salary_increase: number
  skills_to_learn: string
  company?: {
    image_path?: string
  }
}

export default function CareerForecasting() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("experienced")
  const [particles, setParticles] = useState<Array<{ left: string; top: string; delay: string; duration: string }>>([])

  // Experienced form state
  const [currentRole, setCurrentRole] = useState("")
  const [yearsExperience, setYearsExperience] = useState("")
  const [education, setEducation] = useState("Bachelors")
  const [currentSalary, setCurrentSalary] = useState("")

  // Fresher form state
  const [skills, setSkills] = useState("")

  const showOutput = recommendations.length > 0

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

  useEffect(() => {
    // Generate particles only on client side to avoid hydration mismatch
    const newParticles = [...Array(15)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${10 + Math.random() * 20}s`,
    }))
    setParticles(newParticles)
  }, [])

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
              Your Career Forecast
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
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
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] animate-slide-in-up bg-slate-800/90 backdrop-blur-sm border border-slate-700"
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
                            <p className="text-xl font-bold text-white">₹{rec.predicted_salary.toFixed(2)} LPA</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {typeof rec.salary_increase === "number" && !isNaN(rec.salary_increase) && (
                      <Card className="bg-gradient-to-r from-slate-700 to-slate-600 border-cyan-500/50">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-cyan-500/30 rounded-full flex items-center justify-center">
                              <TrendingUp className="w-5 h-5 text-cyan-300" />
                            </div>
                            <div>
                              <p className="text-sm text-slate-300">Salary Increase</p>
                              <p className="text-xl font-bold text-white">₹{rec.salary_increase.toFixed(2)} LPA</p>
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
                    <Button className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white">
                      <Award className="w-4 h-4 mr-2" />
                      Start Learning Path
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Find Companies
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Summary Card */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-slate-800/90 to-slate-700/90 animate-fade-in-up border border-slate-600">
            <CardContent className="p-8 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white">Ready to Take the Next Step?</h3>
                <p className="text-slate-300 max-w-2xl mx-auto">
                  These recommendations are based on current market trends and your profile. Start building the skills
                  you need to advance your career.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Button className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-8 py-3">
                    <Target className="w-4 h-4 mr-2" />
                    Create Learning Plan
                  </Button>
                  <Button
                    variant="outline"
                    className="px-8 py-3 border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Track Progress
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
          @keyframes bounceGentle {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-5px);
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
          .animate-bounce-gentle {
            animation: bounceGentle 2s ease-in-out infinite;
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

      <div className="max-w-4xl mx-auto p-6 space-y-6 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 mb-8 animate-fade-in-up">
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-teal-200 to-cyan-300 bg-clip-text text-transparent">
            Career Forecasting
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Get AI-powered career recommendations based on your experience and skills
          </p>
        </div>

        {/* Main Form Card */}
        <Card className="border-0 shadow-xl bg-slate-800/90 backdrop-blur-sm animate-fade-in-up border border-slate-700">
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
                  <h3 className="text-2xl font-semibold text-white">Professional Career Forecast</h3>
                  <p className="text-slate-400">
                    Tell us about your current role and experience to get personalized recommendations
                  </p>
                </div>

                <form onSubmit={handleExperiencedSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-300">
                        <Briefcase className="w-4 h-4 inline mr-2" />
                        Current Role
                      </label>
                      <input
                        type="text"
                        value={currentRole}
                        onChange={(e) => setCurrentRole(e.target.value)}
                        className="w-full p-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-slate-700/80 backdrop-blur-sm text-white placeholder-slate-400"
                        required
                        placeholder="e.g., Software Developer"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-300">
                        <TrendingUp className="w-4 h-4 inline mr-2" />
                        Years of Experience
                      </label>
                      <input
                        type="number"
                        value={yearsExperience}
                        onChange={(e) => setYearsExperience(e.target.value)}
                        className="w-full p-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-slate-700/80 backdrop-blur-sm text-white placeholder-slate-400"
                        required
                        min={0}
                        placeholder="e.g., 3"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-300">
                        <GraduationCap className="w-4 h-4 inline mr-2" />
                        Education Level
                      </label>
                      <select
                        value={education}
                        onChange={(e) => setEducation(e.target.value)}
                        className="w-full p-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-slate-700/80 backdrop-blur-sm text-white"
                      >
                        <option value="Bachelors">Bachelor's Degree</option>
                        <option value="Masters">Master's Degree</option>
                        <option value="PhD">PhD</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-300">
                        <DollarSign className="w-4 h-4 inline mr-2" />
                        Current Salary (LPA)
                      </label>
                      <input
                        type="number"
                        value={currentSalary}
                        onChange={(e) => setCurrentSalary(e.target.value)}
                        className="w-full p-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-slate-700/80 backdrop-blur-sm text-white placeholder-slate-400"
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
                  <h3 className="text-2xl font-semibold text-white">Fresh Graduate Career Forecast</h3>
                  <p className="text-slate-400">Share your skills and we'll recommend the best career paths for you</p>
                </div>

                <form onSubmit={handleFresherSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                      <Zap className="w-4 h-4 inline mr-2" />
                      Your Skills (comma-separated)
                    </label>
                    <textarea
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      className="w-full p-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-slate-700/80 backdrop-blur-sm text-white placeholder-slate-400"
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
        <div className="grid md:grid-cols-3 gap-6 mt-8">
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
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-slide-in-up bg-slate-800/80 backdrop-blur-sm border border-slate-700"
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
        @keyframes bounceGentle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
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
        .animate-bounce-gentle {
          animation: bounceGentle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
