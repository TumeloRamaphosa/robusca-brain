import { Link } from "wouter";
import VoiceCompanion from "../components/VoiceCompanion";

const TIERS = [
  {
    name: "Starter",
    price: "R3,500",
    period: "/mo",
    agents: "2–3 agents",
    highlight: false,
    features: ["Soul Northstar", "WhatsApp agent", "Private NestVM", "Morning brief"],
  },
  {
    name: "Business",
    price: "R10,000",
    period: "/mo",
    agents: "8 agents",
    highlight: true,
    features: ["Full Super Agent suite", "Shopify + email", "War Room dashboard", "Priority support"],
  },
  {
    name: "Enterprise",
    price: "R20,000",
    period: "/mo+",
    agents: "8 + custom",
    highlight: false,
    features: ["Global Markets access", "ART Engineering DC", "Tiiny edge device", "White-label"],
  },
];

export default function Landing() {
  return (
    <>
      <section className="landing-hero">
        <p className="tagline">StudEx · Powered by NestVM · Orchestrated by Polsia</p>
        <h1>
          Your Private AI Brain
          <br />
          <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Runs While You Sleep</em>
        </h1>
        <p>
          Not shared software. Your own dedicated virtual machine — with agents that speak to you on
          WhatsApp, voice, and dashboard as you onboard.
        </p>
        <div className="cta-row">
          <Link href="/onboarding">
            <button type="button" className="btn-primary">
              Start in 15 Minutes
            </button>
          </Link>
          <Link href="/dashboard">
            <button type="button" className="btn-secondary">
              View Demo Dashboard
            </button>
          </Link>
        </div>
        <p style={{ marginTop: "2rem", fontSize: "10px", letterSpacing: "2px", color: "var(--gold-dim)" }}>
          Private intelligence · Shared opportunity · Studex Global Markets
        </p>
      </section>

      <section className="tier-grid">
        {TIERS.map((t) => (
          <div key={t.name} className={`tier-card ${t.highlight ? "highlight" : ""}`}>
            <p style={{ fontSize: "10px", letterSpacing: "3px", color: "var(--gold-dim)" }}>{t.agents}</p>
            <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.75rem", margin: "0.5rem 0" }}>{t.name}</h3>
            <p style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--gold)" }}>
              {t.price}
              <span style={{ fontSize: "12px", color: "var(--gold-dim)" }}>{t.period}</span>
            </p>
            <ul style={{ marginTop: "1rem", listStyle: "none", fontSize: "13px", color: "var(--gold-dim)" }}>
              {t.features.map((f) => (
                <li key={f} style={{ padding: "4px 0" }}>
                  ✦ {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <VoiceCompanion
        agentName="Soul"
        message="Welcome to StudEx. I'm Soul, your Northstar agent. Tap Start when you're ready — I'll guide you through setup by voice."
        autoSpeak={false}
      />
    </>
  );
}
