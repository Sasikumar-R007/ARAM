import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import {
  Eye,
  ExternalLink,
  Loader2,
  LogOut,
  Mail,
  Search,
  User,
  Users,
  Bell,
  FileWarning,
} from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import { toast } from "sonner";
import aramLogo from "@/assets/ARAM Logo.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutAdmin, loginAdmin } from "@/lib/admin/auth";
import {
  getNotifySignups,
  getReports,
  getVolunteers,
  updateReportStatus,
} from "@/lib/api";
import type { Report } from "@/lib/db";

type Tab = "volunteers" | "notify" | "reports";

type TableRow = {
  id: string;
  refId: string;
  cells: string[];
  detail?: string;
};

export function ControlCenter({ adminEmail }: { adminEmail: string }) {
  const [tab, setTab] = useState<Tab>("volunteers");
  const [search, setSearch] = useState("");
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailTitle, setDetailTitle] = useState("");
  const [detailContent, setDetailContent] = useState("");
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

  const openDetail = (title: string, content: string) => {
    setDetailTitle(title);
    setDetailContent(content);
    setDetailOpen(true);
  };

  const tabCls = (active: boolean) =>
    `block w-full cursor-pointer text-left px-4 py-3 text-[0.68rem] uppercase tracking-[0.2em] transition ${
      active
        ? "bg-paper/10 text-gold border-l-2 border-gold"
        : "text-paper/60 hover:text-paper hover:bg-paper/5 border-l-2 border-transparent"
    }`;

  const volunteerCount = volunteers?.length ?? 0;
  const notifyCount = notifySignups?.length ?? 0;
  const reportCount = reports?.length ?? 0;

  const stats = [
    { label: "Volunteers", value: volunteerCount, icon: Users },
    { label: "Notify", value: notifyCount, icon: Bell },
    { label: "Reports", value: reportCount, icon: FileWarning },
  ];

  const tabs: { key: Tab; label: string }[] = [
    { key: "volunteers", label: "Volunteer Registry" },
    { key: "notify", label: "Notify Signups" },
    { key: "reports", label: "Emergency Reports" },
  ];

  const volunteerRows: TableRow[] = useMemo(
    () =>
      volunteers?.map((v) => ({
        id: v.id,
        refId: v.referenceId || "—",
        cells: [
          new Date(v.createdAt).toLocaleDateString(),
          v.name,
          v.contact,
          v.location,
          v.availability ?? "—",
        ],
        detail: v.reason || undefined,
      })) ?? [],
    [volunteers],
  );

  const notifyRows: TableRow[] = useMemo(
    () =>
      notifySignups?.map((s) => ({
        id: s.id,
        refId: s.referenceId || "—",
        cells: [new Date(s.createdAt).toLocaleDateString(), s.name, s.email],
      })) ?? [],
    [notifySignups],
  );

  const reportRows: TableRow[] = useMemo(
    () =>
      reports?.map((r) => ({
        id: r.id,
        refId: r.id,
        cells: [
          new Date(r.createdAt).toLocaleDateString(),
          r.type,
          r.location,
          r.status,
        ],
        detail: r.notes || undefined,
      })) ?? [],
    [reports],
  );

  const activeConfig = useMemo(() => {
    switch (tab) {
      case "volunteers":
        return {
          title: "Registered Volunteers",
          loading: loadingVolunteers,
          empty: "No volunteers yet.",
          columns: ["Date", "Name", "Contact", "Location", "Availability", "Reason"],
          rows: volunteerRows,
          highlightCol: 1,
          detailLabel: "Reason",
        };
      case "notify":
        return {
          title: "Launch Notify List",
          loading: loadingNotify,
          empty: "No notify signups yet.",
          columns: ["Date", "Name", "Email"],
          rows: notifyRows,
          highlightCol: 1,
          detailLabel: undefined,
        };
      case "reports":
        return {
          title: "Recent Reports",
          loading: loadingReports,
          empty: "No reports in this session.",
          columns: ["Date", "Type", "Location", "Status", "Notes"],
          rows: reportRows,
          highlightCol: -1,
          detailLabel: "Notes",
        };
    }
  }, [
    tab,
    loadingVolunteers,
    loadingNotify,
    loadingReports,
    volunteerRows,
    notifyRows,
    reportRows,
  ]);

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return activeConfig.rows;
    return activeConfig.rows.filter((row) =>
      [row.refId, ...row.cells, row.detail ?? ""].join(" ").toLowerCase().includes(q),
    );
  }, [activeConfig.rows, search]);

  const isLoading = activeConfig.loading;

  return (
    <div className="flex min-h-screen flex-col bg-ink text-paper">
      <div className="shrink-0 border-b border-paper/10 px-6 py-5 md:px-10">
        <header className="flex flex-wrap items-center gap-4 md:gap-6">
          <div className="flex min-w-0 items-center gap-4">
            <img
              src={aramLogo}
              alt="ARAM"
              className="h-11 w-11 shrink-0 rounded-md border border-paper/20 object-cover md:h-12 md:w-12"
            />
            <h1 className="font-serif text-2xl md:text-3xl">Control Center</h1>
          </div>

          <div className="ml-auto flex flex-wrap items-center gap-3 md:gap-4">
            {stats.map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="flex min-w-[7.5rem] items-center justify-between gap-3 rounded-sm border border-paper/10 bg-paper/5 px-4 py-2 md:min-w-[8.5rem] md:px-5 md:py-2.5"
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-3.5 w-3.5 shrink-0 text-gold/70" />
                  <span className="hidden text-[0.6rem] uppercase tracking-[0.18em] text-paper/45 sm:inline">
                    {label}
                  </span>
                </div>
                <span className="font-sans text-base font-medium tabular-nums text-paper md:text-lg">
                  {String(value).padStart(3, "0")}
                </span>
              </div>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="btn-interaction flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-paper/20 bg-paper/5 text-paper/70 transition hover:border-gold/40 hover:text-gold md:h-10 md:w-10"
                  aria-label="Account menu"
                >
                  <User className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="min-w-48 border-paper/15 bg-ink text-paper"
              >
                <DropdownMenuLabel className="truncate text-xs font-normal text-paper/50">
                  {adminEmail}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-paper/10" />
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-paper/10 focus:text-paper">
                  <a href={`mailto:${adminEmail}`} className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Mail
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-paper/10 focus:text-paper">
                  <a href="/" className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Website
                  </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-paper/10" />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer gap-2 focus:bg-paper/10 focus:text-paper"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
      </div>

      <div className="flex min-h-0 flex-1 flex-col px-6 pb-20 pt-6 md:px-10">
        <div className="flex min-h-0 flex-1 gap-6 md:gap-8">
          <aside className="flex w-full shrink-0 flex-col gap-2 overflow-y-auto md:w-56 md:max-h-[calc(100vh-9rem)] md:border-r md:border-paper/10 md:pr-4">
            {tabs.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setTab(key);
                  setSearch("");
                }}
                className={tabCls(tab === key)}
              >
                {label}
              </button>
            ))}
          </aside>

          <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden md:max-h-[calc(100vh-9rem)]">
            <div className="flex shrink-0 items-center justify-between gap-4 pb-4">
              <h2 className="font-serif text-2xl">{activeConfig.title}</h2>
              <div className="relative w-full max-w-xs shrink-0">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-paper/40" />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search…"
                  className="w-full cursor-text rounded-sm border border-paper/20 bg-paper/5 py-2 pl-9 pr-3 text-sm text-paper placeholder:text-paper/35 focus:border-gold focus:outline-none"
                />
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overflow-x-auto">
              {isLoading ? (
                <LoadingRow />
              ) : tab === "reports" ? (
                <ReportsTable
                  rows={filteredRows}
                  reports={reports ?? []}
                  empty={activeConfig.empty}
                  detailLabel={activeConfig.detailLabel ?? "Notes"}
                  onOpenDetail={openDetail}
                  onStatusChange={handleStatusChange}
                />
              ) : (
                <RegistryTable
                  columns={activeConfig.columns}
                  rows={filteredRows}
                  empty={activeConfig.empty}
                  highlightCol={activeConfig.highlightCol}
                  detailLabel={activeConfig.detailLabel}
                  onOpenDetail={openDetail}
                />
              )}
            </div>
          </main>
        </div>
      </div>

      <footer className="pointer-events-none fixed bottom-0 left-0 right-0 z-10 border-t border-paper/10 bg-ink/90 py-3 text-center backdrop-blur-sm">
        <p className="hairline text-gold">Symphonix · ARAM</p>
      </footer>

      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="border-paper/20 bg-ink text-paper sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl text-paper">{detailTitle}</DialogTitle>
            <DialogDescription className="sr-only">Full message content</DialogDescription>
          </DialogHeader>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-paper/80">
            {detailContent || "—"}
          </p>
        </DialogContent>
      </Dialog>
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

