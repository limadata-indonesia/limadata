"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import RichTextEditor from "../../../../../components/admin/RichTextEditor";

const BG_PRESETS = [
  { label: "Green",      bg: "linear-gradient(135deg,#1d6e36,#0a3018)", dot: "#2dbd5a" },
  { label: "Blue",       bg: "linear-gradient(135deg,#0068c9,#003060)", dot: "#3da1ff" },
  { label: "Brown",      bg: "linear-gradient(135deg,#7a3b10,#3d1c07)", dot: "#d4813a" },
  { label: "Dark Green", bg: "linear-gradient(135deg,#006e3c,#003a1e)", dot: "#00c46a" },
  { label: "Orange",     bg: "linear-gradient(135deg,#b04010,#5c200a)", dot: "#E8601A" },
  { label: "Navy",       bg: "linear-gradient(135deg,#005f99,#003058)", dot: "#2a9fd6" },
  { label: "Purple",     bg: "linear-gradient(135deg,#5b21b6,#2e1065)", dot: "#a78bfa" },
  { label: "Red",        bg: "linear-gradient(135deg,#991b1b,#450a0a)", dot: "#f87171" },
];

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
}

/* ── Metrics editor ─────────────────────────────────── */
function MetricsEditor({ metrics, onChange, inp, lbl }) {
  function update(i, field, val) {
    const next = metrics.map((m, idx) => idx === i ? { ...m, [field]: val } : m);
    onChange(next);
  }
  function add()    { onChange([...metrics, { label: "", value: "", sublabel: "" }]); }
  function remove(i){ onChange(metrics.filter((_, idx) => idx !== i)); }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>Key Metrics</p>
        {metrics.length < 4 && (
          <button type="button" onClick={add} style={{ fontSize: 12, color: "#E8601A", background: "none", border: "1px solid rgba(232,96,26,0.3)", borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontWeight: 600 }}>
            + Add Metric
          </button>
        )}
      </div>
      {metrics.map((m, i) => (
        <div key={i} style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: "12px 14px", marginBottom: 8 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
            <div>
              <label style={lbl}>Label</label>
              <input type="text" value={m.label} onChange={e => update(i, "label", e.target.value)} style={inp} placeholder="Organic Traffic" />
            </div>
            <div>
              <label style={lbl}>Value</label>
              <input type="text" value={m.value} onChange={e => update(i, "value", e.target.value)} style={inp} placeholder="+340%" />
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
            <div style={{ flex: 1 }}>
              <label style={lbl}>Sub-label</label>
              <input type="text" value={m.sublabel} onChange={e => update(i, "sublabel", e.target.value)} style={inp} placeholder="growth in 6 months" />
            </div>
            <button type="button" onClick={() => remove(i)} style={{ background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.2)", borderRadius: 6, padding: "9px 10px", cursor: "pointer", color: "#dc2626", flexShrink: 0 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
        </div>
      ))}
      {metrics.length === 0 && (
        <p style={{ fontSize: 12, color: "#94a3b8", textAlign: "center", padding: "12px 0" }}>No metrics yet. Click "+ Add Metric".</p>
      )}
    </div>
  );
}

/* ── Timeline editor ────────────────────────────────── */
function TimelineEditor({ timeline, onChange, inp, lbl }) {
  function update(i, field, val) {
    const next = timeline.map((t, idx) => idx === i ? { ...t, [field]: val } : t);
    onChange(next);
  }
  function add()    { onChange([...timeline, { date: "", title: "", description: "" }]); }
  function remove(i){ onChange(timeline.filter((_, idx) => idx !== i)); }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>Timeline</p>
        <button type="button" onClick={add} style={{ fontSize: 12, color: "#E8601A", background: "none", border: "1px solid rgba(232,96,26,0.3)", borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontWeight: 600 }}>
          + Add Step
        </button>
      </div>
      {timeline.map((t, i) => (
        <div key={i} style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: "12px 14px", marginBottom: 8 }}>
          <div style={{ display: "grid", gridTemplateColumns: "120px 1fr auto", gap: 8, marginBottom: 8, alignItems: "flex-end" }}>
            <div>
              <label style={lbl}>Date</label>
              <input type="text" value={t.date} onChange={e => update(i, "date", e.target.value)} style={inp} placeholder="Jan 2025" />
            </div>
            <div>
              <label style={lbl}>Title</label>
              <input type="text" value={t.title} onChange={e => update(i, "title", e.target.value)} style={inp} placeholder="Technical Audit" />
            </div>
            <button type="button" onClick={() => remove(i)} style={{ background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.2)", borderRadius: 6, padding: "9px 10px", cursor: "pointer", color: "#dc2626" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
          <div>
            <label style={lbl}>Description</label>
            <input type="text" value={t.description} onChange={e => update(i, "description", e.target.value)} style={inp} placeholder="What happened during this phase…" />
          </div>
        </div>
      ))}
      {timeline.length === 0 && (
        <p style={{ fontSize: 12, color: "#94a3b8", textAlign: "center", padding: "12px 0" }}>No steps yet. Click "+ Add Step".</p>
      )}
    </div>
  );
}

