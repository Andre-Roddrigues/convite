// components/admin/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Heart, 
  Calendar, 
  Users, 
  Settings, 
  LogOut,
  Home,
  Bell
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/admin" },
    { icon: Calendar, label: "Eventos", href: "/admin/evento" },
    { icon: Users, label: "Confirmações", href: "/admin/confirmar" },
  ];

  return (
    <aside className="w-64 bg-white/90 backdrop-blur-sm border-r border-rose-100 h-screen fixed left-0 top-0 hidden md:flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-rose-100">
        <div className="flex items-center gap-2">
          <Heart className="w-8 h-8 text-rose-400 fill-rose-400" />
          <div>
            <h1 className="font-serif text-xl text-rose-800">Admin</h1>
            <p className="text-xs text-rose-300">Casamento</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive 
                      ? 'bg-rose-50 text-rose-600' 
                      : 'text-gray-600 hover:bg-rose-50/50 hover:text-rose-500'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-rose-500' : ''}`} />
                  <span className="font-medium">{item.label}</span>
                  {item.label === "Notificações" && (
                    <span className="ml-auto w-2 h-2 bg-rose-400 rounded-full animate-pulse" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-rose-100">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-600 hover:bg-rose-50/50 hover:text-rose-500 transition-all">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sair</span>
        </button>
      </div>
    </aside>
  );
}