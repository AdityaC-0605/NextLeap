# Create and activate virtual environment
python -m venv venv
.\venv\Scripts\Activate.ps1

# Install Python dependencies
pip install fastapi uvicorn pandas numpy scikit-learn gym python-dotenv spacy[transformers] PyPDF2 docx2txt

# Download spaCy model (large, for best results)
python -m spacy download en_core_web_lg

# Install Node.js dependencies
npm install

# Create .env file for Gemini API key
if (-not (Test-Path .env)) {
    @"
# Gemini API Key
GEMINI_API_KEY=your_api_key_here

# Next.js API URL
NEXT_PUBLIC_API_URL=http://localhost:8000
"@ | Out-File -FilePath .env -Encoding UTF8
    Write-Host "Created .env file. Please update the GEMINI_API_KEY with your actual API key."
}

Write-Host "`nInstallation complete!`n"
Write-Host "To start the backend server (unified FastAPI with Gemini integration):"
Write-Host "1. Activate the virtual environment: .\venv\Scripts\Activate.ps1"
Write-Host "2. Run: uvicorn main:app --reload"
Write-Host "`nTo start the frontend development server:"
Write-Host "Run: npm run dev"

Write-Host "\nSkill gap analysis and Gemini AI advice are now available via the unified FastAPI backend at http://localhost:8000/api/analyze-skills.\n"