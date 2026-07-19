import { useState } from "react";
import { Cpu, Globe, CheckCircle, ArrowRight, Mic, Coffee, Beef, Sparkles } from "lucide-react";

/** Capacity / pricing tiers */
const TIERS = [
  {
    id: "meat-os",
    name: "Meat OS",
    subtitle: "Single Brand",
    price: "R8,500",
    period: "/mo",
    color: "#C9A84C",
    target: "Independent butcheries, small food brands",
    agents: 4,
    features: [
      "CHARLIE (Orchestrator)",
      "APEX (Content)",
      "NOVA (Analytics)",
      "NEXUS (Local agent)",
      "Shopify integration",
      "Daily automated reports",
      "Social media scheduling",
      "WhatsApp order alerts",
    ],
    voice: "Chat + limited voice minutes",
  },
  {
    id: "agency-os",
    name: "Agency OS",
    subtitle: "Multi-Brand",
    price: "R18,500",
    period: "/mo",
    color: "#4CFFA8",
    target: "Marketing agencies, multi-store operators",
    agents: 8,
    features: [
      "All Meat OS features",
      "KILO (OpenClaw agent)",
      "HERMES (Command center)",
      "CURSOR (Dev agent)",
      "CashClaw invoicing",
      "DenchClaw CRM",
      "5 brand dashboards",
      "AgentMail (10 inboxes)",
      "FeedHive publishing",
    ],
    highlight: true,
    voice: "Realtime talking agent (RileyJarvis-class)",
  },
  {
    id: "marketplace-os",
    name: "Marketplace OS",
    subtitle: "Full Ecosystem",
    price: "R24,000",
    period: "/mo",
    color: "#E6C766",
    target: "Enterprise, export platforms, B2B networks",
    agents: 11,
    features: [
      "All Agency OS features",
      "CASH (HYRVE marketplace)",
      "DENCH (CRM agent)",
      "GRAV (AntiGravity store)",
      "Global Markets platform",
      "Always-on voice companion",
      "Google Ads automation",
      "Facebook Ads automation",
      "Custom MCP integrations",
      "White-label War Room",
    ],
    voice: "Always-on voice + boardroom/factory world",
  },
];

/**
 * Three client products — selectable under every tier.
 * Client picks capacity (tier) × product pack (vertical).
 */
const PRODUCTS = [
  {
    id: "meat",
    name: "StudEx Meat",
    tagline: "Premium Wagyu & Ankole OS",
    icon: Beef,
    color: "#C9A84C",
    scenes: ["Boardroom", "Butchery / cold-chain floor"],
    includes: [
      "Shopify + WhatsApp order stack",
      "Content + ads for meat SKUs",
      "Inventory & fulfilment agents",
      "Talking brand agent for buyers",
    ],
    byTier: {
      "meat-os": "Single store / butchery ops",
      "agency-os": "Multi-store + agency brands",
      "marketplace-os": "Export + wholesale network",
    },
  },
  {
    id: "coffee",
    name: "StudEx Coffee",
    tagline: "Origin → roast → export OS",
    icon: Coffee,
    color: "#E6C766",
    scenes: ["Boardroom", "Roastery / agri floor"],
    includes: [
      "Export pipeline agents",
      "Origin story content engine",
      "Buyer CRM + trade follow-ups",
      "Talking agent for importers",
    ],
    byTier: {
      "meat-os": "Single coffee brand launch",
      "agency-os": "Multi-origin portfolio",
      "marketplace-os": "Continental trade desk",
    },
  },
  {
    id: "world",
    name: "StudEx World",
    tagline: "NestVM Agent Empire",
    icon: Globe,
    color: "#4CFFA8",
    scenes: ["Boardroom", "Dark Factory / digital city"],
    includes: [
      "Private NestVM + Super Agents",
      "Pixel boardroom (live agent state)",
      "Industry factory scene pack",
      "Talking Soul agent (voice-first)",
    ],
    byTier: {
      "meat-os": "Boardroom only + Soul chat",
      "agency-os": "Boardroom + 1 factory floor + voice",
      "marketplace-os": "Multi-floor world + white-label",
    },
  },
];

