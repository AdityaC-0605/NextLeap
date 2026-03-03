"use client"

import type React from "react"
import { useState, useCallback, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AmbientParticles } from "@/components/ui/ambient-particles"
import { Upload, FileText, Brain, Target, Zap, CheckCircle, AlertCircle, Star, ArrowRight, Award, TrendingUp, Users } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { API_BASE } from "@/lib/api-base"
import { generateParticles } from "@/lib/particles"

const ROLES = [
  "Software Developer / Engineer",
  "Full Stack Developer",
  "Front-End Developer (React, Angular, etc.)",
  "Back-End Developer (Node.js, Django, Spring Boot, etc.)",
  "Mobile App Developer (Android/iOS)",
  "DevOps Engineer",
  "Site Reliability Engineer (SRE)",
  "Embedded Software Engineer",
  "Game Developer",
  "API Developer",
  "Software Architect",
  "Cloud Developer (AWS/GCP/Azure)",
  "Data Scientist",
  "Data Analyst",
  "Business Intelligence Analyst",
  "Machine Learning Engineer",
  "Data Engineer",
  "Big Data Engineer",
  "Decision Scientist",
  "AI/ML Research Scientist",
  "NLP Engineer",
  "Deep Learning Engineer",
  "Computer Vision Engineer",
  "MLOps Engineer",
  "Cybersecurity Analyst",
  "Security Engineer",
  "Penetration Tester / Ethical Hacker",
  "Security Architect",
  "Network Security Engineer",
  "SOC Analyst",
  "Information Security Analyst",
  "Cryptographer",
  "Cloud Solutions Architect",
  "Cloud Engineer",
  "System Administrator",
  "Network Engineer",
  "IT Infrastructure Engineer",
  "Database Administrator (DBA)",
  "Virtualization Engineer",
  "Storage Engineer",
  "Technical Support Engineer",
  "IT Support Specialist",
  "Help Desk Technician",
  "System Support Engineer",
  "Desktop Support Engineer",
  "QA Engineer",
  "Automation Test Engineer",
  "Manual Test Engineer",
  "Performance Tester",
  "SDET (Software Development Engineer in Test)",
  "Test Architect",
  "UI Developer",
  "UX Designer",
  "Web Developer",
  "Frontend Engineer",
  "Interaction Designer",
  "AI Research Scientist",
  "Robotics Engineer",
  "Quantum Computing Researcher",
  "Blockchain Developer",
  "AR/VR Developer",
  "Computer Vision Researcher",
  "Technical Program Manager (TPM)",
  "Engineering Manager",
  "Product Manager (Technical)",
  "IT Consultant",
]

const PARTICLES = generateParticles(15, 2)

// Max file size: 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024

