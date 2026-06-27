import { createClient } from "../lib/supabase-server";

const BASE_URL = "https://limadata.co.id";

const STATIC_ROUTES = [
  { url: "/",                          priority: 1.0, changeFrequency: "weekly"  },
  { url: "/about",                     priority: 0.8, changeFrequency: "monthly" },
  { url: "/services/seo",              priority: 0.9, changeFrequency: "monthly" },
  { url: "/services/writing",          priority: 0.9, changeFrequency: "monthly" },
  { url: "/services/sem",              priority: 0.9, changeFrequency: "monthly" },
  { url: "/services/web-development",  priority: 0.9, changeFrequency: "monthly" },
  { url: "/services/app-development",  priority: 0.9, changeFrequency: "monthly" },
  { url: "/services/ui-ux-design",     priority: 0.9, changeFrequency: "monthly" },
  { url: "/articles",                  priority: 0.8, changeFrequency: "daily"   },
  { url: "/case-studies",              priority: 0.8, changeFrequency: "monthly" },
];

export default async function sitemap() {
  const supabase = createClient();

  const [{ data: articles }, { data: caseStudies }] = await Promise.all([
    supabase.from("articles").select("slug, updated_at").eq("published", true),
    supabase.from("case_studies").select("slug, updated_at").eq("published", true),
  ]);

  const staticEntries = STATIC_ROUTES.map(({ url, priority, changeFrequency }) => ({
    url: `${BASE_URL}${url}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  const articleEntries = (articles ?? []).map((a) => ({
    url: `${BASE_URL}/articles/${a.slug}`,
    lastModified: a.updated_at ? new Date(a.updated_at) : new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const caseStudyEntries = (caseStudies ?? []).map((cs) => ({
    url: `${BASE_URL}/case-studies/${cs.slug}`,
    lastModified: cs.updated_at ? new Date(cs.updated_at) : new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...articleEntries, ...caseStudyEntries];
}
