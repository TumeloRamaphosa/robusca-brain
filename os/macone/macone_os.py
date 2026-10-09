#!/usr/bin/env python3
"""
MacOne OS: tiny local agent coordination hub.

Run:
    python3 os/macone/macone_os.py

Then open:
    http://127.0.0.1:8787

This is intentionally dependency-free. It uses only Python stdlib and SQLite.
"""

from __future__ import annotations

import argparse
import html
import json
import sqlite3
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any
from urllib.parse import parse_qs, urlparse


APP_DIR = Path(__file__).resolve().parent
DEFAULT_DB = APP_DIR / "macone.db"


SCHEMA = """
CREATE TABLE IF NOT EXISTS agents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL DEFAULT '',
    skills TEXT NOT NULL DEFAULT '',
    tools TEXT NOT NULL DEFAULT '',
    access_needed TEXT NOT NULL DEFAULT '',
    restrictions TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL DEFAULT 'new',
    best_task TEXT NOT NULL DEFAULT '',
    runtime TEXT NOT NULL DEFAULT '',
    can_use_files INTEGER NOT NULL DEFAULT 0,
    can_send_messages INTEGER NOT NULL DEFAULT 0,
    notes TEXT NOT NULL DEFAULT '',
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    owner TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL DEFAULT 'todo',
    priority TEXT NOT NULL DEFAULT 'normal',
    details TEXT NOT NULL DEFAULT '',
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source TEXT NOT NULL DEFAULT '',
    kind TEXT NOT NULL DEFAULT 'log',
    message TEXT NOT NULL,
    created_at INTEGER NOT NULL
);
"""


AGENT_PROMPT = """You are joining the StudEx MacOne Operating System.

Your job is to connect into the central agent group and report your capabilities clearly.

RULES:
1. Do not share API keys, passwords, tokens, private customer data, or secrets.
2. Do not send emails, messages, posts, or external actions without Tumelo/Robusca approval.
3. You must work inside the MacOne group as part of the StudEx agent fleet.
4. You must report what you can do, what access you need, and what your current status is.
5. You must support the daily operating routine, email/outreach pipeline, Super Agents website, and agent coordination system.

Reply using this exact format:

AGENT CHECK-IN

Name:
Role:
Main skills:
Tools you can use:
What systems you can connect to:
What access you need:
What you should NOT be allowed to do:
Current status:
Best task for you right now:
Can you run locally, cloud, or both?
Can you work with files?
Can you send messages/emails if approved?
Can you connect to Buzz/MacOne?
Notes for Robusca:

Your first task:
Wait for assignment from Tumelo or Robusca. Do not take external action yet.
"""


def now() -> int:
    return int(time.time())


def connect(db_path: Path) -> sqlite3.Connection:
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    return conn


def init_db(db_path: Path) -> None:
    db_path.parent.mkdir(parents=True, exist_ok=True)
    with connect(db_path) as conn:
        conn.executescript(SCHEMA)


def row_to_dict(row: sqlite3.Row) -> dict[str, Any]:
    return {key: row[key] for key in row.keys()}


def parse_json(handler: BaseHTTPRequestHandler) -> dict[str, Any]:
    content_length = int(handler.headers.get("Content-Length", "0"))
    if content_length <= 0:
        return {}
    body = handler.rfile.read(content_length).decode("utf-8")
    if not body.strip():
        return {}
    try:
        parsed = json.loads(body)
    except json.JSONDecodeError as exc:
        raise ValueError(f"Invalid JSON: {exc}") from exc
    if not isinstance(parsed, dict):
        raise ValueError("JSON body must be an object")
    return parsed


def as_bool(value: Any) -> int:
    if isinstance(value, bool):
        return int(value)
    if isinstance(value, (int, float)):
        return int(value != 0)
    if isinstance(value, str):
        return int(value.strip().lower() in {"1", "true", "yes", "y", "approved"})
    return 0


def text(value: Any) -> str:
    if value is None:
        return ""
    if isinstance(value, (list, dict)):
        return json.dumps(value, ensure_ascii=False)
    return str(value).strip()


