"use client"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
  Star,
  Linkedin,
  Twitter,
  Mail,
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [typedText, setTypedText] = useState("")
  const testimonialText =
    "NextLeap helped me transition from marketing to product management in just 3 months! The AI recommendations were spot-on and the skill gap analysis was incredibly valuable."

  useEffect(() => {
    setIsVisible(true)

    // Typewriter effect for testimonial
    let i = 0
    const timer = setInterval(() => {
      if (i < testimonialText.length) {
        setTypedText(testimonialText.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
      }
    }, 30)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-particles">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-float"
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

      {/* Navigation */}
      <nav className="border-b bg-white/90 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 animate-slide-in-left">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 rounded-lg flex items-center justify-center animate-pulse-gentle">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                NextLeap
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8 animate-slide-in-right">
              <Link
                href="#features"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300 hover:scale-105 transform"
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300 hover:scale-105 transform"
              >
                How It Works
              </Link>
              <Link
                href="#about"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300 hover:scale-105 transform"
              >
                About
              </Link>
              <Button
                variant="outline"
                className="bg-white text-gray-700 border-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:border-blue-300 transition-all duration-300 hover:scale-105 transform"
              >
                Sign In
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
                <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 hover:from-blue-200 hover:to-purple-200 transition-all duration-300 animate-bounce-gentle">
                  🚀 AI-Powered Career Intelligence
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Find Your Perfect{" "}
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent animate-gradient">
                    Career Path
                  </span>{" "}
                  with AI
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  NextLeap uses advanced AI to recommend roles, identify skill gaps, and match you with companies that
                  align with your profile and career goals.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-600 text-white px-8 py-3 animate-pulse-cta hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Get Started for Free
                  <ArrowRight className="ml-2 w-5 h-5 animate-bounce-x" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white/80 backdrop-blur-sm text-gray-700 border-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:border-blue-300 px-8 py-3 hover:scale-105 transform transition-all duration-300"
                >
                  How It Works →
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-1 animate-slide-in-left" style={{ animationDelay: "0.5s" }}>
                  <CheckCircle className="w-4 h-4 text-green-500 animate-pulse-gentle" />
                  <span>Free to start</span>
                </div>
                <div className="flex items-center space-x-1 animate-slide-in-left" style={{ animationDelay: "0.7s" }}>
                  <CheckCircle className="w-4 h-4 text-green-500 animate-pulse-gentle" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-1 animate-slide-in-left" style={{ animationDelay: "0.9s" }}>
                  <CheckCircle className="w-4 h-4 text-green-500 animate-pulse-gentle" />
                  <span>Instant results</span>
                </div>
              </div>
            </div>

            <div
              className={`relative transition-all duration-1000 delay-300 ${isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-10"}`}
            >
              <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 animate-float-gentle">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 space-y-4 hover:bg-white transition-all duration-300">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center animate-pulse-gentle">
                      <Target className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Career Match Found!</h3>
                      <p className="text-sm text-gray-600">Product Manager at TechCorp</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Match Score</span>
                      <span className="font-semibold text-green-600 animate-pulse-gentle">94%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full animate-progress-bar"
                        style={{ width: "94%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Badge
                      variant="secondary"
                      className="text-xs bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors duration-300"
                    >
                      Remote
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="text-xs bg-green-100 text-green-700 hover:bg-green-200 transition-colors duration-300"
                    >
                      $120k-150k
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="text-xs bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors duration-300"
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
      <section id="features" className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16 animate-fade-in-up">
            <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Powerful Features for Your Career Growth
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform provides comprehensive career guidance tailored to your unique profile and
              aspirations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "Career Transition",
                desc: "Discover your next ideal role based on your experience, salary expectations, and career goals.",
                color: "blue",
                delay: "0s",
              },
              {
                icon: Target,
                title: "Fresher Recommendations",
                desc: "Personalized role suggestions for students and new graduates entering the job market.",
                color: "green",
                delay: "0.1s",
              },
              {
                icon: Zap,
                title: "Skill Gap Analysis",
                desc: "Identify missing skills and get recommendations to level up your career prospects.",
                color: "purple",
                delay: "0.2s",
              },
              {
                icon: Users,
                title: "Company Culture Match",
                desc: "Find workplaces aligned with your values, work style, and cultural preferences.",
                color: "orange",
                delay: "0.3s",
              },
              {
                icon: FileText,
                title: "Resume Parsing",
                desc: "Upload your resume for instant, AI-powered analysis and tailored career advice.",
                color: "red",
                delay: "0.4s",
              },
              {
                icon: Brain,
                title: "AI-Powered Insights",
                desc: "Get intelligent recommendations backed by machine learning and industry data.",
                color: "teal",
                delay: "0.5s",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 transform animate-slide-in-up group cursor-pointer bg-white/80 backdrop-blur-sm hover:bg-white"
                style={{ animationDelay: feature.delay }}
              >
                <CardHeader>
                  <div
                    className={`w-12 h-12 bg-gradient-to-r from-${feature.color}-100 to-${feature.color}-200 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:animate-bounce-gentle`}
                  >
                    <feature.icon className={`w-6 h-6 text-${feature.color}-600`} />
                  </div>
                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                    {feature.desc}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16 animate-fade-in-up">
            <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              How NextLeap Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get personalized career recommendations in three simple steps
            </p>
          </div>

          <div className="relative">
            {/* Progress Line */}
            <div className="hidden md:block absolute top-8 left-1/2 transform -translate-x-1/2 w-2/3 h-0.5 bg-gradient-to-r from-blue-300 via-purple-300 to-cyan-300 animate-draw-line"></div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {[
                {
                  icon: Upload,
                  title: "Upload & Input",
                  desc: "Add your resume or fill in your profile with your experience, skills, and career preferences.",
                  color: "from-blue-500 to-blue-600",
                  delay: "0s",
                },
                {
                  icon: Brain,
                  title: "AI Analysis",
                  desc: "Our AI analyzes your skills, experience, and preferences against thousands of career paths and opportunities.",
                  color: "from-purple-500 to-purple-600",
                  delay: "0.3s",
                },
                {
                  icon: Target,
                  title: "Get Matches",
                  desc: "Receive curated career paths, company matches, and actionable insights to advance your career.",
                  color: "from-cyan-500 to-cyan-600",
                  delay: "0.6s",
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className="text-center space-y-4 animate-slide-in-up"
                  style={{ animationDelay: step.delay }}
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center mx-auto hover:scale-110 transition-transform duration-300 animate-pulse-gentle shadow-lg`}
                  >
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {index + 1}. {step.title}
                    </h3>
                    <p className="text-gray-600">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8 animate-fade-in-up">
            <div className="flex justify-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 text-yellow-400 fill-current animate-bounce-gentle"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
            <blockquote className="text-2xl lg:text-3xl font-medium text-gray-900 leading-relaxed min-h-[120px]">
              "{typedText}"<span className="animate-blink">|</span>
            </blockquote>
            <div className="space-y-2">
              <p className="font-semibold text-gray-900">Sarah Chen</p>
              <p className="text-gray-600">Product Manager at TechFlow</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="space-y-8 animate-fade-in-up">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">Ready to Leap Forward in Your Career?</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join thousands of professionals who have discovered their perfect career path with NextLeap's AI-powered
              recommendations.
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold animate-pulse-cta hover:scale-110 transform transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5 animate-bounce-x" />
            </Button>
            <p className="text-blue-100 text-sm animate-fade-in" style={{ animationDelay: "0.5s" }}>
              No credit card required • Get results in minutes • 100% free to start
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4 animate-slide-in-left">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 rounded-lg flex items-center justify-center animate-pulse-gentle">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">NextLeap</span>
              </div>
              <p className="text-gray-400">AI-powered career recommendations to help you find your perfect path.</p>
            </div>

            {[
              { title: "Product", links: ["Features", "How It Works", "Pricing", "API"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
              { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy"] },
            ].map((section, index) => (
              <div key={index} className="space-y-4 animate-slide-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <h3 className="font-semibold">{section.title}</h3>
                <ul className="space-y-2 text-gray-400">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href="#"
                        className="hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center animate-fade-in">
            <p className="text-gray-400 text-sm">© 2024 NextLeap. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              {[Twitter, Linkedin, Mail].map((Icon, index) => (
                <Link
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 transform"
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
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        
        @keyframes pulseGentle {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        
        @keyframes pulseCta {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 1; }
        }
        
        @keyframes bounceGentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes bounceX {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
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
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        .animate-fade-in { animation: fadeIn 1s ease-out; }
        .animate-fade-in-up { animation: fadeInUp 1s ease-out; }
        .animate-slide-in-left { animation: slideInLeft 0.8s ease-out; }
        .animate-slide-in-right { animation: slideInRight 0.8s ease-out; }
        .animate-slide-in-up { animation: slideInUp 0.8s ease-out; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-gentle { animation: floatGentle 4s ease-in-out infinite; }
        .animate-pulse-gentle { animation: pulseGentle 3s ease-in-out infinite; }
        .animate-pulse-cta { animation: pulseCta 2s ease-in-out infinite; }
        .animate-bounce-gentle { animation: bounceGentle 2s ease-in-out infinite; }
        .animate-bounce-x { animation: bounceX 1s ease-in-out infinite; }
        .animate-progress-bar { animation: progressBar 2s ease-out 0.5s forwards; width: 0%; }
        .animate-draw-line { animation: drawLine 2s ease-out 1s forwards; width: 0%; }
        .animate-gradient { 
          background-size: 200% 200%; 
          animation: gradient 3s ease infinite; 
        }
        .animate-blink { animation: blink 1s infinite; }
      `}</style>
    </div>
  )
}
