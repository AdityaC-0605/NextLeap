from dotenv import load_dotenv
load_dotenv()
from fastapi import FastAPI, HTTPException, Request
import pandas as pd
import numpy as np
import random
import gym
from gym import spaces
from sklearn.preprocessing import LabelEncoder
import logging
from fastapi.middleware.cors import CORSMiddleware
from resume_parser import ResumeParser
from gemini_integration import GeminiSkillsAdvisor
from culturematch import CulturalMatcher

app = FastAPI()

# Middleware and Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load and prepare career dataset
career_df = pd.read_csv("career_dataset.csv")
career_df['skills'] = career_df['skills'].fillna('')
career_df['skills_to_learn'] = career_df['skills_to_learn'].fillna('')

domain_mapping = {
    "Software Engineer": "Software Development",
    "Full Stack Developer": "Software Development",
    "Front-End Developer (React, Angular, etc.)": "Software Development",
    "Back-End Developer (Node.js, Django, Spring Boot, etc.)": "Software Development",
    "Mobile App Developer (Android/iOS)": "Software Development",
    "DevOps Engineer": "Software Development",
    "Site Reliability Engineer (SRE)": "Software Development",
    "Embedded Software Engineer": "Software Development",
    "Game Developer": "Software Development",
    "API Developer": "Software Development",
    "Software Architect": "Software Development",
    "Cloud Developer (AWS/GCP/Azure)": "Software Development",
    "Data Scientist": "Data Science & Analytics",
    "Data Analyst": "Data Science & Analytics",
    "Business Intelligence Analyst": "Data Science & Analytics",
    "Machine Learning Engineer": "Data Science & Analytics",
    "Data Engineer": "Data Science & Analytics",
    "Big Data Engineer": "Data Science & Analytics",
    "Decision Scientist": "Data Science & Analytics",
    "AI/ML Research Scientist": "Data Science & Analytics",
    "NLP Engineer": "Data Science & Analytics",
    "Deep Learning Engineer": "Data Science & Analytics",
    "Computer Vision Engineer": "Data Science & Analytics",
    "MLOps Engineer": "Data Science & Analytics",
    "Cybersecurity Analyst": "Cybersecurity",
    "Security Engineer": "Cybersecurity",
    "Ethical Hacker": "Cybersecurity",
    "Security Architect": "Cybersecurity",
    "Network Security Engineer": "Cybersecurity",
    "SOC Analyst": "Cybersecurity",
    "Information Security Analyst": "Cybersecurity",
    "Cryptographer": "Cybersecurity",
    "Cloud Solutions Architect": "Cloud & Infrastructure",
    "Cloud Engineer": "Cloud & Infrastructure",
    "System Administrator": "Cloud & Infrastructure",
    "Network Engineer": "Cloud & Infrastructure",
    "IT Infrastructure Engineer": "Cloud & Infrastructure",
    "Database Administrator (DBA)": "Cloud & Infrastructure",
    "Virtualization Engineer": "Cloud & Infrastructure",
    "Storage Engineer": "Cloud & Infrastructure",
    "Technical Support Engineer": "IT Support & Systems",
    "IT Support Specialist": "IT Support & Systems",
    "Help Desk Technician": "IT Support & Systems",
    "System Support Engineer": "IT Support & Systems",
    "Desktop Support Engineer": "IT Support & Systems",
    "QA Engineer": "Testing & Quality Assurance",
    "Automation Test Engineer": "Testing & Quality Assurance",
    "Manual Test Engineer": "Testing & Quality Assurance",
    "Performance Tester": "Testing & Quality Assurance",
    "SDET": "Testing & Quality Assurance",
    "Test Architect": "Testing & Quality Assurance",
    "UI Developer": "UI/UX and Web Technology",
    "UX Designer": "UI/UX and Web Technology",
    "AI Research Scientist": "AI Research & Emerging Tech",
    "Robotics Engineer": "AI Research & Emerging Tech",
    "Quantum Computing Researcher": "AI Research & Emerging Tech",
    "Blockchain Developer": "AI Research & Emerging Tech",
    "AR/VR Developer": "AI Research & Emerging Tech",
    "Computer Vision Researcher": "AI Research & Emerging Tech",
    "Technical Program Manager (TPM)": "Technical Management & Consulting",
    "Engineering Manager": "Technical Management & Consulting",
    "Product Manager (Technical)": "Technical Management & Consulting"
}

career_df['domain'] = career_df['next_role'].map(domain_mapping)

encoders = {}
for col in ['current_role', 'next_role', 'education_level']:
    le = LabelEncoder()
    career_df[col] = le.fit_transform(career_df[col])
    encoders[col] = le

role_name_map = {name.lower(): name for name in encoders['current_role'].classes_}
edu_name_map = {name.lower(): name for name in encoders['education_level'].classes_}

# Define environment
class CareerEnv(gym.Env):
    def __init__(self, data):
        super().__init__()
        self.data = data
        self.max_steps = len(data) - 1
        self.observation_space = spaces.Box(low=0, high=100, shape=(4,), dtype=np.float32)
        self.action_space = spaces.Discrete(data['next_role'].nunique())

    def reset(self):
        self.current_step = random.randint(0, self.max_steps)
        row = self.data.iloc[self.current_step]
        return np.array([row['current_role'], row['years_experience'], row['education_level'], row['current_salary_LPA']], dtype=np.float32)

    def step(self, action):
        row = self.data.iloc[self.current_step]
        reward = 0
        done = True
        if action == row['next_role']:
            increase = row['predicted_salary_LPA'] - row['current_salary_LPA']
            reward = increase if increase > 0 else 0
        next_state = self.reset()
        return next_state, reward, done, {}

