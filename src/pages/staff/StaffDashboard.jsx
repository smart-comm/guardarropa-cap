import { useState } from 'react';
import { useCloakroomStore } from '../../store/useCloakroomStore';
import { Search, Plus, ArrowRight, ScanLine, Tag, CheckSquare, Clock } from 'lucide-react';

export default function StaffDashboard() {
  const { items, addItem, retrieveItem, isLoading } = useCloakroomStore();
  const [activeTab, setActiveTab] = useState('deposit'); // 'deposit' | 'retrieve'
  const [codeInput, setCodeInput] = useState('');
  const [feedback, setFeedback] = useState(null); // { type: 'success'|'error', msg: string }

  const showFeedback = (type, msg) => {
    setFeedback({ type, msg });
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleQuickAdd = async () => {
    if (isLoading) return;
    // Generate a random rack/hanger code for quick physical tagging
    // e.g. T-105
    const quickCode = 'T-' + Math.floor(100 + Math.random() * 900);
    const added = await addItem(quickCode);
    if (added) {
      showFeedback('success', `Prenda ingresada: ${quickCode}`);
    }
  };

  const handleRetrieve = async (e) => {
    e.preventDefault();
    if (!codeInput) return;
    const item = items.find(i => i.code.toUpperCase() === codeInput.toUpperCase());
    
    if (!item) {
      showFeedback('error', 'Código no encontrado');
      return;
    }
    
    if (item.status === 'retrieved') {
      showFeedback('error', 'La prenda ya fue entregada');
      return;
    }

    await retrieveItem(item.code);
    showFeedback('success', `Prenda entregada correctamente`);
    setCodeInput('');
  };

  return (
    <div className="min-h-screen pb-20 max-w-lg mx-auto bg-[var(--color-bg)]">
      {/* Header */}
      <header className="sticky top-0 bg-[var(--color-surface)]/90 backdrop-blur-md p-4 border-b border-[rgba(255,255,255,0.05)] z-10 flex justify-between items-center">
        <div>
          <h1 className="font-bold text-lg">Staff Área</h1>
          <p className="text-xs text-[var(--color-text-muted)] flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Sistema Operativo
          </p>
        </div>
        <div className="bg-[var(--color-surface-hover)] px-3 py-1 rounded-full text-sm font-medium">
          RACK A
        </div>
      </header>

      <main className="p-4 flex flex-col gap-6">
        
        {/* Toggle Tabs */}
        <div className="flex bg-[var(--color-surface)] p-1 rounded-full border border-[rgba(255,255,255,0.05)]">
          <button 
            className={`flex-1 py-3 px-4 rounded-full text-sm font-semibold transition-all ${activeTab === 'deposit' ? 'bg-[var(--color-primary)] text-white shadow-lg' : 'text-[var(--color-text-muted)]'}`}
            onClick={() => setActiveTab('deposit')}
          >
            INGRESAR
          </button>
          <button 
            className={`flex-1 py-3 px-4 rounded-full text-sm font-semibold transition-all ${activeTab === 'retrieve' ? 'bg-[var(--color-surface-hover)] text-white shadow-lg' : 'text-[var(--color-text-muted)]'}`}
            onClick={() => setActiveTab('retrieve')}
          >
            ENTREGAR
          </button>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div className={`p-4 rounded-xl animate-fade-in text-center font-bold text-lg shadow-lg border ${feedback.type === 'success' ? 'bg-[#10b98120] text-[var(--color-success)] border-[var(--color-success)]' : 'bg-[#ef444420] text-[var(--color-danger)] border-[var(--color-danger)]'}`}>
            {feedback.msg}
          </div>
        )}

        {/* Tab content */}
        {activeTab === 'deposit' ? (
          <div className="animate-fade-in flex flex-col gap-4">
            <div className="glass p-8 rounded-[24px] text-center border border-[var(--color-primary-light)]">
              <button 
                onClick={handleQuickAdd}
                disabled={isLoading}
                className="w-40 h-40 mx-auto rounded-full bg-[var(--color-primary)] flex flex-col items-center justify-center gap-2 shadow-[var(--shadow-glow)] hover:bg-[var(--color-primary-hover)] active:scale-95 transition-all outline-none"
              >
                <Plus size={48} className="text-white" />
                <span className="font-bold tracking-wider">RÁPIDO</span>
              </button>
              <p className="mt-6 text-[var(--color-text-muted)] text-sm">
                Genera un código físico al instante para un espacio vacío del rack.
              </p>
            </div>
            
            <div className="glass p-6 rounded-[24px] flex flex-col gap-3">
               <h3 className="text-sm text-[var(--color-text-muted)] font-medium flex items-center gap-2"><ScanLine size={16}/> Escanear QR preventa</h3>
               <button className="btn btn-surface py-5 border-dashed border-2 text-[var(--color-accent)] hover:text-white border-[rgba(255,255,255,0.2)]">
                 Abrir Cámara Scanner
               </button>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in flex flex-col gap-4">
            <form onSubmit={handleRetrieve} className="glass p-6 rounded-[24px] flex flex-col gap-4">
               <h3 className="text-sm text-[var(--color-text-muted)] font-medium flex items-center gap-2"><Search size={16}/> Buscar prenda</h3>
               
               <input 
                 autoFocus
                 type="text" 
                 value={codeInput}
                 onChange={(e) => setCodeInput(e.target.value)}
                 className="input-base text-2xl text-center tracking-widest font-mono uppercase" 
                 placeholder="CÓDIGO" 
               />
               
               <button 
                type="submit" 
                className="btn btn-primary py-4 mt-2 text-lg"
                disabled={!codeInput || isLoading}
               >
                 Marcar Entregada <CheckSquare size={20}/>
               </button>
            </form>
          </div>
        )}

        {/* Recent Items List (Local Session) */}
        <div>
          <h4 className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-3 px-2 flex justify-between items-center">
            <span>Operaciones Recientes</span>
            <Clock size={14}/>
          </h4>
          <div className="flex flex-col gap-2">
            {items.slice(-5).reverse().map((item, idx) => (
              <div key={idx} className="bg-[var(--color-surface)] p-4 rounded-xl flex justify-between items-center border border-[rgba(255,255,255,0.05)]">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${item.status === 'deposited' ? 'bg-yellow-400' : 'bg-[var(--color-text-muted)]'}`}></div>
                  <span className="font-mono font-bold text-lg">{item.code}</span>
                </div>
                <div className="text-xs font-medium px-2 py-1 rounded-md bg-[rgba(255,255,255,0.05)] text-[var(--color-text-muted)] uppercase">
                  {item.status === 'deposited' ? 'Guardada' : 'Entregada'}
                </div>
              </div>
            ))}
            {items.length === 0 && (
              <div className="text-center p-8 text-sm text-[var(--color-text-muted)] border border-dashed border-[rgba(255,255,255,0.1)] rounded-xl">
                Aún no hay operaciones
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
