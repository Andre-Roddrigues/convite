"use client";

import { useEffect, useState } from "react";
import { Event } from "@/types/events";
import { getEvents } from "@/services/event.service";
import EventDetails from "@/components/event/EventDetails";
import EventHeader from "@/components/event/EventHeader";
import RSVPForm from "@/components/RSP/RSPForm";

export default function Home() {
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    async function load() {
      const data = await getEvents();
      if (data.length > 0) {
        setEvent(data[0]);
      }
    }
    load();
  }, []);

  if (!event) {
    return (
      <div className="min-h-screen bg-rose-50 flex items-center justify-center">
        <p className="text-rose-400">Carregando evento...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-rose-50 flex flex-col items-center p-6">
      <EventHeader />
      <EventDetails eventId={event.id} />
      <RSVPForm eventId={event.id} />
    </div>
  );
}