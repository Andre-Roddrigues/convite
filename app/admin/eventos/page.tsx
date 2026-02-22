// app/admin/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Heart, Users, Calendar, MessageCircle } from "lucide-react";
import SidebarMobile from "@/components/Sidebar/SidebarMobile";

// Dados mockados para teste
const mockEvents = [
  {
    id: "1",
    title: "Cerimônia de Casamento",
    description: "Celebre connosco este momento especial ❤️",
    date: "2025-10-25",
    time: "13:30",
    location: "Vila Esperança, Mozal - Casa 60",
    createdAt: new Date().toISOString()
  }
];

const mockRsvps = [
  {
    eventId: "1",
    fullName: "João Silva",
    phone: "84 123 456",
    attendance: "yes" as const,
    message: "Mal posso esperar!",
    createdAt: new Date().toISOString()
  }
];

export default function AdminDashboard() {
  const [events] = useState(mockEvents);
  const [rsvps] = useState(mockRsvps);

  const totalConfirmations = rsvps.length;
  const confirmationsYes = rsvps.filter(r => r.attendance === "yes").length;
  const totalEvents = events.length;
  const messagesCount = rsvps.filter(r => r.message).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-white">
      {/* Sidebar Mobile */}
      {/* <SidebarMobile /> */}
      
      {/* Conteúdo principal */}
      <main className="lg:ml-64 p-4 lg:p-8 pb-24 lg:pb-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl lg:text-4xl text-rose-800 mb-2">
            Dashboard do Casamento
          </h1>
          <p className="text-rose-300">
            Bem-vinda ao painel administrativo do seu casamento
          </p>
        </div>

        {/* Cards de estatísticas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/90 backdrop-blur-sm p-4 lg:p-6 rounded-2xl border border-rose-100/50">
            <div className="flex items-center justify-between mb-2 lg:mb-4">
              <Heart className="w-6 lg:w-8 h-6 lg:h-8 text-rose-400 fill-rose-400" />
              <span className="text-2xl lg:text-3xl font-serif text-rose-800">{totalConfirmations}</span>
            </div>
            <p className="text-xs lg:text-sm text-rose-300">Total de confirmações</p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-4 lg:p-6 rounded-2xl border border-rose-100/50">
            <div className="flex items-center justify-between mb-2 lg:mb-4">
              <Users className="w-6 lg:w-8 h-6 lg:h-8 text-green-400" />
              <span className="text-2xl lg:text-3xl font-serif text-green-700">{confirmationsYes}</span>
            </div>
            <p className="text-xs lg:text-sm text-rose-300">Confirmaram presença</p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-4 lg:p-6 rounded-2xl border border-rose-100/50">
            <div className="flex items-center justify-between mb-2 lg:mb-4">
              <Calendar className="w-6 lg:w-8 h-6 lg:h-8 text-rose-400" />
              <span className="text-2xl lg:text-3xl font-serif text-rose-800">{totalEvents}</span>
            </div>
            <p className="text-xs lg:text-sm text-rose-300">Eventos programados</p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-4 lg:p-6 rounded-2xl border border-rose-100/50">
            <div className="flex items-center justify-between mb-2 lg:mb-4">
              <MessageCircle className="w-6 lg:w-8 h-6 lg:h-8 text-rose-400" />
              <span className="text-2xl lg:text-3xl font-serif text-rose-800">{messagesCount}</span>
            </div>
            <p className="text-xs lg:text-sm text-rose-300">Mensagens recebidas</p>
          </div>
        </div>

        {/* Conteúdo temporário */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-rose-100/50 p-6">
          <h2 className="font-serif text-xl text-rose-800 mb-4">
            Bem-vinda ao painel administrativo
          </h2>
          <p className="text-gray-600">
            Aqui você poderá gerenciar todas as confirmações, eventos e mensagens do seu casamento.
          </p>
        </div>
      </main>
    </div>
  );
}