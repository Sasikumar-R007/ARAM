import { createServerFn } from "@tanstack/react-start";
import { requireAdminSession } from "@/lib/admin/session";
import { nextReportRefId, nextSupabaseRefId } from "@/lib/admin/refs";
import { reportStore, type NotifySignup, type Report, type Volunteer } from "./db";
import { mapNotifySignup, mapVolunteer } from "./supabase/mappers";
import { getSupabaseAdmin } from "./supabase/server";

export const submitReport = createServerFn({ method: "POST" })
  .validator((data: Omit<Report, "id" | "status" | "createdAt">) => data)
  .handler(async ({ data }) => {
    const newReport: Report = {
      ...data,
      id: nextReportRefId(),
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    reportStore.reports.push(newReport);
    return { success: true, report: newReport };
  });

export const submitVolunteer = createServerFn({ method: "POST" })
  .validator((data: Omit<Volunteer, "id" | "referenceId" | "status" | "createdAt">) => data)
  .handler(async ({ data }) => {
    const supabase = getSupabaseAdmin();
    const referenceId = await nextSupabaseRefId("volunteers", "AV");

    const { data: row, error } = await supabase
      .from("volunteers")
      .insert({
        reference_id: referenceId,
        name: data.name.trim(),
        contact: data.contact.trim(),
        location: data.location.trim(),
        availability: data.availability,
        reason: data.reason?.trim() ?? "",
        status: "active",
      })
      .select()
      .single();

    if (error) {
      console.error("[submitVolunteer]", error);
      throw new Error("Failed to save volunteer registration");
    }

    return { success: true, volunteer: mapVolunteer(row) };
  });

export const getReports = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminSession();
  return [...reportStore.reports].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
});

export const getVolunteers = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminSession();
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("volunteers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[getVolunteers]", error);
    throw new Error("Failed to load volunteers");
  }

  return (data ?? []).map(mapVolunteer);
});

export const submitNotifySignup = createServerFn({ method: "POST" })
  .validator((data: Pick<NotifySignup, "name" | "email">) => data)
  .handler(async ({ data }) => {
    const supabase = getSupabaseAdmin();
    const email = data.email.trim().toLowerCase();
    const name = data.name.trim();

    const { data: existing, error: lookupError } = await supabase
      .from("notify_signups")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (lookupError) {
      console.error("[submitNotifySignup lookup]", lookupError);
      throw new Error("Failed to check notify signup");
    }

    if (existing) {
      return {
        success: true,
        signup: mapNotifySignup(existing),
        alreadyRegistered: true,
      };
    }

    const { data: row, error } = await supabase
      .from("notify_signups")
      .insert({ name, email, reference_id: await nextSupabaseRefId("notify_signups", "AN") })
      .select()
      .single();

    if (error) {
      console.error("[submitNotifySignup insert]", error);
      throw new Error("Failed to save notify signup");
    }

    return {
      success: true,
      signup: mapNotifySignup(row),
      alreadyRegistered: false,
    };
  });

export const getNotifySignups = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminSession();
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("notify_signups")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[getNotifySignups]", error);
    throw new Error("Failed to load notify signups");
  }

  return (data ?? []).map(mapNotifySignup);
});

/** Public-facing counts for the landing page — no PII */
export const getPublicStats = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = getSupabaseAdmin();

  const [volunteersResult, notifyResult] = await Promise.all([
    supabase.from("volunteers").select("location"),
    supabase.from("notify_signups").select("id", { count: "exact", head: true }),
  ]);

  if (volunteersResult.error) {
    console.error("[getPublicStats volunteers]", volunteersResult.error);
  }
  if (notifyResult.error) {
    console.error("[getPublicStats notify]", notifyResult.error);
  }

  const volunteers = volunteersResult.data ?? [];
  const locations = new Set(
    volunteers
      .map((v) => v.location?.trim().toLowerCase())
      .filter((loc): loc is string => Boolean(loc)),
  );

  return {
    volunteers: volunteers.length,
    notifySignups: notifyResult.count ?? 0,
    reports: reportStore.reports.length,
    areas: locations.size,
  };
});

export const updateReportStatus = createServerFn({ method: "POST" })
  .validator((data: { id: string; status: Report["status"] }) => data)
  .handler(async ({ data }) => {
    await requireAdminSession();
    const report = reportStore.reports.find((r) => r.id === data.id);
    if (report) {
      report.status = data.status;
      return { success: true };
    }
    return { success: false, error: "Not found" };
  });
