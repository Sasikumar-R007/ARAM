import type { NotifySignup, Volunteer } from "@/lib/db";

type VolunteerRow = {
  id: string;
  reference_id: string | null;
  name: string;
  contact: string;
  location: string;
  availability: Volunteer["availability"];
  reason: string;
  status: Volunteer["status"];
  created_at: string;
};

type NotifySignupRow = {
  id: string;
  reference_id: string | null;
  name: string;
  email: string;
  created_at: string;
};

export function mapVolunteer(row: VolunteerRow): Volunteer {
  return {
    id: row.id,
    referenceId: row.reference_id ?? "",
    name: row.name,
    contact: row.contact,
    location: row.location,
    availability: row.availability,
    reason: row.reason ?? "",
    status: row.status,
    createdAt: row.created_at,
  };
}

export function mapNotifySignup(row: NotifySignupRow): NotifySignup {
  return {
    id: row.id,
    referenceId: row.reference_id ?? "",
    name: row.name,
    email: row.email,
    createdAt: row.created_at,
  };
}
