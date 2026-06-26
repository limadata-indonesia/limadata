import { getArticle, getAllSlugs } from "../../../lib/limadata-articles";
import { notFound } from "next/navigation";
import ArticlePage from "../../../components/LimadataArticlePage";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const article = getArticle(params.slug);
  if (!article) return {};
  return {
    title: `${article.title} | Limadata`,
    description: article.excerpt,
    alternates: { canonical: `https://limadata.co.id/articles/${params.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://limadata.co.id/articles/${params.slug}`,
      siteName: "Limadata",
      locale: "id_ID",
      type: "article",
      publishedTime: article.date,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
    },
  };
}

export default function Page({ params }) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    author: {
      "@type": "Person",
      name: article.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "Limadata",
      logo: {
        "@type": "ImageObject",
        url: "https://limadata.co.id/wp-content/uploads/2026/06/LOGO-LIMADATA-scaled-200x55.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://limadata.co.id/articles/${params.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <ArticlePage article={article} />
    </>
  );
}
