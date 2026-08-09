import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HardHat, Map, FolderKanban, FileSpreadsheet, LogOut, Menu, X } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { path: '/', label: 'Dashboard Utama', icon: Map },
    { path: '/projects', label: 'List Project', icon: FolderKanban },
    { path: '/laporan', label: 'Input Laporan', icon: FileSpreadsheet },
  ];

  return (
    <>
      {/* Topbar Khusus Mobile (Hanya muncul di HP) */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-500">
            <HardHat className="w-5 h-5" />
          </div>
          <span className="font-bold text-sm">CONS-MONITORING</span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-slate-300 hover:text-white bg-slate-800 rounded-lg border border-slate-700 focus:outline-none"
        >
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Backdrop / Overlay Hitam saat Sidebar Terbuka di HP */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
        />
      )}

      {/* Sidebar Drawer (Responsif HP & Desktop) */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 bg-slate-800 border-r border-slate-700/60 text-slate-300 p-4 flex flex-col justify-between transition-transform duration-200 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="space-y-6">
          {/* Header Logo */}
          <div className="flex items-center gap-3 px-2">
            <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-500">
              <HardHat className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white">CONS-MONITORING</h1>
              <p className="text-[10px] text-slate-400">Consultant System</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)} // Otomatis menutup menu di HP saat di-klik
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-semibold shadow-md'
                      : 'hover:bg-slate-700/50 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Tombol Keluar */}
        <Link
          to="/login"
          onClick={() => setIsSidebarOpen(false)}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Keluar Akun
        </Link>
      </aside>
    </>
  );
}