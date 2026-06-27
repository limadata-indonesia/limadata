const BASE_URL = "https://limadata.co.id";
const now = new Date().toISOString();

const PAGES = [
  { loc: "/",                         priority: "1.0", changefreq: "weekly"  },
  { loc: "/about",                     priority: "0.8", changefreq: "monthly" },
  { loc: "/articles",                  priority: "0.8", changefreq: "daily"   },
  { loc: "/case-studies",              priority: "0.8", changefreq: "monthly" },
  { loc: "/services/seo",              priority: "0.9", changefreq: "monthly" },
  { loc: "/services/writing",          priority: "0.9", changefreq: "monthly" },
  { loc: "/services/sem",              priority: "0.9", changefreq: "monthly" },
  { loc: "/services/web-development",  priority: "0.9", changefreq: "monthly" },
  { loc: "/services/app-development",  priority: "0.9", changefreq: "monthly" },
  { loc: "/services/ui-ux-design",     priority: "0.9", changefreq: "monthly" },
];

export async function GET() {
  const urls = PAGES.map(
    ({ loc, priority, changefreq }) => `
  <url>
    <loc>${BASE_URL}${loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  ).join("");

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