class MacOneHandler(BaseHTTPRequestHandler):
    db_path: Path = DEFAULT_DB

    def log_message(self, fmt: str, *args: Any) -> None:
        print(f"[macone] {self.address_string()} - {fmt % args}")

    def send_json(self, payload: Any, status: int = 200) -> None:
        body = json.dumps(payload, ensure_ascii=False, indent=2).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def send_html(self, body: str, status: int = 200) -> None:
        encoded = body.encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(encoded)))
        self.end_headers()
        self.wfile.write(encoded)

    def do_GET(self) -> None:
        parsed = urlparse(self.path)
        if parsed.path == "/":
            self.send_html(render_dashboard(self.db_path))
            return
        if parsed.path == "/prompt":
            self.send_html(render_prompt())
            return
        if parsed.path == "/api/agents":
            self.send_json(list_agents(self.db_path))
            return
        if parsed.path == "/api/tasks":
            self.send_json(list_tasks(self.db_path))
            return
        if parsed.path == "/api/events":
            query = parse_qs(parsed.query)
            limit = int(query.get("limit", ["50"])[0])
            self.send_json(list_events(self.db_path, limit=limit))
            return
        if parsed.path == "/api/health":
            self.send_json({"ok": True, "service": "macone-os"})
            return
        self.send_json({"error": "not found"}, status=404)

    def do_POST(self) -> None:
        parsed = urlparse(self.path)
        try:
            payload = parse_json(self)
            if parsed.path == "/api/checkin":
                self.send_json(upsert_agent(self.db_path, payload), status=201)
                return
            if parsed.path == "/api/tasks":
                self.send_json(create_task(self.db_path, payload), status=201)
                return
            if parsed.path == "/api/events":
                self.send_json(create_event(self.db_path, payload), status=201)
                return
        except ValueError as exc:
            self.send_json({"error": str(exc)}, status=400)
            return
        self.send_json({"error": "not found"}, status=404)


def upsert_agent(db_path: Path, payload: dict[str, Any]) -> dict[str, Any]:
    name = text(payload.get("name") or payload.get("Name"))
    if not name:
        raise ValueError("Agent check-in requires name")
    values = {
        "name": name,
        "role": text(payload.get("role") or payload.get("Role")),
        "skills": text(payload.get("skills") or payload.get("main_skills") or payload.get("Main skills")),
        "tools": text(payload.get("tools") or payload.get("Tools you can use")),
        "access_needed": text(payload.get("access_needed") or payload.get("What access you need")),
        "restrictions": text(payload.get("restrictions") or payload.get("What you should NOT be allowed to do")),
        "status": text(payload.get("status") or payload.get("Current status") or "checked-in"),
        "best_task": text(payload.get("best_task") or payload.get("Best task for you right now")),
        "runtime": text(payload.get("runtime") or payload.get("Can you run locally, cloud, or both")),
        "can_use_files": as_bool(payload.get("can_use_files") or payload.get("Can you work with files")),
        "can_send_messages": as_bool(
            payload.get("can_send_messages") or payload.get("Can you send messages/emails if approved")
        ),
        "notes": text(payload.get("notes") or payload.get("Notes for Robusca")),
        "updated_at": now(),
    }
    created = now()
    with connect(db_path) as conn:
        conn.execute(
            """
            INSERT INTO agents (
                name, role, skills, tools, access_needed, restrictions, status,
                best_task, runtime, can_use_files, can_send_messages, notes,
                created_at, updated_at
            )
            VALUES (
                :name, :role, :skills, :tools, :access_needed, :restrictions, :status,
                :best_task, :runtime, :can_use_files, :can_send_messages, :notes,
                :created_at, :updated_at
            )
            ON CONFLICT(name) DO UPDATE SET
                role = excluded.role,
                skills = excluded.skills,
                tools = excluded.tools,
                access_needed = excluded.access_needed,
                restrictions = excluded.restrictions,
                status = excluded.status,
                best_task = excluded.best_task,
                runtime = excluded.runtime,
                can_use_files = excluded.can_use_files,
                can_send_messages = excluded.can_send_messages,
                notes = excluded.notes,
                updated_at = excluded.updated_at
            """,
            {**values, "created_at": created},
        )
        conn.execute(
            "INSERT INTO events (source, kind, message, created_at) VALUES (?, ?, ?, ?)",
            (name, "agent_checkin", f"{name} checked in as {values['role'] or 'unassigned'}", created),
        )
        row = conn.execute("SELECT * FROM agents WHERE name = ?", (name,)).fetchone()
    return row_to_dict(row)


def list_agents(db_path: Path) -> list[dict[str, Any]]:
    with connect(db_path) as conn:
        rows = conn.execute("SELECT * FROM agents ORDER BY lower(name)").fetchall()
    return [row_to_dict(row) for row in rows]


def create_task(db_path: Path, payload: dict[str, Any]) -> dict[str, Any]:
    title = text(payload.get("title"))
    if not title:
        raise ValueError("Task requires title")
    values = {
        "title": title,
        "owner": text(payload.get("owner")),
        "status": text(payload.get("status") or "todo"),
        "priority": text(payload.get("priority") or "normal"),
        "details": text(payload.get("details")),
        "created_at": now(),
        "updated_at": now(),
    }
    with connect(db_path) as conn:
        cur = conn.execute(
            """
            INSERT INTO tasks (title, owner, status, priority, details, created_at, updated_at)
            VALUES (:title, :owner, :status, :priority, :details, :created_at, :updated_at)
            """,
            values,
        )
        conn.execute(
            "INSERT INTO events (source, kind, message, created_at) VALUES (?, ?, ?, ?)",
            ("MacOne", "task_created", f"Task created: {title}", now()),
        )
        row = conn.execute("SELECT * FROM tasks WHERE id = ?", (cur.lastrowid,)).fetchone()
    return row_to_dict(row)


