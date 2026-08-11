import { useNavigate, useLocation, useParams, Link } from 'react-router-dom';
import { 
  Building2, 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  DollarSign, 
  HardHat, 
  UserCheck, 
  Compass, 
  FileText,
  TrendingUp,
  FileSpreadsheet,
  Info,
  Clock,
  Download,
  Users,
  CheckCircle2
} from 'lucide-react';

// Master Data Dummy Proyek Lengkap (Fallback jika diakses tanpa State)
const dummyProjectsMaster = {
  1: {
    id: 1,
    namaProyek: 'Pembangunan Jembatan Sei Tabalong STA 04',
    kodeKontrak: '600/012/PUPR-TAB/2026',
    kategori: 'Infrastruktur Jalan & Jembatan',
    nilaiKontrak: 2500000000,
    tahunAnggaran: '2026',
    tanggalMulai: '15 Januari 2026',
    tanggalSelesai: '20 Desember 2026',
    lokasiWilayah: 'Kec. Murung Pudak, Kabupaten Tabalong',
    latitude: '-2.18341',
    longitude: '115.38510',
    kontraktor: 'PT. Borneo Konstruksi Utama',
    konsultan: 'PT. Daya Cipta Konsultan',
    dinasInstansi: 'Dinas Pekerjaan Umum & Penataan Ruang',
    deskripsi: 'Pembangunan struktur jembatan bentang 30 meter menggunakan rangka baja komposit di wilayah Kabupaten Tabalong untuk mempermudah akses konektivitas antar kecamatann.',
    progress: 35.5,
    status: 'On Progress',
    timLapangan: [
      { peran: 'Site Engineer', nama: 'Ir. Ahmad Rivai' },
      { peran: 'Quality Control', nama: 'Budi Santoso, S.T.' },
      { peran: 'HSE Officer', nama: 'Hendra Wijaya' }
    ],
    dokumen: [
      { nama: 'Kontrak_Induk_Signed.pdf', ukur: '4.2 MB' },
      { nama: 'Spesifikasi_Teknis_Jembatan.pdf', ukur: '8.1 MB' }
    ],
    riwayatProgress: [
      { minggu: 'Minggu 4 (Feb)', progress: '12.0%', status: 'Tepat Waktu' },
      { minggu: 'Minggu 8 (Mar)', progress: '24.5%', status: 'Tepat Waktu' },
      { minggu: 'Minggu 12 (Apr)', progress: '35.5%', status: 'Sesuai Target' }
    ]
  },
  2: {
    id: 2,
    namaProyek: 'Rehabilitasi Jalan Raya Utama Stasiun',
    kodeKontrak: '600/045/PUPR-TAB/2026',
    kategori: 'Preservasi Jalan',
    nilaiKontrak: 1800000000,
    tahunAnggaran: '2026',
    tanggalMulai: '01 Februari 2026',
    tanggalSelesai: '15 November 2026',
    lokasiWilayah: 'Kec. Tanta, Kabupaten Tabalong',
    latitude: '-2.19000',
    longitude: '115.42000',
    kontraktor: 'CV. Bina Karya Mandiri',
    konsultan: 'PT. Architama Engineering',
    dinasInstansi: 'Dinas Pekerjaan Umum & Penataan Ruang',
    deskripsi: 'Peningkatan kapasitas jalan dan overlay aspal AC-WC sepanjang 4.5 KM menuju akses Stasiun Utama.',
    progress: 28.0,
    status: 'Delayed',
    timLapangan: [
      { peran: 'Site Engineer', nama: 'Dedi Kurniawan, S.T.' },
      { peran: 'Quality Control', nama: 'Rian Hidayat' }
    ],
    dokumen: [
      { nama: 'Kontrak_Rehabilitasi_Jalan.pdf', ukur: '3.5 MB' }
    ],
    riwayatProgress: [
      { minggu: 'Minggu 4 (Feb)', progress: '10.0%', status: 'Tepat Waktu' },
      { minggu: 'Minggu 8 (Mar)', progress: '28.0%', status: 'Terlambat 5%' }
    ]
  }
};

