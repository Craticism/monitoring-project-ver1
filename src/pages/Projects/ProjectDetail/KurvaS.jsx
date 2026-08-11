import React from 'react';
import { useNavigate, useLocation, useParams, Link } from 'react-router-dom';
import { 
  TrendingUp, 
  ArrowLeft, 
  Building2, 
  Info, 
  FileSpreadsheet, 
  Compass, 
  PieChart, 
  Calendar,
  CheckCircle2
} from 'lucide-react';
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

const defaultKurvaS = [
  { minggu: 'M1', rencana: 5, realisasi: 4 },
  { minggu: 'M2', rencana: 12, realisasi: 10 },
  { minggu: 'M3', rencana: 22, realisasi: 20 },
  { minggu: 'M4', rencana: 35, realisasi: 32 },
  { minggu: 'M5', rencana: 50, realisasi: 45 },
  { minggu: 'M6', rencana: 68, realisasi: 60 },
  { minggu: 'M7', rencana: 85, realisasi: 78 },
  { minggu: 'M8', rencana: 100, realisasi: 95 },
];

const defaultItemProgress = [
  { id: 1, nama: 'Pekerjaan Persiapan & Mobilisasi', volume: '1', satuan: 'Ls', bobot: 10, progress: 100 },
  { id: 2, nama: 'Galian Tanah & Penyiapan Badan Jalan', volume: '450', satuan: 'M3', bobot: 20, progress: 85 },
  { id: 3, nama: 'Pemasangan Saluran U-Ditch 100x100', volume: '190', satuan: 'M1', bobot: 35, progress: 40 },
  { id: 4, nama: 'Perkerasan Agregat Kelas B', volume: '300', satuan: 'M3', bobot: 15, progress: 10 },
  { id: 5, nama: 'Pengecoran Beton Structure fc 20 Mpa', volume: '120', satuan: 'M3', bobot: 20, progress: 0 },
];

