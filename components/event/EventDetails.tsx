import { Event } from "@/types/events";
import { Calendar, Clock, MapPin, Heart } from "lucide-react";

interface Props {
  event: Event;
}

export default function EventDetails({ event }: Props) {
  return (
    <div className="bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl p-8 w-full max-w-md mb-6 border border-rose-100/50">
      <div className="flex items-center justify-center gap-2 mb-6">
        <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
        <h2 className="font-serif text-2xl text-rose-800/90 tracking-wide">
          Detalhes do Evento
        </h2>
        <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
      </div>

      <div className="space-y-5">
        <div className="flex items-start gap-3 p-3 rounded-xl bg-rose-50/50 hover:bg-rose-50 transition-colors">
          <Calendar className="w-5 h-5 text-rose-400 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-rose-400 uppercase tracking-wider">
              Data
            </p>
            <p className="text-gray-700 font-light text-lg">
              25 de outubro de 2025
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