import React, { useState } from 'react';
import { useNavigate, useLocation, useParams, Link } from 'react-router-dom';
import { 
  Building2, ArrowLeft, Calendar, MapPin, DollarSign, HardHat, 
  UserCheck, Compass, FileText, TrendingUp, FileSpreadsheet, Info, 
  Clock, Download, Users, CheckCircle2, FileSignature, Activity, 
  ShieldCheck, Edit3, Trash2, UploadCloud, Plus
} from 'lucide-react';

// Master Data Dummy Proyek Lengkap
const dummyProjectsMaster = {
  1: {
    id: 1,
    namaProyek: 'Pembangunan Jembatan Sei Tabalong STA 04',
    kodeKontrak: '600/012/PUPR-TAB/2026',
    nomorSPMK: '600/012.a/SPMK/PUPR-TAB/2026',
    kategori: 'Infrastruktur Jalan & Jembatan',
    sumberDana: 'APBD Kab. Tabalong - DAK',
    tahunAnggaran: '2026',
    nilaiKontrak: 2500000000,
    tanggalMulai: '15 Januari 2026',
    tanggalSelesai: '13 Juli 2026',
    waktuPelaksanaan: '180 Hari Kalender',
    masaPemeliharaan: '180 Hari Kalender',
    lokasiWilayah: 'Kec. Murung Pudak, Kabupaten Tabalong',
    latitude: '-2.18341',
    longitude: '115.38510',
    ppk: 'Dinas PUPR Kab. Tabalong (Bidang Bina Marga)',
    kontraktor: 'PT. Borneo Konstruksi Utama',
    konsultan: 'PT. Daya Cipta Konsultan',
    deskripsi: 'Pembangunan struktur jembatan bentang 30 meter menggunakan rangka baja komposit di wilayah Kabupaten Tabalong untuk mempermudah akses konektivitas antar kecamatan.',
    progressPlan: 32.5,
    progressReal: 35.5,
    deviasi: '+3.0',
    status: 'On Progress',
    timLapangan: [
      { peran: 'Site Manager', nama: 'Ir. Ahmad Rivai' },
      { peran: 'Quality Control', nama: 'Budi Santoso, S.T.' },
      { peran: 'Ahli K3 Konstruksi', nama: 'Hendra Wijaya' }
    ],
    dokumen: [
      { nama: 'Kontrak_Induk_Signed.pdf', ukur: '4.2 MB' },
      { nama: 'SPMK_Pembangunan_Jembatan.pdf', ukur: '1.1 MB' },
      { nama: 'Spesifikasi_Teknis_Jembatan.pdf', ukur: '8.1 MB' }
    ],
    riwayatProgress: [
      { minggu: 'Minggu 10', progress: '25.0%', status: 'Tepat Waktu' },
      { minggu: 'Minggu 11', progress: '30.2%', status: 'Tepat Waktu' },
      { minggu: 'Minggu 12', progress: '35.5%', status: 'Deviasi (+) Positif' }
    ]
  },
  2: {
    id: 2,
    namaProyek: 'Rehabilitasi Jalan Raya Utama Stasiun',
    kodeKontrak: '600/045/PUPR-TAB/2026',
    nomorSPMK: '600/045.a/SPMK/PUPR-TAB/2026',
    kategori: 'Preservasi Jalan',
    sumberDana: 'APBD Provinsi',
    tahunAnggaran: '2026',
    nilaiKontrak: 1800000000,
    tanggalMulai: '01 Februari 2026',
    tanggalSelesai: '30 Juli 2026',
    waktuPelaksanaan: '150 Hari Kalender',
    masaPemeliharaan: '180 Hari Kalender',
    lokasiWilayah: 'Kec. Tanta, Kabupaten Tabalong',
    latitude: '-2.19000',
    longitude: '115.42000',
    ppk: 'Dinas PUPR Kab. Tabalong',
    kontraktor: 'CV. Bina Karya Mandiri',
    konsultan: 'PT. Architama Engineering',
    deskripsi: 'Peningkatan kapasitas jalan dan overlay aspal AC-WC sepanjang 4.5 KM menuju akses Stasiun Utama.',
    progressPlan: 35.0,
    progressReal: 28.0,
    deviasi: '-7.0',
    status: 'Delayed',
    timLapangan: [
      { peran: 'Site Engineer', nama: 'Dedi Kurniawan, S.T.' },
      { peran: 'Pelaksana Lapangan', nama: 'Rian Hidayat' }
    ],
    dokumen: [
      { nama: 'Kontrak_Rehabilitasi_Jalan.pdf', ukur: '3.5 MB' }
    ],
    riwayatProgress: [
      { minggu: 'Minggu 8', progress: '20.0%', status: 'Terlambat (-2%)' },
      { minggu: 'Minggu 9', progress: '28.0%', status: 'Terlambat (-7%)' }
    ]
  }
};

