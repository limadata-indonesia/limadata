import { createClient } from "../../../lib/supabase-server";
import Link from "next/link";

export default async function Dashboard() {
  const supabase = createClient();

  const [{ count: articleCount }, { count: caseCount }, { data: recent }] = await Promise.all([
    supabase.from("articles").select("*", { count: "exact", head: true }),
    supabase.from("case_studies").select("*", { count: "exact", head: true }),
    supabase.from("articles").select("id, title, category, date, published").order("created_at", { ascending: false }).limit(6),
  ]);

  const stats = [
    { label: "Total Articles", value: articleCount ?? 0, href: "/admin/articles", color: "#E8601A" },
    { label: "Case Studies", value: caseCount ?? 0, href: "/admin/case-studies", color: "#0068c9" },
  ];

  return (
    <div style={{ padding: 32 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", margin: 0 }}>Dashboard</h1>
        <p style={{ color: "#64748b", fontSize: 14, marginTop: 4, margin: "4px 0 0" }}>Limadata Content Manager</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 28 }}>
        {stats.map(({ label, value, href, color }) => (
          <Link key={label} href={href} style={{ textDecoration: "none" }}>
            <div style={{ background: "white", borderRadius: 12, padding: "22px 24px", border: "1px solid #e2e8f0", cursor: "pointer" }}>
              <p style={{ color: "#64748b", fontSize: 13, margin: "0 0 6px" }}>{label}</p>
              <p style={{ color, fontSize: 36, fontWeight: 700, margin: 0 }}>{value}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
        <Link href="/admin/articles/new" style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "#E8601A", color: "white", padding: "9px 18px",
          borderRadius: 8, textDecoration: "none", fontSize: 14, fontWeight: 600,
        }}>
          + New Article
        </Link>
        <Link href="/admin/case-studies/new" style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "white", color: "#475569", padding: "9px 18px",
          borderRadius: 8, textDecoration: "none", fontSize: 14, fontWeight: 600,
          border: "1px solid #e2e8f0",
        }}>
          + New Case Study
        </Link>
      </div>

      {/* Recent articles */}
      <div style={{ background: "white", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{ padding: "14px 20px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", margin: 0 }}>Recent Articles</h2>
          <Link href="/admin/articles" style={{ color: "#E8601A", fontSize: 13, textDecoration: "none", fontWeight: 500 }}>View all →</Link>
        </div>
        {!recent || recent.length === 0 ? (
          <div style={{ padding: "36px", textAlign: "center", color: "#94a3b8", fontSize: 14 }}>
            No articles yet. <Link href="/admin/articles/new" style={{ color: "#E8601A" }}>Create your first article.</Link>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {recent.map(({ id, title, category, date, published }) => (
                <tr key={id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "12px 20px" }}>
                    <Link href={`/admin/articles/${id}`} style={{ color: "#0f172a", fontWeight: 500, fontSize: 14, textDecoration: "none" }}>{title}</Link>
                  </td>
                  <td style={{ padding: "12px 20px", color: "#64748b", fontSize: 13 }}>{category}</td>
                  <td style={{ padding: "12px 20px", color: "#64748b", fontSize: 13 }}>{date}</td>
                  <td style={{ padding: "12px 20px" }}>
                    <span style={{
                      fontSize: 12, fontWeight: 600, padding: "2px 9px", borderRadius: 999,
                      background: published ? "rgba(34,197,94,0.1)" : "rgba(100,116,139,0.1)",
                      color: published ? "#16a34a" : "#64748b",
                    }}>
                      {published ? "Published" : "Draft"}
                    </span>
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
