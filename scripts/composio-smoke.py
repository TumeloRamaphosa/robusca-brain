#!/usr/bin/env python3
"""Composio smoke check + next-step auth hints for Cipher Tr@ce mesh.

Does not print secrets. Safe to run in CI or on Mac Mini / VM.
"""
from __future__ import annotations

import importlib.util
import sys


INTENTS = [
    ("GitHub", "Create a GitHub issue on dark-factory"),
    ("Notion", "Add this to Notion CRM"),
    ("Slack", "Send a Slack message to #sales"),
    ("Stripe", "Create a Stripe invoice"),
    ("Google Sheets", "Update a Google Sheet"),
]


def ok(msg: str) -> None:
    print(f"  ✓ {msg}")


def bad(msg: str) -> None:
    print(f"  ✗ {msg}")


def main() -> int:
    print("Composio smoke check")
    print("─" * 40)

    if importlib.util.find_spec("composio") is None:
        bad("Python package 'composio' not installed")
        print("    → pip install composio")
        return 1

    import composio

    ok(f"composio importable ({getattr(composio, '__version__', '?')})")

    # Prefer new SDK entrypoints when present; don't fail hard on rename.
    client_cls = getattr(composio, "Composio", None)
    if client_cls is not None:
        ok("Composio client class present")
    else:
        bad("Composio client class not found — package may be legacy stub")

    print()
    print("Target intents (connect each app once in Composio):")
    for app, phrase in INTENTS:
        print(f"  • {app:14} ← \"{phrase}\"")

    print()
    print("Canonical flow:")
    print("  RileyJarvis → Ollama (Qwen3) → robusca-brain → N8N → Notion")
    print("  Composio = side-path tool executor (see COMPOSIO_MESH.md)")
    print()
    print("Next:")
    print("  1. composio login / dashboard — connect GitHub Notion Slack Stripe Sheets")
    print("  2. Mac Mini: bash scripts/mac-mini-tonight.sh --start-kokoro")
    print("  3. VM robot@45.61.56.91 — still needs SSH pubkey authorized")
    return 0


if __name__ == "__main__":
    sys.exit(main())
