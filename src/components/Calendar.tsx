import { useMemo, useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isAfter, isBefore, subDays, startOfDay } from 'date-fns';
import { Check, X as XIcon, StickyNote } from 'lucide-react';
import { COLORS } from '../constants';
import { motion, AnimatePresence } from 'motion/react';
import { haptics } from '../utils/haptics';

import { DayRecord } from '../types';

interface CalendarProps {
  startDate: string;
  history: Record<string, 'clean' | 'relapse' | DayRecord>;
  onToggleDate: (date: string) => void;
  onLongPressDate: (date: string) => void;
}

export function Calendar({ startDate, history, onToggleDate, onLongPressDate }: CalendarProps) {
  const [hoveredNote, setHoveredNote] = useState<string | null>(null);
  const today = new Date();
  const start = startOfMonth(today);
  const end = endOfMonth(today);

  const parsedStartDate = useMemo(() => startOfDay(new Date(startDate)), [startDate]);

  const days = useMemo(() => {
    return eachDayOfInterval({ start, end });
  }, [start, end]);

  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className="w-full glass p-2 rounded-2xl accent-border-glow">
      <div className="flex justify-between items-center mb-2 px-2">
        <h3 className="text-[10px] uppercase tracking-[0.2em] text-subtext font-bold">
          {format(today, 'MMMM yyyy')}
        </h3>
      </div>

      <div className="grid grid-cols-7 gap-y-0.5 text-center justify-items-center">
        {weekDays.map((d, i) => (
          <div key={`${d}-${i}`} className="text-[9px] text-subtext font-black w-full text-center">
            {d}
          </div>
        ))}

        {days.map(day => {
          const dateStr = format(day, 'yyyy-MM-dd');
          const entry = history[dateStr];
          const status = typeof entry === 'object' ? entry.status : entry;
          const note = typeof entry === 'object' ? entry.note : null;
          const isT = isToday(day);
          const currentDayStart = startOfDay(day);
          
          const isFuture = isAfter(currentDayStart, startOfDay(today));
          const isBeforeStart = isBefore(currentDayStart, parsedStartDate);
          const isDisabled = isFuture || isBeforeStart;

          return (
            <motion.div
              key={dateStr}
              whileTap={!isDisabled ? { scale: 0.9 } : {}}
              onClick={() => {
                if (!isDisabled) {
                  haptics.light();
                  onToggleDate(dateStr);
                }
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                if (!isDisabled) {
                  haptics.medium();
                  onLongPressDate(dateStr);
                }
              }}
              onMouseEnter={() => note && setHoveredNote(note)}
              onMouseLeave={() => setHoveredNote(null)}
              className={`flex flex-col items-center justify-center relative py-0.5 transition-all duration-300 ${
                isDisabled ? (isBeforeStart ? 'opacity-20 cursor-default' : 'opacity-40 cursor-default') : 'cursor-pointer'
              }`}
            >
              <div 
                className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 relative overflow-hidden ${
                  isT ? 'border border-accent accent-border-glow' : ''
                }`}
              >
                {/* Background overlay for state */}
                {(status === 'clean' || status === 'done') && (
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/30 to-green-900/10" />
                )}
                {status === 'relapse' && (
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 to-red-900/10" />
                )}
                
                <span className={`text-[18px] font-bold z-10 ${
                  isT ? 'text-accent accent-glow' : 'text-text'
                }`}>
                  {format(day, 'd')}
                </span>
                
                {/* Note Indicator */}
                {note && (
                  <div className="absolute top-0.5 right-0.5 z-20">
                    <StickyNote size={8} className="text-accent accent-glow" />
                  </div>
                )}
              </div>
              
              {/* Tooltip */}
              {hoveredNote === note && note && (
                <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-full mb-2 z-50 glass px-3 py-1 rounded-lg text-[10px] text-text whitespace-nowrap"
                >
                    {note}
                </motion.div>
              )}
              
              {/* Status Dot */}
              <div className="h-1.5 mt-1 flex items-center justify-center">
                {(status === 'clean' || status === 'done') && (
                  <motion.div 
                    layoutId={`dot-${dateStr}`}
                    className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" 
                  />
                )}
                {status === 'relapse' && (
                  <motion.div 
                    layoutId={`dot-${dateStr}`}
                    className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" 
                  />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
