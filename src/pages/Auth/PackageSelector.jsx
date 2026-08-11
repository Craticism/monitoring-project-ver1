import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PackageSelector({ onSelectPackage }) {
  const navigate = useNavigate();

  const packages = [
    {
      id: 'starter',
      name: 'Starter',
      price: 'Rp 7 Juta',
      badge: 'Dasar',
      badgeColor: 'bg-gray-700 text-gray-200',
      features: [
        'Dashboard Ringkasan Proyek',
        'List Data Proyek',
        'Form Input Laporan Harian (Mobile UI)',
        '3 User Admin'
      ],
      disabledFeatures: ['Peta GIS Interaktif', 'Kurva S & Modal AHSP', 'Website Company Profile']
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 'Rp 10 Juta',
      badge: 'Rekomendasi',
      badgeColor: 'bg-blue-600 text-white',
      featured: true,
      features: [
        'Semua Fitur Starter',
        'Peta GIS Interaktif (Wilayah Tabalong)',
        'Grafik Kurva S (Recharts)',
        'Pop-up Detail Modal AHSP',
        '10 User Admin'
      ],
      disabledFeatures: ['Website Company Profile']
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Rp 15 Juta',
      badge: 'Lengkap + Profile',
      badgeColor: 'bg-emerald-600 text-white',
      features: [
        'Semua Fitur Pro',
        'Portal Company Profile Konsultan (Publik)',
        'Backup Harian & Server High-Speed',
        'Unlimited User Admin',
        'Garansi 3 Bulan + Maintenance'
      ],
      disabledFeatures: []
    }
  ];

  // Handler klik aman
  const handleSelect = (pkgId) => {
    // 1. Eksekusi callback jika di-pass lewat props
    if (typeof onSelectPackage === 'function') {
      onSelectPackage(pkgId);
    }
    
    // 2. Simpan pilihan ke localStorage & navigasi ke dashboard/projects
    localStorage.setItem('selected_package', pkgId);
    navigate('/projects'); // Ubah path tujuan sesuai kebutuhan aplikasi Anda (misal: '/' atau '/dashboard')
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-6">
      <div className="text-center max-w-2xl mb-10">
        <h1 className="text-3xl font-bold mb-3">Pilih Mode Paket Aplikasi</h1>
        <p className="text-slate-400 text-sm">
          Silakan pilih versi paket untuk mensimulasikan fitur aplikasi yang tersedia.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`relative rounded-2xl bg-slate-900 border p-6 flex flex-col justify-between transition-all duration-200 hover:scale-[1.02] ${
              pkg.featured ? 'border-blue-500 shadow-lg shadow-blue-500/10' : 'border-slate-800'
            }`}
          >
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${pkg.badgeColor}`}>
                  {pkg.badge}
                </span>
                <span className="text-xl font-bold text-white">{pkg.price}</span>
              </div>
              <h2 className="text-xl font-bold mb-4">{pkg.name}</h2>

              <ul className="space-y-2.5 text-xs mb-6">
                {pkg.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center text-slate-200">
                    <span className="text-emerald-400 mr-2">✓</span> {feat}
                  </li>
                ))}
                {pkg.disabledFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-center text-slate-600 line-through">
                    <span className="text-slate-600 mr-2">✕</span> {feat}
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              onClick={() => handleSelect(pkg.id)}
              className={`w-full py-2.5 rounded-xl font-semibold text-sm transition cursor-pointer relative z-10 ${
                pkg.featured
                  ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
              }`}
            >
              Buka Versi {pkg.name} &rarr;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};