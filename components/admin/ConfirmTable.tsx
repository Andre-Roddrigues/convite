// components/admin/ConfirmTable.tsx
"use client";

import { useState, useEffect } from "react";
import { 
  Search, 
  CheckCircle, 
  XCircle, 
  Download,
  Filter,
  Heart,
  Edit,
  Trash2,
  Eye,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Calendar,
  Phone,
  MessageCircle,
  MapPin,
  Clock
} from "lucide-react";
import toast from "react-hot-toast";

interface User {
  id: string;
  fullName: string;
  phone: string;
  attendance: boolean;
  message: string | null;
  eventId: string;
  createdAt: string;
  event?: {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
  };
}

export default function ConfirmTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAttendance, setFilterAttendance] = useState<"all" | "yes" | "no">("all");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  // Buscar dados da API
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/users');
      if (!response.ok) throw new Error('Erro ao buscar usuários');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Erro:', error);
      toast.error('Erro ao carregar confirmações');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filtrar usuários
  useEffect(() => {
    let filtered = [...users];
    
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm)
      );
    }
    
    if (filterAttendance !== "all") {
      filtered = filtered.filter(user => 
        filterAttendance === "yes" ? user.attendance : !user.attendance
      );
    }
    
    setFilteredUsers(filtered);
  }, [users, searchTerm, filterAttendance]);

  // Estatísticas
  const totalConfirmations = users.length;
  const confirmationsYes = users.filter(u => u.attendance).length;
  const confirmationsNo = users.filter(u => !u.attendance).length;

  // Funções CRUD
  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja remover esta confirmação?')) return;
    
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Erro ao deletar');
      
      toast.success('Confirmação removida com sucesso!');
      fetchUsers();
    } catch (error) {
      console.error('Erro:', error);
      toast.error('Erro ao remover confirmação');
    }
  };

  const handleUpdate = async (updatedUser: User) => {
    try {
      const response = await fetch(`/api/users/${updatedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: updatedUser.fullName,
          phone: updatedUser.phone,
          attendance: updatedUser.attendance,
          message: updatedUser.message,
          eventId: updatedUser.eventId,
        }),
      });
      
      if (!response.ok) throw new Error('Erro ao atualizar');
      
      toast.success('Confirmação atualizada com sucesso!');
      setShowEditModal(false);
      fetchUsers();
    } catch (error) {
      console.error('Erro:', error);
      toast.error('Erro ao atualizar confirmação');
    }
  };

  const handleExport = () => {
    const csv = [
      ['Nome', 'Telefone', 'Presença', 'Mensagem', 'Data', 'Evento'],
      ...filteredUsers.map(u => [
        u.fullName,
        u.phone,
        u.attendance ? 'Confirmado' : 'Não virá',
        u.message || '-',
        new Date(u.createdAt).toLocaleDateString('pt-BR'),
        u.event?.title || '-'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `confirmacoes-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const toggleRowExpand = (id: string) => {
    setExpandedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  if (isLoading) {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-rose-100/50 p-8 lg:p-12">
        <div className="flex flex-col items-center justify-center gap-4">
          <RefreshCw className="w-8 h-8 lg:w-12 lg:h-12 text-rose-300 animate-spin" />
          <p className="text-rose-400 text-sm lg:text-base">Carregando confirmações...</p>
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
                Confirmações de Presença
              </h2>
              <p className="text-xs lg:text-sm text-rose-300 mt-1">
                Gerencie todas as confirmações dos convidados
              </p>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={fetchUsers}
                className="flex items-center gap-1 lg:gap-2 px-3 lg:px-4 py-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 transition text-sm lg:text-base"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:inline">Atualizar</span>
              </button>
              <button 
                onClick={handleExport}
                className="flex items-center gap-1 lg:gap-2 px-3 lg:px-4 py-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 transition text-sm lg:text-base"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Exportar</span>
              </button>
            </div>
          </div>

          {/* Cards de estatísticas - Responsivos */}
          <div className="grid grid-cols-3 gap-2 lg:gap-4 mt-4 lg:mt-6">
            <div className="bg-rose-50/50 p-2 lg:p-4 rounded-xl">
              <p className="text-xs lg:text-sm text-rose-400 mb-1">Total</p>
              <p className="font-serif text-lg lg:text-3xl text-rose-800">{totalConfirmations}</p>
            </div>
            <div className="bg-green-50/50 p-2 lg:p-4 rounded-xl">
              <p className="text-xs lg:text-sm text-green-400 mb-1">Confirmados</p>
              <p className="font-serif text-lg lg:text-3xl text-green-700">{confirmationsYes}</p>
            </div>
            <div className="bg-red-50/50 p-2 lg:p-4 rounded-xl">
              <p className="text-xs lg:text-sm text-red-400 mb-1">Não virão</p>
              <p className="font-serif text-lg lg:text-3xl text-red-700">{confirmationsNo}</p>
            </div>
          </div>
        </div>

        {/* Filtros - Responsivos */}
        <div className="p-4 border-b border-rose-100 bg-rose-50/30">
          {/* Botão de filtros para mobile */}
          <button 
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="lg:hidden flex items-center justify-between w-full p-2 bg-white rounded-xl border border-rose-100"
          >
            <span className="text-rose-600 font-medium">Filtros e busca</span>
            {showMobileFilters ? <ChevronUp className="w-5 h-5 text-rose-400" /> : <ChevronDown className="w-5 h-5 text-rose-400" />}
          </button>

          {/* Conteúdo dos filtros - responsivo */}
          <div className={`${showMobileFilters ? 'block' : 'hidden'} lg:block mt-4 lg:mt-0`}>
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Busca */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-300" />
                <input
                  type="text"
                  placeholder="Buscar por nome ou telefone..."
                  className="w-full pl-10 pr-4 py-2 border border-rose-100 rounded-xl focus:outline-none focus:border-rose-300 text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Botões de filtro */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilterAttendance("all")}
                  className={`flex-1 lg:flex-none px-3 lg:px-4 py-2 rounded-xl flex items-center justify-center gap-2 transition text-sm ${
                    filterAttendance === "all" 
                      ? 'bg-rose-500 text-white' 
                      : 'bg-white text-rose-500 hover:bg-rose-50'
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  <span>Todos</span>
                </button>
                <button
                  onClick={() => setFilterAttendance("yes")}
                  className={`flex-1 lg:flex-none px-3 lg:px-4 py-2 rounded-xl flex items-center justify-center gap-2 transition text-sm ${
                    filterAttendance === "yes" 
                      ? 'bg-green-500 text-white' 
                      : 'bg-white text-green-500 hover:bg-green-50'
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Confirmados</span>
                </button>
                <button
                  onClick={() => setFilterAttendance("no")}
                  className={`flex-1 lg:flex-none px-3 lg:px-4 py-2 rounded-xl flex items-center justify-center gap-2 transition text-sm ${
                    filterAttendance === "no" 
                      ? 'bg-red-500 text-white' 
                      : 'bg-white text-red-500 hover:bg-red-50'
                  }`}
                >
                  <XCircle className="w-4 h-4" />
                  <span>Não virão</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Visualização Mobile - Cards */}
        <div className="lg:hidden">
          {filteredUsers.length === 0 ? (
            <div className="text-center p-8 text-rose-300">
              Nenhuma confirmação encontrada
            </div>
          ) : (
            filteredUsers.map((user) => (
              <div key={user.id} className="border-b border-rose-50 p-4 hover:bg-rose-50/30">
                {/* Header do card */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-rose-300" />
                    <span className="font-medium text-gray-700">{user.fullName}</span>
                  </div>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => toggleRowExpand(user.id)}
                      className="p-2 hover:bg-rose-100 rounded-lg transition"
                    >
                      {expandedRows.includes(user.id) ? 
                        <ChevronUp className="w-4 h-4 text-rose-400" /> : 
                        <ChevronDown className="w-4 h-4 text-rose-400" />
                      }
                    </button>
                  </div>
                </div>

                {/* Informações principais */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3 h-3 text-rose-300" />
                    <span className="text-sm text-gray-600">{user.phone}</span>
                  </div>
                  {user.attendance ? (
                    <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs">
                      <CheckCircle className="w-3 h-3" />
                      Confirmado
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-red-600 bg-red-50 px-2 py-1 rounded-full text-xs">
                      <XCircle className="w-3 h-3" />
                      Não virá
                    </span>
                  )}
                </div>

                {/* Conteúdo expandido */}
                {expandedRows.includes(user.id) && (
                  <div className="mt-3 pt-3 border-t border-rose-50 space-y-2">
                    {user.message && (
                      <div className="flex items-start gap-2">
                        <MessageCircle className="w-3 h-3 text-rose-300 mt-1" />
                        <p className="text-sm text-gray-600 flex-1">{user.message}</p>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3 text-rose-300" />
                      <span className="text-sm text-gray-600">
                        {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    {user.event && (
                      <>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3 h-3 text-rose-300" />
                          <span className="text-sm text-gray-600 truncate">{user.event.title}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3 text-rose-300" />
                          <span className="text-sm text-gray-600">{user.event.time}</span>
                        </div>
                      </>
                    )}
                    
                    {/* Ações */}
                    <div className="flex gap-2 mt-3 pt-2 border-t border-rose-50">
                      <button 
                        onClick={() => {
                          setSelectedUser(user);
                          setShowDetailsModal(true);
                        }}
                        className="flex-1 p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition flex items-center justify-center gap-1 text-sm"
                      >
                        <Eye className="w-4 h-4" />
                        Detalhes
                      </button>
                      <button 
                        onClick={() => {
                          setEditingUser(user);
                          setShowEditModal(true);
                        }}
                        className="flex-1 p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition flex items-center justify-center gap-1 text-sm"
                      >
                        <Edit className="w-4 h-4" />
                        Editar
                      </button>
                      <button 
                        onClick={() => handleDelete(user.id)}
                        className="flex-1 p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition flex items-center justify-center gap-1 text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remover
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Visualização Desktop - Tabela */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-rose-50/50">
              <tr>
                <th className="text-left p-4 text-rose-600 font-medium">Nome</th>
                <th className="text-left p-4 text-rose-600 font-medium">Telefone</th>
                <th className="text-left p-4 text-rose-600 font-medium">Presença</th>
                <th className="text-left p-4 text-rose-600 font-medium">Mensagem</th>
                <th className="text-left p-4 text-rose-600 font-medium">Evento</th>
                <th className="text-left p-4 text-rose-600 font-medium">Data</th>
                <th className="text-left p-4 text-rose-600 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center p-8 text-rose-300">
                    Nenhuma confirmação encontrada
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-rose-50 hover:bg-rose-50/30 transition">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-rose-300" />
                        <span className="font-medium text-gray-700">{user.fullName}</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">{user.phone}</td>
                    <td className="p-4">
                      {user.attendance ? (
                        <span className="flex items-center gap-1 text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm w-fit">
                          <CheckCircle className="w-3 h-3" />
                          Confirmado
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-red-600 bg-red-50 px-3 py-1 rounded-full text-sm w-fit">
                          <XCircle className="w-3 h-3" />
                          Não virá
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-gray-600 max-w-xs truncate">
                      {user.message || '-'}
                    </td>
                    <td className="p-4 text-gray-600">
                      {user.event?.title || '-'}
                    </td>
                    <td className="p-4 text-gray-600">
                      {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            setSelectedUser(user);
                            setShowDetailsModal(true);
                          }}
                          className="p-2 hover:bg-rose-100 rounded-lg transition group"
                          title="Ver detalhes"
                        >
                          <Eye className="w-4 h-4 text-rose-400 group-hover:text-rose-500" />
                        </button>
                        <button 
                          onClick={() => {
                            setEditingUser(user);
                            setShowEditModal(true);
                          }}
                          className="p-2 hover:bg-rose-100 rounded-lg transition group"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4 text-rose-400 group-hover:text-rose-500" />
                        </button>
                        <button 
                          onClick={() => handleDelete(user.id)}
                          className="p-2 hover:bg-rose-100 rounded-lg transition group"
                          title="Remover"
                        >
                          <Trash2 className="w-4 h-4 text-rose-400 group-hover:text-rose-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-rose-100 text-center text-rose-300 text-xs lg:text-sm">
          Mostrando {filteredUsers.length} de {users.length} confirmações
        </div>
      </div>

      {/* Modais - mantidos iguais */}
      {showDetailsModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-xl text-rose-800 mb-4">Detalhes da Confirmação</h3>
            <div className="space-y-3">
              <p><strong className="text-rose-600">Nome:</strong> {selectedUser.fullName}</p>
              <p><strong className="text-rose-600">Telefone:</strong> {selectedUser.phone}</p>
              <p><strong className="text-rose-600">Presença:</strong> 
                <span className={selectedUser.attendance ? 'text-green-600' : 'text-red-600'}>
                  {selectedUser.attendance ? ' Confirmado' : ' Não virá'}
                </span>
              </p>
              <p><strong className="text-rose-600">Mensagem:</strong> {selectedUser.message || 'Nenhuma mensagem'}</p>
              <p><strong className="text-rose-600">Evento:</strong> {selectedUser.event?.title || 'Não especificado'}</p>
              <p><strong className="text-rose-600">Data da confirmação:</strong> {new Date(selectedUser.createdAt).toLocaleString('pt-BR')}</p>
            </div>
            <div className="flex justify-end mt-6">
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 bg-rose-500 text-white rounded-xl hover:bg-rose-600"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && editingUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-xl text-rose-800 mb-4">Editar Confirmação</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleUpdate(editingUser);
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-rose-600 mb-1">Nome</label>
                  <input
                    type="text"
                    value={editingUser.fullName}
                    onChange={(e) => setEditingUser({...editingUser, fullName: e.target.value})}
                    className="w-full p-2 border border-rose-100 rounded-xl focus:outline-none focus:border-rose-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-rose-600 mb-1">Telefone</label>
                  <input
                    type="text"
                    value={editingUser.phone}
                    onChange={(e) => setEditingUser({...editingUser, phone: e.target.value})}
                    className="w-full p-2 border border-rose-100 rounded-xl focus:outline-none focus:border-rose-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-rose-600 mb-1">Presença</label>
                  <select
                    value={editingUser.attendance ? 'yes' : 'no'}
                    onChange={(e) => setEditingUser({...editingUser, attendance: e.target.value === 'yes'})}
                    className="w-full p-2 border border-rose-100 rounded-xl focus:outline-none focus:border-rose-300"
                  >
                    <option value="yes">Confirmado</option>
                    <option value="no">Não virá</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-rose-600 mb-1">Mensagem</label>
                  <textarea
                    value={editingUser.message || ''}
                    onChange={(e) => setEditingUser({...editingUser, message: e.target.value})}
                    className="w-full p-2 border border-rose-100 rounded-xl focus:outline-none focus:border-rose-300"
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button 
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border border-rose-200 text-rose-600 rounded-xl hover:bg-rose-50"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-rose-500 text-white rounded-xl hover:bg-rose-600"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}