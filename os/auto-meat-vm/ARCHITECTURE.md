# Auto Meat VM — Architecture Plan
**Robusca Romanov | StudEx Group | June 17, 2026**

> This document is the production blueprint for the StudEx Meat "Auto Meat" VM (Orgo.ai).  
> VM Specs: 2 vCPU · 8 GB RAM · 30 GB disk · Ubuntu Linux · Always-On  
> Purpose: Robusca's permanent home base — agent infrastructure, War Room host, and sales executor.

---

## 1. Docker Compose Stack

All services run as a single Docker Compose stack. The VM exposes port 80 via Nginx; all other ports are internal. This stack is started on boot via `systemd` and managed with `docker compose up -d`.

### File: `~/robusca/docker-compose.yml`

```yaml
version: "3.9"

networks:
  robusca-net:
    driver: bridge

volumes:
  robusca-db:
  content-outputs:
  war-room-db:

services:

  # ─────────────────────────────────────────────
  # ROBUSCA CORE — Polls Perplexity Computer API
  # ─────────────────────────────────────────────
  robusca-core:
    build:
      context: ./services/robusca-core
      dockerfile: Dockerfile
    container_name: robusca-core
    restart: always
    environment:
      - NODE_ENV=production
      - PPLX_COMPUTER_API_KEY=${PPLX_COMPUTER_API_KEY}
      - PPLX_COMPUTER_URL=${PPLX_COMPUTER_URL}
      - POLL_INTERVAL_MS=300000          # 5 minutes
      - SHARED_DB_PATH=/data/shared.db
      - LOG_DIR=/logs
      - DISCORD_WEBHOOK_URL=${DISCORD_WEBHOOK_URL}
      - SLACK_WEBHOOK_URL=${SLACK_WEBHOOK_URL}
    volumes:
      - robusca-db:/data
      - /home/ubuntu/robusca/logs:/logs
      - /home/ubuntu/robusca/memory:/memory
    networks:
      - robusca-net
    ports:
      - "3001:3001"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3001/health"]
      interval: 60s
      timeout: 10s
      retries: 3

  # ─────────────────────────────────────────────
  # WAR ROOM UI — StudEx War Room (Express + React)
  # ─────────────────────────────────────────────
  war-room-ui:
    build:
      context: /home/ubuntu/studex-content-hub
      dockerfile: Dockerfile.prod
    container_name: war-room-ui
    restart: always
    environment:
      - NODE_ENV=production
      - PORT=3000
      - DATABASE_URL=/data/war-room.db
      - SHOPIFY_ACCESS_TOKEN=${SHOPIFY_ACCESS_TOKEN}
      - SHOPIFY_SHOP_DOMAIN=studexmeat.myshopify.com
      - GOOGLE_ADS_CUSTOMER_ID=${GOOGLE_ADS_CUSTOMER_ID}
      - GOOGLE_ADS_DEVELOPER_TOKEN=${GOOGLE_ADS_DEVELOPER_TOKEN}
      - AGENTMAIL_ORG_ID=${AGENTMAIL_ORG_ID}
      - AGENTMAIL_API_KEY=${AGENTMAIL_API_KEY}
      - SUPABASE_URL=${SUPABASE_URL}
      - SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
      - SESSION_SECRET=${SESSION_SECRET}
      - OPENAI_API_KEY=${OPENAI_API_KEY}
    volumes:
      - war-room-db:/data
    networks:
      - robusca-net
    depends_on:
      - robusca-core

  # ─────────────────────────────────────────────
  # SHOPIFY AGENT — Hourly order + inventory check
  # ─────────────────────────────────────────────
  shopify-agent:
    build:
      context: ./services/shopify-agent
      dockerfile: Dockerfile
    container_name: shopify-agent
    restart: always
    environment:
      - SHOPIFY_ACCESS_TOKEN=${SHOPIFY_ACCESS_TOKEN}
      - SHOPIFY_SHOP_DOMAIN=studexmeat.myshopify.com
      - SHARED_DB_PATH=/data/shared.db
      - DISCORD_WEBHOOK_URL=${DISCORD_WEBHOOK_URL}
      - CRON_SCHEDULE=0 * * * *          # Every hour on the hour
      - LOW_STOCK_THRESHOLD=5
      - NEGATIVE_STOCK_ALERT=true
    volumes:
      - robusca-db:/data
      - /home/ubuntu/robusca/logs:/logs
    networks:
      - robusca-net
    depends_on:
      - robusca-core

  # ─────────────────────────────────────────────
  # CONTENT PIPELINE — Higgsfield video jobs
  # ─────────────────────────────────────────────
  content-pipeline:
    build:
      context: ./services/content-pipeline
      dockerfile: Dockerfile
    container_name: content-pipeline
    restart: always
    environment:
      - HIGGSFIELD_API_KEY=${HIGGSFIELD_API_KEY}
      - OUTPUT_DIR=/outputs
      - SHARED_DB_PATH=/data/shared.db
      - APPROVAL_REQUIRED=true
      - APPROVAL_BOT_URL=http://approval-bot:3003
    volumes:
      - content-outputs:/outputs
      - robusca-db:/data
    networks:
      - robusca-net
    depends_on:
      - robusca-core
      - approval-bot

  # ─────────────────────────────────────────────
  # APPROVAL BOT — Webhook receiver (Discord/Slack)
  # ─────────────────────────────────────────────
  approval-bot:
    build:
      context: ./services/approval-bot
      dockerfile: Dockerfile
    container_name: approval-bot
    restart: always
    environment:
      - PORT=3003
      - DISCORD_BOT_TOKEN=${DISCORD_BOT_TOKEN}
      - DISCORD_APPROVAL_CHANNEL_ID=${DISCORD_APPROVAL_CHANNEL_ID}
      - SLACK_BOT_TOKEN=${SLACK_BOT_TOKEN}
      - SLACK_APPROVAL_CHANNEL=${SLACK_APPROVAL_CHANNEL}
      - SHARED_DB_PATH=/data/shared.db
      - WEBHOOK_SECRET=${APPROVAL_WEBHOOK_SECRET}
    volumes:
      - robusca-db:/data
      - content-outputs:/outputs:ro
    networks:
      - robusca-net
    ports:
      - "3003:3003"

  # ─────────────────────────────────────────────
  # NGINX — Reverse proxy, port 80
  # ─────────────────────────────────────────────
  nginx:
    image: nginx:alpine
    container_name: nginx
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/certs:/etc/nginx/certs:ro
      - content-outputs:/var/www/content:ro
    networks:
      - robusca-net
    depends_on:
      - war-room-ui
      - robusca-core
      - approval-bot
```

