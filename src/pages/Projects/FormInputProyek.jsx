import { useState } from 'react';
import { 
  Building2, 
  UploadCloud, 
  Trash2, 
  Calendar, 
  MapPin, 
  Image as ImageIcon, 
  CheckCircle2, 
  FileText,
  Clock,
  HardHat,
  Download,
  DollarSign,
  UserCheck,
  Compass,
  FileSpreadsheet,
  Plus
} from 'lucide-react';

export default function FormInputProyek() {
  const [inputMode, setInputMode] = useState('manual'); // 'manual' | 'template'
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Form State Utama Proyek
  const [formData, setFormData] = useState({
    namaProyek: '',
    kodeKontrak: '',
    kategori: 'Infrastruktur Jalan & Jembatan',
    nilaiKontrak: '',
    tahunAnggaran: new Date().getFullYear().toString(),
    tanggalMulai: new Date().toISOString().split('T')[0],
    tanggalSelesai: '',
    lokasiWilayah: '',
    latitude: '',
    longitude: '',
    kontraktor: '',
    konsultan: '',
    dinasInstansi: 'Dinas Pekerjaan Umum & Penataan Ruang',
    deskripsi: ''
  });

  // State Media & Dokumen Pendukung
  const [fotoSampul, setFotoSampul] = useState(null);
  const [dokumenLampiran, setDokumenLampiran] = useState([]);

  // Handle Input Form General
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle Upload Foto Sampul Proyek
  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFotoSampul(file);
    }
  };

  // Handle Upload Multiple Dokumen Kontrak/RAB/Gambar
  const handleDokumenChange = (e) => {
    const files = Array.from(e.target.files);
    setDokumenLampiran([...dokumenLampiran, ...files]);
  };

  // Handle Hapus Dokumen Lampiran
  const handleRemoveDokumen = (index) => {
    setDokumenLampiran(dokumenLampiran.filter((_, i) => i !== index));
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulasi POST Data Proyek Baru ke Backend Laravel
    setTimeout(() => {
      setSubmitting(false);
      setSubmittedSuccess(true);
      
      // Reset Alert setelah 4 detik
      setTimeout(() => setSubmittedSuccess(false), 4000);
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide flex items-center gap-2">
            <Building2 className="w-7 h-7 text-amber-500" /> Input Master Proyek Baru
          </h1>
          <p className="text-xs text-slate-400">Pendaftaran identitas proyek, anggaran, koordinat GIS, dan pemangku kepentingan</p>
        </div>

        {/* Switch Mode Input (Manual / Upload Template) */}
        <div className="grid grid-cols-2 p-1 bg-slate-800 border border-slate-700/60 rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => setInputMode('manual')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2 ${
              inputMode === 'manual'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" /> Form Manual
          </button>
          <button
            type="button"
            onClick={() => setInputMode('template')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2 ${
              inputMode === 'template'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" /> Import Excel
          </button>
        </div>
      </div>

      {/* Alert Banner Notifikasi Sukses */}
      {submittedSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-3 text-emerald-400 text-xs animate-fade-in">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>Data Proyek Baru berhasil dibuat dan terdaftar di database sistem GIS.</span>
        </div>
      )}

      {/* TAB 1: FORM INPUT MANUAL PROYEK */}
      {inputMode === 'manual' ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Informasi Utama & Kontrak Proyek */}
          <div className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-2xl space-y-4">
            <h2 className="text-sm font-bold text-amber-500 uppercase tracking-wider flex items-center gap-2">
              <HardHat className="w-4 h-4" /> Identitas & Nilai Kontrak
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Nama Proyek */}
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Nama Paket Proyek Pekerjaan</label>
                <input
                  type="text"
                  name="namaProyek"
                  required
                  value={formData.namaProyek}
                  onChange={handleChange}
                  placeholder="Contoh: Pembangunan Jembatan Sei Tabalong STA 04"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Nomor / Kode Kontrak */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Nomor / Kode Kontrak</label>
                <input
                  type="text"
                  name="kodeKontrak"
                  required
                  value={formData.kodeKontrak}
                  onChange={handleChange}
                  placeholder="Contoh: 600/012/PUPR-TAB/2026"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Kategori Proyek */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Kategori Pekerjaan</label>
                <select
                  name="kategori"
                  value={formData.kategori}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="Infrastruktur Jalan & Jembatan">Infrastruktur Jalan & Jembatan</option>
                  <option value="Gedung & Bangunan Sipil">Gedung & Bangunan Sipil</option>
                  <option value="Sumber Daya Air & Irigasi">Sumber Daya Air & Irigasi</option>
                  <option value="Tata Lingkungan & Sanitasi">Tata Lingkungan & Sanitasi</option>
                </select>
              </div>

              {/* Nilai Kontrak (Rp) */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Nilai Kontrak (Rp)</label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="number"
                    name="nilaiKontrak"
                    required
                    value={formData.nilaiKontrak}
                    onChange={handleChange}
                    placeholder="Contoh: 2500000000"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Tahun Anggaran */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Tahun Anggaran</label>
                <input
                  type="number"
                  name="tahunAnggaran"
                  value={formData.tahunAnggaran}
                  onChange={handleChange}
                  placeholder="2026"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Jadwal Pelaksanaan & Geolokasi GIS */}
          <div className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-2xl space-y-4">
            <h2 className="text-sm font-bold text-amber-500 uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Waktu Pelaksanaan & Titik GIS
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Tanggal Mulai SPMK */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Tanggal Mulai Kontrak (SPMK)</label>
                <div className="relative">
                  <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="date"
                    name="tanggalMulai"
                    value={formData.tanggalMulai}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Tanggal Target Selesai (PHO) */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Target Selesai (PHO)</label>
                <div className="relative">
                  <Clock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="date"
                    name="tanggalSelesai"
                    required
                    value={formData.tanggalSelesai}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Lokasi / Wilayah / Kecamatan */}
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Keterangan Wilayah / Kecamatan / Desa</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    name="lokasiWilayah"
                    value={formData.lokasiWilayah}
                    onChange={handleChange}
                    placeholder="Contoh: Kec. Murung Pudak, Kabupaten Tabalong"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Latitude */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Koor. Latitude (Gis Center)</label>
                <div className="relative">
                  <Compass className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleChange}
                    placeholder="Contoh: -2.18341"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Longitude */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Koor. Longitude (Gis Center)</label>
                <div className="relative">
                  <Compass className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleChange}
                    placeholder="Contoh: 115.38510"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Stakeholders & Pelaksana */}
          <div className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-2xl space-y-4">
            <h2 className="text-sm font-bold text-amber-500 uppercase tracking-wider flex items-center gap-2">
              <UserCheck className="w-4 h-4" /> Pihak Pelaksana & Penanggung Jawab
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Kontraktor Pelaksana */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Kontraktor Pelaksana</label>
                <input
                  type="text"
                  name="kontraktor"
                  value={formData.kontraktor}
                  onChange={handleChange}
                  placeholder="PT / CV Penyedia Jasa"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Konsultan Pengawas */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Konsultan Pengawas / MK</label>
                <input
                  type="text"
                  name="konsultan"
                  value={formData.konsultan}
                  onChange={handleChange}
                  placeholder="PT / CV Konsultan MK"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Dinas / Owner */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Pemilik Proyek (Dinas / Instansi)</label>
                <input
                  type="text"
                  name="dinasInstansi"
                  value={formData.dinasInstansi}
                  onChange={handleChange}
                  placeholder="Dinas PUPR"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Ringkasan Deskripsi Proyek */}
            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-medium text-slate-300">Deskripsi / Ringkasan Lingkup Pekerjaan</label>
              <textarea
                name="deskripsi"
                rows={3}
                value={formData.deskripsi}
                onChange={handleChange}
                placeholder="Tuliskan spesifikasi umum atau batasan pekerjaan proyek..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Section 4: Upload Foto Sampul & Dokumen Kontrak/RAB */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Upload Foto Sampul Proyek */}
            <div className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-2xl space-y-4">
              <h2 className="text-sm font-bold text-amber-500 uppercase tracking-wider flex items-center gap-2">
                <ImageIcon className="w-4 h-4" /> Foto Banner / Header Proyek
              </h2>

              <div className="border-2 border-dashed border-slate-700 hover:border-amber-500/50 rounded-xl p-6 text-center transition-all bg-slate-900/40 relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFotoChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <UploadCloud className="w-8 h-8 mx-auto text-slate-500 mb-2" />
                <p className="text-xs text-slate-300 font-medium">Unggah Foto Utama Proyek</p>
                <p className="text-[10px] text-slate-500 mt-1">PNG, JPG, WEBP hingga 5MB</p>
              </div>

              {fotoSampul && (
                <div className="p-2.5 bg-slate-900/80 border border-slate-700 rounded-xl flex items-center justify-between text-xs">
                  <span className="text-slate-300 truncate">{fotoSampul.name}</span>
                  <button type="button" onClick={() => setFotoSampul(null)} className="text-rose-400 hover:text-rose-300">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Berkas Dokumen Kontrak / RAB / Gambar Kerja */}
            <div className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-2xl space-y-4">
              <h2 className="text-sm font-bold text-amber-500 uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4" /> Berkas Kontrak & RAB (.PDF)
              </h2>

              <div className="border-2 border-dashed border-slate-700 hover:border-amber-500/50 rounded-xl p-6 text-center transition-all bg-slate-900/40 relative">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.xlsx,.xls,.dwg"
                  onChange={handleDokumenChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <FileSpreadsheet className="w-8 h-8 mx-auto text-slate-500 mb-2" />
                <p className="text-xs text-slate-300 font-medium">Unggah Berkas Lampiran Kontrak / RAB</p>
                <p className="text-[10px] text-slate-500 mt-1">Format PDF, XLSX, atau CAD DWG</p>
              </div>

              {dokumenLampiran.length > 0 && (
                <div className="space-y-1.5 max-h-28 overflow-y-auto pr-1">
                  {dokumenLampiran.map((file, idx) => (
                    <div key={idx} className="p-2 bg-slate-900/80 border border-slate-700/80 rounded-lg flex items-center justify-between text-xs">
                      <span className="text-slate-300 truncate max-w-[200px]">{file.name}</span>
                      <button type="button" onClick={() => handleRemoveDokumen(idx)} className="text-rose-400 hover:text-rose-300">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Action Submit Button */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-8 py-3 rounded-xl transition-all shadow-lg shadow-amber-500/10 flex items-center gap-2 text-xs active:scale-95 disabled:opacity-50"
            >
              {submitting ? (
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Plus className="w-4 h-4" /> Simpan & Daftarkan Proyek Baru
                </>
              )}
            </button>
          </div>
        </form>
      ) : (
        /* TAB 2: IMPORT BATCH PROYEK VIA EXCEL */
        <div className="bg-slate-800/60 border border-slate-700/60 p-8 rounded-2xl space-y-6 text-center max-w-2xl mx-auto">
          <div className="p-4 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-2xl inline-block">
            <FileSpreadsheet className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white">Import Master Data Proyek via Excel</h2>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              Gunakan berkas spreadsheet sesuai format untuk mendaftarkan banyak paket pekerjaan sekaligus ke dalam database.
            </p>
          </div>

          <div className="flex justify-center gap-3">
            <button 
              type="button" 
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold rounded-xl transition-all flex items-center gap-2 border border-slate-600"
            >
              <Download className="w-4 h-4 text-amber-500" /> Unduh Template Import Proyek (.XLSX)
            </button>
          </div>

          <div className="border-2 border-dashed border-slate-700 hover:border-amber-500/50 rounded-2xl p-10 transition-all bg-slate-900/50 relative cursor-pointer">
            <input type="file" accept=".xlsx, .xls" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            <UploadCloud className="w-10 h-10 mx-auto text-slate-500 mb-3" />
            <p className="text-xs text-slate-200 font-semibold">Tarik dan lepas berkas Excel master proyek di sini</p>
            <p className="text-[10px] text-slate-500 mt-1">Format file didukung: .xlsx, .xls</p>
          </div>
        </div>
      )}
    </div>
  );
}