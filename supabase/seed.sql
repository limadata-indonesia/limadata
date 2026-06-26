-- Dummy case studies seed — run once in the Supabase SQL editor
-- Safe to re-run: uses ON CONFLICT (company) DO NOTHING
-- Add a unique constraint first so the ON CONFLICT clause works:
alter table public.case_studies
  add constraint if not exists case_studies_company_key unique (company);

insert into public.case_studies
  (company, abbr, description, change, service, bg, dot, sort_order, published)
values
  (
    'Tokopedia',
    'TK',
    'Tokopedia''s product pages competed against established marketplaces with stronger domain authority. Limadata restructured category architecture, deployed schema markup, and built 240 editorial links — tripling organic revenue in six months.',
    '+340%',
    'SEO Services & Content Strategy',
    'linear-gradient(135deg,#1d6e36,#0a3018)',
    '#2dbd5a',
    1,
    true
  ),
  (
    'Traveloka',
    'TV',
    'With Google AI Overviews reshaping how travellers research flights and hotels, Traveloka needed to appear in AI-generated answers. Limadata''s GEO strategy lifted citation frequency from 12% to 68% across target queries.',
    '+180%',
    'GEO & AI Visibility',
    'linear-gradient(135deg,#0068c9,#003060)',
    '#3da1ff',
    2,
    true
  ),
  (
    'Kopi Kenangan',
    'KK',
    'Kopi Kenangan entered Jakarta''s saturated F&B market with zero organic presence. Limadata built a hyperlocal SEO foundation and paired it with precision Google Ads — resulting in a 425% surge in store-visit traffic within nine months.',
    '+425%',
    'SEO & SEM Services',
    'linear-gradient(135deg,#7a3b10,#3d1c07)',
    '#d4813a',
    3,
    true
  ),
  (
    'Halodoc',
    'HD',
    'Halodoc''s telehealth platform had 3,000+ pages missing health schema and Core Web Vitals issues costing ranking positions. Limadata''s technical audit and content refresh pushed 840 health queries to page one in four months.',
    '+215%',
    'Technical SEO & Content',
    'linear-gradient(135deg,#006e3c,#003a1e)',
    '#00c46a',
    4,
    true
  ),
  (
    'GoTo Financial',
    'GT',
    'GoTo Financial needed financial content that ranked, educated, and converted Indonesian audiences. Limadata''s writing team produced 60 long-form articles per quarter, growing organic lead volume by 290% in under a year.',
    '+290%',
    'Writing Services & SEO',
    'linear-gradient(135deg,#b04010,#5c200a)',
    '#E8601A',
    5,
    true
  ),
  (
    'Bukalapak',
    'BL',
    'Bukalapak''s Google Ads spend drove high clicks but poor checkout completion. Limadata re-architected campaign structure, rewrote ad copy, and advised on landing page UX — cutting cost-per-acquisition by 44% while doubling conversions.',
    '+167%',
    'SEM & UI/UX Consulting',
    'linear-gradient(135deg,#005f99,#003058)',
    '#2a9fd6',
    6,
    true
  )
on conflict (company) do nothing;
