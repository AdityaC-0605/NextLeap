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
                raise ValueError(
                    "No API key provided and GEMINI_API_KEY not found in environment variables"
                )

        # Configure the Gemini API (no hardcoded keys)
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('gemini-2.0-flash')
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
        Get information about a specific skill from Gemini
        Args:
            skill_name: The name of the skill
        Returns:
            str: Detailed information about the skill
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

        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            if self._is_quota_error(e):
                self._quota_unavailable = True
                logger.warning("Gemini quota unavailable (429/rate-limit). Using fallback advice for this request.")
            else:
                logger.warning("Gemini API error for skill '%s': %s", skill_name, e)
            return self._fallback_message(skill_name)
    
    def get_missing_skills_info(self, missing_skills: List[str]) -> dict:
        """
        Get information about multiple missing skills
        Args:
            missing_skills: List of skills to get information about
        Returns:
            dict: Dictionary mapping each skill to its information
        """
        skills_info = {}
        
        for skill in missing_skills:
            skills_info[skill] = self.get_skill_information(skill)
            
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
