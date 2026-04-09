import { useCloakroomStore } from '../../store/useCloakroomStore';
import { LayoutDashboard, Users, Activity, Ticket, ChevronRight, LogOut } from 'lucide-react';

export default function AdminDashboard() {
  const metrics = useCloakroomStore((state) => state.getMetrics());

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex md:flex-row flex-col">
      {/* Sidebar - Mobile Topbar */}
      <aside className="w-full md:w-64 bg-[var(--color-surface)] border-b md:border-b-0 md:border-r border-[rgba(255,255,255,0.05)] p-6 flex flex-col gap-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)] flex items-center justify-center shadow-[var(--shadow-glow)]">
            <LayoutDashboard className="text-white w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">Admin</h1>
            <span className="text-xs text-[var(--color-text-muted)]">CAP Analytics</span>
          </div>
        </div>

        <nav className="flex-1 flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
          <a href="#" className="flex items-center gap-3 p-3 rounded-lg bg-[rgba(255,255,255,0.05)] text-white hover:bg-[rgba(255,255,255,0.1)] transition whitespace-nowrap">
            <Activity size={18} className="text-[var(--color-primary)]" /> Resumen
          </a>
          <a href="#" className="flex items-center gap-3 p-3 rounded-lg text-[var(--color-text-muted)] hover:bg-[rgba(255,255,255,0.05)] hover:text-white transition whitespace-nowrap">
            <Ticket size={18} /> Invitaciones
          </a>
          <a href="#" className="flex items-center gap-3 p-3 rounded-lg text-[var(--color-text-muted)] hover:bg-[rgba(255,255,255,0.05)] hover:text-white transition whitespace-nowrap">
            <Users size={18} /> Staff
          </a>
        </nav>

        <button className="hidden md:flex items-center gap-2 text-[var(--color-text-muted)] hover:text-white text-sm">
          <LogOut size={16} /> Cerrar Sesión
        </button>
      </aside>

      <main className="flex-1 p-6 md:p-10 hide-scrollbar overflow-y-auto">
        <header className="mb-10">
          <h2 className="text-3xl font-bold font-main tracking-tight">Dashboard General</h2>
          <p className="text-[var(--color-text-muted)] mt-1">Métricas en tiempo real del evento.</p>
        </header>

        {/* Realtime Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="glass p-6 rounded-2xl">
            <p className="text-sm text-[var(--color-text-muted)] mb-2">Ingresos (Mock)</p>
            <p className="text-3xl md:text-4xl font-bold">${metrics.revenue.toLocaleString()}</p>
          </div>
          
          <div className="glass p-6 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500 rounded-full mix-blend-multiply opacity-20 filter blur-xl"></div>
            <p className="text-sm text-[var(--color-text-muted)] mb-2">Prendas Activas</p>
            <p className="text-3xl md:text-4xl font-bold">{metrics.active}</p>
          </div>

          <div className="glass p-6 rounded-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500 rounded-full mix-blend-multiply opacity-20 filter blur-xl"></div>
            <p className="text-sm text-[var(--color-text-muted)] mb-2">Prendas Retiradas</p>
            <p className="text-3xl md:text-4xl font-bold">{metrics.retrieved}</p>
          </div>

          <div className="glass p-6 rounded-2xl">
            <p className="text-sm text-[var(--color-text-muted)] mb-2">Total Tickets</p>
            <p className="text-3xl md:text-4xl font-bold">{metrics.total}</p>
          </div>
        </div>

        {/* Operations & Invites row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 glass p-6 rounded-2xl border border-[rgba(255,255,255,0.05)]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-lg">Actividad del Guardarropas</h3>
              <span className="flex items-center gap-1 text-xs px-2 py-1 bg-[#10b98120] text-[var(--color-success)] rounded-full">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                Live
              </span>
            </div>
            
            <div className="h-48 border-2 border-dashed border-[rgba(255,255,255,0.05)] rounded-xl flex items-center justify-center text-[var(--color-text-muted)] text-sm">
               [Aquí iría un gráfico de Chart.js si hubiera historial extenso]
            </div>
          </div>

          <div className="glass p-6 rounded-2xl border border-[rgba(255,255,255,0.05)] flex flex-col">
            <h3 className="font-semibold text-lg mb-2">Pases VIP</h3>
            <p className="text-sm text-[var(--color-text-muted)] mb-6">Genera un código QR gratuito para invitados especiales.</p>
            
            <button className="mt-auto btn btn-primary w-full shadow-[var(--shadow-glow)]">
              Generar Invitación
            </button>
            <div className="mt-4 text-xs text-center text-[var(--color-text-muted)]">
               Última enviada hace 2h
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
