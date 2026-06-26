import { createClient } from "../../../../../lib/supabase-server";
import CaseStudyForm from "./CaseStudyForm";
import { notFound } from "next/navigation";

export default async function CaseStudyPage({ params }) {
  const isNew = params.id === "new";

  if (isNew) return <CaseStudyForm caseStudy={null} isNew />;

  const supabase = createClient();
  const { data, error } = await supabase.from("case_studies").select("*").eq("id", params.id).single();
  if (error) notFound();

  return <CaseStudyForm caseStudy={data} isNew={false} />;
}
