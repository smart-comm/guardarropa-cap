import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ClientLanding from './pages/client/ClientLanding';
import ClientTicket from './pages/client/ClientTicket';
import StaffDashboard from './pages/staff/StaffDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import './index.css';

function App() {
  return (
    <BrowserRouter>
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
