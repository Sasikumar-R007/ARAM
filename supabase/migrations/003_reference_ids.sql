-- Sequential ARAM reference IDs: AV26001 (volunteers), AN26001 (notify signups)

alter table public.volunteers
  add column if not exists reference_id text;

alter table public.notify_signups
  add column if not exists reference_id text;

create unique index if not exists volunteers_reference_id_unique
  on public.volunteers (reference_id)
  where reference_id is not null;

create unique index if not exists notify_signups_reference_id_unique
  on public.notify_signups (reference_id)
  where reference_id is not null;

-- Backfill existing rows in created_at order per calendar year
with numbered as (
  select
    id,
    'AV' || to_char(created_at, 'YY') || lpad(
      row_number() over (
        partition by to_char(created_at, 'YY')
        order by created_at
      )::text,
      3,
      '0'
    ) as ref
  from public.volunteers
  where reference_id is null
)
update public.volunteers v
set reference_id = n.ref
from numbered n
where v.id = n.id;

with numbered as (
  select
    id,
    'AN' || to_char(created_at, 'YY') || lpad(
      row_number() over (
        partition by to_char(created_at, 'YY')
        order by created_at
      )::text,
      3,
      '0'
    ) as ref
  from public.notify_signups
  where reference_id is null
)
update public.notify_signups n
set reference_id = numbered.ref
from numbered
where n.id = numbered.id;
