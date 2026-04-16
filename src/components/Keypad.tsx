import React from 'react';
import { Delete, Check, ArrowLeft } from 'lucide-react';

interface KeypadProps {
  onAddDart: (score: number) => void;
  onUndoDart: () => void;
  onConfirmTurn: () => void;
  currentDarts: number[];
  canConfirm: boolean;
}

export default function Keypad({ onAddDart, onUndoDart, onConfirmTurn, currentDarts, canConfirm }: KeypadProps) {
  const [input, setInput] = React.useState('');

  const handleNumber = (num: string) => {
    if (input.length >= 2) return;
    const newVal = input + num;
    if (parseInt(newVal) > 60) return;
    setInput(newVal);
  };

  const handleClear = () => setInput('');

  const handleAdd = () => {
    if (input === '') return;
    onAddDart(parseInt(input));
    setInput('');
  };

  const quickScores = [20, 40, 60, 0];

  return (
    <div className="bg-[var(--color-wood-mid)] border-t border-[var(--color-wood-grain)] p-6 pb-10 space-y-6 rounded-t-[40px] shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 bg-[var(--color-wood-dark)] rounded-2xl p-4 flex items-center justify-between border-2 border-[var(--color-wood-grain)] shadow-inner">
          <span className="text-[var(--color-gold)] opacity-50 text-[10px] font-bold uppercase tracking-widest">Dardo {currentDarts.length + 1}</span>
          <span className="text-3xl font-serif font-bold text-[var(--color-cream)]">{input || '0'}</span>
        </div>
        <button 
          onClick={handleAdd}
          disabled={input === '' || currentDarts.length >= 3}
          className="bg-[var(--color-felt-green)] text-[var(--color-cream)] px-8 py-4 rounded-2xl font-bold border border-[var(--color-gold)]/30 shadow-lg disabled:opacity-50 transition-all active:scale-95"
        >
          Añadir
        </button>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, 'DEL'].map((btn) => (
          <button
            key={btn}
            onClick={() => {
              if (btn === 'C') handleClear();
              else if (btn === 'DEL') {
                if (input) setInput(input.slice(0, -1));
                else onUndoDart();
              }
              else handleNumber(btn.toString());
            }}
            className={`h-16 rounded-2xl text-2xl font-serif font-bold transition-all active:scale-95 shadow-md border-b-4 border-[var(--color-wood-grain)] ${
              typeof btn === 'number' 
                ? 'bg-[var(--color-wood-dark)] text-[var(--color-gold)] hover:bg-[var(--color-wood-grain)]' 
                : 'bg-[var(--color-wood-grain)] text-[var(--color-gold)]/70'
            }`}
          >
            {btn === 'DEL' ? <Delete className="w-6 h-6 mx-auto" /> : btn}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-3">
        {quickScores.map((s) => (
          <button
            key={s}
            onClick={() => onAddDart(s)}
            disabled={currentDarts.length >= 3}
            className="h-12 bg-[var(--color-wood-dark)]/50 border border-[var(--color-wood-grain)] rounded-xl text-[var(--color-gold)] font-bold hover:bg-[var(--color-wood-grain)] disabled:opacity-50 text-xs uppercase tracking-widest"
          >
            {s === 0 ? 'Miss' : s}
          </button>
        ))}
      </div>

      <button
        onClick={onConfirmTurn}
        disabled={!canConfirm}
        className="w-full py-5 bg-[var(--color-gold)] text-[var(--color-wood-dark)] rounded-2xl font-bold text-xl hover:bg-[var(--color-cream)] disabled:opacity-50 transition-all flex items-center justify-center gap-3 shadow-2xl border-b-4 border-black/20"
      >
        <Check className="w-7 h-7" />
        Confirmar Turno
      </button>
    </div>
  );
}
