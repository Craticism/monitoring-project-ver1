import React from 'react';

export default function CompanyProfile() {
  const services = [
    {
      title: 'Pengawasan Konstruksi',
      desc: 'Supervisi ketat di lapangan untuk menjamin kualitas material, ketepatan waktu, dan kesesuaian spesifikasi teknis.',
      icon: '📐'
    },
    {
      title: 'Perencanaan & Desain Teknis',
      desc: 'Penyusunan DED (Detail Engineering Design), perhitungan struktur, AHSP, dan Rencana Anggaran Biaya (RAB).',
      icon: '🏗️'
    },
    {
      title: 'Pemetaan GIS & Survey',
      desc: 'Pemetaan wilayah proyek berbasis GIS interaktif, pemetaan topografi, dan analisis spasial lokasi.',
      icon: '🗺️'
    },
    {
      title: 'Manajemen Proyek & Kurva S',
      desc: 'Pengendalian progres fisik dan keuangan dengan grafik Kurva S digital untuk efisiensi biaya dan jadwal.',
      icon: '📊'
    }
  ];

  const portfolio = [
    {
      title: 'Pembangunan Infrastruktur Jalan & Jembatan',
      location: 'Kabupaten Tabalong',
      category: 'Infrastruktur Jalan',
      status: 'Selesai 100%'
    },
    {
      title: 'Supervisi Gedung Fasilitas Publik',
      location: 'Wilayah Kalimantan Selatan',
      category: 'Gedung & Arsitektur',
      status: 'Selesai 100%'
    },
    {
      title: 'Penataan Drainase & Kawasan Permukiman',
      location: 'Area Perkotaan',
      category: 'Sipil & Tata Lingkungan',
      status: 'Progres Berjalan'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* 1. HERO SECTION */}
      <section className="relative py-20 px-6 border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full mb-4">
            Konsultan Perencanaan & Pengawasan Konstruksi
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Membangun Infrastruktur Presisi & Terintegrasi
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-3xl mx-auto mb-8">
            Kami menyediakan layanan konsultansi teknik sipil berbasis teknologi digital, pemetaan GIS interaktif, serta pengawasan mutu transparan demi keberhasilan setiap proyek.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/6281234567890?text=Halo%20admin,%20saya%20ingin%20konsultasi%20mengenai%20layanan%20konstruksi"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl text-sm transition shadow-lg shadow-emerald-600/20"
            >
              Konsultasi Proyek (WhatsApp)
            </a>
            <a
              href="#services"
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-xl text-sm transition border border-slate-700"
            >
              Lihat Layanan Kami
            </a>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="py-10 border-b border-slate-800 bg-slate-900/50">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-extrabold text-white">50+</div>
            <div className="text-xs text-slate-400 mt-1">Proyek Terselesaikan</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-emerald-400">100%</div>
            <div className="text-xs text-slate-400 mt-1">Sesuai Spesifikasi</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white">10+</div>
            <div className="text-xs text-slate-400 mt-1">Tahun Pengalaman</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-emerald-400">GIS</div>
            <div className="text-xs text-slate-400 mt-1">Digital Monitoring</div>
          </div>
        </div>
      </section>

      {/* 3. LAYANAN JASA (SERVICES) */}
      <section id="services" className="py-16 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Layanan Unggulan Kami</h2>
          <p className="text-slate-400 text-xs md:text-sm">
            Solusi komprehensif untuk kebutuhan perencanaan dan pengawasan teknis di lapangan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-slate-900 border border-slate-800 rounded-2xl hover:border-emerald-500/50 transition group"
            >
              <div className="text-3xl mb-4 p-3 bg-slate-800 rounded-xl inline-block group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PORTFOLIO PROYEK */}
      <section className="py-16 px-6 bg-slate-900/30 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Portofolio Pekerjaan</h2>
            <p className="text-slate-400 text-xs md:text-sm">
              Rekam jejak pengawasan dan perencanaan konstruksi di wilayah Kalimantan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {portfolio.map((item, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-500/10 px-2.5 py-1 rounded-md">
                    {item.category}
                  </span>
                  <h3 className="text-base font-bold text-white mt-3 mb-1">{item.title}</h3>
                  <p className="text-xs text-slate-400">📍 {item.location}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex justify-between items-center text-xs">
                  <span className="text-slate-500">Status Proyek:</span>
                  <span className="font-medium text-slate-200">{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FOOTER / CONTACT CTA */}
      <footer className="py-12 px-6 border-t border-slate-800 bg-slate-950 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-3">Siap Bermitra untuk Proyek Selanjutnya?</h2>
          <p className="text-slate-400 text-xs md:text-sm mb-6">
            Hubungi tim teknis kami untuk diskusi perencanaan, penawaran supervisi, atau demonstrasi pengawasan berbasis sistem GIS digital.
          </p>
          <a
            href="https://wa.me/6281234567890?text=Halo%20admin,%20saya%20ingin%20konsultasi%20mengenai%20layanan%20konstruksi"
            target="_blank"
            rel="noreferrer"
            className="inline-block px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-sm transition"
          >
            Hubungi Tim Konsultan
          </a>
          <p className="text-slate-600 text-[11px] mt-10">
            &copy; {new Date().getFullYear()} PT. Konsultan Konstruksi Indonesia. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}