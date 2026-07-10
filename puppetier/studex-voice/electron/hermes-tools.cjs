const { HermesBridge } = require("./hermes-bridge.cjs");

const hermesBridge = new HermesBridge(process.env.HERMES_WS_URL || "ws://127.0.0.1:8765");
hermesBridge.connect();

const hermesToolSpecs = [
  {
    type: "function",
    name: "hermes_query",
    description: "Send a task to Hermes CEO and the StudEx agent mesh. Use for strategy, coordination, morning briefs, and general empire operations.",
    parameters: {
      type: "object",
      properties: { message: { type: "string" } },
      required: ["message"],
      additionalProperties: false,
    },
  },
  {
    type: "function",
    name: "hermes_delegate",
    description: "Delegate to a specific StudEx agent: marketing (OpenClaw), development (Goose), or finance (Treasury).",
    parameters: {
      type: "object",
      properties: {
        agent: { type: "string", enum: ["openclaw", "goose", "treasury", "hermes"] },
        message: { type: "string" },
      },
      required: ["agent", "message"],
      additionalProperties: false,
    },
  },
  {
    type: "function",
    name: "hermes_status",
    description: "Check which StudEx agents are online.",
    parameters: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    type: "function",
    name: "hermes_approve",
    description: "Check pending content approvals. Nothing publishes without Tumelo approval.",
    parameters: { type: "object", properties: {}, additionalProperties: false },
  },
];

const HERMES_VOICE_INSTRUCTIONS = `# Role
You are Hermes Voice — the spoken interface to StudEx Group's agent mesh.
You coordinate Hermes CEO, OpenClaw (marketing), Goose (development), and Treasury (finance).

# Voice
Speak with authority. Black & Gold energy. Concise, strategic, no fluff.
Default voice: cedar. User may refer to you as Hermes or Riley Voice.

# Tools — always prefer Hermes bridge
- hermes_query — general tasks and strategy
- hermes_delegate — route to openclaw, goose, or treasury
- hermes_status — agent online status
- hermes_approve — approval queue
- artifact_show — show results in the panel
- show_menu — show what you can do

# Rules
- NEVER claim content was published — approvals required
- Delegate marketing to openclaw, code to goose, revenue to treasury
- Use artifacts for reports, menus, and progress`;

async function executeHermesTool(name, args) {
  if (name === "hermes_query") {
    const msg = await hermesBridge.call("hermes_query", { message: args.message }, args.message);
    return {
      ok: true,
      speak: msg.speak || msg.result?.response || "Done.",
      artifact: {
        title: "Hermes",
        kind: "markdown",
        content: JSON.stringify(msg.result || msg, null, 2),
      },
    };
  }
  if (name === "hermes_delegate") {
    const toolMap = { openclaw: "marketing", goose: "development", treasury: "finance", hermes: "strategy" };
    const msg = await hermesBridge.call("hermes_delegate", args, `[${args.agent}] ${args.message}`);
    return {
      ok: true,
      speak: msg.speak || `Delegated to ${toolMap[args.agent] || args.agent}.`,
      artifact: { title: `Delegate → ${args.agent}`, kind: "markdown", content: JSON.stringify(msg.result || msg, null, 2) },
    };
  }
  if (name === "hermes_status") {
    const msg = await hermesBridge.call("hermes_status", {});
    return {
      ok: true,
      speak: msg.speak || "Status updated.",
      artifact: { title: "Agent Status", kind: "markdown", content: JSON.stringify(msg.result || msg, null, 2) },
    };
  }
  if (name === "hermes_approve") {
    const msg = await hermesBridge.call("hermes_approve", {});
    return {
      ok: true,
      speak: msg.speak || "Approval queue checked.",
      artifact: { title: "Approvals", kind: "markdown", content: JSON.stringify(msg.result || msg, null, 2) },
    };
  }
  throw new Error(`Unknown hermes tool: ${name}`);
}

module.exports = { hermesBridge, hermesToolSpecs, HERMES_VOICE_INSTRUCTIONS, executeHermesTool };
