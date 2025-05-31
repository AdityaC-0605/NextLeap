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
                recommendations.append({
                    "company_name": company_data["Company Name"],
                    "similarity_score": float(similarity_scores[idx]),
                    "culture_description": company_data["Text"],
                    "location": company_data.get("Location", "Not specified"),
                    "industry": company_data.get("Industry", "Not specified")
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
