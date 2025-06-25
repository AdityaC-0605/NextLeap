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
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [particles, setParticles] = useState<Array<{ left: string; top: string; delay: string; duration: string }>>([])

  useEffect(() => {
    setIsVisible(true)

    // Generate particles only on client side to avoid hydration mismatch
    const newParticles = [...Array(15)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${10 + Math.random() * 20}s`,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50/30 to-purple-50/20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-particles">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 bg-gradient-to-r from-sky-300/40 to-purple-300/40 rounded-full opacity-60 animate-float"
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

      {/* Navigation */}
      <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 animate-slide-in-left">
              <div className="w-8 h-8 bg-gradient-to-r from-sky-400 to-purple-400 rounded-lg flex items-center justify-center animate-pulse-gentle shadow-sm">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-700">NextLeap</span>
            </div>
            <div className="hidden md:flex items-center space-x-8 animate-slide-in-right">
              <Link
                href="/career-forecasting"
                className="text-gray-600 hover:text-sky-600 transition-colors duration-300 hover:scale-105 transform font-medium"
              >
                Career Forecasting
              </Link>
              <Link
                href="/skill-gap"
                className="text-gray-600 hover:text-sky-600 transition-colors duration-300 hover:scale-105 transform font-medium"
              >
                Skill Gap Analysis
              </Link>
              <Link
                href="/cultural-match"
                className="text-gray-600 hover:text-sky-600 transition-colors duration-300 hover:scale-105 transform font-medium"
              >
                Culture Match
              </Link>
              <Link
                href="#about"
                className="text-gray-600 hover:text-sky-600 transition-colors duration-300 hover:scale-105 transform font-medium"
              >
                About
              </Link>
              <Button
                variant="outline"
                className="bg-white text-gray-600 border-gray-200 hover:bg-sky-50 hover:border-sky-200 hover:text-sky-600 transition-all duration-300 hover:scale-105 transform shadow-sm"
              >
                Try Now
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              className={`space-y-8 transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-10"}`}
            >
              <div className="space-y-4">
                <Badge className="bg-gradient-to-r from-sky-100 to-purple-100 text-sky-700 hover:from-sky-200 hover:to-purple-200 transition-all duration-300 animate-bounce-gentle border-sky-200 font-medium shadow-sm">
                  ✨ AI-Powered Career Intelligence
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 leading-tight">
                  AI-Powered Career{" "}
                  <span className="bg-gradient-to-r from-sky-500 via-purple-500 to-emerald-500 bg-clip-text text-transparent animate-gradient">
                    Intelligence Platform
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                  NextLeap leverages advanced AI, machine learning, and NLP to provide personalized career
                  recommendations, skill gap analysis, and company culture matches tailored to your unique profile.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/career-forecasting">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-sky-400 to-purple-400 hover:from-sky-500 hover:to-purple-500 text-white px-8 py-3 animate-pulse-cta hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
                  >
                    Start Career Analysis
                    <ArrowRight className="ml-2 w-5 h-5 animate-bounce-x" />
                  </Button>
                </Link>
                <Link href="/skill-gap">
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-white text-gray-600 border-gray-200 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-600 px-8 py-3 hover:scale-105 transform transition-all duration-300 shadow-sm font-medium"
                  >
                    Analyze Skills →
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-1 animate-slide-in-left" style={{ animationDelay: "0.5s" }}>
                  <CheckCircle className="w-4 h-4 text-emerald-400 animate-pulse-gentle" />
                  <span>Free to start</span>
                </div>
                <div className="flex items-center space-x-1 animate-slide-in-left" style={{ animationDelay: "0.7s" }}>
                  <CheckCircle className="w-4 h-4 text-emerald-400 animate-pulse-gentle" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-1 animate-slide-in-left" style={{ animationDelay: "0.9s" }}>
                  <CheckCircle className="w-4 h-4 text-emerald-400 animate-pulse-gentle" />
                  <span>Instant results</span>
                </div>
              </div>
            </div>

            <div
              className={`relative transition-all duration-1000 delay-300 ${isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-10"}`}
            >
              <div className="bg-gradient-to-r from-sky-100 to-purple-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 animate-float-gentle">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 space-y-4 hover:bg-white transition-all duration-300 shadow-sm">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-100 to-sky-100 rounded-full flex items-center justify-center animate-pulse-gentle">
                      <Target className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700">Career Match Found!</h3>
                      <p className="text-sm text-gray-500">Product Manager at TechCorp</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Match Score</span>
                      <span className="font-semibold text-emerald-500 animate-pulse-gentle">94%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-emerald-300 to-emerald-400 h-2 rounded-full animate-progress-bar"
                        style={{ width: "94%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Badge
                      variant="secondary"
                      className="text-xs bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors duration-300 border-sky-100"
                    >
                      Remote
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="text-xs bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors duration-300 border-emerald-100"
                    >
                      $120k-150k
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="text-xs bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors duration-300 border-purple-100"
                    >
                      Growth Stage
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-br from-white via-gray-50/30 to-sky-50/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16 animate-fade-in-up">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-700">Powerful Features for Your Career Growth</h2>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto">
              Our AI-powered platform provides comprehensive career guidance tailored to your unique profile and
              aspirations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "Career Transition Recommendations",
                desc: "Get AI-powered suggestions for your next ideal role based on experience, education, and salary expectations.",
                gradient: "from-sky-400 to-sky-500",
                bgGradient: "from-sky-50/50 to-sky-100/30",
                iconBg: "from-sky-100 to-sky-200",
                iconColor: "text-sky-600",
                delay: "0s",
              },
              {
                icon: Target,
                title: "Fresher Career Guidance",
                desc: "Personalized role recommendations for students and new graduates entering the job market.",
                gradient: "from-emerald-400 to-emerald-500",
                bgGradient: "from-emerald-50/50 to-emerald-100/30",
                iconBg: "from-emerald-100 to-emerald-200",
                iconColor: "text-emerald-600",
                delay: "0.1s",
              },
              {
                icon: Zap,
                title: "Skill Gap Analysis",
                desc: "Identify missing skills and get AI-powered learning recommendations to advance your career.",
                gradient: "from-purple-400 to-purple-500",
                bgGradient: "from-purple-50/50 to-purple-100/30",
                iconBg: "from-purple-100 to-purple-200",
                iconColor: "text-purple-600",
                delay: "0.2s",
              },
              {
                icon: Users,
                title: "Company Culture Match",
                desc: "Find workplaces that align with your values, work style, and cultural preferences using NLP.",
                gradient: "from-rose-400 to-pink-400",
                bgGradient: "from-rose-50/50 to-pink-100/30",
                iconBg: "from-rose-100 to-pink-200",
                iconColor: "text-rose-500",
                delay: "0.3s",
              },
              {
                icon: FileText,
                title: "Intelligent Resume Parsing",
                desc: "Upload your resume for instant AI analysis and extraction of relevant career information.",
                gradient: "from-amber-400 to-yellow-400",
                bgGradient: "from-amber-50/50 to-yellow-100/30",
                iconBg: "from-amber-100 to-yellow-200",
                iconColor: "text-amber-600",
                delay: "0.4s",
              },
              {
                icon: Brain,
                title: "Machine Learning Insights",
                desc: "Advanced ML algorithms analyze market trends and provide data-driven career recommendations.",
                gradient: "from-teal-400 to-cyan-400",
                bgGradient: "from-teal-50/50 to-cyan-100/30",
                iconBg: "from-teal-100 to-cyan-200",
                iconColor: "text-teal-600",
                delay: "0.5s",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className={`border-0 shadow-sm hover:shadow-md transition-all duration-500 hover:scale-105 transform animate-slide-in-up group cursor-pointer bg-gradient-to-br ${feature.bgGradient} hover:bg-white backdrop-blur-sm border border-white/60`}
                style={{ animationDelay: feature.delay }}
              >
                <CardHeader>
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${feature.iconBg} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:animate-bounce-gentle shadow-sm`}
                  >
                    <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                  </div>
                  <CardTitle className="text-xl group-hover:text-gray-700 transition-colors duration-300 text-gray-700">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                    {feature.desc}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-gray-50/50 via-white to-purple-50/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16 animate-fade-in-up">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-700">How NextLeap Works</h2>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto">
              Get personalized career recommendations in three simple steps
            </p>
          </div>

          <div className="relative">
            {/* Progress Line */}
            <div className="hidden md:block absolute top-8 left-1/2 transform -translate-x-1/2 w-2/3 h-0.5 bg-gradient-to-r from-sky-200 via-purple-200 to-emerald-200 animate-draw-line"></div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {[
                {
                  icon: Upload,
                  title: "Upload & Profile",
                  desc: "Add your resume or create a profile with your experience, skills, education, and career preferences.",
                  gradient: "from-sky-400 to-sky-500",
                  delay: "0s",
                },
                {
                  icon: Brain,
                  title: "AI Analysis",
                  desc: "Our machine learning algorithms and NLP models analyze your profile against thousands of career paths and market data.",
                  gradient: "from-purple-400 to-purple-500",
                  delay: "0.3s",
                },
                {
                  icon: Target,
                  title: "Personalized Recommendations",
                  desc: "Receive tailored career transitions, skill gaps, company matches, and actionable insights for your next move.",
                  gradient: "from-emerald-400 to-emerald-500",
                  delay: "0.6s",
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className="text-center space-y-4 animate-slide-in-up"
                  style={{ animationDelay: step.delay }}
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${step.gradient} rounded-full flex items-center justify-center mx-auto hover:scale-110 transition-transform duration-300 animate-pulse-gentle shadow-md`}
                  >
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-gray-700">
                      {index + 1}. {step.title}
                    </h3>
                    <p className="text-gray-500">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NextLeap Features Showcase */}
      <section className="py-20 bg-gradient-to-br from-white via-sky-50/20 to-gray-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16 animate-fade-in-up">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-700">Explore NextLeap's AI-Powered Tools</h2>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto">
              Try our specialized career intelligence tools designed to accelerate your professional growth
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Career Forecasting",
                desc: "Get personalized role recommendations based on your experience and goals",
                icon: TrendingUp,
                link: "/career-forecasting",
                gradient: "from-sky-400 to-sky-500",
                bgGradient: "from-sky-50/50 to-sky-100/30",
                iconBg: "from-sky-100 to-sky-200",
                iconColor: "text-sky-600",
                features: ["Role Recommendations", "Salary Predictions", "Career Path Analysis"],
              },
              {
                title: "Skill Gap Analysis",
                desc: "Identify skills to learn and get AI-powered learning recommendations",
                icon: Zap,
                link: "/skill-gap",
                gradient: "from-purple-400 to-purple-500",
                bgGradient: "from-purple-50/50 to-purple-100/30",
                iconBg: "from-purple-100 to-purple-200",
                iconColor: "text-purple-600",
                features: ["Skills Assessment", "Learning Paths", "Market Demand Analysis"],
              },
              {
                title: "Cultural Match",
                desc: "Find companies that align with your values and work preferences",
                icon: Users,
                link: "/cultural-match",
                gradient: "from-emerald-400 to-emerald-500",
                bgGradient: "from-emerald-50/50 to-emerald-100/30",
                iconBg: "from-emerald-100 to-emerald-200",
                iconColor: "text-emerald-600",
                features: ["Company Matching", "Culture Analysis", "Values Alignment"],
              },
            ].map((tool, index) => (
              <Card
                key={index}
                className={`border-0 shadow-sm hover:shadow-md transition-all duration-500 hover:scale-105 transform animate-slide-in-up group cursor-pointer bg-gradient-to-br ${tool.bgGradient} hover:bg-white backdrop-blur-sm border border-white/60`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${tool.iconBg} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm`}
                  >
                    <tool.icon className={`w-6 h-6 ${tool.iconColor}`} />
                  </div>
                  <CardTitle className="text-xl group-hover:text-gray-700 transition-colors duration-300 text-gray-700">
                    {tool.title}
                  </CardTitle>
                  <CardDescription className="text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                    {tool.desc}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {tool.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-500">
                        <CheckCircle className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href={tool.link}>
                    <Button
                      className={`w-full bg-gradient-to-r ${tool.gradient} hover:opacity-90 text-white group-hover:scale-105 transition-transform duration-300 shadow-sm font-medium`}
                    >
                      Try {tool.title}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-sky-100 via-purple-100 to-emerald-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/20"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="space-y-8 animate-fade-in-up">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-700">
              Ready to Discover Your Perfect Career Path?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of professionals who have advanced their careers with NextLeap's AI-powered recommendations
              and data-driven insights.
            </p>
            <Link href="/career-forecasting">
              <Button
                size="lg"
                className="bg-white text-gray-700 hover:bg-sky-50 hover:text-sky-600 px-8 py-3 text-lg font-semibold animate-pulse-cta hover:scale-110 transform transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200"
              >
                Start Your Career Journey
                <ArrowRight className="ml-2 w-5 h-5 animate-bounce-x" />
              </Button>
            </Link>
            <p className="text-gray-500 text-sm animate-fade-in" style={{ animationDelay: "0.5s" }}>
              No credit card required • Get results in minutes • 100% free to start
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 text-gray-600 py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4 animate-slide-in-left">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-sky-400 to-purple-400 rounded-lg flex items-center justify-center animate-pulse-gentle shadow-sm">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-700">NextLeap</span>
              </div>
              <p className="text-gray-500">AI-powered career recommendations to help you find your perfect path.</p>
            </div>

            {[
              { title: "Product", links: ["Features", "How It Works", "Pricing", "API"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
              { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy"] },
            ].map((section, index) => (
              <div key={index} className="space-y-4 animate-slide-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <h3 className="font-semibold text-gray-700">{section.title}</h3>
                <ul className="space-y-2 text-gray-500">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href="#"
                        className="hover:text-gray-700 transition-colors duration-300 hover:translate-x-1 transform inline-block"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center animate-fade-in">
            <p className="text-gray-500 text-sm">© 2024 NextLeap. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              {[Twitter, Linkedin, Mail].map((Icon, index) => (
                <Link
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-gray-600 transition-all duration-300 hover:scale-110 transform"
                >
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
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
        
        @keyframes slideInLeft {
          from { 
            opacity: 0; 
            transform: translateX(-30px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
        
        @keyframes slideInRight {
          from { 
            opacity: 0; 
            transform: translateX(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
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
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes floatGentle {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }
        
        @keyframes pulseGentle {
          0%, 100% { opacity: 0.9; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.02); }
        }
        
        @keyframes pulseCta {
          0%, 100% { opacity: 0.95; }
          50% { opacity: 1; }
        }
        
        @keyframes bounceGentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        
        @keyframes bounceX {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(3px); }
        }
        
        @keyframes progressBar {
          from { width: 0%; }
          to { width: 94%; }
        }
        
        @keyframes drawLine {
          from { width: 0%; }
          to { width: 66.666667%; }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-fade-in { animation: fadeIn 1s ease-out; }
        .animate-fade-in-up { animation: fadeInUp 1s ease-out; }
        .animate-slide-in-left { animation: slideInLeft 0.8s ease-out; }
        .animate-slide-in-right { animation: slideInRight 0.8s ease-out; }
        .animate-slide-in-up { animation: slideInUp 0.8s ease-out; }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-gentle { animation: floatGentle 6s ease-in-out infinite; }
        .animate-pulse-gentle { animation: pulseGentle 4s ease-in-out infinite; }
        .animate-pulse-cta { animation: pulseCta 3s ease-in-out infinite; }
        .animate-bounce-gentle { animation: bounceGentle 3s ease-in-out infinite; }
        .animate-bounce-x { animation: bounceX 2s ease-in-out infinite; }
        .animate-progress-bar { animation: progressBar 2s ease-out 0.5s forwards; width: 0%; }
        .animate-draw-line { animation: drawLine 2s ease-out 1s forwards; width: 0%; }
        .animate-gradient { 
          background-size: 200% 200%; 
          animation: gradient 4s ease infinite; 
        }
      `}</style>
    </div>
  )
}
