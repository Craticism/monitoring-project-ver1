import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Shield, 
  Mail, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  Key,
  ShieldCheck,
  HardHat,
  Building,
  UserCheck
} from 'lucide-react';

// --- DATA DUMMY AKUN ---
// Role Konsultan Konstruksi: Administrator, Direktur, Team Leader, Pengawas Lapangan, Owner/PPK
const dummyAccounts = [
  {
    id: 1,
    nama: 'Pahrin Hunter',
    email: 'pahrinhunter22@gmail.com',
    role: 'Administrator',
    status: 'Aktif',
    lastLogin: 'Hari ini, 08:30 WITA'
  },
  {
    id: 2,
    nama: 'Ir. Budi Santoso, M.T.',
    email: 'budi.dir@konsultan.com',
    role: 'Direktur',
    status: 'Aktif',
    lastLogin: 'Kemarin, 14:15 WITA'
  },
  {
    id: 3,
    nama: 'Ahmad Setiawan, S.T.',
    email: 'ahmad.tl@konsultan.com',
    role: 'Team Leader',
    status: 'Aktif',
    lastLogin: 'Hari ini, 09:10 WITA'
  },
  {
    id: 4,
    nama: 'Dedi Kurniawan',
    email: 'dedi.pengawas@konsultan.com',
    role: 'Pengawas Lapangan',
    status: 'Aktif',
    lastLogin: 'Hari ini, 07:45 WITA'
  },
  {
    id: 5,
    nama: 'Rina Marlina, S.T.',
    email: 'rina.pengawas@konsultan.com',
    role: 'Pengawas Lapangan',
    status: 'Tidak Aktif',
    lastLogin: '10 Ags 2026, 16:00 WITA'
  },
  {
    id: 6,
    nama: 'Dinas PUPR Tabalong',
    email: 'ppk.bina.marga@pupr.go.id',
    role: 'Owner / PPK',
    status: 'Aktif',
    lastLogin: '15 Ags 2026, 10:20 WITA'
  }
];