env = CareerEnv(career_df)
q_table = np.zeros((career_df['current_role'].nunique(), env.action_space.n))
alpha, gamma, epsilon = 0.1, 0.6, 0.1

for _ in range(10000):
    state = env.reset()
    current_role = int(state[0])
    action = env.action_space.sample() if random.uniform(0, 1) < epsilon else np.argmax(q_table[current_role])
    next_state, reward, _, _ = env.step(action)
    next_role = int(next_state[0])
    q_table[current_role, action] = (1 - alpha) * q_table[current_role, action] + alpha * (reward + gamma * np.max(q_table[next_role]))

# Resume and Culture systems
resume_parser = ResumeParser()
gemini_advisor = GeminiSkillsAdvisor()
cultural_matcher = CulturalMatcher()

@app.get("/health")
def health():
    return {"status": "running"}

@app.post("/api/career-recommendations")
def get_career_recommendations(request: dict):
    user_role = request.get("current_role", "").strip().lower()

    if user_role == 'fresher':
        return {"message": "Use /api/fresher-recommendations for fresher queries"}

    actual_role = role_name_map.get(user_role)
    if actual_role is None:
        for role in role_name_map:
            if user_role in role:
                actual_role = role_name_map[role]
                break
        if actual_role is None:
            raise HTTPException(status_code=400, detail="Role not recognized.")

    encoded_role = encoders['current_role'].transform([actual_role])[0]
    domain_of_user = domain_mapping.get(actual_role, None)
    user_experience = float(request.get("years_experience", 0))
    user_education_input = request.get("education", "Bachelors").strip().lower()
    user_salary = float(request.get("current_salary", 0))
    user_education = edu_name_map.get(user_education_input, 'Bachelors')
    encoded_edu = encoders['education_level'].transform([user_education])[0]

    q_values = q_table[encoded_role]
    valid_actions = []
    for idx, q in enumerate(q_values):
        match = career_df[(career_df['next_role'] == idx) & (career_df['domain'] == domain_of_user)]
        if not match.empty:
            sample = match.iloc[0]
            if sample['predicted_salary_LPA'] > user_salary and idx != encoded_role:
                valid_actions.append((idx, q))

    if not valid_actions:
        return [{"message": "No suitable career transitions found."}]

    top_roles = sorted(valid_actions, key=lambda x: x[1], reverse=True)[:2]
    recommendations = []
    for action_idx, _ in top_roles:
        info = career_df[career_df['next_role'] == action_idx].iloc[0]
        role = encoders['next_role'].inverse_transform([action_idx])[0]
        recommendations.append({
            "next_role": role,
            "skills_to_learn": info['skills_to_learn'],
            "predicted_salary": info['predicted_salary_LPA'],
            "salary_increase": info['predicted_salary_LPA'] - user_salary
        })

    return recommendations

@app.post("/api/fresher-recommendations")
def get_fresher_recommendations(request: dict):
    skills = [s.lower() for s in request.get("skills", [])]
    if not skills:
        raise HTTPException(status_code=400, detail="Skills are required")

    career_df['skill_match'] = career_df['skills_to_learn'].apply(lambda x: sum(skill in str(x).lower() for skill in skills))
    recs = career_df[career_df['skill_match'] > 0].drop_duplicates('next_role').sort_values(by='skill_match', ascending=False).head(2)

    return [{
        "next_role": encoders['next_role'].inverse_transform([int(row['next_role'])])[0],
        "skills_to_learn": row['skills_to_learn'],
        "predicted_salary": row['predicted_salary_LPA']
    } for _, row in recs.iterrows()]

@app.post("/api/cultural-match")
async def cultural_match(request: Request):
    try:
        data = await request.json()
        preferences = data.get("preferences")
        top_n = data.get("top_n", 5)

        if not preferences:
            raise HTTPException(status_code=400, detail="Preferences are required")

        recommendations = cultural_matcher.get_company_recommendations(preferences, top_n)
        return {"recommendations": recommendations}
    except Exception as e:
        logger.error(f"Cultural matching failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))

from fastapi import UploadFile, File, Form
import shutil

@app.post("/api/analyze-skills")
async def analyze_skills(
    resume: UploadFile = File(...),
    target_role: str = Form(None),
    gemini_advice: bool = Form(False)
):
    """
    Analyze uploaded resume and return categorized skills (and skill match if target_role provided).
    If gemini_advice is true and there are missing skills, return Gemini-powered advice for missing skills.
    """
    import os
    import tempfile
    try:
        suffix = os.path.splitext(resume.filename)[1]
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
            shutil.copyfileobj(resume.file, tmp)
            tmp_path = tmp.name
        # Parse resume
        result = resume_parser.parse_resume(tmp_path, target_role)
        os.remove(tmp_path)
        if not result:
            raise HTTPException(status_code=500, detail="Failed to extract skills")

        # If Gemini advice is requested and missing skills exist
        if gemini_advice and result.get("skill_match") and result["skill_match"].get("missing_skills"):
            missing_skills = result["skill_match"]["missing_skills"]
            gemini_info = resume_parser.get_missing_skills_advice(missing_skills, gemini_advisor)
            result["gemini_advice"] = gemini_info
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