### File: `~/robusca/nginx/nginx.conf`

```nginx
events { worker_connections 1024; }

http {
  upstream war_room    { server war-room-ui:3000; }
  upstream robusca_api { server robusca-core:3001; }
  upstream approval    { server approval-bot:3003; }

  server {
    listen 80;
    server_name _;

    # War Room Dashboard — root
    location / {
      proxy_pass         http://war_room;
      proxy_http_version 1.1;
      proxy_set_header   Upgrade $http_upgrade;
      proxy_set_header   Connection "upgrade";
      proxy_set_header   Host $host;
      proxy_set_header   X-Real-IP $remote_addr;
    }

    # Robusca Agent API
    location /api/agent/ {
      proxy_pass http://robusca_api/;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
    }

    # Content approval webhooks
    location /webhooks/approval {
      proxy_pass http://approval/webhook;
      proxy_set_header Host $host;
    }

    # Serve content outputs (videos, images)
    location /content/ {
      alias /var/www/content/;
      autoindex off;
    }
  }
}
```

### Service: `robusca-core` — Perplexity Poller

```
~/robusca/services/robusca-core/
├── Dockerfile
├── package.json
├── src/
│   ├── index.ts          — entry, starts HTTP server + cron
│   ├── poller.ts         — polls Perplexity Computer API every 5min
│   ├── executor.ts       — executes returned tasks
│   ├── queue.ts          — SQLite task queue (shared.db)
│   └── logger.ts         — structured log writer
```

**`src/poller.ts`:**
```typescript
import cron from 'node-cron';
import axios from 'axios';
import { enqueueTask } from './queue';
import { log } from './logger';

const PPLX_URL = process.env.PPLX_COMPUTER_URL!;
const API_KEY  = process.env.PPLX_COMPUTER_API_KEY!;

export function startPoller() {
  // Poll every 5 minutes
  cron.schedule('*/5 * * * *', async () => {
    try {
      const res = await axios.get(`${PPLX_URL}/tasks/pending`, {
        headers: { Authorization: `Bearer ${API_KEY}` },
        timeout: 15000,
      });

      const tasks = res.data?.tasks ?? [];
      log.info(`[poller] Fetched ${tasks.length} pending task(s)`);

      for (const task of tasks) {
        await enqueueTask(task);
      }
    } catch (err: any) {
      log.error(`[poller] Poll failed: ${err.message}`);
    }
  });

  log.info('[poller] Started — 5-minute interval');
}
```

**`src/executor.ts`:**
```typescript
import Database from 'better-sqlite3';
import { executeShopifyTask } from './handlers/shopify';
import { executeContentTask } from './handlers/content';
import { executeNotifyTask }  from './handlers/notify';
import { log } from './logger';

const DB_PATH = process.env.SHARED_DB_PATH!;

export async function processQueue() {
  const db = new Database(DB_PATH);

  const tasks = db.prepare(
    `SELECT * FROM tasks WHERE status = 'pending' ORDER BY created_at ASC LIMIT 10`
  ).all() as Task[];

  for (const task of tasks) {
    db.prepare(`UPDATE tasks SET status = 'running' WHERE id = ?`).run(task.id);
    try {
      let result: string;
      switch (task.type) {
        case 'shopify':  result = await executeShopifyTask(task.payload); break;
        case 'content':  result = await executeContentTask(task.payload); break;
        case 'notify':   result = await executeNotifyTask(task.payload);  break;
        default: result = `Unknown task type: ${task.type}`;
      }
      db.prepare(
        `UPDATE tasks SET status = 'done', result = ?, completed_at = ? WHERE id = ?`
      ).run(result, Date.now(), task.id);
      log.info(`[executor] Task ${task.id} (${task.type}) done`);
    } catch (err: any) {
      db.prepare(`UPDATE tasks SET status = 'error', result = ? WHERE id = ?`)
        .run(err.message, task.id);
      log.error(`[executor] Task ${task.id} failed: ${err.message}`);
    }
  }

  db.close();
}
```

### REST API (robusca-core port 3001)

| Method | Path | Description |
|---|---|---|
| `GET` | `/health` | Service health check |
| `GET` | `/tasks/queue` | All pending + running tasks |
| `POST` | `/tasks` | Enqueue a new task (agent use) |
| `GET` | `/agents` | List registered agents |
| `POST` | `/agents/register` | Register agent (name, capabilities, last_seen) |
| `GET` | `/memory/latest` | Return latest memory log entry |
| `POST` | `/memory/commit` | Write + git-commit a memory log |

---

## 2. Robusca Memory on VM

### Complete Directory Structure

