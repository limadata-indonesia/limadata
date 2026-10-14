export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api"] },
    sitemap: "https://limadata.web.id/sitemap.xml",
    host: "https://limadata.web.id",
  };
}
