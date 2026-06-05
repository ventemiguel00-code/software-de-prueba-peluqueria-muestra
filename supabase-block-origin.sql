-- Distinguish manual blocked slots from full-day blocked slots
-- Safe additive migration for all businesses in the multi-tenant platform

alter table if exists public.appointments
  add column if not exists block_origin text default '';

update public.appointments
set block_origin = ''
where block_origin is null;

create index if not exists appointments_business_block_origin_idx
  on public.appointments (business_id, barber_id, date, block_origin);
