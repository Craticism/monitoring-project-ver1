import { useState } from 'react';
import { 
  FileSpreadsheet, 
  UploadCloud, 
  Plus, 
  Trash2, 
  Calendar, 
  MapPin, 
  Image as ImageIcon, 
  CheckCircle2, 
  FileText,
  Clock,
  HardHat,
  Download
} from 'lucide-react';

export default function InputLaporan() {
  const [inputMode, setInputMode] = useState('manual'); // 'manual' | 'template'
  const [selectedProject, setSelectedProject] = useState('1');
  const [tanggal, setTanggal] = useState(new Date().toISOString().split('T')[0]);
  const [waktu, setWaktu] = useState('08:00 - 17:00 WITA');
  const [lokasiDetail, setLokasiDetail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Dynamic Progress Items State (Volume & Item Pekerjaan)
  const [progressItems, setProgressItems] = useState([
    { id: Date.now(), item: 'Item B - Pekerjaan Tanah & Pondasi', volume: '', satuan: 'm3', catatan: '' }
  ]);

  // Upload Files State
  const [fotoLapangan, setFotoLapangan] = useState([]);
  const [fileDokumen, setFileDokumen] = useState(null);

  // Add Row Progress Item
  const handleAddItem = () => {
    setProgressItems([
      ...progressItems,
      { id: Date.now(), item: 'Item C - Pekerjaan Struktur Beton', volume: '', satuan: 'm3', catatan: '' }
    ]);
  };

  // Remove Row Progress Item
  const handleRemoveItem = (id) => {
    if (progressItems.length > 1) {
      setProgressItems(progressItems.filter(item => item.id !== id));
    }
  };

  // Handle Photo Select
  const handleFotoChange = (e) => {
    const files = Array.from(e.target.files);
    setFotoLapangan([...fotoLapangan, ...files]);
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulasi POST data ke Backend Laravel
    setTimeout(() => {
      setSubmitting(false);
      setSubmittedSuccess(true);
      setTimeout(() => setSubmittedSuccess(false), 4000);
    }, 1000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide">Input Laporan Lapangan</h1>
          <p className="text-xs text-slate-400">Entri data harian volume progress, foto lapangan, dan berkas pendukung</p>
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
            <FileText className="w-4 h-4" /> Manual Harian
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
            <FileSpreadsheet className="w-4 h-4" /> Upload Template
          </button>
        </div>
      </div>

      {/* Alert Banner Notifikasi Sukses */}
      {submittedSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-3 text-emerald-400 text-xs animate-fade-in">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>Laporan harian berhasil disimpan ke sistem dan siap diakumulasi ke Kurva S.</span>
        </div>
      )}

      {/* TAB 1: FORM INPUT MANUAL */}
      {inputMode === 'manual' ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Informasi Umum Proyek */}
          <div className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-2xl space-y-4">
            <h2 className="text-sm font-bold text-amber-500 uppercase tracking-wider flex items-center gap-2">
              <HardHat className="w-4 h-4" /> Header Laporan
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Pilih Proyek</label>
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="1">Pembangunan Jembatan Sei Tabalong</option>
                  <option value="2">Rehabilitasi Jalan Raya Utama Stasiun</option>
                  <option value="3">Pembangunan Gedung Kantor Dinas</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Tanggal Laporan</label>
                <div className="relative">
                  <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="date"
                    value={tanggal}
                    onChange={(e) => setTanggal(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Waktu Pengerjaan Lapangan</label>
                <div className="relative">
                  <Clock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={waktu}
                    onChange={(e) => setWaktu(e.target.value)}
                    placeholder="Contoh: 08:00 - 17:00 WITA"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Detail Lokasi Titik Lapangan</label>
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={lokasiDetail}
                  onChange={(e) => setLokasiDetail(e.target.value)}
                  placeholder="Contoh: STA 02+400 s/d STA 02+650 Sisi Timur"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Input Item Progress & Volume */}
          <div className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-amber-500 uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4" /> Rincian Volume Progress
              </h2>
              <button
                type="button"
                onClick={handleAddItem}
                className="flex items-center gap-1 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-medium rounded-lg transition-all"
              >
                <Plus className="w-3.5 h-3.5" /> Tambah Item
              </button>
            </div>

            <div className="space-y-3">
              {progressItems.map((row, index) => (
                <div key={row.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-700/50 items-center">
                  <div className="md:col-span-5 space-y-1">
                    <label className="text-[10px] text-slate-400">Item Pekerjaan #{index + 1}</label>
                    <select
                      value={row.item}
                      onChange={(e) => {
                        const updated = [...progressItems];
                        updated[index].item = e.target.value;
                        setProgressItems(updated);
                      }}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    >
                      <option value="Item A - Pekerjaan Persiapan & Mobilisasi">Item A - Pekerjaan Persiapan & Mobilisasi</option>
                      <option value="Item B - Pekerjaan Tanah & Pondasi">Item B - Pekerjaan Tanah & Pondasi</option>
                      <option value="Item C - Pekerjaan Struktur Beton">Item C - Pekerjaan Struktur Beton</option>
                      <option value="Item D - Pekerjaan Finishing & Electrical">Item D - Pekerjaan Finishing & Electrical</option>
                    </select>
                  </div>

                  <div className="md:col-span-3 space-y-1">
                    <label className="text-[10px] text-slate-400">Volume Realisasi Harian</label>
                    <div className="flex gap-1">
                      <input
                        type="number"
                        placeholder="0"
                        value={row.volume}
                        onChange={(e) => {
                          const updated = [...progressItems];
                          updated[index].volume = e.target.value;
                          setProgressItems(updated);
                        }}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                      <span className="bg-slate-700 border border-slate-600 px-2.5 py-1.5 rounded-lg text-xs text-slate-300 flex items-center">
                        {row.satuan}
                      </span>
                    </div>
                  </div>

                  <div className="md:col-span-3 space-y-1">
                    <label className="text-[10px] text-slate-400">Catatan Lapangan</label>
                    <input
                      type="text"
                      placeholder="Keterangan..."
                      value={row.catatan}
                      onChange={(e) => {
                        const updated = [...progressItems];
                        updated[index].catatan = e.target.value;
                        setProgressItems(updated);
                      }}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div className="md:col-span-1 flex justify-end pt-4 md:pt-0">
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(row.id)}
                      disabled={progressItems.length === 1}
                      className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg disabled:opacity-30 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Upload Dokumentasi Lapangan & Berkas PDF/Spreadsheet */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Foto Lapangan */}
            <div className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-2xl space-y-4">
              <h2 className="text-sm font-bold text-amber-500 uppercase tracking-wider flex items-center gap-2">
                <ImageIcon className="w-4 h-4" /> Upload Foto Lapangan
              </h2>

              <div className="border-2 border-dashed border-slate-700 hover:border-amber-500/50 rounded-xl p-6 text-center transition-all bg-slate-900/40 relative">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFotoChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <UploadCloud className="w-8 h-8 mx-auto text-slate-500 mb-2" />
                <p className="text-xs text-slate-300 font-medium">Klik atau geser foto progres ke sini</p>
                <p className="text-[10px] text-slate-500 mt-1">PNG, JPG, WEBP hingga 5MB per file</p>
              </div>

              {fotoLapangan.length > 0 && (
                <div className="space-y-1">
                  <div className="text-[11px] text-slate-400 font-medium">{fotoLapangan.length} Foto Terpilih:</div>
                  <div className="flex flex-wrap gap-2">
                    {fotoLapangan.map((file, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-slate-700 text-slate-200 rounded-lg text-[10px] truncate max-w-[150px]">
                        {file.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Berkas PDF / Spreadsheet Pendukung */}
            <div className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-2xl space-y-4">
              <h2 className="text-sm font-bold text-amber-500 uppercase tracking-wider flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4" /> Berkas Lampiran (PDF / Excel)
              </h2>

              <div className="border-2 border-dashed border-slate-700 hover:border-amber-500/50 rounded-xl p-6 text-center transition-all bg-slate-900/40 relative">
                <input
                  type="file"
                  accept=".pdf,.xlsx,.xls"
                  onChange={(e) => setFileDokumen(e.target.files[0])}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <FileText className="w-8 h-8 mx-auto text-slate-500 mb-2" />
                <p className="text-xs text-slate-300 font-medium">Unggah Berkas Laporan Tambahan</p>
                <p className="text-[10px] text-slate-500 mt-1">Format .PDF, .XLSX, atau .XLS</p>
              </div>

              {fileDokumen && (
                <div className="p-2.5 bg-slate-900/80 border border-slate-700 rounded-xl flex items-center justify-between text-xs">
                  <span className="text-slate-300 truncate">{fileDokumen.name}</span>
                  <button type="button" onClick={() => setFileDokumen(null)} className="text-rose-400 hover:text-rose-300">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
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
                  <CheckCircle2 className="w-4 h-4" /> Simpan & Kirim Laporan Lapangan
                </>
              )}
            </button>
          </div>
        </form>
      ) : (
        /* TAB 2: UPLOAD TEMPLATE SPREADSHEET */
        <div className="bg-slate-800/60 border border-slate-700/60 p-8 rounded-2xl space-y-6 text-center max-w-2xl mx-auto">
          <div className="p-4 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-2xl inline-block">
            <FileSpreadsheet className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white">Import Laporan via Template Excel</h2>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              Gunakan format spreadsheet standar untuk mengunggah volume progress banyak proyek sekaligus.
            </p>
          </div>

          <div className="flex justify-center gap-3">
            <button 
              type="button" 
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold rounded-xl transition-all flex items-center gap-2 border border-slate-600"
            >
              <Download className="w-4 h-4 text-amber-500" /> Unduh Template (.XLSX)
            </button>
          </div>

          <div className="border-2 border-dashed border-slate-700 hover:border-amber-500/50 rounded-2xl p-10 transition-all bg-slate-900/50 relative cursor-pointer">
            <input type="file" accept=".xlsx, .xls" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            <UploadCloud className="w-10 h-10 mx-auto text-slate-500 mb-3" />
            <p className="text-xs text-slate-200 font-semibold">Tarik dan lepas file template Excel di sini</p>
            <p className="text-[10px] text-slate-500 mt-1">Format file didukung: .xlsx, .xls</p>
          </div>
        </div>
      )}
    </div>
  );
}