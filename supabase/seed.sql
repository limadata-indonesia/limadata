-- Limadata case studies — REAL portfolio projects.
-- Run once in the Supabase SQL editor. Re-running is safe: it clears the
-- table and re-inserts the same six rows.
--
-- ⚠️  The headline `change` values and the `metrics` numbers below are
--     PLACEHOLDERS. Replace them with verified client figures (here or in the
--     admin dashboard) before treating them as published claims.

begin;

delete from public.case_studies;

insert into public.case_studies
  (company, abbr, slug, description, change, service, bg, dot, sort_order, published,
   client_about, challenge, solution, metrics, services_list, timeline, content_html, hero_image_url)
values
  -- 1. CariKampus — Web Development & SEO
  (
    'CariKampus', 'CK', 'carikampus',
    'CariKampus set out to become Indonesia''s most complete university-and-career discovery platform. Limadata built the product end to end — a searchable campus directory, career content hub, and an SEO-ready architecture designed to capture high-intent student traffic.',
    '120k+', 'Web Development & SEO',
    'linear-gradient(135deg,#7a5a10,#3d2c07)', '#F4A900', 1, true,
    'CariKampus (Cari Kampus Cari Kerja) is an Indonesian platform that helps students discover universities and plan their careers in one place.',
    'The platform needed to launch with a large, searchable directory of campuses and career content while being structured to rank for thousands of long-tail student queries from day one.',
    'Limadata designed and built the platform on Next.js with a fast campus-search experience, clean content templates, and an SEO-first information architecture — server-rendered pages, structured data, and a scalable URL scheme for programmatic discovery.',
    '[{"value":"120k+","label":"Students reached","sublabel":"Placeholder — confirm with analytics"},{"value":"Top 3","label":"Rankings for target queries","sublabel":"Placeholder"},{"value":"<1.5s","label":"Largest Contentful Paint","sublabel":"Performance-tuned build"}]',
    '["Web Development", "SEO Services", "UI/UX Design"]',
    '[{"date":"Phase 1","title":"Architecture & SEO foundation","description":"Information architecture, URL scheme, and structured data designed for programmatic SEO."},{"date":"Phase 2","title":"Platform build","description":"Campus directory, search, and career content hub built on Next.js."},{"date":"Phase 3","title":"Launch & optimisation","description":"Performance tuning, indexing, and iterative content expansion."}]',
    '', ''
  ),
  -- 2. Sawdust — Web Development & UI/UX Design
  (
    'Sawdust', 'SD', 'sawdust',
    'Sawdust, a curated Indonesian furniture retailer, wanted an online showroom worthy of its designer pieces. Limadata built an elegant, performance-tuned storefront with a refined product catalogue and an editorial, brand-led feel.',
    '+180%', 'Web Development & UI/UX Design',
    'linear-gradient(135deg,#5c3a1c,#2e1d0e)', '#c08a4a', 2, true,
    'Sawdust is a leading Indonesian furniture retailer specialising in high-quality, curated pieces designed by international and local makers.',
    'Premium, curated furniture needs presentation that signals quality. The brand needed an online showroom that felt as considered as the pieces themselves while staying fast and easy to browse.',
    'Limadata designed and built a refined storefront with a clean product catalogue, generous imagery, and an editorial layout — tuned for performance so the high-resolution photography loads quickly across devices.',
    '[{"value":"+180%","label":"Catalogue engagement","sublabel":"Placeholder — confirm with analytics"},{"value":"100%","label":"Responsive across devices","sublabel":"Mobile-first build"},{"value":"A+","label":"Core Web Vitals","sublabel":"Placeholder"}]',
    '["Web Development", "UI/UX Design"]',
    '[{"date":"Phase 1","title":"Design system","description":"Editorial visual language and component library for the catalogue."},{"date":"Phase 2","title":"Storefront build","description":"Product catalogue and showroom pages built and performance-tuned."},{"date":"Phase 3","title":"Launch","description":"Imagery optimisation, QA, and go-live."}]',
    '', ''
  ),
  -- 3. Audio Workshop — Web Development & UI/UX Design
  (
    'Audio Workshop', 'AW', 'audio-workshop-indonesia',
    'Audio Workshop, a premium car-audio installer, needed a storefront that conveyed craftsmanship and made its catalogue easy to browse. Limadata designed and built a fast, image-rich site with a curated product showcase and a clear enquiry funnel.',
    '2.5×', 'Web Development & UI/UX Design',
    'linear-gradient(135deg,#7a1020,#2e0810)', '#ff4d5e', 3, true,
    'Audio Workshop Indonesia is a premium car-audio retailer and installation specialist.',
    'The business relied on word of mouth and social media but had no web presence that reflected the quality of its installations or guided prospects toward an enquiry.',
    'Limadata built an image-led Next.js site that showcases the product range and signature installs, with a streamlined enquiry path that turns browsers into qualified leads.',
    '[{"value":"2.5×","label":"Online enquiries","sublabel":"Placeholder — confirm with the client"},{"value":"100%","label":"Mobile responsive","sublabel":"Mobile-first build"},{"value":"<2s","label":"Time to interactive","sublabel":"Placeholder"}]',
    '["Web Development", "UI/UX Design"]',
    '[{"date":"Phase 1","title":"Brand & UX","description":"Visual direction and enquiry-focused user flow."},{"date":"Phase 2","title":"Build","description":"Product showcase and enquiry funnel built on Next.js."},{"date":"Phase 3","title":"Launch","description":"Asset optimisation and go-live."}]',
    '', ''
  ),
  -- 4. Luxhome — Web Development & UI/UX Design
  (
    'Luxhome', 'LH', 'luxhome',
    'Luxhome, a professional home-cleaning service, needed a landing page that booked jobs. Limadata translated its Figma design into a pixel-accurate, fully responsive site with a conversion-focused hero and a scrollable service showcase.',
    '98/100', 'Web Development & UI/UX Design',
    'linear-gradient(135deg,#024ab8,#01265c)', '#3da1ff', 4, true,
    'Luxhome is a professional home-cleaning service in Indonesia offering hydro cleaning, wet vacuum, general cleaning, and fogging disinfection.',
    'Luxhome had a polished Figma design but needed it built faithfully as a fast, fully responsive marketing site that drives booking enquiries.',
    'Limadata implemented the design pixel-for-pixel in Next.js with a conversion-focused hero slider, a scrollable service showcase, testimonials, and a clear contact funnel — fully responsive from a 390px phone up to desktop.',
    '[{"value":"98/100","label":"Lighthouse performance","sublabel":"Placeholder — confirm with an audit"},{"value":"1:1","label":"Figma-to-code fidelity","sublabel":"Pixel-accurate build"},{"value":"100%","label":"Responsive coverage","sublabel":"Mobile to desktop"}]',
    '["Web Development", "UI/UX Design"]',
    '[{"date":"Phase 1","title":"Design handoff","description":"Figma review and component breakdown."},{"date":"Phase 2","title":"Build","description":"Pixel-accurate, responsive implementation in Next.js."},{"date":"Phase 3","title":"Launch","description":"Cross-device QA, performance pass, and deployment."}]',
    '', ''
  ),
  -- 5. SEO Progress Tracker — App Development & SEO
  (
    'SEO Progress Tracker', 'ST', 'seo-progress-tracker',
    'Advant Labs needed to show clients SEO progress without manual reporting. Limadata built an internal dashboard that pulls Google Search Console metrics into clear, client-ready visualisations — turning hours of reporting into a live view.',
    '−60%', 'App Development & SEO',
    'linear-gradient(135deg,#0a5c4a,#042e26)', '#19c39a', 5, true,
    'An internal SEO reporting dashboard built for Advant Labs to track client progress using Google Search Console–led metrics.',
    'Reporting client SEO progress meant hours of manual exports and spreadsheets every cycle — slow, error-prone, and hard for clients to read.',
    'Limadata built a Next.js dashboard application that connects to Google Search Console, aggregates the key metrics, and presents them as clear, client-ready charts — replacing manual reporting with a live, shareable view.',
    '[{"value":"−60%","label":"Reporting time","sublabel":"Placeholder — confirm with the team"},{"value":"GSC","label":"Live data source","sublabel":"Google Search Console integration"},{"value":"Realtime","label":"Client-ready views","sublabel":"No manual exports"}]',
    '["App Development", "SEO Services"]',
    '[{"date":"Phase 1","title":"Data integration","description":"Google Search Console connection and metric pipeline."},{"date":"Phase 2","title":"Dashboard build","description":"Charts and client-ready reporting views."},{"date":"Phase 3","title":"Rollout","description":"Internal deployment and team onboarding."}]',
    '', ''
  ),
  -- 6. VAKHRANDI — Web Development & UI/UX Design
  (
    'VAKHRANDI', 'VK', 'vakhrandi',
    'Recording artist VAKHRANDI needed an official home for music, releases, and fan community. Limadata built a fast, immersive site that centralises streaming links, gallery, and social channels into one branded experience.',
    '3×', 'Web Development & UI/UX Design',
    'linear-gradient(135deg,#3a1a6e,#190a30)', '#9a6dff', 6, true,
    'VAKHRANDI is a recording artist whose official website hosts music, releases, gallery, and fan-community links.',
    'The artist''s presence was scattered across streaming and social platforms, with no central, branded home for fans to find everything.',
    'Limadata built an immersive, fast official site that brings releases, music videos, gallery, and every social and streaming channel into one cohesive, on-brand experience.',
    '[{"value":"3×","label":"Fan engagement","sublabel":"Placeholder — confirm with the client"},{"value":"1 hub","label":"All channels centralised","sublabel":"Streaming, social, gallery"},{"value":"100%","label":"Mobile responsive","sublabel":"Mobile-first build"}]',
    '["Web Development", "UI/UX Design"]',
    '[{"date":"Phase 1","title":"Brand & structure","description":"Immersive visual direction and content map."},{"date":"Phase 2","title":"Build","description":"Releases, gallery, and channel hub built and tuned."},{"date":"Phase 3","title":"Launch","description":"Final polish and go-live."}]',
    '', ''
  );

commit;
