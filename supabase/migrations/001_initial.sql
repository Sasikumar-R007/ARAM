-- ARAM: volunteers + launch notify signups
-- Run in Supabase Dashboard → SQL Editor, or via Supabase CLI

create extension if not exists "pgcrypto";

create table if not exists public.volunteers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contact text not null,
  location text not null,
  availability text not null check (availability in ('weekdays', 'weekends', 'anytime')),
  reason text not null default '',
  status text not null default 'active' check (status in ('active', 'inactive')),
  created_at timestamptz not null default now()
);

create table if not exists public.notify_signups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  created_at timestamptz not null default now(),
  constraint notify_signups_email_unique unique (email)
);

create index if not exists volunteers_created_at_idx on public.volunteers (created_at desc);
create index if not exists notify_signups_created_at_idx on public.notify_signups (created_at desc);

alter table public.volunteers enable row level security;
alter table public.notify_signups enable row level security;

-- Public can register (insert only). Reads go through the server service role.
create policy "Public can register as volunteer"
  on public.volunteers for insert
  to anon, authenticated
  with check (true);

create policy "Public can join notify list"
  on public.notify_signups for insert
  to anon, authenticated
  with check (true);

-- Required when "Automatically expose new tables" is disabled in Supabase project settings.
-- The Data API (service_role) needs explicit table grants.
grant usage on schema public to service_role;
grant select, insert on public.volunteers to service_role;
grant select, insert on public.notify_signups to service_role;

-- Optional: if you ever call the API with the publishable (anon) key from the client
grant insert on public.volunteers to anon, authenticated;
grant insert on public.notify_signups to anon, authenticated;
