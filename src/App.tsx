/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStreak } from './hooks/useStreak';
import { LanguageProvider, useLanguage } from './hooks/useLanguage';
import { ThemeProvider, useTheme } from './hooks/useTheme';
import { FontSizeProvider } from './hooks/useFontSize';
import { Navigation } from './components/Navigation';
import { HomeView } from './components/Home';
import { WisdomView } from './components/Wisdom';
import { SettingsView } from './components/Settings';
import { UrgeRelief } from './components/UrgeRelief';
import { Tab } from './types';

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <FontSizeProvider>
          <AppContent />
        </FontSizeProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

function AppContent() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const { data, checkIn, resetStreak, updateStartDate, toggleDateStatus, setDateEmpty, setDayNote, reactiveStreak } = useStreak();
  const [exitCount, setExitCount] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [showUrgeHelp, setShowUrgeHelp] = useState(false);

  // Handle mobile back button
  useEffect(() => {
    const handleBack = () => {
      if ((window as any).__modalActiveCount > 0) {
        return; // Modal handles its own back button
      }

      if (activeTab !== 'home') {
        setActiveTab('home');
        // Restore the buffer so next back button works
        window.history.pushState({ app: 'forge' }, '', null);
      } else {
        if (exitCount === 0) {
          setExitCount(1);
          setShowToast(true);
          // Restore the buffer
          window.history.pushState({ app: 'forge' }, '', null);
          setTimeout(() => {
            setExitCount(0);
            setShowToast(false);
          }, 2000);
        } else {
          // Allow exit: do not pushState. 
          // The browser is now at the entry BEFORE the app started.
          // Tapping back again (or this very popstate if not careful) will exit.
          window.history.back(); 
        }
      }
    };

    // Initial buffer
    if (!window.history.state || window.history.state.app !== 'forge') {
      window.history.pushState({ app: 'forge' }, '', null);
    }
    
    window.addEventListener('popstate', handleBack);
    return () => window.removeEventListener('popstate', handleBack);
  }, [activeTab, exitCount]);

  return (
    <div className="fixed inset-0 h-[100dvh] bg-bg flex flex-col items-center justify-center transition-colors duration-500">
      <div className="relative w-full max-w-md h-full bg-bg text-text shadow-2xl flex flex-col border-x border-border overflow-hidden pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
        {/* Toast Alert */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[60]"
          >
            <div className="bg-card text-subtext px-4 py-2 rounded-full text-xs font-bold tracking-widest border border-border shadow-xl">
              {language === 'en' ? 'Tap back again to exit' : 'ထွက်ရန် နောက်တစ်ကြိမ် ထပ်နှိပ်ပါ'}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Urge Help Modal */}
      <AnimatePresence>
        {showUrgeHelp && (
          <UrgeRelief onClose={() => setShowUrgeHelp(false)} />
        )}
      </AnimatePresence>

      <main className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute inset-0"
            >
              <HomeView 
                data={data} 
                reactiveStreak={reactiveStreak}
                onCheckIn={(status) => checkIn(new Date().toISOString().split('T')[0], status)} 
                onUrgeHelp={() => setShowUrgeHelp(true)}
                onToggleDate={toggleDateStatus}
                onLongPressDate={setDateEmpty}
                onUpdateNote={setDayNote}
              />
            </motion.div>
          )}

          {activeTab === 'wisdom' && (
            <motion.div
              key="wisdom"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-0"
            >
              <WisdomView data={data} reactiveStreak={reactiveStreak} />
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute inset-0"
            >
              <SettingsView data={data} onReset={resetStreak} onUpdateStart={updateStartDate} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}
