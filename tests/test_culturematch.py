"""Tests for the TF-IDF company cultural matcher."""
import pytest

from culturematch import CulturalMatcher

EXPECTED_KEYS = {
    "company_name",
    "similarity_score",
    "culture_description",
    "location",
    "industry",
    "image_path",
}


@pytest.fixture(scope="module")
def matcher():
    # Loads merged_data.csv and fits the TF-IDF matrix once.
    return CulturalMatcher()


def test_returns_requested_number_of_recommendations(matcher):
    recs = matcher.get_company_recommendations("innovative collaborative culture", top_n=3)
    assert len(recs) == 3


def test_recommendations_have_expected_shape(matcher):
    recs = matcher.get_company_recommendations("remote friendly work life balance", top_n=5)
    assert recs, "expected at least one recommendation"
    for rec in recs:
        assert EXPECTED_KEYS <= set(rec)
        assert isinstance(rec["similarity_score"], float)
        assert isinstance(rec["company_name"], str) and rec["company_name"]


def test_scores_are_sorted_descending(matcher):
    recs = matcher.get_company_recommendations("data driven engineering teams", top_n=5)
    scores = [r["similarity_score"] for r in recs]
    assert scores == sorted(scores, reverse=True)


def test_top_n_respected(matcher):
    assert len(matcher.get_company_recommendations("growth mentorship", top_n=1)) == 1
    assert len(matcher.get_company_recommendations("growth mentorship", top_n=10)) == 10
