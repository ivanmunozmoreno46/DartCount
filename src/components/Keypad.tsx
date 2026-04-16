import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Delete, Check, Target as TargetIcon, X } from 'lucide-react';
import Dartboard from './Dartboard';

interface KeypadProps {
  onAddDart: (score: number) => void;
  onUndoDart: () => void;
  onConfirmTurn: () => void;
  currentDarts: number[];
  canConfirm: boolean;
}

export default function Keypad({ onAddDart, onUndoDart, onConfirmTurn, currentDarts, canConfirm }: KeypadProps) {
  const [isDartboardOpen, setIsDartboardOpen] = React.useState(false);

  const handleOpenDartboard = () => {
    setIsDartboardOpen(true);
  };

  const handleUndo = () => {
    onUndoDart();
  };

  const handleConfirm = () => {
    onConfirmTurn();
  };

  const handleClose = () => {
    setIsDartboardOpen(false);
  };

  const turnTotal = currentDarts.reduce((a, b) => a + b, 0);

  return (
    <div className="bg-[var(--color-wood-mid)] border-t border-[var(--color-wood-grain)] p-6 pb-10 space-y-6 rounded-t-[40px] shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
      {/* Turn Summary Panel */}
      <div className="bg-[var(--color-wood-dark)] rounded-[32px] p-6 border-2 border-[var(--color-wood-grain)] shadow-inner">
        <div className="flex justify-between items-center mb-6">
          <span className="text-[var(--color-gold)] font-bold uppercase text-[10px] tracking-[0.2em] opacity-60">Turno Actual</span>
          <div className="flex items-center gap-2">
            <span className="text-[var(--color-gold)] text-xs font-serif italic">Total:</span>
            <span className="text-2xl font-serif font-bold text-[var(--color-gold)]">{turnTotal}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[0, 1, 2].map((i) => (
            <div 
              key={i}
              className={`h-20 rounded-2xl border-2 flex flex-col items-center justify-center transition-all duration-300 ${
                currentDarts.length === i 
                  ? 'border-[var(--color-gold)] bg-[var(--color-felt-green)]/20 shadow-[0_0_15px_rgba(197,160,89,0.2)]' 
                  : 'border-[var(--color-wood-grain)] bg-[var(--color-wood-mid)]/30'
              }`}
            >
              <span className="text-[8px] uppercase font-bold text-[var(--color-gold)]/40 mb-1">Dardo {i + 1}</span>
              <span className={`text-2xl font-serif font-bold ${currentDarts[i] !== undefined ? 'text-[var(--color-cream)]' : 'text-[var(--color-wood-grain)]'}`}>
                {currentDarts[i] !== undefined ? currentDarts[i] : '—'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Actions */}
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <button 
            onClick={handleOpenDartboard}
            disabled={currentDarts.length >= 3}
            className="flex-[2] py-6 bg-[var(--color-gold)] text-[var(--color-wood-dark)] rounded-2xl font-bold text-xl hover:bg-[var(--color-cream)] disabled:opacity-50 transition-all flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(0,0,0,0.3)] border-b-4 border-black/20"
          >
            <TargetIcon className="w-8 h-8" />
            <span className="uppercase tracking-widest text-sm">Anotar Dardo</span>
          </button>
          
          <button 
            onClick={handleUndo}
            disabled={currentDarts.length === 0}
            className="flex-1 py-6 bg-[var(--color-wood-dark)] text-[var(--color-gold)]/60 rounded-2xl font-bold hover:text-[var(--color-gold)] border-2 border-[var(--color-wood-grain)] disabled:opacity-20 transition-all flex items-center justify-center"
            title="Borrar último"
          >
            <Delete className="w-8 h-8" />
          </button>
        </div>

        <button
          onClick={handleConfirm}
          disabled={!canConfirm}
          className={`w-full py-5 rounded-2xl font-bold text-xl transition-all flex items-center justify-center gap-3 border-b-4 ${
            canConfirm 
              ? 'bg-[var(--color-felt-green)] text-[var(--color-cream)] border-black/20 shadow-xl' 
              : 'bg-[var(--color-wood-dark)] text-[var(--color-wood-grain)] border-transparent opacity-50'
          }`}
        >
          <Check className="w-7 h-7" />
          Confirmar Turno
        </button>
      </div>

      <AnimatePresence>
        {isDartboardOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-[var(--color-wood-dark)] border-2 border-[var(--color-wood-grain)] rounded-[40px] p-6 w-full max-w-lg space-y-6 shadow-[0_40px_100px_rgba(0,0,0,0.9)]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-[var(--color-felt-green)] p-3 rounded-2xl border border-[var(--color-gold)]/30">
                    <TargetIcon className="w-6 h-6 text-[var(--color-gold)]" />
                  </div>
                  <div>
                    <h3 className="text-[var(--color-gold)] font-serif font-bold text-xl uppercase tracking-tight">Diana Táctica</h3>
                    <p className="text-[var(--color-gold)]/50 text-[10px] font-bold uppercase tracking-[0.2em]">Dardo {currentDarts.length + 1} de 3</p>
                  </div>
                </div>
                <button 
                  onClick={handleClose}
                  className="p-3 text-[var(--color-gold)]/50 hover:text-[var(--color-gold)] transition-colors bg-[var(--color-wood-mid)] rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex justify-center py-6">
                <Dartboard 
                  onScore={(score) => {
                    onAddDart(score);
                    if (currentDarts.length >= 2) {
                      setTimeout(() => setIsDartboardOpen(false), 200);
                    }
                  }} 
                  disabled={currentDarts.length >= 3} 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={handleUndo}
                  disabled={currentDarts.length === 0}
                  className="py-5 bg-[var(--color-wood-mid)] text-[var(--color-gold)] rounded-2xl font-bold text-xs uppercase tracking-widest border-2 border-[var(--color-wood-grain)] disabled:opacity-20 flex items-center justify-center gap-2"
                >
                  <Delete className="w-4 h-4" /> Borrar
                </button>
                <button 
                  onClick={handleClose}
                  className="py-5 bg-[var(--color-felt-green)] text-[var(--color-cream)] rounded-2xl font-bold text-xs uppercase tracking-widest border border-[var(--color-gold)]/30 shadow-lg active:scale-95 transition-all"
                >
                  Confirmar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
