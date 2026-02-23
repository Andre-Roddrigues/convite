// components/EventDetails.tsx
"use client";

import { useState, useEffect } from "react";
import { Event } from "@/types/events";
import { Calendar, Clock, MapPin, Heart } from "lucide-react";

interface Props {
  eventId: string;
}

export default function EventDetails({ eventId }: Props) {
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  if (!eventId) return;

  const fetchEvent = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: "GET",
        cache: "no-store", 
      });

      if (!response.ok) {
        throw new Error("Evento não encontrado");
      }

      const data = await response.json();
      setEvent(data);

    } catch (error) {
      console.error("Erro ao buscar evento:", error);
      setEvent(null);
    } finally {
      setIsLoading(false);
    }
  };

  fetchEvent();
}, [eventId]);

  if (isLoading) {
    return (
      <div className="bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl p-8 w-full max-w-md mb-6 border border-rose-100/50">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500"></div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl p-8 w-full max-w-md mb-6 border border-rose-100/50">
        <p className="text-center text-rose-300">Evento não encontrado</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl p-8 w-full max-w-md mb-6 border border-rose-100/50">
      <div className="flex items-center justify-center gap-2 mb-6">
        <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
        <h2 className="font-serif text-2xl text-rose-800/90 tracking-wide">
          {event.title}
        </h2>
        <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
      </div>

      <p className="text-gray-600 text-center mb-6 italic">
        {event.description}
      </p>

      <div className="space-y-5">
        <div className="flex items-start gap-3 p-3 rounded-xl bg-rose-50/50 hover:bg-rose-50 transition-colors">
          <Calendar className="w-5 h-5 text-rose-400 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-rose-400 uppercase tracking-wider">
              Data
            </p>
            <p className="text-gray-700 font-light text-lg">
              {formatDate(event.date)}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-xl bg-rose-50/50 hover:bg-rose-50 transition-colors">
          <Clock className="w-5 h-5 text-rose-400 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-rose-400 uppercase tracking-wider">
              Horário
            </p>
            <p className="text-gray-700 font-light text-lg">
              {event.time}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-xl bg-rose-50/50 hover:bg-rose-50 transition-colors">
          <MapPin className="w-5 h-5 text-rose-400 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-rose-400 uppercase tracking-wider">
              Local
            </p>
            <p className="text-gray-700 font-light text-lg">
              {event.location}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 text-center border-t border-rose-100">
        <p className="text-xs text-rose-300 italic">
          Celebre o amor em cada detalhe
        </p>
      </div>
    </div>
  );
}