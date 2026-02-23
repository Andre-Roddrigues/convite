"use client";

import { confirmPresence } from "@/services/rsvp.service";
import { useState } from "react";
import toast from "react-hot-toast";
import Button from "../ui/Button";
import Input from "../ui/Input";
import AttendanceSelector from "./AttendanceSelector";
import MessageField from "./MessageField";
import { Heart, Phone, User } from "lucide-react";

interface Props {
  eventId: string;
}

export default function RSVPForm({ eventId }: Props) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [attendance, setAttendance] = useState<"yes" | "no">("yes");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    if (!fullName || !phone) {
      toast.error("Por favor, preencha seu nome e telefone!", {
        style: {
          background: '#fee2e2',
          color: '#991b1b',
          border: '1px solid #fecaca'
        },
        icon: '❤️'
      });
      return;
    }

    setIsSubmitting(true);
    
    const loadingToast = toast.loading('Confirmando sua presença...', {
      style: {
        background: '#fef9c3',
        color: '#854d0e',
      }
    });
    
    try {
      // Chamada à API
      const result = await confirmPresence({
        eventId,
        fullName,
        phone,
        attendance,
        message
      });

      console.log('Resposta da API:', result); // Para debug

      toast.success('Presença confirmada com sucesso! ❤️', {
        id: loadingToast,
        duration: 4000,
        style: {
          background: '#fce7f3',
          color: '#9d174d',
          border: '1px solid #fbcfe8'
        },
        icon: '💒'
      });
      
      setFullName("");
      setPhone("");
      setAttendance("yes");
      setMessage("");
      
    } catch (error) {
      console.error('Erro detalhado:', error);
      
      toast.error('Ops! Algo deu errado. Tente novamente.', {
        id: loadingToast,
        duration: 4000,
        style: {
          background: '#fee2e2',
          color: '#991b1b',
          border: '1px solid #fecaca'
        },
        icon: '😢'
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl p-8 w-full max-w-md border border-rose-100/50">
      <div className="text-center mb-8">
        <div className="flex justify-center gap-2 mb-3">
          <Heart className="w-6 h-6 text-rose-400 fill-rose-400" />
          <Heart className="w-6 h-6 text-rose-300 fill-rose-300" />
          <Heart className="w-6 h-6 text-rose-400 fill-rose-400" />
        </div>
        <h2 className="font-serif text-3xl text-rose-800/90 mb-2">
          Confirme sua Presença
        </h2>
        <p className="text-rose-300 text-sm italic">
          Sua presença é o nosso presente
        </p>
      </div>

      <div className="space-y-5">
        <div className="space-y-4">
          <Input
            icon={User}
            label="Seu nome completo"
            value={fullName}
            onChange={setFullName}
            placeholder="Digite seu nome completo"
          />

          <Input
            icon={Phone}
            label="Telefone para contato"
            value={phone}
            onChange={setPhone}
            placeholder="84 123 456 ou +258 84 123 456"
          />

          <div className="bg-rose-50/50 p-4 rounded-xl">
            <p className="text-sm font-medium text-rose-400 mb-3 flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Você poderá comparecer?
            </p>
            <AttendanceSelector
              value={attendance}
              onChange={setAttendance}
            />
          </div>

          <MessageField
            icon={Heart}
            value={message}
            onChange={setMessage}
            placeholder="Deixe uma mensagem especial para os noivos (opcional)"
          />
        </div>

        <Button onClick={handleSubmit}>
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Confirmando...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Heart className="w-4 h-4" />
              Confirmar Presença
              <Heart className="w-4 h-4" />
            </span>
          )}
        </Button>
      </div>

      <p className="text-center text-xs text-rose-200 mt-6">
        * Sua confirmação é muito importante para nós
      </p>
    </div>
  );
}