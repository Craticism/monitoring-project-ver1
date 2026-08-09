import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Save, 
  Plus, 
  Trash2, 
  Calculator, 
  FileText,
  Building2
} from 'lucide-react';

export default function AHSPModal({ isOpen, onClose, initialData }) {
  if (!isOpen) return null;

  // Header State
  const [header, setHeader] = useState({
    proyek: 'Pembangunan Jembatan Sei Tabalong',
    noPaketKontrak: '02/PJJ/TABALONG/2026',
    namaPaket: 'Pekerjaan Tanah & Pondasi',
    propKab: 'Kab. Tabalong',
    itemPembayaranNo: '3.1.(1)',
    jenisPekerjaan: 'Galian Biasa',
    satuanPembayaran: 'M3',
    kodeAnalisa: 'Analisa EI-311',
    perkiraanVol: 450,
    overheadPercent: 10,
  });

  // Items State (Tenaga, Bahan, Peralatan)
  const [tenaga, setTenaga] = useState([
    { id: 1, komponen: 'Pekerja', kode: 'L01', satuan: 'Jam', kuantitas: 0.0702, hargaSatuan: 21873.91 },
    { id: 2, komponen: 'Mandor', kode: 'L03', satuan: 'Jam', kuantitas: 0.0351, hargaSatuan: 31042.86 },
  ]);

  const [bahan, setBahan] = useState([]);

  const [peralatan, setPeralatan] = useState([
    { id: 1, komponen: 'Excavator', kode: 'E10', satuan: 'Jam', kuantitas: 0.0351, hargaSatuan: 504970.70 },
    { id: 2, komponen: 'Dump Truck', kode: 'E09', satuan: 'Jam', kuantitas: 0.0661, hargaSatuan: 685619.24 },
    { id: 3, komponen: 'Alat Bantu', kode: '-', satuan: 'Ls', kuantitas: 1.0000, hargaSatuan: 0 },
  ]);

  // Calculations
  const sumGroup = (items) => items.reduce((acc, curr) => acc + (curr.kuantitas * curr.hargaSatuan), 0);

  const totalTenaga = sumGroup(tenaga);
  const totalBahan = sumGroup(bahan);
  const totalPeralatan = sumGroup(peralatan);

  const totalD = totalTenaga + totalBahan + totalPeralatan; // (A + B + C)
  const totalE = (header.overheadPercent / 100) * totalD; // Overhead & Profit
  const totalF = totalD + totalE; // Harga Satuan Pekerjaan

  const formatRupiah = (val) => {
    return new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val || 0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-slate-800/80 border-b border-slate-700/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 text-amber-500 rounded-xl border border-amber-500/20">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Analisa Harga Satuan Pekerjaan (AHSP)</h2>
              <p className="text-xs text-slate-400">Formulir Standar Perekaman Analisa Masing-Masing Harga Satuan</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs rounded-lg flex items-center gap-1.5 transition-all"
            >
              <Printer className="w-3.5 h-3.5" /> Cetak AHSP
            </button>
            <button 
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-300">
          
          {/* Section 1: Header AHSP Info */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-400">PROYEK:</span>
                <span className="font-semibold text-white">{header.proyek}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">NO. PAKET KONTRAK:</span>
                <span className="font-semibold text-white">{header.noPaketKontrak}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">NAMA PAKET:</span>
                <span className="font-semibold text-white">{header.namaPaket}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">PROP / KAB:</span>
                <span className="font-semibold text-white">{header.propKab}</span>
              </div>
            </div>

            <div className="space-y-1.5 border-t md:border-t-0 md:border-l border-slate-800 md:pl-4 pt-2 md:pt-0">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">KODE ANALISA:</span>
                <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 font-bold border border-amber-500/30 rounded">
                  {header.kodeAnalisa}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">ITEM PEMBAYARAN NO:</span>
                <span className="font-semibold text-white">{header.itemPembayaranNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">JENIS PEKERJAAN:</span>
                <span className="font-semibold text-white">{header.jenisPekerjaan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">SATUAN PEMBAYARAN:</span>
                <span className="font-semibold text-amber-500">{header.satuanPembayaran}</span>
              </div>
            </div>
          </div>

          {/* Section 2: Tabel Komponen AHSP */}
          <div className="border border-slate-700/80 rounded-xl overflow-hidden bg-slate-950/40">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800/90 text-slate-300 font-bold uppercase text-[10px] tracking-wider border-b border-slate-700">
                  <th className="p-3 w-10 text-center">NO.</th>
                  <th className="p-3">KOMPONEN</th>
                  <th className="p-3 w-20 text-center">SATUAN</th>
                  <th className="p-3 w-28 text-right">PERKIRAAN KUANTITAS</th>
                  <th className="p-3 w-36 text-right">HARGA SATUAN (Rp)</th>
                  <th className="p-3 w-36 text-right">JUMLAH HARGA (Rp)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                
                {/* A. TENAGA */}
                <tr className="bg-slate-800/40 font-bold text-amber-400">
                  <td className="p-2.5 text-center">A.</td>
                  <td colSpan={4} className="p-2.5 uppercase">TENAGA</td>
                  <td className="p-2.5 text-right">{formatRupiah(totalTenaga)}</td>
                </tr>
                {tenaga.map((item, index) => (
                  <tr key={item.id} className="hover:bg-slate-800/20">
                    <td className="p-2.5 text-center text-slate-500">{index + 1}.</td>
                    <td className="p-2.5 font-medium text-white">{item.komponen} <span className="text-[10px] text-slate-500 font-mono">({item.kode})</span></td>
                    <td className="p-2.5 text-center text-slate-400">{item.satuan}</td>
                    <td className="p-2.5 text-right font-mono">{item.kuantitas.toFixed(4)}</td>
                    <td className="p-2.5 text-right font-mono">{formatRupiah(item.hargaSatuan)}</td>
                    <td className="p-2.5 text-right font-mono font-semibold text-slate-200">{formatRupiah(item.kuantitas * item.hargaSatuan)}</td>
                  </tr>
                ))}
                <tr className="bg-slate-900/80 font-semibold border-t border-slate-800">
                  <td colSpan={5} className="p-2.5 text-right text-slate-400 uppercase text-[11px]">JUMLAH HARGA TENAGA</td>
                  <td className="p-2.5 text-right font-mono text-amber-400">{formatRupiah(totalTenaga)}</td>
                </tr>

                {/* B. BAHAN */}
                <tr className="bg-slate-800/40 font-bold text-amber-400">
                  <td className="p-2.5 text-center">B.</td>
                  <td colSpan={4} className="p-2.5 uppercase">BAHAN</td>
                  <td className="p-2.5 text-right">{formatRupiah(totalBahan)}</td>
                </tr>
                {bahan.length === 0 ? (
                  <tr>
                    <td className="p-2.5"></td>
                    <td colSpan={4} className="p-2.5 text-slate-500 italic">- Tidak menggunakan bahan baku langsung -</td>
                    <td className="p-2.5 text-right font-mono">0,00</td>
                  </tr>
                ) : (
                  bahan.map((item, index) => (
                    <tr key={item.id} className="hover:bg-slate-800/20">
                      <td className="p-2.5 text-center text-slate-500">{index + 1}.</td>
                      <td className="p-2.5 font-medium text-white">{item.komponen}</td>
                      <td className="p-2.5 text-center text-slate-400">{item.satuan}</td>
                      <td className="p-2.5 text-right font-mono">{item.kuantitas.toFixed(4)}</td>
                      <td className="p-2.5 text-right font-mono">{formatRupiah(item.hargaSatuan)}</td>
                      <td className="p-2.5 text-right font-mono font-semibold text-slate-200">{formatRupiah(item.kuantitas * item.hargaSatuan)}</td>
                    </tr>
                  ))
                )}
                <tr className="bg-slate-900/80 font-semibold border-t border-slate-800">
                  <td colSpan={5} className="p-2.5 text-right text-slate-400 uppercase text-[11px]">JUMLAH HARGA BAHAN</td>
                  <td className="p-2.5 text-right font-mono text-amber-400">{formatRupiah(totalBahan)}</td>
                </tr>

                {/* C. PERALATAN */}
                <tr className="bg-slate-800/40 font-bold text-amber-400">
                  <td className="p-2.5 text-center">C.</td>
                  <td colSpan={4} className="p-2.5 uppercase">PERALATAN</td>
                  <td className="p-2.5 text-right">{formatRupiah(totalPeralatan)}</td>
                </tr>
                {peralatan.map((item, index) => (
                  <tr key={item.id} className="hover:bg-slate-800/20">
                    <td className="p-2.5 text-center text-slate-500">{index + 1}.</td>
                    <td className="p-2.5 font-medium text-white">{item.komponen} <span className="text-[10px] text-slate-500 font-mono">({item.kode})</span></td>
                    <td className="p-2.5 text-center text-slate-400">{item.satuan}</td>
                    <td className="p-2.5 text-right font-mono">{item.kuantitas.toFixed(4)}</td>
                    <td className="p-2.5 text-right font-mono">{formatRupiah(item.hargaSatuan)}</td>
                    <td className="p-2.5 text-right font-mono font-semibold text-slate-200">{formatRupiah(item.kuantitas * item.hargaSatuan)}</td>
                  </tr>
                ))}
                <tr className="bg-slate-900/80 font-semibold border-t border-slate-800">
                  <td colSpan={5} className="p-2.5 text-right text-slate-400 uppercase text-[11px]">JUMLAH HARGA PERALATAN</td>
                  <td className="p-2.5 text-right font-mono text-amber-400">{formatRupiah(totalPeralatan)}</td>
                </tr>

                {/* D. TOTAL A + B + C */}
                <tr className="bg-slate-800/80 font-bold border-t-2 border-slate-700 text-white">
                  <td className="p-3 text-center">D.</td>
                  <td colSpan={4} className="p-3 uppercase">JUMLAH HARGA TENAGA, BAHAN DAN PERALATAN ( A + B + C )</td>
                  <td className="p-3 text-right font-mono text-amber-400">{formatRupiah(totalD)}</td>
                </tr>

                {/* E. OVERHEAD & PROFIT */}
                <tr className="bg-slate-900/60 font-medium text-slate-300">
                  <td className="p-3 text-center font-bold">E.</td>
                  <td colSpan={4} className="p-3 uppercase">
                    OVERHEAD & PROFIT <span className="ml-2 font-mono text-amber-500 font-bold">{header.overheadPercent}.0% x D</span>
                  </td>
                  <td className="p-3 text-right font-mono">{formatRupiah(totalE)}</td>
                </tr>

                {/* F. HARGA SATUAN PEKERJAAN */}
                <tr className="bg-amber-500/10 border-t-2 border-amber-500/30 font-extrabold text-amber-400 text-sm">
                  <td className="p-3.5 text-center">F.</td>
                  <td colSpan={4} className="p-3.5 uppercase">HARGA SATUAN PEKERJAAN ( D + E )</td>
                  <td className="p-3.5 text-right font-mono text-base text-amber-400">{formatRupiah(totalF)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section 3: Catatan / Note Standard */}
          <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
            <div className="font-semibold text-slate-300 mb-1">Catatan Penting:</div>
            <p>1. Satuan berdasarkan atas jam operasi untuk Tenaga Kerja dan Peralatan, volume dan/atau ukuran berat untuk bahan-bahan.</p>
            <p>2. Kuantitas satuan adalah kuantitas perkiraan setiap komponen untuk menyelesaikan satu satuan pekerjaan dari nomor mata pembayaran.</p>
            <p>3. Biaya satuan sudah termasuk pengeluaran untuk seluruh pajak yang berkaitan (tetapi tidak termasuk PPN yang dibayar dari kontrak).</p>
          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="px-6 py-3 bg-slate-800/80 border-t border-slate-700/60 flex justify-between items-center">
          <div className="text-[11px] text-slate-400">
            Total Per Satuan ({header.satuanPembayaran}): <strong className="text-amber-400 font-mono">Rp {formatRupiah(totalF)}</strong>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md shadow-amber-500/10 flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" /> Simpan Analisa
          </button>
        </div>

      </div>
    </div>
  );
}