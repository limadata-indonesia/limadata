-- Single-row about page settings table
-- Run in Supabase SQL Editor

create table if not exists public.about_page (
  id              int       primary key default 1,
  hero_tagline    text      not null default 'Who We Are',
  hero_title      text      not null default 'We help Indonesian businesses grow through SEO & GEO',
  hero_description text     not null default 'Limadata is a data-driven SEO and Generative Engine Optimization agency based in Indonesia. We combine technical expertise with content strategy to deliver measurable organic growth for our clients.',
  mission         text      not null default 'To empower Indonesian businesses with data-driven SEO strategies that generate sustainable, long-term organic growth.',
  vision          text      not null default 'To be the most trusted SEO and GEO partner for Indonesian brands competing in a rapidly evolving AI-first search landscape.',
  stats           jsonb     not null default '[{"value":"120+","label":"Clients Served"},{"value":"340%","label":"Avg Traffic Growth"},{"value":"5 yrs","label":"Industry Experience"},{"value":"98%","label":"Client Retention"}]',
  values_list     jsonb     not null default '[{"title":"Data First","description":"Every recommendation is backed by real analytics, not guesswork."},{"title":"Transparent Results","description":"You see every ranking, traffic movement, and conversion — always."},{"title":"Long-term Growth","description":"We build sustainable organic foundations, not short-lived tricks."},{"title":"Indonesian Market Focus","description":"We understand local search behaviour, language nuances, and culture."}]',
  team            jsonb     not null default '[]',
  content_html    text      not null default '',
  updated_at      timestamptz default now()
);

-- Seed the single row with defaults
insert into public.about_page (id) values (1) on conflict (id) do nothing;
