import LimadataPage from "../components/LimadataPage";
import { createClient } from "../lib/supabase-server";

export const metadata = {
  title: "Trusted SEO Agency in Indonesia | Limadata — SEO & GEO Agency",
  description:
    "Limadata is Indonesia's trusted SEO agency. We help Indonesian businesses reach #1 on Google and appear in AI Overviews, ChatGPT & Gemini. Free SEO audit in 48 hours.",
  keywords: [
    "seo indonesia",
    "seo agency indonesia",
    "indonesia seo services",
    "seo jakarta",
    "digital marketing indonesia",
    "geo optimization",
    "generative engine optimization",
    "ai seo",
    "search engine optimization indonesia",
    "limadata",
  ],
  authors: [{ name: "Limadata" }],
  creator: "Limadata",
  publisher: "Limadata",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
  alternates: { canonical: "https://limadata.co.id" },
  openGraph: {
    title: "Trusted SEO Agency in Indonesia | Limadata",
    description:
      "Indonesia's SEO agency helping businesses reach #1 on Google and appear in AI Overviews, ChatGPT & Gemini. Free audit in 48 hours.",
    url: "https://limadata.co.id",
    siteName: "Limadata",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://limadata.co.id/wp-content/uploads/2026/06/LOGO-LIMADATA-scaled-200x55.png",
        width: 1200,
        height: 630,
        alt: "Limadata — Trusted SEO Agency in Indonesia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trusted SEO Agency in Indonesia | Limadata",
    description:
      "Indonesia's SEO agency helping businesses reach #1 on Google and appear in AI Overviews, ChatGPT & Gemini.",
    images: ["https://limadata.co.id/wp-content/uploads/2026/06/LOGO-LIMADATA-scaled-200x55.png"],
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://limadata.co.id/#website",
    url: "https://limadata.co.id",
    name: "Limadata",
    description: "Indonesia's trusted SEO & GEO agency",
    publisher: { "@id": "https://limadata.co.id/#organization" },
    inLanguage: "id",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://limadata.co.id/articles?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://limadata.co.id/#organization",
    name: "Limadata",
    alternateName: "PT Lima Data Digital",
    url: "https://limadata.co.id",
    logo: {
      "@type": "ImageObject",
      url: "https://limadata.co.id/wp-content/uploads/2026/06/LOGO-LIMADATA-scaled-200x55.png",
      width: 200,
      height: 55,
    },
    description:
      "Limadata is Indonesia's trusted SEO agency helping businesses reach #1 on Google and gain visibility in AI search tools like ChatGPT, Gemini, and Perplexity.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. Jend. Sudirman Kav. 52–53, Senayan, Kebayoran Baru",
      addressLocality: "Jakarta Selatan",
      postalCode: "12190",
      addressCountry: "ID",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@limadata.co.id",
      contactType: "customer service",
      availableLanguage: ["Indonesian", "English"],
    },
    sameAs: [
      "https://linkedin.com/company/limadata",
      "https://instagram.com/limadata",
      "https://twitter.com/limadata",
      "https://youtube.com/@limadata",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://limadata.co.id/#business",
    name: "Limadata — Jasa SEO Indonesia",
    image: "https://limadata.co.id/wp-content/uploads/2026/06/LOGO-LIMADATA-scaled-200x55.png",
    description:
      "Jasa SEO Indonesia profesional: keyword research, on-page & technical SEO, link building, content strategy, GEO & AI visibility, SEM, serta web & app development.",
    url: "https://limadata.co.id",
    priceRange: "$$",
    telephone: "+62-21-5012-3456",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. Jend. Sudirman Kav. 52–53",
      addressLocality: "Jakarta Selatan",
      postalCode: "12190",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -6.2088,
      longitude: 106.8456,
    },
    areaServed: { "@type": "Country", name: "Indonesia" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Layanan SEO Indonesia Limadata",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SEO Services",
            description: "Optimasi mesin pencari untuk meraih peringkat #1 Google bagi bisnis Indonesia.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "GEO & AI Visibility",
            description: "Optimalkan konten agar muncul di Google AI Overview, ChatGPT, Gemini, dan Perplexity.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Writing Services",
            description: "Penulisan artikel SEO-friendly dan copywriting untuk meningkatkan visibilitas pencarian.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SEM Service",
            description: "Iklan Google Ads teroptimasi untuk mendatangkan leads berkualitas.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Website Development Services",
            description: "Pembangunan website cepat, aman, dan skalabel untuk bisnis Indonesia.",
          },
        },
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://limadata.co.id/#webpage",
    url: "https://limadata.co.id",
    name: "Jasa SEO Indonesia Terpercaya | Limadata",
    description:
      "Limadata adalah jasa SEO Indonesia terpercaya. Kami membantu bisnis Indonesia raih peringkat #1 di Google, tampil di AI Overview, ChatGPT & Gemini.",
    inLanguage: ["id", "en"],
    isPartOf: { "@id": "https://limadata.co.id/#website" },
    about: { "@id": "https://limadata.co.id/#business" },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://limadata.co.id" },
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How is Limadata different from other SEO agencies?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most agencies over-promise and under-report. At Limadata, every engagement starts with a data audit of your actual Search Console. You get a dedicated strategist, a transparent project board, and measurable KPIs agreed before we start.",
        },
      },
      {
        "@type": "Question",
        name: "How do I know SEO will be worth the investment?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Every strategy is built around clear KPIs, performance tracking, and data-driven decisions from day one. You'll have full visibility into how each channel contributes to growth, supported by transparent monthly reporting.",
        },
      },
      {
        "@type": "Question",
        name: "What is GEO and why does my Indonesian business need it?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "GEO (Generative Engine Optimization) is the practice of optimising your content to appear in AI-generated answers from ChatGPT, Google AI Overviews, Gemini, and Perplexity. As more Indonesian consumers start their search journey with AI tools, being cited in those answers drives brand authority and qualified traffic that standard SEO alone cannot reach.",
        },
      },
      {
        "@type": "Question",
        name: "How long does SEO take to show results in Indonesia?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For technical SEO and on-page fixes, you will typically see measurable ranking improvements within 4-8 weeks. Content and link-building programmes build momentum over 3-6 months. Clients typically achieve a 2-3x organic traffic increase within 6 months of a full engagement.",
        },
      },
      {
        "@type": "Question",
        name: "What does the free Limadata SEO audit include?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The free audit covers your current Google Search Console data, a site health check, top keyword opportunities, a GEO presence assessment, and a competitor gap analysis. You receive a written report with prioritised recommendations delivered within 48 hours.",
        },
      },
    ],
  },
];

