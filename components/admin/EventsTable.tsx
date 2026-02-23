// components/admin/EventsTable.tsx
"use client";

import { useState, useEffect } from "react";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Calendar,
  MapPin,
  Clock,
  Heart,
  Eye,
  RefreshCw,
  Search,
  ChevronDown,
  ChevronUp,
  FileText,
  Tag
} from "lucide-react";
import toast from "react-hot-toast";
import EventForm from "./EventForm";
import { Event } from "@/types/events";

export default function EventsTable() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [expandedCards, setExpandedCards] = useState<string[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Buscar eventos da API
  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/events');
      if (!response.ok) throw new Error('Erro ao buscar eventos');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Erro:', error);
      toast.error('Erro ao carregar eventos');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Filtrar eventos
  useEffect(() => {
    if (searchTerm) {
      const filtered = events.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events);
    }
  }, [events, searchTerm]);

  // Deletar evento
  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja remover este evento?')) return;
    
    try {
      const response = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Erro ao deletar');
      
      toast.success('Evento removido com sucesso!');
      fetchEvents();
    } catch (error) {
      console.error('Erro:', error);
      toast.error('Erro ao remover evento');
    }
  };

  // Formatar data
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Formatar data para exibição completa
  const formatDateFull = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const toggleCardExpand = (id: string) => {
    setExpandedCards(prev => 
      prev.includes(id) ? prev.filter(cardId => cardId !== id) : [...prev, id]
    );
  };

  if (isLoading) {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-rose-100/50 p-8 lg:p-12">
        <div className="flex flex-col items-center justify-center gap-4">
          <RefreshCw className="w-8 h-8 lg:w-12 lg:h-12 text-rose-300 animate-spin" />
          <p className="text-rose-400 text-sm lg:text-base">Carregando eventos...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-rose-100/50 overflow-hidden">
        {/* Header - Responsivo */}
        <div className="p-4 lg:p-6 border-b border-rose-100">
          {/* Título e botões */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            <div>
              <h2 className="font-serif text-xl lg:text-2xl text-rose-800">
                Eventos do Casamento
              </h2>
              <p className="text-xs lg:text-sm text-rose-300 mt-1">
                Gerencie todos os eventos do grande dia
              </p>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={fetchEvents}
                className="flex items-center gap-1 lg:gap-2 px-3 lg:px-4 py-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 transition text-sm lg:text-base"
                title="Atualizar"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:inline">Atualizar</span>
              </button>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-1 lg:gap-2 px-3 lg:px-4 py-2 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition shadow-lg shadow-rose-200 text-sm lg:text-base"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Novo Evento</span>
                <span className="sm:hidden">Novo</span>
              </button>
            </div>
          </div>

          {/* Busca - Desktop sempre visível, Mobile com toggle */}
          <div className="mt-4">
            {/* Botão de busca para mobile */}
            <button 
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden flex items-center justify-between w-full p-2 bg-white rounded-xl border border-rose-100 mb-2"
            >
              <span className="text-rose-600 font-medium">Buscar eventos</span>
              {showMobileFilters ? <ChevronUp className="w-5 h-5 text-rose-400" /> : <ChevronDown className="w-5 h-5 text-rose-400" />}
            </button>

            {/* Input de busca - responsivo */}
            <div className={`${showMobileFilters ? 'block' : 'hidden'} lg:block relative`}>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-300" />
              <input
                type="text"
                placeholder="Buscar eventos por título, local ou descrição..."
                className="w-full pl-10 pr-4 py-2 border border-rose-100 rounded-xl focus:outline-none focus:border-rose-300 text-sm lg:text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Grid de eventos - Totalmente responsivo */}
        <div className="p-4">
          {filteredEvents.length === 0 ? (
            <div className="text-center p-8 text-rose-300">
              Nenhum evento encontrado
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-4">
              {filteredEvents.map((event) => (
                <div 
                  key={event.id}
                  className="border border-rose-100 rounded-xl overflow-hidden hover:shadow-md transition bg-white"
                >
                  {/* Header do Card */}
                  <div className="p-3 lg:p-4 bg-gradient-to-r from-rose-50 to-white border-b border-rose-100">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2 flex-1">
                        <Heart className="w-4 h-4 lg:w-5 lg:h-5 text-rose-400 fill-rose-400 flex-shrink-0" />
                        <h3 className="font-serif text-base lg:text-lg text-rose-700 line-clamp-1">
                          {event.title}
                        </h3>
                      </div>
                      <button 
                        onClick={() => toggleCardExpand(event.id)}
                        className="lg:hidden p-1 hover:bg-rose-100 rounded-lg transition ml-2"
                      >
                        {expandedCards.includes(event.id) ? 
                          <ChevronUp className="w-4 h-4 text-rose-400" /> : 
                          <ChevronDown className="w-4 h-4 text-rose-400" />
                        }
                      </button>
                    </div>
                  </div>

                  {/* Conteúdo do Card - Sempre visível no desktop, expansível no mobile */}
                  <div className={`p-3 lg:p-4 ${!expandedCards.includes(event.id) ? 'hidden lg:block' : 'block'}`}>
                    {/* Descrição */}
                    <p className="text-gray-600 text-xs lg:text-sm mb-3 line-clamp-2">
                      {event.description}
                    </p>

                    {/* Informações principais */}
                    <div className="space-y-2 text-xs lg:text-sm">
                      <div className="flex items-center gap-2 text-rose-500">
                        <Calendar className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0" />
                        <span className="truncate">{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-rose-500">
                        <Clock className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-rose-500">
                        <MapPin className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>

                    {/* Informações adicionais (visíveis apenas no mobile quando expandido) */}
                    {expandedCards.includes(event.id) && (
                      <div className="mt-3 pt-3 border-t border-rose-50 space-y-2">
                        <div className="flex items-center gap-2 text-xs text-rose-400">
                          <Tag className="w-3 h-3" />
                          <span>ID: {event.id.slice(0, 8)}...</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-rose-400">
                          <FileText className="w-3 h-3" />
                          <span>Criado: {new Date(event.createdAt).toLocaleDateString('pt-BR')}</span>
                        </div>
                      </div>
                    )}

                    {/* Ações */}
                    <div className="flex gap-2 mt-3 pt-3 border-t border-rose-50">
                      <button 
                        onClick={() => {
                          setSelectedEvent(event);
                          setShowDetailsModal(true);
                        }}
                        className="flex-1 p-1.5 lg:p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition flex items-center justify-center gap-1 text-xs lg:text-sm"
                        title="Ver detalhes"
                      >
                        <Eye className="w-3 h-3 lg:w-4 lg:h-4" />
                        <span className="hidden sm:inline">Detalhes</span>
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedEvent(event);
                          setShowEditModal(true);
                        }}
                        className="flex-1 p-1.5 lg:p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition flex items-center justify-center gap-1 text-xs lg:text-sm"
                        title="Editar"
                      >
                        <Edit className="w-3 h-3 lg:w-4 lg:h-4" />
                        <span className="hidden sm:inline">Editar</span>
                      </button>
                      <button 
                        onClick={() => handleDelete(event.id)}
                        className="flex-1 p-1.5 lg:p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition flex items-center justify-center gap-1 text-xs lg:text-sm"
                        title="Remover"
                      >
                        <Trash2 className="w-3 h-3 lg:w-4 lg:h-4" />
                        <span className="hidden sm:inline">Remover</span>
                      </button>
                    </div>
                  </div>

                  {/* Footer com data de criação - visível apenas no desktop */}
                  <div className="hidden lg:block px-4 pb-3 text-xs text-rose-300">
                    Criado em: {new Date(event.createdAt).toLocaleDateString('pt-BR')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-rose-100 text-center text-rose-300 text-xs lg:text-sm">
          Total de {filteredEvents.length} evento{filteredEvents.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Modais - Responsivos */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg lg:max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 lg:p-6 border-b border-rose-100 sticky top-0 bg-white">
              <h3 className="font-serif text-lg lg:text-xl text-rose-800">Novo Evento</h3>
            </div>
            <div className="p-4 lg:p-6">
              <EventForm 
                onSuccess={() => {
                  setShowCreateModal(false);
                  fetchEvents();
                }}
                onCancel={() => setShowCreateModal(false)}
              />
            </div>
          </div>
        </div>
      )}

      {showEditModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg lg:max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 lg:p-6 border-b border-rose-100 sticky top-0 bg-white">
              <h3 className="font-serif text-lg lg:text-xl text-rose-800">Editar Evento</h3>
            </div>
            <div className="p-4 lg:p-6">
              <EventForm 
                eventId={selectedEvent.id}
                onSuccess={() => {
                  setShowEditModal(false);
                  fetchEvents();
                }}
                onCancel={() => setShowEditModal(false)}
              />
            </div>
          </div>
        </div>
      )}

      {showDetailsModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-4 lg:p-6 border-b border-rose-100 sticky top-0 bg-white">
              <h3 className="font-serif text-lg lg:text-xl text-rose-800">Detalhes do Evento</h3>
            </div>
            <div className="p-4 lg:p-6">
              <div className="space-y-3 lg:space-y-4">
                <div>
                  <p className="text-xs lg:text-sm text-rose-400">Título</p>
                  <p className="text-sm lg:text-base text-gray-700 font-medium">{selectedEvent.title}</p>
                </div>
                <div>
                  <p className="text-xs lg:text-sm text-rose-400">Descrição</p>
                  <p className="text-sm lg:text-base text-gray-700">{selectedEvent.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs lg:text-sm text-rose-400">Data</p>
                    <p className="text-sm lg:text-base text-gray-700">{formatDateFull(selectedEvent.date)}</p>
                  </div>
                  <div>
                    <p className="text-xs lg:text-sm text-rose-400">Horário</p>
                    <p className="text-sm lg:text-base text-gray-700">{selectedEvent.time}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs lg:text-sm text-rose-400">Local</p>
                  <p className="text-sm lg:text-base text-gray-700">{selectedEvent.location}</p>
                </div>
                <div>
                  <p className="text-xs lg:text-sm text-rose-400">Criado em</p>
                  <p className="text-sm lg:text-base text-gray-700">
                    {new Date(selectedEvent.createdAt).toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 lg:p-6 border-t border-rose-100 flex justify-end">
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 bg-rose-500 text-white rounded-xl hover:bg-rose-600 text-sm lg:text-base"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}