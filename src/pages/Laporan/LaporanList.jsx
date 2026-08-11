import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Eye, 
  Plus, 
  FileSpreadsheet, 
  Calendar, 
  MapPin, 
  HardHat,
  Paperclip,
  RotateCw
} from 'lucide-react';
import LaporanData from './LaporanData'; // Mengimport LaporanData

// Sample Data Dummy Laporan Lapangan Harian
const dummyLaporan = [
  {
    id: 1,
    nomorLaporan: 'LAP/2026/08/001',
    namaProyek: 'Pembangunan Jembatan Sei Tabalong',
    tanggal: '11 Agustus 2026',
    lokasi: 'STA 02+400 s/d STA 02+650',
    pelapor: 'Ahmad Setiawan (Inspector)',
    kontraktor: 'PT Konstruksi Jaya',
    itemUtama: 'Pekerjaan Struktur Beton Class A',
    volumeHarian: '45.5 m3',
    status: 'Verified',
    lampiranCount: 4
  },
  {
    id: 2,
    nomorLaporan: 'LAP/2026/08/002',
    namaProyek: 'Rehabilitasi Jalan Raya Utama Stasiun',
    tanggal: '10 Agustus 2026',
    lokasi: 'STA 05+100 - Sisi Timur',
    pelapor: 'Budi Raharjo (Site Engineer)',
    kontraktor: 'CV Bina Karya',
    itemUtama: 'Pengamparan Aspal Hotmix AC-WC',
    volumeHarian: '120 Ton',
    status: 'Pending',
    lampiranCount: 2
  },
  {
    id: 3,
    nomorLaporan: 'LAP/2026/08/003',
    namaProyek: 'Pembangunan Gedung Kantor Dinas',
    tanggal: '09 Agustus 2026',
    lokasi: 'Lantai 2 Zone B',
    pelapor: 'Dedi Kurniawan (Inspector)',
    kontraktor: 'PT Perencana Utama',
    itemUtama: 'Pasangan Dinding Bata & Plesteran',
    volumeHarian: '85 m2',
    status: 'Verified',
    lampiranCount: 5
  }
];

export default function LaporanList() {
  const navigate = useNavigate();
  const [selectedLaporan, setSelectedLaporan] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Handler untuk refresh data
  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // Simulasi fetch data / refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 750);
  };

  const filteredLaporan = dummyLaporan.filter(l => 
    l.namaProyek.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.nomorLaporan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.pelapor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.lokasi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Jika ada laporan yang dipilih, langsung tampilkan komponen LaporanData
  if (selectedLaporan) {
    return (
      <LaporanData 
        laporan={selectedLaporan} 
        onBack={() => setSelectedLaporan(null)} 
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide">Daftar Laporan Lapangan</h1>
          <p className="text-xs text-slate-400">Monitor dan kelola seluruh entri laporan harian progres konstruksi</p>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Tombol Refresh - Diletakkan di sebelah kiri kolom search */}
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
              placeholder="Cari laporan, proyek, pelapor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-800 border border-slate-700/60 text-xs text-white pl-9 pr-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 w-64"
            />
          </div>

          {/* Tombol Buat Laporan */}
          <button
            onClick={() => navigate('/laporan/input')}
            className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold text-xs px-3.5 py-2 rounded-xl transition-all shadow-md shadow-amber-500/10 active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Buat Laporan Baru</span>
          </button>
        </div>
      </div>

      {/* Tabel Daftar Laporan */}
      <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/80 border-b border-slate-700/60 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="p-4">Info Laporan & Proyek</th>
                <th className="p-4">Tanggal & Lokasi</th>
                <th className="p-4">Item Pekerjaan Utama</th>
                <th className="p-4">Volume Realisasi</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50 text-xs text-slate-300">
              {filteredLaporan.length > 0 ? (
                filteredLaporan.map((laporan) => (
                  <tr key={laporan.id} className="hover:bg-slate-700/30 transition-all">
                    <td className="p-4">
                      <div className="font-semibold text-white">{laporan.namaProyek}</div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <HardHat className="w-3 h-3 text-amber-500" />
                        <span>{laporan.pelapor}</span>
                      </div>
                      <div className="text-[10px] text-amber-500/80 font-mono mt-0.5">{laporan.nomorLaporan}</div>
                    </td>

                    <td className="p-4 space-y-1">
                      <div className="flex items-center gap-1 text-slate-200 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{laporan.tanggal}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-slate-400">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        <span>{laporan.lokasi}</span>
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="font-medium text-slate-200">{laporan.itemUtama}</div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <Paperclip className="w-3 h-3 text-slate-400" />
                        <span>{laporan.lampiranCount} file terlampir</span>
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="text-emerald-400 font-bold text-sm">{laporan.volumeHarian}</div>
                      <div className="text-[10px] text-slate-400">Progres Harian</div>
                    </td>

                    <td className="p-4">
                      <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full border ${
                        laporan.status === 'Verified' 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}>
                        {laporan.status}
                      </span>
                    </td>

                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {/* Tombol Lihat Detail mengarahkan ke LaporanData */}
                        <button
                          onClick={() => navigate('/laporan/detail', { state: { laporan } })}
                          className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-xl transition-all inline-flex items-center gap-1.5 shadow-md shadow-amber-500/10 active:scale-95 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" /> Lihat Detail
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-400">
                    <FileSpreadsheet className="w-10 h-10 mx-auto text-slate-600 mb-2" />
                    <p className="text-xs">Tidak ada data laporan yang cocok dengan pencarian.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}