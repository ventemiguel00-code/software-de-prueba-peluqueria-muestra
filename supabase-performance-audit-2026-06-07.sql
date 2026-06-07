-- Auditoria y refuerzo de rendimiento multi-negocio.
-- Seguro para ejecutar varias veces: no borra datos ni modifica registros existentes.
-- Objetivo: acelerar consultas por negocio_id/business_id, agenda semanal y Realtime.

create index if not exists businesses_slug_lookup_idx
  on public.businesses (slug);

create index if not exists businesses_active_slug_idx
  on public.businesses (active, slug);

create index if not exists business_settings_business_lookup_idx
  on public.business_settings (business_id);

create index if not exists admin_accounts_business_user_idx
  on public.admin_accounts (business_id, admin_user);

create index if not exists barbers_business_active_idx
  on public.barbers (business_id, active);

create index if not exists barbers_business_created_idx
  on public.barbers (business_id, created_at);

create index if not exists services_business_active_idx
  on public.services (business_id, active);

create index if not exists services_business_created_idx
  on public.services (business_id, created_at);

create index if not exists appointments_business_date_idx
  on public.appointments (business_id, date);

create index if not exists appointments_business_barber_date_idx
  on public.appointments (business_id, barber_id, date);

create index if not exists appointments_business_barber_date_time_idx
  on public.appointments (business_id, barber_id, date, time);

create index if not exists appointments_business_status_date_idx
  on public.appointments (business_id, status, date);

create index if not exists appointments_business_visit_date_idx
  on public.appointments (business_id, visit_state, date);

create index if not exists blocked_days_business_barber_date_idx
  on public.blocked_days (business_id, barber_id, date);

create index if not exists barber_services_business_barber_active_idx
  on public.barber_services (business_id, barber_id, active);

create index if not exists barber_services_business_service_active_idx
  on public.barber_services (business_id, service_id, active);

-- Evita doble reserva/bloqueo del mismo slot cuando no existan duplicados activos.
do $$
begin
  if not exists (
    select 1
    from (
      select business_id, barber_id, date, time, count(*) as total
      from public.appointments
      where status in ('reserved', 'fixed', 'blocked')
      group by business_id, barber_id, date, time
      having count(*) > 1
    ) duplicated_slots
  ) then
    create unique index if not exists appointments_unique_active_slot_idx
      on public.appointments (business_id, barber_id, date, time)
      where status in ('reserved', 'fixed', 'blocked');
  else
    raise notice 'appointments_unique_active_slot_idx no se creo porque existen slots activos duplicados. Comparte la consulta de auditoria final para limpiarlos con seguridad.';
  end if;
end $$;

-- RPC liviano para el resumen del Super Admin.
create or replace function public.business_dashboard_summary(target_date date default current_date)
returns table (
  business_id text,
  total_barbers bigint,
  total_services bigint,
  reservations_today bigint
)
language sql
stable
as $$
  with barber_counts as (
    select business_id, count(*) as total_barbers
    from public.barbers
    group by business_id
  ),
  service_counts as (
    select business_id, count(*) as total_services
    from public.services
    group by business_id
  ),
  reservation_counts as (
    select business_id, count(*) as reservations_today
    from public.appointments
    where date = target_date
      and status in ('reserved', 'fixed')
    group by business_id
  )
  select
    b.id as business_id,
    coalesce(bc.total_barbers, 0) as total_barbers,
    coalesce(sc.total_services, 0) as total_services,
    coalesce(rc.reservations_today, 0) as reservations_today
  from public.businesses b
  left join barber_counts bc on bc.business_id = b.id
  left join service_counts sc on sc.business_id = b.id
  left join reservation_counts rc on rc.business_id = b.id;
$$;

-- Consultas de auditoria: deben devolver cero filas para confirmar aislamiento sano.
select 'appointments_without_business_id' as check_name, count(*) as total
from public.appointments
where business_id is null;

select 'barbers_without_business_id' as check_name, count(*) as total
from public.barbers
where business_id is null;

select 'services_without_business_id' as check_name, count(*) as total
from public.services
where business_id is null;

select 'blocked_days_without_business_id' as check_name, count(*) as total
from public.blocked_days
where business_id is null;

select
  business_id,
  barber_id,
  date,
  time,
  count(*) as duplicated_active_slots
from public.appointments
where status in ('reserved', 'fixed', 'blocked')
group by business_id, barber_id, date, time
having count(*) > 1
order by duplicated_active_slots desc, date desc;
