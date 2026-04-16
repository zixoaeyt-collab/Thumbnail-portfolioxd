import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { ThemeName, ThemeConfig } from '../types';

const themes: Record<ThemeName, ThemeConfig> = {
  red: { name: 'red', label: 'Crimson Override', primary: '#ff003c', secondary: '#ff6600' },
  purple: { name: 'purple', label: 'Neural Violet', primary: '#bf00ff', secondary: '#7b00ff' },
  blue: { name: 'blue', label: 'Arctic Netrun', primary: '#00f0ff', secondary: '#0080ff' },
};

interface ThemeContextType {
  currentTheme: ThemeName;
  theme: ThemeConfig;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: 'red',
  theme: themes.red,
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>(() => {
    const saved = localStorage.getItem('cyber-theme');
    return (saved as ThemeName) || 'red';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('cyber-theme', currentTheme);
  }, [currentTheme]);

  const setTheme = useCallback((theme: ThemeName) => {
    setCurrentTheme(theme);
  }, []);

  return (
    <ThemeContext.Provider value={{ currentTheme, theme: themes[currentTheme], setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
export const getThemes = () => themes;