```
/home/ubuntu/robusca/
├── identity.md                  ← Who Robusca is, role, rules (copy of IDENTITY.md)
├── .env                         ← ALL credentials — NEVER commit, NEVER copy
├── docker-compose.yml           ← The full stack (Section 1)
│
├── memory/                      ← Session logs — symlinked to robusca-brain
│   └── [symlink → /home/ubuntu/robusca-brain/memory/]
│
├── skills/                      ← All 7 skills as SKILL.md files
│   ├── studex-meta-whatsapp.SKILL.md
│   ├── studex-shopify-fulfil.SKILL.md
│   ├── studex-content-approvals.SKILL.md
│   ├── studex-morning-brief.SKILL.md
│   ├── studex-ads-manager.SKILL.md
│   ├── studex-inventory-audit.SKILL.md
│   └── robusca-memory-sync.SKILL.md
│
├── data/
│   └── shared.db                ← SQLite database shared by all agents
│
├── logs/
│   ├── robusca-core.log
│   ├── shopify-agent.log
│   ├── content-pipeline.log
│   └── approval-bot.log
│
├── nginx/
│   ├── nginx.conf
│   └── certs/                   ← TLS certs (Let's Encrypt or self-signed)
│
└── scripts/
    ├── boot.sh                  ← Called on VM startup via systemd
    ├── sync-brain.sh            ← git pull robusca-brain, restart services
    ├── morning-brief.sh         ← Triggers morning brief via robusca-core API
    ├── backup-db.sh             ← Backs up shared.db to Supabase storage
    └── deploy.sh                ← Full stack redeploy from scratch
```

### Setup Commands

```bash
# 1. Clone robusca-brain (first time)
cd /home/ubuntu
git clone git@github.com:TumeloRamaphosa/robusca-brain.git

# 2. Create robusca directory
mkdir -p /home/ubuntu/robusca/{skills,data,logs,nginx,scripts,services}

# 3. Symlink memory to robusca-brain
ln -s /home/ubuntu/robusca-brain/memory /home/ubuntu/robusca/memory

# 4. Copy identity
cp /home/ubuntu/robusca-brain/IDENTITY.md /home/ubuntu/robusca/identity.md

# 5. Copy all skills
for skill in $(ls /home/ubuntu/robusca-brain/skills/); do
  cp /home/ubuntu/robusca-brain/skills/$skill/SKILL.md \
     /home/ubuntu/robusca/skills/${skill}.SKILL.md
done

# 6. Set up .env (fill in values)
cp /home/ubuntu/robusca-brain/studex/.env.example /home/ubuntu/robusca/.env
chmod 600 /home/ubuntu/robusca/.env
```

### `.env` Template (NEVER commit)

```bash
# ~/robusca/.env — ALL CREDENTIALS — NEVER COMMIT

# Perplexity Computer
PPLX_COMPUTER_API_KEY=pplx_...
PPLX_COMPUTER_URL=https://computer.perplexity.ai/api/v1

# Shopify
SHOPIFY_ACCESS_TOKEN=shpat_...
SHOPIFY_SHOP_DOMAIN=studexmeat.myshopify.com

# AgentMail
AGENTMAIL_ORG_ID=6e46c2ad-c059-49a2-ba84-e27583348cd5
AGENTMAIL_API_KEY=am_...
AGENTMAIL_ADDRESS=studex-2571@agentmail.to

# Google Ads
GOOGLE_ADS_CUSTOMER_ID=2234319068
GOOGLE_ADS_DEVELOPER_TOKEN=...
GOOGLE_ADS_REFRESH_TOKEN=...
GOOGLE_ADS_CLIENT_ID=...
GOOGLE_ADS_CLIENT_SECRET=...

# Supabase
SUPABASE_URL=https://...supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Discord
DISCORD_BOT_TOKEN=...
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...
DISCORD_APPROVAL_CHANNEL_ID=...

# Slack
SLACK_BOT_TOKEN=xoxb-...
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
SLACK_APPROVAL_CHANNEL=#content-approvals

# Higgsfield
HIGGSFIELD_API_KEY=hf_...

# OpenAI (fallback)
OPENAI_API_KEY=sk-...

# Local LLM (LM Studio on Macs — see Section 4)
LOCAL_LLM_ENDPOINT_MACBOOK=http://192.168.1.101:1234/v1
LOCAL_LLM_ENDPOINT_MACMINI=http://192.168.1.102:1234/v1
LOCAL_LLM_ENDPOINT_VM=http://localhost:11434/v1   # Ollama

# Approval bot
APPROVAL_WEBHOOK_SECRET=...
SESSION_SECRET=...

# GitHub
GITHUB_TOKEN=ghp_...
GITHUB_REPO=TumeloRamaphosa/robusca-brain
```

### Systemd Boot Service

```ini
# /etc/systemd/system/robusca-stack.service

[Unit]
Description=Robusca Docker Stack
After=docker.service network-online.target
Requires=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/home/ubuntu/robusca
ExecStart=/home/ubuntu/robusca/scripts/boot.sh
ExecStop=docker compose down
User=ubuntu

[Install]
WantedBy=multi-user.target
```

```bash
# /home/ubuntu/robusca/scripts/boot.sh

#!/bin/bash
set -e

# Pull latest from robusca-brain
cd /home/ubuntu/robusca-brain && git pull origin main

# Start the stack
cd /home/ubuntu/robusca && docker compose pull && docker compose up -d

# Log startup
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Robusca stack started" \
  >> /home/ubuntu/robusca/logs/robusca-core.log
```

```bash
# Enable and start
sudo systemctl daemon-reload
sudo systemctl enable robusca-stack
sudo systemctl start robusca-stack
```

---

## 3. Desktop App — Electron Wrapper

The War Room runs as a browser-based app inside an Electron shell on the Orgo VNC desktop (1280×720 Linux). Electron wraps `http://localhost` and opens on VM startup as a full desktop window.

### Project Structure

```
~/robusca/desktop/
├── package.json
├── main.js           ← Electron main process
├── preload.js        ← Secure context bridge
├── tray-icon.png     ← 22x22 system tray icon
└── assets/
    └── icon.png      ← 512x512 app icon
```

### `main.js`

