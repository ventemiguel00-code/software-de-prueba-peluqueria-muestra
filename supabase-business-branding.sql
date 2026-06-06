-- Business branding support: logos per business and optional color columns.
-- Safe to run on existing data. It does not delete records.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'logos-negocios',
  'logos-negocios',
  true,
  5242880,
  array['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists logos_negocios_public_read on storage.objects;
create policy logos_negocios_public_read
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'logos-negocios');

drop policy if exists logos_negocios_public_insert on storage.objects;
create policy logos_negocios_public_insert
on storage.objects
for insert
to anon, authenticated
with check (bucket_id = 'logos-negocios');

drop policy if exists logos_negocios_public_update on storage.objects;
create policy logos_negocios_public_update
on storage.objects
for update
to anon, authenticated
using (bucket_id = 'logos-negocios')
with check (bucket_id = 'logos-negocios');

alter table public.businesses add column if not exists color_fondo text default '#050505';
alter table public.businesses add column if not exists color_texto text default '#ffffff';
alter table public.businesses add column if not exists color_boton text default '#f5d76e';

create index if not exists businesses_slug_idx on public.businesses (slug);
create index if not exists business_settings_business_id_idx on public.business_settings (business_id);

select id, name, public, file_size_limit
from storage.buckets
where id = 'logos-negocios';
