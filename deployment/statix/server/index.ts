import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { loadEnvFile } from "./loadEnv.js";
import { loadTenants, saveTenants, type TenantRecord } from "./tenants.js";

loadEnvFile();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = parseInt(process.env.PORT || "5180", 10);
const SEO_OFFICE_URL = process.env.SEO_OFFICE_URL || "http://localhost:3000";
const OLLAMA_HOST = process.env.OLLAMA_HOST || "http://127.0.0.1:11434";
const DEMO_MODEL = process.env.DEMO_MODEL || "qwen2.5:3b";

async function fetchSeoOffice(path: string) {
  const res = await fetch(`${SEO_OFFICE_URL}${path}`, {
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`SEO Office ${res.status}`);
  return res.json();
}

app.use(cors());
app.use(express.json());

const tenants = loadTenants();

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "studex-nestvm", version: "0.1.0" });
});

// Ollama — local brain for desktop demo (optional cloud model via :cloud tag)
app.get("/api/llm/status", async (_req, res) => {
  try {
    const tags = await fetch(`${OLLAMA_HOST}/api/tags`, { signal: AbortSignal.timeout(3000) });
    if (!tags.ok) throw new Error(`Ollama ${tags.status}`);
    const data = (await tags.json()) as { models?: Array<{ name: string; size: number }> };
    const models = data.models ?? [];
    res.json({
      ok: true,
      ollamaHost: OLLAMA_HOST,
      remote: !OLLAMA_HOST.includes("127.0.0.1") && !OLLAMA_HOST.includes("localhost"),
      modelCount: models.length,
      models: models.map((m) => m.name),
      demoModel: DEMO_MODEL,
      ready: models.some((m) => m.name.startsWith(DEMO_MODEL.split(":")[0])),
    });
  } catch (err) {
    res.json({
      ok: false,
      ollamaHost: OLLAMA_HOST,
      demoModel: DEMO_MODEL,
      error: err instanceof Error ? err.message : "Ollama offline",
      hint: "Install Ollama → ollama serve → ollama pull qwen2.5:3b (or use nemotron-3-super:cloud)",
    });
  }
});

app.post("/api/llm/chat", async (req, res) => {
  const { message, model } = req.body as { message?: string; model?: string };
  if (!message?.trim()) {
    return res.status(400).json({ ok: false, error: "message required" });
  }
  const useModel = model || DEMO_MODEL;
  try {
    const r = await fetch(`${OLLAMA_HOST}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: useModel,
        messages: [{ role: "user", content: message }],
        stream: false,
      }),
      signal: AbortSignal.timeout(120000),
    });
    if (!r.ok) {
      const errText = await r.text();
      return res.status(502).json({ ok: false, error: errText.slice(0, 200) });
    }
    const data = (await r.json()) as { message?: { content?: string } };
    res.json({ ok: true, model: useModel, reply: data.message?.content ?? "" });
  } catch (err) {
    res.status(502).json({
      ok: false,
      error: err instanceof Error ? err.message : "Ollama request failed",
    });
  }
});

app.post("/api/nestvm/provision", (req, res) => {
  const { companyName, goals, whatsapp, tier, tenantSlug } = req.body as Record<string, string>;
  const slug =
    tenantSlug ||
    (companyName ?? "demo")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 32);

  tenants.set(slug, {
    companyName: companyName ?? "Demo Company",
    goals: goals ?? "",
    whatsapp: whatsapp ?? "",
    tier: tier ?? "starter",
    createdAt: new Date().toISOString(),
    status: "live",
  });
  saveTenants(tenants);

  res.json({
    success: true,
    tenantSlug: slug,
    dashboardUrl: `https://${slug}.agent.studex-group.com/dashboard`,
    nestvmUrl: `https://${slug}.nestvm.studex-group.com`,
    message: `NestVM provisioned for ${companyName}. WhatsApp confirmation queued.`,
  });
});

