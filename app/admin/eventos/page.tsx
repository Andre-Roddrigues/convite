"use client";

import { useState, useEffect } from "react";
import { Heart, Users, Calendar, MessageCircle } from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: string;
  createdAt: string;
}

interface RSVP {
  id: string;
  eventId: string;
  fullName: string;
  phone: string;
  attendance: "yes" | "no";
  message?: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [eventsRes, rsvpsRes] = await Promise.all([
          fetch("/api/events", { cache: "no-store" }),
          fetch("/api/rsvps", { cache: "no-store" }),
        ]);

        const eventsData = await eventsRes.json();
        const rsvpsData = await rsvpsRes.json();

        setEvents(eventsData);
        setRsvps(rsvpsData);
      } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-rose-400">Carregando dashboard...</p>
      </div>
    );
  }

  const totalConfirmations = rsvps.length;
  const confirmationsYes = rsvps.filter(r => r.attendance === "yes").length;
  const totalEvents = events.length;
  const messagesCount = rsvps.filter(r => r.message && r.message.trim() !== "").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-white">
      <main className="p-4 lg:p-8">
        <div className="mb-8">
          <h1 className="font-serif text-3xl lg:text-4xl text-rose-800 mb-2">
            Dashboard do Casamento
          </h1>
          <p className="text-rose-300">
            Painel administrativo com dados em tempo real
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          <div className="bg-white p-6 rounded-2xl border border-rose-100">
            <div className="flex items-center justify-between mb-4">
              <Heart className="w-8 h-8 text-rose-400 fill-rose-400" />
              <span className="text-3xl font-serif text-rose-800">
                {totalConfirmations}
              </span>
            </div>
            <p className="text-sm text-rose-300">Total de confirmações</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-rose-100">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-green-500" />
              <span className="text-3xl font-serif text-green-700">
                {confirmationsYes}
              </span>
            </div>
            <p className="text-sm text-rose-300">Confirmaram presença</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-rose-100">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-8 h-8 text-rose-400" />
              <span className="text-3xl font-serif text-rose-800">
                {totalEvents}
              </span>
            </div>
            <p className="text-sm text-rose-300">Eventos programados</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-rose-100">
            <div className="flex items-center justify-between mb-4">
              <MessageCircle className="w-8 h-8 text-rose-400" />
              <span className="text-3xl font-serif text-rose-800">
                {messagesCount}
              </span>
            </div>
            <p className="text-sm text-rose-300">Mensagens recebidas</p>
          </div>

        </div>

        <div className="bg-white rounded-2xl border border-rose-100 p-6">
          <h2 className="font-serif text-xl text-rose-800 mb-4">
            Sistema conectado ao banco de dados
          </h2>
          <p className="text-gray-600">
            Todos os dados exibidos aqui são carregados em tempo real do banco através do Prisma.
          </p>
        </div>
      </main>
    </div>
  );
}