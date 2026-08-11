import React from 'react';
import { useNavigate, useLocation, useParams, Link } from 'react-router-dom';
import { 
  Compass, 
  ArrowLeft, 
  Building2, 
  Info, 
  FileSpreadsheet, 
  TrendingUp, 
  MapPin,
  Navigation,
  Layers,
  Globe
} from 'lucide-react';

export default function PetaGIS({ selectedProject }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  // Fallback data jika props belum di-pass secara langsung
  const project = selectedProject || location.state || {
    id: id || 1,
    namaProyek: 'Pembangunan Jembatan Sei Tabalong STA 04',
    kodeKontrak: '600/012/PUPR-TAB/2026',
    lokasi: 'Kabupaten Tabalong, Kalimantan Selatan',
    coordinates: { lat: -2.1833, lng: 115.4000 }
  };

  const projectId = project.id || id || 1;
  const coords = project.coordinates || { lat: -2.1833, lng: 115.4000 };

  return (
    <div className="w-full h-[calc(100vh-20px)] flex flex-col gap-2 p-1 overflow-hidden">
      {/* Top Navigation & Header */}
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
              <Compass className="w-4 h-4 text-amber-500" /> Peta Pemetaan GIS Proyek
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
            onClick={() => navigate(`/projects/${projectId}/kurva-s`, { state: project })}
            className="px-2.5 py-1 bg-transparent hover:bg-slate-700/60 text-slate-300 hover:text-white text-[11px] font-medium rounded-lg flex items-center gap-1 transition-all"
          >
            <TrendingUp className="w-3.5 h-3.5 text-amber-400" /> Kurva S
          </button>
          <button
            type="button"
            className="px-2.5 py-1 bg-amber-500 text-slate-950 text-[11px] font-bold rounded-lg flex items-center gap-1 shadow-sm transition-all cursor-default"
          >
            <Compass className="w-3.5 h-3.5" /> Peta GIS
          </button>
        </div>
      </div>

      {/* Main Container: Split Map & Sidebar Info (Fit 1 Viewport) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-2 min-h-0 overflow-hidden">
        
        {/* Left Section: Embedded Google Map GIS */}
        <div className="lg:col-span-8 bg-slate-800/60 border border-slate-700/60 rounded-xl overflow-hidden flex flex-col min-h-0 relative">
          <div className="px-3 py-1.5 bg-slate-900/80 border-b border-slate-700/60 flex items-center justify-between shrink-0">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-500" /> Live Interactive Map
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              {coords.lat}, {coords.lng}
            </span>
          </div>

          <div className="flex-1 w-full h-full relative">
            <iframe
              title="Peta GIS Project"
              width="100%"
              height="100%"
              className="w-full h-full border-0 grayscale opacity-90 contrast-125 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              src={`https://maps.google.com/maps?q=${coords.lat},${coords.lng}&z=14&output=embed`}
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Right Section: Location Metadata & Geolocation Details */}
        <div className="lg:col-span-4 flex flex-col gap-2 min-h-0">
          {/* Card Lokasi */}
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3 space-y-2">
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5 border-b border-slate-700/60 pb-1.5">
              <Globe className="w-3.5 h-3.5 text-amber-500" /> Informasi Geografis
            </h3>
            
            <div className="space-y-2 text-[11px]">
              <div>
                <span className="text-slate-400 text-[10px] block">Wilayah / Admin:</span>
                <span className="text-slate-200 font-medium">{project.lokasi || 'N/A'}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-700/40">
                <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-700/50">
                  <span className="text-slate-400 text-[9px] block">Latitude</span>
                  <span className="text-amber-400 font-mono font-bold text-[11px]">{coords.lat}</span>
                </div>
                <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-700/50">
                  <span className="text-slate-400 text-[9px] block">Longitude</span>
                  <span className="text-amber-400 font-mono font-bold text-[11px]">{coords.lng}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card Status & Akses Navigasi */}
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3 flex-1 flex flex-col justify-between">
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5 border-b border-slate-700/60 pb-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-500" /> Layer & Navigasi
              </h3>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Peta ini terhubung secara langsung dengan sistem koordinat proyek. Gunakan tombol navigasi di bawah untuk membuka rute langsung di aplikasi peta eksternal.
              </p>
            </div>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${coords.lat},${coords.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-md mt-2"
            >
              <Navigation className="w-3.5 h-3.5" /> Buka di Google Maps
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}