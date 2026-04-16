import React from 'react';
import { motion } from 'motion/react';
import { X, Target, Info } from 'lucide-react';

interface RulesProps {
  onClose: () => void;
}

export default function Rules({ onClose }: RulesProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-[var(--color-wood-dark)] border-2 border-[var(--color-wood-grain)] rounded-3xl max-w-md w-full max-h-[80vh] overflow-y-auto shadow-2xl"
      >
        <div className="sticky top-0 bg-[var(--color-wood-dark)] p-6 border-b border-[var(--color-wood-grain)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-[var(--color-gold)]" />
            <h2 className="text-xl font-serif font-bold text-[var(--color-gold)] uppercase tracking-widest">Reglas del Dardo</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[var(--color-wood-grain)] rounded-full transition-colors">
            <X className="w-6 h-6 text-[var(--color-gold)]" />
          </button>
        </div>

        <div className="p-6 space-y-6 text-[var(--color-cream)]/80">
          <section className="space-y-2">
            <h3 className="text-[var(--color-gold)] font-bold flex items-center gap-2 uppercase text-xs tracking-widest">
              <Target className="w-4 h-4" /> El Objetivo
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-white text-xs font-bold mb-1">Modo 301</h4>
                <p className="text-sm leading-relaxed">
                  Comienza con 301 puntos. El objetivo es reducir esta puntuación exactamente a cero.
                </p>
              </div>
              <div>
                <h4 className="text-white text-xs font-bold mb-1">Modo Puntuación Alta</h4>
                <p className="text-sm leading-relaxed">
                  Comienza con 0 puntos. El objetivo es conseguir la mayor puntuación posible tras un número determinado de rondas.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-2">
            <h3 className="text-[var(--color-gold)] font-bold uppercase text-xs tracking-widest">Turnos</h3>
            <p className="text-sm leading-relaxed">
              Cada jugador lanza 3 dardos por turno. La suma de los puntos obtenidos se aplica a su puntuación total.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-[var(--color-gold)] font-bold uppercase text-xs tracking-widest">Puntuación</h3>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Números simples: Valor del número.</li>
              <li>Anillo exterior (Doble): El doble del valor.</li>
              <li>Anillo interior (Triple): El triple del valor.</li>
              <li>Centro (Bullseye): 50 puntos.</li>
              <li>Centro exterior (Outer Bull): 25 puntos.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="text-[var(--color-gold)] font-bold uppercase text-xs tracking-widest">Finalizar (Bust)</h3>
            <p className="text-sm leading-relaxed">
              Si un jugador anota más puntos de los que le quedan, su turno termina y su puntuación vuelve a ser la que tenía al inicio del turno. Esto se conoce como "Bust".
            </p>
          </section>

          <div className="bg-[var(--color-wood-mid)] p-4 rounded-2xl border border-[var(--color-wood-grain)]">
            <p className="text-xs italic text-[var(--color-gold)]/60">
              Nota: En esta aplicación simplificada, no es obligatorio terminar en un doble, pero ¡puedes retarte a ti mismo a hacerlo!
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
