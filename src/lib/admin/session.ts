import { useSession } from "@tanstack/react-start/server";

export type AdminSessionData = {
  email?: string;
  authenticated?: boolean;
};

function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error(
      "ADMIN_SESSION_SECRET is missing or too short (use at least 32 characters).",
    );
  }
  return secret;
}

export function getAdminSessionConfig() {
  return {
    name: "aram-control-session",
    password: getSessionSecret(),
    maxAge: 60 * 60 * 24 * 7,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      path: "/",
    },
  };
}

export async function getAdminSession() {
  return useSession<AdminSessionData>(getAdminSessionConfig());
}

export async function requireAdminSession() {
  const session = await getAdminSession();
  if (!session.data.authenticated || !session.data.email) {
    throw new Error("Unauthorized");
  }
  return session;
}