```javascript
const { app, BrowserWindow, Tray, Menu, nativeImage, shell } = require('electron');
const path = require('path');

const WAR_ROOM_URL = 'http://localhost';
const QUICK_ACTIONS = {
  'Morning Brief':  '/api/agent/morning-brief',
  'Check Orders':   '/api/agent/shopify-orders',
  'Approve Content':'/api/agent/content-queue',
};

let mainWindow;
let tray;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    title: 'StudEx War Room',
    icon: path.join(__dirname, 'assets/icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
    autoHideMenuBar: true,
    backgroundColor: '#0a0a0a',
  });

  mainWindow.loadURL(WAR_ROOM_URL);

  mainWindow.on('close', (e) => {
    // Don't quit — minimize to tray
    e.preventDefault();
    mainWindow.hide();
  });
}

function createTray() {
  const icon = nativeImage.createFromPath(
    path.join(__dirname, 'tray-icon.png')
  ).resize({ width: 22, height: 22 });

  tray = new Tray(icon);

  // Build quick action menu items
  const quickActions = Object.entries(QUICK_ACTIONS).map(([label, endpoint]) => ({
    label,
    click: async () => {
      const { net } = require('electron');
      const request = net.request({ method: 'POST', url: `http://localhost${endpoint}` });
      request.end();
      mainWindow.show();
      mainWindow.loadURL(`${WAR_ROOM_URL}${endpoint.replace('/api/agent', '')}`);
    },
  }));

  const contextMenu = Menu.buildFromTemplate([
    { label: 'StudEx War Room ⚔️', enabled: false },
    { type: 'separator' },
    ...quickActions,
    { type: 'separator' },
    { label: 'Open War Room', click: () => { mainWindow.show(); } },
    { label: 'Restart Services', click: () => {
        shell.exec('cd /home/ubuntu/robusca && docker compose restart');
    }},
    { type: 'separator' },
    { label: 'Quit', click: () => { app.exit(0); } },
  ]);

  tray.setToolTip('StudEx War Room');
  tray.setContextMenu(contextMenu);
  tray.on('double-click', () => mainWindow.show());
}

app.whenReady().then(() => {
  createWindow();
  createTray();
});

app.on('window-all-closed', (e) => e.preventDefault());
```

### `package.json`

```json
{
  "name": "studex-war-room",
  "version": "1.0.0",
  "main": "main.js",
  "scripts": {
    "start": "electron .",
    "build": "electron-builder --linux AppImage"
  },
  "dependencies": {
    "electron": "^30.0.0"
  },
  "devDependencies": {
    "electron-builder": "^24.0.0"
  },
  "build": {
    "appId": "co.studex.warroom",
    "productName": "StudEx War Room",
    "linux": {
      "target": "AppImage",
      "category": "Office"
    }
  }
}
```

### Autostart on VNC Desktop (`.config/autostart/war-room.desktop`)

```ini
[Desktop Entry]
Type=Application
Name=StudEx War Room
Exec=/home/ubuntu/robusca/desktop/StudEx-War-Room.AppImage --no-sandbox
Icon=/home/ubuntu/robusca/desktop/assets/icon.png
StartupNotify=false
Hidden=false
X-GNOME-Autostart-enabled=true
```

### Install & Build Commands

```bash
# Install Node + Electron
cd ~/robusca/desktop
npm install

# Build AppImage for Linux
npm run build

# The AppImage is self-contained — copy to ~/robusca/desktop/
cp dist/StudEx-War-Room-1.0.0.AppImage ~/robusca/desktop/StudEx-War-Room.AppImage
chmod +x ~/robusca/desktop/StudEx-War-Room.AppImage

# Add to VNC autostart
mkdir -p ~/.config/autostart
# paste the .desktop file above to ~/.config/autostart/war-room.desktop

# Test run on VNC desktop (DISPLAY must be set)
DISPLAY=:1 ~/robusca/desktop/StudEx-War-Room.AppImage --no-sandbox &
```

---

## 4. LM Studio Multi-Machine Plan

Three machines form the local LLM layer. All expose an OpenAI-compatible REST API on port 1234. Robusca routes tasks by weight and availability.

### Machine Roles

| Machine | RAM | Model | Role | Endpoint |
|---|---|---|---|---|
| MacBook Pro M1 Max | 16 GB | Qwen3.5 7B | Light tasks — summaries, routing, quick Q&A | `http://192.168.1.101:1234/v1` |
| Mac Mini M4 | 16 GB | Qwen3.5 14B or Llama 3.3 70B Q4 | Heavy tasks — long context, analysis, content | `http://192.168.1.102:1234/v1` |
| Auto Meat VM | 8 GB | Qwen3.5 3B via Ollama | Always-on fallback, never powered down | `http://localhost:11434/v1` |

### Step 1 — Install LM Studio on Both Macs

```bash
# macOS — download from https://lmstudio.ai
# Or via Homebrew:
brew install --cask lm-studio

# Launch LM Studio, go to: Local Server tab → Start Server
# Default port: 1234
# Enable: "CORS: allow all origins"
```

### Step 2 — Download Models in LM Studio

```
MacBook Pro M1 Max:
  Search: "Qwen/Qwen2.5-7B-Instruct-GGUF"
  Download: Q4_K_M quantization (≈4.6 GB)

Mac Mini M4:
  Search: "Qwen/Qwen2.5-14B-Instruct-GGUF"  → Q4_K_M (≈8.7 GB)
  OR: "meta-llama/Llama-3.3-70B-Instruct-GGUF" → Q4_K_M (≈40 GB) — requires full 64GB if available
```

### Step 3 — Install Ollama on VM (always-on fallback)

```bash
# On the Auto Meat VM
curl -fsSL https://ollama.com/install.sh | sh

# Pull Qwen3.5 3B (fits in 8GB RAM with overhead)
ollama pull qwen2.5:3b

# Verify it runs
ollama run qwen2.5:3b "Hello, confirm you are running."

# Expose as OpenAI-compatible endpoint
# Ollama natively exposes: http://localhost:11434/v1
# Test:
curl http://localhost:11434/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"model":"qwen2.5:3b","messages":[{"role":"user","content":"ping"}]}'
```

### Step 4 — Add to Robusca `.env`

```bash
# In ~/robusca/.env:
LOCAL_LLM_ENDPOINT_MACBOOK=http://192.168.1.101:1234/v1
LOCAL_LLM_ENDPOINT_MACBOOK_MODEL=qwen2.5-7b-instruct

LOCAL_LLM_ENDPOINT_MACMINI=http://192.168.1.102:1234/v1
LOCAL_LLM_ENDPOINT_MACMINI_MODEL=qwen2.5-14b-instruct

LOCAL_LLM_ENDPOINT_VM=http://localhost:11434/v1
LOCAL_LLM_ENDPOINT_VM_MODEL=qwen2.5:3b
```