/* ── Services tag input ─────────────────────────────── */
function ServicesEditor({ services, onChange, inp }) {
  const [input, setInput] = useState("");

  function add() {
    const v = input.trim();
    if (v && !services.includes(v)) onChange([...services, v]);
    setInput("");
  }
  function remove(i) { onChange(services.filter((_, idx) => idx !== i)); }

  return (
    <div>
      <p style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 10px" }}>Services List</p>
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); add(); } }}
          style={{ ...inp, flex: 1 }}
          placeholder="e.g. Technical SEO — press Enter to add"
        />
        <button type="button" onClick={add} style={{ background: "#E8601A", color: "white", border: "none", borderRadius: 8, padding: "0 16px", cursor: "pointer", fontWeight: 600, fontSize: 13, flexShrink: 0 }}>Add</button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {services.map((s, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(232,96,26,0.08)", border: "1px solid rgba(232,96,26,0.25)", borderRadius: 999, padding: "4px 12px", fontSize: 13, color: "#E8601A" }}>
            {s}
            <button type="button" onClick={() => remove(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#E8601A", padding: 0, lineHeight: 1, fontSize: 14, fontWeight: 700 }}>×</button>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Main form ──────────────────────────────────────── */
export default function CaseStudyForm({ caseStudy, isNew }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState("");
  const [form, setForm]     = useState({
    company:       caseStudy?.company       ?? "",
    abbr:          caseStudy?.abbr          ?? "",
    slug:          caseStudy?.slug          ?? "",
    description:   caseStudy?.description   ?? "",
    change:        caseStudy?.change        ?? "",
    service:       caseStudy?.service       ?? "",
    bg:            caseStudy?.bg            ?? BG_PRESETS[0].bg,
    dot:           caseStudy?.dot           ?? BG_PRESETS[0].dot,
    sort_order:    caseStudy?.sort_order    ?? 0,
    published:     caseStudy?.published     ?? true,
    client_about:  caseStudy?.client_about  ?? "",
    challenge:     caseStudy?.challenge     ?? "",
    solution:      caseStudy?.solution      ?? "",
    metrics:       Array.isArray(caseStudy?.metrics)       ? caseStudy.metrics       : [],
    services_list: Array.isArray(caseStudy?.services_list) ? caseStudy.services_list : [],
    timeline:      Array.isArray(caseStudy?.timeline)      ? caseStudy.timeline      : [],
    content_html:  caseStudy?.content_html  ?? "",
    hero_image_url: caseStudy?.hero_image_url ?? "",
  });

  function set(field, value) {
    setForm(prev => {
      const next = { ...prev, [field]: value };
      if (field === "company" && isNew) next.slug = slugify(value);
      return next;
    });
  }

  function selectPreset(preset) { setForm(prev => ({ ...prev, bg: preset.bg, dot: preset.dot })); }

  async function save(e) {
    e?.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch(isNew ? "/api/case-studies" : `/api/case-studies/${caseStudy.id}`, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || "Save failed"); }
      router.push("/admin/case-studies");
      router.refresh();
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  }

  async function del() {
    if (!confirm("Delete this case study? This cannot be undone.")) return;
    await fetch(`/api/case-studies/${caseStudy.id}`, { method: "DELETE" });
    router.push("/admin/case-studies");
    router.refresh();
  }

  const inp = { width: "100%", border: "1px solid #e2e8f0", borderRadius: 8, padding: "10px 14px", fontSize: 14, color: "#0f172a", outline: "none", background: "white", boxSizing: "border-box" };
  const lbl = { display: "block", color: "#475569", fontSize: 13, fontWeight: 500, marginBottom: 6 };
  const card = { background: "white", border: "1px solid #e2e8f0", borderRadius: 12, padding: "18px 20px", marginBottom: 16 };
  const sec  = { fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 14px" };
  const selectedPreset = BG_PRESETS.find(p => p.bg === form.bg);

  return (
    <div style={{ padding: "28px 32px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/admin/case-studies" style={{ color: "#64748b", fontSize: 13, textDecoration: "none" }}>← Case Studies</Link>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", margin: 0 }}>{isNew ? "New Case Study" : "Edit Case Study"}</h1>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {!isNew && (
            <button type="button" onClick={del} style={{ padding: "9px 16px", borderRadius: 8, fontSize: 14, fontWeight: 600, background: "rgba(220,38,38,0.08)", color: "#dc2626", border: "1px solid rgba(220,38,38,0.2)", cursor: "pointer" }}>
              Delete
            </button>
          )}
          {!isNew && form.slug && (
            <a href={`/case-studies/${form.slug}`} target="_blank" rel="noopener noreferrer" style={{ padding: "9px 16px", borderRadius: 8, fontSize: 14, fontWeight: 600, background: "#f1f5f9", color: "#475569", border: "1px solid #e2e8f0", textDecoration: "none", cursor: "pointer" }}>
              View Page ↗
            </a>
          )}
          <button onClick={save} disabled={saving} style={{ padding: "9px 24px", borderRadius: 8, fontSize: 14, fontWeight: 600, background: "#E8601A", color: "white", border: "none", cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1 }}>
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>

      {error && <div style={{ background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.2)", borderRadius: 8, padding: "11px 16px", color: "#dc2626", fontSize: 13, marginBottom: 20 }}>{error}</div>}

      {/* Two-column layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 24, alignItems: "start" }}>

        {/* ── Left: main content ── */}
        <form onSubmit={save}>

          {/* Basic info */}
          <div style={card}>
            <p style={sec}>Basic Info</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 80px", gap: 14, marginBottom: 14 }}>
              <div>
                <label style={lbl}>Company Name *</label>
                <input type="text" value={form.company} onChange={e => set("company", e.target.value)} required style={inp} placeholder="Tokopedia" />
              </div>
              <div>
                <label style={lbl}>Abbr</label>
                <input type="text" value={form.abbr} onChange={e => set("abbr", e.target.value.toUpperCase())} maxLength={2} style={inp} placeholder="TK" />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              <div>
                <label style={lbl}>Slug (URL) *</label>
                <input type="text" value={form.slug} onChange={e => set("slug", e.target.value)} required style={inp} placeholder="tokopedia" />
              </div>
              <div>
                <label style={lbl}>Sort Order</label>
                <input type="number" value={form.sort_order} onChange={e => set("sort_order", parseInt(e.target.value) || 0)} style={inp} min={0} />
              </div>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={lbl}>Card Description *</label>
              <textarea value={form.description} onChange={e => set("description", e.target.value)} required rows={2} style={{ ...inp, resize: "vertical" }} placeholder="Short description shown in homepage card…" />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div>
                <label style={lbl}>Growth / Result *</label>
                <input type="text" value={form.change} onChange={e => set("change", e.target.value)} required style={inp} placeholder="+340%" />
              </div>
              <div>
                <label style={lbl}>Service (card)</label>
                <input type="text" value={form.service} onChange={e => set("service", e.target.value)} style={inp} placeholder="SEO Services & Content Strategy" />
              </div>
            </div>
          </div>

          {/* About + Challenge + Solution */}
          <div style={card}>
            <p style={sec}>Detail Sections</p>
            <div style={{ marginBottom: 14 }}>
              <label style={lbl}>About the Client</label>
              <textarea value={form.client_about} onChange={e => set("client_about", e.target.value)} rows={3} style={{ ...inp, resize: "vertical" }} placeholder="Brief background on who the client is, their industry, and their goals…" />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={lbl}>The Challenge</label>
              <textarea value={form.challenge} onChange={e => set("challenge", e.target.value)} rows={3} style={{ ...inp, resize: "vertical" }} placeholder="What problem was the client facing before working with Limadata?…" />
            </div>
            <div>
              <label style={lbl}>Our Solution</label>
              <textarea value={form.solution} onChange={e => set("solution", e.target.value)} rows={3} style={{ ...inp, resize: "vertical" }} placeholder="How did Limadata approach and solve the problem?…" />
            </div>
          </div>

          {/* Rich content */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 15, fontWeight: 600, color: "#0f172a", marginBottom: 12 }}>Full Case Study Content</label>
            <RichTextEditor value={form.content_html} onChange={html => set("content_html", html)} />
          </div>

          <button type="submit" style={{ display: "none" }} />
        </form>

        {/* ── Right: card settings + structured data ── */}
        <div style={{ position: "sticky", top: 24, display: "flex", flexDirection: "column", gap: 14 }}>

          {/* Published */}
          <div style={card}>
            <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
              <input type="checkbox" checked={form.published} onChange={e => set("published", e.target.checked)} style={{ width: 16, height: 16, accentColor: "#E8601A" }} />
              <span style={{ fontSize: 14, fontWeight: 500, color: "#475569" }}>Published</span>
            </label>
          </div>

          {/* Card color */}
          <div style={card}>
            <p style={sec}>Card Color</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
              {BG_PRESETS.map(p => (
                <button key={p.label} type="button" onClick={() => selectPreset(p)} style={{
                  width: 36, height: 36, borderRadius: 8, background: p.bg, border: "none", cursor: "pointer",
                  outline: form.bg === p.bg ? "3px solid #E8601A" : "3px solid transparent", outlineOffset: 2,
                }} title={p.label} />
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 10, background: form.bg,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, fontWeight: 800, color: "white",
              }}>
                {form.abbr || "??"}
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 13, color: "#475569" }}>
                  Preview · <span style={{ color: form.dot, fontWeight: 700 }}>{form.change || "+000%"}</span>
                </p>
                <p style={{ margin: "2px 0 0", fontSize: 12, color: "#94a3b8" }}>{selectedPreset?.label ?? "Custom"}</p>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div style={card}>
            <MetricsEditor
              metrics={form.metrics}
              onChange={v => set("metrics", v)}
              inp={inp}
              lbl={lbl}
            />
          </div>

          {/* Services */}
          <div style={card}>
            <ServicesEditor
              services={form.services_list}
              onChange={v => set("services_list", v)}
              inp={inp}
            />
          </div>

          {/* Timeline */}
          <div style={card}>
            <TimelineEditor
              timeline={form.timeline}
              onChange={v => set("timeline", v)}
              inp={inp}
              lbl={lbl}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
