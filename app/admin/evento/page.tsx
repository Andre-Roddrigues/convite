// app/admin/eventos/page.tsx
import EventsTable from "@/components/admin/EventsTable";

export const metadata = {
  title: "Gestão de Eventos | Admin Casamento",
  description: "Gerencie todos os eventos do casamento",
};

export default function EventosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-white">
      {/* Header para mobile */}
      <div className="lg:hidden bg-white/90 backdrop-blur-sm border-b border-rose-100 p-4 sticky top-0 z-10">
        <h1 className="font-serif text-xl text-rose-800">Gestão de Eventos</h1>
        <p className="text-xs text-rose-300">Gerencie todos os eventos do casamento</p>
      </div>

      {/* Conteúdo principal com margem para o sidebar no desktop */}
      <div className="lg:ml-64 p-4 lg:p-8 pb-24 lg:pb-8">
        <EventsTable />
      </div>
    </div>
  );
}