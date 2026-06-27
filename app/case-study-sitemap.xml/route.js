import { createClient } from "../../lib/supabase-server";

const BASE_URL = "https://limadata.co.id";

export async function GET() {
  const supabase = createClient();
  const { data: caseStudies } = await supabase
    .from("case_studies")
    .select("slug, updated_at")
    .eq("published", true)
    .order("updated_at", { ascending: false });

  const urls = (caseStudies ?? [])
    .map(({ slug, updated_at }) => {
      const lastmod = updated_at
        ? new Date(updated_at).toISOString()
        : new Date().toISOString();
      return `
  <url>
    <loc>${BASE_URL}/case-studies/${slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
