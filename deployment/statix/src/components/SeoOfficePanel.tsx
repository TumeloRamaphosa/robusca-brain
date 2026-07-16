import { useEffect, useState } from "react";

interface SeoClient {
  slug: string;
  name: string;
  site_url: string;
  business_type: string | null;
  owner: string;
  updated_at: string;
}

interface SeoEntity {
  title: string;
  path: string;
  type: string;
  status: string;
  confidence: string | null;
  tags: string[];
  updated: string;
}

interface BrainResponse {
  ok: boolean;
  offline?: boolean;
  client?: SeoClient;
  summary?: { total: number; pendingReview: number };
  people: SeoEntity[];
  brands: SeoEntity[];
  competitors: SeoEntity[];
}

export default function SeoOfficePanel() {
  const [clients, setClients] = useState<SeoClient[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [brain, setBrain] = useState<BrainResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    fetch("/api/seo/clients")
      .then((r) => r.json())
      .then((d: { clients?: SeoClient[]; offline?: boolean }) => {
        const list = d.clients ?? [];
        setClients(list);
        setOffline(!!d.offline);
        if (list.length > 0) setSelected(list[0].slug);
      })
      .catch(() => setOffline(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selected) return;
    setBrain(null);
    fetch(`/api/seo/brain/${selected}`)
      .then((r) => r.json())
      .then((d: BrainResponse) => setBrain(d))
      .catch(() => setBrain({ ok: false, offline: true, people: [], brands: [], competitors: [] }));
  }, [selected]);

  const seoOfficeUrl = import.meta.env.VITE_SEO_OFFICE_URL || "http://localhost:3000";

  if (loading) {
    return <p style={{ color: "var(--gold-dim)" }}>Loading SEO Office data…</p>;
  }

  if (offline && clients.length === 0) {
    return (
      <div style={{ maxWidth: 560 }}>
        <p style={{ color: "var(--gold-dim)", lineHeight: 1.6, marginBottom: "1rem" }}>
          SEO Office is not connected. Run it on your Orgo VM, then set{" "}
          <code style={{ color: "var(--gold)" }}>SEO_OFFICE_URL</code> in Statix env.
        </p>
        <a
          href={seoOfficeUrl}
          target="_blank"
          rel="noreferrer"
          style={{ fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase" }}
        >
          Open SEO Office →
        </a>
      </div>
    );
  }

  const selectedClient = clients.find((c) => c.slug === selected);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
        <div>
          <p style={{ fontSize: "9px", letterSpacing: "3px", color: "var(--gold-dim)", marginBottom: "6px" }}>
            SEO OFFICE · CLAUDE-SEO ENGINE
          </p>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.75rem", fontWeight: 300 }}>
            Companies & People
          </h2>
        </div>
        <a
          href={`${seoOfficeUrl}/office`}
          target="_blank"
          rel="noreferrer"
          style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", padding: "8px 12px", border: "1px solid var(--border)" }}
        >
          3D Office →
        </a>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(220px, 280px) 1fr", gap: "1.5rem" }}>
        <div>
          <p style={{ fontSize: "9px", letterSpacing: "3px", color: "var(--gold-dim)", marginBottom: "10px" }}>
            COMPANIES ({clients.length})
          </p>
          {clients.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setSelected(c.slug)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "12px",
                marginBottom: "8px",
                background: selected === c.slug ? "var(--surface)" : "transparent",
                border: `1px solid ${selected === c.slug ? "var(--gold)" : "var(--border)"}`,
                color: "var(--text)",
                cursor: "pointer",
              }}
            >
              <strong style={{ display: "block", fontSize: "14px" }}>{c.name}</strong>
              <span style={{ fontSize: "11px", color: "var(--gold-dim)" }}>{c.site_url}</span>
              {c.business_type && (
                <span style={{ display: "block", fontSize: "10px", color: "var(--accent)", marginTop: 4 }}>
                  {c.business_type}
                </span>
              )}
            </button>
          ))}
        </div>

        <div>
          {selectedClient && (
            <>
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  padding: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <strong>{selectedClient.name}</strong>
                <p style={{ fontSize: "12px", color: "var(--gold-dim)", marginTop: 4 }}>
                  {selectedClient.site_url} · Owner: {selectedClient.owner}
                </p>
                {brain?.summary && (
                  <p style={{ fontSize: "11px", marginTop: 8, color: "var(--accent)" }}>
                    {brain.summary.total} brain notes · {brain.summary.pendingReview} pending review
                  </p>
                )}
              </div>

              {!brain ? (
                <p style={{ color: "var(--gold-dim)" }}>Loading entities…</p>
              ) : (
                <div style={{ display: "grid", gap: "1rem" }}>
                  <EntitySection title="People" items={brain.people} empty="No people indexed yet. Run vault-synthesizer in SEO Office." />
                  <EntitySection title="Brands" items={brain.brands} empty="No brand entities yet." />
                  <EntitySection title="Competitors" items={brain.competitors} empty="No competitors mapped yet." />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function EntitySection({ title, items, empty }: { title: string; items: SeoEntity[]; empty: string }) {
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: "1rem" }}>
      <p style={{ fontSize: "9px", letterSpacing: "3px", color: "var(--gold-dim)", marginBottom: "10px" }}>
        {title.toUpperCase()} ({items.length})
      </p>
      {items.length === 0 ? (
        <p style={{ fontSize: "12px", color: "var(--gold-dim)" }}>{empty}</p>
      ) : (
        items.map((e) => (
          <div
            key={e.path}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px 0",
              borderBottom: "1px solid var(--border)",
              fontSize: "13px",
            }}
          >
            <span>{e.title}</span>
            <span style={{ fontSize: "10px", color: "var(--gold-dim)", textTransform: "uppercase" }}>
              {e.confidence ?? e.status}
            </span>
          </div>
        ))
      )}
    </div>
  );
}