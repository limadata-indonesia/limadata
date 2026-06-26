import ServicePage from "../../../components/ServicePage";
import { SERVICES } from "../../../lib/services-data";

const s = SERVICES.sem;

export const metadata = {
  title: s.metaTitle,
  description: s.metaDesc,
  alternates: { canonical: s.canonical },
  openGraph: { title: s.metaTitle, description: s.metaDesc, url: s.canonical, siteName: "Limadata", locale: "id_ID", type: "website" },
  twitter: { card: "summary_large_image", title: s.metaTitle, description: s.metaDesc },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Google Ads & SEM Services Indonesia",
  description: s.metaDesc,
  provider: { "@type": "Organization", name: "Limadata", url: "https://limadata.co.id" },
  areaServed: { "@type": "Country", name: "Indonesia" },
  url: s.canonical,
  serviceType: "Search Engine Marketing",
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ServicePage service={s} />
    </>
  );
}
