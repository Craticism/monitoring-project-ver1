import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileSpreadsheet, 
  TrendingUp, 
  Compass, 
  Search, 
  Eye, 
  Plus,
  RotateCw,
  HardHat,
  MapPin,
  Calendar
} from 'lucide-react';
import ProjectData from './ProjectDetail/ProjectData'; 

// Sample Data RAB Detail (Tetap disertakan agar halaman RAB tidak kosong jika diakses langsung)
const sampleRABTable = [
  { type: 'divisi', label: 'DIVISI 1. UMUM' },
  { type: 'subheader', label: 'Mobilisasi' },
  { type: 'item', label: 'Concrete Testing Cylinder Mould', sat: 'Ls', renVol: '10', renHarga: '1.900.000,00', renJumlah: '19.000.000,00', realVol: '9', realHarga: '1.900.000,00', realJumlah: '17.100.000,00' },
  { type: 'summary', label: 'JUMLAH HARGA DIVISI 1. UMUM', renJumlah: '115.170.000,00', realJumlah: '69.170.000,00' }
];

// Data Dummy dengan Struktur Lengkap Standar Konsultan Konstruksi
const dummyProjects = [
  {
    id: 1,
    namaProyek: 'Pembangunan Jembatan Sei Tabalong STA 04',
    kodeKontrak: '600/012/PUPR-TAB/2026',
    nomorSPMK: '600/012.a/SPMK/PUPR-TAB/2026',
    kategori: 'Infrastruktur Jalan & Jembatan',
    sumberDana: 'APBD Kab. Tabalong - DAK',
    tahunAnggaran: '2026',
    nilaiKontrak: 2500000000,
    tanggalMulai: '15 Jan 2026',
    tanggalSelesai: '13 Jul 2026',
    waktuPelaksanaan: '180 Hari Kalender',
    masaPemeliharaan: '180 Hari Kalender',
    lokasiWilayah: 'Kec. Murung Pudak, Kabupaten Tabalong',
    latitude: '-2.18341',
    longitude: '115.38510',
    ppk: 'Dinas PUPR Kab. Tabalong (Bidang Bina Marga)',
    kontraktor: 'PT. Borneo Konstruksi Utama',
    konsultan: 'PT. Daya Cipta Konsultan',
    deskripsi: 'Pembangunan struktur jembatan bentang 30 meter menggunakan rangka baja komposit di wilayah Kabupaten Tabalong.',
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
    ],
    rabTable: sampleRABTable
  },
  {
    id: 2,
    namaProyek: 'Rehabilitasi Jalan Raya Utama Stasiun',
    kodeKontrak: '600/045/PUPR-TAB/2026',
    nomorSPMK: '600/045.a/SPMK/PUPR-TAB/2026',
    kategori: 'Preservasi Jalan',
    sumberDana: 'APBD Provinsi',
    tahunAnggaran: '2026',
    nilaiKontrak: 1800000000,
    tanggalMulai: '01 Feb 2026',
    tanggalSelesai: '30 Jul 2026',
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
    ],
    rabTable: sampleRABTable
  }
];

export default function ProjectList() {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Handler untuk simulasi refresh data
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 750);
  };

  const filteredProjects = dummyProjects.filter(p => 
    p.namaProyek.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.kontraktor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.lokasiWilayah.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka || 0);
  };

  // Jika ada proyek yang dipilih, langsung tampilkan komponen ProjectData
  if (selectedProject) {
    return (
      <ProjectData 
        project={selectedProject} 
        onBack={() => setSelectedProject(null)} 
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide">Daftar Master Proyek</h1>
          <p className="text-xs text-slate-400">Kelola dan pantau seluruh rincian paket pekerjaan konstruksi</p>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Tombol Refresh */}
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            title="Refresh Data"
            className="p-2 bg-slate-800 hover:bg-slate-700/80 border border-slate-700/60 text-slate-300 hover:text-white rounded-xl transition-all duration-200 active:scale-95 cursor-pointer disabled:opacity-50"
          >
            <RotateCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-amber-500' : ''}`} />
          </button>

          {/* Kolom Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama paket, lokasi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-800 border border-slate-700/60 text-xs text-white pl-9 pr-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 w-64"
            />
          </div>

          {/* Tombol Buat Project Baru */}
          <button
            onClick={() => navigate('/projects/tambah')}
            className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold text-xs px-3.5 py-2 rounded-xl transition-all shadow-md shadow-amber-500/10 active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Paket</span>
          </button>
        </div>
      </div>

      {/* Tabel Daftar Proyek */}
      <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/80 border-b border-slate-700/60 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="p-4 w-[28%]">Informasi Paket Pekerjaan</th>
                <th className="p-4 w-[22%]">Kontraktor & Pagu</th>
                <th className="p-4 w-[15%]">Jadwal Pelaksanaan</th>
                <th className="p-4 w-[20%]">Status & Progress</th>
                <th className="p-4 text-center w-[15%]">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50 text-xs text-slate-300">
              {filteredProjects.map((project) => {
                const isDelayed = parseFloat(project.deviasi) < 0;

                return (
                  <tr key={project.id} className="hover:bg-slate-700/30 transition-all">
                    {/* Info Paket */}
                    <td className="p-4">
                      <div className="font-bold text-white text-[13px] leading-snug">{project.namaProyek}</div>
                      <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-500" />
                        <span className="truncate">{project.lokasiWilayah}</span>
                      </div>
                      <div className="text-[10px] text-amber-500/80 font-mono mt-1">{project.kodeKontrak}</div>
                    </td>

                    {/* Kontraktor & Keuangan */}
                    <td className="p-4">
                      <div className="font-medium text-slate-200">{project.kontraktor}</div>
                      <div className="text-[11px] text-emerald-400 font-semibold mt-0.5">{formatRupiah(project.nilaiKontrak)}</div>
                      <div className="text-[10px] text-slate-500 mt-1">{project.sumberDana}</div>
                    </td>

                    {/* Periode */}
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{project.waktuPelaksanaan}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-1">
                        {project.tanggalMulai} - {project.tanggalSelesai}
                      </div>
                    </td>

                    {/* Status & Progress */}
                    <td className="p-4">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${
                          project.status === 'On Progress' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                          project.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                          'bg-rose-500/10 text-rose-400 border-rose-500/20'
                        }`}>
                          {project.status}
                        </span>
                        <span className={`text-[10px] font-bold font-mono ${isDelayed ? 'text-rose-400' : 'text-emerald-400'}`}>
                          Deviasi: {project.deviasi}%
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px]">
                          <span>Real: <strong className="text-white">{project.progressReal}%</strong></span>
                          <span className="text-slate-400">Plan: {project.progressPlan}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${isDelayed ? 'bg-rose-500' : 'bg-amber-500'}`} 
                            style={{ width: `${project.progressReal}%` }} 
                          />
                        </div>
                      </div>
                    </td>

                    {/* Aksi */}
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => navigate('/projects/projectdata', { state: project })}
                          className="px-3.5 py-2 bg-slate-700/80 hover:bg-amber-500 hover:text-slate-950 text-slate-200 text-xs font-bold rounded-xl transition-all inline-flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer border border-slate-600 hover:border-amber-500"
                        >
                          <Eye className="w-3.5 h-3.5" /> Buka Data
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}