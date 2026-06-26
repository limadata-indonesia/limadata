import LimadataPage from "../components/LimadataPage";

export const metadata = {
  title: "Jasa SEO Indonesia Terpercaya | Limadata — Agency SEO & GEO",
  description:
    "Limadata adalah jasa SEO Indonesia terpercaya. Kami membantu bisnis Indonesia raih peringkat #1 di Google, tampil di AI Overview, ChatGPT & Gemini. Audit SEO gratis dalam 48 jam.",
  keywords: [
    "seo indonesia",
    "jasa seo indonesia",
    "agency seo indonesia",
    "seo jakarta",
    "jasa seo",
    "optimasi seo",
    "digital marketing indonesia",
    "geo optimization",
    "generative engine optimization",
    "ai seo",
    "seo agency indonesia",
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
    title: "Jasa SEO Indonesia Terpercaya | Limadata",
    description:
      "Agency SEO Indonesia yang membantu bisnis raih peringkat #1 di Google, tampil di AI Overview, ChatGPT & Gemini. Audit gratis dalam 48 jam.",
    url: "https://limadata.co.id",
    siteName: "Limadata",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "https://limadata.co.id/wp-content/uploads/2026/06/LOGO-LIMADATA-scaled-200x55.png",
        width: 1200,
        height: 630,
        alt: "Limadata — Jasa SEO Indonesia Terpercaya",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jasa SEO Indonesia Terpercaya | Limadata",
    description:
      "Agency SEO Indonesia yang membantu bisnis meraih peringkat #1 di Google dan tampil di AI Overview, ChatGPT & Gemini.",
    images: ["https://limadata.co.id/wp-content/uploads/2026/06/LOGO-LIMADATA-scaled-200x55.png"],
  },
};

const jsonLd = [
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
      "Limadata adalah agency SEO Indonesia terpercaya yang membantu bisnis meraih peringkat #1 di Google dan visibilitas di AI search seperti ChatGPT, Gemini, dan Perplexity.",
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
    isPartOf: { "@id": "https://limadata.co.id/#organization" },
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
        name: "Apa itu GEO dan mengapa bisnis Indonesia membutuhkannya?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "GEO (Generative Engine Optimization) adalah praktik mengoptimasi konten agar muncul dalam jawaban AI seperti ChatGPT, Google AI Overviews, Gemini, dan Perplexity. Semakin banyak konsumen Indonesia memulai perjalanan pencarian mereka dengan AI tools, sehingga visibilitas di sana semakin penting.",
        },
      },
      {
        "@type": "Question",
        name: "Apa yang membedakan Limadata dari agency SEO Indonesia lainnya?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sebagian besar agency SEO Indonesia hanya fokus pada peringkat Google. Limadata mencakup seluruh lanskap pencarian modern — Google, Bing, dan platform AI — menggunakan data nyata dari Google Search Console, analisis kompetitor, dan AI citation tracking. Kami juga spesialis pasar Indonesia termasuk keyword research Bahasa Indonesia dan link-building lokal.",
        },
      },
      {
        "@type": "Question",
        name: "Berapa lama SEO membutuhkan waktu untuk menampilkan hasil di Indonesia?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Untuk perbaikan teknis SEO dan on-page, Anda biasanya melihat peningkatan peringkat dalam 4–8 minggu. Program konten dan link-building membangun momentum selama 3–6 bulan. Klien biasanya mencapai peningkatan traffic organik 2–3× dalam 6 bulan engagement penuh.",
        },
      },
      {
        "@type": "Question",
        name: "Apa yang termasuk dalam audit SEO gratis Limadata?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Audit gratis mencakup data Google Search Console Anda, pemeriksaan kesehatan situs, peluang keyword teratas, penilaian kehadiran GEO, dan analisis kesenjangan kompetitor. Anda menerima laporan tertulis dengan rekomendasi prioritas dalam 48 jam.",
        },
      },
    ],
  },
];

export default function Page() {
  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <LimadataPage />
    </>
  );
}
