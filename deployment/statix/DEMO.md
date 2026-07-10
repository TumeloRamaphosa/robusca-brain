# Desktop demo — 5 minutes

Run Statix + Ollama on **your laptop** for a live demo. No VM, no Cloudflare required.

## What you get

- Landing + pricing → `http://localhost:5180`
- Voice onboarding (browser mic) → `/onboarding`
- NestVM dashboard → `/dashboard/demo`
- **Ask Soul** chat box → local Ollama (or cloud model)

Daytona / Orgo VM can come later — this is the fastest path to show investors or partners.

---

## Step 1 — Install Ollama (2 min)

**Mac**

```bash
brew install ollama
# or download from https://ollama.com/download
```

**Windows**

Download installer from [https://ollama.com/download](https://ollama.com/download) and run it.

**Linux**

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

Start Ollama (Mac app auto-starts; Linux):

```bash
ollama serve
```

---

## Step 2 — Pick a model (1 min)

**Option A — Small local (works on 8 GB RAM laptops)**

```bash
ollama pull qwen2.5:3b
```

**Option B — Cloud model (no heavy download, needs Ollama account)**

```bash
ollama pull nemotron-3-super:cloud
```

Then set in `.env.local`:

```env
DEMO_MODEL=nemotron-3-super:cloud
```

**Option C — Agentic coding demo**

```bash
ollama launch codex --model nemotron-3-super:cloud --yes
```

---

## Step 3 — Run Statix (1 min)

From this repo:

```bash
cd deployment/statix
npm install
npm run demo
```

Or use the helper script:

```bash
bash deployment/statix/scripts/demo-desktop.sh
```

**Windows (PowerShell):**

```powershell
cd deployment\statix
npm install
npm run demo
```

---

## Demo script (what to show)

1. Open **http://localhost:5180** — Statix landing (black & gold).
2. Click **Get started** → **Onboarding** — allow microphone; Soul speaks each step.
3. Open **http://localhost:5180/dashboard/demo** — morning brief, 8 agents, Companies tab.
4. Scroll to **Ask Soul (Ollama)** — type a question → live local/cloud LLM reply.
5. Say: *"Same stack runs in a private NestVM per customer — Polsia sells, Statix is the face."*

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `Ollama offline` on dashboard | Run `ollama serve` in a terminal |
| Chat returns model not found | `ollama pull qwen2.5:3b` or set `DEMO_MODEL` in `.env.local` |
| Voice doesn't work | Use Chrome/Edge; allow mic; needs `localhost` (HTTPS not required locally) |
| Port 5180 in use | `PORT=5181 npm run demo` |

---

## Optional `.env.local`

```env
DEMO_MODEL=qwen2.5:3b
OLLAMA_HOST=http://127.0.0.1:11434
PORT=5180
```

Never commit API keys. Orgo / Cloudflare / Sakana keys are for VM production only.

---

## After the demo

- **Windows Ornith node** — host Q4_K_M on a 32 GB+ Windows box over Tailscale → [ORNITH_INFERENCE_NODE.md](./ORNITH_INFERENCE_NODE.md)
- **Daytona VM** — same `npm run build && npm start`; set `OLLAMA_HOST` to Tailscale IP
- **Orgo VM** — `npm run deploy:orgo` (Super Agents Command: `333de3f8-0801-430b-a541-aad458e896b5`)
- **studex-group.com** — Cloudflare tunnel + DNS (see CLOUDFLARE_WALKTHROUGH.md)
