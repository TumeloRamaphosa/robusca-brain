# Meeting Memory and Productivity Integrations

Status: planning artifact  
Parent system: Robusca Command OS  
Purpose: record, store, summarize, present, and sync meetings across Word, Notion, Calendar, Linear, Rocket.Chat, and the Command OS apps

---

## 1. Goal

Every approved meeting should become a complete business artifact:

- original recording
- transcript
- speaker labels
- summary
- decisions
- action items
- risks/blockers
- follow-up agenda
- linked files
- linked calendar event
- Notion page
- Word document export
- Linear issues where required
- Rocket.Chat summary post
- searchable memory entry

The user experience should be simple:

```text
"Robusca, record this meeting."
-> recording starts
-> transcript and notes are created
-> summary is presented
-> action items are proposed
-> Tumelo approves destinations
-> Notion / Word / Calendar / Linear / Rocket.Chat are updated
```

---

## 2. Capture sources

| Source | Use | Notes |
| --- | --- | --- |
| Desktop app microphone | founder-led calls, desk meetings | primary MVP source |
| Mobile app microphone | field meetings, travel, quick notes | should support offline queue |
| Omi wearable/mobile | passive conversation capture | requires explicit privacy decision before always-on use |
| Calendar meeting bot | scheduled online meetings | later phase; needs Microsoft/Google calendar integration |
| uploaded audio/video | retroactive transcription | useful for WhatsApp voice notes, Zoom/Teams recordings |
| screen capture | demos and walkthroughs | high privacy risk; opt-in per session |

---

## 3. Meeting pipeline

```text
Capture
-> consent/policy check
-> encrypted raw file storage
-> transcription
-> diarization
-> summarization
-> structured extraction
-> human review
-> destination sync
-> memory ingest
-> audit log
```

Structured extraction should produce:

```json
{
  "title": "Studex Coffee buyer call",
  "business": "studex-coffee",
  "participants": [],
  "date": "2026-07-03",
  "summary": "",
  "decisions": [],
  "action_items": [
    {
      "title": "",
      "owner": "",
      "due_date": null,
      "destination": ["linear", "notion"]
    }
  ],
  "risks": [],
  "follow_up_questions": [],
  "source_recording_uri": "",
  "transcript_uri": "",
  "visibility": "private"
}
```

---

## 4. Storage design

### Raw storage

Raw audio/video should be treated as sensitive source material.

Recommended paths:

```text
memory/raw/meetings/YYYY/MM/<meeting-id>/
  recording.m4a
  transcript.vtt
  transcript.json
  speakers.json
  metadata.json
```

Rules:

- encrypt at rest where possible
- store checksums
- never commit raw recordings to git
- do not send raw private recordings to external APIs without explicit route approval
- keep deletion/retention policy per business

### Processed meeting artifact

```text
memory/business/<business>/meetings/<meeting-id>.md
```

Markdown template:

```markdown
---
type: meeting
business: studex-meat
date: 2026-07-03
visibility: private
source_recording: memory/raw/meetings/...
calendar_event_id:
notion_page_id:
word_doc_uri:
linear_issue_ids: []
---

# Meeting Title

## Executive Summary

## Decisions

## Action Items

## Risks and Blockers

## Follow-up Agenda

## Transcript Links
```

---

## 5. Productivity integrations

### Notion

Use:

- meeting pages
- task database entries
- business knowledge base
- project dashboards

Sync pattern:

```text
Meeting artifact
-> Notion meeting page
-> Notion task rows for approved action items
-> backlink to Command OS meeting ID
```

Status:

- Notion MCP is available in the environment but currently requires authentication.
- Once authenticated, use MCP for page/database operations.

### Word / Microsoft 365

Use:

- polished meeting minutes
- board/report-ready docs
- contracts and formal summaries

Sync pattern:

```text
Meeting artifact
-> DOCX render
-> OneDrive/SharePoint save via Microsoft Graph
-> optional email/share link after approval
```

