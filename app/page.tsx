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
      setEvent(data[0]); // pegando primeiro evento
    }
    load();
  }, []);

  if (!event) return <p>Carregando...</p>;

  return (
    <div className="min-h-screen bg-rose-50 flex flex-col items-center p-6">
      <EventHeader title={event.title} />
      <EventDetails event={event} />
      <RSVPForm eventId={event.id} />
    </div>
  );
}