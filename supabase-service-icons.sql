create extension if not exists pgcrypto;

create table if not exists public.service_icons (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  image_data text not null,
  mime_type text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create unique index if not exists service_icons_name_idx
on public.service_icons (lower(name));

alter table public.services
add column if not exists service_icon_id uuid references public.service_icons(id) on delete set null;

create index if not exists services_service_icon_id_idx
on public.services(service_icon_id);

alter table public.service_icons enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'service_icons'
      and policyname = 'service_icons_select_anon'
  ) then
    create policy service_icons_select_anon
    on public.service_icons
    for select
    to anon
    using (true);
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'service_icons'
      and policyname = 'service_icons_select_authenticated'
  ) then
    create policy service_icons_select_authenticated
    on public.service_icons
    for select
    to authenticated
    using (true);
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'service_icons'
      and policyname = 'service_icons_insert_anon'
  ) then
    create policy service_icons_insert_anon
    on public.service_icons
    for insert
    to anon
    with check (true);
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'service_icons'
      and policyname = 'service_icons_insert_authenticated'
  ) then
    create policy service_icons_insert_authenticated
    on public.service_icons
    for insert
    to authenticated
    with check (true);
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'service_icons'
      and policyname = 'service_icons_update_anon'
  ) then
    create policy service_icons_update_anon
    on public.service_icons
    for update
    to anon
    using (true)
    with check (true);
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'service_icons'
      and policyname = 'service_icons_update_authenticated'
  ) then
    create policy service_icons_update_authenticated
    on public.service_icons
    for update
    to authenticated
    using (true)
    with check (true);
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'service_icons'
      and policyname = 'service_icons_delete_anon'
  ) then
    create policy service_icons_delete_anon
    on public.service_icons
    for delete
    to anon
    using (true);
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'service_icons'
      and policyname = 'service_icons_delete_authenticated'
  ) then
    create policy service_icons_delete_authenticated
    on public.service_icons
    for delete
    to authenticated
    using (true);
  end if;
end
$$;

grant select, insert, update, delete on public.service_icons to anon, authenticated;