function DetailButton({
  label,
  content,
  onOpen,
}: {
  label: string;
  content: string;
  onOpen: (title: string, content: string) => void;
}) {
  if (!content) {
    return <span className="text-paper/30">—</span>;
  }

  return (
    <button
      type="button"
      onClick={() => onOpen(label, content)}
      className="cursor-pointer text-paper/45 transition-colors hover:text-gold"
      title={`View ${label.toLowerCase()}`}
      aria-label={`View ${label.toLowerCase()}`}
    >
      <Eye className="h-4 w-4" />
    </button>
  );
}

function RegistryTable({
  columns,
  rows,
  empty,
  highlightCol = -1,
  detailLabel,
  onOpenDetail,
}: {
  columns: string[];
  rows: TableRow[];
  empty: string;
  highlightCol?: number;
  detailLabel?: string;
  onOpenDetail: (title: string, content: string) => void;
}) {
  const hasDetail = Boolean(detailLabel);

  return (
    <table className="w-full text-left text-sm">
      <thead className="sticky top-0 z-1 bg-ink">
        <tr className="border-b border-paper/20 text-paper/50">
          <th className="pb-3 pr-4 font-normal">ID</th>
          {columns.map((col) => (
            <th key={col} className="pb-3 pr-4 font-normal">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id} className="border-b border-paper/10 hover:bg-paper/5">
            <td className="py-4 pr-4 font-mono text-xs text-gold/90" title={row.refId}>
              {row.refId}
            </td>
            {row.cells.map((cell, j) => (
              <td
                key={j}
                className={`py-4 pr-4 ${j === highlightCol ? "font-medium text-gold" : j === 0 ? "text-paper/70" : ""}`}
              >
                {cell}
              </td>
            ))}
            {hasDetail && (
              <td className="py-4">
                <DetailButton
                  label={detailLabel!}
                  content={row.detail ?? ""}
                  onOpen={onOpenDetail}
                />
              </td>
            )}
          </tr>
        ))}
        {rows.length === 0 && (
          <tr>
            <td colSpan={columns.length + 1} className="py-8 text-center text-paper/40">
              {empty}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

function ReportsTable({
  rows,
  reports,
  empty,
  detailLabel,
  onOpenDetail,
  onStatusChange,
}: {
  rows: TableRow[];
  reports: Report[];
  empty: string;
  detailLabel: string;
  onOpenDetail: (title: string, content: string) => void;
  onStatusChange: (id: string, status: Report["status"]) => void;
}) {
  const reportById = useMemo(() => new Map(reports.map((r) => [r.id, r])), [reports]);

  return (
    <table className="w-full text-left text-sm">
      <thead className="sticky top-0 z-1 bg-ink">
        <tr className="border-b border-paper/20 text-paper/50">
          <th className="pb-3 pr-4 font-normal">ID</th>
          <th className="pb-3 pr-4 font-normal">Date</th>
          <th className="pb-3 pr-4 font-normal">Type</th>
          <th className="pb-3 pr-4 font-normal">Location</th>
          <th className="pb-3 pr-4 font-normal">Status</th>
          <th className="pb-3 font-normal">Notes</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => {
          const report = reportById.get(row.id);
          return (
            <tr key={row.id} className="border-b border-paper/10 hover:bg-paper/5">
              <td className="py-4 pr-4 font-mono text-xs text-gold/90" title={row.refId}>
                {row.refId}
              </td>
              <td className="py-4 pr-4 text-paper/70">{row.cells[0]}</td>
              <td className="py-4 pr-4 text-[0.65rem] uppercase tracking-widest text-gold">
                {row.cells[1]}
              </td>
              <td className="py-4 pr-4">{row.cells[2]}</td>
              <td className="py-4 pr-4">
                {report ? (
                  <select
                    value={report.status}
                    onChange={(e) =>
                      onStatusChange(
                        report.id,
                        e.target.value as Report["status"],
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
                ) : (
                  row.cells[3]
                )}
              </td>
              <td className="py-4">
                <DetailButton
                  label={detailLabel}
                  content={row.detail ?? ""}
                  onOpen={onOpenDetail}
                />
              </td>
            </tr>
          );
        })}
        {rows.length === 0 && (
          <tr>
            <td colSpan={6} className="py-8 text-center text-paper/40">
              {empty}
            </td>
          </tr>
        )}
      </tbody>
    </table>
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
