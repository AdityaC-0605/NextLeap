# NextLeap

## Overview
NextLeap is an AI-powered career recommendation platform designed to help users find optimal career paths, skill gaps, and company culture matches. It leverages data science, machine learning, and NLP to provide personalized recommendations based on user profiles, resumes, and preferences.

## Features
- **Career Transition Recommendations:** Suggests the best next roles based on current role, experience, education, and salary.
- **Fresher Recommendations:** Provides role suggestions for freshers based on their skills.
- **Skill Gap Analysis:** Identifies skills to learn for career advancement.
- **Company Culture Match:** Recommends companies matching user preferences.
- **Resume Parsing:** Extracts relevant information from resumes for tailored advice.
- **AI-Powered Learning Recommendations:** Uses Google Gemini 1.5 Flash to suggest learning paths for missing skills.

## Tech Stack
- **Backend:** Python, FastAPI
- **Frontend:** Next.js 15 (TypeScript, React)
- **ML/NLP:** Pandas, scikit-learn, Gymnasium (Reinforcement Learning)
- **AI Integration:** Google Gemini 1.5 Flash
- **Styling:** Tailwind CSS
- **Server:** Uvicorn

## Directory Structure
- `main.py` — FastAPI backend with all API endpoints
- `app/` — Next.js frontend application
- `components/` — React components for the frontend
- `resume_parser.py`, `gemini_integration.py`, `culturematch.py` — Core backend modules
- `career_dataset.csv`, `merged_data.csv` — Datasets for recommendations and culture matching
- `public/` — Static assets (images, icons)
- `.env` — Stores API keys (e.g., `GEMINI_API_KEY`)

## Setup & Installation

### Prerequisites
- Python 3.9+
- Node.js 18+
- npm

### 1. Python Backend
Install the required dependencies and start the FastAPI server.

```bash
# Create and activate a virtual environment (optional but recommended)
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the API server
python main.py
```
The API will be available at `http://localhost:8000`.

### 2. Next.js Frontend
Install the frontend dependencies and start the development server.

```bash
# Install dependencies
npm install --legacy-peer-deps

# Run the frontend
npm run dev
```
The frontend will be available at `http://localhost:3000`.

## API Endpoints
- `GET /health` — Health check
- `POST /api/career-recommendations` — Get career path suggestions
- `POST /api/fresher-recommendations` — Get recommendations for freshers
- `POST /api/cultural-match` — Get company culture matches
- `POST /api/analyze-skills` — Unified skill gap analysis and Gemini AI advice
- `POST /api/ai-advice` — Direct skill advice from Gemini

## Environment Variables
Create a `.env` file in the root directory:

```env
GEMINI_API_KEY=your_google_gemini_api_key
```

## Deployment (Render)
This project is ready to be deployed on [Render](https://render.com/).

1. **New Web Service (Backend):**
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `python main.py`
   - Environment Variables: Add `GEMINI_API_KEY`.

2. **New Static Site or Web Service (Frontend):**
   - Build Command: `npm install --legacy-peer-deps && npm run build`
   - Start Command: `npm start`
   - Ensure the frontend API calls point to your Render backend URL.