export default function ProjectData() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  // Ambil data dari state navigasi, atau dari dummy master berdasarkan ID, atau fallback ke ID 1
  const selectedId = id || (location.state && location.state.id) || 1;
  const project = location.state || dummyProjectsMaster[selectedId] || dummyProjectsMaster[1];

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka || 0);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Bar Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/projects"
            className="p-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700/80 text-slate-300 hover:text-white rounded-xl transition-all"
            title="Kembali ke Daftar Proyek"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
              <Building2 className="w-6 h-6 text-amber-500" /> Detail Informasi Proyek
            </h1>
            <p className="text-xs text-slate-400">Rincian master data, kontrak, dan pemangku kepentingan.</p>
          </div>
        </div>

        {/* Dynamic Navigation Sub-Modul Detail */}
        <div className="flex items-center gap-1.5 bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700/60 overflow-x-auto">
          <button
            type="button"
            className="px-3.5 py-2 bg-amber-500 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md shadow-amber-500/10 transition-all cursor-default"
          >
            <Info className="w-4 h-4" /> Data Utama
          </button>
          <button
            type="button"
            onClick={() => navigate(`/projects/${selectedId}/rab`, { state: project })}
            className="px-3.5 py-2 bg-transparent hover:bg-slate-700/60 text-slate-300 hover:text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all"
          >
            <FileSpreadsheet className="w-4 h-4 text-amber-400" /> RAB
          </button>
          <button
            type="button"
            onClick={() => navigate(`/projects/${selectedId}/kurva-s`, { state: project })}
            className="px-3.5 py-2 bg-transparent hover:bg-slate-700/60 text-slate-300 hover:text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all"
          >
            <TrendingUp className="w-4 h-4 text-amber-400" /> Kurva S
          </button>
          <button
            type="button"
            onClick={() => navigate(`/projects/${selectedId}/peta-gis`, { state: project })}
            className="px-3.5 py-2 bg-transparent hover:bg-slate-700/60 text-slate-300 hover:text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all"
          >
            <Compass className="w-4 h-4 text-amber-400" /> Peta GIS
          </button>
        </div>
      </div>

      {/* Main Content Details */}
      <div className="space-y-6">
        {/* Section 1: Identitas & Nilai Kontrak */}
        <div className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
            <h2 className="text-sm font-bold text-amber-500 uppercase tracking-wider flex items-center gap-2">
              <HardHat className="w-4 h-4" /> Identitas & Nilai Kontrak
            </h2>
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 text-xs font-semibold rounded-lg border ${
                project.status === 'Delayed' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                project.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                'bg-amber-500/10 text-amber-400 border-amber-500/20'
              }`}>
                {project.status || 'On Progress'}
              </span>
              <span className="px-2.5 py-1 bg-slate-700/60 border border-slate-600/60 text-slate-300 text-xs font-semibold rounded-lg">
                {project.kategori}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="md:col-span-2 space-y-1 bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
              <span className="text-slate-400 text-[11px] font-medium">Nama Paket Proyek Pekerjaan</span>
              <p className="font-bold text-white text-base leading-snug">{project.namaProyek}</p>
            </div>
            <div className="space-y-1 bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
              <span className="text-slate-400 text-[11px] font-medium">Nomor / Kode Kontrak</span>
              <p className="font-semibold text-amber-400 font-mono text-sm tracking-wide">{project.kodeKontrak}</p>
            </div>
            <div className="space-y-1 bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
              <span className="text-slate-400 text-[11px] font-medium">Nilai Kontrak (Pagu)</span>
              <p className="font-bold text-emerald-400 text-sm flex items-center gap-1">
                <DollarSign className="w-4 h-4" /> {formatRupiah(project.nilaiKontrak)}
              </p>
            </div>
            <div className="space-y-1 bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
              <span className="text-slate-400 text-[11px] font-medium">Tahun Anggaran</span>
              <p className="font-semibold text-white">{project.tahunAnggaran}</p>
            </div>
            <div className="space-y-1 bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
              <span className="text-slate-400 text-[11px] font-medium">Progress Fisik Saat Ini</span>
              <div className="flex items-center gap-3 pt-1">
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      project.status === 'Delayed' ? 'bg-rose-500' : 'bg-amber-500'
                    }`} 
                    style={{ width: `${project.progress || 0}%` }}
                  />
                </div>
                <span className="font-bold text-white text-xs whitespace-nowrap">{project.progress || 0}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Waktu Pelaksanaan & Titik GIS */}
        <div className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-2xl space-y-4">
          <h2 className="text-sm font-bold text-amber-500 uppercase tracking-wider flex items-center gap-2 border-b border-slate-700/60 pb-3">
            <MapPin className="w-4 h-4" /> Waktu Pelaksanaan & Titik GIS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1 bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
              <span className="text-slate-400 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-amber-500" /> Tanggal Mulai Kontrak (SPMK)</span>
              <p className="font-semibold text-white">{project.tanggalMulai}</p>
            </div>
            <div className="space-y-1 bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
              <span className="text-slate-400 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-amber-500" /> Target Selesai (PHO)</span>
              <p className="font-semibold text-white">{project.tanggalSelesai}</p>
            </div>
            <div className="md:col-span-2 space-y-1 bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
              <span className="text-slate-400 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-amber-500" /> Keterangan Wilayah Lokasi</span>
              <p className="font-semibold text-white">{project.lokasiWilayah}</p>
            </div>
            <div className="space-y-1 bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
              <span className="text-slate-400 flex items-center gap-1.5"><Compass className="w-3.5 h-3.5 text-amber-500" /> Latitude (Koordinat Y)</span>
              <p className="font-mono font-semibold text-slate-200">{project.latitude}</p>
            </div>
            <div className="space-y-1 bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
              <span className="text-slate-400 flex items-center gap-1.5"><Compass className="w-3.5 h-3.5 text-amber-500" /> Longitude (Koordinat X)</span>
              <p className="font-mono font-semibold text-slate-200">{project.longitude}</p>
            </div>
          </div>
        </div>

        {/* Section 3: Stakeholders & Dummy Tim Lapangan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-2xl space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-amber-500 uppercase tracking-wider flex items-center gap-2 border-b border-slate-700/60 pb-3">
                <UserCheck className="w-4 h-4" /> Pihak Pelaksana & Penanggung Jawab
              </h2>
              <div className="space-y-3 text-xs">
                <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-700/50 space-y-1">
                  <span className="text-slate-400 text-[11px]">Kontraktor Pelaksana</span>
                  <p className="font-semibold text-white">{project.kontraktor}</p>
                </div>
                <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-700/50 space-y-1">
                  <span className="text-slate-400 text-[11px]">Konsultan Pengawas / MK</span>
                  <p className="font-semibold text-white">{project.konsultan}</p>
                </div>
                <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-700/50 space-y-1">
                  <span className="text-slate-400 text-[11px]">Pemilik Proyek (Dinas / Instansi)</span>
                  <p className="font-semibold text-white">{project.dinasInstansi}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Dummy Tim Personel Lapangan */}
          <div className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-2xl space-y-4">
            <h2 className="text-sm font-bold text-amber-500 uppercase tracking-wider flex items-center gap-2 border-b border-slate-700/60 pb-3">
              <Users className="w-4 h-4" /> Tim Personel Kunci Lapangan
            </h2>
            <div className="space-y-2 text-xs">
              {(project.timLapangan || [
                { peran: 'Site Engineer', nama: 'Ir. Ahmad Rivai' },
                { peran: 'Quality Control', nama: 'Budi Santoso, S.T.' }
              ]).map((person, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-900/60 border border-slate-700/50 rounded-xl">
                  <div>
                    <p className="font-bold text-white">{person.nama}</p>
                    <p className="text-[11px] text-slate-400">{person.peran}</p>
                  </div>
                  <span className="p-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg text-[10px]">
                    Verified
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 4: Ringkasan Progress & Dokumen Digital Dummy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Riwayat Progress Checkpoint */}
          <div className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-2xl space-y-4">
            <h2 className="text-sm font-bold text-amber-500 uppercase tracking-wider flex items-center gap-2 border-b border-slate-700/60 pb-3">
              <Clock className="w-4 h-4" /> Checkpoint Evaluasi Mingguan
            </h2>
            <div className="space-y-2 text-xs">
              {(project.riwayatProgress || [
                { minggu: 'Minggu 4 (Feb)', progress: '12.0%', status: 'Tepat Waktu' },
                { minggu: 'Minggu 8 (Mar)', progress: '24.5%', status: 'Tepat Waktu' }
              ]).map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-900/60 border border-slate-700/50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <div>
                      <p className="font-semibold text-white">{item.minggu}</p>
                      <p className="text-[10px] text-slate-400">Progress: {item.progress}</p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 bg-slate-800 border border-slate-700 text-slate-300 rounded-md">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Lampiran Dokumen Kontrak */}
          <div className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-2xl space-y-4">
            <h2 className="text-sm font-bold text-amber-500 uppercase tracking-wider flex items-center gap-2 border-b border-slate-700/60 pb-3">
              <FileText className="w-4 h-4" /> Dokumen Kontrak Digital
            </h2>
            <div className="space-y-2 text-xs">
              {(project.dokumen || [
                { nama: 'Kontrak_Induk_Signed.pdf', ukur: '4.2 MB' }
              ]).map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-900/60 border border-slate-700/50 rounded-xl hover:border-slate-600 transition-all">
                  <div className="truncate max-w-[200px]">
                    <p className="font-medium text-white truncate">{doc.nama}</p>
                    <p className="text-[10px] text-slate-400">{doc.ukur}</p>
                  </div>
                  <button className="p-2 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg border border-slate-700 transition-all">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 5: Deskripsi Lingkup Pekerjaan */}
        <div className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-2xl space-y-3">
          <h2 className="text-sm font-bold text-amber-500 uppercase tracking-wider flex items-center gap-2 border-b border-slate-700/60 pb-3">
            <FileText className="w-4 h-4" /> Deskripsi & Lingkup Pekerjaan
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
            {project.deskripsi}
          </p>
        </div>
      </div>
    </div>
  );
}