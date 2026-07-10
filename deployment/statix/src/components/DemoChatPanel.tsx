import { useEffect, useState } from "react";

interface LlmStatus {
  ok: boolean;
  demoModel?: string;
  modelCount?: number;
  models?: string[];
  ready?: boolean;
  error?: string;
  hint?: string;
}

export default function DemoChatPanel() {
  const [status, setStatus] = useState<LlmStatus | null>(null);
  const [message, setMessage] = useState("What can Statix do for Studex Global Markets?");
  const [reply, setReply] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/llm/status")
      .then((r) => r.json())
      .then(setStatus)
      .catch(() => setStatus({ ok: false, error: "Cannot reach Statix API" }));
  }, []);

  async function ask() {
    setLoading(true);
    setReply(null);
    try {
      const r = await fetch("/api/llm/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const d = await r.json();
      setReply(d.ok ? d.reply : `Error: ${d.error}`);
    } catch {
      setReply("Request failed — is Ollama running?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ marginTop: "1.5rem" }}>
      <p style={{ fontSize: "9px", letterSpacing: "3px", color: "var(--gold-dim)", marginBottom: "8px" }}>
        LOCAL BRAIN (OLLAMA DEMO)
      </p>
      <div
        style={{
          background: "var(--surface)",
          border: `1px solid ${status?.ok ? "rgba(76,255,168,0.35)" : "var(--border)"}`,
          padding: "1rem",
        }}
      >
        {!status ? (
          <p style={{ fontSize: "13px", color: "var(--gold-dim)" }}>Checking Ollama…</p>
        ) : status.ok ? (
          <p style={{ fontSize: "12px", color: "var(--accent)", marginBottom: "10px" }}>
            Ollama connected · {status.modelCount} model(s) · demo: {status.demoModel}
            {!status.ready && " (pull model to enable chat)"}
          </p>
        ) : (
          <p style={{ fontSize: "12px", color: "var(--gold-dim)", marginBottom: "10px", lineHeight: 1.5 }}>
            Ollama offline — dashboard UI still works. {status.hint}
          </p>
        )}

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={2}
          style={{
            width: "100%",
            padding: "10px",
            background: "rgba(0,0,0,0.4)",
            border: "1px solid var(--border)",
            color: "var(--text)",
            fontSize: "13px",
            marginBottom: "8px",
          }}
        />
        <button
          type="button"
          onClick={ask}
          disabled={loading || !status?.ok}
          style={{
            padding: "10px 20px",
            fontSize: "10px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            background: "var(--gold)",
            color: "var(--bg)",
            border: "none",
            opacity: loading || !status?.ok ? 0.5 : 1,
            cursor: status?.ok ? "pointer" : "not-allowed",
          }}
        >
          {loading ? "Thinking…" : "Ask Soul (Ollama)"}
        </button>
        {reply && (
          <p style={{ marginTop: "12px", fontSize: "13px", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{reply}</p>
        )}
      </div>
    </div>
  );
}