export default function SkillGapAnalyzer() {
  const { toast } = useToast()
  const [file, setFile] = useState<File | null>(null)
  const [skills, setSkills] = useState<any>(null)
  const [step, setStep] = useState<1 | 2>(1)
  const [role, setRole] = useState("")
  const [match, setMatch] = useState<any>(null)
  const [error, setError] = useState("")
  const [aiAdvice, setAIAdvice] = useState<any>(null)
  const [finished, setFinished] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to match results when they appear
  useEffect(() => {
    if (match && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [match])

  // Safely render AI advice text (no dangerouslySetInnerHTML)
  const renderAdviceText = (text: string) => {
    if (!text) return null
    const paragraphs = text.split("\n\n")
    return paragraphs.map((para, i) => {
      const lines = para.split("\n")
      return (
        <p key={i} className="mb-3 text-slate-300 leading-relaxed">
          {lines.map((line, j) => (
            <span key={j}>
              {line}
              {j < lines.length - 1 && <br />}
            </span>
          ))}
        </p>
      )
    })
  }

  const validateFile = useCallback((f: File): boolean => {
    if (f.size > MAX_FILE_SIZE) {
      toast({ title: "File too large", description: "Maximum file size is 5MB", variant: "destructive" })
      return false
    }
    return true
  }, [toast])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      if (
        droppedFile.type === "application/pdf" ||
        droppedFile.name.endsWith(".pdf") ||
        droppedFile.name.endsWith(".docx")
      ) {
        if (validateFile(droppedFile)) {
          setFile(droppedFile)
        }
      }
    }
  }, [validateFile])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      if (validateFile(selectedFile)) {
        setFile(selectedFile)
      }
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setError("")
    setMatch(null)
    setSkills(null)
    setStep(1)
    setAIAdvice(null)
    setFinished(false)
    setIsAnalyzing(true)

    const formData = new FormData()
    formData.append("resume", file)

    try {
      const res = await fetch(`${API_BASE}/api/analyze-skills`, {
        method: "POST",
        body: formData,
      })
      if (!res.ok) throw new Error("Failed to analyze resume")
      const data = await res.json()
      setSkills(data.categorized_skills)
      setStep(1)
    } catch (err: any) {
      const msg = err.message || "Error"
      setError(msg)
      toast({ title: "Upload failed", description: msg, variant: "destructive" })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleNext = () => setStep(2)

  const handleRoleSelect = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setMatch(null)
    setAIAdvice(null)
    setFinished(false)
    setIsAnalyzing(true)

    if (!role) return

    try {
      const formData = new FormData()
      if (file) formData.append("resume", file)
      formData.append("target_role", role)

      const res = await fetch(`${API_BASE}/api/analyze-skills`, {
        method: "POST",
        body: formData,
      })
      if (!res.ok) throw new Error("Failed to analyze role match")
      const data = await res.json()
      setMatch(data.skill_match)
      setSkills(data.categorized_skills)
    } catch (err: any) {
      const msg = err.message || "Error"
      setError(msg)
      toast({ title: "Analysis failed", description: msg, variant: "destructive" })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleGetAIAdvice = async () => {
    setError("")
    setAIAdvice(null)
    setIsAnalyzing(true)

    try {
      // Prefer direct AI advice call if skills/missing skills are already known
      if (Array.isArray(match?.missing_skills) && match.missing_skills.length) {
        const res = await fetch(`${API_BASE}/api/ai-advice`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ missing_skills: match.missing_skills }),
        })
        if (!res.ok) throw new Error("Failed to get AI advice")
        const data = await res.json()
        setAIAdvice(data.advice)
      } else {
        // Fallback: re-run analyze-skills with gemini flag if missing_skills absent
        const formData = new FormData()
        if (file) formData.append("resume", file)
        if (role) formData.append("target_role", role)
        formData.append("gemini_advice", "true")
        const res = await fetch(`${API_BASE}/api/analyze-skills`, { method: "POST", body: formData })
        if (!res.ok) throw new Error("Failed to get AI advice")
        const data = await res.json()
        setAIAdvice(data.gemini_advice || data.advice)
      }
    } catch (err: any) {
      const msg = err.message || "Error"
      setError(msg)
      toast({ title: "AI advice failed", description: msg, variant: "destructive" })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const resetAnalysis = () => {
    setFile(null)
    setSkills(null)
    setStep(1)
    setRole("")
    setMatch(null)
    setError("")
    setAIAdvice(null)
    setFinished(false)
    setIsAnalyzing(false)
  }

  return (
    <div className="theme-surface min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <AmbientParticles particles={PARTICLES} />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 md:px-8 md:py-12 space-y-10 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 mb-10 animate-fade-in-up">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight leading-tight bg-gradient-to-r from-white via-teal-200 to-cyan-300 bg-clip-text text-transparent">
            AI Skill Gap Analyzer
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Upload your resume and discover the skills you need to land your dream role with AI-powered analysis.
          </p>
        </div>

        {/* Step 1: Upload Resume */}
        {!skills && !isAnalyzing && (
          <Card className="border-2 border-dashed border-slate-600 hover:border-teal-400 transition-colors duration-300 animate-fade-in-up premium-panel">
            <CardContent className="p-12">
              <form onSubmit={handleUpload}>
                <div
                  className={`text-center space-y-6 ${dragActive ? "scale-105" : ""} transition-transform duration-300`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="w-24 h-24 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-full flex items-center justify-center mx-auto animate-pulse-gentle">
                    <Upload className="w-12 h-12 text-teal-400" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight mb-2">Upload Your Resume</h3>
                    <p className="text-slate-300 mb-6">
                      Drag and drop your PDF or DOCX resume here, or click to browse files
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.docx"
                        onChange={handleFileChange}
                        required
                        className="hidden"
                      />
                      <Button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-8 py-3 hover:scale-105 transition-transform"
                      >
                        <FileText className="w-5 h-5 mr-2" />
                        Choose File
                      </Button>
                      {file && (
                        <Button
                          type="submit"
                          className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-3 hover:scale-105 transition-transform"
                        >
                          <Zap className="w-5 h-5 mr-2" />
                          Analyze Skills
                        </Button>
                      )}
                    </div>
                    {file && (
                      <div className="mt-4 p-4 bg-teal-900/50 rounded-lg border border-teal-600 animate-slide-in-up">
                        <div className="flex items-center justify-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-teal-400" />
                          <span className="text-teal-300 font-medium">{file.name}</span>
                          <span className="text-teal-400 text-sm">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-center space-x-6 text-sm text-slate-400">
                    <span className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-teal-400 mr-1" />
                      PDF & DOCX supported
                    </span>
                    <span className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-teal-400 mr-1" />
                      Secure & private
                    </span>
                    <span className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-teal-400 mr-1" />
                      Instant analysis
                    </span>
                  </div>
                </div>
              </form>

              {error && (
                <div className="mt-4 p-4 bg-red-900/50 border border-red-600 rounded-lg animate-slide-in-up">
                  <div className="flex items-center justify-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <span className="text-red-300">{error}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {isAnalyzing && (
          <Card className="border-0 shadow-lg animate-fade-in-up premium-panel">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className="w-24 h-24 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto animate-pulse-gentle">
                  <Brain className="w-12 h-12 text-white animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight mb-2">Analyzing Your Skills</h3>
                  <p className="text-slate-300 mb-6">Our AI is processing your resume and analyzing skill gaps...</p>
                  <div className="max-w-md mx-auto">
                    <Progress value={75} className="h-3 mb-2" />
                    <p className="text-sm text-slate-400">Processing...</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Skills Results */}
        {skills && step === 1 && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-teal-200 to-cyan-300 bg-clip-text text-transparent">
                Extracted Skills
              </h2>
              <Button
                onClick={resetAnalysis}
                variant="outline"
                className="hover:scale-105 transition-transform border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-slate-900 bg-transparent"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload New Resume
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(skills).map(([category, skillList], index) => (
                <Card
                  key={category}
                  className="border-0 shadow-lg hover-lift animate-slide-in-up premium-panel"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg text-white">
                      <div className="w-8 h-8 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center mr-3">
                        <Star className="w-4 h-4 text-teal-400" />
                      </div>
                      {category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {(skillList as string[]).map((skill, skillIndex) => (
                        <Badge
                          key={skill}
                          className="bg-teal-500/20 text-teal-300 hover:bg-teal-500/30 transition-colors animate-bounce-gentle border border-teal-500/50"
                          style={{ animationDelay: `${skillIndex * 0.05}s` }}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-8 py-3 hover:scale-105 transition-transform"
              >
                Next: Select Target Role
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Role Selection and Analysis */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in-up">
            <Card className="border-0 shadow-lg premium-panel">
              <CardHeader>
                <CardTitle className="flex items-center text-xl md:text-2xl tracking-tight text-white">
                  <Target className="w-6 h-6 mr-3 text-teal-400" />
                  Select Your Target Role
                </CardTitle>
                <CardDescription className="text-lg text-slate-300">
                  Choose the role you&apos;re aiming for to get personalized skill gap analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRoleSelect} className="space-y-4">
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="field-select"
                    required
                  >
                    <option value="">Select a role...</option>
                    {ROLES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white py-3 hover:scale-105 transition-transform"
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <>
                        <Brain className="w-5 h-5 mr-2 animate-pulse" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5 mr-2" />
                        Analyze Role Match
                      </>
                    )}
                  </Button>
                </form>

                {error && (
                  <div className="mt-4 p-4 bg-red-900/50 border border-red-600 rounded-lg animate-slide-in-up">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5 text-red-400" />
                      <span className="text-red-300">{error}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Match Results */}
            {match && (
              <div ref={resultsRef} className="space-y-6 animate-slide-in-up">
                <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent text-center">
                  Skill Match Analysis for {role}
                </h2>

                {/* Match Percentage Visualization */}
                {typeof match.match_percentage === "number" && (
                  <div className="flex justify-center animate-fade-in-up">
                    <Card className="border-0 shadow-lg premium-panel px-8 py-6">
                      <div className="flex items-center gap-8">
                        <div className="relative w-28 h-28">
                          <svg className="w-28 h-28 -rotate-90" viewBox="0 0 120 120">
                            <circle cx="60" cy="60" r="52" stroke="currentColor" strokeWidth="10" fill="none" className="text-slate-700" />
                            <circle
                              cx="60" cy="60" r="52"
                              stroke="url(#matchGradient)" strokeWidth="10" fill="none"
                              strokeLinecap="round"
                              strokeDasharray={`${(match.match_percentage / 100) * 2 * Math.PI * 52} ${2 * Math.PI * 52}`}
                              className="transition-all duration-1000 ease-out"
                            />
                            <defs>
                              <linearGradient id="matchGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#14b8a6" />
                                <stop offset="100%" stopColor="#06b6d4" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-bold text-white">{match.match_percentage.toFixed(0)}%</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-lg font-semibold text-white">Overall Match</p>
                          <p className="text-sm text-slate-400">
                            {match.matched_skills.length} of {match.matched_skills.length + match.missing_skills.length} required skills
                          </p>
                          <Badge className={`mt-1 ${match.match_percentage >= 75
                            ? "bg-emerald-500/20 text-emerald-300 border-emerald-500"
                            : match.match_percentage >= 50
                              ? "bg-amber-500/20 text-amber-300 border-amber-500"
                              : "bg-red-500/20 text-red-300 border-red-500"
                            }`}>
                            {match.match_percentage >= 75 ? "Strong Match" : match.match_percentage >= 50 ? "Moderate Match" : "Needs Development"}
                          </Badge>
                        </div>
                      </div>
                    </Card>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Matched Skills */}
                  <Card className="border-0 shadow-lg bg-gradient-to-r from-teal-900/50 to-emerald-900/50 animate-slide-in-left border border-teal-600">
                    <CardHeader>
                      <CardTitle className="flex items-center text-teal-300">
                        <CheckCircle className="w-6 h-6 mr-3" />
                        Matched Skills ({match.matched_skills.length})
                      </CardTitle>
                      <CardDescription className="text-slate-400">
                        Skills you already have for this role
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {match.matched_skills.map((skill: string, index: number) => (
                          <div
                            key={skill}
                            className="flex items-center p-3 bg-slate-800 rounded-lg shadow-sm animate-bounce-gentle border border-slate-700"
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            <CheckCircle className="w-5 h-5 text-teal-400 mr-3 flex-shrink-0" />
                            <span className="text-slate-300 font-medium">{skill}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Missing Skills */}
                  <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-900/50 to-red-900/50 animate-slide-in-right border border-orange-600">
                    <CardHeader>
                      <CardTitle className="flex items-center text-orange-300">
                        <AlertCircle className="w-6 h-6 mr-3" />
                        Missing Skills ({match.missing_skills.length})
                      </CardTitle>
                      <CardDescription className="text-slate-400">
                        Skills you need to develop for this role
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {match.missing_skills.map((skill: string, index: number) => (
                          <div
                            key={skill}
                            className="flex items-center p-3 bg-slate-800 rounded-lg shadow-sm animate-pulse-gentle border border-slate-700"
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            <AlertCircle className="w-5 h-5 text-orange-400 mr-3 flex-shrink-0" />
                            <span className="text-slate-300 font-medium">{skill}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* AI Recommendations — Single-step flow */}
                {!aiAdvice && !finished && (
                  <Card className="border-0 shadow-lg premium-panel animate-fade-in-up">
                    <CardContent className="p-8 text-center">
                      <div className="space-y-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto">
                          <Brain className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight">Get AI-Powered Learning Recommendations</h3>
                        <p className="text-slate-300 max-w-xl mx-auto leading-relaxed">
                          Our AI can provide personalized learning paths and resources to help you acquire the missing
                          skills for your target role.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                          <Button
                            onClick={handleGetAIAdvice}
                            disabled={isAnalyzing}
                            className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-8 py-3 hover:scale-105 transition-transform"
                          >
                            {isAnalyzing ? (
                              <>
                                <Brain className="w-5 h-5 mr-2 animate-pulse" />
                                Generating Recommendations...
                              </>
                            ) : (
                              <>
                                <Brain className="w-5 h-5 mr-2" />
                                Get AI Recommendations
                              </>
                            )}
                          </Button>
                          <Button
                            onClick={() => setFinished(true)}
                            variant="outline"
                            className="px-8 py-3 hover:scale-105 transition-transform border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                          >
                            No, I&apos;m Done
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* AI Advice Results */}
                {aiAdvice && (
                  <div className="space-y-6 animate-fade-in-up">
                    <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent text-center">
                      AI Learning Recommendations
                    </h2>

                    <div className="grid gap-6">
                      {Object.entries(aiAdvice).map(([skill, advice], index) => (
                        <Card
                          key={skill}
                          className="border-0 shadow-lg hover-lift animate-slide-in-up premium-panel"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <CardHeader>
                            <CardTitle className="flex items-center text-teal-300">
                              <div className="w-8 h-8 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center mr-3">
                                <Award className="w-5 h-5 text-teal-400" />
                              </div>
                              {skill}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="prose prose-base max-w-none" style={{ lineHeight: "1.6" }}>
                              {renderAdviceText(advice as string)}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Cross-feature navigation */}
                    <Card className="border-0 shadow-lg premium-panel animate-fade-in-up">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold text-white mb-4 text-center">Continue Your Career Journey</h3>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                          <Link href="/career-forecasting">
                            <Button className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-6 py-3 hover:scale-105 transition-transform">
                              <TrendingUp className="w-4 h-4 mr-2" />
                              Get Career Forecast
                            </Button>
                          </Link>
                          <Link href="/cultural-match">
                            <Button
                              variant="outline"
                              className="px-6 py-3 border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent hover:scale-105 transition-transform"
                            >
                              <Users className="w-4 h-4 mr-2" />
                              Find Cultural Matches
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {finished && (
                  <Card className="border-0 shadow-lg bg-gradient-to-r from-teal-900/50 to-emerald-900/50 animate-fade-in-up border border-teal-600">
                    <CardContent className="p-8 text-center">
                      <div className="space-y-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto">
                          <CheckCircle className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-teal-300">Analysis Complete!</h3>
                        <p className="text-slate-300">
                          Thank you for using the AI Skill Gap Analyzer. Good luck with your career journey!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                          <Button
                            onClick={resetAnalysis}
                            className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-8 py-3 hover:scale-105 transition-transform"
                          >
                            <Upload className="w-5 h-5 mr-2" />
                            Analyze Another Resume
                          </Button>
                          <Link href="/career-forecasting">
                            <Button
                              variant="outline"
                              className="px-8 py-3 border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent hover:scale-105 transition-transform"
                            >
                              <TrendingUp className="w-5 h-5 mr-2" />
                              Try Career Forecasting
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
