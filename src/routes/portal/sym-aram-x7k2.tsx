import { createFileRoute, useRouter } from "@tanstack/react-router";
import { AdminLoginForm, ControlCenter } from "@/components/admin/ControlCenter";
import { checkAdminSession } from "@/lib/admin/auth";

export const Route = createFileRoute("/portal/sym-aram-x7k2")({
  head: () => ({
    meta: [{ name: "robots", content: "noindex, nofollow" }],
  }),
  beforeLoad: async () => {
    const session = await checkAdminSession();
    return { adminSession: session };
  },
  component: AdminPortalPage,
});

function AdminPortalPage() {
  const { adminSession } = Route.useRouteContext();
  const router = useRouter();

  if (!adminSession.authenticated || !("email" in adminSession) || !adminSession.email) {
    return (
      <AdminLoginForm
        onSuccess={() => {
          router.invalidate();
        }}
      />
    );
  }

  return <ControlCenter adminEmail={adminSession.email} />;
}
