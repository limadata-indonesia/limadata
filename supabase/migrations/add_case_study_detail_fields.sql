-- Add rich detail fields to case_studies for individual case study pages
-- Run in Supabase SQL Editor

alter table public.case_studies
  add column if not exists slug           text  not null default '',
  add column if not exists client_about   text  not null default '',
  add column if not exists challenge      text  not null default '',
  add column if not exists solution       text  not null default '',
  add column if not exists metrics        jsonb not null default '[]',
  add column if not exists services_list  jsonb not null default '[]',
  add column if not exists timeline       jsonb not null default '[]',
  add column if not exists content_html   text  not null default '',
  add column if not exists hero_image_url text  not null default '';

create unique index if not exists case_studies_slug_idx
  on public.case_studies (slug) where slug <> '';