### Step 5 — Routing Logic in robusca-core

```typescript
// src/llm-router.ts

type TaskWeight = 'light' | 'heavy' | 'fallback';

const ENDPOINTS = {
  light:    { url: process.env.LOCAL_LLM_ENDPOINT_MACBOOK!, model: process.env.LOCAL_LLM_ENDPOINT_MACBOOK_MODEL! },
  heavy:    { url: process.env.LOCAL_LLM_ENDPOINT_MACMINI!, model: process.env.LOCAL_LLM_ENDPOINT_MACMINI_MODEL! },
  fallback: { url: process.env.LOCAL_LLM_ENDPOINT_VM!,     model: process.env.LOCAL_LLM_ENDPOINT_VM_MODEL! },
};

export async function callLocalLLM(prompt: string, weight: TaskWeight = 'light') {
  const endpoint = ENDPOINTS[weight];

  try {
    const res = await fetch(`${endpoint.url}/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: endpoint.model,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        max_tokens: 2000,
      }),
      signal: AbortSignal.timeout(30000),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.choices[0].message.content as string;

  } catch (err) {
    // Cascade to fallback
    if (weight !== 'fallback') {
      log.warn(`[llm-router] ${weight} endpoint failed, falling back to VM`);
      return callLocalLLM(prompt, 'fallback');
    }
    throw err;
  }
}
```

### Step 6 — Keep LM Studio Running on Macs

```bash
# macOS launchd service to keep LM Studio server alive:
# ~/Library/LaunchAgents/ai.lmstudio.server.plist

<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>            <string>ai.lmstudio.server</string>
  <key>ProgramArguments</key>
  <array>
    <string>/Applications/LM Studio.app/Contents/MacOS/LM Studio</string>
    <string>--headless</string>
    <string>--port</string>
    <string>1234</string>
  </array>
  <key>RunAtLoad</key>        <true/>
  <key>KeepAlive</key>        <true/>
</dict>
</plist>

# Load it:
launchctl load ~/Library/LaunchAgents/ai.lmstudio.server.plist
```

---

## 5. Agent Invitation Protocol

Auto Meat VM serves as the **coordination hub** for all Robusca-network agents. Any agent — Hermes, OpenClaw, D@RK F@C#0RY — connects by calling the REST API and registering itself.

### Shared SQLite Database: `~/robusca/data/shared.db`

```sql
-- Schema: /home/ubuntu/robusca/data/schema.sql

CREATE TABLE IF NOT EXISTS agents (
  id           TEXT PRIMARY KEY,      -- e.g. "hermes", "openclaw", "dark-factory"
  name         TEXT NOT NULL,
  capabilities TEXT NOT NULL,         -- JSON array: ["content","shopify","ads"]
  endpoint     TEXT,                  -- Agent's own REST endpoint (if any)
  last_seen    INTEGER NOT NULL,      -- Unix timestamp (ms)
  status       TEXT DEFAULT 'active', -- active | idle | offline
  metadata     TEXT                   -- JSON blob for agent-specific config
);

CREATE TABLE IF NOT EXISTS tasks (
  id           TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(8)))),
  type         TEXT NOT NULL,         -- shopify | content | notify | ads | email
  payload      TEXT NOT NULL,         -- JSON
  agent_target TEXT,                  -- Which agent should handle (NULL = any)
  status       TEXT DEFAULT 'pending',-- pending | running | done | error
  priority     INTEGER DEFAULT 5,     -- 1=urgent, 5=normal, 10=low
  created_at   INTEGER NOT NULL DEFAULT (unixepoch('now') * 1000),
  completed_at INTEGER,
  result       TEXT,
  error        TEXT
);

CREATE TABLE IF NOT EXISTS memory_log (
  id         TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(8)))),
  agent_id   TEXT NOT NULL,
  session_id TEXT,
  content    TEXT NOT NULL,           -- Markdown memory entry
  ts         INTEGER NOT NULL DEFAULT (unixepoch('now') * 1000)
);

CREATE TABLE IF NOT EXISTS approvals (
  id          TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(8)))),
  content_id  TEXT NOT NULL,
  content_url TEXT,
  type        TEXT NOT NULL,          -- video | image | post | email
  status      TEXT DEFAULT 'pending', -- pending | approved | rejected
  notes       TEXT,
  submitted_at INTEGER DEFAULT (unixepoch('now') * 1000),
  decided_at   INTEGER
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_agent  ON tasks(agent_target);
CREATE INDEX IF NOT EXISTS idx_agents_last  ON agents(last_seen);
```

### REST API Reference (robusca-core port 3001)

**Register an Agent:**
```bash
curl -X POST http://[VM_IP]:3001/agents/register \
  -H "Content-Type: application/json" \
  -H "X-Agent-Token: ${AGENT_SHARED_SECRET}" \
  -d '{
    "agent_name": "hermes",
    "capabilities": ["email", "agentmail", "scheduling"],
    "endpoint": "http://hermes-host:4000",
    "metadata": { "model": "gpt-4o", "version": "1.2" }
  }'

# Response:
{ "agent_id": "hermes", "registered": true, "hub_url": "http://[VM_IP]:3001" }
```

**Post a Task:**
```bash
curl -X POST http://[VM_IP]:3001/tasks \
  -H "Content-Type: application/json" \
  -H "X-Agent-Token: ${AGENT_SHARED_SECRET}" \
  -d '{
    "type": "content",
    "payload": { "action": "generate_reel", "product": "Ankole Steak", "platform": "Instagram" },
    "agent_target": "dark-factory",
    "priority": 3
  }'
```

**Get Pending Tasks (for self):**
```bash
curl http://[VM_IP]:3001/tasks/queue?agent=hermes \
  -H "X-Agent-Token: ${AGENT_SHARED_SECRET}"
