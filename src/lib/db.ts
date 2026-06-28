export type Report = {
  id: string;
  type: "injured" | "dead" | "danger";
  location: string;
  notes: string;
  status: "pending" | "investigating" | "resolved";
  createdAt: string;
};

export type Volunteer = {
  id: string;
  referenceId: string;
  name: string;
  contact: string;
  location: string;
  availability: "weekdays" | "weekends" | "anytime";
  reason: string;
  status: "active" | "inactive";
  createdAt: string;
};

export type NotifySignup = {
  id: string;
  referenceId: string;
  name: string;
  email: string;
  createdAt: string;
};

/** In-memory store for reports until the reporting product launches */
export const reportStore = {
  reports: [] as Report[],
};