export default function ProjectData() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [isEditMode, setIsEditMode] = useState(false);

  const selectedId = id || (location.state && location.state.id) || 1;
  const masterData = dummyProjectsMaster[selectedId] || dummyProjectsMaster[1];
  const project = { ...masterData, ...(location.state || {}) };

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka || 0);
  };

  const isDelayed = parseFloat(project.deviasi) < 0;

  return (
    <div className="w-full space-y-5">
      
      {/* --- TOP BAR NAVIGATION --- */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 shrink-0 mb-2">
        
        {/* Kiri: Tombol Back & Judul */}
        <div className="flex items-start lg:items-center gap-3 shrink-0">
          <Link
            to="/projects"
            className="p-2.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/80 text-slate-600 dark:text-slate-300 rounded-xl transition-all shadow-sm mt-0.5 lg:mt-0"
            title="Kembali ke Daftar Proyek"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="text-base lg:text-lg font-bold text-slate-800 dark:text-white leading-snug flex items-start lg:items-center gap-1.5 flex-wrap">
              <Building2 className="w-4 h-4 text-amber-500 shrink-0 mt-1 lg:mt-0" /> 
              <span>Executive Summary Proyek</span>
            </h1>
            <p className="text-[10px] lg:text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 lg:line-clamp-1 leading-relaxed">
              {project.namaProyek} • SPK{project.kodeKontrak}
            </p>
          </div>
        </div>

        {/* Kanan: Action Buttons & Navigasi Modul */}
        {/* Menggunakan flex-col di Mobile agar bersusun, dan lg:flex-row agar sejajar di Desktop */}
        <div className="flex flex-col lg:flex-row items-center gap-2 w-full lg:w-auto mt-2 lg:mt-0">
          
          {/* Card 1: Action Buttons */}
          <div className="flex items-center w-full lg:w-auto justify-between lg:justify-start gap-1 bg-white dark:bg-slate-800/80 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700/60 shadow-sm">
            <button 
              onClick={() => setIsEditMode(!isEditMode)}
              title={isEditMode ? 'Selesai Edit' : 'Edit Mode'}
              className={`flex-1 lg:flex-none flex justify-center items-center gap-1.5 py-2 lg:py-1.5 lg:px-3 ${isEditMode ? 'bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400' : 'bg-transparent hover:bg-blue-50 dark:hover:bg-blue-500/10 text-slate-600 dark:text-slate-300'} text-[11px] font-medium rounded-lg transition-all whitespace-nowrap`}
            >
              <Edit3 className="w-4 h-4 lg:w-3.5 lg:h-3.5" /> <span className="hidden lg:inline">{isEditMode ? 'Selesai Edit' : 'Edit Mode'}</span>
            </button>
            <button title="Hapus Proyek" className="flex-1 lg:flex-none flex justify-center items-center gap-1.5 py-2 lg:py-1.5 lg:px-3 bg-transparent hover:bg-rose-50 dark:hover:bg-rose-500/10 text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 text-[11px] font-medium rounded-lg transition-all whitespace-nowrap">
              <Trash2 className="w-4 h-4 lg:w-3.5 lg:h-3.5" /> <span className="hidden lg:inline">Hapus</span>
            </button>
            
            {/* Garis pemisah disembunyikan di Mobile agar flex-1 bisa membagi ruang rata */}
            <div className="hidden lg:block w-px h-5 bg-slate-200 dark:bg-slate-700/80 mx-0.5 shrink-0"></div>
            
            <button title="Import Excel" className="flex-1 lg:flex-none flex justify-center items-center gap-1.5 py-2 lg:py-1.5 lg:px-3 bg-transparent hover:bg-emerald-50 dark:hover:bg-emerald-500/10 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 text-[11px] font-medium rounded-lg transition-all whitespace-nowrap">
              <UploadCloud className="w-4 h-4 lg:w-3.5 lg:h-3.5" /> <span className="hidden lg:inline">Import</span>
            </button>
            <button title="Export PDF" className="flex-1 lg:flex-none flex justify-center items-center gap-1.5 py-2 lg:py-1.5 lg:px-3 bg-transparent hover:bg-amber-50 dark:hover:bg-amber-500/10 text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 text-[11px] font-medium rounded-lg transition-all whitespace-nowrap">
              <Download className="w-4 h-4 lg:w-3.5 lg:h-3.5" /> <span className="hidden lg:inline">Export</span>
            </button>
          </div>

          {/* Card 2: Navigasi Sub-Modul */}
          <div className="flex items-center w-full lg:w-auto justify-between lg:justify-start gap-1 bg-white dark:bg-slate-800/80 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700/60 shadow-sm">
            <button
              type="button"
              title="Data Utama"
              className="flex-1 lg:flex-none flex justify-center items-center gap-1.5 py-2 lg:py-1.5 lg:px-3 bg-amber-500 text-white dark:text-slate-950 text-[11px] font-bold rounded-lg shadow-sm transition-all cursor-default whitespace-nowrap"
            >
              <Info className="w-4 h-4 lg:w-3.5 lg:h-3.5" /> <span className="hidden lg:inline">Data Utama</span>
            </button>
            <button
              type="button"
              title="Rencana Anggaran Biaya (RAB)"
              onClick={() => navigate(`/projects/${selectedId}/rab`, { state: project })}
              className="flex-1 lg:flex-none flex justify-center items-center gap-1.5 py-2 lg:py-1.5 lg:px-3 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-[11px] font-medium rounded-lg transition-all whitespace-nowrap"
            >
              <FileSpreadsheet className="w-4 h-4 lg:w-3.5 lg:h-3.5 text-amber-500" /> <span className="hidden lg:inline">RAB</span>
            </button>
            <button
              type="button"
              title="Kurva S & Progress"
              onClick={() => navigate(`/projects/${selectedId}/kurva-s`, { state: project })}
              className="flex-1 lg:flex-none flex justify-center items-center gap-1.5 py-2 lg:py-1.5 lg:px-3 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-[11px] font-medium rounded-lg transition-all whitespace-nowrap"
            >
              <TrendingUp className="w-4 h-4 lg:w-3.5 lg:h-3.5 text-amber-500" /> <span className="hidden lg:inline">Kurva S</span>
            </button>
            <button
              type="button"
              title="Peta GIS"
              onClick={() => navigate(`/projects/${selectedId}/peta-gis`, { state: project })}
              className="flex-1 lg:flex-none flex justify-center items-center gap-1.5 py-2 lg:py-1.5 lg:px-3 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-[11px] font-medium rounded-lg transition-all whitespace-nowrap"
            >
              <Compass className="w-4 h-4 lg:w-3.5 lg:h-3.5 text-amber-500" /> <span className="hidden lg:inline">Peta GIS</span>
            </button>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT DETAILS --- */}
      <div className="space-y-4">
        
        {/* Section 1: Progress Snapshot */}
        <div className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 p-4 md:p-5 rounded-2xl flex flex-col md:flex-row gap-4 md:gap-6 items-center justify-between relative shadow-sm">
          
          {isEditMode && (
            <button className="absolute top-3 right-3 md:top-4 md:right-4 p-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-blue-50 dark:hover:bg-blue-500/20 text-slate-500 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg border border-slate-200 dark:border-slate-600 transition-all z-10">
              <Edit3 className="w-4 h-4" />
            </button>
          )}

          <div className="w-full md:w-1/3 text-center md:text-left">
            <h2 className="text-sm font-bold text-slate-800 dark:text-white flex items-center justify-center md:justify-start gap-2 mb-1">
              <Activity className="w-4 h-4 text-amber-500" /> Indikator Progress Fisik
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 md:mt-0 px-2 md:px-0">Perbandingan target rencana S-Curve dengan realisasi lapangan.</p>
          </div>
          
          <div className="w-full md:w-2/3 grid grid-cols-3 gap-2 sm:gap-4">
            <div className="bg-slate-50 dark:bg-slate-900/60 p-2.5 md:p-3 rounded-xl border border-slate-200 dark:border-slate-700/50 text-center">
              <span className="text-[9px] md:text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Plan</span>
              <p className="text-sm md:text-lg font-mono font-bold text-sky-600 dark:text-sky-400">{project.progressPlan || 0}%</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/60 p-2.5 md:p-3 rounded-xl border border-slate-200 dark:border-slate-700/50 text-center">
              <span className="text-[9px] md:text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Actual</span>
              <p className="text-sm md:text-lg font-mono font-bold text-emerald-600 dark:text-emerald-400">{project.progressReal || 0}%</p>
            </div>
            <div className={`p-2.5 md:p-3 rounded-xl border text-center flex flex-col justify-center ${isDelayed ? 'bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/30' : 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30'}`}>
              <span className={`text-[9px] md:text-[10px] uppercase tracking-wider block mb-1 ${isDelayed ? 'text-rose-600 dark:text-rose-400' : 'text-amber-600 dark:text-amber-500'}`}>Deviasi</span>
              <p className={`text-sm md:text-lg font-mono font-bold ${isDelayed ? 'text-rose-600 dark:text-rose-400' : 'text-amber-600 dark:text-amber-500'}`}>
                {project.deviasi || '0.0'}%
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Data Kontrak & Administrasi */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 p-4 md:p-5 rounded-2xl space-y-4 relative shadow-sm">
            {isEditMode && (
              <button className="absolute top-3 right-3 md:top-4 md:right-4 p-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-blue-50 dark:hover:bg-blue-500/20 text-slate-500 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg border border-slate-200 dark:border-slate-600 transition-all z-10">
                <Edit3 className="w-4 h-4" />
              </button>
            )}

            <div className="flex flex-wrap items-center justify-between border-b border-slate-200 dark:border-slate-700/60 pb-3 gap-2">
              <h2 className="text-sm font-bold text-amber-600 dark:text-amber-500 uppercase tracking-wider flex items-center gap-2">
                <FileSignature className="w-4 h-4" /> Kontrak & Keuangan
              </h2>
              <span className={`px-2.5 py-1 text-[10px] md:text-[11px] font-semibold rounded-lg border inline-block ${
                project.status === 'Delayed' ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-500/20' :
                'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20'
              }`}>
                Status: {project.status}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-50 dark:bg-slate-900/60 p-3.5 md:p-4 rounded-xl border border-slate-200 dark:border-slate-700/50">
                <span className="text-slate-500 dark:text-slate-400 text-[10px] font-medium block mb-1">Nama Paket Pekerjaan</span>
                <p className="font-bold text-slate-800 dark:text-white text-sm leading-snug">{project.namaProyek || project.nama}</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/60 p-3.5 md:p-4 rounded-xl border border-slate-200 dark:border-slate-700/50">
                <span className="text-slate-500 dark:text-slate-400 text-[10px] font-medium block mb-1">Nilai Kontrak (Pagu)</span>
                <p className="font-bold text-emerald-600 dark:text-emerald-400 text-sm flex items-center gap-1">
                  <DollarSign className="w-4 h-4" /> {formatRupiah(project.nilaiKontrak || project.pagu)}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-slate-50 dark:bg-slate-900/60 p-3.5 md:p-4 rounded-xl border border-slate-200 dark:border-slate-700/50">
                  <span className="text-slate-500 dark:text-slate-400 text-[10px] font-medium block mb-1">Nomor Kontrak</span>
                  <p className="font-semibold text-slate-800 dark:text-white font-mono break-all">{project.kodeKontrak || project.nomorKontrak}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/60 p-3.5 md:p-4 rounded-xl border border-slate-200 dark:border-slate-700/50">
                  <span className="text-slate-500 dark:text-slate-400 text-[10px] font-medium block mb-1">Nomor SPMK</span>
                  <p className="font-semibold text-slate-800 dark:text-white font-mono break-all">{project.nomorSPMK || '-'}</p>
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/60 p-3.5 md:p-4 rounded-xl border border-slate-200 dark:border-slate-700/50">
                <span className="text-slate-500 dark:text-slate-400 text-[10px] font-medium block mb-1">Sumber Dana & Tahun Anggaran</span>
                <p className="font-semibold text-slate-800 dark:text-white">{project.sumberDana || '-'} (TA. {project.tahunAnggaran || '2026'})</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 p-4 md:p-5 rounded-2xl space-y-4 relative shadow-sm">
            {isEditMode && (
              <button className="absolute top-3 right-3 md:top-4 md:right-4 p-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-blue-50 dark:hover:bg-blue-500/20 text-slate-500 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg border border-slate-200 dark:border-slate-600 transition-all z-10">
                <Edit3 className="w-4 h-4" />
              </button>
            )}

            <h2 className="text-sm font-bold text-amber-600 dark:text-amber-500 uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 dark:border-slate-700/60 pb-3 pr-8">
              <Clock className="w-4 h-4" /> Jadwal & Lokasi
            </h2>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-50 dark:bg-slate-900/60 p-3.5 md:p-4 rounded-xl border border-slate-200 dark:border-slate-700/50">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mb-1"><Calendar className="w-3.5 h-3.5 text-amber-500" /> Periode Kontrak (SPMK s/d PHO)</span>
                <p className="font-semibold text-slate-800 dark:text-white">{project.tanggalMulai} - {project.tanggalSelesai}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-slate-50 dark:bg-slate-900/60 p-3.5 md:p-4 rounded-xl border border-slate-200 dark:border-slate-700/50">
                  <span className="text-slate-500 dark:text-slate-400 text-[10px] font-medium block mb-1">Waktu Pelaksanaan</span>
                  <p className="font-bold text-slate-800 dark:text-white font-mono">{project.waktuPelaksanaan || '-'}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/60 p-3.5 md:p-4 rounded-xl border border-slate-200 dark:border-slate-700/50">
                  <span className="text-slate-500 dark:text-slate-400 text-[10px] font-medium block mb-1">Masa Pemeliharaan</span>
                  <p className="font-bold text-slate-800 dark:text-white font-mono">{project.masaPemeliharaan || '-'}</p>
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/60 p-3.5 md:p-4 rounded-xl border border-slate-200 dark:border-slate-700/50">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mb-1"><MapPin className="w-3.5 h-3.5 text-amber-500" /> Keterangan Wilayah Lokasi</span>
                <p className="font-semibold text-slate-800 dark:text-white">{project.lokasiWilayah || project.lokasi}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-slate-50 dark:bg-slate-900/60 p-3.5 md:p-4 rounded-xl border border-slate-200 dark:border-slate-700/50 flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5"><Compass className="w-3.5 h-3.5 text-amber-500" /> Latitude (Y)</span>
                  <p className="font-mono font-semibold text-slate-700 dark:text-slate-200">{project.latitude || '-'}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/60 p-3.5 md:p-4 rounded-xl border border-slate-200 dark:border-slate-700/50 flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5"><Compass className="w-3.5 h-3.5 text-amber-500" /> Longitude (X)</span>
                  <p className="font-mono font-semibold text-slate-700 dark:text-slate-200">{project.longitude || '-'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Stakeholders & Tim Lapangan */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          
          <div className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 p-4 md:p-5 rounded-2xl space-y-4 relative shadow-sm">
            {isEditMode && (
              <button className="absolute top-3 right-3 md:top-4 md:right-4 p-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-blue-50 dark:hover:bg-blue-500/20 text-slate-500 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg border border-slate-200 dark:border-slate-600 transition-all z-10">
                <Edit3 className="w-4 h-4" />
              </button>
            )}

            <h2 className="text-sm font-bold text-amber-600 dark:text-amber-500 uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 dark:border-slate-700/60 pb-3 pr-8">
              <UserCheck className="w-4 h-4" /> Para Pihak (Stakeholders)
            </h2>
            <div className="space-y-3 text-xs">
              <div className="bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/50 space-y-1">
                <span className="text-slate-500 dark:text-slate-400 text-[11px]">PPK (Pejabat Pembuat Komitmen) / Owner</span>
                <p className="font-semibold text-slate-800 dark:text-white">{project.ppk || '-'}</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/50 space-y-1">
                <span className="text-slate-500 dark:text-slate-400 text-[11px]">Kontraktor Pelaksana (Penyedia Jasa)</span>
                <p className="font-semibold text-slate-800 dark:text-white">{project.kontraktor}</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/50 space-y-1">
                <span className="text-slate-500 dark:text-slate-400 text-[11px]">Konsultan Pengawas / Manajemen Konstruksi</span>
                <p className="font-semibold text-slate-800 dark:text-white">{project.konsultan}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 p-4 md:p-5 rounded-2xl space-y-4 shadow-sm flex flex-col">
            <div className="flex flex-wrap items-center justify-between border-b border-slate-200 dark:border-slate-700/60 pb-3 gap-2">
              <h2 className="text-sm font-bold text-amber-600 dark:text-amber-500 uppercase tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4" /> Personel Lapangan
              </h2>
              {isEditMode && (
                <button className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-500/10 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-medium rounded-lg border border-emerald-200 dark:border-emerald-500/20 transition-all">
                  <Plus className="w-3.5 h-3.5" /> Tambah
                </button>
              )}
            </div>
            
            <div className="space-y-3 text-xs flex-1">
              {(project.timLapangan || []).map((person, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/50 rounded-xl group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                      <HardHat className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 dark:text-white">{person.nama}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{person.peran}</p>
                    </div>
                  </div>
                  {isEditMode ? (
                    <div className="flex gap-2">
                      <Edit3 className="w-4 h-4 text-blue-500 dark:text-blue-400 cursor-pointer" />
                      <Trash2 className="w-4 h-4 text-rose-500 dark:text-rose-400 cursor-pointer" />
                    </div>
                  ) : (
                    <span className="p-1.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 rounded-lg">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
              ))}
              {(!project.timLapangan || project.timLapangan.length === 0) && (
                 <p className="text-slate-500 text-center py-4">Data tim belum tersedia.</p>
              )}
            </div>
          </div>
        </div>

        {/* Section 4: Ringkasan Progress & Dokumen Digital */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 p-4 md:p-5 rounded-2xl space-y-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between border-b border-slate-200 dark:border-slate-700/60 pb-3 gap-2">
              <h2 className="text-sm font-bold text-amber-600 dark:text-amber-500 uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4" /> Riwayat Deviasi
              </h2>
              {isEditMode && (
                <button className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-500/10 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-medium rounded-lg border border-emerald-200 dark:border-emerald-500/20 transition-all">
                  <Plus className="w-3.5 h-3.5" /> Tambah
                </button>
              )}
            </div>
            
            <div className="space-y-2 text-xs">
              {(project.riwayatProgress || []).map((item, index) => (
                <div key={index} className="flex flex-wrap items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/50 rounded-xl gap-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-white">{item.minggu}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Realisasi: {item.progress}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className={`text-[9px] md:text-[10px] px-2 py-1 border rounded-md whitespace-nowrap ${
                      item.status.includes('Terlambat') || item.status.includes('(-)') ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-500/30' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                    }`}>
                      {item.status}
                    </span>
                    {isEditMode && (
                      <div className="flex gap-2">
                        <Edit3 className="w-4 h-4 text-blue-500 dark:text-blue-400 cursor-pointer" />
                        <Trash2 className="w-4 h-4 text-rose-500 dark:text-rose-400 cursor-pointer" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 p-4 md:p-5 rounded-2xl space-y-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between border-b border-slate-200 dark:border-slate-700/60 pb-3 gap-2">
              <h2 className="text-sm font-bold text-amber-600 dark:text-amber-500 uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4" /> Dokumen Administrasi
              </h2>
              {isEditMode && (
                <button className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-500/10 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-medium rounded-lg border border-emerald-200 dark:border-emerald-500/20 transition-all">
                  <UploadCloud className="w-3.5 h-3.5" /> Upload File
                </button>
              )}
            </div>
            
            <div className="space-y-2 text-xs">
              {(project.dokumen || []).map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/50 rounded-xl gap-2">
                  <div className="min-w-0 flex-1 pr-2">
                    <p className="font-medium text-slate-800 dark:text-white truncate">{doc.nama}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{doc.ukur}</p>
                  </div>
                  
                  {isEditMode ? (
                    <button className="p-2 text-slate-500 hover:text-rose-500 dark:text-slate-400 dark:hover:text-rose-400 rounded-lg bg-slate-100 dark:bg-slate-800/50 shrink-0">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  ) : (
                    <button className="p-2 bg-white dark:bg-slate-800 text-amber-500 hover:text-amber-600 dark:hover:text-amber-400 rounded-lg border border-slate-200 dark:border-slate-700 shrink-0 shadow-sm">
                      <Download className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 5: Deskripsi */}
        <div className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 p-4 md:p-5 rounded-2xl space-y-3 relative shadow-sm">
          {isEditMode && (
            <button className="absolute top-3 right-3 md:top-4 md:right-4 p-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-blue-50 dark:hover:bg-blue-500/20 text-slate-500 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg border border-slate-200 dark:border-slate-600 transition-all z-10">
              <Edit3 className="w-4 h-4" />
            </button>
          )}
          <h2 className="text-sm font-bold text-amber-600 dark:text-amber-500 uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 dark:border-slate-700/60 pb-3 pr-8">
            <FileText className="w-4 h-4" /> Deskripsi & Lingkup Pekerjaan
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700/50">
            {project.deskripsi || '-'}
          </p>
        </div>

      </div>
    </div>
  );
}