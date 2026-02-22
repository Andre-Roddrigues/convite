export interface RSVP {
  id: string;
  eventId: string;
  fullName: string;
  phone: string;
  attendance: "yes" | "no";
  message?: string;
  createdAt: string;
}