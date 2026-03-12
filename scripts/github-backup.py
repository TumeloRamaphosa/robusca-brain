#!/usr/bin/env python3
"""
Robusca Brain Backup — pushes workspace critical files to GitHub
Repo: TumeloRamaphosa/robusca-brain (private)
"""
import json
import base64
import urllib.request
import urllib.error
import os

TOKEN = "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"
OWNER = "TumeloRamaphosa"
REPO = "robusca-brain"
HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Accept": "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "Content-Type": "application/json",
    "User-Agent": "Robusca-OpenClaw"
}

def gh_request(method, path, data=None):
    url = f"https://api.github.com{path}"
    body = json.dumps(data).encode() if data else None
    req = urllib.request.Request(url, data=body, headers=HEADERS, method=method)
    try:
        with urllib.request.urlopen(req) as r:
            return json.loads(r.read()), r.status
    except urllib.error.HTTPError as e:
        return json.loads(e.read()), e.code

def create_repo():
    data = {
        "name": REPO,
        "description": "Robusca brain backup — memory, soul, identity, workspace files",
        "private": True,
        "auto_init": True
    }
    result, status = gh_request("POST", "/user/repos", data)
    if status == 201:
        print(f"✅ Repo created: {OWNER}/{REPO}")
    elif status == 422:
        print(f"ℹ️  Repo already exists: {OWNER}/{REPO}")
    else:
        print(f"⚠️  Repo create status {status}: {result}")
    return status in (201, 422)

def get_sha(path):
    result, status = gh_request("GET", f"/repos/{OWNER}/{REPO}/contents/{path}")
    if status == 200:
        return result.get("sha")
    return None

def push_file(local_path, remote_path, commit_msg):
    if not os.path.exists(local_path):
        print(f"⏩ Skip (not found): {local_path}")
        return
    with open(local_path, "r", encoding="utf-8") as f:
        content = f.read()
    encoded = base64.b64encode(content.encode()).decode()
    sha = get_sha(remote_path)
    data = {
        "message": commit_msg,
        "content": encoded,
        "branch": "main"
    }
    if sha:
        data["sha"] = sha
    result, status = gh_request("PUT", f"/repos/{OWNER}/{REPO}/contents/{remote_path}", data)
    if status in (200, 201):
        print(f"✅ Pushed: {remote_path}")
    else:
        print(f"❌ Failed {remote_path}: {status} — {result.get('message','')}")

# Files to back up
files = [
    ("/workspace/SOUL.md", "SOUL.md", "backup: SOUL.md"),
    ("/workspace/IDENTITY.md", "IDENTITY.md", "backup: IDENTITY.md"),
    ("/workspace/USER.md", "USER.md", "backup: USER.md"),
    ("/workspace/AGENTS.md", "AGENTS.md", "backup: AGENTS.md"),
    ("/workspace/HEARTBEAT.md", "HEARTBEAT.md", "backup: HEARTBEAT.md"),
    ("/workspace/memory/2026-03-11.md", "memory/2026-03-11.md", "backup: memory log 2026-03-11"),
    ("/workspace/studex/naledi-cmo-workflow.md", "studex/naledi-cmo-workflow.md", "backup: naledi CMO workflow"),
    ("/workspace/studex/easter-content-2026.md", "studex/easter-content-2026.md", "backup: easter content 2026"),
    ("/workspace/studex/airtable-base-design.md", "studex/airtable-base-design.md", "backup: airtable design"),
    ("/workspace/studex/cto-playbook.md", "studex/cto-playbook.md", "backup: CTO playbook"),
    ("/workspace/studex/legal-and-website-audit.md", "studex/legal-and-website-audit.md", "backup: legal + website audit"),
    ("/workspace/skills/github-integration/SKILL.md", "skills/github-integration/SKILL.md", "backup: github skill"),
]

print("🚀 Robusca Brain Backup — starting...\n")
if create_repo():
    for local, remote, msg in files:
        push_file(local, remote, msg)
print("\n✅ Backup complete.")
