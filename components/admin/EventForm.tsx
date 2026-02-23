// components/admin/EventForm.tsx
"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Heart, FileText, X, Save } from "lucide-react";
import toast from "react-hot-toast";

interface EventFormData {
  id?: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
}

interface Props {
  eventId?: string; // Se fornecido, está no modo edição
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function EventForm({ eventId, onSuccess, onCancel }: Props) {
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  // Buscar dados do evento se estiver no modo edição
  useEffect(() => {
    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  const fetchEvent = async () => {
    setIsFetching(true);
    try {
      const response = await fetch(`/api/events/${eventId}`);
      if (!response.ok) throw new Error('Erro ao buscar evento');
      const data = await response.json();
      setFormData({
        title: data.title,
        description: data.description,
        date: data.date.split('T')[0], // Formatar data para input
        time: data.time,
        location: data.location,
      });
    } catch (error) {
      console.error('Erro:', error);
      toast.error('Erro ao carregar dados do evento');
    } finally {
      setIsFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const url = eventId ? `/api/events/${eventId}` : `/api/events`;
    const method = eventId ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        date: new Date(formData.date).toISOString(), // garante formato ISO
      }),
    });

    if (!response.ok) throw new Error("Erro ao salvar evento");

    toast.success(
      eventId
        ? "Evento atualizado com sucesso!"
        : "Evento criado com sucesso!"
    );

    // limpar formulário após criar
    if (!eventId) {
      setFormData({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
      });
    }

    if (onSuccess) onSuccess();

  } catch (error) {
    console.error("Erro:", error);
    toast.error("Erro ao salvar evento");
  } finally {
    setIsLoading(false);
  }
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Título */}
      <div>
        <label className="block text-sm font-medium text-rose-600 mb-2">
          Título do Evento
        </label>
        <div className="relative">
          <Heart className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-300" />
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full pl-10 pr-4 py-2 border border-rose-100 rounded-xl focus:outline-none focus:border-rose-300"
            placeholder="Ex: Cerimônia de Casamento"
          />
        </div>
      </div>

      {/* Descrição */}
      <div>
        <label className="block text-sm font-medium text-rose-600 mb-2">
          Descrição
        </label>
        <div className="relative">
          <FileText className="absolute left-3 top-3 w-4 h-4 text-rose-300" />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={3}
            className="w-full pl-10 pr-4 py-2 border border-rose-100 rounded-xl focus:outline-none focus:border-rose-300"
            placeholder="Descreva os detalhes do evento..."
          />
        </div>
      </div>

      {/* Data e Hora */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-rose-600 mb-2">
            Data
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-300" />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 border border-rose-100 rounded-xl focus:outline-none focus:border-rose-300"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-rose-600 mb-2">
            Horário
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-300" />
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 border border-rose-100 rounded-xl focus:outline-none focus:border-rose-300"
            />
          </div>
        </div>
      </div>

      {/* Local */}
      <div>
        <label className="block text-sm font-medium text-rose-600 mb-2">
          Local
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-300" />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full pl-10 pr-4 py-2 border border-rose-100 rounded-xl focus:outline-none focus:border-rose-300"
            placeholder="Endereço completo do evento"
          />
        </div>
      </div>

      {/* Botões */}
      <div className="flex justify-end gap-3 pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-rose-200 text-rose-600 rounded-xl hover:bg-rose-50 transition flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Cancelar
          </button>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-xl hover:from-rose-600 hover:to-rose-700 transition flex items-center gap-2 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {isLoading ? 'Salvando...' : eventId ? 'Atualizar Evento' : 'Criar Evento'}
        </button>
      </div>
    </form>
  );
}