import { useState, useEffect } from 'react';
import { UrgeSettings } from '../types';

const defaultSettings: UrgeSettings = {
  breathingDuration: 1, // 1 minute
  showerTemperature: 15, // 15 celsius
  showerDuration: 3, // 3 minutes
};

export function useUrgeSettings() {
  const [settings, setSettings] = useState<UrgeSettings>(() => {
    const saved = localStorage.getItem('forge_urge_settings');
    if (saved) {
      try {
        return { ...defaultSettings, ...JSON.parse(saved) };
      } catch (e) {
        return defaultSettings;
      }
    }
    return defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('forge_urge_settings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: Partial<UrgeSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return { settings, updateSettings };
}