const METRICS = [
  { label: "Target MRR @ 20 clients", value: "R240K", period: "12-month projection", color: "#C9A84C" },
  { label: "Avg. hours saved/client", value: "40h", period: "per month", color: "#4CFFA8" },
  { label: "ROI vs. hiring staff", value: "6.2×", period: "cost efficiency", color: "#E6C766" },
  { label: "Pilot clients", value: "0 → 3", period: "Q3 2026 target", color: "#9a8a5a" },
];

const PIPELINE = [
  { stage: "Lead", count: 0, color: "#9a8a5a" },
  { stage: "Demo", count: 0, color: "#C9A84C" },
  { stage: "Trial", count: 0, color: "#4CFFA8" },
  { stage: "Signed", count: 0, color: "#E6C766" },
];

const ROADMAP = [
  {
    phase: "Phase 1",
    label: "Internal MVP",
    date: "Jun 2026",
    status: "live",
    items: ["War Room built", "Shopify live", "Cron reports running", "11 agents wired"],
  },
  {
    phase: "Phase 2",
    label: "First Pilot",
    date: "Q3 2026",
    status: "building",
    items: ["Mac Mini NEXUS", "Talking agent (RileyJarvis stack)", "Product packs on site", "1st paying client"],
  },
  {
    phase: "Phase 3",
    label: "Scale to 5",
    date: "Q4 2026",
    status: "planned",
    items: ["SaaS billing via CashClaw", "Self-serve onboarding", "Agency OS tier live", "R90K MRR target"],
  },
  {
    phase: "Phase 4",
    label: "20 Clients",
    date: "2027",
    status: "planned",
    items: ["Marketplace OS live", "StudEx World NestVM", "R240K MRR target", "Series A readiness"],
  },
];

