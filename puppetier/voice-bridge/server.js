/**
 * Puppetier Voice Bridge — WebSocket server for StudEx Voice (RileyJarvis fork).
 * studex-voice connects here; routes voice commands to MCP gateway agents.
 */

import http from "node:http";
import { WebSocketServer } from "ws";

const PORT = Number(process.env.PORT || 8765);
const MCP_URL = process.env.MCP_GATEWAY_URL || "http://127.0.0.1:8787";

async function mcpCall(toolName, args) {
  const res = await fetch(`${MCP_URL}/tools/call`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: toolName, arguments: args }),
    signal: AbortSignal.timeout(60000),
  });
  if (!res.ok) throw new Error(`MCP ${res.status}`);
  const data = await res.json();
  const text = data.content?.[0]?.text || JSON.stringify(data);
  return typeof text === "string" ? JSON.parse(text) : text;
}

async function routeMessage(message) {
  const lower = message.toLowerCase();
  if (lower.includes("revenue") || lower.includes("finance") || lower.includes("treasury") || lower.includes("cash")) {
    return mcpCall("studex_treasury_revenue", { query: message });
  }
  if (lower.includes("content") || lower.includes("market") || lower.includes("post") || lower.includes("naledi")) {
    return mcpCall("studex_openclaw_content", { brief: message });
  }
  if (lower.includes("deploy") || lower.includes("code") || lower.includes("build") || lower.includes("goose")) {
    return mcpCall("studex_goose_build", { task: message });
  }
  if (lower.includes("status") || lower.includes("online") || lower.includes("agents")) {
    return mcpCall("studex_agent_status", {});
  }
  if (lower.includes("approv")) {
    return mcpCall("studex_approval_queue", {});
  }
  return mcpCall("studex_hermes_query", { message });
}

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true, service: "puppetier-voice-bridge" }));
    return;
  }
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Puppetier Voice Bridge — connect via WebSocket");
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  ws.send(JSON.stringify({ type: "connected", service: "hermes-voice-bridge", voices: ["cedar", "alloy", "echo", "marin", "ash"] }));

  ws.on("message", async (raw) => {
    let msg;
    try {
      msg = JSON.parse(String(raw));
    } catch {
      ws.send(JSON.stringify({ type: "error", error: "invalid json" }));
      return;
    }

    const { id, tool, args, message } = msg;

    try {
      let result;
      if (tool === "hermes_query" || tool === "hermes_delegate") {
        result = await routeMessage(args?.message || message || "");
      } else if (tool === "hermes_status") {
        result = await mcpCall("studex_agent_status", {});
      } else if (tool === "hermes_approve") {
        result = await mcpCall("studex_approval_queue", {});
      } else if (message) {
        result = await routeMessage(message);
      } else {
        result = { error: "unknown tool", tool };
      }

      ws.send(JSON.stringify({ id, ok: true, result, speak: summarizeForVoice(result) }));
    } catch (e) {
      ws.send(JSON.stringify({ id, ok: false, error: String(e.message || e) }));
    }
  });
});

function summarizeForVoice(result) {
  if (result.response) return String(result.response).slice(0, 500);
  if (result.agents) {
    const online = result.agents.filter((a) => a.online).map((a) => a.name);
    return online.length ? `${online.length} agents online: ${online.join(", ")}` : "Agent mesh offline. Simulated mode active.";
  }
  return JSON.stringify(result).slice(0, 300);
}

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Puppetier Voice Bridge ws://0.0.0.0:${PORT}`);
});
