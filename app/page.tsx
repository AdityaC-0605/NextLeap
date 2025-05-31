import Link from "next/link"
import { ArrowRight, BarChart2, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">nextLeap</h1>
          <div className="flex items-center gap-4">
            <nav>
              <ul className="flex gap-6">
                <li>
                  <Link href="/" className="hover:text-primary">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="hover:text-primary">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#features" className="hover:text-primary">
                    Features
                  </Link>
                </li>
              </ul>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950 dark:text-white py-20 animate-gradient-x transition-all duration-700">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 animate-fade-in-down">Shape Your Future with nextLeap</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10 animate-fade-in-down" style={{animationDelay: '0.2s'}}>
            AI-powered career forecasting and cultural matching to help you make informed decisions about your
            professional journey.
          </p>
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 animate-pulse">
            <Link href="#features">Explore Our Features</Link>
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">About Us</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                At nextLeap, we're dedicated to empowering professionals to make data-driven career decisions. Using
                advanced AI models, we provide insights that help you navigate your career path with confidence.
              </p>
              <h3 className="text-2xl font-semibold mb-4">Our Approach</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We combine cutting-edge artificial intelligence with comprehensive industry data to deliver personalized
                career forecasts and cultural matching that align with your skills, experience, and aspirations.
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8">
              <h3 className="text-2xl font-semibold mb-4">Why Choose nextLeap?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="mr-4 mt-1 bg-purple-100 dark:bg-purple-900 p-1 rounded-full">
                    <ArrowRight className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <p>AI-powered career forecasting based on your unique profile</p>
                </li>
                <li className="flex items-start">
                  <div className="mr-4 mt-1 bg-purple-100 dark:bg-purple-900 p-1 rounded-full">
                    <ArrowRight className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <p>Cultural matching to find organizations aligned with your values</p>
                </li>
                <li className="flex items-start">
                  <div className="mr-4 mt-1 bg-purple-100 dark:bg-purple-900 p-1 rounded-full">
                    <ArrowRight className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <p>Data-driven insights to maximize your career potential</p>
                </li>
                <li className="flex items-start">
                  <div className="mr-4 mt-1 bg-purple-100 dark:bg-purple-900 p-1 rounded-full">
                    <ArrowRight className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <p>Personalized recommendations tailored to your experience</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900 transition-all duration-700">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 animate-fade-in-down">Our Features</h2>
          <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12 animate-fade-in-down" style={{animationDelay: '0.2s'}}>
            Discover how nextLeap can help you make your next career move with confidence
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Career Forecasting Card */}
            <Card className="shadow-lg hover:shadow-2xl transition-shadow transition-transform duration-300 hover:scale-105 rounded-2xl p-2 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-2xl">Career Forecasting</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Predict your career trajectory and potential earnings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Our AI model analyzes your current job, salary, experience, and education to forecast your career path
                  and potential earnings over time. Get insights into how different choices might impact your
                  professional future.
                </p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button
                  asChild
                  className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800"
                >
                  <Link href="/career-forecasting">
                    Try Career Forecasting
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Cultural Match Card */}
            <Card className="shadow-lg hover:shadow-2xl transition-shadow transition-transform duration-300 hover:scale-105 rounded-2xl p-2 animate-fade-in-up" style={{animationDelay: '0.35s'}}>
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-2xl">Cultural Match</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Find organizations that align with your values
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Our cultural matching tool helps you identify companies and teams where you'll thrive. By analyzing
                  your preferences, work style, and values, we connect you with environments that support your
                  professional growth.
                </p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button
                  asChild
                  className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800"
                >
                  <Link href="/cultural-match">
                    Explore Cultural Match
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Skill Gap Analysis Card */}
            <Card className="shadow-lg hover:shadow-2xl transition-shadow transition-transform duration-300 hover:scale-105 rounded-2xl p-2 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-purple-600 dark:text-purple-400"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <CardTitle className="text-2xl">Skill Gap Analysis</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Identify and bridge your skill gaps
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Upload your resume to get an AI-powered analysis of your skills. We'll identify gaps and provide
                  personalized recommendations to help you advance your career.
                </p>
              </CardContent>
              <CardFooter className="flex justify-center">
              <Link href="/skill-gap" className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 text-white text-center py-2 px-4 rounded-lg font-semibold transition-colors duration-200">
                Go to Skill Gap Analysis
                <ArrowRight className="ml-2 h-4 w-4 inline" />
              </Link>

              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold">nextLeap</h2>
              <p className="text-gray-400 mt-2">Shaping careers with AI</p>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-3">Features</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/career-forecasting" className="text-gray-400 hover:text-white">
                      Career Forecasting
                    </Link>
                  </li>
                  <li>
                    <Link href="/cultural-match" className="text-gray-400 hover:text-white">
                      Cultural Match
                    </Link>
                  </li>
                  <li>
                    <Link href="/skill-gap" className="text-gray-400 hover:text-white">
                      Skill Gap Analysis
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#about" className="text-gray-400 hover:text-white">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} nextLeap. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
