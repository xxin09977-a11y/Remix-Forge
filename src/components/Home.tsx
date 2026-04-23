import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Zap } from 'lucide-react';
import { format, isToday, subDays } from 'date-fns';
import { Calendar } from './Calendar';
import { StatsModal } from './StatsModal';
import { StreakData } from '../types';
import { useLanguage } from '../hooks/useLanguage';
import { T, COLORS } from '../constants';
import confetti from 'canvas-confetti';
import { haptics } from '../utils/haptics';

interface HomeProps {
  data: StreakData;
  reactiveStreak: number;
  onCheckIn: (status: 'clean' | 'relapse') => void;
  onUrgeHelp: () => void;
  onToggleDate: (date: string) => void;
  onLongPressDate: (date: string) => void;
  onUpdateNote: (date: string, note: string) => void;
}

export function HomeView({ data, reactiveStreak, onCheckIn, onUrgeHelp, onToggleDate, onLongPressDate, onUpdateNote }: HomeProps) {
  const { language } = useLanguage();
  const [showStats, setShowStats] = useState(false);
  
  const streak = reactiveStreak;

  const checkedInToday = data.history[format(new Date(), 'yyyy-MM-dd')] !== undefined;

  const milestones = [7, 30, 90, 365];

  const handleAction = () => {
    if (checkedInToday) return;

    onCheckIn('clean');

    if (milestones.includes(streak + 1)) {
      haptics.success();
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: [COLORS.gold, '#fff', '#ffd700'],
      });
    } else {
      haptics.medium();
    }
  };

  return (
    <div className="flex flex-col h-full px-4 pt-4 pb-4 bg-bg text-text overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-2 mt-2 px-2 flex-shrink-0">
        <h1 className="text-xl font-black tracking-[0.2em] text-text uppercase leading-none accent-glow">FORGE</h1>
        <button 
          onClick={() => {
            haptics.light();
            setShowStats(true);
          }}
          className="flex items-center space-x-1.5 bg-accent/10 px-2.5 py-1 rounded-full border border-accent/20 active:scale-95 transition-transform"
        >
          <Flame size={12} className="text-accent fill-accent" />
          <span className="text-sm font-black text-accent tracking-tight leading-none">
            {language === 'en' ? `DAY ${streak}` : `နေ့ ${streak}`}
          </span>
        </button>
      </div>

      {/* Calendar - BOUNDED HERO SECTION */}
      <div className="flex-1 min-h-0 flex items-center justify-center py-2 px-1 relative w-full overflow-hidden">
        <Calendar 
          startDate={data.startDate}
          history={data.history} 
          onToggleDate={onToggleDate}
          onLongPressDate={onLongPressDate}
        />
      </div>

      {/* Action Buttons Area */}
      <div className="flex flex-col space-y-2 mt-2 px-2 flex-shrink-0">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleAction}
          disabled={checkedInToday}
          className={`w-full py-3.5 rounded-xl font-black text-xs tracking-[0.2em] transition-all duration-500 btn-inner-glow ${
            checkedInToday
              ? 'glass text-subtext'
              : 'bg-green-500 text-white shadow-[0_5px_15px_rgba(34,197,94,0.4)]'
          }`}
        >
          {checkedInToday ? `${T.SEALED[language]} ✓` : T.CONQUERED[language]}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            haptics.heavy();
            onUrgeHelp();
          }}
          className="w-full py-3 bg-red-500/5 border border-red-500/20 text-red-500 rounded-xl flex items-center justify-center space-x-2 font-black text-[10px] tracking-[0.2em] uppercase transition-all duration-300 hover:bg-red-500/10 btn-inner-glow"
        >
          <Zap size={14} />
          <span>{T.URGE_HELP[language]}</span>
        </motion.button>
      </div>

      <AnimatePresence>
        {showStats && (
          <StatsModal 
            data={data} 
            reactiveStreak={reactiveStreak}
            onClose={() => setShowStats(false)} 
            onToggleDate={onToggleDate}
            onUpdateNote={onUpdateNote}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
