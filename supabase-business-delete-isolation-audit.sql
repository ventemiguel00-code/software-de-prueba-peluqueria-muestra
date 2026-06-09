-- Auditoria segura de aislamiento multi-negocio antes/despues de eliminar barberias.
-- Este archivo NO borra datos. Ejecutalo en Supabase SQL Editor para revisar
-- si existen filas huerfanas, sin business_id o asignadas al negocio equivocado.

-- 1) Negocios registrados.
select
  id,
  business_name,
  slug,
  active,
  created_at,
  updated_at
from public.businesses
order by created_at nulls last, business_name;

-- 2) Conteo de datos operativos por negocio.
select
  b.id as business_id,
  b.business_name,
  b.slug,
  (select count(*) from public.barbers bs where bs.business_id = b.id) as barbers,
  (select count(*) from public.services sv where sv.business_id = b.id) as services,
  (select count(*) from public.appointments ap where ap.business_id = b.id) as appointments,
  (select count(*) from public.blocked_days bd where bd.business_id = b.id) as blocked_days,
  (select count(*) from public.barber_services brs where brs.business_id = b.id) as barber_services,
  (select count(*) from public.admin_accounts aa where aa.business_id = b.id) as admin_accounts,
  (select count(*) from public.business_settings cfg where cfg.business_id = b.id) as business_settings
from public.businesses b
order by b.created_at nulls last, b.business_name;

-- 3) Registros sin business_id. Deben quedar en 0 para evitar mezclas.
select 'barbers' as table_name, count(*) as rows_without_business_id
from public.barbers
where business_id is null
union all
select 'services', count(*)
from public.services
where business_id is null
union all
select 'appointments', count(*)
from public.appointments
where business_id is null
union all
select 'blocked_days', count(*)
from public.blocked_days
where business_id is null
union all
select 'barber_services', count(*)
from public.barber_services
where business_id is null
union all
select 'admin_accounts', count(*)
from public.admin_accounts
where business_id is null
union all
select 'business_settings', count(*)
from public.business_settings
where business_id is null;

-- 4) Registros con business_id que no existe en businesses.
select 'barbers' as table_name, count(*) as orphan_rows
from public.barbers t
where t.business_id is not null
  and not exists (select 1 from public.businesses b where b.id = t.business_id)
union all
select 'services', count(*)
from public.services t
where t.business_id is not null
  and not exists (select 1 from public.businesses b where b.id = t.business_id)
union all
select 'appointments', count(*)
from public.appointments t
where t.business_id is not null
  and not exists (select 1 from public.businesses b where b.id = t.business_id)
union all
select 'blocked_days', count(*)
from public.blocked_days t
where t.business_id is not null
  and not exists (select 1 from public.businesses b where b.id = t.business_id)
union all
select 'barber_services', count(*)
from public.barber_services t
where t.business_id is not null
  and not exists (select 1 from public.businesses b where b.id = t.business_id)
union all
select 'admin_accounts', count(*)
from public.admin_accounts t
where t.business_id is not null
  and not exists (select 1 from public.businesses b where b.id = t.business_id)
union all
select 'business_settings', count(*)
from public.business_settings t
where t.business_id is not null
  and not exists (select 1 from public.businesses b where b.id = t.business_id);

-- 5) Posibles datos demo de Vision Barber replicados en otros negocios.
-- Si aparecen filas aqui, revisarlas manualmente antes de borrar negocios.
select
  b.business_name,
  b.slug,
  bs.business_id,
  bs.id as barber_id,
  bs.name as barber_name
from public.barbers bs
join public.businesses b on b.id = bs.business_id
where bs.business_id <> 'business_principal'
  and (
    lower(coalesce(bs.name, '')) in ('mateo rivas', 'dante molina', 'elias torres', 'simón vera', 'simon vera')
    or bs.id in ('barber_mateo', 'barber_dante', 'barber_elias', 'barber_simon')
  )
order by b.business_name, bs.name;

select
  b.business_name,
  b.slug,
  sv.business_id,
  sv.id as service_id,
  sv.name as service_name
from public.services sv
join public.businesses b on b.id = sv.business_id
where sv.business_id <> 'business_principal'
  and lower(coalesce(sv.name, '')) in ('solo corte', 'corte clasico', 'corte clásico', 'corte + barba', 'barba', 'cejas', 'diseño', 'diseno')
order by b.business_name, sv.name;

-- 6) Verificacion puntual antes de eliminar un negocio.
-- Reemplaza EL_BUSINESS_ID_A_BORRAR por el id real y ejecuta.
/*
select 'barbers' as table_name, count(*) from public.barbers where business_id = 'EL_BUSINESS_ID_A_BORRAR'
union all select 'services', count(*) from public.services where business_id = 'EL_BUSINESS_ID_A_BORRAR'
union all select 'appointments', count(*) from public.appointments where business_id = 'EL_BUSINESS_ID_A_BORRAR'
union all select 'blocked_days', count(*) from public.blocked_days where business_id = 'EL_BUSINESS_ID_A_BORRAR'
union all select 'barber_services', count(*) from public.barber_services where business_id = 'EL_BUSINESS_ID_A_BORRAR'
union all select 'admin_accounts', count(*) from public.admin_accounts where business_id = 'EL_BUSINESS_ID_A_BORRAR'
union all select 'business_settings', count(*) from public.business_settings where business_id = 'EL_BUSINESS_ID_A_BORRAR';
*/
