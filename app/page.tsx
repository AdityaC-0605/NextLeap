"use client"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Brain,
  Target,
  TrendingUp,
  Users,
  FileText,
  Upload,
  Zap,
  CheckCircle,
  Linkedin,
  Twitter,
  Mail,
  Star,
  Sparkles,
  ChevronRight,
  Play,
  Award,
  BarChart3,
  Lightbulb,
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState<
    Array<{
      left: string
      top: string
      delay: string
      duration: string
      size: string
      opacity: string
    }>
  >([])

  useEffect(() => {
    setIsVisible(true)

    // Generate premium particles with teal/cyan theme
    const newParticles = [...Array(15)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${20 + Math.random() * 30}s`,
      size: `${2 + Math.random() * 4}px`,
      opacity: `${0.2 + Math.random() * 0.4}`,
    }))
    setParticles(newParticles)

    // Mouse tracking for interactive effects
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-teal-800 relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 via-transparent to-cyan-900/20" />

        {/* Floating Particles */}
        <div className="floating-particles">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-cyan-400/40 to-teal-400/40 animate-particle-float"
              style={{
                left: particle.left,
                top: particle.top,
                width: particle.size,
                height: particle.size,
                opacity: particle.opacity,
                animationDelay: particle.delay,
                animationDuration: particle.duration,
              }}
            />
          ))}
        </div>

        {/* Interactive Light Effect */}
        <div
          className="absolute w-96 h-96 bg-gradient-radial from-teal-400/20 to-transparent rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
      </div>

      {/* Premium Navigation */}
      <nav className="glass-nav-dark sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3 animate-slide-in-blur">
              <div className="w-9 h-9 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg animate-glow-teal">
                <Brain className="w-5 h-5 text-slate-900" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-teal-100 bg-clip-text text-transparent">
                NextLeap
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8 animate-slide-in-blur-right">
              {[
                { href: "/career-forecasting", label: "Career Forecasting" },
                { href: "/skill-gap", label: "Skill Analysis" },
                { href: "/cultural-match", label: "Culture Match" },
                { href: "#about", label: "About" },
              ].map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-slate-300 hover:text-teal-400 transition-all duration-200 font-medium text-sm relative group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-cyan-400 transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}

              <Button
                variant="outline"
                size="sm"
                className="glass-card-dark border-teal-400/30 hover:border-teal-400 hover:bg-teal-400/10 text-teal-400 transition-all duration-200 font-medium focus-ring animate-button-press"
              >
                Get Started
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Premium Design */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div
              className={`space-y-10 transition-all duration-1000 ${isVisible ? "animate-fade-in-scale" : "opacity-0"}`}
            >
              <div className="space-y-8">
                <Badge className="bg-gradient-to-r from-teal-500/20 to-cyan-500/20 text-teal-300 hover:from-teal-500/30 hover:to-cyan-500/30 transition-all duration-300 border border-teal-400/30 font-semibold px-4 py-2 text-sm shadow-sm animate-shimmer">
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI-Powered Career Intelligence
                </Badge>

                <h1 className="text-responsive-xl font-bold text-white leading-tight tracking-tight">
                  Transform Your Career with{" "}
                  <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent animate-text-shimmer">
                    AI Precision
                  </span>
                </h1>

                <p className="text-xl text-slate-300 leading-relaxed max-w-xl font-medium">
                  NextLeap leverages cutting-edge AI and machine learning to deliver hyper-personalized career
                  recommendations, intelligent skill gap analysis, and perfect company culture matches.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/career-forecasting">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-slate-900 px-8 py-4 font-bold transition-all duration-300 shadow-premium hover:shadow-premium-lg focus-ring animate-button-press group"
                  >
                    Get Career Recommendations
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>
                </Link>

                <Link href="/skill-gap">
                  <Button
                    variant="outline"
                    size="lg"
                    className="glass-card-dark border-slate-400/30 hover:border-teal-400 hover:bg-teal-400/10 text-slate-300 hover:text-teal-400 px-8 py-4 font-semibold transition-all duration-300 focus-ring animate-button-press group"
                  >
                    <Upload className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                    Analyze Resume
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-8 text-sm text-slate-400">
                {[
                  { icon: CheckCircle, text: "Free Analysis", delay: "0.5s" },
                  { icon: Zap, text: "Instant Results", delay: "0.7s" },
                  { icon: Star, text: "AI-Powered", delay: "0.9s" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 animate-slide-in-blur"
                    style={{ animationDelay: item.delay }}
                  >
                    <item.icon className="w-5 h-5 text-emerald-400" />
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Premium Hero Card */}
            <div
              className={`relative transition-all duration-1000 delay-300 ${isVisible ? "animate-fade-in-scale" : "opacity-0"}`}
            >
              <div className="glass-card-dark rounded-3xl p-8 shadow-premium-lg hover:shadow-glow-teal transition-all duration-500 animate-float-soft border border-teal-400/20">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl flex items-center justify-center shadow-lg animate-glow-teal">
                      <Target className="w-6 h-6 text-slate-900" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg">Perfect Match Found!</h3>
                      <p className="text-slate-300 font-medium">Senior Product Manager at TechCorp</p>
                    </div>
                    <Badge className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-300 border-emerald-400/30 font-semibold">
                      <Award className="w-3 h-3 mr-1" />
                      Top 1%
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300 font-medium">AI Match Score</span>
                      <span className="font-bold text-emerald-400 text-xl">94%</span>
                    </div>

                    <div className="relative">
                      <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
                        <div className="bg-gradient-to-r from-emerald-400 to-teal-400 h-3 rounded-full animate-progress-fill shadow-sm" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {[
                      { text: "Remote", color: "blue" },
                      { text: "$140k-180k", color: "emerald" },
                      { text: "Growth Stage", color: "teal" },
                      { text: "Equity", color: "amber" },
                    ].map((badge, index) => (
                      <Badge
                        key={index}
                        className="text-xs bg-slate-700/50 text-slate-300 border-slate-600/50 font-medium hover:bg-slate-600/50 transition-colors duration-200"
                      >
                        {badge.text}
                      </Badge>
                    ))}
                  </div>

                  <Button className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-slate-900 font-bold transition-all duration-200 animate-button-press">
                    <Play className="w-4 h-4 mr-2" />
                    View Full Analysis
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-slate-800/50 to-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16 animate-fade-in-scale">
            <Badge className="bg-gradient-to-r from-teal-500/20 to-cyan-500/20 text-teal-300 border-teal-400/30 font-semibold px-4 py-2">
              <BarChart3 className="w-4 h-4 mr-2" />
              Intelligent Platform
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Next-Generation Career Intelligence
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed">
              Powered by advanced AI, machine learning, and natural language processing to deliver unprecedented career
              insights and recommendations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "AI Career Forecasting",
                desc: "Advanced machine learning algorithms analyze global market trends, salary data, and career trajectories to predict your optimal next moves.",
                iconColor: "text-teal-400",
                iconBg: "from-teal-500/80 to-cyan-500/80",
                glowColor: "shadow-teal-500/20",
                delay: "0s",
              },
              {
                icon: Target,
                title: "Precision Role Matching",
                desc: "Sophisticated matching algorithms evaluate 200+ factors including skills, experience, preferences, and market demand for perfect role alignment.",
                iconColor: "text-emerald-400",
                iconBg: "from-emerald-500/80 to-green-500/80",
                glowColor: "shadow-emerald-500/20",
                delay: "0.1s",
              },
              {
                icon: Zap,
                title: "Intelligent Skill Analysis",
                desc: "Deep learning models identify skill gaps, predict future skill demands, and create personalized learning roadmaps for career acceleration.",
                iconColor: "text-cyan-400",
                iconBg: "from-cyan-500/80 to-blue-500/80",
                glowColor: "shadow-cyan-500/20",
                delay: "0.2s",
              },
              {
                icon: Users,
                title: "Cultural DNA Matching",
                desc: "Natural language processing analyzes company cultures, values, and work environments to find your perfect cultural fit.",
                iconColor: "text-amber-400",
                iconBg: "from-amber-500/80 to-orange-500/80",
                glowColor: "shadow-amber-500/20",
                delay: "0.3s",
              },
              {
                icon: FileText,
                title: "Resume Intelligence Engine",
                desc: "Advanced document parsing and semantic analysis extract deep insights from your resume to unlock hidden career opportunities.",
                iconColor: "text-rose-400",
                iconBg: "from-rose-500/80 to-pink-500/80",
                glowColor: "shadow-rose-500/20",
                delay: "0.4s",
              },
              {
                icon: Brain,
                title: "Predictive Career Analytics",
                desc: "Proprietary algorithms predict salary growth, promotion timelines, and career satisfaction based on millions of data points.",
                iconColor: "text-indigo-400",
                iconBg: "from-indigo-500/80 to-purple-500/80",
                glowColor: "shadow-indigo-500/20",
                delay: "0.5s",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className={`bg-slate-800/90 border-slate-600/50 shadow-premium hover:shadow-premium-lg hover:${feature.glowColor} transition-all duration-500 hover:-translate-y-2 animate-card-hover group cursor-pointer animate-fade-in-scale backdrop-blur-sm`}
                style={{ animationDelay: feature.delay }}
              >
                <CardHeader className="pb-6">
                  <div
                    className={`w-14 h-14 bg-gradient-to-r ${feature.iconBg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg border border-slate-500/30`}
                  >
                    <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-100 group-hover:text-teal-300 transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-slate-200 leading-relaxed font-medium">
                    {feature.desc}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Premium How It Works */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-slate-900/50 to-blue-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16 animate-fade-in-scale">
            <Badge className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-300 border-emerald-400/30 font-semibold px-4 py-2">
              <Lightbulb className="w-4 h-4 mr-2" />
              How It Works
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Three Steps to Career Excellence
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed">
              Our AI-powered platform transforms your career journey in three intelligent steps
            </p>
          </div>

          <div className="relative">
            {/* Premium Progress Line */}
            <div className="hidden md:block absolute top-12 left-1/2 transform -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-teal-400/30 via-cyan-400/30 to-emerald-400/30 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 rounded-full animate-shimmer" />
            </div>

            <div className="grid md:grid-cols-3 gap-12 relative">
              {[
                {
                  icon: Upload,
                  title: "Upload & Analyze",
                  desc: "Upload your resume or create a detailed profile. Our advanced AI instantly analyzes your experience, skills, education, and career preferences using state-of-the-art NLP.",
                  iconBg: "from-teal-500 to-cyan-500",
                  delay: "0s",
                },
                {
                  icon: Brain,
                  title: "AI Processing",
                  desc: "Our machine learning algorithms process your data against millions of career paths, real-time market trends, and industry insights to generate hyper-personalized recommendations.",
                  iconBg: "from-cyan-500 to-blue-500",
                  delay: "0.3s",
                },
                {
                  icon: Target,
                  title: "Smart Recommendations",
                  desc: "Receive data-driven career transitions, strategic skill development paths, perfect company culture matches, and actionable insights to accelerate your growth.",
                  iconBg: "from-emerald-500 to-teal-500",
                  delay: "0.6s",
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className="text-center space-y-6 animate-fade-in-scale"
                  style={{ animationDelay: step.delay }}
                >
                  <div
                    className={`w-20 h-20 bg-gradient-to-r ${step.iconBg} rounded-3xl flex items-center justify-center mx-auto hover:scale-110 transition-transform duration-300 shadow-premium-lg animate-glow-teal`}
                  >
                    <step.icon className="w-10 h-10 text-slate-900" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white">
                      {index + 1}. {step.title}
                    </h3>
                    <p className="text-slate-300 leading-relaxed font-medium max-w-sm mx-auto">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Premium Tools Showcase */}
      <section className="py-20 bg-gradient-to-b from-slate-800/50 to-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16 animate-fade-in-scale">
            <Badge className="bg-gradient-to-r from-cyan-500/20 to-teal-500/20 text-cyan-300 border-cyan-400/30 font-semibold px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              AI-Powered Tools
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Professional Career Acceleration
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed">
              Specialized AI tools designed to transform your career trajectory and unlock your full potential
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Career Forecasting",
                desc: "AI-powered role recommendations, salary predictions, and career trajectory analysis based on real-time market intelligence",
                icon: TrendingUp,
                link: "/career-forecasting",
                iconColor: "text-teal-400",
                iconBg: "from-teal-500/80 to-cyan-500/80",
                buttonColor: "from-teal-500 to-cyan-500",
                glowColor: "shadow-teal-500/20",
                features: ["Smart Role Matching", "Salary Intelligence", "Career Path Optimization"],
              },
              {
                title: "Skill Gap Analysis",
                desc: "Comprehensive skill assessment with AI-generated learning recommendations and market-aligned skill development strategies",
                icon: Zap,
                link: "/skill-gap",
                iconColor: "text-cyan-400",
                iconBg: "from-cyan-500/80 to-blue-500/80",
                buttonColor: "from-cyan-500 to-blue-500",
                glowColor: "shadow-cyan-500/20",
                features: ["Deep Skills Assessment", "Personalized Learning Paths", "Market Demand Analysis"],
              },
              {
                title: "Cultural Match",
                desc: "Advanced NLP-powered company culture analysis to find workplaces that perfectly align with your values and work style",
                icon: Users,
                link: "/cultural-match",
                iconColor: "text-emerald-400",
                iconBg: "from-emerald-500/80 to-green-500/80",
                buttonColor: "from-emerald-500 to-green-500",
                glowColor: "shadow-emerald-500/20",
                features: ["Culture DNA Matching", "Values Alignment", "Work Environment Analysis"],
              },
            ].map((tool, index) => (
              <Card
                key={index}
                className={`bg-slate-800/90 border-slate-600/50 shadow-premium hover:shadow-premium-lg hover:${tool.glowColor} transition-all duration-500 hover:-translate-y-2 animate-card-hover group cursor-pointer animate-fade-in-scale backdrop-blur-sm`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-4">
                  <div
                    className={`w-14 h-14 bg-gradient-to-r ${tool.iconBg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg border border-slate-600/30`}
                  >
                    <tool.icon className={`w-7 h-7 ${tool.iconColor}`} />
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-100 group-hover:text-teal-300 transition-colors duration-300">
                    {tool.title}
                  </CardTitle>
                  <CardDescription className="text-slate-200 leading-relaxed font-medium">{tool.desc}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {tool.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-slate-200 font-medium">
                        <CheckCircle className="w-4 h-4 text-emerald-400 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href={tool.link}>
                    <Button
                      className={`w-full bg-gradient-to-r ${tool.buttonColor} hover:opacity-90 text-slate-900 group-hover:scale-105 transition-all duration-300 shadow-lg font-bold animate-button-press`}
                    >
                      Launch {tool.title}
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-yellow-600/20" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="space-y-8 animate-fade-in-scale">

            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
              Ready to Transform Your Career?
            </h2>

            <p className="text-xl text-slate-800 max-w-3xl mx-auto font-medium leading-relaxed">
              Join thousands of professionals who have accelerated their careers with NextLeap's intelligent
              recommendations and data-driven insights.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/career-forecasting">
                <Button
                  size="lg"
                  className="bg-slate-900 text-white hover:bg-slate-800 px-10 py-4 text-lg font-bold shadow-premium-lg hover:shadow-glow transition-all duration-300 animate-button-press group"
                >
                  Get Career Recommendations
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </Link>

              <Button
                variant="outline"
                size="lg"
                className="border-slate-800/30 text-slate-900 hover:bg-slate-900/10 px-10 py-4 text-lg font-bold backdrop-blur-sm transition-all duration-300 animate-button-press"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center justify-center space-x-8 text-slate-800 text-sm font-medium">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Free analysis</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Instant results</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>No credit card required</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-6 animate-slide-in-blur">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg">
                  <Brain className="w-5 h-5 text-slate-900" />
                </div>
                <span className="text-xl font-bold text-white">NextLeap</span>
              </div>
              <p className="text-slate-400 leading-relaxed font-medium">
                AI-powered career intelligence platform helping professionals make smarter career decisions and
                accelerate their growth.
              </p>
              <div className="flex space-x-4">
                {[Twitter, Linkedin, Mail].map((Icon, index) => (
                  <Link
                    key={index}
                    href="#"
                    className="w-10 h-10 bg-slate-800 hover:bg-teal-600 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                  >
                    <Icon className="w-4 h-4" />
                  </Link>
                ))}
              </div>
            </div>

            {[
              {
                title: "Product",
                links: ["Features", "How It Works", "Pricing", "API", "Integrations"],
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers", "Contact", "Press"],
              },
              {
                title: "Legal",
                links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR", "Security"],
              },
            ].map((section, index) => (
              <div
                key={index}
                className="space-y-6 animate-fade-in-scale"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="font-bold text-white text-lg">{section.title}</h3>
                <ul className="space-y-3 text-slate-400">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href="#"
                        className="hover:text-teal-400 transition-colors duration-200 font-medium hover:translate-x-1 transform inline-block"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center animate-fade-in-scale">
            <p className="text-slate-400 font-medium">© 2024 NextLeap. All rights reserved.</p>
            <p className="text-slate-500 text-sm mt-4 md:mt-0">Made with ❤️ for career growth</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .glass-nav-dark {
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(20, 184, 166, 0.2);
        }

        .glass-card-dark {
          background: rgba(30, 41, 59, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(71, 85, 105, 0.3);
        }

        .animate-glow-teal {
          animation: glowTeal 3s ease-in-out infinite;
        }

        .shadow-glow-teal {
          box-shadow: 0 0 40px rgba(20, 184, 166, 0.3);
        }

        @keyframes glowTeal {
          0%, 100% {
            box-shadow: 0 0 20px rgba(20, 184, 166, 0.4);
          }
          50% {
            box-shadow: 0 0 30px rgba(20, 184, 166, 0.6);
          }
        }
      `}</style>
    </div>
  )
}
