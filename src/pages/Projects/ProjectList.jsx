import { useState } from 'react';
import AHSPModal from '../../documents/AHSPModal';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  FolderKanban, 
  Search, 
  Filter, 
  Eye, 
  ArrowLeft, 
  TrendingUp, 
  FileSpreadsheet, 
  FileText,
  Calendar,
  Building2,
  Calculator
} from 'lucide-react';

// Dummy Data Projects
const dummyProjects = [
  {
    id: 1,
    nama: 'Pembangunan Jembatan Sei Tabalong',
    lokasi: 'Kec. Murung Pudak',
    kontraktor: 'PT Konstruksi Jaya',
    bobotTotal: 100,
    progressReal: 68,
    progressPlan: 70,
    status: 'On Progress',
    periode: 'Jan - Jun 2026',
  },
  {
    id: 2,
    nama: 'Rehabilitasi Jalan Raya Utama Stasiun',
    lokasi: 'Kec. Tanta',
    kontraktor: 'CV Bina Karya',
    bobotTotal: 100,
    progressReal: 35,
    progressPlan: 50,
    status: 'Delayed',
    periode: 'Feb - Agu 2026',
  },
  {
    id: 3,
    nama: 'Pembangunan Gedung Kantor Dinas',
    lokasi: 'Kec. Tanjung',
    kontraktor: 'PT Perkasa Utama',
    bobotTotal: 100,
    progressReal: 100,
    progressPlan: 100,
    status: 'Completed',
    periode: 'Jan - Mei 2026',
  },
];

// Data Kurva S (Rencana vs Realisasi per Minggu)
const dummyKurvaS = [
  { minggu: 'Minggu 1', rencana: 5, realisasi: 5 },
  { minggu: 'Minggu 2', rencana: 12, realisasi: 10 },
  { minggu: 'Minggu 3', rencana: 22, realisasi: 20 },
  { minggu: 'Minggu 4', rencana: 35, realisasi: 30 },
  { minggu: 'Minggu 5', rencana: 50, realisasi: 42 },
  { minggu: 'Minggu 6', rencana: 65, realisasi: 58 },
  { minggu: 'Minggu 7', rencana: 80, realisasi: 68 },
  { minggu: 'Minggu 8', rencana: 100, realisasi: null },
];

// Data Rincian Progress Pekerjaan (Item A - D)
const dummyItemProgress = [
  { id: 'A', nama: 'Pekerjaan Persiapan & Mobilisasi', volume: 1, satuan: 'Ls', progress: 100, bobot: 5 },
  { id: 'B', nama: 'Pekerjaan Tanah & Pondasi', volume: 450, satuan: 'm3', progress: 85, bobot: 30 },
  { id: 'C', nama: 'Pekerjaan Struktur Beton', volume: 120, satuan: 'm3', progress: 60, bobot: 45 },
  { id: 'D', nama: 'Pekerjaan Finishing & Electrical', volume: 1, satuan: 'Package', progress: 20, bobot: 20 },
];

