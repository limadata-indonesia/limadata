import { createClient } from "../../../lib/supabase-server";
import { notFound } from "next/navigation";
import ArticlePage from "../../../components/LimadataArticlePage";

const hasSupabase = () =>
  !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export async function generateMetadata({ params }) {
  if (!hasSupabase()) return {};
  try {
    const supabase = createClient();
    const { data: article } = await supabase
      .from("articles")
      .select("title, excerpt, date, slug")
      .eq("slug", params.slug)
      .eq("published", true)
      .single();

    if (!article) return {};
    return {
      title: `${article.title} | Limadata`,
      description: article.excerpt,
      alternates: { canonical: `https://limadata.co.id/articles/${params.slug}` },
      openGraph: {
        title: article.title, description: article.excerpt,
        url: `https://limadata.co.id/articles/${params.slug}`,
        siteName: "Limadata", locale: "id_ID", type: "article",
      },
      twitter: { card: "summary_large_image", title: article.title, description: article.excerpt },
    };
  } catch (_) { return {}; }
}

export default async function Page({ params }) {
  if (!hasSupabase()) notFound();

  const supabase = createClient();
  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", params.slug)
    .eq("published", true)
    .single();

  if (!article) notFound();

  const mapped = {
    ...article,
    readTime: article.read_time,
    author: { name: article.author_name, initials: article.author_initials, role: article.author_role },
  };

  const schema = {
    "@context": "https://schema.org", "@type": "Article",
    headline: article.title, description: article.excerpt, datePublished: article.date,
    author: { "@type": "Person", name: article.author_name },
    publisher: { "@type": "Organization", name: "Limadata", logo: { "@type": "ImageObject", url: "https://limadata.co.id/wp-content/uploads/2026/06/LOGO-LIMADATA-scaled-200x55.png" } },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://limadata.co.id/articles/${params.slug}` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ArticlePage article={mapped} />
    </>
  );
}
