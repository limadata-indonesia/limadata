"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BlockEditor from "../../../../../components/admin/BlockEditor";

const CATEGORIES = ["GEO", "SEO", "Technical SEO", "Link Building", "Digital Marketing"];

function slugify(title) {
  return title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
}

/* ── SEO score dot ─────────────────────────────────── */
function Dot({ pass }) {
  return (
    <span style={{
      display: "inline-block", width: 10, height: 10, borderRadius: "50%", flexShrink: 0,
      background: pass ? "#22c55e" : "#e2e8f0",
    }} />
  );
}

/* ── Character counter bar ─────────────────────────── */
function CharBar({ value, min, max }) {
  const len   = value.length;
  const color = len >= min && len <= max ? "#22c55e" : len > 0 ? "#f59e0b" : "#e2e8f0";
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 5 }}>
      <div style={{ flex: 1, height: 3, background: "#f1f5f9", borderRadius: 99, overflow: "hidden", marginRight: 8 }}>
        <div style={{
          height: "100%", borderRadius: 99,
          width: `${Math.min(100, (len / max) * 100)}%`,
          background: color,
          transition: "width 0.2s, background 0.2s",
        }} />
      </div>
      <span style={{ fontSize: 11, color, fontWeight: 600, minWidth: 36, textAlign: "right" }}>
        {len}/{max}
      </span>
    </div>
  );
}

