// Input.tsx
import { LucideIcon } from "lucide-react";

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  icon?: LucideIcon; // Adicionando prop para ícone
  placeholder?: string; // Adicionando placeholder opcional
}

export default function Input({ 
  label, 
  value, 
  onChange, 
  className = "", 
  icon: Icon,
  placeholder 
}: Props) {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium text-rose-700">{label}</label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-300" />
        )}
        <input
          className={`w-full border border-rose-100 rounded-xl p-2 focus:border-rose-300 focus:ring-1 focus:ring-rose-200 outline-none ${
            Icon ? 'pl-10' : ''
          } ${className}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}