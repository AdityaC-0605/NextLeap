"use client"

import React, { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
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
  const [theme, setTheme] = useState("light")
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])

  const [isExperienced, setIsExperienced] = useState(true)
  const [loading, setLoading] = useState(false)
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [error, setError] = useState("")

  const [currentRole, setCurrentRole] = useState("")
  const [yearsExperience, setYearsExperience] = useState("")
  const [education, setEducation] = useState("Bachelors")
  const [currentSalary, setCurrentSalary] = useState("")
  const [skills, setSkills] = useState("")

  const showOutput = recommendations.length > 0

  const handleExperiencedSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const response = await getCareerRecommendations({
        current_role: currentRole,
        years_experience: parseFloat(yearsExperience),
        education: education,
        current_salary: parseFloat(currentSalary)
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
      const skillsList = skills.split(",").map(skill => skill.trim())
      const response = await getFresherRecommendations(skillsList)
      setRecommendations(response)
    } catch (err: any) {
      setError(err.message || "Failed to get recommendations")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950 transition-colors duration-200 px-4">
      <div className="relative w-full max-w-[1200px] min-h-[600px] flex justify-center items-start md:items-center">
        {/* Input Card */}
        <div
          className={`
            absolute transition-all duration-700 ease-in-out
            bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 w-full max-w-xl
            ${showOutput ? "md:left-0 left-1/2 -translate-x-[100%] md:translate-x-0" : "left-1/2 -translate-x-1/2"}
          `}
          style={{ zIndex: 2 }}
        >
          <h1 className="text-3xl font-bold mb-6 text-center">Career Forecasting</h1>
          <div className="mb-8 flex justify-center gap-4">
            <button
              className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-150 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 ${isExperienced ? "bg-purple-600 text-white" : "bg-gray-200 dark:bg-gray-800 dark:text-white"}`}
              onClick={() => setIsExperienced(true)}
              type="button"
            >
              Experienced
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-150 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 ${!isExperienced ? "bg-purple-600 text-white" : "bg-gray-200 dark:bg-gray-800 dark:text-white"}`}
              onClick={() => setIsExperienced(false)}
              type="button"
            >
              Fresher
            </button>
          </div>
          <div className="border-b border-gray-200 dark:border-gray-800 mb-8" />

          {isExperienced ? (
            <form onSubmit={handleExperiencedSubmit} className="flex flex-col gap-5 items-center">
              <div className="w-full flex flex-col items-center">
                <label className="block mb-1 w-full text-center font-medium">Current Role</label>
                <input
                  type="text"
                  value={currentRole}
                  onChange={(e) => setCurrentRole(e.target.value)}
                  className="w-full max-w-xs p-2 border rounded-lg text-center bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-purple-400"
                  required
                  placeholder="e.g., Software Developer"
                />
              </div>
              <div className="w-full flex flex-col items-center">
                <label className="block mb-1 w-full text-center font-medium">Years of Experience</label>
                <input
                  type="number"
                  value={yearsExperience}
                  onChange={(e) => setYearsExperience(e.target.value)}
                  className="w-full max-w-xs p-2 border rounded-lg text-center bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-purple-400"
                  required
                  min={0}
                  placeholder="e.g., 3"
                />
              </div>
              <div className="w-full flex flex-col items-center">
                <label className="block mb-1 w-full text-center font-medium">Education Level</label>
                <select
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  className="w-full max-w-xs p-2 border rounded-lg text-center bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-purple-400"
                >
                  <option value="Bachelors">Bachelors</option>
                  <option value="Masters">Masters</option>
                  <option value="PhD">PhD</option>
                </select>
              </div>
              <div className="w-full flex flex-col items-center">
                <label className="block mb-1 w-full text-center font-medium">Current Salary (LPA)</label>
                <input
                  type="number"
                  value={currentSalary}
                  onChange={(e) => setCurrentSalary(e.target.value)}
                  className="w-full max-w-xs p-2 border rounded-lg text-center bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-purple-400"
                  required
                  min={0}
                  placeholder="e.g., 12"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full max-w-xs flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold mt-2 transition-colors duration-150 disabled:bg-gray-400"
              >
                {loading && <Loader2 className="animate-spin h-5 w-5" />}
                {loading ? "Getting Recommendations..." : "Get Career Recommendations"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleFresherSubmit} className="flex flex-col gap-5 items-center">
              <div className="w-full flex flex-col items-center">
                <label className="block mb-1 w-full text-center font-medium">Your Skills (comma-separated)</label>
                <textarea
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="w-full max-w-xs p-2 border rounded-lg text-center bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-purple-400"
                  rows={4}
                  placeholder="e.g., Python, JavaScript, React, SQL"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full max-w-xs flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold mt-2 transition-colors duration-150 disabled:bg-gray-400"
              >
                {loading && <Loader2 className="animate-spin h-5 w-5" />}
                {loading ? "Getting Recommendations..." : "Get Career Recommendations"}
              </button>
            </form>
          )}
          {error && (
            <div className="mt-6 flex items-center justify-center gap-2 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-1.414 1.414M6.343 17.657l-1.414-1.414M5.636 5.636l1.414 1.414M17.657 17.657l1.414-1.414M12 8v4m0 4h.01" /></svg>
              {error}
            </div>
          )}
        </div>

        {/* Output Card */}
        <div
          className={`
            absolute right-0 transition-all duration-700 ease-in-out w-full md:w-1/2
            ${showOutput ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"}
          `}
          style={{ zIndex: 1 }}
        >
          {recommendations.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 animate-fade-in-up">
              <h2 className="text-2xl font-bold mb-6 text-center">Career Recommendations</h2>
              <div className="grid gap-4">
                {recommendations.map((rec, index) => (
                  <div key={index} className="p-4 border rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow hover:shadow-md transition-shadow">
                    <div className="flex flex-col">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{rec.next_role}</h3>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              New Salary: ₹{rec.predicted_salary.toFixed(2)} LPA
                            </p>
                            {typeof rec.salary_increase === 'number' && !isNaN(rec.salary_increase) && (
                              <p className="text-sm font-medium text-green-700 dark:text-green-300">
                                Salary Increase: ₹{rec.salary_increase.toFixed(2)} LPA
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Skills to Learn:</p>
                            <div className="flex flex-wrap gap-2">
                              {rec.skills_to_learn.split(',').map((skill, skillIndex) => (
                                <span
                                  key={skillIndex}
                                  className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
                                >
                                  {skill.trim()}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="mt-8 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition-colors duration-150"
                onClick={() => setRecommendations([])}
              >
                Back
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
