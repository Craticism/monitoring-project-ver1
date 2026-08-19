import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HardHat, Map, FolderKanban, ClipboardList, LogOut, Menu, X, 
  Users, Edit3, Check, UploadCloud, Image as ImageIcon,
  Sun, Moon // <-- Import icon untuk tema
} from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // --- STATE TEMA (DARK/LIGHT MODE) ---
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Ambil preferensi dari local storage, default ke true (Dark)
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') !== 'light';
    }
    return true;
  });

  // Efek untuk mengganti class 'dark' di elemen HTML utama
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // --- STATE UNTUK EDIT PERUSAHAAN ---
  const [isEditMode, setIsEditMode] = useState(false);
  const [companyInfo, setCompanyInfo] = useState({
    name: 'CONS-MONITORING',
    subtitle: 'Consultant System',
    logoUrl: '' 
  });
  const [tempInfo, setTempInfo] = useState({ ...companyInfo });
  const fileInputRef = useRef(null);

  const menuItems = [
    { path: '/', label: 'Dashboard Utama', icon: Map },
    { path: '/projects', label: 'List Project', icon: FolderKanban },
    { path: '/laporan', label: 'List Laporan', icon: ClipboardList },
    { path: '/accounts', label: 'Manajemen Akun', icon: Users },
  ];

  const handleItemClick = () => {
    if (isCollapsed) setIsCollapsed(false);
    setIsMobileOpen(false);
  };

  const handleSave = () => {
    setCompanyInfo(tempInfo);
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setTempInfo(companyInfo);
    setIsEditMode(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setTempInfo({ ...tempInfo, logoUrl: imageUrl });
    }
  };

  return (
    <>
      {/* Tombol Toggle Mobile Floating */}
      <button 
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed top-4 right-4 z-50 p-2.5 bg-white dark:bg-slate-900/90 text-slate-600 dark:text-slate-300 rounded-xl border border-slate-200 dark:border-slate-700/80 shadow-xl backdrop-blur-md transition-all"
      >
        {isMobileOpen ? <X className="w-5 h-5 text-amber-500" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Backdrop Hitam Mobile */}
      {isMobileOpen && (
        <div 
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-slate-900/60 z-40 md:hidden backdrop-blur-sm"
        />
      )}

      {/* Sidebar Component (Sekarang Mendukung Class dark:) */}
      <aside 
        className={`
          fixed md:static inset-y-0 left-0 z-40 flex flex-col justify-between transition-all duration-300 ease-in-out
          bg-slate-50 dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700/60 
          text-slate-700 dark:text-slate-300 p-4
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
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full tracking-wider bg-slate-200 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-slate-700/60">
                  v1.0.0
                </span>
              )}
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-1.5 rounded-lg transition-colors cursor-pointer text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700/60"
                title={isCollapsed ? "Buka Sidebar" : "Tutup Sidebar"}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

            {/* 2. Baris Bawah: Brand Logo & Teks */}
            <div className={`relative group ${isCollapsed ? 'flex justify-center' : 'px-1'}`}>
              
              {!isCollapsed && !isEditMode && (
                <button 
                  onClick={() => setIsEditMode(true)}
                  className="absolute -top-3 right-0 p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-all z-10 bg-white dark:bg-slate-800 text-slate-400 hover:text-amber-500 border border-slate-200 dark:border-slate-700 shadow-sm"
                  title="Edit Profil Perusahaan"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              )}

              {isEditMode && !isCollapsed ? (
                /* FORM EDIT MODE */
                <div className="flex flex-col items-center gap-3 mt-1 animate-fade-in p-3 rounded-xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700/50 shadow-sm">
                  <div 
                    className="w-16 h-16 rounded-none flex items-center justify-center cursor-pointer overflow-hidden relative group/img bg-slate-100 dark:bg-slate-900 border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-amber-500"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {tempInfo.logoUrl ? (
                      <img src={tempInfo.logoUrl} alt="Logo" className="w-full h-full object-contain p-1" />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-slate-400 dark:text-slate-500" />
                    )}
                    <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                      <UploadCloud className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />

                  <div className="space-y-2 w-full">
                    <input 
                      type="text" 
                      value={tempInfo.name} 
                      onChange={(e) => setTempInfo({...tempInfo, name: e.target.value})}
                      className="w-full rounded text-xs font-bold px-2 py-1.5 text-center focus:outline-none focus:border-amber-500 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white"
                      placeholder="Nama Perusahaan"
                    />
                    <input 
                      type="text" 
                      value={tempInfo.subtitle} 
                      onChange={(e) => setTempInfo({...tempInfo, subtitle: e.target.value})}
                      className="w-full rounded text-[10px] px-2 py-1.5 text-center focus:outline-none focus:border-amber-500 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                      placeholder="Sub Judul"
                    />
                  </div>

                  <div className="flex justify-center gap-2 w-full pt-1">
                    <button onClick={handleCancel} className="flex-1 py-1.5 flex justify-center rounded-md transition-all bg-white dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-500/20 text-rose-500 dark:text-rose-400 border border-slate-200 dark:border-slate-700">
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={handleSave} className="flex-1 py-1.5 flex justify-center rounded-md transition-all bg-emerald-50 dark:bg-emerald-500/10 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                /* VIEW MODE NORMAL */
                <div className={`flex items-center gap-3 overflow-hidden ${isCollapsed ? 'justify-center' : ''}`}>
                  <div 
                    onClick={handleItemClick}
                    className={`w-10 h-10 rounded-none flex items-center justify-center shrink-0 cursor-pointer overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 ${isCollapsed ? '' : 'shadow-sm dark:shadow-black/20'}`}
                    title={companyInfo.name}
                  >
                    {companyInfo.logoUrl ? (
                      <img src={companyInfo.logoUrl} alt="Logo" className="w-full h-full object-contain p-0.5" />
                    ) : (
                      <HardHat className="w-5 h-5 text-amber-500" />
                    )}
                  </div>

                  {!isCollapsed && (
                    <div className="whitespace-nowrap transition-opacity duration-200 flex-1 min-w-0">
                      <h1 className="text-sm font-bold tracking-wide truncate text-slate-800 dark:text-white">
                        {companyInfo.name}
                      </h1>
                      <p className="text-[10px] truncate text-amber-600 dark:text-amber-500/90 font-medium">
                        {companyInfo.subtitle}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Navigasi Menu */}
          <nav className="space-y-1.5 mt-4">
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
                      ? 'bg-amber-500 text-white dark:text-slate-950 font-semibold shadow-md shadow-amber-500/10'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white'
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

{/* --- FOOTER: TEMA & LOGOUT --- */}
        <div className="border-t border-slate-200 dark:border-slate-700/60 pt-4 flex flex-col gap-2">
          
          {/* Toggle Switch Dark/Light Mode */}
          {isCollapsed ? (
            // Tampilan saat Sidebar TERTUTUP (Hanya Ikon)
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              title={isDarkMode ? "Ganti ke Mode Terang" : "Ganti ke Mode Gelap"}
              className="flex items-center justify-center py-2.5 rounded-xl transition-all cursor-pointer w-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-500 shrink-0" /> : <Moon className="w-5 h-5 text-indigo-400 shrink-0" />}
            </button>
          ) : (
            // Tampilan saat Sidebar TERBUKA (Teks + Saklar)
            <div className="flex items-center justify-between px-3 py-1.5">
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                {isDarkMode ? 'Mode Gelap' : 'Mode Terang'}
              </span>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none cursor-pointer ${
                  isDarkMode ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ease-in-out ${
                    isDarkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          )}

          {/* Keluar Akun */}
          <Link
            to="/login"
            onClick={handleItemClick}
            title={isCollapsed ? "Keluar Akun" : undefined}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
              isCollapsed ? 'justify-center px-0' : ''
            } text-rose-500 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-300`}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap">Keluar Akun</span>}
          </Link>

        </div>
      </aside>
    </>
  );
}