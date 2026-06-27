-- Add WYSIWYG HTML content column
-- Run in Supabase SQL Editor after add_seo_fields.sql

alter table public.articles
  add column if not exists content_html text not null default '';
