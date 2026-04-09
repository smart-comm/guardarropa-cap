import { useParams, Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { CheckCircle2, ChevronLeft } from 'lucide-react';

export default function ClientTicket() {
  const { code } = useParams();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      <div className="absolute top-2 left-4 z-20">
        <Link to="/" className="text-[var(--color-text-muted)] hover:text-white flex items-center gap-1 py-4">
          <ChevronLeft size={20} />
          <span>Volver al inicio</span>
        </Link>
      </div>

      <div className="glass w-full max-w-sm p-8 rounded-[32px] relative z-10 animate-fade-in text-center flex flex-col items-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-[var(--color-primary-light)]">
        
        <div className="w-16 h-16 rounded-full bg-[#10b98120] flex items-center justify-center mb-4">
          <CheckCircle2 className="text-[var(--color-success)] w-8 h-8" />
        </div>

        <h2 className="text-2xl font-bold mb-1">¡Todo listo!</h2>
        <p className="text-[var(--color-text-muted)] text-sm mb-8">
          Muestra este código al staff en el guardarropas.
        </p>

        <div className="bg-white p-4 rounded-[24px] mb-6 shadow-[var(--shadow-glow)]">
          <QRCodeSVG 
            value={code} 
            size={200}
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            level={"Q"}
          />
        </div>

        <div className="bg-[var(--color-surface)] w-full py-4 rounded-[16px] border border-[rgba(255,255,255,0.05)]">
          <span className="block text-xs uppercase text-[var(--color-text-muted)] tracking-wider">Código de Prenda</span>
          <span className="block text-2xl font-mono font-bold tracking-widest mt-1 text-[var(--color-primary)]">{code}</span>
        </div>

        <p className="text-xs text-[var(--color-text-muted)] mt-6 opacity-70">
          Toma una captura de pantalla por seguridad.
        </p>
      </div>
    </div>
  );
}
