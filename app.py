import os
from flask import Flask, render_template, request, redirect, url_for, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS

from resume_parser import ResumeParser
from gemini_integration import GeminiSkillsAdvisor

app = Flask(__name__)
app.secret_key = "your_secret_key"
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
CORS(app)  # Allow requests from Next.js

resume_parser = ResumeParser()
gemini_advisor = GeminiSkillsAdvisor()

@app.route('/', methods=['GET', 'POST'])
def resume_parser_route():
    step = request.form.get('step', 'upload')
    extracted_skills = None
    selected_role = None
    matched_skills = []
    missing_skills = []
    ai_advice = {}

    # Step 1: Upload and extract skills
    if step == 'skills' and 'resume' in request.files:
        file = request.files['resume']
        filename = secure_filename(file.filename)
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)
        result = resume_parser.parse_resume(filepath)
        os.remove(filepath)
        extracted_skills = result['categorized_skills'] if result else {}
        return render_template(
            'resume_parser.html',
            step='skills',
            extracted_skills=extracted_skills,
            selected_role='',
            matched_skills=[],
            missing_skills=[],
            ai_advice={}
        )

    # Step 2: Select role and analyze match
    elif step == 'role':
        extracted_skills = eval(request.form.get('extracted_skills', '{}'))
        return render_template(
            'resume_parser.html',
            step='role',
            extracted_skills=extracted_skills,
            selected_role='',
            matched_skills=[],
            missing_skills=[],
            ai_advice={}
        )

    elif step == 'match':
        extracted_skills = eval(request.form.get('extracted_skills', '{}'))
        selected_role = request.form.get('selected_role')
        result = resume_parser.parse_resume('', selected_role)  # Dummy call to get required skills
        # Actually, we need to analyze match with the selected role
        skill_match = resume_parser.analyze_skill_match(extracted_skills, resume_parser.job_roles_skills[selected_role])
        matched_skills = skill_match['matched_skills']
        missing_skills = skill_match['missing_skills']
        return render_template(
            'resume_parser.html',
            step='match',
            extracted_skills=extracted_skills,
            selected_role=selected_role,
            matched_skills=matched_skills,
            missing_skills=missing_skills,
            ai_advice={}
        )

    # Step 3: Get AI advice
    elif step == 'advice':
        selected_role = request.form.get('selected_role')
        matched_skills = eval(request.form.get('matched_skills', '[]'))
        missing_skills = eval(request.form.get('missing_skills', '[]'))
        extracted_skills = eval(request.form.get('extracted_skills', '{}'))
        ai_advice = gemini_advisor.get_missing_skills_info(missing_skills) if missing_skills else {}
        return render_template(
            'resume_parser.html',
            step='advice',
            extracted_skills=extracted_skills,
            selected_role=selected_role,
            matched_skills=matched_skills,
            missing_skills=missing_skills,
            ai_advice=ai_advice
        )

    # Default: Upload step
    return render_template(
        'resume_parser.html',
        step='upload',
        extracted_skills={},
        selected_role='',
        matched_skills=[],
        missing_skills=[],
        ai_advice={}
    )

@app.route('/api/analyze-skills', methods=['POST'])
def analyze_skills():
    if 'resume' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    file = request.files['resume']
    filepath = f'tmp_{file.filename}'
    file.save(filepath)
    result = resume_parser.parse_resume(filepath)
    os.remove(filepath)
    if not result:
        return jsonify({'error': 'Failed to extract skills'}), 500
    return jsonify({'categorized_skills': result['categorized_skills']})

if __name__ == '__main__':
    app.run(debug=True, port=5001)