import { useState } from "react";
import { useLocation } from "wouter";
import VoiceCompanion from "../components/VoiceCompanion";

const STEPS = [
  {
    id: "welcome",
    title: "Welcome",
    voice: "Welcome to StudEx. I'm Soul, your Northstar agent. I'll guide you through setup — by voice, WhatsApp, or typing. What's your company name?",
    field: "companyName",
    label: "Company name",
    type: "text",
  },
  {
    id: "goals",
    title: "Your goals",
    voice: "In one sentence — what does success look like for your business in the next 90 days?",
    field: "goals",
    label: "90-day success goal",
    type: "textarea",
  },
  {
    id: "whatsapp",
    title: "WhatsApp",
    voice: "What's the best WhatsApp number for your morning brief and agent alerts? Include country code.",
    field: "whatsapp",
    label: "WhatsApp number (E.164)",
    type: "tel",
    placeholder: "+27821234567",
  },
  {
    id: "tier",
    title: "Choose tier",
    voice: "Starter is R3,500 per month — perfect for solopreneurs. Business at R10,000 runs all eight agents. Which fits you?",
    field: "tier",
    label: "Plan",
    type: "select",
    options: ["starter", "business", "enterprise"],
  },
  {
    id: "provision",
    title: "Launch",
    voice: "Perfect. I'm provisioning your private NestVM now. You'll receive a WhatsApp confirmation within minutes. Your dashboard will be ready at your company dot agent dot studex-group dot com.",
    field: null,
  },
];

export default function Onboarding() {
  const [, navigate] = useLocation();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Record<string, string>>({});
  const [provisioning, setProvisioning] = useState(false);
  const [done, setDone] = useState(false);
  const [tenantSlug, setTenantSlug] = useState("");

  const current = STEPS[step];
  const voiceMsg = done
    ? `Your NestVM is live at ${tenantSlug}.agent.studex-group.com. Open your dashboard — I'll meet you there.`
    : current.voice;

  function slugify(name: string) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 32) || "demo";
  }

  async function handleNext() {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
      return;
    }
    setProvisioning(true);
    const slug = slugify(data.companyName ?? "demo");
    setTenantSlug(slug);
    try {
      await fetch("/api/nestvm/provision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, tenantSlug: slug }),
      });
    } catch {
      /* demo mode continues */
    }
    setProvisioning(false);
    setDone(true);
    setTimeout(() => navigate(`/dashboard/${slug}`), 4000);
  }

  function handleTranscript(text: string) {
    if (!current.field) return;
    setData((d) => ({ ...d, [current.field!]: text }));
  }

  return (
    <div className="onboarding-layout">
      <div className="onboarding-steps">
        <p style={{ fontSize: "9px", letterSpacing: "4px", color: "var(--gold-dim)", marginBottom: "1rem" }}>
          STUDEX ONBOARDING · STEP {step + 1} OF {STEPS.length}
        </p>
        <div className="step-indicator">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`step-dot ${i < step ? "done" : ""} ${i === step ? "current" : ""}`}
            />
          ))}
        </div>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: "2rem", fontWeight: 300, marginBottom: "1.5rem" }}>
          {current.title}
        </h2>

        {current.field && (
          <div className="form-field">
            <label htmlFor={current.field}>{current.label}</label>
            {current.type === "textarea" ? (
              <textarea
                id={current.field}
                rows={3}
                value={data[current.field] ?? ""}
                onChange={(e) => setData((d) => ({ ...d, [current.field!]: e.target.value }))}
              />
            ) : current.type === "select" ? (
              <select
                id={current.field}
                value={data[current.field] ?? "starter"}
                onChange={(e) => setData((d) => ({ ...d, [current.field!]: e.target.value }))}
              >
                {(current.options ?? []).map((o) => (
                  <option key={o} value={o}>
                    {o.charAt(0).toUpperCase() + o.slice(1)}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={current.field}
                type={current.type}
                placeholder={current.placeholder}
                value={data[current.field] ?? ""}
                onChange={(e) => setData((d) => ({ ...d, [current.field!]: e.target.value }))}
              />
            )}
          </div>
        )}

        {provisioning && (
          <p style={{ color: "var(--accent)", marginBottom: "1rem" }}>Provisioning your NestVM…</p>
        )}
        {done && (
          <p style={{ color: "var(--gold)", marginBottom: "1rem" }}>
            ✦ Live at <strong>{tenantSlug}.agent.studex-group.com</strong> — redirecting to dashboard…
          </p>
        )}

        <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
          {step > 0 && !done && (
            <button type="button" className="btn-secondary" onClick={() => setStep(step - 1)}>
              Back
            </button>
          )}
          {!done && (
            <button
              type="button"
              className="btn-primary"
              onClick={handleNext}
              disabled={provisioning || (current.field && !data[current.field]?.trim() && step < STEPS.length - 1)}
            >
              {step === STEPS.length - 1 ? (provisioning ? "Provisioning…" : "Launch NestVM") : "Continue"}
            </button>
          )}
        </div>

        <p style={{ marginTop: "2rem", fontSize: "12px", color: "var(--gold-dim)" }}>
          Prefer WhatsApp? The same flow runs there — Soul speaks each step. Use the Speak button →
        </p>
      </div>

      <aside className="onboarding-panel">
        <div className="onboarding-face">✦</div>
        <p style={{ fontFamily: "var(--serif)", fontSize: "1.5rem", marginBottom: "0.5rem" }}>Soul</p>
        <p style={{ fontSize: "11px", letterSpacing: "2px", color: "var(--gold-dim)", textTransform: "uppercase" }}>
          Northstar Agent
        </p>
        <p style={{ marginTop: "1.5rem", fontSize: "13px", color: "var(--gold-dim)", textAlign: "center", maxWidth: 280 }}>
          I speak at every step. Mac, Windows, phone, or Tiiny edge — same voice, same brain.
        </p>
      </aside>

      <VoiceCompanion agentName="Soul" message={voiceMsg} onTranscript={handleTranscript} />
    </div>
  );
}
