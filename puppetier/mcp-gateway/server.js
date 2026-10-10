/**
 * Puppetier MCP Gateway — exposes StudEx agents as MCP-compatible HTTP tools.
 * Open WebUI: Admin → External Tools → http://localhost:8787/mcp
 */

import http from "node:http";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 8787);

const AGENTS = {
  hermes: { name: "Hermes CEO", url: process.env.HERMES_URL || "http://127.0.0.1:3000", port: 3000 },
  openclaw: { name: "OpenClaw CMO", url: process.env.OPENCLAW_URL || "http://127.0.0.1:3002", port: 3002 },
  goose: { name: "Goose Dev", url: process.env.GOOSE_URL || "http://127.0.0.1:3003", port: 3003 },
  treasury: { name: "Treasury CFO", url: process.env.TREASURY_URL || "http://127.0.0.1:3004", port: 3004 },
};

const contexts = {};
for (const key of Object.keys(AGENTS)) {
  try {
    const ctxFile = key === "treasury" ? "cashclaw" : key === "openclaw" ? "openclaw" : key;
    const path = join(__dirname, "../../studex-empire/agents", `${ctxFile}-context.md`);
    contexts[key] = readFileSync(path, "utf8").slice(0, 2000);
  } catch {
    contexts[key] = `StudEx ${AGENTS[key].name} agent`;
  }
}

const TOOLS = [
  {
    name: "studex_agent_status",
    description: "Get online status of all StudEx agents (Hermes, OpenClaw, Goose, Treasury)",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "studex_hermes_query",
    description: "Send a task or question to Hermes CEO — coordinates the full agent mesh",
    inputSchema: {
      type: "object",
      properties: { message: { type: "string", description: "Task or question for Hermes" } },
      required: ["message"],
      additionalProperties: false,
    },
  },
  {
    name: "studex_openclaw_content",
    description: "Request marketing content, campaigns, or brand work from OpenClaw CMO",
    inputSchema: {
      type: "object",
      properties: { brief: { type: "string" } },
      required: ["brief"],
      additionalProperties: false,
    },
  },
  {
    name: "studex_goose_build",
    description: "Request code, deployment, or technical work from Goose Dev",
    inputSchema: {
      type: "object",
      properties: { task: { type: "string" } },
      required: ["task"],
      additionalProperties: false,
    },
  },
  {
    name: "studex_treasury_revenue",
    description: "Get revenue status, targets, and financial metrics from Treasury",
    inputSchema: {
      type: "object",
      properties: { query: { type: "string" } },
      additionalProperties: false,
    },
  },
  {
    name: "studex_approval_queue",
    description: "List pending content approvals (StudEx rule: nothing publishes without approval)",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
];

async function pingAgent(agentKey) {
  const agent = AGENTS[agentKey];
  try {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(`${agent.url}/health`, { signal: controller.signal }).catch(() =>
      fetch(`${agent.url}/acp`, { method: "HEAD", signal: controller.signal })
    );
    clearTimeout(t);
    return { id: agentKey, name: agent.name, online: res?.ok ?? false, port: agent.port };
  } catch {
    return { id: agentKey, name: agent.name, online: false, port: agent.port, mode: "simulated" };
  }
}

async function simulateAgent(agentKey, message) {
  const ctx = contexts[agentKey] || "";
  return {
    agent: AGENTS[agentKey].name,
    mode: "simulated",
    response: `[${AGENTS[agentKey].name}] Received: "${message}". Agent mesh not live on port ${AGENTS[agentKey].port} — start studex-empire agents or use voice-bridge. Context loaded (${ctx.length} chars).`,
    approval_required: agentKey === "openclaw",
  };
}

async function callAgent(agentKey, message) {
  const agent = AGENTS[agentKey];
  try {
    const res = await fetch(`${agent.url}/acp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ method: "chat", params: { message } }),
      signal: AbortSignal.timeout(30000),
    });
    if (res.ok) {
      const data = await res.json();
      return { agent: agent.name, mode: "live", response: data.result || data.content || JSON.stringify(data) };
    }
  } catch {
    /* fall through */
  }
  return simulateAgent(agentKey, message);
}

async function handleTool(name, args) {
  switch (name) {
    case "studex_agent_status":
      return { agents: await Promise.all(Object.keys(AGENTS).map(pingAgent)) };
    case "studex_hermes_query":
      return callAgent("hermes", args.message);
    case "studex_openclaw_content":
      return callAgent("openclaw", args.brief);
    case "studex_goose_build":
      return callAgent("goose", args.task);
    case "studex_treasury_revenue":
      return callAgent("treasury", args.query || "revenue status");
    case "studex_approval_queue":
      return {
        pending: [],
        message: "Approval Centre — connect War Room for live queue. Rule #1: no publish without Tumelo approval.",
      };
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

function json(res, status, body) {
  res.writeHead(status, { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" });
  res.end(JSON.stringify(body));
}

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    });
    return res.end();
  }

  const url = new URL(req.url || "/", `http://localhost:${PORT}`);

  if (url.pathname === "/health") {
    return json(res, 200, { ok: true, service: "puppetier-mcp-gateway" });
  }

  if (url.pathname === "/mcp" || url.pathname === "/") {
    if (req.method === "GET") {
      return json(res, 200, {
        name: "puppetier-studex",
        version: "1.0.0",
        tools: TOOLS,
        agents: Object.values(AGENTS).map((a) => a.name),
      });
    }
  }

  if (url.pathname === "/tools/call" && req.method === "POST") {
    let body = "";
    for await (const chunk of req) body += chunk;
    try {
      const { name, arguments: toolArgs } = JSON.parse(body);
      const result = await handleTool(name, toolArgs || {});
      return json(res, 200, { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] });
    } catch (e) {
      return json(res, 400, { error: String(e.message || e) });
    }
  }

  if (url.pathname.startsWith("/agent/") && req.method === "POST") {
    const agentKey = url.pathname.split("/")[2];
    let body = "";
    for await (const chunk of req) body += chunk;
    try {
      const { message } = JSON.parse(body);
      const result = await callAgent(agentKey, message);
      return json(res, 200, result);
    } catch (e) {
      return json(res, 400, { error: String(e.message || e) });
    }
  }

  json(res, 404, { error: "not found" });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Puppetier MCP Gateway on http://0.0.0.0:${PORT}`);
  console.log(`Tools: ${TOOLS.map((t) => t.name).join(", ")}`);
});
