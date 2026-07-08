-- Habilita videos de fondo para la agenda publica reutilizando el bucket logos-negocios.
-- Seguro de ejecutar multiples veces.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'logos-negocios',
  'logos-negocios',
  true,
  10485760,
  array[
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp',
    'video/mp4',
    'video/webm'
  ]
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

select id, name, public, file_size_limit, allowed_mime_types
from storage.buckets
where id = 'logos-negocios';
