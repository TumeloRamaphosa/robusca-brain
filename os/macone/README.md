# MacOne OS

Tiny local agent coordination hub for the Buzz MacOne group.

This is the simplest possible starter:

- no dependencies
- Python standard library only
- SQLite database
- local dashboard
- agent check-ins
- tasks
- events

It does **not** send emails, messages, or external actions. That comes later behind approval gates.

---

## Run

From the repo root:

```bash
python3 os/macone/macone_os.py
```

Open:

```text
http://127.0.0.1:8787
```

Agent prompt:

```text
http://127.0.0.1:8787/prompt
```

---

## Agent check-in

```bash
curl -X POST http://127.0.0.1:8787/api/checkin \
  -H 'Content-Type: application/json' \
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
  }'
```

List agents:

```bash
curl http://127.0.0.1:8787/api/agents
```

---

## Create a task

```bash
curl -X POST http://127.0.0.1:8787/api/tasks \
  -H 'Content-Type: application/json' \
  -d '{
    "title": "Collect all agent check-ins",
    "owner": "Robusca",
    "priority": "high",
    "details": "Get all agents into Buzz MacOne and record capabilities."
  }'
```

---

## Log an event

```bash
curl -X POST http://127.0.0.1:8787/api/events \
  -H 'Content-Type: application/json' \
  -d '{
    "source": "Buzz",
    "kind": "note",
    "message": "MacOne group created."
  }'
```

---

## Next upgrades

1. Add Buzz webhook/import.
2. Add ClickClack event bridge.
3. Add Obsidian daily note writeback.
4. Add compliant outreach approval queue.
5. Add agent auth tokens.
6. Add Tailscale-only LAN mode.

