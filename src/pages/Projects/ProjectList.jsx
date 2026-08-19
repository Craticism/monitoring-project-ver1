import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Eye, Plus, FileSpreadsheet, MapPin, 
  RotateCw, Building2, HardHat, Activity, Filter
} from 'lucide-react';

// Sample Data Dummy Proyek (Ditambahkan flag isNew pada proyek pertama)
const dummyProjects = [
  {
    id: 1,
    namaProyek: 'Pembangunan Jembatan Sei Tabalong STA 04',
    kodeKontrak: '600/012/PUPR-TAB/2026',
    lokasi: 'Kec. Murung Pudak, Kabupaten Tabalong',
    kontraktor: 'PT. Borneo Konstruksi Utama',
    nilaiKontrak: 2500000000,
    sumberDana: 'APBD Kab. Tabalong - DAK',
    progressPlan: 32.5,
    progressReal: 35.5,
    deviasi: '+3.0',
    status: 'On Progress',
    isNew: true // <-- Penanda Data Baru
  },
  {
    id: 2,
    namaProyek: 'Rehabilitasi Jalan Raya Utama Stasiun',
    kodeKontrak: '600/045/PUPR-TAB/2026',
    lokasi: 'Kec. Tanta, Kabupaten Tabalong',
    kontraktor: 'CV. Bina Karya Mandiri',
    nilaiKontrak: 1800000000,
    sumberDana: 'APBD Provinsi',
    progressPlan: 35.0,
    progressReal: 28.0,
    deviasi: '-7.0',
    status: 'Delayed',
    isNew: false
  },
  {
    id: 3,
    namaProyek: 'Pembangunan Gedung Perkantoran Baru',
    kodeKontrak: '600/088/PUPR-TAB/2026',
    lokasi: 'Kec. Tanjung, Kabupaten Tabalong',
    kontraktor: 'PT. Maju Bersama',
    nilaiKontrak: 4200000000,
    sumberDana: 'APBD Kab. Tabalong',
    progressPlan: 10.0,
    progressReal: 10.5,
    deviasi: '+0.5',
    status: 'On Progress',
    isNew: true // <-- Penanda Data Baru
  }
];

