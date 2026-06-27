import { createClient } from "../../../../lib/supabase-server";
import Link from "next/link";
import ArticlesTable from "./ArticlesTable";

export default async function ArticlesPage() {
  const supabase = createClient();
  const { data: articles } = await supabase
    .from("articles")
    .select("id, title, category, date, published, slug, created_at")
    .order("created_at", { ascending: false });

  const total     = articles?.length ?? 0;
  const published = articles?.filter(a => a.published).length ?? 0;
  const drafts    = total - published;

  return (
    <div style={{ padding: "28px 32px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 2px" }}>Articles</h1>
          <p style={{ color: "#94a3b8", fontSize: 12, margin: 0 }}>
            {total} total · {published} published · {drafts} draft{drafts !== 1 ? "s" : ""}
          </p>
        </div>
        <Link href="/admin/articles/new" style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "#E8601A", color: "white", padding: "8px 16px",
          borderRadius: 8, textDecoration: "none", fontSize: 13, fontWeight: 600,
          boxShadow: "0 1px 4px rgba(232,96,26,0.3)",
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
          New Article
        </Link>
      </div>

      <div style={{ background: "white", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
        <ArticlesTable articles={articles} />
      </div>
    </div>
  );
}
