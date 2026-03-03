import google.generativeai as genai
from typing import List
import os
import logging

logger = logging.getLogger(__name__)

class GeminiSkillsAdvisor:
    def __init__(self, api_key=None):
        """
        Initialize the Gemini API client
        Args:
            api_key: The Gemini API key, if None will try to get from environment
        """
        if api_key is None:
            api_key = os.environ.get("GEMINI_API_KEY")
            if not api_key:
                raise ValueError("No API key provided and GEMINI_API_KEY not found in environment variables")
        
        # Configure the Gemini API
        genai.configure(api_key=api_key)
        
        # Try available models in preference order
        model_name = 'gemini-2.0-flash'
        try:
            self.model = genai.GenerativeModel(model_name)
        except Exception:
            # Fallback to generic latest flash
            model_name = 'gemini-flash-latest'
            self.model = genai.GenerativeModel(model_name)
        
        logger.info(f"Gemini initialized with model: {model_name}")
        self._quota_unavailable = False

    def _fallback_message(self, skill_name: str) -> str:
        return (
            f"**{skill_name}** is a valuable technical skill. "
            "While our AI advisor is currently experiencing high traffic, "
            "we recommend checking official documentation and interactive courses "
            "on platforms like Coursera, Udemy, or freeCodeCamp to get started. "
            "Typical learning time for basics is 2-4 weeks."
        )

    def _is_quota_error(self, error: Exception) -> bool:
        msg = str(error).upper()
        return "RATE_LIMIT_EXCEEDED" in msg or "QUOTA" in msg or "429" in msg
    
    def get_skill_information(self, skill_name: str) -> str:
        """
        Get information about a specific skill from Gemini.
        Includes retry logic for rate-limit (429) errors.
        """
        prompt = f"""
        Provide concise information about the technical skill "{skill_name}" for someone who wants to learn it:
        1. Brief explanation of what {skill_name} is (1-2 sentences)
        2. Why it's important in tech/industry (1 sentence)
        3. Resources to learn it (1-2 top resources)
        4. Approximate time to learn basics (1 sentence)
        
        Keep the entire response under 150 words.
        """
        
        if self._quota_unavailable:
            return self._fallback_message(skill_name)

        import time
        max_retries = 2
        for attempt in range(max_retries + 1):
            try:
                response = self.model.generate_content(prompt)
                return response.text
            except Exception as e:
                if self._is_quota_error(e):
                    if attempt < max_retries:
                        # Extract retry delay from error if possible, otherwise use 35s
                        wait_time = 35
                        error_str = str(e)
                        if 'retry in' in error_str.lower():
                            import re
                            match = re.search(r'retry in (\d+)', error_str)
                            if match:
                                wait_time = min(int(match.group(1)) + 2, 60)
                        logger.info(f"Rate limited for '{skill_name}', retrying in {wait_time}s (attempt {attempt + 1}/{max_retries})")
                        time.sleep(wait_time)
                        continue
                    else:
                        self._quota_unavailable = True
                        logger.warning("Gemini quota exhausted after retries. Using fallback advice.")
                else:
                    logger.warning("Gemini API error for skill '%s': %s", skill_name, e)
                return self._fallback_message(skill_name)
    
    def get_missing_skills_info(self, missing_skills: List[str]) -> dict:
        """
        Get information about multiple missing skills.
        Adds a small delay between API calls to avoid rate-limiting.
        """
        import time
        skills_info = {}
        
        for i, skill in enumerate(missing_skills):
            skills_info[skill] = self.get_skill_information(skill)
            # Small delay between calls to avoid hitting per-minute rate limits
            if i < len(missing_skills) - 1 and not self._quota_unavailable:
                time.sleep(2)
            
        return skills_info


# Add this function to your ResumeParser class
    def get_missing_skills_advice(self, missing_skills, gemini_advisor):
        """
        Get advice about missing skills from Gemini
        Args:
            missing_skills (list): List of missing skills
            gemini_advisor: Initialized GeminiSkillsAdvisor object
        Returns:
            dict: Dictionary with information about each missing skill
        """
        if not missing_skills:
            return {}
        
        return gemini_advisor.get_missing_skills_info(missing_skills)
