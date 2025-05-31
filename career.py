import pandas as pd
import numpy as np
import random
import gym
from gym import spaces
from sklearn.preprocessing import LabelEncoder

df = pd.read_csv("career_dataset.csv")

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
    "SDET (Software Development Engineer in Test)": "Testing & Quality Assurance",
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

df['domain'] = df['next_role'].map(domain_mapping)

encoders = {}
for col in ['current_role', 'next_role', 'education_level']:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    encoders[col] = le

role_name_map = {name.lower(): name for name in encoders['current_role'].classes_}
edu_name_map = {name.lower(): name for name in encoders['education_level'].classes_}

class CareerEnv(gym.Env):
    def __init__(self, data):
        super(CareerEnv, self).__init__()
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

env = CareerEnv(df)
q_table = np.zeros((df['current_role'].nunique(), env.action_space.n))
alpha, gamma, epsilon = 0.1, 0.6, 0.1
episodes = 10000

for _ in range(episodes):
    state = env.reset()
    current_role = int(state[0])
    action = env.action_space.sample() if random.uniform(0, 1) < epsilon else np.argmax(q_table[current_role])
    next_state, reward, _, _ = env.step(action)
    next_role = int(next_state[0])
    q_table[current_role, action] = (1 - alpha) * q_table[current_role, action] + alpha * (reward + gamma * np.max(q_table[next_role]))

user_role = input("Enter your current role (or type 'Fresher'): ").strip().lower()

if user_role == 'fresher':
    user_skills = input("Enter your known skills (comma-separated): ").lower().split(',')
    user_skills = [skill.strip() for skill in user_skills]
    df['skill_match'] = df['skills_to_learn'].apply(lambda x: sum(skill in str(x).lower() for skill in user_skills))
    recommended = df[df['skill_match'] > 0].sort_values(by='skill_match', ascending=False).drop_duplicates('next_role')
    if not recommended.empty:
        print("\n--- Career Recommendations for Freshers ---")
        for _, row in recommended.head(2).iterrows():
            role = encoders['next_role'].inverse_transform([int(row['next_role'])])[0]
            print(f"\nRole: {role}")
            print(f"Required Skills: {row['skills_to_learn']}")
    else:
        print("No role matches found. Consider learning more in-demand technical skills.")
else:
    actual_role = role_name_map.get(user_role, None)
    if actual_role is None:
        print("Role not recognized. Using default: Software Developer / Engineer")
        actual_role = 'Software Developer / Engineer'
    encoded_role = encoders['current_role'].transform([actual_role])[0]
    domain_of_user = domain_mapping.get(actual_role, None)
    user_experience = float(input("Enter your years of experience: "))
    user_education_input = input("Enter your education level (e.g., Bachelors, Masters, PhD): ").strip().lower()
    user_salary = float(input("Enter your current salary (LPA): "))
    user_education = edu_name_map.get(user_education_input, 'Bachelors')
    encoded_edu = encoders['education_level'].transform([user_education])[0]
    q_values = q_table[encoded_role]
    valid_actions = []
    for idx, q in enumerate(q_values):
        match = df[(df['next_role'] == idx) & (df['domain'] == domain_of_user)]
        if not match.empty:
            sample = match.iloc[0]
            if sample['predicted_salary_LPA'] > user_salary and idx != encoded_role:
                valid_actions.append((idx, q))
    top_roles = sorted(valid_actions, key=lambda x: x[1], reverse=True)
    recommendations = []
    for action_idx, q in top_roles:
        if len(recommendations) >= 2:
            break
        if action_idx != encoded_role and action_idx not in [r[0] for r in recommendations]:
            recommendations.append((action_idx, q))
    if not recommendations:
        print("No suitable recommendations found based on current Q-values and salary expectations.")
    else:
        print("\n--- Career Forecast Report ---")
        for idx, (action_idx, _) in enumerate(recommendations):
            role = encoders['next_role'].inverse_transform([action_idx])[0]
            info = df[df['next_role'] == action_idx].iloc[0]
            diff = info['predicted_salary_LPA'] - user_salary
            print(f"\nSuggestion {idx + 1}:")
            print(f"Next Role: {role}")
            print(f"Skills to Learn: {info['skills_to_learn']}")
            print(f"Expected Salary Increase: {user_salary:.2f} → {info['predicted_salary_LPA']:.2f} LPA (Δ {diff:.2f} LPA)")












