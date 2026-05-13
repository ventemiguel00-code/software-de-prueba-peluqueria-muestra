create table if not exists public.services (
  id text primary key,
  service_name text not null,
  service_value numeric(12,2) not null default 0,
  admin_percentage integer not null default 50,
  barber_percentage integer not null default 50,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint services_percentage_sum_check check (admin_percentage + barber_percentage = 100)
);

create index if not exists services_created_at_idx on public.services (created_at desc);

create or replace function public.set_services_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_services_updated_at on public.services;

create trigger trg_services_updated_at
before update on public.services
for each row
execute function public.set_services_updated_at();

alter table public.services enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'services'
      and policyname = 'Allow anonymous full access to services'
  ) then
    create policy "Allow anonymous full access to services"
      on public.services
      for all
      to anon
      using (true)
      with check (true);
  end if;
end;
$$;
