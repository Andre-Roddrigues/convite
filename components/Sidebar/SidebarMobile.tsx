// components/admin/SidebarMobile.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Heart,
  Users,
  Calendar,
  Settings,
  Bell,
  Home,
  LogOut,
  MoreVertical,
  MessageCircle,
  Sparkles,
  PartyPopper,
  Gift,
  Camera,
  Music,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Componente LogoutButton (se não existir, crie um simples)
const LogoutButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <button onClick={() => console.log('logout')} className="w-full">
      {children}
    </button>
  );
};

const SidebarMobile = () => {
  const [activeItem, setActiveItem] = useState<string>("");
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/admin/dashboard", label: "Home", Icon: Home },
    { href: "/admin/confirmacoes", label: "Confirmações", Icon: Users },
    { href: "/admin/eventos", label: "Eventos", Icon: Calendar },
    { href: "/admin/mensagens", label: "Mensagens", Icon: MessageCircle },
    { href: "/admin/presentes", label: "Presentes", Icon: Gift },
  ];

  const moreItems = [
    { href: "/admin/fotos", label: "Fotos", Icon: Camera },
    { href: "/admin/musica", label: "Música", Icon: Music },
    { href: "/admin/notificacoes", label: "Notificações", Icon: Bell },
    { href: "/admin/configuracoes", label: "Configurações", Icon: Settings },
    { href: "/admin/relatorios", label: "Relatórios", Icon: Sparkles },
  ];

  useEffect(() => {
    const currentPath = pathname;
    const allItems = [...navItems, ...moreItems];
    const active = allItems.find(item => 
      currentPath === item.href || currentPath.startsWith(`${item.href}/`)
    );
    setActiveItem(active?.href || "/admin/dashboard");
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isMoreButton = target.closest('[data-more-button]');
      if (!isMoreButton && showMoreMenu) setShowMoreMenu(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showMoreMenu]);

  return (
    <>
      <div className={`
        lg:hidden fixed bottom-0 left-0 right-0 z-50
        bg-gradient-to-t from-[#4a044e] via-[#701a75] to-[#86198f]
        border-t border-[#fbcfe8]/50
        backdrop-blur-lg bg-opacity-95
        transition-all duration-300
        ${isScrolled ? 'shadow-2xl shadow-[#f472b6]/20' : ''}
      `}>
        <div className="flex items-center justify-between px-2 py-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 group"
              onClick={() => {
                setActiveItem(item.href);
                setShowMoreMenu(false);
              }}
            >
              <div className={`
                p-2.5 rounded-lg mb-1 transition-all duration-200
                ${activeItem === item.href 
                  ? 'bg-gradient-to-br from-[#f472b6] to-[#86198f] shadow-lg shadow-[#f472b6]/20' 
                  : 'bg-[#fdf2f8] group-hover:bg-[#fce7f3]'
                }
              `}>
                <item.Icon className={`
                  w-5 h-5 transition-all duration-200
                  ${activeItem === item.href 
                    ? 'text-white scale-110' 
                    : 'text-[#a21caf] group-hover:text-[#86198f]'
                  }
                `} />
              </div>
              <span className={`
                text-[10px] font-medium transition-all duration-200
                ${activeItem === item.href 
                  ? 'text-[#f472b6] font-semibold' 
                  : 'text-[#a21caf]/70 group-hover:text-[#86198f]'
                }
              `}>
                {item.label}
              </span>
              {activeItem === item.href && (
                <div className="w-1 h-1 bg-[#f472b6] rounded-full mt-1 animate-pulse"></div>
              )}
            </Link>
          ))}

          <div className="relative">
            <button
              data-more-button
              onClick={(e) => {
                e.stopPropagation();
                setShowMoreMenu(!showMoreMenu);
              }}
              className="flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 group"
            >
              <div className={`
                p-2.5 rounded-lg mb-1 transition-all duration-200
                ${showMoreMenu 
                  ? 'bg-gradient-to-br from-[#f472b6] to-[#86198f] shadow-lg shadow-[#f472b6]/20' 
                  : 'bg-[#fdf2f8] group-hover:bg-[#fce7f3]'
                }
              `}>
                <MoreVertical className={`
                  w-5 h-5 transition-all duration-200
                  ${showMoreMenu 
                    ? 'text-white scale-110' 
                    : 'text-[#a21caf] group-hover:text-[#86198f]'
                  }
                `} />
              </div>
              <span className={`
                text-[10px] font-medium transition-all duration-200
                ${showMoreMenu 
                  ? 'text-[#f472b6] font-semibold' 
                  : 'text-[#a21caf]/70 group-hover:text-[#86198f]'
                }
              `}>
                Mais
              </span>
            </button>

            {showMoreMenu && (
              <div className="absolute bottom-full right-0 mb-2 w-64 bg-gradient-to-b from-[#4a044e] to-[#701a75] border border-[#fbcfe8] rounded-xl shadow-2xl shadow-black/50 animate-fadeIn z-50">
                <div className="p-2">
                  <div className="px-3 py-3 mb-2 border-b border-[#fbcfe8]/30">
                    <div className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-[#f472b6] fill-[#f472b6]" />
                      <span className="text-sm font-semibold text-[#fbcfe8] uppercase tracking-wider">
                        Menu do Casamento
                      </span>
                    </div>
                  </div>
                  
                  {moreItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => {
                        setActiveItem(item.href);
                        setShowMoreMenu(false);
                      }}
                      className={`
                        flex items-center gap-3 p-3 rounded-lg transition-all duration-200 mb-1
                        ${activeItem === item.href 
                          ? 'bg-gradient-to-r from-[#f472b6]/20 to-[#a21caf]/20' 
                          : 'hover:bg-[#a21caf]/30'
                        }
                      `}
                    >
                      <div className={`
                        p-2 rounded-lg 
                        ${activeItem === item.href ? 'bg-[#f472b6]/20' : 'bg-[#a21caf]/40'}
                      `}>
                        <item.Icon className={`
                          w-4 h-4
                          ${activeItem === item.href ? 'text-[#f472b6]' : 'text-[#fbcfe8]'}
                        `} />
                      </div>
                      <span className={`
                        text-sm font-medium
                        ${activeItem === item.href ? 'text-white' : 'text-[#fce7f3]'}
                      `}>
                        {item.label}
                      </span>
                      {item.label === "Notificações" && (
                        <div className="ml-auto w-5 h-5 bg-[#f472b6]/30 rounded-full flex items-center justify-center">
                          <span className="text-xs text-[#fbcfe8] font-bold">3</span>
                        </div>
                      )}
                    </Link>
                  ))}
                  
                  <div className="bg-gradient-to-r from-[#f472b6]/10 to-[#a21caf]/10 rounded-lg p-3 my-2">
                    <div className="flex items-center gap-2">
                      <PartyPopper className="w-4 h-4 text-[#f472b6]" />
                      <span className="text-xs text-[#fbcfe8]">Faltam 30 dias para o grande dia!</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-[#fbcfe8]/30 mt-2 pt-2">
                    <LogoutButton>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-rose-500/10 to-pink-600/10 hover:from-rose-500/20 hover:to-pink-600/20 transition-all duration-200 cursor-pointer">
                        <div className="p-2 rounded-lg bg-rose-500/20">
                          <LogOut className="w-4 h-4 text-rose-400" />
                        </div>
                        <span className="text-sm font-medium text-rose-400">Sair do painel</span>
                      </div>
                    </LogoutButton>
                  </div>
                </div>
                
                <div className="absolute -bottom-2 right-4 w-4 h-4 bg-[#701a75] border-r border-b border-[#fbcfe8] transform rotate-45"></div>
              </div>
            )}
          </div>
        </div>

        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#f472b6] to-transparent rounded-full opacity-50"></div>
        </div>
      </div>

      <div className="lg:hidden pb-20"></div>

      <div className="lg:hidden fixed bottom-20 right-4 z-40">
        <button className="p-4 rounded-full bg-gradient-to-br from-[#f472b6] to-[#86198f] shadow-lg shadow-[#f472b6]/30 animate-pulse-slow group hover:scale-110 transition-transform">
          <Heart className="w-6 h-6 text-white fill-white group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </>
  );
};

export default SidebarMobile;