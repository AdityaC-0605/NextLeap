from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
import os
from typing import List, Dict
import logging
import argparse
import json
import sys

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class CulturalMatcher:
    def __init__(self, data_path: str = "merged_data.csv"):
        """
        Initialize the cultural matcher
        Args:
            data_path: Path to the CSV file containing company culture data
        """
        try:
            self.data = pd.read_csv(data_path)
            logger.info(f"Successfully loaded cultural data from {data_path}")
            
            # Initialize TF-IDF vectorizer with custom stop words
            custom_stop_words = [word for word in TfidfVectorizer(stop_words='english').get_stop_words() 
                               if word not in ['no', 'not']]
            self.vectorizer = TfidfVectorizer(stop_words=custom_stop_words)
            self.tfidf_matrix = self.vectorizer.fit_transform(self.data["Text"])
            
        except Exception as e:
            logger.error(f"Failed to initialize cultural matcher: {e}")
            raise

    def _find_company_image(self, company_name: str) -> str:
        """Try to find a matching company logo in public/images/"""
        images_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "public", "images")
        if not os.path.isdir(images_dir):
            return ""
        
        # Normalize company name for matching
        name_lower = company_name.lower().replace(" ", "").replace(".", "").replace(",", "")
        
        try:
            for filename in os.listdir(images_dir):
                fname_lower = os.path.splitext(filename)[0].lower().replace(" ", "").replace(".", "").replace(",", "")
                if name_lower in fname_lower or fname_lower in name_lower:
                    return f"/images/{filename}"
        except OSError:
            pass
        
        return ""

    def get_company_recommendations(self, user_input: str, top_n: int = 5) -> List[Dict]:
        """
        Get company recommendations based on user input
        Args:
            user_input: User's preferences and requirements
            top_n: Number of recommendations to return
        Returns:
            List of dictionaries containing company recommendations
        """
        try:
            # Transform user input
            user_tfidf = self.vectorizer.transform([user_input])
            
            # Calculate similarity scores
            similarity_scores = cosine_similarity(user_tfidf, self.tfidf_matrix).flatten()
            
            # Get top N recommendations
            top_indices = similarity_scores.argsort()[-top_n:][::-1]
            
            # Prepare recommendations
            recommendations = []
            for idx in top_indices:
                company_data = self.data.iloc[idx]
                company_name = company_data["Company Name"]
                
                # Use Description column for cleaner culture text, fallback to Text
                culture_text = company_data.get("Description", "") or company_data.get("Text", "")
                # Clean up whitespace
                if isinstance(culture_text, str):
                    culture_text = " ".join(culture_text.split())
                
                recommendations.append({
                    "company_name": company_name,
                    "similarity_score": float(similarity_scores[idx]),
                    "culture_description": culture_text,
                    "location": company_data.get("Location", "Multiple Locations"),
                    "industry": company_data.get("Industry", "Technology"),
                    "image_path": self._find_company_image(company_name),
                })
            
            return recommendations
            
        except Exception as e:
            logger.error(f"Error getting company recommendations: {e}")
            raise

def main():
    parser = argparse.ArgumentParser(description='Get company cultural matches based on user preferences')
    parser.add_argument('--input', type=str, required=True, help='User preferences text')
    parser.add_argument('--top_n', type=int, default=5, help='Number of recommendations to return')
    args = parser.parse_args()

    try:
        cultural_matcher = CulturalMatcher()
        recommendations = cultural_matcher.get_company_recommendations(args.input, args.top_n)
        print(json.dumps(recommendations))
        return 0
    except Exception as e:
        logger.error(f"Error in main: {e}")
        return 1

if __name__ == "__main__":
    sys.exit(main())