/* ── Yoast-style SEO panel ─────────────────────────── */
function SeoPanel({ form, set, inp, lbl }) {
  const BASE    = "limadata.co.id";
  const title   = form.meta_title    || form.title;
  const desc    = form.meta_description || form.excerpt;
  const keyword = (form.focus_keyword || "").toLowerCase().trim();

  const kwInTitle = keyword && title.toLowerCase().includes(keyword);
  const kwInDesc  = keyword && desc.toLowerCase().includes(keyword);
  const kwInSlug  = keyword && form.slug.toLowerCase().includes(keyword.replace(/\s+/g, "-"));
  const titleOk   = title.length >= 50 && title.length <= 60;
  const descOk    = desc.length  >= 120 && desc.length  <= 160;

  const checks = [
    { label: "Keyphrase in SEO title",           pass: !!kwInTitle },
    { label: "Keyphrase in meta description",    pass: !!kwInDesc  },
    { label: "Keyphrase in URL slug",            pass: !!kwInSlug  },
    { label: "SEO title length (50–60 chars)",   pass: titleOk     },
    { label: "Meta description (120–160 chars)", pass: descOk      },
  ];
  const score = checks.filter(c => c.pass).length;
  const scoreColor = score >= 4 ? "#22c55e" : score >= 2 ? "#f59e0b" : "#94a3b8";

  const card = { background: "white", border: "1px solid #e2e8f0", borderRadius: 12, padding: "16px 18px", marginBottom: 14 };
  const sec  = { fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 14px" };

  return (
    <div style={{ position: "sticky", top: 24 }}>

      {/* SERP Preview */}
      <div style={card}>
        <p style={sec}>Google Preview</p>
        <div style={{ border: "1px solid #e2e8f0", borderRadius: 8, padding: "14px 16px" }}>
          <p style={{ color: "#202124", fontSize: 11, margin: "0 0 1px", fontFamily: "arial,sans-serif", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
            {BASE}/articles/{form.slug || "article-slug"}
          </p>
          <p style={{ color: "#1a0dab", fontSize: 17, fontWeight: 400, margin: "0 0 3px", fontFamily: "arial,sans-serif", lineHeight: 1.3, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
            {title || "Article title will appear here"}
          </p>
          <p style={{ color: "#4d5156", fontSize: 13, margin: 0, fontFamily: "arial,sans-serif", lineHeight: 1.55,
            display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {desc || "Meta description will appear here…"}
          </p>
        </div>
      </div>

      {/* SEO Fields */}
      <div style={card}>
        <p style={sec}>SEO Meta</p>

        <div style={{ marginBottom: 14 }}>
          <label style={lbl}>Focus Keyphrase</label>
          <input
            type="text"
            value={form.focus_keyword}
            onChange={e => set("focus_keyword", e.target.value)}
            style={inp}
            placeholder="e.g. jasa seo indonesia"
          />
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={lbl}>SEO Title <span style={{ color: "#94a3b8", fontWeight: 400 }}>(overrides article title)</span></label>
          <input
            type="text"
            value={form.meta_title}
            onChange={e => set("meta_title", e.target.value)}
            style={inp}
            placeholder={form.title || "SEO title…"}
          />
          <CharBar value={form.meta_title || form.title} min={50} max={60} />
        </div>

        <div>
          <label style={lbl}>Meta Description <span style={{ color: "#94a3b8", fontWeight: 400 }}>(overrides excerpt)</span></label>
          <textarea
            value={form.meta_description}
            onChange={e => set("meta_description", e.target.value)}
            rows={3}
            style={{ ...inp, resize: "vertical" }}
            placeholder={form.excerpt || "Meta description…"}
          />
          <CharBar value={form.meta_description || form.excerpt} min={120} max={160} />
        </div>
      </div>

      {/* Analysis */}
      <div style={card}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <p style={{ ...sec, margin: 0 }}>SEO Analysis</p>
          <span style={{ fontSize: 13, fontWeight: 700, color: scoreColor }}>{score}/{checks.length}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          {checks.map(({ label, pass }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <Dot pass={pass} />
              <span style={{ fontSize: 13, color: pass ? "#0f172a" : "#94a3b8" }}>{label}</span>
            </div>
          ))}
        </div>
        {!form.focus_keyword && (
          <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 12, marginBottom: 0 }}>
            Enter a focus keyphrase above to activate analysis.
          </p>
        )}
      </div>
    </div>
  );
}

/* ── Main form ─────────────────────────────────────── */
export default function ArticleForm({ article, isNew }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error,  setError]  = useState("");
  const [form, setForm] = useState({
    slug:             article?.slug             ?? "",
    category:         article?.category         ?? "SEO",
    title:            article?.title            ?? "",
    excerpt:          article?.excerpt          ?? "",
    date:             article?.date             ?? "",
    read_time:        article?.read_time        ?? "5 min read",
    author_name:      article?.author_name      ?? "Hasan Ghazali",
    author_initials:  article?.author_initials  ?? "HG",
    author_role:      article?.author_role      ?? "SEO Strategist, Limadata",
    content:          article?.content          ?? [],
    published:        article?.published        ?? true,
    focus_keyword:    article?.focus_keyword    ?? "",
    meta_title:       article?.meta_title       ?? "",
    meta_description: article?.meta_description ?? "",
  });

  function set(field, value) {
    setForm(prev => {
      const next = { ...prev, [field]: value };
      if (field === "title" && isNew) next.slug = slugify(value);
      return next;
    });
  }

  async function save(e) {
    e?.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch(isNew ? "/api/articles" : `/api/articles/${article.id}`, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || "Save failed"); }
      router.push("/admin/articles");
      router.refresh();
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  }

  async function del() {
    if (!confirm("Delete this article? This cannot be undone.")) return;
    await fetch(`/api/articles/${article.id}`, { method: "DELETE" });
    router.push("/admin/articles");
    router.refresh();
  }

  const inp = { width: "100%", border: "1px solid #e2e8f0", borderRadius: 8, padding: "10px 14px", fontSize: 14, color: "#0f172a", outline: "none", background: "white", boxSizing: "border-box" };
  const lbl = { display: "block", color: "#475569", fontSize: 13, fontWeight: 500, marginBottom: 6 };

  return (
    <div style={{ padding: "28px 32px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/admin/articles" style={{ color: "#64748b", fontSize: 13, textDecoration: "none" }}>← Articles</Link>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", margin: 0 }}>{isNew ? "New Article" : "Edit Article"}</h1>
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

      {/* Two-column layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24, alignItems: "start" }}>

        {/* ── Left: article content ── */}
        <form onSubmit={save}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
            <div>
              <label style={lbl}>Title *</label>
              <input type="text" value={form.title} onChange={e => set("title", e.target.value)} required style={inp} placeholder="Article title" />
            </div>
            <div>
              <label style={lbl}>Slug *</label>
              <input type="text" value={form.slug} onChange={e => set("slug", e.target.value)} required style={inp} placeholder="article-slug" />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 14 }}>
            <div>
              <label style={lbl}>Category</label>
              <select value={form.category} onChange={e => set("category", e.target.value)} style={{ ...inp, background: "white" }}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={lbl}>Date</label>
              <input type="text" value={form.date} onChange={e => set("date", e.target.value)} style={inp} placeholder="18 Jun 2026" />
            </div>
            <div>
              <label style={lbl}>Read Time</label>
              <input type="text" value={form.read_time} onChange={e => set("read_time", e.target.value)} style={inp} placeholder="5 min read" />
            </div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={lbl}>Excerpt *</label>
            <textarea value={form.excerpt} onChange={e => set("excerpt", e.target.value)} required rows={3} style={{ ...inp, resize: "vertical" }} placeholder="Short description shown in article cards…" />
          </div>

          {/* Author */}
          <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 12, padding: "16px 20px", marginBottom: 14 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 12px" }}>Author</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 1fr", gap: 12 }}>
              <div>
                <label style={lbl}>Name</label>
                <input type="text" value={form.author_name} onChange={e => set("author_name", e.target.value)} style={inp} />
              </div>
              <div>
                <label style={lbl}>Initials</label>
                <input type="text" value={form.author_initials} onChange={e => set("author_initials", e.target.value)} maxLength={3} style={inp} />
              </div>
              <div>
                <label style={lbl}>Role</label>
                <input type="text" value={form.author_role} onChange={e => set("author_role", e.target.value)} style={inp} />
              </div>
            </div>
          </div>

          {/* Published */}
          <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", marginBottom: 24 }}>
            <input type="checkbox" checked={form.published} onChange={e => set("published", e.target.checked)} style={{ width: 16, height: 16, accentColor: "#E8601A" }} />
            <span style={{ fontSize: 14, fontWeight: 500, color: "#475569" }}>Published (visible on the public site)</span>
          </label>

          {/* Content */}
          <div>
            <label style={{ display: "block", fontSize: 15, fontWeight: 600, color: "#0f172a", marginBottom: 12 }}>Content</label>
            <BlockEditor blocks={form.content} onChange={blocks => set("content", blocks)} />
          </div>

          <button type="submit" style={{ display: "none" }} />
        </form>

        {/* ── Right: SEO panel ── */}
        <SeoPanel form={form} set={set} inp={inp} lbl={lbl} />
      </div>
    </div>
  );
}
