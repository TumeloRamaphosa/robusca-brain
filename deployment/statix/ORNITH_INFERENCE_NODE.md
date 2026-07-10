# Ornith-35B inference node — Windows + Tailscale

Host the quantized **Ornith-1.0-35B-GGUF** model on a Windows machine on your LAN, expose it only over **Tailscale**, and point Statix / OpenHuman / Ollama clients at it.

## Architecture

```
┌─────────────────────┐         Tailscale mesh          ┌──────────────────────────┐
│  Your laptop / VM   │  ──── 100.x.x.x:11434 ────►  │  Windows inference box    │
│  Statix (5180)      │       (private, encrypted)    │  Ollama + Ornith Q4_K_M  │
│  OpenHuman desktop  │                               │  32 GB+ RAM recommended │
└─────────────────────┘                               └──────────────────────────┘
```

- **No public internet exposure** — inference only on Tailscale IP
- **Small clients** (8 GB VM, laptop) call the Windows box; they do not load 35B locally
- **Daytona / Orgo VMs** use the same `OLLAMA_HOST=http://<tailscale-ip>:11434`

---

## Windows machine requirements

| Spec | Minimum | Recommended |
|------|---------|-------------|
| RAM | **24 GB** (Q4_K_M tight) | **32 GB+** |
| Disk | **30 GB** free | 50 GB (model + cache) |
| GPU | Optional (CPU works, slower) | NVIDIA 12 GB+ VRAM speeds up |
| OS | Windows 10/11 | Windows 11 |

Model size ([HuggingFace GGUF](https://huggingface.co/deepreinforce-ai/Ornith-1.0-35B-GGUF)):

| Quant | Size |
|-------|------|
| **Q4_K_M** (recommended) | 21.2 GB |
| Q5_K_M | 24.7 GB |
| Q6_K | 28.5 GB |

---

## Step 1 — Tailscale on Windows (inference node)

1. Install [Tailscale for Windows](https://tailscale.com/download/windows)
2. Sign in with your Studex tailnet
3. Note the machine name (e.g. `studex-inference`) and **Tailscale IP** (e.g. `100.x.x.x`)

```powershell
tailscale ip -4
```

4. Optional: in [Tailscale admin](https://login.tailscale.com/admin/machines) → disable key expiry for this node so inference stays up.

---

## Step 2 — Ollama on Windows (listen on Tailscale)

1. Install [Ollama for Windows](https://ollama.com/download)
2. **Allow remote access** (so other Tailscale devices can connect):

```powershell
# System environment variable — set permanently, then restart Ollama app
[System.Environment]::SetEnvironmentVariable("OLLAMA_HOST", "0.0.0.0:11434", "User")
```

Restart Ollama from the system tray.

3. Pull Ornith GGUF (first run downloads ~21 GB):

```powershell
ollama pull hf.co/deepreinforce-ai/Ornith-1.0-35B-GGUF:Q4_K_M
```

Or use the helper script in this repo:

```powershell
powershell -ExecutionPolicy Bypass -File deployment\statix\scripts\setup-ornith-windows.ps1
```

4. Verify locally:

```powershell
ollama run hf.co/deepreinforce-ai/Ornith-1.0-35B-GGUF:Q4_K_M "Say hello in one sentence."
```

---

## Step 3 — Tailscale on client (laptop / VM)

Install Tailscale on the machine running Statix (Mac, Linux VM, or second Windows PC).

Test connectivity **from the client** (replace IP):

```bash
curl http://100.x.x.x:11434/api/tags
```

You should see JSON with the Ornith model listed.

---

## Step 4 — Point Statix at the inference node

On your **demo laptop** or **Orgo/Daytona VM**, create `deployment/statix/.env.local`:

```env
# Tailscale IP of Windows inference box
OLLAMA_HOST=http://100.x.x.x:11434
DEMO_MODEL=hf.co/deepreinforce-ai/Ornith-1.0-35B-GGUF:Q4_K_M
```

Then:

```bash
cd deployment/statix
npm run demo
# or npm run dev
```

Open **http://localhost:5180/dashboard/demo** → **Ask Soul** uses Ornith on Windows.

Check API:

```bash
curl http://localhost:5180/api/llm/status
```

---

## Step 5 — OpenHuman / Codex / agent CLIs

Any OpenAI-compatible client can use the same endpoint:

```bash
export OPENAI_BASE_URL=http://100.x.x.x:11434/v1
export OPENAI_API_KEY=ollama
export OPENAI_MODEL=hf.co/deepreinforce-ai/Ornith-1.0-35B-GGUF:Q4_K_M
```

Ollama launch (on a client with Ollama 0.18+):

```bash
# Client talks to remote Ollama via env — or use local ollama with OLLAMA_HOST
OLLAMA_HOST=http://100.x.x.x:11434 ollama run hf.co/deepreinforce-ai/Ornith-1.0-35B-GGUF:Q4_K_M
```

---

## Security

- Do **not** port-forward 11434 to the public internet
- Use Tailscale ACLs to limit who can reach the inference node
- Never commit Tailscale auth keys or `.env.local` to git
- Rotate any keys pasted in chat

---

## What to send when Tailscale is ready

Reply with:

1. **Windows machine Tailscale IP** (e.g. `100.64.x.x`)
2. **Machine name** in Tailscale admin
3. **RAM** on that box (confirm 32 GB+)
4. Whether Ollama pull has finished

I will plug the IP into Statix config and verify `/api/llm/status` end-to-end.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `connection refused` from client | `OLLAMA_HOST=0.0.0.0:11434` on Windows + restart Ollama |
| Model not in `/api/tags` | Re-run `ollama pull hf.co/deepreinforce-ai/Ornith-1.0-35B-GGUF:Q4_K_M` |
| Very slow replies | Expected on CPU-only; use Q4_K_M not Q8; add GPU if possible |
| Out of memory | Need 32 GB RAM or smaller quant; close other apps |
| Tailscale ping fails | Both machines same tailnet; check Windows firewall for Ollama |

---

## Later: Daytona / Orgo VM as client only

The 8 GB **Super Agents Command** VM does not host Ornith — it only calls:

```env
OLLAMA_HOST=http://100.x.x.x:11434
```

Same pattern for Daytona sandboxes: Statix container + `OLLAMA_HOST` pointing at your Windows Tailscale IP.
