import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wind, Timer, Waves, X } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { useUrgeSettings } from '../hooks/useUrgeSettings';
import { T } from '../constants';
import { haptics } from '../utils/haptics';

interface UrgeReliefProps {
  onClose: () => void;
}

export function UrgeRelief({ onClose }: UrgeReliefProps) {
  const { language } = useLanguage();
  const [activeTool, setActiveTool] = useState<'breathing' | 'shower' | 'surfing'>('breathing');

  useEffect(() => {
    // Register as active modal
    (window as any).__modalActiveCount = ((window as any).__modalActiveCount || 0) + 1;
    window.history.pushState({ modal: 'urge' }, '', null);

    const handlePopState = () => {
      onClose();
    };

    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
      setTimeout(() => {
        (window as any).__modalActiveCount = Math.max(0, ((window as any).__modalActiveCount || 1) - 1);
      }, 50);
    };
  }, [onClose]);

  const handleClose = () => {
    haptics.light();
    window.history.back();
  };

  const tools = [
    { id: 'breathing', icon: Wind, label: T.BREATHING[language] },
    { id: 'shower', icon: Timer, label: T.COLD_SHOWER[language] },
    { id: 'surfing', icon: Waves, label: T.URGE_SURFING[language] },
  ] as const;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-bg flex flex-col pt-[calc(3rem+env(safe-area-inset-top))] transition-colors duration-500"
    >
      <div className="px-6 flex justify-between items-center mb-8">
        <h2 className="text-xl font-black tracking-widest text-accent uppercase accent-glow">{T.URGE_HELP[language]}</h2>
        <button onClick={handleClose} className="p-2 glass rounded-full accent-border-glow">
          <X size={20} className="text-subtext" />
        </button>
      </div>

      <div className="flex px-4 space-x-2 mb-8 overflow-x-auto no-scrollbar">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => {
              if (activeTool !== tool.id) haptics.light();
              setActiveTool(tool.id);
            }}
            className={`flex-shrink-0 flex items-center space-x-2 px-4 py-3 rounded-2xl transition-all duration-300 btn-inner-glow ${
              activeTool === tool.id ? 'bg-accent text-bg shadow-[0_0_15px_var(--accent-glow)]' : 'glass text-subtext'
            }`}
          >
            <tool.icon size={18} />
            <span className="text-[10px] font-black uppercase tracking-widest">{tool.label}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 px-6 pb-12 overflow-y-auto no-scrollbar relative w-full">
        <AnimatePresence mode="wait">
          {activeTool === 'breathing' && <BreathingTool key="breathing" />}
          {activeTool === 'shower' && <ShowerTool key="shower" />}
          {activeTool === 'surfing' && <SurfingTool key="surfing" />}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function BreathingTool() {
  const { language } = useLanguage();
  const { settings } = useUrgeSettings();
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [counter, setCounter] = useState(4);
  
  // Each cycle takes 12 seconds (4 inhale + 4 hold + 4 exhale). 
  // Target duration is settings.breathingDuration in minutes.
  const initialRepeats = Math.max(1, Math.floor((settings.breathingDuration * 60) / 12));
  const [repeats, setRepeats] = useState(initialRepeats);

  useEffect(() => {
    if (repeats === 0) return;

    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev === 1) {
          if (phase === 'inhale') {
            setPhase('hold');
            return 4;
          } else if (phase === 'hold') {
            setPhase('exhale');
            return 4;
          } else {
            setPhase('inhale');
            setRepeats((r) => r - 1);
            return 4;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase, repeats]);

  if (repeats === 0) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center min-h-full py-8">
        <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-6 accent-border-glow">
          <Wind size={40} className="text-accent accent-glow" />
        </div>
        <h3 className="text-2xl font-black text-center accent-glow">{T.STRENGTH_MSG[language]}</h3>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-full py-8">
      <motion.div
        animate={{
          scale: phase === 'inhale' ? 1.5 : phase === 'exhale' ? 0.8 : 1.5,
        }}
        transition={{ duration: 4, ease: 'easeInOut' }}
        className="w-40 h-40 rounded-full border-4 border-accent/30 flex items-center justify-center relative accent-border-glow"
      >
        <div className="absolute inset-0 rounded-full bg-accent/5 animate-pulse" />
        <span className="text-4xl font-black text-accent accent-glow">{counter}</span>
      </motion.div>
      <div className="mt-12 text-center">
        <h3 className="text-2xl font-black tracking-widest uppercase mb-2 accent-glow">
          {phase === 'inhale' ? T.INHALE[language] : phase === 'hold' ? T.HOLD[language] : T.EXHALE[language]}
        </h3>
        <p className="text-[10px] font-black text-subtext uppercase tracking-[0.3em]">
          {repeats} cycles remaining
        </p>
      </div>
    </div>
  );
}