export default function KurvaS({ selectedProject, dummyKurvaS = defaultKurvaS, dummyItemProgress = defaultItemProgress }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const project = selectedProject || location.state || {
    id: id || 1,
    namaProyek: 'Pembangunan Jembatan Sei Tabalong STA 04',
    kodeKontrak: '600/012/PUPR-TAB/2026',
    nilaiKontrak: 2500000000,
    progress: 35.5
  };

  const projectId = project.id || id || 1;

  return (
    <div className="w-full h-[calc(100vh-20px)] flex flex-col gap-2 p-1 overflow-hidden">
      {/* Top Header & Sub-Module Nav */}
      <div className="flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <Link
            to="/projects"
            className="p-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700/80 text-slate-300 hover:text-white rounded-lg transition-all"
            title="Kembali ke Daftar Proyek"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-base font-bold text-white leading-tight flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-amber-500" /> Kurva S & Progress Fisik
            </h1>
            <p className="text-[10px] text-slate-400">{project.namaProyek} • SPK10/11/2026-BJSKKP{project.kodeKontrak}</p>
          </div>
        </div>

        {/* Sub-Module Nav */}
        <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
          <button
            type="button"
            onClick={() => navigate(`/projects/${projectId}/data`, { state: project })}
            className="px-2.5 py-1 bg-transparent hover:bg-slate-700/60 text-slate-300 hover:text-white text-[11px] font-medium rounded-lg flex items-center gap-1 transition-all"
          >
            <Info className="w-3.5 h-3.5 text-amber-400" /> Data Utama
          </button>
          <button
            type="button"
            onClick={() => navigate(`/projects/${projectId}/rab`, { state: project })}
            className="px-2.5 py-1 bg-transparent hover:bg-slate-700/60 text-slate-300 hover:text-white text-[11px] font-medium rounded-lg flex items-center gap-1 transition-all"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-amber-400" /> RAB
          </button>
          <button
            type="button"
            className="px-2.5 py-1 bg-amber-500 text-slate-950 text-[11px] font-bold rounded-lg flex items-center gap-1 shadow-sm transition-all cursor-default"
          >
            <TrendingUp className="w-3.5 h-3.5" /> Kurva S
          </button>
          <button
            type="button"
            onClick={() => navigate(`/projects/${projectId}/peta-gis`, { state: project })}
            className="px-2.5 py-1 bg-transparent hover:bg-slate-700/60 text-slate-300 hover:text-white text-[11px] font-medium rounded-lg flex items-center gap-1 transition-all"
          >
            <Compass className="w-3.5 h-3.5 text-amber-400" /> Peta GIS
          </button>
        </div>
      </div>

      {/* Main Content Area: Split 55% Chart / 45% Table agar pas 1 layar */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-2 min-h-0 overflow-hidden">
        
        {/* Left Section: Kurva S Chart */}
        <div className="lg:col-span-7 bg-slate-800/60 border border-slate-700/60 p-2.5 rounded-xl flex flex-col min-h-0">
          <div className="flex items-center justify-between border-b border-slate-700/60 pb-1.5 shrink-0">
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-amber-500" />
              <h3 className="text-xs font-bold text-white">Grafik Kumulatif Rencana vs Realisasi</h3>
            </div>
            <div className="flex items-center gap-3 text-[10px]">
              <span className="flex items-center gap-1 text-blue-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span> Rencana
              </span>
              <span className="flex items-center gap-1 text-amber-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span> Realisasi
              </span>
            </div>
          </div>

          <div className="flex-1 w-full min-h-0 pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dummyKurvaS} margin={{ top: 10, right: 15, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="minggu" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} domain={[0, 100]} unit="%" tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px', padding: '6px 10px' }}
                />
                <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '4px' }} />
                <Line type="monotone" dataKey="rencana" name="Rencana (%)" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="realisasi" name="Realisasi (%)" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Section: Rincian Item Progress */}
        <div className="lg:col-span-5 bg-slate-800/60 border border-slate-700/60 rounded-xl flex flex-col min-h-0 overflow-hidden">
          <div className="px-3 py-2 border-b border-slate-700/60 flex items-center justify-between shrink-0">
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              <PieChart className="w-3.5 h-3.5 text-amber-500" /> Rincian Progress Pekerjaan
            </h3>
            <span className="text-[10px] text-slate-400 bg-slate-900/60 px-2 py-0.5 rounded border border-slate-700/50">
              {dummyItemProgress.length} Items
            </span>
          </div>

          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-left border-collapse table-fixed">
              <thead className="text-[9px] uppercase text-slate-400 bg-slate-900/90 sticky top-0 z-10 border-b border-slate-700/80">
                <tr>
                  <th className="px-2 py-1.5 w-[50%]">Item Pekerjaan</th>
                  <th className="px-1 py-1.5 text-center w-[20%]">Vol</th>
                  <th className="px-1 py-1.5 text-center w-[12%]">Bobot</th>
                  <th className="px-2 py-1.5 text-right w-[18%]">Progress</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/40 text-[10px]">
                {dummyItemProgress.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="px-2 py-1.5 text-slate-200 truncate" title={item.nama}>
                      <span className="text-amber-500 font-mono text-[9px] mr-1">#{item.id}</span>
                      {item.nama}
                    </td>
                    <td className="px-1 py-1.5 text-center text-slate-400 font-mono text-[9px] truncate">
                      {item.volume} {item.satuan}
                    </td>
                    <td className="px-1 py-1.5 text-center text-slate-400 font-mono text-[9px]">
                      {item.bobot}%
                    </td>
                    <td className="px-2 py-1.5 text-right">
                      <div className="flex flex-col items-end gap-0.5">
                        <span className="text-[9px] font-bold text-amber-400 font-mono">{item.progress}%</span>
                        <div className="w-full bg-slate-900 rounded-full h-1 overflow-hidden border border-slate-700/50">
                          <div 
                            className="bg-amber-500 h-full rounded-full transition-all duration-300" 
                            style={{ width: `${item.progress}%` }} 
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}