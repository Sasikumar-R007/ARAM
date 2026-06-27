-- Run this in Supabase → SQL Editor if volunteer/notify signup returns "permission denied"
-- (happens when "Automatically expose new tables" is disabled)

grant usage on schema public to service_role;
grant select, insert on public.volunteers to service_role;
grant select, insert on public.notify_signups to service_role;

grant insert on public.volunteers to anon, authenticated;
grant insert on public.notify_signups to anon, authenticated;
