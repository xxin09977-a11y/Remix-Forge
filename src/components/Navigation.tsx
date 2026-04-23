import { motion } from 'motion/react';
import { Home, BookOpen, Settings } from 'lucide-react';
import { Tab } from '../types';
import { useLanguage } from '../hooks/useLanguage';
import { T, COLORS } from '../constants';
import { haptics } from '../utils/haptics';

interface NavigationProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  const { language } = useLanguage();
  const tabs: { id: Tab; icon: any; label: string }[] = [
    { id: 'home', icon: Home, label: T.HOME[language] },
    { id: 'wisdom', icon: BookOpen, label: T.WISDOM[language] },
    { id: 'settings', icon: Settings, label: T.SETTINGS[language] },
  ];

  return (
    <div className="w-full flex justify-center flex-shrink-0">
      <nav className="w-full max-w-md h-20 bg-bg border-t border-border flex items-center justify-around px-6 transition-colors duration-500">
      {tabs.map(({ id, icon: Icon, label }) => {
        const isActive = activeTab === id;
        return (
          <button
            key={id}
            onClick={() => {
              if (!isActive) haptics.light();
              setActiveTab(id);
            }}
            className="relative flex flex-col items-center justify-center p-2 group"
          >
            <Icon
              size={26}
              className={`transition-colors duration-300 ${isActive ? 'text-accent accent-glow' : 'text-subtext'}`}
            />
            <span
              className={`text-[10px] uppercase tracking-tighter mt-1 transition-colors duration-300 ${
                isActive ? 'text-accent font-bold accent-glow' : 'text-subtext'
              }`}
            >
              {label}
            </span>
            {isActive && (
              <motion.div
                layoutId="nav-glow"
                className="absolute top-0 w-8 h-1 bg-accent rounded-full blur-[2px] accent-border-glow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
            )}
          </button>
        );
      })}
      </nav>
    </div>
  );
}