Required capabilities:

- Microsoft Graph OAuth
- OneDrive/SharePoint file write
- DOCX generation service
- export template with Studex black/gold branding

### Calendar

Use:

- meeting schedule
- attendee list
- agenda injection
- follow-up event creation
- reminders

Sync pattern:

```text
Calendar event
-> Command OS meeting record
-> agenda before meeting
-> minutes after meeting
-> follow-up event if approved
```

Required capabilities:

- Google Calendar and/or Microsoft Outlook Calendar connector
- event read/write
- attendee metadata
- webhook or polling sync

### Linear

Use:

- implementation tasks
- bugs
- follow-up work
- project planning

Sync pattern:

```text
Approved action item
-> Linear issue
-> link back to meeting artifact
-> status updates reflected in Command OS
```

Status:

- Linear MCP is available in the environment but currently requires authentication.
- Once authenticated, use MCP for issue/team/project operations.

### Rocket.Chat

Use:

- meeting brief posted to the right business room
- action item announcement
- approval request cards

Sync pattern:

```text
Meeting summary
-> #business-room summary
-> #approval-queue external-action approvals
-> #daily-briefs rollup
```

---

## 6. Presentation layer

The command app should make meetings fully accessible.

Required views:

| View | Purpose |
| --- | --- |
| Meeting Library | searchable archive of all meetings |
| Meeting Detail | recording, transcript, summary, decisions, tasks |
| Action Review | approve, edit, assign, or reject extracted action items |
| Integrations Panel | Notion/Word/Calendar/Linear sync status |
| Business Timeline | meetings grouped by business and deal/project |
| Voice Playback | listen to relevant sections |
| Transcript Search | jump to exact quote/timecode |

Accessibility requirements:

- transcript always available
- keyboard navigation
- speaker labels
- timestamps
- downloadable DOCX/PDF/Markdown
- mobile-friendly meeting detail page
- privacy toggle masks sensitive attendees, money, and customer data

---

## 7. Approval and consent rules

Meeting recording is sensitive. The OS must support consent-aware operation.

Rules:

- require explicit start command or calendar-based recording policy
- display recording state in desktop/mobile app
- allow quick stop/pause
- external sharing requires approval
- creating Linear/Notion tasks can be automatic only for internal, low-risk items
- emailing/sharing Word docs requires approval
- storing private/family conversations in business memory is forbidden unless explicitly tagged by Tumelo

High-risk meeting actions requiring approval:

- send minutes externally
- create customer-facing follow-up
- share recording
- create public task or public page
- include sensitive financial/customer details in Notion or Word
- send transcript to external API model

---

## 8. MVP

MVP should support:

1. record from desktop app microphone
2. save raw audio locally or to storage vault
3. transcribe
4. generate meeting summary
5. show summary in Command OS
6. extract action items
7. save markdown meeting artifact
8. post internal Rocket.Chat summary
9. create Notion page after approval
10. create Linear issues after approval
11. export DOCX after approval
12. link to the calendar event manually or through first connector

---

## 9. Data model sketch

Tables:

```text
meetings
  id
  business
  title
  source
  started_at
  ended_at
  calendar_event_id
  raw_recording_uri
  transcript_uri
  summary_md
  visibility
  created_by
  created_at

meeting_participants
  id
  meeting_id
  name
  email
  role
  is_external

meeting_action_items
  id
  meeting_id
  title
  description
  owner
  due_date
  status
  linear_issue_id
  notion_task_id

meeting_sync_targets
  id
  meeting_id
  target
  external_id
  status
  last_synced_at
  error
```

---

## 10. Open decisions

- Use Google Calendar, Microsoft Outlook Calendar, or both first?
- Should Word export save to OneDrive, SharePoint, local disk, or all?
- Should Notion be the primary visible knowledge base or only a synced destination?
- Which Linear workspace/team should action items default to?
- Should Omi be self-hosted before any wearable recording is enabled?
- What is the retention policy for raw recordings?

