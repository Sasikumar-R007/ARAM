import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { Loader2, LogOut, Users, Bell, FileWarning } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { logoutAdmin, loginAdmin } from "@/lib/admin/auth";
import {
  getNotifySignups,
  getReports,
  getVolunteers,
  updateReportStatus,
} from "@/lib/api";

type Tab = "volunteers" | "notify" | "reports";

export function ControlCenter({ adminEmail }: { adminEmail: string }) {
  const [tab, setTab] = useState<Tab>("volunteers");
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: reports, refetch: refetchReports, isLoading: loadingReports } = useQuery({
    queryKey: ["admin-reports"],
    queryFn: () => getReports(),
  });

  const { data: volunteers, isLoading: loadingVolunteers } = useQuery({
    queryKey: ["admin-volunteers"],
    queryFn: () => getVolunteers(),
  });

  const { data: notifySignups, isLoading: loadingNotify } = useQuery({
    queryKey: ["admin-notify-signups"],
    queryFn: () => getNotifySignups(),
  });

  const handleLogout = async () => {
    await logoutAdmin();
    await queryClient.invalidateQueries();
    await router.invalidate();
  };

  const handleStatusChange = async (
    id: string,
    status: "pending" | "investigating" | "resolved",
  ) => {
    await updateReportStatus({ data: { id, status } });
    refetchReports();
  };

  const tabCls = (active: boolean) =>
    `block w-full cursor-pointer text-left px-4 py-3 text-sm uppercase tracking-widest transition ${
      active
        ? "bg-paper/10 text-gold border-l-2 border-gold"
        : "text-paper/60 hover:text-paper hover:bg-paper/5 border-l-2 border-transparent"
    }`;

  const stats = [
    {
      label: "Volunteers",
      value: volunteers?.length ?? "—",
      icon: Users,
    },
    {
      label: "Notify signups",
      value: notifySignups?.length ?? "—",
      icon: Bell,
    },
    {
      label: "Reports (session)",
      value: reports?.length ?? "—",
      icon: FileWarning,
    },
  ];

  return (
    <div className="min-h-screen bg-ink p-6 text-paper md:p-10">
      <header className="mb-10 flex flex-col gap-6 border-b border-paper/10 pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="hairline text-gold">Symphonix · ARAM</p>
          <h1 className="mt-2 font-serif text-3xl md:text-4xl">Control Center</h1>
          <p className="mt-2 text-sm text-paper/50">Signed in as {adminEmail}</p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="btn-interaction inline-flex cursor-pointer items-center gap-2 self-start rounded-sm border border-paper/25 px-4 py-2.5 text-[0.68rem] uppercase tracking-[0.22em] text-paper/70 transition hover:border-gold hover:text-gold"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </header>

      <div className="mb-10 grid gap-4 sm:grid-cols-3">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-sm border border-paper/10 bg-paper/5 p-5 transition hover:border-gold/30"
          >
            <div className="flex items-center justify-between">
              <p className="text-[0.68rem] uppercase tracking-[0.22em] text-paper/50">{label}</p>
              <Icon className="h-4 w-4 text-gold/70" />
            </div>
            <p className="mt-3 font-serif text-3xl text-paper">{value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-12 md:flex-row">
        <aside className="w-full space-y-2 md:w-64">
          <button type="button" onClick={() => setTab("volunteers")} className={tabCls(tab === "volunteers")}>
            Volunteer Registry
          </button>
          <button type="button" onClick={() => setTab("notify")} className={tabCls(tab === "notify")}>
            Notify Signups
          </button>
          <button type="button" onClick={() => setTab("reports")} className={tabCls(tab === "reports")}>
            Emergency Reports
          </button>
        </aside>

        <main className="min-w-0 flex-1">
          {tab === "volunteers" && (
            <RegistryTable
              title="Registered Volunteers"
              loading={loadingVolunteers}
              empty="No volunteers yet."
              columns={["Date", "Name", "Contact", "Location", "Availability", "Reason"]}
              rows={
                volunteers?.map((v) => [
                  new Date(v.createdAt).toLocaleDateString(),
                  v.name,
                  v.contact,
                  v.location,
                  v.availability,
                  v.reason || "—",
                ]) ?? []
              }
              highlightCol={1}
            />
          )}

          {tab === "notify" && (
            <RegistryTable
              title="Launch Notify List"
              loading={loadingNotify}
              empty="No notify signups yet."
              columns={["Date", "Name", "Email"]}
              rows={
                notifySignups?.map((s) => [
                  new Date(s.createdAt).toLocaleDateString(),
                  s.name,
                  s.email,
                ]) ?? []
              }
              highlightCol={1}
            />
          )}

          {tab === "reports" && (
            <div>
              <h2 className="mb-2 font-serif text-2xl">Recent Reports</h2>
              <p className="mb-6 text-sm text-paper/50">
                Stored in-memory for this server session until the reporting product launches.
              </p>
              {loadingReports ? (
                <LoadingRow />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-paper/20 text-paper/50">
                        <th className="pb-3 font-normal">Date</th>
                        <th className="pb-3 font-normal">Type</th>
                        <th className="pb-3 font-normal">Location</th>
                        <th className="pb-3 font-normal">Status</th>
                        <th className="pb-3 font-normal">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports?.map((r) => (
                        <tr key={r.id} className="border-b border-paper/10 hover:bg-paper/5">
                          <td className="py-4 text-paper/70">
                            {new Date(r.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-4 text-[0.65rem] uppercase tracking-widest text-gold">
                            {r.type}
                          </td>
                          <td className="py-4">{r.location}</td>
                          <td className="py-4">
                            <select
                              value={r.status}
                              onChange={(e) =>
                                handleStatusChange(
                                  r.id,
                                  e.target.value as "pending" | "investigating" | "resolved",
                                )
                              }
                              className="cursor-pointer rounded-sm border border-paper/20 bg-paper/10 px-2 py-1 text-xs"
                            >
                              <option value="pending" className="bg-ink">
                                Pending
                              </option>
                              <option value="investigating" className="bg-ink">
                                Investigating
                              </option>
                              <option value="resolved" className="bg-ink">
                                Resolved
                              </option>
                            </select>
                          </td>
                          <td className="py-4 text-paper/50">{r.notes || "—"}</td>
                        </tr>
                      ))}
                      {reports?.length === 0 && (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-paper/40">
                            No reports in this session.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function LoadingRow() {
  return (
    <div className="flex items-center gap-3 text-paper/60">
      <Loader2 className="animate-spin" /> Loading...
    </div>
  );
}

function RegistryTable({
  title,
  loading,
  empty,
  columns,
  rows,
  highlightCol = -1,
}: {
  title: string;
  loading: boolean;
  empty: string;
  columns: string[];
  rows: string[][];
  highlightCol?: number;
}) {
  return (
    <div>
      <h2 className="mb-6 font-serif text-2xl">{title}</h2>
      {loading ? (
        <LoadingRow />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-paper/20 text-paper/50">
                {columns.map((col) => (
                  <th key={col} className="pb-3 font-normal">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-paper/10 hover:bg-paper/5">
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={`py-4 ${j === highlightCol ? "font-medium text-gold" : j === 0 ? "text-paper/70" : ""} ${j === row.length - 1 && columns.length > 4 ? "max-w-xs truncate text-paper/50" : ""}`}
                      title={cell}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={columns.length} className="py-8 text-center text-paper/40">
                    {empty}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export function AdminLoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await loginAdmin({ data: { email, password } });
      if (!result.success) {
        toast.error(result.error ?? "Invalid email or password");
        return;
      }
      toast.success("Welcome back");
      onSuccess();
    } catch {
      toast.error("Unable to sign in. Check server configuration.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-6 py-16">
      <div className="film-grain pointer-events-none fixed inset-0 opacity-30" aria-hidden />
      <div className="relative w-full max-w-md border border-paper/15 bg-ink p-8 shadow-elegant md:p-10">
        <p className="hairline text-gold">ARAM · Internal</p>
        <h1 className="mt-4 font-serif text-3xl font-light text-paper">Control Center</h1>
        <p className="mt-2 text-sm text-paper/60">Authorized access only.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block">
            <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.22em] text-paper/60">
              Email
            </span>
            <input
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full cursor-text rounded-sm border border-paper/20 bg-paper/5 px-4 py-3 text-sm text-paper placeholder:text-paper/35 focus:border-gold focus:outline-none"
              placeholder="you@example.com"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.22em] text-paper/60">
              Password
            </span>
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full cursor-text rounded-sm border border-paper/20 bg-paper/5 px-4 py-3 text-sm text-paper placeholder:text-paper/35 focus:border-gold focus:outline-none"
            />
          </label>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-interaction flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm bg-gold px-6 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-ink disabled:opacity-70"
          >
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
