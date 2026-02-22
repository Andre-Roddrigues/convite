// RSVPForm.tsx
"use client";

import { confirmPresence } from "@/services/rsvp.service";
import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import AttendanceSelector from "./AttendanceSelector";
import MessageField from "./MessageField";
import { Heart, Phone, User, CheckCircle } from "lucide-react";

interface Props {
  eventId: string;
}

export default function RSVPForm({ eventId }: Props) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [attendance, setAttendance] = useState<"yes" | "no">("yes");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  async function handleSubmit() {
    if (!fullName || !phone) {
      alert("Por favor, preencha seu nome e telefone!");
      return;
    }

    setIsSubmitting(true);
    
    try {
      await confirmPresence({
        eventId,
        fullName,
        phone,
        attendance,
        message
      });

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
      // Limpar formulário
      setFullName("");
      setPhone("");
      setAttendance("yes");
      setMessage("");
    } catch (error) {
      alert("Ops! Algo deu errado. Tente novamente.");
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

      {showSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-700 animate-fade-in">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <p className="text-sm font-medium">Presença confirmada com sucesso! ❤️</p>
        </div>
      )}

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