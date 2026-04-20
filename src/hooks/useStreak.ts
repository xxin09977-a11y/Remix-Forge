import { useState, useEffect, useMemo } from 'react';
import { StreakData } from '../types';
import { format, subDays, isToday } from 'date-fns';

export function useStreak() {
  const [data, setData] = useState<StreakData>(() => {
    const saved = localStorage.getItem('forge_streak_data');
    if (saved) return JSON.parse(saved);
    return {
      startDate: new Date().toISOString(),
      history: {},
      lastCheckIn: null,
    };
  });

  const reactiveStreak = useMemo(() => {
    let count = 0;
    let current = new Date();
    current.setHours(0, 0, 0, 0);
    
    const startObj = new Date(data.startDate);
    startObj.setHours(0, 0, 0, 0);
    
    while (true) {
      if (current < startObj) break;

      const dStr = format(current, 'yyyy-MM-dd');
      const entry = data.history[dStr];
      const entryStatus = typeof entry === 'object' ? entry.status : entry;
      
      if (entryStatus === 'clean' || entryStatus === 'done') {
        count++;
        current = subDays(current, 1);
      } else if (isToday(current)) {
        if (entryStatus === 'relapse') break;
        current = subDays(current, 1);
      } else {
        break;
      }
    }
    return count;
  }, [data.history, data.startDate]);

  useEffect(() => {
    localStorage.setItem('forge_streak_data', JSON.stringify(data));
  }, [data]);

  const resetStreak = (newDate?: string) => {
    setData({
      startDate: newDate || new Date().toISOString(),
      history: {},
      lastCheckIn: null,
    });
  };

  const toggleDateStatus = (date: string) => {
    setData(prev => {
      const currentStatus = typeof prev.history[date] === 'object' ? (prev.history[date] as any).status : prev.history[date];
      const currentNote = typeof prev.history[date] === 'object' ? (prev.history[date] as any).note : '';
      const newHistory = { ...prev.history };
      
      if (!currentStatus || currentStatus === 'empty') {
        newHistory[date] = { status: 'done', note: currentNote };
      } else if (currentStatus === 'clean' || currentStatus === 'done') {
        newHistory[date] = { status: 'relapse', note: currentNote };
      } else {
        delete newHistory[date];
      }

      return {
        ...prev,
        history: newHistory,
        lastCheckIn: date === new Date().toISOString().split('T')[0] ? date : prev.lastCheckIn
      };
    });
  };

  const setDateEmpty = (date: string) => {
    setData(prev => {
      const newHistory = { ...prev.history };
      // Instead of completely deleting, we might want to keep the note if one exists
      if (typeof prev.history[date] === 'object') {
        newHistory[date] = { status: 'empty', note: (prev.history[date] as any).note };
      } else {
        delete newHistory[date];
      }
      return { ...prev, history: newHistory };
    });
  };

  const checkIn = (date: string, status: 'clean' | 'relapse') => {
    setData(prev => {
      const existingNote = typeof prev.history[date] === 'object' ? (prev.history[date] as any).note : '';
      return {
        ...prev,
        lastCheckIn: date,
        history: {
          ...prev.history,
          [date]: { status, note: existingNote },
        },
      };
    });
  };

  const setDayNote = (date: string, note: string) => {
    setData(prev => {
      const status = typeof prev.history[date] === 'object' ? (prev.history[date] as any).status : prev.history[date];
      return {
        ...prev,
        history: {
          ...prev.history,
          [date]: { status: status || 'empty', note }
        }
      };
    });
  };

  const updateStartDate = (date: string) => {
    setData(prev => ({
      ...prev,
      startDate: date,
    }));
  };

  return { data, checkIn, resetStreak, updateStartDate, toggleDateStatus, setDateEmpty, setDayNote, reactiveStreak };
}
