"use client";
import { useState } from "react";
import RichTextEditor from "../../../../components/admin/RichTextEditor";

/* ── Stats editor ───────────────────────────────────── */
function StatsEditor({ stats, onChange, inp, lbl }) {
  function update(i, field, val) { onChange(stats.map((s, idx) => idx === i ? { ...s, [field]: val } : s)); }
  function add()    { onChange([...stats, { value: "", label: "" }]); }
  function remove(i){ onChange(stats.filter((_, idx) => idx !== i)); }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>Stats</p>
        {stats.length < 6 && (
          <button type="button" onClick={add} style={{ fontSize: 12, color: "#E8601A", background: "none", border: "1px solid rgba(232,96,26,0.3)", borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontWeight: 600 }}>+ Add</button>
        )}
      </div>
      {stats.map((s, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "100px 1fr auto", gap: 8, marginBottom: 8, alignItems: "flex-end" }}>
          <div>
            <label style={lbl}>Value</label>
            <input type="text" value={s.value} onChange={e => update(i, "value", e.target.value)} style={inp} placeholder="120+" />
          </div>
          <div>
            <label style={lbl}>Label</label>
            <input type="text" value={s.label} onChange={e => update(i, "label", e.target.value)} style={inp} placeholder="Clients Served" />
          </div>
          <button type="button" onClick={() => remove(i)} style={{ background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.2)", borderRadius: 6, padding: "9px 10px", cursor: "pointer", color: "#dc2626" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
      ))}
    </div>
  );
}

