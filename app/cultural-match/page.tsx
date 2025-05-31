"use client"

import React, { useState, useEffect } from 'react';
import { Send } from 'lucide-react';

interface CompanyRecommendation {
  company_name: string;
  similarity_score: number;
  culture_description: string;
  location: string;
  industry: string;
  image_path: string;
}

export default function CulturalMatch() {
  const [preferences, setPreferences] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<CompanyRecommendation[]>([]);
  const [error, setError] = useState('');
  const [visibleCards, setVisibleCards] = useState(0);

  const showOutput = recommendations.length > 0;

  useEffect(() => {
    if (recommendations.length > 0) {
      setVisibleCards(0);
      const interval = setInterval(() => {
        setVisibleCards(prev => {
          if (prev >= recommendations.length) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [recommendations]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!preferences.trim()) return;
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/cultural-match`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preferences, top_n: 5 }),
      });
      if (!response.ok) throw new Error('Failed to get company recommendations');
      const data = await response.json();
      setRecommendations(data.recommendations);
    } catch (err: any) {
      setError(err.message || 'Failed to get recommendations');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: '#000' }}>
      <div className="w-full flex justify-center items-center fixed top-0 left-0 z-20 pt-6 pointer-events-none">
        <h2 className="text-4xl font-extrabold text-purple-600 text-center">Cultural Match</h2>
      </div>
      <h1 className="text-3xl font-bold mb-8 text-center text-white">What kind of company culture are you looking for?</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl flex flex-col items-center relative mb-8"
        autoComplete="off"
      >
        <div className="relative w-full">
          <input
            type="text"
            value={preferences}
            onChange={e => setPreferences(e.target.value)}
            placeholder="Describe your ideal work environment..."
            className="w-full p-4 pr-12 rounded-xl bg-gray-800 text-white text-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            onKeyDown={e => { if (e.key === 'Enter') handleSubmit(); }}
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center transition-colors duration-150 disabled:bg-gray-400"
            tabIndex={-1}
            aria-label="Submit"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
      {error && (
        <div className="mt-6 flex items-center justify-center gap-2 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg text-center">
          {error}
        </div>
      )}
      {recommendations.length > 0 && (
        <div className="mt-10 w-full px-2">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">Top 5 Company Matches</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {recommendations.slice(0, 5).map((company, idx) => {
              const hasImage = company.image_path && company.image_path.trim() !== '';
              return (
                <div
                  key={idx}
                  className={`relative rounded-xl shadow border border-gray-800 overflow-hidden flex flex-col items-center justify-center transition-all duration-500 ${
                    idx < visibleCards ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                  style={{
                    width: 180,
                    height: 120,
                    minWidth: 180,
                    background: hasImage
                      ? `url(${company.image_path}) center/cover no-repeat`
                      : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                    opacity: hasImage ? 0.85 : 1,
                  }}
                >
                  <span className="text-lg font-bold text-center px-2 text-purple-900 drop-shadow-md">
                    {company.company_name}
                  </span>
                  <span className="mt-2 text-sm font-medium px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                    {(company.similarity_score * 100).toFixed(1)}% match
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
