import React, { createContext, useContext, useEffect, useState } from 'react';
import { storage } from './storage';

const ThemeContext = createContext({ theme: 'light', toggle: () => {} });

// PUBLIC_INTERFACE
export function ThemeProvider({ children }) {
  /** Provides theme state and updates document attribute for CSS variables. */
  const [theme, setTheme] = useState(storage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    storage.setItem('theme', theme);
  }, [theme]);

  const value = {
    theme,
    toggle: () => setTheme((t) => (t === 'light' ? 'dark' : 'light')),
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// PUBLIC_INTERFACE
export function useTheme() {
  /** Returns theme and toggle handler. */
  return useContext(ThemeContext);
}
