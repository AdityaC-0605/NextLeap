// lib/career-model.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';

export interface CareerRecommendation {
  next_role: string;
  predicted_salary: number;
  salary_increase: number;
  skills_to_learn: string;
}

export interface CareerRequest {
  current_role: string;
  years_experience: number;
  education: string;
  current_salary: number;
}

export async function getCareerRecommendations(request: CareerRequest): Promise<CareerRecommendation[]> {
  const response = await fetch(`${API_URL}/api/career-recommendations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to get career recommendations');
  }

  return response.json();
}

export async function getFresherRecommendations(skills: string[]): Promise<CareerRecommendation[]> {
  const response = await fetch(`${API_URL}/api/fresher-recommendations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ skills }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to get fresher recommendations');
  }

  return response.json();
}