export default function ProjectList() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAHSP, setShowAHSP] = useState(false);

  const filteredProjects = dummyProjects.filter(p => 
    p.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.kontraktor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Jika belum pilih project: Tampilkan Tabel List Project */}
      {!selectedProject ? (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-wide">Daftar Proyek</h1>
              <p className="text-xs text-slate-400">Kelola dan pantau seluruh item pekerjaan serta Kurva S proyek</p>
            </div>
            
            {/* Action Bar */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari proyek atau kontraktor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-slate-800 border border-slate-700/60 text-xs text-white pl-9 pr-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 w-64"
                />
              </div>
            </div>
          </div>

          {/* Table Projects */}
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl overflow-hidden backdrop-blur-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900/80 border-b border-slate-700/60 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    <th className="p-4">Nama Proyek</th>
                    <th className="p-4">Kontraktor</th>
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
                      </td>
                      <td className="p-4 font-medium text-slate-300">{project.kontraktor}</td>
                      <td className="p-4 text-slate-400">{project.periode}</td>
                      <td className="p-4">
                        <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full border ${
                          project.status === 'On Progress' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                          project.status === 'Delayed' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                          'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
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
                            <div 
                              className={`h-full rounded-full ${project.status === 'Delayed' ? 'bg-rose-500' : 'bg-amber-500'}`}
                              style={{ width: `${project.progressReal}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold rounded-lg text-xs transition-all shadow-md shadow-amber-500/10"
                        >
                          <Eye className="w-3.5 h-3.5" /> Detail & Kurva S
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* Jika project dipilih: Tampilkan Detail, Kurva S, & Item Progress */
        <div className="space-y-6">
          {/* Top Detail Navigation */}
          <div className="flex items-center justify-between border-b border-slate-700/60 pb-4">
            <button
              onClick={() => setSelectedProject(null)}
              className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-all bg-slate-800 border border-slate-700/60 px-3 py-1.5 rounded-xl"
            >
              <ArrowLeft className="w-4 h-4" /> Kembali ke List Proyek
            </button>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 text-xs bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white px-3 py-1.5 rounded-xl">
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" /> Export Excel
              </button>
              <button className="flex items-center gap-1.5 text-xs bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white px-3 py-1.5 rounded-xl">
                <FileText className="w-4 h-4 text-rose-400" /> Export PDF
              </button>
            </div>
          </div>

          {/* Project Header Info */}
          <div className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-amber-500 font-semibold uppercase tracking-wider">Detail Monitoring Proyek</span>
                <h2 className="text-xl font-bold text-white">{selectedProject.nama}</h2>
                <p className="text-xs text-slate-400 mt-1">{selectedProject.lokasi} • Pelaksana: <strong className="text-slate-200">{selectedProject.kontraktor}</strong></p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-[10px] text-slate-400">Total Progress</div>
                  <div className="text-2xl font-extrabold text-amber-500">{selectedProject.progressReal}%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Kurva S Diagram (Plan vs Actual) */}
          <div className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-amber-500" />
                <h3 className="text-sm font-bold text-white">Kurva S (Progress Kumulatif Rencana vs Realisasi)</h3>
              </div>
            </div>

            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dummyKurvaS} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="minggu" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} unit="%" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', borderRadius: '8px', color: '#fff' }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }} />
                  <Line type="monotone" dataKey="rencana" name="Rencana (%)" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="realisasi" name="Realisasi (%)" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Rincian Progress Items Table */}
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Rincian Item Pekerjaan</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900/80 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-700/60">
                    <th className="p-3">Kode</th>
                    <th className="p-3">Item Pekerjaan</th>
                    <th className="p-3">Volume Target</th>
                    <th className="p-3">Bobot (%)</th>
                    <th className="p-3">Progress (%)</th>
                    <th className="p-3 text-center">Analisa Harga (AHSP)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50 text-xs text-slate-300">
                  {dummyItemProgress.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-700/30">
                      <td className="p-3 font-semibold text-amber-500">Item {item.id}</td>
                      <td className="p-3 font-medium text-white">{item.nama}</td>
                      <td className="p-3 text-slate-300">{item.volume} {item.satuan}</td>
                      <td className="p-3 text-slate-400">{item.bobot}%</td>
                      <td className="p-3 w-48">
                        <div className="space-y-1">
                          <span className="text-[10px] font-semibold text-amber-400">{item.progress}%</span>
                          <div className="w-full bg-slate-700 rounded-full h-1.5">
                            <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${item.progress}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => setShowAHSP(true)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-lg text-xs font-semibold transition-all"
                        >
                          <Calculator className="w-3.5 h-3.5" /> Analisa AHSP
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Modal AHSP */}
      <AHSPModal isOpen={showAHSP} onClose={() => setShowAHSP(false)} />
    </div>
  );
}