def list_tasks(db_path: Path) -> list[dict[str, Any]]:
    with connect(db_path) as conn:
        rows = conn.execute("SELECT * FROM tasks ORDER BY id DESC").fetchall()
    return [row_to_dict(row) for row in rows]


def create_event(db_path: Path, payload: dict[str, Any]) -> dict[str, Any]:
    message = text(payload.get("message"))
    if not message:
        raise ValueError("Event requires message")
    values = {
        "source": text(payload.get("source") or "unknown"),
        "kind": text(payload.get("kind") or "log"),
        "message": message,
        "created_at": now(),
    }
    with connect(db_path) as conn:
        cur = conn.execute(
            "INSERT INTO events (source, kind, message, created_at) VALUES (:source, :kind, :message, :created_at)",
            values,
        )
        row = conn.execute("SELECT * FROM events WHERE id = ?", (cur.lastrowid,)).fetchone()
    return row_to_dict(row)


def list_events(db_path: Path, limit: int = 50) -> list[dict[str, Any]]:
    limit = max(1, min(limit, 250))
    with connect(db_path) as conn:
        rows = conn.execute("SELECT * FROM events ORDER BY id DESC LIMIT ?", (limit,)).fetchall()
    return [row_to_dict(row) for row in rows]


def render_dashboard(db_path: Path) -> str:
    agents = list_agents(db_path)
    tasks = list_tasks(db_path)
    events = list_events(db_path, limit=25)
    agent_rows = "\n".join(
        f"""
        <tr>
          <td>{html.escape(a['name'])}</td>
          <td>{html.escape(a['role'])}</td>
          <td>{html.escape(a['status'])}</td>
          <td>{html.escape(a['best_task'])}</td>
          <td>{html.escape(a['runtime'])}</td>
        </tr>
        """
        for a in agents
    )
    task_rows = "\n".join(
        f"""
        <tr>
          <td>#{t['id']}</td>
          <td>{html.escape(t['title'])}</td>
          <td>{html.escape(t['owner'])}</td>
          <td>{html.escape(t['status'])}</td>
          <td>{html.escape(t['priority'])}</td>
        </tr>
        """
        for t in tasks[:20]
    )
    event_items = "\n".join(
        f"<li><strong>{html.escape(e['kind'])}</strong> [{html.escape(e['source'])}] {html.escape(e['message'])}</li>"
        for e in events
    )
    return f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>MacOne OS</title>
  <style>
    :root {{
      --bg: #0a0908;
      --panel: rgba(14, 13, 16, 0.92);
      --panel2: rgba(21, 20, 14, 0.9);
      --gold: #C9A84C;
      --muted: #9a8a5a;
      --cream: #f5ecd0;
      --green: #4CFFA8;
      --red: #c14e3c;
    }}
    * {{ box-sizing: border-box; }}
    body {{
      margin: 0;
      background: radial-gradient(circle at top left, rgba(201,168,76,0.12), transparent 26rem), var(--bg);
      color: var(--cream);
      font-family: Inter, -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif;
      line-height: 1.5;
    }}
    header {{
      padding: 28px;
      border-bottom: 1px solid rgba(201,168,76,0.18);
      display: flex;
      align-items: end;
      justify-content: space-between;
      gap: 20px;
    }}
    h1 {{
      margin: 0;
      color: var(--gold);
      letter-spacing: 0.22em;
      text-transform: uppercase;
      font-size: clamp(26px, 4vw, 44px);
    }}
    .subtitle {{
      margin-top: 6px;
      color: var(--muted);
      letter-spacing: 0.12em;
      text-transform: uppercase;
      font-size: 12px;
    }}
    main {{ padding: 24px; display: grid; gap: 18px; }}
    .grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 18px; }}
    .card {{
      background: var(--panel);
      border: 1px solid rgba(201,168,76,0.18);
      border-radius: 18px;
      padding: 18px;
      box-shadow: 0 18px 60px rgba(0,0,0,0.28);
    }}
    .metric {{ font-family: Menlo, Monaco, monospace; font-size: 34px; color: var(--gold); }}
    .label {{ color: var(--muted); text-transform: uppercase; letter-spacing: 0.18em; font-size: 11px; }}
    table {{ width: 100%; border-collapse: collapse; font-size: 14px; }}
    th, td {{ text-align: left; padding: 10px 8px; border-bottom: 1px solid rgba(201,168,76,0.12); vertical-align: top; }}
    th {{ color: var(--gold); font-size: 11px; text-transform: uppercase; letter-spacing: 0.14em; }}
    a, button {{ color: var(--gold); }}
    .toolbar {{ display: flex; gap: 10px; flex-wrap: wrap; }}
    .button {{
      display: inline-block;
      border: 1px solid rgba(201,168,76,0.34);
      border-radius: 999px;
      padding: 10px 14px;
      text-decoration: none;
      background: rgba(201,168,76,0.08);
      font-size: 13px;
    }}
    code, pre {{ font-family: Menlo, Monaco, monospace; }}
    pre {{
      white-space: pre-wrap;
      background: var(--panel2);
      padding: 14px;
      border-radius: 12px;
      border: 1px solid rgba(201,168,76,0.12);
      overflow: auto;
    }}
    li {{ margin-bottom: 8px; }}
  </style>
