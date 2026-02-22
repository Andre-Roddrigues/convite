// MessageField.tsx
import { LucideIcon } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  icon?: LucideIcon;
  placeholder?: string;
}

export default function MessageField({ 
  value, 
  onChange, 
  icon: Icon,
  placeholder = "Deixe uma mensagem especial para os noivos..." 
}: Props) {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-medium text-rose-700">
        Mensagem para os noivos
      </label>
      
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-3 w-4 h-4 text-rose-300" />
        )}
        <textarea
          className={`w-full border border-rose-100 rounded-xl p-2 focus:border-rose-300 focus:ring-1 focus:ring-rose-200 outline-none ${
            Icon ? 'pl-10' : ''
          }`}
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}