export default function SuperAgents() {
  const [view, setView] = useState<"pricing" | "pipeline" | "roadmap">("pricing");
  /** product selected per tier id */
  const [selectedProduct, setSelectedProduct] = useState<Record<string, string>>({
    "meat-os": "meat",
    "agency-os": "world",
    "marketplace-os": "world",
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Cpu className="w-4 h-4" style={{ color: "#C9A84C" }} />
          <span
            style={{
              fontSize: "9px",
              letterSpacing: "5px",
              textTransform: "uppercase",
              color: "#9a8a5a",
              fontFamily: "'Helvetica Neue', sans-serif",
            }}
          >
            SUPER AGENTS — SAAS PLATFORM
          </span>
        </div>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "28px",
            fontWeight: 300,
            color: "#f5ecd0",
            lineHeight: 1.15,
          }}
        >
          AI Operating Systems for Premium Brands
        </h2>
        <p style={{ fontSize: "11px", color: "#9a8a5a", marginTop: "4px" }}>
          Pick a capacity tier, then choose a product pack — Meat, Coffee, or StudEx World. Talk to your agents with a
          RileyJarvis-class realtime voice companion.
        </p>
      </div>

      {/* KPI metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {METRICS.map((m) => (
          <div
            key={m.label}
            style={{
              background: "rgba(201,168,76,0.03)",
              border: "1px solid rgba(201,168,76,0.1)",
              padding: "14px 16px",
            }}
          >
            <p style={{ fontSize: "8px", letterSpacing: "2px", textTransform: "uppercase", color: "#9a8a5a", marginBottom: "6px" }}>
              {m.label}
            </p>
            <p style={{ fontSize: "22px", fontFamily: "Menlo, monospace", color: m.color, fontWeight: 700 }}>{m.value}</p>
            <p style={{ fontSize: "9px", color: "#9a8a5a", marginTop: "2px" }}>{m.period}</p>
          </div>
        ))}
      </div>

      {/* Talking agent strip — RileyJarvis pattern */}
      <div
        style={{
          background: "linear-gradient(90deg, rgba(201,168,76,0.08), rgba(76,255,168,0.04))",
          border: "1px solid rgba(201,168,76,0.2)",
          padding: "16px 18px",
          display: "flex",
          flexWrap: "wrap",
          gap: "14px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="flex items-start gap-3" style={{ maxWidth: "640px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: "1px solid rgba(201,168,76,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              background: "rgba(10,10,12,0.8)",
            }}
          >
            <Mic className="w-4 h-4" style={{ color: "#C9A84C" }} />
          </div>
          <div>
            <p style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "#C9A84C", marginBottom: "4px" }}>
              Talking agent
            </p>
            <p style={{ fontSize: "14px", color: "#f5ecd0", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
              Voice companion powered by the RileyJarvis stack — realtime speech-to-speech, animated presence, artifact
              panel. Clients talk to Soul inside NestVM; agents answer while the boardroom updates live.
            </p>
            <p style={{ fontSize: "10px", color: "#9a8a5a", marginTop: "6px" }}>
              Stack: OpenAI Realtime (or ElevenLabs + STT) · local companion UI · NestVM private runtime · no shared
              cloud brain.
            </p>
          </div>
        </div>
        <a
          href="https://github.com/rbrown101010/rileyjarvis"
          target="_blank"
          rel="noreferrer"
          style={{
            fontSize: "10px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "#0a0a0c",
            background: "#C9A84C",
            padding: "10px 14px",
            fontWeight: 700,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          View voice stack →
        </a>
      </div>

      {/* View tabs */}
      <div className="flex gap-0 border-b" style={{ borderColor: "rgba(201,168,76,0.12)" }}>
        {(
          [
            { id: "pricing", label: "Pricing Tiers" },
            { id: "pipeline", label: "Pipeline" },
            { id: "roadmap", label: "Roadmap" },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setView(tab.id)}
            style={{
              fontSize: "10px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: view === tab.id ? "#C9A84C" : "#9a8a5a",
              borderBottom: view === tab.id ? "2px solid #C9A84C" : "2px solid transparent",
              padding: "10px 16px",
              background: "transparent",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* PRICING */}
      {view === "pricing" && (
        <div className="space-y-4">
          <div
            style={{
              background: "rgba(201,168,76,0.03)",
              border: "1px solid rgba(201,168,76,0.1)",
              padding: "12px 14px",
            }}
          >
            <p style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "#C9A84C", marginBottom: "4px" }}>
              How clients buy
            </p>
            <p style={{ fontSize: "12px", color: "#9a8a5a" }}>
              <strong style={{ color: "#f5ecd0" }}>Step 1</strong> — choose capacity (Meat OS / Agency OS / Marketplace
              OS). <strong style={{ color: "#f5ecd0" }}>Step 2</strong> — choose product pack (Meat / Coffee / World).
              Same agents, different industry scene + workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TIERS.map((tier) => {
              const productId = selectedProduct[tier.id] ?? "meat";
              const product = PRODUCTS.find((p) => p.id === productId) ?? PRODUCTS[0];
              const ProductIcon = product.icon;

              return (
                <div
                  key={tier.name}
                  style={{
                    background: tier.highlight ? "rgba(76,255,168,0.05)" : "rgba(201,168,76,0.03)",
                    border: `1px solid ${tier.highlight ? "rgba(76,255,168,0.25)" : "rgba(201,168,76,0.12)"}`,
                    padding: "20px",
                    position: "relative",
                  }}
                >
                  {tier.highlight && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-1px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "#4CFFA8",
                        color: "#0a0a0c",
                        fontSize: "7px",
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        padding: "3px 12px",
                        fontWeight: 700,
                      }}
                    >
                      RECOMMENDED
                    </div>
                  )}
                  <div className="mb-4 mt-2">
                    <p
                      style={{
                        fontSize: "10px",
                        letterSpacing: "3px",
                        textTransform: "uppercase",
                        color: tier.color,
                        marginBottom: "2px",
                      }}
                    >
                      {tier.subtitle}
                    </p>
                    <p style={{ fontSize: "20px", fontWeight: 700, color: "#f5ecd0" }}>{tier.name}</p>
                    <p style={{ fontSize: "10px", color: "#9a8a5a", marginTop: "4px" }}>{tier.target}</p>
                  </div>

                  <div className="flex items-end gap-1 mb-3">
                    <span style={{ fontSize: "32px", fontFamily: "Menlo, monospace", color: tier.color, fontWeight: 700 }}>
                      {tier.price}
                    </span>
                    <span style={{ fontSize: "11px", color: "#9a8a5a", paddingBottom: "6px" }}>{tier.period}</span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <Cpu className="w-3 h-3" style={{ color: tier.color }} />
                    <span style={{ fontSize: "10px", color: "#9a8a5a" }}>{tier.agents} AI Agents included</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Mic className="w-3 h-3" style={{ color: tier.color }} />
                    <span style={{ fontSize: "10px", color: "#9a8a5a" }}>{tier.voice}</span>
                  </div>

                  {/* Product options */}
                  <div className="mb-4">
                    <p
                      style={{
                        fontSize: "8px",
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        color: "#9a8a5a",
                        marginBottom: "8px",
                      }}
                    >
                      Client product
                    </p>
                    <div className="grid grid-cols-3 gap-1.5">
                      {PRODUCTS.map((p) => {
                        const Icon = p.icon;
                        const active = productId === p.id;
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => setSelectedProduct((prev) => ({ ...prev, [tier.id]: p.id }))}
                            style={{
                              background: active ? `${p.color}18` : "rgba(10,10,12,0.5)",
                              border: `1px solid ${active ? p.color : "rgba(201,168,76,0.12)"}`,
                              padding: "8px 6px",
                              textAlign: "center",
                              cursor: "pointer",
                            }}
                            data-testid={`product-${tier.id}-${p.id}`}
                          >
                            <Icon className="w-3.5 h-3.5 mx-auto mb-1" style={{ color: active ? p.color : "#9a8a5a" }} />
                            <span
                              style={{
                                fontSize: "8px",
                                letterSpacing: "0.5px",
                                textTransform: "uppercase",
                                color: active ? p.color : "#9a8a5a",
                                display: "block",
                                lineHeight: 1.2,
                              }}
                            >
                              {p.id === "meat" ? "Meat" : p.id === "coffee" ? "Coffee" : "World"}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Selected product detail */}
                  <div
                    style={{
                      background: "rgba(10,10,12,0.55)",
                      border: `1px solid ${product.color}33`,
                      padding: "12px",
                      marginBottom: "14px",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <ProductIcon className="w-3.5 h-3.5" style={{ color: product.color }} />
                      <span style={{ fontSize: "12px", fontWeight: 600, color: "#f5ecd0" }}>{product.name}</span>
                    </div>
                    <p style={{ fontSize: "10px", color: product.color, marginBottom: "6px" }}>{product.tagline}</p>
                    <p style={{ fontSize: "10px", color: "#9a8a5a", marginBottom: "8px" }}>
                      At this tier: {product.byTier[tier.id as keyof typeof product.byTier]}
                    </p>
                    <p style={{ fontSize: "9px", letterSpacing: "1px", textTransform: "uppercase", color: "#9a8a5a", marginBottom: "4px" }}>
                      Scenes
                    </p>
                    <p style={{ fontSize: "10px", color: "#f5ecd0", marginBottom: "8px" }}>{product.scenes.join(" · ")}</p>
                    {product.includes.slice(0, 3).map((line) => (
                      <div key={line} className="flex items-center gap-2 mb-1">
                        <Sparkles className="w-2.5 h-2.5 shrink-0" style={{ color: product.color }} />
                        <span style={{ fontSize: "10px", color: "#9a8a5a" }}>{line}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    {tier.features.map((f) => (
                      <div key={f} className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 shrink-0" style={{ color: tier.color }} />
                        <span style={{ fontSize: "11px", color: "#9a8a5a" }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Product matrix summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            {PRODUCTS.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.id}
                  style={{
                    background: "rgba(201,168,76,0.02)",
                    border: "1px solid rgba(201,168,76,0.1)",
                    padding: "14px 16px",
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-4 h-4" style={{ color: p.color }} />
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "#f5ecd0" }}>{p.name}</span>
                  </div>
                  <p style={{ fontSize: "11px", color: "#9a8a5a", marginBottom: "10px" }}>{p.tagline}</p>
                  {TIERS.map((t) => (
                    <div key={t.id} className="flex justify-between gap-2 mb-1.5">
                      <span style={{ fontSize: "9px", color: "#9a8a5a", textTransform: "uppercase", letterSpacing: "1px" }}>
                        {t.name}
                      </span>
                      <span style={{ fontSize: "10px", color: "#f5ecd0", textAlign: "right" }}>
                        {p.byTier[t.id as keyof typeof p.byTier]}
                      </span>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* PIPELINE */}
      {view === "pipeline" && (
        <div>
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            {PIPELINE.map((stage, i) => (
              <div key={stage.stage} className="flex items-center gap-3">
                <div
                  style={{
                    background: "rgba(10,10,12,0.9)",
                    border: `1px solid ${stage.color}30`,
                    padding: "16px 20px",
                    minWidth: "120px",
                    textAlign: "center",
                  }}
                >
                  <p
                    style={{
                      fontSize: "8px",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      color: "#9a8a5a",
                      marginBottom: "6px",
                    }}
                  >
                    {stage.stage}
                  </p>
                  <p style={{ fontSize: "28px", fontFamily: "Menlo, monospace", color: stage.color, fontWeight: 700 }}>
                    {stage.count}
                  </p>
                </div>
                {i < PIPELINE.length - 1 && <ArrowRight className="w-4 h-4" style={{ color: "rgba(201,168,76,0.3)" }} />}
              </div>
            ))}
          </div>
          <div
            style={{
              background: "rgba(201,168,76,0.04)",
              border: "1px solid rgba(201,168,76,0.1)",
              padding: "16px",
              marginTop: "16px",
            }}
          >
            <p
              style={{
                color: "#9a8a5a",
                fontStyle: "italic",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "15px",
              }}
            >
              Pipeline is empty — StudEx is the first client. Phase 2 targets 3 pilot brands in Q3 2026 (one per product
              pack: Meat, Coffee, World).
            </p>
            <p style={{ fontSize: "10px", color: "#9a8a5a", marginTop: "8px" }}>
              Target sectors: premium butcheries, specialty coffee exporters, NestVM / Global Markets operators, AfricaBiz
              network members.
            </p>
          </div>
        </div>
      )}

      {/* ROADMAP */}
      {view === "roadmap" && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          {ROADMAP.map((phase) => (
            <div
              key={phase.phase}
              style={{
                background: phase.status === "live" ? "rgba(76,255,168,0.04)" : "rgba(201,168,76,0.02)",
                border: `1px solid ${
                  phase.status === "live"
                    ? "rgba(76,255,168,0.2)"
                    : phase.status === "building"
                      ? "rgba(201,168,76,0.2)"
                      : "rgba(201,168,76,0.08)"
                }`,
                padding: "16px",
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <span style={{ fontSize: "8px", letterSpacing: "2px", textTransform: "uppercase", color: "#9a8a5a" }}>
                  {phase.phase}
                </span>
                <span
                  style={{
                    fontSize: "8px",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    color:
                      phase.status === "live" ? "#4CFFA8" : phase.status === "building" ? "#C9A84C" : "#9a8a5a",
                    border: `1px solid ${
                      phase.status === "live"
                        ? "rgba(76,255,168,0.3)"
                        : phase.status === "building"
                          ? "rgba(201,168,76,0.3)"
                          : "rgba(154,138,90,0.2)"
                    }`,
                    padding: "2px 6px",
                  }}
                >
                  {phase.status}
                </span>
              </div>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "#f5ecd0", marginBottom: "2px" }}>{phase.label}</p>
              <p style={{ fontSize: "10px", color: "#C9A84C", marginBottom: "10px" }}>{phase.date}</p>
              {phase.items.map((item) => (
                <div key={item} className="flex items-center gap-2 mb-1.5">
                  <div
                    style={{
                      width: "3px",
                      height: "3px",
                      borderRadius: "50%",
                      background: phase.status === "live" ? "#4CFFA8" : "#C9A84C",
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontSize: "10px", color: "#9a8a5a" }}>{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
