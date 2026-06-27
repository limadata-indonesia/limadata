-- Create a public storage bucket for article images
-- Run in Supabase SQL Editor

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'article-images',
  'article-images',
  true,
  5242880,  -- 5 MB per file
  array['image/jpeg','image/png','image/gif','image/webp','image/svg+xml']
)
on conflict (id) do nothing;

-- Allow authenticated users to upload
create policy "Auth users can upload images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'article-images');

-- Allow anyone to view images (public bucket)
create policy "Public image read"
  on storage.objects for select
  to public
  using (bucket_id = 'article-images');

-- Allow authenticated users to delete their own uploads
create policy "Auth users can delete images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'article-images');
