import { createClient } from "../../../../../lib/supabase-server";
import ArticleForm from "./ArticleForm";
import { notFound } from "next/navigation";

export default async function ArticlePage({ params }) {
  const isNew = params.id === "new";

  if (isNew) return <ArticleForm article={null} isNew />;

  const supabase = createClient();
  const { data, error } = await supabase.from("articles").select("*").eq("id", params.id).single();
  if (error) notFound();

  return <ArticleForm article={data} isNew={false} />;
}
