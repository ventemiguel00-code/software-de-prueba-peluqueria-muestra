alter table if exists public.admin_accounts
  add column if not exists password text not null default '';

update public.admin_accounts
set password = ''
where password is null;
