"""Minimal smoke tests so CI pytest does not exit with code 5 (no tests collected)."""

from pathlib import Path


def test_repo_root_has_agents_md():
    assert Path("AGENTS.md").is_file()


def test_environment_yml_exists():
    assert Path("environment.yml").is_file()
