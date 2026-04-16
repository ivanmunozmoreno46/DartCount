import React from 'react';
import { motion } from 'motion/react';
import { Users, User, Target } from 'lucide-react';
import { GameMode, PlayerCount } from '../types';

interface SetupProps {
  onStart: (mode: GameMode, players: PlayerCount, rounds: number) => void;
  onShowRules: () => void;
}

export default function Setup({ onStart, onShowRules }: SetupProps) {
  const [mode, setMode] = React.useState<GameMode>('High Score');
  const [players, setPlayers] = React.useState<PlayerCount>(1);
  const [rounds, setRounds] = React.useState(10);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto p-6 space-y-8"
    >
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-serif font-bold text-[var(--color-gold)] tracking-tight uppercase">
          DartCount
        </h1>
        <p className="text-[var(--color-gold)] opacity-60 font-medium italic">Classic Pub Edition</p>
      </div>

      <div className="space-y-6 bg-[var(--color-wood-mid)] p-8 rounded-3xl border border-[var(--color-wood-grain)] shadow-2xl">
        <div className="space-y-4">
          <label className="text-xs uppercase tracking-widest text-[var(--color-gold)] font-bold">Modo de Juego</label>
          <div className="grid grid-cols-2 gap-4">
            {(['301', 'High Score'] as GameMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`py-4 rounded-2xl font-serif text-sm border-2 transition-all duration-300 ${
                  mode === m 
                    ? 'bg-[var(--color-felt-green)] border-[var(--color-gold)] text-[var(--color-cream)] shadow-[0_0_20px_rgba(0,0,0,0.5)]' 
                    : 'bg-[var(--color-wood-dark)] border-[var(--color-wood-grain)] text-[var(--color-gold)] hover:border-[var(--color-gold)]'
                }`}
              >
                {m === 'High Score' ? 'Puntuación Alta' : m}
              </button>
            ))}
          </div>
        </div>

        {mode === 'High Score' && (
          <div className="space-y-4">
            <label className="text-xs uppercase tracking-widest text-[var(--color-gold)] font-bold">Número de Rondas</label>
            <div className="grid grid-cols-3 gap-2">
              {[5, 10, 15].map((r) => (
                <button
                  key={r}
                  onClick={() => setRounds(r)}
                  className={`py-2 rounded-xl font-bold transition-all ${
                    rounds === r 
                      ? 'bg-[var(--color-gold)] text-[var(--color-wood-dark)]' 
                      : 'bg-[var(--color-wood-dark)] text-[var(--color-gold)] border border-[var(--color-wood-grain)]'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4">
          <label className="text-xs uppercase tracking-widest text-[var(--color-gold)] font-bold">Jugadores</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setPlayers(1)}
              className={`flex flex-col items-center justify-center py-4 rounded-2xl border-2 transition-all duration-300 ${
                players === 1 
                  ? 'bg-[var(--color-felt-green)] border-[var(--color-gold)] text-[var(--color-cream)] shadow-[0_0_20px_rgba(0,0,0,0.5)]' 
                  : 'bg-[var(--color-wood-dark)] border-[var(--color-wood-grain)] text-[var(--color-gold)] hover:border-[var(--color-gold)]'
              }`}
            >
              <User className="w-6 h-6 mb-1" />
              <span className="font-medium">1 Jugador</span>
            </button>
            <button
              onClick={() => setPlayers(2)}
              className={`flex flex-col items-center justify-center py-4 rounded-2xl border-2 transition-all duration-300 ${
                players === 2 
                  ? 'bg-[var(--color-felt-green)] border-[var(--color-gold)] text-[var(--color-cream)] shadow-[0_0_20px_rgba(0,0,0,0.5)]' 
                  : 'bg-[var(--color-wood-dark)] border-[var(--color-wood-grain)] text-[var(--color-gold)] hover:border-[var(--color-gold)]'
              }`}
            >
              <Users className="w-6 h-6 mb-1" />
              <span className="font-medium">2 Jugadores</span>
            </button>
          </div>
        </div>

        <button
          onClick={() => onStart(mode, players, rounds)}
          className="w-full py-5 bg-[var(--color-gold)] text-[var(--color-wood-dark)] rounded-2xl font-bold text-lg hover:bg-[var(--color-cream)] transition-colors shadow-xl flex items-center justify-center gap-2"
        >
          <Target className="w-5 h-5" />
          Empezar Partida
        </button>
      </div>

      <button
        onClick={onShowRules}
        className="w-full text-[var(--color-gold)] opacity-60 hover:opacity-100 text-sm font-medium transition-colors underline underline-offset-4"
      >
        Ver reglas del juego
      </button>
    </motion.div>
  );
}