</head>
<body>
  <header>
    <div>
      <h1>MacOne OS</h1>
      <div class="subtitle">Local agent check-in hub · Buzz MacOne staging</div>
    </div>
    <nav class="toolbar">
      <a class="button" href="/prompt">Agent prompt</a>
      <a class="button" href="/api/agents">Agents JSON</a>
      <a class="button" href="/api/tasks">Tasks JSON</a>
    </nav>
  </header>
  <main>
    <section class="grid">
      <div class="card"><div class="label">Agents checked in</div><div class="metric">{len(agents)}</div></div>
      <div class="card"><div class="label">Tasks</div><div class="metric">{len(tasks)}</div></div>
      <div class="card"><div class="label">Events</div><div class="metric">{len(events)}</div></div>
    </section>

    <section class="card">
      <h2>Agents</h2>
      <table>
        <thead><tr><th>Name</th><th>Role</th><th>Status</th><th>Best task</th><th>Runtime</th></tr></thead>
        <tbody>{agent_rows or '<tr><td colspan="5">No agents checked in yet.</td></tr>'}</tbody>
      </table>
    </section>

    <section class="card">
      <h2>Tasks</h2>
      <table>
        <thead><tr><th>ID</th><th>Title</th><th>Owner</th><th>Status</th><th>Priority</th></tr></thead>
        <tbody>{task_rows or '<tr><td colspan="5">No tasks yet.</td></tr>'}</tbody>
      </table>
    </section>

    <section class="card">
      <h2>Recent Events</h2>
      <ul>{event_items or '<li>No events yet.</li>'}</ul>
    </section>
  </main>
</body>
</html>"""


def render_prompt() -> str:
    escaped = html.escape(AGENT_PROMPT)
    curl = html.escape(
        """curl -X POST http://127.0.0.1:8787/api/checkin \\
  -H 'Content-Type: application/json' \\
  -d '{
    "name": "Robusca",
    "role": "Chief of Staff",
    "skills": "strategy, coordination, memory",
    "tools": "files, chat, calendar",
    "access_needed": "Buzz MacOne link, approved tool list",
    "restrictions": "no external sends without approval",
    "status": "checked-in",
    "best_task": "organize agent roster",
    "runtime": "local and cloud",
    "can_use_files": true,
    "can_send_messages": false,
    "notes": "Ready for assignment"
  }'"""
    )
    return f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>MacOne Agent Prompt</title>
  <style>
    body {{ margin: 0; padding: 24px; background: #0a0908; color: #f5ecd0; font-family: Inter, -apple-system, sans-serif; }}
    h1 {{ color: #C9A84C; }}
    pre {{ white-space: pre-wrap; background: rgba(14,13,16,0.95); border: 1px solid rgba(201,168,76,0.2); padding: 18px; border-radius: 14px; overflow: auto; }}
    a {{ color: #C9A84C; }}
  </style>
</head>
<body>
  <p><a href="/">← Dashboard</a></p>
  <h1>Send this to each agent</h1>
  <pre>{escaped}</pre>
  <h2>Example check-in request</h2>
  <pre>{curl}</pre>
</body>
</html>"""


def main() -> None:
    parser = argparse.ArgumentParser(description="Run the MacOne local agent hub")
    parser.add_argument("--host", default="127.0.0.1", help="Host to bind, default 127.0.0.1")
    parser.add_argument("--port", type=int, default=8787, help="Port to bind, default 8787")
    parser.add_argument("--db", type=Path, default=DEFAULT_DB, help="SQLite DB path")
    args = parser.parse_args()

    init_db(args.db)
    MacOneHandler.db_path = args.db
    server = ThreadingHTTPServer((args.host, args.port), MacOneHandler)
    print(f"MacOne OS running at http://{args.host}:{args.port}")
    print(f"SQLite DB: {args.db}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping MacOne OS")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()

