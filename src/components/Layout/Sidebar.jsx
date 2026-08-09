import { Link, useLocation } from 'react-router-dom';
import { HardHat, Map, FolderKanban, FileSpreadsheet, LogOut } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Dashboard Utama', icon: Map },
    { path: '/projects', label: 'List Project', icon: FolderKanban },
    { path: '/laporan', label: 'Input Laporan', icon: FileSpreadsheet },
  ];

const [isSidebarOpen, setIsSidebarOpen] = useState(false);

return (
  <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row">
    {/* Topbar Khusus Mobile (Muncul hanya di HP) */}
    <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800">
      <h1 className="font-bold text-white text-sm">Monitoring Proyek</h1>
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="p-2 text-slate-300 hover:text-white bg-slate-800 rounded-lg"
      >
        <Menu className="w-5 h-5" />
      </button>
    </div>

    {/* Sidebar Drawer */}
    <aside className={`
      fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0
      ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      {/* Isi Menu Sidebar */}
    </aside>

    {/* Backdrop / Overlay Hitam saat Sidebar Buka di HP */}
    {isSidebarOpen && (
      <div 
        onClick={() => setIsSidebarOpen(false)}
        className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
      />
    )}

    {/* Main Content Area */}
    <main className="flex-1 p-3 sm:p-6 md:p-8 overflow-y-auto">
      {/* Route / Page Content */}
    </main>
  </div>
);

  return (
    <div className="flex flex-col w-64 h-screen bg-slate-800 border-r border-slate-700/60 text-slate-300 p-4 justify-between">
      <div className="space-y-6">
        <div className="flex items-center gap-3 px-2">
          <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-500">
            <HardHat className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white">CONS-MONITORING</h1>
            <p className="text-[10px] text-slate-400">Consultant System</p>
          </div>
        </div>

        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
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

      <Link
        to="/login"
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all"
      >
        <LogOut className="w-4 h-4" />
        Keluar Akun
      </Link>
    </div>
  );
}