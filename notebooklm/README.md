# Studex — NotebookLM Workspace
**Owner:** Tumelo Ramaphosa | **Contact:** t.ramaphosa@studex.dev
**Last updated:** June 2026

---

## What is NotebookLM?

[NotebookLM](https://notebooklm.google.com) is Google's AI research assistant. You upload source documents — PDFs, web links, Google Docs, plain text files — and NotebookLM reads them all, then lets you:

- **Ask questions** about the content and get cited answers
- **Generate a podcast** (Audio Overview) — a realistic two-host AI conversation synthesising everything across all your sources
- **Create study guides, briefings, and summaries** from your source material
- **Chat with your sources** to explore ideas, find contradictions, and surface connections you hadn't noticed

For Tumelo's use, NotebookLM is the engine for producing deep, well-sourced podcast episodes about the Studex Global Markets ecosystem. Each notebook in this folder is a self-contained research brief — everything NotebookLM needs to generate a full episode is already inside it.

---

## The 6 Notebooks

Each file below is a NotebookLM source document. Upload the file (or paste the content) into a new NotebookLM notebook as the primary source, then follow the setup guide below.

| # | Notebook File | Topic | Target Duration |
|---|---------------|-------|----------------|
| 01 | [notebook-01-global-markets-platform.md](./notebook-01-global-markets-platform.md) | What the Studex Global Markets platform is, how it works, and why it exists | 6–8 min |
| 02 | [notebook-02-studex-company.md](./notebook-02-studex-company.md) | The Studex company story — 14 years of AI, aesthetics registration, origin in premium meat, 10-year vision | 6–8 min |
| 03 | [notebook-03-super-agents.md](./notebook-03-super-agents.md) | The 8 Super Agents system — agent names, pricing tiers (R3,500 / R10,000 / R20,000), NestVM, 5-step onboarding | 6–8 min |
| 04 | [notebook-04-africabiz.md](./notebook-04-africabiz.md) | AfricaBiz partnership — Natalia Mordvinova (Founder & Director), SA–Russia Exchange Programme, Trade Week 2026 | 6–8 min |
| 05 | [notebook-05-partner-companies.md](./notebook-05-partner-companies.md) | The four founding partner companies — NtechLab, ART Engineering MDC, Pharmasyntez, Project Phoenix/GRM | 8–10 min |
| 06 | [notebook-06-full-ecosystem.md](./notebook-06-full-ecosystem.md) | Full ecosystem vision — all three layers, SEAM/Studex Meat, Polsia infrastructure, continental expansion | 8–10 min |

---

## Key Facts (Quick Reference)

- **Company:** Studex Global Markets — registered aesthetics company, 10 years registered, 14+ years of AI development
- **Founder:** Tumelo Ramaphosa | t.ramaphosa@studex.dev
- **Platform websites:** studexglobalmarkets.com | superagents.studex.dev
- **Super Agents pricing:** R3,500/month (Starter) | R10,000/month (Business) | R20,000/month (Enterprise)
- **Infrastructure:** Polsia NestVM — private dedicated virtual machines per company
- **8 Named Agents:** Soul (Northstar), Obsidian Brain (intelligence), Dedicated Email (outreach), + 5 Compound specialists — all named after Renaissance masters
- **Partner: AfricaBiz** — Natalia Mordvinova (Founder & Director, NOT CEO) | africabiz.ru | n@africabiz.ru | +27 76 269 8044
- **Founding companies:** NtechLab (facial recognition AI, #1 NIST) | ART Engineering MDC (data centres, 16-week deploy) | Pharmasyntez (100M pharma packages/year) | Project Phoenix + GRM (rhino de-extinction, livestock genetics)
- **Event:** Trade Week SA–Russia 2026 — Four Seasons Hotel Westcliff + Sandton Hotel, Johannesburg
- **Studex Meat / SEAM:** South African premium Wagyu and Ankole beef — first product brand in the ecosystem

---

## How to Create a New NotebookLM Notebook

### Step 1 — Open NotebookLM
Go to [notebooklm.google.com](https://notebooklm.google.com) and sign in with your Google account.

### Step 2 — Create a New Notebook
Click **"New notebook"** in the top left. Give it a descriptive name matching the topic (e.g. "Studex — Super Agents Deep Dive").

### Step 3 — Add the Source Document
Click **"Add source"** in the Sources panel on the left.

Choose one of the following upload methods:
- **Upload file:** Save the `.md` file from this folder and upload it directly
- **Paste text:** Open the `.md` file, copy all content, and paste into the text paste option
- **Google Drive:** If you've saved the file to Drive, link it directly

Each notebook should start with its corresponding source document as the primary source.

### Step 4 — Add Supporting URLs as Additional Sources
Each notebook file has a **"Sources to Add in NotebookLM"** section at the bottom. Add each URL listed there:
1. Click **"Add source"** again
2. Select **"Website"**
3. Paste the URL (e.g. `https://studexglobalmarkets.com`, `https://superagents.studex.dev`)
4. NotebookLM will fetch and index the page

Repeat for all URLs listed in that notebook's sources section.

### Step 5 — Generate the Podcast (Audio Overview)
1. In the right panel, find **"Audio Overview"**
2. Click **"Generate"**
3. Optionally, use the **"Customize"** option to give instructions — e.g.:
   - *"Focus on the pricing tiers and ROI case for joining at the Business tier"*
   - *"Emphasise the SA–Russia bilateral relationship and Trade Week 2026"*
   - *"Use the Key Quotes / Hooks as anchor points in the conversation"*
4. Wait 1–3 minutes for generation
5. Play directly in NotebookLM or download the MP3

### Step 6 — Ask the Research Questions
Each notebook has a **"Research Questions"** section with 5–7 questions written specifically to get deep answers from NotebookLM. Paste each question into the chat to generate cited, source-backed answers. These answers are useful for:
- Script refinements
- Fact-checking
- Generating new content angles
- Briefing notes for meetings

---

## How to Share Notebooks with Agents

NotebookLM notebooks can be shared in two ways:

### Share with a Person (Google Account Required)
1. Open the notebook
2. Click the **Share** icon (person+ icon) in the top right
3. Enter the Google account email of the agent/collaborator
4. Set permission level: **Viewer** (read only) or **Editor** (can add sources and chat)
5. Click **Share**

### Share as a Public Link (No Login Required — Read Only)
1. Open the notebook
2. Click the **Share** icon
3. Toggle **"Share with link"** to ON
4. Copy the link and send it via Slack, email, or WhatsApp

### Share Source Documents with AI Agents (this workspace)
All source documents in this folder (`/home/user/workspace/robusca-brain/notebooklm/`) are accessible to all Studex AI agents in the workspace. Agents can read any of these files directly using standard file read tools. To instruct an agent to use a specific notebook as context, reference the file path:

```
/home/user/workspace/robusca-brain/notebooklm/notebook-03-super-agents.md
```

---

## Recommended Workflow for Each Episode

1. **Pick the notebook** — choose the topic you want to explore
2. **Open NotebookLM** — create notebook, upload source doc, add URLs
3. **Run the Research Questions** — deepen your understanding before generating audio
4. **Generate Audio Overview** — with optional customisation instructions
5. **Download MP3** — publish, share, or use in content
6. **Iterate** — add new sources, ask follow-up questions, regenerate with different focus

---

## Notebook Quick Links

Once you create each notebook on NotebookLM, paste the notebook URL here for quick access:

| Notebook | NotebookLM URL |
|----------|---------------|
| 01 — Global Markets Platform | *(paste link after creating)* |
| 02 — Studex Company | *(paste link after creating)* |
| 03 — Super Agents | *(paste link after creating)* |
| 04 — AfricaBiz | *(paste link after creating)* |
| 05 — Partner Companies | *(paste link after creating)* |
| 06 — Full Ecosystem | *(paste link after creating)* |
| Linked notebook (owner-provided, topic TBD) | https://notebooklm.google.com/notebook/98636c01-c524-4ff8-a9f6-05770487a7ec |

---

## File Index

```
/home/user/workspace/robusca-brain/notebooklm/
├── README.md                              ← This file
├── notebook-01-global-markets-platform.md
├── notebook-02-studex-company.md
├── notebook-03-super-agents.md
├── notebook-04-africabiz.md
├── notebook-05-partner-companies.md
└── notebook-06-full-ecosystem.md
```

Source scripts (read-only reference):
```
/home/user/workspace/skills/user/studex-notebooklm/scripts/
├── script-01-global-markets-platform.md
├── script-02-studex-global-markets-company.md
├── script-03-super-agents.md
├── script-04-africabiz-partnership.md
├── script-05-partner-companies.md
└── script-06-full-ecosystem-vision.md
```
