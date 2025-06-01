# NextLeap

## Overview
NextLeap is an AI-powered career recommendation platform designed to help users find optimal career paths, skill gaps, and company culture matches. It leverages data science, machine learning, and NLP to provide personalized recommendations based on user profiles, resumes, and preferences.

## Features
- **Career Transition Recommendations:** Suggests the best next roles based on current role, experience, education, and salary.
- **Fresher Recommendations:** Provides role suggestions for freshers based on their skills.
- **Skill Gap Analysis:** Identifies skills to learn for career advancement.
- **Company Culture Match:** Recommends companies matching user preferences.
- **Resume Parsing:** Extracts relevant information from resumes for tailored advice.

## Tech Stack
- **Backend:** Python, FastAPI
- **Frontend:** Next.js (TypeScript, React)
- **ML/NLP:** Pandas, scikit-learn, custom models
- **Other:** Tailwind CSS, CORS, Uvicorn

## Directory Structure
- `main.py` — FastAPI backend with all API endpoints
- `app/` — Next.js frontend application
- `components/` — React components for the frontend
- `resume_parser.py`, `gemini_integration.py`, `culturematch.py` — Core backend modules
- `career_dataset.csv` — Main dataset for career recommendations
- `public/`, `styles/` — Static assets and styles

## Setup & Installation
### Python Backend
1. **Install dependencies:**
   ```bash
   pip install fastapi uvicorn pandas numpy scikit-learn gym
   ```
2. **Run API server:**
   ```bash
   python main.py or uvicorn main:app --reload
   ```
   The API will be available at `http://localhost:8000`.

### Next.js Frontend
1. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```
2. **Run the frontend:**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```
   The frontend will be available at `http://localhost:3000`.

## API Endpoints
- `GET /health` — Health check
- `POST /api/career-recommendations` — Get career path suggestions
- `POST /api/fresher-recommendations` — Get recommendations for freshers
- `POST /api/cultural-match` — Get company culture matches

## Environment Variables
- `.env`, `.env.local` — Store API keys and configuration secrets here

## Notes
- Make sure `career_dataset.csv` is present in the root directory for recommendations to work.
- For resume parsing and advanced skill gap analysis, ensure all Python dependencies are installed.
