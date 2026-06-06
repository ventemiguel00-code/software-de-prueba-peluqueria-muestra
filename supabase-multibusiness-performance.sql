-- Multi-business performance hardening
-- Safe to run on existing data. Does not delete records.

create unique index if not exists businesses_slug_idx on public.businesses (slug);
create index if not exists barbers_business_id_idx on public.barbers (business_id);
create index if not exists services_business_id_idx on public.services (business_id);
create index if not exists appointments_business_id_idx on public.appointments (business_id);
create index if not exists appointments_date_idx on public.appointments (date);
create index if not exists appointments_barber_id_idx on public.appointments (barber_id);
create index if not exists admin_accounts_business_id_idx on public.admin_accounts (business_id);
create index if not exists business_settings_business_id_idx on public.business_settings (business_id);

create or replace function public.business_dashboard_summary(target_date date default current_date)
returns table (
  business_id text,
  business_name text,
  slug text,
  active boolean,
  total_barbers bigint,
  total_services bigint,
  reservations_today bigint
)
language sql
stable
as $$
  with barber_counts as (
    select business_id, count(*)::bigint as total_barbers
    from public.barbers
    group by business_id
  ),
  service_counts as (
    select business_id, count(*)::bigint as total_services
    from public.services
    group by business_id
  ),
  reservation_counts as (
    select
      business_id,
      count(*)::bigint as reservations_today
    from public.appointments
    where date = target_date
      and status in ('reserved', 'fixed')
    group by business_id
  )
  select
    b.id as business_id,
    b.business_name,
    b.slug,
    b.active,
    coalesce(bc.total_barbers, 0) as total_barbers,
    coalesce(sc.total_services, 0) as total_services,
    coalesce(rc.reservations_today, 0) as reservations_today
  from public.businesses b
  left join barber_counts bc on bc.business_id = b.id
  left join service_counts sc on sc.business_id = b.id
  left join reservation_counts rc on rc.business_id = b.id
  order by b.created_at, b.business_name;
$$;

grant execute on function public.business_dashboard_summary(date) to anon, authenticated;

select
  business_id,
  business_name,
  slug,
  active,
  total_barbers,
  total_services,
  reservations_today
from public.business_dashboard_summary(current_date);
