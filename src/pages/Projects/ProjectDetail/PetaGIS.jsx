import React, { useState } from 'react';
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
  Globe,
  Map as MapIcon,
  Maximize,
  Ruler,
  CheckCircle2,
  FileText,
  Download,
  Eye
} from 'lucide-react';

export default function PetaGIS({ selectedProject }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  // State untuk kontrol peta (Simulasi WebGIS)
  const [mapType, setMapType] = useState('satellite'); // 'roadmap' | 'satellite'
  const [showLayers, setShowLayers] = useState({
    batasProyek: true,
    titikSTA: true,
    utilitas: false
  });

  // Ambil data utama proyek dari navigasi (ProjectData)
  const project = selectedProject || location.state || {
    id: id || 1,
    namaProyek: 'Pembangunan Jembatan Sei Tabalong STA 04',
    kodeKontrak: '600/012/PUPR-TAB/2026',
    lokasiWilayah: 'Kec. Murung Pudak, Kabupaten Tabalong',
    latitude: '-2.18341',
    longitude: '115.38510',
    // Parameter Spasial Tambahan (Dummy)
    staAwal: 'STA 02+400',
    staAkhir: 'STA 02+650',
    panjangPenanganan: '250 Meter',
    statusLahan: 'Bebas 100% (Clean & Clear)'
  };

  const projectId = project.id || id || 1;
  const coords = { lat: project.latitude || -2.1833, lng: project.longitude || 115.4000 };

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
              <Compass className="w-4 h-4 text-amber-500 shrink-0 mt-1 lg:mt-0" /> 
              <span>Peta & Informasi Spasial (GIS)</span>
            </h1>
            <p className="text-[10px] lg:text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 lg:line-clamp-1 leading-relaxed">
              {project.namaProyek} • SPK{project.kodeKontrak}
            </p>
          </div>
        </div>

        {/* Kanan: Action Buttons & Navigasi Modul (Sejajar Kiri-Kanan di Mobile) */}
        <div className="flex flex-col lg:flex-row items-center gap-2 w-full lg:w-auto mt-2 lg:mt-0">
          
          {/* Card 1: Action Bar GIS */}
          <div className="flex items-center w-full lg:w-auto justify-between lg:justify-start gap-1 bg-white dark:bg-slate-800/80 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700/60 shadow-sm overflow-x-auto hide-scrollbar">
            <button className="flex-1 lg:flex-none flex justify-center items-center gap-1.5 py-2 lg:py-1.5 lg:px-3 bg-transparent hover:bg-blue-50 dark:hover:bg-blue-500/10 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 text-[11px] font-medium rounded-lg transition-all whitespace-nowrap">
              <Maximize className="w-4 h-4 lg:w-3.5 lg:h-3.5" /> <span className="hidden lg:inline">Fullscreen Map</span>
            </button>
            <div className="hidden lg:block w-px h-5 bg-slate-200 dark:bg-slate-700/80 mx-0.5 shrink-0"></div>
            <button className="flex-1 lg:flex-none flex justify-center items-center gap-1.5 py-2 lg:py-1.5 lg:px-3 bg-transparent hover:bg-amber-50 dark:hover:bg-amber-500/10 text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 text-[11px] font-medium rounded-lg transition-all whitespace-nowrap">
              <Download className="w-4 h-4 lg:w-3.5 lg:h-3.5" /> <span className="hidden lg:inline">Export Peta (PDF)</span>
            </button>
          </div>

          {/* Card 2: Sub-Module Nav (PETA GIS AKTIF) */}
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
              onClick={() => navigate(`/projects/${projectId}/kurva-s`, { state: project })}
              className="flex-1 lg:flex-none flex justify-center items-center gap-1.5 py-2 lg:py-1.5 lg:px-3 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-[11px] font-medium rounded-lg transition-all whitespace-nowrap"
            >
              <TrendingUp className="w-4 h-4 lg:w-3.5 lg:h-3.5 text-amber-500" /> <span className="hidden lg:inline">Kurva S</span>
            </button>
            <button
              type="button"
              className="flex-1 lg:flex-none flex justify-center items-center gap-1.5 py-2 lg:py-1.5 lg:px-3 bg-amber-500 text-white dark:text-slate-950 text-[11px] font-bold rounded-lg shadow-sm transition-all cursor-default whitespace-nowrap"
            >
              <Compass className="w-4 h-4 lg:w-3.5 lg:h-3.5" /> <span className="hidden lg:inline">Peta GIS</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Container: Split Map & Sidebar Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Section: Embedded Map & GIS Controls (8 Kolom) */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl overflow-hidden flex flex-col shadow-sm relative min-h-[450px] lg:min-h-[500px]">
          
          {/* Header Map */}
          <div className="px-4 py-3 bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-700/60 flex items-center justify-between shrink-0 z-10">
            <span className="text-xs font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
              <MapIcon className="w-4 h-4 text-amber-500" /> WebGIS Interaktif
            </span>
            <div className="flex items-center gap-3">
              {/* Toggle Tipe Peta */}
              <div className="flex bg-slate-200 dark:bg-slate-800 rounded-lg p-0.5 border border-slate-300 dark:border-slate-700/50">
                <button 
                  onClick={() => setMapType('roadmap')}
                  className={`px-3 py-1 text-[10px] font-semibold rounded-md transition-all ${mapType === 'roadmap' ? 'bg-white dark:bg-slate-600 text-slate-800 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
                >
                  Peta Jalan
                </button>
                <button 
                  onClick={() => setMapType('satellite')}
                  className={`px-3 py-1 text-[10px] font-semibold rounded-md transition-all ${mapType === 'satellite' ? 'bg-white dark:bg-slate-600 text-slate-800 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
                >
                  Citra Satelit
                </button>
              </div>
            </div>
          </div>

          {/* Container Peta Google Maps */}
          <div className="flex-1 w-full h-full relative bg-slate-100 dark:bg-slate-900">
            {/* Simulasi Iframe Peta - Dalam produksi gunakan API Google Maps / Leaflet seutuhnya */}
            <iframe
              title="Peta GIS Project"
              width="100%"
              height="100%"
              className={`w-full h-full border-0 transition-all duration-500 ${mapType === 'satellite' ? 'contrast-125 saturate-110' : 'dark:brightness-90 dark:contrast-125'}`}
              src={`https://maps.google.com/maps?q=${coords.lat},${coords.lng}&t=${mapType === 'satellite' ? 'k' : 'm'}&z=16&output=embed`}
              allowFullScreen
            ></iframe>

            {/* Floating Control Panel (Simulasi Layer GIS) */}
            <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/80 p-3 rounded-xl backdrop-blur-md shadow-lg w-44 md:w-48 z-20">
              <h3 className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5 border-b border-slate-200 dark:border-slate-700/60 pb-1.5">
                <Layers className="w-3 h-3 text-amber-500" /> Kontrol Layer
              </h3>
              <div className="space-y-2 text-xs">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" checked={showLayers.batasProyek} onChange={() => setShowLayers({...showLayers, batasProyek: !showLayers.batasProyek})} className="w-3.5 h-3.5 accent-amber-500 bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600 rounded" />
                  <span className="text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Batas Proyek</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" checked={showLayers.titikSTA} onChange={() => setShowLayers({...showLayers, titikSTA: !showLayers.titikSTA})} className="w-3.5 h-3.5 accent-amber-500 bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600 rounded" />
                  <span className="text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Titik STA (Markers)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" checked={showLayers.utilitas} onChange={() => setShowLayers({...showLayers, utilitas: !showLayers.utilitas})} className="w-3.5 h-3.5 accent-amber-500 bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600 rounded" />
                  <span className="text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Jaringan Utilitas</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Location Metadata & Parameters (4 Kolom) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          
          {/* Card 1: Informasi Geografis & Spasial */}
          <div className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-4 md:p-5 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-700/60 pb-3">
              <Globe className="w-4 h-4 text-amber-500" /> Parameter Spasial
            </h3>
            
            <div className="space-y-3 text-xs">
              <div className="bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700/50">
                <span className="text-slate-500 dark:text-slate-400 text-[10px] block mb-0.5">Wilayah Administrasi</span>
                <span className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed">{project.lokasiWilayah || project.lokasi}</span>
              </div>

              {/* Koordinat Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700/50">
                  <span className="text-slate-500 dark:text-slate-400 text-[10px] block mb-1">Latitude (Y)</span>
                  <span className="text-sky-600 dark:text-sky-400 font-mono font-bold">{coords.lat}</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700/50">
                  <span className="text-slate-500 dark:text-slate-400 text-[10px] block mb-1">Longitude (X)</span>
                  <span className="text-sky-600 dark:text-sky-400 font-mono font-bold">{coords.lng}</span>
                </div>
              </div>

              {/* Data Dimensi & STA */}
              <div className="bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700/50 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700/40 pb-2">
                  <span className="text-slate-500 dark:text-slate-400 text-[11px] flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Titik Awal (STA)</span>
                  <span className="text-amber-600 dark:text-amber-400 font-mono font-bold">{project.staAwal || 'STA 0+000'}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700/40 pb-2">
                  <span className="text-slate-500 dark:text-slate-400 text-[11px] flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Titik Akhir (STA)</span>
                  <span className="text-amber-600 dark:text-amber-400 font-mono font-bold">{project.staAkhir || 'STA 1+500'}</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-slate-500 dark:text-slate-400 text-[11px] flex items-center gap-1.5"><Ruler className="w-3.5 h-3.5" /> Panjang Penanganan</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">{project.panjangPenanganan || '1.500 Meter'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Status Lahan & Perizinan */}
          <div className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-4 md:p-5 space-y-3 shadow-sm flex-1">
            <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-700/60 pb-3">
              <FileText className="w-4 h-4 text-amber-500" /> Status Lahan & Dokumen
            </h3>
            
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3 p-3 bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-200 dark:border-emerald-500/20 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-emerald-600 dark:text-emerald-400 mb-1">Status Pembebasan Lahan</p>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{project.statusLahan || 'Lahan telah dibebaskan sepenuhnya. Tidak ada kendala sosial.'}</p>
                </div>
              </div>

              <button className="w-full flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-700/50 border border-slate-200 dark:border-slate-700/50 rounded-xl transition-all group">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-slate-400 group-hover:text-amber-500 transition-colors" />
                  <span className="text-slate-700 dark:text-slate-300 font-medium group-hover:text-slate-900 dark:group-hover:text-white">Dokumen DED & Topografi</span>
                </div>
                <Eye className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-amber-500" />
              </button>
            </div>
          </div>

          {/* Card 3: Eksternal Navigasi */}
          <div className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-4 md:p-5 shadow-sm">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${coords.lat},${coords.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white dark:text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
            >
              <Navigation className="w-4 h-4" /> Buka Rute di Google Maps
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}