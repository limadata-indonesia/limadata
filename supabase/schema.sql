-- Run this in your Supabase SQL editor

create table if not exists public.articles (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  category text not null default 'SEO',
  title text not null,
  excerpt text not null default '',
  date text not null default '',
  read_time text not null default '5 min read',
  author_name text not null default 'Hasan Ghazali',
  author_initials text not null default 'HG',
  author_role text not null default 'SEO Strategist, Limadata',
  content jsonb not null default '[]'::jsonb,
  published boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.articles enable row level security;

create policy "Public can read published articles"
  on public.articles for select to anon
  using (published = true);

create policy "Authenticated users have full access to articles"
  on public.articles for all to authenticated
  using (true) with check (true);

create table if not exists public.case_studies (
  id uuid default gen_random_uuid() primary key,
  company text not null,
  abbr text not null,
  description text not null,
  change text not null,
  service text not null,
  bg text not null default 'linear-gradient(135deg,#1d6e36,#0a3018)',
  dot text not null default '#2dbd5a',
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.case_studies enable row level security;

create policy "Public can read published case studies"
  on public.case_studies for select to anon
  using (published = true);

create policy "Authenticated users have full access to case studies"
  on public.case_studies for all to authenticated
  using (true) with check (true);
