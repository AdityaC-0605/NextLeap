import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))

models = ['gemini-2.5-flash', 'gemini-flash-latest', 'gemini-2.0-flash-lite-001', 'gemma-3-1b-it', 'gemini-2.5-flash-lite']

for m in models:
    try:
        model = genai.GenerativeModel(m)
        r = model.generate_content("hello")
        print(f"{m}: OK -> {r.text[:20]}")
    except Exception as e:
        print(f"{m}: Error -> {str(e)[:100]}")