function ShowerTool() {
  const { language } = useLanguage();
  const { settings } = useUrgeSettings();
  const [timeLeft, setTimeLeft] = useState(settings.showerDuration * 60);

  useEffect(() => {
    if (timeLeft === 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex flex-col items-center justify-center min-h-full py-8">
      <div className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-4 accent-glow">
        TARGET: {settings.showerTemperature}°C / {Math.round(settings.showerTemperature * 1.8 + 32)}°F
      </div>
      <h2 className="text-8xl font-black text-text accent-glow mb-8 tabular-nums">
        {minutes}:{seconds.toString().padStart(2, '0')}
      </h2>
      <div className="px-8 py-4 bg-accent text-bg rounded-2xl font-black text-lg tracking-widest mb-12 accent-border-glow">
        {T.COLD_SHOWER_MSG[language]}
      </div>
      <p className="text-subtext text-center max-w-xs leading-relaxed italic">
        "The water is cold because life is testing you. Step in and prove your will."
      </p>
    </div>
  );
}

function SurfingTool() {
  const { language } = useLanguage();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => (p < 100 ? p + 1 / 6 : 100)); // 10 minutes (600 seconds)
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const intensity = progress < 50 ? progress * 2 : (100 - progress) * 2;

  return (
    <div className="flex flex-col justify-center min-h-full py-8">
      <div className="p-8 glass rounded-3xl mb-12 relative overflow-hidden accent-border-glow">
        <div 
          className="absolute bottom-0 left-0 h-1 bg-accent transition-all duration-1000 accent-glow"
          style={{ width: `${progress}%` }}
        />
        <p className={`text-xl font-medium leading-relaxed text-text/90 text-center mb-4 ${language === 'my' ? '' : 'italic'}`}>
          {T.URGE_WAVE_MSG[language]}
        </p>
        <div className="flex justify-between items-center mt-8">
          <span className="text-[10px] font-black text-subtext uppercase">Low</span>
          <span className="text-[10px] font-black text-accent uppercase accent-glow">Peak Intensity</span>
          <span className="text-[10px] font-black text-subtext uppercase">Resolved</span>
        </div>
        <div className="w-full h-24 bg-bg rounded-xl mt-4 relative flex items-end px-4 space-x-1">
          {Array.from({ length: 20 }).map((_, i) => {
             const barIntensity = Math.max(10, (1 - Math.abs((i / 20 * 100) - intensity) / 100) * 100);
             // Determine which bar is currently active based on progress (0 to 100)
             const isActiveBar = Math.floor((progress / 100) * 20) === i;
             return (
               <div 
                 key={i} 
                 className={`flex-1 rounded-t-sm transition-all duration-500 ${isActiveBar ? 'bg-accent shadow-[0_0_10px_var(--accent-glow)]' : 'bg-accent/20'}`} 
                 style={{ height: `${barIntensity}%` }}
               />
             );
          })}
        </div>
      </div>
      <div className="space-y-4 text-center">
        <p className="text-sm font-bold text-subtext">Time elapsed: {Math.floor(progress * 6)} seconds</p>
        <p className="text-[10px] uppercase tracking-widest text-accent font-black accent-glow">Hold the line. This too shall pass.</p>
      </div>
    </div>
  );
}
