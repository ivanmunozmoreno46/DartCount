import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw, History as HistoryIcon, Trophy, Settings } from 'lucide-react';
import { GameState, GameMode, PlayerCount, Player } from './types';
import Setup from './components/Setup';
import ScoreBoard from './components/ScoreBoard';
import Keypad from './components/Keypad';
import Rules from './components/Rules';

export default function App() {
  const [state, setState] = React.useState<GameState>({
    mode: 'High Score',
    playerCount: 1,
    players: [],
    currentPlayerIndex: 0,
    status: 'setup',
    winner: null,
    currentTurnDarts: [],
    maxRounds: 10,
    currentRound: 1
  });

  const [showRules, setShowRules] = React.useState(false);
  const [showHistory, setShowHistory] = React.useState(false);
  const [showResetConfirm, setShowResetConfirm] = React.useState(false);

  const startGame = (mode: GameMode, count: PlayerCount, rounds: number) => {
    const players: Player[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      name: count === 1 ? 'Jugador 1' : `Jugador ${i + 1}`,
      score: mode === '301' ? 301 : 0,
      history: []
    }));

    setState({
      mode,
      playerCount: count,
      players,
      currentPlayerIndex: 0,
      status: 'playing',
      winner: null,
      currentTurnDarts: [],
      maxRounds: rounds,
      currentRound: 1
    });
  };

  const addDart = (score: number) => {
    if (state.currentTurnDarts.length >= 3) return;
    setState(prev => ({
      ...prev,
      currentTurnDarts: [...prev.currentTurnDarts, score]
    }));
  };

  const undoDart = () => {
    setState(prev => ({
      ...prev,
      currentTurnDarts: prev.currentTurnDarts.slice(0, -1)
    }));
  };

  const confirmTurn = () => {
    const turnTotal = state.currentTurnDarts.reduce((a, b) => a + b, 0);
    const currentPlayer = state.players[state.currentPlayerIndex];
    
    let updatedPlayer = { ...currentPlayer };
    updatedPlayer.history = [...currentPlayer.history, state.currentTurnDarts];

    if (state.mode === '301') {
      const newScore = currentPlayer.score - turnTotal;
      if (newScore < 0) {
        // Bust - score remains same
      } else if (newScore === 0) {
        // Win
        updatedPlayer.score = 0;
        setState(prev => ({
          ...prev,
          players: prev.players.map(p => p.id === currentPlayer.id ? updatedPlayer : p),
          status: 'finished',
          winner: updatedPlayer
        }));
        return;
      } else {
        updatedPlayer.score = newScore;
      }
    } else {
      // High Score mode
      updatedPlayer.score = currentPlayer.score + turnTotal;
    }

    const isLastPlayer = state.currentPlayerIndex === state.playerCount - 1;
    const nextPlayerIndex = isLastPlayer ? 0 : state.currentPlayerIndex + 1;
    const nextRound = isLastPlayer ? state.currentRound + 1 : state.currentRound;

    if (state.mode === 'High Score' && isLastPlayer && state.currentRound === state.maxRounds) {
      // End of High Score game
      const allPlayers = state.players.map(p => p.id === currentPlayer.id ? updatedPlayer : p);
      const winner = [...allPlayers].sort((a, b) => b.score - a.score)[0];
      
      setState(prev => ({
        ...prev,
        players: allPlayers,
        status: 'finished',
        winner
      }));
      return;
    }

    setState(prev => ({
      ...prev,
      players: prev.players.map(p => p.id === currentPlayer.id ? updatedPlayer : p),
      currentPlayerIndex: nextPlayerIndex,
      currentRound: nextRound,
      currentTurnDarts: []
    }));
  };

  const resetGame = () => {
    setState(prev => ({ ...prev, status: 'setup', winner: null }));
    setShowResetConfirm(false);
  };

  return (
    <div className="min-h-screen flex flex-col max-w-lg mx-auto relative">
      <AnimatePresence>
        {state.status === 'setup' && (
          <Setup onStart={startGame} onShowRules={() => setShowRules(true)} />
        )}

        {state.status === 'playing' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col"
          >
            <header className="p-6 flex items-center justify-between">
              <button onClick={() => setShowResetConfirm(true)} className="p-2 text-[var(--color-gold)] opacity-60 hover:opacity-100 transition-opacity">
                <Settings className="w-6 h-6" />
              </button>
              <div className="text-center">
                <div className="px-4 py-1 rounded-full border border-[var(--color-gold)]/30 bg-[var(--color-wood-mid)]/50">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">
                    {state.mode === 'High Score' ? `Ronda ${state.currentRound}/${state.maxRounds}` : `Modo ${state.mode}`}
                  </span>
                </div>
              </div>
              <button onClick={() => setShowHistory(!showHistory)} className="p-2 text-[var(--color-gold)] opacity-60 hover:opacity-100 transition-opacity">
                <HistoryIcon className="w-6 h-6" />
              </button>
            </header>

            <main className="flex-1 overflow-y-auto">
              <ScoreBoard 
                players={state.players} 
                currentPlayerIndex={state.currentPlayerIndex}
                currentDarts={state.currentTurnDarts}
              />

              {showHistory && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="px-4 pb-4"
                >
                  <div className="bg-[var(--color-wood-mid)] rounded-2xl p-5 border border-[var(--color-wood-grain)] shadow-lg">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-gold)] mb-4 border-b border-[var(--color-wood-grain)] pb-2">Historial Reciente</h3>
                    <div className="space-y-3">
                      {state.players[state.currentPlayerIndex].history.slice(-3).reverse().map((turn, i) => (
                        <div key={i} className="flex justify-between items-center text-sm">
                          <span className="text-[var(--color-gold)]/60 font-serif italic">Turno {state.players[state.currentPlayerIndex].history.length - i}</span>
                          <div className="flex gap-3">
                            {turn.map((d, j) => <span key={j} className="text-[var(--color-cream)]/70 font-bold">{d}</span>)}
                            <span className="font-serif font-bold text-[var(--color-gold)] ml-2 border-l border-[var(--color-wood-grain)] pl-3">{turn.reduce((a, b) => a + b, 0)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </main>

            <Keypad 
              onAddDart={addDart}
              onUndoDart={undoDart}
              onConfirmTurn={confirmTurn}
              currentDarts={state.currentTurnDarts}
              canConfirm={state.currentTurnDarts.length > 0}
            />
          </motion.div>
        )}

        {state.status === 'finished' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl"
          >
            <div className="text-center space-y-8">
              <div className="relative inline-block">
                <Trophy className="w-32 h-32 text-[var(--color-gold)] mx-auto drop-shadow-[0_0_30px_rgba(197,160,89,0.5)]" />
                <motion.div 
                  animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute inset-0 bg-[var(--color-gold)] blur-3xl -z-10"
                />
              </div>
              <div className="space-y-3">
                <h2 className="text-5xl font-serif font-bold text-[var(--color-gold)] uppercase tracking-tighter">¡Victoria!</h2>
                <p className="text-[var(--color-cream)] text-2xl font-light italic">{state.winner?.name} ha ganado</p>
              </div>
              <button
                onClick={resetGame}
                className="px-10 py-5 bg-[var(--color-gold)] text-[var(--color-wood-dark)] rounded-2xl font-bold text-xl flex items-center gap-3 mx-auto hover:scale-105 transition-transform shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
              >
                <RotateCcw className="w-6 h-6" />
                Jugar de nuevo
              </button>
            </div>
          </motion.div>
        )}

        {showResetConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[var(--color-wood-dark)] border-2 border-[var(--color-wood-grain)] rounded-[40px] p-8 w-full max-w-sm space-y-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-center"
            >
              <div className="bg-[var(--color-wood-mid)] w-20 h-20 rounded-full flex items-center justify-center mx-auto border-2 border-[var(--color-gold)]/20 shadow-inner">
                <RotateCcw className="w-10 h-10 text-[var(--color-gold)]" />
              </div>

              <div className="space-y-2">
                <h3 className="text-[var(--color-gold)] font-serif font-bold text-2xl uppercase tracking-tight">¿Reiniciar partida?</h3>
                <p className="text-[var(--color-gold)]/50 text-sm">Perderás todo el progreso de la partida actual.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="py-4 bg-[var(--color-wood-mid)] text-[var(--color-gold)] rounded-2xl font-bold text-xs uppercase tracking-widest border-2 border-[var(--color-wood-grain)] transition-all active:scale-95"
                >
                  Cancelar
                </button>
                <button
                  onClick={resetGame}
                  className="py-4 bg-[var(--color-felt-green)] text-[var(--color-cream)] rounded-2xl font-bold text-xs uppercase tracking-widest border border-[var(--color-gold)]/30 shadow-lg transition-all active:scale-95"
                >
                  Reiniciar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showRules && <Rules onClose={() => setShowRules(false)} />}
      </AnimatePresence>
    </div>
  );
}
