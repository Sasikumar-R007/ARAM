-- Availability is optional during early volunteer sign-up (field hidden in UI for now).
alter table public.volunteers
  alter column availability drop not null;

alter table public.volunteers
  drop constraint if exists volunteers_availability_check;

alter table public.volunteers
  add constraint volunteers_availability_check
  check (availability is null or availability in ('weekdays', 'weekends', 'anytime'));
