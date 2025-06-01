"use client";

import React, { useState } from "react";

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
  "IT Consultant"
];

export default function SkillGapPage() {
  const [file, setFile] = useState<File | null>(null);
  const [skills, setSkills] = useState<any>(null);
  const [step, setStep] = useState<1 | 2>(1);
  const [role, setRole] = useState("");
  const [match, setMatch] = useState<any>(null);
  const [error, setError] = useState('');
  const [showAIOptions, setShowAIOptions] = useState(false);
  const [aiAdvice, setAIAdvice] = useState<any>(null);
  const [finished, setFinished] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  // Utility function to convert plain text to HTML
  
const convertToHTML = (text: string) => {
  // Split the text into paragraphs
  const paragraphs = text?.split('\n\n');

  // Convert paragraphs to HTML
  const htmlParagraphs = paragraphs && paragraphs.length && paragraphs
    .map((para) => `<p class="mb-4">${para.replace(/\n/g, '<br>')}</p>`)
    .join('');

  return htmlParagraphs;
};


  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setError('');
    setMatch(null);
    setSkills(null);
    setStep(1);
    setShowAIOptions(false);
    setAIAdvice(null);
    setFinished(false);
    const formData = new FormData();
    formData.append('resume', file);

    try {
      const res = await fetch('http://localhost:8000/api/analyze-skills', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to analyze resume');
      const data = await res.json();
      setSkills(data.categorized_skills);
      setStep(1);
    } catch (err: any) {
      setError(err.message || 'Error');
    }
  };

  const handleNext = () => setStep(2);

  const handleRoleSelect = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMatch(null);
    setShowAIOptions(false);
    setAIAdvice(null);
    setFinished(false);
    if (!role) return;
    try {
      const formData = new FormData();
      if (file) formData.append('resume', file);
      formData.append('target_role', role);
      const res = await fetch('http://localhost:8000/api/analyze-skills', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to analyze role match');
      const data = await res.json();
      setMatch(data.skill_match);
      setSkills(data.categorized_skills);
    } catch (err: any) {
      setError(err.message || 'Error');
    }
  };

  const handleGetAIAdvice = async () => {
    setError("");
    setAIAdvice(null);
    try {
      const formData = new FormData();
      if (file) formData.append('resume', file);
      if (role) formData.append('target_role', role);
      formData.append('gemini_advice', 'true');
      const res = await fetch('http://localhost:8000/api/analyze-skills', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to get AI advice');
      const data = await res.json();
      setAIAdvice(data.gemini_advice);
    } catch (err: any) {
      setError(err.message || 'Error');
    }
  };

  return (
    <div className="min-h-screen bg-[#181c24] text-white flex flex-col items-center py-10 px-2">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-bold mb-8 text-center">Skill Gap Analyzer</h1>
        {/* Step 1: Upload Resume */}
        <div className="bg-[#23283a] rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={handleUpload} className="flex flex-col md:flex-row items-center gap-4 mb-4">
            <input type="file" accept=".pdf,.docx" onChange={handleFileChange} required className="flex-1 bg-[#181c24] border border-gray-600 rounded px-3 py-2" />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold">Upload & Analyze</button>
          </form>
          {error && <div className="text-red-400 mb-2 text-center">{error}</div>}
          {skills && (
            <div className="mt-4">
              <h2 className="text-2xl font-semibold mb-3">Extracted Skills</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(skills).map(([category, skillList]) => (
                  <div key={category} className="bg-[#1e2230] rounded p-3">
                    <strong className="text-blue-300">{category}:</strong>
                    <div className="text-sm mt-1 text-blue-100">{(skillList as string[]).join(', ')}</div>
                  </div>
                ))}
              </div>
              {step === 1 && (
                <button
                  className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded font-semibold w-full md:w-auto"
                  onClick={handleNext}
                  type="button"
                >
                  Next
                </button>
              )}
            </div>
          )}
        </div>
        {/* Step 2: Role Selection and Results */}
        {step === 2 && (
          <div className="bg-[#23283a] rounded-lg shadow-lg p-6 mb-8">
            <form onSubmit={handleRoleSelect} className="flex flex-col gap-4 mb-4">
              <label className="block text-lg font-medium">Select Target Role</label>
              <select
                value={role}
                onChange={e => setRole(e.target.value)}
                className="w-full p-2 border border-gray-600 rounded bg-[#181c24] text-white"
                required
              >
                <option value="">Select a role...</option>
                {ROLES.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold w-full md:w-auto">Analyze Role Match</button>
              {error && <div className="text-red-400 text-center">{error}</div>}
            </form>
            {match && (
              <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-3">Skill Match Analysis</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#1e2230] rounded p-4">
                    <strong className="text-green-300">Matched Skills:</strong>
                    <ul className="list-disc list-inside mt-2 text-green-100">
                      {match.matched_skills.map((skill: string) => (
                        <li key={skill}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-[#1e2230] rounded p-4">
                    <strong className="text-red-300">Missing Skills:</strong>
                    <ul className="list-disc list-inside mt-2 text-red-100">
                      {match.missing_skills.map((skill: string) => (
                        <li key={skill}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                {!showAIOptions && !aiAdvice && !finished && (
                  <div className="mt-8 flex flex-col md:flex-row gap-4 items-center justify-center">
                    <p className="mb-2 md:mb-0">Would you like AI recommendations for your missing skills?</p>
                    <button
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded font-semibold"
                      onClick={() => setShowAIOptions(true)}
                      type="button"
                    >
                      Yes
                    </button>
                    <button
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded font-semibold"
                      onClick={() => setFinished(true)}
                      type="button"
                    >
                      No
                    </button>
                  </div>
                )}
                {showAIOptions && !aiAdvice && (
                  <div className="mt-6 flex justify-center">
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold"
                      onClick={handleGetAIAdvice}
                      type="button"
                    >
                      Get AI Recommendations
                    </button>
                  </div>
                )}
                {aiAdvice && (
                  <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-3">AI Recommendations</h2>
                    <div className="space-y-4">
                      {Object.entries(aiAdvice).map(([skill, advice]) => (
                        <div key={skill} className="bg-[#23283a] border-l-4 border-purple-500 rounded p-4">
                          <strong className="text-purple-300">{skill}:</strong>
                          <div
              className="prose prose-base max-w-none text-white"
              style={{
                lineHeight: "1.6",
              }}
              dangerouslySetInnerHTML={{
                __html: String(convertToHTML(advice as string)),
              }}
            />
          </div>                        
                      ))}
                    </div>
                  </div>
                )}
                {finished && (
                  <div className="mt-8 text-green-400 font-semibold text-center text-lg">
                    Thank you for using the Skill Gap Analyzer!
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
