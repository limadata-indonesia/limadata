-- Add SEO meta fields to articles table
-- Run once in Supabase SQL Editor

alter table public.articles
  add column if not exists focus_keyword    text not null default '',
  add column if not exists meta_title       text not null default '',
  add column if not exists meta_description text not null default '';
