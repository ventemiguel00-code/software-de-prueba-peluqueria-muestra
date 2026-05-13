create table if not exists public.barber_services (
  id text primary key,
  barber_id text not null references public.barbers(id) on delete cascade,
  service_id text not null references public.services(id) on delete cascade,
  active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now())
);

create unique index if not exists barber_services_barber_id_service_id_idx
  on public.barber_services (barber_id, service_id);

alter table public.barber_services enable row level security;

drop policy if exists "barber_services_select_all" on public.barber_services;
create policy "barber_services_select_all"
  on public.barber_services
  for select
  using (true);

drop policy if exists "barber_services_insert_all" on public.barber_services;
create policy "barber_services_insert_all"
  on public.barber_services
  for insert
  with check (true);

drop policy if exists "barber_services_update_all" on public.barber_services;
create policy "barber_services_update_all"
  on public.barber_services
  for update
  using (true)
  with check (true);

drop policy if exists "barber_services_delete_all" on public.barber_services;
create policy "barber_services_delete_all"
  on public.barber_services
  for delete
  using (true);
