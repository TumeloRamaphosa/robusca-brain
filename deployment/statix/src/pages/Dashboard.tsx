import { useEffect, useState } from "react";
import { Link, useParams } from "wouter";
import VoiceCompanion from "../components/VoiceCompanion";
import SeoOfficePanel from "../components/SeoOfficePanel";
import DemoChatPanel from "../components/DemoChatPanel";

const AGENTS = [
  { id: "soul", name: "Soul", role: "Northstar & strategy", status: "live" },
  { id: "obsidian", name: "Obsidian Brain", role: "Market intelligence", status: "live" },
  { id: "email", name: "Dedicated Email", role: "Outreach engine", status: "live" },
  { id: "leonardo", name: "Leonardo", role: "Strategy & intel", status: "idle" },
  { id: "michelangelo", name: "Michelangelo", role: "Creative content", status: "idle" },
  { id: "raphael", name: "Raphael", role: "Client relations", status: "idle" },
  { id: "donatello", name: "Donatello", role: "Data analysis", status: "idle" },
  { id: "titian", name: "Titian", role: "Marketing campaigns", status: "idle" },
];

const NAV = [
  { id: "home", label: "Home" },
  { id: "companies", label: "Companies" },
  { id: "agents", label: "Agents" },
  { id: "memory", label: "Memory" },
  { id: "channels", label: "Channels" },
  { id: "approvals", label: "Approvals" },
];

export default function Dashboard() {
  const params = useParams<{ tenant?: string }>();
  const tenant = params.tenant ?? "demo";
  const [tab, setTab] = useState("home");
  const [brief, setBrief] = useState<string | null>(null);
  const [activity, setActivity] = useState<{ time: string; agent: string; action: string }[]>([]);

  useEffect(() => {
    fetch(`/api/nestvm/${tenant}/status`)
      .then((r) => r.json())
      .then((d) => {
        setBrief(d.morningBrief);
        setActivity(d.recentActivity ?? []);
      })
      .catch(() => {
        setBrief("Good morning. Your NestVM is live. Soul mapped your goals overnight. Three outreach drafts await approval.");
        setActivity([
          { time: "06:00", agent: "Soul", action: "Morning brief generated" },
          { time: "06:15", agent: "Obsidian", action: "Competitor scan complete" },
          { time: "07:00", agent: "Email", action: "5 drafts queued for approval" },
        ]);
      });
  }, [tenant]);

  const voiceMessage =
    tab === "home"
      ? brief ?? "Loading your morning brief..."
      : tab === "companies"
        ? "SEO Office is wired in. Pick a company to see people, brands, and competitors from the brain vault."
        : tab === "agents"
        ? "All eight Super Agents are configured. Soul and Obsidian Brain are live. Tap an agent card for details."
        : tab === "channels"
          ? "WhatsApp is connected. Reply HELLO to test. Email and Shopify connect in Settings."
          : "Your Statix NestVM dashboard is ready. Ask me anything.";

  return (
    <div className="dash-layout">
      <aside className="dash-sidebar">
        <div style={{ padding: "0 1.5rem 1.5rem", borderBottom: "1px solid var(--border)" }}>
          <p style={{ fontSize: "9px", letterSpacing: "4px", color: "var(--gold-dim)" }}>STATIX</p>
          <p style={{ fontFamily: "var(--serif)", fontSize: "1.25rem" }}>NestVM</p>
          <p style={{ fontSize: "11px", color: "var(--gold-dim)", marginTop: 4 }}>{tenant}.statix.com</p>
        </div>
        {NAV.map((n) => (
          <button
            key={n.id}
            type="button"
            className={tab === n.id ? "active" : ""}
            onClick={() => setTab(n.id)}
          >
            {n.label}
          </button>
        ))}
        <Link href="/onboarding">
          <a style={{ display: "block", padding: "10px 1.5rem", fontSize: "10px", color: "var(--accent)" }}>
            + New tenant
          </a>
        </Link>
      </aside>

      <main className="dash-main">
        {tab === "home" && (
          <>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "2rem", fontWeight: 300, marginBottom: "0.5rem" }}>
              Good morning
            </h2>
            <p style={{ color: "var(--gold-dim)", marginBottom: "2rem", fontSize: "14px" }}>
              Polsia orchestrates · NestVM executes · Statix is your face
            </p>
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                padding: "1.5rem",
                marginBottom: "2rem",
              }}
            >
              <p style={{ fontSize: "9px", letterSpacing: "3px", color: "var(--gold-dim)", marginBottom: "8px" }}>
                MORNING BRIEF
              </p>
              <p style={{ lineHeight: 1.6 }}>{brief}</p>
            </div>
            <p style={{ fontSize: "9px", letterSpacing: "3px", color: "var(--gold-dim)", marginBottom: "12px" }}>
              RECENT ACTIVITY
            </p>
            {activity.map((a, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "1rem",
                  padding: "10px 0",
                  borderBottom: "1px solid var(--border)",
                  fontSize: "13px",
                }}
              >
                <span style={{ color: "var(--gold-dim)", fontFamily: "monospace" }}>{a.time}</span>
                <span style={{ color: "var(--gold)" }}>{a.agent}</span>
                <span>{a.action}</span>
              </div>
            ))}
            <DemoChatPanel />
          </>
        )}

        {tab === "companies" && <SeoOfficePanel />}

        {tab === "agents" && (
          <div className="agent-grid">
            {AGENTS.map((a) => (
              <div key={a.id} className="agent-card">
                <span className={`status ${a.status}`} />
                <strong>{a.name}</strong>
                <p style={{ fontSize: "12px", color: "var(--gold-dim)", marginTop: 4 }}>{a.role}</p>
                <p style={{ fontSize: "10px", marginTop: 8, textTransform: "uppercase", color: a.status === "live" ? "var(--accent)" : "var(--gold-dim)" }}>
                  {a.status}
                </p>
              </div>
            ))}
          </div>
        )}

        {tab === "channels" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { name: "WhatsApp", status: "Connected", detail: "+27 business line" },
              { name: "Email", status: "Pending", detail: "AgentMail setup" },
              { name: "Shopify", status: "Optional", detail: "Connect in onboarding" },
              { name: "Voice (Statix)", status: "Active", detail: "Browser + Tiiny edge" },
            ].map((c) => (
              <div key={c.name} style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: "1rem" }}>
                <strong>{c.name}</strong>
                <span style={{ float: "right", color: c.status === "Connected" || c.status === "Active" ? "var(--accent)" : "var(--gold-dim)" }}>
                  {c.status}
                </span>
                <p style={{ fontSize: "12px", color: "var(--gold-dim)", marginTop: 4 }}>{c.detail}</p>
              </div>
            ))}
          </div>
        )}

        {(tab === "memory" || tab === "approvals") && (
          <p style={{ color: "var(--gold-dim)" }}>
            {tab === "memory" ? "Wiki + Graphify knowledge graph syncs nightly." : "3 outreach drafts awaiting your approval."}
          </p>
        )}
      </main>

      <VoiceCompanion agentName="Soul" message={voiceMessage} />
    </div>
  );
}
