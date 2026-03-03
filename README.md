<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi" alt="FastAPI" />
  <img src="https://img.shields.io/badge/Gemini_AI-2.0_Flash-4285F4?style=for-the-badge&logo=google" alt="Gemini AI" />
  <img src="https://img.shields.io/badge/Python-3.9+-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
</p>

# 🚀 NextLeap — AI-Powered Career Intelligence Platform

**NextLeap** is a full-stack, AI-powered career development platform that helps professionals and fresh graduates discover optimal career paths, identify skill gaps, and find companies that match their cultural preferences — all driven by machine learning, reinforcement learning, and Google Gemini AI.

> 🔗 **Live Repository:** [github.com/AdityaC-0605/NextLeap](https://github.com/AdityaC-0605/NextLeap)

---

## ✨ Features

### 🎯 Career Forecasting
- **Experienced Professionals:** Input your current role, years of experience, education level, and salary to receive AI-driven career transition recommendations with predicted salary increases.
- **Fresh Graduates:** Enter your skills and get matched to the best-fit career paths using a trained reinforcement learning agent (Q-Learning over a Gymnasium environment).
- Covers **50+ tech roles** across 9 career domains — from Software Development and Data Science to Cybersecurity and AI Research.

### 🔍 Skill Gap Analysis
- **Resume Upload:** Upload your resume (PDF or DOCX) for automated skill extraction and categorization using spaCy NLP.
- **Role Matching:** Select a target role from 60+ options and get a detailed match analysis — matched skills, missing skills, and match percentage.
- **AI Learning Recommendations:** Google Gemini 2.0 Flash generates personalized learning paths for each missing skill, including resources and estimated learning timelines.
- Smart word-boundary-aware skill matching to prevent false positives.

### 🏢 Company Cultural Match
- Describe your ideal work culture using free text or quick-select culture tags (e.g., "Remote-friendly", "Innovation-driven", "Work-life balance").
- TF-IDF vectorization + cosine similarity matches your preferences against a database of 200+ companies.
- Results include company name, industry, location, culture highlights, match score, and direct links to learn more or apply.

### 🎨 Premium UI/UX
- Dark-themed glassmorphism design with ambient floating particles and smooth micro-animations.
- Fully responsive layout optimized for desktop and mobile.
- Interactive elements with hover effects, gradient accents, and animated transitions.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Next.js 15 Frontend                       │
│  ┌──────────┐  ┌──────────────┐  ┌───────────────────────┐  │
│  │  Landing  │  │   Career     │  │   Skill Gap           │  │
│  │  Page     │  │   Forecasting│  │   Analyzer            │  │
│  └──────────┘  └──────────────┘  └───────────────────────┘  │
│  ┌───────────────────────┐  ┌────────────────────────────┐  │
│  │   Cultural Match      │  │   Shared UI Components     │  │
│  └───────────────────────┘  │   (Header, Footer, etc.)   │  │
│                              └────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │ REST API (fetch)
┌────────────────────────▼────────────────────────────────────┐
│                   FastAPI Backend (Python)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────┐  │
│  │ Career RL    │  │ Resume       │  │ Cultural          │  │
│  │ Agent        │  │ Parser       │  │ Matcher           │  │
│  │ (Gymnasium)  │  │ (spaCy NLP)  │  │ (TF-IDF)         │  │
│  └──────────────┘  └──────┬───────┘  └───────────────────┘  │
│                           │                                  │
│                    ┌──────▼───────┐                          │
│                    │ Gemini AI    │                          │
│                    │ Integration  │                          │
│                    └──────────────┘                          │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 15, React 19, TypeScript |
| **Styling** | Tailwind CSS 3, Radix UI Primitives, Lucide Icons |
| **Backend** | Python 3.9+, FastAPI, Uvicorn |
| **ML / NLP** | scikit-learn (TF-IDF, Label Encoding), spaCy (NER), Gymnasium (RL) |
| **AI** | Google Gemini 2.0 Flash (generative AI for skill advice) |
| **Resume Parsing** | PyPDF2, docx2txt, spaCy |
| **Data** | Pandas, NumPy, CSV datasets |

---

## 📁 Project Structure

```
NextLeap/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Landing page
│   ├── layout.tsx                # Root layout with Header & Footer
│   ├── globals.css               # Global design system & animations
│   ├── career-forecasting/       # Career forecasting feature page
│   │   └── page.tsx
│   ├── skill-gap/                # Skill gap analyzer feature page
│   │   └── page.tsx
│   ├── cultural-match/           # Cultural match feature page
│   │   └── page.tsx
│   └── api/                      # Next.js API routes (proxy)
├── components/                   # Reusable React components
│   ├── Header.tsx                # Navigation header
│   ├── Footer.tsx                # Footer component
│   └── ui/                       # UI primitives (Button, Card, Badge, etc.)
│       ├── ambient-particles.tsx  # Floating particle background
│       ├── reveal.tsx            # Scroll-reveal animation wrapper
│       └── ...                   # Radix UI-based components
├── lib/                          # Utility modules
│   ├── api.ts                    # API client functions
│   ├── api-base.ts               # Base API URL configuration
│   ├── career-model.ts           # Career recommendation API helpers
│   ├── particles.ts              # Particle generation utilities
│   └── utils.ts                  # General utilities
├── hooks/                        # Custom React hooks
│   └── use-toast.ts              # Toast notification hook
├── main.py                       # FastAPI backend (all API endpoints)
├── resume_parser.py              # Resume text extraction & skill analysis
├── gemini_integration.py         # Google Gemini AI integration
├── culturematch.py               # TF-IDF company culture matcher
├── career_dataset.csv            # Career transition training data
├── merged_data.csv               # Company culture dataset
├── requirements.txt              # Python dependencies
├── package.json                  # Node.js dependencies
├── tailwind.config.ts            # Tailwind CSS configuration
├── next.config.mjs               # Next.js configuration
└── .env                          # Environment variables (not committed)
```

---

## ⚡ Getting Started

### Prerequisites

- **Python** 3.9 or higher
- **Node.js** 18 or higher
- **npm** 8 or higher
- A **Google Gemini API key** ([Get one here](https://aistudio.google.com/apikey))

### 1. Clone the Repository

```bash
git clone https://github.com/AdityaC-0605/NextLeap.git
cd NextLeap
```

### 2. Set Up Environment Variables

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_google_gemini_api_key_here
```

### 3. Start the Python Backend

```bash
# Create and activate a virtual environment (recommended)
python -m venv .venv
source .venv/bin/activate        # macOS/Linux
# .venv\Scripts\activate         # Windows

# Install Python dependencies
pip install -r requirements.txt

# Start the FastAPI server
python main.py
```

The API server will start at **`http://localhost:8000`**.

### 4. Start the Next.js Frontend

Open a new terminal:

```bash
# Install Node.js dependencies
npm install --legacy-peer-deps

# Start the development server
npm run dev
```

The frontend will be available at **`http://localhost:3000`**.

---

## 📡 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health check — returns `{ "status": "ok" }` |
| `POST` | `/api/career-recommendations` | Get career transition recommendations for experienced professionals |
| `POST` | `/api/fresher-recommendations` | Get career path suggestions for fresh graduates based on skills |
| `POST` | `/api/cultural-match` | Find companies matching cultural preferences (TF-IDF similarity) |
| `POST` | `/api/analyze-skills` | Upload resume for skill extraction, categorization, and role matching |
| `POST` | `/api/ai-advice` | Get Gemini AI learning advice for specific missing skills |

### Example: Career Recommendations

```bash
curl -X POST http://localhost:8000/api/career-recommendations \
  -H "Content-Type: application/json" \
  -d '{
    "current_role": "Software Developer",
    "years_experience": 3,
    "education": "Bachelors",
    "current_salary": 12
  }'
```

### Example: Skill Gap Analysis

```bash
curl -X POST http://localhost:8000/api/analyze-skills \
  -F "resume=@my_resume.pdf" \
  -F "target_role=Data Scientist" \
  -F "gemini_advice=true"
```

---

## 🧠 How It Works

### Career Forecasting Engine
The career recommendation system uses a **Reinforcement Learning agent** trained with Q-Learning on the Gymnasium framework. The agent learns optimal career transitions by:
1. Encoding user profiles (current role, experience, education, salary) as states.
2. Mapping career transitions as actions in a discrete action space.
3. Training over 10,000 episodes to learn the Q-table.
4. At inference, the top-K actions with the highest Q-values are returned as recommended next roles.

### Skill Gap Analyzer
1. **Resume Parsing:** Extracts text from PDF/DOCX using PyPDF2 and docx2txt.
2. **Skill Extraction:** Uses spaCy NLP with a curated dictionary of 400+ technical skills across 15 categories.
3. **Role Matching:** Word-boundary-aware matching compares extracted skills against role-specific requirements.
4. **AI Advice:** Google Gemini 2.0 Flash generates personalized learning paths with resources and timelines for each missing skill.

### Cultural Match Engine
1. Company culture descriptions are vectorized using **TF-IDF** with custom stop word filtering.
2. User preferences are transformed and compared using **cosine similarity**.
3. Top-N most similar companies are returned with normalized match scores.

---

## 🚢 Deployment

This project is deployment-ready for platforms like [Render](https://render.com/), [Vercel](https://vercel.com/), or [Railway](https://railway.app/).

### Backend (Render / Railway)

| Setting | Value |
|---------|-------|
| **Build Command** | `pip install -r requirements.txt` |
| **Start Command** | `python main.py` |
| **Environment Variables** | `GEMINI_API_KEY=your_key` |

### Frontend (Vercel / Render)

| Setting | Value |
|---------|-------|
| **Build Command** | `npm install --legacy-peer-deps && npm run build` |
| **Start Command** | `npm start` |
| **Environment Variable** | Ensure API calls point to your deployed backend URL |

---

## 📜 License

This project is open source and available for educational and personal use.

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/AdityaC-0605">Aditya C</a>
</p>