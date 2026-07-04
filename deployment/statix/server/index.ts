import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = parseInt(process.env.PORT || "5180", 10);

app.use(cors());
app.use(express.json());

const tenants = new Map<
  string,
  {
    companyName: string;
    goals: string;
    whatsapp: string;
    tier: string;
    createdAt: string;
    status: "provisioning" | "live";
  }
>();

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "statix-nestvm", version: "0.1.0" });
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

  res.json({
    success: true,
    tenantSlug: slug,
    dashboardUrl: `https://${slug}.statix.com/dashboard`,
    nestvmUrl: `https://${slug}.nestvm.statix.com`,
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
  const dist = path.join(__dirname, "../dist/client");
  app.use(express.static(dist));
  app.use((_req, res) => {
    res.sendFile(path.join(dist, "index.html"));
  });
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Statix API on http://0.0.0.0:${PORT}`);
});
