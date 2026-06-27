"use client";
import Link from "next/link";

const CAT_COLORS = {
  "GEO":               { bg: "rgba(232,96,26,0.08)",  text: "#E8601A",  dot: "#E8601A"  },
  "SEO":               { bg: "rgba(34,197,94,0.08)",  text: "#16a34a",  dot: "#22c55e"  },
  "Technical SEO":     { bg: "rgba(59,130,246,0.08)", text: "#2563eb",  dot: "#3b82f6"  },
  "Link Building":     { bg: "rgba(139,92,246,0.08)", text: "#7c3aed",  dot: "#8b5cf6"  },
  "Digital Marketing": { bg: "rgba(234,179,8,0.08)",  text: "#a16207",  dot: "#eab308"  },
};

export default function ArticlesTable({ articles }) {
  if (!articles || articles.length === 0) {
    return (
      <div style={{ padding: "56px 32px", textAlign: "center" }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        </div>
        <p style={{ color: "#64748b", fontSize: 13, margin: "0 0 12px" }}>No articles yet.</p>
        <Link href="/admin/articles/new" style={{ color: "#E8601A", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>
          Create your first article →
        </Link>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .art-row:hover { background: #fafafa; }
        .art-view:hover { color: #475569 !important; border-color: #cbd5e1 !important; }
        .art-edit:hover { background: rgba(232,96,26,0.1) !important; }
      `}</style>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
            <th style={{ padding: "10px 20px", textAlign: "left", fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", width: "46%" }}>Title</th>
            <th style={{ padding: "10px 16px", textAlign: "left", fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em" }}>Category</th>
            <th style={{ padding: "10px 16px", textAlign: "left", fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em" }}>Date</th>
            <th style={{ padding: "10px 16px", textAlign: "left", fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em" }}>Status</th>
            <th style={{ padding: "10px 20px", textAlign: "right", fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map(({ id, title, category, date, published, slug }, i) => {
            const cat = CAT_COLORS[category] ?? { bg: "#f1f5f9", text: "#64748b", dot: "#94a3b8" };
            return (
              <tr key={id} className="art-row" style={{ borderBottom: i < articles.length - 1 ? "1px solid #f1f5f9" : "none", transition: "background 0.1s" }}>

                <td style={{ padding: "12px 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", flexShrink: 0, background: published ? "#22c55e" : "#cbd5e1" }} />
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", lineHeight: 1.4 }}>{title}</span>
                  </div>
                </td>

                <td style={{ padding: "12px 16px" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 600, background: cat.bg, color: cat.text, padding: "3px 9px", borderRadius: 999 }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: cat.dot, flexShrink: 0 }} />
                    {category}
                  </span>
                </td>

                <td style={{ padding: "12px 16px", fontSize: 12, color: "#94a3b8", whiteSpace: "nowrap" }}>{date}</td>

                <td style={{ padding: "12px 16px" }}>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 999, background: published ? "rgba(34,197,94,0.08)" : "rgba(148,163,184,0.12)", color: published ? "#16a34a" : "#64748b", border: `1px solid ${published ? "rgba(34,197,94,0.2)" : "rgba(148,163,184,0.2)"}` }}>
                    {published ? "● Published" : "○ Draft"}
                  </span>
                </td>

                <td style={{ padding: "12px 20px", textAlign: "right" }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    {slug && (
                      <a href={`/articles/${slug}`} target="_blank" rel="noopener noreferrer" className="art-view"
                        style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 500, color: "#94a3b8", textDecoration: "none", padding: "4px 8px", borderRadius: 6, border: "1px solid #e2e8f0" }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                        View
                      </a>
                    )}
                    <Link href={`/admin/articles/${id}`} className="art-edit"
                      style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600, color: "#E8601A", textDecoration: "none", padding: "4px 10px", borderRadius: 6, border: "1px solid rgba(232,96,26,0.25)", background: "rgba(232,96,26,0.04)" }}>
                      Edit
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
