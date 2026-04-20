export const haptics = {
  vibrate: (pattern: number | number[]) => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {
        // Ignore if vibration is not supported or blocked
      }
    }
  },
  light: () => haptics.vibrate(15),
  medium: () => haptics.vibrate(40),
  heavy: () => haptics.vibrate(100),
  success: () => haptics.vibrate([50, 50, 100]),
  warning: () => haptics.vibrate([30, 50, 30, 50, 30])
};
