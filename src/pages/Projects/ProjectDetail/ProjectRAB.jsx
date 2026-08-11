import React from 'react';
import { useNavigate, useLocation, useParams, Link } from 'react-router-dom';
import { 
  DollarSign, 
  ArrowLeft, 
  Building2, 
  Info, 
  FileSpreadsheet, 
  TrendingUp, 
  Compass, 
  PieChart, 
  TrendingDown, 
  FileText 
} from 'lucide-react';

const detailedRABTable = [
  // DIVISI 1
  { type: 'divisi', label: 'DIVISI 1. UMUM' },
  { type: 'subheader', label: 'Mobilisasi' },
  { type: 'item', label: 'Concrete Testing Cylinder Mould For Compressive Strength', sat: 'Ls', renVol: '10', renHarga: '1.900.000,00', renJumlah: '19.000.000,00', realVol: '9', realHarga: '1.900.000,00', realJumlah: '17.100.000,00' },
  { type: 'subheader', label: 'Peralatan' },
  { type: 'item', label: 'Excavator 80-140 HP', sat: 'Unit', renVol: '20', renHarga: '200.000,00', renJumlah: '4.000.000,00', realVol: '1', realHarga: '200.000,00', realJumlah: '200.000,00' },
  { type: 'item', label: 'Generator Set', sat: 'Unit', renVol: '15', renHarga: '2.000.000,00', renJumlah: '30.000.000,00', realVol: '2', realHarga: '2.000.000,00', realJumlah: '4.000.000,00' },
  { type: 'item', label: 'Concrete Mixer 0,3-0,6 m3', sat: 'Unit', renVol: '12', renHarga: '########', renJumlah: '########', realVol: '3', realHarga: '########', realJumlah: '########' },
  { type: 'item', label: 'Mesin Pompa Air', sat: 'Unit', renVol: '16', renHarga: '50,00', renJumlah: '800,00', realVol: '4', realHarga: '50,00', realJumlah: '200,00' },
  { type: 'item', label: 'Concrete Vibrator Vibrator', sat: 'Unit', renVol: '15', renHarga: '1.000.000,00', renJumlah: '15.000.000,00', realVol: '5', realHarga: '1.000.000,00', realJumlah: '5.000.000,00' },
  { type: 'subheader', label: 'Demobilisasi' },
  { type: 'item', label: 'Demobilisasi', sat: 'Ls', renVol: '12', renHarga: '########', renJumlah: '########', realVol: '6', realHarga: '########', realJumlah: '########' },
  { type: 'subheader', label: 'Manajemen dan Keselamatan Lalu Lintas' },
  { type: 'subheader', label: 'Peralatan Keselamatan Lalu Lintas' },
  { type: 'item', label: 'Rambu Peringatan Pekerjaan di Jalan', sat: 'Buah', renVol: '10.00', renHarga: '235.000,00', renJumlah: '2.350.000,00', realVol: '10.00', realHarga: '235.000,00', realJumlah: '2.350.000,00' },
  { type: 'item', label: 'Traffic Cone', sat: 'Buah', renVol: '5.00', renHarga: '210.000,00', renJumlah: '1.050.000,00', realVol: '5.00', realHarga: '210.000,00', realJumlah: '1.050.000,00' },
  { type: 'item', label: 'Police Line', sat: 'Roll', renVol: '5.00', renHarga: '70.000,00', renJumlah: '350.000,00', realVol: '5.00', realHarga: '70.000,00', realJumlah: '350.000,00' },
  { type: 'subheader', label: 'Keselamatan Dan Kesehatan Kerja (Keselamatan Konstruksi)' },
  { type: 'subheader', label: 'Keselamatan Konstruksi' },
  { type: 'subheader', label: 'Alat Pelindung Diri (APD) terdiri atas:' },
  { type: 'item', label: 'Topi Pelindung (Safety helmet)', sat: 'Buah', renVol: '15.00', renHarga: '70.000,00', renJumlah: '1.050.000,00', realVol: '15.00', realHarga: '70.000,00', realJumlah: '1.050.000,00' },
  { type: 'item', label: 'Pelindung Pernafasan dan Mulut (masker)', sat: 'Buah', renVol: '100.00', renHarga: '2.000,00', renJumlah: '200.000,00', realVol: '100.00', realHarga: '2.000,00', realJumlah: '200.000,00' },
  { type: 'item', label: 'Sarung Tangan (Safety gloves)', sat: 'Psg', renVol: '15.00', renHarga: '11.000,00', renJumlah: '165.000,00', realVol: '15.00', realHarga: '11.000,00', realJumlah: '165.000,00' },
  { type: 'item', label: 'Sepatu Keselamatan (Safety shoes)', sat: 'Psg', renVol: '15.00', renHarga: '205.000,00', renJumlah: '3.075.000,00', realVol: '15.00', realHarga: '205.000,00', realJumlah: '3.075.000,00' },
  { type: 'item', label: 'Rompi Keselamatan (Safety vest)', sat: 'Buah', renVol: '15.00', renHarga: '60.000,00', renJumlah: '900.000,00', realVol: '15.00', realHarga: '60.000,00', realJumlah: '900.000,00' },
  { type: 'subheader', label: 'Personil K3 Konstruksi:' },
  { type: 'item', label: 'Petugas K3', sat: 'OB', renVol: '1.50', renHarga: '3.620.000,00', renJumlah: '5.430.000,00', realVol: '1.50', realHarga: '3.620.000,00', realJumlah: '5.430.000,00' },
  { type: 'subheader', label: 'Fasilitas Sarana Kesehatan:' },
  { type: 'item', label: 'Peralatan P3K (Kotak P3K, Tandu, Obat Luka, Perban, Dll)', sat: 'SET', renVol: '1.00', renHarga: '600.000,00', renJumlah: '600.000,00', realVol: '1.00', realHarga: '600.000,00', realJumlah: '600.000,00' },
  { type: 'subheader', label: 'Pemindahan Utilitas:' },
  { type: 'item', label: 'Pemindahan Utilitas', sat: 'At', renVol: '1.00', renHarga: '7.700.000,00', renJumlah: '7.700.000,00', realVol: '1.00', realHarga: '7.700.000,00', realJumlah: '7.700.000,00' },
  { type: 'summary', label: 'JUMLAH HARGA PEKERJAAN DIVISI 1. UMUM', renJumlah: '#ERROR!', realJumlah: '#ERROR!' },

  // DIVISI 2
  { type: 'divisi', label: 'DIVISI 2. DRAINASE' },
  { type: 'item', label: 'Saluran berbentuk U Tipe Ds 1', sat: 'm1', renVol: '95.00', renHarga: '1.043.900,00', renJumlah: '99.170.500,00', realVol: '#REF!', realHarga: '1.043.900,00', realJumlah: '#REF!' },
  { type: 'item', label: 'Tutup U-Ditch 100x100cm', sat: 'm1', renVol: '95.00', renHarga: '865.700,00', renJumlah: '82.241.500,00', realVol: '#REF!', realHarga: '865.700,00', realJumlah: '#REF!' },
  { type: 'summary', label: 'JUMLAH HARGA PEKERJAAN DIVISI 2. DRAINASE', renJumlah: '181.412.000,00', realJumlah: '#REF!' },

  // DIVISI 3
  { type: 'divisi', label: 'DIVISI 3. PEKERJAAN TANAH DAN GEOSINTETIK' },
  { type: 'item', label: 'Galian Biasa', sat: 'M3', renVol: '#REF!', renHarga: '57.890,00', renJumlah: '#REF!', realVol: '#REF!', realHarga: '57.890,00', realJumlah: '#REF!' },
  { type: 'item', label: 'Timbunan Pilihan dari Sumber Galian', sat: 'M3', renVol: '#ERROR!', renHarga: '470.500,00', renJumlah: '#ERROR!', realVol: '#ERROR!', realHarga: '470.500,00', realJumlah: '#ERROR!' },
  { type: 'summary', label: 'JUMLAH HARGA PEKERJAAN DIVISI 3. PEKERJAAN TANAH DAN GEOSINTETIK', renJumlah: '#REF!', realJumlah: '#REF!' },

  // DIVISI 5
  { type: 'divisi', label: 'DIVISI 5. PERKERASAN BERBUTIR DAN PERKERASAN BETON' },
  { type: 'item', label: 'Lapis Pondasi Agregat Kelas B', sat: 'M3', renVol: '#ERROR!', renHarga: '810.300,00', renJumlah: '#ERROR!', realVol: '#ERROR!', realHarga: '810.300,00', realJumlah: '#ERROR!' },
  { type: 'item', label: 'Perkeras Beton Semen dengan Anyaman Tulangan Tunggal', sat: 'M3', renVol: '#REF!', renHarga: '3.012.900,00', renJumlah: '#REF!', realVol: '#REF!', realHarga: '3.012.900,00', realJumlah: '#REF!' },
  { type: 'summary', label: 'JUMLAH HARGA PEKERJAAN DIVISI 5. PERKERASAN BERBUTIR DAN PERKERASAN BETON', renJumlah: '#ERROR!', realJumlah: '#ERROR!' },

  // DIVISI 7
  { type: 'divisi', label: 'DIVISI 7. STRUKTUR' },
  { type: 'item', label: 'Beton Struktur, fc 20 Mpa', sat: 'M3', renVol: '#REF!', renHarga: '2.226.585,00', renJumlah: '#REF!', realVol: '#REF!', realHarga: '2.226.585,00', realJumlah: '#REF!' },
  { type: 'item', label: 'Beton Struktur, fc 10 Mpa', sat: 'M3', renVol: '#ERROR!', renHarga: '1.725.450,00', renJumlah: '#ERROR!', realVol: '#ERROR!', realHarga: '1.725.450,00', realJumlah: '#ERROR!' },
  { type: 'item', label: 'Anyaman kawat Yang Dilas (Welder Wire Mesh)', sat: 'Kg', renVol: '#REF!', renHarga: '37.000,00', renJumlah: '#REF!', realVol: '#REF!', realHarga: '37.000,00', realJumlah: '#REF!' },
  { type: 'item', label: 'Pipa Drainase PVC diameter 50 mm', sat: 'M1', renVol: '#ERROR!', renHarga: '34.200,00', renJumlah: '#ERROR!', realVol: '#ERROR!', realHarga: '34.200,00', realJumlah: '#ERROR!' },
  { type: 'item', label: 'Bekisting utk Pedestrian', sat: 'M2', renVol: '#ERROR!', renHarga: '274.400,00', renJumlah: '#ERROR!', realVol: '#ERROR!', realHarga: '274.400,00', realJumlah: '#ERROR!' },
  { type: 'item', label: 'Pengurugan 1 M3 dengan pasir', sat: 'M3', renVol: '#REF!', renHarga: '376.400,00', renJumlah: '#REF!', realVol: '#REF!', realHarga: '376.400,00', realJumlah: '#REF!' },
  { type: 'summary', label: 'JUMLAH HARGA PEKERJAAN DIVISI DIVISI 7. STRUKTUR BETON', renJumlah: '#REF!', realJumlah: '#REF!' },

  // DIVISI 9
  { type: 'divisi', label: 'DIVISI 9. PEKERJAAN HARIAN & PEKERJAAN LAIN LAIN' },
  { type: 'item', label: 'Kereb Pracetak Jenis 2 (Penghalang/Barrier)', sat: 'M1', renVol: '#ERROR!', renHarga: '295.580,00', renJumlah: '#ERROR!', realVol: '#ERROR!', realHarga: '285.580,00', realJumlah: '#ERROR!' },
  { type: 'item', label: 'Perkerasan Blok beton pada Trotoar dan Median (Porcelain Tile B1a PS 30x30x0,98 cm)', sat: 'M2', renVol: '#REF!', renHarga: '680.240,00', renJumlah: '#REF!', realVol: '#REF!', realHarga: '680.240,00', realJumlah: '#REF!' },
  { type: 'item', label: 'Perkerasan Blok beton pada Trotoar dan Median (Guiding Block (TGS))', sat: 'M2', renVol: '#REF!', renHarga: '908.460,00', renJumlah: '#REF!', realVol: '#REF!', realHarga: '908.460,00', realJumlah: '#REF!' },
  { type: 'item', label: 'Manhole Uk. 60x60 (Besi Baja), G 5 Ton', sat: 'Buah', renVol: '#ERROR!', renHarga: '2.995.300,00', renJumlah: '#ERROR!', realVol: '#ERROR!', realHarga: '2.995.300,00', realJumlah: '#ERROR!' },
  { type: 'item', label: 'Pembesian Grill Uk. 40x60 cm Besi Baja cetak, G 20 Ton', sat: 'Buah', renVol: '#REF!', renHarga: '2.180.000,00', renJumlah: '#ERROR!', realVol: '#REF!', realHarga: '2.180.000,00', realJumlah: '#ERROR!' },
  { type: 'item', label: 'Manhole Uk. 40x40 (Besi Baja), G 5 Ton', sat: 'Buah', renVol: '#ERROR!', renHarga: '2.190.000,00', renJumlah: '#ERROR!', realVol: '#ERROR!', realHarga: '2.180.000,00', realJumlah: '#ERROR!' },
  { type: 'summary', label: 'JUMLAH HARGA PEKERJAAN DIVISI 9. PEKERJAAN HARIAN & PEKERJAAN LAIN LAIN', renJumlah: '#ERROR!', realJumlah: '#ERROR!' },

  // DIVISI 10
  { type: 'divisi', label: 'DIVISI 10. PEKERJAAN PEMELIHARAAN KINERJA' },
  { type: 'item', label: 'Pengecatan Kereb pada Trotoar atau Median', sat: 'M1', renVol: '#ERROR!', renHarga: '155.800,00', renJumlah: '#ERROR!', realVol: '#ERROR!', realHarga: '155.800,00', realJumlah: '#ERROR!' },
  { type: 'summary', label: 'JUMLAH HARGA PEKERJAAN DIVISI 9. PEKERJAAN HARIAN & PEKERJAAN LAIN LAIN', renJumlah: '#ERROR!', realJumlah: '#ERROR!' },

  // FOOTER TOTALS
  { type: 'footer', label: 'JUMLAH TOTAL PEKERJAAN', renJumlah: '#ERROR!', realJumlah: '#ERROR!' },
  { type: 'footer', label: 'PPN 11%', renJumlah: '#ERROR!', realJumlah: '#ERROR!' },
  { type: 'footer', label: 'PEMBULATAN', renJumlah: '#ERROR!', realJumlah: '#ERROR!' }
];

