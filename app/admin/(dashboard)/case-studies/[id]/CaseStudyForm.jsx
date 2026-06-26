"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

export default function CaseStudyForm({ caseStudy, isNew }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    company: caseStudy?.company ?? "",
    abbr: caseStudy?.abbr ?? "",
    description: caseStudy?.description ?? "",
    change: caseStudy?.change ?? "",
    service: caseStudy?.service ?? "",
    bg: caseStudy?.bg ?? BG_PRESETS[0].bg,
    dot: caseStudy?.dot ?? BG_PRESETS[0].dot,
    sort_order: caseStudy?.sort_order ?? 0,
    published: caseStudy?.published ?? true,
  });

  function set(field, value) { setForm(prev => ({ ...prev, [field]: value })); }

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
  const selectedPreset = BG_PRESETS.find(p => p.bg === form.bg);

  return (
    <div style={{ padding: 32, maxWidth: 720 }}>
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
          <button onClick={save} disabled={saving} style={{ padding: "9px 24px", borderRadius: 8, fontSize: 14, fontWeight: 600, background: "#E8601A", color: "white", border: "none", cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1 }}>
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>

      {error && <div style={{ background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.2)", borderRadius: 8, padding: "11px 16px", color: "#dc2626", fontSize: 13, marginBottom: 20 }}>{error}</div>}

      <form onSubmit={save}>
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

        <div style={{ marginBottom: 14 }}>
          <label style={lbl}>Description *</label>
          <textarea value={form.description} onChange={e => set("description", e.target.value)} required rows={3} style={{ ...inp, resize: "vertical" }} placeholder="What challenge did this client face and what did Limadata do?" />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
          <div>
            <label style={lbl}>Growth / Result *</label>
            <input type="text" value={form.change} onChange={e => set("change", e.target.value)} required style={inp} placeholder="+340%" />
          </div>
          <div>
            <label style={lbl}>Service *</label>
            <input type="text" value={form.service} onChange={e => set("service", e.target.value)} required style={inp} placeholder="SEO Services & Content Strategy" />
          </div>
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={lbl}>Sort Order</label>
          <input type="number" value={form.sort_order} onChange={e => set("sort_order", parseInt(e.target.value) || 0)} style={{ ...inp, width: 100 }} min={0} />
        </div>

        {/* Color preset */}
        <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 12, padding: "16px 20px", marginBottom: 14 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 14px" }}>Card Color</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
            {BG_PRESETS.map(p => (
              <button key={p.label} type="button" onClick={() => selectPreset(p)} style={{
                width: 44, height: 44, borderRadius: 10, background: p.bg, border: "none", cursor: "pointer",
                outline: form.bg === p.bg ? `3px solid #E8601A` : "3px solid transparent",
                outlineOffset: 2,
              }} title={p.label} />
            ))}
          </div>
          {/* Preview */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 56, height: 56, borderRadius: 12,
              background: form.bg, display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16, fontWeight: 800, color: "white",
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

        {/* Published */}
        <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", marginBottom: 24 }}>
          <input type="checkbox" checked={form.published} onChange={e => set("published", e.target.checked)} style={{ width: 16, height: 16, accentColor: "#E8601A" }} />
          <span style={{ fontSize: 14, fontWeight: 500, color: "#475569" }}>Published (visible on the public site)</span>
        </label>

        <button type="submit" style={{ display: "none" }} />
      </form>
    </div>
  );
}
