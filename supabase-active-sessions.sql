create table if not exists public.active_sessions (
  id uuid primary key default gen_random_uuid(),
  session_token text not null unique,
  device_id text not null,
  role text not null check (role in ('super_admin', 'admin', 'barber')),
  business_id text null,
  user_id text not null,
  user_label text not null default '',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  closed_at timestamptz null,
  closed_reason text null
);

create index if not exists active_sessions_lookup_idx
  on public.active_sessions (role, business_id, user_id, active);

create index if not exists active_sessions_token_idx
  on public.active_sessions (session_token);

alter table public.active_sessions enable row level security;

drop policy if exists "active_sessions_anon_all" on public.active_sessions;
create policy "active_sessions_anon_all"
on public.active_sessions
for all
to anon
using (true)
with check (true);

drop policy if exists "active_sessions_authenticated_all" on public.active_sessions;
create policy "active_sessions_authenticated_all"
on public.active_sessions
for all
to authenticated
using (true)
with check (true);
