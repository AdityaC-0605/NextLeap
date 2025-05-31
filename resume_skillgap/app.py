# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import tempfile
import os

from resume_parser import ResumeParser
# from gemini_integration import GeminiSkillsAdvisor  # Removed unused import

app = Flask(__name__)
CORS(app)  # allow frontend requests

parser = ResumeParser()
# gemini_advisor = GeminiSkillsAdvisor()  # Removed unused instance

@app.route('/api/analyze-skills', methods=['POST'])
def analyze_skills():
    if request.content_type and request.content_type.startswith('application/json'):
        # Handle skill match request
        data = request.get_json()
        categorized_skills = data.get('categorized_skills')
        target_role = data.get('target_role')
        if not categorized_skills or not target_role:
            return jsonify({'error': 'Missing categorized_skills or target_role'}), 400
        if target_role not in parser.job_roles_skills:
            return jsonify({'error': 'Invalid target_role'}), 400
        required_skills = parser.job_roles_skills[target_role]
        skill_match = parser.analyze_skill_match(categorized_skills, required_skills)
        return jsonify({'skill_match': skill_match})

    # Handle file upload for skill extraction
    if 'resume' not in request.files:
        return jsonify({"error": "No resume file provided"}), 400

    resume_file = request.files['resume']
    original_filename = resume_file.filename
    if resume_file.filename == '':
        return jsonify({"error": "Empty filename"}), 400

    ext = os.path.splitext(original_filename)[1]
    with tempfile.NamedTemporaryFile(delete=False, suffix=ext) as temp:
        resume_file.save(temp.name)
        file_path = temp.name

    try:
        results = parser.parse_resume(file_path)
        if results:
            return jsonify(results)
        else:
            return jsonify({"error": "Failed to parse resume"}), 500
    except Exception as e:
        import traceback
        print("❌ Error during resume parsing:", str(e))
        traceback.print_exc()  # <-- Add this to see where it fails
        return jsonify({"error": f"Internal server error: {str(e)}"}), 500
    finally:
        os.remove(file_path)

@app.route('/api/ai-advice', methods=['POST'])
def ai_advice():
    data = request.get_json()
    missing_skills = data.get('missing_skills')
    if not missing_skills:
        return jsonify({'error': 'No missing_skills provided'}), 400
    # Import and use GeminiSkillsAdvisor or your AI logic
    from gemini_integration import GeminiSkillsAdvisor
    gemini_advisor = GeminiSkillsAdvisor()
    advice = gemini_advisor.get_missing_skills_info(missing_skills)
    return jsonify({'advice': advice})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