export default function AccountList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('Semua');

  // Filter Data
  const filteredAccounts = dummyAccounts.filter(acc => {
    const matchSearch = acc.nama.toLowerCase().includes(searchTerm.toLowerCase()) || acc.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = filterRole === 'Semua' || acc.role === filterRole;
    return matchSearch && matchRole;
  });

  // Helper untuk menentukan Ikon dan Warna Badge berdasarkan Role
  const getRoleBadge = (role) => {
    switch (role) {
      case 'Administrator':
        return { icon: <Shield className="w-3 h-3" />, color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' };
      case 'Direktur':
        return { icon: <Building className="w-3 h-3" />, color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' };
      case 'Team Leader':
        return { icon: <ShieldCheck className="w-3 h-3" />, color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' };
      case 'Pengawas Lapangan':
        return { icon: <HardHat className="w-3 h-3" />, color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' };
      case 'Owner / PPK':
        return { icon: <UserCheck className="w-3 h-3" />, color: 'bg-sky-500/10 text-sky-400 border-sky-500/20' };
      default:
        return { icon: <Users className="w-3 h-3" />, color: 'bg-slate-500/10 text-slate-400 border-slate-500/20' };
    }
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Header & Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-wide flex items-center gap-2">
            <Users className="w-6 h-6 text-amber-500" /> Manajemen Akun & Hak Akses
          </h1>
          <p className="text-xs text-slate-400 mt-1">Kelola pengguna sistem, otoritas role, dan status keaktifan akun.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama / email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-800/80 border border-slate-700/60 text-xs text-white pl-9 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 w-48 sm:w-64 transition-all"
            />
          </div>

          {/* Filter Role */}
          <select 
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300 px-3 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
          >
            <option value="Semua">Semua Role</option>
            <option value="Administrator">Administrator</option>
            <option value="Direktur">Direktur</option>
            <option value="Team Leader">Team Leader</option>
            <option value="Pengawas Lapangan">Pengawas Lapangan</option>
            <option value="Owner / PPK">Owner / PPK</option>
          </select>

          {/* Tombol Tambah Akun */}
          <button className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md shadow-amber-500/10 active:scale-95 whitespace-nowrap">
            <Plus className="w-4 h-4" /> Akun Baru
          </button>
        </div>
      </div>

      {/* Tabel Daftar Akun */}
      <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl overflow-hidden shadow-lg backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse table-auto min-w-[800px]">
            <thead>
              <tr className="bg-slate-900/80 border-b border-slate-700/60 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="p-4 w-[35%]">Identitas Pengguna</th>
                <th className="p-4 w-[25%]">Role & Otoritas</th>
                <th className="p-4 text-center w-[15%]">Status</th>
                <th className="p-4 w-[20%]">Terakhir Aktif</th>
                <th className="p-4 text-center w-[5%]"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50 text-xs text-slate-300">
              {filteredAccounts.length > 0 ? (
                filteredAccounts.map((acc) => {
                  const roleStyle = getRoleBadge(acc.role);
                  return (
                    <tr key={acc.id} className="hover:bg-slate-700/30 transition-all group">
                      
                      {/* Kolom 1: Info User */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {/* Avatar Placeholder */}
                          <div className="w-9 h-9 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center font-bold text-slate-300 shrink-0">
                            {acc.nama.charAt(0)}
                          </div>
                          <div className="truncate">
                            <p className="font-bold text-white text-[13px] truncate">{acc.nama}</p>
                            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-0.5">
                              <Mail className="w-3 h-3" /> <span className="truncate">{acc.email}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Kolom 2: Role */}
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border ${roleStyle.color} text-[11px] font-medium`}>
                          {roleStyle.icon} {acc.role}
                        </span>
                      </td>

                      {/* Kolom 3: Status */}
                      <td className="p-4 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          acc.status === 'Aktif' 
                            ? 'text-emerald-400' 
                            : 'text-rose-400 bg-rose-500/10 border border-rose-500/20'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${acc.status === 'Aktif' ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                          {acc.status}
                        </span>
                      </td>

                      {/* Kolom 4: Last Login */}
                      <td className="p-4 text-[11px] text-slate-400">
                        {acc.lastLogin}
                      </td>

                      {/* Kolom 5: Action Menu */}
                      <td className="p-4 text-center relative">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-slate-700 rounded transition-all" title="Edit Akun">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-slate-700 rounded transition-all" title="Reset Password">
                            <Key className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-700 rounded transition-all" title="Hapus/Nonaktifkan">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        {/* Jika di mobile/layar kecil, tombol dropdown yang muncul */}
                        <button className="p-1 text-slate-500 lg:hidden block ml-auto">
                           <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-400">
                    <Users className="w-10 h-10 mx-auto text-slate-600 mb-3" />
                    <p className="text-sm font-medium text-slate-300">Akun tidak ditemukan</p>
                    <p className="text-xs mt-1">Coba sesuaikan kata kunci pencarian atau filter role.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Legend Role */}
      <div className="bg-slate-800/40 border border-slate-700/40 rounded-xl p-4 text-xs text-slate-400 flex flex-col sm:flex-row sm:items-center gap-4">
        <span className="font-semibold text-slate-300">Keterangan Akses:</span>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-indigo-400" /> Admin (Akses Penuh)</span>
          <span className="flex items-center gap-1.5"><Building className="w-3.5 h-3.5 text-purple-400" /> Direktur (View Portofolio & Keuangan)</span>
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Team Leader (Validasi Laporan)</span>
          <span className="flex items-center gap-1.5"><HardHat className="w-3.5 h-3.5 text-emerald-400" /> Pengawas (Input Data Lapangan)</span>
          <span className="flex items-center gap-1.5"><UserCheck className="w-3.5 h-3.5 text-sky-400" /> PPK (View Progress Saja)</span>
        </div>
      </div>

    </div>
  );
}