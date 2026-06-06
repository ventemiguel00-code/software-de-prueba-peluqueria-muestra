-- Transitional RLS hardening for the current multi-business frontend.
-- IMPORTANT:
-- This improves safety without breaking the current anon-client architecture,
-- but it is NOT the final tenant-isolation model for a true SaaS.
-- Full tenant RLS requires authenticated users or a backend/service layer
-- that can assert the caller business in JWT/app_metadata or on the server.

create extension if not exists pgcrypto;

create or replace function public.business_is_active(target_business_id text)
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.businesses b
    where b.id = target_business_id
      and b.active = true
  );
$$;

grant execute on function public.business_is_active(text) to anon, authenticated;

-- Remove the broad compatibility policies from the first hardening migration.
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
    if exists (
      select 1
      from pg_policies
      where schemaname = 'public'
        and tablename = tbl
        and policyname = 'allow_all_' || tbl
    ) then
      execute format('drop policy %I on public.%I', 'allow_all_' || tbl, tbl);
    end if;
  end loop;
end $$;

alter table public.businesses enable row level security;
alter table public.business_settings enable row level security;
alter table public.admin_accounts enable row level security;
alter table public.barbers enable row level security;
alter table public.services enable row level security;
alter table public.barber_services enable row level security;
alter table public.appointments enable row level security;
alter table public.blocked_days enable row level security;

-- Businesses:
-- Keep Super Admin compatible by allowing current CRUD shape, but reject malformed writes.
drop policy if exists businesses_read_all on public.businesses;
create policy businesses_read_all
on public.businesses
for select
to anon, authenticated
using (true);

drop policy if exists businesses_write_valid_shape on public.businesses;
create policy businesses_write_valid_shape
on public.businesses
for all
to anon, authenticated
using (true)
with check (
  id is not null
  and length(trim(id)) > 0
  and slug is not null
  and length(trim(slug)) > 0
  and business_name is not null
  and length(trim(business_name)) > 0
);

-- Tenant tables:
-- Only expose rows that belong to active businesses and only allow writes tied to active businesses.
drop policy if exists business_settings_active_business_only on public.business_settings;
create policy business_settings_active_business_only
on public.business_settings
for all
to anon, authenticated
using (public.business_is_active(business_id))
with check (public.business_is_active(business_id));

drop policy if exists admin_accounts_active_business_only on public.admin_accounts;
create policy admin_accounts_active_business_only
on public.admin_accounts
for all
to anon, authenticated
using (public.business_is_active(business_id))
with check (public.business_is_active(business_id));

drop policy if exists barbers_active_business_only on public.barbers;
create policy barbers_active_business_only
on public.barbers
for all
to anon, authenticated
using (public.business_is_active(business_id))
with check (public.business_is_active(business_id));

drop policy if exists services_active_business_only on public.services;
create policy services_active_business_only
on public.services
for all
to anon, authenticated
using (public.business_is_active(business_id))
with check (public.business_is_active(business_id));

drop policy if exists barber_services_active_business_only on public.barber_services;
create policy barber_services_active_business_only
on public.barber_services
for all
to anon, authenticated
using (public.business_is_active(business_id))
with check (public.business_is_active(business_id));

drop policy if exists appointments_active_business_only on public.appointments;
create policy appointments_active_business_only
on public.appointments
for all
to anon, authenticated
using (public.business_is_active(business_id))
with check (public.business_is_active(business_id));

drop policy if exists blocked_days_active_business_only on public.blocked_days;
create policy blocked_days_active_business_only
on public.blocked_days
for all
to anon, authenticated
using (public.business_is_active(business_id))
with check (public.business_is_active(business_id));

-- Verification
select
  pol.tablename,
  pol.policyname
from pg_policies pol
where pol.schemaname = 'public'
  and pol.tablename in (
    'businesses',
    'business_settings',
    'admin_accounts',
    'barbers',
    'services',
    'barber_services',
    'appointments',
    'blocked_days'
  )
order by pol.tablename, pol.policyname;

select
  b.id,
  b.business_name,
  b.slug,
  b.active,
  exists (
    select 1
    from public.business_settings bs
    where bs.business_id = b.id
  ) as has_settings
from public.businesses b
order by b.created_at, b.business_name;
