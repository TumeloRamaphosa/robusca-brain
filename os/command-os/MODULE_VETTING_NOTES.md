# Command OS Module Vetting Notes

Status: preliminary read-only review  
Scope: public repository/docs inspection only; no third-party installers executed

---

## Summary

These tools are useful, but none should be connected directly to production business agents without a controlled integration path. The safe pattern is:

```text
third-party module
-> Robusca Command API
-> policy/approval/audit layer
-> model router or workflow engine
```

---

## HyrveAI

Observed:

- public registration page for deploying/hiring agents
- no API contract reviewed yet

Use:

- optional marketplace or agent deployment channel

Blockers:

- account model, API permissions, billing, data handling, and webhook capabilities are unknown

Decision:

- do not make core dependency yet

---

## Omi

Observed:

- open-source wearable/mobile/desktop capture system
- captures screen and conversations
- default desktop quick start says it connects to Omi cloud backend
- full backend stack exists but requires separate setup

Use:

- voice/capture connector
- meeting memory
- action-item extraction
- wearable command input

Risks:

- sensitive audio/screen data
- cloud backend by default
- requires strict privacy mode before business use

Decision:

- use only after self-hosting or after an explicit privacy/data-flow decision
- connect through Command API, not directly to business agents

---

## Claude SEO

Observed:

- MIT-licensed Claude Code SEO skill/plugin
- many specialist agents and skills
- supports SEO APIs and optional external data providers
- docs recommend clone-and-review rather than remote pipe execution

Use:

- SEO specialist subsystem for Studex websites and client sites

Risks:

- installer modifies local Claude/plugin config
- optional providers require credentials
- audits may fetch and process external sites

Decision:

- suitable as optional specialist layer after install script review
- store credentials outside repo

---

## SEO Office / seo-os

Observed:

- local-first SEO operating shell
- Next.js/React Three Fiber UI
- orchestrator + specialist + local brain pattern
- AGPL-3.0 license

Use:

- architecture reference for Robusca Command OS UI, task feed, windows, and brain model
- optional local SEO worker

Risks:

- AGPL network-use obligations if we modify and serve derivative code
- installer pulls a heavier Node/Python toolchain

Decision:

- use patterns freely; do not vendor modified production code without license review

---

## Karpathy LLM-wiki gist

Observed:

- concept document, not executable software
- proposes raw sources, synthesized wiki, schema, index, and log

Use:

- memory architecture for business knowledge

Risks:

- generated wiki can drift or hallucinate without evidence discipline

Decision:

- use with provenance, review gates, contradiction logs, and immutable raw sources

---

## Page-Agent

Observed:

- MIT-licensed in-page browser GUI agent
- controls web apps through DOM/action tools
- supports OpenAI-compatible models
- docs warn production should use backend proxy rather than exposing keys client-side

Use:

- browser hands for internal dashboards, n8n, Rocket.Chat, SaaS forms

Risks:

- can click/submit in authenticated sessions
- browser-side keys are unsafe
- broad Chrome extension permissions if extension is used

Decision:

- use only with allowlists, approval gates, and Command API model proxy

---

## RileyJarvis

Observed:

- Electron desktop voice companion
- OpenAI Realtime voice
- optional Exa search
- optional macOS Accessibility and Screen Recording computer control

Use:

- voice prototype for Robusca/Jarvis desktop command

Risks:

- computer-control permissions are powerful
- OpenAI Realtime dependency
- app identity and prompts are not Studex-specific

Decision:

- fork, rebrand, and harden before connecting to business systems
- microphone can be tested first; withhold Accessibility/Screen Recording until approval gates exist

