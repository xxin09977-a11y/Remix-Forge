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
  
  // Initialize tab from URL hash if available, otherwise 'home'
  const initialHash = window.location.hash.replace('#', '') as Tab;
  const [activeTab, setActiveTabState] = useState<Tab>(['home', 'wisdom', 'settings'].includes(initialHash) ? initialHash : 'home');
  
  const { data, checkIn, resetStreak, updateStartDate, toggleDateStatus, setDateEmpty, setDayNote, reactiveStreak } = useStreak();
  const [exitCount, setExitCount] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [showUrgeHelp, setShowUrgeHelp] = useState(false);

  // Sync state to URL hash changes (like hardware back button)
  useEffect(() => {
    const handleHashChange = () => {
      if ((window as any).__modalActiveCount > 0) {
        // Modals use pushState(null), not hashes, so hashchange isn't for them
        // But if hash changes while modal is open, we should still sync the tab underneath.
      }
      
      const newHash = window.location.hash.replace('#', '') || 'home';
      if (['home', 'wisdom', 'settings'].includes(newHash)) {
        setActiveTabState(newHash as Tab);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Handle Double-Back to Exit on Home
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if ((window as any).__modalActiveCount > 0) return; // Ignore if modal is open

      const currentHash = window.location.hash.replace('#', '') || 'home';
      
      // If we popped to 'home', we trap the immediate next back action for the exit feature.
      if (currentHash === 'home') {
        if (!e.state || e.state.app !== 'forge_exit_trap') {
           // We reached home, but need a trap state
           window.history.pushState({ app: 'forge_exit_trap' }, '', window.location.pathname + window.location.hash);
        } else {
           if (exitCount === 0) {
             setExitCount(1);
             setShowToast(true);
             window.history.pushState({ app: 'forge_exit_trap' }, '', window.location.pathname + window.location.hash);
             setTimeout(() => {
               setExitCount(0);
               setShowToast(false);
             }, 2000);
           } else {
             window.history.go(-2); // exit
           }
        }
      }
    };

    // Ensure we start with a trap state on home load
    if (activeTab === 'home' && (!window.history.state || window.history.state.app !== 'forge_exit_trap')) {
       window.history.replaceState({ app: 'forge_exit_trap' }, '', window.location.pathname + window.location.hash);
    }

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [activeTab, exitCount]);

  // Wrapper for manual tab click navigation
  const setActiveTab = (tab: Tab) => {
    if (tab === activeTab) return;
    
    // Change hash to push a natural history state!
    if (tab === 'home') {
       // Going back home replaces or pushes hash empty
       window.history.pushState({ app: 'forge_exit_trap' }, '', window.location.pathname);
       setActiveTabState('home');
    } else {
       // Replacing state for non-home prevents deep stacks (Settings -> Wisdom -> Settings -> Wisdom)
       if (activeTab === 'home') {
         window.location.hash = tab;
       } else {
         window.history.replaceState(null, '', `#${tab}`);
         setActiveTabState(tab);
       }
    }
  };

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
