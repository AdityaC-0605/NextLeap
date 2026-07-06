"""Tests for the resume skill-matching logic.

The word-boundary matching in ``ResumeParser.analyze_skill_match`` is the most
bug-prone part of the codebase: it must match real skills ("react" ->
"React.js or Angular") while rejecting single-character false positives
("r" -> "RESTful APIs"). These tests pin that behaviour down.
"""
import pytest

from resume_parser import ResumeParser


@pytest.fixture(scope="module")
def parser():
    # __init__ loads the spaCy model, so build it once for the whole module.
    return ResumeParser()


def _match(parser, candidates_by_category, required):
    return parser.analyze_skill_match(candidates_by_category, required)


def test_exact_match_is_case_insensitive(parser):
    result = _match(parser, {"Programming Languages": ["python"]}, ["Python"])
    assert result["matched_skills"] == ["Python"]
    assert result["missing_skills"] == []
    assert result["match_percentage"] == 100.0


def test_single_char_skill_does_not_false_positive(parser):
    # "r" must NOT match "RESTful APIs" (the bug the matcher was written to avoid)
    result = _match(parser, {"Programming Languages": ["r"]}, ["RESTful APIs"])
    assert result["matched_skills"] == []
    assert result["missing_skills"] == ["RESTful APIs"]


def test_word_boundary_match_within_compound_requirement(parser):
    # "react" appears as a whole word inside "React.js or Angular"
    result = _match(
        parser,
        {"Web Frameworks & Libraries": ["react"]},
        ["React.js or Angular"],
    )
    assert "React.js or Angular" in result["matched_skills"]


def test_unrelated_skill_is_missing(parser):
    result = _match(parser, {"Programming Languages": ["python"]}, ["Java"])
    assert result["matched_skills"] == []
    assert result["missing_skills"] == ["Java"]


def test_partial_match_percentage(parser):
    result = _match(
        parser,
        {"Programming Languages": ["python"], "DevOps & Deployment": ["docker"]},
        ["Python", "Kubernetes", "Docker", "Terraform"],
    )
    assert set(result["matched_skills"]) == {"Python", "Docker"}
    assert result["match_percentage"] == pytest.approx(50.0)


def test_empty_required_skills_is_zero_percent(parser):
    result = _match(parser, {"Programming Languages": ["python"]}, [])
    assert result["match_percentage"] == 0
    assert result["matched_skills"] == []


def test_extract_skills_categorizes_known_skills(parser):
    doc = parser.nlp("Experienced with Python, React and Docker in production.")
    categorized = parser.extract_skills(doc)
    flat = {s.lower() for skills in categorized.values() for s in skills}
    assert {"python", "react", "docker"} <= flat


def test_parse_resume_missing_file_returns_none(parser):
    assert parser.parse_resume("/no/such/file.pdf") is None
