create table if not exists public.businesses (
  id text primary key,
  business_name text not null,
  slug text not null unique,
  logo_url text default '',
  primary_color text default '',
  secondary_color text default '',
  background_url text default '',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.businesses (
  id,
  business_name,
  slug,
  logo_url,
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
  '#d4af37',
  '#111111',
  '',
  true
)
on conflict (id) do nothing;

alter table if exists public.barbers add column if not exists business_id text;
alter table if exists public.appointments add column if not exists business_id text;
alter table if exists public.blocked_days add column if not exists business_id text;
alter table if exists public.services add column if not exists business_id text;
alter table if exists public.barber_services add column if not exists business_id text;

update public.barbers set business_id = 'business_principal' where business_id is null;
update public.appointments set business_id = 'business_principal' where business_id is null;
update public.blocked_days set business_id = 'business_principal' where business_id is null;
update public.services set business_id = 'business_principal' where business_id is null;
update public.barber_services set business_id = 'business_principal' where business_id is null;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'barbers_business_id_fkey') then
    alter table public.barbers
      add constraint barbers_business_id_fkey foreign key (business_id) references public.businesses(id) on delete cascade;
  end if;
  if not exists (select 1 from pg_constraint where conname = 'appointments_business_id_fkey') then
    alter table public.appointments
      add constraint appointments_business_id_fkey foreign key (business_id) references public.businesses(id) on delete cascade;
  end if;
  if not exists (select 1 from pg_constraint where conname = 'blocked_days_business_id_fkey') then
    alter table public.blocked_days
      add constraint blocked_days_business_id_fkey foreign key (business_id) references public.businesses(id) on delete cascade;
  end if;
  if not exists (select 1 from pg_constraint where conname = 'services_business_id_fkey') then
    alter table public.services
      add constraint services_business_id_fkey foreign key (business_id) references public.businesses(id) on delete cascade;
  end if;
  if not exists (select 1 from pg_constraint where conname = 'barber_services_business_id_fkey') then
    alter table public.barber_services
      add constraint barber_services_business_id_fkey foreign key (business_id) references public.businesses(id) on delete cascade;
  end if;
end $$;
