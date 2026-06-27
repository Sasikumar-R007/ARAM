import { createHash, timingSafeEqual } from "node:crypto";
import { createServerFn } from "@tanstack/react-start";
import { getAdminSession } from "./session";

function digestEqual(a: string, b: string): boolean {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

function getAdminCredentials() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    throw new Error("Admin credentials are not configured on the server.");
  }
  return { email, password };
}

export const checkAdminSession = createServerFn({ method: "GET" }).handler(async () => {
  const session = await getAdminSession();
  if (session.data.authenticated && session.data.email) {
    return { authenticated: true as const, email: session.data.email };
  }
  return { authenticated: false as const };
});

export const loginAdmin = createServerFn({ method: "POST" })
  .validator((data: { email: string; password: string }) => data)
  .handler(async ({ data }) => {
    const { email: adminEmail, password: adminPassword } = getAdminCredentials();
    const emailInput = data.email.trim().toLowerCase();
    const passwordInput = data.password;

    const valid =
      digestEqual(emailInput, adminEmail) && digestEqual(passwordInput, adminPassword);

    if (!valid) {
      return { success: false as const, error: "Invalid email or password" };
    }

    const session = await getAdminSession();
    await session.update({ email: adminEmail, authenticated: true });

    return { success: true as const };
  });

export const logoutAdmin = createServerFn({ method: "POST" }).handler(async () => {
  const session = await getAdminSession();
  await session.clear();
  return { success: true as const };
});
