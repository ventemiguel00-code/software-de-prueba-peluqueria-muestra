create table if not exists public.barbers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  username text not null unique,
  password_hash text not null,
  photo_url text,
  specialty text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  barber_id uuid not null references public.barbers(id) on delete cascade,
  appointment_date date not null,
  appointment_time time not null,
  status text not null check (status in ('reserved', 'fixed', 'blocked')),
  client_name text,
  whatsapp text,
  source text not null default 'admin' check (source in ('public', 'admin')),
  week_key text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (barber_id, appointment_date, appointment_time)
);

create table if not exists public.blocked_days (
  id uuid primary key default gen_random_uuid(),
  barber_id uuid not null references public.barbers(id) on delete cascade,
  blocked_date date not null,
  created_at timestamptz not null default now(),
  unique (barber_id, blocked_date)
);

alter publication supabase_realtime add table public.barbers;
alter publication supabase_realtime add table public.appointments;
alter publication supabase_realtime add table public.blocked_days;

-- Produccion: ejecutar semanalmente al iniciar una nueva semana.
-- Conserva citas fijas y bloqueos permanentes.
delete from public.appointments
where status = 'reserved'
  and week_key <> to_char(current_date, 'IYYY-"W"IW');
