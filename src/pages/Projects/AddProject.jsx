import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Plus,
  FileSignature,
  X,
  ArrowLeft
} from 'lucide-react';

export default function AddProject() {
  const navigate = useNavigate();
  const [inputMode, setInputMode] = useState('manual'); // 'manual' | 'template'
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Form State Utama Proyek
  const [formData, setFormData] = useState({
    namaProyek: '',
    kategori: 'Infrastruktur Jalan & Jembatan',
    kodeKontrak: '',
    nomorSPMK: '',
    sumberDana: '',
    tahunAnggaran: new Date().getFullYear().toString(),
    nilaiKontrak: '',
    tanggalMulai: new Date().toISOString().split('T')[0],
    tanggalSelesai: '',
    waktuPelaksanaan: '',
    masaPemeliharaan: '180 Hari Kalender',
    lokasiWilayah: '',
    latitude: '',
    longitude: '',
    ppk: 'Dinas PUPR',
    kontraktor: '',
    konsultan: '',
    deskripsi: ''
  });

  const [fotoSampul, setFotoSampul] = useState(null);
  const [dokumenLampiran, setDokumenLampiran] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) setFotoSampul(file);
  };

  const handleDokumenChange = (e) => {
    const files = Array.from(e.target.files);
    setDokumenLampiran([...dokumenLampiran, ...files]);
  };

  const handleRemoveDokumen = (index) => {
    setDokumenLampiran(dokumenLampiran.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulasi POST Data
    setTimeout(() => {
      setSubmitting(false);
      setSubmittedSuccess(true);
      setTimeout(() => setSubmittedSuccess(false), 4000);
      
      // Redirect ke halaman /projects setelah sukses
      setTimeout(() => navigate('/projects'), 1500); 
    }, 1200);
  };

  return (
    <div className="w-full space-y-5 md:space-y-6">
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Kiri: Tombol Back & Judul */}
        <div className="flex items-start lg:items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => navigate('/projects')}
            className="p-2.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/80 text-slate-600 dark:text-slate-300 rounded-xl transition-all shadow-sm mt-0.5 lg:mt-0"
            title="Batal & Kembali"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white tracking-wide flex items-center gap-2">
              <Building2 className="w-6 h-6 md:w-7 md:h-7 text-amber-500 shrink-0" /> 
              <span>Input Master Proyek Baru</span>
            </h1>
            <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Pendaftaran identitas proyek, data kontrak, jadwal, dan pemangku kepentingan
            </p>
          </div>
        </div>

        {/* Switch Mode Input */}
        <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-xl text-xs font-semibold shrink-0">
          <button
            type="button"
            onClick={() => setInputMode('manual')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2 ${
              inputMode === 'manual' 
                ? 'bg-amber-500 text-white dark:text-slate-950 shadow-md' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" /> Form Manual
          </button>
          <button
            type="button"
            onClick={() => setInputMode('template')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2 ${
              inputMode === 'template' 
                ? 'bg-amber-500 text-white dark:text-slate-950 shadow-md' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" /> Import Excel
          </button>
        </div>
      </div>

      {/* Alert Sukses */}
      {submittedSuccess && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-2xl flex items-center gap-3 text-emerald-600 dark:text-emerald-400 text-xs animate-fade-in shadow-sm">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>Data Proyek Baru berhasil dibuat dan terdaftar di database sistem. Mengalihkan...</span>
        </div>
      )}

      {/* TAB 1: FORM MANUAL */}
      {inputMode === 'manual' ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Section 1: Identitas & Keuangan */}
          <div className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 p-5 md:p-6 rounded-2xl space-y-4 shadow-sm">
            <h2 className="text-sm font-bold text-amber-600 dark:text-amber-500 uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 dark:border-slate-700/60 pb-3">
              <FileSignature className="w-4 h-4" /> Data Kontrak & Keuangan
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Nama Paket Pekerjaan <span className="text-rose-500">*</span></label>
                <input type="text" name="namaProyek" required value={formData.namaProyek} onChange={handleChange} placeholder="Contoh: Pembangunan Jembatan Sei Tabalong STA 04" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Bidang / Kategori</label>
                <select name="kategori" value={formData.kategori} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors">
                  <option value="Infrastruktur Jalan & Jembatan">Infrastruktur Jalan & Jembatan</option>
                  <option value="Gedung & Bangunan Sipil">Gedung & Bangunan Sipil</option>
                  <option value="Sumber Daya Air & Irigasi">Sumber Daya Air & Irigasi</option>
                  <option value="Tata Lingkungan & Sanitasi">Tata Lingkungan & Sanitasi</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Nomor Kontrak <span className="text-rose-500">*</span></label>
                <input type="text" name="kodeKontrak" required value={formData.kodeKontrak} onChange={handleChange} placeholder="600/012/PUPR/2026" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors font-mono" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Nomor SPMK <span className="text-rose-500">*</span></label>
                <input type="text" name="nomorSPMK" required value={formData.nomorSPMK} onChange={handleChange} placeholder="600/012.a/SPMK/2026" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors font-mono" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Nilai Kontrak (Pagu) <span className="text-rose-500">*</span></label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="number" name="nilaiKontrak" required value={formData.nilaiKontrak} onChange={handleChange} placeholder="2500000000" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors font-mono" />
                </div>
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Sumber Dana</label>
                <input type="text" name="sumberDana" required value={formData.sumberDana} onChange={handleChange} placeholder="Contoh: APBD Kabupaten Tabalong - DAK" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Tahun Anggaran</label>
                <input type="number" name="tahunAnggaran" required value={formData.tahunAnggaran} onChange={handleChange} placeholder="2026" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors" />
              </div>
            </div>
          </div>

          {/* Section 2: Jadwal & Lokasi */}
          <div className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 p-5 md:p-6 rounded-2xl space-y-4 shadow-sm">
            <h2 className="text-sm font-bold text-amber-600 dark:text-amber-500 uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 dark:border-slate-700/60 pb-3">
              <Clock className="w-4 h-4" /> Jadwal Pelaksanaan & Lokasi
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
              <div className="md:col-span-1 lg:col-span-2 space-y-1.5">
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Tanggal Mulai (SPMK)</label>
                <div className="relative">
                  <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="date" name="tanggalMulai" required value={formData.tanggalMulai} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors" />
                </div>
              </div>
              <div className="md:col-span-1 lg:col-span-2 space-y-1.5">
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Tanggal Selesai (PHO)</label>
                <div className="relative">
                  <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="date" name="tanggalSelesai" required value={formData.tanggalSelesai} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors" />
                </div>
              </div>

              <div className="md:col-span-1 lg:col-span-2 space-y-1.5">
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Waktu Pelaksanaan</label>
                <input type="text" name="waktuPelaksanaan" required value={formData.waktuPelaksanaan} onChange={handleChange} placeholder="Contoh: 180 Hari Kalender" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors" />
              </div>
              <div className="md:col-span-1 lg:col-span-2 space-y-1.5">
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Masa Pemeliharaan</label>
                <input type="text" name="masaPemeliharaan" required value={formData.masaPemeliharaan} onChange={handleChange} placeholder="Contoh: 180 Hari Kalender" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors" />
              </div>

              <div className="md:col-span-2 lg:col-span-2 space-y-1.5">
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Keterangan Wilayah Lokasi</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" name="lokasiWilayah" required value={formData.lokasiWilayah} onChange={handleChange} placeholder="Contoh: Kec. Murung Pudak" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Latitude (GIS Center)</label>
                <div className="relative">
                  <Compass className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" name="latitude" required value={formData.latitude} onChange={handleChange} placeholder="-2.18341" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors font-mono" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Longitude (GIS Center)</label>
                <div className="relative">
                  <Compass className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" name="longitude" required value={formData.longitude} onChange={handleChange} placeholder="115.38510" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors font-mono" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Stakeholders */}
          <div className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 p-5 md:p-6 rounded-2xl space-y-4 shadow-sm">
            <h2 className="text-sm font-bold text-amber-600 dark:text-amber-500 uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 dark:border-slate-700/60 pb-3">
              <UserCheck className="w-4 h-4" /> Pihak Pelaksana (Stakeholders)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300">PPK / Owner</label>
                <input type="text" name="ppk" required value={formData.ppk} onChange={handleChange} placeholder="Dinas PUPR" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1">Kontraktor Pelaksana</label>
                <input type="text" name="kontraktor" required value={formData.kontraktor} onChange={handleChange} placeholder="PT / CV Penyedia Jasa" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1">Konsultan Pengawas / MK</label>
                <input type="text" name="konsultan" required value={formData.konsultan} onChange={handleChange} placeholder="PT / CV Konsultan" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors" />
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Deskripsi & Lingkup Pekerjaan</label>
              <textarea name="deskripsi" rows={3} required value={formData.deskripsi} onChange={handleChange} placeholder="Tuliskan spesifikasi umum atau batasan pekerjaan..." className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors resize-none" />
            </div>
          </div>

          {/* Section 4: Uploads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            <div className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 p-5 md:p-6 rounded-2xl space-y-4 shadow-sm">
              <h2 className="text-sm font-bold text-amber-600 dark:text-amber-500 uppercase tracking-wider flex items-center gap-2">
                <ImageIcon className="w-4 h-4" /> Foto Banner Proyek
              </h2>
              <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-amber-500/50 rounded-xl p-6 text-center transition-all bg-slate-50 dark:bg-slate-900/40 relative">
                <input type="file" accept="image/*" onChange={handleFotoChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <UploadCloud className="w-8 h-8 mx-auto text-slate-400 dark:text-slate-500 mb-2" />
                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">Unggah Foto Utama Proyek</p>
              </div>
              {fotoSampul && (
                <div className="p-2.5 bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between text-xs">
                  <span className="text-slate-700 dark:text-slate-300 truncate">{fotoSampul.name}</span>
                  <button type="button" onClick={() => setFotoSampul(null)} className="text-rose-500 dark:text-rose-400 hover:text-rose-600 dark:hover:text-rose-300"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              )}
            </div>

            <div className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 p-5 md:p-6 rounded-2xl space-y-4 shadow-sm">
              <h2 className="text-sm font-bold text-amber-600 dark:text-amber-500 uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4" /> Berkas Lampiran Kontrak
              </h2>
              <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-amber-500/50 rounded-xl p-6 text-center transition-all bg-slate-50 dark:bg-slate-900/40 relative">
                <input type="file" multiple accept=".pdf,.xlsx,.xls,.dwg" onChange={handleDokumenChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <FileSpreadsheet className="w-8 h-8 mx-auto text-slate-400 dark:text-slate-500 mb-2" />
                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">Unggah Berkas Lampiran Kontrak / RAB</p>
              </div>
              {dokumenLampiran.length > 0 && (
                <div className="space-y-1.5 max-h-28 overflow-y-auto pr-1">
                  {dokumenLampiran.map((file, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 rounded-lg flex items-center justify-between text-xs">
                      <span className="text-slate-700 dark:text-slate-300 truncate max-w-[200px]">{file.name}</span>
                      <button type="button" onClick={() => handleRemoveDokumen(idx)} className="text-rose-500 dark:text-rose-400 hover:text-rose-600 dark:hover:text-rose-300"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Action Submit & Cancel Button */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 pb-8">
            <button
              type="button"
              onClick={() => navigate('/projects')}
              className="bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-xs active:scale-95 border border-slate-200 dark:border-slate-600 shadow-sm"
            >
              <X className="w-4 h-4" /> Batal
            </button>
            <button 
              type="submit" 
              disabled={submitting} 
              className="bg-amber-500 hover:bg-amber-600 text-white dark:text-slate-950 font-bold px-8 py-3 rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 text-xs disabled:opacity-50"
            >
              {submitting ? (
                <div className="w-4 h-4 border-2 border-white dark:border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Plus className="w-4 h-4" /> Simpan & Daftarkan Proyek Baru
                </>
              )}
            </button>
          </div>
        </form>
      ) : (
        /* TAB 2: IMPORT EXCEL */
        <div className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 p-8 rounded-2xl space-y-6 text-center shadow-sm">
          <div className="p-4 bg-amber-50 dark:bg-amber-500/10 text-amber-500 border border-amber-200 dark:border-amber-500/20 rounded-2xl inline-block">
            <FileSpreadsheet className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">Import Master Data Proyek via Excel</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
              Gunakan berkas spreadsheet sesuai format untuk mendaftarkan banyak paket pekerjaan sekaligus.
            </p>
          </div>
          <div className="flex justify-center gap-3">
            <button type="button" className="px-4 py-2.5 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl flex items-center gap-2 border border-slate-200 dark:border-slate-600 shadow-sm transition-colors">
              <Download className="w-4 h-4 text-amber-500" /> Unduh Template Import (.XLSX)
            </button>
          </div>
          <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-amber-500/50 rounded-2xl p-10 bg-slate-50 dark:bg-slate-900/50 relative cursor-pointer transition-all max-w-2xl mx-auto">
            <input type="file" accept=".xlsx, .xls" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            <UploadCloud className="w-10 h-10 mx-auto text-slate-400 dark:text-slate-500 mb-3" />
            <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold">Tarik dan lepas berkas Excel master proyek di sini</p>
          </div>
        </div>
      )}
    </div>
  );
}