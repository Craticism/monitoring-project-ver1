import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileSpreadsheet, 
  TrendingUp, 
  Compass, 
  Search, 
  Eye, 
  Plus,
  RotateCw
} from 'lucide-react';
import ProjectData from './ProjectDetail/ProjectData'; // Menggunakan ProjectData sesuai nama file baru

// Sample Data RAB Detail yang konsisten dengan input form
const sampleRABTable = [
  { type: 'divisi', label: 'DIVISI 1. UMUM' },
  { type: 'subheader', label: 'Mobilisasi' },
  { type: 'item', label: 'Concrete Testing Cylinder Mould', sat: 'Ls', renVol: '10', renHarga: '1.900.000,00', renJumlah: '19.000.000,00', realVol: '9', realHarga: '1.900.000,00', realJumlah: '17.100.000,00' },
  { type: 'summary', label: 'JUMLAH HARGA DIVISI 1. UMUM', renJumlah: '115.170.000,00', realJumlah: '69.170.000,00' }
];

// Data Dummy dengan Struktur Lengkap Hasil Input Form
const dummyProjects = [
  {
    id: 1,
    nama: 'Pembangunan Jembatan Sei Tabalong',
    nomorKontrak: 'HK.02.03/KONT/2026/01',
    lokasi: 'Kec. Murung Pudak, Kab. Tabalong',
    kontraktor: 'PT Konstruksi Jaya',
    konsultan: 'CV Sekawan Studio',
    pagu: 'Rp 1.250.000.000',
    tanggalMulai: '2026-01-15',
    tanggalSelesai: '2026-06-30',
    periode: 'Jan - Jun 2026',
    progressReal: 68,
    progressPlan: 70,
    status: 'On Progress',
    coordinates: { lat: -2.1833, lng: 115.3833 },
    rabTable: sampleRABTable
  },
  {
    id: 2,
    nama: 'Rehabilitasi Jalan Raya Utama Stasiun',
    nomorKontrak: 'HK.02.03/KONT/2026/02',
    lokasi: 'Kec. Tanta, Kab. Tabalong',
    kontraktor: 'CV Bina Karya',
    konsultan: 'PT Perencana Utama',
    pagu: 'Rp 850.000.000',
    tanggalMulai: '2026-02-01',
    tanggalSelesai: '2026-08-15',
    periode: 'Feb - Agu 2026',
    progressReal: 35,
    progressPlan: 50,
    status: 'Delayed',
    coordinates: { lat: -2.1800, lng: 115.3800 },
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
    p.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.kontraktor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.lokasi.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h1 className="text-2xl font-bold text-white tracking-wide">Daftar Proyek</h1>
          <p className="text-xs text-slate-400">Kelola dan pantau seluruh rincian proyek konstruksi</p>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Tombol Refresh - Posisi di sebelah kiri kolom search */}
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
              placeholder="Cari proyek, kontraktor..."
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
            <span>Buat Project Baru</span>
          </button>
        </div>
      </div>

      {/* Tabel Daftar Proyek */}
      <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/80 border-b border-slate-700/60 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="p-4">Info Proyek</th>
                <th className="p-4">Kontraktor & Pagu</th>
                <th className="p-4">Periode</th>
                <th className="p-4">Status</th>
                <th className="p-4">Progress Real vs Plan</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50 text-xs text-slate-300">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-slate-700/30 transition-all">
                  <td className="p-4">
                    <div className="font-semibold text-white">{project.nama}</div>
                    <div className="text-[11px] text-slate-400">{project.lokasi}</div>
                    <div className="text-[10px] text-amber-500/80 font-mono mt-0.5">{project.nomorKontrak}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-slate-200">{project.kontraktor}</div>
                    <div className="text-[11px] text-emerald-400 font-semibold">{project.pagu}</div>
                  </td>
                  <td className="p-4 text-slate-400">{project.periode}</td>
                  <td className="p-4">
                    <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full border ${
                      project.status === 'On Progress' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="p-4 w-52">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px]">
                        <span>Real: <strong className="text-white">{project.progressReal}%</strong></span>
                        <span className="text-slate-400">Plan: {project.progressPlan}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-1.5 overflow-hidden">
                        <div className="h-full rounded-full bg-amber-500" style={{ width: `${project.progressReal}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    {/* Tombol Lihat Detail */}
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => navigate('/projects/projectdata', { state: project })}
                        className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-xl transition-all inline-flex items-center gap-1.5 shadow-md shadow-amber-500/10 active:scale-95 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" /> Lihat Detail
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}