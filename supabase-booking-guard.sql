-- Booking guard for multi-tenant public reservations
-- Goal:
-- 1. Remove invalid duplicate slot rows inside the same business
-- 2. Enforce one slot per business + barber + date + time
-- 3. Enforce one blocked-day row per business + barber + date
--
-- Safe for existing data:
-- - Keeps one row when duplicates already exist
-- - Does not touch Vision Barber data except invalid duplicates on the exact same slot

with ranked_appointments as (
  select
    ctid,
    row_number() over (
      partition by business_id, barber_id, date, time
      order by id desc
    ) as rn
  from public.appointments
  where business_id is not null
    and barber_id is not null
    and date is not null
    and time is not null
)
delete from public.appointments a
using ranked_appointments r
where a.ctid = r.ctid
  and r.rn > 1;

with ranked_blocked_days as (
  select
    ctid,
    row_number() over (
      partition by business_id, barber_id, date
      order by id desc
    ) as rn
  from public.blocked_days
  where business_id is not null
    and barber_id is not null
    and date is not null
)
delete from public.blocked_days d
using ranked_blocked_days r
where d.ctid = r.ctid
  and r.rn > 1;

create unique index if not exists appointments_business_slot_unique_idx
  on public.appointments (business_id, barber_id, date, time);

create unique index if not exists blocked_days_business_slot_unique_idx
  on public.blocked_days (business_id, barber_id, date);
