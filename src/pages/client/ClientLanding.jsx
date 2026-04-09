import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ticket, QrCode, ArrowRight } from 'lucide-react';
import { useCloakroomStore } from '../../store/useCloakroomStore';

export default function ClientLanding() {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  // Mock de pago
  const handleCheckout = () => {
    setIsProcessing(true);
    // Simula procesamiento de pasarela de pago o validación
    setTimeout(() => {
      setIsProcessing(false);
      // Generar código único para el ticket del cliente
      const newCode = 'CAP-' + Math.random().toString(36).substr(2, 6).toUpperCase();
      navigate(`/ticket/${newCode}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>

      <div className="glass w-full max-w-md p-8 rounded-[24px] relative z-10 animate-fade-in text-center flex flex-col gap-6" style={{ maxWidth: '400px', margin: '0 auto' }}>
        
        <div className="flex justify-center mb-2">
          <div className="w-16 h-16 rounded-full bg-[var(--color-surface)] flex items-center justify-center shadow-[var(--shadow-glow)]">
            <Ticket className="text-[var(--color-primary)] w-8 h-8" />
          </div>
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-2 tracking-tight">Guardarropas CAP</h1>
          <p className="text-[var(--color-text-muted)] text-sm">Adelanta tu registro, evita filas y paga online para tu comodidad.</p>
        </div>

        {step === 1 && (
          <div className="animate-fade-in flex flex-col gap-4 mt-4">
            <div className="bg-[var(--color-surface)] p-4 rounded-[var(--radius-md)] text-left border border-[rgba(255,255,255,0.05)]">
              <span className="block text-sm text-[var(--color-text-muted)] mb-1">Costo por prenda</span>
              <span className="block text-2xl font-bold">$1,500</span>
            </div>
            
            <button 
              className="btn btn-primary w-full py-4 text-lg font-semibold flex justify-center items-center gap-2 mt-2"
              onClick={() => setStep(2)}
            >
              Comenzar pre-registro
              <ArrowRight size={20} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in flex flex-col gap-4 mt-4 text-left">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-[var(--color-text-muted)] ml-1">Tu Nombre</label>
              <input type="text" className="input-base" placeholder="Ej. Juan Pérez" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-[var(--color-text-muted)] ml-1">Teléfono o Email (opcional)</label>
              <input type="text" className="input-base" placeholder="Para recuperar tu código" />
            </div>
            
            <button 
              className="btn btn-primary w-full py-4 text-lg font-semibold flex justify-center items-center gap-2 mt-4"
              onClick={handleCheckout}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <span className="animate-pulse">Procesando pago...</span>
              ) : (
                <>Pagar e ir a mi Código <QrCode size={20} /></>
              )}
            </button>
            <button 
              className="btn btn-surface w-full mt-2"
              onClick={() => setStep(1)}
              disabled={isProcessing}
            >
              Volver
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
