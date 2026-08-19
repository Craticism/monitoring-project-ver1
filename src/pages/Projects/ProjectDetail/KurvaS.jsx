import React, { useState } from 'react';
import { useNavigate, useLocation, useParams, Link } from 'react-router-dom';
import { 
  TrendingUp, 
  ArrowLeft, 
  Building2, 
  Info, 
  FileSpreadsheet, 
  Compass, 
  PieChart, 
  Download,
  CheckCircle2,
  AlertTriangle
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

// Format Data Standar Kurva S Konsultan Konstruksi (Mingguan)
const defaultKurvaS = [
  { minggu: 'M-01', bobotRencana: 2.0, bobotRealisasi: 2.0, rencanaKumulatif: 2.0, realisasiKumulatif: 2.0, deviasi: 0.0 },
  { minggu: 'M-02', bobotRencana: 3.5, bobotRealisasi: 3.0, rencanaKumulatif: 5.5, realisasiKumulatif: 5.0, deviasi: -0.5 },
  { minggu: 'M-03', bobotRencana: 6.5, bobotRealisasi: 6.0, rencanaKumulatif: 12.0, realisasiKumulatif: 11.0, deviasi: -1.0 },
  { minggu: 'M-04', bobotRencana: 10.0, bobotRealisasi: 9.5, rencanaKumulatif: 22.0, realisasiKumulatif: 20.5, deviasi: -1.5 },
  { minggu: 'M-05', bobotRencana: 13.0, bobotRealisasi: 12.0, rencanaKumulatif: 35.0, realisasiKumulatif: 32.5, deviasi: -2.5 },
  { minggu: 'M-06', bobotRencana: 15.0, bobotRealisasi: 15.5, rencanaKumulatif: 50.0, realisasiKumulatif: 48.0, deviasi: -2.0 },
  { minggu: 'M-07', bobotRencana: 18.0, bobotRealisasi: 19.5, rencanaKumulatif: 68.0, realisasiKumulatif: 67.5, deviasi: -0.5 },
  { minggu: 'M-08', bobotRencana: 17.0, bobotRealisasi: 18.0, rencanaKumulatif: 85.0, realisasiKumulatif: 85.5, deviasi: +0.5 },
  { minggu: 'M-09', bobotRencana: 10.0, bobotRealisasi: 10.0, rencanaKumulatif: 95.0, realisasiKumulatif: 95.5, deviasi: +0.5 },
  { minggu: 'M-10', bobotRencana: 5.0, bobotRealisasi: 4.5, rencanaKumulatif: 100.0, realisasiKumulatif: 100.0, deviasi: 0.0 },
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

  // Custom Tooltip Recharts agar merespons Dark/Light Mode
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-2.5 rounded-lg shadow-lg text-xs">
          <p className="font-bold text-slate-800 dark:text-white mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="flex justify-between gap-4 font-medium">
              <span>{entry.name}:</span> 
              <span className="font-mono">{entry.value}%</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
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
              <TrendingUp className="w-4 h-4 text-amber-500 shrink-0 mt-1 lg:mt-0" /> 
              <span>Kurva S & Progress Fisik</span>
            </h1>
            <p className="text-[10px] lg:text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 lg:line-clamp-1 leading-relaxed">
              {project.namaProyek} • SPK{project.kodeKontrak}
            </p>
          </div>
        </div>

        {/* Kanan: Action Buttons & Navigasi Modul */}
        <div className="flex flex-col lg:flex-row items-center gap-2 w-full lg:w-auto mt-2 lg:mt-0">
          
          {/* Card 1: Action Bar (Hanya Export) */}
          <div className="flex items-center w-full lg:w-auto justify-between lg:justify-start gap-1 bg-white dark:bg-slate-800/80 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700/60 shadow-sm overflow-x-auto hide-scrollbar">
            <button className="flex-1 lg:flex-none flex justify-center items-center gap-1.5 py-2 lg:py-1.5 lg:px-3 bg-transparent hover:bg-emerald-50 dark:hover:bg-emerald-500/10 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 text-[11px] font-medium rounded-lg transition-all whitespace-nowrap">
              <FileSpreadsheet className="w-4 h-4 lg:w-3.5 lg:h-3.5" /> <span className="hidden lg:inline">Export Excel</span>
            </button>
            <div className="hidden lg:block w-px h-5 bg-slate-200 dark:bg-slate-700/80 mx-0.5 shrink-0"></div>
            <button className="flex-1 lg:flex-none flex justify-center items-center gap-1.5 py-2 lg:py-1.5 lg:px-3 bg-transparent hover:bg-amber-50 dark:hover:bg-amber-500/10 text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 text-[11px] font-medium rounded-lg transition-all whitespace-nowrap">
              <Download className="w-4 h-4 lg:w-3.5 lg:h-3.5" /> <span className="hidden lg:inline">Export PDF</span>
            </button>
          </div>

          {/* Card 2: Sub-Module Nav (KURVA S AKTIF) */}
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
              onClick={() => navigate(`/projects/${projectId}/rab`, { state: project })}
              className="flex-1 lg:flex-none flex justify-center items-center gap-1.5 py-2 lg:py-1.5 lg:px-3 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-[11px] font-medium rounded-lg transition-all whitespace-nowrap"
            >
              <FileSpreadsheet className="w-4 h-4 lg:w-3.5 lg:h-3.5 text-amber-500" /> <span className="hidden lg:inline">RAB</span>
            </button>
            <button
              type="button"
              className="flex-1 lg:flex-none flex justify-center items-center gap-1.5 py-2 lg:py-1.5 lg:px-3 bg-amber-500 text-white dark:text-slate-950 text-[11px] font-bold rounded-lg shadow-sm transition-all cursor-default whitespace-nowrap"
            >
              <TrendingUp className="w-4 h-4 lg:w-3.5 lg:h-3.5" /> <span className="hidden lg:inline">Kurva S</span>
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

      {/* Main Content Area: Split Chart & Item Progress Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Section: Kurva S Chart (7 Kolom) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 p-5 rounded-2xl flex flex-col shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700/60 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-500" />
              <h3 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">Grafik Kumulatif Rencana vs Realisasi</h3>
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Rencana
              </span>
              <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Realisasi
              </span>
            </div>
          </div>

          <div className="w-full h-[350px] overflow-x-auto hide-scrollbar">
            <div className="min-w-[500px] h-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dummyKurvaS} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" vertical={false} className="dark:stroke-slate-700" />
                  <XAxis dataKey="minggu" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} className="dark:stroke-slate-400" />
                  <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} unit="%" tickLine={false} axisLine={false} className="dark:stroke-slate-400" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px', display: 'none' }} />
                  <Line type="monotone" dataKey="rencanaKumulatif" name="Kumulatif Rencana" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="realisasiKumulatif" name="Kumulatif Realisasi" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Section: Rincian Item Progress (5 Kolom) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl flex flex-col overflow-hidden shadow-sm">
          <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700/60 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
            <h3 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <PieChart className="w-4 h-4 text-amber-500" /> Rincian Progress Pekerjaan
            </h3>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 px-2.5 py-0.5 rounded-md border border-slate-200 dark:border-slate-700 font-mono">
              {dummyItemProgress.length} Items
            </span>
          </div>

          <div className="flex-1 overflow-y-auto max-h-[350px]">
            <table className="w-full text-left border-collapse table-fixed">
              <thead className="text-[10px] uppercase text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900/80 sticky top-0 z-10 border-b border-slate-200 dark:border-slate-700/80">
                <tr>
                  <th className="px-3 py-2 w-[48%]">Item Pekerjaan</th>
                  <th className="px-2 py-2 text-center w-[18%]">Vol / Sat</th>
                  <th className="px-2 py-2 text-center w-[14%]">Bobot</th>
                  <th className="px-3 py-2 text-right w-[20%]">Progress</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40 text-xs">
                {dummyItemProgress.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="px-3 py-2.5 text-slate-800 dark:text-slate-200 truncate" title={item.nama}>
                      <span className="text-amber-500 font-mono text-[10px] mr-1">#{item.id}</span>
                      {item.nama}
                    </td>
                    <td className="px-2 py-2.5 text-center text-slate-500 dark:text-slate-400 font-mono text-[10px] truncate">
                      {item.volume} {item.satuan}
                    </td>
                    <td className="px-2 py-2.5 text-center text-slate-500 dark:text-slate-400 font-mono text-[10px]">
                      {item.bobot}%
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 font-mono">{item.progress}%</span>
                        <div className="w-full bg-slate-200 dark:bg-slate-900 rounded-full h-1.5 overflow-hidden border border-slate-300 dark:border-slate-700/50">
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

      {/* Tabel Rincian Data Kurva S Mingguan (Standar Konsultan Konstruksi) */}
      <div className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700/60 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-amber-500" /> Tabel Parameter Kumulatif Mingguan (S-Curve Table)
          </h3>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">Periode Pelaksanaan Kontrak</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-700/60 text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <th className="p-3 text-center w-16">Minggu</th>
                <th className="p-3 text-right">Bobot Rencana (%)</th>
                <th className="p-3 text-right">Bobot Realisasi (%)</th>
                <th className="p-3 text-right bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-300">Kumulatif Rencana (%)</th>
                <th className="p-3 text-right bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-300">Kumulatif Realisasi (%)</th>
                <th className="p-3 text-center">Deviasi (%)</th>
                <th className="p-3 text-center">Status Evaluasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 text-xs text-slate-700 dark:text-slate-300 font-mono">
              {dummyKurvaS.map((row, idx) => {
                const isDevNegative = row.deviasi < 0;

                return (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-all">
                    <td className="p-3 text-center font-bold text-slate-800 dark:text-white">{row.minggu}</td>
                    <td className="p-3 text-right text-slate-600 dark:text-slate-300">{row.bobotRencana.toFixed(2)}%</td>
                    <td className="p-3 text-right text-slate-600 dark:text-slate-300">{row.bobotRealisasi.toFixed(2)}%</td>
                    <td className="p-3 text-right text-blue-600 dark:text-blue-400 font-semibold bg-blue-50/50 dark:bg-blue-950/5">{row.rencanaKumulatif.toFixed(2)}%</td>
                    <td className="p-3 text-right text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50/50 dark:bg-emerald-950/5">{row.realisasiKumulatif.toFixed(2)}%</td>
                    <td className={`p-3 text-center font-bold ${isDevNegative ? 'text-rose-600 dark:text-rose-400' : 'text-amber-600 dark:text-amber-400'}`}>
                      {row.deviasi > 0 ? `+${row.deviasi.toFixed(2)}` : row.deviasi.toFixed(2)}%
                    </td>
                    <td className="p-3 text-center">
                      {isDevNegative ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-sans font-medium bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20">
                          <AlertTriangle className="w-3 h-3" /> Terlambat
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-sans font-medium bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                          <CheckCircle2 className="w-3 h-3" /> Tepat / Surplus
                        </span>
                      )}
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