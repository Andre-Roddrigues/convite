import { Event } from "../types/events";
import { RSVP } from "@/types/rsvp";

// Usando const em vez de let, pois os arrays não são reatribuídos
export const events: Event[] = [
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

export const rsvps: RSVP[] = [];

// Se você precisar modificar esses arrays em outro lugar,
// crie funções para isso:
export function addRSVP(rsvp: RSVP) {
  rsvps.push(rsvp);
}

export function getRSVPs() {
  return rsvps;
}