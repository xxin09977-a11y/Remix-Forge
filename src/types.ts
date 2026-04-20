export interface BenefitStage {
  days: number;
  label: string;
  description: string;
  icon: string;
}

export type Language = 'en' | 'mm';

export interface Translation {
  [key: string]: {
    en: string;
    mm: string;
  };
}

export interface Quote {
  text: { en: string; mm: string };
  author: string;
}

export interface DayRecord {
  status: 'empty' | 'done' | 'clean' | 'relapse';
  note: string;
}

export interface UrgeSettings {
  breathingDuration: number; // in minutes
  showerTemperature: number; // in celsius
  showerDuration: number; // in minutes
}

export interface StreakData {
  startDate: string; // ISO string
  history: Record<string, 'clean' | 'relapse' | DayRecord>;
  lastCheckIn: string | null; // Date string YYYY-MM-DD
}

export type Tab = 'home' | 'wisdom' | 'settings';

export type AppTheme = 'obsidian' | 'midnight' | 'crimson' | 'emerald' | 'phantom' | 'arctic' | 'parchment';
