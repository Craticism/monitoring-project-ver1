import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Eye, 
  Plus, 
  FileSpreadsheet, 
  Calendar, 
  MapPin, 
  RotateCw,
  UserCheck,
  CloudSun,
  ListTodo,
  Users,
  Wrench
} from 'lucide-react';
import LaporanData from './LaporanData';

// Sample Data Dummy disesuaikan dengan skema Google Form Laporan Harian
const dummyLaporan = [
  {
    id: 1,
    nomorLaporan: 'LAP/2026/08/19/001',
    status: 'Verified',
    tanggalPengawasan: '19 Agustus 2026',
    namaPengawas: 'Pahrin Hunter',
    namaProyek: 'Pembangunan Jembatan Sei Tabalong',
    lokasi: 'STA 02+400 s/d STA 02+650',
    kegiatan: [
      'Pengecoran struktur abutment jembatan (120 m3)',
      'Pemasangan bekisting kayu muka abutment',
      'Perakitan besi tulangan D16 (800 kg)'
    ],
    personil: [
      { peran: 'Dinas PUPR', jumlah: 1 },
      { peran: 'Konsultan', jumlah: 2 },
      { peran: 'Kontraktor', jumlah: 2 },
      { peran: 'Pekerja', jumlah: 8 },
      { peran: 'Tukang', jumlah: 4 }
    ],
    peralatan: [
      { namaAlat: 'Excavator', jumlah: 1 },
      { namaAlat: 'Concrete Mixer', jumlah: 2 },
      { namaAlat: 'Vibrator Beton', jumlah: 2 }
    ],
    cuaca: { cerah: 5, gerimis: 2, hujanDeras: 1 },
    fotoDokumentasi: [
      { id: 1, title: 'Pengecoran', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80' }
    ],
    lampiranFiles: [
      { name: 'Backup_Data_Laporan.pdf', size: '1.2 MB', url: '#' }
    ]
  },
  {
    id: 2,
    nomorLaporan: 'LAP/2026/08/18/002',
    status: 'Pending',
    tanggalPengawasan: '18 Agustus 2026',
    namaPengawas: 'Ahmad Setiawan',
    namaProyek: 'Rehabilitasi Jalan Raya Utama Stasiun',
    lokasi: 'STA 05+100 - Sisi Timur',
    kegiatan: [
      'Pengamparan Aspal Hotmix AC-WC (120 Ton)',
      'Pemadatan menggunakan Tandem Roller'
    ],
    personil: [
      { peran: 'Konsultan', jumlah: 1 },
      { peran: 'Kontraktor', jumlah: 1 },
      { peran: 'Operator', jumlah: 3 },
      { peran: 'Pekerja', jumlah: 6 }
    ],
    peralatan: [
      { namaAlat: 'Asphalt Finisher', jumlah: 1 },
      { namaAlat: 'Tandem Roller', jumlah: 2 },
      { namaAlat: 'Dump Truck', jumlah: 5 }
    ],
    cuaca: { cerah: 8, gerimis: 0, hujanDeras: 0 },
    fotoDokumentasi: [],
    lampiranFiles: []
  },
  {
    id: 3,
    nomorLaporan: 'LAP/2026/08/17/003',
    status: 'Verified',
    tanggalPengawasan: '17 Agustus 2026',
    namaPengawas: 'Budi Raharjo',
    namaProyek: 'Pembangunan Gedung Kantor Dinas',
    lokasi: 'Lantai 2 Zone B',
    kegiatan: [
      'Pasangan Dinding Bata Merah',
      'Plesteran Dinding Interior'
    ],
    personil: [
      { peran: 'Kepala Kerja/Mandor', jumlah: 1 },
      { peran: 'Tukang', jumlah: 5 },
      { peran: 'Pekerja', jumlah: 10 }
    ],
    peralatan: [
      { namaAlat: 'Concrete Mixer', jumlah: 1 },
      { namaAlat: 'Alat bantu', jumlah: 15 }
    ],
    cuaca: { cerah: 4, gerimis: 3, hujanDeras: 1 },
    fotoDokumentasi: [],
    lampiranFiles: []
  }
];

export default function LaporanList() {
  const navigate = useNavigate();
  const [selectedLaporan, setSelectedLaporan] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 750);
  };

  const filteredLaporan = dummyLaporan.filter(l => 
    l.namaProyek.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.nomorLaporan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.namaPengawas.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

  // Fungsi helper untuk menghitung total alat & personil
  const hitungTotal = (arrayData) => {
    return arrayData.reduce((total, item) => total + (item.jumlah || 0), 0);
  };

  return (
    <div className="space-y-6 w-full">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide">Daftar Laporan Harian</h1>
          <p className="text-xs text-slate-400">Monitor dan kelola entri laporan pengawasan harian</p>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            title="Refresh Data"
            className="p-2 bg-slate-800 hover:bg-slate-700/80 border border-slate-700/60 text-slate-300 hover:text-white rounded-xl transition-all duration-200 active:scale-95 cursor-pointer disabled:opacity-50"
          >
            <RotateCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-amber-500' : ''}`} />
          </button>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari proyek, laporan, pengawas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-800 border border-slate-700/60 text-xs text-white pl-9 pr-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 w-64"
            />
          </div>

          <button
            onClick={() => navigate('/laporan/input')}
            className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold text-xs px-3.5 py-2 rounded-xl transition-all shadow-md shadow-amber-500/10 active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Buat Laporan</span>
          </button>
        </div>
      </div>

      {/* Tabel Daftar Laporan */}
      <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl overflow-hidden shadow-lg backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse table-fixed min-w-[900px]">
            <thead>
              <tr className="bg-slate-900/80 border-b border-slate-700/60 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="p-4 w-[25%]">Info Proyek & Laporan</th>
                <th className="p-4 w-[18%]">Pengawas & Tanggal</th>
                <th className="p-4 w-[25%]">Kegiatan Lapangan Utama</th>
                <th className="p-4 w-[17%]">Personil, Alat & Cuaca</th>
                <th className="p-4 text-center w-[15%]">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50 text-xs text-slate-300">
              {filteredLaporan.length > 0 ? (
                filteredLaporan.map((laporan) => {
                  const totalPersonil = hitungTotal(laporan.personil);
                  const totalAlat = hitungTotal(laporan.peralatan);

                  return (
                    <tr key={laporan.id} className="hover:bg-slate-700/30 transition-all">
                      {/* Kolom 1: Proyek & Nomor Laporan */}
                      <td className="p-4">
                        <div className="font-bold text-white text-[13px] leading-snug line-clamp-2">{laporan.namaProyek}</div>
                        <div className="text-[10px] text-amber-500/90 font-mono mt-1.5">{laporan.nomorLaporan}</div>
                        <div className="mt-1.5">
                          <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-md border ${
                            laporan.status === 'Verified' 
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                              : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          }`}>
                            {laporan.status}
                          </span>
                        </div>
                      </td>

                      {/* Kolom 2: Pengawas & Waktu */}
                      <td className="p-4 space-y-2">
                        <div className="flex items-center gap-1.5 text-slate-200 font-medium">
                          <UserCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="truncate">{laporan.namaPengawas}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                          <Calendar className="w-3.5 h-3.5 shrink-0" />
                          <span>{laporan.tanggalPengawasan}</span>
                        </div>
                        <div className="flex items-start gap-1.5 text-[11px] text-slate-400">
                          <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{laporan.lokasi}</span>
                        </div>
                      </td>

                      {/* Kolom 3: Kegiatan Lapangan */}
                      <td className="p-4">
                        <div className="flex items-start gap-1.5 bg-slate-900/40 p-2.5 rounded-xl border border-slate-700/40">
                          <ListTodo className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-slate-200 line-clamp-2 leading-relaxed">
                              {laporan.kegiatan[0] || 'Tidak ada data kegiatan'}
                            </p>
                            {laporan.kegiatan.length > 1 && (
                              <p className="text-[10px] text-sky-400 mt-1 font-medium">
                                + {laporan.kegiatan.length - 1} Kegiatan lainnya
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Kolom 4: Summary Cuaca, Personil, Alat */}
                      <td className="p-4 space-y-1.5">
                        <div className="flex items-center justify-between text-[11px] bg-slate-900/40 px-2 py-1 rounded-md border border-slate-700/30">
                          <span className="flex items-center gap-1.5 text-slate-400"><CloudSun className="w-3 h-3" /> Cuaca</span>
                          <span className="font-mono text-amber-400">{laporan.cuaca.cerah}J Cerah</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] bg-slate-900/40 px-2 py-1 rounded-md border border-slate-700/30">
                          <span className="flex items-center gap-1.5 text-slate-400"><Users className="w-3 h-3" /> Personil</span>
                          <span className="font-mono text-emerald-400">{totalPersonil} Org</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] bg-slate-900/40 px-2 py-1 rounded-md border border-slate-700/30">
                          <span className="flex items-center gap-1.5 text-slate-400"><Wrench className="w-3 h-3" /> Peralatan</span>
                          <span className="font-mono text-blue-400">{totalAlat} Unit</span>
                        </div>
                      </td>

                      {/* Kolom 5: Aksi */}
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center">
                          <button
                            onClick={() => navigate('/laporan/detail', { state: { laporan } })}
                            className="px-3.5 py-2 bg-slate-700/80 hover:bg-amber-500 hover:text-slate-950 text-slate-200 text-xs font-bold rounded-xl transition-all inline-flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer border border-slate-600 hover:border-amber-500"
                          >
                            <Eye className="w-3.5 h-3.5" /> Buka Data
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-400">
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