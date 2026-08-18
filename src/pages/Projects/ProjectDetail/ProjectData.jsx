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

  // STATE: Toggle untuk mengaktifkan Edit Mode
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
      
      {/* Top Bar Navigation (Full Width & Sebaris) */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 shrink-0 mb-2">
        
        {/* Kiri: Tombol Back & Judul */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/projects"
            className="p-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700/80 text-slate-300 hover:text-white rounded-xl transition-all cursor-pointer"
            title="Kembali ke Daftar Proyek"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-lg font-bold text-white leading-tight flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-amber-500" /> Executive Summary Proyek
            </h1>
            <p className="text-[10px] text-slate-400">{project.namaProyek} • SPK{project.kodeKontrak}</p>
          </div>
        </div>

        {/* Kanan: Action Buttons & Navigasi Modul */}
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full xl:w-auto overflow-x-auto pb-1 sm:pb-0">
          
          {/* Action Buttons (Dengan Fitur Toggle Edit Mode) */}
          <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 shrink-0">
            <button 
              onClick={() => setIsEditMode(!isEditMode)}
              className={`px-2.5 py-1.5 ${isEditMode ? 'bg-blue-500/20 text-blue-400' : 'bg-transparent hover:bg-blue-500/10 text-slate-300 hover:text-blue-400'} text-[11px] font-medium rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap`}
            >
              <Edit3 className="w-3.5 h-3.5" /> {isEditMode ? 'Selesai Edit' : 'Edit Mode'}
            </button>
            <button className="px-2.5 py-1.5 bg-transparent hover:bg-rose-500/10 text-slate-300 hover:text-rose-400 text-[11px] font-medium rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap">
              <Trash2 className="w-3.5 h-3.5" /> Hapus
            </button>
            <div className="w-px h-4 bg-slate-700/80 mx-0.5"></div>
            <button className="px-2.5 py-1.5 bg-transparent hover:bg-emerald-500/10 text-slate-300 hover:text-emerald-400 text-[11px] font-medium rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap">
              <UploadCloud className="w-3.5 h-3.5" /> Import Excel
            </button>
            <button className="px-2.5 py-1.5 bg-transparent hover:bg-amber-500/10 text-slate-300 hover:text-amber-400 text-[11px] font-medium rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap">
              <Download className="w-3.5 h-3.5" /> Export PDF
            </button>
          </div>

          {/* Navigasi Sub-Modul */}
          <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 shrink-0">
            <button
              type="button"
              className="px-3 py-1.5 bg-amber-500 text-slate-950 text-[11px] font-bold rounded-lg flex items-center gap-1.5 shadow-sm transition-all cursor-default whitespace-nowrap"
            >
              <Info className="w-3.5 h-3.5" /> Data Utama
            </button>
            <button
              type="button"
              onClick={() => navigate(`/projects/${selectedId}/rab`, { state: project })}
              className="px-3 py-1.5 bg-transparent hover:bg-slate-700/60 text-slate-300 hover:text-white text-[11px] font-medium rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-amber-400" /> RAB
            </button>
            <button
              type="button"
              onClick={() => navigate(`/projects/${selectedId}/kurva-s`, { state: project })}
              className="px-3 py-1.5 bg-transparent hover:bg-slate-700/60 text-slate-300 hover:text-white text-[11px] font-medium rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap"
            >
              <TrendingUp className="w-3.5 h-3.5 text-amber-400" /> Kurva S
            </button>
            <button
              type="button"
              onClick={() => navigate(`/projects/${selectedId}/peta-gis`, { state: project })}
              className="px-3 py-1.5 bg-transparent hover:bg-slate-700/60 text-slate-300 hover:text-white text-[11px] font-medium rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap"
            >
              <Compass className="w-3.5 h-3.5 text-amber-400" /> Peta GIS
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Details */}
      <div className="space-y-4">
        
        {/* Section 1: Progress Snapshot */}
        <div className="bg-slate-800/60 border border-slate-700/60 p-5 rounded-2xl flex flex-col md:flex-row gap-6 items-center justify-between relative">
          
          {/* Tombol Edit Header Info (muncul di Edit Mode) */}
          {isEditMode && (
            <button className="absolute top-4 right-4 p-1.5 bg-slate-700 hover:bg-blue-500/20 text-slate-300 hover:text-blue-400 rounded-lg border border-slate-600 transition-all animate-fade-in z-10">
              <Edit3 className="w-4 h-4" />
            </button>
          )}

          <div className="w-full md:w-1/3">
            <h2 className="text-sm font-bold text-white flex items-center gap-2 mb-1">
              <Activity className="w-4 h-4 text-amber-500" /> Indikator Progress Fisik
            </h2>
            <p className="text-[11px] text-slate-400">Perbandingan target rencana S-Curve dengan realisasi lapangan.</p>
          </div>
          
          <div className="w-full md:w-2/3 flex items-center gap-4">
            <div className="flex-1 bg-slate-900/60 p-3 rounded-xl border border-slate-700/50 text-center">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">Plan (Rencana)</span>
              <p className="text-lg font-mono font-bold text-sky-400">{project.progressPlan || 0}%</p>
            </div>
            <div className="flex-1 bg-slate-900/60 p-3 rounded-xl border border-slate-700/50 text-center">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">Actual (Realisasi)</span>
              <p className="text-lg font-mono font-bold text-emerald-400">{project.progressReal || 0}%</p>
            </div>
            <div className={`flex-1 p-3 rounded-xl border text-center ${isDelayed ? 'bg-rose-500/10 border-rose-500/30' : 'bg-amber-500/10 border-amber-500/30'}`}>
              <span className={`text-[10px] uppercase tracking-wider ${isDelayed ? 'text-rose-400' : 'text-amber-500'}`}>Deviasi</span>
              <p className={`text-lg font-mono font-bold ${isDelayed ? 'text-rose-400' : 'text-amber-500'}`}>
                {project.deviasi || '0.0'}%
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Data Kontrak & Administrasi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-800/60 border border-slate-700/60 p-5 rounded-2xl space-y-4 relative">
            
            {isEditMode && (
              <button className="absolute top-4 right-4 p-1.5 bg-slate-700 hover:bg-blue-500/20 text-slate-300 hover:text-blue-400 rounded-lg border border-slate-600 transition-all animate-fade-in z-10">
                <Edit3 className="w-4 h-4" />
              </button>
            )}

            <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
              <h2 className="text-sm font-bold text-amber-500 uppercase tracking-wider flex items-center gap-2">
                <FileSignature className="w-4 h-4" /> Data Kontrak & Keuangan
              </h2>
              <span className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg border ${
                project.status === 'Delayed' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                'bg-amber-500/10 text-amber-400 border-amber-500/20'
              }`}>
                Status: {project.status}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
                <span className="text-slate-400 text-[10px] font-medium block mb-1">Nama Paket Pekerjaan</span>
                <p className="font-bold text-white text-sm leading-snug">{project.namaProyek || project.nama}</p>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
                <span className="text-slate-400 text-[10px] font-medium block mb-1">Nilai Kontrak (Pagu)</span>
                <p className="font-bold text-emerald-400 text-sm flex items-center gap-1">
                  <DollarSign className="w-4 h-4" /> {formatRupiah(project.nilaiKontrak || project.pagu)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
                  <span className="text-slate-400 text-[10px] font-medium block mb-1">Nomor Kontrak</span>
                  <p className="font-semibold text-white font-mono">{project.kodeKontrak || project.nomorKontrak}</p>
                </div>
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
                  <span className="text-slate-400 text-[10px] font-medium block mb-1">Nomor SPMK</span>
                  <p className="font-semibold text-white font-mono">{project.nomorSPMK || '-'}</p>
                </div>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
                <span className="text-slate-400 text-[10px] font-medium block mb-1">Sumber Dana & Tahun Anggaran</span>
                <p className="font-semibold text-white">{project.sumberDana || '-'} (TA. {project.tahunAnggaran || '2026'})</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/60 p-5 rounded-2xl space-y-4 relative">
            
            {isEditMode && (
              <button className="absolute top-4 right-4 p-1.5 bg-slate-700 hover:bg-blue-500/20 text-slate-300 hover:text-blue-400 rounded-lg border border-slate-600 transition-all animate-fade-in z-10">
                <Edit3 className="w-4 h-4" />
              </button>
            )}

            <h2 className="text-sm font-bold text-amber-500 uppercase tracking-wider flex items-center gap-2 border-b border-slate-700/60 pb-3">
              <Clock className="w-4 h-4" /> Jadwal Pelaksanaan & Lokasi
            </h2>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
                <span className="text-slate-400 flex items-center gap-1.5 mb-1"><Calendar className="w-3.5 h-3.5 text-amber-500" /> Periode Kontrak (SPMK s/d PHO)</span>
                <p className="font-semibold text-white">{project.tanggalMulai} - {project.tanggalSelesai}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
                  <span className="text-slate-400 text-[10px] font-medium block mb-1">Waktu Pelaksanaan</span>
                  <p className="font-bold text-white font-mono">{project.waktuPelaksanaan || '-'}</p>
                </div>
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
                  <span className="text-slate-400 text-[10px] font-medium block mb-1">Masa Pemeliharaan</span>
                  <p className="font-bold text-white font-mono">{project.masaPemeliharaan || '-'}</p>
                </div>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
                <span className="text-slate-400 flex items-center gap-1.5 mb-1"><MapPin className="w-3.5 h-3.5 text-amber-500" /> Keterangan Wilayah Lokasi</span>
                <p className="font-semibold text-white">{project.lokasiWilayah || project.lokasi}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
                  <span className="text-slate-400 flex items-center gap-1.5 mb-1"><Compass className="w-3.5 h-3.5 text-amber-500" /> Latitude (Y)</span>
                  <p className="font-mono font-semibold text-slate-200">{project.latitude || '-'}</p>
                </div>
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
                  <span className="text-slate-400 flex items-center gap-1.5 mb-1"><Compass className="w-3.5 h-3.5 text-amber-500" /> Longitude (X)</span>
                  <p className="font-mono font-semibold text-slate-200">{project.longitude || '-'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Stakeholders & Tim Lapangan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-800/60 border border-slate-700/60 p-5 rounded-2xl space-y-4 flex flex-col justify-between relative">
            
            {isEditMode && (
              <button className="absolute top-4 right-4 p-1.5 bg-slate-700 hover:bg-blue-500/20 text-slate-300 hover:text-blue-400 rounded-lg border border-slate-600 transition-all animate-fade-in z-10">
                <Edit3 className="w-4 h-4" />
              </button>
            )}

            <div className="space-y-4">
              <h2 className="text-sm font-bold text-amber-500 uppercase tracking-wider flex items-center gap-2 border-b border-slate-700/60 pb-3 pr-8">
                <UserCheck className="w-4 h-4" /> Para Pihak (Stakeholders)
              </h2>
              <div className="space-y-3 text-xs">
                <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-700/50 space-y-1">
                  <span className="text-slate-400 text-[11px]">PPK (Pejabat Pembuat Komitmen) / Owner</span>
                  <p className="font-semibold text-white">{project.ppk || '-'}</p>
                </div>
                <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-700/50 space-y-1">
                  <span className="text-slate-400 text-[11px]">Kontraktor Pelaksana (Penyedia Jasa)</span>
                  <p className="font-semibold text-white">{project.kontraktor}</p>
                </div>
                <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-700/50 space-y-1">
                  <span className="text-slate-400 text-[11px]">Konsultan Pengawas / Manajemen Konstruksi</span>
                  <p className="font-semibold text-white">{project.konsultan}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/60 p-5 rounded-2xl space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
                <h2 className="text-sm font-bold text-amber-500 uppercase tracking-wider flex items-center gap-2">
                  <Users className="w-4 h-4" /> Tim Personel Kunci Lapangan
                </h2>
                {isEditMode && (
                  <button className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-[10px] font-medium rounded-lg border border-emerald-500/20 transition-all animate-fade-in">
                    <Plus className="w-3.5 h-3.5" /> Tambah
                  </button>
                )}
              </div>
              
              <div className="space-y-3 text-xs">
                {(project.timLapangan || []).map((person, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-900/60 border border-slate-700/50 rounded-xl group hover:border-slate-600 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
                        <HardHat className="w-4 h-4 text-slate-400" />
                      </div>
                      <div>
                        <p className="font-bold text-white">{person.nama}</p>
                        <p className="text-[11px] text-slate-400">{person.peran}</p>
                      </div>
                    </div>
                    {/* Toggle Aksi Personil (Hanya muncul jika isEditMode true) */}
                    {isEditMode ? (
                      <div className="flex gap-2 opacity-60 hover:opacity-100 transition-opacity animate-fade-in">
                        <Edit3 className="w-3.5 h-3.5 text-blue-400 cursor-pointer" />
                        <Trash2 className="w-3.5 h-3.5 text-rose-400 cursor-pointer" />
                      </div>
                    ) : (
                      <span className="p-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg text-[10px]">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                ))}
                {(!project.timLapangan || project.timLapangan.length === 0) && (
                   <p className="text-slate-500 text-center py-4">Data tim lapangan belum tersedia.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Ringkasan Progress & Dokumen Digital */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-800/60 border border-slate-700/60 p-5 rounded-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
              <h2 className="text-sm font-bold text-amber-500 uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4" /> Riwayat Deviasi Mingguan
              </h2>
              {isEditMode && (
                <button className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-[10px] font-medium rounded-lg border border-emerald-500/20 transition-all animate-fade-in">
                  <Plus className="w-3.5 h-3.5" /> Tambah
                </button>
              )}
            </div>
            
            <div className="space-y-2 text-xs">
              {(project.riwayatProgress || []).map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-900/60 border border-slate-700/50 rounded-xl group hover:border-slate-600 transition-colors">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <div>
                      <p className="font-semibold text-white">{item.minggu}</p>
                      <p className="text-[10px] text-slate-400">Realisasi: {item.progress}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] px-2 py-0.5 border rounded-md ${
                      item.status.includes('Terlambat') || item.status.includes('(-)') ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}>
                      {item.status}
                    </span>
                    {/* Toggle Aksi Riwayat */}
                    {isEditMode && (
                      <div className="flex gap-1.5 opacity-60 hover:opacity-100 transition-opacity animate-fade-in">
                        <Edit3 className="w-3.5 h-3.5 text-blue-400 cursor-pointer" />
                        <Trash2 className="w-3.5 h-3.5 text-rose-400 cursor-pointer" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {(!project.riwayatProgress || project.riwayatProgress.length === 0) && (
                 <p className="text-slate-500 text-center py-4">Riwayat deviasi belum tersedia.</p>
              )}
            </div>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/60 p-5 rounded-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
              <h2 className="text-sm font-bold text-amber-500 uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4" /> Dokumen Administrasi Digital
              </h2>
              {isEditMode && (
                <button className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-[10px] font-medium rounded-lg border border-emerald-500/20 transition-all animate-fade-in">
                  <UploadCloud className="w-3.5 h-3.5" /> Upload File
                </button>
              )}
            </div>
            
            <div className="space-y-2 text-xs">
              {(project.dokumen || []).map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-900/60 border border-slate-700/50 rounded-xl group hover:border-slate-600 transition-colors">
                  <div className="truncate pr-4">
                    <p className="font-medium text-white truncate">{doc.nama}</p>
                    <p className="text-[10px] text-slate-400">{doc.ukur}</p>
                  </div>
                  
                  {/* Toggle Aksi Dokumen */}
                  {isEditMode ? (
                    <button className="p-2 text-slate-500 hover:text-rose-400 rounded-lg transition-all cursor-pointer bg-slate-800/50 hover:bg-rose-500/10 animate-fade-in" title="Hapus File">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  ) : (
                    <button className="p-2 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg border border-slate-700 transition-all shrink-0">
                      <Download className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              {(!project.dokumen || project.dokumen.length === 0) && (
                 <p className="text-slate-500 text-center py-4">Dokumen belum tersedia.</p>
              )}
            </div>
          </div>
        </div>

        {/* Section 5: Deskripsi Lingkup Pekerjaan */}
        <div className="bg-slate-800/60 border border-slate-700/60 p-5 rounded-2xl space-y-3 relative">
          
          {isEditMode && (
            <button className="absolute top-4 right-4 p-1.5 bg-slate-700 hover:bg-blue-500/20 text-slate-300 hover:text-blue-400 rounded-lg border border-slate-600 transition-all animate-fade-in z-10">
              <Edit3 className="w-4 h-4" />
            </button>
          )}

          <h2 className="text-sm font-bold text-amber-500 uppercase tracking-wider flex items-center gap-2 border-b border-slate-700/60 pb-3 pr-8">
            <FileText className="w-4 h-4" /> Deskripsi & Lingkup Pekerjaan
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
            {project.deskripsi || '-'}
          </p>
        </div>
      </div>
    </div>
  );
}