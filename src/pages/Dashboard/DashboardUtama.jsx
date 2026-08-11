import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { 
  Building2, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  MapPin, 
  ChevronRight,
  FileText,
  Image as ImageIcon,
  Paperclip,
  UserCheck,
  Calendar,
  ExternalLink,
  Download,
  LineChart
} from 'lucide-react';

// Marker kustom menggunakan HTML & CSS Tailwind
const createCustomIcon = (status) => {
  const colorClass = status === 'On Progress' ? 'bg-amber-500' : status === 'Delayed' ? 'bg-rose-500' : 'bg-emerald-500';
  return L.divIcon({
    className: 'custom-div-icon',
    html: `
      <div class="relative flex items-center justify-center">
        <span class="animate-ping absolute inline-flex h-5 w-5 rounded-full ${colorClass} opacity-75"></span>
        <div class="w-4 h-4 ${colorClass} rounded-full border-2 border-slate-900 shadow-lg"></div>
      </div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

// Data Dummy Proyek & Koordinat GIS
const projectsData = [
  {
    id: 1,
    nama: 'Pembangunan Jembatan Sei Tabalong',
    lokasi: 'Kec. Murung Pudak',
    lat: -2.155,
    lng: 115.385,
    progress: 68,
    target: 70,
    status: 'On Progress',
    kontraktor: 'PT Konstruksi Jaya',
  },
  {
    id: 2,
    nama: 'Rehabilitasi Jalan Raya Utama Stasiun',
    lokasi: 'Kec. Tanta',
    lat: -2.190,
    lng: 115.420,
    progress: 35,
    target: 50,
    status: 'Delayed',
    kontraktor: 'CV Bina Karya',
  },
  {
    id: 3,
    nama: 'Pembangunan Gedung Kantor Dinas',
    lokasi: 'Kec. Tanjung',
    lat: -2.180,
    lng: 115.370,
    progress: 100,
    target: 100,
    status: 'Completed',
    kontraktor: 'PT Perkasa Utama',
  },
];

// Data Kurva S (S-Curve) Proyek
const sCurveData = [
  { minggu: 'M-1', plan: 5, actual: 5 },
  { minggu: 'M-2', plan: 12, actual: 14 },
  { minggu: 'M-3', plan: 22, actual: 25 },
  { minggu: 'M-4', plan: 35, actual: 36 },
  { minggu: 'M-5', plan: 50, actual: 48 },
  { minggu: 'M-6', plan: 62, actual: 58 },
  { minggu: 'M-7', plan: 70, actual: 68 },
  { minggu: 'M-8', plan: 82, actual: null },
  { minggu: 'M-9', plan: 92, actual: null },
  { minggu: 'M-10', plan: 100, actual: null },
];

// Data Laporan Terbaru yang Baru Dibuat
const laporanTerbaru = {
  id: 1,
  nomorLaporan: 'LAP/2026/08/001',
  namaProyek: 'Pembangunan Jembatan Sei Tabalong',
  nomorKontrak: 'HK.02.03/KONT/2026/01',
  tanggal: '11 Agustus 2026',
  cuaca: 'Cerah (Pagi) / Hujan Ringan (Sore)',
  lokasi: 'STA 02+400 s/d STA 02+650',
  pelapor: 'Ahmad Setiawan',
  jabatanPelapor: 'Inspector Lapangan',
  kontraktor: 'PT Konstruksi Jaya',
  konsultan: 'CV Sekawan Studio',
  status: 'Verified',
  verifiedBy: 'Ir. Handoko (Site Manager)',
  verifiedAt: '11 Aug 2026, 17:30 WITA',
  itemPekerjaan: [
    { id: 1, kode: '1.1', item: 'Pekerjaan Struktur Beton Class A (K-350)', sat: 'm3', plan: 50, realHarian: 45.5, akumulasi: 320.5 },
    { id: 2, kode: '1.2', item: 'Pemasangan Besi Ulir D16 (Rebaring)', sat: 'kg', plan: 1200, realHarian: 1250, akumulasi: 8400 },
    { id: 3, kode: '1.3', item: 'Bekisting Abutment Jembatan', sat: 'm2', plan: 60, realHarian: 58.0, akumulasi: 410.0 }
  ],
  catatanLapangan: 'Pengecoran abutment berjalan lancar hingga pukul 15.00 WITA. Hujan ringan mulai turun pada pukul 15.30 WITA tetapi pekerjaan finishing permukaan beton telah selesai.',
  kendala: 'Suplai ready mix sempat tertunda 30 menit akibat kemacetan di rute pengiriman utama.',
  fotoDokumentasi: [
    { id: 1, title: 'Persiapan Bekisting & Pembesian STA 02+400', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80' },
    { id: 2, title: 'Pengecoran Beton Structure Lapangan', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80' },
    { id: 3, title: 'Inspeksi K3 dan Alat Berat Lapangan', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80' }
  ],
  lampiranFiles: [
    { name: 'Hasil_Uji_Slump_Beton_11Aug.pdf', size: '1.2 MB', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
    { name: 'Sertifikat_Kalibrasi_Batching_Plant.pdf', size: '2.4 MB', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' }
  ]
};

export default function DashboardUtama() {
  return (
    <div className="space-y-6">
      {/* Header Dashboard */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide">Dashboard Utama</h1>
          <p className="text-xs text-slate-400">Monitoring Pemetaan GIS, Kurva S, & Summary Real-time Proyek Lapangan</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/60 px-3 py-1.5 rounded-xl text-xs text-slate-300">
          <Clock className="w-4 h-4 text-amber-500" />
          <span>Update Terakhir: Today, {new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WITA</span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-800/60 border border-slate-700/60 p-4 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-xl">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Total Proyek</p>
            <h3 className="text-xl font-bold text-white">12 Proyek</h3>
          </div>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/60 p-4 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-xl">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Sedang Berjalan</p>
            <h3 className="text-xl font-bold text-white">8 Proyek</h3>
          </div>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/60 p-4 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-xl">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Terlambat (Critical)</p>
            <h3 className="text-xl font-bold text-white">2 Proyek</h3>
          </div>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/60 p-4 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Selesai 100%</p>
            <h3 className="text-xl font-bold text-white">2 Proyek</h3>
          </div>
        </div>
      </div>

      {/* Main Content: GIS Map & Side Project List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mapping Project GIS (2 Columns) */}
        <div className="lg:col-span-2 bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-500" />
              <h2 className="text-sm font-bold text-white">Pemetaan Lokasi Proyek (GIS)</h2>
            </div>
            <span className="text-[11px] text-slate-400">3 Titik Terdeteksi</span>
          </div>

          {/* Leaflet Map Box */}
          <div className="w-full h-[380px] rounded-xl overflow-hidden border border-slate-700/80 z-0">
            <MapContainer
              center={[-2.180, 115.390]}
              zoom={12}
              scrollWheelZoom={true}
              className="w-full h-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {projectsData.map((project) => (
                <Marker
                  key={project.id}
                  position={[project.lat, project.lng]}
                  icon={createCustomIcon(project.status)}
                >
                  <Popup>
                    <div className="p-1 font-sans text-slate-900">
                      <h4 className="font-bold text-sm">{project.nama}</h4>
                      <p className="text-xs text-slate-600">{project.lokasi}</p>
                      <div className="mt-2 text-xs border-t pt-1">
                        <div><strong>Kontraktor:</strong> {project.kontraktor}</div>
                        <div><strong>Progress:</strong> {project.progress}% (Target: {project.target}%)</div>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* Status Ringkasan Proyek (1 Column) */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-white mb-4 px-1">Status Lapangan Terbaru</h2>
            <div className="space-y-3">
              {projectsData.map((project) => (
                <div 
                  key={project.id}
                  className="p-3 bg-slate-900/60 border border-slate-700/50 rounded-xl space-y-2 hover:border-slate-600 transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xs font-semibold text-white line-clamp-1">{project.nama}</h3>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      project.status === 'On Progress' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                      project.status === 'Delayed' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                      'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {project.status}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400">{project.lokasi}</p>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-300">
                      <span>Real: {project.progress}%</span>
                      <span>Target: {project.target}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          project.status === 'Delayed' ? 'bg-rose-500' : 'bg-amber-500'
                        }`}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="w-full mt-4 py-2 bg-slate-700/50 hover:bg-slate-700 text-xs font-semibold text-slate-300 hover:text-white rounded-xl transition-all flex items-center justify-center gap-1">
            Lihat Semua Proyek <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* SEKSI BARU 1: Graphic Kurva S (S-Curve) */}
      <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 space-y-4 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700/60 pb-3">
          <div className="flex items-center gap-2">
            <LineChart className="w-5 h-5 text-amber-500" />
            <div>
              <h2 className="text-sm font-bold text-white">Kurva S Progres Proyek</h2>
              <p className="text-xs text-slate-400">Pembangunan Jembatan Sei Tabalong (Rencana vs Realisasi)</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-sky-400 rounded-full inline-block"></span>
              <span className="text-sky-300">Plan (Rencana)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-amber-400 rounded-full inline-block"></span>
              <span className="text-amber-300">Actual (Realisasi)</span>
            </div>
          </div>
        </div>

        {/* Visualisasi Kurva S menggunakan SVG */}
        <div className="w-full overflow-x-auto pt-2">
          <div className="min-w-[600px] h-[220px] relative flex flex-col justify-between">
            {/* Gridlines Background */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
              <div className="border-b border-slate-500 w-full"></div>
              <div className="border-b border-slate-500 w-full"></div>
              <div className="border-b border-slate-500 w-full"></div>
              <div className="border-b border-slate-500 w-full"></div>
              <div className="border-b border-slate-500 w-full"></div>
            </div>

            {/* SVG Lines */}
            <svg className="w-full h-full overflow-visible z-10" viewBox="0 0 1000 200" preserveAspectRatio="none">
              {/* Line Plan */}
              <polyline
                fill="none"
                stroke="#38bdf8"
                strokeWidth="3"
                strokeDasharray="4 2"
                points="0,190 100,176 200,156 300,130 400,100 500,76 600,60 700,36 800,16 900,0"
              />
              {/* Line Realisasi / Actual */}
              <polyline
                fill="none"
                stroke="#f59e0b"
                strokeWidth="4"
                points="0,190 100,172 200,150 300,128 400,104 500,84 600,64"
              />
              {/* Dot Markers */}
              {sCurveData.map((item, idx) => {
                const x = idx * 100;
                const yPlan = 200 - (item.plan * 2);
                const yActual = item.actual !== null ? 200 - (item.actual * 2) : null;

                return (
                  <g key={idx}>
                    <circle cx={x} cy={yPlan} r="3" fill="#38bdf8" />
                    {yActual !== null && <circle cx={x} cy={yActual} r="4" fill="#f59e0b" />}
                  </g>
                );
              })}
            </svg>

            {/* X-Axis Labels */}
            <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-2 pt-2 border-t border-slate-700/60 z-20">
              {sCurveData.map((d, i) => (
                <div key={i} className="text-center">
                  <div>{d.minggu}</div>
                  <div className="text-[10px] text-slate-500">{d.actual !== null ? `${d.actual}%` : '-'}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SEKSI BARU 2: Detail Laporan Harian yang Baru Dibuat */}
      <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 space-y-6 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-700/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">Laporan Lapangan Terbaru</h2>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {laporanTerbaru.status}
                </span>
              </div>
              <p className="text-xs text-amber-500/90 font-mono mt-0.5">{laporanTerbaru.nomorLaporan}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-300">
            <UserCheck className="w-4 h-4 text-emerald-400" />
            <span>Diverifikasi oleh: <strong className="text-white">{laporanTerbaru.verifiedBy}</strong></span>
          </div>
        </div>

        {/* Summary Ringkas Header Laporan */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
          <div>
            <p className="text-slate-400">Proyek & Kontrak:</p>
            <p className="font-semibold text-white mt-0.5">{laporanTerbaru.namaProyek}</p>
            <p className="text-[11px] font-mono text-slate-400">{laporanTerbaru.nomorKontrak}</p>
          </div>
          <div>
            <p className="text-slate-400">Pelaksanaan & Cuaca:</p>
            <p className="font-medium text-slate-200 mt-0.5">{laporanTerbaru.tanggal} ({laporanTerbaru.lokasi})</p>
            <p className="text-[11px] text-slate-400">{laporanTerbaru.cuaca}</p>
          </div>
          <div>
            <p className="text-slate-400">Inspector Lapangan:</p>
            <p className="font-semibold text-white mt-0.5">{laporanTerbaru.pelapor}</p>
            <p className="text-[11px] text-slate-400">{laporanTerbaru.kontraktor}</p>
          </div>
        </div>

        {/* Tabel Rincian Pekerjaan */}
        <div className="overflow-x-auto border border-slate-700/60 rounded-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/80 border-b border-slate-700/60 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="p-3 w-14">Kode</th>
                <th className="p-3">Uraian Pekerjaan</th>
                <th className="p-3 text-center">Satuan</th>
                <th className="p-3 text-right">Target Plan</th>
                <th className="p-3 text-right">Realisasi Harian</th>
                <th className="p-3 text-right">Akumulasi Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50 text-xs text-slate-300">
              {laporanTerbaru.itemPekerjaan.map((item) => (
                <tr key={item.id} className="hover:bg-slate-700/30 transition-all">
                  <td className="p-3 font-mono text-amber-500/90 font-semibold">{item.kode}</td>
                  <td className="p-3 font-medium text-white">{item.item}</td>
                  <td className="p-3 text-center text-slate-400 font-mono">{item.sat}</td>
                  <td className="p-3 text-right font-mono text-slate-300">{item.plan}</td>
                  <td className="p-3 text-right font-mono text-emerald-400 font-bold">{item.realHarian}</td>
                  <td className="p-3 text-right font-mono text-slate-200 font-semibold">{item.akumulasi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Dokumentasi Foto & Lampiran File */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Foto Dokumentasi */}
          <div className="md:col-span-2 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
              <ImageIcon className="w-4 h-4" />
              <span>Dokumentasi Foto Terbaru</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {laporanTerbaru.fotoDokumentasi.map((foto) => (
                <div key={foto.id} className="group bg-slate-900/60 border border-slate-700/50 rounded-xl overflow-hidden">
                  <div className="h-28 overflow-hidden relative">
                    <img src={foto.url} alt={foto.title} className="w-full h-full object-cover group-hover:scale-105 transition-all" />
                    <a href={foto.url} target="_blank" rel="noopener noreferrer" className="absolute top-1.5 right-1.5 p-1 rounded bg-slate-900/80 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="p-2">
                    <p className="text-[11px] text-slate-300 line-clamp-1">{foto.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lampiran Dokumen */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
              <Paperclip className="w-4 h-4" />
              <span>Lampiran Dokumen PDF</span>
            </div>
            <div className="space-y-2">
              {laporanTerbaru.lampiranFiles.map((file, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-900/50 border border-slate-700/50 rounded-xl">
                  <div className="truncate pr-2">
                    <p className="text-xs text-slate-200 truncate">{file.name}</p>
                    <p className="text-[10px] text-slate-400">{file.size}</p>
                  </div>
                  <a href={file.url} target="_blank" rel="noopener noreferrer" className="p-1.5 text-slate-400 hover:text-amber-400">
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}