import { createClient } from "../../lib/supabase-server";
import AboutPage from "../../components/LimadataAboutPage";

export const metadata = {
  title: "About Limadata | Jasa SEO & GEO Indonesia",
  description: "Learn about Limadata — Indonesia's data-driven SEO and Generative Engine Optimization agency helping businesses grow organic traffic.",
  alternates: { canonical: "https://limadata.co.id/about" },
  openGraph: {
    title: "About Limadata | Jasa SEO & GEO Indonesia",
    description: "Learn about Limadata — Indonesia's data-driven SEO and GEO agency.",
    url: "https://limadata.co.id/about",
    siteName: "Limadata", locale: "id_ID",
  },
};

const DEFAULTS = {
  hero_tagline: "Who We Are",
  hero_title: "We help Indonesian businesses grow through SEO & GEO",
  hero_description: "Limadata is a data-driven SEO and Generative Engine Optimization agency based in Indonesia. We combine technical expertise with content strategy to deliver measurable organic growth for our clients.",
  mission: "To empower Indonesian businesses with data-driven SEO strategies that generate sustainable, long-term organic growth.",
  vision: "To be the most trusted SEO and GEO partner for Indonesian brands competing in a rapidly evolving AI-first search landscape.",
  stats: [
    { value: "120+", label: "Clients Served" },
    { value: "340%", label: "Avg Traffic Growth" },
    { value: "5 yrs", label: "Industry Experience" },
    { value: "98%",  label: "Client Retention" },
  ],
  values_list: [
    { title: "Data First",                description: "Every recommendation is backed by real analytics, not guesswork." },
    { title: "Transparent Results",       description: "You see every ranking, traffic movement, and conversion — always." },
    { title: "Long-term Growth",          description: "We build sustainable organic foundations, not short-lived tricks." },
    { title: "Indonesian Market Focus",   description: "We understand local search behaviour, language nuances, and culture." },
  ],
  team: [],
  content_html: "",
};

export default async function Page() {
  let about = DEFAULTS;
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const supabase = createClient();
      const { data } = await supabase.from("about_page").select("*").eq("id", 1).single();
      if (data) about = { ...DEFAULTS, ...data };
    }
  } catch (_) {}

  return <AboutPage about={about} />;
}
