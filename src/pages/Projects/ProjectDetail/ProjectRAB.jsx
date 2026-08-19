import React, { useState } from 'react';
import { useNavigate, useLocation, useParams, Link } from 'react-router-dom';
import { 
  DollarSign, 
  ArrowLeft, 
  Building2, 
  Info, 
  FileSpreadsheet, 
  TrendingUp, 
  Compass, 
  PieChart, 
  TrendingDown, 
  Plus, 
  Edit3, 
  Trash2,
  ListPlus,
  Download
} from 'lucide-react';

// Data RAB format Hierarki (Grouped per Divisi)
const groupedRABData = [
  {
    id: 'div-1',
    namaDivisi: 'DIVISI 1. UMUM',
    totalRencana: '115.170.000,00',
    totalRealisasi: '69.170.000,00',
    pekerjaan: [
      { id: '1-sub-1', isSubheader: true, label: 'Mobilisasi & Peralatan' },
      { id: '1-item-1', label: 'Concrete Testing Cylinder Mould', sat: 'Ls', renVol: '10', renHarga: '1.900.000,00', renJumlah: '19.000.000,00', realVol: '9', realHarga: '1.900.000,00', realJumlah: '17.100.000,00' },
      { id: '1-item-2', label: 'Excavator 80-140 HP', sat: 'Unit', renVol: '20', renHarga: '200.000,00', renJumlah: '4.000.000,00', realVol: '1', realHarga: '200.000,00', realJumlah: '200.000,00' },
      { id: '1-sub-2', isSubheader: true, label: 'Keselamatan dan Kesehatan Kerja (K3)' },
      { id: '1-item-3', label: 'Topi Pelindung (Safety helmet)', sat: 'Buah', renVol: '15', renHarga: '70.000,00', renJumlah: '1.050.000,00', realVol: '15', realHarga: '70.000,00', realJumlah: '1.050.000,00' },
      { id: '1-item-4', label: 'Sepatu Keselamatan (Safety shoes)', sat: 'Psg', renVol: '15', renHarga: '205.000,00', renJumlah: '3.075.000,00', realVol: '15', realHarga: '205.000,00', realJumlah: '3.075.000,00' },
    ]
  },
  {
    id: 'div-2',
    namaDivisi: 'DIVISI 2. DRAINASE',
    totalRencana: '181.412.000,00',
    totalRealisasi: '181.412.000,00',
    pekerjaan: [
      { id: '2-item-1', label: 'Saluran berbentuk U Tipe Ds 1', sat: 'm1', renVol: '95', renHarga: '1.043.900,00', renJumlah: '99.170.500,00', realVol: '95', realHarga: '1.043.900,00', realJumlah: '99.170.500,00' },
      { id: '2-item-2', label: 'Tutup U-Ditch 100x100cm', sat: 'm1', renVol: '95', renHarga: '865.700,00', renJumlah: '82.241.500,00', realVol: '95', realHarga: '865.700,00', realJumlah: '82.241.500,00' },
    ]
  },
  {
    id: 'div-7',
    namaDivisi: 'DIVISI 7. STRUKTUR',
    totalRencana: '850.500.000,00',
    totalRealisasi: '420.000.000,00',
    pekerjaan: [
      { id: '7-item-1', label: 'Beton Struktur, fc 20 Mpa', sat: 'M3', renVol: '150', renHarga: '2.226.585,00', renJumlah: '333.987.750,00', realVol: '80', realHarga: '2.226.585,00', realJumlah: '178.126.800,00' },
      { id: '7-item-2', label: 'Anyaman kawat Yang Dilas (Welder Wire Mesh)', sat: 'Kg', renVol: '1200', renHarga: '37.000,00', renJumlah: '44.400.000,00', realVol: '600', realHarga: '37.000,00', realJumlah: '22.200.000,00' },
    ]
  }
];