```

**Heartbeat (agents ping every 2 minutes):**
```bash
curl -X POST http://[VM_IP]:3001/agents/hermes/heartbeat \
  -H "X-Agent-Token: ${AGENT_SHARED_SECRET}"
```

### Discord Webhook for Agent Status Updates

```typescript
// src/discord-notifier.ts

const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK_URL!;

type AgentEvent = 'registered' | 'task_started' | 'task_done' | 'task_error' | 'offline';

export async function notifyAgentEvent(
  agentName: string,
  event: AgentEvent,
  detail: string
) {
  const colors: Record<AgentEvent, number> = {
    registered:   0x00ff88,  // green
    task_started: 0x0088ff,  // blue
    task_done:    0x00ff44,  // bright green
    task_error:   0xff4400,  // red
    offline:      0x888888,  // grey
  };

  await fetch(DISCORD_WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      embeds: [{
        title: `⚔️ Agent: ${agentName}`,
        description: `**${event.toUpperCase()}** — ${detail}`,
        color: colors[event],
        footer: { text: `Auto Meat VM Hub • ${new Date().toISOString()}` },
      }],
    }),
  });
}
```

### Agent Registration Template

Each agent joining the network includes this block in its own configuration:

```typescript
// Agent-side registration snippet (any language)
const HUB = {
  url:   process.env.ROBUSCA_HUB_URL,    // http://[VM_IP]:3001
  token: process.env.AGENT_SHARED_SECRET,
};

