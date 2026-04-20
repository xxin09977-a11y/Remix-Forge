import React, { useMemo, useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { format, startOfWeek, subDays, startOfDay, eachDayOfInterval, isBefore, isAfter, isToday } from 'date-fns';
import { StreakData, DayRecord } from '../types';
import { haptics } from '../utils/haptics';

interface StatsModalProps {
  data: StreakData;
  reactiveStreak: number;
  onClose: () => void;
  onToggleDate: (date: string) => void;
  onUpdateNote: (date: string, note: string) => void;
}

export function StatsModal({ data, reactiveStreak, onClose, onToggleDate, onUpdateNote }: StatsModalProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Push state and register as active modal
    (window as any).__modalActiveCount = ((window as any).__modalActiveCount || 0) + 1;
    window.history.pushState({ modal: 'stats' }, '', null);

    const handlePopState = () => {
      onClose();
    };

    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
      // Wait slightly so any globally attached popstate listeners (App root) can ignore this pop
      setTimeout(() => {
        (window as any).__modalActiveCount = Math.max(0, ((window as any).__modalActiveCount || 1) - 1);
      }, 50);
    };
  }, [onClose]);

  const handleClose = () => {
    haptics.light();
    // Trigger popstate safely to unmount using standard browser history
    window.history.back();
  };

  const stats = useMemo(() => {
    let clean = 0;
    let relapse = 0;
    let longestStreak = 0;
    let currentStreakCount = 0;
    
    const startStr = format(new Date(data.startDate), 'yyyy-MM-dd');
    
    // Sort all dates and only consider days starting from the commencement date
    const dates = Object.keys(data.history)
      .sort()
      .filter(d => d >= startStr);
    
    for (const d of dates) {
      const entry = data.history[d];
      const status = typeof entry === 'object' ? entry.status : entry;
      
      if (status === 'clean' || status === 'done') {
        clean++;
        currentStreakCount++;
        if (currentStreakCount > longestStreak) {
          longestStreak = currentStreakCount;
        }
      } else if (status === 'relapse') {
        relapse++;
        currentStreakCount = 0;
      }
    }
    
    return {
      currentStreak: reactiveStreak,
      longestStreak: Math.max(longestStreak, reactiveStreak),
      totalClean: clean,
      totalRelapse: relapse
    };
  }, [data.history, data.startDate, reactiveStreak]);

  const weeksProps = useMemo(() => {
    const todayInner = new Date();
    const startOfTodayInner = startOfDay(todayInner);
    const parsedStartDateInner = startOfDay(new Date(data.startDate));

    let graphStart = startOfWeek(subDays(startOfTodayInner, 180), { weekStartsOn: 1 });
    if (isBefore(parsedStartDateInner, graphStart)) {
      graphStart = startOfWeek(parsedStartDateInner, { weekStartsOn: 1 });
    }
    
    // Max constraint explicitly avoiding ultra-massive DOM arrays
    const earliestAllowed = startOfWeek(subDays(startOfTodayInner, 365), { weekStartsOn: 1 });
    if (isBefore(graphStart, earliestAllowed)) {
      graphStart = earliestAllowed;
    }

    const daysInterval = eachDayOfInterval({ start: graphStart, end: startOfTodayInner });
    const weeks: Date[][] = [];
    let currentWeek: Date[] = [];
    
    daysInterval.forEach(day => {
      currentWeek.push(day);
      if (currentWeek.length === 7 || day.getTime() === startOfTodayInner.getTime()) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    });

    const result = weeks.map(week => ({ week, showMonth: false, monthLabel: '' }));
    let lastMonth = -1;
    for (const wp of result) {
      // Use middle day of the week chunk for month assignments cleanly
      const midDay = wp.week[Math.floor(wp.week.length / 2)];
      if (midDay.getMonth() !== lastMonth) {
        wp.showMonth = true;
        wp.monthLabel = format(midDay, 'MMM');
        lastMonth = midDay.getMonth();
      }
    }
    return result;
  }, [data.startDate]);

  // Hook into initial render setup logic to scroll fully to the right (latest weeks)
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [weeksProps]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-bg/95 flex flex-col pt-[calc(3rem+env(safe-area-inset-top))] overflow-hidden transition-colors duration-500 backdrop-blur-sm"
    >
      <div className="px-6 flex justify-between items-center mb-8 flex-shrink-0">
        <h2 className="text-xl font-black tracking-widest text-accent uppercase accent-glow">STATS & LOGS</h2>
        <button onClick={handleClose} className="p-2 glass rounded-full accent-border-glow">
          <X size={20} className="text-subtext" />
        </button>
      </div>

      <div className="overflow-y-auto no-scrollbar px-6 pb-20 space-y-8 flex-1">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2">
          <StatBox label="Current Streak" value={stats.currentStreak} />
          <StatBox label="Longest Streak" value={stats.longestStreak} />
          <StatBox label="Clean Days" value={stats.totalClean} />
          <StatBox label="Relapses" value={stats.totalRelapse} />
        </div>

        {/* Contribution Graph Layout */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-black tracking-widest text-subtext uppercase">
            Historical Log
          </h3>
          
          <div className="glass rounded-3xl p-4 accent-border-glow flex flex-col relative before:absolute before:inset-0 before:-z-10 before:rounded-3xl before:bg-grid-white/[0.02]">
            <div className="flex">
              {/* Y-axis Day Initial Labels */}
              <div className="flex flex-col gap-[2px] mr-2 pt-[22px] shrink-0">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                  <div key={i} className="h-7 flex items-center justify-center text-[10px] text-subtext/70 font-bold w-4">
                    {d}
                  </div>
                ))}
              </div>

              {/* Grid Canvas */}
              <div 
                ref={scrollRef}
                className="flex gap-[2px] overflow-x-auto no-scrollbar pb-2 pr-6 scroll-smooth"
              >
                {weeksProps.map((wp, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-[2px] min-w-[28px]">
                    {/* X-axis Monthly Labels */}
                    <div className="h-4 flex flex-col justify-end text-[9px] text-subtext font-black tracking-wider uppercase mb-1 pl-0.5">
                      {wp.showMonth ? wp.monthLabel : ''}
                    </div>
                    
                    {/* Vertical Day Cells (Mon->Sun) */}
                    {wp.week.map((day, dIdx) => {
                      const dateKey = format(day, 'yyyy-MM-dd');
                      const entry = data.history[dateKey];
                      const status = typeof entry === 'object' ? entry.status : (entry || 'empty');
                      
                      const parsedStartDateInner = startOfDay(new Date(data.startDate));
                      const isFuture = isAfter(startOfDay(day), startOfDay(new Date()));
                      const isBeforeStart = isBefore(startOfDay(day), parsedStartDateInner);
                      const isT = isToday(day);

                      const canEdit = isEditMode && !isFuture && !isBeforeStart;
                      const dayNum = format(day, 'd');

                      let bgClass = "";
                      let textClass = "";

                      if (isFuture || isBeforeStart) {
                        bgClass = "bg-text/5"; // Very faint
                        textClass = "text-text/20 font-medium"; // Dim but visible number
                      } else if (status === 'clean' || status === 'done') {
                        bgClass = "bg-green-500 shadow-sm";
                        textClass = "text-white font-bold";
                      } else if (status === 'relapse') {
                        bgClass = "bg-red-500 shadow-sm";
                        textClass = "text-white font-bold";
                      } else {
                        bgClass = "bg-text/10"; // Semi-transparent based on theme text color
                        textClass = "text-text/50 font-bold"; // Highly visible number
                      }

                      // Special overlay border explicitly isolating "Today"
                      const borderClass = isT ? "ring-2 ring-text ring-offset-2 ring-offset-bg z-10" : "";
                      if (isT && bgClass === "bg-text/10") textClass = "text-text font-bold"; // Ensure today's number pops if empty

                      const interactiveClass = canEdit ? "cursor-pointer hover:scale-95 active:scale-90" : "cursor-default";

                      return (
                        <div 
                          key={dIdx}
                          onClick={() => { 
                            if(canEdit) {
                              haptics.light();
                              onToggleDate(dateKey); 
                            }
                          }}
                          className={`w-7 h-7 rounded-[4px] transition-all duration-300 shrink-0 relative flex items-center justify-center text-[9px] ${bgClass} ${borderClass} ${interactiveClass}`}
                        >
                          <span className={`${textClass} pointer-events-none select-none`}>{dayNum}</span>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => {
              haptics.medium();
              setIsEditMode(!isEditMode);
            }}
            className={`w-full py-3 rounded-xl font-black text-xs tracking-[0.2em] transition-all duration-500 btn-inner-glow uppercase mt-2 ${
              isEditMode 
                ? 'bg-accent text-bg shadow-[0_5px_15px_var(--accent-glow)] scale-[0.98]' 
                : 'glass text-text'
            }`}
          >
            {isEditMode ? 'Done Editing' : 'Edit Logs'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function StatBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="glass rounded-xl p-3 flex flex-col items-center justify-center text-center accent-border-glow btn-inner-glow">
      <span className="text-2xl font-black text-accent accent-glow mb-0.5">{value}</span>
      <span className="text-[9px] uppercase tracking-widest text-subtext font-bold leading-tight">{label}</span>
    </div>
  );
}
