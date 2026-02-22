// components/admin/EventsTable.tsx
"use client";

import { useState } from "react";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Calendar,
  MapPin,
  Clock,
  MoreVertical,
  Eye
} from "lucide-react";
import { Event } from "@/types/events";

interface Props {
  events: Event[];
  onAdd?: () => void;
  onEdit?: (event: Event) => void;
  onDelete?: (id: string) => void;
}

export default function EventsTable({ events, onAdd, onEdit, onDelete }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-rose-100/50 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-rose-100">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-serif text-2xl text-rose-800 mb-2">
              Eventos
            </h2>
            <p className="text-rose-300 text-sm">
              Gerencie todos os eventos do casamento
            </p>
          </div>
          
          <button 
            onClick={onAdd}
            className="flex items-center gap-2 px-4 py-2 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition shadow-lg shadow-rose-200"
          >
            <Plus className="w-4 h-4" />
            Novo Evento
          </button>
        </div>

        {/* Busca */}
        <div className="relative mt-4">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-300" />
          <input
            type="text"
            placeholder="Buscar eventos..."
            className="w-full pl-10 pr-4 py-2 border border-rose-100 rounded-xl focus:outline-none focus:border-rose-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Grid de eventos */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredEvents.map((event) => (
          <div 
            key={event.id}
            className="border border-rose-100 rounded-xl p-4 hover:shadow-md transition"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-serif text-lg text-rose-700">{event.title}</h3>
              <div className="flex gap-1">
                <button 
                  onClick={() => onEdit?.(event)}
                  className="p-1 hover:bg-rose-100 rounded-lg transition"
                >
                  <Edit className="w-4 h-4 text-rose-400" />
                </button>
                <button 
                  onClick={() => onDelete?.(event.id)}
                  className="p-1 hover:bg-rose-100 rounded-lg transition"
                >
                  <Trash2 className="w-4 h-4 text-rose-400" />
                </button>
                <button className="p-1 hover:bg-rose-100 rounded-lg transition">
                  <MoreVertical className="w-4 h-4 text-rose-400" />
                </button>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {event.description}
            </p>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-rose-500">
                <Calendar className="w-4 h-4" />
                <span>{new Date(event.date).toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="flex items-center gap-2 text-rose-500">
                <Clock className="w-4 h-4" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2 text-rose-500">
                <MapPin className="w-4 h-4" />
                <span className="truncate">{event.location}</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-rose-50 flex justify-between items-center">
              <span className="text-xs text-rose-300">
                Criado em: {new Date(event.createdAt).toLocaleDateString('pt-BR')}
              </span>
              <button className="text-rose-400 hover:text-rose-500 text-sm flex items-center gap-1">
                <Eye className="w-3 h-3" />
                Ver detalhes
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-rose-100 text-center text-rose-300 text-sm">
        Total de {filteredEvents.length} eventos
      </div>
    </div>
  );
}