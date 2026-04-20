import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { AppTheme } from '../types';

interface ThemeContextType {
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<AppTheme>(() => {
    const saved = localStorage.getItem('forge_premium_theme');
    return (saved as AppTheme) || 'obsidian';
  });

  useEffect(() => {
    localStorage.setItem('forge_premium_theme', theme);
    const root = window.document.documentElement;
    
    // Remove all possible theme classes
    const allThemes: AppTheme[] = ['obsidian', 'midnight', 'crimson', 'emerald', 'phantom', 'arctic', 'parchment'];
    allThemes.forEach(t => root.classList.remove(`theme-${t}`));
    
    // Add current theme class
    root.classList.add(`theme-${theme}`);
    
    // Maintain legacy 'light' class for components that might still depend on it for global shading
    if (theme === 'arctic' || theme === 'parchment') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
