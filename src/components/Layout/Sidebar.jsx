import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HardHat, Map, FolderKanban, ClipboardList, LogOut, Menu, X } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { path: '/', label: 'Dashboard Utama', icon: Map },
    { path: '/projects', label: 'List Project', icon: FolderKanban },
    { path: '/laporan', label: 'List Laporan', icon: ClipboardList },
  ];

  const handleItemClick = () => {
    if (isCollapsed) {
      setIsCollapsed(false);
    }
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Tombol Toggle Mobile Floating */}
      <button 
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed top-4 right-4 z-50 p-2.5 bg-slate-900/90 text-slate-300 hover:text-white rounded-xl border border-slate-700/80 shadow-xl backdrop-blur-md focus:outline-none transition-all"
        aria-label="Toggle Navigation"
      >
        {isMobileOpen ? (
          <X className="w-5 h-5 text-amber-500" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </button>

      {/* Backdrop Hitam Mobile */}
      {isMobileOpen && (
        <div 
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
        />
      )}

      {/* Sidebar Component */}
      <aside 
        className={`
          fixed md:static inset-y-0 left-0 z-40 bg-slate-800 border-r border-slate-700/60 text-slate-300 p-4 flex flex-col justify-between transition-all duration-300 ease-in-out
          ${isCollapsed ? 'w-20' : 'w-64'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex flex-col gap-4">
            {/* 1. Baris Atas: Versi Aplikasi & Tombol Hamburger */}
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-1`}>
              {!isCollapsed && (
                <span className="text-[10px] font-semibold text-slate-400 bg-slate-900/60 border border-slate-700/60 px-2 py-0.5 rounded-full tracking-wider">
                  v1.0.0
                </span>
              )}

              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700/60 rounded-lg transition-colors cursor-pointer"
                title={isCollapsed ? "Buka Sidebar" : "Tutup Sidebar"}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

            {/* 2. Baris Bawah: Brand Logo & Teks */}
            <div className={`flex items-center gap-3 overflow-hidden ${isCollapsed ? 'justify-center' : 'px-1'}`}>
              <div 
                onClick={handleItemClick}
                className="p-2 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-500 shrink-0 cursor-pointer"
                title="CONS-MONITORING"
              >
                <HardHat className="w-6 h-6" />
              </div>

              {!isCollapsed && (
                <div className="whitespace-nowrap transition-opacity duration-200">
                  <h1 className="text-sm font-bold text-white tracking-wide">CONS-MONITORING</h1>
                  <p className="text-[10px] text-slate-400">Consultant System</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigasi Menu */}
          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              
              const isActive = item.path === '/' 
                ? location.pathname === '/' 
                : location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleItemClick}
                  title={isCollapsed ? item.label : undefined}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isCollapsed ? 'justify-center px-0' : ''
                  } ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-semibold shadow-md shadow-amber-500/10'
                      : 'hover:bg-slate-700/50 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {!isCollapsed && (
                    <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                      {item.label}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Keluar Akun */}
        <Link
          to="/login"
          onClick={handleItemClick}
          title={isCollapsed ? "Keluar Akun" : undefined}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all ${
            isCollapsed ? 'justify-center px-0' : ''
          }`}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!isCollapsed && <span className="whitespace-nowrap">Keluar Akun</span>}
        </Link>
      </aside>
    </>
  );
}