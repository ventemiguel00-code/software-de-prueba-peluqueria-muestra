-- Multi-tenant hardening migration
-- Safe, additive migration for the barber SaaS schema
-- Does not delete existing data
-- Preserves Vision Barber / business_principal as the default business

create extension if not exists pgcrypto;

-- 1. Core businesses table
create table if not exists public.businesses (
  id text primary key,
  business_name text not null,
  slug text not null unique,
  logo_url text default '',
  theme text default 'gold_black',
  primary_color text default '#d4af37',
  secondary_color text default '#111111',
  background_url text default '',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table if exists public.businesses
  add column if not exists business_name text,
  add column if not exists theme text default 'gold_black',
  add column if not exists logo_url text default '',
  add column if not exists primary_color text default '#d4af37',
  add column if not exists secondary_color text default '#111111',
  add column if not exists background_url text default '',
  add column if not exists active boolean default true,
  add column if not exists created_at timestamptz default now(),
  add column if not exists updated_at timestamptz default now();

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'businesses'
      and column_name = 'name'
  ) then
    execute '
      update public.businesses
      set business_name = coalesce(nullif(business_name, ''''), name)
      where business_name is null or business_name = ''''
    ';
  end if;
end $$;

insert into public.businesses (
  id,
  business_name,
  slug,
  logo_url,
  theme,
  primary_color,
  secondary_color,
  background_url,
  active
)
values (
  'business_principal',
  'Vision Barber',
  'barberia-principal',
  './assets/vision-barber-logo.avif',
  'gold_black',
  '#d4af37',
  '#111111',
  '',
  true
)
on conflict (id) do update
set
  business_name = coalesce(public.businesses.business_name, excluded.business_name),
  slug = coalesce(public.businesses.slug, excluded.slug);

create unique index if not exists businesses_slug_idx on public.businesses (slug);
create index if not exists businesses_active_idx on public.businesses (active);

-- 2. Business configuration / environment reference
create table if not exists public.business_settings (
  id text primary key default encode(gen_random_bytes(12), 'hex'),
  business_id text not null references public.businesses(id) on delete cascade,
  environment_archive_url text default '',
  environment_archive_name text default '',
  environment_archive_meta jsonb not null default '{}'::jsonb,
  public_path text not null default '/barberia/:slug',
  theme_override text default '',
  custom_domain text default '',
  notes text default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (business_id)
);

create index if not exists business_settings_business_id_idx on public.business_settings (business_id);

insert into public.business_settings (business_id, public_path)
select b.id, '/barberia/:slug'
from public.businesses b
where not exists (
  select 1 from public.business_settings s where s.business_id = b.id
);

-- 3. Optional admin accounts table for per-business admin persistence
create table if not exists public.admin_accounts (
  id text primary key,
  business_id text not null references public.businesses(id) on delete cascade,
  admin_name text not null,
  admin_user text not null,
  password_hash text not null default '',
  role text not null default 'admin_negocio',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists admin_accounts_business_user_idx
  on public.admin_accounts (business_id, admin_user);

create index if not exists admin_accounts_business_id_idx
  on public.admin_accounts (business_id);

-- 4. Add business_id to operational tables if missing
alter table if exists public.barbers add column if not exists business_id text;
alter table if exists public.services add column if not exists business_id text;
alter table if exists public.appointments add column if not exists business_id text;
alter table if exists public.blocked_days add column if not exists business_id text;
alter table if exists public.barber_services add column if not exists business_id text;

update public.barbers set business_id = 'business_principal' where business_id is null;
update public.services set business_id = 'business_principal' where business_id is null;
update public.appointments set business_id = 'business_principal' where business_id is null;
update public.blocked_days set business_id = 'business_principal' where business_id is null;
update public.barber_services set business_id = 'business_principal' where business_id is null;
update public.admin_accounts set business_id = 'business_principal' where business_id is null;

-- 5. Foreign keys to businesses
do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'barbers_business_id_fkey') then
    alter table public.barbers
      add constraint barbers_business_id_fkey
      foreign key (business_id) references public.businesses(id) on delete cascade;
  end if;

  if not exists (select 1 from pg_constraint where conname = 'services_business_id_fkey') then
    alter table public.services
      add constraint services_business_id_fkey
      foreign key (business_id) references public.businesses(id) on delete cascade;
  end if;

  if not exists (select 1 from pg_constraint where conname = 'appointments_business_id_fkey') then
    alter table public.appointments
      add constraint appointments_business_id_fkey
      foreign key (business_id) references public.businesses(id) on delete cascade;
  end if;

  if not exists (select 1 from pg_constraint where conname = 'blocked_days_business_id_fkey') then
    alter table public.blocked_days
      add constraint blocked_days_business_id_fkey
      foreign key (business_id) references public.businesses(id) on delete cascade;
  end if;

  if not exists (select 1 from pg_constraint where conname = 'barber_services_business_id_fkey') then
    alter table public.barber_services
      add constraint barber_services_business_id_fkey
      foreign key (business_id) references public.businesses(id) on delete cascade;
  end if;

  if not exists (select 1 from pg_constraint where conname = 'admin_accounts_business_id_fkey') then
    alter table public.admin_accounts
      add constraint admin_accounts_business_id_fkey
      foreign key (business_id) references public.businesses(id) on delete cascade;
  end if;
end $$;

-- 6. Business indexes for faster slug and tenant filtering
create index if not exists barbers_business_id_idx on public.barbers (business_id);
create index if not exists services_business_id_idx on public.services (business_id);
create index if not exists appointments_business_id_idx on public.appointments (business_id);
create index if not exists blocked_days_business_id_idx on public.blocked_days (business_id);
create index if not exists barber_services_business_id_idx on public.barber_services (business_id);

create index if not exists appointments_business_date_idx
  on public.appointments (business_id, date);

create index if not exists appointments_business_barber_date_idx
  on public.appointments (business_id, barber_id, date);

create index if not exists blocked_days_business_barber_date_idx
  on public.blocked_days (business_id, barber_id, date);

-- 7. Realtime
alter publication supabase_realtime add table public.businesses;
alter publication supabase_realtime add table public.business_settings;
alter publication supabase_realtime add table public.admin_accounts;
alter publication supabase_realtime add table public.barbers;
alter publication supabase_realtime add table public.services;
alter publication supabase_realtime add table public.barber_services;
alter publication supabase_realtime add table public.appointments;
alter publication supabase_realtime add table public.blocked_days;

-- 8. API exposure grants (compatible with current frontend architecture)
grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on public.businesses to anon, authenticated;
grant select, insert, update, delete on public.business_settings to anon, authenticated;
grant select, insert, update, delete on public.admin_accounts to anon, authenticated;
grant select, insert, update, delete on public.barbers to anon, authenticated;
grant select, insert, update, delete on public.services to anon, authenticated;
grant select, insert, update, delete on public.barber_services to anon, authenticated;
grant select, insert, update, delete on public.appointments to anon, authenticated;
grant select, insert, update, delete on public.blocked_days to anon, authenticated;

-- 9. Enable RLS on exposed tables
alter table public.businesses enable row level security;
alter table public.business_settings enable row level security;
alter table public.admin_accounts enable row level security;
alter table public.barbers enable row level security;
alter table public.services enable row level security;
alter table public.barber_services enable row level security;
alter table public.appointments enable row level security;
alter table public.blocked_days enable row level security;

-- 10. Compatibility policies for current app
do $$
declare
  tbl text;
begin
  foreach tbl in array array[
    'businesses',
    'business_settings',
    'admin_accounts',
    'barbers',
    'services',
    'barber_services',
    'appointments',
    'blocked_days'
  ]
  loop
    if not exists (
      select 1
      from pg_policies
      where schemaname = 'public'
        and tablename = tbl
        and policyname = 'allow_all_' || tbl
    ) then
      execute format(
        'create policy %I on public.%I for all to anon, authenticated using (true) with check (true)',
        'allow_all_' || tbl,
        tbl
      );
    end if;
  end loop;
end $$;

-- 11. Keep updated_at in sync
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_businesses_updated_at on public.businesses;
create trigger trg_businesses_updated_at
before update on public.businesses
for each row
execute function public.set_updated_at();

drop trigger if exists trg_business_settings_updated_at on public.business_settings;
create trigger trg_business_settings_updated_at
before update on public.business_settings
for each row
execute function public.set_updated_at();

drop trigger if exists trg_admin_accounts_updated_at on public.admin_accounts;
create trigger trg_admin_accounts_updated_at
before update on public.admin_accounts
for each row
execute function public.set_updated_at();

-- 12. Safety check output
select
  (select count(*) from public.businesses) as businesses_count,
  (select count(*) from public.business_settings) as business_settings_count,
  (select count(*) from public.barbers where business_id is not null) as barbers_with_business_id,
  (select count(*) from public.services where business_id is not null) as services_with_business_id,
  (select count(*) from public.appointments where business_id is not null) as appointments_with_business_id,
  (select count(*) from public.blocked_days where business_id is not null) as blocked_days_with_business_id;
