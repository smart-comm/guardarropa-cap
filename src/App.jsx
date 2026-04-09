import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import ClientLanding from './pages/client/ClientLanding';
import ClientTicket from './pages/client/ClientTicket';
import StaffDashboard from './pages/staff/StaffDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import './index.css';

// Componente para selector de roles en desarrollo
function RoleNavigator() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-[var(--color-surface)]/90 backdrop-blur-md border border-[rgba(255,255,255,0.1)] p-2 rounded-full flex gap-2 z-50 shadow-2xl">
      <Link 
        to="/" 
        className={`px-4 py-2 text-sm rounded-full font-medium transition-all ${currentPath === '/' || currentPath.includes('/ticket') ? 'bg-[var(--color-primary)] text-white' : 'text-[var(--color-text-muted)] hover:text-white'}`}
      >
        Cliente
      </Link>
      <Link 
        to="/staff" 
        className={`px-4 py-2 text-sm rounded-full font-medium transition-all ${currentPath === '/staff' ? 'bg-[var(--color-primary)] text-white' : 'text-[var(--color-text-muted)] hover:text-white'}`}
      >
        Staff
      </Link>
      <Link 
        to="/admin" 
        className={`px-4 py-2 text-sm rounded-full font-medium transition-all ${currentPath === '/admin' ? 'bg-[var(--color-primary)] text-white' : 'text-[var(--color-text-muted)] hover:text-white'}`}
      >
        Admin
      </Link>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      {/* Selector persistente para navegar entre módulos (Simulación de Roles) */}
      <RoleNavigator />
      
      <Routes>
        {/* Client Routes */}
        <Route path="/" element={<ClientLanding />} />
        <Route path="/ticket/:code" element={<ClientTicket />} />

        {/* Staff Routes */}
        <Route path="/staff" element={<StaffDashboard />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
