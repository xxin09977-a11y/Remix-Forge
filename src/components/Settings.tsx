import { useState } from 'react';
import { motion } from 'motion/react';
import { RefreshCcw, Calendar as CalendarIcon, Moon, Info, ShieldCheck, Wind, Timer, Thermometer, Type } from 'lucide-react';
import { format } from 'date-fns';
import { StreakData, AppTheme } from '../types';
import { useLanguage } from '../hooks/useLanguage';
import { useTheme } from '../hooks/useTheme';
import { useUrgeSettings } from '../hooks/useUrgeSettings';
import { useFontSize } from '../hooks/useFontSize';
import { T, COLORS } from '../constants';
import { haptics } from '../utils/haptics';

interface SettingsProps {
  data: StreakData;
  onReset: (date?: string) => void;
  onUpdateStart: (date: string) => void;
}

export function SettingsView({ data, onReset, onUpdateStart }: SettingsProps) {
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { fontSize, setFontSize } = useFontSize();
  const { settings: urgeSettings, updateSettings: setUrgeSettings } = useUrgeSettings();
  const [showConfirm, setShowConfirm] = useState(false);

  const THEMES: { id: AppTheme; name: string; color: string }[] = [
    { id: 'obsidian', name: 'OBSIDIAN', color: '#c9a84c' },
    { id: 'midnight', name: 'MIDNIGHT', color: '#3b82f6' },
    { id: 'crimson', name: 'CRIMSON', color: '#dc2626' },
    { id: 'emerald', name: 'EMERALD', color: '#10b981' },
    { id: 'phantom', name: 'PHANTOM', color: '#a855f7' },
    { id: 'arctic', name: 'ARCTIC', color: '#3b82f6' },
    { id: 'parchment', name: 'PARCHMENT', color: '#b8983d' },
  ];

  const handleReset = () => {
    haptics.heavy();
    onReset();
    setShowConfirm(false);
  };

  return (
    <div className="flex flex-col h-full px-6 pt-16 pb-24 space-y-8 overflow-y-auto no-scrollbar bg-bg text-text">
      <h2 className="text-xl font-black tracking-[0.2em] uppercase text-text mb-2">{T.SETTINGS[language]}</h2>

      {/* Theme Presets - Horizontal Scrollable Row */}
      <div className="space-y-4">
        <label className="text-[10px] font-black tracking-widest text-subtext uppercase">Premium Themes</label>
        <div className="flex space-x-4 overflow-x-auto no-scrollbar pb-2 mask-linear-r">
          {THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                haptics.light();
                setTheme(t.id);
              }}
              className="flex-shrink-0 flex flex-col items-center space-y-2 group"
            >
              <div 
                className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300 relative ${
                  theme === t.id ? 'border-accent accent-border-glow shadow-[0_0_15px_var(--accent-glow)]' : 'border-border'
                }`}
                style={{ backgroundColor: t.id === 'obsidian' ? '#0a0a0a' : 
                                       t.id === 'midnight' ? '#0a0f1e' : 
                                       t.id === 'crimson' ? '#0a0a0a' : 
                                       t.id === 'emerald' ? '#0a0a0a' : 
                                       t.id === 'phantom' ? '#1a0a2e' : 
                                       t.id === 'arctic' ? '#fafafa' : '#fdf6e3' }}
              >
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: t.color }}
                />
                {theme === t.id && (
                  <motion.div 
                    layoutId="theme-check"
                    className="absolute inset-0 flex items-center justify-center bg-accent/20 rounded-full"
                  >
                    <ShieldCheck size={16} className="text-accent accent-glow" />
                  </motion.div>
                )}
              </div>
              <span className={`text-[8px] font-black tracking-wider transition-colors duration-300 ${
                theme === t.id ? 'text-accent accent-glow' : 'text-subtext'
              }`}>
                {t.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Language Toggle */}
      <div className="space-y-4">
        <label className="text-[10px] font-black tracking-widest text-subtext uppercase">{T.LANGUAGE[language]}</label>
        <div className="flex p-1 glass rounded-2xl accent-border-glow">
          <button
            onClick={() => {
              if (language !== 'en') haptics.light();
              setLanguage('en');
            }}
            className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-500 ${
              language === 'en' ? 'bg-accent text-bg shadow-[0_0_15px_var(--accent-glow)]' : 'text-subtext'
            }`}
          >
            English
          </button>
          <button
            onClick={() => {
              if (language !== 'mm') haptics.light();
              setLanguage('mm');
            }}
            className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-500 ${
              language === 'mm' ? 'bg-accent text-bg shadow-[0_0_15px_var(--accent-glow)]' : 'text-subtext'
            }`}
          >
            မြန်မာ
          </button>
        </div>
      </div>

      {/* Font Size Setup */}
      <div className="space-y-4 border-t border-border pt-4">
        <div className="flex justify-between items-center mb-2">
          <label className="text-[10px] font-black tracking-widest text-subtext uppercase">Typography Scale</label>
          <Type size={14} className="text-accent accent-glow" />
        </div>
        <div className="flex p-1 glass rounded-2xl accent-border-glow">
          {(['small', 'normal', 'large', 'xlarge'] as const).map(size => (
            <button
              key={size}
              onClick={() => {
                if (fontSize !== size) haptics.light();
                setFontSize(size);
              }}
              className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
                fontSize === size ? 'bg-accent text-bg shadow-[0_0_15px_var(--accent-glow)]' : 'text-subtext'
              }`}
            >
              {size === 'small' ? 'SM' : size === 'normal' ? 'MD' : size === 'large' ? 'LG' : 'XL'}
            </button>
          ))}
        </div>
      </div>

      {/* Date Picker Section */}
      <div className="space-y-4">
        <label className="text-[10px] font-black tracking-widest text-subtext uppercase">{T.START_DATE[language]}</label>
        <div className="relative group">
          <CalendarIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-accent opacity-50 accent-glow" />
          <input
            type="date"
            value={format(new Date(data.startDate), 'yyyy-MM-dd')}
            onChange={(e) => onUpdateStart(new Date(e.target.value).toISOString())}
            className="w-full glass rounded-2xl py-4 pl-12 pr-4 text-sm font-medium text-text focus:outline-none focus:border-accent transition-all appearance-none accent-border-glow"
          />
        </div>
      </div>

      {/* Urge Relief Settings */}
      <div className="space-y-6 pt-4 border-t border-border">
        <label className="text-[10px] font-black tracking-widest text-subtext uppercase">Urge Relief Setup</label>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 text-subtext">
              <Wind size={16} />
              <span className="text-xs font-bold uppercase tracking-widest">Breathing</span>
            </div>
            <span className="text-xs font-black text-accent accent-glow">{urgeSettings.breathingDuration} MIN</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={urgeSettings.breathingDuration}
            onChange={(e) => setUrgeSettings({ breathingDuration: parseInt(e.target.value) })}
            className="w-full accent-accent h-1 bg-border rounded-lg appearance-none outline-none"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 text-subtext">
              <Thermometer size={16} />
              <span className="text-xs font-bold uppercase tracking-widest">Shower Target Temp</span>
            </div>
            <span className="text-xs font-black text-accent accent-glow">{urgeSettings.showerTemperature}°C</span>
          </div>
          <input
            type="range"
            min="5"
            max="25"
            step="1"
            value={urgeSettings.showerTemperature}
            onChange={(e) => setUrgeSettings({ showerTemperature: parseInt(e.target.value) })}
            className="w-full accent-accent h-1 bg-border rounded-lg appearance-none outline-none"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 text-subtext">
              <Timer size={16} />
              <span className="text-xs font-bold uppercase tracking-widest">Shower Duration</span>
            </div>
            <span className="text-xs font-black text-accent accent-glow">{urgeSettings.showerDuration} MIN</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={urgeSettings.showerDuration}
            onChange={(e) => setUrgeSettings({ showerDuration: parseInt(e.target.value) })}
            className="w-full accent-accent h-1 bg-border rounded-lg appearance-none outline-none"
          />
        </div>
      </div>

      {/* Reset Section */}
      <div className="space-y-4">
        <label className="text-[10px] font-black tracking-widest text-subtext uppercase">Purge & Restart</label>
        {!showConfirm ? (
          <button
            onClick={() => {
              haptics.warning();
              setShowConfirm(true);
            }}
            className="w-full flex items-center justify-between p-4 glass rounded-2xl group active:bg-red-500/10 transition-colors btn-inner-glow accent-border-glow"
          >
            <div className="flex items-center space-x-3 text-red-500">
              <RefreshCcw size={20} />
              <span className="text-sm font-bold">{T.RESET[language]}</span>
            </div>
            <span className="text-[10px] font-black tracking-widest text-red-500/50 uppercase">Extinguish</span>
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleReset}
              className="flex-1 py-4 bg-red-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-[0_5px_15px_rgba(220,38,38,0.3)] btn-inner-glow"
            >
              {T.CONFIRM[language]}
            </button>
            <button
              onClick={() => {
                haptics.light();
                setShowConfirm(false);
              }}
              className="flex-1 py-4 glass text-subtext rounded-2xl text-xs font-black uppercase tracking-widest accent-border-glow btn-inner-glow"
            >
              {T.CANCEL[language]}
            </button>
          </div>
        )}
      </div>

      {/* About */}
      <div className="mt-auto space-y-4 pt-8 text-center opacity-40">
        <div className="flex justify-center items-center space-x-2 mb-4">
          <ShieldCheck size={16} className="text-accent accent-glow" />
          <span className="text-[10px] font-black tracking-[0.3em] uppercase accent-glow">Forged Offline</span>
        </div>
        <div className="text-[9px] font-black tracking-widest text-subtext uppercase">
          App Version 1.1.0 "Glass Premium"
        </div>
        <div className="text-[8px] font-medium text-subtext/70 max-w-[200px] mx-auto leading-relaxed">
          Your path is private. No data ever leaves this device. Forge your future in silence.
        </div>
      </div>
    </div>
  );
}
