import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Activity, 
  AlertTriangle, 
  DollarSign, 
  FileText, 
  Clock, 
  ArrowRight,
  TrendingUp,
  MapPin,
  CheckCircle2,
  HardHat,
  Calendar
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

// --- DATA DUMMY DASHBOARD ---
const kpiData = {
  totalProyek: 12,
  nilaiKontrak: '45.850.000.000',
  rataDeviasi: '+1.5',
  proyekKritis: 2
};

const chartProgressData = [
  { name: 'Jembatan Sei Tabalong', plan: 32.5, actual: 35.5, deviasi: 3.0 },
  { name: 'Jalan Stasiun Utama', plan: 35.0, actual: 28.0, deviasi: -7.0 },
  { name: 'Gedung Perkantoran', plan: 60.0, actual: 61.2, deviasi: 1.2 },
  { name: 'Irigasi Desa A', plan: 85.0, actual: 80.0, deviasi: -5.0 },
  { name: 'RSUD Daerah', plan: 15.0, actual: 15.5, deviasi: 0.5 },
];

const proyekAktif = [
  { id: 1, nama: 'Pembangunan Jembatan Sei Tabalong', progress: 35.5, deviasi: '+3.0', status: 'On Track' },
  { id: 2, nama: 'Rehabilitasi Jalan Raya Utama Stasiun', progress: 28.0, deviasi: '-7.0', status: 'Kritis' },
  { id: 3, nama: 'Pembangunan Gedung Perkantoran Baru', progress: 61.2, deviasi: '+1.2', status: 'On Track' },
  { id: 4, nama: 'Normalisasi Irigasi Desa A', progress: 80.0, deviasi: '-5.0', status: 'Terlambat' },
];

const laporanTerbaru = [
  { id: 1, pengawas: 'Pahrin Hunter', proyek: 'Jembatan Sei Tabalong', tanggal: '19 Ags 2026', cuaca: 'Cerah', status: 'Verified' },
  { id: 2, pengawas: 'Ahmad Setiawan', proyek: 'Jalan Stasiun Utama', tanggal: '18 Ags 2026', cuaca: 'Hujan', status: 'Draft' },
  { id: 3, pengawas: 'Budi Raharjo', proyek: 'Gedung Perkantoran', tanggal: '18 Ags 2026', cuaca: 'Cerah', status: 'Verified' },
  { id: 4, pengawas: 'Dedi Kurniawan', proyek: 'Irigasi Desa A', tanggal: '17 Ags 2026', cuaca: 'Gerimis', status: 'Verified' },
];