export default function ProjectRAB({ selectedProject }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [isEditMode, setIsEditMode] = useState(false);

  const project = selectedProject || location.state || {
    id: id || 1,
    namaProyek: 'Pembangunan Jembatan Sei Tabalong STA 04',
    kodeKontrak: '600/012/PUPR-TAB/2026',
    nilaiKontrak: 2500000000,
    progress: 35.5
  };

  const progress = project?.progress || project?.rabProgress || 35.5;
  const projectId = project.id || id || 1;

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka || 0);
  };

  const renderValue = (val, defaultColor = 'text-slate-700 dark:text-slate-300') => {
    if (!val) return <span className="text-slate-400 dark:text-slate-500">-</span>;
    if (val.includes('#ERROR!')) return <span className="text-rose-600 dark:text-rose-400 font-bold bg-rose-100 dark:bg-rose-950/40 px-1.5 py-0.5 rounded text-[9px]">{val}</span>;
    if (val.includes('#REF!')) return <span className="text-amber-600 dark:text-amber-400 font-bold bg-amber-100 dark:bg-amber-950/40 px-1.5 py-0.5 rounded text-[9px]">{val}</span>;
    return <span className={defaultColor}>{val}</span>;
  };

  return (
    <div className="w-full space-y-5">
      
      {/* --- TOP BAR NAVIGATION (RESPONSIVE) --- */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 shrink-0 mb-2">
        
        {/* Kiri: Tombol Back & Judul */}
        <div className="flex items-start lg:items-center gap-3 shrink-0">
          <Link
            to={`/projects/projectdata`}
            state={project}
            className="p-2.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/80 text-slate-600 dark:text-slate-300 rounded-xl transition-all shadow-sm mt-0.5 lg:mt-0"
            title="Kembali"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="text-base lg:text-lg font-bold text-slate-800 dark:text-white leading-snug flex items-start lg:items-center gap-1.5 flex-wrap">
              <Building2 className="w-4 h-4 text-amber-500 shrink-0 mt-1 lg:mt-0" /> 
              <span>Rencana Anggaran Biaya (RAB)</span>
            </h1>
            <p className="text-[10px] lg:text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 lg:line-clamp-1 leading-relaxed">
              {project.namaProyek} • SPK{project.kodeKontrak}
            </p>
          </div>
        </div>

        {/* Kanan: Action Buttons & Navigasi Modul (Sejajar Kiri-Kanan di Mobile) */}
        <div className="flex flex-col lg:flex-row items-center gap-2 w-full lg:w-auto mt-2 lg:mt-0">
          
          {/* Card 1: Action Buttons */}
          <div className="flex items-center w-full lg:w-auto justify-between lg:justify-start gap-1 bg-white dark:bg-slate-800/80 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700/60 shadow-sm overflow-x-auto hide-scrollbar">
            <button className="flex-1 lg:flex-none flex justify-center items-center gap-1.5 py-2 lg:py-1.5 lg:px-3 bg-transparent hover:bg-emerald-50 dark:hover:bg-emerald-500/10 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 text-[11px] font-medium rounded-lg transition-all whitespace-nowrap">
              <Plus className="w-4 h-4 lg:w-3.5 lg:h-3.5" /> <span className="hidden lg:inline">Tambah Divisi</span>
            </button>
            <button 
              onClick={() => setIsEditMode(!isEditMode)} 
              className={`flex-1 lg:flex-none flex justify-center items-center gap-1.5 py-2 lg:py-1.5 lg:px-3 ${isEditMode ? 'bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-transparent' : 'bg-transparent hover:bg-blue-50 dark:hover:bg-blue-500/10 text-slate-600 dark:text-slate-300'} text-[11px] font-medium rounded-lg transition-all whitespace-nowrap`}
            >
              <Edit3 className="w-4 h-4 lg:w-3.5 lg:h-3.5" /> <span className="hidden lg:inline">{isEditMode ? 'Selesai Edit' : 'Edit Mode'}</span>
            </button>
            <div className="hidden lg:block w-px h-5 bg-slate-200 dark:bg-slate-700/80 mx-0.5 shrink-0"></div>
            <button className="flex-1 lg:flex-none flex justify-center items-center gap-1.5 py-2 lg:py-1.5 lg:px-3 bg-transparent hover:bg-emerald-50 dark:hover:bg-emerald-500/10 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 text-[11px] font-medium rounded-lg transition-all whitespace-nowrap">
              <FileSpreadsheet className="w-4 h-4 lg:w-3.5 lg:h-3.5" /> <span className="hidden lg:inline">Export Excel</span>
            </button>
            <button className="flex-1 lg:flex-none flex justify-center items-center gap-1.5 py-2 lg:py-1.5 lg:px-3 bg-transparent hover:bg-amber-50 dark:hover:bg-amber-500/10 text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 text-[11px] font-medium rounded-lg transition-all whitespace-nowrap">
              <Download className="w-4 h-4 lg:w-3.5 lg:h-3.5" /> <span className="hidden lg:inline">Export PDF</span>
            </button>
          </div>

          {/* Card 2: Navigasi Sub-Modul (RAB Aktif) */}
          <div className="flex items-center w-full lg:w-auto justify-between lg:justify-start gap-1 bg-white dark:bg-slate-800/80 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700/60 shadow-sm overflow-x-auto hide-scrollbar">
            <button
              type="button"
              onClick={() => navigate(`/projects/${projectId}/data`, { state: project })}
              className="flex-1 lg:flex-none flex justify-center items-center gap-1.5 py-2 lg:py-1.5 lg:px-3 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-[11px] font-medium rounded-lg transition-all whitespace-nowrap"
            >
              <Info className="w-4 h-4 lg:w-3.5 lg:h-3.5 text-amber-500" /> <span className="hidden lg:inline">Data Utama</span>
            </button>
            <button
              type="button"
              className="flex-1 lg:flex-none flex justify-center items-center gap-1.5 py-2 lg:py-1.5 lg:px-3 bg-amber-500 text-white dark:text-slate-950 text-[11px] font-bold rounded-lg shadow-sm transition-all cursor-default whitespace-nowrap"
            >
              <FileSpreadsheet className="w-4 h-4 lg:w-3.5 lg:h-3.5" /> <span className="hidden lg:inline">RAB</span>
            </button>
            <button
              type="button"
              onClick={() => navigate(`/projects/${projectId}/kurva-s`, { state: project })}
              className="flex-1 lg:flex-none flex justify-center items-center gap-1.5 py-2 lg:py-1.5 lg:px-3 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-[11px] font-medium rounded-lg transition-all whitespace-nowrap"
            >
              <TrendingUp className="w-4 h-4 lg:w-3.5 lg:h-3.5 text-amber-500" /> <span className="hidden lg:inline">Kurva S</span>
            </button>
            <button
              type="button"
              onClick={() => navigate(`/projects/${projectId}/peta-gis`, { state: project })}
              className="flex-1 lg:flex-none flex justify-center items-center gap-1.5 py-2 lg:py-1.5 lg:px-3 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-[11px] font-medium rounded-lg transition-all whitespace-nowrap"
            >
              <Compass className="w-4 h-4 lg:w-3.5 lg:h-3.5 text-amber-500" /> <span className="hidden lg:inline">Peta GIS</span>
            </button>
          </div>
        </div>
      </div>

      {/* --- SUMMARY CARDS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-4 shadow-sm">
          <span className="text-slate-500 dark:text-slate-400 text-[11px] font-medium flex items-center gap-1.5">
            <DollarSign className="w-4 h-4 text-amber-500" /> Total Pagu Kontrak
          </span>
          <p className="text-lg font-bold text-slate-800 dark:text-white mt-1">{formatRupiah(project.nilaiKontrak)}</p>
        </div>

        <div className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-4 shadow-sm">
          <span className="text-slate-500 dark:text-slate-400 text-[11px] font-medium flex items-center gap-1.5">
            <PieChart className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> Realisasi Anggaran Terkini
          </span>
          <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-1">{formatRupiah(project.nilaiKontrak * (progress / 100))}</p>
        </div>

        <div className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-4 flex flex-col justify-center shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-500 dark:text-slate-400 text-[11px] font-medium flex items-center gap-1.5">
              <TrendingDown className="w-4 h-4 text-blue-500 dark:text-blue-400" /> Serapan Biaya
            </span>
            <span className="text-sm font-bold text-amber-600 dark:text-amber-400">{progress}%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-200 dark:border-slate-700/60">
            <div 
              className="bg-amber-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${progress}%` }} 
            />
          </div>
        </div>
      </div>

      {/* --- RENDER DATA RAB PER DIVISI --- */}
      <div className="space-y-6">
        {groupedRABData.map((divisi) => (
          <div key={divisi.id} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl overflow-hidden shadow-sm dark:shadow-lg">
            
            {/* Card Header Divisi */}
            <div className="bg-slate-50 dark:bg-slate-900/80 px-5 py-4 border-b border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="text-sm font-extrabold text-amber-600 dark:text-amber-400 tracking-wide uppercase">
                {divisi.namaDivisi}
              </h3>
              {/* Tombol aksi divisi hanya muncul jika Edit Mode aktif */}
              {isEditMode && (
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 animate-fade-in w-full sm:w-auto">
                  <button className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 bg-blue-50 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-slate-700 text-blue-600 dark:text-blue-400 text-[10px] font-semibold rounded-lg border border-blue-200 dark:border-slate-700/80 transition-all">
                    <ListPlus className="w-3.5 h-3.5" /> Tambah Item
                  </button>
                  <button className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px] font-semibold rounded-lg border border-slate-200 dark:border-slate-700/80 transition-all">
                    <Edit3 className="w-3.5 h-3.5" /> Edit Divisi
                  </button>
                  <button className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 bg-rose-50 dark:bg-rose-500/10 hover:bg-rose-100 dark:hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-[10px] font-semibold rounded-lg border border-rose-200 dark:border-rose-500/20 transition-all">
                    <Trash2 className="w-3.5 h-3.5" /> Hapus
                  </button>
                </div>
              )}
            </div>

            {/* ========================================== */}
            {/* TAMPILAN MOBILE: KARTU PER ITEM            */}
            {/* ========================================== */}
            <div className="block lg:hidden divide-y divide-slate-100 dark:divide-slate-700/50">
              {divisi.pekerjaan.map((item) => {
                if (item.isSubheader) {
                  return (
                    <div key={item.id} className="bg-slate-100 dark:bg-slate-800/40 px-4 py-2 font-bold text-[11px] text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                      {item.label}
                    </div>
                  );
                }

                return (
                  <div key={item.id} className="p-4 bg-white dark:bg-transparent">
                    <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-3">{item.label}</h4>
                    
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      {/* Box Rencana */}
                      <div className="bg-blue-50/50 dark:bg-blue-950/10 rounded-xl p-3 border border-blue-100 dark:border-blue-900/30">
                        <span className="block text-[9px] font-bold text-blue-600 dark:text-blue-400 mb-1.5 tracking-wider uppercase">Rencana</span>
                        <div className="space-y-1">
                          <p className="text-[10px] text-slate-600 dark:text-slate-400 flex justify-between">
                            <span>Vol</span> <span className="font-semibold text-slate-800 dark:text-slate-200">{item.renVol} {item.sat}</span>
                          </p>
                          <p className="text-[10px] text-slate-600 dark:text-slate-400 flex justify-between">
                            <span>Harga</span> <span className="font-semibold text-slate-800 dark:text-slate-200">Rp {item.renHarga}</span>
                          </p>
                          <div className="border-t border-blue-200 dark:border-blue-800/30 my-1.5 pt-1.5">
                            <p className="text-[11px] font-bold text-blue-700 dark:text-blue-400">Rp {item.renJumlah}</p>
                          </div>
                        </div>
                      </div>

                      {/* Box Realisasi */}
                      <div className="bg-emerald-50/50 dark:bg-emerald-950/10 rounded-xl p-3 border border-emerald-100 dark:border-emerald-900/30">
                        <span className="block text-[9px] font-bold text-emerald-600 dark:text-emerald-400 mb-1.5 tracking-wider uppercase">Realisasi</span>
                        <div className="space-y-1">
                          <p className="text-[10px] text-slate-600 dark:text-slate-400 flex justify-between">
                            <span>Vol</span> <span className="font-semibold text-slate-800 dark:text-slate-200">{item.realVol} {item.sat}</span>
                          </p>
                          <p className="text-[10px] text-slate-600 dark:text-slate-400 flex justify-between">
                            <span>Harga</span> <span className="font-semibold text-slate-800 dark:text-slate-200">Rp {item.realHarga}</span>
                          </p>
                          <div className="border-t border-emerald-200 dark:border-emerald-800/30 my-1.5 pt-1.5">
                            <p className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">Rp {item.realJumlah}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* CARD BUTTON SEPERTI DI PROJECTLIST.JSX (Hanya saat Edit) */}
                    {isEditMode && (
                      <div className="flex items-center gap-2 mt-2">
                        <button className="flex-1 py-2.5 bg-slate-100 dark:bg-slate-700/80 hover:bg-blue-100 dark:hover:bg-blue-500/20 text-slate-700 dark:text-blue-400 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 border border-slate-200 dark:border-slate-600">
                          <Edit3 className="w-4 h-4" /> Edit
                        </button>
                        <button className="flex-1 py-2.5 bg-slate-100 dark:bg-slate-700/80 hover:bg-rose-100 dark:hover:bg-rose-500/20 text-slate-700 dark:text-rose-400 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 border border-slate-200 dark:border-slate-600">
                          <Trash2 className="w-4 h-4" /> Hapus
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ========================================== */}
            {/* TAMPILAN DESKTOP: TABEL ASLI DARI ANDA     */}
            {/* ========================================== */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full table-fixed text-left border-collapse">
                <thead className="bg-slate-100 dark:bg-slate-900/40 text-[10px] uppercase text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700/50">
                  <tr>
                    <th className="px-4 py-2.5 w-[35%] border-r border-slate-200 dark:border-slate-700/40 font-semibold">Uraian Pekerjaan</th>
                    <th className="px-2 py-2.5 w-[6%] border-r border-slate-200 dark:border-slate-700/40 text-center font-semibold">SAT</th>
                    
                    {/* Header Group Rencana */}
                    <th className="px-2 py-2.5 w-[7%] border-r border-slate-200 dark:border-slate-700/40 text-right font-semibold text-blue-600 dark:text-blue-400/80 bg-blue-50 dark:bg-blue-950/10">Vol (R)</th>
                    <th className="px-3 py-2.5 w-[14%] border-r border-slate-200 dark:border-slate-700/40 text-right font-semibold text-blue-600 dark:text-blue-400/80 bg-blue-50 dark:bg-blue-950/10">Harga Sat (R)</th>
                    <th className="px-3 py-2.5 w-[14%] border-r border-slate-200 dark:border-slate-700/40 text-right font-semibold text-blue-600 dark:text-blue-400/80 bg-blue-50 dark:bg-blue-950/10">Jumlah (R)</th>

                    {/* Header Group Realisasi */}
                    <th className="px-2 py-2.5 w-[7%] border-r border-slate-200 dark:border-slate-700/40 text-right font-semibold text-emerald-600 dark:text-emerald-400/80 bg-emerald-50 dark:bg-emerald-950/10">Vol (A)</th>
                    <th className="px-3 py-2.5 w-[17%] text-right font-semibold text-emerald-600 dark:text-emerald-400/80 bg-emerald-50 dark:bg-emerald-950/10">Jumlah Realisasi (A)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/30 text-[11px] text-slate-700 dark:text-slate-300">
                  {divisi.pekerjaan.map((item) => {
                    if (item.isSubheader) {
                      return (
                        <tr key={item.id} className="bg-slate-50 dark:bg-slate-800/40">
                          <td colSpan={7} className="px-4 py-2 font-bold text-slate-800 dark:text-slate-200">
                            {item.label}
                          </td>
                        </tr>
                      );
                    }

                    return (
                      <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors group">
                        <td className="px-4 py-2.5 border-r border-slate-200 dark:border-slate-700/40 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" title={item.label}>
                          <div className="flex items-center justify-between">
                            <span className="truncate pr-2 font-medium">{item.label}</span>
                            {/* Tombol aksi per item (hanya muncul jika Edit Mode aktif) */}
                            {isEditMode && (
                              <div className="flex items-center gap-1 opacity-60 hover:opacity-100 animate-fade-in">
                                 <Edit3 className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400 cursor-pointer" />
                                 <Trash2 className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400 cursor-pointer" />
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-2 py-2.5 text-center border-r border-slate-200 dark:border-slate-700/40 text-slate-500 dark:text-slate-400 font-mono text-[10px]">{item.sat}</td>
                        
                        {/* Rencana Data */}
                        <td className="px-2 py-2.5 text-right border-r border-slate-200 dark:border-slate-700/40 font-mono text-[10px] bg-blue-50/50 dark:bg-blue-950/5">{renderValue(item.renVol)}</td>
                        <td className="px-3 py-2.5 text-right border-r border-slate-200 dark:border-slate-700/40 font-mono text-[10px] bg-blue-50/50 dark:bg-blue-950/5">{renderValue(item.renHarga)}</td>
                        <td className="px-3 py-2.5 text-right border-r border-slate-200 dark:border-slate-700/40 font-mono text-[10px] bg-blue-50/50 dark:bg-blue-950/5">{renderValue(item.renJumlah, 'text-blue-600 dark:text-blue-300 font-bold')}</td>

                        {/* Realisasi Data */}
                        <td className="px-2 py-2.5 text-right border-r border-slate-200 dark:border-slate-700/40 font-mono text-[10px] bg-emerald-50/50 dark:bg-emerald-950/5">{renderValue(item.realVol)}</td>
                        <td className="px-3 py-2.5 text-right font-mono text-[10px] bg-emerald-50/50 dark:bg-emerald-950/5">{renderValue(item.realJumlah, 'text-emerald-600 dark:text-emerald-400 font-bold')}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Card Footer Total per Divisi (Responsive) */}
            <div className="bg-slate-50 dark:bg-slate-900 px-4 py-3 border-t border-slate-200 dark:border-slate-700/80 flex flex-col md:flex-row md:items-center justify-end gap-3 md:gap-4 text-xs">
              <span className="font-extrabold text-slate-700 dark:text-slate-400 uppercase text-[10px]">Subtotal {divisi.namaDivisi}</span>
              <div className="flex items-center justify-between md:justify-end gap-6 font-mono font-bold w-full md:w-auto">
                <div className="flex flex-col items-start md:items-end">
                  <span className="text-[9px] text-slate-500 uppercase">Rencana (Plan)</span>
                  <span className="text-blue-600 dark:text-blue-400 text-sm">Rp {divisi.totalRencana}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[9px] text-slate-500 uppercase">Realisasi (Actual)</span>
                  <span className="text-emerald-600 dark:text-emerald-400 text-sm">Rp {divisi.totalRealisasi}</span>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}