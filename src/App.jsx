import { Routes, Route, Navigate } from 'react-router-dom';

// Import Layout Wrapper
import MainLayout from './components/Layout/MainLayout';

// Import Pages
import Login from './pages/Auth/Login';
// HAPUS: import PackageSelector from './pages/Auth/PackageSelector';
import DashboardUtama from './pages/Dashboard/DashboardUtama';
import ProjectList from './pages/Projects/ProjectList';
import AddProject from './pages/Projects/AddProject';

// Import Detail Proyek
import ProjectData from './pages/Projects/ProjectDetail/ProjectData';
import ProjectRAB from './pages/Projects/ProjectDetail/ProjectRAB';
import KurvaS from './pages/Projects/ProjectDetail/KurvaS';
import PetaGIS from './pages/Projects/ProjectDetail/PetaGIS';

import CompanyProfile from './pages/CompanyProfile/CompanyProfile';

// Import Modul Laporan
import LaporanList from './pages/Laporan/LaporanList';
import InputLaporan from './pages/Laporan/FormInputLaporan';
import LaporanData from './pages/Laporan/LaporanData'; 

export default function App() {
  return (
    <Routes>
      {/* Route Publik / Auth */}
      <Route path="/login" element={<Login />} />
      {/* HAPUS: <Route path="/select-package" element={<PackageSelector />} /> */}

      {/* Route Proteksi / Utama */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardUtama />} />
        
        {/* Modul Proyek & Detail */}
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/projects/tambah" element={<AddProject />} />
        
        {/* Route Detail Proyek */}
        <Route path="/projects/projectdata" element={<ProjectData />} />
        <Route path="/projects/:id/data" element={<ProjectData />} />
        <Route path="/projects/:id/rab" element={<ProjectRAB />} />
        <Route path="/projects/:id/kurva-s" element={<KurvaS />} />
        <Route path="/projects/:id/peta-gis" element={<PetaGIS />} />

        {/* Modul Lainnya */}
        <Route path="/company-profile" element={<CompanyProfile />} />
        
        {/* Modul Laporan */}
        <Route path="/laporan" element={<LaporanList />} />
        <Route path="/laporan/input" element={<InputLaporan />} />
        <Route path="/laporan/detail" element={<LaporanData />} /> 
        <Route path="/laporan/:id/detail" element={<LaporanData />} /> 
      </Route>

      {/* Catch-All / 404 Redirect */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}