export default function ProjectList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Semua'); // State untuk Filter Status
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 750);
  };

  // Logika Filter (Menggabungkan Pencarian Teks & Filter Dropdown)
  const filteredProjects = dummyProjects.filter(p => {
    const matchSearch = p.namaProyek.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        p.kodeKontrak.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        p.kontraktor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchStatus = filterStatus === 'Semua' || p.status === filterStatus;
    
    return matchSearch && matchStatus;
  });

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka);
  };

  return (
    <div className="space-y-6 w-full">
      
      {/* Top Action Bar - Responsive Stacking */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white tracking-wide">Daftar Master Proyek</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Kelola dan pantau seluruh rincian paket pekerjaan konstruksi</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full md:w-auto">
          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            title="Refresh Data"
            className="p-2.5 md:p-2 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700/60 text-slate-600 dark:text-slate-300 rounded-xl transition-all duration-200 active:scale-95 cursor-pointer disabled:opacity-50 shrink-0"
          >
            <RotateCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-amber-500' : ''}`} />
          </button>

          {/* Search Bar */}
          <div className="relative flex-1 md:flex-none min-w-[150px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama paket, lokasi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-56 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-800 dark:text-white pl-9 pr-4 py-2.5 md:py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Dropdown Filter Status (BARU) */}
          <div className="relative shrink-0 flex-1 sm:flex-none">
            <Filter className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full sm:w-auto bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-200 pl-8 pr-8 py-2.5 md:py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none cursor-pointer"
            >
              <option value="Semua">Semua Status</option>
              <option value="On Progress">On Progress</option>
              <option value="Delayed">Delayed</option>
              <option value="Selesai">Selesai</option>
            </select>
            {/* Custom Arrow untuk Select Dropdown */}
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>

          {/* Tambah Proyek Button */}
          <button
            onClick={() => navigate('/projects/tambah')}
            className="flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold text-xs px-3.5 py-2.5 md:py-2 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap shrink-0 w-full sm:w-auto mt-2 sm:mt-0"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Proyek</span>
          </button>
        </div>
      </div>

      {/* TAMPILAN MOBILE: KUMPULAN KARTU (Sembunyi di Desktop) */}
      <div className="block md:hidden space-y-4">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((proyek) => {
            const isDelayed = parseFloat(proyek.deviasi) < 0;
            return (
              <div key={proyek.id} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-4 shadow-sm flex flex-col gap-4 relative overflow-hidden">
                
                {/* Indikator NEW untuk Mobile */}
                {proyek.isNew && (
                  <div className="absolute top-0 right-0 bg-rose-500 text-white text-[9px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider shadow-sm animate-pulse z-10">
                    New
                  </div>
                )}

                {/* Header Card */}
                <div className="flex justify-between items-start gap-2 pt-2">
                  <div className="flex-1 pr-8">
                    <h3 className="font-bold text-slate-800 dark:text-white text-sm leading-snug line-clamp-2">{proyek.namaProyek}</h3>
                    <p className="text-[10px] text-amber-600 dark:text-amber-500/90 font-mono mt-1">{proyek.kodeKontrak}</p>
                  </div>
                </div>

                {/* Info Detail */}
                <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{proyek.lokasi}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <HardHat className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{proyek.kontraktor}</span>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">{formatRupiah(proyek.nilaiKontrak)}</span>
                    </div>
                  </div>
                </div>

                {/* Progress Mini Info */}
                <div className="bg-slate-50 dark:bg-slate-900/40 p-3 rounded-xl border border-slate-100 dark:border-slate-700/40 grid grid-cols-3 gap-2 text-center items-center">
                  <div>
                    <p className="text-[9px] text-slate-500 dark:text-slate-400 mb-0.5">Plan</p>
                    <p className="text-xs font-bold text-sky-600 dark:text-sky-400">{proyek.progressPlan}%</p>
                  </div>
                  <div className="border-l border-r border-slate-200 dark:border-slate-700/50">
                    <p className="text-[9px] text-slate-500 dark:text-slate-400 mb-0.5">Actual</p>
                    <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{proyek.progressReal}%</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-slate-500 dark:text-slate-400 mb-0.5">Deviasi</p>
                    <p className={`text-xs font-bold ${isDelayed ? 'text-rose-600 dark:text-rose-400' : 'text-amber-600 dark:text-amber-400'}`}>
                      {proyek.deviasi}%
                    </p>
                  </div>
                </div>

                {/* Action Button & Status */}
                <div className="flex items-center gap-3">
                  <span className={`text-[9px] font-semibold px-3 py-2.5 rounded-xl border whitespace-nowrap text-center ${
                    proyek.status === 'On Progress' ? 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' : 
                    'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20'
                  }`}>
                    {proyek.status}
                  </span>
                  <button
                    onClick={() => navigate(`/projects/${proyek.id}/data`, { state: proyek })}
                    className="flex-1 py-2.5 bg-slate-100 dark:bg-slate-700/80 hover:bg-amber-100 dark:hover:bg-amber-500/20 text-slate-700 dark:text-amber-400 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-600"
                  >
                    <Eye className="w-4 h-4" /> Buka Data
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/60">
            <FileSpreadsheet className="w-10 h-10 mx-auto text-slate-400 mb-2" />
            <p className="text-xs text-slate-500">Tidak ada data proyek yang cocok.</p>
          </div>
        )}
      </div>

      {/* TAMPILAN DESKTOP: TABEL (Sembunyi di Mobile) */}
      <div className="hidden md:block bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl overflow-hidden shadow-sm dark:shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse table-fixed min-w-[950px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-700/60 text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <th className="p-4 w-[28%]">Informasi Paket Pekerjaan</th>
                <th className="p-4 w-[22%]">Kontraktor & Pagu</th>
                <th className="p-4 text-center w-[12%]">Plan (%)</th>
                <th className="p-4 text-center w-[12%]">Actual (%)</th>
                <th className="p-4 text-center w-[12%]">Deviasi</th>
                <th className="p-4 text-center w-[14%]">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 text-xs text-slate-700 dark:text-slate-300">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((proyek) => {
                  const isDelayed = parseFloat(proyek.deviasi) < 0;

                  return (
                    <tr key={proyek.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-all relative group">
                      <td className="p-4">
                        <div className="flex items-start gap-2">
                          <div className="font-bold text-slate-800 dark:text-white text-[13px] leading-snug line-clamp-2">
                            {proyek.namaProyek}
                          </div>
                          {/* Badge NEW Desktop */}
                          {proyek.isNew && (
                            <span className="bg-rose-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider shadow-sm animate-pulse shrink-0 mt-0.5">
                              New
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                          <MapPin className="w-3 h-3 shrink-0" />
                          <span className="truncate">{proyek.lokasi}</span>
                        </div>
                        <div className="text-[10px] text-amber-600 dark:text-amber-500/90 font-mono mt-1.5">{proyek.kodeKontrak}</div>
                      </td>

                      <td className="p-4">
                        <div className="flex items-start gap-2">
                          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                          <div>
                            <div className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-2">{proyek.kontraktor}</div>
                            <div className="font-mono text-emerald-600 dark:text-emerald-400 font-bold mt-1">
                              {formatRupiah(proyek.nilaiKontrak)}
                            </div>
                            <div className="text-[9px] text-slate-400 mt-0.5">{proyek.sumberDana}</div>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 text-center">
                        <span className="font-mono font-bold text-sky-600 dark:text-sky-400">{proyek.progressPlan}%</span>
                      </td>

                      <td className="p-4 text-center">
                        <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{proyek.progressReal}%</span>
                      </td>

                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1.5">
                          <span className={`inline-flex items-center justify-center font-mono font-bold px-2 py-1 rounded border ${
                            isDelayed 
                              ? 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-500/30' 
                              : 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-slate-900 dark:text-amber-400 dark:border-amber-500/30'
                          }`}>
                            {proyek.deviasi}%
                          </span>
                          <span className="text-[9px] text-slate-400 font-medium">{proyek.status}</span>
                        </div>
                      </td>

                      <td className="p-4 text-center">
                        <button
                          onClick={() => navigate(`/projects/${proyek.id}/data`, { state: proyek })}
                          className="px-3.5 py-2 w-full justify-center bg-white dark:bg-slate-700/80 hover:bg-amber-100 dark:hover:bg-amber-500 hover:text-amber-900 dark:hover:text-slate-950 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl transition-all inline-flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer border border-slate-200 dark:border-slate-600 dark:hover:border-amber-500"
                        >
                          <Eye className="w-3.5 h-3.5" /> Buka
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-500 dark:text-slate-400">
                    <FileSpreadsheet className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-600 mb-2" />
                    <p className="text-xs">Tidak ada data proyek yang cocok dengan pencarian.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}