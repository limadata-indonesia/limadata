import { createClient } from "../../../../lib/supabase-server";
import Link from "next/link";

export default async function ArticlesPage() {
  const supabase = createClient();
  const { data: articles } = await supabase
    .from("articles")
    .select("id, title, category, date, published, created_at")
    .order("created_at", { ascending: false });

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", margin: 0 }}>Articles</h1>
          <p style={{ color: "#64748b", fontSize: 14, margin: "4px 0 0" }}>{articles?.length ?? 0} total</p>
        </div>
        <Link href="/admin/articles/new" style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "#E8601A", color: "white", padding: "9px 18px",
          borderRadius: 8, textDecoration: "none", fontSize: 14, fontWeight: 600,
        }}>
          + New Article
        </Link>
      </div>

      <div style={{ background: "white", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        {!articles || articles.length === 0 ? (
          <div style={{ padding: "48px", textAlign: "center", color: "#94a3b8", fontSize: 14 }}>
            No articles yet.{" "}
            <Link href="/admin/articles/new" style={{ color: "#E8601A" }}>Create your first article.</Link>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                {["Title", "Category", "Date", "Status", ""].map(h => (
                  <th key={h} style={{ padding: "11px 20px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {articles.map(({ id, title, category, date, published }) => (
                <tr key={id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "13px 20px", fontWeight: 500, fontSize: 14, color: "#0f172a" }}>{title}</td>
                  <td style={{ padding: "13px 20px", fontSize: 13, color: "#64748b" }}>{category}</td>
                  <td style={{ padding: "13px 20px", fontSize: 13, color: "#64748b" }}>{date}</td>
                  <td style={{ padding: "13px 20px" }}>
                    <span style={{
                      fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 999,
                      background: published ? "rgba(34,197,94,0.1)" : "rgba(100,116,139,0.1)",
                      color: published ? "#16a34a" : "#64748b",
                    }}>
                      {published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td style={{ padding: "13px 20px", textAlign: "right" }}>
                    <Link href={`/admin/articles/${id}`} style={{ color: "#E8601A", fontSize: 13, fontWeight: 500, textDecoration: "none" }}>Edit →</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
