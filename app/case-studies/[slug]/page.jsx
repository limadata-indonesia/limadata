import { createClient } from "../../../lib/supabase-server";
import { notFound } from "next/navigation";
import CaseStudyPage from "../../../components/LimadataCaseStudyPage";

const hasSupabase = () =>
  !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export async function generateMetadata({ params }) {
  if (!hasSupabase()) return {};
  try {
    const supabase = createClient();
    const { data: cs } = await supabase
      .from("case_studies")
      .select("company, description, slug")
      .eq("slug", params.slug)
      .eq("published", true)
      .single();
    if (!cs) return {};
    return {
      title: `${cs.company} Case Study | Limadata`,
      description: cs.description,
      alternates: { canonical: `https://limadata.co.id/case-studies/${params.slug}` },
      openGraph: {
        title: `${cs.company} Case Study | Limadata`,
        description: cs.description,
        url: `https://limadata.co.id/case-studies/${params.slug}`,
        siteName: "Limadata", locale: "id_ID", type: "article",
      },
    };
  } catch (_) { return {}; }
}

export default async function Page({ params }) {
  if (!hasSupabase()) notFound();

  const supabase = createClient();
  const { data: cs } = await supabase
    .from("case_studies")
    .select("*")
    .eq("slug", params.slug)
    .eq("published", true)
    .single();

  if (!cs) notFound();

  return <CaseStudyPage cs={cs} />;
}
