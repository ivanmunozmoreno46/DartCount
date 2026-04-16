import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Player } from '../types';

interface ScoreBoardProps {
  players: Player[];
  currentPlayerIndex: number;
  currentDarts: number[];
}

export default function ScoreBoard({ players, currentPlayerIndex, currentDarts }: ScoreBoardProps) {
  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      {players.map((player, idx) => {
        const isActive = idx === currentPlayerIndex;
        return (
          <motion.div
            key={player.id}
            animate={{ 
              scale: isActive ? 1.02 : 1,
              opacity: isActive ? 1 : 0.7
            }}
            className={`relative overflow-hidden rounded-3xl p-6 transition-all duration-500 ${
              isActive 
                ? 'felt-bg shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-2 border-[var(--color-gold)]' 
                : 'bg-[var(--color-wood-mid)]/40 border border-[var(--color-wood-grain)]'
            }`}
          >
            {isActive && (
              <div className="absolute top-0 right-0 p-3">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <div 
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i < currentDarts.length ? 'bg-[var(--color-gold)]' : 'bg-[var(--color-gold)]/20'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <p className={`text-xs font-bold uppercase tracking-widest ${isActive ? 'text-[var(--color-gold)]' : 'text-[var(--color-gold)]/50'}`}>
                  {player.name}
                </p>
                <h2 className="text-8xl font-serif font-bold text-[var(--color-cream)] tabular-nums drop-shadow-lg">
                  {player.score}
                </h2>
              </div>

              {isActive && (
                <div className="text-right">
                  <div className="inline-block px-3 py-1 rounded-full border border-[var(--color-gold)] text-[var(--color-gold)] text-[10px] font-bold uppercase tracking-widest mb-3">
                    Turno
                  </div>
                  <div className="flex gap-2 justify-end">
                    <AnimatePresence mode="popLayout">
                      {currentDarts.map((d, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-black/20 backdrop-blur-md px-2 py-1 rounded text-sm font-bold text-[var(--color-cream)] min-w-[24px] text-center border border-[var(--color-gold)]/20"
                        >
                          {d}
                        </motion.span>
                      ))}
                    </AnimatePresence>
                  </div>
                  <p className="text-2xl font-serif font-bold text-[var(--color-gold)] mt-2">
                    {currentDarts.reduce((a, b) => a + b, 0)}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