/* ── Values editor ──────────────────────────────────── */
function ValuesEditor({ values, onChange, inp, lbl }) {
  function update(i, field, val) { onChange(values.map((v, idx) => idx === i ? { ...v, [field]: val } : v)); }
  function add()    { onChange([...values, { title: "", description: "" }]); }
  function remove(i){ onChange(values.filter((_, idx) => idx !== i)); }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>Values</p>
        <button type="button" onClick={add} style={{ fontSize: 12, color: "#E8601A", background: "none", border: "1px solid rgba(232,96,26,0.3)", borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontWeight: 600 }}>+ Add</button>
      </div>
      {values.map((v, i) => (
        <div key={i} style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: "12px 14px", marginBottom: 8 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "flex-end", marginBottom: 8 }}>
            <div style={{ flex: 1 }}>
              <label style={lbl}>Title</label>
              <input type="text" value={v.title} onChange={e => update(i, "title", e.target.value)} style={inp} placeholder="Data First" />
            </div>
            <button type="button" onClick={() => remove(i)} style={{ background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.2)", borderRadius: 6, padding: "9px 10px", cursor: "pointer", color: "#dc2626" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
          <div>
            <label style={lbl}>Description</label>
            <input type="text" value={v.description} onChange={e => update(i, "description", e.target.value)} style={inp} placeholder="Short description of this value…" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Team editor ────────────────────────────────────── */
function TeamEditor({ team, onChange, inp, lbl }) {
  function update(i, field, val) { onChange(team.map((m, idx) => idx === i ? { ...m, [field]: val } : m)); }
  function add()    { onChange([...team, { name: "", role: "", initials: "", bio: "", linkedin: "" }]); }
  function remove(i){ onChange(team.filter((_, idx) => idx !== i)); }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>Team Members</p>
        <button type="button" onClick={add} style={{ fontSize: 12, color: "#E8601A", background: "none", border: "1px solid rgba(232,96,26,0.3)", borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontWeight: 600 }}>+ Add Member</button>
      </div>
      {team.map((m, i) => (
        <div key={i} style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: "14px 16px", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <div style={{
              width: 40, height: 40, borderRadius: "50%",
              background: "linear-gradient(135deg,#E8601A,#FF7030)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13, fontWeight: 800, color: "white",
            }}>
              {m.initials || m.name?.slice(0,2).toUpperCase() || "??"}
            </div>
            <button type="button" onClick={() => remove(i)} style={{ background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.2)", borderRadius: 6, padding: "6px 10px", cursor: "pointer", color: "#dc2626", fontSize: 12, fontWeight: 600 }}>
              Remove
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 80px", gap: 10, marginBottom: 10 }}>
            <div>
              <label style={lbl}>Full Name *</label>
              <input type="text" value={m.name} onChange={e => update(i, "name", e.target.value)} style={inp} placeholder="Hasan Ghazali" />
            </div>
            <div>
              <label style={lbl}>Initials</label>
              <input type="text" value={m.initials} onChange={e => update(i, "initials", e.target.value.toUpperCase())} maxLength={3} style={inp} placeholder="HG" />
            </div>
          </div>
          <div style={{ marginBottom: 10 }}>
            <label style={lbl}>Role / Title</label>
            <input type="text" value={m.role} onChange={e => update(i, "role", e.target.value)} style={inp} placeholder="SEO Strategist & Co-Founder" />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label style={lbl}>Bio</label>
            <textarea value={m.bio} onChange={e => update(i, "bio", e.target.value)} rows={2} style={{ ...inp, resize: "vertical" }} placeholder="Short bio — 1 or 2 sentences about this person…" />
          </div>
          <div>
            <label style={lbl}>LinkedIn URL <span style={{ fontWeight: 400, color: "#94a3b8" }}>(optional)</span></label>
            <input type="url" value={m.linkedin} onChange={e => update(i, "linkedin", e.target.value)} style={inp} placeholder="https://linkedin.com/in/username" />
          </div>
        </div>
      ))}
      {team.length === 0 && (
        <p style={{ fontSize: 12, color: "#94a3b8", textAlign: "center", padding: "12px 0" }}>No team members yet. Click "+ Add Member".</p>
      )}
    </div>
  );
}

/* ── Main form ──────────────────────────────────────── */
export default function AboutForm({ initial }) {
  const [saving, setSaving] = useState(false);
  const [saved,  setSaved]  = useState(false);
  const [error,  setError]  = useState("");

  const [form, setForm] = useState({
    hero_tagline:    initial?.hero_tagline    ?? "Who We Are",
    hero_title:      initial?.hero_title      ?? "",
    hero_description:initial?.hero_description?? "",
    mission:         initial?.mission         ?? "",
    vision:          initial?.vision          ?? "",
    stats:           Array.isArray(initial?.stats)       ? initial.stats       : [],
    values_list:     Array.isArray(initial?.values_list) ? initial.values_list : [],
    team:            Array.isArray(initial?.team)        ? initial.team        : [],
    content_html:    initial?.content_html    ?? "",
  });

  function set(field, value) { setForm(prev => ({ ...prev, [field]: value })); }

  async function save(e) {
    e?.preventDefault();
    setSaving(true);
    setSaved(false);
    setError("");
    try {
      const res = await fetch("/api/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || "Save failed"); }
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  const inp = { width: "100%", border: "1px solid #e2e8f0", borderRadius: 8, padding: "10px 14px", fontSize: 14, color: "#0f172a", outline: "none", background: "white", boxSizing: "border-box" };
  const lbl = { display: "block", color: "#475569", fontSize: 13, fontWeight: 500, marginBottom: 6 };
  const card = { background: "white", border: "1px solid #e2e8f0", borderRadius: 12, padding: "20px 22px", marginBottom: 20 };
  const sec  = { fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 16px" };

  return (
    <div style={{ padding: "28px 32px", maxWidth: 900 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", margin: "0 0 4px" }}>About Page</h1>
          <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>Edit the content shown on <a href="/about" target="_blank" style={{ color: "#E8601A" }}>/about ↗</a></p>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {saved && <span style={{ fontSize: 13, color: "#22c55e", fontWeight: 600 }}>✓ Saved</span>}
          <a href="/about" target="_blank" rel="noopener noreferrer" style={{ padding: "9px 16px", borderRadius: 8, fontSize: 14, fontWeight: 600, background: "#f1f5f9", color: "#475569", border: "1px solid #e2e8f0", textDecoration: "none" }}>
            View Page ↗
          </a>
          <button onClick={save} disabled={saving} style={{ padding: "9px 24px", borderRadius: 8, fontSize: 14, fontWeight: 600, background: "#E8601A", color: "white", border: "none", cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1 }}>
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>

      {error && <div style={{ background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.2)", borderRadius: 8, padding: "11px 16px", color: "#dc2626", fontSize: 13, marginBottom: 20 }}>{error}</div>}

      <form onSubmit={save}>

        {/* Hero */}
        <div style={card}>
          <p style={sec}>Hero Section</p>
          <div style={{ marginBottom: 14 }}>
            <label style={lbl}>Tagline <span style={{ fontWeight: 400, color: "#94a3b8" }}>(small text above heading)</span></label>
            <input type="text" value={form.hero_tagline} onChange={e => set("hero_tagline", e.target.value)} style={inp} placeholder="Who We Are" />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={lbl}>Heading</label>
            <input type="text" value={form.hero_title} onChange={e => set("hero_title", e.target.value)} style={inp} placeholder="We help Indonesian businesses grow through SEO & GEO" />
          </div>
          <div>
            <label style={lbl}>Description</label>
            <textarea value={form.hero_description} onChange={e => set("hero_description", e.target.value)} rows={3} style={{ ...inp, resize: "vertical" }} placeholder="A short intro paragraph about Limadata…" />
          </div>
        </div>

        {/* Mission & Vision */}
        <div style={card}>
          <p style={sec}>Mission & Vision</p>
          <div style={{ marginBottom: 14 }}>
            <label style={lbl}>Mission</label>
            <textarea value={form.mission} onChange={e => set("mission", e.target.value)} rows={3} style={{ ...inp, resize: "vertical" }} placeholder="Our mission is to…" />
          </div>
          <div>
            <label style={lbl}>Vision</label>
            <textarea value={form.vision} onChange={e => set("vision", e.target.value)} rows={3} style={{ ...inp, resize: "vertical" }} placeholder="Our vision is to…" />
          </div>
        </div>

        {/* Stats */}
        <div style={card}>
          <StatsEditor stats={form.stats} onChange={v => set("stats", v)} inp={inp} lbl={lbl} />
        </div>

        {/* Values */}
        <div style={card}>
          <ValuesEditor values={form.values_list} onChange={v => set("values_list", v)} inp={inp} lbl={lbl} />
        </div>

        {/* Team */}
        <div style={card}>
          <TeamEditor team={form.team} onChange={v => set("team", v)} inp={inp} lbl={lbl} />
        </div>

        {/* Rich content */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", fontSize: 15, fontWeight: 600, color: "#0f172a", marginBottom: 12 }}>
            Additional Content <span style={{ fontSize: 13, fontWeight: 400, color: "#94a3b8" }}>(optional — appears at bottom of page)</span>
          </label>
          <RichTextEditor value={form.content_html} onChange={html => set("content_html", html)} />
        </div>

        <button type="submit" style={{ display: "none" }} />
      </form>
    </div>
  );
}
