# Skills Robusca Needs — June 2026

## Priority 1 — Build Now

### 1. studex-meta-whatsapp
- Send WhatsApp messages via Meta Cloud API
- Broadcast templates (Father's Day, Youth Day, order confirmations)
- Trigger: "send WhatsApp blast" or "WhatsApp message to customers"

### 2. studex-shopify-fulfil
- Mark Shopify orders as fulfilled
- Bulk fulfil with tracking number
- Trigger: "fulfil order #XXXX" or "mark delivered"

### 3. studex-content-approvals
- Review pending content, say approve/reject
- Push approved content to War Room pipeline
- Trigger: "approve content" or "content approval"

### 4. studex-morning-brief
- One-command morning routine: pulls Shopify + Gmail + Ads + AgentMail
- Returns a single formatted brief
- Trigger: "morning report" or "morning brief"

## Priority 1.5 — Composio action layer (Cipher Tr@ce)

### composio-tools
- Invoke GitHub / Notion CRM / Slack `#sales` / Stripe / Google Sheets / Linear via Composio
- No per-request OAuth — apps connected once
- Triggers: "create GitHub issue on dark-factory", "add to Notion CRM", "Slack #sales", "Stripe invoice", "update Google Sheet", "create Linear issue"
- Spec: [COMPOSIO_MESH.md](COMPOSIO_MESH.md) · Voice product: [VOICE_ASSISTANT_OS.md](VOICE_ASSISTANT_OS.md)
- Blocked on: VM SSH auth + Composio app connections + Notion/Linear MCP auth

### voice-assistant-workflows
- Speak on mobile/desktop → Whisper → Ollama → act (Notion/Linear) → MiniMax TTS reply
- Stay-on-task professional playbooks (CRM follow-ups, sprint issues, daily brief)
- Spec: [VOICE_ASSISTANT_OS.md](VOICE_ASSISTANT_OS.md)

## Priority 2 — Next Sprint

### 5. studex-ads-manager
- Pull Google Ads + Facebook Ads performance
- Suggest budget adjustments
- Trigger: "ads report" or "check ads"

### 6. studex-inventory-audit
- Flag negative stock SKUs
- Suggest correction values
- Trigger: "inventory audit" or "check stock"

### 7. robusca-memory-sync
- At end of every session: write memory log to robusca-brain
- Push to GitHub automatically
- Trigger: "sync memory" or "end of session"
