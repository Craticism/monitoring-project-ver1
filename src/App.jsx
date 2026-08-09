import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout
import MainLayout from './components/Layout/MainLayout';

// Pages
import Login from './pages/Auth/Login';
import DashboardUtama from './pages/Dashboard/DashboardUtama';
import ProjectList from './pages/Projects/ProjectList';
import InputLaporan from './pages/Laporan/InputLaporan';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rute Standalone tanpa Sidebar */}
        <Route path="/login" element={<Login />} />

        {/* Rute Utama dengan Sidebar (MainLayout) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<DashboardUtama />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/laporan" element={<InputLaporan />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;