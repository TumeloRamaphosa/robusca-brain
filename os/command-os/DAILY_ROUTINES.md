# Robusca Command OS Daily Routines

Status: planning artifact  
Purpose: recurring operating workflows for Robusca Command OS

---

## 1. 10:00 AM NotebookLM Video Routine

Daily at 10:00 AM, Robusca Command OS should create a NotebookLM-based video/audio knowledge artifact for the day.

Default timezone:

```text
Africa/Johannesburg / SAST
```

If Tumelo is operating from Dubai, the routine should display both:

```text
10:00 SAST
12:00 Dubai
```

---

## 2. Objective

Generate a polished daily knowledge/video asset from the current business context.

The routine should:

1. collect daily sources
2. create or update a NotebookLM notebook where possible
3. generate a clear script/brief
4. generate voice narration
5. create supporting visuals or slides
6. produce a video-ready package
7. save outputs to Command OS memory
8. post an internal summary to Rocket.Chat
9. queue any external publishing for approval

---

## 3. Source collection

Daily inputs:

- yesterday's meeting summaries
- new Notion pages/tasks
- Linear updates
- Rocket.Chat highlights
- Calendar events for today/tomorrow
- business VM daily reports
- Studex Meat/Coffee/Global Markets/Rahura priority notes
- finance pulse from CashClaw
- SEO/growth updates from SEO Office / Claude SEO

Output source bundle:

```text
memory/raw/daily-routines/YYYY-MM-DD/notebooklm-video/
  sources.md
  briefing.md
  script.md
  narration.txt
  production-plan.md
  assets/
```

---

## 4. NotebookLM access model

NotebookLM is a Google web product and may require interactive Google login, CAPTCHA, and account selection. It should not be treated like a normal API unless Google provides a supported API path.

Safe options:

| Option | Use |
| --- | --- |
| Manual export/import | safest first step |
| Google Drive source folder | preferred source bridge if NotebookLM watches/imports from Drive |
| Page-Agent browser control | possible later, but only after explicit approval and a dedicated browser profile |
| Human-in-the-loop NotebookLM step | practical MVP |

Rules:

- do not store Google account passwords in repo files
- do not automate CAPTCHA bypass
- do not use personal browser sessions without explicit approval
- use a dedicated Google account/profile for Robusca operations if possible
- store generated source bundles locally even if NotebookLM is unavailable

---

## 5. Voice generation

Preferred providers:

| Provider | Role |
| --- | --- |
| ElevenLabs | polished narration and branded voices |
| local TTS | private fallback |
| browser/desktop TTS | emergency fallback |

Secret variable placeholders:

```env
ELEVENLABS_API_KEY=<vault>
GOOGLE_AI_STUDIO_API_KEY=<vault>
```

Never paste real API keys into chat or documentation.

Voice workflow:

```text
script.md
-> narration.txt
-> ElevenLabs voice generation
-> narration.mp3
-> video package
```

---

## 6. Model routing

Model sources:

| Model source | Use |
| --- | --- |
| Ollama | local/private summarization and script drafts |
| Google AI Studio / Gemini | multimodal or high-quality drafting where approved |
| LiteLLM | unified router across local/API models |

Routing rules:

- sensitive business/meeting material defaults to local/private model route
- external API models require approved route policy
- all API keys stay server-side in vault/env
- no API keys in browser bundles, mobile apps, screenshots, docs, or chat

---

## 7. Automation outline

Recommended n8n workflow:

```text
Cron 10:00
-> collect Command OS daily context
-> generate source bundle
-> run local/private summary model
-> create script
-> request approval if sensitive/external model needed
-> generate ElevenLabs narration
-> create video-ready production package
-> save to memory
-> post internal Rocket.Chat summary
-> queue publishing approval
```

Suggested endpoints:

```text
POST /api/routines/notebooklm-video/run
GET  /api/routines/notebooklm-video/latest
POST /api/routines/notebooklm-video/approve
```

Suggested tables:

```text
daily_routines
daily_routine_runs
daily_routine_artifacts
daily_routine_approvals
```

---

## 8. Output package

Every run should produce:

```text
notebooklm-video-YYYY-MM-DD/
  sources.md
  briefing.md
  script.md
  narration.txt
  narration.mp3
  video-outline.md
  thumbnail-prompt.md
  publish-checklist.md
  metadata.json
```

Optional:

- slides
- captions/subtitles
- short-form clips
- Rocket.Chat summary card
- Notion page
- Linear tasks for follow-up work

---

## 9. Security and approval rules

Require approval before:

- sending material to NotebookLM through browser automation
- sending sensitive meeting content to Google AI Studio/Gemini
- sharing video externally
- posting to social media
- emailing the video
- creating public Notion/Drive links
- using private voice/persona cloning

Refuse:

- storing API keys in plaintext docs
- bypassing Google login/CAPTCHA
- silently recording people for daily assets
- publishing meeting-derived content without review

---

## 10. Immediate setup checklist

1. Rotate any API keys pasted into chat.
2. Store new keys in a secrets manager or local env file.
3. Decide the canonical Google account/profile for NotebookLM operations.
4. Decide whether NotebookLM step is manual, Drive-based, or Page-Agent-assisted.
5. Select ElevenLabs voice ID for Robusca/Naledi/Coffee Jarvis.
6. Configure Ollama local models for private drafts.
7. Configure Google AI Studio only through server-side env.
8. Build the first n8n cron workflow.
9. Add a Command OS dashboard tile for latest run status.