app.get("/api/nestvm/:tenant/status", (req, res) => {
  const t = tenants.get(req.params.tenant);
  const name = t?.companyName ?? req.params.tenant;

  res.json({
    tenant: req.params.tenant,
    status: t?.status ?? "live",
    tier: t?.tier ?? "starter",
    morningBrief: `Good morning. Your NestVM for ${name} is live. ${
      t?.goals ? `Goal tracked: "${t.goals.slice(0, 80)}…"` : "Soul is learning your business."
    } Three items await approval.`,
    recentActivity: [
      { time: "06:00", agent: "Soul", action: "Morning brief generated" },
      { time: "06:12", agent: "Obsidian Brain", action: "Market scan complete" },
      { time: "06:30", agent: "Email", action: "Outreach drafts queued" },
      ...(t?.whatsapp
        ? [{ time: "06:31", agent: "WhatsApp", action: `Brief sent to ${t.whatsapp}` }]
        : []),
    ],
    channels: {
      whatsapp: t?.whatsapp ? "connected" : "pending",
      voice: "active",
      email: "pending",
    },
  });
});

app.get("/api/nestvm/tenants", (_req, res) => {
  res.json(Array.from(tenants.entries()).map(([slug, data]) => ({ slug, ...data })));
});

// SEO Office proxy — companies (clients) + people/entities from brain vault
app.get("/api/seo/clients", async (_req, res) => {
  try {
    const data = await fetchSeoOffice("/api/clients");
    res.json(data);
  } catch (err) {
    console.warn("[seo-office] clients offline:", err);
    res.json({ clients: [], offline: true, seoOfficeUrl: SEO_OFFICE_URL });
  }
});

app.get("/api/seo/brain/:slug", async (req, res) => {
  try {
    const data = (await fetchSeoOffice(`/api/brain?slug=${encodeURIComponent(req.params.slug)}`)) as {
      ok: boolean;
      client?: unknown;
      summary?: { total: number; pendingReview: number };
      grouped?: Record<string, Array<{ title: string; path: string; type: string; status: string; confidence: string | null; tags: string[]; updated: string }>>;
    };
    const entities = data.grouped?.entity ?? [];
    const stakeholders = data.grouped?.stakeholder ?? [];
    const all = [...stakeholders, ...entities];

    const people: typeof all = [];
    const brands: typeof all = [];
    const competitors: typeof all = [];

    for (const note of all) {
      const path = note.path.toLowerCase();
      const tags = (note.tags ?? []).map((t) => t.toLowerCase());
      if (note.type === "stakeholder" || tags.includes("people") || path.includes("/people/")) {
        people.push(note);
      } else if (tags.includes("competitors") || path.includes("competitor")) {
        competitors.push(note);
      } else if (tags.includes("brands") || path.includes("/brands/")) {
        brands.push(note);
      } else if (note.title.toLowerCase().includes("competitor")) {
        competitors.push(note);
      } else {
        people.push(note);
      }
    }

    res.json({
      ok: true,
      client: data.client,
      summary: data.summary,
      people,
      brands,
      competitors,
    });
  } catch (err) {
    console.warn("[seo-office] brain offline:", err);
    res.json({ ok: false, offline: true, people: [], brands: [], competitors: [] });
  }
});

// Polsia webhook — tenant events for orchestration
app.post("/api/polsia/webhook", (req, res) => {
  const { event, tenantSlug, payload } = req.body as {
    event?: string;
    tenantSlug?: string;
    payload?: unknown;
  };
  console.log("[polsia-webhook]", event, tenantSlug, payload);
  res.json({ received: true, event, tenantSlug });
});

if (process.env.NODE_ENV === "production") {
  const dist = path.join(__dirname, "client");
  app.use(express.static(dist));
  app.use((_req, res) => {
    res.sendFile(path.join(dist, "index.html"));
  });
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`StudEx API on http://0.0.0.0:${PORT}`);
});