export default function DashboardUtama() {
  const navigate = useNavigate();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/95 border border-slate-700 p-3 rounded-lg shadow-xl text-xs">
          <p className="font-bold text-white mb-2">{label}</p>
          <div className="space-y-1">
            <p className="text-sky-400">Rencana: <span className="font-mono font-bold">{payload[0].value}%</span></p>
            <p className="text-emerald-400">Realisasi: <span className="font-mono font-bold">{payload[1].value}%</span></p>
            <p className={`pt-1 border-t border-slate-700/50 mt-1 ${payload[0].payload.deviasi < 0 ? 'text-rose-400' : 'text-amber-400'}`}>
              Deviasi: <span className="font-mono font-bold">{payload[0].payload.deviasi > 0 ? '+' : ''}{payload[0].payload.deviasi}%</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Header Dashboard */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-wide">Executive Dashboard</h1>
          <p className="text-xs text-slate-400 mt-1">Ringkasan portofolio pengawasan, progress fisik, dan laporan harian</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => navigate('/laporan/input')} 
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-all border border-slate-700 shadow-sm flex items-center gap-2"
          >
            <FileText className="w-4 h-4" /> Entri Laporan
          </button>
          <button 
            onClick={() => navigate('/projects/tambah')} 
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-2"
          >
            <Building2 className="w-4 h-4" /> Proyek Baru
          </button>
        </div>
      </div>

      {/* KPI Cards (4 Kolom) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Total Proyek */}
        <div className="bg-slate-800/60 border border-slate-700/60 p-5 rounded-2xl shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Building2 className="w-16 h-16 text-amber-500" />
          </div>
          <div className="relative z-10">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Proyek Aktif</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">{kpiData.totalProyek}</span>
              <span className="text-[10px] text-emerald-400 font-medium bg-emerald-500/10 px-1.5 py-0.5 rounded">Tahun 2026</span>
            </div>
          </div>
        </div>

        {/* Card 2: Nilai Kontrak */}
        <div className="bg-slate-800/60 border border-slate-700/60 p-5 rounded-2xl shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <DollarSign className="w-16 h-16 text-emerald-500" />
          </div>
          <div className="relative z-10">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Total Nilai Kontrak</span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-sm font-bold text-slate-300">Rp</span>
              <span className="text-xl font-extrabold text-white truncate">{kpiData.nilaiKontrak}</span>
            </div>
          </div>
        </div>

        {/* Card 3: Rata-rata Deviasi */}
        <div className="bg-slate-800/60 border border-slate-700/60 p-5 rounded-2xl shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Activity className="w-16 h-16 text-blue-500" />
          </div>
          <div className="relative z-10">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Deviasi Rata-rata</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-amber-400">{kpiData.rataDeviasi}%</span>
              <span className="text-[10px] text-amber-400/80 font-medium">Surplus</span>
            </div>
          </div>
        </div>

        {/* Card 4: Proyek Kritis */}
        <div className="bg-slate-800/60 border border-slate-700/60 p-5 rounded-2xl shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <AlertTriangle className="w-16 h-16 text-rose-500" />
          </div>
          <div className="relative z-10">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Proyek Kritis (Dev &lt; -5%)</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-rose-400">{kpiData.proyekKritis}</span>
              <span className="text-[10px] text-rose-400 font-medium bg-rose-500/10 px-1.5 py-0.5 rounded">Perlu Perhatian</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area (Chart & Lists) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Kiri: Grafik Progress Portofolio (Lebar 2 Kolom) */}
        <div className="lg:col-span-2 bg-slate-800/60 border border-slate-700/60 rounded-2xl shadow-lg flex flex-col">
          <div className="p-5 border-b border-slate-700/60 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-amber-500" /> Progress Rencana vs Realisasi
              </h2>
              <p className="text-[10px] text-slate-400 mt-1">Perbandingan kurva S pada 5 proyek dengan nilai kontrak terbesar.</p>
            </div>
            <button onClick={() => navigate('/projects')} className="text-[10px] text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1">
              Lihat Semua <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="p-5 flex-1 min-h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartProgressData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={9} tickLine={false} axisLine={false} tickFormatter={(value) => value.length > 15 ? value.substring(0, 15) + '...' : value} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} unit="%" domain={[0, 100]} />
                <Tooltip content={<CustomTooltip />} cursor={{fill: '#1e293b', opacity: 0.4}} />
                <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} iconType="circle" />
                <Bar dataKey="plan" name="Plan (Rencana)" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar dataKey="actual" name="Actual (Realisasi)" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={40}>
                  {/* Warnai merah jika deviasi negatif parah */}
                  {chartProgressData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.deviasi < 0 ? '#f43f5e' : '#10b981'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Kanan: Feed Laporan Harian Terkini */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl shadow-lg flex flex-col">
          <div className="p-5 border-b border-slate-700/60 flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-500" /> Laporan Harian Terkini
            </h2>
          </div>
          <div className="p-2 flex-1 overflow-y-auto max-h-[300px]">
            {laporanTerbaru.map((lap) => (
              <div key={lap.id} className="p-3 border-b border-slate-700/40 last:border-0 hover:bg-slate-700/20 transition-colors cursor-pointer group" onClick={() => navigate('/laporan')}>
                <div className="flex items-start justify-between mb-1">
                  <span className="text-xs font-bold text-slate-200 group-hover:text-amber-400 transition-colors truncate pr-2">{lap.pengawas}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${lap.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-700 text-slate-300'}`}>
                    {lap.status}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 flex items-center gap-1.5 mb-1.5">
                  <MapPin className="w-3 h-3" /> <span className="truncate">{lap.proyek}</span>
                </div>
                <div className="flex items-center justify-between text-[9px] text-slate-500">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {lap.tanggal}</span>
                  <span className="bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">{lap.cuaca}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-slate-700/60 bg-slate-900/40 text-center">
            <button onClick={() => navigate('/laporan')} className="text-[10px] font-bold text-slate-400 hover:text-white transition-colors">
              Buka Semua Laporan
            </button>
          </div>
        </div>

      </div>

      {/* Tabel Status Proyek Aktif */}
      <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl shadow-lg overflow-hidden">
        <div className="p-5 border-b border-slate-700/60 flex items-center justify-between bg-slate-900/50">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-amber-500" /> Pemantauan Proyek Aktif
          </h2>
          <span className="text-[10px] text-slate-400 font-mono bg-slate-800 px-2 py-1 rounded-lg border border-slate-700">{proyekAktif.length} Pekerjaan</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/80 border-b border-slate-700/60 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="p-4 w-[40%]">Nama Proyek</th>
                <th className="p-4 text-center w-[20%]">Progress (Actual)</th>
                <th className="p-4 text-center w-[20%]">Deviasi</th>
                <th className="p-4 text-center w-[20%]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/40 text-xs text-slate-300">
              {proyekAktif.map((proyek) => {
                const isKritis = proyek.status === 'Kritis' || proyek.status === 'Terlambat';
                return (
                  <tr key={proyek.id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="p-4 font-medium text-slate-200 truncate" title={proyek.nama}>
                      <span className="text-amber-500 mr-2 text-[10px]">#{proyek.id}</span>
                      {proyek.nama}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <span className="font-mono font-bold text-emerald-400">{proyek.progress}%</span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`font-mono font-bold px-2 py-1 rounded bg-slate-900 border ${
                        isKritis ? 'text-rose-400 border-rose-500/30' : 'text-amber-400 border-amber-500/30'
                      }`}>
                        {proyek.deviasi}%
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium border ${
                        isKritis 
                          ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' 
                          : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      }`}>
                        {isKritis ? <AlertTriangle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                        {proyek.status}
                      </span>
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