export default function ProjectRAB({ selectedProject }) {
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

  const rabData = detailedRABTable;
  const progress = project?.progress || project?.rabProgress || 35.5;
  const projectId = project.id || id || 1;

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka || 0);
  };

  const renderValue = (val, defaultColor = 'text-slate-300') => {
    if (!val) return null;
    if (val.includes('#ERROR!')) return <span className="text-red-400 font-bold bg-red-950/40 px-1 py-0.2 rounded text-[9px]">{val}</span>;
    if (val.includes('#REF!')) return <span className="text-amber-400 font-bold bg-amber-950/40 px-1 py-0.2 rounded text-[9px]">{val}</span>;
    if (val.includes('########')) return <span className="text-slate-500 font-bold">{val}</span>;
    return <span className={defaultColor}>{val}</span>;
  };

  return (
    <div className="w-full space-y-3 p-1">
      {/* Top Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-2">
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
              <Building2 className="w-4 h-4 text-amber-500" /> Rencana Anggaran Biaya (RAB)
            </h1>
            <p className="text-[10px] text-slate-400">{project.namaProyek} • spk10/11/08/2026{project.kodeKontrak}</p>
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
            className="px-2.5 py-1 bg-amber-500 text-slate-950 text-[11px] font-bold rounded-lg flex items-center gap-1 shadow-sm transition-all cursor-default"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" /> RAB
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
            onClick={() => navigate(`/projects/${projectId}/peta-gis`, { state: project })}
            className="px-2.5 py-1 bg-transparent hover:bg-slate-700/60 text-slate-300 hover:text-white text-[11px] font-medium rounded-lg flex items-center gap-1 transition-all"
          >
            <Compass className="w-3.5 h-3.5 text-amber-400" /> Peta GIS
          </button>
        </div>
      </div>

      {/* Grid Summary Compact */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-2.5">
          <span className="text-slate-400 text-[10px] font-medium flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5 text-amber-500" /> Total Pagu Kontrak
          </span>
          <p className="text-sm font-bold text-white mt-0.5">{formatRupiah(project.nilaiKontrak || 2500000000)}</p>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-2.5">
          <span className="text-slate-400 text-[10px] font-medium flex items-center gap-1">
            <PieChart className="w-3.5 h-3.5 text-emerald-400" /> Realisasi Anggaran
          </span>
          <p className="text-sm font-bold text-emerald-400 mt-0.5">{formatRupiah((project.nilaiKontrak || 2500000000) * (progress / 100))}</p>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-2.5">
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-[10px] font-medium flex items-center gap-1">
              <TrendingDown className="w-3.5 h-3.5 text-blue-400" /> Serapan Biaya
            </span>
            <span className="text-[11px] font-bold text-amber-400">{progress}%</span>
          </div>
          <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden border border-slate-700/60 mt-2">
            <div 
              className="bg-amber-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${progress}%` }} 
            />
          </div>
        </div>
      </div>

      {/* Tabel Pas 1 Layar Tanpa Scroll */}
      <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl overflow-hidden shadow-md">
        <div className="px-3 py-2 border-b border-slate-700/60 flex items-center justify-between">
          <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-amber-500" /> Detail Rencana Anggaran Biaya (RAB)
          </h3>
        </div>

        <div className="w-full max-h-[calc(100vh-250px)] overflow-y-auto">
          <table className="w-full table-fixed text-[10px] text-left text-slate-300 border-collapse">
            <thead className="text-[9px] uppercase text-slate-400 bg-slate-900/90 sticky top-0 z-10 border-b border-slate-700/80">
              <tr>
                <th rowSpan="2" className="px-2 py-1.5 border-r border-slate-700/60 w-[30%]">Uraian Pekerjaan</th>
                <th rowSpan="2" className="px-1 py-1.5 border-r border-slate-700/60 text-center w-[4%]">SAT</th>
                <th colSpan="3" className="px-1 py-0.5 border-r border-slate-700/60 text-center bg-blue-950/40 text-blue-300 font-bold w-[33%]">RENCANA</th>
                <th colSpan="3" className="px-1 py-0.5 text-center bg-emerald-950/40 text-emerald-300 font-bold w-[33%]">REALISASI</th>
              </tr>
              <tr>
                <th className="px-1 py-1 border-r border-t border-slate-700/60 text-right bg-blue-950/20 w-[7%]">Vol</th>
                <th className="px-1 py-1 border-r border-t border-slate-700/60 text-right bg-blue-950/20 w-[13%]">Harga Sat (Rp)</th>
                <th className="px-1 py-1 border-r border-t border-slate-700/60 text-right bg-blue-950/20 w-[13%]">Jumlah (Rp)</th>
                <th className="px-1 py-1 border-r border-t border-slate-700/60 text-right bg-emerald-950/20 w-[7%]">Vol</th>
                <th className="px-1 py-1 border-r border-t border-slate-700/60 text-right bg-emerald-950/20 w-[13%]">Harga Sat (Rp)</th>
                <th className="px-1 py-1 border-t border-slate-700/60 text-right bg-emerald-950/20 w-[13%]">Jumlah (Rp)</th>
              </tr>
            </thead>
            <tbody>
              {rabData.map((row, idx) => {
                if (row.type === 'divisi') {
                  return (
                    <tr key={idx} className="bg-slate-700/80 font-bold border-b border-slate-700">
                      <td colSpan={8} className="px-2 py-1 text-amber-400 text-[10px] uppercase truncate">
                        {row.label}
                      </td>
                    </tr>
                  );
                }
                if (row.type === 'subheader') {
                  return (
                    <tr key={idx} className="bg-slate-800/90 font-semibold border-b border-slate-700/50">
                      <td colSpan={8} className="px-2 pl-4 py-0.5 text-slate-300 text-[10px] truncate">
                        {row.label}
                      </td>
                    </tr>
                  );
                }
                if (row.type === 'summary') {
                  return (
                    <tr key={idx} className="bg-slate-900/90 font-bold border-y border-slate-700/80 text-[10px]">
                      <td colSpan={2} className="px-2 py-1 text-right text-slate-200 uppercase truncate">{row.label}</td>
                      <td colSpan={3} className="px-1 py-1 text-right border-r border-slate-700/60 font-mono">
                        {renderValue(row.renJumlah, "text-blue-300")}
                      </td>
                      <td colSpan={3} className="px-1 py-1 text-right font-mono">
                        {renderValue(row.realJumlah, "text-emerald-400")}
                      </td>
                    </tr>
                  );
                }
                if (row.type === 'footer') {
                  return (
                    <tr key={idx} className="bg-slate-950/90 font-extrabold border-t border-slate-700 text-[10px]">
                      <td colSpan={2} className="px-2 py-1 text-right text-amber-400 uppercase truncate">{row.label}</td>
                      <td colSpan={3} className="px-1 py-1 text-right border-r border-slate-700/60 font-mono">
                        {renderValue(row.renJumlah, "text-blue-300")}
                      </td>
                      <td colSpan={3} className="px-1 py-1 text-right font-mono">
                        {renderValue(row.realJumlah, "text-emerald-400")}
                      </td>
                    </tr>
                  );
                }
                return (
                  <tr key={idx} className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors">
                    <td className="px-2 py-1 pl-6 text-slate-200 truncate" title={row.label}>{row.label}</td>
                    <td className="px-1 py-1 text-center border-x border-slate-700/40 text-slate-400 font-mono text-[9px] truncate">{row.sat}</td>
                    <td className="px-1 py-1 text-right font-mono truncate">{renderValue(row.renVol, "text-slate-300")}</td>
                    <td className="px-1 py-1 text-right font-mono truncate">{renderValue(row.renHarga, "text-slate-400")}</td>
                    <td className="px-1 py-1 text-right border-r border-slate-700/40 font-mono truncate">{renderValue(row.renJumlah, "text-blue-300 font-medium")}</td>
                    <td className="px-1 py-1 text-right font-mono truncate">{renderValue(row.realVol, "text-slate-300")}</td>
                    <td className="px-1 py-1 text-right font-mono truncate">{renderValue(row.realHarga, "text-slate-400")}</td>
                    <td className="px-1 py-1 text-right font-mono truncate">{renderValue(row.realJumlah, "text-emerald-400 font-medium")}</td>
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