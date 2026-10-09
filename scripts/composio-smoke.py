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
    print("  1. NEVER paste COMPOSIO_API_KEY into chat — vault or .env.local only")
    print("  2. If a key was exposed: rotate at app.composio.dev (KEY_ROTATION_CHECKLIST #8)")
    print("  3. cp .env.example .env.local  # fill COMPOSIO_API_KEY locally")
    print("  4. Mac Mini: bash scripts/mac-mini-tonight.sh --start-kokoro")
    print("  5. VM: authorize pubkey then bash scripts/vm-composio-install.sh")
    print("  6. Sent.dm demo: https://github.com/sonnysangha/sent-dm-demo (see SENT_COMPOSIO.md)")

    if not __import__("os").environ.get("COMPOSIO_API_KEY"):
        bad("COMPOSIO_API_KEY not set in this environment (expected — do not paste into chat)")
        return 2

    ok("COMPOSIO_API_KEY present in env (value not printed)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
