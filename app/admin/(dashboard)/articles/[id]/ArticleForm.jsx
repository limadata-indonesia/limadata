"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BlockEditor from "../../../../../components/admin/BlockEditor";

const CATEGORIES = ["GEO", "SEO", "Technical SEO", "Link Building", "Digital Marketing"];

function slug(title) {
  return title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
}

export default function ArticleForm({ article, isNew }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    slug: article?.slug ?? "",
    category: article?.category ?? "SEO",
    title: article?.title ?? "",
    excerpt: article?.excerpt ?? "",
    date: article?.date ?? "",
    read_time: article?.read_time ?? "5 min read",
    author_name: article?.author_name ?? "Hasan Ghazali",
    author_initials: article?.author_initials ?? "HG",
    author_role: article?.author_role ?? "SEO Strategist, Limadata",
    content: article?.content ?? [],
    published: article?.published ?? true,
  });

  function set(field, value) {
    setForm(prev => {
      const next = { ...prev, [field]: value };
      if (field === "title" && isNew) next.slug = slug(value);
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
    <div style={{ padding: 32, maxWidth: 860 }}>
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
      </form>
    </div>
  );
}
