import React, { createContext, useContext, useEffect, useState } from 'react';

export type FontSizeScale = 'small' | 'normal' | 'large' | 'xlarge';

interface FontSizeContextType {
  fontSize: FontSizeScale;
  setFontSize: (size: FontSizeScale) => void;
}

const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined);

const getFontSizeValue = (scale: FontSizeScale) => {
  switch (scale) {
    case 'small': return '14px'; // 87.5%
    case 'normal': return '16px'; // 100%
    case 'large': return '18px'; // 112.5%
    case 'xlarge': return '20px'; // 125%
    default: return '16px';
  }
};

export function FontSizeProvider({ children }: { children: React.ReactNode }) {
  const [fontSize, setFontSize] = useState<FontSizeScale>(() => {
    const saved = localStorage.getItem('forge_font_size') as FontSizeScale;
    return saved || 'normal';
  });

  useEffect(() => {
    localStorage.setItem('forge_font_size', fontSize);
    document.documentElement.style.fontSize = getFontSizeValue(fontSize);
  }, [fontSize]);

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
}

export function useFontSize() {
  const context = useContext(FontSizeContext);
  if (context === undefined) {
    throw new Error('useFontSize must be used within a FontSizeProvider');
  }
  return context;
}
