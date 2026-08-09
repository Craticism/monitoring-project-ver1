import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { 
  Building2, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  MapPin, 
  ChevronRight 
} from 'lucide-react';

// Marker kustom menggunakan HTML & CSS Tailwind (Menghindari bug asset bawaan Leaflet di Vite)
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

// Data Dummy Proyek & Koordinat
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

export default function DashboardUtama() {
  return (
    <div className="space-y-6">
      {/* Header Dashboard */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide">Dashboard Utama</h1>
          <p className="text-xs text-slate-400">Monitoring Pemetaan GIS & Summary Real-time Proyek Lapangan</p>
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
          <div className="w-full h-[400px] rounded-xl overflow-hidden border border-slate-700/80 z-0">
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
    </div>
  );
}