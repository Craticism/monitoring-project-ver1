import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Building2, 
  CheckCircle2, 
  Download, 
  Edit3, 
  Paperclip, 
  Image as ImageIcon,
  UserCheck,
  ExternalLink,
  Sun,
  CloudRain,
  CloudLightning,
  Users,
  Wrench,
  ListTodo,
  Trash2,
  FileSpreadsheet,
  Plus,
  UploadCloud
} from 'lucide-react';

// Data Default Laporan Harian (Disesuaikan dengan field Google Form)
const defaultLaporan = {
  id: 1,
  nomorLaporan: 'LAP/2026/08/19/001',
  status: 'Verified',
  
  tanggalPengawasan: '19 Agustus 2026',
  namaPengawas: 'Pahrin Hunter',
  namaProyek: 'Pembangunan Jembatan Sei Tabalong',
  lokasi: 'STA 02+400 s/d STA 02+650',
  
  kegiatan: [
    'Pengecoran struktur abutment jembatan (120 m3)',
    'Pemasangan bekisting kayu muka abutment',
    'Perakitan besi tulangan D16 (800 kg)',
    'Pembersihan sisa material area kerja',
  ],

  personil: [
    { id: 1, peran: 'Dinas PUPR', jumlah: 1 },
    { id: 2, peran: 'Konsultan', jumlah: 2 },
    { id: 3, peran: 'Kontraktor', jumlah: 2 },
    { id: 4, peran: 'Kepala Kerja/Mandor', jumlah: 1 },
    { id: 5, peran: 'Pekerja', jumlah: 8 },
    { id: 6, peran: 'Tukang', jumlah: 4 },
    { id: 7, peran: 'Supir', jumlah: 2 },
    { id: 8, peran: 'Operator', jumlah: 1 },
    { id: 9, peran: 'Surveyor', jumlah: 1 }
  ].filter(p => p.jumlah > 0),

  peralatan: [
    { id: 1, namaAlat: 'Excavator', jumlah: 1 },
    { id: 2, namaAlat: 'Dump Truck', jumlah: 2 },
    { id: 3, namaAlat: 'Water Past', jumlah: 1 },
    { id: 4, namaAlat: 'Concrete Mixer', jumlah: 2 },
    { id: 5, namaAlat: 'Alat bantu', jumlah: 5 },
    { id: 6, namaAlat: 'Vibrator Beton (Tambahan 1)', jumlah: 2 },
    { id: 7, namaAlat: 'Pompa Air (Tambahan 2)', jumlah: 1 }
  ].filter(p => p.jumlah > 0),

  cuaca: {
    cerah: 5,
    gerimis: 2,
    hujanDeras: 1
  },

  fotoDokumentasi: [
    { id: 1, title: 'Kegiatan Pengecoran', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80' },
    { id: 2, title: 'Alat Berat Beroperasi', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80' }
  ],
  lampiranFiles: [
    { id: 1, name: 'Backup_Data_Laporan.pdf', size: '1.2 MB', url: '#' }
  ]
};

export default function LaporanData({ laporan: propLaporan, onBack }) {
  const navigate = useNavigate();
  const location = useLocation();

  // State untuk mode edit (toggle visibility tombol CRUD)
  const [isEditMode, setIsEditMode] = useState(false);

  const dataLaporan = propLaporan || location.state?.laporan || defaultLaporan;

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/laporan');
    }
  };

  return (
    <div className="w-full space-y-5">
      
      {/* --- TOP HEADER / ACTION BAR (RESPONSIVE) --- */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 shrink-0 mb-2">
        {/* Kiri: Tombol Back & Judul */}
        <div className="flex items-start lg:items-center gap-3 shrink-0">
          <button
            onClick={handleBack}
            className="p-2.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/80 text-slate-600 dark:text-slate-300 rounded-xl transition-all cursor-pointer shadow-sm mt-0.5 lg:mt-0"
            title="Kembali"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base lg:text-lg font-bold text-slate-800 dark:text-white leading-tight flex items-center gap-1.5">
                  Detail Laporan Harian
              </h1>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                dataLaporan?.status === 'Verified'
                  ? 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20'
                  : 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20'
              }`}>
                {dataLaporan?.status || 'Draft'}
              </span>
            </div>
            <p className="text-[10px] lg:text-xs text-slate-500 dark:text-slate-400 mt-1">{dataLaporan?.nomorLaporan}</p>
          </div>
        </div>

        {/* Kanan: Action Buttons Nav (Sejajar di Mobile) */}
        <div className="flex flex-col lg:flex-row items-center gap-2 w-full lg:w-auto mt-2 lg:mt-0">
          <div className="flex items-center w-full lg:w-auto justify-between lg:justify-start gap-1 bg-white dark:bg-slate-800/80 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700/60 shadow-sm overflow-x-auto hide-scrollbar">
            <button 
              onClick={() => setIsEditMode(!isEditMode)} 
              className={`flex-1 lg:flex-none flex justify-center items-center gap-1.5 py-2 lg:py-1.5 lg:px-3 ${isEditMode ? 'bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-transparent' : 'bg-transparent hover:bg-blue-50 dark:hover:bg-blue-500/10 text-slate-600 dark:text-slate-300'} text-[11px] font-medium rounded-lg transition-all whitespace-nowrap`}
            >
              <Edit3 className="w-4 h-4 lg:w-3.5 lg:h-3.5" /> <span className="hidden lg:inline">{isEditMode ? 'Selesai Edit' : 'Edit Mode'}</span>
            </button>
            <button className="flex-1 lg:flex-none flex justify-center items-center gap-1.5 py-2 lg:py-1.5 lg:px-3 bg-transparent hover:bg-rose-50 dark:hover:bg-rose-500/10 text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 text-[11px] font-medium rounded-lg transition-all whitespace-nowrap">
              <Trash2 className="w-4 h-4 lg:w-3.5 lg:h-3.5" /> <span className="hidden lg:inline">Hapus</span>
            </button>
            <div className="hidden lg:block w-px h-5 bg-slate-200 dark:bg-slate-700/80 mx-0.5 shrink-0"></div>
            <button className="flex-1 lg:flex-none flex justify-center items-center gap-1.5 py-2 lg:py-1.5 lg:px-3 bg-transparent hover:bg-emerald-50 dark:hover:bg-emerald-500/10 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 text-[11px] font-medium rounded-lg transition-all whitespace-nowrap">
              <FileSpreadsheet className="w-4 h-4 lg:w-3.5 lg:h-3.5" /> <span className="hidden lg:inline">Export Excel</span>
            </button>
            <button className="flex-1 lg:flex-none flex justify-center items-center gap-1.5 py-2 lg:py-1.5 lg:px-3 bg-transparent hover:bg-amber-50 dark:hover:bg-amber-500/10 text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 text-[11px] font-medium rounded-lg transition-all whitespace-nowrap">
              <Download className="w-4 h-4 lg:w-3.5 lg:h-3.5" /> <span className="hidden lg:inline">Export PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid Informasi Utama (Proyek, Pengawas, Cuaca) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Info Proyek & Pengawas */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-4 md:p-5 shadow-sm flex flex-col justify-between relative group">
          
          {/* Tombol Edit Header Info */}
          {isEditMode && (
            <button className="absolute top-3 right-3 p-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-blue-50 dark:hover:bg-blue-500/20 text-slate-500 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg border border-slate-200 dark:border-slate-600 transition-all animate-fade-in z-10">
              <Edit3 className="w-4 h-4" />
            </button>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5 text-amber-500" /> Nama Projek</p>
                <p className="text-sm font-bold text-slate-800 dark:text-white leading-snug">{dataLaporan?.namaProyek}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-amber-500" /> Lokasi Pengawasan</p>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">{dataLaporan?.lokasi}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" /> Tanggal Pengawasan</p>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">{dataLaporan?.tanggalPengawasan}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5"><UserCheck className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" /> Nama Pengawas</p>
                <p className="text-xs font-semibold text-slate-800 dark:text-white">{dataLaporan?.namaPengawas}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Kondisi Cuaca (Dalam Jam) */}
        <div className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-4 md:p-5 shadow-sm flex flex-col justify-between relative">
          
          {isEditMode && (
            <button className="absolute top-3 right-3 p-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-blue-50 dark:hover:bg-blue-500/20 text-slate-500 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg border border-slate-200 dark:border-slate-600 transition-all animate-fade-in z-10">
              <Edit3 className="w-4 h-4" />
            </button>
          )}

          <h3 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider border-b border-slate-200 dark:border-slate-700/60 pb-2 mb-3 pr-8">Kondisi Cuaca</h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700/50">
              <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300"><Sun className="w-4 h-4 text-amber-500 dark:text-amber-400" /> Cerah</span>
              <span className="font-mono font-bold text-slate-800 dark:text-white">{dataLaporan?.cuaca?.cerah || 0} Jam</span>
            </div>
            <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700/50">
              <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300"><CloudRain className="w-4 h-4 text-sky-500 dark:text-sky-400" /> Gerimis</span>
              <span className="font-mono font-bold text-slate-800 dark:text-white">{dataLaporan?.cuaca?.gerimis || 0} Jam</span>
            </div>
            <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700/50">
              <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300"><CloudLightning className="w-4 h-4 text-indigo-500 dark:text-indigo-400" /> Hujan Deras</span>
              <span className="font-mono font-bold text-slate-800 dark:text-white">{dataLaporan?.cuaca?.hujanDeras || 0} Jam</span>
            </div>
          </div>
        </div>
      </div>

      {/* Rincian Kegiatan (Kegiatan 1 s/d n) */}
      <div className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-4 md:p-5 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between border-b border-slate-200 dark:border-slate-700/60 pb-3 gap-2">
          <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <ListTodo className="w-4 h-4 text-amber-500" /> Rincian Kegiatan Lapangan
          </h3>
          {isEditMode && (
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-blue-600 dark:text-blue-400 text-[10px] font-semibold rounded-lg border border-slate-200 dark:border-slate-700/80 transition-all animate-fade-in shrink-0">
              <Plus className="w-3.5 h-3.5" /> Tambah Kegiatan
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {(dataLaporan?.kegiatan || []).map((keg, idx) => (
            <div key={idx} className="flex items-start justify-between gap-3 p-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/50 rounded-xl group transition-colors hover:border-slate-300 dark:hover:border-slate-600">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center font-mono text-[10px] font-bold">
                  {idx + 1}
                </span>
                <p className="text-slate-700 dark:text-slate-200 mt-0.5 leading-relaxed">{keg}</p>
              </div>
              
              {/* Tombol aksi Item (hanya muncul jika Edit Mode aktif) */}
              {isEditMode && (
                <div className="flex items-center gap-1.5 opacity-60 hover:opacity-100 animate-fade-in shrink-0">
                   <Edit3 className="w-4 h-4 text-blue-500 dark:text-blue-400 cursor-pointer" />
                   <Trash2 className="w-4 h-4 text-rose-500 dark:text-rose-400 cursor-pointer" />
                </div>
              )}
            </div>
          ))}
          {(!dataLaporan?.kegiatan || dataLaporan.kegiatan.length === 0) && (
            <p className="text-slate-500 text-center col-span-1 md:col-span-2 py-2">Tidak ada data kegiatan yang diinput.</p>
          )}
        </div>
      </div>

      {/* Personil & Peralatan (2 Kolom) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Personil di Lapangan */}
        <div className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl overflow-hidden shadow-sm flex flex-col">
          <div className="px-4 py-3 md:px-5 md:py-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-500" /> Personil Lapangan
            </h3>
            {isEditMode && (
              <button className="flex items-center gap-1.5 px-2.5 py-1 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-blue-600 dark:text-blue-400 text-[10px] font-semibold rounded-lg border border-slate-200 dark:border-slate-700/80 transition-all animate-fade-in">
                <Plus className="w-3.5 h-3.5" /> Tambah
              </button>
            )}
          </div>
          <div className="p-4 overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead className="text-[10px] uppercase text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700/50">
                <tr>
                  <th className="pb-2 font-semibold">Kategori Personil</th>
                  <th className="pb-2 text-center font-semibold w-24">Jumlah</th>
                  {isEditMode && <th className="pb-2 text-right font-semibold w-16 animate-fade-in">Aksi</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/30 text-xs">
                {(dataLaporan?.personil || []).map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors group">
                    <td className="py-2.5 text-slate-700 dark:text-slate-300">{p.peran}</td>
                    <td className="py-2.5 text-center font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      <span className="bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-900/30">
                        {p.jumlah} <span className="text-[9px] text-emerald-600/70 dark:text-emerald-500/70 font-sans font-normal ml-0.5">Org</span>
                      </span>
                    </td>
                    {isEditMode && (
                      <td className="py-2.5 text-right animate-fade-in">
                        <div className="flex justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                          <Edit3 className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400 cursor-pointer" />
                          <Trash2 className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400 cursor-pointer" />
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Pemakaian Peralatan di Lapangan */}
        <div className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl overflow-hidden shadow-sm flex flex-col">
          <div className="px-4 py-3 md:px-5 md:py-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Wrench className="w-4 h-4 text-amber-500" /> Pemakaian Alat
            </h3>
            {isEditMode && (
              <button className="flex items-center gap-1.5 px-2.5 py-1 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-blue-600 dark:text-blue-400 text-[10px] font-semibold rounded-lg border border-slate-200 dark:border-slate-700/80 transition-all animate-fade-in">
                <Plus className="w-3.5 h-3.5" /> Tambah
              </button>
            )}
          </div>
          <div className="p-4 overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead className="text-[10px] uppercase text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700/50">
                <tr>
                  <th className="pb-2 font-semibold">Nama Alat / Mesin</th>
                  <th className="pb-2 text-center font-semibold w-24">Jumlah</th>
                  {isEditMode && <th className="pb-2 text-right font-semibold w-16 animate-fade-in">Aksi</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/30 text-xs">
                {(dataLaporan?.peralatan || []).map((alat) => (
                  <tr key={alat.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors group">
                    <td className="py-2.5 text-slate-700 dark:text-slate-300">{alat.namaAlat}</td>
                    <td className="py-2.5 text-center font-mono font-bold text-blue-600 dark:text-blue-400">
                      <span className="bg-blue-50 dark:bg-blue-950/20 px-2 py-0.5 rounded-md border border-blue-200 dark:border-blue-900/30">
                        {alat.jumlah} <span className="text-[9px] text-blue-600/70 dark:text-blue-500/70 font-sans font-normal ml-0.5">Unit</span>
                      </span>
                    </td>
                    {isEditMode && (
                      <td className="py-2.5 text-right animate-fade-in">
                        <div className="flex justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                          <Edit3 className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400 cursor-pointer" />
                          <Trash2 className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400 cursor-pointer" />
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Galeri Foto & Lampiran (Dokumentasi) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Dokumentasi Foto (2 Kolom) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-4 md:p-5 space-y-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between border-b border-slate-200 dark:border-slate-700/60 pb-3 gap-2">
            <div className="flex items-center gap-2 text-slate-800 dark:text-white text-xs font-bold uppercase tracking-wider">
              <ImageIcon className="w-4 h-4 text-amber-500" />
              <span>Dokumentasi Visual</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono bg-slate-100 dark:bg-slate-900/60 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                {(dataLaporan?.fotoDokumentasi || []).length} Foto
              </span>
              {isEditMode && (
                <button className="flex items-center gap-1 px-2 py-1 bg-emerald-50 dark:bg-emerald-500/10 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-medium rounded border border-emerald-200 dark:border-emerald-500/20 transition-all animate-fade-in">
                  <UploadCloud className="w-3 h-3" /> Upload
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(dataLaporan?.fotoDokumentasi || []).map((foto) => (
              <div key={foto.id} className="group bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/50 rounded-xl overflow-hidden hover:border-amber-500/40 transition-all relative">
                
                {/* Overlay Hapus saat Edit Mode */}
                {isEditMode && (
                  <button className="absolute top-2 right-2 p-1.5 rounded-lg bg-rose-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-lg" title="Hapus Foto">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}

                <div className="h-32 overflow-hidden relative">
                  <img 
                    src={foto.url} 
                    alt={foto.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                    loading="lazy"
                  />
                  {!isEditMode && (
                    <a 
                      href={foto.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                      title="Buka Gambar"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
                <div className="p-2.5 flex items-center justify-between">
                  <p className="text-[11px] font-medium text-slate-700 dark:text-slate-200 line-clamp-2">{foto.title}</p>
                  {isEditMode && <Edit3 className="w-3 h-3 text-slate-500 hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer shrink-0" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* File Lampiran (1 Kolom) */}
        <div className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-4 md:p-5 space-y-4 shadow-sm flex flex-col">
          <div className="flex flex-wrap items-center justify-between border-b border-slate-200 dark:border-slate-700/60 pb-3 gap-2">
            <div className="flex items-center gap-2 text-slate-800 dark:text-white text-xs font-bold uppercase tracking-wider">
              <Paperclip className="w-4 h-4 text-amber-500" />
              <span>File Lampiran</span>
            </div>
            {isEditMode && (
              <button className="flex items-center gap-1 px-2 py-1 bg-emerald-50 dark:bg-emerald-500/10 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-medium rounded border border-emerald-200 dark:border-emerald-500/20 transition-all animate-fade-in shrink-0">
                <Plus className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="space-y-2 flex-1">
            {(dataLaporan?.lampiranFiles || []).map((file) => (
              <div key={file.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/30 transition-all group">
                <div className="truncate pr-2">
                  <p className="text-[11px] font-medium text-slate-700 dark:text-slate-200 truncate">{file.name}</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{file.size}</p>
                </div>
                
                {isEditMode ? (
                  <button className="p-2 text-slate-500 hover:text-rose-500 dark:text-slate-400 dark:hover:text-rose-400 rounded-lg transition-all cursor-pointer bg-white dark:bg-slate-800/50 hover:bg-rose-50 dark:hover:bg-rose-500/10 animate-fade-in border border-slate-200 dark:border-transparent" title="Hapus File">
                    <Trash2 className="w-4 h-4" />
                  </button>
                ) : (
                  <a 
                    href={file.url || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all cursor-pointer border border-transparent hover:border-amber-200 dark:hover:border-amber-500/30"
                    title="Unduh Dokumen"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}