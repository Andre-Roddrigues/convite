import { Event } from "../types/events";
import { RSVP } from "@/types/rsvp";

export let events: Event[] = [
  {
    id: "1",
    title: "Confirme sua presença no nosso noivado",
    description: "Celebre connosco este momento especial ❤️",
    date: "2025-10-25",
    time: "13:30",
    location: "Vila Esperança, Mozal - Casa 60",
    createdAt: new Date().toISOString()
  }
];

export let rsvps: RSVP[] = [];