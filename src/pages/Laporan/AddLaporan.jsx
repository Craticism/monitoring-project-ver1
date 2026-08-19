import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, Building2, MapPin, Calendar, UserCheck, 
  Sun, CloudRain, CloudLightning, Users, Wrench, 
  ListTodo, Plus, Trash2, CheckCircle2, UploadCloud, 
  Image as ImageIcon, Paperclip, FileSpreadsheet, X
} from 'lucide-react';

// Daftar Default Personil (Sesuai Google Form)
const defaultPersonilList = [
  'Dinas PUPR', 'Konsultan', 'Kontraktor', 'Kepala Kerja/Mandor', 
  'Pekerja', 'Tukang', 'Supir', 'Operator', 'Surveyor'
];

// Daftar Default Peralatan (Sesuai Google Form)
const defaultPeralatanList = [
  'Excavator', 'Dump Truck', 'Water Past', 'Theodolith', 
  'Concrete Mixer', 'Jack Hammer', 'Mesin Alcon', 'Mesin Las', 'Alat bantu'
];

export default function AddLaporan() {
  const navigate = useNavigate();
  const location = useLocation();
  const [submitting, setSubmitting] = useState(false);

  // Jika ada data yang mau di-edit (dilempar dari LaporanData via state)
  const editData = location.state?.editData || null;

  // --- STATE FORM ---
  const [formData, setFormData] = useState({
    tanggalPengawasan: editData?.tanggalPengawasan || new Date().toISOString().split('T')[0],
    namaPengawas: editData?.namaPengawas || '',
    namaProyek: editData?.namaProyek || '',
    lokasi: editData?.lokasi || '',
    cuaca: {
      cerah: editData?.cuaca?.cerah || '',
      gerimis: editData?.cuaca?.gerimis || '',
      hujanDeras: editData?.cuaca?.hujanDeras || ''
    }
  });

  // State Dinamis Kegiatan
  const [kegiatanItems, setKegiatanItems] = useState(
    editData?.kegiatan?.length > 0 
      ? editData.kegiatan.map((k, i) => ({ id: i, uraian: k, staAwal: '', staAkhir: '', volume: '', satuan: 'M3' }))
      : [{ id: Date.now(), uraian: '', staAwal: '', staAkhir: '', volume: '', satuan: 'M3' }]
  );

  // State Dinamis Personil (Inisialisasi dari default list)
  const [personilItems, setPersonilItems] = useState(
    defaultPersonilList.map(peran => {
      const existing = editData?.personil?.find(p => p.peran === peran);
      return { peran, jumlah: existing ? existing.jumlah : '' };
    })
  );

  // State Dinamis Peralatan (Inisialisasi dari default list)
  const [peralatanItems, setPeralatanItems] = useState(
    defaultPeralatanList.map(namaAlat => {
      const existing = editData?.peralatan?.find(p => p.namaAlat === namaAlat);
      return { namaAlat, jumlah: existing ? existing.jumlah : '' };
    })
  );

  // Alat Tambahan (Alat Tambahan 1 & 2 dari GForm)
  const [alatTambahan, setAlatTambahan] = useState([]);

  // Handler Perubahan Text Input Standar
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handler Perubahan Cuaca
  const handleCuacaChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, cuaca: { ...prev.cuaca, [name]: value } }));
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulasi Proses API
    setTimeout(() => {
      setSubmitting(false);
      navigate('/laporan'); // Kembali ke list setelah sukses
    }, 1200);
  };

  return (
    <div className="w-full space-y-5 md:space-y-6">
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0 mb-2">
        {/* Kiri: Tombol Back & Judul */}
        <div className="flex items-start md:items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="p-2.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/80 text-slate-600 dark:text-slate-300 rounded-xl transition-all shadow-sm mt-0.5 md:mt-0"
            title="Batal & Kembali"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white leading-snug flex items-start md:items-center gap-2 flex-wrap">
              <ListTodo className="w-5 h-5 md:w-6 md:h-6 text-amber-500 shrink-0 mt-1 md:mt-0" /> 
              <span>{editData ? 'Edit Laporan Harian' : 'Input Laporan Harian Baru'}</span>
            </h1>
            <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 md:line-clamp-1 leading-relaxed">
              Entri data pengawasan cuaca, personil, peralatan, dan rincian pekerjaan
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* SECTION 1: Info Proyek & Pengawas */}
        <div className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 p-5 md:p-6 rounded-2xl space-y-4 shadow-sm">
          <h2 className="text-sm font-bold text-amber-600 dark:text-amber-500 flex items-center gap-2 border-b border-slate-200 dark:border-slate-700/60 pb-3 uppercase tracking-wider">
            <Building2 className="w-4 h-4" /> Informasi Pengawasan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Tanggal Pengawasan <span className="text-rose-500">*</span></label>
              <input type="date" name="tanggalPengawasan" required value={formData.tanggalPengawasan} onChange={handleInputChange} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5"><UserCheck className="w-3.5 h-3.5" /> Nama Pengawas <span className="text-rose-500">*</span></label>
              <input type="text" name="namaPengawas" required value={formData.namaPengawas} onChange={handleInputChange} placeholder="Masukkan nama Anda" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors" />
            </div>
            <div className="space-y-1.5 md:col-span-2 lg:col-span-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Nama Projek <span className="text-rose-500">*</span></label>
              <input type="text" name="namaProyek" required value={formData.namaProyek} onChange={handleInputChange} placeholder="Contoh: Pembangunan Jembatan Sei Tabalong" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors" />
            </div>
            <div className="space-y-1.5 md:col-span-2 lg:col-span-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Lokasi <span className="text-rose-500">*</span></label>
              <input type="text" name="lokasi" required value={formData.lokasi} onChange={handleInputChange} placeholder="Contoh: STA 02+400 s/d STA 02+650" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors" />
            </div>
          </div>
        </div>

        {/* SECTION 2: Cuaca (Jam) */}
        <div className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 p-5 md:p-6 rounded-2xl space-y-4 shadow-sm">
          <h2 className="text-sm font-bold text-amber-600 dark:text-amber-500 flex items-center gap-2 border-b border-slate-200 dark:border-slate-700/60 pb-3 uppercase tracking-wider">
            <Sun className="w-4 h-4" /> Laporan Cuaca (Dalam Jam)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5">
            <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700/50 flex flex-col items-center justify-center space-y-2">
              <Sun className="w-6 h-6 text-amber-500 dark:text-amber-400" />
              <label className="text-[11px] text-slate-600 dark:text-slate-300 font-semibold">Cuaca Cerah (Jam)</label>
              <input type="number" name="cerah" value={formData.cuaca.cerah} onChange={handleCuacaChange} placeholder="0" min="0" max="24" className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-2 py-2 text-xs text-center text-slate-800 dark:text-white font-bold focus:outline-none focus:border-amber-500" />
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700/50 flex flex-col items-center justify-center space-y-2">
              <CloudRain className="w-6 h-6 text-sky-500 dark:text-sky-400" />
              <label className="text-[11px] text-slate-600 dark:text-slate-300 font-semibold">Cuaca Gerimis (Jam)</label>
              <input type="number" name="gerimis" value={formData.cuaca.gerimis} onChange={handleCuacaChange} placeholder="0" min="0" max="24" className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-2 py-2 text-xs text-center text-slate-800 dark:text-white font-bold focus:outline-none focus:border-sky-500" />
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700/50 flex flex-col items-center justify-center space-y-2">
              <CloudLightning className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />
              <label className="text-[11px] text-slate-600 dark:text-slate-300 font-semibold">Hujan Deras (Jam)</label>
              <input type="number" name="hujanDeras" value={formData.cuaca.hujanDeras} onChange={handleCuacaChange} placeholder="0" min="0" max="24" className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-2 py-2 text-xs text-center text-slate-800 dark:text-white font-bold focus:outline-none focus:border-indigo-500" />
            </div>
          </div>
        </div>

        {/* SECTION 3: Kegiatan & Volume Lapangan */}
        <div className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 p-5 md:p-6 rounded-2xl space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700/60 pb-3">
            <h2 className="text-sm font-bold text-amber-600 dark:text-amber-500 flex items-center gap-2 uppercase tracking-wider">
              <ListTodo className="w-4 h-4" /> Kegiatan & Volume
            </h2>
            <button 
              type="button" 
              onClick={() => {
                if (kegiatanItems.length < 6) {
                  setKegiatanItems([...kegiatanItems, { id: Date.now(), uraian: '', staAwal: '', staAkhir: '', volume: '', satuan: 'M3' }]);
                } else {
                  alert("Maksimal 6 Kegiatan sesuai format form.");
                }
              }} 
              className="text-[10px] bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-white font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all"
            >
              <Plus className="w-3.5 h-3.5" /> Tambah
            </button>
          </div>
          
          <div className="space-y-4">
            {kegiatanItems.map((item, index) => (
              <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 bg-slate-50 dark:bg-slate-900/60 p-4 md:p-5 rounded-xl border border-slate-200 dark:border-slate-700/50 items-start">
                <div className="md:col-span-12 flex justify-between items-center mb-1">
                  <span className="text-[11px] font-bold text-amber-600 dark:text-amber-500 uppercase">Kegiatan {index + 1}</span>
                  {kegiatanItems.length > 1 && (
                    <button type="button" onClick={() => setKegiatanItems(kegiatanItems.filter(k => k.id !== item.id))} className="text-rose-500 dark:text-rose-400 hover:text-rose-600 dark:hover:text-rose-300 bg-rose-50 dark:bg-rose-500/10 p-1.5 rounded-md transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                
                <div className="md:col-span-12">
                  <label className="text-[10px] text-slate-600 dark:text-slate-400 font-semibold mb-1 block">Uraian Pekerjaan</label>
                  <textarea rows="2" placeholder="Contoh: Pengecoran struktur abutment jembatan..." defaultValue={item.uraian} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-amber-500 resize-none" />
                </div>
                
                {/* Parameter STA dan Volume */}
                <div className="md:col-span-4">
                  <label className="text-[10px] text-slate-600 dark:text-slate-400 font-semibold mb-1 block">STA Awal</label>
                  <input type="text" placeholder="STA 0+000" className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-xs font-mono text-slate-800 dark:text-white focus:outline-none focus:border-amber-500" />
                </div>
                <div className="md:col-span-4">
                  <label className="text-[10px] text-slate-600 dark:text-slate-400 font-semibold mb-1 block">STA Akhir</label>
                  <input type="text" placeholder="STA 0+150" className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-xs font-mono text-slate-800 dark:text-white focus:outline-none focus:border-amber-500" />
                </div>
                <div className="md:col-span-4 flex gap-2">
                  <div className="flex-1">
                    <label className="text-[10px] text-slate-600 dark:text-slate-400 font-semibold mb-1 block">Volume Realisasi</label>
                    <input type="number" placeholder="0" className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-xs text-emerald-600 dark:text-emerald-400 font-bold focus:outline-none focus:border-emerald-500" />
                  </div>
                  <div className="w-20">
                    <label className="text-[10px] text-slate-600 dark:text-slate-400 font-semibold mb-1 block">Satuan</label>
                    <input type="text" defaultValue={item.satuan} className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-2 py-2 text-xs text-slate-800 dark:text-white text-center focus:outline-none focus:border-amber-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4: Personil & Peralatan (Split 2 Kolom) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          
          {/* Personil Lapangan */}
          <div className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl overflow-hidden shadow-sm flex flex-col">
            <div className="px-5 py-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
              <h2 className="text-sm font-bold text-amber-600 dark:text-amber-500 uppercase tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4" /> Personil Di Lapangan
              </h2>
            </div>
            <div className="p-4 space-y-2.5 max-h-[400px] overflow-y-auto">
              {personilItems.map((p, idx) => (
                <div key={idx} className="flex items-center justify-between bg-slate-50 dark:bg-slate-900/40 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700/40">
                  <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">{p.peran}</span>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      placeholder="0" 
                      min="0"
                      value={p.jumlah}
                      onChange={(e) => {
                        const newPersonil = [...personilItems];
                        newPersonil[idx].jumlah = e.target.value;
                        setPersonilItems(newPersonil);
                      }}
                      className="w-16 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md px-2 py-1 text-xs text-center text-emerald-600 dark:text-emerald-400 font-bold focus:outline-none focus:border-emerald-500" 
                    />
                    <span className="text-[10px] text-slate-500 w-6 font-medium">Org</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pemakaian Peralatan */}
          <div className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl overflow-hidden shadow-sm flex flex-col">
            <div className="px-5 py-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
              <h2 className="text-sm font-bold text-amber-600 dark:text-amber-500 uppercase tracking-wider flex items-center gap-2">
                <Wrench className="w-4 h-4" /> Pemakaian Peralatan
              </h2>
              <button 
                type="button" 
                onClick={() => setAlatTambahan([...alatTambahan, { id: Date.now(), namaAlat: '', jumlah: '' }])}
                className="text-[10px] bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-white font-semibold px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-all"
              >
                <Plus className="w-3.5 h-3.5" /> Tambahan
              </button>
            </div>
            <div className="p-4 space-y-2.5 max-h-[400px] overflow-y-auto">
              {/* Default List */}
              {peralatanItems.map((alat, idx) => (
                <div key={idx} className="flex items-center justify-between bg-slate-50 dark:bg-slate-900/40 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700/40">
                  <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">{alat.namaAlat}</span>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      placeholder="0" 
                      min="0"
                      value={alat.jumlah}
                      onChange={(e) => {
                        const newAlat = [...peralatanItems];
                        newAlat[idx].jumlah = e.target.value;
                        setPeralatanItems(newAlat);
                      }}
                      className="w-16 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md px-2 py-1 text-xs text-center text-blue-600 dark:text-blue-400 font-bold focus:outline-none focus:border-blue-500" 
                    />
                    <span className="text-[10px] text-slate-500 w-6 font-medium">Unit</span>
                  </div>
                </div>
              ))}
              
              {/* Render Alat Tambahan */}
              {alatTambahan.length > 0 && <div className="pt-3 pb-1 border-t border-slate-200 dark:border-slate-700/50 mt-3"><span className="text-[10px] text-amber-600 dark:text-amber-500 font-bold tracking-wider">ALAT TAMBAHAN</span></div>}
              {alatTambahan.map((tambahan) => (
                <div key={tambahan.id} className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/80 p-2.5 rounded-lg border border-slate-300 dark:border-slate-600">
                  <input type="text" placeholder="Nama Alat" className="flex-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md px-3 py-1.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-amber-500" />
                  <input type="number" placeholder="Jml" className="w-14 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md px-2 py-1.5 text-xs text-center text-blue-600 dark:text-blue-400 font-bold focus:outline-none focus:border-blue-500" />
                  <button type="button" onClick={() => setAlatTambahan(alatTambahan.filter(a => a.id !== tambahan.id))} className="text-rose-500 dark:text-rose-400 p-1 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-md transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 5: Upload Foto & Lampiran */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          <div className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 p-5 md:p-6 rounded-2xl space-y-4 shadow-sm">
            <h2 className="text-sm font-bold text-amber-600 dark:text-amber-500 uppercase tracking-wider flex items-center gap-2">
              <ImageIcon className="w-4 h-4" /> Dokumentasi Lapangan (Foto)
            </h2>
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-amber-500/50 rounded-xl p-6 text-center bg-slate-50 dark:bg-slate-900/40 relative transition-colors cursor-pointer group">
              <input type="file" multiple accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <UploadCloud className="w-8 h-8 mx-auto text-slate-400 group-hover:text-amber-500 mb-2 transition-colors" />
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">Tarik & lepas atau klik untuk upload foto</p>
              <p className="text-[10px] text-slate-500 mt-1">Format: JPG, PNG (Max 5MB)</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 p-5 md:p-6 rounded-2xl space-y-4 shadow-sm">
            <h2 className="text-sm font-bold text-amber-600 dark:text-amber-500 uppercase tracking-wider flex items-center gap-2">
              <Paperclip className="w-4 h-4" /> File Lampiran (Opsional)
            </h2>
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-amber-500/50 rounded-xl p-6 text-center bg-slate-50 dark:bg-slate-900/40 relative transition-colors cursor-pointer group">
              <input type="file" accept=".pdf,.doc,.docx,.xls,.xlsx" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <FileSpreadsheet className="w-8 h-8 mx-auto text-slate-400 group-hover:text-amber-500 mb-2 transition-colors" />
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">Upload laporan PDF atau Excel (RAB)</p>
              <p className="text-[10px] text-slate-500 mt-1">Sertakan jika ada rincian tambahan</p>
            </div>
          </div>
        </div>

        {/* --- BOTTOM ACTION BUTTONS --- */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 pb-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
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
              <><CheckCircle2 className="w-4 h-4" /> Simpan Laporan</>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}