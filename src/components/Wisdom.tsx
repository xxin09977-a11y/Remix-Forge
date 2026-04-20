import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote as QuoteIcon, ChevronRight } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { QUOTES, COLORS, BENEFITS, T } from '../constants';
import { differenceInDays } from 'date-fns';
import { StreakData } from '../types';

interface WisdomProps {
  data: StreakData;
  reactiveStreak: number;
}

export function WisdomView({ data, reactiveStreak }: WisdomProps) {
  const { language } = useLanguage();
  const streak = reactiveStreak;
  // Use today's date hash to get a consistent quote of the day
  const todayIndex = useMemo(() => {
    const daysSinceEpoch = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
    return daysSinceEpoch % QUOTES.length;
  }, []);

  const [currentIndex, setCurrentIndex] = useState(todayIndex);

  const nextQuote = () => {
    setCurrentIndex((prev) => (prev + 1) % QUOTES.length);
  };

  const quote = currentIndex < QUOTES.length ? QUOTES[currentIndex] : QUOTES[0];

  const currentBenefits = BENEFITS[language];

  return (
    <div className="flex flex-col h-full pt-16 pb-24 text-center overflow-y-auto no-scrollbar bg-bg text-text">
      <div className="px-6">
        <div className="mb-10 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20 accent-border-glow">
            <QuoteIcon size={32} className="text-accent" />
          </div>
        </div>

        <div className="min-h-[250px] flex flex-col justify-center items-center relative mb-12">
          <AnimatePresence mode="wait">
            {quote && (
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                className="w-full"
              >
                <p className={`text-xl md:text-2xl font-serif font-light leading-relaxed text-text/90 mb-6 ${language === 'my' ? '' : 'italic'}`}>
                  "{quote.text[language]}"
                </p>
                <div className="flex justify-center items-center space-x-2">
                  <div className="w-8 h-px bg-accent/30" />
                  <span className="text-[10px] font-black tracking-widest text-accent uppercase accent-glow">
                    {quote.author}
                  </span>
                  <div className="w-8 h-px bg-accent/30" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={nextQuote}
          className="flex items-center justify-center space-x-2 w-full py-4 glass rounded-2xl text-[10px] font-black tracking-[0.3em] text-subtext hover:text-accent hover:border-accent/50 transition-all duration-300 uppercase mb-16 btn-inner-glow"
        >
          <span>{T.NEXT_REVELATION[language]}</span>
          <ChevronRight size={14} />
        </motion.button>
      </div>

      {/* Benefits Section */}
      <div className="text-left px-6 mb-8">
        <h3 className="text-sm font-black tracking-[0.3em] text-accent uppercase mb-6 flex items-center accent-glow">
          <span className="w-8 h-px bg-accent/30 mr-3" />
          {T.BENEFITS[language]}
        </h3>

        <div className="flex flex-col space-y-4">
          {currentBenefits.map((benefit, idx) => {
            const isUnlocked = streak >= benefit.days;
            const isNext = !isUnlocked && (idx === 0 || streak >= currentBenefits[idx - 1].days);
            
            return (
              <motion.div
                key={benefit.label}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`p-5 rounded-2xl transition-all duration-500 glass ${
                  isUnlocked 
                    ? 'border-accent/40 accent-border-glow' 
                    : 'opacity-40'
                } ${isNext ? 'border-subtext opacity-80' : ''}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{benefit.icon}</span>
                    <span className={`text-xs font-black tracking-widest uppercase ${isUnlocked ? 'text-accent accent-glow' : 'text-subtext'}`}>
                      {benefit.label}
                    </span>
                  </div>
                  {isUnlocked && <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_var(--accent-glow)]" />}
                </div>
                <p className={`text-sm leading-relaxed ${isUnlocked ? 'text-text' : 'text-subtext'}`}>
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
