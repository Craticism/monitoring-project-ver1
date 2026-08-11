import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  HardHat, 
  Building2, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Download, 
  Edit3, 
  Paperclip, 
  Image as ImageIcon,
  AlertTriangle,
  UserCheck,
  ExternalLink
} from 'lucide-react';

// Data Default sebagai fallback jika halaman diakses langsung lewat URL/refresh
const defaultLaporan = {
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
  // Mengambil gambar publik online (Google / Unsplash)
  fotoDokumentasi: [
    { 
      id: 1, 
      title: 'Persiapan Bekisting & Pembesian STA 02+400', 
      url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 2, 
      title: 'Pengecoran Beton Structure Lapangan', 
      url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 3, 
      title: 'Inspeksi K3 dan Alat Berat Lapangan', 
      url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80' 
    }
  ],
  // Mengambil contoh file dokumen publik online dari Google / W3C
  lampiranFiles: [
    { 
      name: 'Hasil_Uji_Slump_Beton_11Aug.pdf', 
      size: '1.2 MB',
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' 
    },
    { 
      name: 'Sertifikat_Kalibrasi_Batching_Plant.pdf', 
      size: '2.4 MB',
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' 
    }
  ]
};

export default function LaporanData({ laporan: propLaporan, onBack }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Mengambil data laporan dari props, location state, atau fallback ke defaultLaporan
  const dataLaporan = propLaporan || location.state?.laporan || defaultLaporan;

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/laporan');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header / Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="p-2 rounded-xl bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Kembali"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white tracking-wide">
                Detail Laporan Lapangan
              </h1>
              <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${
                dataLaporan?.status === 'Verified'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
              }`}>
                {dataLaporan?.status || 'Draft'}
              </span>
            </div>
            <p className="text-xs text-amber-500/90 font-mono mt-0.5">{dataLaporan?.nomorLaporan}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => alert('Fitur cetak PDF laporan siap diproses')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-600/50 transition-all cursor-pointer active:scale-95"
          >
            <Download className="w-4 h-4 text-slate-400" />
            <span>Cetak PDF</span>
          </button>
          <button 
            onClick={() => navigate('/laporan/input', { state: { editData: dataLaporan } })}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-semibold transition-all cursor-pointer shadow-md shadow-amber-500/10 active:scale-95"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Laporan</span>
          </button>
        </div>
      </div>

      {/* Grid Informasi Laporan & Proyek */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Informasi Proyek */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 space-y-3 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            <span>Informasi Proyek</span>
          </div>
          <div className="space-y-1.5">
            <h3 className="text-sm font-bold text-white leading-snug">{dataLaporan?.namaProyek}</h3>
            <p className="text-xs font-mono text-slate-400">{dataLaporan?.nomorKontrak}</p>
          </div>
          <div className="pt-2 border-t border-slate-700/50 text-xs space-y-1 text-slate-300">
            <p><span className="text-slate-400">Kontraktor:</span> {dataLaporan?.kontraktor}</p>
            <p><span className="text-slate-400">Konsultan:</span> {dataLaporan?.konsultan}</p>
          </div>
        </div>

        {/* Card 2: Waktu & Lokasi */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 space-y-3 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Calendar className="w-4 h-4" />
            <span>Pelaksanaan & Lokasi</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2 text-white font-medium">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>{dataLaporan?.tanggal}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span>{dataLaporan?.lokasi}</span>
            </div>
            <div className="pt-2 border-t border-slate-700/50 text-slate-400">
              <span>Cuaca Lapangan: </span>
              <span className="text-slate-200">{dataLaporan?.cuaca}</span>
            </div>
          </div>
        </div>

        {/* Card 3: Pelapor & Verifikasi */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 space-y-3 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <HardHat className="w-4 h-4" />
            <span>Personel Lapangan</span>
          </div>
          <div className="space-y-2 text-xs">
            <div>
              <p className="text-slate-400 text-[11px]">Dibuat Oleh:</p>
              <p className="font-semibold text-white">{dataLaporan?.pelapor}</p>
              <p className="text-slate-400 text-[11px]">{dataLaporan?.jabatanPelapor}</p>
            </div>
            {dataLaporan?.verifiedBy && (
              <div className="pt-2 border-t border-slate-700/50 flex items-start gap-2 text-emerald-400">
                <UserCheck className="w-4 h-4 mt-0.5 shrink-0" />
                <div className="text-[11px]">
                  <p className="font-medium text-slate-200">Diverifikasi: {dataLaporan.verifiedBy}</p>
                  <p className="text-slate-400">{dataLaporan.verifiedAt}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabel Rincian Progres Pekerjaan Lapangan */}
      <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl overflow-hidden backdrop-blur-sm">
        <div className="p-4 bg-slate-900/50 border-b border-slate-700/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-bold text-white tracking-wide">Rincian Volume Pekerjaan Lapangan</h2>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/80 border-b border-slate-700/60 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="p-4 w-16">Kode</th>
                <th className="p-4">Uraian Pekerjaan</th>
                <th className="p-4 text-center">Satuan</th>
                <th className="p-4 text-right">Target Plan Harian</th>
                <th className="p-4 text-right">Realisasi Harian</th>
                <th className="p-4 text-right">Akumulasi s/d Hari Ini</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50 text-xs text-slate-300">
              {(dataLaporan?.itemPekerjaan || []).map((item) => (
                <tr key={item.id} className="hover:bg-slate-700/30 transition-all">
                  <td className="p-4 font-mono text-amber-500/90 font-semibold">{item.kode}</td>
                  <td className="p-4 font-medium text-white">{item.item}</td>
                  <td className="p-4 text-center text-slate-400 font-mono">{item.sat}</td>
                  <td className="p-4 text-right font-mono text-slate-300">{item.plan}</td>
                  <td className="p-4 text-right font-mono text-emerald-400 font-bold">{item.realHarian}</td>
                  <td className="p-4 text-right font-mono text-slate-200 font-semibold">{item.akumulasi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Catatan & Kendala Lapangan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Catatan Lapangan */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 space-y-2 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-slate-300 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-white">Catatan & Ringkasan Kegiatan</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/40 p-3 rounded-xl border border-slate-700/40">
            {dataLaporan?.catatanLapangan || 'Tidak ada catatan tambahan.'}
          </p>
        </div>

        {/* Kendala Lapangan */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 space-y-2 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-slate-300 text-xs font-semibold">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span className="text-white">Kendala & Permasalahan Lapangan</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/40 p-3 rounded-xl border border-slate-700/40">
            {dataLaporan?.kendala || 'Tidak ada kendala berarti selama pekerjaan.'}
          </p>
        </div>
      </div>

      {/* Galeri Foto Dokumentasi & File Lampiran */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Dokumentasi Foto (2 Kolom) */}
        <div className="md:col-span-2 bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 space-y-4 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <ImageIcon className="w-4 h-4" />
              <span>Dokumentasi Foto Kegiatan</span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              {(dataLaporan?.fotoDokumentasi || []).length} Foto Tersedia
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(dataLaporan?.fotoDokumentasi || []).map((foto) => (
              <div key={foto.id} className="group bg-slate-900/60 border border-slate-700/50 rounded-xl overflow-hidden hover:border-amber-500/40 transition-all">
                <div className="h-36 overflow-hidden relative">
                  <img 
                    src={foto.url} 
                    alt={foto.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                    loading="lazy"
                  />
                  <a 
                    href={foto.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-900/80 text-slate-300 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Buka Gambar Asli"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div className="p-2.5">
                  <p className="text-xs font-medium text-slate-200 line-clamp-2">{foto.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* File Lampiran (1 Kolom) */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 space-y-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Paperclip className="w-4 h-4" />
            <span>Lampiran Dokumen</span>
          </div>

          <div className="space-y-2">
            {(dataLaporan?.lampiranFiles || []).map((file, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-900/50 border border-slate-700/50 rounded-xl hover:bg-slate-700/30 transition-all">
                <div className="truncate pr-2">
                  <p className="text-xs font-medium text-slate-200 truncate">{file.name}</p>
                  <p className="text-[10px] text-slate-400">{file.size}</p>
                </div>
                <a 
                  href={file.url || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-all cursor-pointer"
                  title="Unduh / Lihat Dokumen"
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}