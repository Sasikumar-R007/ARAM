import { reportStore } from "@/lib/db";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export type AramRefPrefix = "AV" | "AR" | "AN";

export function currentYearSuffix(): string {
  return String(new Date().getFullYear() % 100).padStart(2, "0");
}

/** Format: AV26001 — prefix + 2-digit year + sequence (min 3 digits, grows beyond 999) */
export function formatAramRefId(prefix: AramRefPrefix, sequence: number): string {
  const yy = currentYearSuffix();
  const seq =
    sequence < 1000 ? String(sequence).padStart(3, "0") : String(sequence);
  return `${prefix}${yy}${seq}`;
}

export function parseRefSequence(refId: string, prefix: AramRefPrefix): number {
  const yearPrefix = `${prefix}${currentYearSuffix()}`;
  if (!refId.startsWith(yearPrefix) && !refId.startsWith(prefix)) return 0;
  const seqPart = refId.slice(prefix.length + 2);
  const parsed = parseInt(seqPart, 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function nextReportRefId(): string {
  const prefix: AramRefPrefix = "AR";
  const yearPrefix = `${prefix}${currentYearSuffix()}`;
  let maxSeq = 0;

  for (const report of reportStore.reports) {
    if (report.id.startsWith(yearPrefix)) {
      maxSeq = Math.max(maxSeq, parseRefSequence(report.id, prefix));
    }
  }

  return formatAramRefId(prefix, maxSeq + 1);
}

export async function nextSupabaseRefId(
  table: "volunteers" | "notify_signups",
  prefix: Extract<AramRefPrefix, "AV" | "AN">,
): Promise<string> {
  const supabase = getSupabaseAdmin();
  const pattern = `${prefix}${currentYearSuffix()}%`;

  const { data, error } = await supabase
    .from(table)
    .select("reference_id")
    .like("reference_id", pattern)
    .order("reference_id", { ascending: false })
    .limit(1);

  if (error) {
    console.error(`[nextSupabaseRefId ${table}]`, error);
    throw new Error("Failed to allocate reference id");
  }

  const last = data?.[0]?.reference_id as string | undefined;
  const nextSeq = last ? parseRefSequence(last, prefix) + 1 : 1;
  return formatAramRefId(prefix, nextSeq);
}