// Real Limadata portfolio projects.
// NOTE: the `change` headline metrics below are PLACEHOLDERS — replace with
// verified client numbers before publishing (editable here or in the admin).
const FALLBACK_CASE_STUDIES = [
  {
    id: "static-1", company: "CariKampus", abbr: "CK", slug: "carikampus",
    description: "CariKampus set out to become Indonesia's most complete university-and-career discovery platform. Limadata built the product end to end — a searchable campus directory, career content hub, and an SEO-ready architecture designed to capture high-intent student traffic.",
    change: "120k+", service: "Web Development & SEO",
    bg: "linear-gradient(135deg,#7a5a10,#3d2c07)", dot: "#F4A900", sort_order: 1, published: true,
  },
  {
    id: "static-2", company: "Sawdust", abbr: "SD", slug: "sawdust",
    description: "Sawdust, a curated Indonesian furniture retailer, wanted an online showroom worthy of its designer pieces. Limadata built an elegant, performance-tuned storefront with a refined product catalogue and an editorial, brand-led feel.",
    change: "+180%", service: "Web Development & UI/UX Design",
    bg: "linear-gradient(135deg,#5c3a1c,#2e1d0e)", dot: "#c08a4a", sort_order: 2, published: true,
  },
  {
    id: "static-3", company: "Audio Workshop", abbr: "AW", slug: "audio-workshop-indonesia",
    description: "Audio Workshop, a premium car-audio installer, needed a storefront that conveyed craftsmanship and made its catalogue easy to browse. Limadata designed and built a fast, image-rich site with a curated product showcase and a clear enquiry funnel.",
    change: "2.5×", service: "Web Development & UI/UX Design",
    bg: "linear-gradient(135deg,#7a1020,#2e0810)", dot: "#ff4d5e", sort_order: 3, published: true,
  },
  {
    id: "static-4", company: "Luxhome", abbr: "LH", slug: "luxhome",
    description: "Luxhome, a professional home-cleaning service, needed a landing page that booked jobs. Limadata translated its Figma design into a pixel-accurate, fully responsive site with a conversion-focused hero and a scrollable service showcase.",
    change: "98/100", service: "Web Development & UI/UX Design",
    bg: "linear-gradient(135deg,#024ab8,#01265c)", dot: "#3da1ff", sort_order: 4, published: true,
  },
  {
    id: "static-5", company: "SEO Progress Tracker", abbr: "ST", slug: "seo-progress-tracker",
    description: "Advant Labs needed to show clients SEO progress without manual reporting. Limadata built an internal dashboard that pulls Google Search Console metrics into clear, client-ready visualisations — turning hours of reporting into a live view.",
    change: "−60%", service: "App Development & SEO",
    bg: "linear-gradient(135deg,#0a5c4a,#042e26)", dot: "#19c39a", sort_order: 5, published: true,
  },
  {
    id: "static-6", company: "VAKHRANDI", abbr: "VK", slug: "vakhrandi",
    description: "Recording artist VAKHRANDI needed an official home for music, releases, and fan community. Limadata built a fast, immersive site that centralises streaming links, gallery, and social channels into one branded experience.",
    change: "3×", service: "Web Development & UI/UX Design",
    bg: "linear-gradient(135deg,#3a1a6e,#190a30)", dot: "#9a6dff", sort_order: 6, published: true,
  },
];

export default async function Page() {
  let articles = [];
  let caseStudies = [];

  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    try {
      const supabase = createClient();
      const [{ data: a }, { data: c }] = await Promise.all([
        supabase.from("articles").select("*").eq("published", true).order("created_at", { ascending: false }),
        supabase.from("case_studies").select("*").eq("published", true).order("sort_order", { ascending: true }),
      ]);
      articles = a ?? [];
      caseStudies = c ?? [];
    } catch (_) {}
  }

  if (caseStudies.length === 0) caseStudies = FALLBACK_CASE_STUDIES;

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <LimadataPage articles={articles} caseStudies={caseStudies} />
    </>
  );
}
