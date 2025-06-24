"use client"

import type React from "react"
import { useState } from "react"
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
    } catch (err: any) {
      setError(err.message || "Failed to get recommendations")
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
    } catch (err: any) {
      setError(err.message || "Failed to get recommendations")
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="floating-particles">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-15 animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: `${10 + Math.random() * 20}s`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-6 space-y-6 relative z-10">
          {/* Header */}
          <div className="text-center space-y-4 mb-8 animate-fade-in-up">
            <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Your Career Forecast
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              AI-powered recommendations tailored to your profile
            </p>
          </div>

          {/* Back Button */}
          <div className="flex justify-center mb-6">
            <Button
              onClick={resetForm}
              variant="outline"
              className="hover:scale-105 transition-transform animate-slide-in-up"
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
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] animate-slide-in-up bg-white/80 backdrop-blur-sm"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-lg flex items-center justify-center">
                        <Target className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-gray-900">{rec.next_role}</CardTitle>
                        <CardDescription>Recommended career path</CardDescription>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Growth Opportunity
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Salary Information */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Predicted Salary</p>
                            <p className="text-xl font-bold text-green-700">₹{rec.predicted_salary.toFixed(2)} LPA</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {typeof rec.salary_increase === "number" && !isNaN(rec.salary_increase) && (
                      <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <TrendingUp className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Salary Increase</p>
                              <p className="text-xl font-bold text-blue-700">₹{rec.salary_increase.toFixed(2)} LPA</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>

                  {/* Skills to Learn */}
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <Zap className="w-5 h-5 text-purple-600" />
                      <h4 className="text-lg font-semibold text-gray-900">Skills to Learn</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {rec.skills_to_learn.split(",").map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          className="bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors animate-bounce-gentle border border-slate-200"
                          style={{ animationDelay: `${skillIndex * 0.1}s` }}
                        >
                          <Star className="w-3 h-3 mr-1" />
                          {skill.trim()}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                    <Button className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white">
                      <Award className="w-4 h-4 mr-2" />
                      Start Learning Path
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Users className="w-4 h-4 mr-2" />
                      Find Companies
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Summary Card */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-slate-50 to-indigo-50 animate-fade-in-up">
            <CardContent className="p-8 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">Ready to Take the Next Step?</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  These recommendations are based on current market trends and your profile. Start building the skills
                  you need to advance your career.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Button className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white px-8 py-3">
                    <Target className="w-4 h-4 mr-2" />
                    Create Learning Plan
                  </Button>
                  <Button variant="outline" className="px-8 py-3">
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-particles">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-15 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${10 + Math.random() * 20}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 mb-8 animate-fade-in-up">
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-800 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Career Forecasting
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get AI-powered career recommendations based on your experience and skills
          </p>
        </div>

        {/* Main Form Card */}
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm animate-fade-in-up">
          <CardContent className="p-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 bg-gray-100 rounded-lg p-1">
                <TabsTrigger
                  value="experienced"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white"
                >
                  <Briefcase className="w-4 h-4 mr-2" />
                  Experienced Professional
                </TabsTrigger>
                <TabsTrigger
                  value="fresher"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white"
                >
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Fresh Graduate
                </TabsTrigger>
              </TabsList>

              {/* Experienced Form */}
              <TabsContent value="experienced" className="space-y-6">
                <div className="text-center space-y-2 mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900">Professional Career Forecast</h3>
                  <p className="text-gray-600">
                    Tell us about your current role and experience to get personalized recommendations
                  </p>
                </div>

                <form onSubmit={handleExperiencedSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        <Briefcase className="w-4 h-4 inline mr-2" />
                        Current Role
                      </label>
                      <input
                        type="text"
                        value={currentRole}
                        onChange={(e) => setCurrentRole(e.target.value)}
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-white/80 backdrop-blur-sm"
                        required
                        placeholder="e.g., Software Developer"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        <TrendingUp className="w-4 h-4 inline mr-2" />
                        Years of Experience
                      </label>
                      <input
                        type="number"
                        value={yearsExperience}
                        onChange={(e) => setYearsExperience(e.target.value)}
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-white/80 backdrop-blur-sm"
                        required
                        min={0}
                        placeholder="e.g., 3"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        <GraduationCap className="w-4 h-4 inline mr-2" />
                        Education Level
                      </label>
                      <select
                        value={education}
                        onChange={(e) => setEducation(e.target.value)}
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-white/80 backdrop-blur-sm"
                      >
                        <option value="Bachelors">Bachelor's Degree</option>
                        <option value="Masters">Master's Degree</option>
                        <option value="PhD">PhD</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        <DollarSign className="w-4 h-4 inline mr-2" />
                        Current Salary (LPA)
                      </label>
                      <input
                        type="number"
                        value={currentSalary}
                        onChange={(e) => setCurrentSalary(e.target.value)}
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-white/80 backdrop-blur-sm"
                        required
                        min={0}
                        placeholder="e.g., 12"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-3 text-lg hover:scale-105 transition-transform"
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
                  <h3 className="text-2xl font-semibold text-gray-900">Fresh Graduate Career Forecast</h3>
                  <p className="text-gray-600">Share your skills and we'll recommend the best career paths for you</p>
                </div>

                <form onSubmit={handleFresherSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      <Zap className="w-4 h-4 inline mr-2" />
                      Your Skills (comma-separated)
                    </label>
                    <textarea
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-white/80 backdrop-blur-sm"
                      rows={6}
                      placeholder="e.g., Python, JavaScript, React, SQL, Machine Learning, Data Analysis"
                      required
                    />
                    <p className="text-sm text-gray-500">List all your technical and soft skills separated by commas</p>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white py-3 text-lg hover:scale-105 transition-transform"
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
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg animate-slide-in-up">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <span className="text-red-700 font-medium">Error</span>
                </div>
                <p className="text-red-600 mt-1">{error}</p>
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
              color: "blue",
            },
            {
              icon: TrendingUp,
              title: "Salary Predictions",
              desc: "Accurate salary forecasts based on industry data",
              color: "green",
            },
            {
              icon: Target,
              title: "Skill Recommendations",
              desc: "Personalized learning paths to advance your career",
              color: "purple",
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-slide-in-up bg-white/80 backdrop-blur-sm"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center">
                <div
                  className={`w-12 h-12 bg-gradient-to-r from-${feature.color}-100 to-${feature.color}-200 rounded-lg flex items-center justify-center mx-auto mb-4`}
                >
                  <feature.icon className={`w-6 h-6 text-${feature.color}-600`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
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
