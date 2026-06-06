create extension if not exists pgcrypto;

alter table if exists public.barbers
  add column if not exists password_hash text;

update public.barbers
set password_hash = encode(digest(coalesce(password, ''), 'sha256'), 'hex')
where coalesce(password_hash, '') = ''
  and coalesce(password, '') <> '';

create index if not exists barbers_business_user_idx
  on public.barbers (business_id, "user");