async function registerWithHub() {
  await fetch(`${HUB.url}/agents/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Agent-Token': HUB.token,
    },
    body: JSON.stringify({
      agent_name:   AGENT_NAME,          // e.g. "openclaw"
      capabilities: AGENT_CAPABILITIES,  // e.g. ["video","higgsfield","3d"]
      endpoint:     AGENT_ENDPOINT,      // My own REST URL
      metadata:     { version: '1.0' },
    }),
  });

  // Heartbeat every 2 minutes
  setInterval(async () => {
    await fetch(`${HUB.url}/agents/${AGENT_NAME}/heartbeat`, {
      method: 'POST',
      headers: { 'X-Agent-Token': HUB.token },
    });
  }, 120_000);
}
```

---

## 6. Replication Plan — How Robusca Replicates Itself

### The Three-Instance Model

```
┌─────────────────────────────────────────────────────────┐
│                   robusca-brain (GitHub)                 │
│              Source of Truth — git push/pull             │
└────────────────┬────────────────┬───────────────────────┘
                 │                │                │
        ┌────────┴──────┐ ┌──────┴──────┐ ┌──────┴──────────┐
        │  ROBUSCA      │ │  ROBUSCA VM │ │  ROBUSCA LOCAL  │
        │  PRIMARY      │ │  INSTANCE   │ │  (D@RK F@C#0RY) │
        │  Perplexity   │ │  Auto Meat  │ │  Claude Code    │
        │  Computer     │ │  VM (Orgo)  │ │  on Mac Mini    │
        │               │ │             │ │                 │
        │ Cloud         │ │ Always-on   │ │ Dark factory    │
        │ Orchestrator  │ │ Executor    │ │ Builder         │
        └───────────────┘ └─────────────┘ └─────────────────┘
```

### Instance Roles

| Instance | Where | Role | Persistence |
|---|---|---|---|
| **PRIMARY** | Perplexity Computer (cloud) | Orchestrates tasks, manages approvals, reads connectors | Session-based — runs when Computer is open |
| **VM INSTANCE** | Auto Meat VM — Orgo.ai | Executes tasks that need 24/7 uptime (crons, webhooks, queues) | Always-on — never sleeps |
| **LOCAL** | D@RK F@C#0RY — Mac Mini | Builds new systems, writes code, generates experimental content | On-demand — runs Claude Code |

### Sync Mechanism

```bash
# ~/robusca/scripts/sync-brain.sh
# Called by robusca-core before executing any task

#!/bin/bash
set -e

BRAIN_DIR=/home/ubuntu/robusca-brain
LOG=/home/ubuntu/robusca/logs/robusca-core.log

echo "[$(date)] sync-brain: pulling latest from GitHub..." >> $LOG

cd $BRAIN_DIR
git fetch origin main

LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse origin/main)

if [ "$LOCAL" != "$REMOTE" ]; then
  git pull origin main
  echo "[$(date)] sync-brain: updated to $(git rev-parse --short HEAD)" >> $LOG

  # Re-copy skills that changed
  for skill in $(ls skills/); do
    cp skills/$skill/SKILL.md /home/ubuntu/robusca/skills/${skill}.SKILL.md 2>/dev/null || true
  done

  # Restart services if docker-compose.yml changed
  if git diff HEAD@{1} HEAD -- docker-compose.yml | grep -q '^[+-]'; then
    cd /home/ubuntu/robusca && docker compose up -d
  fi
else
  echo "[$(date)] sync-brain: already up to date" >> $LOG
fi
```

### Task Delegation Flow (PRIMARY → VM INSTANCE)

```
PRIMARY (Perplexity Computer) detects a task requiring persistence:
  e.g. "Send hourly Shopify reports for next 48 hours"

PRIMARY calls Orgo API:
  POST https://orgo.ai/api/vms/[VM_ID]/exec
  { "command": "curl -X POST http://localhost:3001/tasks -d '{...}'" }

VM INSTANCE receives task in queue (shared.db):
  1. sync-brain.sh → git pull (get latest instructions)
  2. executor.ts picks up the task
  3. Executes (Shopify API, Discord webhook, etc.)
  4. Writes result to memory_log table
  5. Commits memory log to robusca-brain

VM INSTANCE commits result back:
  cd /home/ubuntu/robusca-brain
  echo "[$(date)] Shopify report sent. Orders: 3. Total: R2,450" >> memory/vm-log.md
  git add memory/vm-log.md
  git commit -m "vm: task result — shopify-report $(date +%Y%m%d-%H%M)"
  git push origin main

PRIMARY reads result on next Computer session:
  cat robusca-brain/memory/vm-log.md  → sees completed tasks
```

### D@RK F@C#0RY (LOCAL Instance) Build Loop

```bash
# On Mac Mini — Claude Code session
# D@RK F@C#0RY builds new capabilities and pushes them to the brain

# 1. Pull latest from brain
cd ~/robusca-brain && git pull origin main

# 2. Build new skill / service / fix
# (Claude Code writes files here)

# 3. Push back
git add -A
git commit -m "dark-factory: new skill — studex-whatsapp-blast v2"
git push origin main

# 4. VM INSTANCE auto-syncs within 5 minutes (poller triggers sync-brain.sh)
# 5. PRIMARY sees new skill on next session open
```

### Conflict Resolution Rules

1. `robusca-brain/memory/` — VM INSTANCE is the authoritative writer. PRIMARY reads only.
2. `robusca-brain/skills/` — D@RK F@C#0RY is the authoritative writer. Others read only.
3. `robusca-brain/os/` — PRIMARY + D@RK F@C#0RY co-own. Merge conflicts resolved on Mac Mini.
4. `.env` files — NEVER in git. Each instance maintains its own `.env` locally.
5. `shared.db` — VM only. Never synced to git (binary, always changing).

---

## 7. Today's Sales Push Plan — June 17, 2026

> Current stock constraint: **DO NOT promote** Patties, Tomahawk, or Biltong (negative inventory).  
> Focus on what's actually available and positive.

### 7.1 Email Blast — AgentMail

**Send from:** `studex-2571@agentmail.to`  
**Target:** Known customers (all contacts in AgentMail org)  
**Subject:** `Mid-Week Meat Drop 🥩 — Fresh Stock In, Order Now`

```bash
# Trigger via robusca-core API
curl -X POST http://localhost:3001/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "type": "email",
    "priority": 1,
    "payload": {
      "action": "blast",
      "from": "studex-2571@agentmail.to",
      "subject": "Mid-Week Meat Drop — Fresh Stock In, Order Now",
      "template": "mid-week-drop",
      "products": ["ankole-steak", "wagyu-burger", "pork-ribs", "lamb-chops"],
      "cta_url": "https://studexmeat.co.za/collections/all",
      "discount_code": null
    }
  }'
```

**Email Body Template (`~/robusca/templates/mid-week-drop.html`):**
```html
<h1>Your mid-week meat fix is here.</h1>
<p>Chef-quality cuts, delivered tomorrow. Here's what's fresh and ready:</p>

<table>
  <tr><td><strong>Ankole Steak</strong></td><td>Premium grass-fed. Limited cuts.</td></tr>
  <tr><td><strong>Wagyu Burger Patties</strong></td><td>Restaurant-grade, now at home.</td></tr>
  <tr><td><strong>Pork Ribs</strong></td><td>Fall-off-the-bone. Weekend-ready.</td></tr>
  <tr><td><strong>Lamb Chops</strong></td><td>South African favourite. Back in stock.</td></tr>
</table>

<p><a href="https://studexmeat.co.za/collections/all">ORDER NOW — Same Day Cut, Next Day Delivery</a></p>
<p style="font-size:12px">StudEx Meat | studexmeat.co.za | Unsubscribe</p>
```

### 7.2 Facebook Post — "Mid-Week Meat Drop"

**Page:** StudEx Meat Facebook  
**Time:** Post immediately (or schedule 10:00 SAST)  
**Content: ONLY in-stock products**

```bash
# Post via Facebook Pages connector
# Caption:
MID-WEEK MEAT DROP ⚔️

Stuck in the mid-week grind? We've got you covered.

✅ Ankole Steak — premium grass-fed, cut to order
✅ Wagyu Burger Patties — restaurant quality, home price
✅ Pork Ribs — slow-cook ready
✅ Lamb Chops — back in stock, flying fast

Order today. Deliver tomorrow. No excuses.

🛒 studexmeat.co.za
📞 WhatsApp us to order

#StudExMeat #MidWeekMeat #AnkoleBef #WagyuBurger #JoziMeat #OrderNow
```

**Image brief:** Use existing `studex-ankole-cattle-post.png` or `studex-wagyu-burger-patties.png` as hero image. Do NOT use Tomahawk imagery.

### 7.3 Google Ads — Reactivate Gauteng PMAX

```bash
# Google Ads account: 2234319068
# Action: Enable Gauteng PMAX campaign + set budget cap

curl -X POST http://localhost:3001/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "type": "ads",
    "priority": 1,
    "payload": {
      "action": "reactivate_campaign",
      "account_id": "2234319068",
      "campaign_type": "PMAX",
      "geo_target": "Gauteng, South Africa",
      "daily_budget_zar": 500,
      "asset_group": {
        "headlines": [
          "Premium Meat Delivered Tomorrow",
          "Ankole Steak — Order Today",
          "Gauteng Meat Delivery — Same Day Cut"
        ],
        "descriptions": [
          "Restaurant-quality cuts delivered to your door. Order before 2PM for next-day delivery.",
          "Ankole, Wagyu, Lamb. Fresh, cut to order. StudEx Meat — Johannesburg's choice."
        ],
        "exclude_products": ["patties", "tomahawk", "biltong"]
      }
    }
  }'
```

**Manual steps if API not available:**
1. Go to [Google Ads → account 2234319068](https://ads.google.com)
2. Campaigns → filter "PMAX" → find Gauteng campaign
3. Change status: Paused → Enabled
4. Budget → set R500/day
5. Asset groups → remove any Tomahawk/Biltong imagery

### 7.4 WhatsApp Broadcast Templates

Three segments, three templates. Send via Meta Cloud API (studex-meta-whatsapp skill).

**Segment A — High-Value Customers (R1000+ lifetime)**
```
Template name: studex_vip_midweek_drop
Language: en_ZA

Body:
"Hey {{1}} 👋 — Your favourite cuts just restocked.

Ankole Steak, Wagyu Burgers, Pork Ribs, Lamb Chops — all fresh, all available RIGHT NOW.

You know the drill: order before 2PM, arrives tomorrow.

Reply MENU to see today's full list, or ORDER to go straight to checkout."

Variables: [customer_first_name]
Button: Quick Reply — "ORDER NOW"
URL: https://studexmeat.co.za/collections/all
```

**Segment B — Regular Customers (1–5 orders)**
```
Template name: studex_regular_midweek
Language: en_ZA

Body:
"Mid-week sorted 🥩

StudEx Meat has fresh stock in — Ankole, Wagyu, Lamb & Ribs.

Order today and get it tomorrow. Tap below to see what's available."

Button: Call to Action — "Shop Now" → https://studexmeat.co.za
```

**Segment C — Lapsed Customers (last order >30 days)**
```
Template name: studex_winback_june
Language: en_ZA

Body:
"We miss you, {{1}} 👋

It's been a while — and we've added some serious cuts since you last ordered.

Ankole Steak. Wagyu Burgers. Pork Ribs.

Come back this week. Same StudEx quality, same next-day delivery.

Use code COMEBACK for R50 off your next order."

Variables: [customer_first_name]
Button: Quick Reply — "USE CODE"
Footer: "Reply STOP to unsubscribe"
```

**Send Command:**
```bash
# Via studex-meta-whatsapp skill
curl -X POST http://localhost:3001/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "type": "whatsapp",
    "priority": 1,
    "payload": {
      "action": "broadcast",
      "segments": ["vip", "regular", "lapsed"],
      "templates": {
        "vip":     "studex_vip_midweek_drop",
        "regular": "studex_regular_midweek",
        "lapsed":  "studex_winback_june"
      },
      "exclude_products_from_copy": ["patties", "tomahawk", "biltong"],
      "send_time": "now"
    }
  }'
```

### 7.5 Today's Execution Checklist

Run these in order. All commands from `robusca-core` API at `localhost:3001`.

```bash
#!/bin/bash
# ~/robusca/scripts/june17-sales-push.sh

echo "=== StudEx Sales Push — June 17, 2026 ==="

BASE="http://localhost:3001"
TOKEN="$AGENT_SHARED_SECRET"

# 1. Sync brain
bash ~/robusca/scripts/sync-brain.sh

# 2. Check inventory — confirm which SKUs are positive
echo "[1/5] Checking inventory..."
curl -s -X POST $BASE/tasks \
  -H "X-Agent-Token: $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"type":"shopify","priority":1,"payload":{"action":"inventory_check","flag_negative":true}}'

sleep 30  # Wait for result

# 3. Email blast
echo "[2/5] Sending email blast..."
curl -s -X POST $BASE/tasks \
  -H "X-Agent-Token: $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"type":"email","priority":1,"payload":{"action":"blast","template":"mid-week-drop"}}'

# 4. Facebook post
echo "[3/5] Posting to Facebook..."
curl -s -X POST $BASE/tasks \
  -H "X-Agent-Token: $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"type":"social","priority":1,"payload":{"platform":"facebook","action":"post","template":"mid-week-drop"}}'

# 5. Google Ads reactivation
echo "[4/5] Reactivating Gauteng PMAX..."
curl -s -X POST $BASE/tasks \
  -H "X-Agent-Token: $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"type":"ads","priority":1,"payload":{"action":"reactivate_campaign","budget_zar":500}}'

# 6. WhatsApp broadcasts
echo "[5/5] Queuing WhatsApp broadcasts..."
curl -s -X POST $BASE/tasks \
  -H "X-Agent-Token: $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"type":"whatsapp","priority":1,"payload":{"action":"broadcast","segments":["vip","regular","lapsed"]}}'

echo "=== All tasks queued. Monitor at http://localhost:3001/tasks/queue ==="
```

---

## Appendix A — Quick VM Commands

```bash
# SSH into VM
ssh -i ~/.ssh/studex_vm_key ubuntu@[VM_IP]

# Stack status
cd ~/robusca && docker compose ps

# View all logs (live)
docker compose logs -f

# Restart a single service
docker compose restart robusca-core

# Rebuild from source
docker compose up --build -d war-room-ui

# Check task queue
curl http://localhost:3001/tasks/queue | jq .

# Check registered agents
curl http://localhost:3001/agents | jq .

# Manual brain sync
bash ~/robusca/scripts/sync-brain.sh

# Open War Room in browser (from VNC)
DISPLAY=:1 xdg-open http://localhost &
```

## Appendix B — First-Time VM Setup

```bash
# Run once after first SSH into fresh VM

# 1. Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker ubuntu
newgrp docker

# 2. Install Ollama
curl -fsSL https://ollama.com/install.sh | sh
ollama pull qwen2.5:3b

# 3. Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash -
sudo apt install -y nodejs

# 4. Clone robusca-brain
git clone git@github.com:TumeloRamaphosa/robusca-brain.git ~/robusca-brain

# 5. Set up robusca directory
mkdir -p ~/robusca/{skills,data,logs,nginx,scripts,services,desktop,templates}
ln -s ~/robusca-brain/memory ~/robusca/memory

# 6. Copy .env template and fill in secrets
cp ~/robusca-brain/studex/.env.example ~/robusca/.env
nano ~/robusca/.env  # Fill in all credentials

# 7. Install systemd service
sudo cp ~/robusca-brain/os/auto-meat-vm/robusca-stack.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable robusca-stack
sudo systemctl start robusca-stack

# 8. Build desktop app
cd ~/robusca/desktop && npm install && npm run build

# 9. Verify everything
docker compose ps          # All services Up
curl http://localhost/     # War Room UI responds
curl http://localhost:3001/health  # Core API healthy
ollama run qwen2.5:3b "ping"       # LLM fallback works
```

---

*Document maintained by Robusca Romanov · robusca-brain/os/auto-meat-vm/ARCHITECTURE.md*  
*Last updated: June 17, 2026*
