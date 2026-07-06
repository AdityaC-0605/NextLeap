"""Regression test for the career-recommendation domain mapping.

``main.py`` looks up each user's ``current_role`` in ``domain_mapping`` to
decide which domain to recommend transitions within. If a current_role is
missing from the map, its domain becomes ``None`` and the user always gets
"No suitable career transitions found". This test ensures every current_role
present in the dataset resolves to a domain.

The mapping is read statically (via ``ast``) rather than by importing
``main.py``, because importing it trains a Q-table over 10,000 episodes and
loads spaCy at module scope.
"""
import ast
import os

import pandas as pd

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def _load_domain_mapping():
    src = open(os.path.join(ROOT, "main.py"), encoding="utf-8").read()
    module = ast.parse(src)
    for node in module.body:
        if isinstance(node, ast.Assign) and any(
            isinstance(t, ast.Name) and t.id == "domain_mapping" for t in node.targets
        ):
            return ast.literal_eval(node.value)
    raise AssertionError("domain_mapping not found in main.py")


def test_every_current_role_maps_to_a_domain():
    domain_mapping = _load_domain_mapping()
    df = pd.read_csv(os.path.join(ROOT, "career_dataset.csv"))
    current_roles = set(df["current_role"].dropna().unique())
    unmapped = sorted(current_roles - set(domain_mapping))
    assert not unmapped, f"current roles without a domain mapping: {unmapped}"


def test_domain_values_are_nonempty_strings():
    domain_mapping = _load_domain_mapping()
    assert domain_mapping
    for role, domain in domain_mapping.items():
        assert isinstance(domain, str) and domain.strip(), f"bad domain for {role!r}"
